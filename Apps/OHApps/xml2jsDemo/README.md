# xml2jsDemo

## 简介

简单的XML到JavaScript对象转换器。它支持双向转换。使用sax-js和xmlbuilder-js。
本工程基于开源库[node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
开发OpenHarmony的demo例子。

![gif](preview/xml2js.gif)

## 安装模块

使用ohpm install 安装

```
  ohpm install xml2js@0.4.23
```

2点需要补充修改点

1.需要将依赖库xmlbuilder的oh-package.json5文件里把向外导出的"main": "./lib/index"语句改为"main": "./lib/index.js"

2.需要修改本地hivgor rollup打包配置,具体步骤参考require rollup问题临时修改方案文件

OpenHarmony ohpm环境配置等更多内容，请参照 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

### 解析 XML

1.引入依赖

``` javascript
import xml2js from 'xml2js';
```

2.简单解析xml使用样例

``` javascript
    xml2js.parseString(this.xml, (err, result) => {
      this.message = JSON.stringify(result)
    })
```

3.个性化设置options的参数

``` javascript
attrkey (默认值 :$) :用于访问属性的前缀 .版本0.1默认值为@.

charkey (默认值 :_) :用于访问字符内容的前缀 .版本0.1默认为"#".

explicitCharkey (默认值 :false )确定是否对没有属性的元素使用charkey前缀 .

trim (默认值 :false ) :修剪文本节点开始和结束处的空白 .

normalizeTags (默认值 :false ) :将所有标记名规范化为小写 .

normalize (默认值 :false ) :修剪文本节点内的空白 .

explicitRoot (默认值 :true ) :如果要在结果对象中获取根节点 ,请设置此项 .

emptyTag (默认值 :"" ) :空节点的值是什么 .如果您想使用空对象作为默认值 ,最好提供工厂函数 ( )=> ( {} ) .如果没有此函数 ,普通对象将成为所有具有不需要行为的引用的共享引用 .

explicitArray (默认值 :true ) :如果为true ,则始终将子节点放在数组中; 否则 ,仅当存在多个数组时才创建数组 .

ignoreAttrs (默认值 :false ) :忽略所有XML属性 ,只创建文本节点 .

mergeAttrs (默认值 :false ) :将属性和子元素合并为父属性的属性 ,而不是将属性设置为子属性对象的关键帧 .如果ignoreAttrs为true ,则忽略此选项 .

validator (默认为null ) :您可以指定一个可调用函数 ,以某种方式验证结果结构 ,无论您想要什么 .有关示例 ,请参见单元测试 .

xmlns (默认为false ) :给每个元素一个通常称为"$ns"的字段 (第一个字符与attrkey相同 ) ,该字段包含其本地名称和命名空间URI .

explicitChildren (默认为false ) :将子元素放到单独的属性中 .mergeAttrs=true不起作用 .如果元素没有子元素 ,则不会创建"子元素" .添加到0.2.5中 .

childkey (默认$$ ) :如果explicitChildren设置为true ,则用于访问子元素的前缀 .添加到0.2.5中 .

preserveChildrenOrder (默认为false ) :修改explicitChildren的行为 ,使"children"属性的值成为有序数组 .当这为真时 ,每个节点还将获得一个#name字段 ,其值将对应于XML nodeName ,这样您就可以迭代“children”数组并仍然能够确定节点名称 .命名的 (可能是无序的 )属性也保留在此配置中 ,与有序的“子”数组处于同一级别 .添加到0.4.9中 .

charsAsChildren (默认为false ) :确定如果explicitChildron处于启用状态 ,字符是否应被视为子级 .在0.2.5中添加 .

includeWhiteChars (默认为false ) :确定是否只包含空白文本节点 .在0.4.17中增加 .

async (默认为false ) :回调应该是异步的吗? 如果您的代码依赖于回调的同步执行, 这可能是不兼容的更改 .xml2js的未来版本可能会更改此默认值,因此建议不要依赖同步执行 .添加到0.2.6中 .

strict (默认为true ) :将sax-js设置为严格或非严格解析模式 .默认为true ,这是强烈建议的 ,因为解析格式不正确的XML可能会产生任何结果 .添加到0.2.7中 .

在0.4.14中添加
attrNameProcessors (默认值 :null ) :允许添加属性名称处理函数 .接受具有以下签名的函数数组 :
function (name){
    //do something with `name`
    return name
}

在0.4.1中添加
attrValueProcessors (默认值 :null ) :允许添加属性值处理函数 .接受具有以下签名的函数数组 :
function (value, name){
  //do something with `name`
  return name
}

在0.4.1中添加
tagNameProcessors (默认值 :null ) :允许添加标记名处理函数 .接受具有以下签名的函数数组 :
function (name){
  //do something with `name`
  return name
}

在0.4.6中添加
valueProcessors (默认值 :null ) :允许添加元素值处理函数 .接受具有以下签名的函数数组 :
function (value, name){
  //do something with `name`
  return name
}

```

## 接口说明

| **接口**                                                      | 功能             |
| ------------------------------------------------------------ | ---------------- |
| xml2js.parseString(str, a, b) | 字符串解析 XML 。 |
| xml2js.parseStringPromise(xml/*, options*/)| 异步字符串解析 XML 。    |
| builder.buildObject(obj) | 对象构建 XML。    |

## 约束与限制
在下述版本验证通过：

DevEco Studio 版本：4.1 Canary(4.1.3.317)，OpenHarmony SDK:API version 11 (4.1.0.36)。


## 目录

```
/xml2jsDemo # demo代码
|—— entry
├── src      # 框架代码
│   └── main
│   	└── ets
│   	    └── Application
│   	    └── MainAbility
│   	    └── pages
│       	    └── index.ets  # 解析 XML示例首页
│   	        └── processingAttribute.ets  # 简单解析 xml
│       	    └── promiseUsage.ets  # 使用promiseUsage方法解析
│       	    └── simpleParseXml.ets  # 构建xml
│       	    └── xmlBuilder.ets  # 处理属性、标签名称和值


```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT License](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/xml2jsDemo/LICENSE)
，请自由地享受和参与开源。