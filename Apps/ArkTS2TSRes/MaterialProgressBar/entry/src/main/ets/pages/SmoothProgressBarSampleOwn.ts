interface SmoothProgressBarSampleOwn_Params {
    arr?: string[];
    progressStart?: boolean;
    spinSpeed?: number;
    strokeWidth?: number;
    separatorLength?: number;
    sectionsCount?: number;
    isReversed?: boolean;
    isMirror?: boolean;
    isGradients?: boolean;
    isStop?: boolean;
    curveArray?: Curve[];
    curve?: Curve;
    curveName?: string;
    sportMode?: string;
    dialogController?: CustomDialogController;
}
interface SportModeDialog_Params {
    controller?: CustomDialogController;
    curveArray?: Curve[];
    arr?: string[];
    action?: Function;
    curve?: Curve | null;
    curveName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SmoothProgressBarSampleOwn_" + ++__generate__Id;
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
import { SmoothCircularProgressBar } from '@ohos/materialprogressbar';
import { SmoothHorizontalProgressBar } from '@ohos/materialprogressbar';
class SportModeDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new SportModeDialog("3", this, {
                    curveArray: [],
                    action: (): void => {
                    },
                    arr: [],
                    curve: null,
                    curveName: 'FastOutSlowIn'
                });
                jsDialog.setController(this.controller);
                View.create(jsDialog);
            }
        }, this);
        this.curveArray = [];
        this.arr = [];
        this.action = (): void => {
        };
        this.__curve = new SynchedPropertySimpleTwoWay(params.curve, this, "curve");
        this.__curveName = new SynchedPropertySimpleTwoWay(params.curveName, this, "curveName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SportModeDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.curveArray !== undefined) {
            this.curveArray = params.curveArray;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
    }
    aboutToBeDeleted() {
        this.__curve.aboutToBeDeleted();
        this.__curveName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private curveArray: Curve[];
    private arr: string[];
    private action: Function;
    private __curve: SynchedPropertySimpleTwoWay<Curve | null>;
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: Curve | null) {
        this.__curve.set(newValue);
    }
    private __curveName: SynchedPropertySimpleTwoWay<string>;
    get curveName() {
        return this.__curveName.get();
    }
    set curveName(newValue: string) {
        this.__curveName.set(newValue);
    }
    render() {
        Row.create();
        Scroll.create();
        List.create({ space: 10, initialIndex: 0 });
        List.backgroundColor(0x1C1C1C);
        List.width(300);
        List.height(200);
        List.padding(10);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            ListItem.create();
            Text.create(item);
            Text.width('100%');
            Text.height(25);
            Text.fontSize(13);
            Text.fontColor('white');
            Text.textAlign(TextAlign.Start);
            Text.onClick(() => {
                AppStorage.Set<string>('sportMode', item);
                this.action();
                this.controller.close();
            });
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Scroll.pop();
        Row.pop();
    }
}
class SmoothProgressBarSampleOwn extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = ['Accelerate', 'Linear', 'AccelerateDecelerate', 'Decelerate', 'FastOutSlowIn'];
        this.__progressStart = new ObservedPropertySimple(true, this, "progressStart");
        this.__spinSpeed = new ObservedPropertySimple(1.0, this, "spinSpeed");
        this.__strokeWidth = new ObservedPropertySimple(4, this, "strokeWidth");
        this.__separatorLength = new ObservedPropertySimple(4, this, "separatorLength");
        this.__sectionsCount = new ObservedPropertySimple(5, this, "sectionsCount");
        this.__isReversed = new ObservedPropertySimple(false, this, "isReversed");
        this.__isMirror = new ObservedPropertySimple(false, this, "isMirror");
        this.__isGradients = new ObservedPropertySimple(false, this, "isGradients");
        this.__isStop = new ObservedPropertySimple(false, this, "isStop");
        this.curveArray = [Curve.FastOutLinearIn, Curve.Linear, Curve.ExtremeDeceleration, Curve.LinearOutSlowIn, Curve.FastOutSlowIn];
        this.__curve = new ObservedPropertySimple(Curve.FastOutSlowIn, this, "curve");
        this.__curveName = new ObservedPropertySimple('FastOutSlowIn', this, "curveName");
        this.__sportMode = AppStorage.SetAndProp('sportMode', 'FastOutSlowIn', this, "sportMode");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SportModeDialog("4", this, {
                    curveArray: this.curveArray,
                    action: this.onAccept,
                    arr: this.arr,
                    curve: this.__curve,
                    curveName: this.__curveName
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            customStyle: true,
            offset: {
                dx: -30, dy: 60
            }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SmoothProgressBarSampleOwn_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.progressStart !== undefined) {
            this.progressStart = params.progressStart;
        }
        if (params.spinSpeed !== undefined) {
            this.spinSpeed = params.spinSpeed;
        }
        if (params.strokeWidth !== undefined) {
            this.strokeWidth = params.strokeWidth;
        }
        if (params.separatorLength !== undefined) {
            this.separatorLength = params.separatorLength;
        }
        if (params.sectionsCount !== undefined) {
            this.sectionsCount = params.sectionsCount;
        }
        if (params.isReversed !== undefined) {
            this.isReversed = params.isReversed;
        }
        if (params.isMirror !== undefined) {
            this.isMirror = params.isMirror;
        }
        if (params.isGradients !== undefined) {
            this.isGradients = params.isGradients;
        }
        if (params.isStop !== undefined) {
            this.isStop = params.isStop;
        }
        if (params.curveArray !== undefined) {
            this.curveArray = params.curveArray;
        }
        if (params.curve !== undefined) {
            this.curve = params.curve;
        }
        if (params.curveName !== undefined) {
            this.curveName = params.curveName;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__progressStart.aboutToBeDeleted();
        this.__spinSpeed.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__separatorLength.aboutToBeDeleted();
        this.__sectionsCount.aboutToBeDeleted();
        this.__isReversed.aboutToBeDeleted();
        this.__isMirror.aboutToBeDeleted();
        this.__isGradients.aboutToBeDeleted();
        this.__isStop.aboutToBeDeleted();
        this.__curve.aboutToBeDeleted();
        this.__curveName.aboutToBeDeleted();
        this.__sportMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: string[];
    //圆形进度条的运动开始或结束
    private __progressStart: ObservedPropertySimple<boolean>;
    get progressStart() {
        return this.__progressStart.get();
    }
    set progressStart(newValue: boolean) {
        this.__progressStart.set(newValue);
    }
    //速度
    private __spinSpeed: ObservedPropertySimple<number>;
    get spinSpeed() {
        return this.__spinSpeed.get();
    }
    set spinSpeed(newValue: number) {
        this.__spinSpeed.set(newValue);
    }
    //高度
    private __strokeWidth: ObservedPropertySimple<number>;
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue: number) {
        this.__strokeWidth.set(newValue);
    }
    //间距
    private __separatorLength: ObservedPropertySimple<number>;
    get separatorLength() {
        return this.__separatorLength.get();
    }
    set separatorLength(newValue: number) {
        this.__separatorLength.set(newValue);
    }
    //个数
    private __sectionsCount: ObservedPropertySimple<number>;
    get sectionsCount() {
        return this.__sectionsCount.get();
    }
    set sectionsCount(newValue: number) {
        this.__sectionsCount.set(newValue);
    }
    //相反运动
    private __isReversed: ObservedPropertySimple<boolean>;
    get isReversed() {
        return this.__isReversed.get();
    }
    set isReversed(newValue: boolean) {
        this.__isReversed.set(newValue);
    }
    //镜像运动
    private __isMirror: ObservedPropertySimple<boolean>;
    get isMirror() {
        return this.__isMirror.get();
    }
    set isMirror(newValue: boolean) {
        this.__isMirror.set(newValue);
    }
    //渐变色
    private __isGradients: ObservedPropertySimple<boolean>;
    get isGradients() {
        return this.__isGradients.get();
    }
    set isGradients(newValue: boolean) {
        this.__isGradients.set(newValue);
    }
    //平滑进度条的开始或结束
    private __isStop: ObservedPropertySimple<boolean>;
    get isStop() {
        return this.__isStop.get();
    }
    set isStop(newValue: boolean) {
        this.__isStop.set(newValue);
    }
    private curveArray: Curve[];
    //运动模式
    private __curve: ObservedPropertySimple<Curve>;
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: Curve) {
        this.__curve.set(newValue);
    }
    private __curveName: ObservedPropertySimple<string>;
    get curveName() {
        return this.__curveName.get();
    }
    set curveName(newValue: string) {
        this.__curveName.set(newValue);
    }
    private __sportMode: ObservedPropertyAbstract<string>;
    get sportMode() {
        return this.__sportMode.get();
    }
    set sportMode(newValue: string) {
        this.__sportMode.set(newValue);
    }
    private dialogController: CustomDialogController;
    aboutToAppear() {
    }
    onAccept() {
        let select: string | undefined = AppStorage.Get<string>('sportMode');
        if (!!select) {
            let index: number = this.arr.indexOf(select);
            // 作用域this失效了
            this.curve = this.curveArray[index];
            this.curveName = select;
        }
    }
    existApp() {
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Flex.backgroundColor(0x363636);
        //返回index和顶部标题
        Row.create();
        //返回index和顶部标题
        Row.backgroundColor(0x1C1C1C);
        //返回index和顶部标题
        Row.width('100%');
        //返回index和顶部标题
        Row.height(50);
        Image.create($r('app.media.back'));
        Image.width('8%');
        Image.height('50%');
        Image.margin({ left: 12 });
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            router.replaceUrl({ url: 'pages/SmoothProgressBarSample' });
        });
        Text.create('Make your own');
        Text.fontSize(20);
        Text.margin({ left: 15 });
        Text.fontColor('white');
        Text.pop();
        //返回index和顶部标题
        Row.pop();
        //平滑进度条和圆形进度条
        Row.create();
        //平滑进度条和圆形进度条
        Row.margin({ top: 10 });
        Row.create();
        Row.width('80%');
        Row.height('5%');
        Row.margin({ left: 7 });
        Row.pop();
        Row.create();
        Row.width('15%');
        Row.height(65);
        Row.margin({ left: 6 });
        Row.pop();
        //平滑进度条和圆形进度条
        Row.pop();
        //复选框们；BUG：预览器与模拟器样式有明显差异，已提单
        Row.create({ space: 15 });
        //复选框们；BUG：预览器与模拟器样式有明显差异，已提单
        Row.width('100%');
        //复选框们；BUG：预览器与模拟器样式有明显差异，已提单
        Row.margin({ top: 5 });
        //Reversed相反运动
        Row.create();
        Toggle.create({ type: ToggleType.Checkbox, isOn: this.isReversed });
        Toggle.width(10);
        Toggle.height(10);
        Toggle.margin({ left: 20 });
        Toggle.onChange((isOn: boolean) => {
            this.isReversed = isOn;
        });
        Toggle.pop();
        Text.create('Reversed');
        Text.fontColor('white');
        Text.fontSize(13);
        Text.margin({ left: 5 });
        Text.pop();
        //Reversed相反运动
        Row.pop();
        //Mirror Mode镜像运动
        Row.create();
        Toggle.create({ type: ToggleType.Checkbox, isOn: this.isMirror });
        Toggle.width(10);
        Toggle.height(10);
        Toggle.margin({ left: 20 });
        Toggle.onChange((isOn: boolean) => {
            this.isMirror = isOn;
        });
        Toggle.pop();
        Text.create('Mirror Mode');
        Text.fontColor('white');
        Text.fontSize(13);
        Text.margin({ left: 5 });
        Text.pop();
        //Mirror Mode镜像运动
        Row.pop();
        //Gradients颜色渐变
        Row.create();
        Toggle.create({ type: ToggleType.Checkbox, isOn: this.isGradients });
        Toggle.width(10);
        Toggle.height(10);
        Toggle.margin({ left: 20 });
        Toggle.onChange((isOn: boolean) => {
            this.isGradients = isOn;
        });
        Toggle.pop();
        Text.create('Gradients');
        Text.fontColor('white');
        Text.fontSize(13);
        Text.margin({ left: 5 });
        Text.pop();
        //Gradients颜色渐变
        Row.pop();
        //复选框们；BUG：预览器与模拟器样式有明显差异，已提单
        Row.pop();
        //滑动控制条们
        //控制速度
        Stack.create();
        Text.create('Speed：' + this.spinSpeed.toFixed(1));
        Text.fontSize(13);
        Text.fontColor('white');
        Text.margin({ bottom: -10 });
        Text.pop();
        //滑动控制条们
        //控制速度
        Stack.pop();
        Slider.create({
            value: this.spinSpeed,
            min: 0.1,
            max: 3.2,
            step: 0.1,
            style: SliderStyle.OutSet
        });
        Slider.blockColor(0x8EE5EE);
        Slider.selectedColor(0x8EE5EE);
        Slider.trackColor(0x696969);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.spinSpeed = value;
        });
        //控制宽度
        Stack.create();
        Text.create('Stroke width：' + this.strokeWidth.toFixed(0));
        Text.fontSize(13);
        Text.fontColor('white');
        Text.margin({ bottom: -10 });
        Text.pop();
        //控制宽度
        Stack.pop();
        Slider.create({
            value: this.strokeWidth,
            min: 0,
            max: 12,
            step: 1,
            style: SliderStyle.OutSet
        });
        Slider.blockColor(0x8EE5EE);
        Slider.selectedColor(0x8EE5EE);
        Slider.trackColor(0x696969);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.strokeWidth = value;
        });
        //控制间距
        Stack.create();
        Text.create('Separator length：' + this.separatorLength.toFixed(0));
        Text.fontSize(13);
        Text.fontColor('white');
        Text.margin({ bottom: -10 });
        Text.pop();
        //控制间距
        Stack.pop();
        Slider.create({
            value: this.separatorLength,
            min: 0,
            max: 48,
            step: 1,
            style: SliderStyle.OutSet
        });
        Slider.blockColor(0x8EE5EE);
        Slider.selectedColor(0x8EE5EE);
        Slider.trackColor(0x696969);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.separatorLength = value;
        });
        //控制个数
        Stack.create();
        Text.create('Sections count：' + this.sectionsCount.toFixed(0));
        Text.fontSize(13);
        Text.fontColor('white');
        Text.margin({ bottom: -10 });
        Text.pop();
        //控制个数
        Stack.pop();
        Slider.create({
            value: this.sectionsCount,
            min: 1,
            max: 13,
            step: 1,
            style: SliderStyle.OutSet
        });
        Slider.blockColor(0x8EE5EE);
        Slider.selectedColor(0x8EE5EE);
        Slider.trackColor(0x696969);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.sectionsCount = value;
        });
        //运动模式下拉框
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        //运动模式下拉框
        Flex.margin({ bottom: 10 });
        Text.create(this.curveName);
        Text.fontSize(13);
        Text.fontColor('white');
        Text.textAlign(TextAlign.Start);
        Text.width(150);
        Text.margin({ left: 5 });
        Text.pop();
        Column.create();
        Column.width(50);
        Column.onClick(() => {
            this.dialogController.open();
        });
        Image.create($r('app.media.down'));
        Image.width(20);
        Image.height(20);
        Column.pop();
        //运动模式下拉框
        Flex.pop();
        //控制平滑进度条和圆形进度条运动的开始和结束
        Row.create({ space: 10 });
        //控制平滑进度条和圆形进度条运动的开始和结束
        Row.width(350);
        //控制平滑进度条和圆形进度条运动的开始和结束
        Row.margin({ left: 5 });
        Button.createWithLabel('START', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0x4F4F4F);
        Button.borderRadius(4);
        Button.width(170);
        Button.onClick(() => {
            this.isStop = false;
            this.progressStart = true;
        });
        Button.pop();
        Button.createWithLabel('STOP', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0x4F4F4F);
        Button.borderRadius(4);
        Button.width(170);
        Button.onClick(() => {
            this.isStop = true;
            this.progressStart = false;
        });
        Button.pop();
        //控制平滑进度条和圆形进度条运动的开始和结束
        Row.pop();
        Flex.pop();
    }
}
loadDocument(new SmoothProgressBarSampleOwn("1", undefined, {}));
