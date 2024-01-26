interface Error_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "error_" + ++__generate__Id;
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
import { timer, interval, throwError, of } from 'rxjs';
import { catchError, mergeMap, retry, map, tap, retryWhen, delayWhen, take } from 'rxjs';
import Log from '../log';
import { MyButton } from '../common/MyButton';
import { retryWhenLogic } from './ArkTools';
class Error extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Error_Params) {
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
            View.create(new MyButton("2", this, { content: "catchError:优雅地处理 observable 序列中的错误", onClickListener: () => {
                    this.catchError();
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                content: "catchError:优雅地处理 observable 序列中的错误", onClickListener: () => {
                    this.catchError();
                }
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyButton("3", this, { content: "retry:如果发生错误，以指定次数重试 observable 序列", onClickListener: () => {
                    this.retry();
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                content: "retry:如果发生错误，以指定次数重试 observable 序列", onClickListener: () => {
                    this.retry();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyButton = (this && this.findChildById) ? this.findChildById("4") as MyButton : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyButton("4", this, { content: "retryWhen:当发生错误时，基于自定义的标准来重试 observable 序列", onClickListener: () => {
                    this.retryWhen();
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                content: "retryWhen:当发生错误时，基于自定义的标准来重试 observable 序列", onClickListener: () => {
                    this.retryWhen();
                }
            });
            View.create(earlierCreatedChild_4);
        }
        Flex.pop();
    }
    catchError() {
        const source = throwError('This is an error!');
        const example = source.pipe(catchError((val: any) => of(`I caught: ${val}`)));
        const subscribe = example.subscribe((val: any) => {
            Log.showLog('catchError--' + val);
        });
    }
    retry() {
        const source = interval(1000);
        const example = source.pipe(mergeMap(val => {
            if (val > 5) {
                return throwError('Error!');
            }
            return of(val);
        }), retry(2));
        const subscribe = example.subscribe({
            next: val => Log.showLog('retry--' + val),
            error: (val: any) => Log.showLog(`retry--${val}: Retried 2 times then quit!`)
        });
    }
    retryWhen() {
        const source = interval(1000).pipe(take(10));
        const example = source.pipe(map(val => retryWhenLogic(val)), retryWhen((errors: any) => errors.pipe(tap((val: any) => {
            Log.showLog(`retryWhen--Value ${val} was too high!`);
        }), delayWhen((val: any) => timer(val * 1000)))));
        let count = 0;
        const that = this;
        const subscribe = example.subscribe({
            next: (val) => {
                Log.showLog(val + '');
                count += val;
                if (count >= 30) {
                    that.close(subscribe);
                }
            }
        });
    }
    close(subscribe: any) {
        setTimeout(() => {
            subscribe.unsubscribe();
        }, 2000);
    }
}
loadDocument(new Error("1", undefined, {}));
