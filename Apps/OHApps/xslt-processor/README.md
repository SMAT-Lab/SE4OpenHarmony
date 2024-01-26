# xslt-processor

## 简介

支持使用与XML文档配对的XSLT样式表将XML文档转换成多中文本格式（HTML、Text等）。

支持Xpath路径表达式解析及计算。

## 下载安裝

```
 ohpm install xslt-processor
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

1. 将XML解析为可操作Node对象

   ```
   import { xmlParse } from 'xslt-processor'
   let originXMLStr = ""; // 将要被转换的XML字符串 
   const originXMLObj = xmlParse(originXMLStr);
   ```

2. XSLT转换

   ```
   import { xmlParse, xsltProcess } from 'xslt-processor'
   let originXMLStr = ""; // 将要被转换的XML字符串 
   let originXSLStr = ""; // 与要被转换的XML字符串匹配的XSL模板 
   
   const originXMLObj = xmlParse(originXMLStr);
   const originXSLObj = xmlParse(originXSLStr);
   const text = xsltProcess(originXMLObj, originXSLObj);
   ```

3. XSLT转换带参数

   对应xsl模板中【$】标记的动态参数`<span> <xsl:value-of select="$test" /> </span>`

   ```
   import { xmlParse, xsltProcess } from 'xslt-processor'
   
   const outXmlString = xsltProcess(
   xmlParse(xmlString), 
   xmlParse(this.variablesXSLTString),
   {
      test: "hugo"
   });
   ```

6. xpath表达式计算

   ```
   import { ExprContext, xmlParse, xpathParse, xsltProcess } from 'xslt-processor'
   
   const xpathExpr = '/page'; // xpath表达式
   const expr1 = xpathParse(xpathExpr); //  xpath表达式解析
   const ctx = new ExprContext(xmlParse(this.xpathXML)); // 构建表达式解析上下文
   const result = expr1.evaluate(ctx); // 计算xpath表达式,获得结果
   // 如果不确定结果类型，可通过nodeSetValue获取对应结果
   const nodeSet = result.nodeSetValue();
   const nodeSetValue = nodeSet[0].nodeName + "=" + nodeSet[0].nodeValue;
   
   // 如果确定结果类型，可直接获取对应类型value
   const value = result.numberValue();
   const value = result.stringValue();
   const value = result.booleanValue();
   ```

## 接口说明

| 方法                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 相关描述            |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------- |
| xmlParse(xml:string):XDocument                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 解析xml为可操作对象 |
| xsltProcess(xmlDoc:XDocument, stylesheet:XDocument,parameters:object):string                                                                                                                                                                                                                                                                                                                                                                                                                     | 进行XML的XSLT转换   |
| xpathParse(expr:string, xpathLog=()=>{})                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 解析xpath表达式     |
| new ExprContext( node: XDocument,  <br />opt_position:number,   // 默认值为0  <br />opt_nodelist:[XDocument], // 节点列表，xpath计算结果集合，默认为传入的node对应的数组,[node]     <br />opt_parent: ExprContext,  //  父上下文，默认null  <br />opt_caseInsensitive: boolean,  // 设置节点名称是否区分大小写,默认 false <br />opt_ignoreAttributesWithoutValue:boolean,  //  是否忽略没有值的属性，默认false<br />opt_returnOnFirstMatch:boolean, // 是否返回第一个匹配值，默认false     <br />opt_ignoreNonElementNodesForNTA:boolean // 是否忽略非元素节点，默认为false):ExprContext | 构建xpath计算上下文 |
| evaluate(ctx:ExprContext):NodeSetValue&#124;StringValue&#124;BooleanValue&#124;NumberValue                                                                                                                                                                                                                                                                                                                                                                                                       | 计算xpath表达式     |

## 约束与限制
在下述版本验证通过：

DevEco Studio: 4.0 Canary1(4.0.3.512), SDK: API10 (4.0.10.10)

[单元测试用例](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/tree/master/xslt-processor/TEST.md)详情可参考

## 目录结构

````
/xsltprocessor-demo        # 项目根目录
├── entry     # 示例代码文件夹
│    └─ src/main/ets
│       └─ pages/index.ets // xslt-processor 示例代码
│       └─ pages/TestTimePage.ets // 测试接口时长的页面              
├── README.md  # 安装使用方法                    
````

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/xslt-processor/LICENSE) ，请自由地享受和参与开源。
