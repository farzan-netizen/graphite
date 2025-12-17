#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"
RELEASERC="$DIR/.releaserc"
RELEASE_STATE="$DIR/.release-state"

if [[ -f "$RELEASERC" ]]; then
  source $RELEASERC
fi

source $SCRIPTS/helpers.sh

# $1 package name
# $2 version: is applied to package.json
# $3 tag: used to generate URL

declare package_name=$(echo "${1// /-}" | tr '[:upper:]' '[:lower:]')
declare version=$2
declare tag=$3

declare is_hotfix=false
if [[ $tag =~ \-hotfix$ ]]; then
  is_hotfix=true
fi

# For single package project, use root package.json and CHANGELOG.md
declare manifest_path="$DIR/package.json"
declare changelog_path="$DIR/CHANGELOG.md"
declare version_date=$(date +%F)

declare version_header=""
declare changelog=""

if [[ $is_hotfix == true ]]; then
  version_header="## [v${version}-hotfix](${CI_PROJECT_URL}/tags/$tag) <sub>/ ${version_date}</sub>"
  changelog=$($UTILS/get-package-changelog.sh -p $package_name -v "$version-hotfix" -h; exit $?)
else
  version_header="## [v${version}](${CI_PROJECT_URL}/tags/$tag) <sub>/ ${version_date}</sub>"
  changelog=$($UTILS/get-package-changelog.sh -p $package_name -v $version; exit $?)
fi

if [[ $? != 0 ]]; then
  echo -e "Unable to fetch package changelog. Got:\n$changelog"
  exit 1
fi

declare output=$(printf "%s\\\n\\\n%s" "$version_header" "$changelog")

# Find the latest release note segment and place the new version above it
line_numbers=($(awk '/^## \[/ && NR>=1 && NR<=100 {print NR;}' $changelog_path))
head=${line_numbers[0]}
if [[ -z "$head" ]]; then
  printf "\n${output}\n\n" >> $changelog_path
else
  perl -i -pe "printf \"${output}\n\n\n\" if $. == ${head}" $changelog_path
fi

escaped_version=$(escape_version $version)
perl -i -pe 's/"version"\: ".*"/"version"\: "'"$escaped_version"'"/g' $manifest_path

git add $changelog_path
git add $manifest_path
if [[ -f $RELEASE_STATE ]]; then
  rm -rf $RELEASE_STATE
  git add $RELEASE_STATE
fi
git commit -q -m "$package_name -> $version"

exit 0

