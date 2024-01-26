interface Index_Params {
    value?: string;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Gson, GsonBuilder, parseString, JsonElement } from '@ohos/gson-ts';
import { CustomDialogExample, setData } from './Dialog';
import featureAbility from '@ohos.ability.featureAbility';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new ObservedPropertySimple('{ "name": "张三", "sex": true, "age": 23, "phone": "13900000000", "height" : 176.5 }', this, "value");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {});
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __value: ObservedPropertySimple<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private dialogController: CustomDialogController;
    existApp() {
        console.info('Click the callback in the blank area');
    }
    render() {
        Column.create({ space: 20 });
        Column.width('100%');
        Text.create("请输入JSON字符串格式的数据");
        Text.fontSize(18);
        Text.fontColor("#ee2828");
        Text.pop();
        TextArea.create({ placeholder: "请输入JSON字符串的数据格式", text: this.value });
        TextArea.width("70%");
        TextArea.onChange((value) => {
            this.value = value;
        });
        Button.createWithLabel("json字符串转对象");
        Button.width(260);
        Button.onClick(() => {
            try {
                let obj1 = new Gson().fromJson(this.value);
                let log = '';
                for (let i = 0; i < Object.keys(obj1).length; i++) {
                    log += 'key:' + Object.keys(obj1)[i] + ' value:' + Object.values(obj1)[i] + '; ';
                }
                setData(log, this);
            }
            catch (e) {
                setData("转换失败,请检查JSON字符串格式!", this);
            }
        });
        Button.pop();
        Button.createWithLabel("字符串转object转字符串");
        Button.width(260);
        Button.onClick(() => {
            try {
                let obj1 = new Gson().fromJson(this.value);
                setData(new Gson().toJson(obj1), this); // 原始字符串转为object再转为string
            }
            catch (e) {
                setData("转换失败,请检查JSON字符串格式!", this);
            }
        });
        Button.pop();
        Button.createWithLabel("字符串转object转JsonElement");
        Button.width(260);
        Button.onClick(() => {
            try {
                let obj1 = new Gson().fromJson(this.value);
                let jsonElement: JsonElement = new Gson().toJsonTree(obj1);
                let str3 = new Gson().toJson(jsonElement);
                setData(str3, this); //原始字符串转为object再转为JsonElement再转为string
            }
            catch (e) {
                setData("转换失败,请检查JSON字符串格式!", this);
            }
        });
        Button.pop();
        Button.createWithLabel("字符串转object转JsonElement转object");
        Button.width(260);
        Button.onClick(() => {
            try {
                let obj1 = new Gson().fromJson(this.value);
                let jsonElement: JsonElement = new Gson().toJsonTree(obj1);
                let obj2 = new Gson().fromJson(jsonElement);
                let log = '';
                for (let i = 0; i < Object.keys(obj2).length; i++) {
                    log += 'key:' + Object.keys(obj2)[i] + ' value:' + Object.values(obj2)[i] + '; ';
                }
                setData(log, this); // 原始字符串转为object再转为JsonElement再转为object
            }
            catch (e) {
                setData("转换失败,请检查JSON字符串格式!", this);
            }
        });
        Button.pop();
        Button.createWithLabel("字符串转object转JsonElement转object转字符串");
        Button.width(260);
        Button.onClick(() => {
            try {
                let obj1 = new Gson().fromJson(this.value);
                let jsonElement: JsonElement = new Gson().toJsonTree(obj1);
                let obj2 = new Gson().fromJson(jsonElement);
                let str4 = new Gson().toJson(obj2);
                setData(str4, this); // 原始字符串转为object再转为JsonElement再转为object再转为string
            }
            catch (e) {
                setData("转换失败,请检查JSON字符串格式!", this);
            }
        });
        Button.pop();
        Button.createWithLabel("字符串转object转字符串转JsonElement转字符串");
        Button.width(260);
        Button.onClick(() => {
            try {
                let obj1 = new Gson().fromJson(this.value);
                let str2 = new Gson().toJson(obj1);
                let str5 = new Gson().toJson(parseString(str2));
                // 原始字符串转为object再转为string再转为JsonElement再转为string
                setData(str5, this);
            }
            catch (e) {
                setData("转换失败,请检查JSON字符串格式!", this);
            }
        });
        Button.pop();
        Column.pop();
    }
    aboutToAppear() {
    }
}
loadDocument(new Index("1", undefined, {}));
