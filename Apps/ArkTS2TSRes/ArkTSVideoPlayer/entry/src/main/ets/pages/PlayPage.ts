interface PlayPage_Params {
    videoHeight?: string;
    videoWidth?: string;
    videoMargin?: string;
    videoPosition?: FlexAlign;
    playVideoModel?: VideoController;
    src?: string;
    index?: number;
    type?: number;
    status?: number;
    panOptionBright?: PanGestureOptions;
    panOptionVolume?: PanGestureOptions;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayPage_" + ++__generate__Id;
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
import router from '@ohos.router';
import { PlayTitle } from '../view/PlayTitle';
import { PlayPlayer } from '../view/PlayPlayer';
import { PlayControl } from '../view/PlayControl';
import { PlayProgress } from '../view/PlayProgress';
import { VideoController } from '../controller/VideoController';
import { CommonConstants } from '../common/constants/CommonConstants';
import { PlayConstants } from '../common/constants/PlayConstants';
class PlayPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoHeight = new ObservedPropertySimple(PlayConstants.PLAY_PAGE.PLAY_PLAYER_HEIGHT, this, "videoHeight");
        this.__videoWidth = new ObservedPropertySimple(CommonConstants.FULL_PERCENT, this, "videoWidth");
        this.__videoMargin = new ObservedPropertySimple(PlayConstants.PLAY_PAGE.MARGIN_ZERO, this, "videoMargin");
        this.__videoPosition = new ObservedPropertySimple(FlexAlign.Center, this, "videoPosition");
        this.playVideoModel = new VideoController();
        this.__src = new ObservedPropertySimple(router.getParams()['src'], this, "src");
        this.addProvidedVar("src", this.__src, false);
        this.__index = new ObservedPropertySimple(router.getParams()['index'], this, "index");
        this.addProvidedVar("index", this.__index, false);
        this.__type = new ObservedPropertySimple(router.getParams()['type'], this, "type");
        this.addProvidedVar("type", this.__type, false);
        this.__status = new ObservedPropertySimple(CommonConstants.STATUS_START, this, "status");
        this.addProvidedVar("status", this.__status, false);
        this.panOptionBright = new PanGestureOptions({ direction: PanDirection.Vertical });
        this.panOptionVolume = new PanGestureOptions({ direction: PanDirection.Horizontal });
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayPage_Params) {
        if (params.videoHeight !== undefined) {
            this.videoHeight = params.videoHeight;
        }
        if (params.videoWidth !== undefined) {
            this.videoWidth = params.videoWidth;
        }
        if (params.videoMargin !== undefined) {
            this.videoMargin = params.videoMargin;
        }
        if (params.videoPosition !== undefined) {
            this.videoPosition = params.videoPosition;
        }
        if (params.playVideoModel !== undefined) {
            this.playVideoModel = params.playVideoModel;
        }
        if (params.src !== undefined) {
            this.src = params.src;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.type !== undefined) {
            this.type = params.type;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.panOptionBright !== undefined) {
            this.panOptionBright = params.panOptionBright;
        }
        if (params.panOptionVolume !== undefined) {
            this.panOptionVolume = params.panOptionVolume;
        }
    }
    aboutToBeDeleted() {
        this.__videoHeight.aboutToBeDeleted();
        this.__videoWidth.aboutToBeDeleted();
        this.__videoMargin.aboutToBeDeleted();
        this.__videoPosition.aboutToBeDeleted();
        this.__src.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __videoHeight: ObservedPropertySimple<string>;
    get videoHeight() {
        return this.__videoHeight.get();
    }
    set videoHeight(newValue: string) {
        this.__videoHeight.set(newValue);
    }
    private __videoWidth: ObservedPropertySimple<string>;
    get videoWidth() {
        return this.__videoWidth.get();
    }
    set videoWidth(newValue: string) {
        this.__videoWidth.set(newValue);
    }
    private __videoMargin: ObservedPropertySimple<string>;
    get videoMargin() {
        return this.__videoMargin.get();
    }
    set videoMargin(newValue: string) {
        this.__videoMargin.set(newValue);
    }
    private __videoPosition: ObservedPropertySimple<FlexAlign>;
    get videoPosition() {
        return this.__videoPosition.get();
    }
    set videoPosition(newValue: FlexAlign) {
        this.__videoPosition.set(newValue);
    }
    private playVideoModel: VideoController;
    private __src: ObservedPropertySimple<string>;
    get src() {
        return this.__src.get();
    }
    set src(newValue: string) {
        this.__src.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __type: ObservedPropertySimple<number>;
    get type() {
        return this.__type.get();
    }
    set type(newValue: number) {
        this.__type.set(newValue);
    }
    private __status: ObservedPropertySimple<number>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: number) {
        this.__status.set(newValue);
    }
    private panOptionBright: PanGestureOptions;
    private panOptionVolume: PanGestureOptions;
    aboutToAppear() {
        this.playVideoModel.initPlayPageThis(this);
    }
    aboutToDisappear() {
        this.playVideoModel.release();
    }
    onPageHide() {
        this.status = CommonConstants.STATUS_PAUSE;
        this.playVideoModel.pause();
    }
    render() {
        Stack.create();
        Stack.height(CommonConstants.FULL_PERCENT);
        Stack.width(CommonConstants.FULL_PERCENT);
        Stack.backgroundColor(Color.Black);
        Column.create();
        Column.height(CommonConstants.FULL_PERCENT);
        Column.width(CommonConstants.FULL_PERCENT);
        Column.justifyContent(this.videoPosition);
        Column.zIndex(0);
        Column.create();
        Column.height(this.videoMargin);
        Column.pop();
        __Common__.create();
        __Common__.width(this.videoWidth);
        __Common__.height(this.videoHeight);
        let earlierCreatedChild_2: PlayPlayer = (this && this.findChildById) ? this.findChildById("2") as PlayPlayer : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new PlayPlayer("2", this, { playVideoModel: this.playVideoModel }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                playVideoModel: this.playVideoModel
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Column.pop();
        Column.create();
        Column.height(CommonConstants.FULL_PERCENT);
        Column.width(CommonConstants.FULL_PERCENT);
        Column.zIndex(1);
        __Common__.create();
        __Common__.width(CommonConstants.FULL_PERCENT);
        __Common__.height(PlayConstants.PLAY_PAGE.HEIGHT);
        let earlierCreatedChild_3: PlayTitle = (this && this.findChildById) ? this.findChildById("3") as PlayTitle : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new PlayTitle("3", this, { playVideoModel: this.playVideoModel }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                playVideoModel: this.playVideoModel
            });
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(PlayConstants.PLAY_PAGE.COLUMN_HEIGHT_ONE);
        Gesture.create(GesturePriority.Low);
        PanGesture.create(this.panOptionBright);
        PanGesture.onActionStart((event: GestureEvent) => {
            this.playVideoModel.onBrightActionStart(event);
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            this.playVideoModel.onBrightActionUpdate(event);
        });
        PanGesture.onActionEnd(() => {
            this.playVideoModel.onActionEnd();
        });
        PanGesture.pop();
        Gesture.pop();
        Column.pop();
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(PlayConstants.PLAY_PAGE.PLAY_PLAYER_HEIGHT);
        Column.pop();
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(PlayConstants.PLAY_PAGE.COLUMN_HEIGHT_TWO);
        Gesture.create(GesturePriority.Low);
        PanGesture.create(this.panOptionVolume);
        PanGesture.onActionStart((event: GestureEvent) => {
            this.playVideoModel.onVolumeActionStart(event);
        });
        PanGesture.onActionUpdate((event: GestureEvent) => {
            this.playVideoModel.onVolumeActionUpdate(event);
        });
        PanGesture.onActionEnd(() => {
            this.playVideoModel.onActionEnd();
        });
        PanGesture.pop();
        Gesture.pop();
        Column.pop();
        __Common__.create();
        __Common__.width(CommonConstants.FULL_PERCENT);
        __Common__.height(PlayConstants.PLAY_PAGE.HEIGHT);
        let earlierCreatedChild_4: PlayControl = (this && this.findChildById) ? this.findChildById("4") as PlayControl : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new PlayControl("4", this, { playVideoModel: this.playVideoModel }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                playVideoModel: this.playVideoModel
            });
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.width(CommonConstants.FULL_PERCENT);
        __Common__.height(PlayConstants.PLAY_PAGE.PLAY_PROGRESS_HEIGHT);
        let earlierCreatedChild_5: PlayProgress = (this && this.findChildById) ? this.findChildById("5") as PlayProgress : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new PlayProgress("5", this, { playVideoModel: this.playVideoModel }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                playVideoModel: this.playVideoModel
            });
            View.create(earlierCreatedChild_5);
        }
        __Common__.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new PlayPage("1", undefined, {}));
