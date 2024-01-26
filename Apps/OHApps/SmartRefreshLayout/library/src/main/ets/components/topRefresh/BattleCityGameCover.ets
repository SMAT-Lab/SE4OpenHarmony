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

import SmartRefreshForGame from './SmartRefreshForGame'

@Component
export struct AirplaneGameCover {
  @Link model: SmartRefreshForGame.Model
  @State @Watch('onGameChange') gameState: boolean = false
  maxHeight: number = 0
  @Prop @Watch('onYChange') downY: number = 0
  textColor: Color | string | number = ''
  @State private topAnimY: number = 1
  @State private bottomAnimY: number = 1
  @State private tipText: string  = this.model.maskTextTopPull

  private onGameChange(value:ESObject) {
    if (this.gameState) {
      this.bottomAnimY = 0
      this.topAnimY = 0
    } else {
      this.bottomAnimY = 1
      this.topAnimY = 1
    }
  }

  private onYChange() {
    if (this.downY < this.maxHeight) {
      this.tipText = this.model.maskTextTopPull
    } else {
      this.tipText = this.model.maskTextTopRelease
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.End }) {
        Text(this.tipText)
          .fontSize(px2fp(this.model.maskTextSizeTop))
          .fontColor(this.textColor)
      }
      .width('100%')
      .height('50%')
      .backgroundColor(this.textColor == '#ffffff' ? '#000000' : '#ffffff')
      .scale({
        y: this.topAnimY,
        centerX: '0%',
        centerY: '0%'
      })
      .animation({
        duration: 500, // 动画时长
        curve: Curve.EaseOut, // 动画曲线
        delay: 50, // 动画延迟
        iterations: 1, // 播放次数
        playMode: PlayMode.Normal // 动画模式
      })

      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
        Text(this.model.maskTextBottom)
          .fontSize(px2fp(this.model.maskTextSizeBottom))
          .fontColor(this.textColor)
      }
      .width('100%')
      .height('50%')
      .backgroundColor(this.textColor == '#ffffff' ? '#000000' : '#ffffff')
      .scale({
        y: this.bottomAnimY,
        centerX: '100%',
        centerY: '100%'
      })
      .animation({
        duration: 500, // 动画时长
        curve: Curve.EaseOut, // 动画曲线
        delay: 10, // 动画延迟
        iterations: 1, // 播放次数
        playMode: PlayMode.Normal // 动画模式
      })
    }
    .width('100%')
    .height('100%')

  }
}