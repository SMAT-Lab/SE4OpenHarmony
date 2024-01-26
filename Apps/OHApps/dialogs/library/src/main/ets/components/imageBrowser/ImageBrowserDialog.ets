
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SubsamplingScaleImageView } from '@ohos/subsampling-scale-image-view';

type imgSrc = string[] | Resource[] | PixelMap[]

@CustomDialog
export struct ImageBrowserDialog {
  @State modelList: SubsamplingScaleImageView.Model[] = []
  @Link imageList: imgSrc;
  @Link index: number;
  @State positionX: number = 0;
  controller: CustomDialogController
  swiperController: SwiperController = new SwiperController()
  // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后

  aboutToAppear() {
    let dialog = this
    this.imageList.forEach((image:string | Resource | PixelMap, index:number, modelList:string[] | Resource[] | PixelMap[]) => {
      this.modelList.push(new SubsamplingScaleImageView.Model()
        .setImage(image)
        .setSingleTapListener({
          onSingleTapConfirmed(event: ClickEvent) {
            dialog.close()
          }
        }))
    })
  }

  close() {
    this.controller.close()
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Swiper(this.swiperController) {
        ForEach(this.modelList, (model:SubsamplingScaleImageView.Model) => {
          SubsamplingScaleImageView({ model: model })
            .parallelGesture(
              PanGesture({ direction: PanDirection.Horizontal })
                .onActionUpdate((event: GestureEvent) => {
                  this.positionX = event.offsetX
                })
                .onActionEnd(() => {
                  if (model.canScroll() && model.panEnabled) return;
                  if (this.positionX < 0) {
                    this.swiperController.showNext()
                  } else {
                    this.swiperController.showPrevious()
                  }
                  this.positionX = 0
                })
            )
        })
      }
      .index(this.index)
      .indicator(false)
      .duration(300)
      .loop(false)
      .onChange((index: number) => {
        this.index = index
      })

      Text(`${this.index + 1} / ${this.imageList.length}`)
        .fontColor(Color.White)
        .margin({
          left: 20,
          bottom: 20
        })
    }
    .width('100%')
    .height('100%')
  }
}