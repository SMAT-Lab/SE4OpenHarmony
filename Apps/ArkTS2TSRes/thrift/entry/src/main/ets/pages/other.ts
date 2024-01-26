interface Other_Params {
    stringAppend?: string;
    boolReverse?: string;
    binaryOperation?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "other_" + ++__generate__Id;
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
import { WorkBool, WorkBinary, WorkString, Operation } from '../common/calculator/tutorial_types';
import { GlobalContext } from '../GlobalContext';
class Other extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__stringAppend = new ObservedPropertySimple('STRING APPEND:', this, "stringAppend");
        this.__boolReverse = new ObservedPropertySimple('BOOL REVERSE:', this, "boolReverse");
        this.__binaryOperation = new ObservedPropertySimple('BINARY OPERATION:', this, "binaryOperation");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Other_Params) {
        if (params.stringAppend !== undefined) {
            this.stringAppend = params.stringAppend;
        }
        if (params.boolReverse !== undefined) {
            this.boolReverse = params.boolReverse;
        }
        if (params.binaryOperation !== undefined) {
            this.binaryOperation = params.binaryOperation;
        }
    }
    aboutToBeDeleted() {
        this.__stringAppend.aboutToBeDeleted();
        this.__boolReverse.aboutToBeDeleted();
        this.__binaryOperation.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __stringAppend: ObservedPropertySimple<string>;
    get stringAppend() {
        return this.__stringAppend.get();
    }
    set stringAppend(newValue: string) {
        this.__stringAppend.set(newValue);
    }
    private __boolReverse: ObservedPropertySimple<string>;
    get boolReverse() {
        return this.__boolReverse.get();
    }
    set boolReverse(newValue: string) {
        this.__boolReverse.set(newValue);
    }
    private __binaryOperation: ObservedPropertySimple<string>;
    get binaryOperation() {
        return this.__binaryOperation.get();
    }
    set binaryOperation(newValue: string) {
        this.__binaryOperation.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.stringAppend);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.pop();
        Text.create(this.boolReverse);
        Text.width('100%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xFFFFFF);
        Text.margin({
            top: 10
        });
        Text.pop();
        Text.create(this.binaryOperation);
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
        let workString: WorkString = new WorkString();
        workString.value1 = 'Thrift';
        workString.value2 = '_OHOS';
        workString.op = Operation.APPEND;
        client.performAppendString(1, workString, (result: any) => {
            if (result) {
                that.stringAppend = 'STRING APPEND:' + result;
            }
        });
        let workBool: WorkBool = new WorkBool();
        workBool.value = false;
        workBool.op = Operation.REVERSE_BOOLEAN;
        client.performReverseBoolean(1, workBool, (result: any) => {
            that.boolReverse = 'BOOL REVERSE:' + result;
        });
        let workBinary: WorkBinary = new WorkBinary();
        workBinary.value = 'aGk='; // encode base 64 value
        workBinary.op = Operation.BINARY_SIZE;
        client.performByteArraySize(1, workBinary, (result: any) => {
            if (result) {
                that.binaryOperation = 'BINARY OPERATION:' + result;
            }
        });
    }
}
loadDocument(new Other("1", undefined, {}));
