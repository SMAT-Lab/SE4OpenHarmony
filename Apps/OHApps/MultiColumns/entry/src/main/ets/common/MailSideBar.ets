/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MailType } from '../model/dataType'

@Extend(Text) function TextStyle() {
  .backgroundColor('#254ff7')
  .fontColor('#fff')
  .fontSize(10)
  .textAlign(TextAlign.Center)
}

@Component
export struct MailSideBar {
  build() {
    Column() {
      AccountInfo()

      MailStatusList()
    }.width('100%')
  }
}

@Component
struct AccountInfo {
  @State accountList: string[] = [
    'jiaozi@xxx.com',
    'jiaozi@163.com',
  ]

  @Builder accountInfo() {
    Column() {
      Row() {
        Text($r('app.string.account'))
          .fontSize(14)
          .fontColor($r('sys.color.ohos_id_color_text_secondary'))
          .fontWeight(FontWeight.Medium)
        Blank()
        Text($r('app.string.addAccount'))
          .fontSize(14)
          .fontColor('#0a59f7')
          .fontWeight(FontWeight.Medium)
      }.width('100%').height(48)
    }.margin({ top: 78 }).padding({ left: 16, right: 16 })
  }

  build() {
    Column() {
      this.accountInfo()
      List() {
        ForEach(this.accountList, (item: string, index: number | undefined) => {
          ListItem() {
            Row() {
              Text()
                .width(12)
                .height(12)
                .borderRadius(8)
                .backgroundColor(index === 0 ? '#61cfbe' : '#fec700')
              Text(item)
                .fontSize(16)
                .fontColor(index === 0 ? '#000' : '#E5000000')
                .margin({ left: 13 })
              Blank()
              if (index === 0) {
                Image($r('app.media.ic_confirm')).width(16)
                  .height(16).fillColor('#244ff7')
              } else {
                Text('9')
                  .width(18)
                  .height(18)
                  .borderRadius(18)
                  .TextStyle()
              }
            }.width('100%').height(56)
          }
        })
      }
      .width('100%')
      .height('100%')
      .padding({ left: 16, right: 16 })
      .divider({ strokeWidth: 1 })
    }
  }
}

@Component
struct MailStatusList {
  @State mailState: MailType[] = [
    new MailType($r('app.string.recvBox'), 3, $r('app.media.inbox')),
    new MailType($r('app.string.unRead'), 5, $r('app.media.unread')),
    new MailType($r('app.string.sended'), 9, $r('app.media.ic_favourites')),
    new MailType($r('app.string.allFolders'), 0, $r('app.media.allFolders'))
  ]

  @Builder accountInfo() {
    Column() {
      Row() {
        Text($r('app.string.account')).fontSize(14)
        Blank()
        Text($r('app.string.addAccount'))
          .fontSize(14)
          .fontColor('#0a59f7')
      }.width('100%').height(48)
    }
  }

  build() {
    List() {
      ListItem() {
        this.accountInfo()
      }.padding({ left: 9, right: 9 })

      ForEach(this.mailState, (item: MailType, index: number | undefined) => {
        ListItem() {
          Row() {
            Image(item.src).width(24).height(24)
            Text(item.type)
              .fontSize(16)
              .margin({ left: 16 })
              .fontColor(index === 0 ? '#000' : '#e5000000')
              .fontWeight(FontWeight.Medium)
            Blank()
            if (index === this.mailState.length - 1) {
              Image($r('app.media.ic_settings_arrow')).width(12).height(24).rotate({ angle: 90 })
            } else {
              Text(item.num.toString())
                .fontColor('#18181a')
                .fontSize(14)
            }
          }.width('100%')
        }.padding({ left: 14, right: 24 })
        .height(56)
        .backgroundColor(index === 0 ? '#19254ff7' : '')
        .borderRadius(16)
      })
    }.width('100%').height('100%')
    .padding({ left: 7, right: 7 })
    .margin({ top: 8 })
    .divider({ strokeWidth: 1, startMargin: 12, endMargin: 12 })
  }
}