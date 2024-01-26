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
import utf8 from "utf8";
import promptAction from '@ohos.promptAction';
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Button("编码(encode) '\xA9'").onClick(() => {
          let src:string = utf8.encode('\xA9')
          let dst = '\xC2\xA9'
          console.log('dodo encode1='+ src);
          console.log('dodo encode2 ='+dst)
          this.showMessage('src='+src + '  ===||===  dst='+dst);
        }).margin(10)
        Button("编码(encode) '\uD800\uDC01'").onClick(() => {
          let src:string = utf8.encode('\uD800\uDC01')
          let dst = '\xF0\x90\x80\x81'
          console.log('dodo encode1='+ src);
          console.log('dodo encode2 ='+dst)
          this.showMessage('src='+src + '  ===||===  dst='+dst);
        }).margin(10)
        Button("解码(decoded) '\xC2\xA9'").onClick(() => {
          let src:string = utf8.decode('\xC2\xA9')
          let dst = '\xA9'
          console.log('dodo decoded1='+ src);
          console.log('dodo decoded2 ='+dst)
          this.showMessage('src='+src + '  ===||===  dst='+dst);
        }).margin(10)
        Button("解码(decoded) '\xF0\x90\x80\x81'").onClick(() => {
          let src:string = utf8.decode('\xF0\x90\x80\x81')
          let dst = '\uD800\uDC01'
          console.log('dodo decoded1='+ src);
          console.log('dodo decoded2 ='+dst)
          this.showMessage('src='+src + '  ===||===  dst='+dst);
        }).margin(10)
      }
      .width('100%')
    }
    .height('100%')
  }

  showMessage(message:string){
    promptAction.showToast({message})
  }
}