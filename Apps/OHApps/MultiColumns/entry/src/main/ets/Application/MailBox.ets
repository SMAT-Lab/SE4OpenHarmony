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

import { BreakpointType } from '../common/BreakpointSystem'
import { MailNavigation } from '../common/MailNavigation'
import { MailSideBar } from '../common/MailSideBar'

let storage = LocalStorage.GetShared()

@Entry(storage)
@Component
struct MailBox {
  @LocalStorageLink('currentBreakPoint') currentBreakPoint: string = 'md'
  @State isFold: boolean = false
  @State sideBarWidth: number = 304

  build() {
    GridRow() {
      GridCol({ span: { sm: 12, md: 12, lg: 12 } }) {
        SideBarContainer(SideBarContainerType.AUTO) {
          // Area A
          Column() {
            MailSideBar()
          }.width('100%').height('100%').backgroundColor('#f1f3f5')

          // Area B+C
          Column() {
            Stack() {
              MailNavigation()
              if (this.isFold && this.currentBreakPoint !== 'lg') {
                Column().width('100%').height('100%').backgroundColor('#33000000')
              }
            }
          }.height('100%').width('100%')
        }
        .sideBarWidth(this.sideBarWidth)
        .minSideBarWidth(240)
        .minContentWidth(this.currentBreakPoint === 'sm' ? 360 : 600)
        .controlButton({ left: 24, top: 40, width: 24, height: 24 })
        .showSideBar(this.currentBreakPoint === 'lg')
        .onChange((value: boolean) => {
          this.isFold = value
        })
      }
    }.onBreakpointChange((breakpoint: string) => {
      this.currentBreakPoint = breakpoint
    })
  }
}



