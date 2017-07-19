# mac 环境搭建

## 安装homebrew, node, npm， git

mac 安装这些挺方便的，当回帮运工

[node](http://www.jianshu.com/p/20ea93641bda)

mac 系统一般自带git，直接在terminal输入git命令即可，如果没有安装过，terminal将会提示你安装。

[git]()


##  启动项目

首先在本地生产SSH KEY,并将公匙 复制到你的gitlab 帐号里面的SSH KEY中。
1. [ssh key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

2. [添加公匙](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)


添加好公匙后就可以下载项目。打开terminal(以web-hangban为例)
```sh
  yourProjectPath $ git clone ssh://git@gitlab.huolih5.com:6022/hangban/web-hangban.git

  // 进入项目目录
  yourProjectPath $ cd web-hangban
  // 安装依赖包
  yourProjectPath $ npm install
  // 初始化submodule
  yourProjectPath $ git submodule init
  // 更新submodule
  yourProjectPath $ git submodule update
  // 一切准备就绪 🚀🚀🚀🚀🚀🚀🚀
  yourProjectPath $ gulp serve
```

## debug (以下提到浏览器都是chrome浏览器)

### prepare

每次启动都需要手机验证码才能登录。可以在http的header 自动添加 AuthCode

1. 通过手机验证码登陆一次
2. 在测试服务器查询日志里登录的 Basic信息

```sh
  ~ $ ssh tangq@221.235.53.164
  tangq@221.235.53.164\'s password🗝: tangq)!08
  -bash-4.1$ cd .pm2/logs/hangban
  -bash-4.1$ grep 'your phone number' hangban-out.logs | grep -o 'Basic .*\='
  Basic Q0QxNjk0MTEwOUVFNTNERTNDNUIxMzdFRTlCNzMxQkI=
```

浏览器安装plugin(`Smart Header`)

### browser debug

项目启动后 会自动在浏览器打开项目初始化页面
[localhost:4001/flights?name=flights/query](localhost:4001/flights?name=flights/query)
就可以在浏览器的chromeDevTool调试前端代码

### native debug

有些功能是需要调用native方法的，所以必须要使用app打开我们的页面。
app加载一次后，项目会将app加载过程缓存起来。这样可以在浏览器调试

1. 在手机安装app(`iso: 必须用safari浏览器打开，android：待定`) 航班管家测试版地址: https://rpt.rsscc.com/d/hbgj_beta.html

2. 在浏览器安装二维码plugin(`QR Code Generato`)。

3. 获取本机ip， 找@徐洋徐老师, 把你的ip配置到nginx里。
YOURNAME: 你的名字(需要在nginx配置)
https://wtest.133.cn/dev/YOURNAME/hangban/flights?name=flights/query

这样就可以使用app的扫描二维码加载你测试页面

### node debug

  [具体参考](http://gitlab.huolih5.com/hangban/team-wiki/wikis/vscode-node-debug)



## 抓包
