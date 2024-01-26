## POP3

### 介绍

支持pop3协议的邮件客户端库，允许客户端进行登录/退出邮箱，获取邮件列表，获取邮件详情，以及删除邮件等操作。

## 下载安装

```shell
ohpm install @ohos/node-pop3 
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

注意：全局搜索项目中的‘xxx’，需要替换修改为真实的邮箱，账号密码。

#### 导入library

```
import Pop3Command from '@ohos/node-pop3'
```

#### 初始化请求参数

```typescript
 let option = {
    host:  `pop.qq.com`, //根据不同的邮箱类型调整 例如 pop.163.com  pop.126.com
    port: 110,  //tls为false 110端口  tls为true 995端口
    user: 'xxx@qq.com', //根据实际邮箱填写 需要和host的邮箱类型对应
    password: 'xxxxxx', // 注意区分不同邮箱的规则 有些是使用账号密码  有些是使用授权码
    timeout: 30000,
    servername:  `pop.qq.com`, // 同host
    tls: false,  // 加密请求需要设置为false
    tlsOptions: undefined //tls为true需要设置该参数，类型为@ohos.net.socket模块的TLSConnectOptions
  }
```

#### 初始化客户端

```typescript
 let client = new Pop3Command(option);
```

本库的请求过程封装在library内部，用户可以直接调用指令完成相关的操作，无需另外进行连接登录操作。

#### 检查与服务器的连接状态

```typescript
 await client.NOOP()
 console.log(`pop3---NOOP命令执行成功--->`)
```

#### 获取当前邮箱内的所有未读邮件状态

```typescript
let result = await client.STAT()
console.log(`pop3---STAT命令执行成功--->${result}`)
```

如果邮箱内存在未读邮件，结果是以空格连接，前面是未读邮件个数，后面是未读邮件总字节数

#### 获取邮件列表

```typescript
let result = await client.LIST()
console.log(`pop3---LIST命令执行成功--->`)
```

如果存在有未读邮件，返回的结果以,连接，奇数位为邮件序号，偶数位为该邮件的字节数。

#### 获取邮件详情

```typescript
 let result = awaitclient.RETR(this.selectMsgNum + '')
```

参数为邮件序号，获取的响应结果是经过编码处理的，需要自行解析。

#### 获取邮件前N行

```typescript
 let result = await client.TOP(this.selectMsgNum + '', parseInt(this.topLine))
```

参数为邮件序号以及前topLine，获取的响应结果是经过编码处理的，需要自行解析。

#### 给邮件添加删除标记

```typescript
 let result = await client.DELE(this.selectMsgNum + '')
```

给邮件添加删除标记之后并不会立马删除，还需要调用QUIT指令才可以生效。

#### 退出登录

```typescript
 const [quitInfo] = await client.QUIT();
```

退出登录，并为添加了DELE标记的邮件执行删除操作。



### 接口说明

API

| 接口名              | 参数                 | 返回值 | 描述                                                                      |
|--------------------|-----|-------------------------------------------------------------------------|-------------------------------------------------------------------------|
| listify | str | string[] | 将结果解析为字符串数组                                                      |
| QUIT   | 无       | 无  | 发送QUIT命令，退出登录并与服务器断开连接                                     |
| command | ...args | Promise<[string,Readable]> | 发送客户端指令到邮件服务器，并接收响应返回给客户端                    |
| stream2String | stream | Promise< string > | 将响应数据流转换为string                                |
| DELE | msgNumber           | Promise< string >              | 发送DELE指令，在某封邮件上设置删除标记                       |
| LIST          | msgNumber           | Promise< string[][]\|string[]> | 发送LIST指令,获取邮件列表，列表数据仅包含邮件序号以及邮件字节数 |
| UIDL          | msgNumber           | Promise< string >              | 发送UIDL指令，获取邮件的uid                                  |
| NOOP          | 无                  | 无                             | 发送NOOP指令，检查客户端与服务器连接状态                     |
| RSET          | 无                  | 无                             | 发送RSET指令，用于清除所有邮件的删除标记                     |
| TOP           | msgNumber，numLines | Promise< string >              | 发送TOP指令，获取某个邮件的前numLines行                      |
| STAT          | 无                  | Promise< string >              | 发送STAT指令，获取邮箱所有未读邮件信息，包含未读邮件个数，未读邮件总字节数 |
| RETR          | msgNumber           | Promise< string >              | 发送RETR指令，获取某封邮件的内容                             |
| connect       | 无                  | string                         | 发起请求连接邮件服务器                                       |

更多模块的使用可参考[官方文档](https://github.com/node-pop3/node-pop3/blob/master/README.md)，[单元测试用例](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/node-pop3/TEST.md)详情可参考

### 约束与限制

在下述版本验证通过：

DevEco Studio: 4.0 Release(4.0.3.413), SDK: API10 (4.0.10.3)

支持的邮箱类型：QQ邮箱、163邮箱、126邮箱。

### 软件架构

```
|-entry 
    |-ets
    |   |-entryability
    |           |-EntryAbility.ts
    |   |-pages
    |           |-Index.ets             #设置请求参数
    |           |-AutoLoginCommandPage.ets   #主要功能演示界面
|-POP3   # pop3协议lib         
```

### 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

### 开源协议

本项目基于 [MIT license](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/node-pop3/LICENSE) ，请自由地享受和参与开源。

