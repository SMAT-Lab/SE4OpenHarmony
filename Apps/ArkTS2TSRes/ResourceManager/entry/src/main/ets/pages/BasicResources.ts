interface Index_Params {
    string_str?: string;
    strArray?: string;
    plural?: string;
    configuration?: string;
    capability?: string;
    media?: string;
    mediaBase?: string;
    formatStr?: string;
    densityMedia?: string;
    systemRes?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BasicResources_" + ++__generate__Id;
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
import resourceManager from '@ohos.resourceManager';
import hilog from '@ohos.hilog';
import { BusinessError } from '@ohos.base';
const TAG = '[Sample_ResourceManager]';
const DOMAIN = 0xFF00;
const SPECIFIED_NUM = 2;
let resMgr = getContext().resourceManager;
async function getString(resId: number): Promise<string | undefined> {
    try {
        let value = await resMgr.getStringValue(resId);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getStringValue failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getStringArray(resource: resourceManager.Resource): Promise<Array<string> | undefined> {
    try {
        let value = await resMgr.getStringArrayValue(resource);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getStringArrayValue failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getPluralString(resId: number, num: number): Promise<string | undefined> {
    try {
        let value = await resMgr.getPluralStringValue(resId, num);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getPluralStringValue failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getDeviceCapability(): Promise<resourceManager.DeviceCapability | undefined> {
    try {
        let value = await resMgr.getDeviceCapability();
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getDeviceCapability failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getConfiguration(): Promise<resourceManager.Configuration | undefined> {
    try {
        let value = await resMgr.getConfiguration();
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getConfiguration failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getMedia(resId: number): Promise<Uint8Array | undefined> {
    try {
        let value = await resMgr.getMediaContent(resId);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getMediaContent failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getMediaBase64(resId: number): Promise<string | undefined> {
    try {
        let value = await resMgr.getMediaContentBase64(resId);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getMediaContentBase64 failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
function getFormatString(resId: number, world: string): string | undefined {
    try {
        let value = resMgr.getStringSync(resId, world);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getStringSync failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getDensityMediaBase64(resId: number, density: number): Promise<string | undefined> {
    try {
        let value = await resMgr.getMediaContentBase64(resId, density);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getDensityMediaBase64 failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
async function getSystemMediaBase64(resId: number): Promise<string | undefined> {
    // 获取仅系统资源管理对象
    let sysMgr = resourceManager.getSystemResourceManager();
    try {
        let value = await sysMgr.getMediaContentBase64(resId);
        return value;
    }
    catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        hilog.error(DOMAIN, TAG, `getMediaContentBase64 failed, error code: ${code}, message: ${message}.`);
        return;
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__string_str = new ObservedPropertySimple('string', this, "string_str");
        this.__strArray = new ObservedPropertySimple('stringArray', this, "strArray");
        this.__plural = new ObservedPropertySimple('plural', this, "plural");
        this.__configuration = new ObservedPropertySimple('configuration', this, "configuration");
        this.__capability = new ObservedPropertySimple('capability', this, "capability");
        this.__media = new ObservedPropertySimple('media', this, "media");
        this.__mediaBase = new ObservedPropertySimple('mediaBase', this, "mediaBase");
        this.__formatStr = new ObservedPropertySimple('Format String', this, "formatStr");
        this.__densityMedia = new ObservedPropertySimple('Density Media', this, "densityMedia");
        this.__systemRes = new ObservedPropertySimple('System Res', this, "systemRes");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.string_str !== undefined) {
            this.string_str = params.string_str;
        }
        if (params.strArray !== undefined) {
            this.strArray = params.strArray;
        }
        if (params.plural !== undefined) {
            this.plural = params.plural;
        }
        if (params.configuration !== undefined) {
            this.configuration = params.configuration;
        }
        if (params.capability !== undefined) {
            this.capability = params.capability;
        }
        if (params.media !== undefined) {
            this.media = params.media;
        }
        if (params.mediaBase !== undefined) {
            this.mediaBase = params.mediaBase;
        }
        if (params.formatStr !== undefined) {
            this.formatStr = params.formatStr;
        }
        if (params.densityMedia !== undefined) {
            this.densityMedia = params.densityMedia;
        }
        if (params.systemRes !== undefined) {
            this.systemRes = params.systemRes;
        }
    }
    aboutToBeDeleted() {
        this.__string_str.aboutToBeDeleted();
        this.__strArray.aboutToBeDeleted();
        this.__plural.aboutToBeDeleted();
        this.__configuration.aboutToBeDeleted();
        this.__capability.aboutToBeDeleted();
        this.__media.aboutToBeDeleted();
        this.__mediaBase.aboutToBeDeleted();
        this.__formatStr.aboutToBeDeleted();
        this.__densityMedia.aboutToBeDeleted();
        this.__systemRes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __string_str: ObservedPropertySimple<string>;
    get string_str() {
        return this.__string_str.get();
    }
    set string_str(newValue: string) {
        this.__string_str.set(newValue);
    }
    private __strArray: ObservedPropertySimple<string>;
    get strArray() {
        return this.__strArray.get();
    }
    set strArray(newValue: string) {
        this.__strArray.set(newValue);
    }
    private __plural: ObservedPropertySimple<string>;
    get plural() {
        return this.__plural.get();
    }
    set plural(newValue: string) {
        this.__plural.set(newValue);
    }
    private __configuration: ObservedPropertySimple<string>;
    get configuration() {
        return this.__configuration.get();
    }
    set configuration(newValue: string) {
        this.__configuration.set(newValue);
    }
    private __capability: ObservedPropertySimple<string>;
    get capability() {
        return this.__capability.get();
    }
    set capability(newValue: string) {
        this.__capability.set(newValue);
    }
    private __media: ObservedPropertySimple<string>;
    get media() {
        return this.__media.get();
    }
    set media(newValue: string) {
        this.__media.set(newValue);
    }
    private __mediaBase: ObservedPropertySimple<string>;
    get mediaBase() {
        return this.__mediaBase.get();
    }
    set mediaBase(newValue: string) {
        this.__mediaBase.set(newValue);
    }
    private __formatStr: ObservedPropertySimple<string>;
    get formatStr() {
        return this.__formatStr.get();
    }
    set formatStr(newValue: string) {
        this.__formatStr.set(newValue);
    }
    private __densityMedia: ObservedPropertySimple<string>;
    get densityMedia() {
        return this.__densityMedia.get();
    }
    set densityMedia(newValue: string) {
        this.__densityMedia.set(newValue);
    }
    private __systemRes: ObservedPropertySimple<string>;
    get systemRes() {
        return this.__systemRes.get();
    }
    set systemRes(newValue: string) {
        this.__systemRes.set(newValue);
    }
    async aboutToAppear() {
        this.string_str = await getString($r('app.string.string_str').id) as string;
        let resource: resourceManager.Resource = {
            bundleName: "ohos.samples.resourcemanager",
            moduleName: "entry",
            id: $r('app.strarray.str_array').id
        };
        this.strArray = JSON.stringify(await getStringArray(resource) as Array<string>);
        this.plural = await getPluralString($r('app.plural.eat_apple').id, SPECIFIED_NUM) as string;
        this.configuration = JSON.stringify(await getConfiguration() as resourceManager.Configuration);
        this.capability = JSON.stringify(await getDeviceCapability() as resourceManager.DeviceCapability);
        this.media = JSON.stringify(((await getMedia($r('app.media.app_icon').id)) as Uint8Array).length);
        this.mediaBase = JSON.stringify(((await getMediaBase64($r('app.media.app_icon').id)) as string).length);
        this.formatStr = getFormatString($r('app.string.formatStr').id, await getString($r('app.string.world').id) as string) as string;
        this.densityMedia = await getDensityMediaBase64($r('app.media.density').id, 640) as string;
        this.systemRes = await getSystemMediaBase64($r('sys.media.ohos_app_icon').id) as string;
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
        Scroll.create();
        Column.create();
        Column.width('100%');
        Column.padding(10);
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.stringDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.string_str);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.stringArrayDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.strArray);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.pluralStringDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.plural);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.configurationDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.configuration);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.capabilityDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.capability);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.mediaDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.media);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.mediaBase64Desc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.mediaBase);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.formatStrDesc'));
        Text.fontSize(25);
        Text.pop();
        Text.create(this.formatStr);
        Text.fontSize(25);
        Text.fontColor('#ffff0000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create($r('app.string.densityMediaDesc'));
        Text.fontSize(25);
        Text.pop();
        Image.create(this.densityMedia);
        Image.id('getDensityMedia');
        Image.height('10%');
        Text.create($r('app.string.systemResDesc'));
        Text.fontSize(25);
        Text.pop();
        Image.create(this.systemRes);
        Image.id('getSystemMedia');
        Image.height('10%');
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
