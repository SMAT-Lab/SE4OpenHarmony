## @ohos/asn1-der

## 简介

提供一个用于DER和PEM序列化/反序列化的库

#### 下载安装

`ohpm install @ohos/asn1-der`

OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
#### DER序列化与反序列化

```
import { DERSerializer, DERDeserializer } from '@ohos/asn1-der';

const serialize = new DERSerializer();
const asn1Sequence = new Universal.Sequence(
    new Universal.Integer(123),
    new Universal.PrintableString('Hello World'),
);

this.deserializeJsonTextDer = "DER 原抽象数据:" + JSON.stringify(asn1Sequence);
const bufferContainingDEREncodedASN1 = serialize(asn1Sequence);
this.deserializeJsonTextDerS = "DER 序列化数据：" + JSON.stringify(bufferContainingDEREncodedASN1);

const deserialize = new DERDeserializer();
const des = deserialize(bufferContainingDEREncodedASN1);
this.deserializeJsonTextDerD = "DER 反序列化数据:" + JSON.stringify(des);
```

## 接口说明

1.DER序列化
```
 DERSerializer
```
2.DER反序列化
```
 DERDeserializer
```

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本：4.1 Canary(4.1.3.317)，OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/asn1Demo/LICENSE) ，请自由地享受和参与开源。

