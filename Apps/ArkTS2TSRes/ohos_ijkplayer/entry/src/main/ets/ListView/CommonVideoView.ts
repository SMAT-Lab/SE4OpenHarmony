interface CommonVideoView_Params {
    videoSource?: VideoSource | null;
    pic?;
    xComponentContext?: object | null;
    player?: VideoPlayer;
    isInit?: boolean;
    xComponentId?;
    isPlaying?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommonVideoView_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { PlayerListener } from './PlayerListener';
import { VideoPlayer } from './VideoPlayer';
import { VideoSource } from './VideoSource';
class PlayerListenerClass implements PlayerListener {
    onPlay(): void {
    }
    onStop(): void {
    }
    onPause(): void {
    }
    onError(): void {
    }
    onUpdate(current: number, duration: number): void {
    }
    onComplete(): void {
    }
}
export class CommonVideoView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.videoSource = null;
        this.pic = $r('app.media.icon');
        this.xComponentContext = null;
        this.player = VideoPlayer.getInstance();
        this.isInit = false;
        this.xComponentId = "xid" + Math.random();
        this.__isPlaying = new ObservedPropertySimple(false, this, "isPlaying");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CommonVideoView_Params) {
        if (params.videoSource !== undefined) {
            this.videoSource = params.videoSource;
        }
        if (params.pic !== undefined) {
            this.pic = params.pic;
        }
        if (params.xComponentContext !== undefined) {
            this.xComponentContext = params.xComponentContext;
        }
        if (params.player !== undefined) {
            this.player = params.player;
        }
        if (params.isInit !== undefined) {
            this.isInit = params.isInit;
        }
        if (params.xComponentId !== undefined) {
            this.xComponentId = params.xComponentId;
        }
        if (params.isPlaying !== undefined) {
            this.isPlaying = params.isPlaying;
        }
    }
    aboutToBeDeleted() {
        this.__isPlaying.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private videoSource: VideoSource | null;
    private pic;
    private xComponentContext: object | null;
    private player: VideoPlayer;
    private isInit: boolean;
    private xComponentId;
    private __isPlaying: ObservedPropertySimple<boolean>;
    get isPlaying() {
        return this.__isPlaying.get();
    }
    set isPlaying(newValue: boolean) {
        this.__isPlaying.set(newValue);
    }
    render() {
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        XComponent.create({
            id: this.xComponentId,
            type: 'surface',
            libraryname: 'ijkplayer_napi'
        });
        XComponent.onLoad((context) => {
            if (context) {
                this.xComponentContext = context;
            }
        });
        XComponent.onDestroy(() => {
        });
        XComponent.width('100%');
        XComponent.height('100%');
        XComponent.onClick(() => {
            this.stop();
        });
        Image.create(this.pic);
        Image.width('100%');
        Image.height('100%');
        Image.visibility(this.isPlaying ? Visibility.None : Visibility.Visible);
        Image.onClick(() => {
            this.play();
        });
        Image.create($r('app.media.icon_replay'));
        Image.width(45);
        Image.height(45);
        Image.visibility(this.isPlaying ? Visibility.None : Visibility.Visible);
        Image.onClick(() => {
            this.play();
        });
        Stack.pop();
    }
    initPlayer(): void {
        this.player = VideoPlayer.getInstance();
        let listener = new PlayerListenerClass();
        this.player.setContext(this.xComponentContext!)
            .setVideoSource(this.videoSource!)
            .setListener(listener);
    }
    play(): void {
        if (!this.isInit || this.player == null) {
            this.isInit = true;
            this.initPlayer();
        }
        this.isPlaying = true;
        this.player.play();
    }
    stop(): void {
        if (this.player != null) {
            this.player.pause();
        }
        this.isPlaying = false;
    }
}
