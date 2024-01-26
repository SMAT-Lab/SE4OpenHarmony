interface Overlay_Params {
    resmgr?;
    message?: string;
    resources?: string;
    pixmap?: PixelMap;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Overlay_" + ++__generate__Id;
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
import overlay from '@ohos.bundle.overlay';
import { BusinessError } from '@ohos.base';
class Overlay extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.resmgr = getContext().resourceManager;
        this.__message = new ObservedPropertySimple('Test Overlay', this, "message");
        this.__resources = new ObservedPropertySimple(this.resmgr.getStringSync($r("app.string.test_string").id), this, "resources");
        this.__pixmap = new ObservedPropertyObject(this.resmgr.getDrawableDescriptor($r("app.media.icon").id).getPixelMap(), this, "pixmap");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Overlay_Params) {
        if (params.resmgr !== undefined) {
            this.resmgr = params.resmgr;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.resources !== undefined) {
            this.resources = params.resources;
        }
        if (params.pixmap !== undefined) {
            this.pixmap = params.pixmap;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__resources.aboutToBeDeleted();
        this.__pixmap.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private resmgr;
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __resources: ObservedPropertySimple<string>;
    get resources() {
        return this.__resources.get();
    }
    set resources(newValue: string) {
        this.__resources.set(newValue);
    }
    private __pixmap: ObservedPropertyObject<PixelMap>;
    get pixmap() {
        return this.__pixmap.get();
    }
    set pixmap(newValue: PixelMap) {
        this.__pixmap.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create($r('app.string.title'));
        Text.width('100%');
        Text.height(50);
        Text.backgroundColor($r('app.color.text_color'));
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.padding({ left: 15 });
        Text.pop();
        Text.create(`${this.message}`);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            top: 40
        });
        Text.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 50
        });
        Button.backgroundColor('#0D9FFB');
        Button.width('50%');
        Button.height('5%');
        Button.onClick(() => {
            // 非使能
            overlay.setOverlayEnabled("libraryOverlay", false, (err, data) => {
                console.log("this err", err);
                console.log("this data", data);
                if (err && err.code != 0) {
                    console.log("error:" + JSON.stringify(err));
                    this.message = this.resmgr.getStringSync($r('app.string.unEnableFailed').id);
                }
                else {
                    console.log("data:" + JSON.stringify(data));
                    this.message = this.resmgr.getStringSync($r('app.string.unEnableSuccess').id);
                }
            });
        });
        Text.create('disable');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.width('50%');
        Button.height('5%');
        Button.onClick(() => {
            // 使能
            overlay.setOverlayEnabled("libraryOverlay", true, (err, data) => {
                if (err && err.code != 0) {
                    console.log("error:" + JSON.stringify(err));
                    this.message = this.resmgr.getStringSync($r('app.string.enableFailed').id);
                }
                else {
                    this.message = this.resmgr.getStringSync($r('app.string.enableSuccess').id);
                }
            });
        });
        Text.create('enable');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.width('50%');
        Button.height('5%');
        Button.onClick(() => {
            let path = getContext().bundleCodeDir + "/libraryRuntimeOverlay-default-signed.hsp";
            try {
                let ret = this.resmgr.addResource(path);
                console.error("addResource: ret" + JSON.stringify(ret));
            }
            catch (error) {
                let code = (error as BusinessError).code;
                let message = (error as BusinessError).message;
                console.error(`addResource failed, error code: ${code}, message: ${message}.`);
            }
            this.pixmap = this.resmgr.getDrawableDescriptor($r("app.media.icon").id).getPixelMap();
            this.resources = this.resmgr.getStringSync($r("app.string.test_string").id);
        });
        Text.create('addResource');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.width('50%');
        Button.height('5%');
        Button.onClick(() => {
            let path = getContext().bundleCodeDir + "/libraryRuntimeOverlay-default-signed.hsp";
            try {
                this.resmgr.removeResource(path);
            }
            catch (error) {
                let code = (error as BusinessError).code;
                let message = (error as BusinessError).message;
                console.error(`removeResource failed, error code: ${code}, message: ${message}.`);
            }
            this.pixmap = this.resmgr.getDrawableDescriptor($r("app.media.icon").id).getPixelMap();
            this.resources = this.resmgr.getStringSync($r("app.string.test_string").id);
        });
        Text.create('removeResource');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Image.create(this.pixmap);
        Image.width(100);
        Image.height(100);
        Text.create(this.resources);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Overlay("1", undefined, {}));
