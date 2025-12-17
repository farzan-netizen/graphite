#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"
RELEASE_STATE="$DIR/.release-state"

RELEASERC="$DIR/.releaserc"
if [[ -f "$RELEASERC" ]]; then
  source $RELEASERC
fi

source $UTILS/colors.sh
source $SCRIPTS/helpers.sh
source $UTILS/gitlab.sh


declare package=""
declare version="v0.0.0-placeholder"
declare parent_commit=""
declare target_commit=""
declare is_hotfix=false
declare is_last=false

for arg in "$@"; do
  shift
  case "$arg" in
    '--package')  set -- "$@" "-p" ;;
    '--version')  set -- "$@" "-v" ;;
    '--from')     set -- "$@" "-f" ;;
    '--to')       set -- "$@" "-t" ;;
    '--hotfix')   set -- "$@" "-h" ;;
    '--last')     set -- "$@" "-l" ;;
    *)            set -- "$@" "$arg"
  esac
done


while getopts 'p:v:f:t:hl' flag; do
  case "${flag}" in
    p) package="${OPTARG}" ;;
    v) version=${OPTARG} ;;
    f) parent_commit=${OPTARG} ;;
    t) target_commit=${OPTARG} ;;
    h) is_hotfix=true ;;
    l) is_last=true ;;
    *) exit 1 ;;
  esac
done

if [[ -z "$package" ]]; then
  package="nexus-signup"
fi


declare -r package_id=$(echo "${package// /-}" | tr '[:upper:]' '[:lower:]')
declare changelog=""

if [[ $is_last == true ]]; then
  declare -r changelog_path="CHANGELOG.md"
  # This will log the last released version instead of unreleased
  line_numbers=($(awk '/^## \[/ && NR>=1 && NR<=1000 {print NR;}' $changelog_path))

  from=${line_numbers[0]}
  from=$(($from+1))

  to=${line_numbers[1]}
  if [[ -z "$to" ]]; then
    to=$(wc -l $changelog_path | awk '{ print $1 }')
  else
    to=$(($to-1))
  fi

  changelog=$(sed -n "${from},${to}p" $changelog_path )
else
  if [[ -z "$version" ]]; then
    printf "${red}${bold} ERR: package version is required by Gitlab API${normal} \n\n"
    exit 1
  fi

  if [[ -z $target_commit ]]; then
    target_commit=$(git rev-list --max-count=1 HEAD)
  fi

  if [[ -z $parent_commit ]]; then
    if [[ -f $RELEASE_STATE ]]; then
      parent_commit=$(cat $RELEASE_STATE | grep 'PARENT_COMMIT=' | cut -d '=' -f2)
    fi
    if [[ -z $parent_commit ]]; then
      if ! parent_commit=$(get_last_stable_release_commit $package_id; exit $?); then
        echo -e "\n\n [ERROR] Something went wrong when querying last stable commit. Got:\n\n ${parent_commit}\n"
        exit 1
      fi
    fi
  fi
  declare trailer_prefix=''
  if [[ $is_hotfix == true ]]; then
    trailer_prefix='hotfix-'
  fi

  if ! changelog=$(get_changelog $version "${trailer_prefix}${package_id}" $parent_commit $target_commit); then
    echo -e "\n\n [ERROR] Unable to extract changelog. Got:\n\n ${changelog}\n"
    exit 1
  fi
  changelog=$(echo -e "$changelog" | sed -e "s|($CI_PROJECT_PATH!|($CI_PROJECT_URL/merge_requests/|g")
  changelog=$(echo -e "$changelog" | sed -e "s|($CI_PROJECT_PATH@|($CI_PROJECT_URL/commit/|g")
fi

changelog=$(echo -e "$changelog" | sed "1,2d;")
printf "%s\n" "${changelog//$'\n'/\\n}"

if [[ $? != 0 ]]; then
  exit $?
fi

exit 0

