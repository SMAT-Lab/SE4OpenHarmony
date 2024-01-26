interface TextCommonWidget_Params {
    content?: string;
    textImage?: Resource;
    title?: Resource;
    onItemClick?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TextCommonWidget_" + ++__generate__Id;
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
import CommonConstants from '../common/constants/CommonConstants';
export default class TextCommonWidget extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new SynchedPropertySimpleTwoWay(params.content, this, "content");
        this.textImage = undefined;
        this.title = undefined;
        this.onItemClick = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextCommonWidget_Params) {
        if (params.textImage !== undefined) {
            this.textImage = params.textImage;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.onItemClick !== undefined) {
            this.onItemClick = params.onItemClick;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: SynchedPropertySimpleTwoWay<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private textImage: Resource;
    private title: Resource;
    private onItemClick: () => void;
    render() {
        Row.create();
        Row.margin({ top: $r('app.float.row_top_distance') });
        Row.borderRadius($r('app.float.row_radius'));
        Row.backgroundColor(Color.White);
        Row.width(CommonConstants.COMMON_DIALOG_WIDTH);
        Row.height($r('app.float.row_height'));
        Row.onClick(this.onItemClick);
        Image.create(this.textImage);
        Image.width($r('app.float.text_image_size'));
        Image.height($r('app.float.text_image_size'));
        Image.margin({ left: $r('app.float.image_left_distance') });
        Text.create(this.title);
        Text.fontSize($r('app.float.text_size'));
        Text.margin({ left: $r('app.float.image_left_distance') });
        Text.height(CommonConstants.FULL_HEIGHT);
        Text.pop();
        Text.create(this.content);
        Text.fontSize($r('app.float.text_size'));
        Text.textAlign(TextAlign.End);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.maxLines(CommonConstants.ONE_LINES);
        Text.margin({
            left: $r('app.float.content_left_distance'),
            right: $r('app.float.content_right_distance')
        });
        Text.layoutWeight(CommonConstants.WEIGHT_ONE);
        Text.width(CommonConstants.FULL_WIDTH);
        Text.pop();
        Image.create($r('app.media.ic_arrow'));
        Image.width($r('app.float.arrow_image_width'));
        Image.height($r('app.float.arrow_image_height'));
        Image.margin({ right: $r('app.float.arrow_right_distance') });
        Row.pop();
    }
}
