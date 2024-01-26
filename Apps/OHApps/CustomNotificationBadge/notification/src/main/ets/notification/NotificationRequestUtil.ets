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

interface NotificationRequestUtilResultType {
  slotType: notification.SlotType,
  id: number, // 通知id，默认为1
  content: notification.NotificationContent
}

class NotificationRequestUtil {
  /**
   * init basic NotificationRequest
   * @param notificationContent
   * @return return the created NotificationRequest
   */
  initBasicNotificationRequest(notificationContent: notification.NotificationContent) {
    let result: NotificationRequestUtilResultType = {
      slotType: notification.SlotType.CONTENT_INFORMATION,
      id: 1, // 通知id，默认为1
      content: notificationContent
    }
    return result;
  }
}

export let notificationRequestUtil = new NotificationRequestUtil();