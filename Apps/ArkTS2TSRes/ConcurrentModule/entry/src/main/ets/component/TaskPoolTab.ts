interface TaskPoolTab_Params {
    taskPoolOutPutStr?: string;
    taskPoolInPutStr?: string;
    taskPoolInPutArr?: string[];
    gStack?: stack<taskpool.Task>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TaskPoolTab_" + ++__generate__Id;
}
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
export class TaskPoolTab extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__taskPoolOutPutStr = new ObservedPropertySimple('', this, "taskPoolOutPutStr");
        this.__taskPoolInPutStr = new ObservedPropertySimple('', this, "taskPoolInPutStr");
        this.taskPoolInPutArr = [];
        this.gStack = new stack();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TaskPoolTab_Params) {
        if (params.taskPoolOutPutStr !== undefined) {
            this.taskPoolOutPutStr = params.taskPoolOutPutStr;
        }
        if (params.taskPoolInPutStr !== undefined) {
            this.taskPoolInPutStr = params.taskPoolInPutStr;
        }
        if (params.taskPoolInPutArr !== undefined) {
            this.taskPoolInPutArr = params.taskPoolInPutArr;
        }
        if (params.gStack !== undefined) {
            this.gStack = params.gStack;
        }
    }
    aboutToBeDeleted() {
        this.__taskPoolOutPutStr.aboutToBeDeleted();
        this.__taskPoolInPutStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __taskPoolOutPutStr: ObservedPropertySimple<string>;
    get taskPoolOutPutStr() {
        return this.__taskPoolOutPutStr.get();
    }
    set taskPoolOutPutStr(newValue: string) {
        this.__taskPoolOutPutStr.set(newValue);
    }
    private __taskPoolInPutStr: ObservedPropertySimple<string>;
    get taskPoolInPutStr() {
        return this.__taskPoolInPutStr.get();
    }
    set taskPoolInPutStr(newValue: string) {
        this.__taskPoolInPutStr.set(newValue);
    }
    private taskPoolInPutArr: string[];
    private gStack: stack<taskpool.Task>;
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.justifyContent(FlexAlign.Center);
        Text.create($r('app.string.Text_desc'));
        Text.width("100%");
        Text.height("48vp");
        Text.position({ x: "7%", y: "0" });
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#182431");
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        TextArea.create({ text: this.taskPoolInPutStr });
        TextArea.id("taskPoolInPutTextArea");
        TextArea.width("93.3%");
        TextArea.height("139vp");
        TextArea.position({ x: "3.3%", y: "48vp" });
        TextArea.textAlign(TextAlign.Start);
        TextArea.borderRadius("24vp");
        TextArea.backgroundColor("#ffffff");
        TextArea.fontFamily("HarmonyHeiTi");
        TextArea.fontSize("16fp");
        TextArea.fontColor("#182431");
        TextArea.fontWeight(400);
        TextArea.padding({ top: "8vp", left: "16vp", right: "16vp", bottom: "21vp" });
        TextArea.onChange((value: string) => {
            this.taskPoolInPutStr = value;
            this.taskPoolInPutArr = this.taskPoolInPutStr.trim().split(',');
            this.taskPoolOutPutStr = '';
        });
        Text.create($r('app.string.Result_desc'));
        Text.width("100%");
        Text.height("48");
        Text.position({ x: "7%", y: "187vp" });
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#182431");
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        Scroll.create();
        Scroll.id("taskPoolOutPutScroll");
        Scroll.width("93.3%");
        Scroll.height("139vp");
        Scroll.position({ x: "3.3%", y: "235vp" });
        Scroll.borderRadius("24vp");
        Scroll.backgroundColor("#ffffff");
        Scroll.align(Alignment.TopStart);
        Text.create(this.taskPoolOutPutStr);
        Text.id("taskPoolOutPutText");
        Text.fontFamily("HarmonyHeiTi");
        Text.fontSize("16fp");
        Text.fontColor("#182431");
        Text.fontWeight(400);
        Text.padding({ top: "8vp", left: "16vp", right: "16vp", bottom: "21vp" });
        Text.pop();
        Scroll.pop();
        GridRow.create({ columns: 4,
            gutter: { x: 12, y: 12 },
            breakpoints: { value: ["360vp", "480vp"] },
            direction: GridRowDirection.Row });
        GridRow.width("100%");
        GridRow.height("168vp");
        GridRow.position({ x: "0", y: "451vp" });
        GridRow.padding({ left: "25vp", right: "25vp" });
        GridCol.create({ span: 2, offset: 0 });
        Button.createWithChild();
        Button.id("exeDelayButton");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("rgba(24,36,49,0.05)");
        Button.onClick(() => {
            this.executeDelay();
        });
        Text.create($r('app.string.Execute_After_3s_desc'));
        Text.width("100%");
        Text.height("22");
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#007DFF");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        Button.pop();
        GridCol.pop();
        GridCol.create({ span: 2, offset: 0 });
        Button.createWithChild();
        Button.id("exeImmButton");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("#007DFF");
        Button.onClick(() => {
            this.executeImmediately();
        });
        Text.create($r('app.string.Execute_Immediately_desc'));
        Text.width("100%");
        Text.height("22");
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#FFFFFF");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        Button.pop();
        GridCol.pop();
        GridCol.create({ span: 2, offset: 0 });
        Button.createWithChild();
        Button.id("exeFunctionButton");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("rgba(24,36,49,0.05)");
        Button.onClick(() => {
            this.executeFunc();
        });
        Text.create($r('app.string.Function_Task_desc'));
        Text.width("100%");
        Text.height("22");
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#007DFF");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        Button.pop();
        GridCol.pop();
        GridCol.create({ span: 2, offset: 0 });
        Button.createWithChild();
        Button.id("exeCancelButton");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("#007DFF");
        Button.onClick(() => {
            this.cancelTask();
        });
        Text.create($r('app.string.Cancel_Task_desc'));
        Text.width("100%");
        Text.height("22");
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#FFFFFF");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        Button.pop();
        GridCol.pop();
        GridCol.create({ span: 4, offset: 0 });
        Button.createWithChild();
        Button.id("taskPoolClearButton");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("rgba(24,36,49,0.05)");
        Button.onClick(() => {
            this.taskPoolInPutStr = '';
            this.taskPoolInPutArr = this.taskPoolInPutStr.trim().split(',');
            this.taskPoolOutPutStr = '';
        });
        Text.create($r('app.string.Clear_desc'));
        Text.width("100%");
        Text.height("22");
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#007DFF");
        Text.textAlign(TextAlign.Center);
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        Button.pop();
        GridCol.pop();
        GridRow.pop();
        Column.pop();
    }
    async executeImmediately() {
        if (!this.taskPoolInPutStr.length) {
            this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        let task = new taskpool.Task(strSort, this.taskPoolInPutArr);
        this.gStack.push(task);
        await taskpool.execute(task).then((result: string[]) => {
            this.taskPoolOutPutStr += "Task executed successfully: " + result.toString() + "\n";
        }).catch((e: Error) => {
            this.taskPoolOutPutStr += "Task executed failed: " + e.toString() + "\n";
        });
        this.gStack.pop();
    }
    async executeDelay() {
        if (!this.taskPoolInPutStr.length) {
            this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        let task = new taskpool.Task(strSortDelay, this.taskPoolInPutArr);
        this.gStack.push(task);
        await taskpool.execute(task).then((result: string[]) => {
            this.taskPoolOutPutStr += "Task executed successfully: " + result.toString() + "\n";
        }).catch((e: Error) => {
            this.taskPoolOutPutStr += "Task executed failed: " + this.taskPoolInPutStr + "\n";
        });
        this.gStack.pop();
    }
    async executeFunc() {
        if (!this.taskPoolInPutStr.length) {
            this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        await taskpool.execute(strSort, this.taskPoolInPutArr).then((result: string[]) => {
            this.taskPoolOutPutStr += "Task executed successfully: " + result.toString() + "\n";
        }).catch((e: Error) => {
            this.taskPoolOutPutStr += "Task executed failed: " + e.toString() + "\n";
        });
    }
    async cancelTask() {
        if (this.gStack.isEmpty()) {
            this.taskPoolOutPutStr += "The current task queue has no cancellable tasks." + "\n";
        }
        else {
            let task: taskpool.Task = this.gStack.peek();
            try {
                taskpool.cancel(task);
                this.taskPoolOutPutStr += "Task canceled successfully." + "\n";
                this.gStack.pop();
            }
            catch (e) {
                this.taskPoolOutPutStr += "Task canceled failed: " + (e as Error).message + "\n";
            }
        }
    }
}
function strSort(inPutArr: string[]): string[] {
    "use concurrent";
    let newArr = inPutArr.sort();
    return newArr;
}
function strSortDelay(inPutArr: string[]): string[] {
    "use concurrent";
    let start = new Date().getTime();
    while (new Date().getTime() - start < 3000) {
        continue;
    }
    let newArr = inPutArr.sort();
    return newArr;
}
