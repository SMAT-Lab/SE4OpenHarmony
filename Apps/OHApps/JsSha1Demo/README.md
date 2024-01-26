# JsSha1Demo

## 简介

本demo是基于openHarmony系统下使用三方js库[js-sha1](https://github.com/emn178/js-sha1)，js-sha1是一个简单的用于JavaScript的SHA1散列函数支持UTF-8编码。

## 下载安装

```
  ohpm install js-sha1
```
OpenHarmony ohpm 环境配置等更多内容，请参考 [如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

[完整API文档](https://github.com/emn178/js-sha1)

### 1.使用js-sha1处理字符串、二进制数组、数组等数据。
```
// @ts-ignore
import sha1 from 'js-sha1';

sha1(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1('The quick brown fox jumps over the lazy dog'); // 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12
sha1('The quick brown fox jumps over the lazy dog.'); // 408d94384216f890ff7a0c3528e8bed1e0b01621

// It also supports UTF-8 encoding
sha1('中文'); // 7be2d2d20c106eee0836c9bc2b939890a78e8fb3

// It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
sha1([]); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1(new Uint8Array([])); // da39a3ee5e6b4b0d3255bfef95601890afd80709

// Different output
sha1(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1.hex(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1.array(''); // [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]
sha1.digest(''); // [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]
sha1.arrayBuffer(''); // ArrayBuffer
```

## 接口说明

|          方法名           |              入参               |     接口描述      |
|:----------------------:|:-----------------------------:|:-------------:|
|       sha1(data)       |  data:字符串、二进制数组、数组、8位无符号整型数组  | 生成安全散列算法1的字符串 |
|     sha1.hex(data)     |           data：字符串            | 生成安全散列算法1的字符串 |
|    sha1.array(data)    |     data：字符串      | 生成安全散列算法1的数组  |
|   sha1.digest(data)    |     data：字符串      |   生成安全散列算法1的数组    |
| sha1.arrayBuffer(data) |           data：字符串           |     生成安全散列算法1的二进制数组   |

## 目录结构

```
/JsSha1Demo  # 工程代码
|—— entry   # 工程demo示例
│   └── main
│       └── ets
│           └── entryability 
│               └── EntryAbility.ts    # 工程Ability
│           └── pages 
│               └── Index.ets       # demo示例页面

```

## 约束与限制
在下述版本验证通过：
- DevEco Studio: 4.0 (4.0.3.512), SDK: API10 (4.0.10.9)
- DevEco Studio: 4.0 Canary2(4.0.3.312), SDK: API10 (4.0.9.2)

## 开源协议

本项目基于 [MIT license](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/JsSha1Demo/LICENSE) ，请自由地享受和参与开源。

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。