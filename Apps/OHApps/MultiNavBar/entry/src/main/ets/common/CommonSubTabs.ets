/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import { BreakpointType } from '../common/BreakpointSystem';
import { StyleConfiguration } from '../common/Configuration';
import { MenuType } from '../model/MenuType';
import { RecommendationList } from './RecommendationList';
import { SearchModule, SecondaryMenu } from './SideBarController';

@Component
export struct CommonSubTabs {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @Link currentSubIndex: number;
  subTabsController: TabsController = new TabsController();
  subTabsContentList: MenuType[] = new Array();
  @LocalStorageProp("currentSideBarMode") currentSideBarMode: string = 'tabs';

  subControllerChangeIndex(subController: TabsController, index: number) {
    subController.changeIndex(index);
  }

  build() {
    Column() {
      if (StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
        .isShowSecondMenu) {
        Column() {
          SecondaryMenu({
            subTitleNameList: this.subTabsContentList,
            changeIndex: this.subControllerChangeIndex,
            tabsController: this.subTabsController,
            currentSubIndex: $currentSubIndex
          }).height(56)
        }.width('100%')
      }

      SearchModule()
        .visibility(new BreakpointType(true, false, false).GetValue(this.currentBreakpoint) ? Visibility.Visible : Visibility.None)

      Tabs({ barPosition: BarPosition.Start, controller: this.subTabsController, index: this.currentSubIndex }) {
        ForEach(this.subTabsContentList, (item: MenuType, index: number) => {
          if (index === 0) {
            TabContent() {
              Column() {
                if (StyleConfiguration.getSubTabsControllerStyle(this.currentBreakpoint, this.currentSideBarMode)
                  .isShowPageTitle) {
                  SubTabsContentTitle({ subTabsTitleName: item.name })
                }

                RecommendationList()
                  .layoutWeight(1)
                  .margin(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint)
                    .recommendCompMargin)
              }.height('100%').width('100%')
            }
          } else {
            TabContent()
          }
        }, (item: MenuType) => JSON.stringify(item))
      }
      .scrollable(false)
      .layoutWeight(1)
      .barHeight(0)
      .onChange((index: number) => {
        this.currentSubIndex = index;
      })
      .width('100%')
    }
  }
}

@Component
struct SubTabsContentTitle {
  subTabsTitleName: Resource = $r('app.string.recommend');
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';

  build() {
    Row() {
      Text(this.subTabsTitleName)
        .fontSize(20)
        .fontWeight(FontWeight.Medium)
    }
    .width('100%')
    .height(56)
  }
}