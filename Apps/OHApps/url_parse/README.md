# url-parse

## 简介
> 占用空间小的URL解析器，可以在Node.js和浏览器环境中无缝工作。

## 下载安装
```shell
ohpm install url-parse
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
1. 绝对或相对URL的字符串
 ```
 import URLParse from "url-parse"
 
 const url = new URLParse('https://www.example.com:8080/path?param1=value1&param2=value2#section');
 
 ```

## 接口说明
- Url(address, location, parser) 根据入参生成一个Url对象
- set(part, value, fn) 设置URL的指定部分的值
- toString(stringify):string 将属性转换回有效的完整URL字符串
- lolcation(loc) 解析了一个URL字符串，并将解析后的对象赋值给urlObj变量。然后，我们可以通过访问urlObj的属性来获取URL的各个部分，例如协议、主机、端口、路径和查询参数等
- extractProtocol(address, location) 用于从给定的URL地址中提取协议部分

## 目录结构
````
|---- url_parse
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317), OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。
## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/url_parse/LICENSE) ，请自由地享受和参与开源。
