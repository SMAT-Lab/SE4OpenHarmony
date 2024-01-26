interface PlayTitle_Params {
    playVideoModel?: VideoController;
    playSpeed?: number;
    loop?: boolean;
    customPopup?: boolean;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayTitle_" + ++__generate__Id;
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
import { PlayTitleDialog } from '../view/PlayTitleDialog';
import { VideoController } from '../controller/VideoController';
import { CommonConstants } from '../common/constants/CommonConstants';
import { PlayConstants } from '../common/constants/PlayConstants';
export class PlayTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.playVideoModel = undefined;
        this.__playSpeed = new ObservedPropertySimple(1, this, "playSpeed");
        this.__loop = new ObservedPropertySimple(false, this, "loop");
        this.__customPopup = new ObservedPropertySimple(false, this, "customPopup");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new PlayTitleDialog("2", this, {
                    playSpeed: this.__playSpeed
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: PlayConstants.PLAY_TITLE.DX, dy: PlayConstants.PLAY_TITLE.DY },
            gridCount: PlayConstants.PLAY_TITLE.GRID_COUNT,
            customStyle: false
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("playSpeed", this.watchSpeed);
    }
    updateWithValueParams(params: PlayTitle_Params) {
        if (params.playVideoModel !== undefined) {
            this.playVideoModel = params.playVideoModel;
        }
        if (params.playSpeed !== undefined) {
            this.playSpeed = params.playSpeed;
        }
        if (params.loop !== undefined) {
            this.loop = params.loop;
        }
        if (params.customPopup !== undefined) {
            this.customPopup = params.customPopup;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__playSpeed.aboutToBeDeleted();
        this.__loop.aboutToBeDeleted();
        this.__customPopup.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private playVideoModel: VideoController;
    private __playSpeed: ObservedPropertySimple<number>;
    get playSpeed() {
        return this.__playSpeed.get();
    }
    set playSpeed(newValue: number) {
        this.__playSpeed.set(newValue);
    }
    private __loop: ObservedPropertySimple<boolean>;
    get loop() {
        return this.__loop.get();
    }
    set loop(newValue: boolean) {
        this.__loop.set(newValue);
    }
    private __customPopup: ObservedPropertySimple<boolean>;
    get customPopup() {
        return this.__customPopup.get();
    }
    set customPopup(newValue: boolean) {
        this.__customPopup.set(newValue);
    }
    private dialogController: CustomDialogController;
    popupBuilder(parent = null) {
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Column.width(PlayConstants.PLAY_TITLE.POPUP.COLUMN_WIDTH);
        Column.height(PlayConstants.PLAY_TITLE.POPUP.COLUMN_HEIGHT);
        Row.create();
        Row.width(CommonConstants.FULL_PERCENT);
        Row.height(PlayConstants.PLAY_TITLE.POPUP.ROW_HEIGHT);
        Row.margin({ top: PlayConstants.PLAY_TITLE.POPUP.ROW_MARGIN_TOP });
        Row.onClick(() => {
            this.customPopup = !this.customPopup;
            this.dialogController.open();
        });
        Image.create($r('app.media.ic_speed'));
        Image.width($r('app.float.title_popup_image_size'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.margin({ left: $r('app.float.title_popup_image_left') });
        Text.create($r('app.string.speed_play'));
        Text.fontSize($r('app.float.title_popup_font_size'));
        Text.margin({ left: $r('app.float.title_popup_text_left') });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width(CommonConstants.FULL_PERCENT);
        Divider.create();
        Divider.strokeWidth(PlayConstants.PLAY_TITLE.POPUP.DIVIDER_STROKE_WIDTH);
        Divider.color($r('app.color.divider_color'));
        Divider.margin({
            left: $r('app.float.title_popup_divider_left'),
            right: PlayConstants.PLAY_TITLE.POPUP.DIVIDER_MARGIN_RIGHT
        });
        Row.pop();
        Row.create();
        Row.width(CommonConstants.FULL_PERCENT);
        Row.height(PlayConstants.PLAY_TITLE.POPUP.ROW_HEIGHT);
        Row.onClick(() => {
            this.loop = !this.loop;
            this.playVideoModel.setLoop();
            setTimeout(() => {
                this.customPopup = !this.customPopup;
            }, PlayConstants.PLAY_TITLE.POPUP.CLOSE_TIME);
        });
        Image.create(this.loop ? $r('app.media.ic_single_loop') : $r('app.media.ic_sequence_play'));
        Image.width($r('app.float.title_popup_image_size'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.margin({ left: $r('app.float.title_popup_image_left') });
        Text.create(this.loop ? $r('app.string.monolithic_cycle') : $r('app.string.continuous_playback'));
        Text.fontSize($r('app.float.title_popup_font_size'));
        Text.margin({ left: $r('app.float.title_popup_text_left') });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    aboutToAppear() {
        if (this.playVideoModel !== null) {
            this.playVideoModel.initTitleThis(this);
        }
    }
    watchSpeed() {
        this.playVideoModel.setSpeed(this.playSpeed);
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        Column.justifyContent(FlexAlign.Center);
        Row.create();
        Row.width(PlayConstants.PLAY_TITLE.ROW_WIDTH);
        Image.create($r('app.media.ic_back'));
        Image.width($r('app.float.title_image_size'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.onClick(() => {
            router.back();
        });
        Text.create($r('app.string.video_playback'));
        Text.fontColor(Color.White);
        Text.fontSize($r('app.float.title_font_size'));
        Text.margin({ left: PlayConstants.PLAY_TITLE.TEXT_MARGIN_LEFT });
        Text.layoutWeight(1);
        Text.pop();
        Image.create($r('app.media.ic_more'));
        Image.width($r('app.float.title_image_size'));
        Image.aspectRatio(CommonConstants.ASPECT_RATIO);
        Image.bindPopup(this.customPopup, {
            builder: { builder: this.popupBuilder.bind(this) },
            placement: Placement.BottomRight,
            popupColor: Color.White,
            enableArrow: false
        });
        Image.onClick(() => {
            this.customPopup = !this.customPopup;
        });
        Row.pop();
        Column.pop();
    }
}
