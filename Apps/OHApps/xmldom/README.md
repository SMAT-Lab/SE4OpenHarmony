# @xmldom/xmldom

## 简介

> 专门为OpenHarmony打造的一个提供了符合 W3C 标准的 DOMParser 和 XMLSerializer 功能的 JavaScript 模块。它允许你在浏览器和 Node.js 环境中解析和操作 XML 数据，并提供了将 DOM 文档对象转换为 XML 字符串的能力。这使得处理和操作 XML 数据变得更加方便和标准化

## 下载安装

```shell
ohpm install @xmldom/xmldom
```

OpenHarmony
ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

1. 引入文件及代码依赖

 ```
 import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom'
 
 const source = `<xml xmlns="a">
	<child>test</child>
	<child/>
 </xml>`

 const doc :ESObject = new DOMParser().parseFromString(source, 'text/xml')

 const serialized :ESObject = new XMLSerializer().serializeToString(doc)
 ```

## 接口说明

* XML 字符串解析为 DOM 文档对象
 - `parseFromString()`
* 将 DOM 文档序列化为 XML 字符串
 - `serializeToString()`

## 目录结构
````
|---- xmldom
|     |---- entry  # 示例代码文件夹
              ├── src  
                 ├── main   
                   ├── ets
                       ├── pages
                             ├── Index.ets  sample代码
|     |---- README.md  # 安装使用方法                    
````

## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317), OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/xmldom/LICENSE) ，请自由地享受和参与开源。

