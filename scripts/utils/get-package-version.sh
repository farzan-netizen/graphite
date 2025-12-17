#! /bin/bash

DIR=$(pwd)

# $1 package
package=$1

# For single app project, use root package.json
package_json="$DIR/package.json"
current_version=$(cat $package_json | jq -r '.version')

echo $current_version

