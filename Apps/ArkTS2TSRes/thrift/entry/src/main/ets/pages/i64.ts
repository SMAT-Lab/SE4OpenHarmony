interface I64_Params {
    i64add?: string;
    i64subtract?: string;
    i64multiply?: string;
    i64divide?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "i64_" + ++__generate__Id;
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
import { WorkI64, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class I64 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__i64add = new ObservedPropertySimple('I64 ADD:', this, "i64add");
        this.__i64subtract = new ObservedPropertySimple('I64 SUBTRACK:', this, "i64subtract");
        this.__i64multiply = new ObservedPropertySimple('I64 MULTIPLY:', this, "i64multiply");
        this.__i64divide = new ObservedPropertySimple('I64 DIVIDE:', this, "i64divide");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: I64_Params) {
        if (params.i64add !== undefined) {
            this.i64add = params.i64add;
        }
        if (params.i64subtract !== undefined) {
            this.i64subtract = params.i64subtract;
        }
        if (params.i64multiply !== undefined) {
            this.i64multiply = params.i64multiply;
        }
        if (params.i64divide !== undefined) {
            this.i64divide = params.i64divide;
        }
    }
    aboutToBeDeleted() {
        this.__i64add.aboutToBeDeleted();
        this.__i64subtract.aboutToBeDeleted();
        this.__i64multiply.aboutToBeDeleted();
        this.__i64divide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __i64add: ObservedPropertySimple<string>;
    get i64add() {
        return this.__i64add.get();
    }
    set i64add(newValue: string) {
        this.__i64add.set(newValue);
    }
    private __i64subtract: ObservedPropertySimple<string>;
    get i64subtract() {
        return this.__i64subtract.get();
    }
    set i64subtract(newValue: string) {
        this.__i64subtract.set(newValue);
    }
    private __i64multiply: ObservedPropertySimple<string>;
    get i64multiply() {
        return this.__i64multiply.get();
    }
    set i64multiply(newValue: string) {
        this.__i64multiply.set(newValue);
    }
    private __i64divide: ObservedPropertySimple<string>;
    get i64divide() {
        return this.__i64divide.get();
    }
    set i64divide(newValue: string) {
        this.__i64divide.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.i64add);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.i64subtract);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i64multiply);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i64divide);
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
    onButtonClick() {
        let transport: any = new Thrift.Transport("http://" + GlobalContext.getContext().getValue("ipAddress").toString());
        let protocol: any = new Thrift.Protocol(transport);
        let client: CalculatorClient = new CalculatorClient(protocol);
        let that: any = this;
        let workI64Add: WorkI64 = new WorkI64();
        workI64Add.num1 = 1000;
        workI64Add.num2 = 1500;
        workI64Add.op = Operation.ADD;
        client.calculateI64(1, workI64Add, (result: any) => {
            if (result) {
                that.i64add = 'I64 ADD:' + result;
            }
        });
        let workI64Subtract: WorkI64 = new WorkI64();
        workI64Subtract.num1 = 1505;
        workI64Subtract.num2 = 1500;
        workI64Subtract.op = Operation.SUBTRACT;
        client.calculateI64(1, workI64Subtract, (result: any) => {
            if (result) {
                that.i64subtract = 'I64 SUBTRACK:' + result;
            }
        });
        let workI64Multiply: WorkI64 = new WorkI64();
        workI64Multiply.num1 = 100;
        workI64Multiply.num2 = 150;
        workI64Multiply.op = Operation.MULTIPLY;
        client.calculateI64(1, workI64Multiply, (result: any) => {
            if (result) {
                that.i64multiply = 'I64 MULTIPLY:' + result;
            }
        });
        let workI64Divide: WorkI64 = new WorkI64();
        workI64Divide.num1 = 1500;
        workI64Divide.num2 = 1500;
        workI64Divide.op = Operation.DIVIDE;
        client.calculateI64(1, workI64Divide, (result: any) => {
            if (result) {
                that.i64divide = 'I64 DIVIDE:' + result;
            }
        });
    }
}
loadDocument(new I64("1", undefined, {}));
