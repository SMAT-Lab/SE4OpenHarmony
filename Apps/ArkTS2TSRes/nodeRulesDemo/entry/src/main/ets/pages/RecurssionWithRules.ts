interface RecurssionWithRules_Params {
    message?: string;
    setValue?: string;
    resultStr?: string;
    arrayStr?: Array<string>;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RecurssionWithRules_" + ++__generate__Id;
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
import Prompt from '@system.prompt';
class RecurssionWithRules extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__setValue = new ObservedPropertySimple("", this, "setValue");
        this.__resultStr = new ObservedPropertySimple("", this, "resultStr");
        this.__arrayStr = new ObservedPropertyObject([], this, "arrayStr");
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RecurssionWithRules_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.setValue !== undefined) {
            this.setValue = params.setValue;
        }
        if (params.resultStr !== undefined) {
            this.resultStr = params.resultStr;
        }
        if (params.arrayStr !== undefined) {
            this.arrayStr = params.arrayStr;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__setValue.aboutToBeDeleted();
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
    private __arrayStr: ObservedPropertyObject<Array<string>>;
    get arrayStr() {
        return this.__arrayStr.get();
    }
    set arrayStr(newValue: Array<string>) {
        this.__arrayStr.set(newValue);
    }
    private controller: TextAreaController;
    ruleEngineExecute(): void {
        let value: number = Number(this.setValue);
        if (this.setValue === '' || Number.isNaN(value) || value >= 10 || value < 0) {
            Prompt.showToast({
                message: '请输入10以内的整数值'
            });
            return;
        }
        let ruleEngine: RuleEngine = new RuleEngine();
        let that = this;
        class Rule {
            condition(R: any) {
                R.when((this as any).someval < 10);
            }
            consequence(R: any) {
                (this as any).someval = ++(this as any).someval;
                console.log((this as any).someval + ": incrementing again till 10");
                that.arrayStr.push((this as any).someval + " ：incrementing again till 10");
                console.log(that.resultStr);
                R.restart();
            }
        }
        let rule: Rule = new Rule();
        ruleEngine.register(rule);
        let fact: any = {
            someval: Number.parseInt(this.setValue)
        };
        console.log("-------" + this.setValue);
        ruleEngine.execute(fact, (data: any) => {
            that.resultStr = "Finished with value:" + data.someval;
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ top: 10, left: 3, right: 3 });
        Text.create("测试10以内执行次数循环，测试restart接口等");
        Text.width("90%");
        Text.height(50);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.pop();
        TextArea.create({ placeholder: "10以内数值：", controller: this.controller });
        TextArea.height(50);
        TextArea.width("100%");
        TextArea.margin({ top: 5, bottom: 5, left: 5, right: 5 });
        TextArea.onChange((value: string) => {
            this.setValue = value;
            this.arrayStr = [];
        });
        Button.createWithLabel("点击查看是否满足规则");
        Button.onClick(() => {
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
loadDocument(new RecurssionWithRules("1", undefined, {}));
