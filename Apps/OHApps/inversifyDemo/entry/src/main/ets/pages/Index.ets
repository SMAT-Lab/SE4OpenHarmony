/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import  { Warrior } from "./interfaces";
import prompt from '@ohos.prompt';
//
// expect(ninja.fight()).eql("cut!"); // true
// expect(ninja.sneak()).eql("hit!"); // true
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Button("ninja.fight()")
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            const ninja = myContainer.get<Warrior>(TYPES.Warrior);
            prompt.showToast({message:ninja.fight()})
          }).width("100%").margin({bottom:20})
        Button("ninja.sneak()")
          .fontSize(20)

          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            const ninja = myContainer.get<Warrior>(TYPES.Warrior);
            prompt.showToast({message:ninja.sneak()})

          }).width("100%")

      }
      .width('100%')
    }
    .height('100%')
  }
}