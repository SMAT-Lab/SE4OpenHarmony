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
import { TitleBar } from '../../common/TitleBar'
// @ts-ignore
import nfctest from '@ohos.nfctest'
import Logger from '../../model/Logger'

const TAG = 'nfcSample'

@Entry
@Component
export struct nfcSample {
  @State nfc: string[] = []
  @State @Watch('readNfcTimesChange') readNfcTimes: number = 0
  scroller: Scroller = new Scroller()
  private message: string = "1、到达此界面时，读卡器已经可以使用;\n2、展示区将展示读卡器发送给本机的数据和分机发送给读卡器的数据;\n3、读卡器读卡成功将发送卡号，本机回复 AA 55 停止读卡;\n4、读卡器读卡失败不会展示任何信息;\n"

  getNfcValue() {
    nfctest.get_nfc_value()
      .then((ret) => {
        Logger.info(TAG, "get_nfc_value " + ret);
        this.nfc.push(ret);
        this.readNfcTimes++;
      })
      .catch((err) => {
        Logger.error(TAG, `get_nfc_value failed err is ${JSON.stringify(err)}`)
        this.readNfcTimes++;
      })
  }

  readNfcTimesChange() {
    Logger.error(TAG, "messageChange this.readNfcTimes:" + this.readNfcTimes);
    this.getNfcValue();
    this.scroller.scrollEdge(Edge.Bottom);
  }

  aboutToAppear() {
    Logger.info(TAG, "this.message" + this.nfc);
    this.getNfcValue();
  }
  onPageHide() {
    nfctest.nfc_release();
  }
  build() {
    Column() {
      TitleBar({ title: '读卡测试' })
      Text("读卡次数：" + this.nfc.length)
        .margin({ bottom: 25 })
      Scroll(this.scroller) {
        Column() {
          ForEach((this.nfc), (item, index) => {
            Text("第" + (index + 1) + "次数据: " + item)
              .width('90%')
              .height(50)
              .borderWidth({ bottom: 1 })
              .textAlign(TextAlign.Center)
          })
        }
        .margin({ bottom: 200 })
      }
      .width('100%')
      .padding({ left: 16, right: 16 })
    }
    .margin({ bottom: 80 })
    .width('100%')
    .constraintSize({ minHeight: '100%' })
  }
}
