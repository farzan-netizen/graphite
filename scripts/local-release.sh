#! /usr/bin/env bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $UTILS/colors.sh
source $UTILS/gitlab.sh
source $UTILS/select.sh
source $SCRIPTS/helpers.sh

function commit_local () {

  local package_id=$1
  local package_version=$2
  local version_type=$3

  # Not in CI
  local -r -i dirty=$(git status --porcelain | grep -x -c '')
  if [[ $dirty -gt 0 ]]; then
    printf "\n${red}${bold} ERR: Repository has uncommited changes\n\n${normal}"
    printf "\n${red}${bold}      You should either commit or stash them before trying again.${normal}"
    return 1
  fi

  git push -q
  if (( $? != 0 )); then
    printf "\n${red}${bold} ERR: unable to push to remote\n\n"
    return 1
  fi

  # Informative section for when version is committed outside CI environment
  printf "\n"
  printf "${bold} ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n"
  printf "${cyan}${bold}"
  printf " IMPORTANT NOTE\n\n"
  printf " \n"
  printf " Since you want to commit this release outside a CI environment,\n"
  printf " this script won't do anything, except for facilitating the interactions\n"
  printf " with Gitlab APIs to emulate the pipeline in your stead.\n"
  printf " \n"
  printf " If the script is interrupted, re-issue the command or continue the\n"
  printf " pipeline via Gitlab interface.\n"
  printf "${normal}"
  printf "${bold} ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍${normal}\n\n"

  local commit_hash
  if [[ $version_type == "hotfix" ]]; then
    commit_hash=$(git rev-parse --verify HEAD)
  else
    # For normal releases, we want the pipeline for previous commit.
    # This is due to the fact that the current commit does not include any functional change, only version bumps.
    # The previous commit is already built and is ready to be deployed.
    commit_hash=$(git rev-parse --verify HEAD~1)
  fi

  local commit_message=$(git log --format=%B -n 1 $commit_hash)
  local pipeline_url=$(get_pipeline_for_commit $commit_hash)

  printf "${bold} ➞ Getting pipeline info for following commit...${normal}\n\n"
  printf "${bold}   Message: ${standout} $commit_message ${normal}\n"
  printf "${bold}       SHA: ${standout} $commit_hash ${normal}\n\n"

  retry=0
  while [[ -z "$pipeline_url" ]] && [[ $retry -lt 10 ]]; do
    printf "${yellow}${bold} Pipeline is not ready yet. Retrying...${normal}\n\n"
    sleep 5
    pipeline_url=$(get_pipeline_for_commit $commit_hash)
    retry=$(($retry+1))
  done

  if [[ -z "$pipeline_url" ]]; then
    printf "\n${yellow}${bold} [WARN] Was not able to retrive pipeline info."
    printf "\n${yellow}${bold}        This may be caused by various reasons."
    printf "\n${yellow}${bold}        You need to ${underline}promote${nounderline} this build manually.${normal}\n\n"
    return 0
  fi

  printf "${bold} ➞ Pipeline URL: ${green}$pipeline_url${normal}\n"

  local -r pipeline_id=$(echo "$pipeline_url" | rev | cut -d '/' -f 1 | rev)

  if [[ $version_type == "hotfix" ]]; then
    if ! wait_on_job $pipeline_id "hotfix" 15; then
      printf "\n${red}${bold} [ERROR] hotfix build job was unsuccessful\n\n${normal}"
      return 1
    else
      printf "\n${blue}${bold} Hotfix build has been triggered...${normal}\n\n"
    fi
  fi

  read -r -p " Do you want to deploy the hotfix when the build is ready? (y/n) " -n 1 deploy
  if [[ $deploy =~ ^[Nn]$ ]]; then
    exit 0
  fi

  if ! wait_on_job $pipeline_id "${package_id}:promote" 15; then
    printf "\n${red}${bold} [ERROR] promote job unsuccessful\n\n${normal}"
    return 1
  fi
  printf "\n${green}${bold} ✔︎ All Done${normal}\n"
  git checkout -q $CI_DEFAULT_BRANCH
}


