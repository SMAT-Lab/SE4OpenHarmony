interface SearchPlayMusicComponent_Params {
    audioInfo?: AudioInfo;
    avPlayerModel?: AVPlayerModel;
    isCollect?: boolean;
    isPlay?: boolean;
    isInit?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchPlayMusicComponent_" + ++__generate__Id;
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
import Logger from '../utils/Logger';
import { AudioInfo } from '../appsampled/data/SearchResult';
import AVPlayerModel from '../model/AVPlayerModel';
import Constant from '../utils/Constant';
const TAG: string = '[SearchPlayMusicComponent]';
export default class SearchPlayMusicComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioInfo = undefined;
        this.avPlayerModel = new AVPlayerModel(getContext(this));
        this.__isCollect = new ObservedPropertySimple(false, this, "isCollect");
        this.__isPlay = new ObservedPropertySimple(false, this, "isPlay");
        this.__isInit = new ObservedPropertySimple(false, this, "isInit");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchPlayMusicComponent_Params) {
        if (params.audioInfo !== undefined) {
            this.audioInfo = params.audioInfo;
        }
        if (params.avPlayerModel !== undefined) {
            this.avPlayerModel = params.avPlayerModel;
        }
        if (params.isCollect !== undefined) {
            this.isCollect = params.isCollect;
        }
        if (params.isPlay !== undefined) {
            this.isPlay = params.isPlay;
        }
        if (params.isInit !== undefined) {
            this.isInit = params.isInit;
        }
    }
    aboutToBeDeleted() {
        this.__isCollect.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__isInit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioInfo?: AudioInfo;
    private avPlayerModel: AVPlayerModel;
    private __isCollect: ObservedPropertySimple<boolean>;
    get isCollect() {
        return this.__isCollect.get();
    }
    set isCollect(newValue: boolean) {
        this.__isCollect.set(newValue);
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
        emitter.on({ eventId: Constant.EVENT_PAUSED_AUDIO }, data => {
            Logger.info(TAG, `emitter on data = ${JSON.stringify(data)}`);
            if (data) {
                // 拿出传过来的ID
                let audioId: number = data.data?.audioId;
                Logger.info(TAG, `emitter on data audioId= ${JSON.stringify(audioId)}`);
                // 不与当前ID相同则暂停，规避自身也会暂停的问题
                if (audioId && audioId !== this.audioInfo?.audioId) {
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
        Row.create();
        Row.height(90);
        Row.width('100%');
        // 音乐头像
        Stack.create();
        // 音乐头像
        Stack.id(`musicID_${this.audioInfo?.audioId}`);
        // 音乐头像
        Stack.width(74);
        // 音乐头像
        Stack.height(74);
        // 音乐头像
        Stack.margin({ right: 12 });
        // 音乐头像
        Stack.alignContent(Alignment.Center);
        // 音乐头像
        Stack.onClick(e => {
            // 播放的音乐点击则暂停
            if (this.isPlay) {
                this.avPlayerModel.paused();
            }
            else {
                // 播放当前音乐时发送事件暂停其他音乐播放事件
                emitter.emit({ eventId: Constant.EVENT_PAUSED_AUDIO }, {
                    data: {
                        'audioId': this.audioInfo?.audioId
                    }
                });
                // 第一次点击播放先初始化音乐
                if (!this.isInit) {
                    this.avPlayerModel.avPlayerFdSrcDemo(this.audioInfo?.audio);
                    this.isInit = !this.isInit;
                }
                else {
                    // 初始化过的直接播放
                    this.avPlayerModel.play();
                }
            }
            this.isPlay = !this.isPlay;
        });
        Image.create($r('app.media.app_icon'));
        Image.width(74);
        Image.height(74);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(10);
        Image.create(this.isPlay ? $r('app.media.app_icon') : $r('app.media.app_icon'));
        Image.width(26);
        Image.height(26);
        Image.objectFit(ImageFit.Contain);
        // 音乐头像
        Stack.pop();
        // 音乐信息
        Column.create({ space: 2 });
        // 音乐信息
        Column.height(70);
        // 音乐信息
        Column.alignItems(HorizontalAlign.Start);
        Row.create({ space: 2 });
        Row.height(30);
        Image.create($r('app.media.app_icon'));
        Image.width(18);
        Image.height(18);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(10);
        Text.create(this.audioInfo?.audioName);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Text.create(this.audioInfo?.audioAuthorName);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.create({ space: 5 });
        Row.height(20);
        Text.create(this.audioInfo?.audioTime);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create();
        Text.width(2);
        Text.height(2);
        Text.backgroundColor($r('app.color.COLOR_CCFFFFFF'));
        Text.borderRadius(1);
        Text.pop();
        Text.create(this.audioInfo?.audioNum);
        Text.height(18);
        Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(14);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        // 音乐信息
        Column.pop();
        Blank.create();
        Blank.pop();
        Column.create();
        Column.width(40);
        Column.height(40);
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Column.onClick(e => {
            this.isCollect = !this.isCollect;
        });
        Image.create(this.isCollect ? $r('app.media.app_icon') : $r('app.media.app_icon'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ right: 12 });
        Column.pop();
        Row.pop();
    }
}
