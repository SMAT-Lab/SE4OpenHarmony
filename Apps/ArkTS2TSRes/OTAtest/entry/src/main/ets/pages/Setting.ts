interface Setting_Params {
    onBack?: () => boolean;
    autoUpgrade?: boolean;
    autoDownload?: boolean;
    ip?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Setting_" + ++__generate__Id;
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
import router from '@ohos.router';
import { DialogHelper } from '../dialog/dialogHelper';
import { UpdaterManagement } from '../components/UpdaterManagement';
import systemparameter from '@ohos.systemParameterEnhance';
class Setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.onBack = undefined;
        this.__autoUpgrade = new ObservedPropertySimple(false, this, "autoUpgrade");
        this.__autoDownload = new ObservedPropertySimple(false, this, "autoDownload");
        this.__ip = new ObservedPropertySimple(systemparameter.getSync("update.serverip.search"), this, "ip");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Setting_Params) {
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
        if (params.autoUpgrade !== undefined) {
            this.autoUpgrade = params.autoUpgrade;
        }
        if (params.autoDownload !== undefined) {
            this.autoDownload = params.autoDownload;
        }
        if (params.ip !== undefined) {
            this.ip = params.ip;
        }
    }
    aboutToBeDeleted() {
        this.__autoUpgrade.aboutToBeDeleted();
        this.__autoDownload.aboutToBeDeleted();
        this.__ip.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private onBack?: () => boolean;
    private __autoUpgrade: ObservedPropertySimple<boolean>;
    get autoUpgrade() {
        return this.__autoUpgrade.get();
    }
    set autoUpgrade(newValue: boolean) {
        this.__autoUpgrade.set(newValue);
    }
    private __autoDownload: ObservedPropertySimple<boolean>;
    get autoDownload() {
        return this.__autoDownload.get();
    }
    set autoDownload(newValue: boolean) {
        this.__autoDownload.set(newValue);
    }
    private __ip: ObservedPropertySimple<string>;
    get ip() {
        return this.__ip.get();
    }
    set ip(newValue: string) {
        this.__ip.set(newValue);
    }
    onPageShow() {
        this.ip = systemparameter.getSync("update.serverip.search");
    }
    async aboutToAppear() {
        //获取当前升级策略
        this.ip = systemparameter.getSync("update.serverip.search");
        UpdaterManagement.getInstance().getUpgradePolicy().then(policy => {
            if (policy.downloadStrategy) {
                this.autoDownload = true;
                if (policy.autoUpgradeStrategy) {
                    this.autoUpgrade = true;
                }
            }
            console.log(`policy downloadStrategy = ${policy.downloadStrategy}`);
            console.log(`policy autoUpgradeStrategy = ${policy.autoUpgradeStrategy}`);
        }).catch(err => {
            console.log(`getUpgradePolicy promise error ${JSON.stringify(err)}`);
        });
    }
    render() {
        Column.create();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Row.height('15%');
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
        Text.create('设置');
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.margin({ left: 16 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create({ space: 10 });
        Column.padding(20);
        Row.create();
        Row.width('100%');
        Row.backgroundColor(0xFFFFFF);
        Row.borderRadius(15);
        Row.padding({ left: 12 });
        Column.create();
        Column.width('80%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('智慧升级');
        Text.fontSize(23);
        Text.padding(5);
        Text.pop();
        Text.create('新版本将通过WLAN自动下载，并在夜间设备闲置时自动安装');
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Lighter);
        Text.padding(5);
        Text.pop();
        Column.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: this.autoUpgrade });
        Toggle.height(30);
        Toggle.width(80);
        Toggle.onChange((isOn: boolean) => {
            this.autoUpgrade = isOn;
            this.autoDownload = true;
            UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
            //确定取消自动升级
            if (!isOn) {
                DialogHelper.showDialog('智慧升级', '关闭智慧升级后，新版本升级需要您手动确认才能完成，确定要关闭吗？', '关闭', {
                    onCancel: () => {
                        this.autoUpgrade = true;
                        this.autoDownload = true;
                        UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
                    },
                    onConfirm: () => {
                        console.info('autoUpgrade onConfirm:');
                    }
                });
            }
        });
        Toggle.pop();
        Row.pop();
        If.create();
        if (!this.autoUpgrade) {
            If.branchId(0);
            Row.create();
            Row.width('100%');
            Row.backgroundColor(0xFFFFFF);
            Row.borderRadius(15);
            Row.padding({ left: 12 });
            Column.create();
            Column.width('80%');
            Column.alignItems(HorizontalAlign.Start);
            Text.create('自动下载');
            Text.fontSize(23);
            Text.padding(5);
            Text.pop();
            Text.create('仅在WLAN环境下自动下载升级包');
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Lighter);
            Text.padding(5);
            Text.pop();
            Column.pop();
            Toggle.create({ type: ToggleType.Switch, isOn: this.autoDownload });
            Toggle.height(30);
            Toggle.width(80);
            Toggle.onChange((isOn: boolean) => {
                this.autoUpgrade = false;
                this.autoDownload = isOn;
                UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
                console.info('autoDownload status:' + isOn);
                if (!isOn) {
                    DialogHelper.showDialog('自动下载', '关闭自动下载升级包后，新版本的升级包需要您手动下载，确定要关闭吗？', '关闭', {
                        onCancel: () => {
                            this.autoUpgrade = false;
                            this.autoDownload = true;
                            UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
                        },
                        onConfirm: () => {
                            console.info('autoDownload cancel confirm:');
                        }
                    });
                }
            });
            Toggle.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.width('100%');
        Row.backgroundColor(0xFFFFFF);
        Row.borderRadius(15);
        Row.padding({ left: 12 });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.onClick(() => {
            router.pushUrl({ url: 'pages/LocalUpdater' });
        });
        Text.create('本地升级');
        Text.fontSize(23);
        Text.padding(5);
        Text.pop();
        Text.create('进入本地升级界面');
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Lighter);
        Text.padding(5);
        Text.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.backgroundColor(0xFFFFFF);
        Row.borderRadius(15);
        Row.padding({ left: 12 });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.onClick(() => {
            router.pushUrl({ url: 'pages/changeip' });
        });
        Text.create('修改服务器IP');
        Text.fontSize(23);
        Text.padding(5);
        Text.pop();
        Text.create(this.ip);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Lighter);
        Text.padding(5);
        Text.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.backgroundColor(0xFFFFFF);
        Row.borderRadius(15);
        Row.padding({ left: 12 });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.onClick(() => {
            router.pushUrl({ url: 'pages/AppUpdater' });
        });
        Text.create('APP升级');
        Text.fontSize(23);
        Text.padding(5);
        Text.pop();
        Text.create('进入APP升级界面');
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Lighter);
        Text.padding(5);
        Text.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.backgroundColor(0xFFFFFF);
        Row.borderRadius(15);
        Row.padding({ left: 12 });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.onClick(() => {
            router.pushUrl({ url: 'pages/AppLocalUpdater' });
        });
        Text.create('APP本地升级');
        Text.fontSize(23);
        Text.padding(5);
        Text.pop();
        Text.create('进入APP本地升级界面');
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Lighter);
        Text.padding(5);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Setting("1", undefined, {}));
