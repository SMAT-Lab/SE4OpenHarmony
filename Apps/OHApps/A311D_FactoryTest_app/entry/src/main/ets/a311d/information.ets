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

import systemparameter from '@ohos.systemParameterEnhance'
import wifiManager from '@ohos.wifiManager'


export class btn {
  btnName: string = ''
  isPass: boolean = false
}


@Component
export struct information {
  @State in: number = 1
  @State infValue: string[] = []
  private message: string = '九联开发板厂测程序'
  private infName: string[] = ['厂测版本：', '硬件版本：', 'mac地址：', '系统版本：']

  getSystemParam(param: string, index: number) {
    try {
      systemparameter.get(param).then((value) => {
        this.infValue[index] = value;
        console.log("get test.parameter.key success: " + this.infValue[index]);
      }).catch((err) => {
        console.log("get test.parameter.key error: " + err.code);
      });
    } catch (e) {
      console.log("get unexpected error: " + e);
    }
  }

  getMacAddress() {
    try {
      let ret = wifiManager.getDeviceMacAddress().toString();
      this.infValue[2] = ret.toString();
      console.info("deviceMacAddress:" + JSON.stringify(ret));
    } catch (error) {
      console.error("failed:" + JSON.stringify(error));
    }
  }

  setFactoryVersion(version: string) {
    this.infValue[0] = version;
  }

  aboutToAppear() {
    this.getMacAddress();
    this.setFactoryVersion('20230828');
    this.getSystemParam('ohos.boot.hardware', 1);
    this.getSystemParam('const.ohos.fullname', 3);
  }

  build() {
    Column() {
      Text(this.message)
        .fontSize(30)
        .margin({ bottom: 20 })
      Grid() {
        ForEach(this.infName, (item, index) => { // ForEach语法，循环创建GridItem
          GridItem() { // 子组件只能是GirdItem
            Text(this.infName[index] + this.infValue[index])
              .fontSize(20)
              .width('100%')
          }
        })
      }
      .columnsTemplate("1fr 1fr") // 设置Grid为2列，并且均分
      .columnsGap(10) // 设置列间距为10vp
      .rowsGap(10) // 设置行间距为10vp
      .width('100%')
      .height('20%')
    }
    .width('100%')
  }
}
