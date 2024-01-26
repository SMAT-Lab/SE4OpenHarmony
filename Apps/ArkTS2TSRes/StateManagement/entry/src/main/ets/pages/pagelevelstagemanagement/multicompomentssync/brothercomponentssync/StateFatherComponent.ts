interface StateFatherComponent_Params {
    circleColor?: Resource;
    selectColors?: ColorType[];
    currentSelectIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StateFatherComponent_" + ++__generate__Id;
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
import { LinkBrotherOneComponent } from './LinkBrotherOneComponent';
import { LinkBrotherTwoComponent } from './LinkBrotherTwoComponent';
import { ViewCodeText } from '../../../../commoncomponents/ViewCodeText';
export class StateFatherComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circleColor = new ObservedPropertyObject($r('app.color.circle_blue'), this, "circleColor");
        this.__selectColors = new ObservedPropertyObject(COLOR_SELECT_DATA, this, "selectColors");
        this.__currentSelectIndex = new ObservedPropertySimple(0, this, "currentSelectIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StateFatherComponent_Params) {
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
    // 共同父组件使用@State初始化圆形颜色
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
    // 初始化当前Select的Index为0
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
            View.create(new ViewCodeText("2", this, { webSrc: { "id": 0, "type": 30000, params: ['StateFatherComponent.ets.html'] } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                webSrc: { "id": 0, "type": 30000, params: ['StateFatherComponent.ets.html'] }
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.parent_titleone'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.fontColor($r('app.color.tips_font_color'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        let earlierCreatedChild_3: LinkBrotherOneComponent = (this && this.findChildById) ? this.findChildById("3") as LinkBrotherOneComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 和父组件双向同步子组件A
            View.create(new LinkBrotherOneComponent("3", this, {
                circleColor: this.__circleColor,
                currentSelectIndex: this.__currentSelectIndex
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: LinkBrotherTwoComponent = (this && this.findChildById) ? this.findChildById("4") as LinkBrotherTwoComponent : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 和父组件双向同步子组件B
            View.create(new LinkBrotherTwoComponent("4", this, {
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
