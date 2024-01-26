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

import taskpool from '@ohos.taskpool';
import stack from '@ohos.util.Stack';

@Component
export struct TaskPoolTab {
  @State taskPoolOutPutStr: string = '';
  @State taskPoolInPutStr: string = '';
  taskPoolInPutArr: string[] = [];
  gStack: stack<taskpool.Task> = new stack();

  build() {
    Column() {
      Text($r('app.string.Text_desc'))
        .width("100%")
        .height("48vp")
        .position({ x: "7%", y: "0" })
        .fontFamily("HarmonyHeiTi-Medium")
        .fontSize("16fp")
        .fontColor("#182431")
        .lineHeight(22)
        .fontWeight(500)

      TextArea({text:this.taskPoolInPutStr})
        .id("taskPoolInPutTextArea")
        .width("93.3%")
        .height("139vp")
        .position({ x: "3.3%", y: "48vp" })
        .textAlign(TextAlign.Start)
        .borderRadius("24vp")
        .backgroundColor("#ffffff")
        .fontFamily("HarmonyHeiTi")
        .fontSize("16fp")
        .fontColor("#182431")
        .fontWeight(400)
        .padding({ top: "8vp" , left: "16vp", right: "16vp", bottom: "21vp" })
        .onChange((value: string) => {
          this.taskPoolInPutStr = value;
          this.taskPoolInPutArr = this.taskPoolInPutStr.trim().split(',');
          this.taskPoolOutPutStr = '';
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
        Text(this.taskPoolOutPutStr)
          .id("taskPoolOutPutText")
          .fontFamily("HarmonyHeiTi")
          .fontSize("16fp")
          .fontColor("#182431")
          .fontWeight(400)
          .padding({ top: "8vp" , left: "16vp", right: "16vp", bottom: "21vp" })
      }
      .id("taskPoolOutPutScroll")
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
            Text($r('app.string.Execute_After_3s_desc'))
              .width("100%")
              .height("22")
              .fontFamily("HarmonyHeiTi-Medium")
              .fontSize("16fp")
              .fontColor("#007DFF")
              .textAlign(TextAlign.Center)
              .lineHeight(22)
              .fontWeight(500)
          }
          .id("exeDelayButton")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("rgba(24,36,49,0.05)")
          .onClick(()=>{
            this.executeDelay();
          })
        }

        GridCol ({ span: 2, offset: 0 }) {
          Button() {
            Text($r('app.string.Execute_Immediately_desc'))
              .width("100%")
              .height("22")
              .fontFamily("HarmonyHeiTi-Medium")
              .fontSize("16fp")
              .fontColor("#FFFFFF")
              .textAlign(TextAlign.Center)
              .lineHeight(22)
              .fontWeight(500)
          }
          .id("exeImmButton")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("#007DFF")
          .onClick(()=>{
            this.executeImmediately();
          })
        }

        GridCol ({ span: 2, offset: 0 }) {
          Button() {
            Text($r('app.string.Function_Task_desc'))
              .width("100%")
              .height("22")
              .fontFamily("HarmonyHeiTi-Medium")
              .fontSize("16fp")
              .fontColor("#007DFF")
              .textAlign(TextAlign.Center)
              .lineHeight(22)
              .fontWeight(500)
          }
          .id("exeFunctionButton")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("rgba(24,36,49,0.05)")
          .onClick(()=>{
            this.executeFunc();
          })
        }

        GridCol ({ span: 2, offset: 0 }) {
          Button() {
            Text($r('app.string.Cancel_Task_desc'))
              .width("100%")
              .height("22")
              .fontFamily("HarmonyHeiTi-Medium")
              .fontSize("16fp")
              .fontColor("#FFFFFF")
              .textAlign(TextAlign.Center)
              .lineHeight(22)
              .fontWeight(500)
          }
          .id("exeCancelButton")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("#007DFF")
          .onClick(()=>{
            this.cancelTask();
          })
        }

        GridCol ({ span: 4, offset: 0 }) {
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
          .id("taskPoolClearButton")
          .height("40vp")
          .borderRadius("20vp")
          .backgroundColor("rgba(24,36,49,0.05)")
          .onClick(()=>{
            this.taskPoolInPutStr = '';
            this.taskPoolInPutArr = this.taskPoolInPutStr.trim().split(',');
            this.taskPoolOutPutStr = '';
          })
        }
      }
      .width("100%")
      .height("168vp")
      .position({ x: "0", y: "451vp" })
      .padding({ left: "25vp", right: "25vp" })
    }
    .width("100%")
    .height("100%")
    .justifyContent(FlexAlign.Center)
  }

  async executeImmediately() {
    if (!this.taskPoolInPutStr.length) {
      this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
      return;
    }
    let task = new taskpool.Task(strSort,this.taskPoolInPutArr);
    this.gStack.push(task);
    await taskpool.execute(task).then((result: string[]) => {
      this.taskPoolOutPutStr += "Task executed successfully: "+ result.toString()+ "\n";
    }).catch((e: Error) => {
      this.taskPoolOutPutStr += "Task executed failed: "+ e.toString()+ "\n";
    });
    this.gStack.pop();
  }

  async executeDelay() {
    if (!this.taskPoolInPutStr.length) {
      this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
      return;
    }
    let task = new taskpool.Task(strSortDelay,this.taskPoolInPutArr);
    this.gStack.push(task);
    await taskpool.execute(task).then((result: string[]) => {
      this.taskPoolOutPutStr += "Task executed successfully: "+ result.toString()+ "\n";
    }).catch((e: Error) => {
      this.taskPoolOutPutStr += "Task executed failed: "+ this.taskPoolInPutStr + "\n";
    });
    this.gStack.pop();
  }

  async executeFunc() {
    if (!this.taskPoolInPutStr.length) {
      this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
      return;
    }
    await taskpool.execute(strSort,this.taskPoolInPutArr).then((result: string[]) => {
      this.taskPoolOutPutStr += "Task executed successfully: "+ result.toString()+ "\n";
    }).catch((e: Error) => {
      this.taskPoolOutPutStr += "Task executed failed: "+ e.toString()+ "\n";
    });
  }

  async cancelTask() {
    if (this.gStack.isEmpty()) {
      this.taskPoolOutPutStr += "The current task queue has no cancellable tasks."+ "\n";
    } else {
      let task: taskpool.Task = this.gStack.peek();
      try {
        taskpool.cancel(task);
        this.taskPoolOutPutStr += "Task canceled successfully."+ "\n";
        this.gStack.pop();
      } catch(e) {
        this.taskPoolOutPutStr += "Task canceled failed: "+ (e as Error).message + "\n";
      }
    }
  }
}

function strSort(inPutArr: string[]) : string[] {
  "use concurrent"
  let newArr = inPutArr.sort();
  return newArr;
}

function strSortDelay(inPutArr: string[]) : string[] {
  "use concurrent"
  let start = new Date().getTime();
  while (new Date().getTime() - start < 3000) {
    continue;
  }
  let newArr = inPutArr.sort();
  return newArr;
}