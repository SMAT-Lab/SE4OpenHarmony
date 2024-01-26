## @ohos/asn1

## 简介

提供一个用于构建ASN.1对象模型以及JSON序列化/反序列化的编程接口。

#### 下载安装

`ohpm install @ohos/asn1`

OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
#### 序列化与反序列化

```
import { JSONDeserializer, JSONSerializer, Universal } from '@ohos/asn1';
const { Bool, Integer, Null, PrintableString, Sequence } = Universal;
const sequence = new Sequence([
  new Integer(-Number.MAX_SAFE_INTEGER),
  new Integer(Number.MAX_SAFE_INTEGER),
  new Integer('424242424242424242424242424242424242'), // big integer
  new Null(),
  new Bool(true),
  new PrintableString('nice marmot'),
  new PrintableString('@#$%!&*()!_=&'),
]);
....

const serialize = new JSONSerializer();
const json = serialize(sequence);
....

const deserialize = new JSONDeserializer();
const asn1ObjectModel = deserialize(sequence);
   
```

## 接口说明
1.序列化asn1数据
```
 JSONSerializer
```
2.反序列化数据
```
 JSONDeserializer
```
3.构建asn1数组数据
```
 Universal.Sequence
```
4.构建asn1数字数据
```
 Universal.Integer
```
5.构建空asn1对象
```
 Universal.Null
```
6.构建asn1布尔数据
```
 Universal.Bool
```
7.构建asn1字符串数据
```
 Universal.PrintableString
```

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本：4.1 Canary(4.1.3.317)，OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/asn1Demo/LICENSE) ，请自由地享受和参与开源。

