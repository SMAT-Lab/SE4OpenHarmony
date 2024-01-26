interface CameraPage_Params {
    surfaceId?: string;
    mXComponentController?: XComponentController;
    cameraModel?: CameraModel;
    windowWidth?: number;
    windowHeight?: number;
    imageThumbnail?: string;
    videoThumbnail?: Resource | undefined;
    currentModel?: number;
    isRecording?: boolean;
    textMove?: number;
    isPointShow?: boolean;
    isTitleShow?: boolean;
    timeShow?: boolean;
    translateY?: number;
    count?: number;
    duration?: number;
    resultInit?: string;
    text?: string;
    isShow?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CameraPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Logger from '../../utils/Logger';
import CameraModel from '../../model/CameraModel';
import grantPermission from '../../utils/PermissionUtils';
import display from '@ohos.display';
import router from '@ohos.router';
import emitter from '@ohos.events.emitter';
import animator from '@ohos.animator';
import { BusinessError } from '@ohos.base';
const TAG: string = '[CameraPage]';
enum CameraMode {
    MODE_PHOTO = 0,
    MODE_VIDEO = 1 // 录像模式
}
;
let innerEventText: emitter.InnerEvent = {
    eventId: 1,
    priority: emitter.EventPriority.HIGH
};
class CameraPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.surfaceId = '-1';
        this.mXComponentController = new XComponentController();
        this.cameraModel = new CameraModel();
        this.windowWidth = 300;
        this.windowHeight = 300;
        this.__imageThumbnail = new ObservedPropertySimple('', this, "imageThumbnail");
        this.__videoThumbnail = new ObservedPropertyObject(undefined, this, "videoThumbnail");
        this.__currentModel = new ObservedPropertySimple(CameraMode.MODE_PHOTO, this, "currentModel");
        this.__isRecording = new ObservedPropertySimple(false, this, "isRecording");
        this.__textMove = new ObservedPropertySimple(45, this, "textMove");
        this.__isPointShow = new ObservedPropertySimple(true, this, "isPointShow");
        this.__isTitleShow = new ObservedPropertySimple(true, this, "isTitleShow");
        this.__timeShow = new ObservedPropertySimple(false, this, "timeShow");
        this.__translateY = new ObservedPropertySimple(80, this, "translateY");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.__duration = new ObservedPropertySimple(2500, this, "duration");
        this.__resultInit = new ObservedPropertySimple('', this, "resultInit");
        this.__text = new ObservedPropertySimple('', this, "text");
        this.__isShow = new ObservedPropertySimple(false, this, "isShow");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CameraPage_Params) {
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.mXComponentController !== undefined) {
            this.mXComponentController = params.mXComponentController;
        }
        if (params.cameraModel !== undefined) {
            this.cameraModel = params.cameraModel;
        }
        if (params.windowWidth !== undefined) {
            this.windowWidth = params.windowWidth;
        }
        if (params.windowHeight !== undefined) {
            this.windowHeight = params.windowHeight;
        }
        if (params.imageThumbnail !== undefined) {
            this.imageThumbnail = params.imageThumbnail;
        }
        if (params.videoThumbnail !== undefined) {
            this.videoThumbnail = params.videoThumbnail;
        }
        if (params.currentModel !== undefined) {
            this.currentModel = params.currentModel;
        }
        if (params.isRecording !== undefined) {
            this.isRecording = params.isRecording;
        }
        if (params.textMove !== undefined) {
            this.textMove = params.textMove;
        }
        if (params.isPointShow !== undefined) {
            this.isPointShow = params.isPointShow;
        }
        if (params.isTitleShow !== undefined) {
            this.isTitleShow = params.isTitleShow;
        }
        if (params.timeShow !== undefined) {
            this.timeShow = params.timeShow;
        }
        if (params.translateY !== undefined) {
            this.translateY = params.translateY;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.resultInit !== undefined) {
            this.resultInit = params.resultInit;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
    }
    aboutToBeDeleted() {
        this.__imageThumbnail.aboutToBeDeleted();
        this.__videoThumbnail.aboutToBeDeleted();
        this.__currentModel.aboutToBeDeleted();
        this.__isRecording.aboutToBeDeleted();
        this.__textMove.aboutToBeDeleted();
        this.__isPointShow.aboutToBeDeleted();
        this.__isTitleShow.aboutToBeDeleted();
        this.__timeShow.aboutToBeDeleted();
        this.__translateY.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__resultInit.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private surfaceId: string;
    private mXComponentController: XComponentController;
    private cameraModel: CameraModel;
    private windowWidth: number;
    private windowHeight: number;
    private __imageThumbnail: ObservedPropertySimple<string>;
    get imageThumbnail() {
        return this.__imageThumbnail.get();
    }
    set imageThumbnail(newValue: string) {
        this.__imageThumbnail.set(newValue);
    }
    private __videoThumbnail: ObservedPropertyObject<Resource | undefined>;
    get videoThumbnail() {
        return this.__videoThumbnail.get();
    }
    set videoThumbnail(newValue: Resource | undefined) {
        this.__videoThumbnail.set(newValue);
    }
    private __currentModel: ObservedPropertySimple<number>;
    get currentModel() {
        return this.__currentModel.get();
    }
    set currentModel(newValue: number) {
        this.__currentModel.set(newValue);
    }
    private __isRecording: ObservedPropertySimple<boolean>;
    get isRecording() {
        return this.__isRecording.get();
    }
    set isRecording(newValue: boolean) {
        this.__isRecording.set(newValue);
    }
    private __textMove: ObservedPropertySimple<number>;
    get textMove() {
        return this.__textMove.get();
    }
    set textMove(newValue: number) {
        this.__textMove.set(newValue);
    }
    private __isPointShow: ObservedPropertySimple<boolean>;
    get isPointShow() {
        return this.__isPointShow.get();
    }
    set isPointShow(newValue: boolean) {
        this.__isPointShow.set(newValue);
    }
    private __isTitleShow: ObservedPropertySimple<boolean>;
    get isTitleShow() {
        return this.__isTitleShow.get();
    }
    set isTitleShow(newValue: boolean) {
        this.__isTitleShow.set(newValue);
    }
    private __timeShow: ObservedPropertySimple<boolean>;
    get timeShow() {
        return this.__timeShow.get();
    }
    set timeShow(newValue: boolean) {
        this.__timeShow.set(newValue);
    }
    private __translateY: ObservedPropertySimple<number>;
    get translateY() {
        return this.__translateY.get();
    }
    set translateY(newValue: number) {
        this.__translateY.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __duration: ObservedPropertySimple<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private __resultInit: ObservedPropertySimple<string>;
    get resultInit() {
        return this.__resultInit.get();
    }
    set resultInit(newValue: string) {
        this.__resultInit.set(newValue);
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    async aboutToAppear() {
        this.isShow = true;
        this.windowWidth = display.getDefaultDisplaySync().width;
        this.windowHeight = display.getDefaultDisplaySync().height;
        Logger.info(TAG, `windowWidth  ${JSON.stringify(this.windowWidth)}`);
        Logger.info(TAG, `windowHeight  ${JSON.stringify(this.windowHeight)}`);
        await grantPermission().then(res => {
            Logger.info(TAG, `权限申请成功  ${JSON.stringify(res)}`);
            if (this.surfaceId) {
                this.cameraModel.initCamera(this.surfaceId);
            }
        }).catch((rej: BusinessError) => {
            Logger.info(TAG, `权限申请失败  ${JSON.stringify(rej)}`);
        });
        this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
        Logger.info(TAG, `aboutToAppear,surfaceId=${this.surfaceId}`);
    }
    onPageShow() {
        this.isShow = true;
        if (!this.isShow) {
            this.cameraModel.initCamera(this.surfaceId);
        }
        Logger.info(TAG, `onPageShow,onPageShow=${this.count}`);
        this.text = '';
        setTimeout(() => {
            this.animationStart();
        }, 1000);
    }
    onPageHide() {
        Logger.info(TAG, `onPageHide,=${this.count}`);
        // this.cameraModel.cameraRelease();
        this.count = 0;
        this.isShow = false;
    }
    async aboutToDisappear() {
        emitter.off(innerEventText.eventId);
        this.cameraModel.cameraRelease();
        Logger.info(TAG, 'aboutToDisappear,}');
    }
    animationStart() {
        Logger.info(TAG, `animationScan start`);
        if (this.isShow) {
            Logger.info(TAG, `animationScan 1`);
            this.translateY = 20;
            Context.animateTo({
                duration: 2000,
                curve: Curve.EaseOut,
                iterations: -1,
                playMode: PlayMode.Normal,
                onFinish: () => {
                    console.info('play end');
                }
            }, () => {
                this.translateY = 400;
            });
        }
        else {
            Logger.info(TAG, `animationScan 2`);
            Context.animateTo({}, () => {
                this.translateY = 80;
            });
        }
    }
    render() {
        If.create();
        if (this.isShow) {
            If.branchId(0);
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.create({ alignContent: Alignment.Top });
            Stack.width('100%');
            Stack.height('100%');
            XComponent.create({
                id: 'componentId',
                type: 'surface',
                controller: this.mXComponentController
            });
            XComponent.onLoad(() => {
                Logger.info(TAG, 'onLoad is called');
                this.mXComponentController.setXComponentSurfaceSize({
                    surfaceWidth: this.windowWidth,
                    surfaceHeight: this.windowHeight
                });
                this.surfaceId = this.mXComponentController.getXComponentSurfaceId();
                Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
                this.cameraModel?.initCamera(this.surfaceId);
                emitter.once(innerEventText, (res) => {
                    this.text = res.data && res.data.text;
                    Logger.info(TAG, `this.text==on==${this.text}`);
                    if (this.text !== '' && this.count === 0) {
                        this.count++;
                        Logger.info(TAG, `this.count,this.count=${this.count}`);
                        AppStorage.setOrCreate<string>('text', this.text);
                        router.pushUrl({
                            url: 'pages/messagePage/Message'
                        });
                        setTimeout(() => {
                            this.animationStart();
                        }, 1000);
                    }
                });
            });
            XComponent.width('100%');
            XComponent.height('100%');
            XComponent.layoutWeight(1);
            Image.create($r('app.media.ic_lattice'));
            Image.width('100%');
            Image.height('95%');
            Row.create();
            Row.margin({ top: 20 });
            Row.width('100%');
            Image.create($r('app.media.icon'));
            Image.width(26);
            Image.height(26);
            Image.margin({ left: 20 });
            Image.onClick(() => {
                Logger.info(TAG, 'back===11=');
                router.back();
                Logger.info(TAG, 'back===Get=');
                this.cameraModel.cameraRelease();
                Logger.info(TAG, 'back===cameraRelease=');
                Logger.info(TAG, 'back===back=');
            });
            Blank.create();
            Blank.pop();
            Image.create($r('app.media.icon'));
            Image.width(32);
            Image.height(32);
            Image.margin({ right: 20 });
            Row.pop();
            Image.create($r('app.media.ic_dot_scanning'));
            Image.margin({ top: 80 });
            Image.width('100%');
            Image.translate({ y: this.translateY });
            Stack.pop();
            Column.create();
            Column.width('100%');
            Column.height('20%');
            Column.position({ x: 0, y: '80%' });
            Row.create();
            Text.create($r('app.string.text_description'));
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 20 });
            Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
            Image.create($r('app.media.icon'));
            Image.width(40);
            Image.height(40);
            Image.create($r('app.media.icon'));
            Image.width(45);
            Image.height(45);
            Image.opacity(0);
            Image.create($r("app.media.icon"));
            Image.width(45);
            Image.height(45);
            Flex.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 30 });
            Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceAround });
            Flex.align(Alignment.Bottom);
            Flex.height('100%');
            Flex.width('100%');
            Text.create($r('app.string.camera_sweep'));
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.pop();
            Text.create($r('app.string.camera_pictures'));
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.pop();
            Text.create($r('app.string.camera_pai'));
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.pop();
            Flex.pop();
            Row.pop();
            Column.pop();
            Stack.pop();
        }
        If.pop();
    }
}
loadDocument(new CameraPage("1", undefined, {}));
