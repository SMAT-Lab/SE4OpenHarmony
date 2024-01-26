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

import { FirstLevelCategory } from './model/CategoricalDataType';
import { HOME_TABS } from './data/HomeData';
import { TabContentNavigation } from './TabContentNavigation';

@Entry
@Component
struct Home {
  // 初始化tabsBar的index值为0
  @State tabsIndex: number = 0;
  @StorageLink('currentBreakpoint') curBp: string = 'sm';

  build() {
    Tabs({ barPosition: this.curBp === 'sm' ? BarPosition.End : BarPosition.Start }) {
      ForEach(HOME_TABS, (item: FirstLevelCategory, index: number) => {
        TabContent() {
          TabContentNavigation({ categories: item.childNodes })
        }
        .tabBar(this.CustomTabBar(item, index))
      }, (item: FirstLevelCategory) => JSON.stringify(item))
    }
    .vertical(this.curBp === 'sm' ? false : true)
    // 大型设备tabbar的高度为40%，小型设备的高度为56vp
    .barHeight(this.curBp === 'sm' ? '56vp' : '40%')
    // 大型设备tabbar的宽度为56vp，小型设备的宽度为100%
    .barWidth(this.curBp === 'sm' ? '100%' : '56vp')
    .barMode(BarMode.Fixed)
    .backgroundColor($r('app.color.background_shallow_grey'))
    .onChange((index: number) => {
      this.tabsIndex = index;
    })
  }

  @Builder CustomTabBar(item: FirstLevelCategory, index: number) {
    Column() {
      Image(this.tabsIndex === index ? item.iconSelected : item.icon)
        .width(24)
        .height(24)
        .margin({ bottom: 4 })

      Text(item.tabBarName)
        .fontSize(10)
        .fontFamily('HarmonyHeiTi-Medium')
        .fontColor(this.tabsIndex === index ? $r('app.color.tab_bar_select') : $r('app.color.tab_bar_unselect'))
    }
    .width('100%')
    .id(`tabBar${index}`)
    .padding({ top: 6, bottom: 6 })
    .alignItems(HorizontalAlign.Center)
  }
}