interface UpdateBoundComponentCode_Params {
    titleName?: string;
    content?: string;
    updateCount?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UpdateBoundComponentCode_" + ++__generate__Id;
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
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
export class UpdateBoundComponentCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__titleName = new ObservedPropertySimple('title', this, "titleName");
        this.content = 'content';
        this.updateCount = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UpdateBoundComponentCode_Params) {
        if (params.titleName !== undefined) {
            this.titleName = params.titleName;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.updateCount !== undefined) {
            this.updateCount = params.updateCount;
        }
    }
    aboutToBeDeleted() {
        this.__titleName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 组件内状态变量
    private __titleName: ObservedPropertySimple<string>;
    get titleName() {
        return this.__titleName.get();
    }
    set titleName(newValue: string) {
        this.__titleName.set(newValue);
    }
    // 组件内private变量
    private content: string;
    // 组件内变量更新的次数
    private updateCount: number;
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['UpdateBoundComponentCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['UpdateBoundComponentCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.width('100%');
        Column.padding(10);
        Column.justifyContent(FlexAlign.SpaceAround);
        Column.backgroundColor($r('app.color.component_background_pink'));
        Text.create($r('app.string.only_update_state'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin(10);
        Text.create($r('app.string.only_update_title'));
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.pop();
        Text.create(`${this.titleName}`);
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize(20);
        Text.pop();
        Row.pop();
        Text.create($r('app.string.only_update_private'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.margin({ top: 20 });
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin(10);
        Text.create($r('app.string.only_update_content'));
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.pop();
        Text.create(`${this.content}`);
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize(20);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Button.createWithLabel($r('app.string.update_title_content'));
        Button.onClick(() => {
            // 点击更新@State和Private声明的变量，更新策略为：@State和Private的数据发生变化，@State变量绑定的组件更新，Private变量绑定的组件不更新。
            this.updateCount++;
            this.content = `content ${this.updateCount}`;
            this.titleName = `title ${this.updateCount}`;
        });
        Button.id('titleAndContentBtn');
        Button.width('100%');
        Button.height($r('app.float.button_height'));
        Button.fontColor($r('app.color.button_text_color'));
        Button.fontSize($r('app.float.button_text_size'));
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.pop();
        Text.create($r('app.string.only_update_state_components'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.margin({ top: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
