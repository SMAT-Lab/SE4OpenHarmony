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
import CommonConstants from '../common/constants/CommonConstants';

@CustomDialog
export struct CustomDialogExample {
  text: string = "";
  cancel: () => void = () => {
  };
  private scroller: Scroller = new Scroller();
  controller: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({
      text: this.text
    }),
    maskColor: CommonConstants.DIALOG_TEXT_MASK_COLOR,
    cancel: this.cancel
  })

  build() {
    Column() {
      Text($r('app.string.Recognize_result'))
        .height($r('app.float.dialog_title_height'))
        .width(CommonConstants.FULL_WIDTH)
        .fontSize($r('app.float.dialog_title_font_size'))
        .fontColor($r('app.color.font_color'))
        .padding({
          top: $r('app.float.dialog_title_padding_top'),
          bottom: $r('app.float.dialog_title_padding_bottom'),
          left: $r('app.float.dialog_title_padding_left')
        })
        .font({
          weight: CommonConstants.FONT_WEIGHT
        })
      Column() {
        Scroll(this.scroller) {
          Text(this.text)
            .width(CommonConstants.FULL_WIDTH)
            .fontSize($r('app.float.dialog_content_font_size'))
            .lineHeight($r('app.float.dialog_content_line_height'))
            .textAlign(TextAlign.Start)
            .padding({
              left: $r('app.float.dialog_content_padding_leftright'),
              right: $r('app.float.dialog_content_padding_leftright'),
              bottom: $r('app.float.dialog_content_padding_bottom')
            })
            .copyOption(CopyOptions.LocalDevice)
        }
        .width(CommonConstants.FULL_WIDTH)
      }
      .width(CommonConstants.FULL_WIDTH)
      .height($r('app.float.dialog_result_text_height'))
    }
    .width(CommonConstants.FULL_WIDTH)
    .height($r('app.float.dialog_content_height'))
  }
}