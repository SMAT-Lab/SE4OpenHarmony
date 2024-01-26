# 仿应用示例

### 介绍

仿应用给用户提供团购、外卖服务，用户可以查看商品详情并选择商品下单支付、拨打商家或者骑手电话、评论商品、分享商品。

### 效果预览

| 首页                                                        | 扫描                                                                            | 信息展示                                                                          | 
|-----------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| ![首页.png](screenshots%2Fdevices%2F%E9%A6%96%E9%A1%B5.png) | ![扫描界面.png](screenshots%2Fdevices%2F%E6%89%AB%E6%8F%8F%E7%95%8C%E9%9D%A2.png) | ![信息界面.png](screenshots%2Fdevices%2F%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2.png) |

使用说明

1、用户登录，账号密码通过跳转首页;

2、点击团购买菜买水果，可查看商家商品信息，再点击右上角图标可以查看团购站点信息;

3、团购界面点餐--选择商品--添加到购物车;

4、在商家商品界面点击右上角，可以选择拨打商家电话，拉起电话应用，并自动补全要拨打的手机号码；

5、在商家商品界面点击右上角，用户可以分享商品拉起一个外部的应用；

6、在商品界面，用户添加商品到购物车后可以支付订单拉起一个外部的应用；

7、在商品界面，用户点击评论，可以查看多用户评论内容。

### 目录结构

```
AppSampleE/src/main/ets/
|---controller
|   |---BusinessController.ts                    // 获取商家信息
|   |---GroupBuyController.ts                    // 获取站点信息
|   |---LoginController.ts                       // 负责登录
|---data
|   |---Car.ts                                   // 购物车实体
|   |---Commodity.ts                             // 商品实体
|   |---LoginResult.ts                           // 登录信息实体
|   |---R.ts                                     // 返回结果信息实体
|   |---Server.ts                                // 返回数据实体合集
|---model
│   |---NetworkModel.ts                          // 负责网络通信等操作
|---pages
|   |---buy                               
|       |---Buy.ets                              // 自提商家商品界面
|       |---SelfPickUp.ets                       // 自提站点界面
|   |---login                               
|       |---Login.ets                            // 登陆界面
|   |---takeaway                               
|       |---Business.ets                         // 外卖商家界面
|       |---Commodity.ets                        // 商品、评论界面
|       |---ProductDetails.ets                   // 商品详情界面
|   |---Index.ets                                // 首页
|---utils
|   |---Constant.ts                              // 常量定义帮助类
|   |---DateTimeUtil.ts                          // 时间帮助类
|   |---Logger.ts                                // 日志帮助类
|   |---PermissionUtils.ts                       // 权限帮助类
|   |---ResourceDataHandle.ts                       // 资源帮助类
```

### 具体实现

- 网络连接合请求：@ohos.net.http
- 消息接收：@ohos.net.webSocket
- 获取定位服务：@ohos.geoLocationManager 

### 相关权限

网络权限: ohos.permission.INTERNET  
位置权限: ohos.permission.LOCATION
位置权限: ohos.permission.APPROXIMATELY_LOCATION

### 依赖

1. windows上启动服务器前端代码，模拟消息转发服务器[服务器前端目录](../../../../jeecgboot-vue3-master)
2. windows上启动服务器后端代码，模拟消息转发服务器[服务器后端目录](../../../../jeecg-boot-master)

### 约束与限制

1.本示例仅支持标准系统上运行,支持设备:RK3568；

2.本示例已适配API10版本SDK,版本号：4.0.8.5,镜像版本号：OpenHarmony4.0.8.5；

3.本示例需要使用DevEco Studio 3.1 Release (Build Version: 3.1.0.500, built on April 28, 2023)才可编译运行；

4.局域网发生变化，需要修改Constant里的ip地址。

### 下载

如需单独下载本工程，执行如下命令：

```
git init
git config core.sparsecheckout true
echo sample/AppSampleE/ > .git/info/sparse-checkout
git remote add origin https://gitee.com/openharmony/xts_tools.git
git pull origin master
```

