interface CapturerStream_Params {
    returnMsg?: string;
    audioCapturer?;
    index?: number;
    selectedVolumeType?: number;
    audioStreamManager?;
    onReturnMsg?: string;
    audioCapturerOptions?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CapturerStream_" + ++__generate__Id;
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
class CapturerStream extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.audioCapturer = null;
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__selectedVolumeType = new ObservedPropertySimple(0, this, "selectedVolumeType");
        this.audioStreamManager = audio.getAudioManager().getStreamManager();
        this.__onReturnMsg = new ObservedPropertySimple("", this, "onReturnMsg");
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
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CapturerStream_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.selectedVolumeType !== undefined) {
            this.selectedVolumeType = params.selectedVolumeType;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__selectedVolumeType.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private audioCapturer;
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __selectedVolumeType: ObservedPropertySimple<number>;
    get selectedVolumeType() {
        return this.__selectedVolumeType.get();
    }
    set selectedVolumeType(newValue: number) {
        this.__selectedVolumeType.set(newValue);
    }
    private audioStreamManager;
    private __onReturnMsg: ObservedPropertySimple<string>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: string) {
        this.__onReturnMsg.set(newValue);
    }
    private audioCapturerOptions;
    getInfoArray(AudioCapturerChangeInfoArray) {
        if (AudioCapturerChangeInfoArray != null) {
            console.log(JSON.stringify(AudioCapturerChangeInfoArray));
            let str = ``;
            for (let i = 0; i < AudioCapturerChangeInfoArray.length; i++) {
                let Info = AudioCapturerChangeInfoArray[i];
                str += `第${i}条\nStreamId:${Info.streamId},ClientUid:${Info.clientUid},Source:${Info.capturerInfo.source},Flag:${Info.capturerInfo.capturerFlags},State:${Info.capturerState}\n`;
                for (let j = 0; j < Info.deviceDescriptors.length; j++) {
                    let descriptor = Info.deviceDescriptors[j];
                    str += `__deviceDescriptors_${j}\n`;
                    str += `Id:${descriptor.id},Type:${descriptor.deviceType},Role:${descriptor.deviceRole},Name:${descriptor.name},Address:${descriptor.address},SampleRates:${descriptor.sampleRates[0]},ChannelCounts:${descriptor.channelCounts[0]},ChannelMask:${descriptor.channelMasks},EncodingType:${descriptor.encodingType}\n`;
                }
            }
            return str;
        }
        return "没有数据";
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Row.create();
        Row.width('100%');
        Column.create();
        Column.width('98%');
        Column.height(180);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【采集流管理】返回数据：");
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
        Column.create();
        Column.width('100%');
        Column.margin({ top: 190 });
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.getCurrentAudioCapturerInfoArray(async (err, AudioCapturerChangeInfoArray) => {
                console.info('getCurrentAudioCapturerInfoArray **** Get Callback Called ****');
                if (err) {
                    _this.returnMsg = "getCurrentAudioCapturerInfoArray :ERROR:" + JSON.stringify(err);
                }
                else {
                    _this.returnMsg = _this.getInfoArray(AudioCapturerChangeInfoArray);
                }
            });
        });
        Text.create("getCurrentAudioCapturerInfoArray callback");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.getCurrentAudioCapturerInfoArray()
                .then((AudioCapturerChangeInfoArray) => {
                _this.returnMsg = _this.getInfoArray(AudioCapturerChangeInfoArray);
            }).catch((err) => {
                _this.returnMsg = "getCurrentAudioCapturerInfoArray :ERROR:" + JSON.stringify(err);
            });
        });
        Text.create("getCurrentAudioCapturerInfoArray promise");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.create();
        Button.createWithChild();
        Button.width('80%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            _this.onReturnMsg = '监听已触发\n';
            this.audioStreamManager.on('audioCapturerChange', (AudioCapturerChangeInfoArray) => {
                _this.onReturnMsg = '收到回调啦\n' + _this.getInfoArray(AudioCapturerChangeInfoArray);
            });
        });
        Text.create("on('audioCapturerChange')");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('20%');
        Button.height(60);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioStreamManager.off('audioCapturerChange');
            _this.onReturnMsg = '监听已取消\n';
        });
        Text.create("off");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create("ON 监听数据\n" + this.onReturnMsg);
        Text.fontSize(14);
        Text.margin({ top: 10 });
        Text.pop();
        Row.create();
        Row.height(40);
        Row.margin({ top: 10 });
        Button.createWithLabel("createAudioCapturer");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(() => {
            let _this = this;
            if (_this.index > 0) {
                _this.returnMsg = `Capturer create already Success.`;
                return;
            }
            console.log(JSON.stringify(this.audioCapturerOptions));
            audio.createAudioCapturer(this.audioCapturerOptions, (err, data) => {
                if (err) {
                    _this.returnMsg = `createAudioCapturer err:${JSON.stringify(err)}}`;
                }
                else {
                    _this.returnMsg = `createAudioCapturer Success:${JSON.stringify(data)}}`;
                    _this.audioCapturer = data;
                    _this.index++;
                }
            });
        });
        Button.pop();
        Button.createWithLabel("start");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(() => {
            let _this = this;
            this.audioCapturer.start((err) => {
                if (err) {
                    _this.returnMsg = `Capturer start failed err:${JSON.stringify(err)}}`;
                }
                else {
                    _this.returnMsg = `Capturer start success.`;
                }
            });
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(40);
        Row.margin({ top: 10 });
        Button.createWithLabel("read");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                let bufferSize = await this.audioCapturer.getBufferSize();
                this.returnMsg = `bufferSize:${bufferSize}\n`;
                this.returnMsg += `Capturer read start...\n`;
                for (let i = 0; i < 10; i++) {
                    let ArrayBuffer = await this.audioCapturer.read(bufferSize, true);
                    this.returnMsg += `${JSON.stringify(ArrayBuffer)}--`;
                }
                this.returnMsg += `Capturer read end...\n`;
            }
            catch (err) {
                this.returnMsg = `Capturer read failed err:${JSON.stringify(err)}`;
            }
        });
        Button.pop();
        Button.createWithLabel("stop");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                await this.audioCapturer.stop();
                this.returnMsg += `Capturer stop success \n`;
            }
            catch (err) {
                this.returnMsg = `Capturer stop failed err:${JSON.stringify(err)}}`;
            }
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(40);
        Row.margin({ top: 10 });
        Button.createWithLabel("release");
        Button.fontSize(20);
        Button.height(40);
        Button.backgroundColor(Color.Pink);
        Button.fontColor(Color.Blue);
        Button.onClick(async () => {
            try {
                await this.audioCapturer.release();
                this.returnMsg += `Capturer release success \n`;
                this.index = 0;
            }
            catch (err) {
                this.returnMsg = `Capturer release failed err:${JSON.stringify(err)}}`;
            }
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new CapturerStream("1", undefined, {}));
