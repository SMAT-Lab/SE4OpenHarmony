interface Index_Params {
    scroller?: Scroller;
    contrl?: ModelController;
    modelList?: Array<Model>;
    hilog?: HiLog;
    result?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { HiLog } from '../HiLog';
import { ModelController } from '../Controller';
import { Model } from '../model';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.contrl = ModelController.getInstance();
        this.modelList = new Array(0);
        this.hilog = HiLog.getHiLogInstance();
        this.__result = new ObservedPropertySimple("", this, "result");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.contrl !== undefined) {
            this.contrl = params.contrl;
        }
        if (params.modelList !== undefined) {
            this.modelList = params.modelList;
        }
        if (params.hilog !== undefined) {
            this.hilog = params.hilog;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private contrl: ModelController;
    private modelList: Array<Model>;
    private hilog: HiLog;
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r("app.color.index_background_color"));
        Row.create();
        Row.backgroundColor(Color.Yellow);
        Row.height(px2vp(300));
        Row.width("100%");
        Row.margin({ top: px2vp(20), bottom: px2vp(20) });
        Text.create("显示结果： " + this.result);
        Text.width('80%');
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(10);
        Scroll.friction(0.6);
        Scroll.edgeEffect(EdgeEffect.None);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info('To the edge');
        });
        Scroll.onScrollStop(() => {
            console.info('Scroll Stop');
        });
        Column.create();
        Column.width('100%');
        Text.create("点击下面的按钮查看结果");
        Text.fontColor(Color.Red);
        Text.fontSize(px2fp(20));
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.modelList), (item: Model) => {
            Column.create();
            Column.margin({ bottom: px2vp(30) });
            Column.alignItems(HorizontalAlign.Start);
            Column.onClick(() => {
                this.result = item.fun();
            });
            Text.create(item.name + "" + "\n函数功能： " + item.describe);
            Text.width('80%');
            Text.backgroundColor('#3366CC');
            Text.fontSize(16);
            Text.textAlign(TextAlign.Start);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.modelList = this.contrl.getModelArrayList();
        this.hilog.HILOG_INFO("[Sample_babel-runtime]", "index page getModelArrayList length is : " + this.modelList.length);
    }
}
loadDocument(new Index("1", undefined, {}));
