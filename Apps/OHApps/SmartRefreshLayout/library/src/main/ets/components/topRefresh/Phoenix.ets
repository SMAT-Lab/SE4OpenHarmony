/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import SmartRefreshForTaurus from "./SmartRefreshForTaurus"


@Component
export struct Phoenix {
  @Link model: SmartRefreshForTaurus.Model
  @State angle: number= 0
  @State refresh: boolean= true
  @State mYCenter: number= 140
  
  aboutToAppear() {
    this.model.setZFooterHeight(-1)
    this.model.setRefreshHeaderCallback(() => this.startDraw())
    if(this.model.initRefreshing) {
      this.model.refreshHeaderCallback()
      this.model.initRefreshing = false
    }
  }

  startDraw() : void{
    this.model.headerRefreshId = setInterval(() => {
      this.angle = (this.angle + 5) % 720
      this.refresh = !this.refresh
    }, 50)
  }

  build() {
    Flex() {
      if (this.refresh) {
        Text("").visibility(Visibility.None)
      } else {
        Text("").visibility(Visibility.None)
      }
      if (this.model.refreshState.valueOf() == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING.valueOf()) { //松开过后的刷新样式
        Stack({ alignContent: Alignment.TopStart }) {
          Text('')
            .backgroundColor(this.model.backgroundColor)
            .width('100%')
            .height('100%')
          Image($r("app.media.cloud"))
            .width('100%')
            .height('100%')
          Image($r("app.media.sun"))
            .width(60)
            .height(60)
            .position({
              x: 720 / 3,
              y: this.model.headerHeight / 5
            })
            .scale({
              x: 1,
              y: 1,
              z: 1,
              centerX: '50%',
              centerY: '50%'
            })
            .rotate({
              x: 0,
              y: 0,
              z: 1,
              centerX: '50%',
              centerY: '50%',
              angle: this.angle
            })
          Image($r("app.media.city"))
            .width('100%')
            .height('100%')
            .scale({
              x: 1,
              y: 1,
              z: 1,
              centerX: '50%',
              centerY: '50%'
            })
        }
        .width("100%")
        .height("100%")
        .backgroundColor(0xff11bbff)
      } else if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH
                || this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.NONE) { //拖住过程中的样式
        Stack({ alignContent: Alignment.TopStart }) {
          Text('')
            .backgroundColor(this.model.backgroundColor)
            .width('100%')
            .height('100%')
          Image($r("app.media.cloud"))
            .width('100%')
            .height('100%')
          Image($r("app.media.sun"))
            .width(60)
            .height(60)
            .position({
              x: 720 / 3,
              y: this.model.headerHeight / 5
            })
            .scale({
              x: this.model.getOffset() >= 1 ? (1 - (this.model.getOffset() - 1)) : 1,
              y: this.model.getOffset() >= 1 ? (1 - (this.model.getOffset() - 1)) : 1,
              z: 1,
              centerX: '50%',
              centerY: '50%'
            })
            .rotate({
              x: 0,
              y: 0,
              z: 1,
              centerX: '50%',
              centerY: '50%',
              angle: this.angle
            })
          Image($r("app.media.city"))
            .width('100%')
            .height('100%')
            .scale({
              x: this.model.getOffset() >= 1 ? this.model.getOffset() : 1,
              y: this.model.getOffset() >= 1 ? this.model.getOffset() : 1,
              z: 1,
              centerX: '50%',
              centerY: '100%'
            })
        }
        .width("100%")
        .height("100%")
      }
    }
  }
}
