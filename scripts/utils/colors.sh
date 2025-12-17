#! /usr/bin/env bash
ESC=$(printf "\033")
normal="${ESC}[0m"
bold="${ESC}[1m"
dim="${ESC}[2m"
nobold="${ESC}[21m"
underline="${ESC}[4m"
nounderline="${ESC}[24m"
standout="${ESC}[7m"
nostandout="${ESC}[27m"
black="${ESC}[30m"
red="${ESC}[31m"
green="${ESC}[32m"
yellow="${ESC}[33m"
blue="${ESC}[34m"
magenta="${ESC}[35m"
cyan="${ESC}[36m"
white="${ESC}[97m"

if [[ -t 1 ]]; then

  # see if it supports colors...
  ncolors=$(tput colors)

  if [[ -n "$ncolors" ]] && [[ $ncolors -ge 8 ]]; then
    normal="$(tput sgr0)"
    bold="$(tput bold)"
    underline="$(tput smul)"
    nounderline="$(tput rmul)"
    standout="$(tput smso)"
    black="$(tput setaf 0)"
    red="$(tput setaf 1)"
    green="$(tput setaf 2)"
    yellow="$(tput setaf 3)"
    blue="$(tput setaf 4)"
    magenta="$(tput setaf 5)"
    cyan="$(tput setaf 6)"
    white="$(tput setaf 7)"
  fi
fi

