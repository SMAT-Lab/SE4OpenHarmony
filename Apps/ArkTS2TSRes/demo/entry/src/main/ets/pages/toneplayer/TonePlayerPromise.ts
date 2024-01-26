interface TonePlayerCallback_Params {
    returnMsg?: string;
    toneTypeList?;
    toneTypeArr?;
    contentTypeList?;
    selectedContentTypeKey?: string;
    streamUsageList?;
    selectedStreamUsageKey?: string;
    audioRendererInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TonePlayerPromise_" + ++__generate__Id;
}
/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
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
import router from '@ohos.router';
import audio from '@ohos.multimedia.audio';
import fs from '@ohos.file.fs';
class TonePlayerCallback extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.toneTypeList = [];
        this.toneTypeArr = [];
        this.contentTypeList = [];
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_MUSIC", this, "selectedContentTypeKey");
        this.streamUsageList = [];
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.audioRendererInfo = {
            content: audio.ContentType.CONTENT_TYPE_SONIFICATION,
            usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
            rendererFlags: 0
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TonePlayerCallback_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.toneTypeList !== undefined) {
            this.toneTypeList = params.toneTypeList;
        }
        if (params.toneTypeArr !== undefined) {
            this.toneTypeArr = params.toneTypeArr;
        }
        if (params.contentTypeList !== undefined) {
            this.contentTypeList = params.contentTypeList;
        }
        if (params.selectedContentTypeKey !== undefined) {
            this.selectedContentTypeKey = params.selectedContentTypeKey;
        }
        if (params.streamUsageList !== undefined) {
            this.streamUsageList = params.streamUsageList;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
        }
        if (params.audioRendererInfo !== undefined) {
            this.audioRendererInfo = params.audioRendererInfo;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private toneTypeList;
    private toneTypeArr;
    private contentTypeList;
    private __selectedContentTypeKey: ObservedPropertySimple<string>;
    get selectedContentTypeKey() {
        return this.__selectedContentTypeKey.get();
    }
    set selectedContentTypeKey(newValue: string) {
        this.__selectedContentTypeKey.set(newValue);
    }
    private streamUsageList;
    private __selectedStreamUsageKey: ObservedPropertySimple<string>;
    get selectedStreamUsageKey() {
        return this.__selectedStreamUsageKey.get();
    }
    set selectedStreamUsageKey(newValue: string) {
        this.__selectedStreamUsageKey.set(newValue);
    }
    private audioRendererInfo;
    aboutToAppear() {
        for (let key in audio.ContentType) {
            this.contentTypeList.push({ value: key });
        }
        for (let key in audio.StreamUsage) {
            this.streamUsageList.push({ value: key });
        }
        for (let key in audio.ToneType) {
            this.toneTypeList.push(audio.ToneType[key]);
        }
        this.toneTypeList = this.toneTypeList.sort((a, b) => a - b);
        let result = [];
        let path = [];
        for (let i = 0; i < this.toneTypeList.length; i++) {
            if (path.length == 4) {
                result.push([...path]);
            }
            if (i % 4 == 0) {
                path.length = 0;
            }
            path.push(this.toneTypeList[i]);
            if (i == this.toneTypeList.length - 1) {
                result.push([...path]);
            }
        }
        this.toneTypeArr = result;
        this.returnMsg = JSON.stringify(result);
    }
    play(type) {
        let _this = this;
        audio.createTonePlayer(_this.audioRendererInfo).then(data => {
            _this.returnMsg = `createTonePlayer promise Success:${JSON.stringify(data)},`;
            let tonePlayer = data;
            tonePlayer.load(type).then(() => {
                _this.returnMsg += `load callback Success,`;
                tonePlayer.start().then(() => {
                    _this.returnMsg += `start callback Success,`;
                    setTimeout(() => {
                        tonePlayer.stop().then(() => {
                            _this.returnMsg += ` stop Success,`;
                            tonePlayer.release().then(() => {
                                _this.returnMsg += ` release Success,`;
                            }).catch(err => {
                                _this.returnMsg = `release promise Error:${JSON.stringify(err)}`;
                            });
                        }).catch(err => {
                            _this.returnMsg = `stop promise Error:${JSON.stringify(err)}`;
                        });
                    }, 50);
                }).catch(err => {
                    _this.returnMsg = `start promise Error:${JSON.stringify(err)}`;
                });
            }).catch(err => {
                _this.returnMsg = `load promise Error:${JSON.stringify(err)}`;
            });
        }).catch(err => {
            _this.returnMsg = `createTonePlayer promise Error:${JSON.stringify(err)}`;
        });
    }
    render() {
        Column.create();
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(100);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【TonePlayer-promise】返回数据：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnMsg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 110 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Select.create(this.contentTypeList);
        Select.value(this.selectedContentTypeKey);
        Select.onSelect((index, value) => {
            this.selectedContentTypeKey = value;
            this.audioRendererInfo.content = audio.ContentType[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Select.create(this.streamUsageList);
        Select.value(this.selectedStreamUsageKey);
        Select.onSelect((index, value) => {
            this.selectedStreamUsageKey = value;
            this.audioRendererInfo.usage = audio.StreamUsage[value];
        });
        Select.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.toneTypeArr), (item1: Array<number>) => {
            Row.create();
            Row.margin({ top: 30 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            ForEach.create("2", this, ObservedObject.GetRawObject(item1), (item2: number) => {
                Button.createWithChild();
                Button.width('20%');
                Button.height(60);
                Button.onClick(() => {
                    this.play(item2);
                });
                Text.create(`${item2}`);
                Text.fontSize(22);
                Text.fontColor(Color.White);
                Text.pop();
                Button.pop();
            }, (item: number) => item.toString());
            ForEach.pop();
            Row.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        Divider.create();
        Divider.strokeWidth(10);
        Divider.color(Color.Blue);
        Divider.margin({ top: 30 });
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new TonePlayerCallback("1", undefined, {}));
