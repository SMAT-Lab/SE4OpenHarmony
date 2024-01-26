/**
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

@Entry
@Component
struct ScreenExample {
  @State myscale: number = 1

  build() {
    Column() {
      Text(this.myscale.toString())
      Image($r('app.media.icon'))
        .objectFit(ImageFit.Auto)
        .height(200)
        .width(200)
        .id("pinch_ima")
        .scale({ x: this.myscale, y: this.myscale, z: this.myscale })
        .gesture(
          PinchGesture()
            .onActionStart((event: GestureEvent) => {
              console.info('Pinch start')
            })
            .onActionUpdate((event: GestureEvent) => {
              this.myscale = event.scale
            })
            .onActionEnd(() => {
              console.info('Pinch end')
            })
        )
    }
    .width('100%')
    .height('100%')
  }
}