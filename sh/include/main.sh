#!/bin/bash

Color_Text()
{
  #"\033[字背景颜色;文字颜色m字符串\033[0m"
  echo -e " \033[0;$2m$1\033[0m"
}

Echo_Red()
{
  echo $(Color_Text "$1" "31")
}

Echo_Green()
{
  echo $(Color_Text "$1" "32")
}

Echo_Yellow()
{
  echo $(Color_Text "$1" "33")
}

Echo_Blue()
{
  echo $(Color_Text "$1" "34")
}
