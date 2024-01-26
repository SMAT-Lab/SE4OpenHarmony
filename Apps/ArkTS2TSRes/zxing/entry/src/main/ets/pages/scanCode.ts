interface ScanCode_Params {
    qrCodeParseResult?: string;
    showResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "scanCode_" + ++__generate__Id;
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
import { CameraView, CameraService } from '@ohos/zxing';
import router from '@ohos.router';
class ScanCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__qrCodeParseResult = AppStorage.SetAndProp('qrCodeParseResult', '', this, "qrCodeParseResult");
        this.__showResult = new ObservedPropertySimple("", this, "showResult");
        this.updateWithValueParams(params);
        this.declareWatch("qrCodeParseResult", this.showQrCodeResult);
    }
    updateWithValueParams(params: ScanCode_Params) {
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
    }
    aboutToBeDeleted() {
        this.__qrCodeParseResult.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __qrCodeParseResult: ObservedPropertyAbstract<string>;
    get qrCodeParseResult() {
        return this.__qrCodeParseResult.get();
    }
    set qrCodeParseResult(newValue: string) {
        this.__qrCodeParseResult.set(newValue);
    }
    private __showResult: ObservedPropertySimple<string>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: string) {
        this.__showResult.set(newValue);
    }
    showQrCodeResult() {
        this.showResult = this.qrCodeParseResult;
        if (this.showResult != "" && this.showResult != undefined) {
            router.replaceUrl({ url: "pages/Index", params: { scanData: this.showResult } });
            // 解析成功关闭相机
            CameraService.getInstance().destroy();
        }
    }
    aboutToAppear() {
        CameraService.getInstance().destroy();
    }
    onPageShow() {
        AppStorage.setOrCreate("qrCodeParseResult", "");
        CameraService.getInstance().init(getContext());
    }
    onPageHide() {
        CameraService.getInstance().release();
    }
    render() {
        Stack.create();
        Stack.width("100%");
        Stack.height("100%");
        If.create();
        if (!!this.showResult) {
            If.branchId(0);
            Text.create(this.showResult);
            Text.width('100%');
            Text.position({ x: 0, y: 600 });
            Text.borderColor(Color.White);
            Text.borderWidth(1);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.pop();
        }
        If.pop();
        Stack.pop();
    }
}
loadDocument(new ScanCode("1", undefined, {}));
