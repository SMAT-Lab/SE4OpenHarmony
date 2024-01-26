/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LazyMultiInjectFunction } from './lazyInjectInterface';

@Entry
@Component
struct LazyMultiInjectPage {
  @State message: string = 'Hello World'
  @State message2: string = 'Hello World 2'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Text(this.message2)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }

  aboutToAppear(){
    this.sample()
  }

  sample(){

    let obj = LazyMultiInjectFunction();
    console.log(obj.sword); // true
    console.log(obj.shuriken); // true
    this.message=obj.sword;
    this.message2=obj.shuriken;
  }


}

