interface Index_Params {
    tag?: string;
    originTextXML?: string;
    originTextXSL?: string;
    originHTMLXML?: string;
    originHTMLXSL?: string;
    variablesXSLTString?;
    xpathXML?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ExprContext, xmlParse, xpathParse, xsltProcess } from 'xslt-processor';
import promptAction from '@ohos.promptAction';
import hilog from '@ohos.hilog';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.tag = 'xslt-processor demo';
        this.originTextXML = '<all>' +
            '<item pos="2">A 三方库组件 Ba bộ phận thư viện</item>' +
            '<item pos="3">B مكونات مستودع ثلاثية</item>' +
            '<item pos="1">C ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</item>' +
            '</all>';
        this.originTextXSL = '<xsl:stylesheet>' +
            '<xsl:template match="/">' +
            '<xsl:for-each select="//item">' +
            '<xsl:sort select="@pos"/>' +
            '<xsl:value-of select="."/>' +
            '</xsl:for-each>' +
            '</xsl:template>' +
            '</xsl:stylesheet>';
        this.originHTMLXML = ` <?xml version="1.0" encoding="ISO-8859-1"?>
     <?xml-stylesheet type="text/xsl" href="cdcatalog.xsl"?>
     <catalog>
     <cd>
     <title>Empire Burlesque 三方库组件 Ba bộ phận thư viện</title>
     <artist>Bob Dylan مكونات مستودع ثلاثية ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</artist>
     <country>USA</country>
     <company>Columbia</company>
     <price>10.90</price>
     <year>1985</year>
     </cd>
     .
     .
     </catalog>`;
        this.originHTMLXSL = ` <?xml version="1.0" encoding="ISO-8859-1"?>

    <xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
    <html>
    <body>
    <h2>My CD Collection</h2>
    <table border="1">
    <tr bgcolor="#9acd32">
    <th>Title</th>
    <th>Artist</th>
    </tr>
    <xsl:for-each select="catalog/cd">
    <tr>
    <td><xsl:value-of select="title"/></td>
    <td><xsl:value-of select="artist"/></td>
    </tr>
    </xsl:for-each>
    </table>
    </body>
    </html>
    </xsl:template>

    </xsl:stylesheet> `;
        this.variablesXSLTString = `<?xml version="1.0"?>
      <xsl:stylesheet version="1.0">
        <xsl:template match="test">
          <span> <xsl:value-of select="$test" /> </span>
        </xsl:template>
        <xsl:template match="root">
          <xsl:element name="{local-name()}">
            <xsl:apply-templates select="test"/>
          </xsl:element>
        </xsl:template>
        <xsl:template match="/">
          <xsl:apply-templates select="root"/>
        </xsl:template>
      </xsl:stylesheet>`;
        this.xpathXML = [
            '<page>',
            '<request>',
            '<q>new york</q>',
            '</request>',
            '<location lat="100" lon="200"/>',
            '</page>'
        ].join('');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.tag !== undefined) {
            this.tag = params.tag;
        }
        if (params.originTextXML !== undefined) {
            this.originTextXML = params.originTextXML;
        }
        if (params.originTextXSL !== undefined) {
            this.originTextXSL = params.originTextXSL;
        }
        if (params.originHTMLXML !== undefined) {
            this.originHTMLXML = params.originHTMLXML;
        }
        if (params.originHTMLXSL !== undefined) {
            this.originHTMLXSL = params.originHTMLXSL;
        }
        if (params.variablesXSLTString !== undefined) {
            this.variablesXSLTString = params.variablesXSLTString;
        }
        if (params.xpathXML !== undefined) {
            this.xpathXML = params.xpathXML;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private tag: string;
    private originTextXML: string;
    private originTextXSL: string;
    private originHTMLXML: string;
    private originHTMLXSL: string;
    private variablesXSLTString;
    private xpathXML;
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 5 });
        Column.width('100%');
        Button.createWithLabel('xmlParse:null');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xmlParse(null);
            }
            catch (error) {
                this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xmlParse:undefined');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xmlParse(undefined);
            }
            catch (error) {
                this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xmlParse:特殊字符');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xmlParse('<xml>内容包含特殊字符：<></xml>');
            }
            catch (error) {
                this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xsltProcess:null');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xsltProcess(null);
            }
            catch (error) {
                this.printLog('请检查输入参数，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xsltProcess:undefined');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xsltProcess(undefined);
            }
            catch (error) {
                this.printLog('请检查输入参数，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xsltProcess:特殊字符');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xsltProcess('<xml>内容包含特殊字符：<></xml>');
            }
            catch (error) {
                this.printLog('请检查输入参数，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xpathParse:null');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xpathParse(null);
            }
            catch (error) {
                this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xpathParse:undefined');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xpathParse(undefined);
            }
            catch (error) {
                this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('xpathParse:特殊字符');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            try {
                xpathParse('内容包含特殊字符<>');
            }
            catch (error) {
                this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
        });
        Button.pop();
        Button.createWithLabel('解析XML');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            const originXMLObj: xmlParse = xmlParse(this.originTextXML);
            this.printLog('原始XML根节点内有' + originXMLObj.childNodes[0].childNodes.length + '个子节点');
        });
        Button.pop();
        Button.createWithLabel('XSLT 转换 TEXT');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            const originXMLObj: xmlParse = xmlParse(this.originTextXML);
            const originXSLObj: xmlParse = xmlParse(this.originTextXSL);
            const text: xsltProcess = xsltProcess(originXMLObj, originXSLObj);
            this.printLog(text);
        });
        Button.pop();
        Button.createWithLabel('XSLT 转换 HTML');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            const originXMLObj: xmlParse = xmlParse(this.originHTMLXML);
            const originXSLObj: xmlParse = xmlParse(this.originHTMLXSL);
            const html: xsltProcess = xsltProcess(originXMLObj, originXSLObj);
            this.printLog(html);
        });
        Button.pop();
        Button.createWithLabel('XSLT转换带参数');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            const xmlString = `<root>
                <test name="test1"/>
               </root> `;
            const xml1: xmlParse = xmlParse(xmlString);
            const xml2: xmlParse = xmlParse(this.variablesXSLTString);
            const outXmlString: xsltProcess = xsltProcess(xml1, xml2, {
                test: "hugo"
            });
            this.printLog(outXmlString);
        });
        Button.pop();
        Button.createWithLabel('Xpath计算表达式/page');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            const xpathExpr = '/page';
            const expr1: xpathParse = xpathParse(xpathExpr);
            const ctx: ExprContext = new ExprContext(xmlParse(this.xpathXML));
            const e: xpathParse = expr1.evaluate(ctx);
            const nodeSet: xpathParse = e.nodeSetValue();
            this.printLog('XML文档中的page节点数为：' + nodeSet.length);
        });
        Button.pop();
        Button.createWithLabel('Xpath计算表达式/page/location/@lat');
        Button.width('90%');
        Button.height('100px');
        Button.onClick(() => {
            const locationParam = 'location';
            const latParam = 'lat';
            const xpathExpr = `/page/${locationParam}/@${latParam}`;
            const expr1: xpathParse = xpathParse(xpathExpr);
            const ctx: ExprContext = new ExprContext(xmlParse(this.xpathXML));
            const result: xpathParse = expr1.evaluate(ctx);
            const nodeSet: xpathParse = result.nodeSetValue();
            this.printLog('当前节点属性为：' + nodeSet[0].nodeName + "=" + nodeSet[0].nodeValue);
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    private printLog(msg: string) {
        hilog.info(0x0000, this.tag, '%{public}s', msg);
        promptAction.showToast({ message: msg });
    }
}
loadDocument(new Index("1", undefined, {}));
