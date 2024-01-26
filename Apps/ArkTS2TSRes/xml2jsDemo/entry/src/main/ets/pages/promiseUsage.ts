interface promiseUsage_Params {
    message?: string;
    xml?: string;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "promiseUsage_" + ++__generate__Id;
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
class promiseUsage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("", this, "message");
        this.xml = '<foo> test </foo>';
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: promiseUsage_Params) {
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
        Button.createWithLabel(" start ");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.promiseParse();
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
    private promiseParse() {
        console.log('PromiseParse');
        // With parser
        let parser: any = new xml2js.Parser(/* options */ { trim: true });
        parser.parseStringPromise(this.xml).then((result: any) => {
            this.message = JSON.stringify(result);
            console.log('Done');
        }).catch((err: any) => {
            // Fail
        });
    }
    private promiseParse2() {
        // without parser
        xml2js.parseStringPromise(this.xml, /* options */ { trim: true }).then((result: any) => {
            this.message = JSON.stringify(result);
            console.log('Done');
        }).catch((err: any) => {
        });
    }
}
loadDocument(new promiseUsage("1", undefined, {}));
