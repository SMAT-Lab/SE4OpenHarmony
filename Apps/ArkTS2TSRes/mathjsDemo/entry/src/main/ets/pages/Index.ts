interface Index_Params {
    scroller?: Scroller;
    message?: string;
    crcalc?: string;
    ejmlMatrix?: string;
    ejmlMathjs?: string;
    jafama?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
function routerfun(url: string) {
    let options: router.RouterOptions = {
        url: url
    };
    router.pushUrl(options);
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__message = new ObservedPropertySimple('mathjs test', this, "message");
        this.__crcalc = new ObservedPropertySimple('crcalc test', this, "crcalc");
        this.__ejmlMatrix = new ObservedPropertySimple('ejmlMatrix test', this, "ejmlMatrix");
        this.__ejmlMathjs = new ObservedPropertySimple('ejmlMathjs test', this, "ejmlMathjs");
        this.__jafama = new ObservedPropertySimple('jafama test', this, "jafama");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.crcalc !== undefined) {
            this.crcalc = params.crcalc;
        }
        if (params.ejmlMatrix !== undefined) {
            this.ejmlMatrix = params.ejmlMatrix;
        }
        if (params.ejmlMathjs !== undefined) {
            this.ejmlMathjs = params.ejmlMathjs;
        }
        if (params.jafama !== undefined) {
            this.jafama = params.jafama;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__crcalc.aboutToBeDeleted();
        this.__ejmlMatrix.aboutToBeDeleted();
        this.__ejmlMathjs.aboutToBeDeleted();
        this.__jafama.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __crcalc: ObservedPropertySimple<string>;
    get crcalc() {
        return this.__crcalc.get();
    }
    set crcalc(newValue: string) {
        this.__crcalc.set(newValue);
    }
    private __ejmlMatrix: ObservedPropertySimple<string>;
    get ejmlMatrix() {
        return this.__ejmlMatrix.get();
    }
    set ejmlMatrix(newValue: string) {
        this.__ejmlMatrix.set(newValue);
    }
    private __ejmlMathjs: ObservedPropertySimple<string>;
    get ejmlMathjs() {
        return this.__ejmlMathjs.get();
    }
    set ejmlMathjs(newValue: string) {
        this.__ejmlMathjs.set(newValue);
    }
    private __jafama: ObservedPropertySimple<string>;
    get jafama() {
        return this.__jafama.get();
    }
    set jafama(newValue: string) {
        this.__jafama.set(newValue);
    }
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info('To the edge');
        });
        Scroll.onScrollEnd(() => {
            console.info('Scroll Stop');
        });
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.crcalc);
        Text.fontSize(16);
        Text.padding(8);
        Text.margin({ top: 32 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                routerfun('crcalc/crcalc');
            }
            catch (err) {
                console.log('errerrcrcalc ' + err);
            }
        });
        Text.pop();
        Text.create(this.ejmlMatrix);
        Text.fontSize(16);
        Text.padding(8);
        Text.margin({ top: 32 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                routerfun('ejml/ejml');
            }
            catch (err) {
                console.log('errerrejml ' + err);
            }
        });
        Text.pop();
        Text.create(this.ejmlMathjs);
        Text.fontSize(20);
        Text.padding(8);
        Text.margin({ top: 32 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                routerfun('ejml/ejmlMathjs');
            }
            catch (err) {
                console.log('errerrejmlMathjs ' + err);
            }
        });
        Text.pop();
        Text.create(this.jafama);
        Text.fontSize(16);
        Text.padding(8);
        Text.margin({ top: 32 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                routerfun('jafama/jafama');
            }
            catch (err) {
                console.log('errerrjafama ' + err);
            }
        });
        Text.pop();
        Text.create(this.message);
        Text.fontSize(16);
        Text.padding(8);
        Text.margin({ top: 32 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick(() => {
            try {
                routerfun('mathjs/mathjs');
            }
            catch (err) {
                console.log('errerrmathjs ' + err);
            }
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
