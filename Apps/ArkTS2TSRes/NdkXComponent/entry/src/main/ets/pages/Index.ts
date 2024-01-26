interface Index_Params {
    currentStatus?: string;
    xComponentContext?: XComponentContext | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import XComponentContext from "../interface/XComponentContext";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentStatus = new ObservedPropertySimple("init", this, "currentStatus");
        this.xComponentContext = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.currentStatus !== undefined) {
            this.currentStatus = params.currentStatus;
        }
        if (params.xComponentContext !== undefined) {
            this.xComponentContext = params.xComponentContext;
        }
    }
    aboutToBeDeleted() {
        this.__currentStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentStatus: ObservedPropertySimple<string>;
    get currentStatus() {
        return this.__currentStatus.get();
    }
    set currentStatus(newValue: string) {
        this.__currentStatus.set(newValue);
    }
    private xComponentContext: XComponentContext | undefined;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.margin({ top: 24 });
        Row.width('100%');
        Row.height(56);
        Text.create('Native XComponent Sample');
        Text.fontSize('24fp');
        Text.fontWeight(500);
        Text.margin({
            left: 24,
            top: 12
        });
        Text.pop();
        Row.pop();
        Column.create({ space: 10 });
        Column.onClick(() => {
            let hasChangeColor: boolean = false;
            if (this.xComponentContext && this.xComponentContext.getStatus()) {
                hasChangeColor = this.xComponentContext.getStatus().hasChangeColor;
            }
            if (hasChangeColor) {
                this.currentStatus = "change color";
            }
        });
        Column.margin({
            top: 27,
            left: 12,
            right: 12
        });
        Column.height('40%');
        Column.width('90%');
        XComponent.create({
            id: 'xcomponentId',
            type: XComponentType.SURFACE,
            libraryname: 'nativerender'
        });
        XComponent.onLoad((xComponentContext) => {
            this.xComponentContext = xComponentContext as XComponentContext;
            this.currentStatus = "index";
        });
        XComponent.onDestroy(() => {
            console.log('onDestroy');
        });
        XComponent.id("xcomponent");
        Text.create(this.currentStatus);
        Text.fontSize('24fp');
        Text.fontWeight(500);
        Text.pop();
        Column.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.Center);
        Row.alignItems(VerticalAlign.Bottom);
        Row.layoutWeight(1);
        Button.createWithLabel('Draw Star');
        Button.fontSize('16fp');
        Button.fontWeight(500);
        Button.margin({ bottom: 24 });
        Button.onClick(() => {
            if (this.xComponentContext) {
                this.xComponentContext.drawPattern();
                let hasDraw: boolean = false;
                if (this.xComponentContext.getStatus()) {
                    hasDraw = this.xComponentContext.getStatus().hasDraw;
                }
                if (hasDraw) {
                    this.currentStatus = "draw star";
                }
            }
        });
        Button.width('53.6%');
        Button.height(40);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
