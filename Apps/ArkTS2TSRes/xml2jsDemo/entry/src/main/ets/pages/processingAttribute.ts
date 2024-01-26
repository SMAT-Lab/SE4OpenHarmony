interface processingAttribute_Params {
    message?: string;
    xml?: string;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "processingAttribute_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import xml2js from 'xml2js';
class processingAttribute extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("", this, "message");
        this.xml = '<root><text>Hello xml2js!</text><Foo:Bar/><test1>123.123</test1><test2>true</test2></root>';
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: processingAttribute_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.xml !== undefined) {
            this.xml = params.xml;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private xml: string;
    private controller: TextAreaController;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        TextArea.create({ placeholder: 'input your xml', controller: this.controller, text: this.xml });
        TextArea.placeholderColor("rgb(0,0,225)");
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(50);
        TextArea.fontSize(18);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.margin(10);
        TextArea.enabled(false);
        Button.createWithLabel("解析XML，转大写");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.processingAttribute();
        });
        Button.pop();
        Button.createWithLabel("解析XML，转小写");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.processingAttribute2();
        });
        Button.pop();
        Button.createWithLabel("解析XML，将第一个字符转换为小写");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.processingAttribute3();
        });
        Button.pop();
        Button.createWithLabel("解析XML，去除xml命名空间前缀");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.processingAttribute4();
        });
        Button.pop();
        Button.createWithLabel("解析XML，将类整数字符串解析为整数");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.processingAttribute5();
        });
        Button.pop();
        Button.createWithLabel("解析XML，将类似布尔的字符床解析为布尔值");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.processingAttribute6();
        });
        Button.pop();
        Text.create(this.message);
        Text.backgroundColor("#ffc4c1c1");
        Text.fontSize(18);
        Text.width("95%");
        Text.height("50%");
        Text.pop();
        Column.pop();
        Row.pop();
    }
    private processingAttribute() {
        // 将名称转换为大写
        xml2js.parseString(this.xml, {
            tagNameProcessors: [this.nameToUpperCase],
            attrNameProcessors: [this.nameToUpperCase],
            valueProcessors: [this.nameToUpperCase],
            attrValueProcessors: [this.nameToUpperCase]
        }, (err: any, result: any) => {
            this.message = JSON.stringify(result);
        });
    }
    private processingAttribute2() {
        // 将名称转换为小写。option.normalize(设置为时自动使用true)
        xml2js.parseString(this.xml, {
            tagNameProcessors: [xml2js.processors.normalize],
            attrNameProcessors: [xml2js.processors.normalize],
            valueProcessors: [xml2js.processors.normalize],
            attrValueProcessors: [xml2js.processors.normalize]
        }, (err: any, result: any) => {
            this.message = JSON.stringify(result);
        });
    }
    private processingAttribute3() {
        // 将第一个字符转换为小写。例如：“MyTagName”变成“myTagName”
        xml2js.parseString(this.xml, {
            tagNameProcessors: [xml2js.processors.firstCharLowerCase],
            attrNameProcessors: [xml2js.processors.firstCharLowerCase],
            valueProcessors: [xml2js.processors.firstCharLowerCase],
            attrValueProcessors: [xml2js.processors.firstCharLowerCase]
        }, (err: any, result: any) => {
            this.message = JSON.stringify(result);
        });
    }
    private processingAttribute4() {
        // 去除xml命名空间前缀。例如<foo:Bar/>将变为“Bar”。（注意：xmlns前缀没有被剥离。）
        xml2js.parseString(this.xml, {
            tagNameProcessors: [xml2js.processors.stripPrefix],
            attrNameProcessors: [xml2js.processors.stripPrefix],
            valueProcessors: [xml2js.processors.stripPrefix],
            attrValueProcessors: [xml2js.processors.stripPrefix]
        }, (err: any, result: any) => {
            this.message = JSON.stringify(result);
        });
    }
    private processingAttribute5() {
        // 将类似整数的字符串解析为整数，将类似浮点字符串解析为浮点数 例如“0”变为0，“15.56”变为15.56
        xml2js.parseString(this.xml, {
            tagNameProcessors: [xml2js.processors.parseNumbers],
            attrNameProcessors: [xml2js.processors.parseNumbers],
            valueProcessors: [xml2js.processors.parseNumbers],
            attrValueProcessors: [xml2js.processors.parseNumbers]
        }, (err: any, result: any) => {
            this.message = JSON.stringify(result);
        });
    }
    private processingAttribute6() {
        // 将类似布尔值的字符串解析为布尔值 例如“真”变为真，“假”变为假
        xml2js.parseString(this.xml, {
            tagNameProcessors: [xml2js.processors.parseBooleans],
            attrNameProcessors: [xml2js.processors.parseBooleans],
            valueProcessors: [xml2js.processors.parseBooleans],
            attrValueProcessors: [xml2js.processors.parseBooleans]
        }, (err: any, result: any) => {
            this.message = JSON.stringify(result);
        });
    }
    private nameToUpperCase(name: string) {
        return name.toLocaleUpperCase();
    }
}
loadDocument(new processingAttribute("1", undefined, {}));
