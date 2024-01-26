let __generate__Id: number = 0;
function generateId(): string {
    return "BehaviorTree.test_" + ++__generate__Id;
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
import { RUNNING, SUCCESS, FAILURE, Sequence, Selector, Task, Decorator, BehaviorTree, Blackboard, RunResult } from 'behaviortree';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { createTask, Utils } from '../utils/Utils';
const BASE_COUNT: number = 2000;
let bTree: BehaviorTree;
let blackboard: Blackboard;
export default function BehaviorTreedescribe() {
    // 通过
    describe('with_a_medium_complex_tree', () => {
        const aTask = new Task({
            run: (blackboard: Blackboard): boolean => {
                ++blackboard.aCounter;
                return SUCCESS;
            }
        });
        const bTask = new Task({
            run: (blackboard: Blackboard): boolean => {
                ++blackboard.bCounter;
                return FAILURE;
            }
        });
        const switchTask = new Task({
            run: (blackboard: Blackboard): RunResult => {
                ++blackboard.switchCounter;
                return blackboard.switchResult;
            }
        });
        const tree = new Sequence({
            nodes: [
                aTask,
                aTask,
                new Selector({
                    nodes: [bTask, switchTask, bTask]
                }),
                aTask
            ]
        });
        beforeEach(() => {
            blackboard = {
                aCounter: 0,
                bCounter: 0,
                switchCounter: 0,
                switchResult: RUNNING
            };
            bTree = new BehaviorTree({
                tree, blackboard
            });
        });
        it('controls_stepping_with_running_and_stuff', 0, () => {
            bTree.step();
            expect(blackboard.aCounter).assertEqual(2);
            expect(blackboard.bCounter).assertEqual(1);
            expect(blackboard.switchCounter).assertEqual(1);
            bTree.step();
            expect(blackboard.aCounter).assertEqual(2);
            expect(blackboard.bCounter).assertEqual(1);
            expect(blackboard.switchCounter).assertEqual(2);
            blackboard.switchResult = FAILURE;
            bTree.step();
            expect(blackboard.aCounter).assertEqual(2);
            expect(blackboard.bCounter).assertEqual(2);
            expect(blackboard.switchCounter).assertEqual(3);
            blackboard.switchResult = RUNNING;
            bTree.step();
            expect(blackboard.aCounter).assertEqual(4);
            expect(blackboard.bCounter).assertEqual(3);
            expect(blackboard.switchCounter).assertEqual(4);
            blackboard.switchResult = SUCCESS;
            bTree.step();
            expect(blackboard.aCounter).assertEqual(5);
            expect(blackboard.bCounter).assertEqual(3);
            expect(blackboard.switchCounter).assertEqual(5);
            bTree.step();
            expect(blackboard.aCounter).assertEqual(8);
            expect(blackboard.bCounter).assertEqual(4);
            expect(blackboard.switchCounter).assertEqual(6);
        });
    });
    // 通过
    describe('with_the_simplest_tree_possible1', () => {
        beforeEach(() => {
            blackboard = {
                start: 0,
                run: 0,
                end: 0,
                result: RUNNING
            };
            const tree = new Task({
                start: (blackboard: Blackboard) => {
                    ++blackboard.start;
                },
                run: (blackboard: Blackboard): RunResult => {
                    ++blackboard.run;
                    return blackboard.result;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.end;
                }
            });
            bTree = new BehaviorTree({
                tree, blackboard
            });
        });
        it('running_does_not_call_start_multiple_times', 0, () => {
            bTree.step();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                bTree.step();
            }
            endTime(startTime, 'with_the_simplest_tree_possible1');
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(1);
            expect(blackboard.end).assertEqual(0);
            bTree.step();
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(2);
            expect(blackboard.end).assertEqual(0);
            blackboard.result = FAILURE;
            bTree.step();
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(3);
            expect(blackboard.end).assertEqual(1);
            blackboard.result = SUCCESS;
            bTree.step();
            expect(blackboard.start).assertEqual(2);
            expect(blackboard.run).assertEqual(4);
            expect(blackboard.end).assertEqual(2);
        });
    });
    // 通过
    describe('with_the_simplest_tree_possible2', () => {
        beforeEach(() => {
            blackboard = {
                start: 0,
                run: 0,
                end: 0,
                result: RUNNING
            };
            const tree = new Task({
                start: (blackboard: Blackboard) => {
                    ++blackboard.start;
                },
                run: (blackboard: Blackboard): RunResult => {
                    ++blackboard.run;
                    return blackboard.result;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.end;
                }
            });
            bTree = new BehaviorTree({
                tree, blackboard
            });
        });
        it('running_does_not_call_start_multiple_times', 0, () => {
            bTree.step();
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(1);
            expect(blackboard.end).assertEqual(0);
            bTree.step();
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(2);
            expect(blackboard.end).assertEqual(0);
            blackboard.result = FAILURE;
            bTree.step();
            expect(blackboard.start).assertEqual(1);
            expect(blackboard.run).assertEqual(3);
            expect(blackboard.end).assertEqual(1);
            blackboard.result = SUCCESS;
            bTree.step();
            expect(blackboard.start).assertEqual(2);
            expect(blackboard.run).assertEqual(4);
            expect(blackboard.end).assertEqual(2);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                blackboard.start;
            }
            endTime(startTime, 'running_does_not_call_start_multiple_times');
        });
    });
    // 通过
    describe('registering_of_tasks', () => {
        beforeEach(() => {
            blackboard = {
                taskA: 0,
                taskB: 0,
                taskC: 0,
                result: RUNNING
            };
            BehaviorTree.register('taskA', new Task({
                run: (blackboard: Blackboard): boolean => {
                    ++blackboard.taskA;
                    return SUCCESS;
                }
            }));
            BehaviorTree.register('taskB', new Task({
                run: (blackboard: Blackboard): boolean => {
                    ++blackboard.taskB;
                    return FAILURE;
                }
            }));
        });
        it('looks_up_previously_registered_tasks', 0, () => {
            bTree = new BehaviorTree({
                blackboard,
                tree: new Sequence({
                    nodes: ['taskA', 'taskB', 'taskA']
                })
            });
            bTree.step();
            expect(blackboard.taskA).assertEqual(1);
            expect(blackboard.taskB).assertEqual(1);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                blackboard.taskA;
            }
            endTime(startTime, 'looks_up_previously_registered_tasks');
        });
        it('can_use_function_shortcut_to_create_tasks_with_only_a_run_method', 0, () => {
            BehaviorTree.register('taskC', () => {
                ++blackboard.taskC;
                return FAILURE;
            });
            bTree = new BehaviorTree({
                blackboard,
                tree: new Sequence({
                    nodes: ['taskA', 'taskC', 'taskB']
                })
            });
            bTree.step();
            expect(blackboard.taskA).assertEqual(1);
            expect(blackboard.taskB).assertEqual(0);
            expect(blackboard.taskC).assertEqual(1);
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                blackboard.taskA;
            }
            endTime(startTime, 'can_use_function_shortcut_to_create_tasks_with_only_a_run_method');
        });
        it('can_be_erased', 0, () => {
            BehaviorTree.cleanRegistry();
            bTree = new BehaviorTree({
                blackboard,
                tree: new Selector({
                    nodes: ['taskA', 'taskC', 'taskB']
                })
            });
            expect(() => {
                bTree.step();
            }).assertThrowError('No node with name taskA registered.');
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                BehaviorTree.cleanRegistry();
            }
            endTime(startTime, 'can_be_erased');
        });
        it('can_load_tree_directly_as_registered_sequence', 0, () => {
            BehaviorTree.register('awesome behavior', new Sequence({
                nodes: ['taskA', 'taskB', 'taskA']
            }));
            bTree = new BehaviorTree({
                blackboard,
                tree: 'awesome behavior'
            });
            bTree.step();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                BehaviorTree.register('awesome behavior', new Sequence({
                    nodes: ['taskA', 'taskB', 'taskA']
                }));
            }
            endTime(startTime, 'can_load_tree_directly_as_registered_sequence');
            expect(blackboard.taskA).assertEqual(1);
            expect(blackboard.taskB).assertEqual(1);
        });
        it('looks_up_previously_registered_sequences_with_sub_sequences_as_well', 0, () => {
            BehaviorTree.register('mySubSequence', new Sequence({
                nodes: ['taskA', 'taskB', 'taskA']
            }));
            BehaviorTree.register('mySequence', new Sequence({
                nodes: ['mySubSequence', 'taskB']
            }));
            bTree = new BehaviorTree({
                blackboard,
                tree: new Sequence({
                    nodes: ['mySequence']
                })
            });
            bTree.step();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new BehaviorTree({
                    blackboard,
                    tree: new Sequence({
                        nodes: ['mySequence']
                    })
                });
            }
            endTime(startTime, 'looks_up_previously_registered_sequences_with_sub_sequences_as_well');
            expect(blackboard.taskA).assertEqual(1);
            expect(blackboard.taskB).assertEqual(1);
        });
        it('looks_up_previously_registered_task_within_a_decorators', 0, () => {
            bTree = new BehaviorTree({
                blackboard,
                tree: new Selector({
                    nodes: [Utils.InvertDecorator({
                            node: 'taskA'
                        }), 'taskB']
                })
            });
            bTree.step();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                bTree.step();
            }
            endTime(startTime, 'looks_up_previously_registered_sequences_with_sub_sequences_as_well');
            console.log("testt testt " + blackboard.taskA);
            console.log("testt testt  " + blackboard.taskB);
            expect(blackboard.taskA).assertEqual(1);
            expect(blackboard.taskB).assertEqual(1);
        });
    });
    // 通过
    describe('behavior_with_running_nodes', () => {
        it('calls_start_of_all_task_where_appropriate', 0, () => {
            const task1 = new Task({
                start: (blackboard: Blackboard) => {
                    ++blackboard.start1;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.end1;
                },
                run: (blackboard: Blackboard): boolean => {
                    ++blackboard.run1;
                    return SUCCESS;
                }
            });
            const task2 = new Task({
                start: (blackboard: Blackboard) => {
                    ++blackboard.start2;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.end2;
                },
                run: (blackboard: Blackboard): RunResult => {
                    ++blackboard.run2;
                    return blackboard.task2Result;
                }
            });
            const task3 = new Task({
                start: (blackboard: Blackboard) => {
                    ++blackboard.start3;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.end3;
                },
                run: (blackboard: Blackboard): boolean => {
                    ++blackboard.run3;
                    return SUCCESS;
                }
            });
            const decoratedTask2 = new Decorator({
                start: (blackboard: Blackboard) => {
                    ++blackboard.startDeco;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.endDeco;
                },
                node: task2
            });
            const sequence = new Sequence({
                start: (blackboard: Blackboard) => {
                    ++blackboard.startSeq;
                },
                end: (blackboard: Blackboard) => {
                    ++blackboard.endSeq;
                },
                nodes: [task1, decoratedTask2, task3]
            });
            const blackboard = Utils.Blackboard;
            const bTree = new BehaviorTree({
                tree: sequence,
                blackboard
            });
            bTree.step();
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Sequence({
                    start: (blackboard: Blackboard) => {
                        ++blackboard.startSeq;
                    },
                    end: (blackboard: Blackboard) => {
                        ++blackboard.endSeq;
                    },
                    nodes: [task1, decoratedTask2, task3]
                });
            }
            endTime(startTime, 'behavior_with_running_nodes');
            expect(blackboard.startSeq).assertEqual(1);
            expect(blackboard.endSeq).assertEqual(0);
            expect(blackboard.startDeco).assertEqual(1);
            expect(blackboard.endDeco).assertEqual(0);
            expect(blackboard.start1).assertEqual(1);
            expect(blackboard.run1).assertEqual(1);
            expect(blackboard.end1).assertEqual(1);
            expect(blackboard.start2).assertEqual(1);
            expect(blackboard.run2).assertEqual(1);
            expect(blackboard.end2).assertEqual(0);
            expect(blackboard.start3).assertEqual(0);
            expect(blackboard.run3).assertEqual(0);
            expect(blackboard.end3).assertEqual(0);
            bTree.step();
            expect(blackboard.startSeq).assertEqual(1);
            expect(blackboard.endSeq).assertEqual(0);
            expect(blackboard.startDeco).assertEqual(1);
            expect(blackboard.endDeco).assertEqual(0);
            expect(blackboard.start1).assertEqual(1);
            expect(blackboard.run1).assertEqual(1);
            expect(blackboard.end1).assertEqual(1);
            expect(blackboard.start2).assertEqual(1);
            expect(blackboard.run2).assertEqual(2);
            expect(blackboard.end2).assertEqual(0);
            expect(blackboard.start3).assertEqual(0);
            expect(blackboard.run3).assertEqual(0);
            expect(blackboard.end3).assertEqual(0);
            Utils.task2Result(SUCCESS);
            bTree.step();
            expect(blackboard.startSeq).assertEqual(1);
            expect(blackboard.endSeq).assertEqual(1);
            expect(blackboard.startDeco).assertEqual(1);
            expect(blackboard.endDeco).assertEqual(1);
            expect(blackboard.start1).assertEqual(1);
            expect(blackboard.run1).assertEqual(1);
            expect(blackboard.end1).assertEqual(1);
            expect(blackboard.start2).assertEqual(1);
            expect(blackboard.run2).assertEqual(3);
            expect(blackboard.end2).assertEqual(1);
            expect(blackboard.start3).assertEqual(1);
            expect(blackboard.run3).assertEqual(1);
            expect(blackboard.end3).assertEqual(1);
        });
    });
    // 通过
    describe('some_curious_edge_cases', () => {
        it('start_of_second_sequence_is_called_after_first_reruns', 0, () => {
            const a1 = createTask('a1');
            const b1 = createTask('b1');
            const aSeq = new Sequence({
                nodes: [a1]
            });
            const bSeq = new Sequence({
                nodes: [b1]
            });
            const cSeq = new Sequence({
                nodes: [aSeq, bSeq]
            });
            const blackboard = Utils.Obj({}, {});
            const bTree = new BehaviorTree({
                tree: cSeq,
                blackboard
            });
            blackboard.running.a1 = true;
            bTree.step();
            let start: Options = {
                a1start: 1, a1run: 1
            };
            expect(JSON.stringify(blackboard.result)).assertEqual(JSON.stringify(start));
            blackboard.running.a1 = false;
            bTree.step();
            let startEnd: Options = { a1start: 1, a1run: 2, a1end: 1, b1start: 1, b1run: 1, b1end: 1 };
            expect(JSON.stringify(blackboard.result))
                .assertEqual(JSON.stringify(startEnd));
            let startTime = new Date().getTime();
            for (let index = 0; index < BASE_COUNT; index++) {
                new Sequence({
                    nodes: [aSeq, bSeq]
                });
            }
            endTime(startTime, 'start_of_second_sequence_is_called_after_first_reruns');
        });
    });
}
interface Options {
    a1start?: number;
    a1run?: number;
    a1end?: number;
    b1start?: number;
    b1run?: number;
    b1end?: number;
}
function endTime(startTime: number, tag: string) {
    console.log(tag + ":startTime:" + startTime);
    let endTime: number = new Date().getTime();
    let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT);
    console.log(tag + ":endTime:" + endTime);
    console.log(tag + ":averageTime:" + averageTime + "μs");
}
