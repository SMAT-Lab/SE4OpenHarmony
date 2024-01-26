# hi-base32Demo

## 简介
本demo是基于openHarmony系统下使用三方js库[hi-base32](https://github.com/emn178/hi-base32)，一个简单的Base32(RFC 4648)编码/解码函数支持UTF-8编码

## 下载安装
```
ohpm install hi-base32
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

```javascript
import base32 from 'hi-base32';

let content:string = 'ABCDEFGHIJKabcdefj123456+/AA==!@';
let encode =base32.encode(content) ;
let deco = base32.decode(encode);
```

## 接口说明

|        方法名        |    入参     | 接口描述  |
|:-----------------:|:---------:|:-----:|
|   encode(data)    | data:编码内容 | 编码 |
|   decode(data)    | data：解码内容 |  解码   |

## 约束与限制
在下述版本验证通过：

DevEco Studio: 4.0(4.0.3.512), SDK: API10(4.0.10.9)。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/hi-base32Demo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。