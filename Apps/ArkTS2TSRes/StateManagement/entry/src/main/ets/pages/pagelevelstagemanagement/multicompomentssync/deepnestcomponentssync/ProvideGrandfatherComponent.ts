interface ConsumeChildComp_Params {
}
interface ProvideGrandfatherComponent_Params {
    selectColors?: ColorType[];
    consumeCircleColor?: Resource;
    currentSelectIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ProvideGrandfatherComponent_" + ++__generate__Id;
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
import { ConsumeDescendentComponent } from './ConsumeDescendentComponent';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';
import { getResourceString } from '../../../../utils/ResourceUtils';
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
export class ProvideGrandfatherComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectColors = new ObservedPropertyObject(COLOR_SELECT_DATA, this, "selectColors");
        this.__consumeCircleColor = new ObservedPropertyObject($r('app.color.circle_blue'), this, "consumeCircleColor");
        this.addProvidedVar("consumeCircleColor", this.__consumeCircleColor, false);
        this.__currentSelectIndex = new ObservedPropertySimple(0, this, "currentSelectIndex");
        this.addProvidedVar("currentSelectIndex", this.__currentSelectIndex, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ProvideGrandfatherComponent_Params) {
        if (params.selectColors !== undefined) {
            this.selectColors = params.selectColors;
        }
        if (params.consumeCircleColor !== undefined) {
            this.consumeCircleColor = params.consumeCircleColor;
        }
        if (params.currentSelectIndex !== undefined) {
            this.currentSelectIndex = params.currentSelectIndex;
        }
    }
    aboutToBeDeleted() {
        this.__selectColors.aboutToBeDeleted();
        this.__consumeCircleColor.aboutToBeDeleted();
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
    // 初始化爷组件@Provide的原型颜色
    private __consumeCircleColor: ObservedPropertyObject<Resource>;
    get consumeCircleColor() {
        return this.__consumeCircleColor.get();
    }
    set consumeCircleColor(newValue: Resource) {
        this.__consumeCircleColor.set(newValue);
    }
    // 初始化Select组件的Index
    private __currentSelectIndex: ObservedPropertySimple<number>;
    get currentSelectIndex() {
        return this.__currentSelectIndex.get();
    }
    set currentSelectIndex(newValue: number) {
        this.__currentSelectIndex.set(newValue);
    }
    render() {
        Column.create();
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ProvideGrandfatherComponent.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ProvideGrandfatherComponent.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.deepnest_parent_titletwo'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('100%');
        Row.margin({ bottom: 6 });
        Select.create(this.selectColors);
        Select.selected(this.currentSelectIndex);
        Select.value(getResourceString(CONTEXT, this.selectColors[this.currentSelectIndex].value));
        Select.fontColor($r('app.color.button_text_color'));
        Select.font({ size: $r('app.float.tips_font_size') });
        Select.selectedOptionFont({ size: $r('app.float.tips_font_size') });
        Select.optionFont({ size: $r('app.float.tips_font_size') });
        Select.id('grandfatherCompB');
        Select.onSelect((index: number) => {
            // 爷组件@Provide声明的数据页面更新，孙组件@Consume关联的变量同步更新
            this.currentSelectIndex = index;
            this.consumeCircleColor = this.selectColors[index].color;
        });
        Select.pop();
        Circle.create();
        Circle.size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') });
        Circle.fill(ObservedObject.GetRawObject(this.consumeCircleColor));
        Row.pop();
        let earlierCreatedChild_3: ConsumeChildComp = (this && this.findChildById) ? this.findChildById("3") as ConsumeChildComp : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 子组件
            View.create(new ConsumeChildComp("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class ConsumeChildComp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ConsumeChildComp_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') });
        Text.create($r('app.string.deepnest_child_titletwo'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.height($r('app.float.button_height'));
        Text.pop();
        let earlierCreatedChild_4: ConsumeDescendentComponent = (this && this.findChildById) ? this.findChildById("4") as ConsumeDescendentComponent : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 双向同步孙组件
            View.create(new ConsumeDescendentComponent("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
    }
}
