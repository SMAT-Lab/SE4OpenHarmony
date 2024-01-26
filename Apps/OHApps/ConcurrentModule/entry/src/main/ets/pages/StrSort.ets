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

import { WorkerTab } from '../component/WorkerTab';
import { TaskPoolTab } from '../component/TaskPoolTab';

@Entry
@Component
struct Index {
  private controller: TabsController = new TabsController();
  @State index: number = 0;

  @Builder tabJsWorker() {
    Column() {
      Text("Worker")
        .width("57vp")
        .height("22vp")
        .position({ x: "0vp", y: "17vp" })
        .fontFamily("HarmonyHeiTi-Medium")
        .fontSize(16)
        .fontColor(this.index === 0 ? "#007DFF" : "#182431")
        .textAlign(TextAlign.Center)
        .lineHeight(22)
        .fontWeight(this.index === 0 ? 500 : 400)
        .opacity(this.index === 0 ? 1 : 0.6)
      Line()
        .width("57vp")
        .height("2vp")
        .position({ x: "0", y: "46vp" })
        .backgroundColor(this.index === 0 ? "#007DFF" : "linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)")
    }
    .id("tabJsWorker")
    .width("100%")
    .height("100%")
    .position({ x: "65%", y: "0vp" })
    .onClick(() => {
      this.index = 0;
      this.controller.changeIndex(this.index);
    })
  }

  @Builder tabTaskPool() {
    Column() {
      Text("TaskPool")
        .width("68vp")
        .height("22vp")
        .position({ x: "10vp", y: "17vp" })
        .fontFamily("HarmonyHeiTi-Medium")
        .fontSize(16)
        .fontColor(this.index === 1 ? "#007DFF" : "#182431")
        .textAlign(TextAlign.Center)
        .lineHeight(22)
        .fontWeight(this.index === 1 ? 500 : 400)
        .opacity(this.index === 1 ? 1 : 0.6)
      Line()
        .width("68vp")
        .height("2vp")
        .position({ x: "10vp", y: "46vp" })
        .backgroundColor(this.index === 1 ? "#007DFF" : "linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)")
    }
    .id("tabTaskPool")
    .height("100%")
    .width("100%")
    .position({ x: "4%", y: "0" })
    .onClick(() => {
      this.index = 1;
      this.controller.changeIndex(this.index);
    })
  }

  build() {
    Row() {
      Column() {
        Text("ConcurrentModule")
          .width("100%")
          .height("41vp")
          .position({ x: "7%", y: "31vp" })
          .fontColor("#182431")
          .fontSize("30fp")
          .fontFamily("HarmonyHeiTi-Bold")
          .lineHeight(41)
          .fontWeight(700)
          .textAlign(TextAlign.Start)

        Tabs({
          barPosition: BarPosition.Start,
          controller: this.controller
        }) {
          TabContent() {
            WorkerTab();
          }
          .width("100%")
          .height("100%")
          .tabBar(this.tabJsWorker)

          TabContent() {
            TaskPoolTab();
          }
          .width("100%")
          .height("100%")
          .tabBar(this.tabTaskPool)
        }
        .width("100%")
        .height("696vp")
        .barWidth("100%")
        .barHeight("56vp")
        .position({ x: "0vp", y: "80vp" })
        .padding({ bottom: "24vp" })
        .backgroundImage("linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)")
        .barMode(BarMode.Fixed)
        .onChange((index: number) => {
          this.index = index;
        })
      }
      .backgroundColor("#f1f3f5")
      .width("100%")
      .height("100%")
    }
    .width("100%")
    .height("100%")
  }
}
