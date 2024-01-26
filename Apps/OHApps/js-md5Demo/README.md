# js-md5Demo

## 简介
本demo是基于openHarmony系统下使用三方js库[js-md2](https://github.com/emn178/js-md5)，JavaScript的简单MD5哈希函数支持UTF-8编码

## 下载安装
```
ohpm install js-md5
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)
## 使用说明

```javascript
import md5 from 'js-md5';

let content:string = 'ABCDEFGHI';
let mess = md5(content);
let mess2 = md5.hex(content);
let mess3 = md5.base64(content);
```

## 接口说明

|    方法名    |    入参     | 接口描述 |
|:---------:|:---------:|:----:|
| md5(data) | data:内容 |  算法  |
| md5.hex(data) | data:内容 |  算法  |
| md5.base64(data) | data:内容 |  算法  |
| md5.digest(data) | data:内容 |  算法  |
| md5.array(data) | data:内容 |  算法  |


## 约束与限制
在下述版本验证通过：

DevEco Studio: 4.0 Beta2(4.0.3.512), SDK: API10 (4.0.10.9)

DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/js-md5Demo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。