interface PlayControl_Params {
    playVideoModel?: VideoController;
    status?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayControl_" + ++__generate__Id;
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
export class PlayControl extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.playVideoModel = undefined;
        this.__status = this.initializeConsume("status", "status");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayControl_Params) {
        if (params.playVideoModel !== undefined) {
            this.playVideoModel = params.playVideoModel;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private playVideoModel: VideoController;
    private __status: SynchedPropertySimpleTwoWay<number>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: number) {
        this.__status.set(newValue);
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        Column.justifyContent(FlexAlign.Center);
        Row.create();
        Row.width(PlayConstants.PLAY_CONTROL.ROW_WIDTH);
        Image.create($r('app.media.ic_previous'));
        Image.width($r('app.float.control_image_width'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.onClick(async () => {
            this.playVideoModel.previousVideo();
            this.status = CommonConstants.STATUS_START;
        });
        Column.create();
        Column.layoutWeight(1);
        Image.create(this.status === CommonConstants.STATUS_START ?
            $r('app.media.ic_pause') : $r('app.media.ic_play'));
        Image.width($r('app.float.control_image_width'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.onClick(async () => {
            let curStatus = (this.playVideoModel.getStatus() === CommonConstants.STATUS_START);
            this.status = curStatus ? CommonConstants.STATUS_PAUSE : CommonConstants.STATUS_START;
            this.playVideoModel.switchPlayOrPause();
        });
        Column.pop();
        Image.create($r('app.media.ic_next'));
        Image.width($r('app.float.control_image_width'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.onClick(() => {
            this.playVideoModel.nextVideo();
            this.status = CommonConstants.STATUS_START;
        });
        Row.pop();
        Column.pop();
    }
}