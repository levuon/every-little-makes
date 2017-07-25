# every-little-makes
🌞
master

## 1: 下载斗鱼录像

  利用 chromeDevTool 获取mu38 视频地址
  eg: http://vodhls1.douyucdn.cn/live/normal_live-311686rePzUCAMs7--20170111193343/playlist.m3u8?k=92f321c24d20e8e60f425c26d21c4f1c&t=59706b7b&u=18481816&ct=web_share&vid=147367&d=EFEC3B7B3EA69F5A373D55C037F7BFE3
  取第一个ts的地址
  http://vodhls1.douyucdn.cn/live/normal_live-311686rePzUCAMs7--20170111193343/13b3a42cd8684a3da4bc8e7dd1c1d34e_0000000.ts?k=92f321c24d20e8e60f425c26d21c4f1c&t=59706b7b&u=18481816&ct=web_share&vid=147367&d=EFEC3B7B3EA69F5A373D55C037F7BFE3

  ```sh
    $ ./sh/douyu.sh
    please input the url>> http://videows1.douyucdn.cn/live/normal_2169679120170701223056-upload-e259/76ba471122d944668a684cb6ada96648_0000000.ts?k=72dbcd135ccbafae6968377dca05932e&t=596f17e2&u=18481816&ct=web_share&vid=917849&d=EFEC3B7B3EA69F5A373D55C037F7BFE3

    // 在mu38 list查看有个ts文件
    please input the number>> 1111
    //保存文件名称
    please input save fileName>> xxx
  ```

  eg: http://videows1.douyucdn.cn/live/normal_2169679120170701223056-upload-e259/76ba471122d944668a684cb6ada96648_0000000.ts?k=72dbcd135ccbafae6968377dca05932e&t=596f17e2&u=18481816&ct=web_share&vid=917849&d=EFEC3B7B3EA69F5A373D55C037F7BFE3


## 2: 下载egghead free vedio
 1. exec egghead.sh
 ```sh
  $ ./sh/egghead.sh
  please input vedoi url>> https://egghead.io/lessons/postgresql-find-lonely-postgres-data-with-left-and-right-join
 ```
