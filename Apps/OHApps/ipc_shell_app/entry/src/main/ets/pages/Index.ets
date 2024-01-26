/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @ts-ignore
import ipcnapi from '@ohos.ipcnapi';
import promptAction from '@ohos.promptAction';
@Entry
@Component
struct Index {
  @State message: string = 'privilege interface test'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button("shell")
          .onClick(()=>{
            let i = ipcnapi.EexecuteCommandnapi("hilog >/data/log332")
            promptAction.showToast({
              message: i,
              duration: 2000,
            });
          })
        Button("Promis_shell")
          .onClick(()=>{
            ipcnapi.EexecuteCommandNapiWithPromise("hilog >/data/log555").then((result) =>{
              promptAction.showToast({
                message: result,
                duration: 2000,
              });
            });
          })

      }
      .width('100%')
    }
    .height('100%')
  }
}