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

import webView from '@ohos.web.webview';
import { TitleBar } from './TitleBar';

@Component
export struct CodeView {
  @BuilderParam contentView: () => void;
  @Link title: Resource;
  @StorageLink('sideBarShow') sideBarShow: boolean = false;
  @StorageLink('webSrc') @Watch('webSrcChange') webSrc: Resource = $rawfile('BaseTypeCode.ets.html');
  @StorageLink('currentBreakpoint') curBp: string = 'sm';
  private isShowTitle: boolean = true;
  private controller: webView.WebviewController = new webView.WebviewController();

  webSrcChange():void {
    this.controller.loadUrl(this.webSrc);
  }

  @Builder codeView() {
    Column({ space: 10 }) {
      Text($r('app.string.close'))
        .fontSize($r('app.float.source_code_font_size'))
        .fontColor(Color.White)
        .alignSelf(ItemAlign.End)
        .id('close')
        .onClick(() => {
          this.sideBarShow = !this.sideBarShow;
        })
      Column() {
        Web({ src: this.webSrc, controller: this.controller })
          .width('100%')
          .height('100%')
      }
      .height('100%')
      .width('100%')
      .padding({ bottom: $r('app.float.code_view_bottom') })
    }
    .height('100%')
    .padding($r('app.float.page_padding'))
    .backgroundColor($r('app.color.code_view_background'))
  }

  build() {
    Column() {
      if (this.isShowTitle) {
        TitleBar({ title: $title })
      }
      SideBarContainer(this.curBp === 'sm' ? SideBarContainerType.Overlay : SideBarContainerType.Embed) {
        this.codeView()
        Scroll() {
          this.contentView()
        }
        .width('100%')
        .height('100%')
        .align(Alignment.Top)
        .scrollBar(BarState.Off)
      }
      .autoHide(false)
      .showSideBar(this.sideBarShow)
      .layoutWeight(1)
      .sideBarWidth('100%')
      .showControlButton(false)
      // 大型设备查看源码和界面4:6的比例，所以占60%
      .maxSideBarWidth(this.curBp === 'sm' ? '100%' : '60%')
      .sideBarPosition(SideBarPosition.End)
    }
    .width('100%')
    .height('100%')
  }
}