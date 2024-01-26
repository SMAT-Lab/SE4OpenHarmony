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

import { Capabilities } from './components/Capabilities';
import { MenuList } from '@ohos/menuitems';

@Entry
@Component
struct Index {
  @StorageProp('windowWidth') windowWidth: number = 300;
  @StorageProp('isSplitMode') isSplitMode: boolean = false;
  @State title: string = '';

  aboutToAppear() {
    this.title = getContext().resourceManager.getStringSync($r('app.string.device_management').id);
  }

  build() {
    Navigation() {
      Column() {
        MenuList({ menuList: $r('app.strarray.device_management_list') }) {
          Capabilities()
        }
      }
      .padding(16)
    }
    .title(this.CustomTitle())
    .mode(this.isSplitMode ? NavigationMode.Split : NavigationMode.Stack)
    .navBarWidth(0.4 * this.windowWidth)
    .titleMode(NavigationTitleMode.Full)
    .hideToolBar(true)
    .width('100%')
    .height('100%')
    .backgroundColor($r("app.color.list_background"))
  }

  @Builder
  CustomTitle() {
    Row() {
      Text(this.title)
        .fontColor($r("app.color.list_title"))
        .fontSize(26)
        .fontWeight(FontWeight.Medium)
        .padding({left: 16})
        .margin({bottom: 10})
    }
    .width('100%')
    .height('100%')
    .alignItems(VerticalAlign.Bottom)
  }
}