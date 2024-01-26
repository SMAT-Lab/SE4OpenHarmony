interface NoticePublish_Params {
    notificationOperations?: NotificationOperations;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NotificationPublish_" + ++__generate__Id;
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
import NotificationOperations from '../feature/NotificationOperations';
import { notificationUtil } from '@ohos/notification';
import { TitleBar } from './TitleBar';
export class NoticePublish extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.notificationOperations = new NotificationOperations(getContext(this));
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NoticePublish_Params) {
        if (params.notificationOperations !== undefined) {
            this.notificationOperations = params.notificationOperations;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private notificationOperations: NotificationOperations;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.justifyContent(FlexAlign.SpaceAround);
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: $r('app.string.notification_publish_title') }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.notification_publish_title')
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Blank.create();
        Blank.pop();
        Scroll.create();
        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceEvenly });
        Flex.width('100%');
        Flex.padding(12);
        Button.createWithLabel($r('app.string.basic_notification'));
        Button.fontSize(16);
        Button.width('86.7%');
        Button.height(40);
        Button.margin(6);
        Button.backgroundColor($r('app.color.notification_button'));
        Button.onClick(this.notificationOperations.publishBasicNotification);
        Button.pop();
        Button.createWithLabel($r('app.string.long_text_notification'));
        Button.fontSize(16);
        Button.width('86.7%');
        Button.height(40);
        Button.margin(6);
        Button.backgroundColor($r('app.color.notification_button'));
        Button.onClick(this.notificationOperations.publishLongTextNotification);
        Button.pop();
        Button.createWithLabel($r('app.string.picture_notification'));
        Button.fontSize(16);
        Button.width('86.7%');
        Button.height(40);
        Button.margin(6);
        Button.backgroundColor($r('app.color.notification_button'));
        Button.onClick(this.notificationOperations.publishPictureNotification);
        Button.pop();
        Button.createWithLabel($r('app.string.multiline_notification'));
        Button.fontSize(16);
        Button.width('86.7%');
        Button.height(40);
        Button.margin(6);
        Button.backgroundColor($r('app.color.notification_button'));
        Button.onClick(this.notificationOperations.publishMultiLineNotification);
        Button.pop();
        Flex.pop();
        Scroll.pop();
        Blank.create();
        Blank.pop();
        Column.pop();
    }
    aboutToAppear() {
        notificationUtil.enableNotification();
    }
}
