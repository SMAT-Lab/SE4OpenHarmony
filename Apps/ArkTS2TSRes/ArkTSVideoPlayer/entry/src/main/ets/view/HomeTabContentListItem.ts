interface HomeTabContentListItem_Params {
    item?: VideoBean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomeTabContentListItem_" + ++__generate__Id;
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
import { VideoBean } from '../common/bean/VideoBean';
import { HomeConstants } from '../common/constants/HomeConstants';
import { CommonConstants } from '../common/constants/CommonConstants';
export class HomeTabContentListItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.item = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeTabContentListItem_Params) {
        if (params.item !== undefined) {
            this.item = params.item;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private item: VideoBean;
    render() {
        Row.create();
        Row.width(CommonConstants.FULL_PERCENT);
        Row.height(HomeConstants.HOME_TAB_LIST.LIST_ITEM_ROW_HEIGHT);
        Image.create(this.item.pixelMap === undefined ? $r('app.media.ic_internet') : this.item.pixelMap);
        Image.height(HomeConstants.HOME_TAB_LIST.IMAGE_HEIGHT);
        Image.width(HomeConstants.HOME_TAB_LIST.IMAGE_WIDTH);
        Image.margin({ left: $r('app.float.item_image_margin_left') });
        Image.borderRadius($r('app.float.image_border_radius'));
        Column.create();
        Column.height(CommonConstants.FULL_PERCENT);
        Column.width(HomeConstants.HOME_TAB_LIST.LIST_ITEM_ROW_COLUMN_WIDTH);
        Column.create();
        Column.height(CommonConstants.FULL_PERCENT);
        Column.width(CommonConstants.FULL_PERCENT);
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.item.name);
        Text.fontSize($r('app.float.item_font_size'));
        Text.margin({
            left: $r('app.float.item_text_margin_left'),
            right: $r('app.float.item_text_margin_right')
        });
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(HomeConstants.HOME_TAB_LIST.DIVIDER_STROKE_WIDTH);
        Divider.color($r('app.color.divider_color'));
        Divider.margin({
            left: $r('app.float.item_divider_margin_left'),
            right: $r('app.float.item_divider_margin_right')
        });
        Column.pop();
        Row.pop();
    }
}
