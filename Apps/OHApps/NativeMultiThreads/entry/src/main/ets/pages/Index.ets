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

import hilog from '@ohos.hilog';
import testNapi from 'libentry.so';
import Constants from '../../common/constants/CommonConstants';

@Entry
@Component
struct Index {
  @State imagePath: string = Constants.INIT_IMAGE_PATH;
  imageName: string = '';

  build() {
    Column() {
      // display the sample title
      Row() {
        Text($r('app.string.sample_title'))
          .fontSize($r('app.float.title_text_font_size'))
          .fontWeight(FontWeight.Bold)
      }
      .height($r('app.float.title_area_height'))
      .width(Constants.FULL_PARENT)
      .padding({ left: $r('app.float.title_area_left_padding') })

      // show the initial image
      Row() {
        Image(this.imagePath)
          .borderRadius($r('app.float.image_border_radius'))
          .backgroundColor(Color.White)
          .onError(() => {
            hilog.info(0x0000, 'testTag', 'load imagePath fail: %{public}s.', this.imagePath);
            // when the target image is not found (path loading fails), a warning dialog box is displayed.
            AlertDialog.show({
              title: $r('app.string.image_error_dialog_title'),
              message: $r('app.string.image_error_dialog_message'),
              autoCancel: true,
              alignment: DialogAlignment.Bottom,
              offset: { dx: $r('app.float.error_dialog_offset_dx'), dy: $r('app.float.error_dialog_offset_dy') },
              primaryButton: {
                value: $r('app.string.error_dialog_primary_button'),
                action: () => {
                  hilog.info(0x0000, 'testTag', 'dialog click cancel.');
                }
              },
              secondaryButton: {
                value: $r('app.string.error_dialog_secondary_button'),
                action: () => {
                  hilog.info(0x0000, 'testTag', 'dialog click confirm.');
                }
              }
            })
          })
      }
      .height($r('app.float.image_area_height'))
      .width(Constants.FULL_PARENT)
      .padding({ left: $r('app.float.image_area_left_padding'), right: $r('app.float.image_area_right_padding') })

      // button list, prompting the user to click the button to select the target image.
      Column() {
        // multi-threads sync call button
        Button($r('app.string.sync_button_title'))
          .width(Constants.FULL_PARENT)
          .margin($r('app.float.button_common_margin'))
          .onClick(() => {
            this.imageName = Constants.SYNC_BUTTON_IMAGE;
            this.imagePath = Constants.IMAGE_ROOT_PATH + testNapi.getImagePathSync(this.imageName);
            hilog.info(0x0000, 'testTag', 'sync operate imagePath: %{public}s', this.imagePath);
          })

        // multi-threads callback async button
        Button($r('app.string.async_callback_button_title'))
          .width(Constants.FULL_PARENT)
          .margin($r('app.float.button_common_margin'))
          .onClick(() => {
            this.imageName = Constants.CALLBACK_BUTTON_IMAGE;
            testNapi.getImagePathAsyncCallBack(this.imageName, (result: string) => {
              this.imagePath = Constants.IMAGE_ROOT_PATH + result;
              hilog.info(0x0000, 'testTag', 'async callback operate imagePath: %{public}s', this.imagePath);
            });
          })

        // multi-threads promise async button
        Button($r('app.string.async_promise_button_title'))
          .width(Constants.FULL_PARENT)
          .margin($r('app.float.button_common_margin'))
          .onClick(() => {
            this.imageName = Constants.PROMISE_BUTTON_IMAGE;
            let promiseObj = testNapi.getImagePathAsyncPromise(this.imageName);
            promiseObj.then((result: string) => {
              this.imagePath = Constants.IMAGE_ROOT_PATH + result;
              hilog.info(0x0000, 'testTag', 'async promise operate imagePath: %{public}s', this.imagePath);
            })
          })

        // multi-threads tsf async button
        Button($r('app.string.async_tsf_button_title'))
          .width(Constants.FULL_PARENT)
          .margin($r('app.float.button_common_margin'))
          .onClick(() => {
            this.imageName = Constants.TSF_BUTTON_IMAGE;
            testNapi.getImagePathAsyncTSF(this.imageName, (result: string) => {
              this.imagePath = Constants.IMAGE_ROOT_PATH + result;
              hilog.info(0x0000, 'testTag', 'async thread_safe_func operate imagePath: %{public}s', this.imagePath);
            });
          })

        // error image button
        Button($r('app.string.error_image_button_title'))
          .width(Constants.FULL_PARENT)
          .margin($r('app.float.button_common_margin'))
          .onClick(() => {
            this.imageName = Constants.ERROR_BUTTON_IMAGE;
            this.imagePath = Constants.IMAGE_ROOT_PATH + testNapi.getImagePathSync(this.imageName);
            hilog.info(0x0000, 'testTag', 'error operate imagePath: %{public}s', this.imagePath);
          })
      }
      .width(Constants.FULL_PARENT)
      .justifyContent(FlexAlign.End)
      .layoutWeight(Constants.BUTTON_AREA_LAYOUT_WEIGHT)
      .padding(
        {
          bottom: $r('app.float.button_area_bottom_padding'),
          left: $r('app.float.button_area_left_padding'),
          right: $r('app.float.button_area_right_padding')
        }
      )
    }
    .width(Constants.FULL_PARENT)
    .height(Constants.FULL_PARENT)
    .backgroundColor($r('app.color.root_background_color'));
  }
}
