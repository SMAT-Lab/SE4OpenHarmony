interface MoreRulesAndFacts_Params {
    message?: string;
    resultStr?: string;
    controller?: TextAreaController;
    arrayStr?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MoreRulesAndFacts_" + ++__generate__Id;
}
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
class MoreRulesAndFacts extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__resultStr = new ObservedPropertySimple("", this, "resultStr");
        this.controller = new TextAreaController();
        this.__arrayStr = new ObservedPropertyObject([], this, "arrayStr");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MoreRulesAndFacts_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.resultStr !== undefined) {
            this.resultStr = params.resultStr;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.arrayStr !== undefined) {
            this.arrayStr = params.arrayStr;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__resultStr.aboutToBeDeleted();
        this.__arrayStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __resultStr: ObservedPropertySimple<string>;
    get resultStr() {
        return this.__resultStr.get();
    }
    set resultStr(newValue: string) {
        this.__resultStr.set(newValue);
    }
    private controller: TextAreaController;
    private __arrayStr: ObservedPropertyObject<Array<string>>;
    get arrayStr() {
        return this.__arrayStr.get();
    }
    set arrayStr(newValue: Array<string>) {
        this.__arrayStr.set(newValue);
    }
    ruleEngineExecute(): void {
        let ruleEngine: any = new RuleEngine();
        abstract class Rule {
            abstract condition(R: any);
            abstract consequence(R: any);
        }
        class Rule1 extends Rule {
            name: string = "transaction minimum 500";
            priority: number = 3;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).transactionTotal < 500);
            }
            consequence(R: any) {
                console.log("Rule 1 matched - blocks transactions below value 500. Rejecting payment.");
                (this as any).result = false;
                R.stop();
            }
        }
        class Rule2 extends Rule {
            name: string = "high credibility customer - avoid checks and bypass";
            priority: number = 2;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).userCredibility && (this as any).userCredibility > 5);
            }
            consequence(R: any) {
                console.log("Rule 2 matched - user credibility is more, then avoid further check. Accepting payment.");
                (this as any).result = true;
                R.stop();
            }
        }
        class Rule3 extends Rule {
            name: string = "block AME > 10000";
            priority: number = 4;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).cardType == "Credit Card" && (this as any).cardIssuer == "American Express" && (this as any).transactionTotal > 1000);
            }
            consequence(R: any) {
                console.log("Rule 3 matched - filter American Express payment above 10000. Rejecting payment.");
                (this as any).result = false;
                R.stop();
            }
        }
        class Rule4 extends Rule {
            name: string = "block Cashcard Payment";
            priority: number = 8;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).cardType == "Cash Card");
            }
            consequence(R: any) {
                console.log("Rule 4 matched - reject the payment if cash card. Rejecting payment.");
                (this as any).result = false;
                R.stop();
            }
        }
        class Rule5 extends Rule {
            name: string = "block guest payment above 10000";
            priority: number = 6;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).customerType && (this as any).transactionTotal > 10000 && (this as any).customerType == "guest");
            }
            consequence(R: any) {
                console.log("Rule 5 matched - reject if above 10000 and customer type is guest. Rejecting payment.");
                (this as any).result = false;
                R.stop();
            }
        }
        class Rule6 extends Rule {
            name: string = "is customer guest?";
            priority: number = 7;
            on: boolean = true;
            condition(R: any) {
                R.when(!(this as any).userLoggedIn);
            }
            consequence(R: any) {
                console.log("Rule 6 matched - support rule written for blocking payment above 10000 from guests.");
                console.log("Process left to chain with rule 5.");
                (this as any).customerType = "guest";
                R.stop(); // this fact has been altered, so all rules will run again. No need to restart.
            }
        }
        class Rule7 extends Rule {
            name: string = "block payment from specific app";
            priority: number = 5;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).appCode && (this as any).appCode === "MOBI4");
            }
            consequence(R: any) {
                console.log("Rule 7 matched - block payment from Mobile. Reject Payment");
                (this as any).result = false;
                R.stop();
            }
        }
        class Rule8 extends Rule {
            name: string = "event risk score";
            priority: number = 2;
            on: boolean = true;
            condition(R: any) {
                R.when((this as any).eventRiskFactor && (this as any).eventRiskFactor < 5);
            }
            consequence(R: any) {
                console.log("Rule 8 matched - the event is not critical, so accept.");
                (this as any).result = true;
                R.stop();
            }
        }
        class Rule9 extends Rule {
            name: string = "block ip range set";
            priority: number = 3;
            on: boolean = true;
            condition(R: any) {
                let ipList = ["10.X.X.X", "12.122.X.X", "12.211.X.X", "64.X.X.X", "64.23.X.X", "74.23.211.92"];
                let allowedRegexp = new RegExp("^(?:" + ipList.join("|")
                    .replace(new RegExp('\\.', 'g'), "\\.")
                    .replace(new RegExp('X', 'g'), "[^.]+") + ")$");
                R.when((this as any).userIP && (this as any).userIP.match(allowedRegexp));
            }
            consequence(R: any) {
                console.log("Rule 9 matched - ip falls in the given List, then block. Rejecting payment.");
                (this as any).result = false;
                R.stop();
            }
        }
        class Rule10 extends Rule {
            name: string = "check if user's name is blacklisted";
            priority: number = 1;
            on: boolean = true;
            condition(R: any) {
                let blacklist = ["user4"];
                R.when(this && blacklist.indexOf(this.name) > -1);
            }
            consequence(R: any) {
                console.log("Rule 10 matched - the user is malicious, then block. Rejecting payment.");
                (this as any).result = false;
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
        ];
        ruleEngine.register(rules);
        /** example of cash card user, so payment blocked. ****/
        let user1: any = {
            userIP: "10.3.4.5",
            name: "user1",
            eventRiskFactor: 6,
            userCredibility: 1,
            appCode: "WEB1",
            userLoggedIn: false,
            transactionTotal: 12000,
            cardType: "Cash Card",
            cardIssuer: "OXI"
        };
        let user2: any = {
            userIP: "27.3.4.5",
            name: "user2",
            eventRiskFactor: 2,
            userCredibility: 2,
            appCode: "MOBI4",
            userLoggedIn: true,
            transactionTotal: 500,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        let user3: any = {
            userIP: "27.3.4.5",
            name: "user3",
            eventRiskFactor: 2,
            userCredibility: 2,
            appCode: "WEB1",
            userLoggedIn: true,
            transactionTotal: 500,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        let user4: any = {
            userIP: "27.3.4.5",
            name: "user4",
            eventRiskFactor: 8,
            userCredibility: 2,
            appCode: "WEB1",
            userLoggedIn: true,
            transactionTotal: 500,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        let user5: any = {
            userIP: "27.3.4.5",
            name: "user5",
            eventRiskFactor: 8,
            userCredibility: 8,
            appCode: "WEB1",
            userLoggedIn: true,
            transactionTotal: 500,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        let user6: any = {
            userIP: "10.3.4.5",
            name: "user6",
            eventRiskFactor: 8,
            userCredibility: 2,
            appCode: "WEB1",
            userLoggedIn: true,
            transactionTotal: 500,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        let user7: any = {
            userIP: "27.3.4.5",
            name: "user7",
            eventRiskFactor: 2,
            userCredibility: 2,
            appCode: "WEB1",
            userLoggedIn: false,
            transactionTotal: 100000,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        let user8: any = {
            userIP: "27.3.4.5",
            name: "user8",
            eventRiskFactor: 8,
            userCredibility: 2,
            appCode: "WEB1",
            userLoggedIn: true,
            transactionTotal: 500,
            cardType: "Credit Card",
            cardIssuer: "VISA"
        };
        console.log("-----------");
        console.log("start execution of rules");
        this.arrayStr.push("start execution of rules");
        console.log("-----------");
        ruleEngine.execute(user7, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User7 Accepted");
                this.arrayStr.push("Completed " + "User7 Accepted");
            }
            else {
                console.log("Completed " + "User7 Rejected");
                this.arrayStr.push("Completed " + "User7 Rejected");
            }
        });
        ruleEngine.execute(user1, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User1 Accepted");
                this.arrayStr.push("Completed " + "User1 Accepted");
            }
            else {
                console.log("Completed " + "User1 Rejected");
                this.arrayStr.push("Completed " + "User1 Rejected");
            }
        });
        ruleEngine.execute(user2, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User2 Accepted");
                this.arrayStr.push("Completed " + "User2 Accepted");
            }
            else {
                console.log("Completed " + "User2 Rejected");
                this.arrayStr.push("Completed " + "User2 Rejected");
            }
        });
        ruleEngine.execute(user3, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User3 Accepted");
                this.arrayStr.push("Completed " + "User3 Accepted");
            }
            else {
                console.log("Completed " + "User3 Rejected");
                this.arrayStr.push("Completed " + "User3 Rejected");
            }
        });
        ruleEngine.execute(user4, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User4 Accepted");
                this.arrayStr.push("Completed " + "User4 Accepted");
            }
            else {
                console.log("Completed " + "User4 Rejected");
                this.arrayStr.push("Completed " + "User4 Rejected");
            }
        });
        ruleEngine.execute(user5, (result: any) => {
            if (result.result) {
                console.log("Completed " + " User5 Accepted");
                this.arrayStr.push("Completed " + "User5 Accepted");
            }
            else {
                console.log("Completed " + "User5 Rejected");
                this.arrayStr.push("Completed " + "User5 Rejected");
            }
        });
        ruleEngine.execute(user6, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User6 Accepted");
                this.arrayStr.push("Completed " + "User6 Accepted");
            }
            else {
                console.log("Completed " + "User6 Rejected");
                this.arrayStr.push("Completed " + "User6 Rejected");
            }
        });
        ruleEngine.execute(user8, (result: any) => {
            if (result.result) {
                console.log("Completed " + "User8 Accepted");
                this.arrayStr.push("Completed " + "User8 Accepted");
            }
            else {
                console.log("Completed " + "User8 Rejected");
                this.arrayStr.push("Completed " + "User8 Rejected");
            }
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ top: 10, left: 3, right: 3 });
        Text.create("测试多种规则混合");
        Text.width("90%");
        Text.height(50);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.pop();
        Button.createWithLabel("点击运行");
        Button.onClick(() => {
            this.arrayStr = [];
            this.ruleEngineExecute();
        });
        Button.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arrayStr), (item: string, index: number) => {
            Text.create("测试结果：" + item);
            Text.width("90%");
            Text.height(30);
            Text.borderRadius(15);
            Text.fontSize(13);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 5 });
            Text.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
loadDocument(new MoreRulesAndFacts("1", undefined, {}));
