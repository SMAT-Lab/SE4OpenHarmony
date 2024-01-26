interface ShimmerElement_Params {
    content?: () => void;
    setting?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    value?: number;
    grad?: CanvasGradient;
    mWidth?: number;
    mHeight?: number;
    ids?: string;
    mShimmer?: Shimmer;
    isFlag?: boolean;
    intervalId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ShimmerElement_" + ++__generate__Id;
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
import { Shimmer, Shapes, Directions } from './Shimmer';
export class ShimmerElement extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.content = undefined;
        this.setting = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.setting);
        this.__value = new ObservedPropertySimple(-100, this, "value");
        this.grad = this.context.createLinearGradient(this.value, 0, 50 + this.value, 50);
        this.__mWidth = new ObservedPropertySimple(0, this, "mWidth");
        this.__mHeight = new ObservedPropertySimple(0, this, "mHeight");
        this.__ids = new ObservedPropertySimple('', this, "ids");
        this.__mShimmer = new SynchedPropertyObjectTwoWay(params.mShimmer, this, "mShimmer");
        this.__isFlag = new ObservedPropertySimple(false, this, "isFlag");
        this.__intervalId = new ObservedPropertySimple(-1, this, "intervalId");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ShimmerElement_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.setting !== undefined) {
            this.setting = params.setting;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.grad !== undefined) {
            this.grad = params.grad;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.ids !== undefined) {
            this.ids = params.ids;
        }
        if (params.isFlag !== undefined) {
            this.isFlag = params.isFlag;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        this.__mWidth.aboutToBeDeleted();
        this.__mHeight.aboutToBeDeleted();
        this.__ids.aboutToBeDeleted();
        this.__mShimmer.aboutToBeDeleted();
        this.__isFlag.aboutToBeDeleted();
        this.__intervalId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content;
    // 初始化RenderingContextSettings并设置为抗锯齿
    private setting: RenderingContextSettings;
    // 初始化CanvasRenderingContext2D
    private context: CanvasRenderingContext2D;
    private __value: ObservedPropertySimple<number>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: number) {
        this.__value.set(newValue);
    }
    private grad: CanvasGradient;
    private __mWidth: ObservedPropertySimple<number>;
    get mWidth() {
        return this.__mWidth.get();
    }
    set mWidth(newValue: number) {
        this.__mWidth.set(newValue);
    }
    private __mHeight: ObservedPropertySimple<number>;
    get mHeight() {
        return this.__mHeight.get();
    }
    set mHeight(newValue: number) {
        this.__mHeight.set(newValue);
    }
    private __ids: ObservedPropertySimple<string>;
    get ids() {
        return this.__ids.get();
    }
    set ids(newValue: string) {
        this.__ids.set(newValue);
    }
    private __mShimmer: SynchedPropertySimpleOneWay<Shimmer>;
    get mShimmer() {
        return this.__mShimmer.get();
    }
    set mShimmer(newValue: Shimmer) {
        this.__mShimmer.set(newValue);
    }
    private __isFlag: ObservedPropertySimple<boolean>;
    get isFlag() {
        return this.__isFlag.get();
    }
    set isFlag(newValue: boolean) {
        this.__isFlag.set(newValue);
    }
    private __intervalId: ObservedPropertySimple<number>;
    get intervalId() {
        return this.__intervalId.get();
    }
    set intervalId(newValue: number) {
        this.__intervalId.set(newValue);
    }
    aboutToAppear(): void {
        this.ids = this.generateUUID();
    }
    getSize(id: string): Array<number> {
        let info: any = JSON.parse(getInspectorByKey(id));
        let rectStr: string[] = info.$rect
            .replace('][', ',')
            .replace('[', '')
            .replace(']', '')
            .replace(' ', '')
            .split(',');
        return [Number(rectStr[2]) - Number(rectStr[0]), Number(rectStr[3]) - Number(rectStr[1])];
    }
    generateUUID(): string {
        let d = new Date().getTime();
        let regex = new RegExp("[xy]", "g");
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(regex, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    render() {
        Stack.create();
        Text.create('' + this.value.toString());
        Text.height(0);
        Text.width(0);
        Text.pop();
        Stack.create();
        Stack.id(this.ids);
        Stack.onAppear(() => {
            let mSize: number[] = this.getSize(this.ids);
            this.mWidth = px2vp(mSize[0]);
            this.mHeight = px2vp(mSize[1]);
        });
        Stack.onAreaChange((oldValue: Area, newValue: Area) => {
            this.mWidth = Number(newValue.width);
            this.mHeight = Number(newValue.height);
        });
        this.content(this);
        Stack.pop();
        If.create();
        if (this.mShimmer.mShowShimmer) {
            If.branchId(0);
            Canvas.create(this.context);
            Canvas.width(this.mWidth);
            Canvas.height(this.mHeight);
            Canvas.onReady(() => {
                if (this.intervalId != -1) {
                    clearTimeout(this.intervalId);
                }
                this.intervalId = setInterval(() => {
                    this.context.clearRect(0, 0, this.mWidth, this.mHeight);
                    if (this.mShimmer.shape == Shapes.LINEAR) {
                        switch (this.mShimmer.direction) {
                            case Directions.RIGHT_TO_LEFT: //右 -> 左
                                this.grad = this.context.createLinearGradient(this.value, this.mShimmer.tilt / 90 % 2 == 0 ? 0 : this.value * Math.tan(((90 - this.mShimmer.tilt) * Math.PI) / 180), this.mShimmer.tilt / 90 % 2 == 0 ? (this.value - this.mShimmer.fixedWidth) : this.value - (this.mShimmer.fixedWidth * Math.cos((90 - this.mShimmer.tilt) * Math.PI / 180)), this.mShimmer.tilt / 90 % 2 == 0 ? 0 : (this.value - (this.mShimmer.fixedWidth * Math.cos((90 - this.mShimmer.tilt) * Math.PI / 180))) * Math.tan(((90 - this.mShimmer.tilt) * Math.PI) / 180));
                                break;
                            case Directions.TOP_TO_BOTTOM: //上 -> 下
                                this.grad = this.context.createLinearGradient(0, this.value, 0, this.value + this.mShimmer.fixedWidth);
                                break;
                            case Directions.BOTTOM_TO_TOP: //下 -> 上
                                this.grad = this.context.createLinearGradient(0, this.value, 0, this.value - this.mShimmer.fixedWidth);
                                break;
                            default: //左 -> 右
                                this.grad = this.context.createLinearGradient(this.value, this.mShimmer.tilt / 90 % 2 == 0 ? 0 : this.value * Math.tan(((90 - this.mShimmer.tilt) * Math.PI) / 180), this.mShimmer.tilt / 90 % 2 == 0 ? (this.value + this.mShimmer.fixedWidth) : this.value + (this.mShimmer.fixedWidth * Math.cos((90 - this.mShimmer.tilt) * Math.PI / 180)), this.mShimmer.tilt / 90 % 2 == 0 ? 0 : (this.value + (this.mShimmer.fixedWidth * Math.cos((90 - this.mShimmer.tilt) * Math.PI / 180))) * Math.tan(((90 - this.mShimmer.tilt) * Math.PI) / 180));
                                break;
                        }
                    }
                    else {
                        this.grad = this.context.createRadialGradient(this.value, this.mHeight / 2, 0, this.value, this.mHeight / 2, this.mHeight / 2);
                    }
                    this.grad.addColorStop(0, 'rgba(60, 60, 60, 0.8)');
                    this.grad.addColorStop(0.5, 'rgba(60, 60, 60, 0.0)');
                    this.grad.addColorStop(1, 'rgba(60, 60, 60, 0.8)');
                    this.context.fillStyle = this.grad;
                    this.context.fillRect(0, 0, this.mWidth, this.mHeight);
                    //判断shimmer Direction类型
                    if (this.mShimmer.shape == Shapes.LINEAR) {
                        switch (this.mShimmer.direction) {
                            case Directions.RIGHT_TO_LEFT: //右 -> 左
                                if (this.mShimmer.repeatMode == PlayMode.Reverse) {
                                    if (this.value <= -100) {
                                        this.value = this.mWidth + 100;
                                        this.isFlag = true;
                                    }
                                    else {
                                        if (this.isFlag) {
                                            this.value -= this.mWidth / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                            if (this.value <= -100) {
                                                this.value = 0;
                                                this.isFlag = false;
                                            }
                                        }
                                        else {
                                            this.value += this.mWidth / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        }
                                    }
                                }
                                else {
                                    if (this.value <= -100) {
                                        this.value = this.mWidth + 100;
                                    }
                                    else {
                                        this.value -= this.mWidth / this.mShimmer.animationDuration * 50 *
                                            (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                    }
                                }
                                break;
                            case Directions.TOP_TO_BOTTOM: //上 -> 下
                                if (this.mShimmer.repeatMode == PlayMode.Reverse) {
                                    if (this.value > this.mHeight + 100) {
                                        this.value -= this.mHeight / this.mShimmer.animationDuration * 50 *
                                            (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        this.isFlag = true;
                                    }
                                    else {
                                        if (this.value <= -100) {
                                            this.isFlag = false;
                                        }
                                        if (this.isFlag) {
                                            this.value -= this.mHeight / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        }
                                        else {
                                            this.value += this.mHeight / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        }
                                    }
                                }
                                else {
                                    if (this.value > this.mHeight + 100) {
                                        this.value = -100;
                                    }
                                    else {
                                        this.value += this.mHeight / this.mShimmer.animationDuration * 50 *
                                            (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                    }
                                }
                                break;
                            case Directions.BOTTOM_TO_TOP: //下 -> 上
                                if (this.mShimmer.repeatMode == PlayMode.Reverse) {
                                    if (this.value <= -100) {
                                        this.value = this.mHeight + 100;
                                        this.isFlag = true;
                                    }
                                    else {
                                        if (this.isFlag) {
                                            this.value -= this.mHeight / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                            if (this.value <= -100) {
                                                this.value = 0;
                                                this.isFlag = false;
                                            }
                                        }
                                        else {
                                            this.value += this.mHeight / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        }
                                    }
                                }
                                else {
                                    if (this.value < -100) {
                                        this.value = this.mHeight + 100;
                                    }
                                    else {
                                        this.value -= this.mHeight / this.mShimmer.animationDuration * 50 *
                                            (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                    }
                                }
                                break;
                            default: //左 -> 右
                                if (this.mShimmer.repeatMode == PlayMode.Reverse) {
                                    if (this.value > this.mWidth + 100) {
                                        this.value -= this.mWidth / this.mShimmer.animationDuration * 50 *
                                            (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        this.isFlag = true;
                                    }
                                    else {
                                        if (this.value <= -100) {
                                            this.isFlag = false;
                                        }
                                        if (this.isFlag) {
                                            this.value -= this.mWidth / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        }
                                        else {
                                            this.value += this.mWidth / this.mShimmer.animationDuration * 50 *
                                                (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                        }
                                    }
                                }
                                else {
                                    if (this.value > this.mWidth + 100) {
                                        this.value = -100;
                                    }
                                    else {
                                        this.value += this.mWidth / this.mShimmer.animationDuration * 50 *
                                            (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                    }
                                }
                                break;
                        }
                    }
                    else {
                        if (this.mShimmer.repeatMode == PlayMode.Reverse) {
                            if (this.value > this.mWidth + 100) {
                                this.value -= this.mWidth / this.mShimmer.animationDuration * 50 *
                                    (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                this.isFlag = true;
                            }
                            else {
                                if (this.value <= -100) {
                                    this.isFlag = false;
                                }
                                if (this.isFlag) {
                                    this.value -= this.mWidth / this.mShimmer.animationDuration * 50 *
                                        (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                }
                                else {
                                    this.value += this.mWidth / this.mShimmer.animationDuration * 50 *
                                        (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                                }
                            }
                        }
                        else {
                            if (this.value > this.mWidth + 100) {
                                this.value = -100;
                            }
                            else {
                                this.value += this.mWidth / this.mShimmer.animationDuration * 50 *
                                    (Math.sin(this.mShimmer.tilt) == 0 ? 0.5 : Math.abs(Math.sin(this.mShimmer.tilt)));
                            }
                        }
                    }
                }, 100);
            });
            Canvas.pop();
        }
        If.pop();
        Stack.pop();
    }
}
