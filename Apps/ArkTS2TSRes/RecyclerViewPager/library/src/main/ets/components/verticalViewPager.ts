interface verticalViewPager_Params {
    arr?: number[];
    offsetY?: number;
    index?: number;
    marginTop?: number;
    marginBottom?: number;
    ContainderWidth?: number | string;
    ContainderHeight?: number;
    offsetFlag?: number;
    pageFlag?: boolean;
    content?: (item: ESObject) => ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "verticalViewPager_" + ++__generate__Id;
}
/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  * http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import { ItemData } from './singleFlingPager';
export class verticalViewPager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arr = new ObservedPropertyObject([], this, "arr");
        this.__offsetY = new SynchedPropertySimpleTwoWay(params.offsetY, this, "offsetY");
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.marginTop = 0;
        this.marginBottom = 0;
        this.ContainderWidth = 0;
        this.ContainderHeight = 0;
        this.offsetFlag = 100;
        this.pageFlag = false;
        this.content = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: verticalViewPager_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.marginTop !== undefined) {
            this.marginTop = params.marginTop;
        }
        if (params.marginBottom !== undefined) {
            this.marginBottom = params.marginBottom;
        }
        if (params.ContainderWidth !== undefined) {
            this.ContainderWidth = params.ContainderWidth;
        }
        if (params.ContainderHeight !== undefined) {
            this.ContainderHeight = params.ContainderHeight;
        }
        if (params.offsetFlag !== undefined) {
            this.offsetFlag = params.offsetFlag;
        }
        if (params.pageFlag !== undefined) {
            this.pageFlag = params.pageFlag;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __arr: ObservedPropertyObject<number[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: number[]) {
        this.__arr.set(newValue);
    }
    private __offsetY: SynchedPropertySimpleTwoWay<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private __index: SynchedPropertySimpleTwoWay<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private marginTop: number;
    private marginBottom: number;
    public ContainderWidth: number | string;
    public ContainderHeight: number;
    private offsetFlag: number;
    private pageFlag: boolean;
    private __content;
    render() {
        Column.create();
        Column.offset({
            x: 0,
            y: ((-this.ContainderHeight * this.index) - this.index * (this.marginBottom + this.marginTop) + this.offsetY)
        });
        Gesture.create(GesturePriority.Low);
        PanGesture.create({});
        PanGesture.onActionStart((event: GestureEvent) => {
            console.info('Pan start');
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            if (this.index == (this.arr.length - 1) && this.offsetY < 0) {
                return;
            }
            this.offsetY = event.offsetY;
            console.info('Pan Update=' + this.offsetY);
        });
        PanGesture.onActionEnd((event: GestureEvent) => {
            if (this.index == (this.arr.length - 1) && this.offsetY < 0) {
                this.pageFlag = false;
                this.offsetY = 0;
                return;
            }
            if (this.offsetY < -this.offsetFlag && this.offsetY < 0) {
                this.pageFlag = false;
                this.offsetY = 0;
                this.index++;
            }
            else if (this.offsetY > this.offsetFlag && this.offsetY > 0) {
                this.offsetY = 0;
                this.pageFlag = false;
                if (this.index == 0) {
                    this.index = 0;
                }
                else {
                    this.index--;
                }
            }
            else if (this.offsetY > -this.offsetFlag && this.offsetY < 0) {
                this.pageFlag = true;
                this.offsetY = 0;
            }
            else if (this.offsetY < this.offsetFlag && this.offsetY > 0) {
                this.pageFlag = true;
                this.offsetY = 0;
            }
        });
        PanGesture.pop();
        Gesture.pop();
        Column.width(this.ContainderWidth);
        Column.height((this.ContainderHeight + this.marginBottom + this.marginTop) * this.arr.length);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr.map((item1: number, index1: number): ItemData => {
            return new ItemData(index1, item1);
        })), (item: ItemData, index) => {
            this.content(item, this);
        }, (item: ItemData) => {
            return JSON.stringify(item.i);
        });
        ForEach.pop();
        Column.pop();
    }
}
