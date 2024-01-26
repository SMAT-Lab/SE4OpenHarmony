interface I16_Params {
    i16add?: string;
    i16subtract?: string;
    i16multiply?: string;
    i16divide?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "i16_" + ++__generate__Id;
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
import { WorkI16, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class I16 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__i16add = new ObservedPropertySimple('I16 ADD:', this, "i16add");
        this.__i16subtract = new ObservedPropertySimple('I16 SUBTRACK:', this, "i16subtract");
        this.__i16multiply = new ObservedPropertySimple('I16 MULTIPLY:', this, "i16multiply");
        this.__i16divide = new ObservedPropertySimple('I16 DIVIDE:', this, "i16divide");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: I16_Params) {
        if (params.i16add !== undefined) {
            this.i16add = params.i16add;
        }
        if (params.i16subtract !== undefined) {
            this.i16subtract = params.i16subtract;
        }
        if (params.i16multiply !== undefined) {
            this.i16multiply = params.i16multiply;
        }
        if (params.i16divide !== undefined) {
            this.i16divide = params.i16divide;
        }
    }
    aboutToBeDeleted() {
        this.__i16add.aboutToBeDeleted();
        this.__i16subtract.aboutToBeDeleted();
        this.__i16multiply.aboutToBeDeleted();
        this.__i16divide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __i16add: ObservedPropertySimple<string>;
    get i16add() {
        return this.__i16add.get();
    }
    set i16add(newValue: string) {
        this.__i16add.set(newValue);
    }
    private __i16subtract: ObservedPropertySimple<string>;
    get i16subtract() {
        return this.__i16subtract.get();
    }
    set i16subtract(newValue: string) {
        this.__i16subtract.set(newValue);
    }
    private __i16multiply: ObservedPropertySimple<string>;
    get i16multiply() {
        return this.__i16multiply.get();
    }
    set i16multiply(newValue: string) {
        this.__i16multiply.set(newValue);
    }
    private __i16divide: ObservedPropertySimple<string>;
    get i16divide() {
        return this.__i16divide.get();
    }
    set i16divide(newValue: string) {
        this.__i16divide.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.i16add);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.i16subtract);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i16multiply);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.i16divide);
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
        let workI16Add: WorkI16 = new WorkI16();
        workI16Add.num1 = 10;
        workI16Add.num2 = 15;
        workI16Add.op = Operation.ADD;
        client.calculateI16(1, workI16Add, (result: any) => {
            if (result) {
                that.i16add = 'I16 ADD:' + result;
            }
        });
        let workI16Subtract: WorkI16 = new WorkI16();
        workI16Subtract.num1 = 10;
        workI16Subtract.num2 = 15;
        workI16Subtract.op = Operation.SUBTRACT;
        client.calculateI16(1, workI16Subtract, (result: any) => {
            if (result) {
                that.i16subtract = 'I16 SUBTRACK:' + result;
            }
        });
        let workI16Multiply: WorkI16 = new WorkI16();
        workI16Multiply.num1 = 15;
        workI16Multiply.num2 = 15;
        workI16Multiply.op = Operation.MULTIPLY;
        client.calculateI16(1, workI16Multiply, (result: any) => {
            if (result) {
                that.i16multiply = 'I16 MULTIPLY:' + result;
            }
        });
        let workI16Divide: WorkI16 = new WorkI16();
        workI16Divide.num1 = 15;
        workI16Divide.num2 = 15;
        workI16Divide.op = Operation.DIVIDE;
        client.calculateI16(1, workI16Divide, (result: any) => {
            if (result) {
                that.i16divide = 'I16 DIVIDE:' + result;
            }
        });
    }
}
loadDocument(new I16("1", undefined, {}));
