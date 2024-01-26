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

import router from '@ohos.router'
import window from '@ohos.window'
import mediaQuery from '@ohos.mediaquery'

const SKIP_COUNTDOWN: number = 3 // 第一段进场动画用时3s
interface MediaQueryResult {
  matches: boolean
}

@Entry
@Component
export struct TransitionsAnimation {
  @State isLand: boolean = false
  @State pageCountDown: number = 6 // 进场动画总用时6s
  private listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)')
  gotoNav: () => void = () => {
  }

  aboutToAppear() {
    this.listener.on('change', (mediaQueryResult: MediaQueryResult): void => {
      this.isLand = mediaQueryResult.matches
    })
    window.getLastWindow(getContext(this)).then((result: window.Window) => {
      result.setWindowSystemBarEnable([])
    })
    let timer = setInterval(() => {
      this.pageCountDown--
      if (this.pageCountDown == 0) {
        window.getLastWindow(getContext(this)).then((result: window.Window) => {
          result.setWindowSystemBarEnable(['status', 'navigation'])
        })
        this.gotoNav() // 6秒后执行gotoNav函数跳转到首页
        clearInterval(timer) // 关闭定时器
      }
    }, 1000)
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      if (this.pageCountDown > SKIP_COUNTDOWN) {
        Image($r('app.media.enter_app'))
          .objectFit(ImageFit.Contain)
      } else if (this.pageCountDown <= SKIP_COUNTDOWN) {
        Column() {
          Row() {
            Image($r('app.media.enter_app_animation'))
              .objectFit(ImageFit.Contain)
              .width(this.isLand ? '60%' : '80%')
              .aspectRatio(1.4)
          }
          .margin({ top: this.isLand ? '10vp' : '181vp' })

          Column() {
            Text($r('app.string.shopping'))
              .fontSize(24)
            Text($r('app.string.shoppingAdvertising'))
              .margin({ top: 10 })
              .fontSize(20)
              .opacity(0.6)
          }
          .margin({ top: this.isLand ? '10vp' : '200vp' })
        }

        Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          Text($r('app.string.skip'))
            .fontSize('16vp')
            .textAlign(TextAlign.Center)
            .fontColor('#FFFFFF')
          Text(`${this.pageCountDown}`)
            .fontSize('16vp')
            .textAlign(TextAlign.Center)
            .fontColor('#FFFFFF')
            .margin({ left: '4vp' })
        }
        .position({ x: this.isLand ? '85%' : '75.3%', y: '3%' })
        .width(this.isLand ? '10%' : '18.9%')
        .aspectRatio(2.4)
        .backgroundColor('rgba(0,0,0,0.3)')
        .borderRadius('18vp')
        .onClick(() => {
          window.getLastWindow(getContext(this)).then((result: window.Window) => {
            result.setWindowSystemBarEnable(['status', 'navigation'])
          })
          this.pageCountDown = 0
          router.push({ url: 'pages/Index' })
        })
      }
    }
    .width('100%')
    .backgroundColor('#f1f3f5')
  }
}