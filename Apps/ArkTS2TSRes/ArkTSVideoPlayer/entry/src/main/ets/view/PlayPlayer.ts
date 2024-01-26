interface PlayPlayer_Params {
    playVideoModel?: VideoController;
    src?: string;
    index?: number;
    volume?: number;
    volumeShow?: boolean;
    bright?: number;
    brightShow?: boolean;
    xComponentController?;
    surfaceID?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayPlayer_" + ++__generate__Id;
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
import { VideoController } from '../controller/VideoController';
import { CommonConstants } from '../common/constants/CommonConstants';
import { PlayConstants } from '../common/constants/PlayConstants';
export class PlayPlayer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.playVideoModel = undefined;
        this.__src = this.initializeConsume("src", "src");
        this.__index = this.initializeConsume("index", "index");
        this.__volume = new ObservedPropertySimple(PlayConstants.PLAY_PAGE.VOLUME, this, "volume");
        this.__volumeShow = new ObservedPropertySimple(PlayConstants.PLAY_PAGE.VOLUME_SHOW, this, "volumeShow");
        this.__bright = new ObservedPropertySimple(PlayConstants.PLAY_PAGE.BRIGHT, this, "bright");
        this.__brightShow = new ObservedPropertySimple(PlayConstants.PLAY_PAGE.BRIGHT_SHOW, this, "brightShow");
        this.xComponentController = undefined;
        this.surfaceID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayPlayer_Params) {
        if (params.playVideoModel !== undefined) {
            this.playVideoModel = params.playVideoModel;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.volumeShow !== undefined) {
            this.volumeShow = params.volumeShow;
        }
        if (params.bright !== undefined) {
            this.bright = params.bright;
        }
        if (params.brightShow !== undefined) {
            this.brightShow = params.brightShow;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.surfaceID !== undefined) {
            this.surfaceID = params.surfaceID;
        }
    }
    aboutToBeDeleted() {
        this.__src.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__volumeShow.aboutToBeDeleted();
        this.__bright.aboutToBeDeleted();
        this.__brightShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private playVideoModel: VideoController;
    private __src: SynchedPropertySimpleTwoWay<string>;
    get src() {
        return this.__src.get();
    }
    set src(newValue: string) {
        this.__src.set(newValue);
    }
    private __index: SynchedPropertySimpleTwoWay<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __volume: ObservedPropertySimple<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __volumeShow: ObservedPropertySimple<boolean>;
    get volumeShow() {
        return this.__volumeShow.get();
    }
    set volumeShow(newValue: boolean) {
        this.__volumeShow.set(newValue);
    }
    private __bright: ObservedPropertySimple<number>;
    get bright() {
        return this.__bright.get();
    }
    set bright(newValue: number) {
        this.__bright.set(newValue);
    }
    private __brightShow: ObservedPropertySimple<boolean>;
    get brightShow() {
        return this.__brightShow.get();
    }
    set brightShow(newValue: boolean) {
        this.__brightShow.set(newValue);
    }
    private xComponentController;
    private surfaceID: number;
    aboutToAppear() {
        if (this.playVideoModel !== null) {
            this.playVideoModel.initPlayerThis(this);
        }
        this.xComponentController = new XComponentController();
    }
    render() {
        Stack.create();
        Stack.width(CommonConstants.FULL_PERCENT);
        Stack.height(CommonConstants.FULL_PERCENT);
        XComponent.create({
            id: PlayConstants.PLAY_PLAYER.ID,
            type: PlayConstants.PLAY_PLAYER.TYPE,
            libraryname: PlayConstants.PLAY_PLAYER.LIBRARY_NAME,
            controller: this.xComponentController
        });
        XComponent.onLoad(async () => {
            this.xComponentController.setXComponentSurfaceSize({
                surfaceWidth: PlayConstants.PLAY_PLAYER.SURFACE_WIDTH,
                surfaceHeight: PlayConstants.PLAY_PLAYER.SURFACE_HEIGHT
            });
            this.surfaceID = this.xComponentController.getXComponentSurfaceId();
            this.playVideoModel.firstPlay(this.index, this.src, this.surfaceID);
        });
        XComponent.width(CommonConstants.FULL_PERCENT);
        XComponent.height(CommonConstants.FULL_PERCENT);
        Stack.create();
        Stack.width(PlayConstants.PLAY_PLAYER.STACK_WIDTH);
        Stack.aspectRatio(CommonConstants.ASPECT_RATIO);
        Stack.visibility(this.volumeShow ? Visibility.Visible : Visibility.Hidden);
        Progress.create({
            value: Math.floor(this.volume * CommonConstants.ONE_HUNDRED),
            type: ProgressType.Ring
        });
        Progress.width(CommonConstants.FULL_PERCENT);
        Progress.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.create($r('app.media.ic_volume'));
        Image.width(PlayConstants.PLAY_PLAYER.IMAGE_WIDTH);
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Stack.pop();
        Stack.create();
        Stack.width(PlayConstants.PLAY_PLAYER.STACK_WIDTH);
        Stack.aspectRatio(CommonConstants.ASPECT_RATIO);
        Stack.visibility(this.brightShow ? Visibility.Visible : Visibility.Hidden);
        Progress.create({
            value: Math.floor(this.bright * CommonConstants.ONE_HUNDRED),
            type: ProgressType.Ring
        });
        Progress.width(CommonConstants.FULL_PERCENT);
        Progress.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.create($r('app.media.ic_brightness'));
        Image.width(PlayConstants.PLAY_PLAYER.IMAGE_WIDTH);
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Stack.pop();
        Stack.pop();
    }
}
