# Smack
## 简介
>Smack是一个基于XMPP协议的一个聊天客户端

## 效果展示
![效果展示](image/sample.gif)

## 下载安装
```
ohpm install @ohos/smack
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。


## 使用说明

1. 创建后台服务
```
通过https://igniterealtime.org/downloads/地址下载Openfire并安装作为服务器
```


2. 在页面添加引用并设置服务信息

 ```
添加引用：import { Smack } from '@ohos/smack'
设置服务信息，如Constant.ets类中的设置：
static HOST_IP: string = "10.50.40.65"
static HOST_DOMAIN: string = "he-202101111234"
 ```

3. 调用方法

 ```
  1. 注册用户 Smack.registers("10.50.80.58",dongpo_003","test2");
  2. 注销用户 Smack.unregister();
  3. 用户登录 Smack.Login(this.userName + '@' + Constant.HOST_IP, this.passWord);
  4. 用户登出 Smack.loginout();
  5. 修改密码 Smack.changPwd('123456')
  6. 设置用户状态（空闲、在线、离开等） Smack.changePresence(presenceType, this.states[this.select]);
  7. 发送消息 Smack.send(userName, msg)
  8. 接收消息 Smack.registerMessageCallback((id, msg)=>{})
  9. 添加好友到指定分组 Smack.addFriends(this.name + "@" + Constant.HOST_DOMAIN, this.name, this.group);
  10. 删除好友 Smack.delfriend(this.userName + '@' + Constant.HOST_IP);
  11. 好友列表 Smack.getFriendList();
  12. 更改分组名称 Smack.changeGroup(this.oldName, this.newName);
  13. 更改好友分组 Smack.changeFriendGroup(name + "@" + Constant.HOST_DOMAIN, this.newGroup);
  14. 创建群聊群组 Smack.createRoom("444@"+Constant.HOST_IP+Constant.HOST_RES, "room1", Constant.HOST_DOMAIN, Constant.SERVICE_NAME);
  15. 加入群组 Smack.join(); 
  16. 离开群组 Smack.leave("leave msg");
  17. 发送群组消息 Smack.sendGroupMessage("group msg test");
  18. 设置群组主题 Smack.setSubject("subject");
  19. 销毁群组 Smack.destroy("444@"+Constant.HOST_IP+Constant.HOST_RES, "123");
  20. 踢出群组 Smack.kick("555", "kick");
  21. 踢出群组并拉进黑名单 Smack.ban("555", "ban");
  22. 授予发言权限 Smack.grantVoice("555", "grantVoice");
  23. 移除发言权限 Smack.revokeVoice("555", "revokeVoice");
  24. 岗位设置 Smack.setAffiliation("555", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
  25. 角色设置 RoleModerator Smack.setRole("888", MUCRoomRole.RoleModerator, "RoleModerator");
  26. 邀请成员 Smack.invite("777"+this.service, "invite");
  27. 获取全部群组成员 Smack.getRoomItems();
  28. 过滤群组成员 Smack.requestList(MUCOperation.RequestOwnerList);
  29. 拒绝加入群组 Smack.declineInvitation("888_room@"+Constant.SERVICE_NAME+"."+Constant.HOST_DOMAIN, "888@"+Constant.HOST_DOMAIN, "room inviation refuesd");
  30. 创建并加入群组 Smack.createOrJoinRoom("room4", Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");
  31. 加入密码群组时使用密码 Smack.setPassword("123123");
  32. 获取加入群聊的群组信息 Smack.getRoomInfo();
  33. 获取群组配置 Smack.requestRoomConfig();
  34. 设置群聊配置 Smack.setRoomConfig(JSON.stringify(this.roomConfig));
  35. 从该聊天室踢出用户群 Smack.bans("888,555", "bans");
  36. 更改聊天室成员的昵称 Smack.setNick("new_nike_name");
  37. 目前是否在多人聊天中 Smack.isJoined();
  38. 返回房间里用户的昵称 Smack.nick();
  39. 是否连接 Smack.isConnected();
  40. 用户名称 Smack.username();
  41. 建立连接 Smack.connect();
  42. 设置域名或ip Smack.setServer(Constant.HOST_IP);
  43. 输入用户名和密码 Smack.setUsernameAndPassword("zhang", "123456");
  44. 设置端口号 Smack.setPort(Constant.HOST_PORT);
  45. 获取密码 Smack.password();
  46. 设置Resource Smack.setResource(Constant.HOST_RES.replace("/",""));
  47. 多人角色设置 Smack.setRoles(this.getUsers(), MUCRoomRole.RoleParticipant, "RoleParticipant");
  48. 多人语音授权 Smack.grantVoices(this.getUsers(), "grantVoices");
  49. 多人语音授权撤销 Smack.revokeVoices(this.getUsers(), "revokeVoices");
  50. 多人从属关系设置 Smack.setAffiliations("555,333", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");
  51. 获取端口号 Smack.port();
  52. 获取ip或域名 Smack.server();
  53. 接受好友添加请求 Smack.receiveFriends("444@"+Constant.HOST_DOMAIN, "group", msg: "accept")
  54. 拒绝好友添加请求 Smack.rejectFriends("444@"+Constant.HOST_DOMAIN, “reject”)
  
 ```


## 接口说明

1. 注册用户 `Smack.registers("dongpo_003","test2");`
2. 注销用户 `Smack.unregister();`
3. 用户登录 `Smack.Login(this.userName + '@' + Constant.HOST_IP, this.passWord);`
4. 用户登出 `Smack.loginout();`
5. 修改密码 `Smack.changPwd('123456')`
6. 设置用户状态（空闲、在线、离开等） `Smack.changePresence(presenceType, this.states[this.select]);`
7. 发送消息 `Smack.send(userName, msg)`
8. 接收消息 `Smack.registerMessageCallback((id, msg)=>{})`
9. 添加好友到指定分组 `Smack.addFriends(this.name + "@" + Constant.HOST_DOMAIN, this.name, this.group);`
10. 删除好友 `Smack.delfriend(this.userName + '@' + Constant.HOST_IP);`
11. 好友列表 `Smack.getFriendList();`
12. 更改分组名称 `Smack.changeGroup(this.oldName, this.newName);`
13. 更改好友分组 `Smack.changeFriendGroup(name + "@" + Constant.HOST_DOMAIN, this.newGroup);`
14. 创建群聊群组 `Smack.createRoom("444@"+Constant.HOST_IP+Constant.HOST_RES, "room1", Constant.HOST_DOMAIN, Constant.SERVICE_NAME);`
15. 加入群组 `Smack.join();`
16. 离开群组 `Smack.leave("leave msg");`
17. 发送群组消息 `Smack.sendGroupMessage("group msg test");`
18. 设置群组主题 `Smack.setSubject("subject");`
19. 销毁群组 `Smack.destroy("444@"+Constant.HOST_IP+Constant.HOST_RES, "123");`
20. 踢出群组 `Smack.kick("555", "kick");`
21. 踢出群组并拉进黑名单 `Smack.ban("555", "ban");`
22. 授予发言权限 `Smack.grantVoice("555", "grantVoice");`
23. 移除发言权限 `Smack.revokeVoice("555", "revokeVoice");`
24. 岗位设置 `Smack.setAffiliation("555", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");`
25. 角色设置 `RoleModerator Smack.setRole("888", MUCRoomRole.RoleModerator, "RoleModerator");`
26. 邀请成员 `Smack.invite("777"+this.service, "invite");`
27. 获取全部群组成员 `Smack.getRoomItems();`
28. 过滤群组成员 `Smack.requestList(MUCOperation.RequestOwnerList);`
29. 拒绝加入群组 `Smack.declineInvitation("888_room@"+Constant.SERVICE_NAME+"."+Constant.HOST_DOMAIN, "888@"+Constant.HOST_DOMAIN, "room inviation refuesd");`
30. 创建并加入群组 `Smack.createOrJoinRoom("room4", Constant.HOST_DOMAIN, Constant.SERVICE_NAME, "123");`
31. 加入密码群组时使用密码 `Smack.setPassword("123123");`
32. 获取加入群聊的群组信息 `Smack.getRoomInfo();`
33. 获取群组配置 `Smack.requestRoomConfig();`
34. 设置群聊配置 `Smack.setRoomConfig(JSON.stringify(this.roomConfig));`
35. 从该聊天室踢出用户群 `Smack.bans("888,555", "bans");`
36. 更改聊天室成员的昵称 `Smack.setNick("new_nike_name");`
37. 目前是否在多人聊天中 `Smack.isJoined();`
38. 返回房间里用户的昵称 `Smack.nick();`
39. 是否连接 `Smack.isConnected();`
40. 用户名称 `Smack.username();`
41. 建立连接 `Smack.connect();`
42. 设置域名或ip `Smack.setServer(Constant.HOST_IP);`
43. 输入用户名和密码 `Smack.setUsernameAndPassword("zhang", "123456");`
44. 设置端口号 `Smack.setPort(Constant.HOST_PORT);`
45. 获取密码 `Smack.password();`
46. 设置Resource `Smack.setResource(Constant.HOST_RES.replace("/",""));`
47. 多人角色设置 `Smack.setRoles(this.getUsers(), MUCRoomRole.RoleParticipant, "RoleParticipant");`
48. 多人语音授权 `Smack.grantVoices(this.getUsers(), "grantVoices");`
49. 多人语音授权撤销 `Smack.revokeVoices(this.getUsers(), "revokeVoices");`
50. 多人从属关系设置 `Smack.setAffiliations("555,333", MUCRoomAffiliation.AffiliationOwner, "AffiliationOwner");`
51. 获取端口号 `Smack.port();`
52. 获取ip或域名 `Smack.server();`
53. 接受好友添加请求 `Smack.receiveFriends("444@"+Constant.HOST_DOMAIN, "group", msg: "accept")`
54. 拒绝好友添加请求 `Smack.rejectFriends("444@"+Constant.HOST_DOMAIN, “reject”)`

## 源码下载
1. 本项目依赖 gloox 库，通过`git submodule`引入，下载代码时需加上`--recursive`参数。
  ```
  git clone --recursive https://gitee.com/openharmony-tpc/openharmony_tpc_samples.git
  ```
2. Linux环境无需执行该步骤，如果是windows环境下，代码下载完成后合入OHOS适配的代码，cd 进入到ohos_smack/library/src/main/cpp/thirdModule 目录下，执行 modify.sh 脚本，将本目录下的 patch 文件合入到 gloox 源码中。
3. 开始编译项目。

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)
- OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
```
|---- ohos_smack
|     |---- entry  # 示例代码文件夹
|     |---- library  # smack库文件夹
|               |----cpp # C++代码文件夹
|                    |----gloox # C++代码实现文件夹
|                    |----types # 对外接口
|               |----ets # 对外接口
|           |---- index.ets  # 对外接口
|     |---- README.MD  # 安装使用方法
```

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然也非常欢迎您
发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 给我们。

## 开源协议
本项目基于 [GPL 3.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/ohos_smack/LICENSE)。