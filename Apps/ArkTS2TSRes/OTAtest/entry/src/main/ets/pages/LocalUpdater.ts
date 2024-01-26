interface LocalUpdater_Params {
    onBack?: () => boolean;
    date?;
    localUpdater?: update.LocalUpdater;
    connectState?: string;
    serviceModel?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LocalUpdater_" + ++__generate__Id;
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
import update from '@ohos.update';
import router from '@ohos.router';
import ServiceModel from '../components/ServiceModel';
import wifiManager from '@ohos.wifiManager';
const upgradeFile = {
    fileType: 1,
    filePath: "/data/ota_package/updater.zip" // 本地升级包路径
};
const certsFile = "/data/ota_package/signing_cert.crt"; //本地证书路径
const upgradeFiles = [upgradeFile];
class LocalUpdater extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.onBack = undefined;
        this.date = new Date();
        this.localUpdater = undefined;
        this.__connectState = new ObservedPropertySimple('未连接', this, "connectState");
        this.serviceModel = new ServiceModel(getContext(this));
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LocalUpdater_Params) {
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
        if (params.date !== undefined) {
            this.date = params.date;
        }
        if (params.localUpdater !== undefined) {
            this.localUpdater = params.localUpdater;
        }
        if (params.connectState !== undefined) {
            this.connectState = params.connectState;
        }
        if (params.serviceModel !== undefined) {
            this.serviceModel = params.serviceModel;
        }
    }
    aboutToBeDeleted() {
        this.__connectState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private onBack?: () => boolean;
    private date;
    private localUpdater: update.LocalUpdater;
    private __connectState: ObservedPropertySimple<string>;
    get connectState() {
        return this.__connectState.get();
    }
    set connectState(newValue: string) {
        this.__connectState.set(newValue);
    }
    private serviceModel;
    render() {
        Column.create();
        Row.create();
        Row.width('90%');
        Row.height(56);
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
        Text.create('本地升级');
        Text.fontSize(25);
        Text.fontColor(Color.Black);
        Text.margin({ left: 16 });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.create();
        Image.create($r('app.media.logo'));
        Image.height('30%');
        Image.width('70%');
        Image.objectFit(ImageFit.Contain);
        Button.createWithLabel("开始升级");
        Button.fontSize(50);
        Button.onClick(() => {
            this.localUpdater = update.getLocalUpdater();
            this.localUpdater.verifyUpgradePackage(upgradeFile, certsFile).then(() => {
                console.log(`verifyUpgradePackage success`);
                if (wifiManager.isConnected()) {
                    wifiManager.disconnect();
                }
                this.localUpdater.applyNewVersion(upgradeFiles).then(() => {
                    console.log(`applyNewVersion success`);
                }).catch(err => {
                    console.log(`applyNewVersion error ${JSON.stringify(err)}`);
                });
            }).catch(err => {
                console.log(`verifyUpgradePackage error ${JSON.stringify(err)}`);
            });
        });
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new LocalUpdater("1", undefined, {}));
