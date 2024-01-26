# amf-convert

## 简介
> amf-convert在javascript环境中可以实现AMF格式的serialization/deserialization。


## 下载安装
```shell
ohpm install amf-convert
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

### 序列化/反序列化
```javascript
import AMF,{ Spec,ByteArray } from "amf-convert";
var data = {
    any: 'data',
    you: 'like!'
};
// 序列化
var encodedData = AMF.stringify(data);
var encodedData2 = AMF.serialize(data, true, Spec.AMF3_OBJECT)
// 反序列化
var decodeData = AMF.parse(encodedData);
var decodeData2 = AMF.deserialize(data, Spec.AMF3_OBJECT)
```


## 目录结构
````
|---- amf  
|     |---- entry  # 示例代码文件夹
|           |---- Index.ets  # 使用demo展示
|     |---- README.MD  # 安装使用方法                    
````

## 约束与限制

在下述版本验证通过：

DevEco Studio版本: 4.0Canary2(4.0.1.300), SDK: API10(4.0.9.6)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/amf/LICENSE) ，请自由地享受和参与开源。