interface GetCurrentInputDevices_Params {
    audioCapturerOptions?;
    audioCapturer?;
    returnMsg?: string;
    volume?: number;
    rate?: number;
    minVolume?: number;
    maxVolume?: number;
    path?: string;
    isWrite?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GetCurrentInputDevices_" + ++__generate__Id;
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
import audio from '@ohos.multimedia.audio';
import fs from '@ohos.file.fs';
class GetCurrentInputDevices extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioCapturerOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            capturerInfo: {
                source: audio.SourceType.SOURCE_TYPE_MIC,
                capturerFlags: 0
            }
        };
        this.audioCapturer = null;
        this.__returnMsg = new ObservedPropertySimple(``, this, "returnMsg");
        this.__volume = new ObservedPropertySimple(0, this, "volume");
        this.__rate = new ObservedPropertySimple(0, this, "rate");
        this.__minVolume = new ObservedPropertySimple(0, this, "minVolume");
        this.__maxVolume = new ObservedPropertySimple(0, this, "maxVolume");
        this.__path = new ObservedPropertySimple(globalThis.pathDir + '/test_44100_2.wav', this, "path");
        this.__isWrite = new ObservedPropertySimple(false, this, "isWrite");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GetCurrentInputDevices_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.rate !== undefined) {
            this.rate = params.rate;
        }
        if (params.minVolume !== undefined) {
            this.minVolume = params.minVolume;
        }
        if (params.maxVolume !== undefined) {
            this.maxVolume = params.maxVolume;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.isWrite !== undefined) {
            this.isWrite = params.isWrite;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__rate.aboutToBeDeleted();
        this.__minVolume.aboutToBeDeleted();
        this.__maxVolume.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__isWrite.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioCapturerOptions;
    private audioCapturer;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __volume: ObservedPropertySimple<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __rate: ObservedPropertySimple<number>;
    get rate() {
        return this.__rate.get();
    }
    set rate(newValue: number) {
        this.__rate.set(newValue);
    }
    private __minVolume: ObservedPropertySimple<number>;
    get minVolume() {
        return this.__minVolume.get();
    }
    set minVolume(newValue: number) {
        this.__minVolume.set(newValue);
    }
    private __maxVolume: ObservedPropertySimple<number>;
    get maxVolume() {
        return this.__maxVolume.get();
    }
    set maxVolume(newValue: number) {
        this.__maxVolume.set(newValue);
    }
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
    }
    private __isWrite: ObservedPropertySimple<boolean>;
    get isWrite() {
        return this.__isWrite.get();
    }
    set isWrite(newValue: boolean) {
        this.__isWrite.set(newValue);
    }
    async onBackPress() {
        if (this.audioCapturer !== null) {
            await this.audioCapturer.release();
        }
    }
    async createCapturer() {
        this.returnMsg = ``;
        if (this.audioCapturer != null) {
            this.returnMsg += `audioCapturer instance had created, Do not click repeatedly\n`;
            return;
        }
        else {
            try {
                this.audioCapturer = await audio.createAudioCapturer(this.audioCapturerOptions);
                this.returnMsg += `audioCapturer create success \n`;
            }
            catch (err) {
                this.returnMsg += `i create : Error: ${JSON.stringify(err)}\n`;
                return;
            }
        }
    }
    getCurrentInputDevices() {
        if (this.audioCapturer == null) {
            this.returnMsg += `audioCapturer instance had not created,dont‘t allow to getCurrentInputDevices\n`;
            return;
        }
        let _this = this;
        try {
            let deviceInfo = this.audioCapturer.getCurrentInputDevices();
            _this.returnMsg = `audioCapturer getCurrentInputDevices : 返回值：` + _this.getInfoArray(deviceInfo);
        }
        catch (error) {
            _this.returnMsg = `audioCapturer getCurrentInputDevices : Error: ${JSON.stringify(error)}\n`;
        }
    }
    getInfoArray(deviceInfo) {
        let str = ``;
        for (let i = 0; i < deviceInfo.length; i++) {
            let descriptor = deviceInfo[i];
            str += `第${i}条\nId:${descriptor.id}, Type:${descriptor.deviceType}, Role:${descriptor.deviceRole}, Name:${descriptor.name},
      Address:${descriptor.address}, SampleRates:${descriptor.sampleRates[0]}, ChannelCounts:${descriptor.channelCounts[0]},
      ChannelMask:${descriptor.channelMasks[0]}, EncodingType:${descriptor.encodingTypes[0]}\n`;
        }
        return str;
    }
    render() {
        Column.create();
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(220);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("返回数据：");
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
        Scroll.margin({ top: 230 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('98%');
        Button.height(60);
        Button.onClick(() => this.createCapturer());
        Button.backgroundColor(Color.Pink);
        Text.create("创建AudioCapturer");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('98%');
        Button.height(60);
        Button.onClick(() => this.getCurrentInputDevices());
        Text.create("getCurrentInputDevices 同步接口");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new GetCurrentInputDevices("1", undefined, {}));
