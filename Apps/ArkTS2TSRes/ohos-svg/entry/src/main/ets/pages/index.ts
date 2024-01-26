interface Index_Params {
    countDownFrom?: number;
    dashOffset?: number;
    countDownFromImage?: number;
    dashOffsetImage?: number;
    timerId?: number;
    showType?: number;
    menuWidth?: string;
    model1?: SVGImageView.SVGImageViewModel;
    faceColours?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/**
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
import { SVGImageView } from '@ohos/svg';
import router from '@ohos.router';
interface Cherry {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__countDownFrom = new ObservedPropertySimple(0, this, "countDownFrom");
        this.__dashOffset = new ObservedPropertySimple(0, this, "dashOffset");
        this.__countDownFromImage = new ObservedPropertySimple(0, this, "countDownFromImage");
        this.__dashOffsetImage = new ObservedPropertySimple(0, this, "dashOffsetImage");
        this.timerId = -1;
        this.__showType = new ObservedPropertySimple(1, this, "showType");
        this.__menuWidth = new ObservedPropertySimple("0%", this, "menuWidth");
        this.model1 = new SVGImageView.SVGImageViewModel();
        this.faceColours = ["#f9ca2e", "#c72e33", "#297537", "#f36021", "#255ea2", "#ffffff"];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.countDownFrom !== undefined) {
            this.countDownFrom = params.countDownFrom;
        }
        if (params.dashOffset !== undefined) {
            this.dashOffset = params.dashOffset;
        }
        if (params.countDownFromImage !== undefined) {
            this.countDownFromImage = params.countDownFromImage;
        }
        if (params.dashOffsetImage !== undefined) {
            this.dashOffsetImage = params.dashOffsetImage;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.showType !== undefined) {
            this.showType = params.showType;
        }
        if (params.menuWidth !== undefined) {
            this.menuWidth = params.menuWidth;
        }
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.faceColours !== undefined) {
            this.faceColours = params.faceColours;
        }
    }
    aboutToBeDeleted() {
        this.__countDownFrom.aboutToBeDeleted();
        this.__dashOffset.aboutToBeDeleted();
        this.__countDownFromImage.aboutToBeDeleted();
        this.__dashOffsetImage.aboutToBeDeleted();
        this.__showType.aboutToBeDeleted();
        this.__menuWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __countDownFrom: ObservedPropertySimple<number>;
    get countDownFrom() {
        return this.__countDownFrom.get();
    }
    set countDownFrom(newValue: number) {
        this.__countDownFrom.set(newValue);
    }
    private __dashOffset: ObservedPropertySimple<number>;
    get dashOffset() {
        return this.__dashOffset.get();
    }
    set dashOffset(newValue: number) {
        this.__dashOffset.set(newValue);
    }
    private __countDownFromImage: ObservedPropertySimple<number>;
    get countDownFromImage() {
        return this.__countDownFromImage.get();
    }
    set countDownFromImage(newValue: number) {
        this.__countDownFromImage.set(newValue);
    }
    private __dashOffsetImage: ObservedPropertySimple<number>;
    get dashOffsetImage() {
        return this.__dashOffsetImage.get();
    }
    set dashOffsetImage(newValue: number) {
        this.__dashOffsetImage.set(newValue);
    }
    private timerId: number;
    private __showType: ObservedPropertySimple<number>;
    get showType() {
        return this.__showType.get();
    }
    set showType(newValue: number) {
        this.__showType.set(newValue);
    }
    private __menuWidth: ObservedPropertySimple<string>;
    get menuWidth() {
        return this.__menuWidth.get();
    }
    set menuWidth(newValue: string) {
        this.__menuWidth.set(newValue);
    }
    private model1: SVGImageView.SVGImageViewModel;
    public aboutToAppear() {
        this.model1.setImageRawfile('ic_launcher_round.svg');
    }
    public aboutToDisappear(): void {
        if (this.timerId > 0) {
            clearTimeout(this.timerId);
            this.timerId = -1;
        }
    }
    render() {
        Stack.create();
        Stack.backgroundColor(Color.White);
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding({ top: 50 });
        If.create();
        if (this.showType == 1) {
            If.branchId(0);
            Column.create({});
            Column.padding({ left: 40, right: 40 });
            Text.create("Hello!");
            Text.fontSize(18);
            Text.pop();
            Text.create("This is a demonstration app for the OhosSVG library, which allows you to include SVG images in your apps.");
            Text.fontSize(14);
            Text.fontColor("#333333");
            Text.margin({ top: 20 });
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Button.createWithLabel("进入HSP的library共享包");
            Button.onClick(() => {
                router.pushUrl({ url: '@bundle:cn.openharmony.svg/sharedlibrary/ets/pages/Index' });
            });
            Button.margin({ top: 15 });
            Button.pop();
            Button.createWithLabel("setFromStringSample");
            Button.fontSize(14);
            Button.onClick(() => {
                this.initData();
                router.pushUrl({ url: 'pages/setFromStringSample' });
            });
            Button.pop();
            Button.createWithLabel("RenderSample");
            Button.fontSize(14);
            Button.onClick(() => {
                this.initData();
                router.pushUrl({ url: 'pages/RenderSample' });
            });
            Button.pop();
            Button.createWithLabel("点击");
            Button.onClick(() => {
                let brickColours = ["#1698ec", "#fef134", "#95e881", "#ea272e"];
                for (let i = brickColours.length - 1; i > 0; i--) {
                    let index = Math.round(Math.random() * (brickColours.length - 1));
                    let temp = brickColours[index];
                    brickColours[index] = brickColours[i];
                    brickColours[i] = temp;
                }
                this.model1.setCSS(".brick1 { fill:" + brickColours[0] + "; } .brick2 { fill:" + brickColours[1] + "; } .brick3 { fill:" + brickColours[2] + "; } .brick4 { fill:" + brickColours[3] + "; }");
            });
            Button.pop();
            Stack.create();
            Stack.pop();
            Column.pop();
        }
        else if (this.showType == 2) {
            If.branchId(1);
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
            Flex.padding(40);
            Text.create("About this app");
            Text.fontSize(18);
            Text.pop();
            Flex.pop();
        }
        If.pop();
        Flex.pop();
        //titleBar
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        //titleBar
        Flex.padding({ top: 20, bottom: 20, left: 20, right: 20 });
        //titleBar
        Flex.backgroundColor("#4050B5");
        //titleBar
        Flex.position({ x: 0, y: 0 });
        Image.create($r('app.media.menu'));
        Image.width(40);
        Image.height(40);
        Image.padding({ right: 20 });
        Image.onClick(() => {
            this.menuWidth = "70%";
        });
        Text.create("OhosSVG Sample App");
        Text.margin({ left: 20 });
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        //titleBar
        Flex.pop();
        //leftMenu
        Flex.create({ direction: FlexDirection.Row });
        //leftMenu
        Flex.width("100%");
        //leftMenu
        Flex.height("100%");
        //leftMenu
        Flex.backgroundColor("#80000000");
        //leftMenu
        Flex.onClick(() => {
            this.menuWidth = "0%";
        });
        //leftMenu
        Flex.visibility(this.menuWidth == "0%" ? Visibility.Hidden : Visibility.Visible);
        Flex.create({ direction: FlexDirection.Column });
        Context.animation({
            duration: 100,
            curve: Curve.EaseOut,
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Normal // 动画模式
        });
        Flex.width(this.menuWidth);
        Flex.height("100%");
        Context.animation(null);
        Flex.onClick(() => {
        });
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Start });
        Flex.width("100%");
        Flex.height("20%");
        Flex.backgroundColor("#2BA79C");
        Flex.padding({ left: 20, right: 20 });
        Image.create($r('app.media.ic_launcher_round'));
        Image.width(70);
        Image.height(70);
        Image.borderRadius(35);
        Image.objectFit(ImageFit.Contain);
        Text.create("OhosSVG sample app");
        Text.fontSize(14);
        Text.fontColor(Color.White);
        Text.margin({ top: 10, bottom: 5 });
        Text.pop();
        Text.create("SVG rendering library for Ohos");
        Text.fontSize(12);
        Text.fontColor("#B4E0F0");
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height("80%");
        Flex.backgroundColor(Color.White);
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding({ left: 20, top: 10, bottom: 10, right: 20 });
        Text.create("Home");
        Text.fontSize(14);
        Text.padding({ top: 15, bottom: 15 });
        Text.width("100%");
        Text.onClick(() => {
            this.showType = 1;
            this.initData();
        });
        Text.pop();
        Text.create("About");
        Text.fontSize(14);
        Text.padding({ top: 15, bottom: 15 });
        Text.width("100%");
        Text.onClick(() => {
            this.showType = 2;
            this.initData();
        });
        Text.pop();
        Text.create("Sample2");
        Text.fontSize(14);
        Text.padding({ top: 15, bottom: 15 });
        Text.width("100%");
        Text.onClick(() => {
            this.initData();
            router.pushUrl({ url: 'pages/Sample2' });
        });
        Text.pop();
        Text.create("Polygon");
        Text.fontSize(14);
        Text.padding({ top: 15, bottom: 15 });
        Text.width("100%");
        Text.onClick(() => {
            this.initData();
            router.pushUrl({ url: 'pages/PolygonPage' });
        });
        Text.pop();
        Flex.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color("#DEDEDE");
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color("#DEDEDE");
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding({ top: 10, bottom: 10 });
        Text.create("Effects");
        Text.fontSize(14);
        Text.fontColor("#666666");
        Text.padding({ left: 20, top: 10, bottom: 10, right: 20 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row });
        Flex.padding({ left: 20, top: 10, bottom: 10, right: 20 });
        Image.create($r("app.media.image_gallery"));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.visibility(this.menuWidth == "70%" ? Visibility.Visible : Visibility.None);
        Text.create("Changing colours");
        Text.fontSize(14);
        Text.padding({ left: 20, top: 15, bottom: 15, right: 20 });
        Text.width("100%");
        Text.onClick(() => {
            this.initData();
            router.pushUrl({ url: 'pages/ChangeColor' });
        });
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row });
        Flex.padding({ left: 20, top: 10, bottom: 10, right: 20 });
        Image.create($r("app.media.image_gallery"));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.visibility(this.menuWidth == "70%" ? Visibility.Visible : Visibility.None);
        Text.create("Render to an image");
        Text.fontSize(14);
        Text.padding({ left: 20, top: 15, bottom: 15, right: 20 });
        Text.width("100%");
        Text.onClick(() => {
            this.initData();
            router.pushUrl({ url: 'pages/getSVGPixelMap' });
        });
        Text.pop();
        Flex.pop();
        Flex.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color("#DEDEDE");
        Flex.create({ direction: FlexDirection.Column });
        Flex.padding({ top: 10, bottom: 10 });
        Text.create("Simple animation");
        Text.fontSize(14);
        Text.fontColor("#666666");
        Text.padding({ left: 20, top: 10, bottom: 10, right: 20 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row });
        Flex.padding({ left: 20, top: 10, bottom: 10, right: 20 });
        Flex.width("100%");
        Flex.onClick(() => {
            this.initData();
            router.pushUrl({ url: 'pages/AnotherSample' });
        });
        Image.create($r("app.media.image_gallery"));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Text.create("Line drawing");
        Text.fontSize(14);
        Text.padding({ left: 20, top: 15, bottom: 15, right: 20 });
        Text.pop();
        Flex.pop();
        Flex.pop();
        Flex.pop();
        Flex.pop();
        //leftMenu
        Flex.pop();
        Stack.pop();
    }
    private faceColours: string[]; // yellow, red, green, orange, blue, white
    private initData() {
        clearInterval(this.timerId);
        this.menuWidth = "0%";
    }
}
loadDocument(new Index("1", undefined, {}));
