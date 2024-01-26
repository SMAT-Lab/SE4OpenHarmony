interface CameraPreview_Params {
    globalDisplay?;
    controller?;
    viewHeight?: number;
    curCaptureMode?: CaptureMode;
    animationOrdinate?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CameraPreview_" + ++__generate__Id;
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
import { CameraCodeScanConst } from './constants/CameraCodeScanConst';
import { CameraConstants, CameraPosition, CaptureMode } from './constants/CameraConstants';
import CameraLifecycle from './model/CameraLifecycle';
import CameraService from './model/CameraService';
import camera from '@ohos.multimedia.camera';
import { GlobalContext } from './utils/GlobalContext';
import display from '@ohos.display';
export default class CameraPreview extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.globalDisplay = GlobalContext.getContext().getObject("display") as display.Display;
        this.controller = new XComponentController();
        this.__viewHeight = new ObservedPropertySimple(this.globalDisplay.height, this, "viewHeight");
        this.__curCaptureMode = this.initializeConsume(CameraConstants.CAPTURE_MODE_KEY, "curCaptureMode");
        this.__animationOrdinate = new ObservedPropertySimple(CameraCodeScanConst.SCAN_TO_TOP_HEIGHT, this, "animationOrdinate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CameraPreview_Params) {
        if (params.globalDisplay !== undefined) {
            this.globalDisplay = params.globalDisplay;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.viewHeight !== undefined) {
            this.viewHeight = params.viewHeight;
        }
        if (params.animationOrdinate !== undefined) {
            this.animationOrdinate = params.animationOrdinate;
        }
    }
    aboutToBeDeleted() {
        this.__viewHeight.aboutToBeDeleted();
        this.__curCaptureMode.aboutToBeDeleted();
        this.__animationOrdinate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private globalDisplay;
    private controller;
    private __viewHeight: ObservedPropertySimple<number>;
    get viewHeight() {
        return this.__viewHeight.get();
    }
    set viewHeight(newValue: number) {
        this.__viewHeight.set(newValue);
    }
    private __curCaptureMode: SynchedPropertySimpleTwoWay<CaptureMode>;
    get curCaptureMode() {
        return this.__curCaptureMode.get();
    }
    set curCaptureMode(newValue: CaptureMode) {
        this.__curCaptureMode.set(newValue);
    }
    private __animationOrdinate: ObservedPropertySimple<number>;
    get animationOrdinate() {
        return this.__animationOrdinate.get();
    }
    set animationOrdinate(newValue: number) {
        this.__animationOrdinate.set(newValue);
    }
    aboutToAppear() {
        let that = this;
        let listenerData: CameraLifecycle = {
            onCameraConfigure(mode: CaptureMode, position: CameraPosition, resolution: camera.Size, resolutions: camera.Profile[]) {
                that.viewHeight = px2vp(resolution.width * that.globalDisplay.width / resolution.height);
                that.controller.setXComponentSurfaceSize({
                    surfaceWidth: resolution.width,
                    surfaceHeight: resolution.height
                });
            }
        };
        CameraService.getInstance().addLifecycleListener(listenerData);
        this.setQRCodeScanAnimation();
    }
    // 扫描框中的线
    setQRCodeScanAnimation() {
        setInterval(() => {
            Context.animateTo({
                duration: 1000,
                tempo: 0.5,
                curve: Curve.EaseInOut,
                delay: 200,
                iterations: -1,
                playMode: PlayMode.Normal,
            }, () => {
                this.animationOrdinate = 390; // 扫描动画结束Y坐标
            });
        }, 2000);
    }
    ScanBorder(parent = null) {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.margin({ right: 20, top: 20, left: 20 });
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Start);
        Column.create();
        Column.width(280);
        Column.height(280);
        Image.create($r('app.media.scan_border'));
        Image.width('100%');
        Image.height('100%');
        Image.margin({ top: CameraCodeScanConst.SCAN_TO_TOP_HEIGHT });
        Image.onAreaChange((oldValue: Area, newValue: Area) => {
            this.animationOrdinate = (newValue.position.y as number) + 10;
        });
        Divider.create();
        Divider.strokeWidth(1);
        Divider.height(4);
        Divider.width('100%');
        Divider.color(Color.White);
        Divider.width('100%');
        Divider.position({ x: 0, y: 0 });
        Divider.translate({ x: 0, y: this.animationOrdinate });
        Column.pop();
        Text.create($r('app.string.putTheQRCodeToScan'));
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.margin({ top: 24 });
        Text.pop();
        Column.pop();
    }
    render() {
        Stack.create();
        Stack.width('100%');
        Stack.height(this.viewHeight);
        XComponent.create({
            id: CameraConstants.CAMERA_PREVIEW_ID,
            type: CameraConstants.CAMERA_PREVIEW_TYPE,
            controller: this.controller
        });
        XComponent.onLoad(() => {
            let renderId = this.controller.getXComponentSurfaceId();
            // 打开相机
            CameraService.getInstance().init(getContext(), renderId, this.curCaptureMode, CameraPosition.BACK);
        });
        // 扫描框
        this.ScanBorder(this);
        Stack.pop();
    }
}
