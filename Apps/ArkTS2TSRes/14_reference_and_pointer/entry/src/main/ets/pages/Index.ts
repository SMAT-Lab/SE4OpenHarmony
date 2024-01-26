interface Index_Params {
    message?: string;
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
var libAddon = globalThis.requireNapi("entry", true);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let ref1 = new libAddon.Reference(0);
            libAddon.GrowUpByReference(ref1);
            hilog.info(0x0000, 'AKI', 'after GrowUpByReference ref1 count = %{public}d', ref1.count);
            libAddon.GrowUpByPointer(ref1);
            hilog.info(0x0000, 'AKI', 'after GrowUpByPointer ref1 count = %{public}d', ref1.count);
            let ref2 = new libAddon.Reference(-1);
            ref2.ChangeByReference(ref1);
            hilog.info(0x0000, 'AKI', 'after ChangeByReference ref1 count = %{public}d', ref1.count);
            hilog.info(0x0000, 'AKI', 'after ChangeByReference ref2 count = %{public}d', ref2.count);
            ref2.ChangeByPointer(ref1);
            hilog.info(0x0000, 'AKI', 'after ChangeByPointer ref1 count = %{public}d', ref1.count);
            hilog.info(0x0000, 'AKI', 'after ChangeByPointer ref2 count = %{public}d', ref2.count);
            libAddon.Reference.MultiCountByReference(ref1, 2);
            hilog.info(0x0000, 'AKI', 'after MultiCountByReference ref1 count = %{public}d', ref1.count);
            libAddon.Reference.MultiCountByPointer(ref2, 2);
            hilog.info(0x0000, 'AKI', 'after MultiCountByPointer ref2 count = %{public}d', ref2.count);
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));