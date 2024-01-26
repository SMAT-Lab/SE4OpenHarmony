/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language go
 verning permissions and
 * limitations under the License.
 */

import Header from '../common/Header'
import Player from '../common/Player'
import Content from '../common/Content'
import BreakpointSystem from '../model/MediaData'

@Entry
@Component
struct Index {
  private breakpointSystem: BreakpointSystem = new BreakpointSystem()
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm'

  aboutToAppear() {
    this.breakpointSystem.register()
  }

  aboutToDisappear() {
    this.breakpointSystem.unregister()
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Stack({ alignContent: Alignment.Top }) {
        Header()
        Content()
      }

      Player()
    }
    .width('100%')
    .backgroundColor(this.currentBreakpoint === 'sm' ? '#e4ecf7' : '#f6f9fc')
  }
}