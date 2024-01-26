interface TitleBar_Params {
    title?: string;
    isLand?: boolean;
    selectedIndex?: number;
    deviceLists?: Array<deviceManager.DeviceInfo>;
    screenshotUrl?: PixelMap;
    startAbilityCallBack?: (key) => void;
    remoteDeviceModel?: RemoteDeviceModel;
    dialogController?: CustomDialogController;
    mediaUtil?: MediaUtils;
    screenshotDialogController?: CustomDialogController;
    selectedIndexChange?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBar_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import router from '@ohos.router';
import screenshot from '@ohos.screenshot';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import promptAction from '@ohos.promptAction';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import Logger from '../model/Logger';
import MediaUtils from '../utils/MediaUtils';
import { DeviceDialog } from '../common/DeviceDialog';
import { RemoteDeviceModel } from '../model/RemoteDeviceModel';
import { ScreenshotDialog } from '../common/ScreenshotDialog';
const TAG = 'TitleBar';
const DATA_CHANGE = 'dataChange';
const EXIT = 'exit';
const ONE_THOUSAND: number = 1000;
export class TitleBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new SynchedPropertySimpleOneWay(params.title, this, "title");
        this.__isLand = new SynchedPropertySimpleOneWay(params.isLand, this, "isLand");
        this.__selectedIndex = new ObservedPropertySimple(0, this, "selectedIndex");
        this.__deviceLists = AppStorage.SetAndLink('deviceLists', [], this, "deviceLists");
        this.__screenshotUrl = new ObservedPropertyObject(undefined, this, "screenshotUrl");
        this.startAbilityCallBack = undefined;
        this.remoteDeviceModel = null;
        this.dialogController = null;
        this.mediaUtil = new MediaUtils();
        this.screenshotDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ScreenshotDialog("2", this, { screenshotUrl: this.__screenshotUrl });
                jsDialog.setController(this.screenshotDialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            customStyle: true,
            offset: { dx: -100, dy: 100 }
        }, this);
        this.selectedIndexChange = (index: number) => {
            Logger.info(TAG, 'selectedIndexChange');
            this.selectedIndex = index;
            if (this.selectedIndex === 0) {
                Logger.info(TAG, 'stop ability');
                this.startAbilityCallBack(EXIT);
                globalThis.isDistributed = false;
                if (this.dialogController !== null) {
                    this.dialogController.close();
                }
                this.deviceLists = [];
                return;
            }
            this.selectDevice();
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBar_Params) {
        this.title = params.title;
        this.isLand = params.isLand;
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.screenshotUrl !== undefined) {
            this.screenshotUrl = params.screenshotUrl;
        }
        if (params.startAbilityCallBack !== undefined) {
            this.startAbilityCallBack = params.startAbilityCallBack;
        }
        if (params.remoteDeviceModel !== undefined) {
            this.remoteDeviceModel = params.remoteDeviceModel;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.mediaUtil !== undefined) {
            this.mediaUtil = params.mediaUtil;
        }
        if (params.screenshotDialogController !== undefined) {
            this.screenshotDialogController = params.screenshotDialogController;
        }
        if (params.selectedIndexChange !== undefined) {
            this.selectedIndexChange = params.selectedIndexChange;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__isLand.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__deviceLists.aboutToBeDeleted();
        this.__screenshotUrl.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: SynchedPropertySimpleOneWay<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __isLand: SynchedPropertySimpleOneWay<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimple<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __deviceLists: ObservedPropertyAbstract<Array<deviceManager.DeviceInfo>>;
    get deviceLists() {
        return this.__deviceLists.get();
    }
    set deviceLists(newValue: Array<deviceManager.DeviceInfo>) {
        this.__deviceLists.set(newValue);
    }
    private __screenshotUrl: ObservedPropertyObject<PixelMap>;
    get screenshotUrl() {
        return this.__screenshotUrl.get();
    }
    set screenshotUrl(newValue: PixelMap) {
        this.__screenshotUrl.set(newValue);
    }
    private startAbilityCallBack: (key) => void;
    private remoteDeviceModel: RemoteDeviceModel;
    private dialogController: CustomDialogController;
    private mediaUtil: MediaUtils;
    private screenshotDialogController: CustomDialogController;
    aboutToAppear() {
        AppStorage.SetOrCreate('deviceLists', this.deviceLists);
    }
    clearSelectState() {
        this.deviceLists = [];
        if (this.dialogController) {
            this.dialogController.close();
            this.dialogController = null;
        }
    }
    selectDevice() {
        Logger.info(TAG, `start ability device:${JSON.stringify(this.deviceLists[this.selectedIndex])}`);
        if (this.remoteDeviceModel === null || this.remoteDeviceModel.discoverLists.length <= 0 || this.remoteDeviceModel.deviceLists.includes(this.deviceLists[this.selectedIndex])) {
            this.startAbility(this.deviceLists[this.selectedIndex].deviceId);
            this.clearSelectState();
            return;
        }
        Logger.info(TAG, 'start ability, needAuth');
        this.remoteDeviceModel.authenticateDevice(this.deviceLists[this.selectedIndex], (device: deviceManager.DeviceInfo) => {
            Logger.info(TAG, 'auth and online finished' + JSON.stringify(device));
            this.startAbility(device.deviceId);
        });
        Logger.info(TAG, 'start ability2 ......');
        this.clearSelectState();
    }
    private selectedIndexChange;
    /**
     * 启动远程设备
     * @param deviceId
     */
    async startAbility(deviceId) {
        Logger.info(TAG, `startAbility deviceId: ${deviceId}`);
        await globalThis.context.startAbility({
            bundleName: 'com.unionman.distributedvideoplayer',
            abilityName: 'EntryAbility',
            deviceId: deviceId,
            parameters: {
                isStage: 'Stage',
                deviceID: "remote"
            }
        }).then((data) => {
            Logger.info(TAG, `start ability finished: ${JSON.stringify(data)}`);
            promptAction.showToast({ message: "流转成功" });
            globalThis.isDistributed = true;
            // 等待对端KvStore启动再同步数据
            setTimeout(() => {
                this.startAbilityCallBack(DATA_CHANGE);
            }, 2000);
        }).catch((err) => {
            Logger.error(TAG, `start ability err: ${JSON.stringify(err)}`);
        });
    }
    showDialog() {
        // 注册监听回调，发现设备或查找到已认证设备会弹窗显示
        this.remoteDeviceModel.registerDeviceListCallback(() => {
            Logger.info(TAG, 'registerDeviceListCallback, callback entered');
            this.deviceLists = [];
            this.deviceLists.push({
                deviceId: '0',
                deviceName: '本机(结束协同)',
                deviceType: deviceManager.DeviceType.UNKNOWN_TYPE,
                networkId: '',
                range: ONE_THOUSAND
            });
            let deviceTempList = this.remoteDeviceModel.deviceLists.concat(this.remoteDeviceModel.discoverLists);
            Logger.info(TAG, `this.remoteDeviceModel.deviceTempList.length${deviceTempList.length}`);
            for (let i = 0; i < deviceTempList.length; i++) {
                Logger.info(TAG, `device ${i}/${deviceTempList.length} deviceId= ${deviceTempList[i].deviceId}, deviceName= ${deviceTempList[i].deviceName}, deviceType= ${deviceTempList[i].deviceType}`);
                this.deviceLists.push(deviceTempList[i]);
                AppStorage.Set('deviceLists', this.deviceLists);
                Logger.info(TAG, 'deviceLists push end');
            }
            Logger.info(TAG, 'CustomDialogController start');
            if (this.dialogController !== null) {
                this.dialogController.close();
                this.dialogController = null;
            }
            this.dialogController = new CustomDialogController({
                builder: () => {
                    let jsDialog = new DeviceDialog("3", this, {
                        cancel: () => {
                            this.clearSelectState();
                        },
                        selectedIndex: this.selectedIndex,
                        selectedIndexChange: this.selectedIndexChange
                    });
                    jsDialog.setController(this.dialogController);
                    View.create(jsDialog);
                },
                cancel: () => {
                    this.clearSelectState();
                },
                autoCancel: true,
                customStyle: true,
                alignment: this.isLand ? DialogAlignment.Center : DialogAlignment.Bottom
            }, this);
            this.dialogController.open();
            Logger.info(TAG, 'CustomDialogController end');
        });
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height(this.isLand ? '10%' : '8%');
        Row.constraintSize({ minHeight: 50 });
        Row.alignItems(VerticalAlign.Center);
        Row.padding({ left: 10, right: 10 });
        Row.linearGradient({
            direction: GradientDirection.Bottom,
            colors: [['#CC000000', 0.0], ['#33000000', 0.66], ['#00000000', 0.99]]
        });
        Image.create($r("app.media.ic_back"));
        Image.id("back");
        Image.height('60%');
        Image.margin({ right: 4 });
        Image.width(this.isLand ? '6%' : '8%');
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            globalThis.context.terminateSelf();
        });
        Text.create(this.title);
        Text.fontColor(Color.White);
        Text.fontSize(22);
        Text.maxLines(1);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r("app.media.ic_controlcenter_screenshot_filled"));
        Image.id("screenshot");
        Image.height('60%');
        Image.margin({ right: 8 });
        Image.width(this.isLand ? '6%' : '8%');
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            var screenshotOptions = {};
            screenshot.save(screenshotOptions).then((pixelMap: PixelMap) => {
                this.screenshotUrl = pixelMap;
                this.mediaUtil.savePicture(pixelMap);
                this.screenshotDialogController.open();
            }).catch((err) => {
                Logger.error('Failed to save screenshot: ' + JSON.stringify(err));
            });
        });
        Image.create($r("app.media.ic_hop"));
        Image.id("hop");
        Image.height('60%');
        Image.width(this.isLand ? '6%' : '8%');
        Image.margin({ right: 8 });
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            this.showDialog();
        });
        Image.create($r("app.media.ic_settings"));
        Image.id("settings");
        Image.height('60%');
        Image.width(this.isLand ? '6%' : '8%');
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            router.pushUrl({
                url: 'pages/Settings'
            });
        });
        Row.pop();
    }
}
