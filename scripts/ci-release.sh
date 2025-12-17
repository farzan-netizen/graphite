#! /usr/bin/env bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $UTILS/colors.sh
source $UTILS/gitlab.sh
source $SCRIPTS/helpers.sh

function init_release () {
  local package_id=$1

  if [[ -z $package_id ]]; then
    printf "${red}${bold} ERR: package id is unspecified!${normal}\n\n"
    return 1
  fi

  printf "${bold} ➞ Preparing a new version for ${magenta}$package_id${normal}...\n"

  # 1. Detect bump level
  local -r changes=$(./scripts/utils/get-package-changelog.sh -p "$package_id" -t $CI_COMMIT_SHA || echo "")
  bump_level=$($UTILS/detect-bump-level.sh "$changes" || echo "minor")

  # 2. Bump the version based on bump level
  current_version=$($UTILS/get-package-version.sh $package_id || echo "0.0.0")

  next_version=$($UTILS/bump-version.sh $current_version $bump_level || echo "0.1.0")
  printf "${bold} ╭─────────────────────────────────────${normal}\n"
  printf "${bold} ├─ Current version:  ${green}$current_version${normal}\n"
  printf "${bold} ├──── Next version:  ${blue}$next_version${normal}\n"
  printf "${bold} ╰─────────────────────────────────────${normal}\n"

  # 3. Prompt unreleased changes
  printf "${bold}   Changes in this version: ${normal}\n\n"
  if [[ -z "$changes" ]]; then
    printf "${yellow}${bold}   Changelog is empty! 🥴\n\n"
  else
    echo -e "${cyan}$changes${normal}"
  fi
  printf "${normal}\n"

  # 4. Create the release branch for the new version
  local -r release_branch="release/$package_id/$next_version"
  printf "\n${bold} ➞ Checking out to ${magenta}$release_branch${normal}..."

  if git checkout -q -b $release_branch; then
     printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    # Branch may already exist!
    if git checkout $release_branch; then
      printf "${green}${bold} ✔︎ Ok${normal}\n"
    else
      printf "\n\n"
      printf "${red}{$bold} ERR: Unable to prepare the new version!${normal}\n\n"
      return 1
    fi
  fi

  printf "\n${bold} ➞ Pushing release branch ${magenta}$release_branch${normal} to remote..."
  if git push -f -q --set-upstream origin $release_branch; then
    printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    printf "\n\n${red}${bold}"
    printf " ERR: Unable to push changes to remote!"
    return 1
  fi
  return 0
}

function commit_ci () {
  local package_id=$1
  local package_version=$2
  local semver=$2
  local version_type=$3

  if [[ $version_type == 'hotfix' ]]; then
    semver="$semver-hotfix"
  fi

  local build="$package_id-$semver"

  if tag_exists_on_remote $build; then
    printf "${yellow}${bold} WARN: Tag already exists on remote. Nothing to do here.\n\n"
    return 0
  fi
  local changes=""
  if [[ $version_type == 'hotfix' ]]; then
    changes=$($UTILS/get-package-changelog.sh -p "$package_id" -t $CI_COMMIT_SHA -h || echo "Hotfix release")
  else
    changes=$($UTILS/get-package-changelog.sh -p "$package_id" -t $CI_COMMIT_SHA || echo "Release")
  fi
  changes=$(echo -e "$changes")

  local -i stage=1

  while [[ $stage -lt 6 ]]; do
    case $stage in
      1)
        printf "\n${bold} ➞ Committing $package_version...${normal}"
        if $UTILS/apply-version-to-package.sh "$package_id" "$package_version" "$build"; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to apply new version${normal}\n\n"
          return 1
        fi
        ;;
      2)
        printf "\n${bold} ➞ Pushing $semver branch to remote...${normal}"
        if git push -q --no-progress --set-upstream origin $current_branch; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to push changes to remote!${normal}\n\n"
          return 1
        fi
        ;;
      3)
        printf "\n${bold} ➞ Tagging $build...${normal}"
        if git tag -a $build -m "$build"; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to tag the package!${normal}\n\n"
          return 1
        fi
        ;;
      4)
        printf "\n${bold} ➞ Update release notes for $semver...${normal}"
        # Make sure the tag is pushed
        git push -q origin $build

        if update_release_note "$package_id" "$semver" "$build" "$changes"; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to update release notes!${normal}\n\n"
          return 1
        fi
        ;;
      5)
        printf "\n${bold} ➞ Creating merge request from $current_branch to $CI_DEFAULT_BRANCH...${normal}"
        create_merge_request $current_branch $CI_DEFAULT_BRANCH
        if (( $? != 0 )); then
          return $?
        fi
        ;;
    esac
    stage=$(($stage+1))
  done

  printf "\n${green}${bold} ✔︎ All Done${normal}\n\n"
}

