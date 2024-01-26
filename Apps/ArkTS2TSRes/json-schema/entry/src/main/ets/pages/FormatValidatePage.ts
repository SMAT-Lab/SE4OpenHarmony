interface FormatValidatePage_Params {
    message0?: string;
    message1?: string;
    message2?: string;
    message3?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FormatValidatePage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema';
class FormatValidatePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message0 = new ObservedPropertySimple(`Validator.prototype.customFormats.myFormat = function(input) {
  return input === 'myFormat';
};

let validator = new Validator();
validator.validate('myFormat', {type: 'string', format: 'myFormat'}).valid; // true
validator.validate('foo', {type: 'string', format: 'myFormat'}).valid; // false`, this, "message0");
        this.__message1 = new ObservedPropertySimple(`验证对象：--`, this, "message1");
        this.__message2 = new ObservedPropertySimple(`期待结果：暂无`, this, "message2");
        this.__message3 = new ObservedPropertySimple(`实际结果：--`, this, "message3");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FormatValidatePage_Params) {
        if (params.message0 !== undefined) {
            this.message0 = params.message0;
        }
        if (params.message1 !== undefined) {
            this.message1 = params.message1;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.message3 !== undefined) {
            this.message3 = params.message3;
        }
    }
    aboutToBeDeleted() {
        this.__message0.aboutToBeDeleted();
        this.__message1.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__message3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message0: ObservedPropertySimple<string>;
    get message0() {
        return this.__message0.get();
    }
    set message0(newValue: string) {
        this.__message0.set(newValue);
    }
    private __message1: ObservedPropertySimple<string>;
    get message1() {
        return this.__message1.get();
    }
    set message1(newValue: string) {
        this.__message1.set(newValue);
    }
    private __message2: ObservedPropertySimple<string>;
    get message2() {
        return this.__message2.get();
    }
    set message2(newValue: string) {
        this.__message2.set(newValue);
    }
    private __message3: ObservedPropertySimple<string>;
    get message3() {
        return this.__message3.get();
    }
    set message3(newValue: string) {
        this.__message3.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message0);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.fontWeight(FontWeight.Bold);
        Text.backgroundColor('#22E1E1E1');
        Text.maxLines(10);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create(this.message1);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.fontWeight(FontWeight.Bold);
        Text.backgroundColor('#66E1E1E1');
        Text.maxLines(10);
        Text.fontColor(Color.Black);
        Text.margin({
            top: 20
        });
        Text.pop();
        Text.create(this.message2);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.fontWeight(FontWeight.Bold);
        Text.backgroundColor('#66E1E1E1');
        Text.maxLines(10);
        Text.fontColor(Color.Black);
        Text.margin({
            top: 20
        });
        Text.pop();
        Text.create(this.message3);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.fontWeight(FontWeight.Bold);
        Text.backgroundColor('#66E1E1E1');
        Text.maxLines(10);
        Text.fontColor(Color.Black);
        Text.margin({
            top: 20
        });
        Text.pop();
        Button.createWithLabel('验证');
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.width("80%");
        Button.height(100);
        Button.margin({
            top: 20
        });
        Button.onClick((event) => {
            this.validate();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    validate() {
        const ctx = this;
        ctx.message2 = `myFormat期待结果：${true}，foo期待结果：${false}`;
        try {
            let str1 = JSON.stringify(new Validator().validate('myFormat', { type: 'string', format: 'myFormat' }));
            let str2 = JSON.stringify(new Validator().validate('foo', { type: 'string', format: 'myFormat' }));
            console.log(`jsonschema ------> myFormat 测试结果是：${str1}，foo 测试结果是：${str2}`);
            ctx.message1 = `myFormat 验证对象： ${str1}，foo 验证对象： ${str2}`;
            ctx.message3 = `myFormat 实际结果：${new Validator().validate('myFormat', { type: 'string', format: 'myFormat' }).valid}，foo 实际结果：${new Validator().validate('foo', { type: 'string', format: 'myFormat' }).valid}`;
        }
        catch (err) {
            let str = JSON.stringify(err);
            console.log(`jsonschema ------> 验证出错：${str}`);
            ctx.message3 = `验证出错：${str}`;
        }
    }
}
loadDocument(new FormatValidatePage("1", undefined, {}));
