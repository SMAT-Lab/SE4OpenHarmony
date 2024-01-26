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

import notification from '@ohos.notificationManager';
import { notificationManagement } from '@ohos/notification';
import { logger } from '@ohos/notification';
import { TitleBar } from './/TitleBar';

@Component
export struct NotificationList {
  @State groupNotifications: Array<Array<notification.NotificationRequest>> = [];
  @State countsByType: Array<number> = [];

  aboutToAppear() {
    notificationManagement.getAllNotifications().then((data) => {
      this.groupNotifications = data.groupNotifications;
      this.countsByType = data.countsByType;
      logger.info("getAllNotifications data: " + JSON.stringify(data));
    })
  }

  build() {
    Column() {
      TitleBar({ title: $r('app.string.messages_list_title') })
      List({ space: 15 }) {
        ForEach(this.countsByType, (num: number, index: number) => {
          if (this.groupNotifications[index].length) {
            ListItem() {
              NotificationItem({
                notifications: this.groupNotifications[index],
                notificationNum: this.countsByType[index],
              })
                .onClick(() => {
                  if (this.countsByType[index]) {
                    notificationManagement.cancelNotificationType(this.groupNotifications[index][0].content.contentType);
                    let currentBadgeNum = notificationManagement.getBadgeNumber();
                    currentBadgeNum -= this.countsByType[index];
                    this.countsByType[index] = 0;
                    notificationManagement.setBadgeNumber(currentBadgeNum);
                  }
                })
            }
          }
        })
      }.width('100%')
    }.width('100%')

  }
}


@Component
export struct NotificationItem {
  @State notificationNum: number = 0;
  @State notifications: notification.NotificationRequest[] = [];
  private title: Resource | null = null;
  private content: string = '';

  aboutToAppear() {
    switch (this.notifications[0].content.contentType) {
      case notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT: {
        this.title = $r('app.string.basic_notification');
        if (this.notifications[0].content.normal) {
          this.content = this.notifications[0].content.normal.text;
        }
        break;
      }
      case notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT: {
        this.title = $r('app.string.long_text_notification');
        if (this.notifications[0].content.longText) {
          this.content = this.notifications[0].content.longText.text;
        }
        break;
      }
      case notification.ContentType.NOTIFICATION_CONTENT_PICTURE: {
        this.title = $r('app.string.picture_notification');
        if (this.notifications[0].content.picture) {
          this.content = this.notifications[0].content.picture.text;
        }
        break;
      }
      case notification.ContentType.NOTIFICATION_CONTENT_MULTILINE: {
        this.title = $r('app.string.multiline_notification');
        if (this.notifications[0].content.multiLine) {
          this.content = this.notifications[0].content.multiLine.text;
        }
        break;
      }
    }
  }

  build() {
    Row() {
      Badge({
        count: this.notificationNum,
        position: BadgePosition.Right,
        style: { badgeSize: 16, badgeColor: $r('app.color.badge_color'), fontSize: 10 }
      }) {
        Column() {
          Text(this.title)
            .alignSelf(ItemAlign.Start)
            .fontWeight(500)
            .fontSize(16)
            .lineHeight(22)
          Text(this.content)
            .alignSelf(ItemAlign.Start)
            .margin({ top: 0 })
            .fontSize(14)
            .lineHeight(19)
            .opacity(0.6)
        }.width('100%')
        .height(64)
      }.width('95%')
      .margin({ left: 10, right: 15 })
    }
    .backgroundColor(Color.White)
    .borderRadius(24)
    .height(72)
    .margin({ left: 10, right: 10 })
    .padding(16)
  }
}