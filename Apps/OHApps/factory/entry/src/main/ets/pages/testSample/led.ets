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
import { TitleBar } from '../../common/TitleBar'
import Logger from '../../model/Logger';

@Entry
@Component
struct Led {
  @State color: Color = Color.Red;
  @State index: number = 0;
  @State isTestTime: boolean = true;

  private intervalID;
  onPageShow(){
    this.intervalID = setInterval(() => {
      switch(this.index){
        case 0:this.color = Color.Yellow;break;
        case 1:this.color = Color.Blue;break;
        case 2:this.color = Color.White;break;
        case 3:this.color = Color.Black;break;
        default : this.color = Color.Red;this.index = -1;break;
      }
      this.index++;

    },2000)
  }
  onPageHide(){
    clearInterval(this.intervalID);
  }
  build() {
    Column() {
      TitleBar({ title: 'led测试' })
        .visibility(this.isTestTime ? Visibility.None : Visibility.Visible)
      Column() {
      }
      .backgroundColor(this.color)
      .height('100%')
      .width('100%')
    }
    .onClick(() => {
      this.isTestTime = true;
    })
    .gesture(
      PinchGesture({ fingers: 5 })
        .onActionEnd(() => {
          this.isTestTime = false;
        })
    )
    .height('100%')
  }
}