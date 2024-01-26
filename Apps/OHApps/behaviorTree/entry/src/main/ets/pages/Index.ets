/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { BehaviorTree, Selector, Task, SUCCESS, Random, RUNNING, FAILURE, BehaviorTreeImporter } from "behaviortree";
import { JSONData } from "./model";

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  behaviorTreeImporter = new BehaviorTreeImporter();
  mySelector = new Random({
    nodes: []
  })
  bTree: BehaviorTree = new BehaviorTree({ tree: this.mySelector, blackboard: {} });
  timerId: number = 0;
  flag: Boolean = true;

  aboutToAppear() {
    this.init();
    this.bTree = new BehaviorTree({ tree: this.behaviorTreeImporter.parse(JSONData), blackboard: {} })
  }

  init() {
    BehaviorTree.register(
      "computer",
      new Task({
        run(): undefined {
          console.log("小明选择了计算机专业");
          return undefined;
        },
      })
    );
    BehaviorTree.register(
      "accountant",
      new Task({
        run(): undefined {
          console.log("小明选择了会计专业");
          return undefined;
        },
      })
    );
    BehaviorTree.register(
      "teacher",
      new Task({
        run(): undefined {
          console.log("小明选择了教师专业");
          return undefined;
        },
      })
    );

    BehaviorTree.register(
      "Huawei",
      new Task({
        run() {
          const value = Math.random() * 10;
          console.log(`Huawei Value ${value}`);
          if (value >= 5) {
            console.log("通过了--华为--面试");
            return SUCCESS;
          } else {
            console.error("未通过--华为--面试");
            return FAILURE;
          }
        },
      })
    );

    BehaviorTree.register(
      "Tencent",
      new Task({
        run() {
          const value = Math.random() * 10;
          console.log(`Tencent Value ${value}`);
          if (value >= 5) {
            console.log("通过了--腾讯--面试");
            return SUCCESS;
          } else {
            console.error("未通过--华为--面试");
            return FAILURE;
          }
        },
      })
    );

    BehaviorTree.register(
      "GL",
      new Task({
        run() {
          const value = Math.random() * 10;
          console.log(`GL Value ${value}`);
          if (value >= 5) {
            console.log("通过了--谷歌--面试");
            return SUCCESS;
          } else {
            console.error("未通过--谷歌--面试");
            return FAILURE;
          }
        },
      })
    );
  }

  build() {
    Row() {
      Column() {
        Button("启动行为树实例").onClick(() => {
          //防止多次设置重复调用行为树启动
          if (this.flag) {
            this.flag = false;
            this.timerId = setInterval(() => {
              this.bTree.step();
            }, 1000)
          }

        })
        Button("关闭行为树实例").onClick(() => {
          this.flag = true;
          clearInterval(this.timerId);
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}