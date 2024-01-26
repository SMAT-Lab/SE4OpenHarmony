# requires-port

## 简介
> 一个 Node.js 模块，用于检查给定的协议是否需要指定端口号。

## 下载安装
```shell
ohpm install requires-port@1.0.0
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
1. 引入文件及代码依赖
 ```
 import required from 'requires-port'
 
 required('8080','http')
 required(8080,'ws')
 required(8080,'ftp')
 required(8080,'gopher')
 ```

## 接口说明
* 检查端口
 `required()`


## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
````
|---- requires-port
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                
````
## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/requires-port/LICENSE) ，请自由地享受和参与开源。
