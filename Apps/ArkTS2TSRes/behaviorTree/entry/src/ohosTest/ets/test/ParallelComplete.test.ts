let __generate__Id: number = 0;
function generateId(): string {
    return "ParallelComplete.test_" + ++__generate__Id;
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
import { Blackboard, RunResult, SUCCESS as OK, FAILURE as NO, RUNNING, FAILURE, SUCCESS } from 'behaviortree';
import constant from '@ohos.bluetooth.constant';
import { Task_1, ParallelComplete_1 } from "../utils/constant";
import { isRunning } from 'behaviortree/lib/helper';
const BASE_COUNT: number = 2000;
export default function ParallelCompleteTestDescribe() {
    // 通过
    describe('ParallelCompleteTest', () => {
        beforeEach(() => {
            countSuccess = 0;
            countFail = 0;
            countRunning = 0;
        });
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
                return RUNNING;
            }
        });
        beforeEach(() => {
            countSuccess = 0;
            countFail = 0;
            countRunning = 0;
        });
        it('runs_all_child_nodes_and_returns_running_as_long_as_all_nodes_are_running', 0, () => {
            const parallelComplete = new ParallelComplete_1({
                nodes: [runningTask, runningTask, runningTask]
            });
            const result = parallelComplete.run();
            expect(countRunning).assertEqual(3);
            // expect(result).assertEqual({ total: RUNNING, state: [RUNNING, RUNNING, RUNNING] });
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                parallelComplete.run();
            }
            endTime(startTime, 'runs_all_child_nodes_and_returns_running_as_long_as_all_nodes_are_running');
        });
        it('runs_success_if_one_node_is_success_and_not_one_failing', 0, () => {
            const parallelComplete = new ParallelComplete_1({
                nodes: [runningTask, successTask, runningTask]
            });
            const result = parallelComplete.run();
            expect(countSuccess).assertEqual(1);
            expect(countRunning).assertEqual(2);
            expect(result).assertEqual(SUCCESS);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new ParallelComplete_1({
                    nodes: [runningTask, successTask, runningTask]
                });
            }
            endTime(startTime, 'runs_success_if_one_node_is_success_and_not_one_failing');
        });
        it('runs_failure_if_one_node_is_failure', 0, () => {
            const parallelComplete = new ParallelComplete_1({
                nodes: [runningTask, successTask, failTask]
            });
            const result = parallelComplete.run();
            expect(countSuccess).assertEqual(1);
            expect(countFail).assertEqual(1);
            expect(countRunning).assertEqual(1);
            expect(result).assertEqual(NO);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                parallelComplete.run();
            }
            endTime(startTime, 'runs_failure_if_one_node_is_failure');
        });
    });
    describe('running_tasks', () => {
        const switchTask = new Task_1({
            run: (blackboard: Blackboard): RunResult => {
                ++blackboard.switchCounter1;
                return blackboard.switchResult1;
            }
        });
        const switchTask2 = new Task_1({
            run: (blackboard: Blackboard): RunResult => {
                ++blackboard.switchCounter2;
                return blackboard.switchResult2;
            }
        });
        const switchTask3 = new Task_1({
            run: (blackboard: Blackboard): RunResult => {
                ++blackboard.switchCounter3;
                return blackboard.switchResult3;
            }
        });
        const parallelComplete = new ParallelComplete_1({
            nodes: [switchTask, switchTask2, switchTask3]
        });
        it('returns_running_as_long_as_one_task_is_running_and_stops_if_at_least_one_task_is_returning_a_result', 0, () => {
            const blackboard: Blackboard = {
                switchCounter1: 0,
                switchResult1: RUNNING,
                switchCounter2: 0,
                switchResult2: RUNNING,
                switchCounter3: 0,
                switchResult3: RUNNING
            };
            let result = parallelComplete.run(blackboard);
            expect(blackboard.switchCounter1).assertEqual(1);
            expect(blackboard.switchCounter2).assertEqual(1);
            expect(blackboard.switchCounter3).assertEqual(1);
            expect(result).assertEqual({ total: RUNNING, state: [RUNNING, RUNNING, RUNNING] });
            blackboard.switchResult2 = OK.valueOf();
            result = parallelComplete.run(blackboard, { lastRun: result });
            expect(blackboard.switchCounter1).assertEqual(2);
            expect(blackboard.switchCounter2).assertEqual(2);
            expect(blackboard.switchCounter3).assertEqual(2);
            expect(result).assertEqual(OK);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                parallelComplete.run(blackboard);
            }
            endTime(startTime, 'runs_failure_if_one_node_is_failure');
        });
    });
    describe('start_and_end_callbacks', () => {
        const switchTask = new Task_1({
            start: (blackboard: Blackboard) => {
                ++blackboard.start;
            },
            run: (blackboard: Blackboard): RunResult => {
                ++blackboard.run;
                return blackboard.switchResult;
            },
            end: (blackboard: Blackboard) => {
                ++blackboard.end;
            }
        });
        const runningTask = new Task_1({
            run: () => {
                return RUNNING;
            }
        });
        it('start_is_not_called_again_on_further_running_node', 0, () => {
            const parallelComplete = new ParallelComplete_1({
                nodes: [runningTask, switchTask, runningTask]
            });
            const blackboard: Blackboard = {
                switchResult: RUNNING,
                start: 0,
                run: 0,
                end: 0
            };
            const result = parallelComplete.run(blackboard);
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(1);
            expect(blackboard.end).assertEqual(0);
            const result2 = parallelComplete.run(blackboard, { lastRun: result, rerun: true });
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(2);
            expect(blackboard.end).assertEqual(0);
            blackboard.switchResult = OK.valueOf();
            parallelComplete.run(blackboard, { lastRun: result2, rerun: true });
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(3);
            expect(blackboard.end).assertEqual(1);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                blackboard.start;
            }
            endTime(startTime, 'start_is_not_called_again_on_further_running_node');
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
