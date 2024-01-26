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

@Entry
@Component
struct MoreRulesAndFacts {
  @State message: string = 'Hello World'
  @State resultStr: string = "";
  controller: TextAreaController = new TextAreaController();
  @State arrayStr: Array<string> = [];

  ruleEngineExecute(): void {
    let ruleEngine: ESObject = new RuleEngine();

    abstract class Rule {
      abstract condition(R: ESObject)

      abstract consequence(R: ESObject)
    }

    class Rule1 extends Rule {
      name: string = "transaction minimum 500"
      priority: number = 3
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).transactionTotal < 500);
      }

      consequence(R: ESObject) {
        console.log("Rule 1 matched - blocks transactions below value 500. Rejecting payment.");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    class Rule2 extends Rule {
      name: string = "high credibility customer - avoid checks and bypass"
      priority: number = 2
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).userCredibility && (this as ESObject).userCredibility > 5);
      }

      consequence(R: ESObject) {
        console.log("Rule 2 matched - user credibility is more, then avoid further check. Accepting payment.");
        (this as ESObject).result = true;
        R.stop();
      }
    }

    class Rule3 extends Rule {
      name: string = "block AME > 10000"
      priority: number = 4
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).cardType == "Credit Card" && (this as ESObject).cardIssuer == "American Express" && (this as ESObject).transactionTotal > 1000);
      }

      consequence(R: ESObject) {
        console.log("Rule 3 matched - filter American Express payment above 10000. Rejecting payment.");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    class Rule4 extends Rule {
      name: string = "block Cashcard Payment"
      priority: number = 8
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).cardType == "Cash Card");
      }

      consequence(R: ESObject) {
        console.log("Rule 4 matched - reject the payment if cash card. Rejecting payment.");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    class Rule5 extends Rule {
      name: string = "block guest payment above 10000"
      priority: number = 6
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).customerType && (this as ESObject).transactionTotal > 10000 && (this as ESObject).customerType == "guest");
      }

      consequence(R: ESObject) {
        console.log("Rule 5 matched - reject if above 10000 and customer type is guest. Rejecting payment.");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    class Rule6 extends Rule {
      name: string = "is customer guest?"
      priority: number = 7
      on: boolean = true

      condition(R: ESObject) {
        R.when(!(this as ESObject).userLoggedIn);
      }

      consequence(R: ESObject) {
        console.log("Rule 6 matched - support rule written for blocking payment above 10000 from guests.");
        console.log("Process left to chain with rule 5.");
        (this as ESObject).customerType = "guest";
        R.stop(); // this fact has been altered, so all rules will run again. No need to restart.
      }
    }

    class Rule7 extends Rule {
      name: string = "block payment from specific app"
      priority: number = 5
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).appCode && (this as ESObject).appCode === "MOBI4");
      }

      consequence(R: ESObject) {
        console.log("Rule 7 matched - block payment from Mobile. Reject Payment");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    class Rule8 extends Rule {
      name: string = "event risk score"
      priority: number = 2
      on: boolean = true

      condition(R: ESObject) {
        R.when((this as ESObject).eventRiskFactor && (this as ESObject).eventRiskFactor < 5);
      }

      consequence(R: ESObject) {
        console.log("Rule 8 matched - the event is not critical, so accept.");
        (this as ESObject).result = true;
        R.stop();
      }
    }

    class Rule9 extends Rule {
      name: string = "block ip range set"
      priority: number = 3
      on: boolean = true

      condition(R: ESObject) {
        let ipList = ["10.X.X.X", "12.122.X.X", "12.211.X.X", "64.X.X.X", "64.23.X.X", "74.23.211.92"]
        let allowedRegexp = new RegExp("^(?:" + ipList.join("|")
          .replace(new RegExp('\\.', 'g'), "\\.")
          .replace(new RegExp('X', 'g'), "[^.]+") + ")$");
        R.when((this as ESObject).userIP && (this as ESObject).userIP.match(allowedRegexp));
      }

      consequence(R: ESObject) {
        console.log("Rule 9 matched - ip falls in the given List, then block. Rejecting payment.");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    class Rule10 extends Rule {
      name: string = "check if user's name is blacklisted"
      priority: number = 1
      on: boolean = true

      condition(R: ESObject) {
        let blacklist = ["user4"]
        R.when(this && blacklist.indexOf(this.name) > -1);
      }

      consequence(R: ESObject) {
        console.log("Rule 10 matched - the user is malicious, then block. Rejecting payment.");
        (this as ESObject).result = false;
        R.stop();
      }
    }

    let rules: Rule[] = [
    /**** Rule 1 ****/
      new Rule1(),

      /**** Rule 2 ****/
      new Rule2(),

      /**** Rule 3 ****/
      new Rule3(),

      /**** Rule 4 ****/
      new Rule4(),

      /**** Rule 5 ****/
      new Rule5(),

      /**** Rule 6 ****/
      new Rule6(),

      /**** Rule 7 ****/
      new Rule7(),

      /**** Rule 8 ****/
      new Rule8(),

      /**** Rule 9 ****/
      new Rule9(),

      /**** Rule 10 ****/
      new Rule10(),


    ]

    ruleEngine.register(rules);

    /** example of cash card user, so payment blocked. ****/
    let user1: ESObject = {
      userIP: "10.3.4.5",
      name: "user1",
      eventRiskFactor: 6,
      userCredibility: 1,
      appCode: "WEB1",
      userLoggedIn: false,
      transactionTotal: 12000,
      cardType: "Cash Card",
      cardIssuer: "OXI"
    }

    let user2: ESObject = {
      userIP: "27.3.4.5",
      name: "user2",
      eventRiskFactor: 2,
      userCredibility: 2,
      appCode: "MOBI4",
      userLoggedIn: true,
      transactionTotal: 500,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }

    let user3: ESObject = {
      userIP: "27.3.4.5",
      name: "user3",
      eventRiskFactor: 2,
      userCredibility: 2,
      appCode: "WEB1",
      userLoggedIn: true,
      transactionTotal: 500,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }

    let user4: ESObject = {
      userIP: "27.3.4.5",
      name: "user4",
      eventRiskFactor: 8,
      userCredibility: 2,
      appCode: "WEB1",
      userLoggedIn: true,
      transactionTotal: 500,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }

    let user5: ESObject = {
      userIP: "27.3.4.5",
      name: "user5",
      eventRiskFactor: 8,
      userCredibility: 8,
      appCode: "WEB1",
      userLoggedIn: true,
      transactionTotal: 500,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }

    let user6: ESObject = {
      userIP: "10.3.4.5",
      name: "user6",
      eventRiskFactor: 8,
      userCredibility: 2,
      appCode: "WEB1",
      userLoggedIn: true,
      transactionTotal: 500,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }

    let user7: ESObject = {
      userIP: "27.3.4.5",
      name: "user7",
      eventRiskFactor: 2,
      userCredibility: 2,
      appCode: "WEB1",
      userLoggedIn: false,
      transactionTotal: 100000,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }

    let user8: ESObject = {
      userIP: "27.3.4.5",
      name: "user8",
      eventRiskFactor: 8,
      userCredibility: 2,
      appCode: "WEB1",
      userLoggedIn: true,
      transactionTotal: 500,
      cardType: "Credit Card",
      cardIssuer: "VISA"
    }


    console.log("-----------");
    console.log("start execution of rules");
    this.arrayStr.push("start execution of rules")
    console.log("-----------");

    ruleEngine.execute(user7, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User7 Accepted");
        this.arrayStr.push("Completed " + "User7 Accepted");
      } else {
        console.log("Completed " + "User7 Rejected");
        this.arrayStr.push("Completed " + "User7 Rejected");
      }
    })

    ruleEngine.execute(user1, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User1 Accepted");
        this.arrayStr.push("Completed " + "User1 Accepted");
      } else {
        console.log("Completed " + "User1 Rejected");
        this.arrayStr.push("Completed " + "User1 Rejected");
      }
    })

    ruleEngine.execute(user2, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User2 Accepted");
        this.arrayStr.push("Completed " + "User2 Accepted");
      } else {
        console.log("Completed " + "User2 Rejected");
        this.arrayStr.push("Completed " + "User2 Rejected");
      }

    })

    ruleEngine.execute(user3, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User3 Accepted");
        this.arrayStr.push("Completed " + "User3 Accepted");
      } else {
        console.log("Completed " + "User3 Rejected");
        this.arrayStr.push("Completed " + "User3 Rejected");
      }
    })

    ruleEngine.execute(user4, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User4 Accepted");
        this.arrayStr.push("Completed " + "User4 Accepted");
      } else {
        console.log("Completed " + "User4 Rejected");
        this.arrayStr.push("Completed " + "User4 Rejected");
      }

    })

    ruleEngine.execute(user5, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + " User5 Accepted");
        this.arrayStr.push("Completed " + "User5 Accepted");
      } else {
        console.log("Completed " + "User5 Rejected");
        this.arrayStr.push("Completed " + "User5 Rejected");
      }
    })

    ruleEngine.execute(user6, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User6 Accepted");
        this.arrayStr.push("Completed " + "User6 Accepted");
      } else {
        console.log("Completed " + "User6 Rejected");
        this.arrayStr.push("Completed " + "User6 Rejected");
      }

    })

    ruleEngine.execute(user8, (result: ESObject) => {
      if (result.result) {
        console.log("Completed " + "User8 Accepted");
        this.arrayStr.push("Completed " + "User8 Accepted");
      } else {
        console.log("Completed " + "User8 Rejected");
        this.arrayStr.push("Completed " + "User8 Rejected");
      }
    })


  }

  build() {
    Column() {
      Text("测试多种规则混合")
        .width("90%")
        .height(50)
        .borderRadius(15)
        .fontSize(13)
        .textAlign(TextAlign.Center)
        .margin({ top: 10 })

      Button("点击运行")
        .onClick(() => {
          this.arrayStr = [];
          this.ruleEngineExecute();
        })

      ForEach(this.arrayStr, (item: string, index: number) => {
        Text("测试结果：" + item)
          .width("90%")
          .height(30)
          .borderRadius(15)
          .fontSize(13)
          .textAlign(TextAlign.Center)
          .margin({ top: 5 });

      })

    }
    .width('100%')
    .padding({ top: 10, left: 3, right: 3 })
  }
}