interface IjkVideoPlayer_Params {
    mIVideoPlayer?: IVideoPlayer | undefined;
    videoId?: string;
    xComponentId?;
    videoInit?: (mIVideoPlayer: IVideoPlayer, xid: string) => void;
    isVisible?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IjkVideoPlayer_" + ++__generate__Id;
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
import { LogUtils } from '../utils/LogUtils';
import { IVideoPlayer } from './IVideoPlayer';
import { IjkPlayerControl } from './IjkPlayerControl';
export class IjkVideoPlayer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mIVideoPlayer = undefined;
        this.videoId = 'videoId' + Math.random();
        this.xComponentId = 'xid' + Math.random();
        this.videoInit = (mIVideoPlayer: IVideoPlayer, xid: string) => {
        };
        this.__isVisible = new SynchedPropertySimpleTwoWay(params.isVisible, this, "isVisible");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IjkVideoPlayer_Params) {
        if (params.mIVideoPlayer !== undefined) {
            this.mIVideoPlayer = params.mIVideoPlayer;
        }
        if (params.videoId !== undefined) {
            this.videoId = params.videoId;
        }
        if (params.xComponentId !== undefined) {
            this.xComponentId = params.xComponentId;
        }
        if (params.videoInit !== undefined) {
            this.videoInit = params.videoInit;
        }
    }
    aboutToBeDeleted() {
        this.__isVisible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mIVideoPlayer: IVideoPlayer | undefined;
    private videoId: string;
    private xComponentId;
    public videoInit: (mIVideoPlayer: IVideoPlayer, xid: string) => void;
    private __isVisible: SynchedPropertySimpleTwoWay<Visibility>;
    get isVisible() {
        return this.__isVisible.get();
    }
    set isVisible(newValue: Visibility) {
        this.__isVisible.set(newValue);
    }
    render() {
        Stack.create();
        Stack.id(this.videoId);
        Stack.visibility(this.isVisible);
        XComponent.create({
            id: this.xComponentId,
            type: 'surface',
            libraryname: 'ijkplayer_napi'
        });
        XComponent.onLoad((context: object) => {
            LogUtils.getInstance().LOGI("ijkplayer_napi onload");
            this.initDelayPlay(context);
        });
        XComponent.onDestroy(() => {
        });
        XComponent.width("100%");
        XComponent.height("100%");
        Stack.pop();
    }
    private initDelayPlay(context: object) {
        LogUtils.getInstance().LOGI("initDelayPlay create IjkPlayerControl");
        LogUtils.getInstance().LOGI("initDelayPlay create IjkPlayerControl videoId: " + this.videoId);
        LogUtils.getInstance().LOGI("initDelayPlay create IjkPlayerControl xComponentId: " + this.xComponentId);
        this.mIVideoPlayer = new IjkPlayerControl();
        this.mIVideoPlayer.setContext(context);
        this.mIVideoPlayer.setVideoId(this.videoId);
        this.mIVideoPlayer.setXComponentId(this.xComponentId);
        this.videoInit(this.mIVideoPlayer, this.xComponentId);
        LogUtils.getInstance().LOGI("initDelayPlay end");
    }
}
