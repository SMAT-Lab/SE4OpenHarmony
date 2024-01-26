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

import { computeNBodyByTaskPool, computeNBodyByWorker } from '../model/CalculateUtil';
import Logger from '../utils/Logger';
import Constants from '../utils/Constants'

const TAG: string = 'Index';
const WHILE_CALCULATE: string = 'Calculating...';
const ID_BUTTON_TASK_POOL_CALCULATE: string = "id_btn_task_pool_calculate";
const ID_BUTTON_WORKER_CALCULATE: string = "id_btn_worker_calculate";
const ID_TEXT_MESSAGE: string = "id_text_message";
const ID_TOP_IMAGE: string = "id_top_image";
const ID_TOP_TEXT: string = "id_top_text";

@Entry
@Component
struct Index {
  @State message: string = 'Click button to calculate.'
  @StorageLink('timeCost') @Watch('timeCostChanged') timeCost: String = ''

  timeCostChanged(): void {
    let timeCost: string | undefined = AppStorage.get<string>('timeCost')
    if (timeCost !== undefined) {
      this.message = timeCost
    }
  }

  build() {
    Column() {
      Stack({ alignContent: Alignment.Center }) {
        Image($r("app.media.galaxy_1280"))
          .width($r('app.string.layout_100'))
          .height($r('app.string.layout_100'))
          .borderRadius($r('app.integer.top_image_border_radius'))
          .autoResize(false)
          .id(ID_TOP_IMAGE)
        Text($r('app.string.page_title'))
          .fontSize($r('app.integer.top_bar_font_size'))
          .fontColor(Color.White)
          .textAlign(TextAlign.Center)
          .id(ID_TOP_TEXT)
      }
      .height($r('app.string.layout_24'))
      .width($r('app.string.layout_100'))

      Text(this.message)
        .fontSize($r('app.integer.center_message_font_size'))
        .fontWeight(FontWeight.Bold)
        .height($r('app.string.layout_10'))
        .id(ID_TEXT_MESSAGE)

      Button($r('app.string.button_task_pool_text')).onClick(() => {
        // 使用任务池执行计算任务
        if (this.message === WHILE_CALCULATE) {
          this.reCalculateAlert();
        } else {
          this.message = WHILE_CALCULATE;
          computeNBodyByTaskPool(Constants.TIME_STEPS_TASK_POOL);
        }
      }).margin({
        top: $r('app.integer.button_task_pool_margin_top')
      }).id(ID_BUTTON_TASK_POOL_CALCULATE)

      Button($r('app.string.button_worker_text')).onClick(() => {
        // 使用Worker执行计算任务
        if (this.message === WHILE_CALCULATE) {
          this.reCalculateAlert();
        } else {
          this.message = WHILE_CALCULATE;
          computeNBodyByWorker(Constants.TIME_STEPS_WORKER);
        }
      }).margin({
        top: $r('app.integer.button_worker_margin_top')
      }).id(ID_BUTTON_WORKER_CALCULATE)
    }
    .width($r('app.string.layout_100'))
    .height($r('app.string.layout_100'))
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }

  private reCalculateAlert(): void {
    AlertDialog.show({
      title: $r('app.string.AlertDialog_title'),
      message: $r('app.string.AlertDialog_message'),
      autoCancel: true,
      alignment: DialogAlignment.Bottom,
      offset: { dx: 0, dy: $r('app.integer.AlertDialog_offset') },
      confirm: {
        value: $r('app.string.AlertDialog_ok'),
        action: () => {
          Logger.info(TAG, 'Callback when confirm button is clicked');
        }
      },
      cancel: () => {
        Logger.info(TAG, 'Closed callbacks');
      }
    })
  }
}