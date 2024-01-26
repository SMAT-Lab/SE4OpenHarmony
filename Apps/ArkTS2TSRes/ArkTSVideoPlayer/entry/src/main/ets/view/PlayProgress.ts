interface PlayProgress_Params {
    playVideoModel?: VideoController;
    currentTime?: string;
    totalTime?: string;
    progressVal?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayProgress_" + ++__generate__Id;
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
export class PlayProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.playVideoModel = undefined;
        this.__currentTime = new ObservedPropertySimple(PlayConstants.PLAY_PROGRESS.CURRENT_TIME, this, "currentTime");
        this.__totalTime = new ObservedPropertySimple(PlayConstants.PLAY_PROGRESS.TOTAL_TIME, this, "totalTime");
        this.__progressVal = new ObservedPropertySimple(PlayConstants.PLAY_PROGRESS.PROGRESS_VAL, this, "progressVal");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayProgress_Params) {
        if (params.playVideoModel !== undefined) {
            this.playVideoModel = params.playVideoModel;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
        if (params.totalTime !== undefined) {
            this.totalTime = params.totalTime;
        }
        if (params.progressVal !== undefined) {
            this.progressVal = params.progressVal;
        }
    }
    aboutToBeDeleted() {
        this.__currentTime.aboutToBeDeleted();
        this.__totalTime.aboutToBeDeleted();
        this.__progressVal.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private playVideoModel: VideoController;
    private __currentTime: ObservedPropertySimple<string>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: string) {
        this.__currentTime.set(newValue);
    }
    private __totalTime: ObservedPropertySimple<string>;
    get totalTime() {
        return this.__totalTime.get();
    }
    set totalTime(newValue: string) {
        this.__totalTime.set(newValue);
    }
    private __progressVal: ObservedPropertySimple<number>;
    get progressVal() {
        return this.__progressVal.get();
    }
    set progressVal(newValue: number) {
        this.__progressVal.set(newValue);
    }
    aboutToAppear() {
        if (this.playVideoModel !== null) {
            this.playVideoModel.initProgressThis(this);
        }
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        Column.justifyContent(FlexAlign.Center);
        Row.create();
        Row.width(PlayConstants.PLAY_PROGRESS.ROW_WIDTH);
        Text.create(this.currentTime);
        Text.fontSize($r('app.float.slider_font_size'));
        Text.fontColor(Color.White);
        Text.pop();
        Slider.create({
            value: this.progressVal,
            step: PlayConstants.PLAY_PROGRESS.STEP,
            style: SliderStyle.OutSet
        });
        Slider.blockColor(Color.White);
        Slider.trackColor($r('app.color.track_color'));
        Slider.selectedColor(Color.White);
        Slider.trackThickness(PlayConstants.PLAY_PROGRESS.TRACK_THICKNESS);
        Slider.layoutWeight(1);
        Slider.margin({ left: PlayConstants.PLAY_PROGRESS.MARGIN_LEFT });
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.playVideoModel.setSeekTime(value, mode);
        });
        Text.create(this.totalTime);
        Text.fontSize($r('app.float.slider_font_size'));
        Text.fontColor(Color.White);
        Text.margin({ left: PlayConstants.PLAY_PROGRESS.MARGIN_LEFT });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
