/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NotificationList } from '../components/NotificationList';
import { NoticePublish } from '../components/NotificationPublish';

export interface TabImage {
  selectedImage: Resource,
  unselectedImage: Resource,
}

const MESSAGE_TAB: TabImage = {
  selectedImage: $r('app.media.ic_messages_filled'),
  unselectedImage: $r('app.media.ic_messages'),
}
const NOTIFICATION_TAB: TabImage = {
  selectedImage: $r('app.media.ic_public_send_filled'),
  unselectedImage: $r('app.media.ic_public_send'),
}

interface TAB_INDEX_TYPE {
  MESSAGE_TAB: number
  NOTIFICATION_TAB: number
}

const TAB_INDEX: TAB_INDEX_TYPE = {
  MESSAGE_TAB: 0,
  NOTIFICATION_TAB: 1
}

@Entry
@Component
struct Index {
  @State tabsIndex: number = 0

  @Builder TabBarBuilder(index: number, item: TabImage, tabBarName: Resource) {

    Column() {
      Image(this.tabsIndex === index ? item.selectedImage : item.unselectedImage)
        .width(24)
        .height(24)
        .margin({ bottom: 10 })
      Text(tabBarName)
        .fontSize(10)

    }
    .width('100%')
    .padding({ top: 0, bottom: 0 })
    .alignItems(HorizontalAlign.Center)
    .id(`tabBar${index}`)
  }

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End }) {
        TabContent() {
          Column() {
            if (this.tabsIndex === TAB_INDEX.MESSAGE_TAB) {
              NotificationList()
            }
            Blank()
          }
          .height('100%')
        }
        .tabBar(this.TabBarBuilder(TAB_INDEX.MESSAGE_TAB, MESSAGE_TAB, $r('app.string.messages_list_title')))

        TabContent() {
          Column() {
            NoticePublish()
            Blank()
          }
          .height('100%')
        }
        .tabBar(this.TabBarBuilder(TAB_INDEX.NOTIFICATION_TAB, NOTIFICATION_TAB, $r('app.string.notification_publish_title')),)
      }
      .barHeight(74)
      .barWidth('100%')
      .vertical(false)
      .onChange((index: number) => {
        this.tabsIndex = index
      })

    }.width('100%').height('100%')
    .backgroundColor($r('app.color.background_light_gray'))
  }
}
