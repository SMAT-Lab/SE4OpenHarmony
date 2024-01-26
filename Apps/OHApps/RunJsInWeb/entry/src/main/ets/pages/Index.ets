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
import web_webview from '@ohos.web.webview'
import Logger from '../model/Logger'

const TAG: string = '[Index]'
@Entry
@Component
struct Index {
  @State gameLeft: string = "console.info('webgame gameLeft'); _main.paddle.moveLeft();"
  @State gameRight: string = "console.info('webgame gameRight'); _main.paddle.moveRight();"
  @State gameStart: string = "console.info('webgame gameStart'); if (_main.game.state !== _main.game.state_GAMEOVER) {_main.game.state = _main.game.state_RUNNING; _main.ball.fired = true;}"
  @State gameReset: string = "console.info('webgame gameReset'); if (_main.game.state === _main.game.state_GAMEOVER) {_main.game.state = _main.game.state_START; _main.start()}"
  @State removeDesc: string = "console.info('webgame removeDesc'); y=document.getElementsByTagName('div')[0]; y.parentNode.removeChild(y)"
  private imgRequestUrl: string = 'https://yangyunhe369.github.io/h5-game-blockBreaker/images/background.jpg'
  controller: web_webview.WebviewController = new web_webview.WebviewController()
  responseweb: WebResourceResponse = new WebResourceResponse()

  build() {
    Row() {
      Column() {
        Button('Start', { type: ButtonType.Capsule })
          .onClick(() => {
            try {
              this.controller.loadUrl("javascript:" + this.gameStart)
            } catch (error) {
              Logger.info(TAG, `loadUrl gameStart fail: ${JSON.stringify(error)}`)
            }
          })
        Button('L', { type: ButtonType.Capsule })
          .width(50).height(100).backgroundColor(Color.Red)
          .gesture(
          LongPressGesture({ repeat: true, duration: 20 })
            .onAction((event: GestureEvent) => {
              if (event.repeat) {
                try {
                  this.controller.loadUrl("javascript:" + this.gameLeft)
                } catch (error) {
                  Logger.info(TAG, `loadUrl gameLeft fail: ${JSON.stringify(error)}`)
                }
              }
            })
          )
      }.width('10%')
      Column() {
        Web({ src: "https://yangyunhe369.github.io/h5-game-blockBreaker/", controller: this.controller })
          .domStorageAccess(true)
          .onlineImageAccess(true)
          .imageAccess(true)
          .zoomAccess(false)
          .javaScriptAccess(true)
          .backgroundColor(Color.Orange)
            //拦截资源请求，优化游戏流畅度
          .onInterceptRequest((event) => {
            let url = '';
            if (event) {
              url = event.request.getRequestUrl();
            }
            if (url === this.imgRequestUrl) {
              return this.responseweb;
            }
            return null
          })
          .onPageEnd(e => {
            try {
              this.controller.loadUrl("javascript:" + this.removeDesc)
            } catch (error) {
              Logger.info(TAG, `loadUrl removeDesc fail: ${JSON.stringify(error)}`)
            }
          })
      }.width('80%')
      Column() {
        Button('Reset', { type: ButtonType.Capsule })
          .onClick(() => {
            try {
              this.controller.loadUrl("javascript:" + this.gameReset)
            } catch (error) {
              Logger.info(TAG, `loadUrl gameReset fail: ${JSON.stringify(error)}`)
            }
          })
        Button('R', { type: ButtonType.Capsule })
          .width(50).height(100).backgroundColor(Color.Red)
          .gesture(
          LongPressGesture({ repeat: true, duration: 20 })
            .onAction((event: GestureEvent) => {
              if (event.repeat) {
                try {
                  this.controller.loadUrl("javascript:" + this.gameRight)
                } catch (error) {
                  Logger.info(TAG, `loadUrl gameRight fail: ${JSON.stringify(error)}`)
                }
              }
            })
          )
      }.width('10%')
    }
  }
}