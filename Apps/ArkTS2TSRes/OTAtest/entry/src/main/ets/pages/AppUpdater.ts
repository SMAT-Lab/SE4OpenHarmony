interface Index_Params {
    newVersionStatus?: string;
    updaterManagement?: UpdaterManagement;
}
interface TitleBar_Params {
    onBack?: () => boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AppUpdater_" + ++__generate__Id;
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
import { UpdaterManagement, NewVersionStatus } from '../components/AppUpaterManagement';
import { DialogHelper } from '../dialog/dialogHelper';
import router from '@ohos.router';
globalThis.context = getContext(this) as any;
class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.onBack = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private onBack?: () => boolean;
    render() {
        Row.create();
        Row.width('100%');
        Row.padding(10);
        Row.create();
        Image.create($r('app.media.back'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 16 });
        Image.onClick(() => {
            let isCanNotBack = this.onBack?.();
            if (isCanNotBack) {
                return;
            }
            router.back();
        });
        Text.create('升级');
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.margin({ left: 16 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__newVersionStatus = new ObservedPropertySimple(NewVersionStatus.NO_NEW_VERSION, this, "newVersionStatus");
        this.__updaterManagement = new ObservedPropertyObject(UpdaterManagement.getInstance(), this, "updaterManagement");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.newVersionStatus !== undefined) {
            this.newVersionStatus = params.newVersionStatus;
        }
        if (params.updaterManagement !== undefined) {
            this.updaterManagement = params.updaterManagement;
        }
    }
    aboutToBeDeleted() {
        this.__newVersionStatus.aboutToBeDeleted();
        this.__updaterManagement.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __newVersionStatus: ObservedPropertySimple<string>;
    get newVersionStatus() {
        return this.__newVersionStatus.get();
    }
    set newVersionStatus(newValue: string) {
        this.__newVersionStatus.set(newValue);
    }
    private __updaterManagement: ObservedPropertyObject<UpdaterManagement>;
    get updaterManagement() {
        return this.__updaterManagement.get();
    }
    set updaterManagement(newValue: UpdaterManagement) {
        this.__updaterManagement.set(newValue);
    }
    async aboutToAppear() {
        this.updaterManagement.getBundleInfo();
    }
    onPageShow() {
        this.updaterManagement.onInit();
        this.updaterManagement.getCurrVersion();
    }
    render() {
        Column.create();
        Column.width('100%');
        __Common__.create();
        __Common__.height('15%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Image.create($r('app.media.logo'));
        Image.height('25%');
        Image.width('70%');
        Image.objectFit(ImageFit.Contain);
        Column.create();
        Column.width('100%');
        Column.height('35%');
        Text.create(this.updaterManagement.title);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        If.create();
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.HAS_NEW_VERSION) {
            If.branchId(0);
            Column.create();
            Column.backgroundColor('#ffedf1f5');
            Column.borderRadius(20);
            Column.padding(15);
            Column.margin({ top: 3 });
            If.create();
            if (!this.updaterManagement.showUpdateMsg) {
                If.branchId(0);
                Text.create("检测到新版本：" + this.updaterManagement.versionName);
                Text.fontSize(30);
                Text.fontWeight(FontWeight.Normal);
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create("升级包大小：" + this.updaterManagement.size);
                Text.fontSize(30);
                Text.fontWeight(FontWeight.Normal);
                Text.pop();
            }
            If.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_NEW_VERSION) {
            If.branchId(0);
            Column.create();
            Text.create(this.updaterManagement.downloadProgress + "%");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Normal);
            Text.margin({ top: 10 });
            Text.pop();
            Progress.create({ value: this.updaterManagement.downloadProgress, type: ProgressType.Linear });
            Progress.width('70%');
            Progress.margin({ top: 10 });
            Column.pop();
        }
        If.pop();
        If.create();
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_SUCCESS) {
            If.branchId(0);
            Text.create("升级包已准备就绪，是否立即更新？");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Normal);
            Text.margin({ top: 10 });
            Text.pop();
        }
        If.pop();
        Column.pop();
        Column.create();
        Column.height('25%');
        Column.justifyContent(FlexAlign.End);
        If.create();
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_SUCCESS ||
            this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_FAIL) {
            If.branchId(0);
            Text.create("重新下载");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Normal);
            Text.fontColor(Color.Blue);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 5 });
            Text.onClick(() => {
                DialogHelper.showDialog("重新下载", "本次操作将会清除下载记录，是否重新开始检测新版本", '是', {
                    onCancel: () => {
                    },
                    onConfirm: () => {
                        this.updaterManagement.onInit();
                        this.updaterManagement.getCurrVersion();
                        this.updaterManagement.showUpdateMsg = 0;
                    }
                });
            });
            Text.pop();
        }
        If.pop();
        Button.createWithLabel(this.updaterManagement.button);
        Button.margin({ bottom: 5 });
        Button.width(350);
        Button.height(60);
        Button.fontSize(45);
        Button.onClick(() => {
            this.updaterManagement.onClick();
        });
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
