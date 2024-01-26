let __generate__Id: number = 0;
function generateId(): string {
    return "InterfaceTime.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect, TestType } from '@ohos/hypium';
import { TinyEmitter } from "tiny-emitter";
export default function InterfaceTime() {
    describe('InterfaceTime', () => {
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
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 2000;
        it('emitter_on', TestType.PERFORMANCE, async (done: Function) => {
            let startTime: number = new Date().getTime();
            console.info('interface on startTime:' + startTime);
            let mEmitter: TinyEmitter = new TinyEmitter();
            mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
                let endTime = new Date().getTime();
                console.info('interface on endTime:' + endTime);
                let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
                console.log("interface on:" + averageTime + "μs");
                expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
                done();
            });
            mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
        });
        it('emitter_off', TestType.PERFORMANCE, async (done: Function) => {
            let count = 0;
            let mEmitter: TinyEmitter = new TinyEmitter();
            mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
                count++;
            });
            let startTime = new Date().getTime();
            console.info('interface off startTime:' + startTime);
            mEmitter.off('some-event');
            let endTime = new Date().getTime();
            console.info('interface off endTime:' + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("interface off:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
            mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
            setTimeout(() => {
                expect(count).assertEqual(0);
            }, 10);
        });
        it('emitter_once', TestType.PERFORMANCE, async (done: Function) => {
            let startTime: number = new Date().getTime();
            console.info('interface once startTime:' + startTime);
            let mEmitter: TinyEmitter = new TinyEmitter();
            mEmitter.once('some-event', (arg1: string, arg2: string, arg3: string) => {
                let endTime = new Date().getTime();
                console.info('interface once endTime:' + endTime);
                let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
                console.log("interface once:" + averageTime + "μs");
                expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
                done();
            });
            mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
        });
        it('emit', TestType.PERFORMANCE, async (done: Function) => {
            let mEmitter: TinyEmitter = new TinyEmitter();
            mEmitter.once('some-event', (arg1: string, arg2: string, arg3: string) => { });
            let startTime = new Date().getTime();
            console.info('interface emit startTime:' + startTime);
            mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
            let endTime = new Date().getTime();
            console.info('interface emit endTime:' + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("interface emit:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
