let __generate__Id: number = 0;
function generateId(): string {
    return "InterfaceTime.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
import { describe, it, expect, TestType } from '@ohos/hypium';
import { WorkI8, Operation } from '../../../main/ets/common/calculator/tutorial_types';
import CalculatorClient from '../../../main/ets/common/calculator/Calculator';
export default function InterfaceTime() {
    describe('interfaceTime', () => {
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 2000;
        it('asserti8', TestType.PERFORMANCE, async (done: Function) => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let workI8_TransportStartTime = new Date().getTime();
            //需要输入测试的IP地址
            let transport: any = new Thrift.Transport("http://xx.xx.xx.xx:xxxx");
            let workI8_TransportEndTime = new Date().getTime();
            console.log("Thrift Transport endTime:" + workI8_TransportEndTime);
            let workI8_TransportAverageTime = ((workI8_TransportEndTime - workI8_TransportStartTime) * 1000) / BASE_COUNT;
            console.log("Thrift Transport averageTime:" + workI8_TransportAverageTime + "μs");
            let workI8_ProtocolStartTime = new Date().getTime();
            let protocol: any = new Thrift.Protocol(transport);
            let workI8_ProtocolEndTime = new Date().getTime();
            console.log("Thrift Protocol endTime:" + workI8_ProtocolEndTime);
            let workI8_ProtocolAverageTime = ((workI8_ProtocolEndTime - workI8_ProtocolStartTime) * 1000) / BASE_COUNT;
            console.log("Thrift Protocol averageTime:" + workI8_ProtocolAverageTime + "μs");
            let client: CalculatorClient = new CalculatorClient(protocol);
            let workI8Add: WorkI8 = new WorkI8();
            workI8Add.num1 = 1;
            workI8Add.num2 = 15;
            workI8Add.op = Operation.ADD;
            client.calculateI8(1, workI8Add, (result: any) => {
                if (result) {
                    let a: string = '16';
                    expect(workI8_TransportAverageTime < BASELINE_CREATEHTTP).assertTrue();
                    expect(workI8_ProtocolAverageTime < BASELINE_CREATEHTTP).assertTrue();
                }
            });
            let workI8Subtract: WorkI8 = new WorkI8();
            workI8Subtract.num1 = 25;
            workI8Subtract.num2 = 15;
            workI8Subtract.op = Operation.SUBTRACT;
            client.calculateI8(1, workI8Subtract, (result: any) => {
                if (result) {
                    let a: string = '10';
                    expect(workI8_TransportAverageTime < BASELINE_CREATEHTTP).assertTrue();
                    expect(workI8_ProtocolAverageTime < BASELINE_CREATEHTTP).assertTrue();
                }
            });
            let workI8Multiply: WorkI8 = new WorkI8();
            workI8Multiply.num1 = 1;
            workI8Multiply.num2 = 15;
            workI8Multiply.op = Operation.MULTIPLY;
            client.calculateI8(1, workI8Multiply, (result: any) => {
                if (result) {
                    let a: string = '15';
                    expect(workI8_TransportAverageTime < BASELINE_CREATEHTTP).assertTrue();
                    expect(workI8_ProtocolAverageTime < BASELINE_CREATEHTTP).assertTrue();
                }
            });
            let workI8Divide: WorkI8 = new WorkI8();
            workI8Divide.num1 = 15;
            workI8Divide.num2 = 15;
            workI8Divide.op = Operation.DIVIDE;
            client.calculateI8(1, workI8Divide, (result: any) => {
                if (result) {
                    let a: string = '1';
                    expect(workI8_TransportAverageTime < BASELINE_CREATEHTTP).assertTrue();
                    expect(workI8_ProtocolAverageTime < BASELINE_CREATEHTTP).assertTrue();
                }
            });
            done();
            // Defines a letiety of assertion methods, which are used to declare expected boolean conditions.
        });
    });
}
