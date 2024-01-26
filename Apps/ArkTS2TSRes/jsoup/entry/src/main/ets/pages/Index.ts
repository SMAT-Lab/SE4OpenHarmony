interface Index_Params {
    parserContent?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * The MIT License
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import router from '@ohos.router';
import fs from '@ohos.file.fs';
import http from '@ohos.net.http';
import util from '@ohos.util';
import sanitizeHtml from '@ohos/sanitize-html';
import { Element, ChildNode } from 'domhandler';
import { Parser, parseDocument, DomHandler, DomUtils, Document } from '@ohos/htmlparser2';
import { XMLWriter } from '@ohos/htmltoxml';
import resmgr from '@ohos.resourceManager';
import { GlobalContext } from '../common/GlobalContext';
import * as helper from "./helper";
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .tagh1{
        background-color: aquamarine;
        color:'blue';
    }
    .one-div{
        line-height: 30px;
    }
</style>
<body>
    <h1 class="tagh1">
        kkkk
        <p>hhhhh</p>
    </h1>
    <div style="color:red; height:100px;" class="one-div">cshi</div>
    <img src="https:baidu.com" alt="wwww"/>
    <p>wjdwekfe</p>
    <em>dsjfw
    <div>dksfmjk</div>
    owqkdo</em>
</body>
</html>
`;
const fileName = "/jsoup.html";
let resourceManager: resmgr.ResourceManager;
let filesPath: string;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.parserContent = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.parserContent !== undefined) {
            this.parserContent = params.parserContent;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private parserContent: any;
    aboutToAppear() {
        resourceManager = GlobalContext.getContext()
            .getValue("resManager") as resmgr.ResourceManager;
        filesPath = GlobalContext.getContext()
            .getValue("filesPath") as string;
        this.createFile();
    }
    render() {
        Scroll.create();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Button.createWithLabel('从字符串解析HTML');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            let parser = new Parser(helper.getEventCollector((error, actual: any) => {
                if (actual.$event == "opentag") {
                    this.addLog(this.parserContent, `jsoup-- onopentag name --> ${actual.data[0]}  attributes --> ${JSON.stringify(actual.data[1])}`);
                }
                if (actual.$event == "text") {
                    this.addLog(this.parserContent, "jsoup-- text -->" + actual.data);
                }
                if (actual.$event == "opentagname") {
                    this.addLog(this.parserContent, "jsoup-- tagName -->" + actual.data);
                }
                if (actual.$event == "attribute") {
                    this.addLog(this.parserContent, `jsoup-- attribName name --> ${actual.data[0]}  value --> ${actual.data[1]}`);
                }
                if (actual.$event == "closetag") {
                    this.addLog(this.parserContent, "jsoup-- closeTag --> " + actual.data);
                }
                if (actual.$event == "end") {
                    this.showResult(this.parserContent.join('\n'));
                    this.parserContent = [];
                }
            }));
            parser.write(html);
            parser.end();
        });
        Button.pop();
        Button.createWithLabel('解析HTML标签并获取属性');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            let content: any = [];
            let dom: Document = parseDocument(html);
            this.addLog(content, 'jsoup dom.children.length= ' + dom.children.length);
            let element: Element[] = DomUtils.getElementsByTagName('style', dom);
            this.addLog(content, `jsoup element.length = ${element.length}`);
            let text: string = DomUtils.textContent(element);
            this.addLog(content, `jsoup text = ${text}`);
            let isTag: boolean = DomUtils.isTag(element[0]);
            this.addLog(content, `jsoup isTag = ${isTag}`);
            let isCDATA: boolean = DomUtils.isCDATA(element[0]);
            this.addLog(content, `jsoup isCDATA = ${isCDATA}`);
            let isText: boolean = DomUtils.isText(element[0]);
            this.addLog(content, `jsoup isText = ${isText}`);
            let isComment: boolean = DomUtils.isComment(element[0]);
            this.addLog(content, `jsoup isComment = ${isComment}`);
            let body: Element[] = DomUtils.getElementsByTagName('body', dom);
            this.addLog(content, `jsoup body.length = ${body.length}`);
            let childrens: ChildNode[] = DomUtils.getChildren(body[0]);
            this.addLog(content, `jsoup childrens.length = ${childrens.length}`);
            this.showResult(content.join('\n'));
        });
        Button.pop();
        Button.createWithLabel('从rawfile解析HTML');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            let parser = new Parser(helper.getEventCollector((error, actual: any) => {
                if (actual.$event == "opentag") {
                    this.addLog(this.parserContent, `jsoup-- onopentag name --> ${actual.data[0]}  attributes --> ${JSON.stringify(actual.data[1])}`);
                }
                if (actual.$event == "text") {
                    this.addLog(this.parserContent, "jsoup-- text -->" + actual.data);
                }
                if (actual.$event == "opentagname") {
                    this.addLog(this.parserContent, "jsoup-- tagName -->" + actual.data);
                }
                if (actual.$event == "attribute") {
                    this.addLog(this.parserContent, `jsoup-- attribName name --> ${actual.data[0]}  value --> ${actual.data[1]}`);
                }
                if (actual.$event == "closetag") {
                    this.addLog(this.parserContent, "jsoup-- closeTag --> " + actual.data);
                }
                if (actual.$event == "end") {
                    this.showResult(this.parserContent.join('\n'));
                    this.parserContent = [];
                }
            }));
            // 注意：需要先在MainAbility中为该变量赋值： globalThis.Context = this.context;
            if (!resourceManager) {
                console.log('jsoup global Context is undefined');
                this.showResult('jsoup global Context is undefined');
                return;
            }
            resourceManager.getRawFileContent('testHtml.html')
                .then((data) => {
                let textDecoder = util.TextDecoder.create("utf-8", {
                    ignoreBOM: true
                });
                let result: string = textDecoder.decodeWithStream(data, {
                    stream: false
                });
                console.log("jsoup getHtmlFromRawFile text=" + result);
                parser.reset();
                parser.write(result);
                parser.end();
            })
                .catch((err: any) => {
                console.log("jsoup getHtmlFromRawFile err=" + err);
                this.showResult("jsoup getHtmlFromRawFile err=" + err);
            });
        });
        Button.pop();
        Button.createWithLabel('从文件解析HTML');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            let parser = new Parser(helper.getEventCollector((error, actual: any) => {
                if (actual.$event == "opentag") {
                    this.addLog(this.parserContent, `jsoup-- onopentag name --> ${actual.data[0]}  attributes --> ${JSON.stringify(actual.data[1])}`);
                }
                if (actual.$event == "text") {
                    this.addLog(this.parserContent, "jsoup-- text -->" + actual.data);
                }
                if (actual.$event == "opentagname") {
                    this.addLog(this.parserContent, "jsoup-- tagName -->" + actual.data);
                }
                if (actual.$event == "attribute") {
                    this.addLog(this.parserContent, `jsoup-- attribName name --> ${actual.data[0]}  value --> ${actual.data[1]}`);
                }
                if (actual.$event == "closetag") {
                    this.addLog(this.parserContent, "jsoup-- closeTag --> " + actual.data);
                }
                if (actual.$event == "end") {
                    this.showResult(this.parserContent.join('\n'));
                    this.parserContent = [];
                }
            }));
            if (!filesPath) {
                console.log('jsoup global Context is undefined');
                return;
            }
            let filePath = filesPath + '/jsoup.html';
            let isExist = fs.accessSync(filePath);
            if (!isExist) {
                console.log('jsoup file is not found');
                return;
            }
            else {
                console.log('jsoup file is exist');
            }
            fs.readText(filePath)
                .then((data) => {
                console.log("jsoup getHtmlFromFilePath text=" + data);
                parser.reset();
                parser.write(data);
                parser.end();
            })
                .catch((err: any) => {
                console.log("jsoup getHtmlFromFilePath err=" + err);
                this.showResult("jsoup getHtmlFromFilePath err=" + err);
            });
        });
        Button.pop();
        Button.createWithLabel('HTML 标签补充');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/addTag',
            });
        });
        Button.pop();
        Button.createWithLabel('使用DomHandler解析HTML并获取属性');
        Button.fontSize(25);
        Button.margin(15);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            const handler: DomHandler = new DomHandler((error: Error | null, dom: ChildNode[]) => {
                if (error) {
                    // Handle error
                    console.info('jsoup parse console.error()=' + JSON.stringify(error));
                }
                else {
                    // Parsing completed, do something
                    let content: any = [];
                    let elements: Element[] = DomUtils.getElementsByTagName('style', dom);
                    this.addLog(content, 'jsoup elements.length=' + elements.length);
                    let element = elements[0];
                    this.addLog(content, 'jsoup element=' + Object.keys(element));
                    let text: string = DomUtils.getText(elements);
                    this.addLog(content, 'jsoup text=' + text);
                    this.showResult(content.join('\n'));
                }
            });
            const parser = new Parser(handler, { decodeEntities: true });
            parser.write(html);
            parser.end();
        });
        Button.pop();
        Button.createWithLabel('将不允许的标签进行转义');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            const clean: string = sanitizeHtml('before <img src="test.png" /> after', {
                disallowedTagsMode: 'escape',
                allowedTags: [],
                allowedAttributes: false
            });
            console.info('jsoup html clean:' + clean);
            this.showResult('jsoup html clean:' + clean);
        });
        Button.pop();
        Button.createWithLabel('更改标签并且添加属性');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            const dirty = '<ol foo="foo" bar="bar" baz="baz"><li>Hello world</li></ol>';
            const clean: string = sanitizeHtml(dirty, {
                transformTags: { ol: sanitizeHtml.simpleTransform('ul', { class: 'foo' }) },
                allowedAttributes: { ul: ['foo', 'bar', 'class'] }
            });
            console.info('jsoup html update:' + clean);
            this.showResult('jsoup html update:' + clean);
        });
        Button.pop();
        Button.createWithLabel('添加或修改标签的文本内容');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            const dirty = '<a href="http://somelink.com"></a>';
            class test {
                tagName: string;
                attribs: any;
                text: string;
                constructor(tagName: string, attribs: any, text: string) {
                    this.tagName = tagName;
                    this.attribs = attribs;
                    this.text = text;
                }
            }
            class TAG {
                a: any;
                constructor(a: Function) {
                    this.a = a;
                }
            }
            let fun: Function = (tagName: any, attribs: any) => {
                return new test('a', attribs, 'Some text');
            };
            let tag: any = new TAG(fun);
            const clean: string = sanitizeHtml(dirty, {
                transformTags: tag
            });
            console.info('jsoup html add:' + clean);
            this.showResult('jsoup html add:' + clean);
        });
        Button.pop();
        Button.createWithLabel('删除不需要的标签');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            const dirty = '<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>';
            const clean: string = sanitizeHtml(dirty, {
                exclusiveFilter: (frame: any) => {
                    return frame.tag === 'a' && !frame.text.trim();
                }
            });
            console.info('jsoup html delete:' + clean);
            this.showResult('jsoup html delete:' + clean);
        });
        Button.pop();
        Button.createWithLabel('HTML转化成整洁的XHTML');
        Button.fontSize(25);
        Button.margin(15);
        Button.height(46);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.htmlToxml();
        });
        Button.pop();
        Flex.pop();
        Scroll.pop();
    }
    private createFile() {
        let path = filesPath + '/' + fileName;
        let fd = fs.openSync(path, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
        console.log('jsoup fd =' + fd);
        fs.write(fd.fd, html, {
            offset: 0,
            length: html.length,
            encoding: 'utf-8'
        }).then(() => {
            fs.closeSync(fd);
        });
    }
    private htmlToxml() {
        let property: any = [{ key: XMLWriter.DOCTYPE_PUBLIC, value: '-//W3C//DTD XHTML 1.1//EN' },
            { key: XMLWriter.DOCTYPE_SYSTEM, value: 'http://www.w3.org/TR?xhtml11/DTD/xhtml11.dtd' }];
        const xml: XMLWriter = new XMLWriter(html, property);
        xml.convertToXML((content: string | null, error?: Error) => {
            if (content != null) {
                this.showResult(content);
            }
            if (error) {
                let errorResult = 'error=' + JSON.stringify(error);
                console.log(errorResult);
                this.showResult(errorResult);
            }
        });
    }
    private showResult(content: string) {
        router.pushUrl({
            url: 'pages/showResult',
            params: {
                data: content
            }
        });
    }
    private addLog(array: Array<string>, info: string) {
        console.info(info);
        array.push(info);
    }
}
loadDocument(new Index("1", undefined, {}));
