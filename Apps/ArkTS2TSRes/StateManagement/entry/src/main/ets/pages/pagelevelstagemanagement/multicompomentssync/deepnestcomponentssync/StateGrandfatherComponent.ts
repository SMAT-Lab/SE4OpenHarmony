interface LinkChildComp_Params {
    circleColor?: Resource;
    currentSelectIndex?: number;
}
interface StateGrandfatherComponent_Params {
    circleColor?: Resource;
    selectColors?: ColorType[];
    currentSelectIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StateGrandfatherComponent_" + ++__generate__Id;
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
import { LinkDescendentComponent } from './LinkDescendentComponent';
import ColorType from '../model/ColorType';
import { COLOR_SELECT_DATA } from '../data/ColorData';
import { getResourceString } from '../../../../utils/ResourceUtils';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';
// 声明一个上下文变量
const CONTEXT: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
export class StateGrandfatherComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circleColor = new ObservedPropertyObject($r('app.color.circle_blue'), this, "circleColor");
        this.__selectColors = new ObservedPropertyObject(COLOR_SELECT_DATA, this, "selectColors");
        this.__currentSelectIndex = new ObservedPropertySimple(0, this, "currentSelectIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StateGrandfatherComponent_Params) {
        if (params.circleColor !== undefined) {
            this.circleColor = params.circleColor;
        }
        if (params.selectColors !== undefined) {
            this.selectColors = params.selectColors;
        }
        if (params.currentSelectIndex !== undefined) {
            this.currentSelectIndex = params.currentSelectIndex;
        }
    }
    aboutToBeDeleted() {
        this.__circleColor.aboutToBeDeleted();
        this.__selectColors.aboutToBeDeleted();
        this.__currentSelectIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 初始化爷组件@State的圆形颜色
    private __circleColor: ObservedPropertyObject<Resource>;
    get circleColor() {
        return this.__circleColor.get();
    }
    set circleColor(newValue: Resource) {
        this.__circleColor.set(newValue);
    }
    // 初始化一个颜色数组
    private __selectColors: ObservedPropertyObject<ColorType[]>;
    get selectColors() {
        return this.__selectColors.get();
    }
    set selectColors(newValue: ColorType[]) {
        this.__selectColors.set(newValue);
    }
    // 初始化当前select组件的index
    private __currentSelectIndex: ObservedPropertySimple<number>;
    get currentSelectIndex() {
        return this.__currentSelectIndex.get();
    }
    set currentSelectIndex(newValue: number) {
        this.__currentSelectIndex.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Grey, width: $r('app.float.border_width') });
        let earlierCreatedChild_2: ViewCodeText = (this && this.findChildById) ? this.findChildById("2") as ViewCodeText : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 点击查看源码
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['StateGrandfatherComponent.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['StateGrandfatherComponent.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.deepnest_parent_titleone'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('100%');
        Select.create(this.selectColors);
        Select.selected(this.currentSelectIndex);
        Select.value(getResourceString(CONTEXT, this.selectColors[this.currentSelectIndex].value));
        Select.fontColor($r('app.color.button_text_color'));
        Select.font({ size: $r('app.float.tips_font_size') });
        Select.selectedOptionFont({ size: $r('app.float.tips_font_size') });
        Select.optionFont({ size: $r('app.float.tips_font_size') });
        Select.id('grandfatherCompA');
        Select.onSelect((index: number) => {
            // 爷组件@State声明的数据页面更新，孙组件@Link关联的变量同步更新
            this.currentSelectIndex = index;
            this.circleColor = this.selectColors[index].color;
        });
        Select.pop();
        Circle.create();
        Circle.size({ width: $r('app.float.circle_size'), height: $r('app.float.circle_size') });
        Circle.fill(ObservedObject.GetRawObject(this.circleColor));
        Row.pop();
        let earlierCreatedChild_3: LinkChildComp = (this && this.findChildById) ? this.findChildById("3") as LinkChildComp : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 双向同步子组件
            View.create(new LinkChildComp("3", this, { circleColor: this.__circleColor, currentSelectIndex: this.__currentSelectIndex }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class LinkChildComp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circleColor = new SynchedPropertyObjectTwoWay(params.circleColor, this, "circleColor");
        this.__currentSelectIndex = new SynchedPropertySimpleTwoWay(params.currentSelectIndex, this, "currentSelectIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LinkChildComp_Params) {
    }
    aboutToBeDeleted() {
        this.__circleColor.aboutToBeDeleted();
        this.__currentSelectIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 和父组件和子组件双向同步圆形颜色
    private __circleColor: SynchedPropertySimpleOneWay<Resource>;
    get circleColor() {
        return this.__circleColor.get();
    }
    set circleColor(newValue: Resource) {
        this.__circleColor.set(newValue);
    }
    // 和父组件和子组件双向同步Select的Index值
    private __currentSelectIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSelectIndex() {
        return this.__currentSelectIndex.get();
    }
    set currentSelectIndex(newValue: number) {
        this.__currentSelectIndex.set(newValue);
    }
    render() {
        Column.create();
        Column.padding(10);
        Column.border({ radius: $r('app.float.component_radius'), color: Color.Blue, width: $r('app.float.border_width') });
        Text.create($r('app.string.deepnest_child_titleone'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.fontSize($r('app.float.button_text_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.height($r('app.float.button_height'));
        Text.pop();
        let earlierCreatedChild_4: LinkDescendentComponent = (this && this.findChildById) ? this.findChildById("4") as LinkDescendentComponent : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 双向同步孙组件
            View.create(new LinkDescendentComponent("4", this, {
                circleColor: this.__circleColor,
                currentSelectIndex: this.__currentSelectIndex
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
    }
}
