interface Double_Params {
    doubleAdd?: string;
    doubleSubtrack?: string;
    doubleMultiply?: string;
    doubleDivide?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "double_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { Thrift } from '@ohos/thrift';
import CalculatorClient from '../common/calculator/Calculator';
import { WorkDouble, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class Double extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__doubleAdd = new ObservedPropertySimple('DOUBLE ADD:', this, "doubleAdd");
        this.__doubleSubtrack = new ObservedPropertySimple('DOUBLE SUBTRACK:', this, "doubleSubtrack");
        this.__doubleMultiply = new ObservedPropertySimple('DOUBLE MULTIPLY:', this, "doubleMultiply");
        this.__doubleDivide = new ObservedPropertySimple('DOUBLE DIVIDE:', this, "doubleDivide");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Double_Params) {
        if (params.doubleAdd !== undefined) {
            this.doubleAdd = params.doubleAdd;
        }
        if (params.doubleSubtrack !== undefined) {
            this.doubleSubtrack = params.doubleSubtrack;
        }
        if (params.doubleMultiply !== undefined) {
            this.doubleMultiply = params.doubleMultiply;
        }
        if (params.doubleDivide !== undefined) {
            this.doubleDivide = params.doubleDivide;
        }
    }
    aboutToBeDeleted() {
        this.__doubleAdd.aboutToBeDeleted();
        this.__doubleSubtrack.aboutToBeDeleted();
        this.__doubleMultiply.aboutToBeDeleted();
        this.__doubleDivide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __doubleAdd: ObservedPropertySimple<string>;
    get doubleAdd() {
        return this.__doubleAdd.get();
    }
    set doubleAdd(newValue: string) {
        this.__doubleAdd.set(newValue);
    }
    private __doubleSubtrack: ObservedPropertySimple<string>;
    get doubleSubtrack() {
        return this.__doubleSubtrack.get();
    }
    set doubleSubtrack(newValue: string) {
        this.__doubleSubtrack.set(newValue);
    }
    private __doubleMultiply: ObservedPropertySimple<string>;
    get doubleMultiply() {
        return this.__doubleMultiply.get();
    }
    set doubleMultiply(newValue: string) {
        this.__doubleMultiply.set(newValue);
    }
    private __doubleDivide: ObservedPropertySimple<string>;
    get doubleDivide() {
        return this.__doubleDivide.get();
    }
    set doubleDivide(newValue: string) {
        this.__doubleDivide.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.doubleAdd);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.doubleSubtrack);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.doubleMultiply);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.doubleDivide);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Button.createWithLabel('send request');
        Button.width("100%");
        Button.height(100);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin({
            top: 10
        });
        Button.onClick((event) => {
            this.onButtonClick();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    onBackPress() {
    }
    onButtonClick() {
        let transport: any = new Thrift.Transport("http://" + GlobalContext.getContext().getValue("ipAddress").toString());
        let protocol: any = new Thrift.Protocol(transport);
        let client: CalculatorClient = new CalculatorClient(protocol);
        let that: any = this;
        let workDoubleAdd: WorkDouble = new WorkDouble();
        workDoubleAdd.num1 = 1.07;
        workDoubleAdd.num2 = 5.93;
        workDoubleAdd.op = Operation.ADD;
        client.calculateDouble(1, workDoubleAdd, (result: any) => {
            if (result) {
                that.doubleAdd = 'DOUBLE ADD:' + result;
            }
        });
        let workDoubleSubtract: WorkDouble = new WorkDouble();
        workDoubleSubtract.num1 = 10.07;
        workDoubleSubtract.num2 = 5.93;
        workDoubleSubtract.op = Operation.SUBTRACT;
        client.calculateDouble(1, workDoubleSubtract, (result: any) => {
            if (result) {
                that.doubleSubtrack = 'DOUBLE SUBTRACK:' + result;
            }
        });
        let workDoubleMultiply: WorkDouble = new WorkDouble();
        workDoubleMultiply.num1 = 1.07;
        workDoubleMultiply.num2 = 5.93;
        workDoubleMultiply.op = Operation.MULTIPLY;
        client.calculateDouble(1, workDoubleMultiply, (result: any) => {
            if (result) {
                that.doubleMultiply = 'DOUBLE MULTIPLY:' + result;
            }
        });
        let workDoubleDivide: WorkDouble = new WorkDouble();
        workDoubleDivide.num1 = 5.00;
        workDoubleDivide.num2 = 5.00;
        workDoubleDivide.op = Operation.DIVIDE;
        client.calculateDouble(1, workDoubleDivide, (result: any) => {
            if (result) {
                that.doubleDivide = 'DOUBLE DIVIDE:' + result;
            }
        });
    }
}
loadDocument(new Double("1", undefined, {}));
