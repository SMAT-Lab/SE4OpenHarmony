interface I8_Params {
    i8add?: string;
    i8subtract?: string;
    i8multiply?: string;
    i8divide?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "i8_" + ++__generate__Id;
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
import { WorkI8, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class I8 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__i8add = new ObservedPropertySimple('I8 ADD:', this, "i8add");
        this.__i8subtract = new ObservedPropertySimple('I8 SUBTRACK:', this, "i8subtract");
        this.__i8multiply = new ObservedPropertySimple('I8 MULTIPLY:', this, "i8multiply");
        this.__i8divide = new ObservedPropertySimple('I8 DIVIDE:', this, "i8divide");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: I8_Params) {
        if (params.i8add !== undefined) {
            this.i8add = params.i8add;
        }
        if (params.i8subtract !== undefined) {
            this.i8subtract = params.i8subtract;
        }
        if (params.i8multiply !== undefined) {
            this.i8multiply = params.i8multiply;
        }
        if (params.i8divide !== undefined) {
            this.i8divide = params.i8divide;
        }
    }
    aboutToBeDeleted() {
        this.__i8add.aboutToBeDeleted();
        this.__i8subtract.aboutToBeDeleted();
        this.__i8multiply.aboutToBeDeleted();
        this.__i8divide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __i8add: ObservedPropertySimple<string>;
    get i8add() {
        return this.__i8add.get();
    }
    set i8add(newValue: string) {
        this.__i8add.set(newValue);
    }
    private __i8subtract: ObservedPropertySimple<string>;
    get i8subtract() {
        return this.__i8subtract.get();
    }
    set i8subtract(newValue: string) {
        this.__i8subtract.set(newValue);
    }
    private __i8multiply: ObservedPropertySimple<string>;
    get i8multiply() {
        return this.__i8multiply.get();
    }
    set i8multiply(newValue: string) {
        this.__i8multiply.set(newValue);
    }
    private __i8divide: ObservedPropertySimple<string>;
    get i8divide() {
        return this.__i8divide.get();
    }
    set i8divide(newValue: string) {
        this.__i8divide.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.i8add);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.i8subtract);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i8multiply);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i8divide);
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
        let workI8Add: WorkI8 = new WorkI8();
        workI8Add.num1 = 1;
        workI8Add.num2 = 15;
        workI8Add.op = Operation.ADD;
        client.calculateI8(1, workI8Add, (result: any) => {
            if (result) {
                that.i8add = 'I8 ADD:' + result;
            }
        });
        let workI8Subtract: WorkI8 = new WorkI8();
        workI8Subtract.num1 = 25;
        workI8Subtract.num2 = 15;
        workI8Subtract.op = Operation.SUBTRACT;
        client.calculateI8(1, workI8Subtract, (result: any) => {
            if (result) {
                that.i8subtract = 'I8 SUBTRACK:' + result;
            }
        });
        let workI8Multiply: WorkI8 = new WorkI8();
        workI8Multiply.num1 = 1;
        workI8Multiply.num2 = 15;
        workI8Multiply.op = Operation.MULTIPLY;
        client.calculateI8(1, workI8Multiply, (result: any) => {
            if (result) {
                that.i8multiply = 'I8 MULTIPLY:' + result;
            }
        });
        let workI8Divide: WorkI8 = new WorkI8();
        workI8Divide.num1 = 15;
        workI8Divide.num2 = 15;
        workI8Divide.op = Operation.DIVIDE;
        client.calculateI8(1, workI8Divide, (result: any) => {
            if (result) {
                that.i8divide = 'I8 DIVIDE:' + result;
            }
        });
    }
}
loadDocument(new I8("1", undefined, {}));
