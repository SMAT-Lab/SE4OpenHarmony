let __generate__Id: number = 0;
function generateId(): string {
    return "NotificationContentUtil_" + ++__generate__Id;
}
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
    contentType: notification.ContentType;
    normal?: notification.NotificationBasicContent;
    longText?: notification.NotificationLongTextContent;
    multiLine?: notification.NotificationMultiLineContent;
    picture?: notification.NotificationPictureContent;
}
class NotificationContentUtil {
    /**
     * init basic notification content
     * @param basicContent
     * @return return the created NotificationContent
     */
    initBasicNotificationContent(basicContent: notification.NotificationBasicContent) {
        let result: NotificationContentUtilResultType = {
            contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
            normal: basicContent // 基本类型通知内容
        };
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
            contentType: notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
            longText: {
                title: basicContent.title,
                text: basicContent.text,
                additionalText: basicContent.additionalText ? basicContent.additionalText : '',
                longText: notificationLongText,
                briefText: notificationBriefText,
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
            contentType: notification.ContentType.NOTIFICATION_CONTENT_MULTILINE,
            multiLine: {
                title: basicContent.title,
                text: basicContent.text,
                additionalText: basicContent.additionalText ? basicContent.additionalText : '',
                briefText: notificationBriefText,
                longTitle: notificationLongTitle,
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
            contentType: notification.ContentType.NOTIFICATION_CONTENT_PICTURE,
            picture: {
                title: basicContent.title,
                text: basicContent.text,
                additionalText: basicContent.additionalText ? basicContent.additionalText : '',
                briefText: notificationBriefText,
                expandedTitle: notificationExpandedTitle,
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
            contentType: notification.ContentType.NOTIFICATION_CONTENT_CONVERSATION,
            normal: basicContent // 基本类型通知内容
        };
        return result;
    }
}
export let notificationContentUtil = new NotificationContentUtil();
