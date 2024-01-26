import { StyleConfiguration } from '../common/Configuration';
import { MenuType } from '../model/MenuType';
import { CommonSubTabs } from './CommonSubTabs';

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

@Component
export struct CommonMainTabs {
  @LocalStorageProp("currentBreakpoint") currentBreakpoint: string = 'md';
  @Link currentMainIndex: number;
  @Link currentSubIndex: number;
  mainTabsController: TabsController = new TabsController();
  subTabsController: TabsController = new TabsController();
  mainTabsContentList: MenuType[] = new Array();

  build() {
    Tabs({ barPosition: BarPosition.Start, controller: this.mainTabsController, index: this.currentMainIndex }) {
      ForEach(this.mainTabsContentList, (item: MenuType, index: number) => {
        if (index === 0) {
          TabContent() {
            Column() {
              CommonSubTabs({
                currentSubIndex: $currentSubIndex,
                subTabsController: item.subController,
                subTabsContentList: item.subTitleList
              })
            }.padding(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).mainTabsContentMargin)
            .backgroundColor(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).mainTabsBcColor)
          }
        } else {
          TabContent()
        }
      }, (item: MenuType) => JSON.stringify(item))
    }.scrollable(false).barHeight(0).width('100%').onChange((index: number) => {
      this.currentMainIndex = index;
    })
  }
}