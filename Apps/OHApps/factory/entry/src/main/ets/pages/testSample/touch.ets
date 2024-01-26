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
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
import promptAction from '@ohos.promptAction';
import window from '@ohos.window';

const TAG = 'touchSample';

@Entry
@Component
export struct touchSample {
  @State @Watch('touchTestChange') touchTest: number = 1; // 触摸测试样例
  @State @Watch('touchedCountChange') touchedCount: number = 0; // 触摸测试样例
  @State gridItem: boolean[] = [];
  @State buttonsOffsetX: number[] = [0, 100, 200, 300, 400, 500];
  @State buttonsOffsetY: number[] = [0, 100, 200, 300, 400, 500];
  @State myColumnsTemplate: string = "1fr 1fr 1fr 1fr 1fr 1fr";
  @State myRowsTemplate: string = "1fr 1fr 1fr 1fr 1fr 1fr";
  private gridItemArea: Area[] = [];
  private gridItemCount: number;

  touchedCountChange() {
    Logger.info(TAG,"touchedCount:"+this.touchedCount+"this.gridItemCount"+this.gridItemCount +"this.touchTest:"+this.touchTest);

    if (this.touchedCount >= this.gridItemCount -1 && this.touchTest == 1) {
      Logger.info(TAG,"this.touchTest++");
      this.touchTest++;
    }
    if (this.touchedCount >= this.gridItemCount - 1 && this.touchTest == 2) {
      this.touchTest++;
    }
  }
  initGridItem(){
    for (let i = 0;i < this.gridItemCount; i++) {
      this.gridItem[i] = false;
    }
  }
  promptActionTouchTestChange() {
    // 弹窗
    try {
      promptAction.showDialog({
        title: '屏幕触摸项目' + this.touchTest,
        message: '1、点击确定开始屏幕触控测试,在单元格上执行点击、拖动等操作会消除单元格，消除完屏幕所有单元格后会自动进行下一项测试2、五指同时触控屏幕可跳过此项测试进行下一项测试',
        buttons: [
          {
            text: '确定',
            color: '#000000',
          }
        ],
      })
        .then(data => {
          switch(this.touchTest){
            case 1:
              this.gridItemCount = 36;this.initGridItem();break;
            case 2:
              this.gridItemCount = 144;this.initGridItem();break;
            default :;
          }
          console.info('showDialog success, click button: ' + data.index);
        })
        .catch(err => {
          console.info('showDialog error: ' + err);
        })
    } catch (error) {
      console.error(`showDialog args error code is ${error.code}, message is ${error.message}`);
    }
    ;
  }

  touchTestChange() {
    Logger.info(TAG,"touchTestChange");
    this.touchedCount = 0;
    this.gridItem = [];
    if (this.touchTest == 2) {
      this.myColumnsTemplate = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
      this.myRowsTemplate = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
      Logger.info(TAG, "this.gridItem.length" + this.gridItem.length + "this.gridItemArea.length" + this.gridItemArea.length);
    }
    this.promptActionTouchTestChange();
  }

  aboutToAppear() {
    Logger.info(TAG, "aboutToAppear");
  }

  onPageShow() {
    this.promptActionTouchTestChange();
  }
  // area.globalPosition: 目标元素左上角相对页面左上角的位置。
  isInArea(area: Area, x: number, y: number): boolean {
    if (x >= area.globalPosition.x && x <= Number(area.globalPosition.x) + Number(area.width)) {
      if (y >= area.globalPosition.y && y <= Number(area.globalPosition.y) + Number(area.height)) {
        return true;
      }
    }
    return false;
  }

  build() {
    Column() {
      TitleBar({ title: '触摸测试' })
      Stack({ alignContent: Alignment.TopStart }) {
        Grid() {
          ForEach(this.gridItem, (item, index) => {
            GridItem() {
            }
            .onAreaChange((oldValue: Area, newValue: Area) => {
              if (this.gridItemArea.length <= this.gridItem.length) {
                this.gridItemArea[index] = newValue;
                Logger.log(TAG, "gridItemArea:" + this.gridItemArea.length + this.gridItemCount);
              }
            })
            .id("GridItem" + index)
            .onClick(() => {
              if (this.gridItem[index] == false) {
                this.gridItem[index] = true;
                this.touchedCount++;
              }
            })
            .borderWidth(1)
            .backgroundColor(item ? Color.Black : Color.White)
            .borderColor(Color.Black)
            .width('100%')
            .height('100%')
          }, item => item)
        }
        .onTouch((event: TouchEvent) => {
          Logger.log(TAG, "TouchEventX:" + event.changedTouches[0].screenX + "TouchEventY:" + event.changedTouches[0].screenY);
          this.gridItemArea.forEach((element, index) => {
            if (this.isInArea(element, event.changedTouches[0].screenX, event.changedTouches[0].screenY)) {
              if (this.gridItem[index] == false) {
                this.gridItem[index] = true;
                this.touchedCount++;
              }
            }
          });
        })
        .width('100%')
        .height('100%')
        .columnsTemplate(this.myColumnsTemplate) // Grid宽度均分成4份
        .rowsTemplate(this.myRowsTemplate) // Grid高度均分成5份
      }
      .hitTestBehavior(HitTestMode.Transparent)
      .gesture(
        GestureGroup(GestureMode.Parallel,
          LongPressGesture({ fingers: 5, repeat: true })
            // 由于repeat设置为true，长按动作存在时会连续触发，触发间隔为duration（默认值500ms）
            .onAction((event: GestureEvent) => {

              Logger.info(TAG, "onActionUpdate");
              let fingerLists = event.fingerList;
              Logger.info(TAG, "onActionUpdate" + event.fingerList.length);
              fingerLists.forEach((value, index) => {
                this.buttonsOffsetX[index] = value.globalX;
                this.buttonsOffsetY[index] = value.globalY;
                Logger.info(TAG, "GestureEventX:" + value.globalX + "GestureEventY:" + value.globalY);
              })
            }),
          PinchGesture({ fingers: 5 })
            .onActionEnd(() => {
              this.initGridItem();
              this.touchTest++;
            })
        )
      )
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')

  }
}
