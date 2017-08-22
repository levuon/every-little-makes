#!/bin/bash


VEDIO_URL=https://vmobile.douyu.com/video/getInfo?vid=
API=https://v.douyu.com/api/swf/getvideourl/


read -p "input mu38 url>>" mu38_url


HOST=`echo $mu38_url| cut -d '/' -f-5`
echo $HOST

curl -o url.txt $mu38_url

total=$(cat url.txt| sed -n "/^[^\#]/p"|wc -l)
echo $total
n=1
while ((n<=$total))
do
  ipaddr[$n]=$(cat url.txt|sed -n "/^[^\#]/p"|sed -n "${n}p"|awk '{print $1}')
  ((n+=1))
done
n=`expr $n - 1`

for index in "${!ipaddr[@]}"
do
  you-get -O "$index-coc" $HOST/${ipaddr[index]} >> log.txt
  wait
  echo "$index-coc.ts*"| tr " " "\n" > tslist
  while read line;
  do
    cat $line >> combined.ts; done < tslist
  rm -rf "$index-coc*"
done


#
# cat url.txt | while read line
# do
#   line=`echo $line | sed -n /^[^\#]/p`
#   # echo "$HOST/$line"
# done
