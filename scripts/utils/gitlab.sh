#! /usr/bin/env bash

GITLAB_API_BASE="$CI_API_V4_URL/projects"

function get_project_url () {
  local project
  local url
  local id
  project=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" "$GITLAB_API_BASE/$CI_PROJECT_ID")
  if [[ $? != 0 ]]; then
    echo $project
    return $?
  fi

  if [[ ! $project =~ \{.+\} ]]; then
    echo $project
    return 1
  fi

  id=$(jq -r '.id' <<< $project)
  if [[ $id != $CI_PROJECT_ID ]]; then
    echo $project
    return 2
  fi

  echo "$project" | jq -r '.web_url'
  return 0

}

function get_last_stable_release_commit () {
  local -r package_tag_prefix=$1
  local -r response=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" "$GITLAB_API_BASE/$CI_PROJECT_ID/repository/tags?search=^${package_tag_prefix}"; exit $?)
  if [[ $? != 0 ]]; then
    echo $response
    return $?
  fi

  length=$(echo $response | jq length)
  if [[ -z $length || $length == 0 ]]; then
    if [[ -z $CHANGELOG_BASE_COMMIT ]]; then
      echo "31f33a21efe53b967bd68637b2bb2288e6689ec2"
    else
      echo $CHANGELOG_BASE_COMMIT
    fi
  else
    # The following filter removes hotfix releases
    echo $response | jq -r "map(select(.name | test(\"$package_tag_prefix-([0-9]+[.]){2}([0-9]+)$\"))) | .[0] | .commit.id"
  fi
}

function get_changelog () {
  local -r version=$1
  local -r trailer=$2
  local -r from=$3
  local -r to=$4
  local -r response=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/repository/changelog?version=${version}&from=${from}&to=${to}&trailer=${trailer}";\
    exit $?)

  if [[ $? != 0 ]]; then
    printf "%s" "$response"
    return $?
  fi

  if [[ $(echo $response | jq ".error") != 'null' ]]; then
    printf "%s" "$response"
    return 1
  fi

  if [[ $(echo $response | jq ".message") != 'null' ]]; then
    printf "%s" "$response"
    return 1
  fi

  local notes=$(echo $response | jq ".notes")

  # trim qoutation marks
  notes="${notes%\"}"
  notes="${notes#\"}"

  echo "$notes"
}

function create_merge_request () {
  local -r source_branch=$1
  local -r target_branch=$2
  local response
  local merge_status
  local merge_request_id

  response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    --form "source_branch=$source_branch" \
    --form "target_branch=$target_branch" \
    --form "title=$source_branch to $target_branch" \
    --form "remove_source_branch=false" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests")

  merge_request_id=$(echo "$response" | jq -r '.iid')
  merge_status=$(echo "$response" | jq -r '.merge_status')

  if [[ 'null' == "$merge_request_id" ]]; then
    local -r message=$(echo "$response" | jq -r '.message')
    if [[ $message == *"already exists"* ]]; then
      response=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN"  --request GET "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests?state=opened&source_branch=$source_branch&target_branch=$target_branch")
      merge_request_id=$(echo "$response" | jq '.[0].iid')
      merge_status=$(echo "$response" | jq -r '.[0].merge_status')
    fi
  fi

  if [[ 'null' == "$merge_request_id" ]]; then
    printf "${red} ERR: Unable to create the merge request with $target_branch branch! Got:\n$response\n\n${normal}"
    return 1
  fi

  printf "${green}${bold} [OK] Created merge request with $target_branch.${normal}\n"
  printf "${bold}      Visit following URL to review it:${normal}\n"
  printf "${bold}      ${blue}$CI_PROJECT_URL/-/merge_requests/$merge_request_id${normal}\n"

  echo -e "Auto-merging..."

  while ! [[ $merge_status =~ ^can(not)?_be_merged$ ]]; do
    printf "${yellow} Mergeabilty has not been checked. Trying agian in a few seconds...${normal}\n"
    sleep 5
    response=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN"  --request GET "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests/$merge_request_id")
    merge_status=$(echo "$response" | jq -r '.merge_status')
  done

  if [[ $merge_status == "cannot_be_merged" ]]; then
    printf "${red} ERR: Merge request cannot be accepted!${normal}\n\n "
    return 10
  else
    accept_response=$(curl -s --request PUT \
      --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
      "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests/$merge_request_id/merge")

    mr_status=$(echo -e "$accept_response" | jq -r '.state')
    if [[ "merged" != "$mr_status" ]]; then
      printf "\n\n"
      printf "${yellow}${bold} WARN: Unable to auto-merge (possibly due to conflicts)!${normal}\n"
      printf "${yellow}${bold}       You should merge it manually!\n"
      printf "${yellow}${bold}       Got:\n$accept_response${normal}\n\n"
    else
      printf "\n ${green}${bold}✔︎ $source_branch has been merged into $target_branch\n"
    fi
  fi
  return 0
}

