interface NotificationItem_Params {
    notificationNum?: number;
    notifications?: notification.NotificationRequest[];
    title?: Resource | null;
    content?: string;
}
interface NotificationList_Params {
    groupNotifications?: Array<Array<notification.NotificationRequest>>;
    countsByType?: Array<number>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NotificationList_" + ++__generate__Id;
}
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
export class NotificationList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__groupNotifications = new ObservedPropertyObject([], this, "groupNotifications");
        this.__countsByType = new ObservedPropertyObject([], this, "countsByType");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NotificationList_Params) {
        if (params.groupNotifications !== undefined) {
            this.groupNotifications = params.groupNotifications;
        }
        if (params.countsByType !== undefined) {
            this.countsByType = params.countsByType;
        }
    }
    aboutToBeDeleted() {
        this.__groupNotifications.aboutToBeDeleted();
        this.__countsByType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __groupNotifications: ObservedPropertyObject<Array<Array<notification.NotificationRequest>>>;
    get groupNotifications() {
        return this.__groupNotifications.get();
    }
    set groupNotifications(newValue: Array<Array<notification.NotificationRequest>>) {
        this.__groupNotifications.set(newValue);
    }
    private __countsByType: ObservedPropertyObject<Array<number>>;
    get countsByType() {
        return this.__countsByType.get();
    }
    set countsByType(newValue: Array<number>) {
        this.__countsByType.set(newValue);
    }
    aboutToAppear() {
        notificationManagement.getAllNotifications().then((data) => {
            this.groupNotifications = data.groupNotifications;
            this.countsByType = data.countsByType;
            logger.info("getAllNotifications data: " + JSON.stringify(data));
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: $r('app.string.messages_list_title') }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.messages_list_title')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        List.create({ space: 15 });
        List.width('100%');
        ForEach.create("4", this, ObservedObject.GetRawObject(this.countsByType), (num: number, index: number) => {
            If.create();
            if (this.groupNotifications[index].length) {
                If.branchId(0);
                ListItem.create();
                __Common__.create();
                __Common__.onClick(() => {
                    if (this.countsByType[index]) {
                        notificationManagement.cancelNotificationType(this.groupNotifications[index][0].content.contentType);
                        let currentBadgeNum = notificationManagement.getBadgeNumber();
                        currentBadgeNum -= this.countsByType[index];
                        this.countsByType[index] = 0;
                        notificationManagement.setBadgeNumber(currentBadgeNum);
                    }
                });
                let earlierCreatedChild_3: NotificationItem = (this && this.findChildById) ? this.findChildById("3") as NotificationItem : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new NotificationItem("3", this, {
                        notifications: this.groupNotifications[index],
                        notificationNum: this.countsByType[index],
                    }));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({
                        notifications: this.groupNotifications[index],
                        notificationNum: this.countsByType[index]
                    });
                    View.create(earlierCreatedChild_3);
                }
                __Common__.pop();
                ListItem.pop();
            }
            If.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
export class NotificationItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__notificationNum = new ObservedPropertySimple(0, this, "notificationNum");
        this.__notifications = new ObservedPropertyObject([], this, "notifications");
        this.title = null;
        this.content = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NotificationItem_Params) {
        if (params.notificationNum !== undefined) {
            this.notificationNum = params.notificationNum;
        }
        if (params.notifications !== undefined) {
            this.notifications = params.notifications;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__notificationNum.aboutToBeDeleted();
        this.__notifications.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __notificationNum: ObservedPropertySimple<number>;
    get notificationNum() {
        return this.__notificationNum.get();
    }
    set notificationNum(newValue: number) {
        this.__notificationNum.set(newValue);
    }
    private __notifications: ObservedPropertyObject<notification.NotificationRequest[]>;
    get notifications() {
        return this.__notifications.get();
    }
    set notifications(newValue: notification.NotificationRequest[]) {
        this.__notifications.set(newValue);
    }
    private title: Resource | null;
    private content: string;
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
    render() {
        Row.create();
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Row.height(72);
        Row.margin({ left: 10, right: 10 });
        Row.padding(16);
        Badge.create({
            count: this.notificationNum,
            position: BadgePosition.Right,
            style: { badgeSize: 16, badgeColor: $r('app.color.badge_color'), fontSize: 10 }
        });
        Badge.width('95%');
        Badge.margin({ left: 10, right: 15 });
        Column.create();
        Column.width('100%');
        Column.height(64);
        Text.create(this.title);
        Text.alignSelf(ItemAlign.Start);
        Text.fontWeight(500);
        Text.fontSize(16);
        Text.lineHeight(22);
        Text.pop();
        Text.create(this.content);
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 0 });
        Text.fontSize(14);
        Text.lineHeight(19);
        Text.opacity(0.6);
        Text.pop();
        Column.pop();
        Badge.pop();
        Row.pop();
    }
}
