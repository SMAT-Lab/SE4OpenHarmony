interface Condition_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "condition_" + ++__generate__Id;
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
import { of } from 'rxjs';
import { defaultIfEmpty, every } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
class Condition extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Condition_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        let earlierCreatedChild_2: MyButton = (this && this.findChildById) ? this.findChildById("2") as MyButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MyButton("2", this, { content: "defaultIfEmpty:如果在完成前没有发出任何通知，那么发出给定的值", onClickListener: () => {
                    this.defaultIfEmpty();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "defaultIfEmpty:如果在完成前没有发出任何通知，那么发出给定的值", onClickListener: () => {
                    this.defaultIfEmpty();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "every:如果完成时所有的值都能通过断言，那么发出 true，否则发出false", onClickListener: () => {
                    this.every();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "every:如果完成时所有的值都能通过断言，那么发出 true，否则发出false", onClickListener: () => {
                    this.every();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        Flex.pop();
    }
    defaultIfEmpty() {
        const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
        const subscribe = exampleOne.subscribe((val: any) => {
            Log.showLog('defaultIfEmpty--' + val);
        });
    }
    every() {
        const source = of(1, 2, 3, 4, 5);
        const example = source.pipe(every(val => val % 2 === 0));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('every--' + val);
        });
    }
}
loadDocument(new Condition("1", undefined, {}));
