/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@ohos.base';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import webview from '@ohos.web.webview';
import window from '@ohos.window';
import Logger from '../common/utils/Logger';
import { CommonConstants } from '../common/constants/CommonConstants';
import { ArkTSFunModel } from '../model/ProductModel';

const TAG = '[IndexPage]';

@Entry
@Component
struct IndexPage {
  @State @Watch('updateStatus') webCanBack: boolean = false;
  @State webCanForward: boolean = false;
  @State controller: webview.WebviewController = new webview.WebviewController();
  @State statusBarHeight: number = 0;
  @State sliderBarHeight: number = 0;
  arkTSObj: ArkTSFunModel = {
    jumpOrderConfirm: (detailStr: string) => this.jumpOrderConfirm(detailStr)
  };

  aboutToAppear() {
    webview.WebviewController.setWebDebuggingAccess(true);
    window.getLastWindow(getContext(this), (err: BusinessError, windowClass: window.Window) => {
      if (err.code) {
        Logger.error(TAG, 'Failed to obtain the main window. Cause: ' + JSON.stringify(err));
        return;
      }
      Logger.info(TAG, 'Succeeded in obtaining the main window. Data: ' + JSON.stringify(windowClass));

      // Realize the immersive effect.
      try {
        let type = window.AvoidAreaType.TYPE_SYSTEM;
        // Get status bar height.
        let area: window.AvoidArea = windowClass.getWindowAvoidArea(type);
        let statusBarHeight = px2vp(area.topRect.height);
        let sliderBarHeight = px2vp(area.bottomRect.height);
        this.statusBarHeight = statusBarHeight;
        this.sliderBarHeight = sliderBarHeight;
        if (statusBarHeight > 0) {
          windowClass.setWindowLayoutFullScreen(true);
        }
      } catch (exception) {
        Logger.error(TAG, 'Failed to set the system bar properties. Cause: ' + JSON.stringify(exception));
      }
    });
  }

  onPageShow() {
    this.updateStatusBar(this.webCanBack);
  }

  onPageHide() {
    this.updateStatusBar(false);
  }

  updateStatus() {
    this.updateStatusBar(this.webCanBack);
  }

  onBackPress() {
    if (this.webCanBack) {
      this.controller.backward();
      return true;
    }
    return false;
  }

  updateStatusBar(isDarkMode?: boolean): void {
    window.getLastWindow(getContext(this)).then((windowClass: window.Window) => {
      let systemBarProperties: window.SystemBarProperties = {
        statusBarColor: isDarkMode ? '#000000' : '#F1F3F5',
        statusBarContentColor: isDarkMode ? '#FFFFFF' : '#000000',
      };
      try {
        windowClass.setWindowSystemBarProperties(systemBarProperties, (err) => {
          if (err.code) {
            Logger.error(TAG, 'Failed to set the system bar properties. Cause: ' + JSON.stringify(err));
            return;
          }
          Logger.info(TAG, 'Succeeded in setting the system bar properties.');
        });
      } catch (exception) {
        Logger.error(TAG, 'Failed to set the system bar properties. Cause: ' + JSON.stringify(exception));
      }
    })
  }

  jumpOrderConfirm(detailStr: string): void {
    router.pushUrl({
      url: 'pages/OrderConfirmPage',
      params: { statusBarHeight: this.statusBarHeight, sliderBarHeight: this.sliderBarHeight, detailStr }
    });
  }

  build() {
    Column() {
      Web({ src: $rawfile('product_list.html'), controller: this.controller })
        .margin({ top: AppStorage.get('statusBarHeight') })
        .layoutWeight(1)
        .javaScriptProxy({
          object: this.arkTSObj,
          name: 'arkTSFunObj',
          methodList: ['jumpOrderConfirm'],
          controller: this.controller
        })
        .onConfirm(() => {
          promptAction.showToast({
            message: $r('app.string.toast_msg'),
            duration: CommonConstants.TOAST_DURATION
          });
          return false;
        })
        .onPageEnd(() => {
          this.webCanBack = this.controller.accessBackward();
          this.webCanForward = this.controller.accessForward();
        })

      Row() {
        Button() {
          Image(this.webCanBack ? $r('app.media.ic_back_on') : $r('app.media.ic_back_off'))
            .width($r('app.float.img_size'))
            .aspectRatio(1)
        }
        .width($r('app.float.btn_size'))
        .backgroundColor($r('app.color.common_bg'))
        .aspectRatio(1)
        .enabled(this.webCanBack)
        .onClick(() => {
          this.controller.backward();
        })

        Button() {
          Image(this.webCanForward ? $r('app.media.ic_next_on') : $r('app.media.ic_next_off'))
            .width($r('app.float.img_size'))
            .aspectRatio(1)
        }
        .width($r('app.float.btn_size'))
        .backgroundColor($r('app.color.common_bg'))
        .aspectRatio(1)
        .enabled(this.webCanForward)
        .onClick(() => {
          this.controller.forward();
        })

        Button() {
          Image($r('app.media.ic_home'))
            .width($r('app.float.img_size'))
            .aspectRatio(1)
        }
        .width($r('app.float.btn_size'))
        .backgroundColor($r('app.color.common_bg'))
        .aspectRatio(1)
        .onClick(() => {
          this.controller.backward();
        })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(CommonConstants.FULL_PERCENT)
      .height($r('app.float.navi_height'))
    }
    .width(CommonConstants.FULL_PERCENT)
    .height(CommonConstants.FULL_PERCENT)
    .backgroundColor($r('app.color.common_bg'))
    .padding({ top: this.statusBarHeight - 1, bottom: this.sliderBarHeight })
  }
}