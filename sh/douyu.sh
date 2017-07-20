#!/bin/bash

# URL=""
# wget ${URL}/65189_500{0..165}.ts &
# wait
# echo 65189_500{0..165}.ts | tr " " "\n" > tslist
# while read line; do cat $line >> combined.ts; done < tslist

read -p "please input the url>>    " URL
read -p "please input the number>> " NUMBER
read -p "please input save fileName>> " NAME

HOST=`echo $URL | awk -F '0000000' '{print $1}'`
PREFIX=`echo $HOST| awk -F "/" '{printf $6}'`
QUERY=`echo $URL | awk -F '0000000' '{print $2}'`
echo "HOST: $HOST"
echo "QUERY: $QUERY"


# HOST=""
# PREFIX=""
# QUERY=""
# NUMBER="2"
echo "****** PREPARE START *************"


echo "****** START LOOP *************"
for k in $( seq 437 $NUMBER )
do
  fileNum=`echo $k |awk '{printf ("%07d\n", $1)}'`
  # echo ${fileNum}${QUERY}
  URL_HTTP="${HOST}${fileNum}${QUERY}"
  you-get $URL_HTTP
  wait
  echo ${PREFIX}${fileNum}${QUERY}| tr " " "\n" > tslist
  while read line; do cat $line >> combined.ts; done < tslist
done

rm ${PREFIX}*

ffmpeg -i combine.ts -c:v libx264 -c:a copy -bsf:a aac_adtstoasc $NAME.mp4
rm combined.ts

echo '######## END'
