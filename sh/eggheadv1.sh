#!/bin/bash
# set -x

. include/main.sh

# API
readonly HOST_API='https://egghead.io/api/v1/lessons/'
NAME_JSON=""


#FAILED
FAIL_ARRAY=()

read -p "please input vedoi url >>  " URL
Echo_Yellow "INPUPT URL: $URL"

# URL="https://egghead.io/lessons/react-install-and-configure-the-entry-point-of-react-intl"

# get course name
# method 1
# IFS='/' read -r -a array <<< "$URL"
# COURSE=${array[@]: -1:1}
# method 2
COURSE=`echo $URL | rev | cut -d / -f 1 | rev`

function slash() {
  echo $1 | rev | cut -d / -f 1 | rev
}


echo "course_name: $COURSE"
echo "API: $HOST_API$COURSE/next_up"

echo "***********************************************************"
echo "***************************START**************************"
echo "***********************************************************"

# get mu38 json url
# DATA=($(curl -s $HOST_API$LESSON/next_up | jq '.list.lessons | .[].media_urls.wistia_url'))
# DATA=($(curl -s $HOST_API$COURSE/next_up | jq '.list.lessons | [.[] | { url: .media_urls.wistia_url, name: .slug } ]'))
DATA=($(curl -s $HOST_API$COURSE/next_up | jq '.list.lessons | [.[] | { url: .media_urls.wistia_url, name: .slug, jsonId: .wistia_id } ]'))


LESSON=`echo ${DATA[*]} | jq '.[] | .name'`
URL=`echo ${DATA[*]} | jq '.[] | .url'`
JSONID=`echo ${DATA[*]} | jq '.[] | .jsonId'`

LESSON=(${LESSON// / })
URL=(${URL// / })
JSONID=(${JSONID// / })
###############  lastest ###########
one=1
for index in "${!JSONID[@]}"
do
  #get json name json url
  # DATA=`echo ${DATA[index]}|awk -F '"' '{printf $2}'`
  echo ${JSONID[index]}
  JSONID=`echo ${JSONID[index]} | cut -d '"' -f 2`
  echo "JSON_ID: ${JSONID}"

  num=`expr "$index" + "$one"`

  #real json url
  JSONURL="https://fast.wistia.com/embed/medias/${JSONID}.json?callback=wistiajson1"
  echo $JSONURL

  #real mu38 bin address
  binUrl=$(curl -s $JSONURL |awk -F '(' '{printf $2}' | awk -F ')' '{printf $1}' | jq '.media.assets | .[4].url')
  # binUrl=$(curl -s $JSONURL | jq '.media.assets | .[4].url')
  # binUrl=$(curl -s $JSONURL |awk -F '[()]' '{printf $2}'| jq '.media.assets | .[4].url')
  echo "binUrl: $binUrl"


  # fileName=`echo $binUrl|awk -F '"' '{printf $2}'`
  # IFS='/' read -r -a baseKey <<< "$fileName"
  # fileName=${baseKey[@]: -1:1}
  # fileName=`echo $fileName|awk -F "." '{printf $1}'`
  fileName=`echo $binUrl|cut -d '"' -f2|rev|cut -d / -f1|cut -d . -f2|rev`

  # mapper to ts_url
  ts_URL=https://embedwistia-a.akamaihd.net/deliveries/${fileName}.ts
  echo $ts_URL

  #download mu38 ts files
  LESSON_NAME=`echo ${LESSON[index]}|cut -d '"' -f2`
  you-get -O egghead-$num-$LESSON_NAME --debug $ts_URL

  if [ $? -ne 0 ]; then
    FAIL_ARRAY+=($ts_URL)
    echo "$url download failed please try again"
  else
    echo "$url download completed"
  fi
done



##############  brefore ###########
# one=1
# for index in "${!DATA[@]}"
# do
#     url=`echo ${DATA[index]} |awk -F '"' '{printf $2}'`
#     num=`expr "$index" + "$one"`
#
#     IFS='/' read -r -a lessons <<< "$URL"
#     LESSON_NAME=`echo $URL | rev | cut -d / -f 1 | rev`
#     echo $url
#     echo "egghead-$num-$LESSON_NAME"
#     you-get --debug $url
#     if [ $? -ne 0 ]; then
#       echo "$url download completed"
#     else
#       echo "$url download failed please try again"
#     fi
# done

# split () {
#   #usage
#
# }


# https://embedwistia-a.akamaihd.net/deliveries/a512be1dfa88e5e13863fc56609ba79080451241.bin
# https://fast.wistia.com/embed/medias/89bjdjfj2k.json?callback=wistiajson1
