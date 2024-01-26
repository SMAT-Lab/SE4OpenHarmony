interface BadgeSampleFixTabsIndicator_Params {
    data?: Array<string>;
    itemWidths1?: Array<Resource>;
    badgeTypes1?: Array<BadgeType>;
    badgeText1?: Array<string>;
    badgeRulesX1?: Array<BadgeRule>;
    badgeRulesY1?: Array<BadgeRule>;
    itemWidths2?: Array<number>;
    badgeTypes2?: Array<BadgeType>;
    badgeText2?: Array<string>;
    badgeRulesX2?: Array<BadgeRule | undefined>;
    badgeRulesY2?: Array<BadgeRule | undefined>;
    controller?: TabsController;
    model1?: BadgeFixTabsModel;
    model2?: BadgeFixTabsModel;
    itemIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BadgeSampleFixTabsIndicator_" + ++__generate__Id;
}
/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { BadgeFixTabsIndicator, BadgeFixTabsModel, BadgeType, BadgeRule, BadgeAnchor } from '@ohos/circleindicator';
import common from '@ohos.app.ability.common';
class BadgeSampleFixTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = ["KITKAT", "NOUGAT", "DONUT"];
        this.itemWidths1 = [$r('app.float.float30vp'), $r('app.float.float40vp'), $r('app.float.float30vp')];
        this.badgeTypes1 = [BadgeType.COUNT,
            BadgeType.COUNT,
            BadgeType.DOT];
        this.badgeText1 = ["1", "2", ""];
        this.badgeRulesX1 = [new BadgeRule(BadgeAnchor.LEFT, 15),
            new BadgeRule(BadgeAnchor.RIGHT, -15),
            new BadgeRule(BadgeAnchor.CENTER_X, 0)];
        this.badgeRulesY1 = [new BadgeRule(BadgeAnchor.TOP, 20),
            new BadgeRule(BadgeAnchor.TOP, 20),
            new BadgeRule(BadgeAnchor.BOTTOM, -10)];
        this.itemWidths2 = [170, 100, 90];
        this.badgeTypes2 = [BadgeType.NONE,
            BadgeType.DOT,
            BadgeType.NONE];
        this.badgeText2 = ["", "", ""];
        this.badgeRulesX2 = [, new BadgeRule(BadgeAnchor.CENTER_X, 0),];
        this.badgeRulesY2 = [, new BadgeRule(BadgeAnchor.BOTTOM, -10),];
        this.controller = new TabsController();
        this.__model1 = new ObservedPropertyObject(new BadgeFixTabsModel(this.controller), this, "model1");
        this.__model2 = new ObservedPropertyObject(new BadgeFixTabsModel(this.controller), this, "model2");
        this.__itemIndex = new ObservedPropertySimple(0, this, "itemIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BadgeSampleFixTabsIndicator_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.itemWidths1 !== undefined) {
            this.itemWidths1 = params.itemWidths1;
        }
        if (params.badgeTypes1 !== undefined) {
            this.badgeTypes1 = params.badgeTypes1;
        }
        if (params.badgeText1 !== undefined) {
            this.badgeText1 = params.badgeText1;
        }
        if (params.badgeRulesX1 !== undefined) {
            this.badgeRulesX1 = params.badgeRulesX1;
        }
        if (params.badgeRulesY1 !== undefined) {
            this.badgeRulesY1 = params.badgeRulesY1;
        }
        if (params.itemWidths2 !== undefined) {
            this.itemWidths2 = params.itemWidths2;
        }
        if (params.badgeTypes2 !== undefined) {
            this.badgeTypes2 = params.badgeTypes2;
        }
        if (params.badgeText2 !== undefined) {
            this.badgeText2 = params.badgeText2;
        }
        if (params.badgeRulesX2 !== undefined) {
            this.badgeRulesX2 = params.badgeRulesX2;
        }
        if (params.badgeRulesY2 !== undefined) {
            this.badgeRulesY2 = params.badgeRulesY2;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.model2 !== undefined) {
            this.model2 = params.model2;
        }
        if (params.itemIndex !== undefined) {
            this.itemIndex = params.itemIndex;
        }
    }
    aboutToBeDeleted() {
        this.__model1.aboutToBeDeleted();
        this.__model2.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private data: Array<string>;
    // private itemWidths1: Array<number> = [75, 85, 75]
    private itemWidths1: Array<Resource>;
    private badgeTypes1: Array<BadgeType>;
    private badgeText1: Array<string>;
    private badgeRulesX1: Array<BadgeRule>;
    private badgeRulesY1: Array<BadgeRule>;
    private itemWidths2: Array<number>;
    private badgeTypes2: Array<BadgeType>;
    private badgeText2: Array<string>;
    private badgeRulesX2: Array<BadgeRule | undefined>;
    private badgeRulesY2: Array<BadgeRule | undefined>;
    private controller: TabsController;
    private __model1: ObservedPropertyObject<BadgeFixTabsModel>;
    get model1() {
        return this.__model1.get();
    }
    set model1(newValue: BadgeFixTabsModel) {
        this.__model1.set(newValue);
    }
    private __model2: ObservedPropertyObject<BadgeFixTabsModel>;
    get model2() {
        return this.__model2.get();
    }
    set model2(newValue: BadgeFixTabsModel) {
        this.__model2.set(newValue);
    }
    private __itemIndex: ObservedPropertySimple<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    aboutToAppear() {
        let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
        this.model1
            .setHeight(50)
            .setBackgroundColor("#455a64")
            .setSplit(true)
            .setUnselectedTextColor("#A9A9A9")
            .setSelectedTextColor("#FFFFFF")
            .setUnselectedTextSize($r('app.float.float5vp'), ctx)
            .setItemWidths(this.itemWidths1, ctx)
            .setIndicatorHeight($r('app.float.float1vp'), ctx)
            .setIndicatorColor("#40c4ff")
            .setIndicatorYOffset(22)
            .setBadgeTypes(this.badgeTypes1)
            .setBadgeTexts(this.badgeText1)
            .setXBadgeRules(this.badgeRulesX1)
            .setYBadgeRules(this.badgeRulesY1)
            .setChangeListener((itemIndex: number) => {
            console.info("model1 change page to " + this.data[itemIndex]);
        })
            .setClickListener((itemIndex: number) => {
            console.info("model1 click index: " + this.data[itemIndex]);
        });
        this.model2
            .setHeight(50)
            .setBackgroundColor("#FFFFFF")
            .setChangeTextSize(true)
            .setUnselectedTextColor("#616161")
            .setSelectedTextColor("#f57c00")
            .setUnselectedTextSize(13)
            .setSelectedTextSize(18)
            .setItemWidths(this.itemWidths2, ctx)
            .setIndicatorAnimation(true)
            .setIndicatorHeight(1)
            .setIndicatorColor("#f57c00")
            .setIndicatorYOffset(-22)
            .setBadgeTypes(this.badgeTypes2)
            .setBadgeTexts(this.badgeText2)
            .setXBadgeRules(this.badgeRulesX2)
            .setYBadgeRules(this.badgeRulesY2)
            .setAutoCancelBadge(true)
            .setChangeListener((itemIndex: number) => {
            console.info("model2 change page to " + this.data[itemIndex]);
        })
            .setClickListener((itemIndex: number) => {
            console.info("model2 click index: " + this.data[itemIndex]);
        });
    }
    SquareText(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("100%");
        Flex.width("100%");
        Flex.padding(15);
        Text.create(this.data[index]);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Flex.pop();
    }
    TabContentSample(index: number, parent = null) {
        TabContent.create();
        this.SquareText(index, this);
        TabContent.pop();
    }
    render() {
        Column.create({ space: 10 });
        Column.backgroundColor("#eeeeee");
        Column.padding({ top: 10 });
        Tabs.create({ index: this.itemIndex, controller: this.controller });
        Tabs.onChange((index: number) => {
            this.itemIndex = index;
        });
        Tabs.barWidth(0);
        Tabs.onTouch((event: TouchEvent) => {
            this.model1.notifyTouch(event, this.itemIndex);
            this.model2.notifyTouch(event, this.itemIndex);
        });
        Tabs.padding({ bottom: 180 });
        this.TabContentSample(0, this);
        this.TabContentSample(1, this);
        this.TabContentSample(2, this);
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new BadgeSampleFixTabsIndicator("1", undefined, {}));
