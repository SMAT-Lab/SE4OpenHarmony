interface SmoothProgressBarSample_Params {
    isFinish?: boolean;
    fastOutLinearIn?: Curve;
    frameworkModel?: MaterialProgress.MaterialModel;
    frameworkModelTwo?: MaterialProgress.MaterialModel;
    frameworkModelThree?: MaterialProgress.MaterialModel;
    frameworkModelFour?: MaterialProgress.MaterialModel;
    frameworkModelFive?: MaterialProgress.MaterialModel;
    frameworkModelSix?: MaterialProgress.MaterialModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SmoothProgressBarSample_" + ++__generate__Id;
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
import router from '@ohos.router';
import { SmoothHorizontalProgressBar, MaterialProgressBar, MaterialProgress, MaterialProgressStyle } from '@ohos/materialprogressbar';
class SmoothProgressBarSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isFinish = new ObservedPropertySimple(false, this, "isFinish");
        this.__fastOutLinearIn = new ObservedPropertySimple(Curve.FastOutLinearIn, this, "fastOutLinearIn");
        this.frameworkModel = new MaterialProgress.MaterialModel();
        this.frameworkModelTwo = new MaterialProgress.MaterialModel();
        this.frameworkModelThree = new MaterialProgress.MaterialModel();
        this.frameworkModelFour = new MaterialProgress.MaterialModel();
        this.frameworkModelFive = new MaterialProgress.MaterialModel();
        this.frameworkModelSix = new MaterialProgress.MaterialModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SmoothProgressBarSample_Params) {
        if (params.isFinish !== undefined) {
            this.isFinish = params.isFinish;
        }
        if (params.fastOutLinearIn !== undefined) {
            this.fastOutLinearIn = params.fastOutLinearIn;
        }
        if (params.frameworkModel !== undefined) {
            this.frameworkModel = params.frameworkModel;
        }
        if (params.frameworkModelTwo !== undefined) {
            this.frameworkModelTwo = params.frameworkModelTwo;
        }
        if (params.frameworkModelThree !== undefined) {
            this.frameworkModelThree = params.frameworkModelThree;
        }
        if (params.frameworkModelFour !== undefined) {
            this.frameworkModelFour = params.frameworkModelFour;
        }
        if (params.frameworkModelFive !== undefined) {
            this.frameworkModelFive = params.frameworkModelFive;
        }
        if (params.frameworkModelSix !== undefined) {
            this.frameworkModelSix = params.frameworkModelSix;
        }
    }
    aboutToBeDeleted() {
        this.__isFinish.aboutToBeDeleted();
        this.__fastOutLinearIn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //Pocket进度条的开始或结束
    private __isFinish: ObservedPropertySimple<boolean>;
    get isFinish() {
        return this.__isFinish.get();
    }
    set isFinish(newValue: boolean) {
        this.__isFinish.set(newValue);
    }
    private __fastOutLinearIn: ObservedPropertySimple<Curve>;
    get fastOutLinearIn() {
        return this.__fastOutLinearIn.get();
    }
    set fastOutLinearIn(newValue: Curve) {
        this.__fastOutLinearIn.set(newValue);
    }
    private frameworkModel: MaterialProgress.MaterialModel;
    private frameworkModelTwo: MaterialProgress.MaterialModel;
    private frameworkModelThree: MaterialProgress.MaterialModel;
    private frameworkModelFour: MaterialProgress.MaterialModel;
    private frameworkModelFive: MaterialProgress.MaterialModel;
    private frameworkModelSix: MaterialProgress.MaterialModel;
    aboutToAppear() {
        this.frameworkModel.isPocket = false;
        this.frameworkModel.colors = [0x33b5e5];
        this.frameworkModel.isReversed = false;
        this.frameworkModel.isMirror = false;
        this.frameworkModel.isGradients = false;
        this.frameworkModel.speed = 1.5;
        this.frameworkModel.strokeWidth = 4;
        this.frameworkModel.separatorLength = vp2px(3);
        this.frameworkModel.sectionsCount = Math.round(7);
        this.frameworkModel.curve = Curve.FastOutSlowIn;
        this.frameworkModel.isStop = false;
        this.frameworkModelTwo.isPocket = false;
        this.frameworkModelTwo.colors = [0x33b5e5];
        this.frameworkModelTwo.isReversed = false;
        this.frameworkModelTwo.isMirror = false;
        this.frameworkModelTwo.isGradients = false;
        this.frameworkModelTwo.speed = 1.5;
        this.frameworkModelTwo.strokeWidth = 4;
        this.frameworkModelTwo.separatorLength = vp2px(4);
        this.frameworkModelTwo.sectionsCount = Math.round(4);
        this.frameworkModelTwo.curve = Curve.FastOutLinearIn;
        this.frameworkModelTwo.isStop = false;
        this.frameworkModelThree.isPocket = false;
        this.frameworkModelThree.isReversed = false;
        this.frameworkModelThree.isMirror = false;
        this.frameworkModelThree.isGradients = false;
        this.frameworkModelThree.speed = 1.0;
        this.frameworkModelThree.strokeWidth = 4;
        this.frameworkModelThree.separatorLength = vp2px(12);
        this.frameworkModelThree.sectionsCount = Math.round(4);
        this.frameworkModelThree.curve = Curve.Linear;
        this.frameworkModelThree.isStop = false;
        this.frameworkModelFour.isPocket = false;
        this.frameworkModelFour.isReversed = true;
        this.frameworkModelFour.isMirror = true;
        this.frameworkModelFour.isGradients = false;
        this.frameworkModelFour.speed = 1.5;
        this.frameworkModelFour.strokeWidth = 4;
        this.frameworkModelFour.separatorLength = vp2px(4);
        this.frameworkModelFour.sectionsCount = Math.round(3);
        this.frameworkModelFour.curve = Curve.FastOutSlowIn;
        this.frameworkModelFour.isStop = false;
        this.frameworkModelFive.isPocket = false;
        this.frameworkModelFive.isReversed = false;
        this.frameworkModelFive.isMirror = false;
        this.frameworkModelFive.isGradients = true;
        this.frameworkModelFive.speed = 1.0;
        this.frameworkModelFive.strokeWidth = 4;
        this.frameworkModelFive.separatorLength = vp2px(0);
        this.frameworkModelFive.sectionsCount = Math.round(5);
        this.frameworkModelFive.curve = Curve.FastOutSlowIn;
        this.frameworkModelFive.isStop = false;
        this.frameworkModelSix.curve = Curve.FastOutSlowIn;
        this.frameworkModelSix.strokeWidth = 4;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Flex.padding({ top: 15 });
        Flex.backgroundColor(0x363636);
        //返回index和顶部标题
        Row.create();
        //返回index和顶部标题
        Row.width('100%');
        //返回index和顶部标题
        Row.height(50);
        //返回index和顶部标题
        Row.margin({ top: 10, bottom: 10, left: 5 });
        Text.create('< Back');
        Text.fontSize(22);
        Text.onClick(() => {
            router.back();
        });
        Text.fontColor(0xFFFFFF);
        Text.pop();
        //返回index和顶部标题
        Row.pop();
        //跳转自定义进度条页面
        Button.createWithLabel('MAKE YOUR OWN!', { type: ButtonType.Normal, stateEffect: true });
        //跳转自定义进度条页面
        Button.margin({ bottom: 10, left: 5 });
        //跳转自定义进度条页面
        Button.backgroundColor(0x4F4F4F);
        //跳转自定义进度条页面
        Button.borderRadius(4);
        //跳转自定义进度条页面
        Button.width(350);
        //跳转自定义进度条页面
        Button.onClick(() => {
            router.replaceUrl({ url: 'pages/SmoothProgressBarSampleOwn' });
        });
        //跳转自定义进度条页面
        Button.pop();
        //进度条们
        Text.create('Normal indeterminate drawable');
        //进度条们
        Text.fontColor(0xB5B5B5);
        //进度条们
        Text.fontSize(15);
        //进度条们
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 5, top: 5 });
        Row.pop();
        Text.create('AccelerateInterpolator');
        Text.fontColor(0xB5B5B5);
        Text.fontSize(15);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 5, top: 5 });
        Row.pop();
        Text.create('GPlus');
        Text.fontColor(0xB5B5B5);
        Text.fontSize(15);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 5, top: 5 });
        Row.pop();
        Text.create('Google now');
        Text.fontColor(0xB5B5B5);
        Text.fontSize(15);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 5, top: 5 });
        Row.pop();
        Text.create('Gradient');
        Text.fontColor(0xB5B5B5);
        Text.fontSize(15);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 5, top: 5 });
        Row.pop();
        Text.create('Circular');
        Text.fontColor(0xB5B5B5);
        Text.fontSize(15);
        Text.pop();
        Row.create();
        Row.width('20%');
        Row.margin({ bottom: 5, top: 5, left: 150 });
        Row.pop();
        Text.create('Pocket');
        Text.fontColor(0xB5B5B5);
        Text.fontSize(15);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ bottom: 5, top: 5 });
        Row.pop();
        //控制Pocket平滑进度条运动的开始和结束
        Row.create({ space: 10 });
        //控制Pocket平滑进度条运动的开始和结束
        Row.width(350);
        //控制Pocket平滑进度条运动的开始和结束
        Row.margin({ left: 5 });
        Button.createWithLabel('BEGIN', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0x4F4F4F);
        Button.borderRadius(4);
        Button.width(170);
        Button.onClick(() => {
            this.isFinish = false;
        });
        Button.pop();
        Button.createWithLabel('FINISH', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0x4F4F4F);
        Button.borderRadius(4);
        Button.width(170);
        Button.onClick(() => {
            this.isFinish = true;
        });
        Button.pop();
        //控制Pocket平滑进度条运动的开始和结束
        Row.pop();
        Flex.pop();
    }
}
loadDocument(new SmoothProgressBarSample("1", undefined, {}));
