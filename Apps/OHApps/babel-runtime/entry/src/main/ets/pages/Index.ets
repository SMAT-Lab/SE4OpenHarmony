/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


import { HiLog } from '../HiLog';
import { ModelController } from '../Controller';
import { Model } from '../model';


@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller();
  private contrl: ModelController = ModelController.getInstance()
  private modelList: Array<Model> = new Array(0);
  private hilog: HiLog = HiLog.getHiLogInstance();
  @State result: string = "";

  build() {
    Column() {
      Row() {
        Text("显示结果： " + this.result)
          .width('80%')
          .fontSize(16)
          .textAlign(TextAlign.Start)
      }.backgroundColor(Color.Yellow).height(px2vp(300)).width("100%").margin({ top: px2vp(20), bottom: px2vp(20) })

      Stack({ alignContent: Alignment.TopStart }) {
        Scroll(this.scroller) {
          Column() {
            Text("点击下面的按钮查看结果").fontColor(Color.Red).fontSize(px2fp(20))
            ForEach(this.modelList, (item: Model) => {
              Column() {
                Text(item.name + "" + "\n函数功能： " + item.describe)
                  .width('80%')
                  .backgroundColor('#3366CC')
                  .fontSize(16)
                  .textAlign(TextAlign.Start)
              }
              .margin({ bottom: px2vp(30) })
              .alignItems(HorizontalAlign.Start)
              .onClick(() => {
                this.result = item.fun();
              })
            })
          }.width('100%')
        }
        .scrollable(ScrollDirection.Vertical) // 滚动方向纵向
        .scrollBar(BarState.On) // 滚动条常驻显示
        .scrollBarColor(Color.Gray) // 滚动条颜色
        .scrollBarWidth(10) // 滚动条宽度
        .friction(0.6)
        .edgeEffect(EdgeEffect.None)
        .onScroll((xOffset: number, yOffset: number) => {
          console.info(xOffset + ' ' + yOffset)
        })
        .onScrollEdge((side: Edge) => {
          console.info('To the edge')
        })
        .onScrollStop(() => {
          console.info('Scroll Stop')
        })
      }
    }.width('100%').height('100%').backgroundColor($r("app.color.index_background_color"))
  }

  aboutToAppear() {
    this.modelList = this.contrl.getModelArrayList();
    this.hilog.HILOG_INFO("[Sample_babel-runtime]", "index page getModelArrayList length is : " + this.modelList.length);
  }
}
