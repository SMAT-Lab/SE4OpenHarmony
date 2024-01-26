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

import router from '@ohos.router';
import { Capabilities } from './components/Capabilities';
import { MenuList } from '@ohos/menuitems';
import { getString, logger } from '@ohos/common';

const TAG: string = 'Index';

@Entry
@Component
struct Index {
  @StorageProp('windowWidth') windowWidth: number = 300;
  @StorageProp('isSplitMode') isSplitMode: boolean = false;
  @State title: string = '';

  aboutToAppear() {
    this.title = getContext().resourceManager.getStringSync($r('app.string.lable_name').id);
  }

  build() {
    Navigation() {
      Divider()
        .strokeWidth('1px')
        .color($r('sys.color.ohos_id_color_list_separator'))
      MenuList({
        menuList: $r('app.strarray.language_base_class_library_list'),
        addAction: (title: string) => {
          logger.info(TAG, `addAction: title = ${title}`)
          switch (title) {
            case getString($r('app.string.deque')):
            case getString($r('app.string.linked_list')):
            case getString($r('app.string.list')):
            case getString($r('app.string.queue')):
            case getString($r('app.string.stack')):
            case getString($r('app.string.vector')):
            case getString($r('app.string.array_list')):
              router.pushUrl({ url: 'pages/AddInformationView', params: { 'title': title } })
              break;
            case getString($r('app.string.hash_map')):
            case getString($r('app.string.light_weight_map')):
            case getString($r('app.string.plain_array')):
            case getString($r('app.string.tree_map')):
              router.pushUrl({ url: 'pages/AddKeyValuePairView', params: { 'title': title } })
              break;
            case getString($r('app.string.hash_set')):
            case getString($r('app.string.light_weight_set')):
            case getString($r('app.string.tree_set')):
              router.pushUrl({ url: 'pages/AddStringView', params: { 'title': title } })
              break;
          }
        }
      }) {
        Capabilities()
      }
    }
    .title(this.CustomTitle())
    .mode(this.isSplitMode ? NavigationMode.Split : NavigationMode.Stack)
    .navBarWidth(0.4 * this.windowWidth)
    .titleMode(NavigationTitleMode.Mini)
    .hideToolBar(true)
    .width('100%')
    .height('100%')
    .backgroundColor($r("sys.color.ohos_id_color_sub_background"))
  }

  @Builder
  CustomTitle() {
    Row() {
      Text(this.title)
        .fontColor($r('app.color.black'))
        .fontSize(26)
        .fontWeight(FontWeight.Bold)
    }
    .height(56)
    .width('100%')
  }
}