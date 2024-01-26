interface Index_Params {
    message?: string;
    versionA?: string;
    versionB?: string;
    operator?: CompareOperator;
    currentEdit?: ECurrentEdit;
    quickTexts?: Array<string>;
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
import { compareVersions, compare, CompareOperator, satisfies, validate, validateStrict } from "compare-versions";
import promptAction from '@ohos.promptAction';
let tag = "COMPARE_VERSIONS----";
enum ECurrentEdit {
    A,
    B
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__versionA = new ObservedPropertySimple("4.1.0", this, "versionA");
        this.__versionB = new ObservedPropertySimple("~10.0.0", this, "versionB");
        this.__operator = new ObservedPropertyObject("<", this, "operator");
        this.__currentEdit = new ObservedPropertySimple(ECurrentEdit.A, this, "currentEdit");
        this.quickTexts = [
            "1.2.7 || >=1.2.9 <2.0.0",
            "1.2.3 - 2.3.4",
            ">=10.2.2",
            "<=10.2.2",
            "~10.0.0",
            "^10.0.0",
            ">10.0.4",
            "<10.2.2",
            "=10.0.1",
            "||", ">=", "<=", "-", "<", ">", "=", "^", "~"
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.versionA !== undefined) {
            this.versionA = params.versionA;
        }
        if (params.versionB !== undefined) {
            this.versionB = params.versionB;
        }
        if (params.operator !== undefined) {
            this.operator = params.operator;
        }
        if (params.currentEdit !== undefined) {
            this.currentEdit = params.currentEdit;
        }
        if (params.quickTexts !== undefined) {
            this.quickTexts = params.quickTexts;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__versionA.aboutToBeDeleted();
        this.__versionB.aboutToBeDeleted();
        this.__operator.aboutToBeDeleted();
        this.__currentEdit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __versionA: ObservedPropertySimple<string>;
    get versionA() {
        return this.__versionA.get();
    }
    set versionA(newValue: string) {
        this.__versionA.set(newValue);
    }
    private __versionB: ObservedPropertySimple<string>;
    get versionB() {
        return this.__versionB.get();
    }
    set versionB(newValue: string) {
        this.__versionB.set(newValue);
    }
    private __operator: ObservedPropertyObject<CompareOperator>;
    get operator() {
        return this.__operator.get();
    }
    set operator(newValue: CompareOperator) {
        this.__operator.set(newValue);
    }
    private __currentEdit: ObservedPropertySimple<ECurrentEdit>;
    get currentEdit() {
        return this.__currentEdit.get();
    }
    set currentEdit(newValue: ECurrentEdit) {
        this.__currentEdit.set(newValue);
    }
    private quickTexts: Array<string>;
    BuildButton(text: string, callback: () => void, parent = null) {
        Button.createWithLabel(text);
        Button.onClick(callback);
        Button.margin({ right: 4, bottom: 4 });
        Button.pop();
    }
    BuildQuickText(text: string, parent = null) {
        Text.create(text);
        Text.fontSize(14);
        Text.margin({ right: 20, bottom: 10 });
        Text.onClick(() => {
            if (this.currentEdit === ECurrentEdit.A) {
                this.versionA = this.versionA.concat(text);
            }
            if (this.currentEdit === ECurrentEdit.B) {
                this.versionB = this.versionB.concat(text);
            }
        });
        Text.border({ width: 1, color: Color.Gray });
        Text.padding(6);
        Text.borderRadius(4);
        Text.pop();
    }
    showMessage(message: string) {
        promptAction.showToast({ message });
        console.log(`${tag}${message}`);
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height("100%");
        Column.padding({ top: 30, left: 10, right: 10 });
        Row.create();
        Row.margin({ bottom: 20 });
        Text.create("版本A：");
        Text.pop();
        TextInput.create({ placeholder: "请输入版本号", text: this.versionA });
        TextInput.width("50%");
        TextInput.onChange((value: string) => {
            this.versionA = value;
        });
        TextInput.onBlur(() => {
            this.currentEdit = ECurrentEdit.B;
            console.log(`vvvv---${this.currentEdit}}`);
        });
        Row.pop();
        Row.create();
        Row.margin({ bottom: 20 });
        Text.create("版本B：");
        Text.pop();
        TextInput.create({ placeholder: "请输入版本号", text: this.versionB });
        TextInput.width("50%");
        TextInput.onChange((value: string) => {
            this.versionB = value;
        });
        TextInput.onBlur(() => {
            this.currentEdit = ECurrentEdit.A;
            console.log(`vvvv---${this.currentEdit}}`);
        });
        Row.pop();
        Row.create();
        Row.margin({ bottom: 20 });
        Text.create("算术运算符：");
        Text.pop();
        Row.create();
        Row.create();
        Row.margin({ right: 10 });
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(this.operator === ">");
        Radio.height(20);
        Radio.width(20);
        Radio.onChange((isChecked: boolean) => {
            this.operator = ">";
        });
        Text.create('>');
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ right: 10 });
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(this.operator === "<");
        Radio.height(20);
        Radio.width(20);
        Radio.onChange((isChecked: boolean) => {
            this.operator = "<";
            console.log('Radio1 status is ' + isChecked);
        });
        Text.create('<');
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ right: 10 });
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(this.operator === "=");
        Radio.height(20);
        Radio.width(20);
        Radio.onChange((isChecked: boolean) => {
            console.log('Radio1 status is ' + isChecked);
            this.operator = "=";
        });
        Text.create('=');
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ right: 10 });
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(this.operator === ">=");
        Radio.height(20);
        Radio.width(20);
        Radio.onChange((isChecked: boolean) => {
            console.log('Radio1 status is ' + isChecked);
            this.operator = ">=";
        });
        Text.create('>=');
        Text.pop();
        Row.pop();
        Row.create();
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(this.operator === "<=");
        Radio.height(20);
        Radio.width(20);
        Radio.onChange((isChecked: boolean) => {
            console.log('Radio1 status is ' + isChecked);
            this.operator = "<=";
        });
        Text.create('<=');
        Text.pop();
        Row.pop();
        Row.pop();
        Row.pop();
        Column.create();
        Column.margin({ bottom: 20 });
        Column.width("100%");
        Text.create("快捷操作：");
        Text.width("100%");
        Text.margin({ bottom: 10 });
        Text.fontSize(16);
        Text.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.quickTexts), (text: string) => {
            this.BuildQuickText(text, this);
        });
        ForEach.pop();
        Flex.pop();
        Column.pop();
        Text.create("操作：");
        Text.width("100%");
        Text.margin({ top: 30, bottom: 20 });
        Text.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        Flex.width("100%");
        this.BuildButton("compareVersions(比较版本号)", () => {
            try {
                this.showMessage(compareVersions(this.versionA, this.versionB) + "");
            }
            catch (err) {
                this.showMessage(err.message);
            }
        }, this);
        this.BuildButton("compare(比较版本号(运算符))", () => {
            try {
                this.showMessage(compare(this.versionA, this.versionB, this.operator) + "");
            }
            catch (err) {
                this.showMessage(err.message);
            }
        }, this);
        this.BuildButton("satisfies(比较版本号(范围))", () => {
            try {
                this.showMessage(satisfies(this.versionA, this.versionB) + "");
            }
            catch (err) {
                this.showMessage(err.message);
            }
        }, this);
        this.BuildButton("版本号排序", () => {
            try {
                const versions = [this.versionA, this.versionB];
                const sorted = versions.sort(compareVersions);
                this.showMessage(JSON.stringify(sorted));
            }
            catch (err) {
                this.showMessage(err.message);
            }
        }, this);
        this.BuildButton("validate(A)", () => {
            this.showMessage(validate(this.versionA) + "");
        }, this);
        this.BuildButton("validateStrict严格模式(A)", () => {
            this.showMessage(validateStrict(this.versionA) + "");
        }, this);
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
