/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
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
import { logger } from '../util/Logger';

const NOTIFICATION_TYPE_SIZE = 5;

interface getAllNotificationsResultType {
  groupNotifications: Array<Array<notification.NotificationRequest>>
  countsByType: Array<number>
}

// 通知管理
class NotificationManagementUtil {
  typeNotifications: Array<Array<notification.NotificationRequest>> = new Array(NOTIFICATION_TYPE_SIZE + 1);
  countsByType: Array<number> = new Array(NOTIFICATION_TYPE_SIZE + 1);
  badgeNum: number = 0;

  constructor() {
    this.countsByType.fill(0);
    for (let i = 0; i < NOTIFICATION_TYPE_SIZE + 1; i++) {
      this.typeNotifications[i] = new Array();
    }
    // 获取当前应用所有通知
    notification.getActiveNotifications().then((notifications) => {
      for (let i = 0; i < notifications.length; i++) {
        let typeId = notifications[i].content.contentType;
        this.countsByType[typeId] += 1;
        this.typeNotifications[typeId].push(notifications[i]);
      }
      logger.info(`getAllActiveNotifications success, data: ${JSON.stringify(notifications)}`)
      // 计算角标数量
      this.countsByType.forEach((num: number) => {
        this.badgeNum += num;
      })
    })
  }

  // 取消属于该类型的通知
  cancelNotificationType(typeId: number) {
    this.typeNotifications[typeId].forEach(item => {
      notification.cancel(item.id);
    })
  }

  // 设置角标
  async setBadgeNumber(num: number) {
    await notification.setBadgeNumber(num).then(() => {
      this.badgeNum = num;
      logger.info("displayBadge success");
    });
  }

  // 获取角标数量
  getBadgeNumber(): number {
    return this.badgeNum;
  }

  // 添加一条消息
  async addNotification(notification: notification.NotificationRequest) {
    const typeId = notification.content.contentType;
    this.typeNotifications[typeId].push(notification);
    this.countsByType[typeId] += 1;
    this.badgeNum += 1;
    await notificationManagement.setBadgeNumber(this.badgeNum);
    logger.info("add Message success");
  }

  // 获取当前所有消息及数量
  async getAllNotifications() {
    let result: getAllNotificationsResultType = {
      groupNotifications: this.typeNotifications,
      countsByType: this.countsByType
    }
    return result;
  }
}

export let notificationManagement = new NotificationManagementUtil();