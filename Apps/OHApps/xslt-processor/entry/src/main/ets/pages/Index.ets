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

import { ExprContext, xmlParse, xpathParse, xsltProcess } from 'xslt-processor'
import promptAction from '@ohos.promptAction';
import hilog from '@ohos.hilog';

@Entry
@Component
struct Index {
  private tag: string = 'xslt-processor demo';
  private originTextXML: string =
    '<all>' +
    '<item pos="2">A 三方库组件 Ba bộ phận thư viện</item>' +
    '<item pos="3">B مكونات مستودع ثلاثية</item>' +
    '<item pos="1">C ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</item>' +
    '</all>';
  private originTextXSL: string =
    '<xsl:stylesheet>' +
    '<xsl:template match="/">' +
    '<xsl:for-each select="//item">' +
    '<xsl:sort select="@pos"/>' +
    '<xsl:value-of select="."/>' +
    '</xsl:for-each>' +
    '</xsl:template>' +
    '</xsl:stylesheet>';
  private originHTMLXML: string =
    ` <?xml version="1.0" encoding="ISO-8859-1"?>
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
  private originHTMLXSL: string =
    ` <?xml version="1.0" encoding="ISO-8859-1"?>

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
  private variablesXSLTString = `<?xml version="1.0"?>
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
  private xpathXML = [
    '<page>',
    '<request>',
    '<q>new york</q>',
    '</request>',
    '<location lat="100" lon="200"/>',
    '</page>'
  ].join('');

  build() {
    Row() {
      Column({ space: 5 }) {
        Button('xmlParse:null')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xmlParse(null);
            } catch (error) {
              this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
          })

        Button('xmlParse:undefined')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xmlParse(undefined);
            } catch (error) {
              this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
          })

        Button('xmlParse:特殊字符')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xmlParse('<xml>内容包含特殊字符：<></xml>');
            } catch (error) {
              this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
          })

        Button('xsltProcess:null')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xsltProcess(null);
            } catch (error) {
              this.printLog('请检查输入参数，捕捉到异常： ' + error);
            }
          })

        Button('xsltProcess:undefined')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xsltProcess(undefined);
            } catch (error) {
              this.printLog('请检查输入参数，捕捉到异常： ' + error);
            }
          })

        Button('xsltProcess:特殊字符')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xsltProcess('<xml>内容包含特殊字符：<></xml>');
            } catch (error) {
              this.printLog('请检查输入参数，捕捉到异常： ' + error);
            }
          })

        Button('xpathParse:null')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xpathParse(null);
            } catch (error) {
              this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
          })

        Button('xpathParse:undefined')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xpathParse(undefined);
            } catch (error) {
              this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
          })

        Button('xpathParse:特殊字符')
          .width('90%')
          .height('100px')
          .onClick(() => {
            try {
              xpathParse('内容包含特殊字符<>');
            } catch (error) {
              this.printLog('请检查输入字符，捕捉到异常： ' + error);
            }
          })

        Button('解析XML')
          .width('90%')
          .height('100px')
          .onClick(() => {
            const originXMLObj:xmlParse = xmlParse(this.originTextXML);
            this.printLog('原始XML根节点内有' + originXMLObj.childNodes[0].childNodes.length + '个子节点');
          })

        Button('XSLT 转换 TEXT')
          .width('90%')
          .height('100px')
          .onClick(() => {
            const originXMLObj:xmlParse = xmlParse(this.originTextXML);
            const originXSLObj:xmlParse = xmlParse(this.originTextXSL);
            const text:xsltProcess = xsltProcess(originXMLObj, originXSLObj);
            this.printLog(text);
          })

        Button('XSLT 转换 HTML')
          .width('90%')
          .height('100px')
          .onClick(() => {
            const originXMLObj:xmlParse = xmlParse(this.originHTMLXML);
            const originXSLObj:xmlParse = xmlParse(this.originHTMLXSL);
            const html:xsltProcess = xsltProcess(originXMLObj, originXSLObj);
            this.printLog(html);
          })

        Button('XSLT转换带参数')
          .width('90%')
          .height('100px')
          .onClick(() => {
            const xmlString =
              `<root>
                <test name="test1"/>
               </root> `;
            const xml1:xmlParse = xmlParse(xmlString);
            const xml2:xmlParse = xmlParse(this.variablesXSLTString);
            const outXmlString:xsltProcess = xsltProcess(xml1, xml2,
              {
                test: "hugo"
              }
            );
            this.printLog(outXmlString);
          })

        Button('Xpath计算表达式/page')
          .width('90%')
          .height('100px')
          .onClick(() => {
            const xpathExpr = '/page'
            const expr1:xpathParse = xpathParse(xpathExpr);
            const ctx:ExprContext = new ExprContext(xmlParse(this.xpathXML));
            const e:xpathParse = expr1.evaluate(ctx);
            const nodeSet:xpathParse = e.nodeSetValue();
            this.printLog('XML文档中的page节点数为：' + nodeSet.length);
          })

        Button('Xpath计算表达式/page/location/@lat')
          .width('90%')
          .height('100px')
          .onClick(() => {
            const locationParam = 'location'
            const latParam = 'lat'
            const xpathExpr = `/page/${locationParam}/@${latParam}`
            const expr1:xpathParse = xpathParse(xpathExpr);
            const ctx:ExprContext = new ExprContext(xmlParse(this.xpathXML));
            const result:xpathParse = expr1.evaluate(ctx);
            const nodeSet:xpathParse = result.nodeSetValue();
            this.printLog('当前节点属性为：' + nodeSet[0].nodeName + "=" + nodeSet[0].nodeValue);
          })
      }
      .width('100%')
    }
    .height('100%')
  }

  private printLog(msg: string) {
    hilog.info(0x0000, this.tag, '%{public}s', msg);
    promptAction.showToast({ message: msg })
  }
}