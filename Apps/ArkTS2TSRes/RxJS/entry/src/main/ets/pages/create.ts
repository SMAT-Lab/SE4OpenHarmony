interface Create_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "create_" + ++__generate__Id;
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
import { Observable, empty, of, interval, from, range, throwError, timer } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
class Create extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Create_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        let earlierCreatedChild_2: MyButton = (this && this.findChildById) ? this.findChildById("2") as MyButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MyButton("2", this, { content: "create:使用给定的订阅函数来创建observable", onClickListener: () => {
                    this.create();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "create:使用给定的订阅函数来创建observable", onClickListener: () => {
                    this.create();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "empty:立即完成的observable", onClickListener: () => {
                    this.empty();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "empty:立即完成的observable", onClickListener: () => {
                    this.empty();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, { content: "from:将数组、promise或迭代器转换成observable", onClickListener: () => {
                    this.fromArray();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "from:将数组、promise或迭代器转换成observable", onClickListener: () => {
                    this.fromArray();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyButton = (this && this.findChildById) ? this.findChildById("5") as MyButton : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyButton("5", this, { content: "interval:基于给定时间间隔发出数字序列", onClickListener: () => {
                    this.intervalNum();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                content: "interval:基于给定时间间隔发出数字序列", onClickListener: () => {
                    this.intervalNum();
                }
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: MyButton = (this && this.findChildById) ? this.findChildById("6") as MyButton : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MyButton("6", this, { content: "of:按顺序发出任意数量的值", onClickListener: () => {
                    this.ofNum();
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                content: "of:按顺序发出任意数量的值", onClickListener: () => {
                    this.ofNum();
                }
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: MyButton = (this && this.findChildById) ? this.findChildById("7") as MyButton : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new MyButton("7", this, { content: "rang:依次发出给定区间内的数字", onClickListener: () => {
                    this.rang();
                } }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                content: "rang:依次发出给定区间内的数字", onClickListener: () => {
                    this.rang();
                }
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: MyButton = (this && this.findChildById) ? this.findChildById("8") as MyButton : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MyButton("8", this, { content: "rang:依次发出给定区间内的数字", onClickListener: () => {
                    this.rang();
                } }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                content: "rang:依次发出给定区间内的数字", onClickListener: () => {
                    this.rang();
                }
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: MyButton = (this && this.findChildById) ? this.findChildById("9") as MyButton : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MyButton("9", this, { content: "throw:在订阅上发出错误", onClickListener: () => {
                    this.throwError();
                } }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                content: "throw:在订阅上发出错误", onClickListener: () => {
                    this.throwError();
                }
            });
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: MyButton = (this && this.findChildById) ? this.findChildById("10") as MyButton : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new MyButton("10", this, { content: "timer:给定持续时间后，再按照指定间隔时间依次发出数字", onClickListener: () => {
                    this.timer();
                } }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                content: "timer:给定持续时间后，再按照指定间隔时间依次发出数字", onClickListener: () => {
                    this.timer();
                }
            });
            View.create(earlierCreatedChild_10);
        }
        Text.create("fromEvent:将事件转换成observable序列(不支持)");
        Text.fontSize(15);
        Text.width(330);
        Text.height(50);
        Text.fontColor('#ffffff');
        Text.backgroundColor('#dddddd');
        Text.margin({ top: 25, left: 20, right: 20 });
        Text.pop();
        Flex.pop();
        Scroll.pop();
    }
    create() {
        const observable: any = Observable.create((observer: any) => {
            observer.next('Hello');
            observer.next('World');
            setTimeout(() => {
                observer.complete();
            }, 1000);
        });
        const observer: any = {
            next: (x: any) => {
                Log.showLog('create--' + x);
            },
            error: (err: any) => {
                Log.showError('create--Observer got an error: ' + err);
            },
            complete: () => {
                Log.showLog('create--complete');
            },
        };
        const subscription: any = observable.subscribe(observer);
    }
    empty() {
        const subscribe = empty().subscribe({
            next: () => Log.showLog('empty--Next'),
            complete: () => Log.showLog('empty--Complete!')
        });
    }
    fromArray() {
        const arraySource = from([1, 2, 3, 4, 5]);
        const subscribe = arraySource.subscribe(val => {
            Log.showLog('from--' + val);
        });
    }
    intervalNum() {
        const source = interval(1000);
        const subscribe = source.subscribe(val => {
            Log.showLog('interval--' + val);
            if (val > 4) {
                subscribe.unsubscribe();
            }
        });
    }
    ofNum() {
        const source = of(1, 2, 3, 4, 5);
        const subscribe = source.subscribe((val) => {
            Log.showLog('of--' + val);
        });
    }
    rang() {
        const source = range(1, 10);
        const example = source.subscribe((val) => {
            Log.showLog('rang--' + val);
        });
    }
    throwError() {
        const source = throwError('This is an error!');
        const subscribe = source.subscribe({
            next: val => Log.showLog('throwError--' + val),
            complete: () => Log.showLog('throwError--Complete!'),
            error: (val: any) => {
                Log.showLog(`throwError--Error: ${val}`);
            }
        });
    }
    timer() {
        const source = timer(1000, 2000);
        const subscribe = source.subscribe(val => {
            Log.showLog('timer--' + val);
            if (val > 4) {
                subscribe.unsubscribe();
            }
        });
    }
}
loadDocument(new Create("1", undefined, {}));
