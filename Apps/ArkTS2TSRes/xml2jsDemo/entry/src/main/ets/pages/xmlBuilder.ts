interface xmlBuilder_Params {
    message?: string;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "xmlBuilder_" + ++__generate__Id;
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
class xmlBuilder extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("", this, "message");
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: xmlBuilder_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
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
    private controller: TextAreaController;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel("构建XML1");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.xmlBuilder();
        });
        Button.pop();
        Button.createWithLabel("构建XML2");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.xmlBuilder2();
        });
        Button.pop();
        Button.createWithLabel("构建XML3");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.xmlBuilder3();
        });
        Button.pop();
        Button.createWithLabel("构建XML4");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            this.xmlBuilder4();
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
    private xmlBuilder() {
        let obj: any = { name: "Super", Surname: "Man", age: 23 } as any;
        let builder: any = new xml2js.Builder();
        this.message = builder.buildObject(obj);
    }
    private xmlBuilder2() {
        let obj: any = { root: { $: { id: "my id" } as any, _: "my inner text" } as any } as any;
        let builder: any = new xml2js.Builder();
        this.message = builder.buildObject(obj);
    }
    private xmlBuilder3() {
        // 在根元素上声明默认命名空间的示例
        let obj: any = {
            Foo: {
                $: {
                    xmlns: "http://foo.com"
                } as any
            } as any
        } as any;
        let builder: any = new xml2js.Builder();
        this.message = builder.buildObject(obj);
    }
    private xmlBuilder4() {
        // 在非根元素上声明默认命名空间的示例
        let obj: any = {
            foo: {
                $: {
                    foo: 'http://foo.com'
                } as any,
                bar: {
                    $: {
                        bar: 'http://bar.com'
                    } as any
                } as any
            } as any
        } as any;
        let builder: any = new xml2js.Builder();
        this.message = builder.buildObject(obj);
    }
}
loadDocument(new xmlBuilder("1", undefined, {}));
