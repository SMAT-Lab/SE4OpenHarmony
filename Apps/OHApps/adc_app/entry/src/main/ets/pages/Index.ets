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

import { value_text, get_value_button, value_QRcode, show_switch } from "./widgets"

@Entry
@Component
struct Index {
  @State adc_value: number = 0 ;
  @State temperature: number = 0 ;
  @State visual: number = 1;

  build() {
    Row() {
      Column() {
        value_text({ adc_value: $adc_value, temperature: $temperature });
        get_value_button({ adc_value: $adc_value, temperature: $temperature });
      }
      .margin({ top: '10%', left: '15%' })

      Column() {
        value_QRcode({ adc_value: $adc_value, temperature: $temperature, visual: $visual });
        show_switch({ visual: $visual });
      }
      .margin({ top: '20%', left: '15%' })
    }
  }
}
