# xml_js

## 介绍

基于xml-js@1.6.11版本移植，提供Xml文本与JavaScript对象与Json之间转换的工具类。

## 下载安装

1.安装

```
ohpm install @ohos/xml_js
```
OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

2.在需要使用的页面导入xml_js:

```
import convert from '@ohos/xml_js'
```

## 使用说明

```
import convert from '@ohos/xml_js'

let xml =
'<?xml version="1.0" encoding="utf-8"?>' +
'<note importance="high" logged="true">' +
'    <title>Happy</title>' +
'    <todo>Work</todo>' +
'    <todo>Play</todo>' +
'</note>';

// 配置xml转js的可选配置项
let options = {
    compact: true,
    instructionNameFn: (val:string, elementName:string) => {
          return val;
        },
    elementNameFn: (val:string, elementName:string) => {
          return val;
        },
    attributeNameFn: (val:string, elementName:string) => {
          return val;
        },
    attributeValueFn: (val:string, elementName:string) => {
          return val;
        }
};

//  xml2js
let xml2jsResult = convert.xml2js(xml,options);

// js2xml
let js2xmlResult = convert.js2xml(xml2jsResult);

// xml2json
let xml2jsonResult =  convert.xml2json(js2xmlResult);

// json2xml
let json2xmlResult =  convert.json2xml(xml2jsonResult);
```

## 接口说明

**js2xml**

function js2xml(obj: Element | ElementCompact, options?: Options.JS2XML): string;

JavaScript 对象转换为xml字符串。

参数：

| 参数名  | 类型                        | 必填 | 说明             |
| ------- | --------------------------- | ---- | ---------------- |
| obj     | Element&#124;ElementCompact | 是   | JavaScript对象。 |
| options | Options.JS2XML              | 否   | 可选转换配置项。 |

返回值：

| 类型   | 说明        |
| ------ | ----------- |
| string | xml字符串。 |

**json2xml**

function json2xml(json: string, options?: Options.JS2XML): string;

将json字符串转换为xml字符串。

参数

| 参数名  | 类型           | 必填 | 说明                        |
| ------- | -------------- | ---- | --------------------------- |
| json    | string         | 是   | 要被转换为xml的json字符串。 |
| options | Options.JS2XML | 否   | 可选转换配置项。            |

返回值：

| 类型   | 说明        |
| ------ | ----------- |
| string | xml字符串。 |

**xml2json**

function xml2json(xml: string, options?: Options.XML2JSON): string;

将xml格式字符串转换为json字符串。

| 参数名  | 类型             | 必填 | 说明                               |
| ------- | ---------------- | ---- | ---------------------------------- |
| xml     | string           | 是   | 构建成功的Proto文件对应的Message。 |
| options | Options.XML2JSON | 否   | 可选转换配置项。                   |

返回值：

| 类型   | 说明         |
| ------ | ------------ |
| string | json字符串。 |

**xml2js**

function xml2js(xml: string, options?: Options.XML2JS): Element | ElementCompact;

将xml字符串通过消息体构建器，结合数据，重新构建为Message消息体。

| 参数名  | 类型           | 必填 | 说明                  |
| ------- | -------------- | ---- | --------------------- |
| xml     | string         | 是   | 要被转换的xml字符串。 |
| options | Options.XML2JS | 否   | 可选转换配置项。      |

返回值：

| 类型                        | 说明             |
| --------------------------- | ---------------- |
| Element&#124;ElementCompact | JavaScript对象。 |

**Attributes **

用于存储xml属性信息。

```
export interface Attributes {
	[key: string]: string | number | undefined
}
```

**DeclarationAttributes **

用于存储xml声明信息。

```
export interface DeclarationAttributes {
  version?: string | number
  encoding?: 'utf-8' | string
  standalone?: 'yes' | 'no'
}
```

**ElementCompact **

JavaScript操作对象。

```
export interface ElementCompact {

[key: string]: any

  _declaration?: {
    _attributes?: DeclarationAttributes
  }
  _instruction?: {

[key: string]: string

  }
  _attributes?: Attributes
  _cdata?: string
  _doctype?: string
  _comment?: string
  _text?: string | number
}
```

**Element **

JavaScript操作对象。

```
export interface Element {
  declaration?: {
    attributes?: DeclarationAttributes
  }
  instruction?: string
  attributes?: Attributes
  cdata?: string
  doctype?: string
  comment?: string
  text?: string | number | boolean
  type?: string
  name?: string
  elements?: Array<Element>
}
```

