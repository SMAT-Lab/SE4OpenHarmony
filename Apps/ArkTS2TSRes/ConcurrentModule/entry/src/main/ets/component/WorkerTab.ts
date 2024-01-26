interface WorkerTab_Params {
    jsWorkerOutPutStr?: string;
    jsWorkerInPutStr?: string;
    jsWorkerInPutArr?: string[];
    isDone?: boolean;
    myWorker?: worker.ThreadWorker;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WorkerTab_" + ++__generate__Id;
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
import worker from '@ohos.worker';
export class WorkerTab extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__jsWorkerOutPutStr = new ObservedPropertySimple('', this, "jsWorkerOutPutStr");
        this.__jsWorkerInPutStr = new ObservedPropertySimple('', this, "jsWorkerInPutStr");
        this.jsWorkerInPutArr = [];
        this.isDone = false;
        this.myWorker = new worker.ThreadWorker("entry/ets/workers/Worker.ts");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WorkerTab_Params) {
        if (params.jsWorkerOutPutStr !== undefined) {
            this.jsWorkerOutPutStr = params.jsWorkerOutPutStr;
        }
        if (params.jsWorkerInPutStr !== undefined) {
            this.jsWorkerInPutStr = params.jsWorkerInPutStr;
        }
        if (params.jsWorkerInPutArr !== undefined) {
            this.jsWorkerInPutArr = params.jsWorkerInPutArr;
        }
        if (params.isDone !== undefined) {
            this.isDone = params.isDone;
        }
        if (params.myWorker !== undefined) {
            this.myWorker = params.myWorker;
        }
    }
    aboutToBeDeleted() {
        this.__jsWorkerOutPutStr.aboutToBeDeleted();
        this.__jsWorkerInPutStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __jsWorkerOutPutStr: ObservedPropertySimple<string>;
    get jsWorkerOutPutStr() {
        return this.__jsWorkerOutPutStr.get();
    }
    set jsWorkerOutPutStr(newValue: string) {
        this.__jsWorkerOutPutStr.set(newValue);
    }
    private __jsWorkerInPutStr: ObservedPropertySimple<string>;
    get jsWorkerInPutStr() {
        return this.__jsWorkerInPutStr.get();
    }
    set jsWorkerInPutStr(newValue: string) {
        this.__jsWorkerInPutStr.set(newValue);
    }
    private jsWorkerInPutArr: string[];
    private isDone: boolean;
    private myWorker: worker.ThreadWorker;
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.justifyContent(FlexAlign.Center);
        Text.create($r('app.string.Text_desc'));
        Text.width("100%");
        Text.height("48vp");
        Text.position({ x: "7%", y: "0vp" });
        Text.fontFamily("HarmonyHeiTi-Medium");
        Text.fontSize("16fp");
        Text.fontColor("#182431");
        Text.lineHeight(22);
        Text.fontWeight(500);
        Text.pop();
        TextArea.create({ text: this.jsWorkerInPutStr });
        TextArea.id("jsWorkerInPutTextArea");
        TextArea.width("93.3%");
        TextArea.height("139vp");
        TextArea.position({ x: "3.3%", y: "48vp" });
        TextArea.textAlign(TextAlign.Start);
        TextArea.fontFamily("HarmonyHeiTi");
        TextArea.fontSize("16fp");
        TextArea.fontColor("#182431");
        TextArea.fontWeight(400);
        TextArea.padding({ top: "8vp", left: "16vp", right: "16vp", bottom: "21vp" });
        TextArea.borderRadius("24vp");
        TextArea.backgroundColor("#ffffff");
        TextArea.onChange((value: string) => {
            this.jsWorkerInPutStr = value;
            this.jsWorkerInPutArr = value.trim().split(',');
            this.jsWorkerOutPutStr = '';
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
        Scroll.id("jsWorkerOutPutScroll");
        Scroll.width("93.3%");
        Scroll.height("139vp");
        Scroll.position({ x: "3.3%", y: "235vp" });
        Scroll.borderRadius("24vp");
        Scroll.backgroundColor("#ffffff");
        Scroll.align(Alignment.TopStart);
        Text.create(this.jsWorkerOutPutStr);
        Text.id("jsWorkerOutPutText");
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
        GridRow.height("40vp");
        GridRow.position({ x: "0", y: "555vp" });
        GridRow.padding({ left: "24vp", right: "24vp" });
        GridCol.create({ span: 2, offset: 0 });
        Button.createWithChild();
        Button.id("workerClearButton");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("rgba(24,36,49,0.05)");
        Button.onClick(() => {
            this.jsWorkerInPutStr = '';
            this.jsWorkerOutPutStr = '';
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
        GridCol.create({ span: 2, offset: 0 });
        Button.createWithChild();
        Button.id("workerStrSort");
        Button.height("40vp");
        Button.borderRadius("20vp");
        Button.backgroundColor("#007DFF");
        Button.onClick(() => {
            this.executeWorkerFunc(this.jsWorkerInPutArr);
        });
        Text.create($r('app.string.SortString_desc'));
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
        GridRow.pop();
        Column.pop();
    }
    async executeWorkerFunc(inPutArr: string[]) {
        if (!this.jsWorkerInPutStr.length) {
            this.jsWorkerOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        this.myWorker.postMessage(inPutArr);
        let strFlag = false;
        let outPutStr = '';
        this.myWorker.onmessage = (e) => {
            outPutStr = e.data.toString();
            strFlag = true;
        };
        while (!strFlag) {
            await promiseCase();
        }
        this.jsWorkerOutPutStr = outPutStr;
    }
}
function promiseCase(): Promise<Object> {
    let p: Promise<number> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 100);
    });
    return p;
}
