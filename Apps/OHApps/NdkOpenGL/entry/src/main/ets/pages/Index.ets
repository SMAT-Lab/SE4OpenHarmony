/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 */

import { Logger } from '../utils/Logger';
import tetrahedron_napi from 'libtetrahedron_napi.so';
import resmgr from '@ohos.resourceManager';

@Entry
@Component
struct Index {
  @State angleArray: Array<number> = new Array<number>();
  @State shaftRotation: string = '';
  private xcomponentId = 'tetrahedron';
  private panOption: PanGestureOptions = new PanGestureOptions({ direction: PanDirection.All });

  async aboutToAppear() {
    Logger.info('aboutToAppear');
    this.angleArray[0] = 30;
    this.angleArray[1] = 45;
    let resourceManager: resmgr.ResourceManager = getContext(this).resourceManager;
    this.shaftRotation = await resourceManager.getStringValue($r('app.string.shaftRotation').id);
  }

  build() {
    Column() {
      Text($r('app.string.EntryAbility_desc'))
        .fontSize($r('app.float.head_font_24'))
        .lineHeight($r('app.float.wh_value_33'))
        .fontFamily('HarmonyHeiTi-Bold')
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.font_color_182431'))
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .textAlign(TextAlign.Start)
        .margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') })

      Text('X ' + this.shaftRotation + ':' +  this.angleArray[0].toString()
           + '°\nY ' + this.shaftRotation + ':' + this.angleArray[1].toString() + '°')
        .fontSize($r('app.float.head_font_24'))
        .lineHeight($r('app.float.wh_value_33'))
        .fontFamily('HarmonyHeiTi-Bold')
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.font_color_182431'))
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .textAlign(TextAlign.Start)
        .margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') })

      Column() {
        XComponent({ id: this.xcomponentId, type: 'surface', libraryname: 'tetrahedron_napi' })
          .onLoad(() => {
            Logger.info('onLoad');
          })
          .width($r('app.float.wh_value_360'))
          .height($r('app.float.wh_value_360'))
          .key('tetrahedron')
          .onDestroy(() => {
            Logger.info('onDestroy');
          })
          .id('xComponent')
          .backgroundColor(Color.White)
      }
      .justifyContent(FlexAlign.SpaceAround)
      .alignItems(HorizontalAlign.Center)
      .height('80%')
      .width('100%')
      .backgroundColor(Color.White)
      .borderRadius(24)
    }
    .gesture(
      PanGesture(this.panOption)
        .onActionStart((event: GestureEvent) => {
          Logger.info('Gesture onActionStart');
        })
        .onActionUpdate((event: GestureEvent) => {
          this.angleArray = tetrahedron_napi.updateAngle(event.offsetX, event.offsetY);
          Logger.info('Gesture onActionUpdate : offSet ' + event.offsetX + ',' + event.offsetY);
        })
        .onActionEnd(() => {
          Logger.info('Gesture onActionEnd');
        })
    )
    .padding(12)
    .backgroundColor('#f1f3f5')
    .height('100%')
  }
}
