interface ChatComponent_Params {
    item?: ChatBox | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ChatComponent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import { ChatBox } from '../appsampled/data/ChatBox';
export default class ChatComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.item = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChatComponent_Params) {
        if (params.item !== undefined) {
            this.item = params.item;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private item: ChatBox | undefined;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(40);
        If.create();
        if (!this.item?.isSend) {
            If.branchId(0);
            Image.create($r('app.media.app_icon'));
            Image.width(50);
            Image.height(50);
            Image.objectFit(ImageFit.Contain);
            Image.borderRadius(25);
            Image.margin({ left: 10, right: 10 });
        }
        If.pop();
        Column.create();
        Column.width('85%');
        Text.create(this.item?.message);
        Text.maxLines(5);
        Text.padding(10);
        Text.fontSize(18);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.borderRadius(14);
        Text.alignSelf(this.item?.isSend ? ItemAlign.End : ItemAlign.Start);
        Text.backgroundColor(this.item?.isSend ? $r('app.color.COLOR_3DA0F1') : $r('app.color.COLOR_393939'));
        Text.pop();
        Column.pop();
        If.create();
        if (this.item?.isSend) {
            If.branchId(0);
            Image.create($r('app.media.app_icon'));
            Image.width(50);
            Image.height(50);
            Image.objectFit(ImageFit.Contain);
            Image.borderRadius(25);
            Image.margin({ left: 10, right: 10 });
        }
        If.pop();
        Row.pop();
    }
}
