let __generate__Id: number = 0;
function generateId(): string {
    return "Parallel.test_" + ++__generate__Id;
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
import { describe, beforeEach, it, expect } from '@ohos/hypium';
import { SUCCESS, FAILURE as NO, RUNNING, FAILURE } from 'behaviortree';
import { Task_1, Parallel_1 } from "../utils/constant";
const BASE_COUNT: number = 2000;
export default function ParallelTestDescribe() {
    // 通过
    describe('ParallelTest', () => {
        let countSuccess = 0;
        const successTask = new Task_1({
            run: () => {
                ++countSuccess;
                return SUCCESS;
            }
        });
        let countFail = 0;
        const failTask = new Task_1({
            run: () => {
                ++countFail;
                return FAILURE;
            }
        });
        let countRunning = 0;
        const runningTask = new Task_1({
            run: () => {
                ++countRunning;
                return SUCCESS;
            }
        });
        beforeEach(() => {
            countSuccess = 0;
            countFail = 0;
            countRunning = 0;
        });
        it('runs_all_child_nodes_and_returns_running_child_index_as_long_as_one_node_is_running_and_none_are_failing', 0, () => {
            const parallel = new Parallel_1({
                nodes: [successTask, runningTask, successTask]
            });
            const result = parallel.run();
            expect(countRunning).assertEqual(1);
            expect(countSuccess).assertEqual(2);
            expect(result).assertEqual(SUCCESS);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                parallel.run();
            }
            endTime(startTime, 'runs_all_child_nodes_and_returns_running_child_index_as_long_as_one_node_is_running_and_none_are_failing');
        });
        it('returns_failure_if_one_task_is_failing', 0, () => {
            const parallel = new Parallel_1({
                nodes: [successTask, runningTask, failTask]
            });
            const result = parallel.run();
            expect(countSuccess).assertEqual(1);
            expect(countRunning).assertEqual(1);
            expect(countFail).assertEqual(1);
            expect(result).assertEqual(NO);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                parallel.run();
            }
            endTime(startTime, 'returns_failure_if_one_task_is_failing');
        });
        it('returns_success_if_all_tasks_are_success', 0, () => {
            const parallel = new Parallel_1({
                nodes: [successTask, successTask]
            });
            const result = parallel.run();
            expect(countSuccess).assertEqual(2);
            expect(result).assertEqual(SUCCESS);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                parallel.run();
            }
            endTime(startTime, 'returns_success_if_all_tasks_are_success');
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
