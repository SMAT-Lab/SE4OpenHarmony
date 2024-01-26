interface Index_Params {
    strChars?: string;
    strWords?: string;
    canvasContext?: CanvasRenderingContext2D;
    offContext?: OffscreenCanvasRenderingContext2D;
    scroller?: Scroller;
    visible?: Visibility;
    canvasWidth?: number;
    canvasHeight?: number;
    oldStr?: string;
    newStr?: string;
    resultData?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { diffChars, diffWords, diffWordsWithSpace, diffLines, diffTrimmedLines, diffSentences, diffCss, diffJson, diffArrays } from 'diff';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__strChars = new ObservedPropertySimple('文本块比较', this, "strChars");
        this.__strWords = new ObservedPropertySimple('文本块_忽略空格', this, "strWords");
        this.canvasContext = new CanvasRenderingContext2D({ antialias: true });
        this.offContext = new OffscreenCanvasRenderingContext2D(600, 600, {
            antialias: true
        });
        this.scroller = new Scroller();
        this.__visible = new ObservedPropertySimple(Visibility.Visible, this, "visible");
        this.__canvasWidth = new ObservedPropertySimple(0, this, "canvasWidth");
        this.__canvasHeight = new ObservedPropertySimple(0, this, "canvasHeight");
        this.__oldStr = new ObservedPropertySimple("", this, "oldStr");
        this.__newStr = new ObservedPropertySimple("", this, "newStr");
        this.__resultData = new ObservedPropertySimple("", this, "resultData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.strChars !== undefined) {
            this.strChars = params.strChars;
        }
        if (params.strWords !== undefined) {
            this.strWords = params.strWords;
        }
        if (params.canvasContext !== undefined) {
            this.canvasContext = params.canvasContext;
        }
        if (params.offContext !== undefined) {
            this.offContext = params.offContext;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.canvasWidth !== undefined) {
            this.canvasWidth = params.canvasWidth;
        }
        if (params.canvasHeight !== undefined) {
            this.canvasHeight = params.canvasHeight;
        }
        if (params.oldStr !== undefined) {
            this.oldStr = params.oldStr;
        }
        if (params.newStr !== undefined) {
            this.newStr = params.newStr;
        }
        if (params.resultData !== undefined) {
            this.resultData = params.resultData;
        }
    }
    aboutToBeDeleted() {
        this.__strChars.aboutToBeDeleted();
        this.__strWords.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        this.__canvasWidth.aboutToBeDeleted();
        this.__canvasHeight.aboutToBeDeleted();
        this.__oldStr.aboutToBeDeleted();
        this.__newStr.aboutToBeDeleted();
        this.__resultData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __strChars: ObservedPropertySimple<string>;
    get strChars() {
        return this.__strChars.get();
    }
    set strChars(newValue: string) {
        this.__strChars.set(newValue);
    }
    private __strWords: ObservedPropertySimple<string>;
    get strWords() {
        return this.__strWords.get();
    }
    set strWords(newValue: string) {
        this.__strWords.set(newValue);
    }
    private canvasContext: CanvasRenderingContext2D;
    private offContext: OffscreenCanvasRenderingContext2D;
    private scroller: Scroller;
    private __visible: ObservedPropertySimple<Visibility>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: Visibility) {
        this.__visible.set(newValue);
    }
    private __canvasWidth: ObservedPropertySimple<number>;
    get canvasWidth() {
        return this.__canvasWidth.get();
    }
    set canvasWidth(newValue: number) {
        this.__canvasWidth.set(newValue);
    }
    private __canvasHeight: ObservedPropertySimple<number>;
    get canvasHeight() {
        return this.__canvasHeight.get();
    }
    set canvasHeight(newValue: number) {
        this.__canvasHeight.set(newValue);
    }
    private __oldStr: ObservedPropertySimple<string>;
    get oldStr() {
        return this.__oldStr.get();
    }
    set oldStr(newValue: string) {
        this.__oldStr.set(newValue);
    }
    private __newStr: ObservedPropertySimple<string>;
    get newStr() {
        return this.__newStr.get();
    }
    set newStr(newValue: string) {
        this.__newStr.set(newValue);
    }
    private __resultData: ObservedPropertySimple<string>;
    get resultData() {
        return this.__resultData.get();
    }
    set resultData(newValue: string) {
        this.__resultData.set(newValue);
    }
    render() {
        Column.create();
        Column.height('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.height(200);
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.justifyContent(FlexAlign.Center);
        Row.height(200);
        Button.createWithLabel(this.strChars);
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = 'beep boop   afff测试样本one1';
            const other = 'beepboob 2022真热样本 e ';
            const diff: Data[] = diffChars(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel(this.strWords);
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = 'beep boop   afff测试样本one1';
            const other = 'beepboob 2022真热样本 e ';
            const diff: Data[] = diffWords(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("文本块_空格视为重要");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = 'beep boop   afff测 试样本one1';
            const other = 'beepboob 2022真热样本 e ';
            const diff: Data[] = diffWordsWithSpace(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("逐行比较");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = 'beep boop   afff测 试样本one1 爱啥啥啥来着';
            const other = 'beepboob 2022真热样本 e 案发飒飒afffff';
            const diff: Data[] = diffLines(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("逐行比较_忽略前尾空格");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = ' beep boop   aff哈哈  是是技术/n 撒谎还会啥杀害 ';
            const other = 'beepboob 2022真热样本 e ';
            const diff: Data[] = diffTrimmedLines(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("逐句比较");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = 'beep boop,afff哈哈,是是技术/n 撒谎还会啥杀害';
            const other = 'beepboob 2022真热样本,e? ';
            const diff: Data[] = diffSentences(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("比较CSS标记");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = '.{ width: 960px; padding: 0;}';
            const other = '#container { width: 960px; margin: auto;}';
            const diff: Data[] = diffCss(one, other);
            this.drawText(diff);
            this.objectToString(one, other, diff);
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("比较JSON");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = '[{"name":"josn1","account":1,"firstIndex":1}]';
            const other = '[{"name":"josn2","accountTwo":2,"scoundIndex":2}]';
            const diff: Data[] = diffJson(one, other);
            this.objectToString(one, other, diff);
            this.visible = Visibility.Hidden;
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Button.createWithLabel("比较两个数组");
        Button.fontSize(18);
        Button.height("45vp");
        Button.onClick((event) => {
            const one = [1, 2, 3, 4, 5, 5, 7, 8];
            const other = [1, 2, 3, 12, 5, 5, 7, 8, 9, 10];
            const diff: Data[] = diffArrays(one, other);
            this.objectToString(one, other, diff);
            this.visible = Visibility.Hidden;
        });
        Button.margin({ bottom: "20vp", left: "20vp" });
        Button.pop();
        Row.pop();
        Scroll.pop();
        Column.create();
        Column.visibility(this.visible);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({ top: '50vp' });
        Column.width('100%');
        Canvas.create(this.canvasContext);
        Canvas.width(this.canvasWidth);
        Canvas.height(this.canvasHeight);
        Canvas.backgroundColor(Color.Black);
        Canvas.pop();
        Column.pop();
        Text.create("---------------------------------------结果展示(oldStr,newStr为参数，resultData为结果)------------------------------------------------------");
        Text.fontSize(18);
        Text.margin({ top: "20vp" });
        Text.pop();
        Text.create(this.oldStr);
        Text.fontSize(18);
        Text.margin({ top: "20vp" });
        Text.pop();
        Text.create(this.newStr);
        Text.fontSize(18);
        Text.margin({ top: "20vp" });
        Text.pop();
        Text.create(this.resultData);
        Text.fontSize(18);
        Text.margin({ top: "20vp" });
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        console.log("asasf,aboutToAppear");
    }
    drawText(diff: Data[]) {
        if (this.visible == Visibility.Hidden) {
            this.visible = Visibility.Visible;
        }
        let x: number = 10;
        let y: number = 10;
        this.offContext.clearRect(10, 10, this.canvasWidth, this.canvasHeight);
        diff.forEach((part: Data) => {
            let item: Data = part as Data;
            let str = new String();
            this.offContext.beginPath();
            this.offContext.font = '50px sans-serif';
            if (item.added) {
                this.offContext.fillStyle = "#00FF00";
            }
            else if (item.removed) {
                this.offContext.fillStyle = "#FF0000";
            }
            else {
                this.offContext.fillStyle = "#CCCCCC";
            }
            str = item.value;
            let measure = this.offContext.measureText(str.valueOf());
            y = measure.height;
            this.offContext.fillText(str.valueOf(), x, y);
            x = x + measure.width / 2;
        });
        let image = this.offContext.transferToImageBitmap();
        this.offContext.closePath();
        this.canvasContext.beginPath();
        this.canvasContext.transferFromImageBitmap(image);
        this.canvasContext.closePath();
        this.canvasHeight = y * 2 - 5;
        this.canvasWidth = x + 20;
    }
    objectToString(oldNtr: string | number[], newNtr: string | number[], result: Data[]) {
        this.oldStr = "oldStr>>>>:" + JSON.stringify(oldNtr);
        this.newStr = "newStr>>>>>:" + JSON.stringify(newNtr);
        this.resultData = "resultData>>>>>:" + JSON.stringify(result);
    }
}
interface Data {
    added?: undefined | boolean;
    count: number;
    removed?: undefined | boolean;
    value: string;
}
loadDocument(new Index("1", undefined, {}));
