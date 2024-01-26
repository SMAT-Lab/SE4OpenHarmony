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
import router from '@ohos.router';
import JumpPathConfig from '../JumpPathConfig';

async function routePage(index: number) {
  try {
    let jumpUri = JumpPathConfig.getJumpPath(index);
    let options: router.RouterOptions = {
      url: jumpUri
    }
    await router.pushUrl(options)
  } catch (err) {
    // TODO  hilog
  }
}

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  private arrStr: string[] = JumpPathConfig.getText();
  private arrIndex: number[] = JumpPathConfig.getIndex();

  build() {
    Row() {
      Column() {
        Flex({ alignItems: ItemAlign.Center, alignContent: FlexAlign.Center, justifyContent: FlexAlign.Center }) {
          List({ space: 20, initialIndex: 0 }) {
            ForEach(this.arrIndex, (item: string) => {
              ListItem() {
                Text(this.arrStr[item])
                  .width('100%')
                  .height(100)
                  .fontSize(16)
                  .textAlign(TextAlign.Center)
                  .borderRadius(10)
                  .backgroundColor(0xFFFFFF)
              }.onClick((event) => {
                routePage(Number.parseInt(item))
              })
            }, (item: string) => item)
          }.listDirection(Axis.Vertical)
          .divider({ strokeWidth: 2, startMargin: 20, endMargin: 20 })
          .edgeEffect(EdgeEffect.None)
          .chainAnimation(false)
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}