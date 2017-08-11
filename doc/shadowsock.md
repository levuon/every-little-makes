# 使用shadowsocks科学上网,构建强大的梯子

#### 面对阻碍和世界交流大墙，只想说 “fuck! Great Firewall of China” ，作为一个要跟上国际步伐的程序员，不只是要会英语，还要学会怎么做梯子，怎么用梯子，当然我也试过很多梯子，比如收费，免费的，fqroute，goagent，可怜后面两个挂了，可是有些收费的就像免费一样坑，梯子时不时就断，感觉就是出钱还给自己挖个坑自己去跳，我们需要强大的梯子shadowsocks,这是一个基于SOCKS协议的应用程序包含了服务器端和客户端


## 安装shadowsocks服务器端

## Google Go 语言环境安装
```sh
 $ sudo yum install git -y
 $ sudo yum install gccgo-go -y
 $ sudo mkdir $HOME/Go
 $ sudo export GOPATH=$HOME/Go
```

## shadowscks服务器
```sh
 $ cd $HOME/Go
 $ sudo go get github.com/shadowsocks/shadowsocks-go/cmd/shadowsocks-server
 $ sudo ./shadowsocks-server #启动服务
```

## 配置服务
```sh
$ vim config.json #编辑配置文件，写入以下示例内容，按实际修改
{
 "server":"127.0.0.1",
 "server_port":8388,
 "local_port":1080,
 "password":"barfoo!",
 "method": "aes-128-cfb",
 "timeout":600
}

启用多个端口的配置
{
 "port_password": {
 "8387": "foobar",
 "8388": "barfoo"
 },
 "method": "aes-128-cfb",
 "timeout": 600
}
```


## 后台运行
```sh
nohup ./shadowsocks-server -c config.json &
```
