/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import router from '@ohos.router';
import Logger from '../utils/Logger'
import MessagePage from '../component/MessageComponent'
import VideoComponent from '../component/VideoComponent'
import emitter from '@ohos.events.emitter';
import Constant from '../utils/Constant';

const TAG: string = '[Index]'

@Entry
@Component
struct Index {
  @State selectDownIndex: number = 0; // 底部选择索引

  /**
   * 登录验证
   */
  loginVerification(): boolean {
    // 验证是否登录
    if (AppStorage.get("userInfo") == null || AppStorage.get("userInfo") == undefined) {
      return false;
    }
    return true;
  }

  pageTransition() {
    // 禁止首页页面转场效果
    PageTransitionEnter({ type: RouteType.None, duration: 0 })
    PageTransitionExit({ type: RouteType.None, duration: 0 })
  }

  onPageShow() {
    router.clear();
  }

  build() {
    Column() {

      Column() {
        if (this.selectDownIndex === 0) {
          VideoComponent()
        } else if (this.selectDownIndex === 1) {

        } else if (this.selectDownIndex === 2 && this.loginVerification()) {
          MessagePage()
        } else if (this.selectDownIndex === 3) {

        }
      }
      .width('100%')
      .height('92%')

      // 底部操作栏
      Row() {
        Text($r('app.string.Home_page'))
          .height('100%')
          .fontColor(this.selectDownIndex === 0 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'))
          .fontSize(22)
          .fontFamily($r('app.string.Font_family_medium'))
          .margin({ left: 10 })
          .onClick(e => {
            this.selectDownIndex = 0;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`)
          })
        Text($r('app.string.Friend'))
          .height('100%')
          .fontColor(this.selectDownIndex === 1 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'))
          .fontSize(22)
          .fontFamily($r('app.string.Font_family_medium'))
          .margin({ left: 10 })
          .onClick(e => {
            this.selectDownIndex = 1;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`)
          })
        Image($r('app.media.app_icon'))
          .id('index_main')
          .width(80)
          .height(40)
          .objectFit(ImageFit.Contain)
          .onClick(e => {
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`)
            // 跳转页面前暂停本地视频
            emitter.emit({ eventId: Constant.EVENT_PAUSED_INDEX });
            // 验证是否登录
            if (!this.loginVerification()) {
              router.pushUrl({ url: 'appsampled/pages/Login' })
              return;
            }
            router.pushUrl({ url: 'appsampled/pages/CameraPage' })
          })
        Text($r('app.string.Message'))
          .id('index_message')
          .height('100%')
          .fontColor(this.selectDownIndex === 2 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'))
          .fontSize(22)
          .fontFamily($r('app.string.Font_family_medium'))
          .margin({ right: 10 })
          .onClick(e => {
            this.selectDownIndex = 2;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`)
            // 跳转页面前暂停本地视频
            emitter.emit({ eventId: Constant.EVENT_PAUSED_INDEX });
            // 验证是否登录
            if (!this.loginVerification()) {
              router.pushUrl({ url: 'appsampled/pages/Login' })
            }
          })
        Text($r('app.string.Me'))
          .height('100%')
          .fontColor(this.selectDownIndex === 3 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCF1F3F5'))
          .fontSize(22)
          .fontFamily($r('app.string.Font_family_medium'))
          .margin({ left: 10 })
          .onClick(e => {
            this.selectDownIndex = 3;
            Logger.info(TAG, `onClick this is ${this.selectDownIndex}`)
          })

      }
      .width('100%')
      .height('8%')
      .justifyContent(FlexAlign.SpaceAround)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_000000'))
  }
}


