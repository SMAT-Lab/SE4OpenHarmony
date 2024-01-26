interface Index_Params {
    recognitionResult?: string;
    camera?: Camera;
    surfaceId?: string;
    xcomponentController?: XComponentController;
    screenHeight?: number;
    xcomponentHeight?: number;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { BusinessError } from '@ohos.base';
import Logger from '../common/utils/Logger';
import grantPermission from '../common/utils/PermissionUtils';
import { DeviceScreen } from '../common/utils/DeviceScreen';
import Camera from '../common/utils/Camera';
import { CustomDialogExample } from '../view/CustomDialogView';
import CommonConstants from '../common/constants/CommonConstants';
const TAG: string = '[IndexPage]';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__recognitionResult = new ObservedPropertySimple('', this, "recognitionResult");
        this.__camera = new ObservedPropertyObject(new Camera(), this, "camera");
        this.surfaceId = '';
        this.xcomponentController = new XComponentController();
        this.screenHeight = DeviceScreen.getDeviceHeight();
        this.xcomponentHeight = this.screenHeight - CommonConstants.OTHER_HEIGHT;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    text: this.recognitionResult,
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.refresh
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("camera", this.watchedCamera);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.recognitionResult !== undefined) {
            this.recognitionResult = params.recognitionResult;
        }
        if (params.camera !== undefined) {
            this.camera = params.camera;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.xcomponentController !== undefined) {
            this.xcomponentController = params.xcomponentController;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.xcomponentHeight !== undefined) {
            this.xcomponentHeight = params.xcomponentHeight;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__recognitionResult.aboutToBeDeleted();
        this.__camera.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __recognitionResult: ObservedPropertySimple<string>;
    get recognitionResult() {
        return this.__recognitionResult.get();
    }
    set recognitionResult(newValue: string) {
        this.__recognitionResult.set(newValue);
    }
    private __camera: ObservedPropertyObject<Camera>;
    get camera() {
        return this.__camera.get();
    }
    set camera(newValue: Camera) {
        this.__camera.set(newValue);
    }
    private surfaceId: string;
    private xcomponentController: XComponentController;
    private screenHeight: number;
    private xcomponentHeight: number;
    watchedCamera() {
        if (this.camera.result !== this.recognitionResult) {
            this.recognitionResult = this.camera.result;
            if (this.recognitionResult) {
                this.dialogController.open();
            }
        }
    }
    async aboutToAppear() {
        await grantPermission().then(() => {
            this.XComponentinit();
        }).catch((err: BusinessError) => {
            Logger.info(TAG, `grantPermission faild  ${JSON.stringify(err.code)}`);
        });
    }
    async aboutToDisappear() {
        await this.camera.releaseCamera();
        this.dialogController.close();
    }
    onPageShow() {
        this.XComponentinit();
    }
    onPageHide() {
        this.camera.releaseCamera();
        this.dialogController.close();
    }
    async XComponentinit() {
        this.xcomponentController.setXComponentSurfaceSize({
            surfaceWidth: CommonConstants.SURFACE_WIDTH,
            surfaceHeight: CommonConstants.SURFACE_HEIGHT
        });
        this.surfaceId = this.xcomponentController.getXComponentSurfaceId();
        await this.camera.initCamera(this.surfaceId);
    }
    async refresh() {
        this.camera.previewOutput!.start();
    }
    private dialogController: CustomDialogController;
    render() {
        Row.create();
        Row.height(CommonConstants.FULL_Height);
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height(CommonConstants.FULL_Height);
        Column.backgroundColor(Color.Black);
        Row.create();
        Row.width(CommonConstants.FULL_WIDTH);
        Row.margin({ top: $r('app.float.top_height') });
        Row.flexGrow(CommonConstants.TRUE_NUMBER);
        XComponent.create({
            id: CommonConstants.XCOMPONENT_ID,
            type: CommonConstants.XCOMPONENT_TYPE,
            controller: this.xcomponentController
        });
        XComponent.onLoad(() => {
            this.XComponentinit();
        });
        XComponent.width(CommonConstants.FULL_WIDTH);
        XComponent.height(this.xcomponentHeight);
        Row.pop();
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.flexShrink(CommonConstants.FALSE_NUMBER);
        Column.height($r('app.float.camera_lower_height'));
        Column.backgroundColor(Color.Black);
        Column.alignItems(HorizontalAlign.Center);
        Text.create($r('app.string.Recognize_text'));
        Text.fontSize($r('app.float.button_tip_size'));
        Text.fontColor(Color.White);
        Text.margin({ top: $r('app.float.indicate_upper_margin') });
        Text.pop();
        Row.create();
        Row.backgroundColor($r('app.color.round_color'));
        Row.width($r('app.float.decorative_point_size'));
        Row.height($r('app.float.decorative_point_size'));
        Row.border({
            radius: $r('app.float.decorative_dots_rounded_corners')
        });
        Row.margin({
            top: $r('app.float.decorative_dots_upper_margin'),
            bottom: $r('app.float.decorative_dots_bottom_margin')
        });
        Row.pop();
        Row.create();
        Row.onClick(async () => {
            await this.camera.takePicture();
        });
        Row.backgroundColor(Color.Black);
        Row.width($r('app.float.button_border_size'));
        Row.height($r('app.float.button_border_size'));
        Row.border({
            color: Color.White,
            width: $r('app.float.button_border_width'),
            radius: $r('app.float.button_border_radius')
        });
        Row.justifyContent(FlexAlign.Center);
        Row.alignItems(VerticalAlign.Center);
        Row.create();
        Row.backgroundColor(Color.White);
        Row.width($r('app.float.button_size'));
        Row.height($r('app.float.button_size'));
        Row.border({
            radius: $r('app.float.button_border_radius')
        });
        Row.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
