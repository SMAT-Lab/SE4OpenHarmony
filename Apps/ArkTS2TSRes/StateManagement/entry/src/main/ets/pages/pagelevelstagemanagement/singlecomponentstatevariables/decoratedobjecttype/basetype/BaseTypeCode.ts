interface BaseTypeCode_Params {
    circleColor?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BaseTypeCode_" + ++__generate__Id;
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
export class BaseTypeCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circleColor = new ObservedPropertyObject($r('app.color.circle_pink'), this, "circleColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BaseTypeCode_Params) {
        if (params.circleColor !== undefined) {
            this.circleColor = params.circleColor;
        }
    }
    aboutToBeDeleted() {
        this.__circleColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __circleColor: ObservedPropertyObject<Resource>;
    get circleColor() {
        return this.__circleColor.get();
    }
    set circleColor(newValue: Resource) {
        this.__circleColor.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['BaseTypeCode.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['BaseTypeCode.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.base_type_tip_text'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Circle.create();
        Circle.size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') });
        Circle.fill(ObservedObject.GetRawObject(this.circleColor));
        Button.createWithChild();
        Button.id('circleColorBtn');
        Button.height($r('app.float.button_height'));
        Button.type(ButtonType.Capsule);
        Button.backgroundColor($r('app.color.button_background_color'));
        Button.onClick(() => {
            if (this.circleColor.id === $r('app.color.circle_pink').id) {
                this.circleColor = $r('app.color.circle_blue');
            }
            else {
                this.circleColor = $r('app.color.circle_pink');
            }
        });
        Text.create(this.circleColor.id === $r('app.color.circle_pink')
            .id ? $r('app.string.set_to_blue') : $r('app.string.set_to_pink'));
        Text.fontColor($r('app.color.button_text_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Column.pop();
    }
}
