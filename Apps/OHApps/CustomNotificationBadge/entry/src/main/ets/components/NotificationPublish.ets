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

@Component
export struct NoticePublish {
  private notificationOperations: NotificationOperations = new NotificationOperations(getContext(this));

  @Styles buttonStyle(){
    .width('86.7%')
    .height(40)
    .margin(6)
    .backgroundColor($r('app.color.notification_button'))
  }

  build() {

    Column() {
      TitleBar({ title: $r('app.string.notification_publish_title') })
      Blank()
      Scroll() {
        Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceEvenly }) {
          Button($r('app.string.basic_notification'))
            .fontSize(16)
            .buttonStyle()
            .onClick(this.notificationOperations.publishBasicNotification)
          Button($r('app.string.long_text_notification'))
            .fontSize(16)
            .buttonStyle()
            .onClick(this.notificationOperations.publishLongTextNotification)
          Button($r('app.string.picture_notification'))
            .fontSize(16)
            .buttonStyle()
            .onClick(this.notificationOperations.publishPictureNotification)
          Button($r('app.string.multiline_notification'))
            .fontSize(16)
            .buttonStyle()
            .onClick(this.notificationOperations.publishMultiLineNotification)

        }
        .width('100%')
        .padding(12)

      }

      Blank()
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.SpaceAround)
  }

  aboutToAppear() {
    notificationUtil.enableNotification();
  }
}