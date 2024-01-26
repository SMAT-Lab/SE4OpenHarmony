interface Scheduler_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "scheduler_" + ++__generate__Id;
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
import { Observable, asyncScheduler, from, of, combineLatest, asapScheduler, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
class Scheduler extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Scheduler_Params) {
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
            View.create(new MyButton("2", this, { content: "asyncScheduler", onClickListener: () => {
                    this.async();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "asyncScheduler", onClickListener: () => {
                    this.async();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "asapScheduler", onClickListener: () => {
                    this.asap();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "asapScheduler", onClickListener: () => {
                    this.asap();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, { content: "queueScheduler", onClickListener: () => {
                    this.queue();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "queueScheduler", onClickListener: () => {
                    this.queue();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        Flex.pop();
    }
    async() {
        let observable: any = new Observable<any>((proxyObserver: any) => {
            proxyObserver.next(1);
            proxyObserver.next(2);
            proxyObserver.next(3);
            proxyObserver.complete();
        }).pipe(observeOn(asyncScheduler));
        let finalObserver: any = {
            next(x: any) {
                Log.showLog('async--got value ' + x);
            },
            error(err: any) {
                Log.showError('async--something wrong occurred: ' + err);
            },
            complete() {
                Log.showLog('async--done');
            }
        };
        Log.showLog('async--just before subscribe');
        observable.subscribe(finalObserver);
        Log.showLog('async--just after subscribe');
    }
    asap() {
        const arraySource = from([1, 2], asapScheduler);
        const source = of(10);
        const example = combineLatest(arraySource, source, (a, b) => {
            return a + b;
        });
        example.subscribe(val => {
            Log.showLog('asap--' + val);
        });
    }
    queue() {
        queueScheduler.schedule(() => {
            queueScheduler.schedule(() => Log.showLog('queue--second'));
            Log.showLog('queue--first');
        });
    }
}
loadDocument(new Scheduler("1", undefined, {}));
