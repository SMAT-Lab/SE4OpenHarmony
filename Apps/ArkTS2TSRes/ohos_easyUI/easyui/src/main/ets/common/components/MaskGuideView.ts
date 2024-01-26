interface MaskGuideView_Params {
    message?: string;
    setting?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    context1?: CanvasRenderingContext2D;
    touchable_MaskGuideView?: boolean;
    isShow?: boolean;
    tipMessage?: string;
    selectAreaPositionX?: number;
    selectAreaPositionY?: number;
    selectAreaWidth?: number;
    selectAreaHeight?: number;
    confirm?: boolean;
    index?: number;
    visible?: Visibility;
    screenWidth?: number;
    screenHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaskGuideView_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
export class MaskGuideView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.setting = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.setting);
        this.context1 = new CanvasRenderingContext2D(this.setting);
        this.__touchable_MaskGuideView = new ObservedPropertySimple(false, this, "touchable_MaskGuideView");
        this.__isShow = new ObservedPropertySimple(true, this, "isShow");
        this.tipMessage = "点击此区域，可以进入会员中心界面哦!";
        this.selectAreaPositionX = 125;
        this.selectAreaPositionY = 100;
        this.selectAreaWidth = 100;
        this.selectAreaHeight = 50;
        this.__confirm = AppStorage.SetAndLink("confirm", false, this, "confirm");
        this.__index = AppStorage.SetAndLink("index", 1, this, "index");
        this.__visible = new ObservedPropertySimple(Visibility.Visible, this, "visible");
        this.screenWidth = 300;
        this.screenHeight = 630;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaskGuideView_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.setting !== undefined) {
            this.setting = params.setting;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.context1 !== undefined) {
            this.context1 = params.context1;
        }
        if (params.touchable_MaskGuideView !== undefined) {
            this.touchable_MaskGuideView = params.touchable_MaskGuideView;
        }
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.tipMessage !== undefined) {
            this.tipMessage = params.tipMessage;
        }
        if (params.selectAreaPositionX !== undefined) {
            this.selectAreaPositionX = params.selectAreaPositionX;
        }
        if (params.selectAreaPositionY !== undefined) {
            this.selectAreaPositionY = params.selectAreaPositionY;
        }
        if (params.selectAreaWidth !== undefined) {
            this.selectAreaWidth = params.selectAreaWidth;
        }
        if (params.selectAreaHeight !== undefined) {
            this.selectAreaHeight = params.selectAreaHeight;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__touchable_MaskGuideView.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        this.__confirm.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private setting: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private context1: CanvasRenderingContext2D;
    private __touchable_MaskGuideView: ObservedPropertySimple<boolean>;
    get touchable_MaskGuideView() {
        return this.__touchable_MaskGuideView.get();
    }
    set touchable_MaskGuideView(newValue: boolean) {
        this.__touchable_MaskGuideView.set(newValue);
    }
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private tipMessage: string;
    private selectAreaPositionX: number;
    private selectAreaPositionY: number;
    private selectAreaWidth: number;
    private selectAreaHeight: number;
    private __confirm: ObservedPropertyAbstract<boolean>;
    get confirm() {
        return this.__confirm.get();
    }
    set confirm(newValue: boolean) {
        this.__confirm.set(newValue);
    }
    private __index: ObservedPropertyAbstract<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __visible: ObservedPropertySimple<Visibility>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: Visibility) {
        this.__visible.set(newValue);
    }
    private screenWidth: number;
    private screenHeight: number;
    aboutToAppear() {
        if (this.screenWidth == 0 && this.screenHeight == 0) { //如果是在previewer中运行，设为固定值
            this.screenWidth = display.getDefaultDisplaySync().width; //获取设备屏幕宽度
            this.screenHeight = display.getDefaultDisplaySync().height; //获取设备屏幕高度
        }
    }
    render() {
        Stack.create();
        Stack.visibility(this.visible);
        Column.create();
        If.create();
        if (this.isShow) {
            If.branchId(0);
            Canvas.create(this.context);
            Canvas.onReady(() => {
                this.context.globalAlpha = 0.6;
                this.context.fillStyle = "#ff000000";
                this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
            });
            Canvas.touchable(this.touchable_MaskGuideView);
            Canvas.pop();
        }
        If.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('100%');
        If.create();
        if (this.isShow) {
            If.branchId(0);
            If.create();
            if (this.selectAreaPositionY >= 0 && this.selectAreaPositionY <= this.screenHeight / 2) {
                If.branchId(0);
                Text.create();
                Text.width(this.selectAreaWidth + 2);
                Text.height(this.selectAreaHeight + 2);
                Text.position({
                    x: this.selectAreaPositionX - 1,
                    y: this.selectAreaPositionY - 1
                });
                Text.borderStyle(BorderStyle.Solid);
                Text.borderWidth(2);
                Text.borderRadius(18);
                Text.borderColor("#ffffffff");
                Text.pop();
                Text.create(this.tipMessage);
                Text.width(180);
                Text.maxLines(3);
                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                Text.fontSize(16);
                Text.fontColor("#ffd1d7d6");
                Text.textAlign(TextAlign.Center);
                Text.position({
                    x: 60,
                    y: this.selectAreaPositionY + this.selectAreaHeight + 20
                });
                Text.pop();
                Text.create("我知道啦");
                Text.width(100);
                Text.fontSize(16);
                Text.fontColor("#ffd1d7d6");
                Text.fontWeight(FontWeight.Bold);
                Text.textAlign(TextAlign.Center);
                Text.position({
                    x: 100,
                    y: this.selectAreaPositionY + this.selectAreaHeight + 80
                });
                Text.borderStyle(BorderStyle.Solid);
                Text.borderWidth(3);
                Text.borderRadius(25);
                Text.borderColor("#ffd1d7d6");
                Text.padding({ left: 10, right: 10, bottom: 5, top: 5 });
                Text.onClick(() => {
                    this.isShow = false;
                    this.confirm = true;
                    this.index++;
                });
                Text.pop();
            }
            If.pop();
            If.create();
            if (this.selectAreaPositionY <= this.screenHeight && this.selectAreaPositionY > this.screenHeight / 2) {
                If.branchId(0);
                Text.create();
                Text.width(this.selectAreaWidth);
                Text.height(this.selectAreaHeight);
                Text.position({
                    x: this.selectAreaPositionX,
                    y: this.selectAreaPositionY
                });
                Text.borderStyle(BorderStyle.Solid);
                Text.borderWidth(2);
                Text.borderColor("#ff797373");
                Text.pop();
                Text.create(this.tipMessage);
                Text.width(180);
                Text.maxLines(3);
                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                Text.fontSize(16);
                Text.fontColor("#ffd1d7d6");
                Text.textAlign(TextAlign.Center);
                Text.position({
                    x: 60,
                    y: this.selectAreaPositionY - 60
                });
                Text.pop();
                Text.create("我知道啦");
                Text.fontSize(16);
                Text.fontColor("#ffd1d7d6");
                Text.fontWeight(FontWeight.Bold);
                Text.textAlign(TextAlign.Center);
                Text.position({
                    x: 100,
                    y: this.selectAreaPositionY - 100
                });
                Text.borderStyle(BorderStyle.Solid);
                Text.borderWidth(3);
                Text.borderRadius(25);
                Text.borderColor("#ffd1d7d6");
                Text.padding({ left: 10, right: 10, bottom: 5, top: 5 });
                Text.onClick(() => {
                    this.isShow = false;
                    this.confirm = true;
                    this.index++;
                });
                Text.pop();
            }
            If.pop();
        }
        If.pop();
        Column.pop();
        Stack.pop();
    }
}
