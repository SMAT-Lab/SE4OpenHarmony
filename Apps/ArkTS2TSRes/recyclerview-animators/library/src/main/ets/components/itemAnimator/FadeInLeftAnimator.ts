interface FadeInLeftAnimator_Params {
    array?: Array<string>;
    child?: (itemData: ESObject) => void;
    controller?: RecyclerView.Controller;
    myArr?: Array<RecyclerView.ArrayType>;
    duration?: number;
    isClick?: boolean;
    trans?: number;
    offsetX?: number;
    columnsNum?: number;
    colNumStr?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FadeInLeftAnimator_" + ++__generate__Id;
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
export class FadeInLeftAnimator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__array = new ObservedPropertyObject([], this, "array");
        this.child = undefined;
        this.__controller = new ObservedPropertyObject(new RecyclerView.Controller(), this, "controller");
        this.__myArr = new ObservedPropertyObject([], this, "myArr");
        this.__duration = new ObservedPropertySimple(0, this, "duration");
        this.isClick = true;
        this.__trans = new ObservedPropertySimple(0, this, "trans");
        this.__offsetX = new ObservedPropertySimple(-50, this, "offsetX");
        this.columnsNum = 1;
        this.colNumStr = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FadeInLeftAnimator_Params) {
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.child !== undefined) {
            this.child = params.child;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.myArr !== undefined) {
            this.myArr = params.myArr;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.isClick !== undefined) {
            this.isClick = params.isClick;
        }
        if (params.trans !== undefined) {
            this.trans = params.trans;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.columnsNum !== undefined) {
            this.columnsNum = params.columnsNum;
        }
        if (params.colNumStr !== undefined) {
            this.colNumStr = params.colNumStr;
        }
    }
    aboutToBeDeleted() {
        this.__array.aboutToBeDeleted();
        this.__controller.aboutToBeDeleted();
        this.__myArr.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__trans.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
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
    private __myArr: ObservedPropertyObject<Array<RecyclerView.ArrayType>>;
    get myArr() {
        return this.__myArr.get();
    }
    set myArr(newValue: Array<RecyclerView.ArrayType>) {
        this.__myArr.set(newValue);
    }
    private __duration: ObservedPropertySimple<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private isClick: boolean;
    private __trans: ObservedPropertySimple<number>;
    get trans() {
        return this.__trans.get();
    }
    set trans(newValue: number) {
        this.__trans.set(newValue);
    }
    private __offsetX: ObservedPropertySimple<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private columnsNum: number;
    private colNumStr: string;
    aboutToAppear() {
        this.controller.addValueCallback = (index: number, value: any) => {
            this.addValue(index, value);
        };
        this.controller.deleteValueCallback = (index: number) => {
            this.deleteValue(index);
        };
        this.array.forEach((item: string) => {
            let newArr: RecyclerView.ArrayType = new RecyclerView.ArrayType(false, item);
            this.myArr.push(newArr);
        });
        for (let i = 0; i < this.columnsNum; i++) {
            this.colNumStr += '1fr ';
        }
    }
    private addValue(index: number, value: any) {
        if (!this.isClick) {
            return;
        }
        this.isClick = false;
        let newArr: RecyclerView.ArrayType = new RecyclerView.ArrayType(true, value);
        this.trans = 0;
        this.duration = 0;
        this.offsetX = -50;
        this.myArr.splice(index, 0, newArr);
        setTimeout(() => {
            let newArr: RecyclerView.ArrayType = new RecyclerView.ArrayType(true, value);
            this.trans = 1;
            this.offsetX = 0;
            this.duration = this.controller.duration;
            this.myArr.splice(index, 1, newArr);
            setTimeout(() => {
                this.myArr.forEach((item: any) => {
                    item.isNewValue = false;
                });
                this.isClick = true;
            }, this.controller.duration);
        }, 200);
    }
    deleteValue(index: number) {
        if (!this.isClick) {
            return;
        }
        this.isClick = false;
        let currentData: RecyclerView.ArrayType = this.myArr[index];
        currentData.isNewValue = true;
        this.trans = 0;
        this.offsetX = -50;
        this.duration = this.controller.duration;
        setTimeout(() => {
            this.duration = 0;
            this.myArr.splice(index, 1, currentData);
            this.myArr.splice(index, 1);
            this.isClick = true;
        }, this.controller.duration);
    }
    render() {
        Grid.create();
        Grid.columnsTemplate(this.colNumStr);
        Grid.columnsGap(2);
        Grid.rowsGap(2);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.myArr), (item: RecyclerView.ArrayType) => {
            GridItem.create();
            Context.animation({
                duration: this.duration,
                curve: Curve.Ease,
                delay: 50,
                iterations: 1,
                playMode: PlayMode.Normal // 动画模式
            });
            GridItem.opacity(item.isNewValue ? this.trans : 1);
            GridItem.offset({ x: item.isNewValue ? this.offsetX : 0, y: 0 });
            Context.animation(null);
            this.child(item.value, this);
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
    }
}
