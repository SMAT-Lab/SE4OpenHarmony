interface SlideInBottomAnimationAdapter_Params {
    array?: Array<string>;
    child?: (itemData: ESObject) => void;
    controller?: RecyclerView.Controller;
    list?: Array<ESObject>;
    animateList?: Array<ESObject>;
    start?: number;
    end?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SlideInBottomAnimationAdapter_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import RecyclerView from '../RecyclerView';
export class SlideInBottomAnimationAdapter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__array = new ObservedPropertyObject([], this, "array");
        this.child = undefined;
        this.__controller = new ObservedPropertyObject(new RecyclerView.Controller(), this, "controller");
        this.__list = new ObservedPropertyObject([], this, "list");
        this.__animateList = new ObservedPropertyObject([], this, "animateList");
        this.__start = new ObservedPropertySimple(0, this, "start");
        this.__end = new ObservedPropertySimple(0, this, "end");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SlideInBottomAnimationAdapter_Params) {
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.child !== undefined) {
            this.child = params.child;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.animateList !== undefined) {
            this.animateList = params.animateList;
        }
        if (params.start !== undefined) {
            this.start = params.start;
        }
        if (params.end !== undefined) {
            this.end = params.end;
        }
    }
    aboutToBeDeleted() {
        this.__array.aboutToBeDeleted();
        this.__controller.aboutToBeDeleted();
        this.__list.aboutToBeDeleted();
        this.__animateList.aboutToBeDeleted();
        this.__start.aboutToBeDeleted();
        this.__end.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __array: ObservedPropertyObject<Array<string>>;
    get array() {
        return this.__array.get();
    }
    set array(newValue: Array<string>) {
        this.__array.set(newValue);
    }
    private __child;
    private __controller: ObservedPropertyObject<RecyclerView.Controller>;
    get controller() {
        return this.__controller.get();
    }
    set controller(newValue: RecyclerView.Controller) {
        this.__controller.set(newValue);
    }
    private __list: ObservedPropertyObject<Array<any>>;
    get list() {
        return this.__list.get();
    }
    set list(newValue: Array<any>) {
        this.__list.set(newValue);
    }
    private __animateList: ObservedPropertyObject<Array<any>>;
    get animateList() {
        return this.__animateList.get();
    }
    set animateList(newValue: Array<any>) {
        this.__animateList.set(newValue);
    }
    private __start: ObservedPropertySimple<number>;
    get start() {
        return this.__start.get();
    }
    set start(newValue: number) {
        this.__start.set(newValue);
    }
    private __end: ObservedPropertySimple<number>;
    get end() {
        return this.__end.get();
    }
    set end(newValue: number) {
        this.__end.set(newValue);
    }
    aboutToAppear() {
        this.array.forEach((item: string) => {
            let temp = new RecyclerView.AnimationAdapterTypeData(this.controller.mHeight, item);
            this.list.push(temp);
            this.animateList.push(temp);
        });
    }
    render() {
        List.create();
        List.width('100%');
        List.onScrollIndex((start, end) => {
            this.start = start;
            this.end = end;
            this.animateList.forEach((item: any, index: number) => {
                if (index >= start && index <= end) {
                    let temp = new RecyclerView.AnimationAdapterTypeData(0, item.value);
                    this.animateList.splice(index, 1, temp);
                }
                else {
                    if (this.controller.isFirstOnly) {
                        let temp = new RecyclerView.AnimationAdapterTypeData(this.controller.mHeight, item.value);
                        this.animateList.splice(index, 1, temp);
                    }
                }
            });
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.list), (item: any, index: number) => {
            ListItem.create();
            Context.animation({
                duration: this.controller.duration,
                curve: Curve.Ease,
                delay: 50,
                iterations: 1,
                playMode: PlayMode.Normal // 动画模式
            });
            ListItem.width('100%');
            ListItem.translate({
                y: this.animateList[index].animationAdapterKey
            });
            Context.animation(null);
            this.child(item.value, this);
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
}
