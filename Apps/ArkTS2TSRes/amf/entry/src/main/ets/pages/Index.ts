interface Index_Params {
    message?: string;
    message2?: string;
    changedMsg?: string;
    changedMsg2?: string;
    hint1?: string;
    hint2?: string;
    data1?: string;
    data2?: string;
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
import AMF from 'amf-convert';
import router from '@ohos.router';
export interface TestData {
    any: string;
    you: string;
}
export interface TestData2 {
    array: Array<Object>;
    reference: Array<Object>;
}
export interface TestData3 {
    nesting: "of objects";
    yeah: boolean;
    ref: Array<number>;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('AMF.stringify和AMF.parse,点击后看展示', this, "message");
        this.__message2 = new ObservedPropertySimple('AMF.serialize和AMF.deserialize,点击后看展示', this, "message2");
        this.__changedMsg = new ObservedPropertySimple('待转换', this, "changedMsg");
        this.__changedMsg2 = new ObservedPropertySimple('待转换', this, "changedMsg2");
        this.__hint1 = new ObservedPropertySimple('转换后数据', this, "hint1");
        this.__hint2 = new ObservedPropertySimple('转换后数据', this, "hint2");
        this.__data1 = new ObservedPropertySimple('', this, "data1");
        this.__data2 = new ObservedPropertySimple('', this, "data2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.changedMsg !== undefined) {
            this.changedMsg = params.changedMsg;
        }
        if (params.changedMsg2 !== undefined) {
            this.changedMsg2 = params.changedMsg2;
        }
        if (params.hint1 !== undefined) {
            this.hint1 = params.hint1;
        }
        if (params.hint2 !== undefined) {
            this.hint2 = params.hint2;
        }
        if (params.data1 !== undefined) {
            this.data1 = params.data1;
        }
        if (params.data2 !== undefined) {
            this.data2 = params.data2;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__changedMsg.aboutToBeDeleted();
        this.__changedMsg2.aboutToBeDeleted();
        this.__hint1.aboutToBeDeleted();
        this.__hint2.aboutToBeDeleted();
        this.__data1.aboutToBeDeleted();
        this.__data2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __message2: ObservedPropertySimple<string>;
    get message2() {
        return this.__message2.get();
    }
    set message2(newValue: string) {
        this.__message2.set(newValue);
    }
    private __changedMsg: ObservedPropertySimple<string>;
    get changedMsg() {
        return this.__changedMsg.get();
    }
    set changedMsg(newValue: string) {
        this.__changedMsg.set(newValue);
    }
    private __changedMsg2: ObservedPropertySimple<string>;
    get changedMsg2() {
        return this.__changedMsg2.get();
    }
    set changedMsg2(newValue: string) {
        this.__changedMsg2.set(newValue);
    }
    private __hint1: ObservedPropertySimple<string>;
    get hint1() {
        return this.__hint1.get();
    }
    set hint1(newValue: string) {
        this.__hint1.set(newValue);
    }
    private __hint2: ObservedPropertySimple<string>;
    get hint2() {
        return this.__hint2.get();
    }
    set hint2(newValue: string) {
        this.__hint2.set(newValue);
    }
    private __data1: ObservedPropertySimple<string>;
    get data1() {
        return this.__data1.get();
    }
    set data1(newValue: string) {
        this.__data1.set(newValue);
    }
    private __data2: ObservedPropertySimple<string>;
    get data2() {
        return this.__data2.get();
    }
    set data2(newValue: string) {
        this.__data2.set(newValue);
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height('100%');
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Column.create();
        Column.width('100%');
        Column.height(190);
        Column.backgroundColor(Color.Orange);
        Text.create(`源输入data = { any: 'data', you: 'like!'};`);
        Text.width('100%');
        Text.height(50);
        Text.pop();
        Text.create(`经过AMF.stringify和AMF.parse转换后:${this.changedMsg}`);
        Text.width('100%');
        Text.height(100);
        Text.pop();
        Button.createWithLabel(this.message);
        Button.fontSize(12);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            let data: TestData = {
                any: 'data',
                you: 'like!'
            };
            let encodedData: Object = AMF.stringify(data);
            let obj = AMF.parse(encodedData);
            let str = JSON.stringify(obj);
            this.changedMsg = str;
            console.log(str);
        });
        Button.height(40);
        Button.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height(250);
        Column.backgroundColor(Color.Orange);
        Text.create(`源输入data = {"array": [99, 100, 101,{"nesting": "of objects", "yeah?": true, ref: [1, 2, 3]}],"reference": [1, 2, 3]};`);
        Text.width('100%');
        Text.height(70);
        Text.pop();
        Text.create(`经过AMF.serialize和AMF.deserialize转换后:${this.changedMsg2}`);
        Text.width('100%');
        Text.height(140);
        Text.pop();
        Button.createWithLabel(this.message2);
        Button.fontSize(12);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            let dataInner: TestData3 = { nesting: "of objects", yeah: true, ref: [1, 2, 3] };
            let data: TestData2 = {
                array: [99, 100, 101,
                    dataInner
                ],
                reference: [1, 2, 3]
            };
            let encodedData: Object = AMF.serialize(data);
            let obj = AMF.deserialize(encodedData);
            let str = JSON.stringify(obj);
            this.changedMsg2 = str;
            console.log(str);
        });
        Button.height(40);
        Button.pop();
        Column.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.margin({ bottom: 5 });
        Text.create(this.hint1);
        Text.pop();
        TextArea.create({ placeholder: '输入任意数据' });
        TextArea.placeholderColor("rgb(0,0,35)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(144);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            this.data1 = value;
        });
        Button.createWithLabel('填入数据后,点击此处查看amf stringify parse后数据');
        Button.onClick(() => {
            let encodedData: Object = AMF.stringify(this.data1 as Object);
            let obj = AMF.parse(encodedData);
            let str = JSON.stringify(obj);
            this.hint1 = '转换后数据:' + str;
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.margin({ bottom: 5 });
        Text.create(this.hint2);
        Text.pop();
        TextArea.create({ placeholder: '输入任意数据' });
        TextArea.placeholderColor("rgb(0,0,35)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.height(40);
        TextArea.width(144);
        TextArea.fontSize(20);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.onChange((value: string) => {
            this.data2 = value;
        });
        Button.createWithLabel('填入数据后,点击此处查看amf serialize deserialize后数据');
        Button.onClick(() => {
            let encodedData: Object = AMF.serialize(this.data2 as Object);
            let obj = AMF.deserialize(encodedData);
            let str = JSON.stringify(obj);
            this.hint2 = '转换后数据:' + str;
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('跳转至下一个页面测试更多类型');
        Button.onClick(() => {
            router.pushUrl({ url: "pages/Second" });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
