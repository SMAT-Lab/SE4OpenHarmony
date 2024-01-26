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

import image from '@ohos.multimedia.image';
import notification from '@ohos.notificationManager';

interface NotificationContentUtilResultType {
  contentType: notification.ContentType
  normal?: notification.NotificationBasicContent
  longText?: notification.NotificationLongTextContent
  multiLine?: notification.NotificationMultiLineContent
  picture?: notification.NotificationPictureContent
}

class NotificationContentUtil {
  /**
   * init basic notification content
   * @param basicContent
   * @return return the created NotificationContent
   */
  initBasicNotificationContent(basicContent: notification.NotificationBasicContent) {
    let result: NotificationContentUtilResultType = {
      contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT, // 通知内容类型
      normal: basicContent // 基本类型通知内容
    }
    return result;
  }

  /**
   *  init longText notification content
   *
   * @param basicContent
   * @param notificationLongText
   * @param notificationBriefText
   * @param notificationExpandedTitle
   * @return return the created NotificationContent
   */
  initNotificationLongTextContent(basicContent: notification.NotificationBasicContent, notificationLongText: string, notificationBriefText: string, notificationExpandedTitle: string) {
    let result: NotificationContentUtilResultType = {
      contentType: notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT, // 通知内容类型
      longText: {
        title: basicContent.title, // 通知标题
        text: basicContent.text, // 通知内容
        additionalText: basicContent.additionalText ? basicContent.additionalText : '', // 通知次要内容
        longText: notificationLongText, // 通知的长文本
        briefText: notificationBriefText, // 通知概要内容，是对通知内容的总结
        expandedTitle: notificationExpandedTitle // 通知展开时的标题
      }
    };
    return result;
  }

  /**
   * init multiline notification content
   * @param basicContent
   * @param notificationBriefText
   * @param notificationLongTitle
   * @param notificationLines
   * @return return the created NotificationContent
   */
  initNotificationMultiLineContent(basicContent: notification.NotificationBasicContent, notificationBriefText: string, notificationLongTitle: string, notificationLines: Array<string>) {
    let result: NotificationContentUtilResultType = {
      contentType: notification.ContentType.NOTIFICATION_CONTENT_MULTILINE, // 通知内容类型
      multiLine: {
        title: basicContent.title, // 通知标题
        text: basicContent.text, // 通知内容
        additionalText: basicContent.additionalText ? basicContent.additionalText : '', // 通知次要内容，是对通知内容的补充
        briefText: notificationBriefText, // 通知概要内容，是对通知内容的总结
        longTitle: notificationLongTitle, // 通知展开时的标题
        lines: notificationLines // 通知的多行文本
      }
    };
    return result;
  }

  /**
   * init picture notification content
   * @param basicContent
   * @param notificationBriefText
   * @param notificationExpandedTitle
   * @param notificationPicture
   * @return return the created NotificationContent
   */
  initNotificationPictureContent(basicContent: notification.NotificationBasicContent, notificationBriefText: string, notificationExpandedTitle: string, notificationPicture: image.PixelMap) {
    let result: NotificationContentUtilResultType = {
      contentType: notification.ContentType.NOTIFICATION_CONTENT_PICTURE, // 通知内容类型
      picture: {
        title: basicContent.title, // 通知标题
        text: basicContent.text, // 通知内容
        additionalText: basicContent.additionalText ? basicContent.additionalText : '', // 通知次要内容，是对通知内容的补充
        briefText: notificationBriefText, // 通知概要内容，是对通知内容的总结
        expandedTitle: notificationExpandedTitle, // 通知展开时的标题
        picture: notificationPicture // 通知的图片
      }
    };
    return result;
  }


  /**
   * init conversation notification content
   * @param basicContent
   * @return return the created NotificationContent
   */
  initNotificationConversationContent(basicContent: notification.NotificationBasicContent) {
    let result: NotificationContentUtilResultType = {
      contentType: notification.ContentType.NOTIFICATION_CONTENT_CONVERSATION, // 通知内容类型
      normal: basicContent // 基本类型通知内容
    };
    return result;
  }
}

export let notificationContentUtil = new NotificationContentUtil();