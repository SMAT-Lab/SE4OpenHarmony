interface wifiButton_Params {
    interface?: number;
    backColor?: Color;
    btnName?: string;
    isSwitchOn?: boolean;
    wifiList?: Array<wifi.WifiScanInfo>;
    wifiDataResource?: WifiDataSource;
    isLinked?: boolean;
    intervalID?;
    wifiModel?;
    linkedInfo?: wifi.WifiLinkedInfo;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wifiButton_" + ++__generate__Id;
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
import { commonButton } from './commonButton';
import wifi from '@ohos.wifiManager';
import prompt from '@ohos.prompt';
import { WifiModel, WifiType } from '../../model/WifiModel';
import Logger from '../../model/Logger';
import WifiDataSource from '../../model/BasicDataSource';
const TAG = 'AvailableWiFi';
let self = null;
export class wifiButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__interface = new ObservedPropertySimple(1, this, "interface");
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("WIFI 2.4G", this, "btnName");
        this.__isSwitchOn = new ObservedPropertySimple(false, this, "isSwitchOn");
        this.__wifiList = AppStorage.SetAndLink('wifiList', [], this, "wifiList");
        this.__wifiDataResource = new ObservedPropertyObject(new WifiDataSource(this.wifiList), this, "wifiDataResource");
        this.__isLinked = new ObservedPropertySimple(false, this, "isLinked");
        this.intervalID = undefined;
        this.wifiModel = new WifiModel();
        this.linkedInfo = null;
        this.updateWithValueParams(params);
        this.declareWatch("wifiList", this.wifiListRefresh);
    }
    updateWithValueParams(params: wifiButton_Params) {
        if (params.interface !== undefined) {
            this.interface = params.interface;
        }
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.btnName !== undefined) {
            this.btnName = params.btnName;
        }
        if (params.isSwitchOn !== undefined) {
            this.isSwitchOn = params.isSwitchOn;
        }
        if (params.wifiDataResource !== undefined) {
            this.wifiDataResource = params.wifiDataResource;
        }
        if (params.isLinked !== undefined) {
            this.isLinked = params.isLinked;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.wifiModel !== undefined) {
            this.wifiModel = params.wifiModel;
        }
        if (params.linkedInfo !== undefined) {
            this.linkedInfo = params.linkedInfo;
        }
    }
    aboutToBeDeleted() {
        this.__interface.aboutToBeDeleted();
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        this.__isSwitchOn.aboutToBeDeleted();
        this.__wifiList.aboutToBeDeleted();
        this.__wifiDataResource.aboutToBeDeleted();
        this.__isLinked.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // interface:1，表示是WIFI 2.4G interface:2，表示是WIFI 5G
    private __interface: ObservedPropertySimple<number>;
    get interface() {
        return this.__interface.get();
    }
    set interface(newValue: number) {
        this.__interface.set(newValue);
    }
    private __backColor: ObservedPropertySimple<Color>;
    get backColor() {
        return this.__backColor.get();
    }
    set backColor(newValue: Color) {
        this.__backColor.set(newValue);
    }
    private __btnName: ObservedPropertySimple<string>;
    get btnName() {
        return this.__btnName.get();
    }
    set btnName(newValue: string) {
        this.__btnName.set(newValue);
    }
    private __isSwitchOn: ObservedPropertySimple<boolean>;
    get isSwitchOn() {
        return this.__isSwitchOn.get();
    }
    set isSwitchOn(newValue: boolean) {
        this.__isSwitchOn.set(newValue);
    }
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
    private __isLinked: ObservedPropertySimple<boolean>;
    get isLinked() {
        return this.__isLinked.get();
    }
    set isLinked(newValue: boolean) {
        this.__isLinked.set(newValue);
    }
    private intervalID;
    private wifiModel;
    private linkedInfo: wifi.WifiLinkedInfo;
    aboutToDisappear() {
        clearInterval(this.intervalID);
    }
    aboutToAppear() {
        if (this.interface == 2) {
            this.btnName = "WIFI 5G";
        }
        self = this;
        if (wifi.isWifiActive()) {
            Logger.log(TAG, 'wifi is active');
            this.isSwitchOn = true;
            wifi.scan();
            this.scan();
            this.getLinkedInfo();
        }
        // 启动监听
        this.addListener();
        if (!wifi.isWifiActive()) {
            wifi.enableWifi();
        }
    }
    onAccept(scanInfo, psw) {
        Logger.info(TAG, 'connect wifi');
        self.wifiModel.connectNetwork(scanInfo, psw);
    }
    wifiListRefresh() {
        this.wifiDataResource['dataArray'] = this.wifiList;
        this.wifiDataResource.notifyDataReload();
    }
    // 扫描wifi
    async scan() {
        // 获取有关Wi-Fi连接的信息,存入linkedInfo
        await this.getLinkedInfo();
        // 不停地扫描wifi
        let result: Array<WifiType> = await this.wifiModel.getScanInfos();
        if (this.isSwitchOn) {
            AppStorage.SetOrCreate('wifiList', result);
            setTimeout(async () => {
                await this.scan();
            }, 3000);
        }
    }
    // 获取有关Wi-Fi连接的信息,存入linkedInfo
    async getLinkedInfo() {
        try {
            let wifiLinkedInfo = await wifi.getLinkedInfo();
            if (wifiLinkedInfo === null || wifiLinkedInfo.bssid === '') {
                this.isLinked = false;
                this.linkedInfo = null;
                return;
            }
            this.isLinked = true;
            this.linkedInfo = wifiLinkedInfo;
        }
        catch (err) {
            Logger.info(`getLinkedInfo failed err is ${JSON.stringify(err)}`);
        }
    }
    // 监听wifi的变化
    addListener() {
        // 连接状态改变时，修改连接信息
        wifi.on('wifiConnectionChange', async (state) => {
            Logger.log(TAG, `wifiConnectionChange: ${state}`);
            await this.getLinkedInfo();
        });
        // wifi状态改变时，先清空wifi列表，然后判断是否是开启状态，如果是就扫描
        wifi.on('wifiStateChange', state => {
            Logger.log(TAG, `wifiStateLisener state: ${state}`);
            AppStorage.SetOrCreate('wifiList', []);
            if (state === 1) { // 1: wifi is enable, 0:wifi is disable
                this.scan();
            }
        });
    }
    render() {
        let earlierCreatedChild_2: commonButton = (this && this.findChildById) ? this.findChildById("2") as commonButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new commonButton("2", this, {
                backColor: this.__backColor,
                btnName: this.__btnName,
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
    }
}
