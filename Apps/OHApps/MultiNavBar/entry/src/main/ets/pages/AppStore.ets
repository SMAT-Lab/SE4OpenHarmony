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

import { MenuType } from '../model/MenuType';
import { sideListData } from '../model/SideListData';
import { CommonMainTabs } from '../common/CommonMainTabs';
import { StyleConfiguration } from '../common/Configuration';
import { SideBarController } from '../common/SideBarController';
import { BreakpointType, SideBarMode } from '../common/BreakpointSystem';

let storage = LocalStorage.GetShared();

@Entry(storage)
@Component
struct AppStore {
  @LocalStorageLink("currentBreakpoint") currentBreakpoint: string = 'md';
  @LocalStorageLink("currentSideBarMode") @Watch('onCurrentSideBarModeChange') currentSideBarMode: string = 'tabs';
  @State sideListData: MenuType[] = sideListData;
  @State currentMainIndex: number = 0;
  @State currentSubIndex: number = 0;
  mainController: TabsController = new TabsController();
  @State sideBarWidth: number = 64;

  onCurrentSideBarModeChange() {
    animateTo({ duration: 300 }, () => {
      if (this.currentSideBarMode === 'list') {
        let sideBarWidth = new BreakpointType(0, 64, 96).GetValue(this.currentBreakpoint);
        this.sideBarWidth = sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
      } else {
        this.sideBarWidth = 240;
      }
    })
  }

  getMinSideBarWidth() {
    let sideBarWidth = new SideBarMode(this.sideBarWidth, 240).GetValue(this.currentSideBarMode);
    return sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
  }

  getMaxSideBarWidth() {
    let sideBarWidth = new SideBarMode(this.sideBarWidth, 280).GetValue(this.currentSideBarMode);
    return sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
  }

  build() {
    GridRow({ columns: { sm: 3, md: 6, lg: 9 } }) {
      GridCol({ span: { sm: 3, md: 6, lg: 9 } }) {
        Column() {
          // md、lg模式
          Column() {
            SideBarContainer() {
              Column() {
                SideBarController({
                  currentMainIndex: $currentMainIndex,
                  currentSubIndex: $currentSubIndex,
                  mainController: this.mainController
                })
              }

              Column() {
                CommonMainTabs({
                  currentMainIndex: $currentMainIndex,
                  currentSubIndex: $currentSubIndex,
                  mainTabsController: this.mainController,
                  subTabsController: this.sideListData[this.currentMainIndex].subController,
                  mainTabsContentList: this.sideListData,
                })
              }.width('100%').height('100%').backgroundColor($r('sys.color.ohos_id_color_background'))
            }
            .showControlButton(false)
            .backgroundColor('#f1f3f5')
            .controlButton(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint)
              .controlButtonStyle)
            .autoHide(false)
            .sideBarWidth(this.sideBarWidth)
            .minSideBarWidth(this.getMinSideBarWidth())
            .maxSideBarWidth(this.getMaxSideBarWidth())
          }
          .visibility(this.currentBreakpoint !== 'sm' ? Visibility.Visible : Visibility.None)

          // sm模式
          Column() {
            CommonMainTabs({
              currentMainIndex: $currentMainIndex,
              currentSubIndex: $currentSubIndex,
              mainTabsController: this.mainController,
              subTabsController: this.sideListData[this.currentMainIndex].subController,
              mainTabsContentList: this.sideListData,
            }).layoutWeight(1)

            SideBarController({
              currentMainIndex: $currentMainIndex,
              currentSubIndex: $currentSubIndex,
              mainController: this.mainController
            }).height(56)
          }
          .visibility(this.currentBreakpoint === 'sm' ? Visibility.Visible : Visibility.None)
        }
      }
    }.onBreakpointChange((breakpoints: string) => {
      this.currentBreakpoint = breakpoints;
      setTimeout(() => {
        animateTo({ duration: 300 }, () => {
          if (this.currentSideBarMode === 'list') {
            let sideBarWidth = new BreakpointType(0, 64, 96).GetValue(this.currentBreakpoint);
            this.sideBarWidth = sideBarWidth === undefined ? this.sideBarWidth : sideBarWidth;
          }
        })
      }, 100)
    })
  }
}
