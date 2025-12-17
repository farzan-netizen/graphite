#! /usr/bin/env bash

function escape_version () {
  echo $1 | sed 's/\./\\./g'
}

function escape_single_quote () {
  echo "$1" | sed "s/'/\\\'/g"
}

function get_numeric_version() {
    echo "$1" | sed -nE 's/[a-z-]*([0-9]+\.[0-9]+\.[0-9]+).*/\1/p'
}

function get_build_number() {
  echo "$1" | sed -nE 's/[a-z-]*[0-9]+\.[0-9]+\.[0-9]+-(.*)/\1/p'
}

function get_prod_version () {

  ##
  # Important Note: Live version is not necessarily the latest tag!
  # We will send a requests to production app and check the
  # X-Tribe-UI-Version header, or use an actual app info endpoint.
  ##

  info=$(curl -s "$1")
  prod_version=$(jq -r '.version' <<< $info)

  # Remove v-prefix, if any
  prod_version=$(echo $prod_version | sed 's/^v//')
}

function get_canary_version () {

  ##
  # Important Note: Canary version is not necessarily the latest tag!
  # We will send a requests with canary header to production app and check the
  # X-Tribe-UI-Version header, or use an actual app info endpoint.
  ##

  info=$(curl -s --header "$APP_CANARY_HEADER: always" "$1")
  canary_version=$(echo "$info" | jq -r '.version')

  # Remove v-prefix, if any
  canary_version=$(echo $canary_version | sed 's/^v//')
}

# -- Version Handlers
function tag_exists () {
  git rev-parse "$1^{tag}" &> /dev/null
  return $?
}

function tag_exists_on_remote () {
  git fetch -q origin "refs/tags/$1":"refs/tags/$1" &> /dev/null
  return $?
}

