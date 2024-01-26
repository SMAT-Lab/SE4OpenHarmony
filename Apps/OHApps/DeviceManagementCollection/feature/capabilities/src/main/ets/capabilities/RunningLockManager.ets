/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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

import runningLock from '@ohos.runningLock';
import { ColumnOperation } from '../components/ColumnOperation';
import { getString } from '@ohos/common';

@Component
export struct RunningLockManager {
  @State result: string = '';
  private timeoutID: number = 0;

  aboutToDisappear() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }

  build() {
    Scroll() {
      Column() {
        Row() {
          Text(this.result)
            .fontWeight(FontWeight.Medium)
            .fontSize(20)
        }
        .alignItems(VerticalAlign.Top)
        .width('100%')
        .backgroundColor($r("app.color.white"))
        .height(160)
        .padding(16)
        .borderRadius(20)
        .margin({ top: 16 })
        ColumnOperation({ operationRes: $r('app.strarray.running_lock_operations'), doOperation: this.doOperation })
      }
      .width('100%')
      .padding(4)
    }
    .scrollBar(BarState.Off)
  }

  doOperation = async (index: number) => {
    switch (index) {
      case 0:
        let res1 = runningLock.isSupported(runningLock.RunningLockType.BACKGROUND);
        let res2 = runningLock.isSupported(runningLock.RunningLockType.PROXIMITY_SCREEN_CONTROL);
        this.result = `${getString($r('app.string.running_lock_background'))}${res1}\n${getString($r('app.string.running_lock_proximity_screen_control'))}${res2}`;
        break
      case 1:
        try {
          let lock = await runningLock.create('running_lock_test', runningLock.RunningLockType.BACKGROUND);
          lock.hold(3000);
          this.result = `lock time 3s, isLock: true`;
          this.timeoutID = setTimeout(() => {
            let isHolding = lock.isHolding();
            this.result = `lock time 3s, isLock: ${isHolding}`;
          }, 3100)
        } catch (err) {
          this.result = `lock fail:${err}`;
        }
        break
      case 2:
        try {
          let lock = await runningLock.create('running_lock_test2', runningLock.RunningLockType.PROXIMITY_SCREEN_CONTROL);
          lock.hold(3000);
          this.result = `lock time 3s, isLock: true`;
          this.timeoutID = setTimeout(() => {
            let isHolding = lock.isHolding();
            this.result = `lock time 3s, isLock: ${isHolding}`;
          }, 3100)
        } catch (err) {
          this.result = `lock fail:${err}`;
        }
        break
      default:
        break
    }
  }
}