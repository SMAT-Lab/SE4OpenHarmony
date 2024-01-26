##  xslt-processor单元测试用例

该测试用例基于OpenHarmony系统下，采用[原库测试用例](https://github.com/fiduswriter/xslt-processor/tree/main/tests) 进行单元测试

| 接口名                                                       | 是否通过 | 备注 |
| ------------------------------------------------------------ | -------- | ---- |
| xmlParse(xml:string):XDocument                               | pass     |      |
| xsltProcess(xmlDoc:XDocument, stylesheet:XDocument,parameters:object):string | pass     |      |
| xpathParse(expr:string, xpathLog=()=>{})                     | pass     |      |
| new ExprContext( node: XDocument,  <br />opt_position:number,   // 默认值为0  <br />opt_nodelist:[XDocument], // 节点列表，xpath计算结果集合，默认为传入的node对应的数组,[node]     <br />opt_parent: ExprContext,  //  父上下文，默认null  <br />opt_caseInsensitive: boolean,  // 设置节点名称是否区分大小写,默认 false <br />opt_ignoreAttributesWithoutValue:boolean,  //  是否忽略没有值的属性，默认false<br />opt_returnOnFirstMatch:boolean, // 是否返回第一个匹配值，默认false     <br />opt_ignoreNonElementNodesForNTA:boolean // 是否忽略非元素节点，默认为false): ExprContext | pass     |      |
| evaluate(ctx:ExprContext) :NodeSetValue&#124;StringValue&#124;BooleanValue&#124;NumberValue | pass     |      |

