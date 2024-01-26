/* Copyright 2022 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';

@Entry
@Component
struct Index {
  aboutToAppear() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'TestAbility index aboutToAppear');
  }
   build() {
         Row() {
           Column() {
             Row(){
               Text("i2c获取温度值")
               Text("测试中...")
                 .id("temperatureTest")
                 .margin({left:"100px"})
             }
             Row(){
               Text("i2c获取湿度值")
               Text("测试中...")
                 .id("humidityTest")
                 .margin({left:"100px"})
             }
             .margin({top:"50px"})
           }
           .width('50%')
           .alignItems(HorizontalAlign.Center)
           Column() {
             Row(){
               Text("pwm转动")
               Text("测试中...")
                 .id("pwmTest")
                 .margin({left:"100px"})
             }
           }
           .margin({top:"-80px"})
           .width('50%')
         }
         .height('100%')
   }
 }