interface Index_Params {
    pssMemory?: number;
    sharedMemory?: number;
    privateMemory?: number;
    debugWindow?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import hidebug from '@ohos.hidebug';
import DebugInfo from '../component/DebugInfo';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pssMemory = new ObservedPropertySimple(0, this, "pssMemory");
        this.__sharedMemory = new ObservedPropertySimple(0, this, "sharedMemory");
        this.__privateMemory = new ObservedPropertySimple(0, this, "privateMemory");
        this.__debugWindow = new ObservedPropertySimple(false, this, "debugWindow");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.pssMemory !== undefined) {
            this.pssMemory = params.pssMemory;
        }
        if (params.sharedMemory !== undefined) {
            this.sharedMemory = params.sharedMemory;
        }
        if (params.privateMemory !== undefined) {
            this.privateMemory = params.privateMemory;
        }
        if (params.debugWindow !== undefined) {
            this.debugWindow = params.debugWindow;
        }
    }
    aboutToBeDeleted() {
        this.__pssMemory.aboutToBeDeleted();
        this.__sharedMemory.aboutToBeDeleted();
        this.__privateMemory.aboutToBeDeleted();
        this.__debugWindow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pssMemory: ObservedPropertySimple<number>;
    get pssMemory() {
        return this.__pssMemory.get();
    }
    set pssMemory(newValue: number) {
        this.__pssMemory.set(newValue);
    }
    private __sharedMemory: ObservedPropertySimple<number>;
    get sharedMemory() {
        return this.__sharedMemory.get();
    }
    set sharedMemory(newValue: number) {
        this.__sharedMemory.set(newValue);
    }
    private __privateMemory: ObservedPropertySimple<number>;
    get privateMemory() {
        return this.__privateMemory.get();
    }
    set privateMemory(newValue: number) {
        this.__privateMemory.set(newValue);
    }
    private __debugWindow: ObservedPropertySimple<boolean>;
    get debugWindow() {
        return this.__debugWindow.get();
    }
    set debugWindow(newValue: boolean) {
        this.__debugWindow.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.height('6%');
        Row.width('100%');
        Row.padding({ right: 10 });
        Row.backgroundColor('#0D9FFB');
        Row.constraintSize({ minHeight: 50 });
        Text.create($r('app.string.MainAbility_label'));
        Text.margin(4);
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.debug'));
        Image.key('btnDebug');
        Image.width('10%');
        Image.margin({ right: 4 });
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            this.debugWindow = !this.debugWindow;
            if (this.debugWindow) {
                let pss = hidebug.getPss();
                this.pssMemory = Number(pss !== null ? pss : -1); // -1代表getPss()接口返回值错误
                let sharedDirty = hidebug.getSharedDirty();
                this.sharedMemory = Number(sharedDirty !== null ? sharedDirty : -1); // -1代表getSharedDirty()接口返回值错误
                let privateDirty = hidebug.getPrivateDirty();
                this.privateMemory = Number(privateDirty !== null ? privateDirty : -1); // -1代表getPrivateDirty()接口返回值错误
            }
        });
        Row.pop();
        let earlierCreatedChild_2: DebugInfo = (this && this.findChildById) ? this.findChildById("2") as DebugInfo : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 显示Debug信息窗口
            View.create(new DebugInfo("2", this, {
                pssMemory: this.__pssMemory,
                sharedMemory: this.__sharedMemory,
                debugWindow: this.debugWindow,
                privateMemory: this.__privateMemory
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                debugWindow: this.debugWindow
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
