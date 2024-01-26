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
import sensor from '@ohos.sensor';
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';

const TAG = 'sensorSample';

@Entry
@Component
export struct sensorSample {
  @State myIntensity: string = '0'
  @State isDistance: number = 1

  aboutToAppear() {
    // 环境光强度
    try {
      sensor.on(sensor.SensorId.AMBIENT_LIGHT, (data) => {
        this.myIntensity = data.intensity.toFixed(2);
        Logger.info(TAG, 'The ambient light intensity: ' + data.intensity);
      }, { interval: 3000000000 });
    } catch (err) {
      Logger.error(TAG, 'On fail, errCode: ' + err.code + ' ,msg: ' + err.message);
    }
    // 接近光程度
    try {
      sensor.on(sensor.SensorId.PROXIMITY, (data) => {
        this.isDistance = data.distance;
        console.info('Distance: ' + data.distance);
      }, { interval: 3000000000 });
    } catch (err) {
      console.error('On fail, errCode: ' + err.code + ' ,msg: ' + err.message);
    }

  }

  build() {
    Column() {
      TitleBar({ title: '光感测试' })
      Column({space:10}) {
        Text("说明: 该测试项对设备感光进行测试，将设备放置于明暗环境下，光感数值有明确变化为测试成功。\n注意: 光线传感器位于摄像头右边")
        Column() {
          Row() {
            Text("设备周围光线强度：")
            Text(this.myIntensity).fontSize(50)
            Text("  lx")
          }

          Row() {
            Text("物体与设备显示器")
            Text(this.isDistance == 0 ? "接近" : "远离")
              .fontSize(50)
          }
        }
        .layoutWeight(1)
        .width('100%')
        .backgroundColor('#fff3f0f0')
        .justifyContent(FlexAlign.Center)
      }
      .layoutWeight(1)
      .width('100%')
      .padding(20)
    }
    .width('100%')
    .height('100%')

  }
}
