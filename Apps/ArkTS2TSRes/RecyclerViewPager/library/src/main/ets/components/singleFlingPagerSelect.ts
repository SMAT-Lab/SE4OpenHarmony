interface singleFlingPagerSelect_Params {
    arr?: number[];
    offsetX?: number;
    offsetY?: number;
    index?: number;
    marginLeft?: number;
    marginRight?: number;
    Containderwidth?: number;
    ContainderHeight?: number | string;
    offsetIndex?: number;
    leftFlag?: boolean;
    TargetPositionFlag?: boolean;
    content?: (item: ESObject, index: ESObject, offsetX: ESObject) => ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "singleFlingPagerSelect_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { ItemData } from './singleFlingPager';
export class singleFlingPagerSelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [];
        this.__offsetX = new SynchedPropertySimpleTwoWay(params.offsetX, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.__index = new SynchedPropertySimpleTwoWay(params.index, this, "index");
        this.marginLeft = 1;
        this.marginRight = 1;
        this.Containderwidth = 0;
        this.ContainderHeight = '100%';
        this.offsetIndex = 100;
        this.leftFlag = false;
        this.TargetPositionFlag = false;
        this.content = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: singleFlingPagerSelect_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.marginLeft !== undefined) {
            this.marginLeft = params.marginLeft;
        }
        if (params.marginRight !== undefined) {
            this.marginRight = params.marginRight;
        }
        if (params.Containderwidth !== undefined) {
            this.Containderwidth = params.Containderwidth;
        }
        if (params.ContainderHeight !== undefined) {
            this.ContainderHeight = params.ContainderHeight;
        }
        if (params.offsetIndex !== undefined) {
            this.offsetIndex = params.offsetIndex;
        }
        if (params.leftFlag !== undefined) {
            this.leftFlag = params.leftFlag;
        }
        if (params.TargetPositionFlag !== undefined) {
            this.TargetPositionFlag = params.TargetPositionFlag;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: number[];
    private __offsetX: SynchedPropertySimpleTwoWay<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __offsetY: ObservedPropertySimple<number>;
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
    private marginLeft: number;
    private marginRight: number;
    private Containderwidth: number;
    private ContainderHeight: number | string;
    private offsetIndex: number;
    private leftFlag: boolean;
    private TargetPositionFlag: boolean;
    private __content;
    render() {
        Row.create();
        Row.offset({
            x: this.offsetX == 0 || this.TargetPositionFlag == true ? this.leftFlag == true ?
                ((-this.Containderwidth * this.index) - this.index * (this.marginLeft + this.marginRight))
                : ((-this.Containderwidth * this.index) - this.index * (this.marginLeft + this.marginRight))
                : ((-this.Containderwidth * this.index) - this.index * (this.marginLeft + this.marginRight) + this.offsetX),
            y: 0
        });
        Gesture.create(GesturePriority.Low);
        PanGesture.create({});
        PanGesture.onActionStart((event: GestureEvent) => {
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            if (this.index == (this.arr.length - 1) && this.offsetX < 0) {
                return;
            }
            this.offsetX = event.offsetX;
            this.offsetY = event.offsetY;
        });
        PanGesture.onActionEnd((event: GestureEvent) => {
            if (this.index == (this.arr.length - 1) && event.offsetX < 0) {
                this.leftFlag = false;
                this.offsetX = 0;
                return;
            }
            if (this.offsetX < -this.offsetIndex && this.offsetX < 0) {
                this.leftFlag = false;
                this.offsetX = 0;
                this.index++;
            }
            else if (this.offsetX > this.offsetIndex && this.offsetX > 0) {
                this.offsetX = 0;
                this.leftFlag = false;
                if (this.index == 0) {
                    this.index = 0;
                }
                else {
                    this.index--;
                }
            }
            else if (this.offsetX > -this.offsetIndex && this.offsetX < 0) {
                this.leftFlag = true;
                this.offsetX = 0;
            }
            else if (this.offsetX < this.offsetIndex && this.offsetX > 0) {
                this.leftFlag = true;
                this.offsetX = 0;
            }
            console.info("this.index=" + this.index + "       this.offsetX=" + this.offsetX);
            console.info('Pan end');
        });
        PanGesture.pop();
        Gesture.pop();
        Row.width(this.Containderwidth * this.arr.length);
        Row.height(this.ContainderHeight);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr.map((item1: number, index1: number): ItemData => {
            return new ItemData(index1, item1);
        })), (item: ItemData, index) => {
            this.content(item, this.index, this.offsetX, this);
        }, (item: ItemData) => {
            return JSON.stringify(item.i);
        });
        ForEach.pop();
        Row.pop();
    }
}
