# @protobufjs/base64

## 简介
> @protobufjs/base64 一个用于数字数组的最小化的base64实现。

## 下载安装
```shell
ohpm install @protobufjs/base64
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

### 引用及使用
1、引入依赖
```
import { length, encode, decode, test } from '@protobufjs/base64'
```

2、加密Uint8Array

 ```
    let test="openharmony"
    const textEncoder = new util.TextEncoder()
    let uint8Array = textEncoder.encodeInto(test)
    let result= encode(uint8Array, 0, uint8Array.length)
 ```

2、解码base64编码的字符串

 ```
    let test="openharmony"
    const textEncoder = new util.TextEncoder()
    let uint8Array = textEncoder.encodeInto(test)
    let encodeStr= encode(uint8Array, 0, uint8Array.length)

    let decodeUint8Array = new Uint8Array(length(encodeStr))
    decode(encodeStr, decodeUint8Array, 0)
 ```

3、计算一个base64编码字符串的字节长度

 ```
    let test="openharmony"
    const textEncoder = new util.TextEncoder()
    let uint8Array = textEncoder.encodeInto(test)
    let encodeStr = encode(uint8Array, 0, uint8Array.length)
    let byteLength= length(encodeStr)
 ```

3、测试指定的字符串是否为base64编码

 ```
  test("123435")
  test("5L2g5aW9")
 ```

## 接口说明
1. 计算一个base64编码字符串的字节长度
   `length(string: string): number`

2. 将一个buffer编码为base64编码的字符串
   `encode(buffer: Uint8Array, start: number, end: number): string`

3. 将一个base64编码的字符串解码成一个buffer
   `decode(string: string, buffer: Uint8Array, offset: number): number`

4. 测试指定的字符串是否为base64编码
   `test(string: string): boolean`

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本：4.1 Canary(4.1.3.317)，OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
````
|---- ohos_entities
|     |---- entry  # 示例代码文件夹
|           |---- src
|                 |---- ohosTest
|                       |---- ets
|                             |---- test
|                                   |---- Ability.test.ets  # 单元测试

|     |---- README.md  # 安装使用方法                    
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [BSD License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/protobufjs_base64/LICENSE)，请自由地享受和参与开源。

