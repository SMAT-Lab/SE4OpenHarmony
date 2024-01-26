interface TestCustomSteps_Params {
    steps?: string[];
    stepsVerticalStatus?: string[];
    stepsVerticalTime?: string[];
    currentStep?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestCustomSteps_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CustomSteps, CustomSteps_vertical } from "easyui";
class TestCustomSteps extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.steps = ["买家下单", "商家接单", "买家提货", "交易完成"] //传入流程即可
        ;
        this.stepsVerticalStatus = ["【城市】物流状态1", "【城市】物流状态2", "快件已发货", "快件已下单"];
        this.stepsVerticalTime = ["2016-07-12 12:40", "2016-07-11 10:00", "2016-07-10 09:30", "2016-07-9 09:30"];
        this.__currentStep = new ObservedPropertySimple(0 //当前的步骤
        , this, "currentStep");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestCustomSteps_Params) {
        if (params.steps !== undefined) {
            this.steps = params.steps;
        }
        if (params.stepsVerticalStatus !== undefined) {
            this.stepsVerticalStatus = params.stepsVerticalStatus;
        }
        if (params.stepsVerticalTime !== undefined) {
            this.stepsVerticalTime = params.stepsVerticalTime;
        }
        if (params.currentStep !== undefined) {
            this.currentStep = params.currentStep;
        }
    }
    aboutToBeDeleted() {
        this.__currentStep.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private steps: string[]; //传入流程即可
    private stepsVerticalStatus: string[];
    private stepsVerticalTime: string[];
    private __currentStep: ObservedPropertySimple<number>; //当前的步骤
    get currentStep() {
        return this.__currentStep.get();
    }
    set currentStep(newValue: number) {
        this.__currentStep.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffe7e7e7");
        Column.width("100%");
        Column.height("100%");
        Text.create("基础用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 20, top: 20, bottom: 20 });
        Text.fontSize(20);
        Text.fontColor("#ff797979");
        Text.pop();
        Button.createWithLabel("下一步");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.fontColor("#ff000000");
        Button.margin(20);
        Button.alignSelf(ItemAlign.Start);
        Button.onClick(() => {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep += 1;
            }
            else {
                this.currentStep = 0;
            }
        });
        Button.pop();
        Text.create("自定义样式");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 20, top: 20, bottom: 20 });
        Text.fontSize(20);
        Text.fontColor("#ff797979");
        Text.pop();
        Text.create("竖向步骤条");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ left: 20, top: 40, bottom: 20 });
        Text.fontSize(20);
        Text.fontColor("#ff797979");
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestCustomSteps("1", undefined, {}));
