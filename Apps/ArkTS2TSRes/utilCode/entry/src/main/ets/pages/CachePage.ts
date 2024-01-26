interface CachePage_Params {
    get?: string;
    putKey?: string;
    putValue?: string;
    getKey?: string;
    getValue?: string;
    delKey?: string;
    cacheSize?: number;
    cacheMemsize?: number;
    cacheHits?: number;
    cacheMisses?: number;
    cacheKeys?: string[];
    cacheExportJson?: string;
    cacheImportJson?: string;
    cacheImportJsonSize?: number;
    default?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CachePage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import cache from 'memory-cache';
import prompt from '@ohos.promptAction';
interface skipDuplicatesType {
    skipDuplicates: boolean;
}
let skipFn = (data: boolean): skipDuplicatesType => {
    const skipDuplicatesData: skipDuplicatesType = {
        skipDuplicates: data
    };
    return skipDuplicatesData;
};
class CachePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__get = new ObservedPropertySimple(''
        // @State cacheSize: number = 0;
        // @State cacheMemsize: number = 0;
        // @State cacheHits: number = 0;
        , this, "get");
        this.__putKey = new ObservedPropertySimple('', this, "putKey");
        this.__putValue = new ObservedPropertySimple('', this, "putValue");
        this.__getKey = new ObservedPropertySimple('', this, "getKey");
        this.__getValue = new ObservedPropertySimple('', this, "getValue");
        this.__delKey = new ObservedPropertySimple('', this, "delKey");
        this.__cacheSize = new ObservedPropertySimple(0, this, "cacheSize");
        this.__cacheMemsize = new ObservedPropertySimple(0, this, "cacheMemsize");
        this.__cacheHits = new ObservedPropertySimple(0, this, "cacheHits");
        this.__cacheMisses = new ObservedPropertySimple(0, this, "cacheMisses");
        this.__cacheKeys = new ObservedPropertyObject([], this, "cacheKeys");
        this.__cacheExportJson = new ObservedPropertySimple('', this, "cacheExportJson");
        this.__cacheImportJson = new ObservedPropertySimple('', this, "cacheImportJson");
        this.__cacheImportJsonSize = new ObservedPropertySimple(0, this, "cacheImportJsonSize");
        this.default = " {\"0\":{\"value\":\"测试数据\",\"expire\":\"NaN\"}}";
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CachePage_Params) {
        if (params.get !== undefined) {
            this.get = params.get;
        }
        if (params.putKey !== undefined) {
            this.putKey = params.putKey;
        }
        if (params.putValue !== undefined) {
            this.putValue = params.putValue;
        }
        if (params.getKey !== undefined) {
            this.getKey = params.getKey;
        }
        if (params.getValue !== undefined) {
            this.getValue = params.getValue;
        }
        if (params.delKey !== undefined) {
            this.delKey = params.delKey;
        }
        if (params.cacheSize !== undefined) {
            this.cacheSize = params.cacheSize;
        }
        if (params.cacheMemsize !== undefined) {
            this.cacheMemsize = params.cacheMemsize;
        }
        if (params.cacheHits !== undefined) {
            this.cacheHits = params.cacheHits;
        }
        if (params.cacheMisses !== undefined) {
            this.cacheMisses = params.cacheMisses;
        }
        if (params.cacheKeys !== undefined) {
            this.cacheKeys = params.cacheKeys;
        }
        if (params.cacheExportJson !== undefined) {
            this.cacheExportJson = params.cacheExportJson;
        }
        if (params.cacheImportJson !== undefined) {
            this.cacheImportJson = params.cacheImportJson;
        }
        if (params.cacheImportJsonSize !== undefined) {
            this.cacheImportJsonSize = params.cacheImportJsonSize;
        }
        if (params.default !== undefined) {
            this.default = params.default;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__get.aboutToBeDeleted();
        this.__putKey.aboutToBeDeleted();
        this.__putValue.aboutToBeDeleted();
        this.__getKey.aboutToBeDeleted();
        this.__getValue.aboutToBeDeleted();
        this.__delKey.aboutToBeDeleted();
        this.__cacheSize.aboutToBeDeleted();
        this.__cacheMemsize.aboutToBeDeleted();
        this.__cacheHits.aboutToBeDeleted();
        this.__cacheMisses.aboutToBeDeleted();
        this.__cacheKeys.aboutToBeDeleted();
        this.__cacheExportJson.aboutToBeDeleted();
        this.__cacheImportJson.aboutToBeDeleted();
        this.__cacheImportJsonSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __get: ObservedPropertySimple<string>;
    get get() {
        return this.__get.get();
    }
    set get(newValue: string) {
        this.__get.set(newValue);
    }
    // @State cacheSize: number = 0;
    // @State cacheMemsize: number = 0;
    // @State cacheHits: number = 0;
    private __putKey: ObservedPropertySimple<string>;
    get putKey() {
        return this.__putKey.get();
    }
    set putKey(newValue: string) {
        this.__putKey.set(newValue);
    }
    private __putValue: ObservedPropertySimple<string>;
    get putValue() {
        return this.__putValue.get();
    }
    set putValue(newValue: string) {
        this.__putValue.set(newValue);
    }
    private __getKey: ObservedPropertySimple<string>;
    get getKey() {
        return this.__getKey.get();
    }
    set getKey(newValue: string) {
        this.__getKey.set(newValue);
    }
    private __getValue: ObservedPropertySimple<string>;
    get getValue() {
        return this.__getValue.get();
    }
    set getValue(newValue: string) {
        this.__getValue.set(newValue);
    }
    private __delKey: ObservedPropertySimple<string>;
    get delKey() {
        return this.__delKey.get();
    }
    set delKey(newValue: string) {
        this.__delKey.set(newValue);
    }
    private __cacheSize: ObservedPropertySimple<number>;
    get cacheSize() {
        return this.__cacheSize.get();
    }
    set cacheSize(newValue: number) {
        this.__cacheSize.set(newValue);
    }
    private __cacheMemsize: ObservedPropertySimple<number>;
    get cacheMemsize() {
        return this.__cacheMemsize.get();
    }
    set cacheMemsize(newValue: number) {
        this.__cacheMemsize.set(newValue);
    }
    private __cacheHits: ObservedPropertySimple<number>;
    get cacheHits() {
        return this.__cacheHits.get();
    }
    set cacheHits(newValue: number) {
        this.__cacheHits.set(newValue);
    }
    private __cacheMisses: ObservedPropertySimple<number>;
    get cacheMisses() {
        return this.__cacheMisses.get();
    }
    set cacheMisses(newValue: number) {
        this.__cacheMisses.set(newValue);
    }
    private __cacheKeys: ObservedPropertyObject<string[]>;
    get cacheKeys() {
        return this.__cacheKeys.get();
    }
    set cacheKeys(newValue: string[]) {
        this.__cacheKeys.set(newValue);
    }
    private __cacheExportJson: ObservedPropertySimple<string>;
    get cacheExportJson() {
        return this.__cacheExportJson.get();
    }
    set cacheExportJson(newValue: string) {
        this.__cacheExportJson.set(newValue);
    }
    private __cacheImportJson: ObservedPropertySimple<string>;
    get cacheImportJson() {
        return this.__cacheImportJson.get();
    }
    set cacheImportJson(newValue: string) {
        this.__cacheImportJson.set(newValue);
    }
    private __cacheImportJsonSize: ObservedPropertySimple<number>;
    get cacheImportJsonSize() {
        return this.__cacheImportJsonSize.get();
    }
    set cacheImportJsonSize(newValue: number) {
        this.__cacheImportJsonSize.set(newValue);
    }
    private default: string;
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(1);
        Column.create();
        //写入数据
        Column.create({ space: 12 });
        //写入数据
        Column.margin({ top: 10 });
        Text.create('写入10条数据，key0~9，无对应接口，方便测试');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        Button.createWithLabel('put：写入缓存数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            for (let i = 0; i < 10; i++) {
                cache.put(i, '你好' + i);
                prompt.showToast({ message: '写入成功', duration: 3000 });
            }
        });
        Button.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //写入数据
        Column.pop();
        //put
        Column.create({ space: 12 });
        //put
        Column.margin({ top: 10 });
        Text.create('put测试，写入数据，通过键，写入值');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ placeholder: '请输入key' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.putKey = value;
        });
        TextInput.create({ placeholder: '请输入value' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.putValue = value;
        });
        Button.createWithLabel('put：写入缓存数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            try {
                if (this.putKey == undefined || this.putKey.length == 0) {
                    prompt.showToast({ message: '键不能为空', duration: 3000 });
                    return;
                }
                let value: number = cache.put(this.putKey, this.putValue);
                prompt.showToast({ message: '写入值' + value + '成功', duration: 3000 });
            }
            catch (err) {
                prompt.showToast({ message: '写入失败', duration: 3000 });
            }
        });
        Button.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //put
        Column.pop();
        //get
        Column.create({ space: 12 });
        //get
        Column.margin({ top: 10 });
        Text.create('get测试，通过键获取值');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ placeholder: '请输入key' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.getKey = value;
        });
        Button.createWithLabel('get：读取数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            try {
                this.getValue = cache.get(this.getKey);
            }
            catch (err) {
                prompt.showToast({ message: '读取失败', duration: 3000 });
            }
        });
        Button.pop();
        Text.create('获取的值为：' + this.getValue);
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //get
        Column.pop();
        //del
        Column.create({ space: 12 });
        //del
        Column.margin({ top: 10 });
        Text.create('del测试，通过键删除值');
        Text.pop();
        TextInput.create({ placeholder: '请输入key' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.delKey = value;
        });
        Button.createWithLabel('del：删除数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            let is: boolean = cache.del(this.delKey);
            prompt.showToast({ message: '删除结果' + is, duration: 3000 });
        });
        Button.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //del
        Column.pop();
        //clear
        Column.create({ space: 12 });
        //clear
        Column.margin({ top: 10 });
        Text.create('clear测试，删除所有值，删除后size，memsize为0');
        Text.pop();
        Button.createWithLabel('clear：删除所有值', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            try {
                cache.clear();
            }
            catch (err) {
                prompt.showToast({ message: '删除失败', duration: 3000 });
            }
        });
        Button.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //clear
        Column.pop();
        //size
        Column.create({ space: 12 });
        //size
        Column.margin({ top: 10 });
        Text.create('size测试，返回缓存中的当前条目数');
        Text.pop();
        Button.createWithLabel('size测试：返回缓存中的当前条目数', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.cacheSize = cache.size();
        });
        Button.pop();
        Text.create('缓存中的当前条目数：' + this.cacheSize);
        Text.height(60);
        Text.fontSize(18);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //size
        Column.pop();
        //memsize
        Column.create({ space: 12 });
        //memsize
        Column.margin({ top: 10 });
        Text.create('memsize测试，返回占用缓存空间的条目数,通常== size()');
        Text.pop();
        Button.createWithLabel('memsize测试：返回占用缓存空间的条目数', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.cacheMemsize = cache.memsize();
        });
        Button.pop();
        Text.create('占用缓存空间的条目数：' + this.cacheMemsize);
        Text.height(60);
        Text.fontSize(18);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //memsize
        Column.pop();
        //debug
        Column.create({ space: 12 });
        //debug
        Column.margin({ top: 10 });
        Text.create('debug测试，debug开关');
        Text.pop();
        Button.createWithLabel('打开debug', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            cache.debug(true);
            prompt.showToast({ message: '打开debug模式', duration: 3000 });
        });
        Button.pop();
        Button.createWithLabel('关闭debug', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            cache.debug(false);
            prompt.showToast({ message: '关闭debug模式', duration: 3000 });
        });
        Button.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //debug
        Column.pop();
        //hits
        Column.create({ space: 12 });
        //hits
        Column.margin({ top: 10 });
        Text.create('hits测试，返回缓存点击次数(仅在调试模式下可用)');
        Text.pop();
        Button.createWithLabel('hits测试，返回缓存点击次数(仅在调试模式下可用)', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.cacheHits = cache.hits();
        });
        Button.pop();
        Text.create('缓存点击次数：' + this.cacheHits);
        Text.height(60);
        Text.fontSize(18);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //hits
        Column.pop();
        //misses
        Column.create({ space: 12 });
        //misses
        Column.margin({ top: 10 });
        Text.create('misses测试，返回缓存未点击次数(仅在调试模式下监控)');
        Text.pop();
        Button.createWithLabel('misses测试，返回缓存未点击次数(仅在调试模式下监控)', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.cacheMisses = cache.misses();
        });
        Button.pop();
        Text.create('缓存未点击次数：' + this.cacheMisses);
        Text.height(60);
        Text.fontSize(18);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //misses
        Column.pop();
        //keys
        Column.create({ space: 12 });
        //keys
        Column.margin({ top: 10 });
        Text.create('keys测试，返回所有缓存键');
        Text.pop();
        Button.createWithLabel('keys测试：返回所有缓存键', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.cacheKeys = cache.keys();
        });
        Button.pop();
        Text.create('所有缓存键：' + this.cacheKeys);
        Text.height(60);
        Text.fontSize(18);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //keys
        Column.pop();
        //exportJson
        Column.create({ space: 12 });
        //exportJson
        Column.margin({ top: 10 });
        Text.create('exportJson测试，返回所有缓存数据以JSON字符串表示');
        Text.pop();
        Button.createWithLabel('exportJson测试：返回所有缓存数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.cacheExportJson = cache.exportJson();
            console.log(this.cacheExportJson);
        });
        Button.pop();
        Text.create('所有缓存数据：' + this.cacheExportJson);
        Text.height(60);
        Text.fontSize(18);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //exportJson
        Column.pop();
        //importJson
        Column.create({ space: 12 });
        //importJson
        Column.margin({ top: 10 });
        Text.create('importJson测试，Json格式导入数据，存在数据将会被覆盖，如果skipduplicate为true，存在的数据将不会覆盖，默认false');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        Text.create('importJson测试：覆盖测试');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ text: this.default, placeholder: '请输入数据' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.cacheImportJson = value;
        });
        Button.createWithLabel('importJson测试：Json格式导入数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            try {
                this.cacheImportJsonSize = cache.importJson(this.cacheImportJson, skipFn(false));
                prompt.showToast({ message: '写入成功', duration: 3000 });
            }
            catch (err) {
                prompt.showToast({ message: '请输入json格式数据', duration: 3000 });
            }
        });
        Button.pop();
        Text.create('成功写入后的缓存中的当前条目数' + this.cacheImportJsonSize);
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //importJson
        Column.pop();
        //importJson
        Column.create({ space: 12 });
        //importJson
        Column.margin({ top: 10 });
        Text.create('importJson测试，Json格式导入数据，存在数据将会被覆盖，如果skipduplicate为true，存在的数据将不会覆盖，默认false');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        Text.create('importJson测试：不覆盖测试');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ text: this.default, placeholder: '请输入数据' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.onChange((value: string) => {
            this.cacheImportJson = value;
        });
        Button.createWithLabel('importJson测试：Json格式导入数据', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            try {
                this.cacheImportJsonSize = cache.importJson(this.cacheImportJson, skipFn(true));
                prompt.showToast({ message: '写入成功', duration: 3000 });
            }
            catch (err) {
                prompt.showToast({ message: '请输入json格式数据', duration: 3000 });
            }
        });
        Button.pop();
        Text.create('成功写入后的缓存中的当前条目数' + this.cacheImportJsonSize);
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        //importJson
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new CachePage("1", undefined, {}));
