interface TestImagePreview_Params {
    showImagePreview_basicUse?: boolean;
    showImagePreview_setStartIndex?: boolean;
    showImagePreview_asyncClose?: boolean;
    showImagePreview_callComponent?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestImagePreview_" + ++__generate__Id;
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
import { ImagePreview } from 'easyui';
class TestImagePreview extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showImagePreview_basicUse = new ObservedPropertySimple(false, this, "showImagePreview_basicUse");
        this.__showImagePreview_setStartIndex = new ObservedPropertySimple(false, this, "showImagePreview_setStartIndex");
        this.__showImagePreview_asyncClose = new ObservedPropertySimple(false, this, "showImagePreview_asyncClose");
        this.__showImagePreview_callComponent = new ObservedPropertySimple(false, this, "showImagePreview_callComponent");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestImagePreview_Params) {
        if (params.showImagePreview_basicUse !== undefined) {
            this.showImagePreview_basicUse = params.showImagePreview_basicUse;
        }
        if (params.showImagePreview_setStartIndex !== undefined) {
            this.showImagePreview_setStartIndex = params.showImagePreview_setStartIndex;
        }
        if (params.showImagePreview_asyncClose !== undefined) {
            this.showImagePreview_asyncClose = params.showImagePreview_asyncClose;
        }
        if (params.showImagePreview_callComponent !== undefined) {
            this.showImagePreview_callComponent = params.showImagePreview_callComponent;
        }
    }
    aboutToBeDeleted() {
        this.__showImagePreview_basicUse.aboutToBeDeleted();
        this.__showImagePreview_setStartIndex.aboutToBeDeleted();
        this.__showImagePreview_asyncClose.aboutToBeDeleted();
        this.__showImagePreview_callComponent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showImagePreview_basicUse: ObservedPropertySimple<boolean>;
    get showImagePreview_basicUse() {
        return this.__showImagePreview_basicUse.get();
    }
    set showImagePreview_basicUse(newValue: boolean) {
        this.__showImagePreview_basicUse.set(newValue);
    }
    private __showImagePreview_setStartIndex: ObservedPropertySimple<boolean>;
    get showImagePreview_setStartIndex() {
        return this.__showImagePreview_setStartIndex.get();
    }
    set showImagePreview_setStartIndex(newValue: boolean) {
        this.__showImagePreview_setStartIndex.set(newValue);
    }
    private __showImagePreview_asyncClose: ObservedPropertySimple<boolean>;
    get showImagePreview_asyncClose() {
        return this.__showImagePreview_asyncClose.get();
    }
    set showImagePreview_asyncClose(newValue: boolean) {
        this.__showImagePreview_asyncClose.set(newValue);
    }
    private __showImagePreview_callComponent: ObservedPropertySimple<boolean>;
    get showImagePreview_callComponent() {
        return this.__showImagePreview_callComponent.get();
    }
    set showImagePreview_callComponent(newValue: boolean) {
        this.__showImagePreview_callComponent.set(newValue);
    }
    render() {
        Stack.create();
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.backgroundColor("#ffe9e9e9");
        Text.create("基础用法");
        Text.margin(20);
        Text.fontColor("#ff757575");
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Button.createWithLabel("预览图片");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.fontColor("#ff000000");
        Button.padding(10);
        Button.alignSelf(ItemAlign.Start);
        Button.margin({ bottom: 20, left: 20 });
        Button.onClick(() => {
            this.showImagePreview_basicUse = true;
        });
        Button.pop();
        Text.create("指定初始位置");
        Text.margin(20);
        Text.fontColor("#ff757575");
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Button.createWithLabel("指定初始位置");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.fontColor("#ff000000");
        Button.padding(10);
        Button.alignSelf(ItemAlign.Start);
        Button.margin({ bottom: 20, left: 20 });
        Button.onClick(() => {
            this.showImagePreview_setStartIndex = true;
        });
        Button.pop();
        Text.create("异步关闭");
        Text.margin(20);
        Text.fontColor("#ff757575");
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Button.createWithLabel("异步关闭");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.fontColor("#ff000000");
        Button.padding(10);
        Button.alignSelf(ItemAlign.Start);
        Button.margin({ bottom: 20, left: 20 });
        Button.onClick(() => {
            this.showImagePreview_asyncClose = true;
        });
        Button.pop();
        Text.create("组件调用");
        Text.margin(20);
        Text.fontColor("#ff757575");
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Button.createWithLabel("组件调用");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.fontColor("#ff000000");
        Button.padding(10);
        Button.alignSelf(ItemAlign.Start);
        Button.margin({ bottom: 20, left: 20 });
        Button.onClick(() => {
            this.showImagePreview_callComponent = true;
        });
        Button.pop();
        Column.pop();
        If.create();
        if (this.showImagePreview_basicUse) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.showImagePreview_setStartIndex) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.showImagePreview_asyncClose) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.showImagePreview_callComponent) {
            If.branchId(0);
        }
        If.pop();
        Stack.pop();
    }
}
loadDocument(new TestImagePreview("1", undefined, {}));
