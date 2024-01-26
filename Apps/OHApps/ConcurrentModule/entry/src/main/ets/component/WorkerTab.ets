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

import worker from '@ohos.worker';

@Component
export struct WorkerTab {
  @State jsWorkerOutPutStr: string = '';
  @State jsWorkerInPutStr: string = '';
  jsWorkerInPutArr: string[] = [];
  isDone: boolean = false;
  myWorker: worker.ThreadWorker = new worker.ThreadWorker("entry/ets/workers/Worker.ts");

  build() {
    Column() {
      Text($r('app.string.Text_desc'))
        .width("100%")
        .height("48vp")
        .position({ x: "7%", y: "0vp" })
        .fontFamily("HarmonyHeiTi-Medium")
        .fontSize("16fp")
        .fontColor("#182431")
        .lineHeight(22)
        .fontWeight(500)

      TextArea({text:this.jsWorkerInPutStr})
        .id("jsWorkerInPutTextArea")
        .width("93.3%")
        .height("139vp")
        .position({ x: "3.3%", y: "48vp" })
        .textAlign(TextAlign.Start)
        .fontFamily("HarmonyHeiTi")
        .fontSize("16fp")
        .fontColor("#182431")
        .fontWeight(400)
        .padding({ top: "8vp" , left: "16vp", right: "16vp", bottom: "21vp" })
        .borderRadius("24vp")
        .backgroundColor("#ffffff")
        .onChange((value: string) => {
          this.jsWorkerInPutStr = value;
          this.jsWorkerInPutArr = value.trim().split(',');
          this.jsWorkerOutPutStr = '';
        })

      Text($r('app.string.Result_desc'))
        .width("100%")
        .height("48")
        .position({ x: "7%", y: "187vp" })
        .fontFamily("HarmonyHeiTi-Medium")
        .fontSize("16fp")
        .fontColor("#182431")
        .lineHeight(22)
        .fontWeight(500)

      Scroll() {
        Text(this.jsWorkerOutPutStr)
          .id("jsWorkerOutPutText")
          .fontFamily("HarmonyHeiTi")
          .fontSize("16fp")
          .fontColor("#182431")
          .fontWeight(400)
          .padding({ top: "8vp" , left: "16vp", right: "16vp", bottom: "21vp" })
      }
      .id("jsWorkerOutPutScroll")
      .width("93.3%")
      .height("139vp")
      .position({ x: "3.3%", y: "235vp" })
      .borderRadius("24vp")
      .backgroundColor("#ffffff")
      .align(Alignment.TopStart)

      GridRow({columns: 4,
        gutter: { x: 12, y: 12 },
        breakpoints: { value: ["360vp", "480vp"]},
        direction: GridRowDirection.Row}) {
        GridCol ({ span: 2, offset: 0 }) {
          Button() {
            Text($r('app.string.Clear_desc'))
              .width("100%")
              .height("22")
              .fontFamily("HarmonyHeiTi-Medium")
              .fontSize("16fp")
              .fontColor("#007DFF")
              .textAlign(TextAlign.Center)
              .lineHeight(22)
              .fontWeight(500)
          }
          .id("workerClearButton")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("rgba(24,36,49,0.05)")
          .onClick(()=>{
            this.jsWorkerInPutStr = '';
            this.jsWorkerOutPutStr = '';
          })
        }

        GridCol ({ span: 2, offset: 0 }) {
          Button() {
            Text($r('app.string.SortString_desc'))
              .width("100%")
              .height("22")
              .fontFamily("HarmonyHeiTi-Medium")
              .fontSize("16fp")
              .fontColor("#FFFFFF")
              .textAlign(TextAlign.Center)
              .lineHeight(22)
              .fontWeight(500)
          }
          .id("workerStrSort")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("#007DFF")
          .onClick(()=>{
            this.executeWorkerFunc(this.jsWorkerInPutArr);
          })
        }
      }
      .width("100%")
      .height("40vp")
      .position({ x: "0", y: "555vp" })
      .padding({ left: "24vp", right: "24vp" })
    }
    .width("100%")
    .height("100%")
    .justifyContent(FlexAlign.Center)
  }

  async executeWorkerFunc(inPutArr: string[]) {
    if (!this.jsWorkerInPutStr.length) {
      this.jsWorkerOutPutStr = "No input for the string to be sorted.\n";
      return;
    }
    this.myWorker.postMessage(inPutArr);
    let strFlag = false;
    let outPutStr = '';
    this.myWorker.onmessage = (e) => {
      outPutStr = e.data.toString();
      strFlag = true;
    }
    while(!strFlag) {
      await promiseCase();
    }
    this.jsWorkerOutPutStr = outPutStr;
  }
}

function promiseCase() : Promise<Object> {
  let p: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 100)
  })
  return p;
}