interface I32_Params {
    i32add?: string;
    i32subtract?: string;
    i32multiply?: string;
    i32divide?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "i32_" + ++__generate__Id;
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
import { WorkI32, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class I32 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__i32add = new ObservedPropertySimple('I32 ADD:', this, "i32add");
        this.__i32subtract = new ObservedPropertySimple('I32 SUBTRACK:', this, "i32subtract");
        this.__i32multiply = new ObservedPropertySimple('I32 MULTIPLY:', this, "i32multiply");
        this.__i32divide = new ObservedPropertySimple('I32 DIVIDE:', this, "i32divide");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: I32_Params) {
        if (params.i32add !== undefined) {
            this.i32add = params.i32add;
        }
        if (params.i32subtract !== undefined) {
            this.i32subtract = params.i32subtract;
        }
        if (params.i32multiply !== undefined) {
            this.i32multiply = params.i32multiply;
        }
        if (params.i32divide !== undefined) {
            this.i32divide = params.i32divide;
        }
    }
    aboutToBeDeleted() {
        this.__i32add.aboutToBeDeleted();
        this.__i32subtract.aboutToBeDeleted();
        this.__i32multiply.aboutToBeDeleted();
        this.__i32divide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __i32add: ObservedPropertySimple<string>;
    get i32add() {
        return this.__i32add.get();
    }
    set i32add(newValue: string) {
        this.__i32add.set(newValue);
    }
    private __i32subtract: ObservedPropertySimple<string>;
    get i32subtract() {
        return this.__i32subtract.get();
    }
    set i32subtract(newValue: string) {
        this.__i32subtract.set(newValue);
    }
    private __i32multiply: ObservedPropertySimple<string>;
    get i32multiply() {
        return this.__i32multiply.get();
    }
    set i32multiply(newValue: string) {
        this.__i32multiply.set(newValue);
    }
    private __i32divide: ObservedPropertySimple<string>;
    get i32divide() {
        return this.__i32divide.get();
    }
    set i32divide(newValue: string) {
        this.__i32divide.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.i32add);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.i32subtract);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i32multiply);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i32divide);
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
        let workI32Add: WorkI32 = new WorkI32();
        workI32Add.num1 = 100;
        workI32Add.num2 = 150;
        workI32Add.op = Operation.ADD;
        client.calculateI32(1, workI32Add, (result: any) => {
            if (result) {
                that.i32add = 'I32 ADD:' + result;
            }
        });
        let workI32Subtract: WorkI32 = new WorkI32();
        workI32Subtract.num1 = 250;
        workI32Subtract.num2 = 150;
        workI32Subtract.op = Operation.SUBTRACT;
        client.calculateI32(1, workI32Subtract, (result: any) => {
            if (result) {
                that.i32subtract = 'I32 SUBTRACK:' + result;
            }
        });
        let workI32Multiply: WorkI32 = new WorkI32();
        workI32Multiply.num1 = 15;
        workI32Multiply.num2 = 15;
        workI32Multiply.op = Operation.MULTIPLY;
        client.calculateI32(1, workI32Multiply, (result: any) => {
            if (result) {
                that.i32multiply = 'I32 MULTIPLY:' + result;
            }
        });
        let workI32Divide: WorkI32 = new WorkI32();
        workI32Divide.num1 = 300;
        workI32Divide.num2 = 150;
        workI32Divide.op = Operation.DIVIDE;
        client.calculateI32(1, workI32Divide, (result: any) => {
            if (result) {
                that.i32divide = 'I32 DIVIDE:' + result;
            }
        });
    }
}
loadDocument(new I32("1", undefined, {}));
