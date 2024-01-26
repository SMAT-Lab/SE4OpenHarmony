# hex-encode-decodeDemo

## 简介
本demo是基于openHarmony系统下使用三方js库[hex-encode-decode](https://github.com/tiaanduplessis/hex-encode-decode)，hex-encode-decode提供文本数据进行编码和解码功能

## 下载安装
```
ohpm install hex-encode-decode
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

```javascript
import {encode,decode} from 'hex-encode-decode';

let content:string = 'ABCDEFGHIJKabcdefj123456+/AA==!@';
let encodes =encode(content) ;
let decodes = decode(this.encodes)
```

## 接口说明

|        方法名        |    入参     | 接口描述  |
|:-----------------:|:---------:|:-----:|
|   encode(data)    | data:编码内容 | 编码 |
|   decode(data)    | data：解码内容 |  解码   |

## 约束与限制
在下述版本验证通过：
- DevEco Studio: 4.0(4.0.3.512),SDK: API10（4.0.10.9）
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/hex-encode-decodeDemo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。