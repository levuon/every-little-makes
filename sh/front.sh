#!/bin/bash
# set -x

. include/main.sh





# API
readonly HOST_API='https://api.frontendmasters.com/v1/kabuki/courses/functional-javascript-v2'

#FAILED
FAIL_ARRAY=()


# read -p "please input lesson >>  " LESSON
# Echo_Yellow "INPUPT URL: $LESSON"


# get course name
# method 1
# IFS='/' read -r -a array <<< "$URL"
# COURSE=${array[@]: -1:1}
# method 2


echo "***********************************************************"
echo "***************************START**************************"
echo "***********************************************************"


DATA=($(cat ./test.json | jq '.lessonData | [.[] | { uuid: .statsId, name: .slug } ]'))

# get mu38 json url
# DATA=($(curl -s $HOST_API | jq '.lessonData'))
# DATA=($(curl -s $HOST_API | jq '.lessonData | [.[] | { uuid: .statsId, name: .slug } ]'))

# echo ${DATA[*]}
UUID=`echo ${DATA[*]} | jq '.[] | .uuid'`
NAME=`echo ${DATA[*]} | jq '.[] | .name'`
# echo ${UUID[*]}

UUID=(${UUID// / })
NAME=(${NAME// / })

###############  lastest ###########
one=1
for index in "${!UUID[@]}"
do
  #get json name json url
  # DATA=`echo ${DATA[index]}|awk -F '"' '{printf $2}'`
  UUID=`echo ${UUID[index]} | cut -d '"' -f 2`

  num=`expr "$index" + "$one"`

  #real json url
  JSONURL="https://api.frontendmasters.com/v1/kabuki/video/${UUID}/source?r=720&f=webm"
  # echo $JSONURL

  echo $JSONURL
  # #real mu38 bin address
  # binUrl=
  # while [ -n $binUrl ]
  # do
  #   binUrl=$(curl -s $JSONURL | jq '.url')
  # done  

  # binUrl=`echo $binUrl | cut -d '"' -f 2`
  echo -e "$JSONURL \n"  >> kt-fp.txt

  # fileName=`echo $fileName|awk -F "." '{printf $1}'`
  # fileUrl=`echo $binUrl|cut -d '"' -f2`
  # echo $fileUrl
  # mapper to ts_url

  #download mu38 ts files
  # LESSON_NAME=`echo ${LESSON[index]}|cut -d '"' -f2`
  # echo -e "$fileUrl \n"  >> test-javascript.txt
  #  sleep 10
  # you-get -O front-$num-$LESSON_NAME $fileUrl

done


