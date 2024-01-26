interface AvVideoPlayer_Params {
    mIVideoPlayer?: IVideoPlayer | undefined;
    videoId?;
    xComponentId?;
    videoInit?: (mIVideoPlayer: IVideoPlayer, xid: string) => void;
    xComponentController?;
    surfaceID?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AvVideoPlayer_" + ++__generate__Id;
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
import { AvPlayerControl } from './AvPlayerControl';
export class AvVideoPlayer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mIVideoPlayer = undefined;
        this.videoId = 'videoId' + Math.random();
        this.xComponentId = 'xid' + Math.random();
        this.videoInit = (mIVideoPlayer: IVideoPlayer, xid: string) => {
        };
        this.xComponentController = new XComponentController();
        this.surfaceID = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AvVideoPlayer_Params) {
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
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.surfaceID !== undefined) {
            this.surfaceID = params.surfaceID;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private mIVideoPlayer: IVideoPlayer | undefined;
    private videoId;
    private xComponentId;
    public videoInit: (mIVideoPlayer: IVideoPlayer, xid: string) => void;
    private xComponentController;
    private surfaceID: string;
    render() {
        Stack.create();
        Stack.id(this.videoId);
        XComponent.create({
            id: this.xComponentId,
            type: 'surface',
            libraryname: '',
            controller: this.xComponentController
        });
        XComponent.onLoad(async (context: object) => {
            this.surfaceID = this.xComponentController.getXComponentSurfaceId();
            this.initDelayPlay(context);
        });
        XComponent.onDestroy(() => {
        });
        XComponent.width('100%');
        XComponent.height('100%');
        Stack.pop();
    }
    private initDelayPlay(context: object) {
        LogUtils.getInstance().LOGI('initDelayPlay create AvVideoPlayer videoId: ' + this.videoId);
        LogUtils.getInstance().LOGI('initDelayPlay create AvVideoPlayer xComponentId: ' + this.xComponentId);
        this.mIVideoPlayer = new AvPlayerControl();
        this.mIVideoPlayer.setContext(context);
        this.mIVideoPlayer.setVideoId(this.videoId);
        this.mIVideoPlayer.setXComponentId(this.xComponentId);
        this.mIVideoPlayer.surfaceID = this.surfaceID;
        LogUtils.getInstance().LOGI('initDelayPlay create AvVideoPlayer surfaceID: ' + this.surfaceID);
        this.videoInit(this.mIVideoPlayer, this.xComponentId);
    }
}
