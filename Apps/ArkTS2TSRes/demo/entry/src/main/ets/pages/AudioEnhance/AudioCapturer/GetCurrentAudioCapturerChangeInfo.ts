interface GetCurrentAudioCapturerChangeInfo_Params {
    audioCapturerOptions?;
    audioCapturer?;
    returnMsg?: string;
    sourceTypeList?;
    selectedSourceTypeKey?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GetCurrentAudioCapturerChangeInfo_" + ++__generate__Id;
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
class GetCurrentAudioCapturerChangeInfo extends View {
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
        this.sourceTypeList = [];
        this.__selectedSourceTypeKey = new ObservedPropertySimple("SOURCE_TYPE_MIC", this, "selectedSourceTypeKey");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GetCurrentAudioCapturerChangeInfo_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.sourceTypeList !== undefined) {
            this.sourceTypeList = params.sourceTypeList;
        }
        if (params.selectedSourceTypeKey !== undefined) {
            this.selectedSourceTypeKey = params.selectedSourceTypeKey;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__selectedSourceTypeKey.aboutToBeDeleted();
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
    private sourceTypeList;
    private __selectedSourceTypeKey: ObservedPropertySimple<string>;
    get selectedSourceTypeKey() {
        return this.__selectedSourceTypeKey.get();
    }
    set selectedSourceTypeKey(newValue: string) {
        this.__selectedSourceTypeKey.set(newValue);
    }
    aboutToAppear() {
        for (let key in audio.SourceType) {
            this.sourceTypeList.push({ value: key });
        }
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
    capturerStart() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        if (_this.audioCapturer.state != 2) {
            this.audioCapturer.start()
                .then(() => {
                _this.returnMsg += `AudioCapturer start : SUCCESS,state:${_this.audioCapturer.state}\n`;
            })
                .catch(err => {
                _this.returnMsg += `AudioCapturer start : Error: ${JSON.stringify(err)}\n`;
            });
        }
        else {
            _this.returnMsg = `AudioCapturer is started, Do not click repeatedly\n`;
        }
    }
    stopCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        if (_this.audioCapturer.state != 3) {
            _this.audioCapturer.stop()
                .then(() => {
                _this.returnMsg += `AudioCapturer stop : SUCCESS,state:${_this.audioCapturer.state}\n`;
            })
                .catch(err => {
                _this.returnMsg += `AudioCapturer stop : Error: ${JSON.stringify(err)}\n`;
            });
        }
        else {
            _this.returnMsg = `AudioCapturer is stopped, Do not click repeatedly\n`;
        }
    }
    releaseCapturer() {
        if (this.audioCapturer == null) {
            this.returnMsg += `AudioCapturer instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        if (_this.audioCapturer.state != 4) {
            _this.audioCapturer.release()
                .then(() => {
                _this.returnMsg += `AudioCapturer release SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.audioCapturer = null;
            })
                .catch(err => {
                _this.returnMsg += `AudioCapturer release : Error: ${JSON.stringify(err)}\n`;
            });
        }
        else {
            _this.returnMsg = `AudioCapturer is released, Do not click repeatedly\n`;
        }
    }
    getCurrentAudioCapturerChangeInfo() {
        if (this.audioCapturer == null) {
            this.returnMsg += `audioCapturer instance had not created,dont‘t allow to getCurrentAudioCapturerChangeInfo\n`;
            return;
        }
        let _this = this;
        try {
            let changeInfo = this.audioCapturer.getCurrentAudioCapturerChangeInfo();
            _this.returnMsg = `getCurrentAudioCapturerChangeInfo : 返回值:` + _this.getCapturerChangeInfo(changeInfo);
        }
        catch (error) {
            _this.returnMsg = `audioCapturer getCurrentAudioCapturerChangeInfo callback : Error: ${JSON.stringify(error)}\n`;
        }
    }
    getCapturerChangeInfo(CapturerChangeInfo) {
        let str = ``;
        let Info = CapturerChangeInfo;
        str += `StreamId: ${Info.streamId}, ClientUid: ${Info.clientUid}, State: ${Info.capturerState},Source: ${Info.capturerInfo.source}, Flag: ${Info.capturerInfo.capturerFlags}, \n`;
        for (let j = 0; j < Info.deviceDescriptors.length; j++) {
            let descriptor = Info.deviceDescriptors[j];
            str += `__deviceDescriptors_${j}\n`;
            str += `Id: ${descriptor.id}, Type:${descriptor.deviceType}, Role: ${descriptor.deviceRole}, Name: ${descriptor.name}, Address: ${descriptor.address}, SampleRates: ${descriptor.sampleRates[0]}, 
      ChannelCounts: ${descriptor.channelCounts[0]}, ChannelMask: ${descriptor.channelMasks[0]}, EncodingType:${descriptor.encodingTypes[0]}\n`;
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
        Row.margin({ top: 10 });
        Text.create("selectedSourceType:");
        Text.fontSize(20);
        Text.pop();
        Select.create(this.sourceTypeList);
        Select.value(this.selectedSourceTypeKey);
        Select.onSelect((index, value) => {
            this.selectedSourceTypeKey = value;
            this.audioCapturerOptions.capturerInfo.source = audio.SourceType[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.createCapturer());
        Button.backgroundColor(Color.Pink);
        Text.create("创建AudioCapturer");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.releaseCapturer());
        Text.create("release capturer");
        Text.fontSize(22);
        Text.fontColor(Color.White);
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
        Button.onClick(() => {
            this.capturerStart();
        });
        Text.create("start promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.stopCapturer());
        Text.create("stop promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
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
        Button.onClick(() => this.getCurrentAudioCapturerChangeInfo());
        Text.create("getCurrentAudioCapturerChangeInfo 同步接口");
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
loadDocument(new GetCurrentAudioCapturerChangeInfo("1", undefined, {}));
