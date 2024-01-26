interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    confirm?: ESObject | null;
}
interface SimpleSample_Params {
    editFlag?: boolean;
    data?: PhotoView.Model;
    toastNum?: number;
    showRect?: string;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleSample_" + ++__generate__Id;
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
import { PhotoView } from '@ohos/photoview';
import RectF from '@ohos/photoview/src/main/ets/components/mainpage/RectF';
import prompt from '@system.prompt';
let that: any;
class SimpleSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__editFlag = new ObservedPropertySimple(false, this, "editFlag");
        this.__data = new ObservedPropertyObject(new PhotoView.Model(), this, "data");
        this.__toastNum = new ObservedPropertySimple(1, this, "toastNum");
        this.__showRect = new ObservedPropertySimple("RectF", this, "showRect");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, { confirm: this.onAccept });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Top,
            offset: { dx: 100, dy: 10 },
            cancel: this.existApp,
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SimpleSample_Params) {
        if (params.editFlag !== undefined) {
            this.editFlag = params.editFlag;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.toastNum !== undefined) {
            this.toastNum = params.toastNum;
        }
        if (params.showRect !== undefined) {
            this.showRect = params.showRect;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__editFlag.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__toastNum.aboutToBeDeleted();
        this.__showRect.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __editFlag: ObservedPropertySimple<boolean>;
    get editFlag() {
        return this.__editFlag.get();
    }
    set editFlag(newValue: boolean) {
        this.__editFlag.set(newValue);
    }
    private __data: ObservedPropertyObject<PhotoView.Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: PhotoView.Model) {
        this.__data.set(newValue);
    }
    private __toastNum: ObservedPropertySimple<number>;
    get toastNum() {
        return this.__toastNum.get();
    }
    set toastNum(newValue: number) {
        this.__toastNum.set(newValue);
    }
    private __showRect: ObservedPropertySimple<string>;
    get showRect() {
        return this.__showRect.get();
    }
    set showRect(newValue: string) {
        this.__showRect.set(newValue);
    }
    private dialogController: CustomDialogController;
    onAccept(index: number) {
        if (index == 0) {
            that.data.setZoomable(false);
        }
        else if (index == 1) {
            that.data.setZoomable(true);
        }
        else if (index == 2) {
            that.data.setImageFit(ImageFit.Contain);
        }
        else if (index == 5) {
            that.data.setImageFit(ImageFit.Fill);
        }
        else if (index == 6) {
            that.data.setImageFit(ImageFit.None);
        }
        else if (index == 7) {
            that.data.setImageFit(ImageFit.Cover);
        }
        else if (index == 8) {
            that.data.setImageFit(ImageFit.ScaleDown);
        }
        else if (index == 9) {
            that.data.setScale(Math.random() + 1, true);
        }
        else if (index == 10) {
            that.data.setScale(Math.random() + 1, true);
        }
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.padding(0);
        Column.margin(0);
        Column.border({ width: 0 });
        Column.backgroundColor(0x3d3d3d);
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(50);
        Row.backgroundColor(0x3d3d3d);
        Image.create($r('app.media.back'));
        Image.width(45);
        Image.height(45);
        Image.margin({ left: 5 });
        Image.onClick((event: ClickEvent) => {
            router.back();
        });
        Text.create('Simple Sample');
        Text.width('75%');
        Text.fontColor(0xffffff);
        Text.fontSize(20);
        Text.margin({ top: 4 });
        Text.pop();
        Image.create($r('app.media.more'));
        Image.width(45);
        Image.height(45);
        Image.margin({ right: 5 });
        Image.onClick((event: ClickEvent) => {
            this.dialogController.open();
        });
        Row.pop();
        Text.create(`${this.showRect}`);
        Text.width('100%');
        Text.height(20);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Black);
        Text.pop();
        Column.pop();
    }
    onPageShow() {
        setTimeout(() => {
            this.showRect = that.data.getRectF().toString();
        }, 120);
    }
    aboutToAppear() {
        that = this;
        that.data
            .setImageResource($r('app.media.wallpaper'))
            .setScale(1, false)
            .setImageFit(ImageFit.Contain)
            .setMaximumScale(3)
            .setOnPhotoTapListener({
            onPhotoTap(x: number, y: number) {
                let xResult = x * 100;
                let yResult = y * 100;
                prompt.showToast({
                    message: 'Photo Tap! X:' + xResult + "%  Y:" + yResult + "%",
                    duration: 2000,
                });
            }
        })
            .setOnMatrixChangeListener({
            onMatrixChanged(rect: RectF) {
                that.showRect = rect.toString();
            }
        });
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: () => { }
        }, this);
        this.confirm = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: any | null;
    render() {
        Column.create();
        Column.backgroundColor(0x3d3d3d);
        Text.create("Disable Zoom");
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            if (!!this.confirm)
                this.confirm(0);
        });
        Text.pop();
        Text.create("Enable Zoom");
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(1);
        });
        Text.pop();
        Text.create('Change to FIT_CENTER');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(2);
        });
        Text.pop();
        Text.create('Change to FIT_XY');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(5);
        });
        Text.pop();
        Text.create('Change to CENTER');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(6);
        });
        Text.pop();
        Text.create('Change to Center_crop');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(7);
        });
        Text.pop();
        Text.create('Change to CENTER_Inside');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(8);
        });
        Text.pop();
        Text.create('Animate scale to random value');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(9);
        });
        Text.pop();
        Text.create('set scale to random value');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(10);
        });
        Text.pop();
        Text.create('Restore Display Matrix');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(11);
        });
        Text.pop();
        Text.create('Capture Display Matrix');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10, bottom: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(12);
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new SimpleSample("1", undefined, {}));
