interface ChildCompProp_Params {
    circleColor?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ComponentProp_" + ++__generate__Id;
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
import { COLOR_DATA } from './UniAndBidirectionSyncCode';
import { ViewCodeText } from '../../../../../commoncomponents/ViewCodeText';
export class ChildCompProp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circleColor = new SynchedPropertySimpleOneWay(params.circleColor, this, "circleColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChildCompProp_Params) {
        this.circleColor = params.circleColor;
    }
    aboutToBeDeleted() {
        this.__circleColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 圆形颜色，和父组件中的状态变量单向同步，只支持基础类型
    private __circleColor: SynchedPropertySimpleOneWay<string>;
    get circleColor() {
        return this.__circleColor.get();
    }
    set circleColor(newValue: string) {
        this.__circleColor.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ComponentProp.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ComponentProp.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.child_component'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.margin(10);
        Text.pop();
        Text.create($r('app.string.single_direction_sync_tips'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        // 绑定@Link变量的Circle组件
        Circle.create();
        // 绑定@Link变量的Circle组件
        Circle.size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') });
        // 绑定@Link变量的Circle组件
        Circle.fill(this.circleColor);
        Button.createWithChild();
        Button.id('blueColorBtn');
        Button.height($r('app.float.button_height'));
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.onClick(() => {
            // 点击更新子组件@Prop声明的变量，此子组件更新，父组件以及@Link声明的子组件变量不同步
            this.circleColor = COLOR_DATA.Blue;
        });
        Text.create($r('app.string.single_direction_sync_btn'));
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Column.pop();
    }
}
