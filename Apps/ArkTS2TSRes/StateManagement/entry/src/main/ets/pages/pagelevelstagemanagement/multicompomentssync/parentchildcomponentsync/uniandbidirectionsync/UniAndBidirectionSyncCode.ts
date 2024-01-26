interface UniAndBidirectionSyncCode_Params {
    circleColor?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "UniAndBidirectionSyncCode_" + ++__generate__Id;
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
import { ChildCompLink } from './ComponentLink';
import { ChildCompProp } from './ComponentProp';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
class ColorData {
    Grey: string = '';
    Blue: string = '';
    Pink: string = '';
    Red: string = '';
}
// 初始化圆形的可设置颜色
export const COLOR_DATA: ColorData = {
    Grey: '#eebebeba',
    Blue: '#4A90E2',
    Pink: '#8DF8BEBE',
    Red: '#FFF30823'
};
export class UniAndBidirectionSyncCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circleColor = new ObservedPropertySimple(COLOR_DATA.Grey, this, "circleColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: UniAndBidirectionSyncCode_Params) {
        if (params.circleColor !== undefined) {
            this.circleColor = params.circleColor;
        }
    }
    aboutToBeDeleted() {
        this.__circleColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 初始化圆形颜色的状态变量
    private __circleColor: ObservedPropertySimple<string>;
    get circleColor() {
        return this.__circleColor.get();
    }
    set circleColor(newValue: string) {
        this.__circleColor.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        Column.create({ space: 10 });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['UniAndBidirectionSyncCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['UniAndBidirectionSyncCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.parent_component'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.margin(10);
        Text.pop();
        Text.create($r('app.string.uni_and_bidirection_sync_tips'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Circle.create();
        Circle.size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') });
        Circle.fill(this.circleColor);
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.createWithChild();
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.id('pinkColorBtn');
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.height($r('app.float.button_height'));
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.type(ButtonType.Capsule);
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.backgroundColor($r('app.color.button_background_color'));
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.onClick(() => {
            this.circleColor = COLOR_DATA.Pink;
        });
        Text.create($r('app.string.uni_and_bidirection_sync_btn'));
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        // 点击更新父组件的圆形颜色变量，父组件更新，子组件@Link以及@Prop继承的变量同步
        Button.pop();
        Column.pop();
        let earlierCreatedChild_3: ChildCompProp = (this && this.findChildById) ? this.findChildById("3") as ChildCompProp : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 单向同步子组件
            View.create(new ChildCompProp("3", this, { circleColor: this.circleColor }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                circleColor: this.circleColor
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: ChildCompLink = (this && this.findChildById) ? this.findChildById("4") as ChildCompLink : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 双向同步子组件
            View.create(new ChildCompLink("4", this, { circleColor: this.__circleColor }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
    }
}
