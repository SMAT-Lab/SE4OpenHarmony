interface wifiSample_Params {
    wifiModel?: WifiModel;
    linkedInfo?: wifi.WifiLinkedInfo;
    isLinked?: boolean;
    isSwitchOn?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wifi_" + ++__generate__Id;
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
import fs from '@ohos.file.fs';
import { TitleBar } from '../../common/TitleBar';
import { AvailableWifi } from '../../common/AvailableWifi';
import wifi from '@ohos.wifiManager';
import Logger from '../../model/Logger';
import { WifiModel, WifiType } from '../../model/WifiModel';
const TAG = 'wifi';
export class wifiSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.wifiModel = new WifiModel();
        this.linkedInfo = null;
        this.__isLinked = new ObservedPropertySimple(false, this, "isLinked");
        this.__isSwitchOn = new ObservedPropertySimple(false
        // 扫描wifi
        , this, "isSwitchOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: wifiSample_Params) {
        if (params.wifiModel !== undefined) {
            this.wifiModel = params.wifiModel;
        }
        if (params.linkedInfo !== undefined) {
            this.linkedInfo = params.linkedInfo;
        }
        if (params.isLinked !== undefined) {
            this.isLinked = params.isLinked;
        }
        if (params.isSwitchOn !== undefined) {
            this.isSwitchOn = params.isSwitchOn;
        }
    }
    aboutToBeDeleted() {
        this.__isLinked.aboutToBeDeleted();
        this.__isSwitchOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private wifiModel: WifiModel;
    private linkedInfo: wifi.WifiLinkedInfo;
    private __isLinked: ObservedPropertySimple<boolean>;
    get isLinked() {
        return this.__isLinked.get();
    }
    set isLinked(newValue: boolean) {
        this.__isLinked.set(newValue);
    }
    private __isSwitchOn: ObservedPropertySimple<boolean>;
    get isSwitchOn() {
        return this.__isSwitchOn.get();
    }
    set isSwitchOn(newValue: boolean) {
        this.__isSwitchOn.set(newValue);
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
            Logger.info(TAG, `wifiConnectionChange: ${state}`);
            await this.getLinkedInfo();
        });
        // wifi状态改变时，先清空wifi列表，然后判断是否是开启状态，如果是就扫描
        wifi.on('wifiStateChange', state => {
            Logger.info(TAG, `wifiStateLisener state: ${state}`);
            AppStorage.SetOrCreate('wifiList', []);
            if (state === 1) { // 1: wifi is enable, 0:wifi is disable
                this.scan();
            }
        });
    }
    aboutToAppear() {
        // 如果wifi是开的，就记录下状态，然后扫描wifi，并获取连接信息
        if (wifi.isWifiActive()) {
            Logger.info(TAG, 'wifi is active');
            this.isSwitchOn = true;
            wifi.scan();
            this.scan();
            this.getLinkedInfo();
        }
        // 启动监听
        this.addListener();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.constraintSize({ minHeight: '100%' });
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: 'wifi测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'wifi测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create();
        Scroll.width('100%');
        Scroll.padding({ left: 16, right: 16 });
        Column.create();
        Toggle.create({ type: ToggleType.Switch, isOn: this.isSwitchOn });
        Toggle.id('switch');
        Toggle.onChange((isOn: boolean) => {
            Logger.info(`LSQ: wifi swtich is: ${isOn}`);
            AppStorage.SetOrCreate('wifiList', []);
            try {
                // 如果是打开状态，记录状态，打开网络，开始扫描
                if (isOn) {
                    this.isSwitchOn = true;
                    wifi.enableWifi();
                    return;
                }
                else {
                    // 记录状态，断开网络禁用网络
                    this.isSwitchOn = false;
                    this.isLinked = false;
                    wifi.disconnect();
                    wifi.disableWifi();
                }
            }
            catch (error) {
                Logger.error(TAG, `failed,code:${JSON.stringify(error.code)},message:${JSON.stringify(error.message)}`);
            }
        });
        Toggle.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.isLinked && this.isSwitchOn) {
            If.branchId(0);
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16 });
            Text.create($r('app.string.connected'));
            Text.fontSize(22);
            Text.width('100%');
            Text.pop();
            Row.create();
            Row.width('100%');
            Row.padding(10);
            Row.margin({ left: 16, right: 16 });
            Row.border({ radius: 15, color: Color.Gray, width: 1 });
            Row.backgroundColor(Color.White);
            Text.create(this.linkedInfo.ssid);
            Text.fontSize(20);
            Text.fontColor(Color.Black);
            Text.layoutWeight(1);
            Text.pop();
            Text.create($r('app.string.connected'));
            Text.fontSize(18);
            Text.fontColor(Color.Black);
            Text.pop();
            Row.pop();
            Column.pop();
        }
        If.pop();
        If.create();
        if (this.isSwitchOn) {
            If.branchId(0);
            let earlierCreatedChild_3: AvailableWifi = (this && this.findChildById) ? this.findChildById("3") as AvailableWifi : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new AvailableWifi("3", this, { linkedInfo: this.linkedInfo }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    linkedInfo: this.linkedInfo
                });
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new wifiSample("1", undefined, {}));
