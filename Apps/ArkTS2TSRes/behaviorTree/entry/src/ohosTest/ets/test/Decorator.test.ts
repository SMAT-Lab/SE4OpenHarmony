let __generate__Id: number = 0;
function generateId(): string {
    return "Decorator.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { RUNNING, SUCCESS, FAILURE, Task, Decorator } from 'behaviortree';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Utils } from '../utils/Utils';
const BASE_COUNT: number = 2000;
export default function DecoratorTest() {
    // 通过
    describe('DecoratorTest', () => {
        it('does_nothing_by_itself', 0, () => {
            const task = Utils.TaskRun;
            expect(task.run({ result: SUCCESS })).assertEqual(SUCCESS);
            expect(task.run({ result: FAILURE })).assertEqual(FAILURE);
            const decoratedTask = new Decorator({ node: task });
            expect(decoratedTask.run({ result: SUCCESS })).assertEqual(SUCCESS);
            expect(decoratedTask.run({ result: FAILURE })).assertEqual(FAILURE);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                decoratedTask.run({ result: SUCCESS });
            }
            endTime(startTime, 'does_nothing_by_itself');
        });
        it('can_have_a_start_and_end_callback', 0, () => {
            let blackboard = Utils.DecoratorBlackboard;
            const decoratedTask = Utils.DecoratorDecoratedTask;
            decoratedTask.run(blackboard);
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.end).assertEqual(0);
            Utils.setDecoratorResult(FAILURE);
            decoratedTask.run(blackboard, { rerun: true });
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.end).assertEqual(1);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                decoratedTask.run(blackboard, { rerun: true });
            }
            endTime(startTime, 'can_have_a_start_and_end_callback');
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
