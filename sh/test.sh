#!/bin/bash


############## split ... to array ##############
# read -p "inpu >> " string
# IFS=', ' read -r -a array <<< "$string"
# echo "${array[0]}"
# for element in "${array[@]}"
# do
#     echo "$element"
# done
#
# for index in "${!array[@]}"
# do
#     echo "$index ${array[index]}"
# done


############## define array ##############
# arr=(....)
# arr=($(....))



########### last of array ##############
# echo "${array[@]: -1:1}"
# a=(a b c d e f)
# You must get the array length from ${#a[@]} and then subtract one to get the last element:
# echo ${a[${#a[@]}-1]}  f



############## parse JSON ##############
# https://stedolan.github.io/jq/tutorial/



############## cut  ##############
# OPTIONS
# -b bytes
# -d delimiter
# -c charactors
# -f field number
# -s do not print lines not containing delimiters.
# --output-delimiter replace delimiter


# -cn-  from nth charactors to end.
# -c-n  from begin to the nth charactors
# -c- from begin to end. entire line would get printed.
# eg.
# find cut last number of fields
# echo "www.google.com"|rev|cut -d . -f 1|rev
# grep file1 file2 | cut -d ':' -f 1, 3


# root:0  => root    0
# bin:2   => bin     2
cut -f 1,3 -d ':' --output-delimiter=$'\t' /etc/passwd


########## get last number of fields #########
URL="http://www.google.com/hahahaha"
# get hahahaha
# method 1
IFS='/' read -r -a array <<< "$URL"
method1Last=${array[@]: -1:1}
# method 2
method2Last=`echo $URL | rev | cut -d / -f 1 | rev`
