/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import {
  diffChars,
  diffWords,
  diffWordsWithSpace,
  diffLines,
  diffTrimmedLines,
  diffSentences,
  diffCss,
  diffJson,
  diffArrays
} from 'diff'

@Entry
@Component
struct Index {
  @State strChars: string = '文本块比较'
  @State strWords: string = '文本块_忽略空格'
  private canvasContext: CanvasRenderingContext2D = new CanvasRenderingContext2D({ antialias: true })
  private offContext: OffscreenCanvasRenderingContext2D = new OffscreenCanvasRenderingContext2D(600, 600, {
    antialias: true
  })
  private scroller: Scroller = new Scroller()
  @State visible: Visibility = Visibility.Visible;
  @State canvasWidth: number = 0;
  @State canvasHeight: number = 0;
  @State oldStr: string = "";
  @State newStr: string = "";
  @State resultData: string = "";

  build() {
    Column() {
      Scroll(this.scroller) {
        Row() {
          Button(this.strChars)
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = 'beep boop   afff测试样本one1';
              const other = 'beepboob 2022真热样本 e ';
              const diff: Data[] = diffChars(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })

          Button(this.strWords)
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = 'beep boop   afff测试样本one1';
              const other = 'beepboob 2022真热样本 e ';
              const diff: Data[] = diffWords(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })

          Button("文本块_空格视为重要")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = 'beep boop   afff测 试样本one1';
              const other = 'beepboob 2022真热样本 e ';
              const diff: Data[] = diffWordsWithSpace(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })
          Button("逐行比较")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = 'beep boop   afff测 试样本one1 爱啥啥啥来着';
              const other = 'beepboob 2022真热样本 e 案发飒飒afffff';
              const diff: Data[] = diffLines(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })
          Button("逐行比较_忽略前尾空格")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = ' beep boop   aff哈哈  是是技术/n 撒谎还会啥杀害 ';
              const other = 'beepboob 2022真热样本 e ';
              const diff: Data[] = diffTrimmedLines(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })
          Button("逐句比较")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = 'beep boop,afff哈哈,是是技术/n 撒谎还会啥杀害';
              const other = 'beepboob 2022真热样本,e? ';
              const diff: Data[] = diffSentences(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })
          Button("比较CSS标记")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = '.{ width: 960px; padding: 0;}';
              const other = '#container { width: 960px; margin: auto;}';
              const diff: Data[] = diffCss(one, other);
              this.drawText(diff);
              this.objectToString(one, other, diff);
            }).margin({ bottom: "20vp", left: "20vp" })
          Button("比较JSON")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = '[{"name":"josn1","account":1,"firstIndex":1}]';
              const other = '[{"name":"josn2","accountTwo":2,"scoundIndex":2}]';
              const diff: Data[] = diffJson(one, other);
              this.objectToString(one, other, diff);
              this.visible = Visibility.Hidden;
            }).margin({ bottom: "20vp", left: "20vp" })
          Button("比较两个数组")
            .fontSize(18)
            .height("45vp")
            .onClick((event) => {
              const one = [1, 2, 3, 4, 5, 5, 7, 8];
              const other = [1, 2, 3, 12, 5, 5, 7, 8, 9, 10];
              const diff: Data[] = diffArrays(one, other);
              this.objectToString(one, other, diff);
              this.visible = Visibility.Hidden;
            }).margin({ bottom: "20vp", left: "20vp" })
        }
        .alignItems(VerticalAlign.Center)
        .justifyContent(FlexAlign.Center)
        .height(200)
      }.scrollable(ScrollDirection.Horizontal)
      .height(200)


      Column() {
        Canvas(this.canvasContext).width(this.canvasWidth).height(this.canvasHeight).backgroundColor(Color.Black)
      }.visibility(this.visible)
      .justifyContent(FlexAlign.Center)
      .margin({ top: '50vp' })
      .width('100%')

      Text("---------------------------------------结果展示(oldStr,newStr为参数，resultData为结果)------------------------------------------------------")
        .fontSize(18)
        .margin({ top: "20vp" });
      Text(this.oldStr).fontSize(18).margin({ top: "20vp" });
      Text(this.newStr).fontSize(18).margin({ top: "20vp" });
      Text(this.resultData).fontSize(18).margin({ top: "20vp" });
    }
    .height('100%')
  }

  aboutToAppear() {
    console.log("asasf,aboutToAppear");
  }

  drawText(diff: Data[]) {
    if (this.visible == Visibility.Hidden) {
      this.visible = Visibility.Visible;
    }
    let x: number = 10;
    let y: number = 10;
    this.offContext.clearRect(10, 10, this.canvasWidth, this.canvasHeight);
    diff.forEach((part: Data) => {
      let item: Data = part as Data
      let str = new String();
      this.offContext.beginPath();
      this.offContext.font = '50px sans-serif'
      if (item.added) {
        this.offContext.fillStyle = "#00FF00"
      } else if (item.removed) {
        this.offContext.fillStyle = "#FF0000"
      } else {
        this.offContext.fillStyle = "#CCCCCC"
      }
      str = item.value;
      let measure = this.offContext.measureText(str.valueOf())
      y = measure.height;
      this.offContext.fillText(str.valueOf(), x, y);
      x = x + measure.width / 2;

    });
    let image = this.offContext.transferToImageBitmap();
    this.offContext.closePath();
    this.canvasContext.beginPath();
    this.canvasContext.transferFromImageBitmap(image);
    this.canvasContext.closePath();
    this.canvasHeight = y * 2 - 5;
    this.canvasWidth = x + 20;
  }

  objectToString(oldNtr: string | number[], newNtr: string | number[], result: Data[]) {
    this.oldStr = "oldStr>>>>:" + JSON.stringify(oldNtr);
    this.newStr = "newStr>>>>>:" + JSON.stringify(newNtr);
    this.resultData = "resultData>>>>>:" + JSON.stringify(result);
  }
}

interface Data {
  added?: undefined | boolean
  count: number
  removed?: undefined | boolean
  value: string
}