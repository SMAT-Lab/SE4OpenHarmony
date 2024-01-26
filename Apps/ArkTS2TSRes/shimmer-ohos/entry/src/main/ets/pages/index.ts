interface Index_Params {
    num1?: boolean;
    num2?: boolean;
    num3?: boolean;
    num4?: boolean;
    num5?: boolean;
    off?: boolean;
    shimmer?: Shimmer;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
import { Shapes, Directions, Shimmer, ShimmerElement } from '@ohos/shimmer';
import prompt from '@system.prompt';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__num1 = new ObservedPropertySimple(true, this, "num1");
        this.__num2 = new ObservedPropertySimple(false, this, "num2");
        this.__num3 = new ObservedPropertySimple(false, this, "num3");
        this.__num4 = new ObservedPropertySimple(false, this, "num4");
        this.__num5 = new ObservedPropertySimple(false, this, "num5");
        this.__off = new ObservedPropertySimple(false, this, "off");
        this.__shimmer = new ObservedPropertyObject(new Shimmer(), this, "shimmer");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.num1 !== undefined) {
            this.num1 = params.num1;
        }
        if (params.num2 !== undefined) {
            this.num2 = params.num2;
        }
        if (params.num3 !== undefined) {
            this.num3 = params.num3;
        }
        if (params.num4 !== undefined) {
            this.num4 = params.num4;
        }
        if (params.num5 !== undefined) {
            this.num5 = params.num5;
        }
        if (params.off !== undefined) {
            this.off = params.off;
        }
        if (params.shimmer !== undefined) {
            this.shimmer = params.shimmer;
        }
    }
    aboutToBeDeleted() {
        this.__num1.aboutToBeDeleted();
        this.__num2.aboutToBeDeleted();
        this.__num3.aboutToBeDeleted();
        this.__num4.aboutToBeDeleted();
        this.__num5.aboutToBeDeleted();
        this.__off.aboutToBeDeleted();
        this.__shimmer.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __num1: ObservedPropertySimple<boolean>;
    get num1() {
        return this.__num1.get();
    }
    set num1(newValue: boolean) {
        this.__num1.set(newValue);
    }
    private __num2: ObservedPropertySimple<boolean>;
    get num2() {
        return this.__num2.get();
    }
    set num2(newValue: boolean) {
        this.__num2.set(newValue);
    }
    private __num3: ObservedPropertySimple<boolean>;
    get num3() {
        return this.__num3.get();
    }
    set num3(newValue: boolean) {
        this.__num3.set(newValue);
    }
    private __num4: ObservedPropertySimple<boolean>;
    get num4() {
        return this.__num4.get();
    }
    set num4(newValue: boolean) {
        this.__num4.set(newValue);
    }
    private __num5: ObservedPropertySimple<boolean>;
    get num5() {
        return this.__num5.get();
    }
    set num5(newValue: boolean) {
        this.__num5.set(newValue);
    }
    private __off: ObservedPropertySimple<boolean>;
    get off() {
        return this.__off.get();
    }
    set off(newValue: boolean) {
        this.__off.set(newValue);
    }
    private __shimmer: ObservedPropertyObject<Shimmer>;
    get shimmer() {
        return this.__shimmer.get();
    }
    set shimmer(newValue: Shimmer) {
        this.__shimmer.set(newValue);
    }
    content(parent = null) {
        Column.create();
        Image.create($r('app.media.fb_logo'));
        Image.width(80);
        Image.height(40);
        Image.margin({ top: 15 });
        Text.create($r('app.string.mission_statement'));
        Text.margin({ top: 15, bottom: 15 });
        Text.fontColor(Color.White);
        Text.padding(10);
        Text.fontSize(26);
        Text.pop();
        Column.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Flex.backgroundImage('/components/background.jpg', ImageRepeat.XY);
        Flex.backgroundImageSize({ width: 1080, height: 2560 });
        Flex.opacity(0.8);
        Row.create();
        Row.margin({ top: 10 });
        Text.create($r('app.string.presets'));
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 0, top: 15, right: 0, bottom: 15 });
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(2.2);
        Text.pop();
        Text.create('1');
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 3, top: 15, right: 3, bottom: 15 });
        Text.backgroundColor(this.num1 ? Color.Gray : '');
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.num1 = true;
            this.num2 = false;
            this.num3 = false;
            this.num4 = false;
            this.num5 = false;
            this.off = false;
            this.shimmer = new Shimmer()
                .setDuration(2000)
                .setRepeatMode(PlayMode.Normal)
                .setShape(Shapes.LINEAR)
                .setTilt(20)
                .setDropoff(0.5);
            prompt.showToast({
                message: 'Default',
                duration: 2000,
            });
        });
        Text.pop();
        Text.create('2');
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 3, top: 15, right: 3, bottom: 15 });
        Text.backgroundColor(this.num2 ? Color.Gray : '');
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.num1 = false;
            this.num2 = true;
            this.num3 = false;
            this.num4 = false;
            this.num5 = false;
            this.off = false;
            this.shimmer = new Shimmer()
                .setDuration(2000)
                .setRepeatMode(PlayMode.Reverse);
            prompt.showToast({
                message: 'Slow and reverse',
                duration: 2000,
            });
        });
        Text.pop();
        Text.create('3');
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 3, top: 15, right: 3, bottom: 15 });
        Text.backgroundColor(this.num3 ? Color.Gray : '');
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.num1 = false;
            this.num2 = false;
            this.num3 = true;
            this.num4 = false;
            this.num5 = false;
            this.off = false;
            this.shimmer = new Shimmer()
                .setBaseAlpha(0.1)
                .setDropoff(0.1)
                .setTilt(0);
            prompt.showToast({
                message: 'Thin, straight and transparent',
                duration: 2000,
            });
        });
        Text.pop();
        Text.create('4');
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 3, top: 15, right: 3, bottom: 15 });
        Text.backgroundColor(this.num4 ? Color.Gray : '');
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.num1 = false;
            this.num2 = false;
            this.num3 = false;
            this.num4 = true;
            this.num5 = false;
            this.off = false;
            this.shimmer = new Shimmer()
                .setDirection(Directions.TOP_TO_BOTTOM)
                .setTilt(0)
                .setRepeatMode(PlayMode.Reverse);
            prompt.showToast({
                message: 'Sweep angle 90',
                duration: 2000,
            });
        });
        Text.pop();
        Text.create('5');
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 3, top: 15, right: 3, bottom: 15 });
        Text.backgroundColor(this.num5 ? Color.Gray : '');
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.num1 = false;
            this.num2 = false;
            this.num3 = false;
            this.num4 = false;
            this.num5 = true;
            this.off = false;
            this.shimmer = new Shimmer()
                .setBaseAlpha(0)
                .setDuration(2000)
                .setDropoff(0.5)
                .setIntensity(0.35)
                .setShape(Shapes.RADIAL);
            prompt.showToast({
                message: 'Spotlight',
                duration: 2000,
            });
        });
        Text.pop();
        Text.create($r('app.string.off'));
        Text.fontColor(Color.White);
        Text.fontSize(26);
        Text.padding({ left: 3, top: 15, right: 3, bottom: 15 });
        Text.backgroundColor(this.off ? Color.Gray : '');
        Text.textAlign(TextAlign.Center);
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.num1 = false;
            this.num2 = false;
            this.num3 = false;
            this.num4 = false;
            this.num5 = false;
            this.off = true;
            this.shimmer.hideShimmer();
            prompt.showToast({
                message: 'Off',
                duration: 2000,
            });
        });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
