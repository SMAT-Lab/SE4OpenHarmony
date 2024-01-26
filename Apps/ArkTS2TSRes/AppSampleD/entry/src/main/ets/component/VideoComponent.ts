interface VideoComponent_Params {
    xComponentController?: XComponentController;
    avPlayerModel?: AVPlayerModel;
    surfaceId?: string;
    selectTopIndex?: number;
    isLike?: boolean;
    isCollect?: boolean;
    isPlay?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "VideoComponent_" + ++__generate__Id;
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
import router from '@ohos.router';
import Logger from '../utils/Logger';
import AVPlayerModel from '../model/AVPlayerModel';
import Constant from '../utils/Constant';
import emitter from '@ohos.events.emitter';
const TAG: string = '[VideoComponent]';
export default class VideoComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.xComponentController = new XComponentController();
        this.avPlayerModel = new AVPlayerModel(getContext(this));
        this.__surfaceId = new ObservedPropertySimple('-1', this, "surfaceId");
        this.__selectTopIndex = new ObservedPropertySimple(4, this, "selectTopIndex");
        this.__isLike = new ObservedPropertySimple(false, this, "isLike");
        this.__isCollect = new ObservedPropertySimple(false, this, "isCollect");
        this.__isPlay = new ObservedPropertySimple(true, this, "isPlay");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VideoComponent_Params) {
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.avPlayerModel !== undefined) {
            this.avPlayerModel = params.avPlayerModel;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.selectTopIndex !== undefined) {
            this.selectTopIndex = params.selectTopIndex;
        }
        if (params.isLike !== undefined) {
            this.isLike = params.isLike;
        }
        if (params.isCollect !== undefined) {
            this.isCollect = params.isCollect;
        }
        if (params.isPlay !== undefined) {
            this.isPlay = params.isPlay;
        }
    }
    aboutToBeDeleted() {
        this.__surfaceId.aboutToBeDeleted();
        this.__selectTopIndex.aboutToBeDeleted();
        this.__isLike.aboutToBeDeleted();
        this.__isCollect.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private xComponentController: XComponentController;
    private avPlayerModel: AVPlayerModel;
    private __surfaceId: ObservedPropertySimple<string>;
    get surfaceId() {
        return this.__surfaceId.get();
    }
    set surfaceId(newValue: string) {
        this.__surfaceId.set(newValue);
    }
    private __selectTopIndex: ObservedPropertySimple<number>; // 顶部选择索引
    get selectTopIndex() {
        return this.__selectTopIndex.get();
    }
    set selectTopIndex(newValue: number) {
        this.__selectTopIndex.set(newValue);
    }
    private __isLike: ObservedPropertySimple<boolean>; // 是否喜欢
    get isLike() {
        return this.__isLike.get();
    }
    set isLike(newValue: boolean) {
        this.__isLike.set(newValue);
    }
    private __isCollect: ObservedPropertySimple<boolean>; // 是否收藏
    get isCollect() {
        return this.__isCollect.get();
    }
    set isCollect(newValue: boolean) {
        this.__isCollect.set(newValue);
    }
    private __isPlay: ObservedPropertySimple<boolean>; // 是否播放
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    aboutToAppear() {
        // 监听暂停事件，当有其他音乐播放时当前播放
        emitter.on({ eventId: Constant.EVENT_PAUSED_INDEX }, data => {
            Logger.info(TAG, `emitter on data = ${JSON.stringify(data)}`);
            Logger.info(TAG, `emitter on data this.isPlay= ${JSON.stringify(this.isPlay)}`);
            if (this.isPlay) {
                this.avPlayerModel.paused();
                this.isPlay = false;
            }
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_000000'));
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        Stack.alignContent(Alignment.Center);
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
            this.avPlayerModel.avPlayerFdSrcDemo(Constant.TEST_NAME_DEMO_VIDEO, this.surfaceId);
        });
        XComponent.height('100%');
        XComponent.width('100%');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create({ space: 28 });
        Row.width('100%');
        Row.height('8%');
        Row.justifyContent(FlexAlign.Center);
        Image.create($r('app.media.app_icon'));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Text.create($r('app.string.Stroll'));
        Text.height('100%');
        Text.fontColor(this.selectTopIndex === 0 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.onClick(e => {
            this.selectTopIndex = 0;
        });
        Text.pop();
        Text.create($r('app.string.Experience'));
        Text.height('100%');
        Text.fontColor(this.selectTopIndex === 1 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.onClick(e => {
            this.selectTopIndex = 1;
        });
        Text.pop();
        Text.create($r('app.string.Attention'));
        Text.height('100%');
        Text.fontColor(this.selectTopIndex === 2 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.onClick(e => {
            this.selectTopIndex = 2;
        });
        Text.pop();
        Text.create($r('app.string.Store'));
        Text.height('100%');
        Text.fontColor(this.selectTopIndex === 3 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.onClick(e => {
            this.selectTopIndex = 3;
        });
        Text.pop();
        Text.create($r('app.string.Recommend'));
        Text.height('100%');
        Text.fontColor(this.selectTopIndex === 4 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.onClick(e => {
            this.selectTopIndex = 4;
        });
        Text.pop();
        Row.create();
        Row.width(40);
        Row.height(50);
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(e => {
            Logger.info(TAG, `search_white onClick`);
            emitter.emit({ eventId: Constant.EVENT_PAUSED_INDEX });
            router.pushUrl({ url: 'appsampled/pages/SearchPage' });
        });
        Image.create($r('app.media.app_icon'));
        Image.id('search');
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Row.pop();
        Blank.create();
        Blank.pop();
        Row.create();
        Row.width('100%');
        Row.height('60%');
        Column.create();
        Column.width('85%');
        Column.height('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.End);
        Text.create($r('app.string.UserNick'));
        Text.height(30);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(22);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.margin({ left: 15, bottom: 10 });
        Text.pop();
        Text.create($r('app.string.TikContent'));
        Text.fontColor($r('app.color.COLOR_E6FFFFFF'));
        Text.fontSize(20);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.margin({ left: 15, bottom: 20 });
        Text.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.width('15%');
        Column.height('100%');
        Stack.create();
        Stack.width(60);
        Stack.height(60);
        Stack.margin({ bottom: 10 });
        Stack.alignContent(Alignment.Bottom);
        Image.create($r('app.media.app_icon'));
        Image.width(60);
        Image.height(60);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(30);
        Image.border({ color: $r('app.color.COLOR_FFFFFF'), width: 2 });
        Image.create($r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(10);
        Image.offset({ y: 10 });
        Stack.pop();
        Column.create();
        Column.width(60);
        Column.height(60);
        Column.alignItems(HorizontalAlign.Center);
        Image.create(this.isLike ? $r('app.media.app_icon') : $r('app.media.app_icon'));
        Image.width(35);
        Image.height(35);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(e => {
            this.isLike = !this.isLike;
            Logger.info(TAG, `isLike= ${this.isLike}`);
        });
        Text.create($r('app.string.Num', "273.1"));
        Text.width(60);
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_E6FFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        this.Item($r('app.media.app_icon'), $r('app.string.Num', '36.3'), () => {
            Logger.info(TAG, 'ic_message');
        }, this);
        Column.create();
        Column.width(60);
        Column.height(60);
        Column.alignItems(HorizontalAlign.Center);
        Image.create(this.isCollect ? $r('app.media.app_icon') : $r('app.media.app_icon'));
        Image.width(35);
        Image.height(35);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(e => {
            this.isCollect = !this.isCollect;
            Logger.info(TAG, `isCollect= ${this.isCollect}`);
        });
        Text.create($r('app.string.Num', '18.9'));
        Text.width(60);
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_E6FFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        this.Item($r('app.media.app_icon'), $r('app.string.Num', '40.2'), () => {
            Logger.info(TAG, 'ic_transmit');
        }, this);
        Column.create();
        Column.width(50);
        Column.height(50);
        Column.justifyContent(FlexAlign.Center);
        Column.borderRadius(25);
        Column.margin({ bottom: 20 });
        Column.backgroundColor($r('app.color.COLOR_FFFFFF'));
        Image.create($r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Column.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.id('video_action');
        Column.width('60%');
        Column.height('70%');
        Column.justifyContent(FlexAlign.Center);
        Column.onClick(e => {
            if (this.isPlay) {
                this.avPlayerModel.paused();
            }
            else {
                this.avPlayerModel.play();
            }
            this.isPlay = !this.isPlay;
        });
        If.create();
        if (!this.isPlay) {
            If.branchId(0);
            Image.create($r('app.media.app_icon'));
            Image.width(640);
            Image.height(64);
            Image.objectFit(ImageFit.Contain);
            Image.opacity(0.6);
        }
        If.pop();
        Column.pop();
        Stack.pop();
        Column.pop();
    }
    Item(img: Resource, num: Resource, callback: Function, parent = null) {
        Column.create();
        Column.width(60);
        Column.height(60);
        Column.alignItems(HorizontalAlign.Center);
        Image.create(img);
        Image.width(35);
        Image.height(35);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(e => {
            callback();
        });
        Text.create(num);
        Text.width(60);
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_E6FFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
    }
}
