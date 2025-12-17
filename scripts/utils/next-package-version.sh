#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

declare -r package=$1
declare -r changelog=$2

package_id=$(echo "${package// /-}" | tr '[:upper:]' '[:lower:]')
current_version=$($UTILS/get-package-version.sh "$package_id")

bump_level='patch'
if [[ -n "$changelog" ]]; then
  bump_level=$($UTILS/detect-bump-level.sh "$changelog")
fi

next_version=$($UTILS/bump-version.sh $current_version $bump_level)

echo $next_version

