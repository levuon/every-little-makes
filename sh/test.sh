#!/bin/bash


# debug -x, -v, -xv
# -x
# -v The verbose (-v) option to the shell is more useful if you simply want to see the running code of the script that you’re working with
# set -v
# #!/bin/bash
# set -v or set -x or set -vx
#

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

########### get () inside things ########
# echo "(sadsadsadkjsajd)" | awk -F '[()]' '{printf $2\n}'


############ list current directory files ############
for w in $(echo *); do echo $w; done



##################  uniq ##################
# This command removes duplicate adjacent lines from the file
# ./file1
# aa
# aa
# bb
# bb
# cc
# cc
# yy
# zz
# uniq file1
#aa
#bb
#cc
#yy
#zz
#uniq -d file1
#aa
#bb
#cc

##################  tr ##################
# translate the lower case characters to upper case
# tr '[a-z]' '[A-Z]' < file
# This will squeeze multiple spaces into a single space:
# $ ls –l | tr -s " "


##### find success would write into success_file while error to /dev/null
# find . -name "*.sh" > success_file 2> /dev/null
##### no matter success or fail, all write into log.txt
# find . -name "*.sh" > log.txt 2>&1

# &> log.txt      => redirect both output and error to log.txt.
# > log.tx 2>&1   => redirect result to log.txt and send errors to where the output is going, such as log.txt.
# 1>&2           => send a standard output to the standard error. This will merge the output with the standard error.
# >|             => This overrides no clobber when redirecting the output
# <> filename       => This uses the file as both standard input and output if a device file (from /dev)




########### set command will show all variables declared in shell. ############
########### env command will display all environmental variables.  ############
########### echo $$ the process ID of current shell ############

# $0          Shell script name or command
# $1–$9       Positional parameters 1–9
# ${10}       Positional parameter 10
# $#          Total number of parameters
# $*          Evaluates to all the positional parameters
# $@          Same as $*, except when double quoted
# "$*"        Displays all parameters as "$1 $2 $3", and so on
# "$@"        Displays all parameters as "$1" "$2" "$3", and so on
# $?	上个命令的退出状态，或函数的返回值。




# 简单一行命令实现发送邮件
# echo 'content test' | mail -s "title test" -t  abc@hello.com,efg@hello.com,123@world.com    -a From:aaa@qq.com
# 内容由文件导入
# mail -s "sh mail test"  < file1.txt
# 带上附件
#  (uuencode file1.txt file1.txt; uuencode file2.txt file2.txt) | mail -s "title test" -t  hello@aaa.com
# 内容 + 附件
# (echo '1111111'; uuencode file1.txt file1.txt; uuencode file2.txt file2.txt) | mail -s "title test" -t  hello@aaa.com
# 多个内容 +多个 附件
# (echo '1111111'; echo '22222222'; uuencode file1.txt file1.txt; uuencode file2.txt file2.txt) | mail -s "title test" -t  hello@aaa.com
