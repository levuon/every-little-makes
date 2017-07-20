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
