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

import { adcButton } from '../a311d/interfaceButton/adcButton'
import { pwmButton } from '../a311d/interfaceButton/pwmButton'
import { ledButton } from '../a311d/interfaceButton/ledButton'
import { keyButton } from '../a311d/interfaceButton/keyButton'
import { i2cButton } from '../a311d/interfaceButton/i2cButton'
import { rtcButton } from '../a311d/interfaceButton/rtcButton'
import { fourEightFiveButton } from '../a311d/interfaceButton/485Button'
import { blueButton } from '../a311d/interfaceButton/blueButton'
import { canButton } from '../a311d/interfaceButton/canButton'
import { csiButton } from '../a311d/interfaceButton/csiButton'
import { dsiButton } from '../a311d/interfaceButton/dsiButton'
import { gpioButton } from '../a311d/interfaceButton/gpioButton'
import { hdmiButton } from '../a311d/interfaceButton/hdmiButton'
import { headsetInButton } from '../a311d/interfaceButton/headsetInButton'
import { headsetRecordingButton } from '../a311d/interfaceButton/headsetRecordingButton'
import { hornAmplifierButton } from '../a311d/interfaceButton/hornAmplifierButton'
import { i2sButton } from '../a311d/interfaceButton/i2sButton'
import { ethButton } from '../a311d/interfaceButton/ethButton'
import { nineAxesButton } from '../a311d/interfaceButton/nineAxesButton'
import { otgButton } from '../a311d/interfaceButton/otgButton'
import { recoveryButton } from '../a311d/interfaceButton/recoveryButton'
import { spiButton } from '../a311d/interfaceButton/spiButton'
import { tfButton } from '../a311d/interfaceButton/tfButton'
import { ttlButton } from '../a311d/interfaceButton/ttlButton'
import { uartButton } from '../a311d/interfaceButton/uartButton'
import { usbButton } from '../a311d/interfaceButton/usbButton'
import { wifiButton } from '../a311d/interfaceButton/wifiButton'

@Component
export struct a311dInterfaceButton {
  @State backColor: Color = Color.Red;
  @State btnName: string = "ADC_1";

  aboutToAppear() {
  }

  build() {
    Column() {
      Grid() {
        // GridItem(){
        //   keyButton({
        //     interface: 1
        //   })
        // }
        // GridItem(){
        //   keyButton({
        //     interface: 2
        //   })
        // }
        // GridItem(){
        //   ledButton({
        //     interface: 1
        //   })
        // }
        // GridItem(){
        //   ledButton({
        //     interface: 2
        //   })
        // }
        // GridItem(){
        //   wifiButton()
        // }
        // GridItem(){
        //   rtcButton()
        // }
        // GridItem(){
        //   ethButton()
        // }
        // GridItem(){
        //   spiButton()
        // }
        // GridItem(){
        //   gpioButton()
        // }
        // GridItem(){
        //   uartButton()
        // }
        // GridItem(){
        //   i2cButton()
        // }
        // GridItem(){
        //   ttlButton()
        // }
        // GridItem(){
        //   canButton()
        // }
        // GridItem(){
        //   adcButton({
        //     interface: 1
        //   })
        // }
        // GridItem(){
        //   adcButton({
        //     interface: 2
        //   })
        // }
        // GridItem(){
        //   pwmButton({
        //     interface: 1
        //   })
        // }
        // GridItem(){
        //   pwmButton({
        //     interface: 2
        //   })
        // }
        // GridItem(){
        //   blueButton()
        // }
        // GridItem(){
        //   hdmiButton()
        // }
        // GridItem(){
        //   headsetInButton()
        // }
        // GridItem(){
        //   headsetRecordingButton()
        // }
        // GridItem(){
        //   nineAxesButton()
        // }
        // GridItem(){
        //   recoveryButton()
        // }
        GridItem() {
          hornAmplifierButton()
        }
        // GridItem(){
        //   usbButton({
        //     interface: 1
        //   })
        // }
        // GridItem(){
        //   usbButton({
        //     interface: 2
        //   })
        // }
        // GridItem(){
        //   usbButton({
        //     interface: 3
        //   })
        // }
        // GridItem(){
        //   usbButton({
        //     interface: 4
        //   })
        // }
        // GridItem(){
        //   tfButton()
        // }
        // GridItem(){
        //   otgButton()
        // }
        // GridItem(){
        //   wifiButton({
        //     interface: 1
        //   })
        // }
        // GridItem(){
        //   wifiButton({
        //     interface: 2
        //   })
        // }
      }
      .columnsTemplate("1fr 1fr 1fr 1fr 1fr 1fr") // 设置Grid为6列，并且均分
      .columnsGap(10) // 设置列间距为10vp
      .rowsGap(10) // 设置行间距为10vp
      .width('100%')
    }
  }
}