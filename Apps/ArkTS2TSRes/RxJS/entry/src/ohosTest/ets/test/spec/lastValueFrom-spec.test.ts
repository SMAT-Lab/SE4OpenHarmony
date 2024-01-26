let __generate__Id: number = 0;
function generateId(): string {
    return "lastValueFrom-spec.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { from, lastValueFrom, EMPTY, EmptyError, throwError, of } from 'rxjs';
import { describe, expect, it } from '@ohos/hypium';
import { finalize } from 'rxjs';
const HTTP_COUNT = 2000;
export default function lastValueFromTest() {
    describe('lastValueFrom', () => {
        it('should_emit_the_last_value_as_a_promise', 0, async (done: Function) => {
            let finalized = false;
            const source = from([1, 0, 2, 8, 6, 9]).pipe(finalize(() => (finalized = true)));
            const result = await lastValueFrom(source);
            expect(result).assertEqual(9);
            expect(finalized).assertTrue();
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                lastValueFrom(source).then(() => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        console.info("should_emit_the_last_value_as_a_promise startTime: " + startTime + ' μs');
                        console.info("should_emit_the_last_value_as_a_promise endTime: " + endTime + ' μs');
                        console.info("should_emit_the_last_value_as_a_promise averageTime: " + averageTime + ' μs');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        it('should_support_a_default_value', 0, async (done: Function) => {
            const source = EMPTY;
            const result = await lastValueFrom(source, {
                defaultValue: 0
            });
            expect(result).assertEqual(0);
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                lastValueFrom(source, {
                    defaultValue: 0
                }).then(() => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        console.info("should_support_a_default_value startTime: " + startTime + ' μs');
                        console.info("should_support_a_default_value endTime: " + endTime + ' μs');
                        console.info("should_support_a_default_value averageTime: " + averageTime + ' μs');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        it('should_support_an_undefined_config', 0, async (done: Function) => {
            const source = EMPTY;
            let error: any = null;
            try {
                await lastValueFrom(source, undefined as any);
            }
            catch (err) {
                error = err;
            }
            expect(error instanceof EmptyError).assertTrue();
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                lastValueFrom(source, undefined as any).then(() => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        console.info("should_support_an_undefined_config startTime: " + startTime + ' μs');
                        console.info("should_support_an_undefined_config endTime: " + endTime + ' μs');
                        console.info("should_support_an_undefined_config averageTime: " + averageTime + ' μs');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        it('should_error_for_empty_observables', 0, async (done: Function) => {
            const source = EMPTY;
            let error: any = null;
            try {
                await lastValueFrom(source);
            }
            catch (err) {
                error = err;
            }
            expect(error instanceof EmptyError).assertTrue();
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                lastValueFrom(source).then(() => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        console.info("should_error_for_empty_observables startTime: " + startTime + ' μs');
                        console.info("should_error_for_empty_observables endTime: " + endTime + ' μs');
                        console.info("should_error_for_empty_observables averageTime: " + averageTime + ' μs');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        it('should_error_for_errored_observables', 0, async (done: Function) => {
            const source = throwError(() => new Error('blorp!'));
            let error: any = null;
            try {
                await lastValueFrom(source);
            }
            catch (err) {
                error = err;
            }
            expect(error).assertInstanceOf('Error');
            expect(error.message).assertEqual('blorp!');
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                lastValueFrom(source).then(() => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        console.info("should_error_for_errored_observables startTime: " + startTime + ' μs');
                        console.info("should_error_for_errored_observables endTime: " + endTime + ' μs');
                        console.info("should_error_for_errored_observables averageTime: " + averageTime + ' μs');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
        it('should_work_with_a_synchronous_observable', 0, async (done: Function) => {
            let finalized = false;
            const source = of('apples', 'bananas').pipe(finalize(() => (finalized = true)));
            const result = await lastValueFrom(source);
            expect(result).assertEqual('bananas');
            expect(finalized).assertTrue();
            let startTime = new Date().getTime();
            let configUrlTest: (index: number) => void = async (index) => {
                lastValueFrom(source).then((res) => {
                    if (index < HTTP_COUNT) {
                        configUrlTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let averageTime = (endTime - startTime) * 1000 / HTTP_COUNT;
                        console.info("should_work_with_a_synchronous_observable startTime: " + startTime + ' μs');
                        console.info("should_work_with_a_synchronous_observable endTime: " + endTime + ' μs');
                        console.info("should_work_with_a_synchronous_observable averageTime: " + averageTime + ' μs');
                        done();
                    }
                });
            };
            configUrlTest(0);
        });
    });
}
