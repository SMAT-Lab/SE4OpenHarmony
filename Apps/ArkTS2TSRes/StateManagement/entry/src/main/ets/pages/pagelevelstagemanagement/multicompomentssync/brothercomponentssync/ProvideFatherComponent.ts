interface ProvideFatherComponent_Params {
    selectColors?: ColorType[];
    consumeCircleColor?: Resource;
    currentSelectIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ProvideFatherComponent_" + ++__generate__Id;
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
import ColorType from '../model/ColorType';
import { COLOR_SELECT_DATA } from '../data/ColorData';
import { ConsumeBrotherOneComponent } from './ConsumeBrotherOneComponent';
import { ConsumeBrotherTwoComponent } from './ConsumeBrotherTwoComponent';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';
export class ProvideFatherComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectColors = new ObservedPropertyObject(COLOR_SELECT_DATA, this, "selectColors");
        this.__consumeCircleColor = new ObservedPropertyObject($r('app.color.circle_blue'), this, "consumeCircleColor");
        this.addProvidedVar("consumeCircleColor", this.__consumeCircleColor, false);
        this.__currentSelectIndex = new ObservedPropertySimple(0, this, "currentSelectIndex");
        this.addProvidedVar("currentSelectIndex", this.__currentSelectIndex, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ProvideFatherComponent_Params) {
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
    // 初始化一个颜色数组
    private __selectColors: ObservedPropertyObject<ColorType[]>;
    get selectColors() {
        return this.__selectColors.get();
    }
    set selectColors(newValue: ColorType[]) {
        this.__selectColors.set(newValue);
    }
    // 共同父组件使用@Provide初始化圆形颜色
    private __consumeCircleColor: ObservedPropertyObject<Resource>;
    get consumeCircleColor() {
        return this.__consumeCircleColor.get();
    }
    set consumeCircleColor(newValue: Resource) {
        this.__consumeCircleColor.set(newValue);
    }
    // 初始化Select组件的Index为0
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
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['ProvideFatherComponent.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['ProvideFatherComponent.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.parent_titletwo'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        let earlierCreatedChild_3: ConsumeBrotherOneComponent = (this && this.findChildById) ? this.findChildById("3") as ConsumeBrotherOneComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 和父组件双向同步子组件A
            View.create(new ConsumeBrotherOneComponent("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: ConsumeBrotherTwoComponent = (this && this.findChildById) ? this.findChildById("4") as ConsumeBrotherTwoComponent : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 和父组件双向同步子组件B
            View.create(new ConsumeBrotherTwoComponent("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
    }
}
