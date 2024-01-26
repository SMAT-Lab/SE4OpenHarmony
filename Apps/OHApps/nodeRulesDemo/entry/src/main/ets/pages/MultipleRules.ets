/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import RuleEngine from "node-rules";
import Prompt from '@system.prompt';

@Entry
@Component
struct MultipleRules {
  @State message: string = 'Hello World'
  @State setValue: string = "";
  @State typeValue: string = "other";
  @State resultStr: string = "";
  controller: TextAreaController = new TextAreaController();

  ruleEngineExecute(): void {
    if (this.setValue === '' || Number.isNaN(Number(this.setValue))) {
      Prompt.showToast({
        message: '请输入整数值'
      })
      return
    }

    let ruleEngine: ESObject = new RuleEngine();

    abstract class Rule {
      abstract condition(R: ESObject)

      abstract consequence(R: ESObject)
    }

    class Rule1 extends Rule {
      condition(R: ESObject) {
        R.when((this as ESObject).transactionTotal < 500);
      }

      consequence(R: ESObject) {
        (this as ESObject).result = false;
        (this as ESObject).reason = "The transaction was blocked as it was less than 500";
        R.stop();
      }
    }

    class Rule2 extends Rule {
      condition(R: ESObject) {
        R.when((this as ESObject).cardType === "debit");
      }

      consequence(R: ESObject) {
        (this as ESObject).result = false;
        (this as ESObject).reason = "The transaction was blocked as debit cards are not allowed"
        R.stop();
      }
    }

    let rules: Rule[] = [new Rule1(), new Rule2()]

    ruleEngine.register(rules);

    let fact: ESObject = {
      name: "user4",
      application: "MOB2",
      transactionTotal: Number.parseInt(this.setValue),
      cardType: this.typeValue
    };

    console.log("-------" + this.setValue);

    ruleEngine.execute(fact, (data: ESObject) => {
      if (data.result) {
        console.log("Valid transaction:" + data.result); //满足规则
        this.resultStr = "Valid transaction:" + data.result;
      } else {
        console.log("Blocked Reason:" + data["reason"]); //不满足规则
        this.resultStr = "Blocked Reason:" + data["reason"];
      }
    })
  }

  build() {
    Column() {
      Text("目前transactionTotal 规则阻止值是小于：500，Card类型是：debit")
        .width("90%")
        .height(50)
        .borderRadius(15)
        .fontSize(13)
        .textAlign(TextAlign.Center)
        .margin({ top: 10 })

      TextArea({ placeholder: "任意数值：", controller: this.controller })
        .height(50)
        .width("100%")
        .margin({ top: 5, bottom: 5, left: 5, right: 5 })
        .onChange((value: string) => {
          this.setValue = value;
        })
      TextArea({ placeholder: "card：类型", controller: this.controller })
        .height(50)
        .width("100%")
        .margin({ top: 5, bottom: 5, left: 5, right: 5 })
        .onChange((value: string) => {
          this.typeValue = value;
        })

      Button("点击查看是否满足规则").onClick(() => {
        this.ruleEngineExecute()
      })

      Text("测试结果：" + this.resultStr)
        .width("90%")
        .height(50)
        .borderRadius(15)
        .fontSize(13)
        .textAlign(TextAlign.Center)
        .margin({ top: 10 })

    }
    .width('100%')
    .padding({ top: 10, left: 3, right: 3 })
  }
}