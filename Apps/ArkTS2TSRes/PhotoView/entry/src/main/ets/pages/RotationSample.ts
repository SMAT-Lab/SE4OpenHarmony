interface CustomDialogExample_Params {
    controller?: CustomDialogController;
    counter?: number;
    confirm?: ESObject | null;
}
interface Sample_Params {
    editFlag?: boolean;
    data?: PhotoView.Model;
    rotating?: boolean;
    intervalID?: number;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RotationSample_" + ++__generate__Id;
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
import { PhotoView } from '@ohos/photoview';
import router from '@ohos.router';
let that: any;
class Sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__editFlag = new ObservedPropertySimple(false, this, "editFlag");
        this.__data = new ObservedPropertyObject(new PhotoView.Model(), this, "data");
        this.__rotating = new ObservedPropertySimple(false, this, "rotating");
        this.intervalID = 0;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, { confirm: this.onAccept });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            alignment: DialogAlignment.Top,
            offset: { dx: 100, dy: 20 },
            cancel: this.existApp,
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample_Params) {
        if (params.editFlag !== undefined) {
            this.editFlag = params.editFlag;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.rotating !== undefined) {
            this.rotating = params.rotating;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__editFlag.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__rotating.aboutToBeDeleted();
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
    private __rotating: ObservedPropertySimple<boolean>;
    get rotating() {
        return this.__rotating.get();
    }
    set rotating(newValue: boolean) {
        this.__rotating.set(newValue);
    }
    private intervalID: number;
    private dialogController: CustomDialogController;
    onAccept(index: number) {
        if (index == 0) {
            that.data.setRotationBy(10);
        }
        else if (index == 1) {
            that.data.setRotationBy(-10);
        }
        else if (index == 2) {
            that.intervalID = setInterval(() => {
                that.data.setRotationBy(1);
            }, 15);
            if (that.intervalID % 2 == 0) {
                clearInterval(that.intervalID - 1);
                clearInterval(that.intervalID);
            }
        }
        else if (index == 3) {
            that.data.setRotationTo(0);
        }
        else if (index == 4) {
            that.data.setRotationTo(90);
        }
        else if (index == 5) {
            that.data.setRotationTo(180);
        }
        else if (index == 6) {
            that.data.setRotationTo(270);
        }
    }
    toogleRotation(): void {
        console.info("photo ro:" + this.rotating);
        if (this.rotating) {
            clearInterval(that.intervalID);
        }
        else {
            that.intervalID = setInterval(() => {
                that.data.setRotationBy(1);
            }, 15);
        }
        this.rotating = this.rotating ? false : true;
        console.info("photo rotating:" + this.rotating);
    }
    onShow() {
        console.info("onAccept onShow");
    }
    existApp() {
        console.info('Click the callback in the blank area');
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
        Image.create($r('app.media.back'));
        Image.width(45);
        Image.height(45);
        Image.margin({ left: 5 });
        Image.onClick((event: ClickEvent) => {
            router.back();
        });
        Text.create('Rotation Sample');
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
    aboutToAppear() {
        that = this;
        this.data
            .setImageResource($r('app.media.wallpaper'));
    }
}
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new CustomDialogController({
            builder: () => { }
        }, this);
        this.__counter = new ObservedPropertySimple(0, this, "counter");
        this.confirm = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.counter !== undefined) {
            this.counter = params.counter;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__counter.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __counter: ObservedPropertySimple<number>;
    get counter() {
        return this.__counter.get();
    }
    set counter(newValue: number) {
        this.__counter.set(newValue);
    }
    private confirm: any | null;
    render() {
        Column.create();
        Column.backgroundColor(0x3d3d3d);
        Text.create("Rotate 10° Right");
        Text.width('100%');
        Text.height(60);
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(0);
        });
        Text.pop();
        Text.create("Rotate 10° Left");
        Text.width('100%');
        Text.padding({ left: 20 });
        Text.fontSize(14);
        Text.height(60);
        Text.fontColor(0xffffff);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (!!this.controller)
                this.controller.close();
            this.confirm(1);
        });
        Text.pop();
        Text.create("Toggle Automatic Rotation");
        Text.width('100%');
        Text.height(60);
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
        Text.create('Reset to 0');
        Text.width('100%');
        Text.height(60);
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
        Text.create('Reset to 90');
        Text.width('100%');
        Text.height(60);
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
        Text.create('Reset to 180');
        Text.width('100%');
        Text.height(60);
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
        Text.create('Reset to 270');
        Text.width('100%');
        Text.height(60);
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
        Column.pop();
    }
}
loadDocument(new Sample("1", undefined, {}));
