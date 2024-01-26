interface gradient_Params {
    myAngle?: number;
    windowWidth?: number;
    windowHeight?: number;
    gradientType?: number;
    isTestTime?: boolean;
    intervalID?;
    colorWhite?: number;
    colorBlack?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "gradient_" + ++__generate__Id;
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
import display from '@ohos.display';
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
export class gradient extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myAngle = new ObservedPropertySimple(90, this, "myAngle");
        this.__windowWidth = new ObservedPropertySimple(0, this, "windowWidth");
        this.__windowHeight = new ObservedPropertySimple(0, this, "windowHeight");
        this.__gradientType = new ObservedPropertySimple(0, this, "gradientType");
        this.__isTestTime = new ObservedPropertySimple(true, this, "isTestTime");
        this.intervalID = undefined;
        this.colorWhite = 0xffffff;
        this.colorBlack = 0x000000;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: gradient_Params) {
        if (params.myAngle !== undefined) {
            this.myAngle = params.myAngle;
        }
        if (params.windowWidth !== undefined) {
            this.windowWidth = params.windowWidth;
        }
        if (params.windowHeight !== undefined) {
            this.windowHeight = params.windowHeight;
        }
        if (params.gradientType !== undefined) {
            this.gradientType = params.gradientType;
        }
        if (params.isTestTime !== undefined) {
            this.isTestTime = params.isTestTime;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.colorWhite !== undefined) {
            this.colorWhite = params.colorWhite;
        }
        if (params.colorBlack !== undefined) {
            this.colorBlack = params.colorBlack;
        }
    }
    aboutToBeDeleted() {
        this.__myAngle.aboutToBeDeleted();
        this.__windowWidth.aboutToBeDeleted();
        this.__windowHeight.aboutToBeDeleted();
        this.__gradientType.aboutToBeDeleted();
        this.__isTestTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myAngle: ObservedPropertySimple<number>;
    get myAngle() {
        return this.__myAngle.get();
    }
    set myAngle(newValue: number) {
        this.__myAngle.set(newValue);
    }
    private __windowWidth: ObservedPropertySimple<number>;
    get windowWidth() {
        return this.__windowWidth.get();
    }
    set windowWidth(newValue: number) {
        this.__windowWidth.set(newValue);
    }
    private __windowHeight: ObservedPropertySimple<number>;
    get windowHeight() {
        return this.__windowHeight.get();
    }
    set windowHeight(newValue: number) {
        this.__windowHeight.set(newValue);
    }
    private __gradientType: ObservedPropertySimple<number>;
    get gradientType() {
        return this.__gradientType.get();
    }
    set gradientType(newValue: number) {
        this.__gradientType.set(newValue);
    }
    private __isTestTime: ObservedPropertySimple<boolean>;
    get isTestTime() {
        return this.__isTestTime.get();
    }
    set isTestTime(newValue: boolean) {
        this.__isTestTime.set(newValue);
    }
    private intervalID;
    private colorWhite: number;
    private colorBlack: number;
    aboutToDisappear() {
        clearInterval(this.intervalID);
    }
    async aboutToAppear() {
        let displayClass = null;
        try {
            displayClass = display.getDefaultDisplaySync();
            this.windowWidth = displayClass.width;
            this.windowHeight = displayClass.height;
        }
        catch (exception) {
            console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
        }
        this.intervalID = setInterval(() => {
            switch (this.myAngle) {
                case 360:
                    this.myAngle = 225;
                    break;
                case 225:
                    this.myAngle = 45;
                    break;
                case 45:
                    if (this.gradientType != 2) {
                        this.gradientType++;
                    }
                    else {
                        this.gradientType = 0;
                        this.myAngle = 90;
                    }
                    break;
                default:
                    this.myAngle = this.myAngle + 90;
                    break;
            }
        }, 2000);
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
        __Common__.create();
        __Common__.visibility(this.isTestTime ? Visibility.None : Visibility.Visible);
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '灰度测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '灰度测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        If.create();
        if (this.gradientType == 0) {
            If.branchId(0);
            Column.create();
            Column.linearGradient({
                angle: this.myAngle,
                colors: [[this.colorWhite, 0.0], [this.colorBlack, 1.0]]
            });
            Column.width('100%');
            Column.height('100%');
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.radialGradient({
                center: [this.windowWidth / 2, this.windowHeight / 2],
                radius: Math.max(this.windowWidth, this.windowHeight) / 2,
                colors: [[this.gradientType == 1 ? this.colorWhite : this.colorBlack, 0.0], [this.gradientType == 1 ? this.colorBlack : this.colorWhite, 1.0]]
            });
            Column.pop();
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new gradient("1", undefined, {}));
