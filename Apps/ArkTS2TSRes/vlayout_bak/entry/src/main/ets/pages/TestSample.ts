interface TestSample_Params {
    vScroller?: Scroller;
    scroller?: Scroller[];
    textFirst?: number;
    textExisting?: number;
    textCreated?: number;
    textCount?: number;
    textOffset?: number;
    textInput?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestSample_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { STAGGEREDGRID_LAYOUT, JumpBar, layoutDataType } from '@ohos/vlayout';
class TestSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.vScroller = new Scroller();
        this.__scroller = new ObservedPropertyObject([this.vScroller], this, "scroller");
        this.__textFirst = new ObservedPropertySimple(0, this, "textFirst");
        this.__textExisting = new ObservedPropertySimple(0, this, "textExisting");
        this.__textCreated = new ObservedPropertySimple(0, this, "textCreated");
        this.__textCount = new ObservedPropertySimple(0, this, "textCount");
        this.__textOffset = new ObservedPropertySimple(0, this, "textOffset");
        this.__textInput = new ObservedPropertySimple(0, this, "textInput");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestSample_Params) {
        if (params.vScroller !== undefined) {
            this.vScroller = params.vScroller;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.textFirst !== undefined) {
            this.textFirst = params.textFirst;
        }
        if (params.textExisting !== undefined) {
            this.textExisting = params.textExisting;
        }
        if (params.textCreated !== undefined) {
            this.textCreated = params.textCreated;
        }
        if (params.textCount !== undefined) {
            this.textCount = params.textCount;
        }
        if (params.textOffset !== undefined) {
            this.textOffset = params.textOffset;
        }
        if (params.textInput !== undefined) {
            this.textInput = params.textInput;
        }
    }
    aboutToBeDeleted() {
        this.__scroller.aboutToBeDeleted();
        this.__textFirst.aboutToBeDeleted();
        this.__textExisting.aboutToBeDeleted();
        this.__textCreated.aboutToBeDeleted();
        this.__textCount.aboutToBeDeleted();
        this.__textOffset.aboutToBeDeleted();
        this.__textInput.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private vScroller: Scroller;
    private __scroller: ObservedPropertyObject<Scroller[]>;
    get scroller() {
        return this.__scroller.get();
    }
    set scroller(newValue: Scroller[]) {
        this.__scroller.set(newValue);
    }
    private __textFirst: ObservedPropertySimple<number>;
    get textFirst() {
        return this.__textFirst.get();
    }
    set textFirst(newValue: number) {
        this.__textFirst.set(newValue);
    }
    private __textExisting: ObservedPropertySimple<number>;
    get textExisting() {
        return this.__textExisting.get();
    }
    set textExisting(newValue: number) {
        this.__textExisting.set(newValue);
    }
    private __textCreated: ObservedPropertySimple<number>;
    get textCreated() {
        return this.__textCreated.get();
    }
    set textCreated(newValue: number) {
        this.__textCreated.set(newValue);
    }
    private __textCount: ObservedPropertySimple<number>;
    get textCount() {
        return this.__textCount.get();
    }
    set textCount(newValue: number) {
        this.__textCount.set(newValue);
    }
    private __textOffset: ObservedPropertySimple<number>;
    get textOffset() {
        return this.__textOffset.get();
    }
    set textOffset(newValue: number) {
        this.__textOffset.set(newValue);
    }
    private __textInput: ObservedPropertySimple<number>;
    get textInput() {
        return this.__textInput.get();
    }
    set textInput(newValue: number) {
        this.__textInput.set(newValue);
    }
    staggeredGridLayoutContent(item: layoutDataType, position: number | undefined, parent = null) {
        Column.create();
        Column.border({ width: 1, color: '#000000', radius: 0, style: BorderStyle.Solid });
        Column.width('100%');
        Column.height('100%');
        Text.create(`${item.layoutText}`);
        Text.width('100%');
        Text.height(100);
        Text.backgroundColor('#33EEEEEE');
        Text.fontColor('#999999');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.onClick(() => {
            console.info('position = ' + position + ', item = ' + JSON.stringify(item));
        });
        Text.pop();
        Column.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor('#AAAAAA');
        List.create({ scroller: this.vScroller });
        List.height('100%');
        List.width('100%');
        List.edgeEffect(EdgeEffect.None);
        ListItem.create();
        ListItem.pop();
        List.pop();
        Stack.pop();
    }
}
loadDocument(new TestSample("1", undefined, {}));
