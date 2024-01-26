/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
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
import { GpioName, Dir, Val, Gpio } from "@ohos.gpio_ctl"
import Prompt from '@system.prompt';

@Entry
@Component
struct Index {
  gpio: Gpio = new Gpio(GpioName.GPIO_01,Dir.output);
  @State gpioSelectValue: string = "GPIO_01";
  @State gpioIsOpen: boolean = false;

  build() {
    Row() {
      Column() {
        Text("GPIO Demo")
          .fontSize('60vp')
          .lineHeight('60px')
          .fontFamily('HarmonyHeiTi-Bold')
          .fontWeight(FontWeight.Bold)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Row(){
          Text("选择pin: ")
          Select([
            { value: "GPIO_01" },
            { value: "GPIO_02" },
            { value: "GPIO_03" },
            { value: "GPIO_04" },
            { value: "GPIO_05" },
            { value: "GPIO_06" },
            { value: "GPIO_07" },
            { value: "GPIO_08" },
            { value: "GPIO_09" },
            { value: "GPIO_10" },
            { value: "GPIO_11" },
            { value: "GPIO_12" },
            { value: "GPIO_13" },
            { value: "GPIO_14" },
            { value: "GPIO_15" },
            { value: "GPIO_16" },
          ])
            .selected(0)
            .value(this.gpioSelectValue)
            .onSelect((index: number, value: string) => {
              this.gpioSelectValue = value;
              this.gpio = new Gpio(GpioName[value], Dir.output);
              let val = this.gpio.read();
              this.gpioIsOpen = (val === Val.height);
            })
        }

        Row() {
          Text("开关: ")
          Toggle({ type: ToggleType.Switch, isOn: this.gpioIsOpen })
            .onChange((isOn: boolean) => {
              this.gpioIsOpen = isOn;
              if (isOn) {
                this.gpio.write(Val.height);
              }
              else {
                this.gpio.write(Val.low);
              }
              Prompt.showToast({message:isOn?"打开":"关闭"});
            })
        }
      }
      .width('100%')
    }
    .height('100%')
    .onAppear(() => {
      this.gpio = new Gpio(GpioName[this.gpioSelectValue], Dir.output);
      let val = this.gpio.read();
      this.gpioIsOpen = (val === Val.height);
    });
  }
}