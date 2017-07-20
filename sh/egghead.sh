#!/bin/bash

HOST_API='https://egghead.io/api/v1/lessons/'


read -p "please input vedoi url >>  " URL
echo "URL: $URL"
URL='https://egghead.io/lessons/postgresql-find-postgres-data-that-doesn-t-match-join-conditions-with-full-outer-join'
IFS='/' read -r -a array <<< "$URL"

LESSON=${array[@]: -1:1}
echo "lesson_name: $LESSON"
echo "API: $HOST_API$LESSON/next_up"

echo "***********************************************************"
echo "***************************START**************************"
echo "***********************************************************"


declare -a DATA=($(curl -s $HOST_API$LESSON/next_up | jq '.list.lessons | .[].http_url'))


one=1

for index in "${!DATA[@]}"
do
    url=`echo ${DATA[index]} |awk -F '"' '{printf $2}'`
    num=`expr "$index" + "$one"`

    IFS='/' read -r -a lessons <<< "$URL"
    LESSON_NAME=${lessons[@]: -1:1}
    echo $url
    echo "egghead-$num-$LESSON_NAME"
    you-get --debug $url
    if [ $? -ne 0 ]; then
      echo "$url download completed"
    else
      echo "$url download failed please try again"
    fi
done




# DATA=$(wget -O - -q -t 1 https://egghead.io/api/v1/lessons/postgresql-find-postgres-data-that-doesn-t-match-join-conditions-with-full-outer-join/next_up)
# DATA=$(curl -s 'https://egghead.io/api/v1/lessons/postgresql-find-postgres-data-that-doesn-t-match-join-conditions-with-full-outer-join/next_up')
# url='https://egghead.io/api/v1/lessons/postgresql-find-postgres-data-that-doesn-t-match-join-conditions-with-full-outer-join/next_up'
# curl -s "$url" | egrep -m 1 '"current_lesson": "\K[^"]*'

#
# DATA=$(curl -s 'https://egghead.io/api/v1/lessons/postgresql-find-postgres-data-that-doesn-t-match-join-conditions-with-full-outer-join/next_up' | jq '{lessons: .list.lessons}')
# echo $DATA
