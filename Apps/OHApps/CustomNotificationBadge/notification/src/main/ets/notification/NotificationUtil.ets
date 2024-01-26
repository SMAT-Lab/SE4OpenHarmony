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
import { notificationManagement } from '../notification/NotificationManagementUtil';

const TAG: string = 'NotificationUtilModel';

class NotificationUtil {
  /**
   * enable notification
   */
  private id: number = 0

  async enableNotification() {
    try {
      await notification.requestEnableNotification();
      logger.info(TAG, `enableNotification success`);
    } catch (err) {
      logger.info(TAG, `enableNotification err ${JSON.stringify(err)}`);
    }
  }

  /**
   *
   * @param notificationRequest
   * @param id, Support specifying notification id when publishing notifications
   */
  async publishNotification(notificationRequest: notification.NotificationRequest, group?: string) {
    notificationRequest.id = this.id;
    this.id++;
    if (group) {
      notificationRequest.groupName = group;
    }

    try {
      await notification.publish(notificationRequest);
      logger.info(TAG, `publish notification success`);
      // 通知管理器添加新通知
      await notificationManagement.addNotification(notificationRequest);
    } catch (err) {
      if (err) {
        logger.info(TAG, `publishNotification err ${JSON.stringify(err)}`);
      }
    }
  }

  /**
   * cancel notification by id
   */
  async cancelNotificationById(id: number) {
    try {
      await notification.cancel(id);
      logger.info(TAG, `cancel success`);
    } catch (err) {
      if (err) {
        logger.info(TAG, `cancel err ${JSON.stringify(err)}`);
      }
    }
  }

  /**
   * cancel all notification
   */
  async cancelAllNotifications() {
    try {
      await notification.cancelAll();
      logger.info(TAG, `cancel all success`);
    } catch (err) {
      if (err) {
        logger.info(TAG, `cancel all err ${JSON.stringify(err)}`);
      }
    }
  }
}

export let notificationUtil = new NotificationUtil();
