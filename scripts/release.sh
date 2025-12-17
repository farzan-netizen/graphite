#! /usr/bin/env bash

# Normal flow:
#
#         ------------------ < -------------------------
#       /                                                \ (merge request)
#      /                                                  \
#   main --- :prepare ---> release/nexus-signup/x.y.z --- :commit ---> tags/nexus-signup-x.y.z
#
# Hotfix flow:
#
#                                                                       ----> main
#                                                    (merge request)  /
#                                                                    /
#   tags/x.y.z --- :prepare ---> hotfix/nexus-signup/x.y.(z+1) ---- :commit ------> tags/nexus-signup-x.y.(z+1)-hotfix
#

# Usage:
#   Regular release:
#     1. ./scripts/release.sh
#     2. ./scripts/release.sh --commit
#   Hotfix:
#     1. ./scripts/release.sh --hotfix [--version version-to-be-fixed]
#     2. ./scripts/release.sh --commit

# Load local configs.
# Following variables can only be read from .releaserc or global environment:
#  - $GITLAB_API_TOKEN
#  - $LINK_OPENER
#  - $CI_PROJECT_ID
#  - $CI_PROJECT_URL
#  - $CI_DEFAULT_BRANCH

DIR=$(pwd)
RELEASE_STATE="$DIR/.release-state"
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

RELEASERC="$DIR/.releaserc"
if [[ -f "$RELEASERC" ]]; then
  source $RELEASERC
fi

GITLAB_API_BASE="$CI_API_V4_URL/projects"

source $UTILS/colors.sh
source $UTILS/gitlab.sh

if [[ -z $CI ]]; then
  source $UTILS/select.sh
fi

###
#
# Versioning procedure begins here...
#
##
for arg in "$@"; do
  shift
  case "$arg" in
    '--fix' | '--hotfix') set -- "$@" "-f" ;;
    '--commit')           set -- "$@" "-c" ;;
    '--package')          set -- "$@" "-p" ;;
    '--version')          set -- "$@" "-v" ;;
    *)                    set -- "$@" "$arg"
  esac
done

declare project_url
declare prod_version
declare canary_version
declare current_version

declare is_committing=false
declare is_hotfix=false
declare package='nexus-signup'
declare version_arg='minor'
while getopts 'fcp:v:' flag; do
  case "${flag}" in
    f) is_hotfix=true ;;
    c) is_committing=true ;;
    p) package="${OPTARG}" ;;
    v) version_arg="${OPTARG}" ;;
    *) exit 1 ;;
  esac
done

if [[ $is_committing == true ]] && [[ $is_hotfix == true ]]; then
  printf "${yellow} WARN: Ignoring hotfix flag: Hotfix flag can only be used when preparing a version initially.${normal}"
  is_hotfix=false
fi

readonly is_committing
readonly is_hotfix

###
# Release functions
###
if [[ -n $CI ]]; then
  source $SCRIPTS/ci-release.sh
else
  source $SCRIPTS/local-release.sh
fi

if [[ $is_committing == false ]]; then
  ###
  # Preparing a new version...
  ###
  if [[ $is_hotfix == false ]]; then
    # This block should be executed in CI
    if [[ -z $CI ]]; then
      printf "\n ${bold}${red} [ERR] Please promote a build via Gitlab interface\n\n"
      exit 1
    else
      init_release $package
    fi

  else
    # HOTFIX!
    # This block is executed on developer's local machine
    if [[ -z $CI ]]; then
      tput clear
      tput cup 0 0
      tput ri
      init_hotfix $package
    else
      printf " ${bold}${red} [ERR] Hotfix branches cannot be initiated in CI"
      exit 1
    fi
  fi
  exit 0
else

  ##
  # Committing the version
  ##

  declare -r current_branch=$(git branch --show-current)

  if [[ ! $current_branch =~ ^(hotfix|release)\/nexus-signup\/([0-9]+\.){2}[0-9]+$ ]]; then
    printf "${red}${bold} ERR: Invalid branch name: $current_branch\n"
    printf "${red}${bold}      New releases can only be created from release/nexus-signup/x.y.z or hotfix/nexus-signup/x.y.z branches\n\n"
    exit 1
  fi

  # 1. Extract the version in progress and try to assert the context.
  declare -r branch_type=$(echo "$current_branch" | cut -d '/' -f 1)
  declare -r branch_package=$(echo "$current_branch" | cut -d '/' -f 2)
  declare -r branch_version=$(echo "$current_branch" | cut -d '/' -f 3)

  if [[ -z $CI ]]; then
    commit_local $branch_package $branch_version $branch_type
    exit $?
  else
    commit_ci $branch_package $branch_version $branch_type
    exit $?
  fi
  exit 0
fi

