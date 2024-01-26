interface Index_Params {
    certTextInfo?: string;
    originTextInfo?: string;
    signTextInfo?: string;
    certFramework?: CertFrameworkModel;
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
import { CertFrameworkModel } from '../model/CertFrameworkModel';
import promptAction from '@ohos.promptAction';
import Logger from '../model/Logger';
const TAG: string = '[CertFramework]';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__certTextInfo = new ObservedPropertySimple('', this, "certTextInfo");
        this.__originTextInfo = new ObservedPropertySimple('', this, "originTextInfo");
        this.__signTextInfo = new ObservedPropertySimple('', this, "signTextInfo");
        this.certFramework = new CertFrameworkModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.certTextInfo !== undefined) {
            this.certTextInfo = params.certTextInfo;
        }
        if (params.originTextInfo !== undefined) {
            this.originTextInfo = params.originTextInfo;
        }
        if (params.signTextInfo !== undefined) {
            this.signTextInfo = params.signTextInfo;
        }
        if (params.certFramework !== undefined) {
            this.certFramework = params.certFramework;
        }
    }
    aboutToBeDeleted() {
        this.__certTextInfo.aboutToBeDeleted();
        this.__originTextInfo.aboutToBeDeleted();
        this.__signTextInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __certTextInfo: ObservedPropertySimple<string>;
    get certTextInfo() {
        return this.__certTextInfo.get();
    }
    set certTextInfo(newValue: string) {
        this.__certTextInfo.set(newValue);
    }
    private __originTextInfo: ObservedPropertySimple<string>;
    get originTextInfo() {
        return this.__originTextInfo.get();
    }
    set originTextInfo(newValue: string) {
        this.__originTextInfo.set(newValue);
    }
    private __signTextInfo: ObservedPropertySimple<string>;
    get signTextInfo() {
        return this.__signTextInfo.get();
    }
    set signTextInfo(newValue: string) {
        this.__signTextInfo.set(newValue);
    }
    private certFramework: CertFrameworkModel;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.homepage_bg_color'));
        Column.create();
        Column.width('100%');
        Column.height('56vp');
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.module_desc'));
        Text.fontColor($r('app.color.homepage_title_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_headline7'));
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: '12vp', left: '24vp', bottom: '11vp' });
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('48vp');
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.certificate_data'));
        Text.fontColor($r('app.color.text_title_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_sub_title3'));
        Text.margin({ top: '19.5vp', left: '24vp', bottom: '9.5vp' });
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('139vp');
        Column.alignItems(HorizontalAlign.Center);
        Column.create();
        Column.height('139vp');
        Column.backgroundColor($r('app.color.text_bg_color'));
        Column.borderRadius($r('sys.float.ohos_id_corner_radius_default_l'));
        Column.margin({ left: '12vp', right: '12vp' });
        Column.align(Alignment.TopStart);
        Scroll.create();
        Scroll.margin({ top: '8vp', left: '16vp', right: '16vp', bottom: '21vp' });
        Text.create(this.certTextInfo);
        Text.fontColor($r('app.color.text_content_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.lineHeight('19vp');
        Text.textAlign(TextAlign.Start);
        Text.width('100%');
        Text.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('48vp');
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.origin_data'));
        Text.fontColor($r('app.color.text_title_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_sub_title3'));
        Text.margin({ top: '19.5vp', left: '24vp', bottom: '9.5vp' });
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('139vp');
        Column.alignItems(HorizontalAlign.Center);
        Column.create();
        Column.height('139vp');
        Column.backgroundColor($r('app.color.text_bg_color'));
        Column.borderRadius($r('sys.float.ohos_id_corner_radius_default_l'));
        Column.margin({ left: '12vp', right: '12vp' });
        Column.align(Alignment.TopStart);
        Scroll.create();
        Scroll.margin({ top: '8vp', left: '16vp', right: '16vp', bottom: '21vp' });
        Text.create(this.originTextInfo);
        Text.fontColor($r('app.color.text_content_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.lineHeight('19vp');
        Text.textAlign(TextAlign.Start);
        Text.width('100%');
        Text.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('48vp');
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.signature_data'));
        Text.fontColor($r('app.color.text_title_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_sub_title3'));
        Text.margin({ top: '19.5vp', left: '24vp', bottom: '9.5vp' });
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('139vp');
        Column.alignItems(HorizontalAlign.Center);
        Column.create();
        Column.height('139vp');
        Column.backgroundColor($r('app.color.text_bg_color'));
        Column.borderRadius($r('sys.float.ohos_id_corner_radius_default_l'));
        Column.margin({ left: '12vp', right: '12vp' });
        Column.align(Alignment.TopStart);
        Scroll.create();
        Scroll.margin({ top: '8vp', left: '16vp', right: '16vp', bottom: '21vp' });
        Text.create(this.signTextInfo);
        Text.fontColor($r('app.color.text_content_color'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.lineHeight('19vp');
        Text.textAlign(TextAlign.Start);
        Text.width('100%');
        Text.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('40vp');
        Column.alignItems(HorizontalAlign.Center);
        Column.margin({ top: '23vp' });
        Row.create();
        Row.margin({ left: '24vp', right: '24vp' });
        Button.createWithChild({ type: ButtonType.Capsule, stateEffect: false });
        Button.width('48%');
        Button.backgroundColor($r('app.color.button_display_bg_color'));
        Button.margin({ right: '12vp' });
        Button.id('dataDispalyButton');
        Button.onClick(() => {
            this.certFramework.dataDisplay((result: resultInfo) => {
                this.certTextInfo = result.certInfo;
                this.originTextInfo = result.originInfo;
                this.signTextInfo = result.signatureInfo;
            });
        });
        Text.create($r('app.string.display_data'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.fontColor($r('app.color.button_display_title_color'));
        Text.padding({ top: '9vp', left: '16vp', right: '16vp', bottom: '9vp' });
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Capsule, stateEffect: false });
        Button.width('48%');
        Button.backgroundColor($r('app.color.button_verify_bg_color'));
        Button.id('verifyButton');
        Button.onClick(() => {
            this.certFramework.verify((result: boolean) => {
                if (result == true) {
                    Logger.info(TAG, 'verify: PASS!!!');
                    try {
                        promptAction.showToast({
                            message: $r('app.string.verify_success'),
                            duration: 2000,
                            bottom: 122
                        });
                    }
                    catch (err) {
                        Logger.error(TAG, `show result failed, ${JSON.stringify(err)}`);
                    }
                }
                else {
                    Logger.info(TAG, 'verify: FAILED!!!');
                    try {
                        promptAction.showToast({
                            message: $r('app.string.verify_fail'),
                            duration: 2000,
                            bottom: 122
                        });
                    }
                    catch (err) {
                        Logger.error(TAG, `show result failed, ${JSON.stringify(err)}`);
                    }
                }
            });
        });
        Text.create($r('app.string.verify'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.fontColor($r('app.color.button_verify_title_color'));
        Text.padding({ top: '9vp', left: '16vp', right: '16vp', bottom: '9vp' });
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('40vp');
        Column.alignItems(HorizontalAlign.Center);
        Column.margin({ top: '12vp' });
        Row.create();
        Row.margin({ left: '24vp', right: '24vp' });
        Button.createWithChild({ type: ButtonType.Capsule, stateEffect: false });
        Button.width('48%');
        Button.backgroundColor($r('app.color.button_modify_origin_data_bg_color'));
        Button.margin({ right: '12vp' });
        Button.id('modifyOriginDataButton');
        Button.onClick(() => {
            this.certFramework.modifyOriginData((result: resultInfo) => {
                this.originTextInfo = result.originInfo;
                this.signTextInfo = result.signatureInfo;
            });
        });
        Text.create($r('app.string.modify_origin_data'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.fontColor($r('app.color.button_modify_origin_data_title_color'));
        Text.padding({ top: '9.25vp', left: '20vp', right: '20vp', bottom: '8.75vp' });
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Capsule, stateEffect: false });
        Button.width('48%');
        Button.backgroundColor($r('app.color.button_modify_signature_data_bg_color'));
        Button.id('modifySignatureDataButton');
        Button.onClick(() => {
            this.certFramework.modifySignatureData((result: resultInfo) => {
                this.originTextInfo = result.originInfo;
                this.signTextInfo = result.signatureInfo;
            });
        });
        Text.create($r('app.string.modify_signature_data'));
        Text.fontSize($r('sys.float.ohos_id_text_size_body1'));
        Text.fontColor($r('app.color.button_modify_signature_data_title_color'));
        Text.padding({ top: '9.25vp', left: '20vp', right: '20vp', bottom: '8.75vp' });
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
class resultInfo {
    certInfo: string = '';
    originInfo: string = '';
    signatureInfo: string = '';
}
loadDocument(new Index("1", undefined, {}));
