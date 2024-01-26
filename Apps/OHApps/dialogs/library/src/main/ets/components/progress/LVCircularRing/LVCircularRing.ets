/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LVCircularRingController } from './LVCircularRingController'
import { AnimateManager, Switch } from '../base/AnimateManager'


@Component
export struct LVCircularRing {
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context2D: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  @Watch('watchLVCircularRingController') @Link controller: LVCircularRingController;
  @Watch('watchAnimateManager') @Link animateManager: AnimateManager;
  compWidth: number = 0
  compHeight: number = 0
  minWidth: number = 0
  pad: number = 5
  lineWidth: number = 8
  private canvasHasReady: boolean = false;
  private onReadyNext: (() => void) | undefined = undefined

  aboutToAppear() {
    this.userConfigs();
  }

  watchLVCircularRingController() {

  }

  userConfigs() {
    if (this.controller.getPadding() != -1 && this.controller.getPadding() > 0) {
      this.pad = this.controller.getPadding()
    }

  }

  watchAnimateManager() {
    if(this.animateManager){
        if(Switch.OPEN == this.animateManager.animatedSwitch){
            if(this.animateManager.duration){
                this.startAnimWithTime(this.animateManager.duration)
            }else{
                this.startAnim()
            }
        }
        else if(Switch.CLOSE == this.animateManager.animatedSwitch){
            this.stopAnim();
        }
    }
  }

  build() {
    Canvas(this.context2D)
      .onReady(() => {
        this.canvasHasReady = true;
        if (this.onReadyNext != undefined) {
          this.onReadyNext()
          this.onReadyNext = undefined;
        }
      })
      .onAreaChange((oldValue, newValue) => {
        this.compWidth = newValue.width as number;
        this.compHeight = newValue.height as number
        this.minWidth = Math.min(this.compWidth, this.compHeight)
        this.drawExecute()
      })
  }


  /**
   * 为了保证执行方法在canvas的onReay之后
   * 如果onReady未初始化,则将最新的绘制生命周期绑定到onReadNext上
   * 待onReady执行的时候执行
   * @param nextFunction 下一个方法
   */
  runNextFunction(nextFunction: () => void) {
    if (!this.canvasHasReady) {
      // canvas未初始化完成
      this.onReadyNext = nextFunction;
    } else {
      nextFunction();
    }
  }

  drawExecute() {
    this.runNextFunction(this.draw);
  }

  draw = ()=>{
    // 忽略上一次的绘制结果，只显示下面绘制的内容
    this.context2D.globalCompositeOperation = 'copy';
    this.context2D.beginPath();
    this.context2D.lineWidth = this.lineWidth; //圆环宽度
    this.context2D.strokeStyle = this.controller.getViewColor();
    this.context2D.arc(this.compWidth / 2, this.compHeight / 2, // 圆心
      this.minWidth / 2 - this.lineWidth / 2 - this.pad, // 半径
      0, Math.PI * 2); // 起始点和绘制弧度
    this.context2D.stroke();
    // 切换回默认显示模式，否则上面绘制的图像将不显示
    this.context2D.globalCompositeOperation = 'source-over';
    this.context2D.beginPath();
    this.context2D.lineWidth = 8;
    this.context2D.strokeStyle = this.controller.getBarColor();
    this.context2D.arc(this.compWidth / 2, this.compHeight / 2,
      this.minWidth / 2 - this.lineWidth / 2 - this.pad,
      this.controller.getAnimValue() / 360 * Math.PI * 2, (this.controller.getAnimValue() + 100) / 360 * Math.PI * 2);
    this.context2D.stroke();

  }

  startAnim() {
    this.controller.startViewAnim(500, this.draw)
  }

  startAnimWithTime(time:number) {
    this.controller.startViewAnim(time, this.draw)
  }

  stopAnim() {
    this.controller.stopViewAnim(this.draw)
  }
}

