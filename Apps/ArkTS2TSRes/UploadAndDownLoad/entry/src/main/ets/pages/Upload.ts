interface Upload_Params {
    isBackground?: boolean;
    backTaskState?: BackgroundTaskState;
    isBegin?: boolean;
    imageList?: Array<string>;
    progress?: number;
    countdown?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Upload_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import common from '@ohos.app.ability.common';
import promptAction from '@ohos.promptAction';
import { AddPictures } from '../components/AddPictures';
import { BackgroundTaskState, requestUpload, TOAST_BOTTOM } from '@ohos/uploaddownload';
const TIME_MAX: number = 5;
class Upload extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isBackground = AppStorage.SetAndLink('isBackground', false, this, "isBackground");
        this.__backTaskState = AppStorage.SetAndLink('backTaskState', BackgroundTaskState.NONE, this, "backTaskState");
        this.__isBegin = new ObservedPropertySimple(false, this, "isBegin");
        this.__imageList = new ObservedPropertyObject([], this, "imageList");
        this.addProvidedVar("imageList", this.__imageList, false);
        this.__progress = new ObservedPropertySimple(0, this, "progress");
        this.__countdown = new ObservedPropertySimple(0, this, "countdown");
        this.updateWithValueParams(params);
        this.declareWatch("backTaskState", this.stateChange);
    }
    updateWithValueParams(params: Upload_Params) {
        if (params.isBegin !== undefined) {
            this.isBegin = params.isBegin;
        }
        if (params.imageList !== undefined) {
            this.imageList = params.imageList;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.countdown !== undefined) {
            this.countdown = params.countdown;
        }
    }
    aboutToBeDeleted() {
        this.__isBackground.aboutToBeDeleted();
        this.__backTaskState.aboutToBeDeleted();
        this.__isBegin.aboutToBeDeleted();
        this.__imageList.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__countdown.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isBackground: ObservedPropertyAbstract<boolean>;
    get isBackground() {
        return this.__isBackground.get();
    }
    set isBackground(newValue: boolean) {
        this.__isBackground.set(newValue);
    }
    private __backTaskState: ObservedPropertyAbstract<BackgroundTaskState>;
    get backTaskState() {
        return this.__backTaskState.get();
    }
    set backTaskState(newValue: BackgroundTaskState) {
        this.__backTaskState.set(newValue);
    }
    private __isBegin: ObservedPropertySimple<boolean>;
    get isBegin() {
        return this.__isBegin.get();
    }
    set isBegin(newValue: boolean) {
        this.__isBegin.set(newValue);
    }
    private __imageList: ObservedPropertyObject<Array<string>>;
    get imageList() {
        return this.__imageList.get();
    }
    set imageList(newValue: Array<string>) {
        this.__imageList.set(newValue);
    }
    private __progress: ObservedPropertySimple<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __countdown: ObservedPropertySimple<number>;
    get countdown() {
        return this.__countdown.get();
    }
    set countdown(newValue: number) {
        this.__countdown.set(newValue);
    }
    render() {
        Navigation.create();
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.backgroundColor($r('app.color.light_gray'));
        Navigation.title($r('app.string.upload'));
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.mode(NavigationMode.Stack);
        Scroll.create();
        Scroll.padding({ left: 24, right: 24 });
        Scroll.width('100%');
        Scroll.layoutWeight(1);
        Scroll.align(Alignment.Top);
        let earlierCreatedChild_2: AddPictures = (this && this.findChildById) ? this.findChildById("2") as AddPictures : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new AddPictures("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Scroll.pop();
        Column.create();
        Column.width('100%');
        Column.padding({ left: 24, right: 24 });
        Button.createWithChild();
        Button.id('publish');
        Button.width('100%');
        Button.height(40);
        Button.margin({ bottom: this.isBegin ? 16 : 24 });
        Button.enabled(this.countdown > 0 ? false : true);
        Button.backgroundColor($r('app.color.button_blue'));
        Button.onClick(() => {
            if (this.isBackground && this.backTaskState !== BackgroundTaskState.NONE) {
                requestUpload.pauseOrResume();
            }
            else {
                this.uploadFiles();
            }
        });
        If.create();
        if (this.isBackground && this.backTaskState !== BackgroundTaskState.NONE) {
            If.branchId(0);
            If.create();
            if (this.backTaskState === BackgroundTaskState.RUNNING) {
                If.branchId(0);
                Text.create($r('app.string.pause'));
                Text.fontSize(16);
                Text.fontWeight(500);
                Text.fontColor($r('app.color.white'));
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create($r('app.string.continue'));
                Text.fontSize(16);
                Text.fontWeight(500);
                Text.fontColor($r('app.color.white'));
                Text.pop();
            }
            If.pop();
        }
        else if (this.isBegin && !this.isBackground) {
            If.branchId(1);
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Progress.create({ value: this.progress, type: ProgressType.Ring });
            Progress.width(20);
            Progress.height(20);
            Progress.backgroundColor('#FFFFFF');
            Progress.color('#558DFF');
            Progress.style({ strokeWidth: 2, scaleCount: 100, scaleWidth: 2 });
            Text.create(`${this.getResourceString($r('app.string.uploading'))}${this.progress}%`);
            Text.fontSize(16);
            Text.fontColor(0xffffff);
            Text.fontWeight(500);
            Text.margin({ left: 12 });
            Text.pop();
            Row.pop();
        }
        else {
            If.branchId(2);
            If.create();
            if (this.countdown > 0) {
                If.branchId(0);
                Text.create(`${this.countdown}s`);
                Text.fontSize(16);
                Text.fontWeight(500);
                Text.fontColor($r('app.color.white'));
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create($r('app.string.upload'));
                Text.fontSize(16);
                Text.fontWeight(500);
                Text.fontColor($r('app.color.white'));
                Text.pop();
            }
            If.pop();
        }
        If.pop();
        Button.pop();
        If.create();
        if (this.isBegin) {
            If.branchId(0);
            Button.createWithChild();
            Button.id('cancel');
            Button.width('100%');
            Button.height(40);
            Button.margin({ bottom: 24 });
            Button.backgroundColor($r('app.color.button_light_gray'));
            Button.onClick(() => {
                // 取消上传任务
                requestUpload.cancelTask();
                this.progress = 0;
                this.isBegin = false;
            });
            Text.create($r('app.string.cancel'));
            Text.fontSize(16);
            Text.fontWeight(500);
            Text.fontColor($r('app.color.btn_text_blue'));
            Text.pop();
            Button.pop();
        }
        If.pop();
        Column.pop();
        Navigation.pop();
    }
    aboutToAppear() {
        this.isBegin = false;
        this.backTaskState = BackgroundTaskState.NONE;
    }
    stateChange() {
        if (this.backTaskState === BackgroundTaskState.NONE) {
            this.imageList = [];
        }
    }
    uploadFiles() {
        if (this.imageList.length == 0) {
            return;
        }
        if (this.isBackground) {
            AppStorage.SetOrCreate('backTaskState', BackgroundTaskState.RUNNING);
            requestUpload.uploadFilesBackground(this.imageList);
            promptAction.showToast({ message: $r('app.string.background_task_start'), bottom: TOAST_BOTTOM });
        }
        else {
            this.isBegin = true;
            this.progress = 0;
            requestUpload.uploadFiles(this.imageList, (progress: number, isSucceed: boolean) => {
                this.progress = progress;
                if (this.progress === 100 && isSucceed) {
                    this.isBegin = false;
                    this.imageList = [];
                    promptAction.showToast({ message: $r('app.string.upload_success'), bottom: TOAST_BOTTOM });
                }
                if (this.progress === 100 && isSucceed === false) {
                    this.isBegin = false;
                    this.countdown = TIME_MAX;
                    let interval = setInterval(() => {
                        if (this.countdown > 0) {
                            this.countdown--;
                        }
                        else {
                            clearInterval(interval);
                        }
                    }, 1000);
                    promptAction.showToast({ message: $r('app.string.upload_fail'), bottom: TOAST_BOTTOM });
                }
            });
        }
    }
    getResourceString(resource: Resource) {
        let context = getContext(this) as common.UIAbilityContext;
        return context.resourceManager.getStringSync(resource.id);
    }
}
loadDocument(new Upload("1", undefined, {}));
