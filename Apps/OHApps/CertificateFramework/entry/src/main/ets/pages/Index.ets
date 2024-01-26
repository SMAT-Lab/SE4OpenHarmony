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

import { CertFrameworkModel } from '../model/CertFrameworkModel'
import promptAction from '@ohos.promptAction';
import Logger from '../model/Logger'

const TAG: string = '[CertFramework]'

@Entry
@Component
struct Index {
  @State certTextInfo: string = '';
  @State originTextInfo: string = '';
  @State signTextInfo: string = '';
  private certFramework: CertFrameworkModel = new CertFrameworkModel();

  build() {
    Column() {
      Column() {
        Text($r('app.string.module_desc'))
          .fontColor($r('app.color.homepage_title_color'))
          .fontSize($r('sys.float.ohos_id_text_size_headline7'))
          .fontWeight(FontWeight.Bold)
          .margin({ top: '12vp', left: '24vp', bottom: '11vp' })
      }
      .width('100%')
      .height('56vp')
      .alignItems(HorizontalAlign.Start)

      Column() {
        Text($r('app.string.certificate_data'))
          .fontColor($r('app.color.text_title_color'))
          .fontSize($r('sys.float.ohos_id_text_size_sub_title3'))
          .margin({ top: '19.5vp', left: '24vp', bottom: '9.5vp' })
      }
      .width('100%')
      .height('48vp')
      .alignItems(HorizontalAlign.Start)

      Column() {
        Column() {
          Scroll() {
            Text(this.certTextInfo)
              .fontColor($r('app.color.text_content_color'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .lineHeight('19vp')
              .textAlign(TextAlign.Start)
              .width('100%')
          }
          .margin({ top: '8vp', left: '16vp', right: '16vp', bottom: '21vp' })
        }
        .height('139vp')
        .backgroundColor($r('app.color.text_bg_color'))
        .borderRadius($r('sys.float.ohos_id_corner_radius_default_l'))
        .margin({ left: '12vp', right: '12vp' })
        .align(Alignment.TopStart)
      }
      .width('100%')
      .height('139vp')
      .alignItems(HorizontalAlign.Center)

      Column() {
        Text($r('app.string.origin_data'))
          .fontColor($r('app.color.text_title_color'))
          .fontSize($r('sys.float.ohos_id_text_size_sub_title3'))
          .margin({ top: '19.5vp', left: '24vp', bottom: '9.5vp' })
      }
      .width('100%')
      .height('48vp')
      .alignItems(HorizontalAlign.Start)

      Column() {
        Column() {
          Scroll() {
            Text(this.originTextInfo)
              .fontColor($r('app.color.text_content_color'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .lineHeight('19vp')
              .textAlign(TextAlign.Start)
              .width('100%')
          }
          .margin({ top: '8vp', left: '16vp', right: '16vp', bottom: '21vp' })
        }
        .height('139vp')
        .backgroundColor($r('app.color.text_bg_color'))
        .borderRadius($r('sys.float.ohos_id_corner_radius_default_l'))
        .margin({ left: '12vp', right: '12vp' })
        .align(Alignment.TopStart)
      }
      .width('100%')
      .height('139vp')
      .alignItems(HorizontalAlign.Center)

      Column() {
        Text($r('app.string.signature_data'))
          .fontColor($r('app.color.text_title_color'))
          .fontSize($r('sys.float.ohos_id_text_size_sub_title3'))
          .margin({ top: '19.5vp', left: '24vp', bottom: '9.5vp' })
      }
      .width('100%')
      .height('48vp')
      .alignItems(HorizontalAlign.Start)

      Column() {
        Column() {
          Scroll() {
            Text(this.signTextInfo)
              .fontColor($r('app.color.text_content_color'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .lineHeight('19vp')
              .textAlign(TextAlign.Start)
              .width('100%')
          }
          .margin({ top: '8vp', left: '16vp', right: '16vp', bottom: '21vp' })
        }
        .height('139vp')
        .backgroundColor($r('app.color.text_bg_color'))
        .borderRadius($r('sys.float.ohos_id_corner_radius_default_l'))
        .margin({ left: '12vp', right: '12vp' })
        .align(Alignment.TopStart)
      }
      .width('100%')
      .height('139vp')
      .alignItems(HorizontalAlign.Center)

      Column() {
        Row() {
          Button({ type: ButtonType.Capsule, stateEffect: false }) {
            Text($r('app.string.display_data'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .fontColor($r('app.color.button_display_title_color'))
              .padding({ top: '9vp', left: '16vp', right: '16vp', bottom: '9vp' })
          }
          .width('48%')
          .backgroundColor($r('app.color.button_display_bg_color'))
          .margin({ right: '12vp' })
          .id('dataDispalyButton')
          .onClick(() => {
            this.certFramework.dataDisplay((result: resultInfo) => {
              this.certTextInfo = result.certInfo;
              this.originTextInfo = result.originInfo;
              this.signTextInfo = result.signatureInfo;
            })
          })

          Button({ type: ButtonType.Capsule, stateEffect: false }) {
            Text($r('app.string.verify'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .fontColor($r('app.color.button_verify_title_color'))
              .padding({ top: '9vp', left: '16vp', right: '16vp', bottom: '9vp' })
          }
          .width('48%')
          .backgroundColor($r('app.color.button_verify_bg_color'))
          .id('verifyButton')
          .onClick(() => {
            this.certFramework.verify((result: boolean) => {
              if (result == true) {
                Logger.info(TAG, 'verify: PASS!!!');
                try {
                  promptAction.showToast(
                    {
                      message: $r('app.string.verify_success'),
                      duration: 2000,
                      bottom: 122
                    }
                  )
                } catch (err) {
                  Logger.error(TAG, `show result failed, ${JSON.stringify(err)}`);
                }
              } else {
                Logger.info(TAG, 'verify: FAILED!!!');
                try {
                  promptAction.showToast(
                    {
                      message: $r('app.string.verify_fail'),
                      duration: 2000,
                      bottom: 122
                    }
                  )
                } catch (err) {
                  Logger.error(TAG, `show result failed, ${JSON.stringify(err)}`);
                }
              }
            })
          })
        }
        .margin({ left: '24vp', right: '24vp' })
      }
      .width('100%')
      .height('40vp')
      .alignItems(HorizontalAlign.Center)
      .margin({ top: '23vp' })

      Column() {
        Row() {
          Button({ type: ButtonType.Capsule, stateEffect: false }) {
            Text($r('app.string.modify_origin_data'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .fontColor($r('app.color.button_modify_origin_data_title_color'))
              .padding({ top: '9.25vp', left: '20vp', right: '20vp', bottom: '8.75vp' })
          }
          .width('48%')
          .backgroundColor($r('app.color.button_modify_origin_data_bg_color'))
          .margin({ right: '12vp' })
          .id('modifyOriginDataButton')
          .onClick(() => {
            this.certFramework.modifyOriginData((result: resultInfo) => {
              this.originTextInfo = result.originInfo;
              this.signTextInfo = result.signatureInfo;
            })
          })

          Button({ type: ButtonType.Capsule, stateEffect: false }) {
            Text($r('app.string.modify_signature_data'))
              .fontSize($r('sys.float.ohos_id_text_size_body1'))
              .fontColor($r('app.color.button_modify_signature_data_title_color'))
              .padding({ top: '9.25vp', left: '20vp', right: '20vp', bottom: '8.75vp' })
          }
          .width('48%')
          .backgroundColor($r('app.color.button_modify_signature_data_bg_color'))
          .id('modifySignatureDataButton')
          .onClick(() => {
            this.certFramework.modifySignatureData((result: resultInfo) => {
              this.originTextInfo = result.originInfo;
              this.signTextInfo = result.signatureInfo;
            })
          })
        }
        .margin({ left: '24vp', right: '24vp' })
      }
      .width('100%')
      .height('40vp')
      .alignItems(HorizontalAlign.Center)
      .margin({ top: '12vp' })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.homepage_bg_color'))
  }
}

class resultInfo{
  certInfo: string = '';
  originInfo: string = '';
  signatureInfo: string = '';
}