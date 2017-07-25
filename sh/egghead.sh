#!/bin/bash
# set -x

# API
readonly HOST_API='https://egghead.io/api/v1/lessons/'
NAME_JSON=""


#FAILED
FAIL_ARRAY=()

read -p "please input vedoi url >>  " URL
echo "INPUPT URL:  $URL" >>log.txt 2>> error.txt

# URL="https://egghead.io/lessons/postgresql-find-related-data-with-inner-join-in-postgres"

# get lesson name
# method 1
# IFS='/' read -r -a array <<< "$URL"
# LESSON=${array[@]: -1:1}
# method 2
LESSON=`echo $URL | rev | cut -d / -f 1 | rev`



echo "lesson_name: $LESSON" >>log.txt 2>> error.txt
echo "API: $HOST_API$LESSON/next_up" >>log.txt 2>> error.txt

echo "***********************************************************"
echo "***************************START**************************"
echo "***********************************************************"

# get mu38 json url
DATA=($(curl -s $HOST_API$LESSON/next_up | jq '.list.lessons | .[].media_urls.wistia_url'))

###############  lastest ###########
one=1
for index in "${!DATA[@]}"
do
  #get json name json url
  # DATA=`echo ${DATA[index]}|awk -F '"' '{printf $2}'`
  DATA=`echo ${DATA[index]} | cut -d '"' -f 2`
  # IFS='/' read -r -a key <<< "$DATA"
  NAME_JSON=`echo $DATA | rev | cut -d / -f 1 | rev`


  echo "NAME_JSON: $NAME_JSON"
  num=`expr "$index" + "$one"`

  #real json url
  JSONURL="https://fast.wistia.com/embed/medias/${NAME_JSON}.json?callback=wistiajson1"
  echo $JSONURL

  #real mu38 bin address
  # binUrl=$(curl -s $JSONURL |awk -F '(' '{printf $2}' | awk -F ')' '{printf $1}' | jq '.media.assets | .[4].url')
  binUrl=$(curl -s $JSONURL | cut -d'(' -f2|cut -d')' -f1| jq '.media.assets | .[4].url')
  # binUrl=$(curl -s $JSONURL |awk -F '[()]' '{printf $2}'| jq '.media.assets | .[4].url')
  echo $binUrl


  # fileName=`echo $binUrl|awk -F '"' '{printf $2}'`
  # IFS='/' read -r -a baseKey <<< "$fileName"
  # fileName=${baseKey[@]: -1:1}
  # fileName=`echo $fileName|awk -F "." '{printf $1}'`
  fileName=`echo $binUrl|cut -d '"' -f2|rev|cut -d / -f1|cut -d . -f2|rev`

  # mapper to ts_url
  ts_URL=https://embedwistia-a.akamaihd.net/deliveries/${fileName}.ts
  echo $ts_URL

  #download mu38 ts files
  you-get -O egghead-$num-$LESSON_NAME --debug $ts_URL >>log.txt 2>> error.txt

  if [ $? -ne 0 ]; then
    FAIL_ARRAY+=($ts_URL)
    echo "$url download failed please try again" >>log.txt 2>> error.txt
  else
    echo "$url download completed" >>log.txt 2>> error.txt
  fi
done


# for index in "${!FAIL_ARRAY[@]}"
# do
#   echo "haha ${FAIL_ARRAY[index]}"
# done
#


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
