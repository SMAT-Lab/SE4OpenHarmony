/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import { localVideo } from '../common/localVideo';
import { ipVideo } from '../common/ipVideo';
import { KeyCode } from '@ohos.multimodalInput.keyCode'

@Entry
@Component
struct Index {
  @State localSrc: Resource =  $rawfile('EP11.mp4')
  @State ipSrc: Resource =  $rawfile('EP11.mp4')

  build() {
    Stack({ alignContent: Alignment.TopEnd }) {
      Stack({ alignContent: Alignment.Center }) {
        localVideo({
          src: this.localSrc
        });
      }
      .width('100%')
      .height('100%')

      Stack({ alignContent: Alignment.Center }) {
        ipVideo({
          src: this.ipSrc
        });
      }
      .width('40%')
      .height('40%')
    }

    .width('100%')
    .height('100%')
  }
}
