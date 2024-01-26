interface PlayTitleDialog_Params {
    playSpeed?: number;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayTitleDialog_" + ++__generate__Id;
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
import { CommonConstants } from '../common/constants/CommonConstants';
import { PlayConstants } from '../common/constants/PlayConstants';
export class PlayTitleDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__playSpeed = new SynchedPropertySimpleTwoWay(params.playSpeed, this, "playSpeed");
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayTitleDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__playSpeed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __playSpeed: SynchedPropertySimpleTwoWay<number>;
    get playSpeed() {
        return this.__playSpeed.get();
    }
    set playSpeed(newValue: number) {
        this.__playSpeed.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Column.create();
        Column.height(PlayConstants.PLAY_TITLE_DIALOG.COLUMN_WIDTH);
        Column.width(CommonConstants.FULL_PERCENT);
        Column.backgroundColor(Color.White);
        Row.create();
        Row.height(PlayConstants.PLAY_TITLE_DIALOG.ROW_HEIGHT);
        Row.width(PlayConstants.PLAY_TITLE_DIALOG.ROW_WIDTH);
        Text.create($r('app.string.speed_play'));
        Text.fontSize($r('app.float.title_font_size'));
        Text.pop();
        Row.pop();
        Column.create();
        Column.height(CommonConstants.FIFTY_PERCENT);
        Grid.create();
        Grid.columnsTemplate(PlayConstants.PLAY_TITLE_DIALOG.COLUMNS_TEMPLATE);
        Grid.rowsTemplate(PlayConstants.PLAY_TITLE_DIALOG.ROWS_TEMPLATE);
        Grid.columnsGap(PlayConstants.PLAY_TITLE_DIALOG.COLUMNS_GAP);
        Grid.rowsGap(PlayConstants.PLAY_TITLE_DIALOG.ROWS_GAP);
        Grid.width(PlayConstants.PLAY_TITLE_DIALOG.ROW_WIDTH);
        Grid.height(CommonConstants.FULL_PERCENT);
        ForEach.create("2", this, ObservedObject.GetRawObject(CommonConstants.SPEED_ARRAY), (item) => {
            GridItem.create();
            GridItem.onClick(() => {
                this.playSpeed = item.value;
                this.controller.close();
            });
            Text.create(item.text);
            Text.fontSize($r('app.float.title_dialog_font_size'));
            Text.backgroundColor($r('app.color.speed_text_color'));
            Text.width(CommonConstants.FULL_PERCENT);
            Text.height(CommonConstants.FULL_PERCENT);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius($r('app.float.text_border_radius'));
            Text.pop();
            GridItem.pop();
        }, item => JSON.stringify(item));
        ForEach.pop();
        Grid.pop();
        Column.pop();
        Row.create();
        Row.height(PlayConstants.PLAY_TITLE_DIALOG.ROW_HEIGHT);
        Row.width(PlayConstants.PLAY_TITLE_DIALOG.ROW_WIDTH);
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(() => {
            this.controller.close();
        });
        Text.create($r('app.string.cancel'));
        Text.fontColor($r('app.color.index_tab_selected_font_color'));
        Text.fontSize($r('app.float.title_dialog_font_size'));
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
