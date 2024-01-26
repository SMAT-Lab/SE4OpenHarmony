interface AudioRenderMultiInstance_Params {
    audioRendererOptions?;
    audioRendererOptions1?;
    audioRendererOptions2?;
    audioRenderers?;
    paths?;
    returnMsg?: string;
    bufferSize?: number;
    arr?;
    writeArr?;
    underflowCount?: number;
    maxVolume?: number;
    minVolume?: number;
    samplingRateList?;
    samplerate?: number;
    selectedSamplingRateKey?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioRenderMultiInstance_" + ++__generate__Id;
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
class AudioRenderMultiInstance extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_MUSIC,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.audioRendererOptions1 = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_MUSIC,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.audioRendererOptions2 = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_8000,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_MUSIC,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.audioRenderers = [null, null, null];
        this.paths = [globalThis.pathDir + '/test_44100_2.wav', globalThis.pathDir + '/safe_and_sound_32.wav', globalThis.pathDir + '/StarWars10s-1C-8000-2SW.wav'];
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.arr = [0, 1, 2];
        this.writeArr = [0, 0, 0];
        this.__underflowCount = new ObservedPropertySimple(0, this, "underflowCount");
        this.__maxVolume = new ObservedPropertySimple(0, this, "maxVolume");
        this.__minVolume = new ObservedPropertySimple(1, this, "minVolume");
        this.samplingRateList = [];
        this.__samplerate = new ObservedPropertySimple(44100, this, "samplerate");
        this.__selectedSamplingRateKey = new ObservedPropertySimple("SAMPLE_RATE_44100", this, "selectedSamplingRateKey");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioRenderMultiInstance_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRendererOptions1 !== undefined) {
            this.audioRendererOptions1 = params.audioRendererOptions1;
        }
        if (params.audioRendererOptions2 !== undefined) {
            this.audioRendererOptions2 = params.audioRendererOptions2;
        }
        if (params.audioRenderers !== undefined) {
            this.audioRenderers = params.audioRenderers;
        }
        if (params.paths !== undefined) {
            this.paths = params.paths;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.writeArr !== undefined) {
            this.writeArr = params.writeArr;
        }
        if (params.underflowCount !== undefined) {
            this.underflowCount = params.underflowCount;
        }
        if (params.maxVolume !== undefined) {
            this.maxVolume = params.maxVolume;
        }
        if (params.minVolume !== undefined) {
            this.minVolume = params.minVolume;
        }
        if (params.samplingRateList !== undefined) {
            this.samplingRateList = params.samplingRateList;
        }
        if (params.samplerate !== undefined) {
            this.samplerate = params.samplerate;
        }
        if (params.selectedSamplingRateKey !== undefined) {
            this.selectedSamplingRateKey = params.selectedSamplingRateKey;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__underflowCount.aboutToBeDeleted();
        this.__maxVolume.aboutToBeDeleted();
        this.__minVolume.aboutToBeDeleted();
        this.__samplerate.aboutToBeDeleted();
        this.__selectedSamplingRateKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioRendererOptions;
    private audioRendererOptions1;
    private audioRendererOptions2;
    private audioRenderers;
    private paths;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __bufferSize: ObservedPropertySimple<number>;
    get bufferSize() {
        return this.__bufferSize.get();
    }
    set bufferSize(newValue: number) {
        this.__bufferSize.set(newValue);
    }
    private arr;
    private writeArr;
    private __underflowCount: ObservedPropertySimple<number>;
    get underflowCount() {
        return this.__underflowCount.get();
    }
    set underflowCount(newValue: number) {
        this.__underflowCount.set(newValue);
    }
    private __maxVolume: ObservedPropertySimple<number>;
    get maxVolume() {
        return this.__maxVolume.get();
    }
    set maxVolume(newValue: number) {
        this.__maxVolume.set(newValue);
    }
    private __minVolume: ObservedPropertySimple<number>;
    get minVolume() {
        return this.__minVolume.get();
    }
    set minVolume(newValue: number) {
        this.__minVolume.set(newValue);
    }
    private samplingRateList;
    private __samplerate: ObservedPropertySimple<number>;
    get samplerate() {
        return this.__samplerate.get();
    }
    set samplerate(newValue: number) {
        this.__samplerate.set(newValue);
    }
    private __selectedSamplingRateKey: ObservedPropertySimple<string>;
    get selectedSamplingRateKey() {
        return this.__selectedSamplingRateKey.get();
    }
    set selectedSamplingRateKey(newValue: string) {
        this.__selectedSamplingRateKey.set(newValue);
    }
    aboutToAppear() {
        for (let key in audio.AudioSamplingRate) {
            this.samplingRateList.push({ value: key });
        }
    }
    async onBackPress() {
        if (this.audioRenderers[0] !== null) {
            await this.audioRenderers[0].release();
        }
        if (this.audioRenderers[1] !== null) {
            await this.audioRenderers[1].release();
        }
        if (this.audioRenderers[2] !== null) {
            await this.audioRenderers[2].release();
        }
    }
    createAudioRenderer(index) {
        if (this.audioRenderers[index] !== null) {
            this.returnMsg = `audioRenderer ${index} Created already,don't create anymore`;
            return;
        }
        let _this = this;
        if (index == 0) {
            audio.createAudioRenderer(this.audioRendererOptions, async (err, data) => {
                if (err) {
                    _this.returnMsg = `audioRenderer ${index} Created : Error: ${JSON.stringify(err)}`;
                }
                else {
                    _this.audioRenderers[index] = data;
                    _this.returnMsg = `audioRenderer ${index} Created : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
                }
            });
        }
        else if (index == 1) {
            audio.createAudioRenderer(this.audioRendererOptions1, async (err, data) => {
                if (err) {
                    _this.returnMsg = `audioRenderer ${index} Created : Error: ${JSON.stringify(err)}`;
                }
                else {
                    _this.audioRenderers[index] = data;
                    _this.returnMsg = `audioRenderer ${index} Created : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
                }
            });
        }
        else {
            audio.createAudioRenderer(this.audioRendererOptions2, async (err, data) => {
                if (err) {
                    _this.returnMsg = `audioRenderer ${index} Created : Error: ${JSON.stringify(err)}`;
                }
                else {
                    _this.audioRenderers[index] = data;
                    _this.returnMsg = `audioRenderer ${index} Created : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
                }
            });
        }
    }
    rendererStart(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioRenderers[index].start((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} start : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
            }
        });
    }
    getBufferSize(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].getBufferSize((err, bufferSize) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} getBufferSize : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderers[index].state}\n`;
                _this.bufferSize = bufferSize;
            }
        });
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async writeRenderer(index) {
        if (this.writeArr[index] == 1) {
            this.returnMsg += `audioRenderer ${index} write already clicked`;
            return;
        }
        if (this.audioRenderers[index] == null) {
            this.returnMsg += `audioRenderer ${index} instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioRenderers[index].getBufferSize();
        }
        this.writeArr[index] = 1;
        let _this = this;
        let path = this.paths[index];
        try {
            let stat = await fs.stat(path);
            let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
            let file = await fs.open(path, 0o0);
            let buf = new ArrayBuffer(this.bufferSize);
            this.returnMsg = `audioRenderer ${index} write start.......... \n`;
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * this.bufferSize,
                    length: this.bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await new Promise((resolve, reject) => {
                    _this.audioRenderers[index].write(buf, (err, writeSize) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(writeSize);
                            if (index == 0) {
                                if (i == len - 1) {
                                    _this.sleep(1000);
                                }
                            }
                        }
                    });
                });
            }
            _this.returnMsg += `audioRenderer ${index} write end, state:${_this.audioRenderers[index].state}\n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer ${index} write : Error: ${JSON.stringify(err)}\n`;
        }
    }
    stopRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].stop((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} stop : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
            }
        });
    }
    pauseRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to pause\n`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].pause((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} pause : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} pause : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
            }
        });
    }
    releaseRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].release((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} release SUCCESS,state:${_this.audioRenderers[index].state}\n`;
                _this.audioRenderers[index] = null;
                _this.writeArr[index] = 0;
            }
        });
    }
    getUnderflowCountRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].getUnderflowCount((err, underflowCount) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} getUnderflowCount : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} getUnderflowCount : SUCCESS,underflowCount:${underflowCount}, state: ${_this.audioRenderers[index].state}\n`;
                _this.underflowCount = underflowCount;
            }
        });
    }
    getInfoArray(deviceInfo) {
        let str = ``;
        let descriptor = deviceInfo;
        str += `Id:${descriptor.id},Type:${descriptor.deviceType},Role:${descriptor.deviceRole},Name:${descriptor.name},Address:${descriptor.address},SampleRates:${descriptor.sampleRates[0]},ChannelCounts:${descriptor.channelCounts[0]},ChannelMask:${descriptor.channelMasks[0]}\n`;
        return str;
    }
    getCurrentOutputDevicesRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].getCurrentOutputDevices((err, deviceInfo) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} getCurrentOutputDevices : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} getCurrentOutputDevices : SUCCESS,AudioDeviceDescriptor: ${_this.getInfoArray(deviceInfo)}, state: ${_this.audioRenderers[index].state}\n`;
            }
        });
    }
    getMaxStreamVolumeRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].getMaxStreamVolume((err, maxVolume) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} getMaxStreamVolume : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} getMaxStreamVolume : SUCCESS,maxVolume: ${maxVolume}, state: ${_this.audioRenderers[index].state}\n`;
                _this.maxVolume = maxVolume;
            }
        });
    }
    getMinStreamVolumeRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].getMinStreamVolume((err, minVolume) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} getMinStreamVolume : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} getMinStreamVolume : SUCCESS,minVolume: ${minVolume}, state: ${_this.audioRenderers[index].state}\n`;
                _this.minVolume = minVolume;
            }
        });
    }
    setRendererSamplingRateRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to setRendererSamplingRate\n`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].setRendererSamplingRate(_this.samplerate, (err) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} setRendererSamplingRate : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} setRendererSamplingRate : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
            }
        });
    }
    getRendererSamplingRateRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to getRendererSamplingRate\n`;
            return;
        }
        let _this = this;
        _this.audioRenderers[index].getRendererSamplingRate((err, data) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} getRendererSamplingRate : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer ${index} getRendererSamplingRate : SUCCESS,state:${_this.audioRenderers[index].state},data:${JSON.stringify(data)}\n`;
            }
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
        Column.height(120);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音频渲染-多实例】返回数据：");
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
        Scroll.margin({ top: 130 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Button.createWithChild();
            Button.width('80%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.createAudioRenderer(item);
            });
            Text.create("createAudioRenderer");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('20%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.rendererStart(item);
            });
            Text.create("start");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.writeRenderer(item);
            });
            Text.create("write");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.pauseRenderer(item);
            });
            Text.create("pause");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10, bottom: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.stopRenderer(item));
            Text.create("stop");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.releaseRenderer(item));
            Text.create("release");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10, bottom: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.getUnderflowCountRenderer(item));
            Text.create("getUnderflowCount");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.getCurrentOutputDevicesRenderer(item));
            Text.create("getCurrentOutputDevices");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10, bottom: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.getMaxStreamVolumeRenderer(item));
            Text.create("getMaxStreamVolume");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.getMinStreamVolumeRenderer(item));
            Text.create("getMinStreamVolume");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 0 });
            Select.create(this.samplingRateList);
            Select.value(this.selectedSamplingRateKey);
            Select.onSelect((index, value) => {
                this.selectedSamplingRateKey = value;
                this.samplerate = audio.AudioSamplingRate[value];
            });
            Select.font({ size: 22 });
            Select.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10, bottom: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.getRendererSamplingRateRenderer(item));
            Text.create("getRendererSamplingRate");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.setRendererSamplingRateRenderer(item));
            Text.create("setRendererSamplingRate");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Row.pop();
            Divider.create();
            Divider.strokeWidth(10);
            Divider.color(Color.Blue);
        }, (item: number) => item.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new AudioRenderMultiInstance("1", undefined, {}));
