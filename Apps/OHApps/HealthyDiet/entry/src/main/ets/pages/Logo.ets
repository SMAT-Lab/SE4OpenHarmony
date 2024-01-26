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
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import curves from '@ohos.curves'
import router from '@ohos.router'

@Entry
@Component
struct Logo {
  @State opacityValue: number = 0
  @State scaleValue: number = 0
  private rightPath: string = 'M319.5 128.1 c103.5 0 187.5 84 187.5 187.5 v15 a172.5 172.5 0 0 3 -172.5 172.5 H198 a36 36 0 0 3 -13.8 -1 207 207 0 0 0 87 -372 h48.3 z'
  private rightBottomPath: string = 'M270.6 128.1 h48.6 c51.6 0 98.4 21 132.3 54.6 a411 411 0 0 3 -45.6 123 c-25.2 45.6 -56.4 84 -87.6 110.4 a206.1 206.1 0 0 0 -47.7 -288 z'

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Shape() {
        Path()
          .commands('M162 128.7 a222 222 0 0 1 100.8 374.4 H198 a36 36 0 0 3 -36 -36')
          .fill(Color.White)

        Path()
          .commands(this.rightPath)
          .fill('none')
          .linearGradient({ angle: 30, colors: [['#C4FFA0', 0], ['#ffffff', 1]] })
          .clip(new Path().commands(this.rightPath))

        Path()
          .commands(this.rightBottomPath)
          .fill('none')
          .linearGradient({ angle: 50, colors: [['#8CC36A', 0.1], ['#B3EB90', 0.4], ['#ffffff', 0.7]] })
          .clip(new Path().commands(this.rightBottomPath))
      }
      .height(210)
      .width(210)
      .scale({ x: this.scaleValue, y: this.scaleValue })
      .opacity(this.opacityValue)
      .onAppear(() => {
        animateTo({
          duration: 1000,
          curve: curves.cubicBezier(0.4, 0, 1, 1),
          delay: 100,
          onFinish: () => {
            setTimeout(() => {
              router.replace({ url: 'pages/Home' })
            }, 1000)
          }
        }, () => {
          this.opacityValue = 1
          this.scaleValue = 1
        })
      })

      Text($r("app.string.healthy_diet"))
        .fontSize(26)
        .fontColor(Color.White)
        .margin({ top: 300 })

      Text($r("app.string.logo_description"))
        .fontSize(17)
        .fontColor(Color.White)
        .margin({ top: 4 })
    }
    .width('100%')
    .height('100%')
    .linearGradient({ angle: 180, colors: [['#BDE895', 0.1], ['#95DE7F', 0.6], ['#7AB967', 1]] })
  }
}