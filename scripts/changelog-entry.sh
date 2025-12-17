#! /usr/bin/env bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $UTILS/colors.sh
source $UTILS/select.sh

declare remove=false
declare hotfix=false
declare force=false
declare package='nexus-signup'
declare category=''
declare url=''

declare title=''
declare message=''

for arg in "$@"; do
  shift
  case "$arg" in
    '--remove')     set -- "$@" "-r" ;;
    '--package')    set -- "$@" "-p" ;;
    '--category')   set -- "$@" "-c" ;;
    '--url')        set -- "$@" "-u" ;;
    '--force')      set -- "$@" "-f" ;;
    *)              set -- "$@" "$arg"
  esac
done

while getopts 'rfp:c:u:' flag; do
  case "${flag}" in
    r) remove=true ;;
    f) force=true ;;
    p) package="${OPTARG}" ;;
    c) category="${OPTARG}" ;;
    u) url="${OPTARG}" ;;
    *) exit 1 ;;
  esac
done


declare -r git_title=$(git show --pretty=format:%s -s HEAD)
declare -r git_body=$(git show --pretty=format:%b -s HEAD)
declare -r git_trailers=$(git show --pretty=format:%\(trailers\) -s HEAD)

declare message=$(echo -e "${git_body//$git_trailers}")

declare -r current_branch=$(git branch --show-current)
declare -r default_branch=${CI_DEFAULT_BRANCH:-$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')}

if [[ $current_branch == "$default_branch" && $force == false ]]; then
  printf "\n\n${bold}${red}  ERR: This command edits the last commit! It's not safe to execute it while on default branch!\n\n"
  exit 1
fi

if [[ $current_branch =~ ^(hotfix)\/nexus-signup\/([0-9]+\.){2}[0-9]+$ ]]; then
  hotfix=true
fi

if [[ $remove == true ]]; then
  printf "\n${bold}  Removing last commit from changelog:\n  Title: ${yellow}${git_title}${normal}\n"
  message=$(printf "$git_title\n\n$message")
  git commit --amend -m "$message"
else
  printf "\n${bold}  Marking last commit as a changelog entry:\n  Title: ${green}${git_title}${normal}\n"
  read -r -p "${bold}${magenta}  Change title if you wish (leave empty to use current title): `echo $'\n> '`${normal}${bold}" title
  if [[ -z $title ]]; then
    title="$git_title"
  fi
  
  # For single package project, default to nexus-signup
  package=$(echo "${package// /-}" | tr '[:upper:]' '[:lower:]')
  printf "\n${magenta}${bold} Selected package: ${green}${package}${normal}\n"

  if [[ $hotfix == true ]]; then
    package="hotfix-${package}"
  fi

  if [[ -z $category ]]; then
    declare -a categories=(feature fix changed deprecated removed breaking security performance other)
    printf "\n${magenta}${bold} Choose the change category:${normal}\n"
    select_option "${categories[@]}"
    choice=$?
    category="${categories[$choice]}"
  else
    printf "\n${magenta}${bold} Selected category: ${green}${category}${normal}\n"
  fi

  message=$(printf "$title\n\n$message")

  if [[ -n "$url" ]]; then
    git commit --amend -m "$message" --trailer "$package: $category" --trailer "url: $url"
  else
    git commit --amend -m "$message" --trailer "$package: $category" --allow-empty
  fi

fi