function init_hotfix () {
  local package_id=$1

  local project_url
  project_url=$(get_project_url; exit $?)
  if (( $? )); then
    printf "\n ${red}${bold}[ERR] Unable to get project info from Gitlab${normal}"
    printf "\n ${red}${bold}      Got: \"${project_url}\"${normal}\n\n"
    exit 1
  fi

  echo -e "${bold} ➞ Preparing a hotfix for ${magenta}$package_id${normal}...\n"

  tag_prefix=$(echo "${package_id// /-}" | tr '[:upper:]' '[:lower:]')
  version_url_env_name=$(echo "${package_id//[ -]/_}_VERSION_ENDPOINT" | tr '[:lower:]' '[:upper:]')
  url=${!version_url_env_name}
  local v_prod
  local v_canary

  if [[ -z $url ]]; then
    printf "${yellow} WARN: No version endpoint is set for $package_id.\n"
    printf "${yellow}       Unable to determine deployed versions.${normal}\n"
  else
    get_prod_version $url
    get_canary_version $url

    printf "${bold}  Production Version: "
    if [[ $? != 0 || -z $prod_version ]]; then
      printf "${red}Unable to determine!${normal}"
    else
      v_prod=$(get_numeric_version $prod_version)
      b=$(get_build_number $prod_version)
      printf "${green}$v_prod${normal}"
      if [[ -n "$b" ]];then
        printf " ${green}(build: $b)${normal}"
      fi
    fi

    printf "\n${bold}      Canary Version: "
    if [[ $? != 0 || -z $canary_version ]]; then
      printf "${red}Unable to determine!${normal}"
    else
      v_canary=$(get_numeric_version $canary_version)
      b=$(get_build_number $canary_version)
      printf "${green}$v_canary${normal}"
      if [[ -n "$b" ]];then
        printf " ${green}(build: $b)${normal}"
      fi

    fi
    printf "\n"
  fi

  # 1. Fetch and display all tags (Annotate the live and canary versions)
  #    and ask developers to select the version they want to fix
  git fetch -q --all --tags

  local -r -a latest_tags=($(git tag -l "$tag_prefix-*" --sort=-creatordate | head -n 10))

  printf "\n\n"
  printf "${bold} These are the latest versions for ${blue}${package_id}${normal}${bold}.${normal}\n\n"
  printf "${magenta}${bold} Which version you want to fix?${normal}\n\n"
  local -a tag_options

  for tag_index in "${!latest_tags[@]}"
  do
    local current_tag=${latest_tags[$tag_index]}
    v=$(get_numeric_version $current_tag)
    b=$(get_build_number $current_tag)

    label=$v
    if [[ $current_branch =~ ^hotfix ]]; then
      label="${label}-hotfix"
    fi

    if [[ $v == $v_prod ]]; then
      label="${label} (🐓)"
    fi
    if [[ $v == $v_canary ]]; then
      label="${label} (🐥)"
    fi
    tag_options+=("$label")
  done

  tag_options+=("Other")

  select_option "${tag_options[@]}"
  choice=$?

  local base_tag="${latest_tags[$choice]}"

  if [[ -z "$base_tag" ]]; then
    # 1.a. Selected "Other" option
    printf " ${bold}Give me the version you want to fix.${normal}\n"
    printf " ${bold}Keep in mind that you only need to provide the numeric part (x.y.z).${normal}\n"
    printf " ${bold}I'll find the proper tag that belongs to ${blue}${package_id}${normal}${bold}.\n\n"
    read -r -p "  ${bold}${magenta}Version: " response
    printf "${normal}\n"

    t="$tag_prefix-$response"
    if tag_exists $t; then
      base_tag=$t
    else
      printf "${red}${bold} ERR: Tag $t does not exits.\n\n"
      return 1
    fi
  fi

  printf "${bold} ➞ Calculating patch version for ${magenta}$base_tag${normal}...\n"

  # 3. Create the release branch: product/hotfix/x.y.(z+1)
  local next_tag=""

  local base_version=$(get_numeric_version "$base_tag")
  local next_version="$($UTILS/bump-version.sh "$base_version" patch)"
  while true; do
    next_tag="$tag_prefix-$next_version"
    if tag_exists "${next_tag}" || tag_exists "${next_tag}-hotfix"; then
      printf "${yellow}{$bold} [WARN] $next_tag already exists.\n"
      next_version=$($UTILS/bump-version.sh $next_version patch)
    else
      printf "${bold} ➞ Using ${blue}$next_version${normal}${bold} as the next version.\n"
      break
    fi
  done

  local -r hotfix_branch="hotfix/$tag_prefix/$next_version"

  printf "${bold} ➞ Preparing hotfix branch ${blue}$hotfix_branch${normal}${bold}..."

  if git checkout -q tags/$base_tag -b $hotfix_branch; then
    printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    echo "\n\n ${red}{$bold}ERR: Unable to create $hotfix_branch branch${normal}\n"
    return 1
  fi

  printf "${bold} ➞ Saving parent commit..."

  local -r parent_commit=$(git rev-list --max-count=1 HEAD)
  echo "PARENT_COMMIT=$parent_commit" > $RELEASE_STATE
  git add $RELEASE_STATE
  git commit -q -m "Preparing hotfix branch: $hotfix_branch"
  printf "${green}${bold} ✔︎ Ok (${parent_commit})${normal}\n"

  printf "${bold} ➞ Pushing ${blue}$hotfix_branch${normal}${bold} to remote..."
  if git push -q --set-upstream origin $hotfix_branch; then
    printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    printf "${red}${bold} ERR: Unable to push changes to remote!"
    printf "${red}${bold}      Try again when the issue is resolved:\n"
    printf "${red}${bold}          git push --set-upstream origin $hotfix_branch\n\n"
    return 1
  fi

  # 6. Prompt developer about the next steps
  compare_url="$project_url/-/compare/$base_tag...$hotfix_branch"
  printf "${bold} \n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍end
    return 0
}

