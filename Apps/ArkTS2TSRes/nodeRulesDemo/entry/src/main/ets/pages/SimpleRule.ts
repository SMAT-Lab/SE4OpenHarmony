interface SimpleRule_Params {
    message?: string;
    setValue?: string;
    resultStr?: string;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleRule_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import Prompt from '@system.prompt';
class SimpleRule extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__setValue = new ObservedPropertySimple("", this, "setValue");
        this.__resultStr = new ObservedPropertySimple("", this, "resultStr");
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SimpleRule_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.setValue !== undefined) {
            this.setValue = params.setValue;
        }
        if (params.resultStr !== undefined) {
            this.resultStr = params.resultStr;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__setValue.aboutToBeDeleted();
        this.__resultStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __setValue: ObservedPropertySimple<string>;
    get setValue() {
        return this.__setValue.get();
    }
    set setValue(newValue: string) {
        this.__setValue.set(newValue);
    }
    private __resultStr: ObservedPropertySimple<string>;
    get resultStr() {
        return this.__resultStr.get();
    }
    set resultStr(newValue: string) {
        this.__resultStr.set(newValue);
    }
    private controller: TextAreaController;
    ruleEngineExecute(): void {
        if (this.setValue === '' || Number.isNaN(Number(this.setValue))) {
            Prompt.showToast({
                message: '请输入整数值'
            });
            return;
        }
        let ruleEngine: any = new RuleEngine();
        class Rule {
            condition(ruleEngine: any) {
                ruleEngine.when((this as any).transactionTotal < 500);
            }
            consequence(ruleEngine: any) {
                (this as any).result = false;
                (this as any).reason = "The transaction was blocked as it was less than 500";
                ruleEngine.stop();
            }
        }
        let rule = new Rule();
        ruleEngine.register(rule);
        let fact: any = {
            name: "user4",
            application: "MOB2",
            transactionTotal: Number.parseInt(this.setValue),
            cardType: "Credit Card"
        };
        console.log("------" + this.setValue);
        ruleEngine.execute(fact, (data: any) => {
            if (data.result) {
                console.log("Valid transaction:" + data.result); //满足规则
                this.resultStr = "Valid transaction:" + data.result;
            }
            else {
                console.log("Blocked Reason:" + data["reason"]); //不满足规则
                this.resultStr = "Blocked Reason:" + data["reason"];
            }
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ top: 10, left: 3, right: 3 });
        Text.create("目前transactionTotal规则阻止值是小于：500");
        Text.width("90%");
        Text.height(50);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.pop();
        TextArea.create({ placeholder: "任意整数值：", controller: this.controller });
        TextArea.height(50);
        TextArea.width("100%");
        TextArea.margin({ top: 5, bottom: 5, left: 5, right: 5 });
        TextArea.onChange((value: string) => {
            this.setValue = value;
        });
        Button.createWithLabel("点击查看是否满足规则");
        Button.onClick(() => {
            this.ruleEngineExecute();
        });
        Button.pop();
        Text.create("测试结果：" + this.resultStr);
        Text.width("90%");
        Text.height(50);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new SimpleRule("1", undefined, {}));