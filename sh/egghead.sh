#!/bin/bash


# API
HOST_API='https://egghead.io/api/v1/lessons/'
NAME_JSON=""


#FAILED
FATI_ARRAY=()

read -p "please input vedoi url >>  " URL
echo "INPUPT URL:  $URL"

# URL="https://egghead.io/lessons/postgresql-find-related-data-with-inner-join-in-postgres"

# get lesson name
IFS='/' read -r -a array <<< "$URL"
LESSON=${array[@]: -1:1}

echo "lesson_name: $LESSON"
echo "API: $HOST_API$LESSON/next_up"

echo "***********************************************************"
echo "***************************START**************************"
echo "***********************************************************"

# get mu38 json url
declare -a DATA=($(curl -s $HOST_API$LESSON/next_up | jq '.list.lessons | .[].media_urls.wistia_url'))

###############  lastest ###########
one=1
for index in "${!DATA[@]}"
do
  #get json name json url
  DATA=`echo ${DATA[index]}|awk -F '"' '{printf $2}'`
  IFS='/' read -r -a key <<< "$DATA"
  NAME_JSON=${key[@]: -1:1}


  echo "NAME_JSON: $NAME_JSON"
  num=`expr "$index" + "$one"`

  #real json url
  JSONURL="https://fast.wistia.com/embed/medias/${NAME_JSON}.json?callback=wistiajson1"
  echo $JSONURL

  #real mu38 bin address
  binUrl=$(curl -s $JSONURL |awk -F '(' '{printf $2}' | awk -F ')' '{printf $1}' | jq '.media.assets | .[4].url')
  echo $binUrl


  fileName=`echo $binUrl|awk -F '"' '{printf $2}'`
  IFS='/' read -r -a baseKey <<< "$fileName"
  fileName=${baseKey[@]: -1:1}
  fileName=`echo $fileName|awk -F "." '{printf $1}'`
  # mapper to ts_url
  ts_URL=https://embedwistia-a.akamaihd.net/deliveries/${fileName}.ts
  echo $ts_URL

  #download mu38 ts files
  you-get -O egghead-$num-$LESSON_NAME --debug $ts_URL

  if [ $? -ne 0 ]; then
    FATI_ARRAY+=($ts_URL)
    echo "$url download failed please try again"
  else
    echo "$url download completed"
  fi
done



###############  brefore ###########
# one=1
# for index in "${!DATA[@]}"
# do
#     url=`echo ${DATA[index]} |awk -F '"' '{printf $2}'`
#     num=`expr "$index" + "$one"`
#
#     IFS='/' read -r -a lessons <<< "$URL"
#     LESSON_NAME=${lessons[@]: -1:1}
#     echo $url
#     echo "egghead-$num-$LESSON_NAME"
#     you-get --debug $url
#     if [ $? -ne 0 ]; then
#       echo "$url download completed"
#     else
#       echo "$url download failed please try again"
#     fi
# done



# https://embedwistia-a.akamaihd.net/deliveries/a512be1dfa88e5e13863fc56609ba79080451241.bin
# https://fast.wistia.com/embed/medias/89bjdjfj2k.json?callback=wistiajson1
