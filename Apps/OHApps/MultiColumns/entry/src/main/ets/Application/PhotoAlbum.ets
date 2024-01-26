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

import { PhotoContent } from '../common/PhotoContent'
import { PhotoSideBar } from '../common/PhotoSideBar'

let storage = LocalStorage.GetShared()

@Entry(storage)
@Component
struct PhotoAlbum {
  @State sideBarStatus: boolean = true
  @LocalStorageLink('currentBreakPoint') currentBreakPoint: string = 'sm'

  build() {
    GridRow() {
      GridCol({ span: { sm: 12, md: 12, lg: 12 } }) {
        SideBarContainer(SideBarContainerType.AUTO) {
          Column() {
            PhotoSideBar().margin({ top: 64 })
          }.backgroundColor('#f1f3f5')

          Column() {
            PhotoContent({ sideBarStatus: $sideBarStatus })
          }
        }
        .controlButton({ left: 24, top: 16, width: 24, height: 24 })
        .onChange((value: boolean) => {
          this.sideBarStatus = value
        })
      }
    }.onBreakpointChange((breakpoint: string) => {
      this.currentBreakPoint = breakpoint
    })
  }
}


