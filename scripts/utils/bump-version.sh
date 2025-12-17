#! /bin/bash

# $1 current version
# $2 bump level

declare -a parts
IFS='.' read -r -a parts <<< "$1"

declare -r major=${parts[0]}
declare -r minor=${parts[1]}
declare -r patch=${parts[2]}

case "$2" in
  "major")  echo $(($major+1)).0.0 ;;
  "minor")  echo ${major}.$(($minor+1)).0 ;;
  "patch")  echo ${major}.${minor}.$(($patch+1)) ;;
  *)
    echo $2
    ;;
esac

