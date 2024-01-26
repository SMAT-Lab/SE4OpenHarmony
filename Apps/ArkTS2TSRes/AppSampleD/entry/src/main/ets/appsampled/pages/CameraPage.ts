interface CameraPage_Params {
    imageList?: Array<Resource>;
    textList?: Array<Resource>;
    sidebarList_1?: Array<Resource>;
    sidebarList_2?: Array<Resource>;
    xComponentController?: XComponentController;
    textTimerController?: TextTimerController;
    cameraModel?: CameraModel;
    scrollerHorText?: Scroller;
    scrollerHorImage?: Scroller;
    currentUser?: User | null;
    recordingStatus?: number;
    surfaceId?: string;
    format?: string;
    uploadFile?: string;
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
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Permissions } from '@ohos.abilityAccessCtrl';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import router from '@ohos.router';
import Logger from '../../utils/Logger';
import CameraModel from '../../model/CameraModel';
import User from '../data/User';
import { BusinessError } from '@ohos.base';
const TAG: string = '[CameraPage]';
const PERMISSIONS: Array<Permissions> = ['ohos.permission.READ_MEDIA', 'ohos.permission.WRITE_MEDIA', 'ohos.permission.MEDIA_LOCATION', 'ohos.permission.MICROPHONE', 'ohos.permission.CAMERA'];
class CameraPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageList = [$r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon')];
        this.textList = [$r('app.string.Word'), $r('app.string.Subsection'), $r('app.string.Video'), $r('app.string.Photo'), $r('app.string.Everyday'), $r('app.string.Live_streaming')];
        this.sidebarList_1 = [$r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon')];
        this.sidebarList_2 = [$r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon')];
        this.xComponentController = new XComponentController();
        this.textTimerController = new TextTimerController();
        this.cameraModel = new CameraModel(getContext(this));
        this.scrollerHorText = new Scroller();
        this.scrollerHorImage = new Scroller();
        this.currentUser = null;
        this.__recordingStatus = new ObservedPropertySimple(0, this, "recordingStatus");
        this.__surfaceId = new ObservedPropertySimple('-1', this, "surfaceId");
        this.__format = new ObservedPropertySimple('mm:ss', this, "format");
        this.__uploadFile = new ObservedPropertySimple('', this, "uploadFile");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CameraPage_Params) {
        if (params.imageList !== undefined) {
            this.imageList = params.imageList;
        }
        if (params.textList !== undefined) {
            this.textList = params.textList;
        }
        if (params.sidebarList_1 !== undefined) {
            this.sidebarList_1 = params.sidebarList_1;
        }
        if (params.sidebarList_2 !== undefined) {
            this.sidebarList_2 = params.sidebarList_2;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.textTimerController !== undefined) {
            this.textTimerController = params.textTimerController;
        }
        if (params.cameraModel !== undefined) {
            this.cameraModel = params.cameraModel;
        }
        if (params.scrollerHorText !== undefined) {
            this.scrollerHorText = params.scrollerHorText;
        }
        if (params.scrollerHorImage !== undefined) {
            this.scrollerHorImage = params.scrollerHorImage;
        }
        if (params.currentUser !== undefined) {
            this.currentUser = params.currentUser;
        }
        if (params.recordingStatus !== undefined) {
            this.recordingStatus = params.recordingStatus;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.format !== undefined) {
            this.format = params.format;
        }
        if (params.uploadFile !== undefined) {
            this.uploadFile = params.uploadFile;
        }
    }
    aboutToBeDeleted() {
        this.__recordingStatus.aboutToBeDeleted();
        this.__surfaceId.aboutToBeDeleted();
        this.__format.aboutToBeDeleted();
        this.__uploadFile.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 底部特效模拟图片资源数组
    private imageList: Array<Resource>;
    // 文字资源数组
    private textList: Array<Resource>;
    // 侧边图标资源数组
    private sidebarList_1: Array<Resource>;
    private sidebarList_2: Array<Resource>;
    private xComponentController: XComponentController;
    private textTimerController: TextTimerController;
    private cameraModel: CameraModel;
    private scrollerHorText: Scroller;
    private scrollerHorImage: Scroller;
    private currentUser: User | null; // 当前用户信息
    private __recordingStatus: ObservedPropertySimple<number>; // 0：未录制 1：正在录制 2：结束录制
    get recordingStatus() {
        return this.__recordingStatus.get();
    }
    set recordingStatus(newValue: number) {
        this.__recordingStatus.set(newValue);
    }
    private __surfaceId: ObservedPropertySimple<string>;
    get surfaceId() {
        return this.__surfaceId.get();
    }
    set surfaceId(newValue: string) {
        this.__surfaceId.set(newValue);
    }
    private __format: ObservedPropertySimple<string>;
    get format() {
        return this.__format.get();
    }
    set format(newValue: string) {
        this.__format.set(newValue);
    }
    private __uploadFile: ObservedPropertySimple<string>;
    get uploadFile() {
        return this.__uploadFile.get();
    }
    set uploadFile(newValue: string) {
        this.__uploadFile.set(newValue);
    }
    pageTransition() {
        PageTransition.create();
        // 登录页面从底部滑入滑出
        PageTransitionEnter.create({ type: RouteType.Push, duration: 200 });
        // 登录页面从底部滑入滑出
        PageTransitionEnter.slide(SlideEffect.Bottom);
        PageTransitionExit.create({ type: RouteType.Pop, duration: 200 });
        PageTransitionExit.slide(SlideEffect.Bottom);
        PageTransition.pop();
    }
    aboutToAppear() {
        let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        try {
            atManager.requestPermissionsFromUser(getContext(this), PERMISSIONS).then((data) => {
                this.cameraModel.createCamera(this.surfaceId);
                Logger.info(TAG, 'requestPermissionsFromUser success');
            }).catch((err: BusinessError) => {
                Logger.info(TAG, `requestPermissionsFromUser err: ${JSON.stringify(err)}`);
            });
        }
        catch (err) {
            Logger.info(TAG, `requestPermissionsFromUser catch err->${JSON.stringify(err)}`);
        }
        if (AppStorage.get("currentUser")) {
            this.currentUser = AppStorage.get("currentUser")!;
        }
    }
    onPageHide() {
        Logger.info(TAG, 'page onPageHide');
        this.stopVideo();
        this.cameraModel.releaseCamera();
    }
    onPageShow() {
        Logger.info(TAG, 'page onPageHide');
        this.cameraModel.createCamera(this.surfaceId);
    }
    startVideo() {
        Logger.info(TAG, 'page startVideo');
        this.recordingStatus = 1;
        this.textTimerController.reset();
        this.textTimerController.start();
        this.cameraModel.startVideo();
    }
    async stopVideo() {
        Logger.info(TAG, 'page stopVideo');
        this.recordingStatus = 2;
        this.textTimerController.pause();
        this.uploadFile = await this.cameraModel.stopVideo();
        Logger.info(TAG, `page stopVideo uploadFile = ${this.uploadFile}`);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_000000'));
        Stack.create();
        Stack.width('100%');
        Stack.height('91%');
        Stack.borderRadius(12);
        XComponent.create({
            id: 'xComponentId',
            type: 'surface',
            controller: this.xComponentController
        });
        XComponent.onLoad(() => {
            Logger.info(TAG, 'onLoad is called');
            // 设置XComponent创建的曲面宽为640vp，高为480vp
            this.xComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 });
            this.surfaceId = this.xComponentController.getXComponentSurfaceId();
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
            this.cameraModel.createCamera(this.surfaceId);
        });
        XComponent.height('100%');
        XComponent.width('100%');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.width('100%');
        Row.height('8%');
        Row.justifyContent(this.recordingStatus !== 1 ? FlexAlign.SpaceBetween : FlexAlign.End);
        Row.create();
        Row.width(50);
        Row.height(50);
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(e => {
            router.back();
        });
        Row.visibility(this.recordingStatus !== 1 ? Visibility.Visible : Visibility.None);
        Image.create($r('app.media.app_icon'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Row.create({ space: 8 });
        Row.width(132);
        Row.height(48);
        Row.borderRadius(12);
        Row.backgroundColor($r('app.color.COLOR_669F9B9B'));
        Row.justifyContent(FlexAlign.Center);
        Row.visibility(this.recordingStatus !== 1 ? Visibility.Visible : Visibility.None);
        Image.create($r('app.media.app_icon'));
        Image.width(28);
        Image.height(28);
        Image.objectFit(ImageFit.Fill);
        Image.borderRadius(14);
        Text.create($r('app.string.Select_music'));
        Text.textAlign(TextAlign.Center);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(14);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width(42);
        Row.height(42);
        Image.create($r('app.media.app_icon'));
        Image.width(26);
        Image.height(26);
        Image.objectFit(ImageFit.Contain);
        Image.visibility(this.recordingStatus !== 2 ? Visibility.Visible : Visibility.None);
        Image.create($r('app.media.app_icon'));
        Image.width(26);
        Image.height(26);
        Image.objectFit(ImageFit.Contain);
        Image.visibility(this.recordingStatus === 2 ? Visibility.Visible : Visibility.None);
        Row.pop();
        Row.pop();
        Column.create({ space: 18 });
        Column.width('100%');
        Column.height('50%');
        Column.padding({ top: 4, right: 14 });
        Column.alignItems(HorizontalAlign.End);
        Column.visibility(this.recordingStatus === 1 ? Visibility.None : Visibility.Visible);
        If.create();
        if (this.recordingStatus === 0) {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.sidebarList_1), (sidebar: Resource, index: number) => {
                Image.create($r('app.media.app_icon'));
                Image.width(28);
                Image.height(28);
                Image.objectFit(ImageFit.Contain);
                If.create();
                if (index === 1) {
                    If.branchId(0);
                    Divider.create();
                    Divider.vertical(false);
                    Divider.height(1);
                    Divider.width(22);
                    Divider.color($r('app.color.COLOR_FFFFFF'));
                    Divider.margin({ right: 4 });
                }
                If.pop();
            });
            ForEach.pop();
        }
        else if (this.recordingStatus === 2) {
            If.branchId(1);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.sidebarList_2), (sidebar: Resource, index: number) => {
                Image.create($r('app.media.app_icon'));
                Image.width(28);
                Image.height(28);
                Image.objectFit(ImageFit.Contain);
                If.create();
                if (index === 0) {
                    If.branchId(0);
                    Divider.create();
                    Divider.vertical(false);
                    Divider.height(1);
                    Divider.width(22);
                    Divider.color($r('app.color.COLOR_FFFFFF'));
                    Divider.margin({ right: 4 });
                }
                If.pop();
                If.create();
                if (index === 1) {
                    If.branchId(0);
                    Text.create($r('app.string.Wen'));
                    Text.textAlign(TextAlign.Center);
                    Text.fontColor($r('app.color.COLOR_FFFFFF'));
                    Text.fontSize(22);
                    Text.fontFamily($r('app.string.Font_family_medium'));
                    Text.margin({ right: 4 });
                    Text.pop();
                }
                If.pop();
            });
            ForEach.pop();
        }
        If.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Column.width('100%');
        Column.height('25%');
        Column.create();
        Column.width('100%');
        Column.height('15%');
        Column.justifyContent(FlexAlign.Center);
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.visibility(this.recordingStatus === 1 ? Visibility.Visible : Visibility.Hidden);
        Column.width('100%');
        Column.height('30%');
        TextTimer.create({ isCountDown: false, count: 60000, controller: this.textTimerController });
        TextTimer.height('100%');
        TextTimer.fontSize(18);
        TextTimer.format(this.format);
        TextTimer.fontColor($r('app.color.COLOR_FFFFFF'));
        TextTimer.pop();
        Column.pop();
        // 文字列表
        Scroll.create(this.scrollerHorText);
        // 文字列表
        Scroll.width('70%');
        // 文字列表
        Scroll.height('100%');
        // 文字列表
        Scroll.scrollable(ScrollDirection.Horizontal);
        // 文字列表
        Scroll.scrollBar(BarState.Off);
        // 文字列表
        Scroll.visibility(this.recordingStatus === 0 ? Visibility.Visible : Visibility.Hidden);
        Row.create({ space: 42 });
        Row.height('100%');
        Row.justifyContent(FlexAlign.Start);
        Row.alignItems(VerticalAlign.Bottom);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.textList), (text: Resource, index: number) => {
            Text.create(text);
            Text.height('100%');
            Text.textAlign(TextAlign.Center);
            Text.fontColor(index === 2 ? $r('app.color.COLOR_EEC934') : $r('app.color.COLOR_FFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_medium'));
            Text.pop();
        });
        ForEach.pop();
        Row.pop();
        // 文字列表
        Scroll.pop();
        Column.pop();
        Row.create();
        Row.width('100%');
        Row.height('85%');
        Row.justifyContent(FlexAlign.SpaceEvenly);
        If.create();
        if (this.recordingStatus === 0) {
            If.branchId(0);
            Column.create({ space: 6 });
            Column.width(64);
            Column.height(64);
            Image.create($r('app.media.app_icon'));
            Image.width(56);
            Image.height(56);
            Image.objectFit(ImageFit.Contain);
            Image.borderRadius(12);
            Text.create($r('app.string.Special'));
            Text.textAlign(TextAlign.Center);
            Text.fontColor($r('app.color.COLOR_FFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_medium'));
            Text.pop();
            Column.pop();
            this.StartRecordComponent(this);
            Column.create({ space: 6 });
            Column.width(64);
            Column.height(64);
            Image.create($r('app.media.app_icon'));
            Image.width(56);
            Image.height(56);
            Image.objectFit(ImageFit.Fill);
            Image.borderRadius(12);
            Text.create($r('app.string.Album'));
            Text.textAlign(TextAlign.Center);
            Text.fontColor($r('app.color.COLOR_FFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_medium'));
            Text.pop();
            Column.pop();
        }
        else if (this.recordingStatus === 1) {
            If.branchId(1);
            this.RecordingComponent(this);
        }
        else {
            If.branchId(2);
            this.PointComponent(this);
        }
        If.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Stack.pop();
        Row.create({ space: 12 });
        Row.width('100%');
        Row.height('9%');
        Row.justifyContent(FlexAlign.Center);
        Row.padding({ left: 12, right: 12 });
        If.create();
        if (this.recordingStatus === 0) {
            If.branchId(0);
            Scroll.create(this.scrollerHorImage);
            Scroll.width('70%');
            Scroll.height('100%');
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Row.create({ space: 14 });
            Row.height('100%');
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Bottom);
            Row.margin({ bottom: 1 });
            ForEach.create("5", this, ObservedObject.GetRawObject(this.imageList), (img: Resource) => {
                Image.create($r('app.media.app_icon'));
                Image.width(56);
                Image.height(56);
                Image.objectFit(ImageFit.Fill);
                Image.borderRadius(10);
            });
            ForEach.pop();
            Row.pop();
            Scroll.pop();
        }
        else if (this.recordingStatus === 1) {
            If.branchId(1);
        }
        else if (this.recordingStatus === 2) {
            If.branchId(2);
            Row.create();
            Row.layoutWeight(1);
            Row.height('80%');
            Row.justifyContent(FlexAlign.Center);
            Row.backgroundColor($r('app.color.COLOR_393939'));
            Row.borderRadius(12);
            Image.create($r('app.media.app_icon'));
            Image.width(28);
            Image.height(28);
            Image.objectFit(ImageFit.Fill);
            Row.pop();
            Row.create({ space: 8 });
            Row.layoutWeight(2);
            Row.height('80%');
            Row.justifyContent(FlexAlign.Center);
            Row.backgroundColor($r('app.color.COLOR_393939'));
            Row.borderRadius(12);
            If.create();
            if (this.currentUser) {
                If.branchId(0);
                Image.create($r('app.media.app_icon'));
                Image.width(28);
                Image.height(28);
                Image.objectFit(ImageFit.Fill);
                Image.borderRadius(14);
            }
            If.pop();
            Text.create($r('app.string.Send_everyday'));
            Text.textAlign(TextAlign.Center);
            Text.fontColor($r('app.color.COLOR_FFFFFF'));
            Text.fontSize(18);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.borderRadius(14);
            Text.pop();
            Row.pop();
            Row.create();
            Row.id('next');
            Row.layoutWeight(2);
            Row.height('80%');
            Row.justifyContent(FlexAlign.Center);
            Row.backgroundColor($r('app.color.COLOR_FC2B55'));
            Row.borderRadius(12);
            Row.onClick(e => {
                this.recordingStatus = 0;
                router.pushUrl({
                    url: 'appsampled/pages/PublishPage',
                    params: {
                        uploadFile: this.uploadFile
                    }
                });
            });
            Text.create($r('app.string.Next'));
            Text.textAlign(TextAlign.Center);
            Text.fontColor($r('app.color.COLOR_FFFFFF'));
            Text.fontSize(18);
            Text.fontFamily($r('app.string.Font_family_regular'));
            Text.borderRadius(14);
            Text.pop();
            Row.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
    StartRecordComponent(parent = null) {
        Column.create();
        Column.id('startVideo');
        Column.width(100);
        Column.height(100);
        Column.border({ width: 5, color: $r('app.color.COLOR_FFFFFF'), radius: 50 });
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.onClick(e => {
            this.startVideo();
        });
        Column.create();
        Column.width(80);
        Column.height(80);
        Column.backgroundColor(Color.Red);
        Column.borderRadius(40);
        Column.pop();
        Column.pop();
    }
    RecordingComponent(parent = null) {
        Stack.create();
        Stack.id('stopVideo');
        Stack.width(120);
        Stack.height(120);
        Stack.borderRadius(60);
        Stack.backgroundColor($r('app.color.COLOR_80FFFFFF'));
        Stack.onClick(e => {
            this.stopVideo();
        });
        Column.create();
        Column.width(60);
        Column.height(60);
        Column.borderRadius(30);
        Column.backgroundColor($r('app.color.COLOR_E6FFFFFF'));
        Column.pop();
        Column.create();
        Column.width(20);
        Column.height(20);
        Column.borderRadius(4);
        Column.backgroundColor(Color.Red);
        Column.pop();
        Stack.pop();
    }
    PointComponent(parent = null) {
        Row.create({ space: 8 });
        Row.width(100);
        Row.height(30);
        Row.alignItems(VerticalAlign.Center);
        Row.justifyContent(FlexAlign.Center);
        Text.create();
        Text.width(4);
        Text.height(4);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(2);
        Text.pop();
        Text.create();
        Text.width(6);
        Text.height(6);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(3);
        Text.pop();
        Text.create();
        Text.width(8);
        Text.height(8);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(4);
        Text.pop();
        Text.create();
        Text.width(10);
        Text.height(10);
        Text.backgroundColor($r('app.color.COLOR_FFFFFF'));
        Text.borderRadius(5);
        Text.pop();
        Text.create();
        Text.width(8);
        Text.height(8);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(4);
        Text.pop();
        Text.create();
        Text.width(6);
        Text.height(6);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(3);
        Text.pop();
        Text.create();
        Text.width(4);
        Text.height(4);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(2);
        Text.pop();
        Row.pop();
    }
}
loadDocument(new CameraPage("1", undefined, {}));
