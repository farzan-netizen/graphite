#! /bin/bash

# patch: 0
# minor: 1
# major: 2

explicit_bump_level=0
if [[ $1 == *'`major`'* ]]; then
  explicit_bump_level=2
elif [[ $1 == *'`minor`'* ]]; then
  explicit_bump_level=1
fi

implicit_bump_level=0
if [[ "$1" =~ \#{3}\ (Breaking Changes) ]]; then
  implicit_bump_level=2
elif [[ "$1" =~ \#{3}\ (Security|New Features|Changed|Deprecated|Removed|Performance|Other) ]]; then
  implicit_bump_level=1
fi

level=0
if (( $implicit_bump_level > $explicit_bump_level )); then
  level=$implicit_bump_level
else
  level=$explicit_bump_level
fi

case $level in
  2)
    echo 'major'
    ;;
  1)
    echo 'minor'
    ;;
  *)
    echo 'patch'
    ;;
esac

