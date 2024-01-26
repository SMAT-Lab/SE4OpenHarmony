interface CameraView_Params {
    mainModel?: MainModel | null;
    isQRCodeScanStopped?: boolean;
    curCaptureMode?: CaptureMode;
    isRatioChanging?: boolean;
    curRatio?: number;
    isRatioEnable?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CameraView_" + ++__generate__Id;
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
import { CameraConstants, CameraPosition, CaptureMode } from './constants/CameraConstants';
import CameraService from './model/CameraService';
import router from '@ohos.router';
import CameraPreview from './CameraPreview';
import CameraLifecycle from './model/CameraLifecycle';
import camera from '@ohos.multimedia.camera';
import MainModel from './viewmodel/CustomCameraModel';
import DimensionUtil from './utils/DimensionUtil';
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
import prompt from '@ohos.promptAction';
import { CameraCodeScanConst } from './constants/CameraCodeScanConst';
export default class CameraView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mainModel = null;
        this.__isQRCodeScanStopped = new ObservedPropertySimple(false, this, "isQRCodeScanStopped");
        this.__curCaptureMode = new ObservedPropertySimple(CaptureMode.PREVIEW_FRAME, this, "curCaptureMode");
        this.addProvidedVar(CameraConstants.CAPTURE_MODE_KEY, this.__curCaptureMode, false);
        this.addProvidedVar("curCaptureMode", this.__curCaptureMode, false);
        this.__isRatioChanging = new ObservedPropertySimple(false, this, "isRatioChanging");
        this.addProvidedVar(CameraConstants.RATION_CHANGE_KEY, this.__isRatioChanging, false);
        this.addProvidedVar("isRatioChanging", this.__isRatioChanging, false);
        this.__curRatio = new ObservedPropertySimple(CameraConstants.RATIO_DEFAULT_VALUE, this, "curRatio");
        this.addProvidedVar(CameraConstants.RATION_KEY, this.__curRatio, false);
        this.addProvidedVar("curRatio", this.__curRatio, false);
        this.__isRatioEnable = new ObservedPropertySimple(false, this, "isRatioEnable");
        this.addProvidedVar(CameraConstants.RATION_ENABLE, this.__isRatioEnable, false);
        this.addProvidedVar("isRatioEnable", this.__isRatioEnable, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CameraView_Params) {
        if (params.mainModel !== undefined) {
            this.mainModel = params.mainModel;
        }
        if (params.isQRCodeScanStopped !== undefined) {
            this.isQRCodeScanStopped = params.isQRCodeScanStopped;
        }
        if (params.curCaptureMode !== undefined) {
            this.curCaptureMode = params.curCaptureMode;
        }
        if (params.isRatioChanging !== undefined) {
            this.isRatioChanging = params.isRatioChanging;
        }
        if (params.curRatio !== undefined) {
            this.curRatio = params.curRatio;
        }
        if (params.isRatioEnable !== undefined) {
            this.isRatioEnable = params.isRatioEnable;
        }
    }
    aboutToBeDeleted() {
        this.__isQRCodeScanStopped.aboutToBeDeleted();
        this.__curCaptureMode.aboutToBeDeleted();
        this.__isRatioChanging.aboutToBeDeleted();
        this.__curRatio.aboutToBeDeleted();
        this.__isRatioEnable.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mainModel: MainModel | null;
    private __isQRCodeScanStopped: ObservedPropertySimple<boolean>;
    get isQRCodeScanStopped() {
        return this.__isQRCodeScanStopped.get();
    }
    set isQRCodeScanStopped(newValue: boolean) {
        this.__isQRCodeScanStopped.set(newValue);
    }
    private __curCaptureMode: ObservedPropertySimple<CaptureMode>;
    get curCaptureMode() {
        return this.__curCaptureMode.get();
    }
    set curCaptureMode(newValue: CaptureMode) {
        this.__curCaptureMode.set(newValue);
    }
    private __isRatioChanging: ObservedPropertySimple<boolean>;
    get isRatioChanging() {
        return this.__isRatioChanging.get();
    }
    set isRatioChanging(newValue: boolean) {
        this.__isRatioChanging.set(newValue);
    }
    private __curRatio: ObservedPropertySimple<number>;
    get curRatio() {
        return this.__curRatio.get();
    }
    set curRatio(newValue: number) {
        this.__curRatio.set(newValue);
    }
    private __isRatioEnable: ObservedPropertySimple<boolean>;
    get isRatioEnable() {
        return this.__isRatioEnable.get();
    }
    set isRatioEnable(newValue: boolean) {
        this.__isRatioEnable.set(newValue);
    }
    aboutToAppear() {
        // DimensionUtil初始化，得到GlobalContext设置的值
        DimensionUtil.getInstance().init();
        let that = this;
        that.mainModel = MainModel.getInstant();
        let listenerData: CameraLifecycle = {
            onCameraConfigure(mode: CaptureMode, position: CameraPosition, resolution: camera.Size, resolutions: camera.Profile[]) {
                that.isRatioEnable = (position === CameraPosition.BACK);
                that.curCaptureMode = mode;
                (that.mainModel as MainModel).hideRationMenu(0, () => {
                    that.isRatioChanging = false;
                });
            },
            onRatioChanged(outputRation: number, outputRationRage: number[]) {
                that.curRatio = outputRation;
            },
        };
        CameraService.getInstance().addLifecycleListener(listenerData);
    }
    aboutToDisappear() {
        console.log('cwq aboutToDisappear is called');
        CameraService.getInstance().destroy();
    }
    TopButton(parent = null) {
        Row.create();
        Row.width("100%");
        Row.margin({ top: 24 });
        Row.padding({ left: 24, right: 24 });
        Row.alignItems(VerticalAlign.Top);
        Row.justifyContent(FlexAlign.SpaceBetween);
        // 返回按钮
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        // 返回按钮
        Button.backgroundColor('#00000000');
        // 返回按钮
        Button.width(DimensionUtil.getVp($r('app.float.camera_close_size')));
        // 返回按钮
        Button.height(DimensionUtil.getVp($r('app.float.camera_close_size')));
        // 返回按钮
        Button.onClick(() => {
            router.back();
        });
        Image.create($r('app.media.scan_back'));
        Image.width(DimensionUtil.getVp($r('app.float.camera_close_size')) / 2);
        Image.height(DimensionUtil.getVp($r('app.float.camera_close_size')) / 2);
        Image.objectFit(ImageFit.Fill);
        // 返回按钮
        Button.pop();
        // 相册图片
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        // 相册图片
        Button.backgroundColor('#00000000');
        // 相册图片
        Button.width(DimensionUtil.getVp($r('app.float.camera_close_size')));
        // 相册图片
        Button.height(DimensionUtil.getVp($r('app.float.camera_close_size')));
        // 相册图片
        Button.onClick(async () => {
            this.isQRCodeScanStopped = true;
            let context = AppStorage.get('context') as common.UIAbilityContext;
            // 打开手机相册
            await context.startAbilityForResult({
                parameters: { uri: 'singleselect' },
                bundleName: 'com.huawei.hmos.photos',
                abilityName: 'com.huawei.hmos.photos.MainAbility',
            }).then(data => {
                // 获取want数据
                if (data.want != undefined) {
                    let want: Want = data['want'];
                    if (want) {
                        // param代表want参数中的paramters
                        let param = want['parameters'] as Record<string, string[] | Object>;
                        if (param) {
                            // 被选中的图片路径数组
                            let selectedUri = param['select-item-list'] as Array<string>;
                            setTimeout(async () => {
                                let showResult = await CameraService.getInstance().parseImageQRCode(selectedUri[0]);
                                if (showResult.isSucess) {
                                    let decodeText = showResult.decodeResult;
                                    AppStorage.setOrCreate(CameraCodeScanConst.QR_CODE_PARSE_RESULT, decodeText);
                                }
                                else {
                                    prompt.showToast({
                                        message: $r('app.string.scanCodeNotRecognized')
                                    });
                                }
                            }, 50);
                        }
                    }
                }
            });
        });
        Image.create($r('app.media.scan_photo'));
        Image.width(DimensionUtil.getVp($r('app.float.camera_close_size')) / 2);
        Image.height(DimensionUtil.getVp($r('app.float.camera_close_size')) / 2);
        Image.objectFit(ImageFit.Fill);
        // 相册图片
        Button.pop();
        Row.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.backgroundColor(Color.Black);
        Stack.height("100%");
        let earlierCreatedChild_2: CameraPreview = (this && this.findChildById) ? this.findChildById("2") as CameraPreview : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CameraPreview("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        this.TopButton(this);
        Stack.pop();
    }
}
