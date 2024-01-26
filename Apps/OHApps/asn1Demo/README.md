## asn1Demo

## 简介 
  构建ASN.1对象模型以及JSON序列化/反序列化以及DER 序列化/反序列化，本工程基于开源库 asn1 和 asn1-der 进行修改适配OpenHarmony的组件工程

#### 下载安装
| 库名 | 功能介绍 | 安装                             |
|----|----|--------------------------------|
| asn1 | 用于构建 ASN.1对象模型以及JSON 序列化/反序列化 | ohpm install @ohos/asn1        |
| asn1-der | 用于抽象语法符号一的 DER 序列化/反序列化 （ASN.1）| ohpm install @ohos/asn1-der    |
| asn1js | 提供ASN.1 BER 解码器和编码器 | ohpm install @fortanix/asn1js  |
| base64 | 提供base64的编码与解码 | ohpm install Base64            |
| hex-encode-decode | 提供Hex十六进制的编码与解码 | ohpm install hex-encode-decode |

OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
#### asn1

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

#### asn1-der

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

#### asn1js 
```
const testString = "My test Utf8String";
const asn = new asn1js.Utf8String({
  [value: testString,]([]())
});

const ber = asn.toBER();
const asnParsed = asn1js.fromBER(ber);

```
#### base64
```
import { btoa, atob } from 'Base64'
const data = btoa("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:");
data= atob(data);

```

#### hex-encode-decode
```
import { encode, decode } from 'hex-encode-decode'
const deserializeJsonTextHex = encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890+/AA==!@#$%^&*()_-/][{}?:");
const decodeData = decode(deserializeJsonTextHex);

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
8.构建asn1布尔数据
```
 DERSerializer
```
9.构建asn1字符串数据
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

