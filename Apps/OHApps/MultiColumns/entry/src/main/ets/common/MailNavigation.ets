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

import { BreakpointType } from './BreakpointSystem'
import { MailContent } from './MailContent'

@Component
export struct MailNavigation {
  @State pathInfo: NavPathStack = new NavPathStack()
  @State currentIndex: number = 0
  @State mailList: string[] = ['1', '1', '1', '1', '1', '1']
  @LocalStorageProp('currentBreakPoint') currentBreakPoint: string = 'md'

  @Builder
  myRouter(name: string, param?: number | undefined) {
    MailContent()
  }

  @Builder
  NavigationMenus() {
    if (this.currentBreakPoint !== 'md') {
      Row() {
        Image($r('app.media.add'))
          .width(24)
          .height(24)
        Image($r('app.media.more'))
          .width(24)
          .height(24)
          .margin({ left: 24, right: 0 })
      }.height(56).padding({ top: 48 })
    }
  }

  @Builder
  NavigationTitle() {
    Column() {
      Text($r('app.string.recvBox'))
        .fontColor('#000')
        .fontSize(30)
        .lineHeight(41)
        .fontWeight(FontWeight.Medium)
      Text('jiaozi@xxx.com')
        .fontColor('#99000000')
        .fontSize(14)
        .lineHeight(20)
        .margin({ top: 2 })
    }.alignItems(HorizontalAlign.Start).height(162).width(138).padding({ top: 80, left: 24 })
  }

  aboutToAppear() {
    this.pathInfo.pushPath({ name: 'one' })
  }

  build() {
    Navigation(this.pathInfo) {
      Stack({ alignContent: Alignment.Start }) {
        Column() {
          Row() {
            Search({ placeholder: $r('app.string.searchMail') }).margin({ left: 12, right: 12 })
          }.height(56)

          List() {
            ForEach(this.mailList, (item: string, index: number | undefined) => {
              ListItem() {
                Column() {
                  Row() {

                    Text($r('app.string.nonSense')).fontSize(16).lineHeight(22).fontColor('#1818a')
                    Blank()
                    Text('4/12').fontSize(12).opacity(0.6)
                  }.width('100%')

                  Column() {
                    Text($r('app.string.textPartOne')).lineHeight(19).fontSize(14).fontColor('#1818a')
                    Text($r('app.string.textPartTwo'))
                      .fontSize(14)
                      .fontColor('#1818a')
                      .opacity(0.6)
                      .lineHeight(19)
                  }.width('100%').alignItems(HorizontalAlign.Start)
                }.height(96).justifyContent(FlexAlign.Center)
              }.padding({ left: 12, right: 12 })
              .backgroundColor(index === 2 ? '#19254ff7' : '')
              .borderRadius(10)
            })
          }.divider({ strokeWidth: 1, startMargin: 12, endMargin: 12 })
          .height('100%').width('100%')
          .layoutWeight(1)
        }.height('100%').width('100%')
        .padding({ left: 12, right: 12 })

        if (this.currentBreakPoint !== 'lg') {
          Image($r('app.media.ic_public_list_add_light')).width(48).height(48).position({ x: 240, y: 549 })
        }
      }
    }
    .navBarWidth(new BreakpointType(321, 321, 390).GetValue(this.currentBreakPoint) as number | Length)
    .navDestination(this.myRouter)
    .menus(this.NavigationMenus)
    .width('100%')
    .title({ builder: this.NavigationTitle, height: 162 })
    .hideBackButton(true)
  }
}