let __generate__Id: number = 0;
function generateId(): string {
    return "Scheduler-spec.test_" + ++__generate__Id;
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
import { expect, describe, it } from '@ohos/hypium';
import { queueScheduler as queue, Subscription } from 'rxjs';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';
import { scheduleCallback } from './ArkTools';
const BASE_COUNT: number = 2000;
export default function queueSchedulerTest() {
    /** @test {Scheduler} */
    describe('Scheduler_queue', () => {
        it('should_schedule_things_recursively', 0, () => {
            let call1 = false;
            let call2 = false;
            queue.schedule(() => {
                call1 = true;
                queue.schedule(() => {
                    call2 = true;
                });
            });
            expect(call1).assertTrue();
            expect(call2).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                queue.schedule(() => { });
            }
            endTime(startTime, 'should_schedule_things_recursively');
        });
        it('should_schedule_things_recursively_via_this_schedule', 0, () => {
            let stateData: any = {
                call1: false, call2: false
            };
            scheduleCallback(stateData);
            expect(stateData.call1).assertTrue();
            expect(stateData.call2).assertTrue();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                scheduleCallback(stateData);
            }
            endTime(startTime, 'should_schedule_things_recursively_via_this_schedule');
        });
        it('should_be_reusable_after_an_error_is_thrown_during_execution', 0, (done: Function) => {
            const results: number[] = [];
            queue.schedule(() => {
                results.push(1);
            });
            queue.schedule(() => {
                try {
                    throw new Error('bad');
                }
                catch (error) {
                    // Catch the error and handle it if needed
                }
            });
            queue.schedule(() => {
                results.push(2);
                expect(results).assertDeepEquals([1, 2]);
                done();
            }, 0);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                queue.schedule(() => { });
            }
            endTime(startTime, 'should_be_reusable_after_an_error_is_thrown_during_execution');
        });
    });
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
