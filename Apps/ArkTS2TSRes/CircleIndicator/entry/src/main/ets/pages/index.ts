interface Index_Params {
    pageInfo?: PageInfo[] | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
        Button.createWithLabel("进入HSP的library共享包");
        Button.onClick(() => {
            router.pushUrl({ url: '@bundle:cn.openharmony.circleindicator/sharedlibrary/ets/pages/Index' });
        });
        Button.margin({ top: 15 });
        Button.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.pageInfo), (item: PageInfo) => {
            Flex.create();
            Flex.padding(10);
            Flex.width("100%");
            Flex.border({ width: "2px", color: "#bbbbbb" });
            Flex.onClick(() => {
                router.push({
                    url: "pages/SampleList",
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
                text: "Default",
                url: "IndicatoCircleSampleDefault"
            },
            {
                text: "IndicatorCircleVertical",
                url: "IndicatoCircleSampleVertical"
            },
            {
                text: "circleSampleChangDrawable",
                url: "circleSampleChangDrawable"
            },
            {
                text: "circleSampleDynamicAdapter",
                url: "circleSampleDynamicAdapter"
            },
            {
                text: "circleSampleSnackbar",
                url: "circleSampleSnackbar"
            }
        ];
        let bannerIndicator = new PageInfo();
        bannerIndicator =
            {
                componentType: "BannerIndicator",
                sampleList: [{ text: "Default", url: "BannerSampleDefault" },
                    { text: "No Fades", url: "BannerSampleNoFades" },
                    { text: "Styled", url: "BannerSampleStyled" },
                    { text: "Auto Play", url: "BannerSampleAutoPlay" },
                    { text: "Dynamic", url: "BannerSampleDynamic" }]
            };
        let lineIndicator = new PageInfo();
        lineIndicator =
            {
                componentType: "LineIndicator",
                sampleList: [
                    { text: "Default", url: "LineIndicator_default" },
                    { text: "Custom properties", url: "LineIndicator_custom" }
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
                    { text: "Default", url: "BottomTabIndicator_default" },
                    { text: "Center view", url: "BottomTabIndicator_center_view" },
                ]
            };
        let fixTabsIndicator = new PageInfo();
        fixTabsIndicator =
            {
                componentType: "FixTabsIndicator",
                sampleList: [
                    { text: "Default", url: "FixTabsIndicator_default" },
                    { text: "Top line", url: "FixTabsIndicator_top_line" },
                    {
                        text: "Fill background color",
                        url: "FixTabsIndicator_fill_background_color"
                    },
                    { text: "Background image", url: "FixTabsIndicator_background_image" }
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
                    { text: "Default1", url: "MagicSampleDefault1" },
                    { text: "Default2", url: "MagicSampleDefault2" },
                    { text: "Default3", url: "MagicSampleDefault3" },
                    { text: "Default4", url: "MagicSampleDefault4" },
                    { text: "Default5", url: "MagicSampleDefault5" },
                    { text: "Default6", url: "MagicSampleDefault6" },
                    { text: "Default7", url: "MagicSampleDefault7" },
                    { text: "Default8", url: "MagicSampleDefault8" },
                    { text: "Default9", url: "MagicSampleDefault9" },
                    { text: "固定首选项", url: "MagicSamplePinnedTab" }
                ]
            };
        let titleIndicator = new PageInfo();
        titleIndicator =
            {
                componentType: "TitleIndicator",
                sampleList: [{ text: "Default(Listeners)", url: "TitlesSampleDefault" },
                    { text: "Default(Bottom)", url: "TitlesSampleBottom" },
                    { text: "Initial Page", url: "TitlesSampleInitialPage" },
                    { text: "Styled", url: "TitlesSampleStyled" },
                    { text: "Triangle Style", url: "TitlesSampleTriangle" }]
            };
        this.pageInfo = [circleIndicator, bannerIndicator, lineIndicator, triangularIndicator, iconsIndicator, bottomTabIndicator, fixTabsIndicator, capsuleFixTabsIndicator, badgeFixTabsIndicator, scrollTabsIndicator, springScrollTabsIndicator, magicScrollTabsIndicator, titleIndicator];
    }
}
loadDocument(new Index("1", undefined, {}));
