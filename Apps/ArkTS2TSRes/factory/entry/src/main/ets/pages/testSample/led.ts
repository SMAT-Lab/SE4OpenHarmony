interface Led_Params {
    color?: Color;
    index?: number;
    isTestTime?: boolean;
    intervalID?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "led_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
class Led extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__color = new ObservedPropertySimple(Color.Red, this, "color");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__isTestTime = new ObservedPropertySimple(true, this, "isTestTime");
        this.intervalID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Led_Params) {
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.isTestTime !== undefined) {
            this.isTestTime = params.isTestTime;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
    }
    aboutToBeDeleted() {
        this.__color.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__isTestTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __color: ObservedPropertySimple<Color>;
    get color() {
        return this.__color.get();
    }
    set color(newValue: Color) {
        this.__color.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __isTestTime: ObservedPropertySimple<boolean>;
    get isTestTime() {
        return this.__isTestTime.get();
    }
    set isTestTime(newValue: boolean) {
        this.__isTestTime.set(newValue);
    }
    private intervalID;
    onPageShow() {
        this.intervalID = setInterval(() => {
            switch (this.index) {
                case 0:
                    this.color = Color.Yellow;
                    break;
                case 1:
                    this.color = Color.Blue;
                    break;
                case 2:
                    this.color = Color.White;
                    break;
                case 3:
                    this.color = Color.Black;
                    break;
                default:
                    this.color = Color.Red;
                    this.index = -1;
                    break;
            }
            this.index++;
        }, 2000);
    }
    onPageHide() {
        clearInterval(this.intervalID);
    }
    render() {
        Column.create();
        Column.onClick(() => {
            this.isTestTime = true;
        });
        Gesture.create(GesturePriority.Low);
        PinchGesture.create({ fingers: 5 });
        PinchGesture.onActionEnd(() => {
            this.isTestTime = false;
        });
        PinchGesture.pop();
        Gesture.pop();
        Column.height('100%');
        __Common__.create();
        __Common__.visibility(this.isTestTime ? Visibility.None : Visibility.Visible);
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: 'led测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'led测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Column.create();
        Column.backgroundColor(this.color);
        Column.height('100%');
        Column.width('100%');
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Led("1", undefined, {}));
