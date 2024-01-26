# xml_js

## 介绍

基于sax@1.2.4版本移植，提供一个非常轻量的Xml字符串解析工具。

## 下载安装

1.安装

```
ohpm install @ohos/sax
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

2.在需要使用的页面导入sax:

```
import sax from '@ohos/sax'
```

## 使用说明

```
import sax from '@ohos/sax'

let strict = true; // set to false for html-mode
let parser = sax.parser(strict);

parser.onerror = (e:Error) => {
  // an error happened.
};
parser.ontext = (t:string) => {
  // got some text.  t is the string of text.
};
parser.onopentag = (node:ESObject) => {
  // opened a tag.  node has "name" and "attributes"
};
parser.onattribute = (attr:ESObject) => {
  // an attribute.  attr has "name" and "value"
};
parser.onend = () => {
  // parser stream is done, and ready to have more stuff written to it.
};

parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
```

## 接口说明

**xml解析**

parser(strict: boolean, options?: Options):Parser;

构造xml解析器。

参数：

| 参数名  | 类型    | 必填 | 说明             |
| ------- | ------- | ---- | ---------------- |
| strict  | boolean | 否   | 是否为严格模式。 |
| options | Options | 否   | 可选转换配置项。 |

Options:

| 参数名         | 类型    | 必填 | 说明                                                         |
| -------------- | ------- | ---- | ------------------------------------------------------------ |
| trim           | boolean | 否   | 是否修剪文本和注释节点。                                     |
| normalize      | boolean | 否   | 是否将任何空格转换为单个空格。                               |
| lowercase      | boolean | 否   | 是否在非严格模式下小写标签名称和属性名称。                   |
| xmlns          | boolean | 否   | 是否支持命名空间。                                           |
| position       | boolean | 否   | 是否不跟踪行/列/位置。                                       |
| strictEntities | boolean | 否   | 是否仅解析预定义的xml实体。（&amp;、&apos;、&gt;、&lt;、&quot;） |

返回值：

| 类型   | 说明              |
| ------ | ----------------- |
| Parser | xml字符串解析器。 |

**write**

function write(xml: string): Parser;

写入xml字符串，不必一次写完所有，支持多次写入。

参数

| 参数名 | 类型   | 必填 | 说明                  |
| ------ | ------ | ---- | --------------------- |
| xml    | string | 是   | 要被解析的xml字符串。 |

返回值：

| 类型   | 说明              |
| ------ | ----------------- |
| Parser | xml字符串解析器。 |

**close**

function close(): Parser;

关闭写入，一旦关闭，就不能再写入任何数据，直到处理完所有数据，发出end回调事件。

返回值：

| 类型   | 说明              |
| ------ | ----------------- |
| Parser | xml字符串解析器。 |

**resume**

function resume(): Parser;

恢复写入。

返回值：

| 类型   | 说明              |
| ------ | ----------------- |
| Parser | xml字符串解析器。 |

**end**

function end(): Parser;

结束写入。

返回值：

| 类型   | 说明              |
| ------ | ----------------- |
| Parser | xml字符串解析器。 |

**flush**

function flush(): void;

释放解析器。

**解析器事件**

| 方法                    | 参数                                                         | 说明                 |
| ----------------------- | ------------------------------------------------------------ | -------------------- |
| ontext                  | text:string                                                  | 标签文本内容         |
| onprocessinginstruction | {   name: string,   body: string }                           | 解析到pi处理指令     |
| onsgmldeclaration       | sgmlDecl:string                                              | 解析到sgml声明       |
| ondoctype               | doctype:string                                               | 解析到doctype信息    |
| oncomment               | comment:string                                               | 解析到注释信息       |
| onopentagstart          | { name:string, attributes: {} ,ns:{}}                        | 标签名称             |
| onattribute             | {  name: string,   value: string,   prefix: string,   local: string,   uri: string} | 属性信息             |
| onopentag               | {   name: string,   attributes: {  <br/>    length: {     <br>                  name: string,     <br/>                  value: string,        <br/>                  prefix: string,     <br/>                  local: string,     <br/>                  uri: string      <br/> }    <br/> },    <br/> ns: {},   <br/>  prefix: string,    <br/> local: string,    <br/> uri: string,    <br/> isSelfClosing: boolean} | 开始解析标签         |
| onclosetag              | tagName:string                                               | 标签解析结束         |
| onopencdata             | NA                                                           | 开始解析cdata数据    |
| oncdata                 | cdata:string                                                 | cdata数据            |
| onclosecdata            | NA                                                           | cdata数据解析完成    |
| onerror                 | error:Error                                                  | 解析出错             |
| onend                   | NA                                                           | 解析结束             |
| onready                 | NA                                                           | xml解析器已准备好    |
| onscript                | script:string                                                | 解析到script数据     |
| onopennamespace         | {prefix:string,uri:string}                                   | 开始解析命名空间信息 |
| onclosenamespace        | prefix:string,uri:string}                                    | 命名空间信息解析结束 |

## 约束与限制

在下述版本验证通过：

DevEco Studio: 4.1 Canary2(4.1.3.400), SDK: API11 (4.1.0.36)

DevEco Studio: 4.0 Release(4.0.3.413), SDK: API10 (4.0.10.3)

## 目录结构

```
|---- sax
|     |---- src/main  # 模块代码
|           |---- ets/   # 模块代码
|                |---- sax.js     # 提供xml解析能力
|            |---- index.ts          # 入口文件
|            |---- *.json5      # 配置文件
|     |---- README.md  # 安装使用方法
|     |---- README.OpenSource  # 开源说明
|     |---- CHANGELOG.md  # 更新日志
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [ISC License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/protobuf_format/sax/LICENSE) ，请自由地享受和参与开源。
