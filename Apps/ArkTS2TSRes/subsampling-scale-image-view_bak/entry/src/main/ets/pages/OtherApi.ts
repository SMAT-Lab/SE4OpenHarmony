interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    confirm?: ESObject | null;
}
interface OtherApi_Params {
    model?: SubsamplingScaleImageView.Model;
    mRotate?: number;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OtherApi_" + ++__generate__Id;
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
import { SubsamplingScaleImageView } from '@ohos/subsampling-scale-image-view';
import prompt from '@system.prompt';
import router from '@ohos.router';
let that: any;
class OtherApi extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SubsamplingScaleImageView.Model(), this, "model");
        this.__mRotate = new ObservedPropertySimple(0, this, "mRotate");
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
    updateWithValueParams(params: OtherApi_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.mRotate !== undefined) {
            this.mRotate = params.mRotate;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__mRotate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SubsamplingScaleImageView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SubsamplingScaleImageView.Model) {
        this.__model.set(newValue);
    }
    private __mRotate: ObservedPropertySimple<number>;
    get mRotate() {
        return this.__mRotate.get();
    }
    set mRotate(newValue: number) {
        this.__mRotate.set(newValue);
    }
    private dialogController: CustomDialogController;
    onAccept(index: number) {
        if (index == 0) {
            that.model.setZoomEnabled(false);
        }
        else if (index == 1) {
            that.model.setZoomEnabled(true);
        }
        else if (index == 2) {
            that.model.setQuickScaleEnabled(true);
        }
        else if (index == 3) {
            prompt.showToast({
                message: 'Image width:' + that.model.getSWidth() + " height:" + that.model.getSHeight(),
                duration: 2000,
            });
        }
        else if (index == 4) {
            that.mRotate += 90;
            that.model.setOrientation(that.mRotate);
        }
        else if (index == 5) {
            that.model.resetScaleAndCenter();
        }
        else if (index == 6) {
            that.model.setPanEnabled(false);
        }
        else if (index == 7) {
            that.model.setPanEnabled(true);
        }
    }
    existApp() {
        console.debug('Click the callback in the blank area');
    }
    aboutToAppear() {
        that = this;
        this.model.setImage($r('app.media.sanmartino')).setScale(1).setMaxScale(3).setTileBackgroundColor(0XFF090909);
    }
    onPageShow() {
        setTimeout(() => {
            console.debug("SubsamplingScaleImageView isImageLoaded:" + that.model.isImageLoaded());
            console.debug("SubsamplingScaleImageView state:" + JSON.stringify(that.model.getState()));
        }, 1000);
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.height('100%');
        Stack.width('100%');
        Stack.backgroundColor(0x3d3d3d);
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(80);
        Row.backgroundColor(0x3d3d3d);
        Image.create($r('app.media.previous'));
        Image.width(45);
        Image.height(45);
        Image.margin({ left: 5 });
        Image.onClick((event: ClickEvent) => {
            router.back();
        });
        Text.create('OtherApi Sample');
        Text.width('75%');
        Text.fontColor(0xffffff);
        Text.fontSize(20);
        Text.margin({ top: 10 });
        Text.layoutWeight(1);
        Text.pop();
        Image.create($r('app.media.more'));
        Image.width(45);
        Image.height(45);
        Image.margin({ right: 5 });
        Image.onClick((event: ClickEvent) => {
            this.dialogController.open();
        });
        Row.pop();
        Stack.pop();
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
        Text.create('ENABLE QuickScale');
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
        Text.create('Image width/height');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(3);
        });
        Text.pop();
        Text.create('Rotate');
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(4);
        });
        Text.pop();
        Text.create('Reset Scale');
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
        Text.create('Disable Pan');
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
        Text.create('Enable Pan');
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
        Column.pop();
    }
}
loadDocument(new OtherApi("1", undefined, {}));
