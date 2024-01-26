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
import router from '@ohos.router';
import ServiceModel from '../components/ServiceModel'
import systemparameter from '@ohos.systemparameter'
import promptAction from '@ohos.promptAction'

@Entry
@Component
struct LocalUpdater {
  private onBack?: () => boolean;
  @State ip: string = ''

  build() {
    Column() {
      Row() {
        Image($r('app.media.back'))
          .width(30)
          .height(30)
          .objectFit(ImageFit.Contain)
          .margin({ left: 16 })
          .onClick(() => {
            let isCanNotBack = this.onBack?.();
            if (isCanNotBack) {
              return;
            }
            router.back();
          })
        Text('服务器ip修改')
          .fontSize(25)
          .fontColor(Color.Black)
          .margin({ left: 16 })
          .fontWeight(FontWeight.Bold)
      }.width('90%').height(56)

      Column() {
        Image($r('app.media.logo'))
          .height('30%')
          .width('70%')
          .objectFit(ImageFit.Contain)
        TextInput({ placeholder: '输入需要修改ip' })
          .placeholderColor(Color.Grey)
          .placeholderFont({ size: 14, weight: 400 })
          .caretColor(Color.Blue)
          .width(400)
          .height(60)
          .margin(20)
          .fontSize(50)
          .fontColor(Color.Black)

          .onChange((value: string) => {
            this.ip = value
          })
        Column() {
          Button("修改ip")
            .fontSize(50)
            .onClick(() => {
              try {
                var p = systemparameter.set("update.serverip.search", this.ip);
                try {
                  systemparameter.set("persist.otaservice.ip", this.ip, function (err, data) {
                    if (err == undefined) {
                      console.log("set test.parameter.key value success :" + data)
                    } else {
                      console.log("set test.parameter.key value err:" + err.code)
                    }
                  });
                } catch (e) {
                  console.log("set unexpected error: " + e);
                }
                p.then(function (value) {
                  promptAction.showToast({
                    message: '修改ip成功',
                    duration: 2000,
                  });
                }).catch(function (err) {
                  promptAction.showToast({
                    message: '修改失败',
                    duration: 2000,
                  });

                });
              } catch (e) {

              }

            })

        }
      }
    }
  }
}