interface LinkBrotherTwoComponent_Params {
    selectColors?: ColorType[];
    circleColor?: Resource;
    currentSelectIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LinkBrotherTwoComponent_" + ++__generate__Id;
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
import common from '@ohos.app.ability.common';
import ColorType from '../model/ColorType';
import { COLOR_SELECT_DATA } from '../data/ColorData';
import { getResourceString } from '../../../../utils/ResourceUtils';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';
export class LinkBrotherTwoComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectColors = new ObservedPropertyObject(COLOR_SELECT_DATA, this, "selectColors");
        this.__circleColor = new SynchedPropertyObjectTwoWay(params.circleColor, this, "circleColor");
        this.__currentSelectIndex = new SynchedPropertySimpleTwoWay(params.currentSelectIndex, this, "currentSelectIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LinkBrotherTwoComponent_Params) {
        if (params.selectColors !== undefined) {
            this.selectColors = params.selectColors;
        }
    }
    aboutToBeDeleted() {
        this.__selectColors.aboutToBeDeleted();
        this.__circleColor.aboutToBeDeleted();
        this.__currentSelectIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectColors: ObservedPropertyObject<ColorType[]>;
    get selectColors() {
        return this.__selectColors.get();
    }
    set selectColors(newValue: ColorType[]) {
        this.__selectColors.set(newValue);
    }
    // 和父组件、子组件A双向同步圆形颜色
    private __circleColor: SynchedPropertySimpleOneWay<Resource>;
    get circleColor() {
        return this.__circleColor.get();
    }
    set circleColor(newValue: Resource) {
        this.__circleColor.set(newValue);
    }
    // 和父组件、子组件A双向同步Select的Index值
    private __currentSelectIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSelectIndex() {
        return this.__currentSelectIndex.get();
    }
    set currentSelectIndex(newValue: number) {
        this.__currentSelectIndex.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['LinkBrotherTwoComponent.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['LinkBrotherTwoComponent.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.link_brothers_title'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.height($r('app.float.button_height'));
        Text.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('100%');
        Select.create(this.selectColors);
        Select.id('linkSelectCompB');
        Select.selected(this.currentSelectIndex);
        Select.value(getResourceString(getContext(this) as common.UIAbilityContext, this.selectColors[this.currentSelectIndex].value));
        Select.fontColor($r('app.color.button_text_color'));
        Select.font({ size: $r('app.float.select_font_size') });
        Select.selectedOptionFont({ size: $r('app.float.select_font_size') });
        Select.optionFont({ size: $r('app.float.select_font_size') });
        Select.onSelect((index: number) => {
            // 此组件@Link声明的数据页面更新，兄弟组件@Link的数据页面同步更新
            this.currentSelectIndex = index;
            this.circleColor = this.selectColors[index].color;
        });
        Select.pop();
        Circle.create();
        Circle.size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') });
        Circle.fill(ObservedObject.GetRawObject(this.circleColor));
        Row.pop();
        Column.pop();
    }
}