function update_release_note () {
  local -r package=$1
  local -r version=$2
  local -r build=$3
  local -r changelog=$4

  local name="Nexus Signup v$version"
  if [[ $build =~ \-hotfix$ ]]; then
    name="${name} (Hotfix)"
  fi

  local -r response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    --form "name=$name" \
    --form "tag_name=$build" \
    --form "description=$changelog" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/releases")

  local -r tag_name=$(echo "$response" | jq -r '.tag_name')
  if [[ $tag_name != $build ]]; then
    local -r message=$(echo $response | jq -r '.message')
    if [[ $message == "Release already exists" ]]; then
      echo -e "${yellow} WARN: Release already exists! Skipping...\n"
      return 0
    fi
    echo -e "${red}${bold} ERR: Unable to update release notes. Got:${nomal}\n"
    echo -e "${yellow}$response"
    echo -e "${nomal}\n"
    return 1
  fi

  return 0
}

function get_pipeline_for_commit () {
  local -r sha=$1
  local -r response=$(curl -s --request GET \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/pipelines?sha=${sha}")

  echo "$response" | jq -r ".[0].web_url // empty"
}


function get_job_id_for_pipeline_by_name () {
  local -r pipeline_id=$1
  local -r job_name=$2

  local -r response=$(curl -s --request GET \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/pipelines/${pipeline_id}/jobs?per_page=100&include_retried=true")

  printf "%s" $response | jq -r "[.[] | select (.name == \"${job_name}\") | .id][0] // empty"
}

function get_job_status () {
  local -r job_id=$1
  local -r response=$(curl -s --request GET \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/jobs/${job_id}")

  echo "$response" | jq -r ".status // empty"
}

function play_job () {
  local -r job_id=$1
  local -r response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/jobs/${job_id}/play")

  echo "$response" | jq -r ".status // empty"
}

function retry_job () {
  local -r job_id=$1
  local -r response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/jobs/${job_id}/retry")

  echo "$response" | jq -r ".status // empty"
}

function wait_on_job () {

  local -r pipeline_id=$1
  local -r job_name=$2
  local polling_period=$3
  local retry_if_already_resolved=$4

  if [[ -z $polling_period ]]; then
    polling_period=10
  fi

  local job_id=$(get_job_id_for_pipeline_by_name $pipeline_id $job_name)
  if [[ -z $job_id ]]; then
    printf "\n${bold}${red} ERR: unable to get job id for $job_name\n\n${normal}"
    return 1
  fi

  printf "\n ➞ ${bold}Waiting on job ${blue}${job_name}${normal}${bold} to become available...${normal}\n\n"

  declare -i loop_count=1
  while true
  do
    status=$(get_job_status $job_id)
    case $status in
      manual)
        printf "   ${magenta}${bold}Triggering ${job_name}...${normal}\n"
        status=$(play_job $job_id)
        ;;
      created|pending|waiting_for_resource)
        printf "   ${yellow}${bold}Still waiting... (${status})${normal}\n"
        ;;
      running)
        printf "   ${blue}${bold}Job is Running...${normal}\n"
        ;;
      success)
        if [[ $loop_count == 1 ]] && [[ $retry_if_already_resolved == true ]]; then
          status=$(retry_job $job_id)
          sleep 10
        else
          printf "   ${green}${bold}✔︎ Job ${job_name} succeeded${normal}\n"
          return 0
        fi
        ;;
      failed)
        if [[ $loop_count == 1 ]] && [[ $retry_if_already_resolved == "true" ]]; then
          status=$(retry_job $job_id)
          sleep 10
        else
          printf "   ${red}${bold}✗ Job ${job_name} failed${normal}\n"
          return 1
        fi
        ;;
      skipped)
        if [[ $loop_count == 1 ]] && [[ $retry_if_already_resolved == "true" ]]; then
          status=$(retry_job $job_id)
          sleep 10
        else
          printf "   ${red}${bold}✗ Job ${job_name} was skipped${normal}\n"
          return 2
        fi
        ;;
      canceled)
        if [[ $loop_count == 1 ]] && [[ $retry_if_already_resolved == "true" ]]; then
          status=$(retry_job $job_id)
          sleep 10
        else
          printf "   ${red}${bold}✗ Job ${job_name} was canceled${normal}\n"
          return 3
        fi
        ;;
      *)
        printf "   ${yellow}${bold}Couldn't get status for job: ${status}${normal}\n"
        ;;
    esac
    loop_count=$(($loop_count+1))
    sleep $polling_period
  done
}

