interface TitleBarDark_Params {
    title?: Resource;
    isAbility?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleBarDark_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import { startSpecifiedAbility } from '../utils/StartAbilityUtils';
//声明一个上下文信息
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
export class TitleBarDark extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new SynchedPropertyObjectTwoWay(params.title, this, "title");
        this.isAbility = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleBarDark_Params) {
        if (params.isAbility !== undefined) {
            this.isAbility = params.isAbility;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: SynchedPropertySimpleOneWay<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    private isAbility: boolean;
    render() {
        Column.create();
        Column.width('100%');
        Row.create();
        Row.width('100%');
        Row.padding($r('app.float.page_padding'));
        Button.createWithChild();
        Button.id('titleBarDark');
        Button.onClick(() => {
            this.isAbility ? startSpecifiedAbility(CONTEXT, 'EntryAbility') : router.back();
        });
        Button.backgroundColor($r('app.color.nightnode_color'));
        Image.create($r('app.media.ic_back_white'));
        Image.size({ width: $r('app.float.icon_back_size'), height: $r('app.float.icon_back_size') });
        Button.pop();
        Text.create(this.title);
        Text.fontSize($r('app.float.title_font_size'));
        Text.margin({ left: $r('app.float.title_margin') });
        Text.fontColor(Color.White);
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.width('100%');
        Divider.height($r('app.float.divider_height'));
        Divider.color($r('app.color.divider_color'));
        Divider.margin({ bottom: 12 });
        Column.pop();
    }
}
