interface DereferencingSchemasPage_Params {
    message0?: string;
    message1?: string;
    message2?: string;
    message3?: string;
    schemaArr?: object[];
    cacheSchemaNum?: number;
    isFinish?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DereferencingSchemasPage_" + ++__generate__Id;
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
import { Validator } from '@ohos/jsonschema';
import { dereferaddress, dereferdapro, dereferdata, initSchema } from './IntereceTest';
class DereferencingSchemasPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message0 = new ObservedPropertySimple(`var Validator = require('jsonschema').Validator;
var v = new Validator();
v.addSchema(initialSchema);
function importNextSchema(){
  var nextSchema = v.unresolvedRefs.shift();
  if(!nextSchema){ done(); return; }
  databaseGet(nextSchema, function(schema){
    v.addSchema(schema);
    importNextSchema();
  });
}
importNextSchema();`, this, "message0");
        this.__message1 = new ObservedPropertySimple(`验证对象：--`, this, "message1");
        this.__message2 = new ObservedPropertySimple(`期待结果：暂无`, this, "message2");
        this.__message3 = new ObservedPropertySimple(`实际结果：--`, this, "message3");
        this.schemaArr = [dereferdata, dereferdapro, dereferaddress,];
        this.__cacheSchemaNum = new ObservedPropertySimple(0, this, "cacheSchemaNum");
        this.__isFinish = new ObservedPropertySimple(false, this, "isFinish");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DereferencingSchemasPage_Params) {
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
        if (params.schemaArr !== undefined) {
            this.schemaArr = params.schemaArr;
        }
        if (params.cacheSchemaNum !== undefined) {
            this.cacheSchemaNum = params.cacheSchemaNum;
        }
        if (params.isFinish !== undefined) {
            this.isFinish = params.isFinish;
        }
    }
    aboutToBeDeleted() {
        this.__message0.aboutToBeDeleted();
        this.__message1.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__message3.aboutToBeDeleted();
        this.__cacheSchemaNum.aboutToBeDeleted();
        this.__isFinish.aboutToBeDeleted();
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
    private schemaArr: object[];
    private __cacheSchemaNum: ObservedPropertySimple<number>;
    get cacheSchemaNum() {
        return this.__cacheSchemaNum.get();
    }
    set cacheSchemaNum(newValue: number) {
        this.__cacheSchemaNum.set(newValue);
    }
    private __isFinish: ObservedPropertySimple<boolean>;
    get isFinish() {
        return this.__isFinish.get();
    }
    set isFinish(newValue: boolean) {
        this.__isFinish.set(newValue);
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
        ctx.message2 = `期待结果：${true}`;
        try {
            new Validator().addSchema(initSchema);
            ctx.importNextSchema(new Validator());
            let str = JSON.stringify(new Validator());
            console.log(`jsonschema ------> 测试结果是：${str}`);
            ctx.message1 = `验证对象： ${str}`;
            ctx.message3 = `实际结果：${(ctx.cacheSchemaNum >= 0)}`;
        }
        catch (err) {
            let str = JSON.stringify(err);
            console.log(`jsonschema ------> 验证出错：${str}`);
            ctx.message3 = `验证出错：${str}`;
        }
    }
    importNextSchema(v: any) {
        if (this.cacheSchemaNum >= this.schemaArr.length) {
            this.isFinish = true;
            return;
        }
        this.message1 = `验证对象： ${JSON.stringify(v)}`;
        if (!v.unresolvedRefs.shift()) {
            this.isFinish = true;
            return;
        }
        console.log(`jsonschema ------> 被移除的规则：${JSON.stringify(v.unresolvedRefs.shift())}`);
        v.addSchema(this.schemaArr[this.cacheSchemaNum]);
        this.cacheSchemaNum++;
        this.importNextSchema(v);
    }
}
loadDocument(new DereferencingSchemasPage("1", undefined, {}));
