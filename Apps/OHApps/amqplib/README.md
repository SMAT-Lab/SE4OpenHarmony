# amqplib

## 简介

> 本软件是参照开源软件 [amqplib](https://github.com/amqp-node/amqplib) 源码并用 TypeScript 语言实现了相关功能，在OpenHarmony上支持AMQP（Advanced Message Queuing Protocol）网络通信协议的library，可以在一个进程间传递异步消息。

## 下载安装

1. 参考安装教程 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

2. 安装命令如下：

   ```
   ohpm install @ohos/amqplib
   ```
   
## 使用说明
### 使用前言
1. 需要搭建RabbitMQ环境，请根据该参考链接安装环境：https://zhuanlan.zhihu.com/p/381644577

2. RabbitMQ与Erlang是存在版本对应关系，两者版本如果不对应会出现许多问题，详见：https://www.rabbitmq.com/which-erlang.html

3. 可参考版本对应关系：

   1. RabbitMQ版本为"rabbitmq-server-3.10.7.exe"，下载链接：https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.10.7
   2. Erlang版本为"otp_win64_25.0.exe"，下载链接：https://www.erlang.org/patches/otp-25.0

4. 由于RabbitMQ默认的guest只能从localhost连接不能使用远程连接，官方给出的解决方案是通过配置文件修改RabbitMQ的配置，以下是修改步骤：

   1. 找到RabbitMQ的安装目录，以rabbitmq-server-3.10.7为例；

   2. 在\rabbitmq_server-3.10.7\etc下有个README.txt文件，通过文件指引找到"真正"的RabbitMQ；

   3. 在C:\Users\%USERNAME%\AppData\Roaming\RabbitMQ目录下新建一个配置文件：rabbitmq.config，并写入：

      ```
      [{rabbit, [{loopback_users, []}]}].
      ```

   4. 保存并退出；

   5. 重启RabbitMQ服务：

      1. win键+R输入cmd，打开命令行窗口；

      2. 输入以下命令打开电脑服务；

         ```
         SERVICES.MSC
         ```

      3. 找到RabbitMQ单击并点击重启动此服务；

5. 测试机需联网并且与服务器的ip地址需要相同；

6. 编译并安装hap包到测试机即可进行用例测试；

7. 具体使用demo请参考开源库sample页面的实现；

## 接口说明

* Connection - 表示AMQP连接的接口，包含了连接的方法和事件。
* Channel - 表示AMQP通道的接口，包含了通道的方法和事件。
* createChannel - 创建通讯管道。
* Channel.close - 关闭通讯管道
* Connection.close - 关闭连接
* assertQueue - 声明队列
* checkQueue - 检查队列
* deleteQueue - 删除队列
* purgeQueue - 清除队列
* bindQueue - 绑定队列
* unbindQueue - 解绑队列
* assertExchange - 声明交换机
* checkExchange - 检查交换机
* deleteExchange - 删除交换机
* bindExchange - 绑定交换机
* unbindExchange - 解绑交换机
* publish - 发送消息
* sendToQueue - 发送消息到队列
* consume - 订阅消息
* cancel - 取消订阅
* get - 获取消息体
* ack - 确认消息已被消费
* ackAll -  确认所有未确认的消息已被消费
* nack -  否定消息，表示消息未被成功消费
* nackAll - 否定所有未确认的消息，表示这些消息未被成功消费
* reject - 拒绝消息，表示消息未被成功消费
* prefetch - 设置消费者的预取数量，即一次从队列中获取的消息数量
* recover - 重新投递未被确认的消息，使其重新进入队列等待消费


## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317) OpenHarmony SDK:API11 (4.1.0.36)


## 目录结构

```
|---- amqplib 
|     |---- entry  # 示例代码文件夹
|     |---- library  # amqplib库文件夹
|           |---- ets
|                 |---- lib  # 主要依赖
|                 |---- types  # 对外接口文件夹
|                       |---- callback_api.d.ts  # 交换机连接交互相关接口文件
|                       |---- index.d.ts  # 主对外接口文件
|                       |---- properties.d.ts  # 参数类型等对外声明文件
|                 |---- callback_api.js  # callback回调脚本
|                 |---- channel_api.js  # promise回调脚本
|     |---- README.md  # 安装使用方法
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT LICENSE](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/amqplib/LICENSE) ，请自由地享受和参与开源。
