interface DeviceChangeCallback_Params {
    audioCapturerOptions?;
    audioCapturer?;
    returnMsg?: string;
    onReturnMsg?: string;
    callbackStatus1?: string;
    callbackStatus2?: string;
    returnCallbackMsg1?: string;
    returnCallbackMsg2?: string;
    callback1?;
    callback2?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeviceChangeCallback_" + ++__generate__Id;
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
class DeviceChangeCallback extends View {
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
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertySimple(`hello`, this, "onReturnMsg");
        this.__callbackStatus1 = new ObservedPropertySimple(`未注册`, this, "callbackStatus1");
        this.__callbackStatus2 = new ObservedPropertySimple(`未注册`, this, "callbackStatus2");
        this.__returnCallbackMsg1 = new ObservedPropertySimple(``, this, "returnCallbackMsg1");
        this.__returnCallbackMsg2 = new ObservedPropertySimple(``, this, "returnCallbackMsg2");
        this.callback1 = (callback) => {
            this.returnCallbackMsg1 = this.getDeviceChangeInfo(callback);
        };
        this.callback2 = (callback) => {
            this.returnCallbackMsg2 = this.getDeviceChangeInfo(callback);
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeviceChangeCallback_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioCapturer !== undefined) {
            this.audioCapturer = params.audioCapturer;
        }
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.callbackStatus1 !== undefined) {
            this.callbackStatus1 = params.callbackStatus1;
        }
        if (params.callbackStatus2 !== undefined) {
            this.callbackStatus2 = params.callbackStatus2;
        }
        if (params.returnCallbackMsg1 !== undefined) {
            this.returnCallbackMsg1 = params.returnCallbackMsg1;
        }
        if (params.returnCallbackMsg2 !== undefined) {
            this.returnCallbackMsg2 = params.returnCallbackMsg2;
        }
        if (params.callback1 !== undefined) {
            this.callback1 = params.callback1;
        }
        if (params.callback2 !== undefined) {
            this.callback2 = params.callback2;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__callbackStatus1.aboutToBeDeleted();
        this.__callbackStatus2.aboutToBeDeleted();
        this.__returnCallbackMsg1.aboutToBeDeleted();
        this.__returnCallbackMsg2.aboutToBeDeleted();
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
    private __onReturnMsg: ObservedPropertySimple<string>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: string) {
        this.__onReturnMsg.set(newValue);
    }
    private __callbackStatus1: ObservedPropertySimple<string>;
    get callbackStatus1() {
        return this.__callbackStatus1.get();
    }
    set callbackStatus1(newValue: string) {
        this.__callbackStatus1.set(newValue);
    }
    private __callbackStatus2: ObservedPropertySimple<string>;
    get callbackStatus2() {
        return this.__callbackStatus2.get();
    }
    set callbackStatus2(newValue: string) {
        this.__callbackStatus2.set(newValue);
    }
    private __returnCallbackMsg1: ObservedPropertySimple<string>;
    get returnCallbackMsg1() {
        return this.__returnCallbackMsg1.get();
    }
    set returnCallbackMsg1(newValue: string) {
        this.__returnCallbackMsg1.set(newValue);
    }
    private __returnCallbackMsg2: ObservedPropertySimple<string>;
    get returnCallbackMsg2() {
        return this.__returnCallbackMsg2.get();
    }
    set returnCallbackMsg2(newValue: string) {
        this.__returnCallbackMsg2.set(newValue);
    }
    createAudioCapturer() {
        if (this.audioCapturer !== null) {
            this.returnMsg = `AudioCapturer Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioCapturer(this.audioCapturerOptions, async (err, data) => {
            if (err) {
                _this.returnMsg = `AudioCapturer Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioCapturer = data;
                _this.returnMsg = `AudioCapturer Created : SUCCESS,state:${_this.audioCapturer.state}\n`;
                _this.onReturnMsg = "无监听";
            }
        });
    }
    async onBackPress() {
        if (this.audioCapturer == null) {
            this.returnMsg += `audioCapturer instance had not created\n`;
            return;
        }
        await this.audioCapturer.release();
        this.audioCapturer = null;
    }
    getDeviceChangeInfo(DeviceChangeInfo) {
        let str = ``;
        for (let i = 0; i < DeviceChangeInfo.length; i++) {
            let descriptor = DeviceChangeInfo[i];
            str += `第${i}条\n Id:${descriptor.id},\nType:${descriptor.deviceType},\nRole:${descriptor.deviceRole},\nName:${descriptor.name},
      Address:${descriptor.address},\nSampleRates:${descriptor.sampleRates[0]},\nChannelCounts:${descriptor.channelCounts[0]},
      ChannelMask:${descriptor.channelMasks[0]},\nEncodingType:${descriptor.encodingTypes[0]}\n`;
        }
        return str;
    }
    private callback1;
    private callback2;
    render() {
        Column.create();
        Row.create();
        Row.position({ x: 0, y: 3 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(65);
        Column.backgroundColor(Color.Green);
        Column.position({ x: '1%' });
        Text.create("Callback1状态：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.callbackStatus1);
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 145, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create("Callback2状态：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.callbackStatus2);
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 145, y: 30 });
        Text.fontSize(18);
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('98%');
        Column.height(430);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%', y: 70 });
        Text.create("Callback1返回值：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnCallbackMsg1);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Text.create("Callback2返回值：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 200 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnCallbackMsg2);
        Text.position({ x: 10, y: 230 });
        Text.fontSize(14);
        Text.pop();
        Text.create(this.returnMsg);
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 390 });
        Text.fontSize(18);
        Text.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.margin({ top: 500 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(40);
        Button.onClick(() => {
            this.createAudioCapturer();
            this.callbackStatus1 = '未注册\n';
            this.callbackStatus2 = '未注册\n';
            this.returnCallbackMsg1 = '';
            this.returnCallbackMsg2 = '';
        });
        Button.backgroundColor(Color.Pink);
        Text.create("创建AudioCapturer");
        Text.fontSize(22);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioCapturer.on('inputDeviceChange', this.callback1);
            _this.callbackStatus1 = 'Callback1监听中.....\n';
        });
        Text.create("监听Callback1");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioCapturer.on('inputDeviceChange', this.callback2);
            _this.callbackStatus2 = 'Callback2监听中.....\n';
        });
        Text.create("监听Callback2");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 5, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioCapturer.off('inputDeviceChange', this.callback1);
            _this.callbackStatus1 = '已取消Callback1注册\n';
            _this.returnCallbackMsg1 = '';
        });
        Text.create("取消Callback1");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('50%');
        Button.height(40);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioCapturer.off('inputDeviceChange', this.callback2);
            _this.callbackStatus2 = '已取消Callback2注册\n';
            _this.returnCallbackMsg2 = '';
        });
        Text.create("取消Callback2");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(40);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            if (this.audioCapturer == null) {
                this.returnMsg = `audioCapturer instance had not created,dont‘t allow to listener device change\n`;
                return;
            }
            let _this = this;
            this.audioCapturer.off('inputDeviceChange');
            _this.callbackStatus1 = '未注册\n';
            _this.callbackStatus2 = '未注册\n';
            _this.returnCallbackMsg1 = '';
            _this.returnCallbackMsg2 = '';
        });
        Text.create("取消所有监听");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new DeviceChangeCallback("1", undefined, {}));
