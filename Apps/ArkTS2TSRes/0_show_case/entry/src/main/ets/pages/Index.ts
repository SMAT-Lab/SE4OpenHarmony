interface Index_Params {
    message?: string;
    context?: Nativerender;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
import { Nativerender } from '../../cpp/types/libentry';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__context = new ObservedPropertyObject(undefined, this, "context");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__context.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __context?: ObservedPropertyObject<Nativerender>;
    get context() {
        return this.__context.get();
    }
    set context(newValue: Nativerender) {
        this.__context.set(newValue);
    }
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
        Column.create();
        Column.margin({
            top: 27,
            left: 12,
            right: 12
        });
        Column.height('40%');
        Column.width('90%');
        XComponent.create({
            id: 'xcomponentId',
            type: 'surface',
            libraryname: 'nativerender'
        });
        XComponent.onLoad((xComponentContext) => {
            this.context = xComponentContext as Nativerender;
        });
        XComponent.onDestroy(() => {
            console.log('onDestroy');
        });
        XComponent.id("xcomponent");
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
            if (this.context) {
                this.context.drawPattern();
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
