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
import { RUNNING, SUCCESS, FAILURE, Sequence, Selector, Task, Decorator, BehaviorTree, Blackboard, Introspector } from 'behaviortree';
import InvertDecorator from 'behaviortree/lib/decorators/InvertDecorator';
export function diff(obj1, obj2) {
    let o1 = obj1 instanceof Object;
    let o2 = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
        return obj1 === obj2;
    }
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (let o in obj1) {
        let t1 = obj1[o] instanceof Object;
        let t2 = obj2[o] instanceof Object;
        if (t1 && t2) {
            if (!diff(obj1[o], obj2[o])) {
                return false;
            }
        }
        else if (obj1[o] !== obj2[o]) {
            return false;
        }
    }
    return true;
}
export function createTask(name) {
    return new Task({
        name,
        start: function (blackboard) {
            if (blackboard.result[`${name}start`]) {
                ++blackboard.result[`${name}start`];
            }
            else {
                blackboard.result[`${name}start`] = 1;
            }
        },
        end: function (blackboard) {
            if (blackboard.result[`${name}end`]) {
                ++blackboard.result[`${name}end`];
            }
            else {
                blackboard.result[`${name}end`] = 1;
            }
        },
        run: function (blackboard) {
            if (blackboard.result[`${name}run`]) {
                ++blackboard.result[`${name}run`];
            }
            else {
                blackboard.result[`${name}run`] = 1;
            }
            return blackboard.running[name] ? RUNNING : SUCCESS;
        }
    });
}
export class Utils {
    static Blackboard = {
        task2Result: RUNNING,
        start1: 0,
        run1: 0,
        end1: 0,
        start2: 0,
        run2: 0,
        end2: 0,
        start3: 0,
        run3: 0,
        end3: 0,
        startSeq: 0,
        endSeq: 0,
        startDeco: 0,
        endDeco: 0
    };
    static TaskRun = new Task({
        run(blackboard) {
            return blackboard.result;
        }
    });
    static IntBlackboard = {
        start: 0,
        run: 0,
        end: 0,
        result: SUCCESS
    };
    static DecoratorBlackboard = { start: 0, end: 0, result: RUNNING };
    static DecoratorDecoratedTask = new Decorator({
        start: (b) => {
            ++b.start;
        },
        end: (b) => {
            ++b.end;
        },
        node: Utils.TaskRun
    });
    static ResultFirstRun = {
        result: RUNNING
    };
    static WithResult = {
        name: 'sequence',
        result: SUCCESS,
        children: [
            {
                name: 'select1',
                result: SUCCESS,
                children: [
                    {
                        name: 'Bumm',
                        result: FAILURE
                    },
                    {
                        name: 'The Task',
                        result: SUCCESS
                    }
                ]
            },
            {
                name: 'select2',
                result: SUCCESS,
                children: [
                    {
                        result: FAILURE,
                        children: [
                            {
                                name: 'The Task',
                                result: SUCCESS
                            }
                        ]
                    },
                    {
                        name: 'The Task',
                        result: SUCCESS
                    }
                ]
            }
        ]
    };
    static resultChildren = {
        children: [
            {
                name: 'The Task',
                result: SUCCESS
            }
        ],
        result: SUCCESS
    };
    static InvertDecorator(value) {
        // @ts-ignore
        return new InvertDecorator.default(value);
    }
    static resultRun(value) {
        return {
            name: 'The Task',
            result: value
        };
    }
    static Obj(value, obj) {
        return {
            result: value,
            running: obj
        };
    }
    static task2Result(value) {
        Utils.Blackboard.task2Result = value;
    }
    static setDecoratorResult(value) {
        Utils.DecoratorBlackboard.result = value;
    }
    static setIntBlackboard(value) {
        Utils.IntBlackboard.result = value;
    }
    static getInt(introspector) {
        return introspector.lastResult.children.map((x) => x.blackboardChanged);
    }
    static result(name, result, childrenName, childrenResult, obj?) {
        return {
            name: name,
            result: result,
            children: [
                {
                    name: childrenName,
                    result: childrenResult
                },
                obj
            ]
        };
    }
    static result2(name, result, childrenName, childrenResult) {
        return {
            name: name,
            result: result,
            children: [
                {
                    name: childrenName,
                    result: childrenResult
                }
            ]
        };
    }
}
export class BlackboardChangesIntrospector extends Introspector {
    start(tree) {
        //@ts-ignore
        this.blackboardSnap = JSON.stringify(tree.blackboard);
        super.start(tree);
    }
    _toResult(node, result, blackboard) {
        const newSnap = JSON.stringify(blackboard);
        //@ts-ignore
        const blackboardChanged = newSnap !== this.blackboardSnap;
        //@ts-ignore
        this.blackboardSnap = newSnap;
        return {
            ...(node.name ? { name: node.name } : {}),
            result,
            blackboardChanged
        };
    }
}
