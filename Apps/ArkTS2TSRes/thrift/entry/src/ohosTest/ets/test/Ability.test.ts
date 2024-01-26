let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { WorkI8, WorkI16, WorkI32, WorkI64, WorkBool, WorkBinary, WorkString, WorkSet, WorkMap, WorkList, WorkDouble, Operation } from '../../../main/ets/common/calculator/tutorial_types';
import CalculatorClient from '../../../main/ets/common/calculator/Calculator';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('assertContain', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let a: string = 'abc';
            let b: string = 'b';
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
            expect(a).assertContain(b);
            expect(a).assertEqual(a);
        });
        it('asserti8', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client: CalculatorClient = new CalculatorClient(protocol);
            let workI8Add: WorkI8 = new WorkI8();
            workI8Add.num1 = 1;
            workI8Add.num2 = 15;
            workI8Add.op = Operation.ADD;
            client.calculateI8(1, workI8Add, (result: any) => {
                if (result) {
                    let a: string = '16';
                    expect(a).assertEqual(result);
                }
            });
            let workI8Subtract: WorkI8 = new WorkI8();
            workI8Subtract.num1 = 25;
            workI8Subtract.num2 = 15;
            workI8Subtract.op = Operation.SUBTRACT;
            client.calculateI8(1, workI8Subtract, (result: any) => {
                if (result) {
                    let a: string = '10';
                    expect(a).assertEqual(result);
                }
            });
            let workI8Multiply: WorkI8 = new WorkI8();
            workI8Multiply.num1 = 1;
            workI8Multiply.num2 = 15;
            workI8Multiply.op = Operation.MULTIPLY;
            client.calculateI8(1, workI8Multiply, (result: any) => {
                if (result) {
                    let a: string = '15';
                    expect(a).assertEqual(result);
                }
            });
            let workI8Divide: WorkI8 = new WorkI8();
            workI8Divide.num1 = 15;
            workI8Divide.num2 = 15;
            workI8Divide.op = Operation.DIVIDE;
            client.calculateI8(1, workI8Divide, (result: any) => {
                if (result) {
                    let a: string = '1';
                    expect(a).assertEqual(result);
                }
            });
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
        it('asserti16', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client: CalculatorClient = new CalculatorClient(protocol);
            // let that: ESObject = this;
            let workI16Add = new WorkI16();
            workI16Add.num1 = 10;
            workI16Add.num2 = 15;
            workI16Add.op = Operation.ADD;
            client.calculateI16(1, workI16Add, (result: any) => {
                if (result) {
                    // that.i16add = result;
                    let a: string = '25';
                    expect(a).assertEqual(result);
                }
            });
            let workI16Subtract: WorkI16 = new WorkI16();
            workI16Subtract.num1 = 10;
            workI16Subtract.num2 = 15;
            workI16Subtract.op = Operation.SUBTRACT;
            client.calculateI16(1, workI16Subtract, (result: any) => {
                if (result) {
                    // that.i16subtract = result;
                    let a: string = '-5';
                    expect(a).assertEqual(result);
                }
            });
            let workI16Multiply: WorkI16 = new WorkI16();
            workI16Multiply.num1 = 15;
            workI16Multiply.num2 = 15;
            workI16Multiply.op = Operation.MULTIPLY;
            client.calculateI16(1, workI16Multiply, (result: any) => {
                if (result) {
                    // that.i16multiply = result;
                    let a: string = '225';
                    expect(a).assertEqual(result);
                }
            });
            let workI16Divide: WorkI16 = new WorkI16();
            workI16Divide.num1 = 15;
            workI16Divide.num2 = 15;
            workI16Divide.op = Operation.DIVIDE;
            client.calculateI16(1, workI16Divide, (result: any) => {
                if (result) {
                    ;
                    // that.i16divide = result;
                    let a: string = '1';
                    expect(a).assertEqual(result);
                }
            });
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
        it('asserti32', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client: CalculatorClient = new CalculatorClient(protocol);
            // let that: ESObject = this;
            let workI32Add: WorkI32 = new WorkI32();
            workI32Add.num1 = 100;
            workI32Add.num2 = 150;
            workI32Add.op = Operation.ADD;
            client.calculateI32(1, workI32Add, (result: any) => {
                if (result) {
                    // that.i32add = result;
                    let a: string = '250';
                    expect(a).assertEqual(result);
                }
            });
            let workI32Subtract: WorkI32 = new WorkI32();
            workI32Subtract.num1 = 250;
            workI32Subtract.num2 = 150;
            workI32Subtract.op = Operation.SUBTRACT;
            client.calculateI32(1, workI32Subtract, (result: any) => {
                if (result) {
                    // that.i32subtract = result;
                    let a: string = '100';
                    expect(a).assertEqual(result);
                }
            });
            let workI32Multiply: WorkI32 = new WorkI32();
            workI32Multiply.num1 = 15;
            workI32Multiply.num2 = 15;
            workI32Multiply.op = Operation.MULTIPLY;
            client.calculateI32(1, workI32Multiply, (result: any) => {
                if (result) {
                    // that.i32multiply = result;
                    let a: string = '225';
                    expect(a).assertEqual(result);
                }
            });
            let workI32Divide: WorkI32 = new WorkI32();
            workI32Divide.num1 = 300;
            workI32Divide.num2 = 150;
            workI32Divide.op = Operation.DIVIDE;
            client.calculateI32(1, workI32Divide, (result: any) => {
                if (result) {
                    // that.i32divide = result;
                    expect(2).assertEqual(result);
                }
            });
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
        it('asserti64', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client: CalculatorClient = new CalculatorClient(protocol);
            // let that: ESObject = this;
            let workI64Add: WorkI64 = new WorkI64();
            workI64Add.num1 = 1000;
            workI64Add.num2 = 1500;
            workI64Add.op = Operation.ADD;
            client.calculateI64(1, workI64Add, (result: any) => {
                if (result) {
                    // that.i64add = result;
                    expect(2500).assertEqual(result);
                }
            });
            let workI64Subtract: WorkI64 = new WorkI64();
            workI64Subtract.num1 = 1505;
            workI64Subtract.num2 = 1500;
            workI64Subtract.op = Operation.SUBTRACT;
            client.calculateI64(1, workI64Subtract, (result: any) => {
                if (result) {
                    // that.i64subtract = result;
                    expect(5).assertEqual(result);
                }
            });
            let workI64Multiply: WorkI64 = new WorkI64();
            workI64Multiply.num1 = 100;
            workI64Multiply.num2 = 150;
            workI64Multiply.op = Operation.MULTIPLY;
            client.calculateI64(1, workI64Multiply, (result: any) => {
                if (result) {
                    // that.i64multiply = result;
                    expect(15000).assertEqual(result);
                }
            });
            let workI64Divide: WorkI64 = new WorkI64();
            workI64Divide.num1 = 1500;
            workI64Divide.num2 = 1500;
            workI64Divide.op = Operation.DIVIDE;
            client.calculateI64(1, workI64Divide, (result: any) => {
                if (result) {
                    // that.i64divide = result;
                    expect(1).assertEqual(result);
                }
            });
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
        it('assertother', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client = new CalculatorClient(protocol);
            // let that: ESObject = this;
            let workString: WorkString = new WorkString();
            workString.value1 = 'Thrift';
            workString.value2 = '_OHOS';
            workString.op = Operation.APPEND;
            client.performAppendString(1, workString, (result: any) => {
                if (result) {
                    // that.stringAppend = result;
                    expect('Thrift_OHOS').assertEqual(result);
                }
            });
            let workBool: WorkBool = new WorkBool();
            workBool.value = false;
            workBool.op = Operation.REVERSE_BOOLEAN;
            client.performReverseBoolean(1, workBool, (result: any) => {
                if (result) {
                    // that.boolReverse = result;
                    expect('false').assertEqual(result);
                }
            });
            let workBinary: WorkBinary = new WorkBinary();
            workBinary.value = 'aGk='; // encode base 64 value
            workBinary.op = Operation.BINARY_SIZE;
            client.performByteArraySize(1, workBinary, (result: any) => {
                if (result) {
                    // that.binaryOperation = result;
                    expect(4).assertEqual(result);
                }
            });
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
        it('assertcollections', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client: CalculatorClient = new CalculatorClient(protocol, null);
            // let that: ESObject = this;
            let workMap: WorkMap = new WorkMap();
            workMap.mapValue = {
                'hello': 'world', 'OpenHarmony': 'thrift'
            };
            workMap.op = Operation.MAP_SIZE;
            client.getMapSize(1, workMap, (result: any) => {
                if (result) {
                    // that.mapSize = result;
                    expect(2).assertEqual(result);
                }
            });
            let workSet: WorkSet = new WorkSet();
            workSet.setValue = ['hello', 'world'];
            workSet.op = Operation.SET_SIZE;
            client.getSetSize(1, workSet, (result: any) => {
                if (result) {
                    // that.setSize = result;
                    expect(2).assertEqual(result);
                }
            });
            let workList: WorkList = new WorkList();
            workList.listValue = ['hello', 'world'];
            workList.op = Operation.LIST_SIZE;
            client.getListSize(1, workList, (result: any) => {
                if (result) {
                    // that.listSize = result;
                    expect(2).assertEqual(result);
                }
            });
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
        it('assertdouble', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let protocol: any = new Thrift.Protocol(transport);
            let client = new CalculatorClient(protocol);
            // let that: ESObject = this;
            let workDoubleAdd: WorkDouble = new WorkDouble();
            workDoubleAdd.num1 = 1.07;
            workDoubleAdd.num2 = 5.93;
            workDoubleAdd.op = Operation.ADD;
            client.calculateDouble(1, workDoubleAdd, (result: any) => {
                if (result) {
                    // that.doubleAdd = result;
                    expect(7).assertEqual(result);
                }
            });
            let workDoubleSubtract: WorkDouble = new WorkDouble();
            workDoubleSubtract.num1 = 10.07;
            workDoubleSubtract.num2 = 5.93;
            workDoubleSubtract.op = Operation.SUBTRACT;
            client.calculateDouble(1, workDoubleSubtract, (result: any) => {
                if (result) {
                    // that.doubleSubtrack = result;
                    expect(4.14).assertEqual(result);
                }
            });
            let workDoubleMultiply: WorkDouble = new WorkDouble();
            workDoubleMultiply.num1 = 1.07;
            workDoubleMultiply.num2 = 5.93;
            workDoubleMultiply.op = Operation.MULTIPLY;
            client.calculateDouble(1, workDoubleMultiply, (result: any) => {
                if (result) {
                    // that.doubleMultiply = result;
                    expect(6.3451).assertEqual(result);
                }
            });
            let workDoubleDivide: WorkDouble = new WorkDouble();
            workDoubleDivide.num1 = 5.00;
            workDoubleDivide.num2 = 5.00;
            workDoubleDivide.op = Operation.DIVIDE;
            client.calculateDouble(1, workDoubleDivide, (result: any) => {
                if (result) {
                    // that.doubleDivide = result;
                    expect(1).assertEqual(result);
                }
            });
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
        });
    });
}
