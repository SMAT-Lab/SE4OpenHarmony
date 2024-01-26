# msgpack-javascript

## 简介
> MessagePack是一个非常高效的对象序列化库。它像JSON，但速度很快，而且很小。


<img src="screenshot/msgpack.gif" width="40%"/>

## 下载安装
```shell
ohpm install @msgpack/msgpack
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

### 编解码
```javascript
import { encode,decode } from "@msgpack/msgpack";

// 编码
let encoded:Uint8Array = encode({ foo: "bar" });
// 解码
let decodedObject = decode(encoded);
```

### 构造器编解码
```javascript
import { Encoder,Decoder } from "@msgpack/msgpack";
// 编码可复用构造器
let encoder = new Encoder()
// 解码可复用构造器
let decoder = new Decoder()
// 编码
let encoded:Uint8Array = encoder.encode({ foo: "bar" });
// 解码
let decodedObject = decoder.decode(encoded);
```

### 数组对象编解码

```javascript
import { encode,decodeMulti } from "@msgpack/msgpack";

let items = [
  "foo",
  10,
  {
    name: "bar",
  },
  [1, 2, 3],
];
// 将数组编码
let encodedItems = items.map((item) => encode(item));
// 创建空白缓存区用来后续存数据流
let encoded = new Uint8Array(encodedItems.reduce((p, c) => p + c.byteLength, 0));
let offset = 0;
// 空白缓存区存入数据流
for (let encodedItem of encodedItems) {
  encoded.set(encodedItem, offset);
  offset += encodedItem.byteLength;
}
let result: Array<unknown> = [];
// 解码后将数据存入result数组中
for (let item of decodeMulti(encoded)) {
  result.push(item);
}
// result与items一致
expect(result).assertDeepEquals(items);
```

## 目录结构
````
|---- msgpackJavaScript  
|     |---- entry  # 示例代码文件夹
|           |---- Index.ets  # 对外接口介绍
			|---- EncodeDecodePage.ets  # 普通编解码
			|---- EncodeDecodeConstructorPage.ets  # 通过构造器编解码
			|---- MultiDecodePage.ets  # 复杂对象解码
|     |---- README.MD  # 安装使用方法                    
````

## 约束与限制

在下述版本验证通过：

- DevEco Studio: 4.1 (4.1.3.322), SDK: API11 (4.1.0.36)
- DevEco Studio: 4.0 (4.0.3.513), SDK: API10 (4.0.10.10)
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples) 。

## 开源协议
本项目基于 [ISC License]() ，请自由地享受和参与开源。