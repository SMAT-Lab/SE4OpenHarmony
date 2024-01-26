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

import picker from '@ohos.file.picker';
import { logger } from '@ohos/uploaddownload';

const TAG: string = 'AddPictures';

@Extend(Image) function imageStyle() {
  .width('100%')
  .aspectRatio(1)
  .objectFit(ImageFit.Fill)
  .backgroundColor($r('app.color.light_gray'))
  .borderRadius(12)
}

@Component
export struct AddPictures {
  @Consume imageList: Array<string>;

  build() {
    Column() {
      Text($r('app.string.tip'))
        .fontColor($r('app.color.text_normal'))
        .fontWeight(400)
        .fontFamily('HarmonyHeiTi')
        .fontSize(14)
        .opacity(0.4)
        .margin({ top: 16, bottom: 48 })
        .width('100%')
      GridRow({ columns: { sm: 3, md: 6, lg: 8 }, gutter: 12 }) {
        ForEach(this.imageList, (item: string) => {
          GridCol({ span: 1 }) {
            Image(item)
              .imageStyle()
          }
        })
        GridCol({ span: 1 }) {
          Row() {
            Image($r('app.media.ic_public_add'))
              .size({ width: 24, height: 24 })
              .objectFit(ImageFit.Contain)
          }
          .width('100%')
          .height('100%')
          .justifyContent(FlexAlign.Center)
        }
        .width('100%')
        .aspectRatio(1)
        .backgroundColor($r('app.color.white'))
        .borderRadius(12)
        .onClick(() => {
          this.showDialog();
        })
      }
    }
    .width('100%')
  }

  addImages = (images: Array<string>) => {
    images.forEach((item: string) => {
      if (!this.imageList.includes(item)) {
        this.imageList.push(item);
      }
    })
    logger.info(TAG, `addImages imageList=${JSON.stringify(this.imageList)}`);
  }

  showDialog() {
    AlertDialog.show({
      message: $r('app.string.pick_album'),
      alignment: DialogAlignment.Bottom,
      offset: { dx: 0, dy: -12 },
      primaryButton: {
        value: $r('app.string.cancel'),
        fontColor: $r('app.color.btn_text_blue'),
        action: () => {
        }
      },
      secondaryButton: {
        value: $r('app.string.ok'),
        fontColor: $r('app.color.btn_text_blue'),
        action: () => {
          try {
            let photoSelectOptions = new picker.PhotoSelectOptions();
            photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            photoSelectOptions.maxSelectNumber = 5;
            let photoPicker = new picker.PhotoViewPicker();
            photoPicker.select(photoSelectOptions).then((photoSelectResult: picker.PhotoSelectResult) => {
              this.addImages(photoSelectResult.photoUris);
            }).catch((err: Error) => {
              logger.info(TAG, `'PhotoViewPicker.select failed with err: ${JSON.stringify(err)}`);
            });
          } catch (err) {
            logger.info(TAG, `'PhotoViewPicker failed with err: ${JSON.stringify(err)}`);
          }
        }
      }
    })
  }
}