interface SearchPlayVideoComponent_Params {
    videoDetailInfo?: VideoDetailInfo;
    xComponentController?: XComponentController;
    avPlayerModel?: AVPlayerModel;
    surfaceId?: string;
    isPlay?: boolean;
    isInit?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchPlayVideoComponent_" + ++__generate__Id;
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
import emitter from '@ohos.events.emitter';
import { VideoDetailInfo } from '../appsampled/data/SearchResult';
import AVPlayerModel from '../model/AVPlayerModel';
import Constant from '../utils/Constant';
import Logger from '../utils/Logger';
const TAG: string = '[SearchPlayVideoComponent]';
export default class SearchPlayVideoComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.videoDetailInfo = undefined;
        this.xComponentController = new XComponentController();
        this.avPlayerModel = new AVPlayerModel(getContext(this));
        this.__surfaceId = new ObservedPropertySimple('-1', this, "surfaceId");
        this.__isPlay = new ObservedPropertySimple(false, this, "isPlay");
        this.__isInit = new ObservedPropertySimple(false, this, "isInit");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchPlayVideoComponent_Params) {
        if (params.videoDetailInfo !== undefined) {
            this.videoDetailInfo = params.videoDetailInfo;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.avPlayerModel !== undefined) {
            this.avPlayerModel = params.avPlayerModel;
        }
        if (params.surfaceId !== undefined) {
            this.surfaceId = params.surfaceId;
        }
        if (params.isPlay !== undefined) {
            this.isPlay = params.isPlay;
        }
        if (params.isInit !== undefined) {
            this.isInit = params.isInit;
        }
    }
    aboutToBeDeleted() {
        this.__surfaceId.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__isInit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private videoDetailInfo?: VideoDetailInfo;
    private xComponentController: XComponentController;
    private avPlayerModel: AVPlayerModel;
    private __surfaceId: ObservedPropertySimple<string>;
    get surfaceId() {
        return this.__surfaceId.get();
    }
    set surfaceId(newValue: string) {
        this.__surfaceId.set(newValue);
    }
    private __isPlay: ObservedPropertySimple<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private __isInit: ObservedPropertySimple<boolean>;
    get isInit() {
        return this.__isInit.get();
    }
    set isInit(newValue: boolean) {
        this.__isInit.set(newValue);
    }
    aboutToAppear() {
        // 监听暂停事件，当有其他音乐播放时当前播放
        emitter.on({ eventId: Constant.EVENT_PAUSED_VIDEO }, data => {
            Logger.info(TAG, `emitter on data = ${JSON.stringify(data)}`);
            if (data) {
                // 拿出传过来的ID
                let videoDetailId: number = data.data?.videoDetailId;
                Logger.info(TAG, `emitter on data videoId= ${JSON.stringify(videoDetailId)}`);
                // 不与当前ID相同则暂停，规避自身也会暂停的问题
                if (videoDetailId && videoDetailId !== this.videoDetailInfo?.videoDetailId) {
                    Logger.info(TAG, `emitter on data this.isPlay= ${JSON.stringify(this.isPlay)}`);
                    if (this.isPlay) {
                        this.avPlayerModel.paused();
                        this.isPlay = false;
                    }
                }
            }
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height(550);
        Column.backgroundColor($r('app.color.COLOR_151724'));
        // 作者信息
        Row.create({ space: 8 });
        // 作者信息
        Row.width('100%');
        // 作者信息
        Row.height(70);
        Image.create($r('app.media.app_icon'));
        Image.width(48);
        Image.height(48);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(24);
        Column.create({ space: 5 });
        Column.height(80);
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.videoDetailInfo?.videoDetailAuthorName);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.videoDetailInfo?.videoDetailTime);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.app_icon'));
        Image.width(22);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ right: 5 });
        // 作者信息
        Row.pop();
        // 视频Title
        Column.create({ space: 5 });
        // 视频Title
        Column.width('100%');
        // 视频Title
        Column.height(60);
        // 视频Title
        Column.justifyContent(FlexAlign.Center);
        // 视频Title
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.videoDetailInfo?.videoDetailTitle);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Text.create(this.videoDetailInfo?.videoDetailLabel);
        Text.fontColor($r('app.color.COLOR_EEC934'));
        Text.fontSize(18);
        Text.maxLines(3);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        // 视频Title
        Column.pop();
        // 视频
        Stack.create();
        // 视频
        Stack.width('100%');
        // 视频
        Stack.height(300);
        // 视频
        Stack.alignContent(Alignment.BottomEnd);
        XComponent.create({
            id: 'xComponentId',
            type: 'surface',
            controller: this.xComponentController
        });
        XComponent.onLoad(() => {
            Logger.info(TAG, 'onLoad is called');
            this.xComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 });
            this.surfaceId = this.xComponentController.getXComponentSurfaceId();
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`);
        });
        XComponent.height('100%');
        XComponent.width('100%');
        XComponent.borderRadius(14);
        Row.create();
        Row.width(56);
        Row.height(56);
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(e => {
            Logger.info(TAG, `onClick this.isPlay= ${JSON.stringify(this.isPlay)}`);
            // 播放的视频点击则暂停
            if (this.isPlay) {
                this.avPlayerModel.paused();
            }
            else {
                // 播放当前视频时发送事件暂停其他视频播放事件
                emitter.emit({ eventId: Constant.EVENT_PAUSED_VIDEO }, {
                    data: {
                        'videoDetailId': this.videoDetailInfo?.videoDetailId
                    }
                });
                // 第一次点击播放先初始化音乐
                if (!this.isInit) {
                    this.avPlayerModel.avPlayerFdSrcDemo(this.videoDetailInfo?.videoDetail, this.surfaceId);
                    this.isInit = !this.isInit;
                }
                else {
                    Logger.info(TAG, `onClick Play= ${JSON.stringify(this.isInit)}`);
                    // 初始化过的直接播放
                    this.avPlayerModel.play();
                }
            }
            this.isPlay = !this.isPlay;
        });
        Image.create(this.isPlay ? $r('app.media.app_icon') : $r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        // 视频
        Stack.pop();
        // 视频点赞等信息
        Row.create();
        // 视频点赞等信息
        Row.width('100%');
        // 视频点赞等信息
        Row.height(50);
        // 视频点赞等信息
        Row.padding({ left: 10, right: 10 });
        // 视频点赞等信息
        Row.justifyContent(FlexAlign.SpaceBetween);
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailLike, this);
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailComment, this);
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailCollect, this);
        this.Item($r('app.media.app_icon'), this.videoDetailInfo?.videoDetailTransmit, this);
        // 视频点赞等信息
        Row.pop();
        // 视频具体评论信息
        Row.create({ space: 8 });
        // 视频具体评论信息
        Row.width('100%');
        // 视频具体评论信息
        Row.height(70);
        // 视频具体评论信息
        Row.padding({ left: 10, right: 10 });
        Image.create($r('app.media.app_icon'));
        Image.width(36);
        Image.height(36);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(18);
        Column.create({ space: 5 });
        Column.height(60);
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.videoDetailInfo?.commenterName);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.videoDetailInfo?.commenterContent);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Column.width(48);
        Column.height(48);
        Column.justifyContent(FlexAlign.Center);
        Image.create($r('app.media.app_icon'));
        Image.width(22);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Text.create(this.videoDetailInfo?.commenterLike);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.pop();
        // 视频具体评论信息
        Row.pop();
        Column.pop();
    }
    Item(img: Resource, num: string, parent = null) {
        Row.create({ space: 8 });
        Row.width(64);
        Row.height(48);
        Row.justifyContent(FlexAlign.Center);
        Image.create($r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Text.create(num);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
    }
}
