interface blueButton_Params {
    backColor?: Color;
    btnName?: string;
    intervalID?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "blueButton_" + ++__generate__Id;
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
import bluetoothManager from '@ohos.bluetoothManager';
import Logger from '../../../utils/Logger';
import data from '@ohos.telephony.data';
const TAG = '[blueButton]';
export class blueButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("蓝牙", this, "btnName");
        this.intervalID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: blueButton_Params) {
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.btnName !== undefined) {
            this.btnName = params.btnName;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
    }
    aboutToBeDeleted() {
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
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
    private intervalID;
    aboutToDisappear() {
        clearInterval(this.intervalID);
    }
    aboutToAppear() {
        // try {
        //   let devices = bluetoothManager.getPairedDevices();
        //   Logger.info(TAG,"devices:"+devices.toString());
        // } catch (err) {
        //   Logger.info(TAG,"errCode:" + err.code + ",errMessage:" + err.message);
        // }
        // this.intervalID = setInterval(()=> {
        //   try {
        //     let state = bluetoothManager.getState();
        //     Logger.info(TAG,"getState :" + state.toString() );
        //
        //     // 蓝牙已打开
        //     if(state == bluetoothManager.BluetoothState.STATE_ON){
        //       try {
        //         Logger.info(TAG,"createGattClientDevice");
        //         let gattClient = bluetoothManager.BLE.createGattClientDevice("9C:EA:97:9E:D2:D5");
        //         Logger.info(TAG,"connect");
        //         gattClient.connect();
        //         Logger.info(TAG,"getRssiValue");
        //         gattClient.getRssiValue().then((data) => {
        //           Logger.error(TAG,'rssi' + JSON.stringify(data));
        //           if( data && Math.abs(data) < 50 ){
        //             this.backColor = Color.Green;
        //             clearInterval(this.intervalID);
        //           }
        //         })
        //       } catch (err) {
        //         Logger.error(TAG,"createGattClientDevice errCode:" + err.code + ",errMessage:" + err.message);
        //       }
        //     }
        //     else if(state == bluetoothManager.BluetoothState.STATE_OFF){
        //       try {
        //         bluetoothManager.enableBluetooth();
        //       } catch (err) {
        //         Logger.error(TAG,"errCode:" + err.code + ",errMessage:" + err.message);
        //       }
        //     }
        //   } catch (err) {
        //     Logger.error(TAG,"errCode:" + err.code + ",errMessage:" + err.message);
        //   }
        //
        // }, 1000);
    }
    render() {
        __Common__.create();
        __Common__.onClick(() => {
            try {
                try {
                    bluetoothManager.setLocalName('umFactory_blue_test');
                    try {
                        let localName = bluetoothManager.getLocalName();
                        Logger.info(TAG, "localName:" + localName);
                    }
                    catch (err) {
                        Logger.error(TAG, "errCode:" + err.code + ",errMessage:" + err.message);
                    }
                }
                catch (err) {
                    Logger.error(TAG, "errCode:" + err.code + ",errMessage:" + err.message);
                }
            }
            catch (err) {
                Logger.error(TAG, "errCode:" + err.code + ",errMessage:" + err.message);
            }
        });
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
        __Common__.pop();
    }
}
