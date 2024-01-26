# stun

## 简介
> stun是基于STUN协议的服务开源组件，它允许客户端获取NAT分配的外部IP地址和端口号，还可以识别NAT的行为类型。

## 效果展示
![avatar](screenshot/效果展示.png)

## 下载安装
```shell
ohpm install @ohos/stun
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

##### 代码依赖

```
import { StunServer, StunClient } from '@ohos/stun';
...
//创建并启动server
@State serverMessage: string = "Tip: Click 'node-stun-server' to display the server log";
stunServer: StunServer = null;
private createServer() {
  var self = this;
  if (self.stunServer) {
    return;
  }
  self.serverMessage = "";
  self.stunServer = new StunServer();
  self.stunServer.setServerMessageListener({ onMessageChanged(serverMessage: string) {
    self.serverMessage += serverMessage + "\n";
  } });
  self.stunServer.createServer(this.newDefaults);
}
...
//创建并启动client
@State clientMessage: string = "Tip: Click 'node-stun-client' to display the client log";
stunClient: StunClient = null;
private createClient() {
  var self = this;
  self.clientMessage = "";
  prompt.showToast({ message: "node-stun-client", duration: 3000 });
  if (!self.stunClient) {
    self.stunClient = new StunClient();
    self.stunClient.setClientMessageListener({ onMessageChanged(clientMessage: string) {
      self.clientMessage += clientMessage + "\n";
    } });
  }
  self.stunClient.createClient(this.clientAddress, this.serverInfo);
}
...
```

## 接口说明
1. 创建STUN server

   `createServer() `

2. 设置STUN server的消息回调接口

   `public setServerMessageListener(onServerMessageListener: OnServerMessageListener)`

3. 监听来自客户端的STUN请求
   `listen()`

4. 关闭STUN server
   `close()`

5. 创建STUN client
   `createClient()`

6. 设置STUN client的消息回调接口
   `public setClientMessageListener(onClientMessageListener: OnClientMessageListener)`

7. 设置NAT的地址和端口
   `setServerAddr(addr, port)`

8. 开启NAT探测
   `start(option, cb)`

9. 获取映射的地址是否是本地地址
   `isNatted()`

10. 获取 STUN server返回的映射地址和端口
      `getMappedAddr()`

11. 获取NAT绑定类型
    `getNB()`

12. 获取节点过滤类型
    `getEF()`

13. 获取NAT类型的名称
    `getNatType()`

14. 获取在NAT探测期间测量的 RTT（往返时间）
    `getRtt()`

15. 关闭STUN client
    `close(callback)`

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
````
|---- stun  
|     |---- entry  # 示例代码文件夹
|     |---- library  # stun库文件夹
|           |---- src/main/ets/common
|                 |---- node-stun  
|                       |---- bin  # 对外提供的server和client调用接口
|                             |---- StunServer.ets  # 对外提供的server调用接口
|                             |---- StunClient.ets  # 对外提供的client调用接口
|                       |---- lib  # 关键代码
|                             |---- Server.ets  # server关键代码
|                             |---- Client.ets  # client关键代码
|                             |---- Const.ets   # 常量类
|                             |---- Logger.ets  # 处理log信息
|                             |---- Message.ets # 消息类
|                             |---- Utils.ets   # 工具类
|                       |---- Index.ets  # 封装创建lib中的server和client
|           |---- index.ets  # 对外接口
|     |---- README.md  # 安装使用方法                    
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [Apache License 2.0](https://gitee.com/hihopeorg/stun-server/blob/master/LICENSE) ，请自由地享受和参与开源。