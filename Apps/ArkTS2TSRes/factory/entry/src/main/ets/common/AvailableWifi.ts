interface AvailableWifi_Params {
    wifiModel?;
    linkedInfo?: wifi.WifiLinkedInfo;
    wifiList?: Array<wifi.WifiScanInfo>;
    wifiDataResource?: WifiDataSource;
    scanInfo?: wifi.WifiScanInfo;
    pswDialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AvailableWifi_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import prompt from '@ohos.promptAction';
import Logger from '../model/Logger';
import { PswDialog } from './PswDialog';
import { WifiModel } from '../model/WifiModel';
import { WifiView } from './WifiView';
import WifiDataSource from './BasicDataSource';
import wifi from '@ohos.wifiManager';
const TAG = 'AvailableWiFi';
let self = null;
export class AvailableWifi extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.wifiModel = new WifiModel();
        this.linkedInfo = null;
        this.__wifiList = AppStorage.SetAndLink('wifiList', [], this, "wifiList");
        this.__wifiDataResource = new ObservedPropertyObject(new WifiDataSource(this.wifiList), this, "wifiDataResource");
        this.__scanInfo = new ObservedPropertyObject(undefined, this, "scanInfo");
        this.pswDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new PswDialog("4", this, { scanInfo: this.__scanInfo, action: this.onAccept });
                jsDialog.setController(this.pswDialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("wifiList", this.wifiListRefresh);
    }
    updateWithValueParams(params: AvailableWifi_Params) {
        if (params.wifiModel !== undefined) {
            this.wifiModel = params.wifiModel;
        }
        if (params.linkedInfo !== undefined) {
            this.linkedInfo = params.linkedInfo;
        }
        if (params.wifiDataResource !== undefined) {
            this.wifiDataResource = params.wifiDataResource;
        }
        if (params.scanInfo !== undefined) {
            this.scanInfo = params.scanInfo;
        }
        if (params.pswDialogController !== undefined) {
            this.pswDialogController = params.pswDialogController;
        }
    }
    aboutToBeDeleted() {
        this.__wifiList.aboutToBeDeleted();
        this.__wifiDataResource.aboutToBeDeleted();
        this.__scanInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private wifiModel;
    private linkedInfo: wifi.WifiLinkedInfo;
    private __wifiList: ObservedPropertyAbstract<Array<wifi.WifiScanInfo>>;
    get wifiList() {
        return this.__wifiList.get();
    }
    set wifiList(newValue: Array<wifi.WifiScanInfo>) {
        this.__wifiList.set(newValue);
    }
    private __wifiDataResource: ObservedPropertyObject<WifiDataSource>;
    get wifiDataResource() {
        return this.__wifiDataResource.get();
    }
    set wifiDataResource(newValue: WifiDataSource) {
        this.__wifiDataResource.set(newValue);
    }
    private __scanInfo: ObservedPropertyObject<wifi.WifiScanInfo>;
    get scanInfo() {
        return this.__scanInfo.get();
    }
    set scanInfo(newValue: wifi.WifiScanInfo) {
        this.__scanInfo.set(newValue);
    }
    private pswDialogController: CustomDialogController;
    render() {
        List.create();
        List.width('100%');
        List.height('100%');
        List.padding({ left: 16, right: 16 });
        List.layoutWeight(1);
        List.divider({ strokeWidth: 1, color: Color.Gray, startMargin: 10, endMargin: 10 });
        List.margin({ top: 10 });
        ListItem.create();
        Row.create();
        Row.id('validWlan');
        Row.width('100%');
        Text.create($r('app.string.available_wlan'));
        Text.fontSize(22);
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
        ListItem.pop();
        LazyForEach.create("3", this, ObservedObject.GetRawObject(this.wifiDataResource), (item, index) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            ListItem.id(`Wifi${index}`);
            ListItem.onClick(() => {
                Logger.info(TAG, 'wifi click');
                this.scanInfo = item;
                if (this.linkedInfo !== null && item.ssid === this.linkedInfo.ssid) {
                    prompt.showToast({ message: 'this wifi is connected' });
                    return;
                }
                if (item.securityType === 0 || item.securityType === 1) {
                    this.wifiModel.connectNetwork(item, '');
                    return;
                }
                this.pswDialogController.open();
            });
            let earlierCreatedChild_2: WifiView = (this && this.findChildById) ? this.findChildById("2") as WifiView : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new WifiView("2", this, { wifi: item }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    wifi: item
                });
                View.create(earlierCreatedChild_2);
            }
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, item => JSON.stringify(item));
        LazyForEach.pop();
        List.pop();
    }
    onAccept(scanInfo, psw) {
        Logger.info(TAG, 'connect wifi');
        self.wifiModel.connectNetwork(scanInfo, psw);
    }
    aboutToAppear() {
        self = this;
    }
    wifiListRefresh() {
        this.wifiDataResource['dataArray'] = this.wifiList;
        this.wifiDataResource.notifyDataReload();
    }
}
