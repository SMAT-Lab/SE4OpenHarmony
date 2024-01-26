interface Index_Params {
    pageInfo?: PageInfo[] | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
export class PageItem {
    text: string = '';
    url: string = '';
}
export class PageInfo {
    componentType: string = '';
    sampleList: Array<PageItem> | undefined = undefined;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.pageInfo = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.pageInfo !== undefined) {
            this.pageInfo = params.pageInfo;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private pageInfo: PageInfo[] | null;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Column.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.pageInfo), (item: PageInfo) => {
            Flex.create();
            Flex.padding(10);
            Flex.width("100%");
            Flex.border({ width: "2px", color: "#bbbbbb" });
            Flex.onClick(() => {
                router.push({
                    url: '@bundle:cn.openharmony.circleindicator/sharedlibrary/ets/' + "pages/SampleList",
                    params: item
                });
            });
            Text.create(item.componentType);
            Text.fontSize(20);
            Text.pop();
            Flex.pop();
        }, (item: PageInfo) => item.componentType);
        ForEach.pop();
        Column.pop();
        Flex.pop();
    }
    aboutToAppear() {
        let circleIndicator = new PageInfo();
        circleIndicator.componentType = 'CircleIndicator';
        circleIndicator.sampleList = [
            {
                text: "circleSampleSnackbar",
                url: "circleSampleSnackbar"
            }
        ];
        let lineIndicator = new PageInfo();
        lineIndicator =
            {
                componentType: "LineIndicator",
                sampleList: [
                    { text: "Default", url: "LineIndicator_default" }
                ]
            };
        let triangularIndicator = new PageInfo();
        triangularIndicator =
            {
                componentType: "TriangularIndicator",
                sampleList: [{ text: "Default", url: "TriangularSampleIndicator" }]
            };
        let iconsIndicator = new PageInfo();
        iconsIndicator =
            {
                componentType: "IconsIndicator",
                sampleList: [{ text: "Default", url: "IconsSampleDefault" }]
            };
        let bottomTabIndicator = new PageInfo();
        bottomTabIndicator =
            {
                componentType: "BottomTabIndicator",
                sampleList: [
                    { text: "Center view", url: "BottomTabIndicator_center_view" }
                ]
            };
        let fixTabsIndicator = new PageInfo();
        fixTabsIndicator =
            {
                componentType: "FixTabsIndicator",
                sampleList: [
                    { text: "Default", url: "FixTabsIndicator_default" }
                ]
            };
        let capsuleFixTabsIndicator = new PageInfo();
        capsuleFixTabsIndicator =
            {
                componentType: "CapsuleFixTabsIndicator",
                sampleList: [{ text: "Default", url: "CapsuleFixTabsIndicator_default" }]
            };
        let badgeFixTabsIndicator = new PageInfo();
        badgeFixTabsIndicator =
            {
                componentType: "BadgeFixTabsIndicator",
                sampleList: [{ text: "Default", url: "BadgeSampleFixTabsIndicator" }]
            };
        let scrollTabsIndicator = new PageInfo();
        scrollTabsIndicator =
            {
                componentType: "ScrollTabsIndicator",
                sampleList: [{ text: "Default", url: "TabsIndicatorDefault" }
                ]
            };
        let springScrollTabsIndicator = new PageInfo();
        springScrollTabsIndicator =
            {
                componentType: "SpringScrollTabsIndicator",
                sampleList: [{ text: "Default", url: "SpringSampleDefault" }]
            };
        let magicScrollTabsIndicator = new PageInfo();
        magicScrollTabsIndicator =
            {
                componentType: "MagicScrollTabsIndicator",
                sampleList: [
                    { text: "Default1", url: "MagicSampleDefault1" }
                ]
            };
        let titleIndicator = new PageInfo();
        titleIndicator =
            {
                componentType: "TitleIndicator",
                sampleList: [
                    { text: "Styled", url: "TitlesSampleStyled" },
                ]
            };
        this.pageInfo = [circleIndicator, lineIndicator, triangularIndicator, iconsIndicator, bottomTabIndicator, fixTabsIndicator, capsuleFixTabsIndicator, badgeFixTabsIndicator, scrollTabsIndicator, springScrollTabsIndicator, magicScrollTabsIndicator, titleIndicator];
    }
}
loadDocument(new Index("1", undefined, {}));
