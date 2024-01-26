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
export interface TestButton {
  title: Resource | string, // Third-level category headings
  url?: string, // Third-level category detail page URL
  childNodes?: TestButton[]
}
export const GRAPHIC_TRANSFORMATION: TestButton[] =
  [
    {
      title: '设备信息',
      url: 'pages/testSample/information'
    },
    {
      title: '存储',
      url: 'pages/testSample/fileRW'
    },
    {
      title: '扬声器',
      url: 'pages/testSample/audio',
    },
    {
      title: 'MIC',
      url: 'pages/Mic/Mic_index'
    },
    {
      title: '摄像头',
      url: 'pages/Camera/Camera_index'
    },
    {
      title: '蓝牙',
      url: 'pages/testSample/bluetooth'
    },
    {
      title: 'WIFI',
      url: 'pages/testSample/wifi'
    },
    {
      title: '传感器',
      url: 'pages/testSample/sensor'
    },
    {
      title: '灰度测试',
      url: 'pages/testSample/gradient'
    },
    {
      title: '读卡测试',
      url: 'pages/testSample/nfc'
    },
    {
      title: '触摸测试',
      url: 'pages/testSample/touch'
    },
    {
      title: 'LED测试',
      url: 'pages/testSample/led'
    }
  ]
