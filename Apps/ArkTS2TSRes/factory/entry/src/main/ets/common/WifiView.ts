interface WifiView_Params {
    wifi?: wifi.WifiScanInfo;
    securityString?: Resource;
    isLock?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WifiView_" + ++__generate__Id;
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
import Logger from '../model/Logger';
import wifi from '@ohos.wifiManager';
const TAG: string = 'WifiView';
export class WifiView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.wifi = null;
        this.securityString = $r('app.string.encryption');
        this.__isLock = new ObservedPropertySimple(true, this, "isLock");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WifiView_Params) {
        if (params.wifi !== undefined) {
            this.wifi = params.wifi;
        }
        if (params.securityString !== undefined) {
            this.securityString = params.securityString;
        }
        if (params.isLock !== undefined) {
            this.isLock = params.isLock;
        }
    }
    aboutToBeDeleted() {
        this.__isLock.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private wifi: wifi.WifiScanInfo;
    private securityString: Resource;
    private __isLock: ObservedPropertySimple<boolean>;
    get isLock() {
        return this.__isLock.get();
    }
    set isLock(newValue: boolean) {
        this.__isLock.set(newValue);
    }
    aboutToAppear() {
        Logger.debug(TAG, `aboutToAppear ${JSON.stringify(this.wifi)}`);
        if (this.wifi) {
            if (this.wifi.securityType) {
                if (this.wifi.securityType === 0 || this.wifi.securityType === 1) {
                    this.securityString = $r('app.string.open');
                    this.isLock = false;
                }
            }
        }
    }
    render() {
        Row.create();
        Row.backgroundColor(Color.White);
        Row.width('100%');
        Row.padding(10);
        Column.create();
        Column.layoutWeight(1);
        If.create();
        if (this.wifi) {
            If.branchId(0);
            If.create();
            if (this.wifi.ssid) {
                If.branchId(0);
                Text.create(this.wifi.ssid);
                Text.fontSize(20);
                Text.width('50%');
                Text.pop();
                Text.create(this.wifi.frequency.toString());
                Text.fontSize(20);
                Text.width('50%');
                Text.pop();
            }
            If.pop();
        }
        If.pop();
        Text.create(this.securityString);
        Text.fontSize(18);
        Text.fontColor(Color.Gray);
        Text.width('100%');
        Text.pop();
        Column.pop();
        Stack.create({ alignContent: Alignment.BottomEnd });
        Stack.width(40);
        Stack.height(40);
        Stack.margin({ right: 10 });
        Image.create($r('app.media.wifi'));
        Image.height(30);
        Image.width(30);
        Image.objectFit(ImageFit.Contain);
        If.create();
        if (this.isLock) {
            If.branchId(0);
            Image.create($r('app.media.lock'));
            Image.objectFit(ImageFit.Contain);
            Image.width(15);
            Image.height(15);
        }
        If.pop();
        Stack.pop();
        Row.pop();
    }
}