**转换操作配置项**

```
declare namespace Options {
  interface XML2JSON extends XML2JS {
    spaces?: number | string
  }

  interface XML2JS extends ChangingKeyNames, IgnoreOptions {
    compact?: boolean
    trim?: boolean
    sanitize?: boolean
    nativeType?: boolean
    addParent?: boolean
    alwaysArray?: boolean | Array<string>
    alwaysChildren?: boolean
    instructionHasAttributes?: boolean
    captureSpacesBetweenElements?: boolean
    doctypeFn?: (value: string, parentElement: object) => void;
    instructionFn?: (
      instructionValue: string,
      instructionName: string,
      parentElement: string
    ) => void;
    cdataFn?: (value: string, parentElement: object) => void;
    commentFn?: (value: string, parentElement: object) => void;
    textFn?: (value: string, parentElement: object) => void;
    instructionNameFn?: (
      instructionName: string,
      instructionValue: string,
      parentElement: string
    ) => void;
    elementNameFn?: (value: string, parentElement: object) => void;
    attributeNameFn?: (
      attributeName: string,
      attributeValue: string,
      parentElement: string
    ) => void;
    attributeValueFn?: (
      attributeValue: string,
      attributeName: string,
      parentElement: string
    ) => void;
    attributesFn?: (value: string, parentElement: string) => void;
  }

  interface JS2XML extends ChangingKeyNames, IgnoreOptions {
    spaces?: number | string
    compact?: boolean
    indentText?: boolean
    indentCdata?: boolean
    indentAttributes?: boolean
    indentInstruction?: boolean
    fullTagEmptyElement?: boolean
    noQuotesForNativeAttributes?: boolean
    doctypeFn?: (value: string, currentElementName: string, currentElementObj: object) => void;
    instructionFn?: (
      instructionValue: string,
      instructionName: string,
      currentElementName: string,
      currentElementObj: object
    ) => void;
    cdataFn?: (value: string, currentElementName: string, currentElementObj: object) => void;
    commentFn?: (value: string, currentElementName: string, currentElementObj: object) => void;
    textFn?: (value: string, currentElementName: string, currentElementObj: object) => void;
    instructionNameFn?: (
      instructionName: string,
      instructionValue: string,
      currentElementName: string,
      currentElementObj: object
    ) => void;
    elementNameFn?: (value: string, currentElementName: string, currentElementObj: object) => void;
    attributeNameFn?: (
      attributeName: string,
      attributeValue: string,
      currentElementName: string,
      currentElementObj: object
    ) => void;
    attributeValueFn?: (
      attributeValue: string,
      attributeName: string,
      currentElementName: string,
      currentElementObj: object
    ) => void;
    attributesFn?: (value: string, currentElementName: string, currentElementObj: object) => void;
    fullTagEmptyElementFn?: (currentElementName: string, currentElementObj: object) => void;
  }

  interface IgnoreOptions {
    ignoreDeclaration?: boolean
    ignoreInstruction?: boolean
    ignoreAttributes?: boolean
    ignoreComment?: boolean
    ignoreCdata?: boolean
    ignoreDoctype?: boolean
    ignoreText?: boolean
  }

  interface ChangingKeyNames {
    declarationKey?: string
    instructionKey?: string
    attributesKey?: string
    textKey?: string
    cdataKey?: string
    doctypeKey?: string
    commentKey?: string
    parentKey?: string
    typeKey?: string
    nameKey?: string
    elementsKey?: string
  }
}
```

## 约束与限制

在下述版本验证通过：

DevEco Studio: 4.1 Canary2(4.1.3.400), SDK: API11 (4.1.0.36)

DevEco Studio: 4.0 Release(4.0.3.413), SDK: API10 (4.0.10.3)

## 目录结构

```
|---- xml-js
|     |---- src/main  # 模块代码
|           |---- ets/   # 模块代码
|                |---- array-helper.js     # 提供Array判断方法
|                |---- index.js     # 对外导出文件
|                |---- js2xml.js     
|                |---- json2xml.js    
|                |---- options-helper.js    
|                |---- xml2js.js    
|                |---- xml2json.js    
|            |---- index.ts          # 入口文件
|            |---- *.json5      # 配置文件
|     |---- README.md  # 安装使用方法
|     |---- README.OpenSource  # 开源说明
|     |---- CHANGELOG.md  # 更新日志
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/protobuf_format/xml-js/LICENSE) ，请自由地享受和参与开源。
