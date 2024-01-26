# base64-js

## 简介
> base64-js是纯JS中的Base64编码/解码

## 下载安装
```shell
ohpm install base64-js@1.5.1
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
1. 引入文件及代码依赖
 ```
 import base64 from 'base64-js'
 
 base64.fromByteArray(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]))
 ```

## 接口说明

 * byteLength - 接受base64字符串并返回字节数组的长度
 * toByteArray - 接受base64字符串并返回一个字节数组
 * fromByteArray - 接受字节数组并返回base64字符串

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 目录结构
````
base64-js
├── bench/               # 存放文档
├── test/                # 测试文件和测试用例
├── index.js             # 库的入口文件
├── index.d.ts           # 库的对外接口
├── package.json         # 包的元数据和依赖信息
├── README.md            # 项目文档和说明
├── LICENSE              # 开源许可证
└── ...                  # 其他可能的配置文件或资源               
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议
本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/base64-js/LICENSE) ，请自由地享受和参与开源。

## license

MIT
