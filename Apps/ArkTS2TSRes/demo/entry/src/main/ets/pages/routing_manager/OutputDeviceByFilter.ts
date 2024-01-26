interface OutputDeviceByFilter_Params {
    returnMsg?: string;
    onReturnMsg?: string;
    audioStreamManager?;
    audioRendererInfoArray?;
    audioRoutingManager?;
    selectedCommunicationDeviceKey?: string;
    selectedCommunicationDeviceVal?: number;
    active?: boolean;
    audioDeviceDescriptors?;
    outputDeviceList?;
    deviceTag?: number;
    streamTag?: number;
    selectedOutputDeviceIndex?: number;
    audioRendererOptions1?;
    audioRendererOptions2?;
    fileName1?;
    fileName2?;
    streamIdList?;
    audioRendererFilterList?;
    selectedStreamIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OutputDeviceByFilter_" + ++__generate__Id;
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
import prompt from '@ohos.prompt';
import fs from '@ohos.file.fs';
class OutputDeviceByFilter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertySimple('Hello World', this, "onReturnMsg");
        this.audioStreamManager = audio.getAudioManager().getStreamManager();
        this.audioRendererInfoArray = [];
        this.audioRoutingManager = null;
        this.__selectedCommunicationDeviceKey = new ObservedPropertySimple("请选择设备类型", this, "selectedCommunicationDeviceKey");
        this.__selectedCommunicationDeviceVal = new ObservedPropertySimple(0, this, "selectedCommunicationDeviceVal");
        this.__active = new ObservedPropertySimple(false, this, "active");
        this.audioDeviceDescriptors = [];
        this.outputDeviceList = [{ value: '无数据' }];
        this.__deviceTag = new ObservedPropertySimple(-1, this, "deviceTag");
        this.__streamTag = new ObservedPropertySimple(-1, this, "streamTag");
        this.__selectedOutputDeviceIndex = new ObservedPropertySimple(0, this, "selectedOutputDeviceIndex");
        this.audioRendererOptions1 = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_MUSIC,
                usage: audio.StreamUsage.STREAM_USAGE_NOTIFICATION_RINGTONE,
                rendererFlags: 0
            }
        };
        this.audioRendererOptions2 = {
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
        this.fileName1 = 'test_44100_2.wav';
        this.fileName2 = 'safe_and_sound_32.wav';
        this.streamIdList = [{ value: "无数据" }];
        this.audioRendererFilterList = [];
        this.__selectedStreamIndex = new ObservedPropertySimple(0, this, "selectedStreamIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OutputDeviceByFilter_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
        }
        if (params.audioRendererInfoArray !== undefined) {
            this.audioRendererInfoArray = params.audioRendererInfoArray;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
        if (params.selectedCommunicationDeviceKey !== undefined) {
            this.selectedCommunicationDeviceKey = params.selectedCommunicationDeviceKey;
        }
        if (params.selectedCommunicationDeviceVal !== undefined) {
            this.selectedCommunicationDeviceVal = params.selectedCommunicationDeviceVal;
        }
        if (params.active !== undefined) {
            this.active = params.active;
        }
        if (params.audioDeviceDescriptors !== undefined) {
            this.audioDeviceDescriptors = params.audioDeviceDescriptors;
        }
        if (params.outputDeviceList !== undefined) {
            this.outputDeviceList = params.outputDeviceList;
        }
        if (params.deviceTag !== undefined) {
            this.deviceTag = params.deviceTag;
        }
        if (params.streamTag !== undefined) {
            this.streamTag = params.streamTag;
        }
        if (params.selectedOutputDeviceIndex !== undefined) {
            this.selectedOutputDeviceIndex = params.selectedOutputDeviceIndex;
        }
        if (params.audioRendererOptions1 !== undefined) {
            this.audioRendererOptions1 = params.audioRendererOptions1;
        }
        if (params.audioRendererOptions2 !== undefined) {
            this.audioRendererOptions2 = params.audioRendererOptions2;
        }
        if (params.fileName1 !== undefined) {
            this.fileName1 = params.fileName1;
        }
        if (params.fileName2 !== undefined) {
            this.fileName2 = params.fileName2;
        }
        if (params.streamIdList !== undefined) {
            this.streamIdList = params.streamIdList;
        }
        if (params.audioRendererFilterList !== undefined) {
            this.audioRendererFilterList = params.audioRendererFilterList;
        }
        if (params.selectedStreamIndex !== undefined) {
            this.selectedStreamIndex = params.selectedStreamIndex;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__selectedCommunicationDeviceKey.aboutToBeDeleted();
        this.__selectedCommunicationDeviceVal.aboutToBeDeleted();
        this.__active.aboutToBeDeleted();
        this.__deviceTag.aboutToBeDeleted();
        this.__streamTag.aboutToBeDeleted();
        this.__selectedOutputDeviceIndex.aboutToBeDeleted();
        this.__selectedStreamIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
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
    private audioStreamManager;
    private audioRendererInfoArray;
    private audioRoutingManager;
    private __selectedCommunicationDeviceKey: ObservedPropertySimple<string>;
    get selectedCommunicationDeviceKey() {
        return this.__selectedCommunicationDeviceKey.get();
    }
    set selectedCommunicationDeviceKey(newValue: string) {
        this.__selectedCommunicationDeviceKey.set(newValue);
    }
    private __selectedCommunicationDeviceVal: ObservedPropertySimple<number>;
    get selectedCommunicationDeviceVal() {
        return this.__selectedCommunicationDeviceVal.get();
    }
    set selectedCommunicationDeviceVal(newValue: number) {
        this.__selectedCommunicationDeviceVal.set(newValue);
    }
    private __active: ObservedPropertySimple<boolean>;
    get active() {
        return this.__active.get();
    }
    set active(newValue: boolean) {
        this.__active.set(newValue);
    }
    private audioDeviceDescriptors;
    private outputDeviceList;
    private __deviceTag: ObservedPropertySimple<number>;
    get deviceTag() {
        return this.__deviceTag.get();
    }
    set deviceTag(newValue: number) {
        this.__deviceTag.set(newValue);
    }
    private __streamTag: ObservedPropertySimple<number>;
    get streamTag() {
        return this.__streamTag.get();
    }
    set streamTag(newValue: number) {
        this.__streamTag.set(newValue);
    }
    private __selectedOutputDeviceIndex: ObservedPropertySimple<number>;
    get selectedOutputDeviceIndex() {
        return this.__selectedOutputDeviceIndex.get();
    }
    set selectedOutputDeviceIndex(newValue: number) {
        this.__selectedOutputDeviceIndex.set(newValue);
    }
    private audioRendererOptions1;
    private audioRendererOptions2;
    private fileName1;
    private fileName2;
    private streamIdList;
    private audioRendererFilterList;
    private __selectedStreamIndex: ObservedPropertySimple<number>;
    get selectedStreamIndex() {
        return this.__selectedStreamIndex.get();
    }
    set selectedStreamIndex(newValue: number) {
        this.__selectedStreamIndex.set(newValue);
    }
    aboutToAppear() {
        let audioManager = audio.getAudioManager();
        this.audioRoutingManager = audioManager.getRoutingManager();
    }
    onBackPress() {
    }
    async createaudioRenderStream(fileName, audioRendererOptions) {
        let audioRenderer = null;
        let bufferSize;
        try {
            audioRenderer = await audio.createAudioRenderer(audioRendererOptions);
            this.audioRendererInfoArray = await this.audioStreamManager.getCurrentAudioRendererInfoArray();
            console.log(`this.audioRendererInfoArray:${JSON.stringify(this.audioRendererInfoArray)}`);
            this.audioRendererFilterList = [];
            this.streamIdList = [];
            for (let i = 0; i < this.audioRendererInfoArray.length; i++) {
                let audioRendererInfo = this.audioRendererInfoArray[i];
                this.streamIdList.push({ value: "音频流ID:" + audioRendererInfo.streamId });
                let option = {
                    uid: audioRendererInfo.clientUid,
                    rendererId: audioRendererInfo.streamId
                };
                this.audioRendererFilterList.push(option);
            }
            if (this.streamIdList.length > 1) {
                this.streamTag = 1;
            }
        }
        catch (err) {
            this.returnMsg = `createAudioRenderer Error: ${JSON.stringify(err)}`;
            return;
        }
        try {
            await audioRenderer.start();
            bufferSize = await audioRenderer.getBufferSize();
        }
        catch (err) {
            this.returnMsg = `start Error: ${JSON.stringify(err)}`;
            return;
        }
        try {
            let path = globalThis.pathDir + '/' + fileName;
            this.returnMsg += `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
            this.returnMsg += `size:${stat.size}\n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            this.returnMsg += `fd:${file.fd}\n`;
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg += `audioRenderer write start.......... \n`;
            for (let i = 0; i < len; i++) {
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await audioRenderer.write(buf);
            }
            this.returnMsg += `audioRenderer write end. \n`;
        }
        catch (err) {
            this.returnMsg += `AudioRenderer write Error:${JSON.stringify(err)}`;
            return;
        }
        try {
            await audioRenderer.stop();
            await audioRenderer.release();
        }
        catch (err) {
            this.returnMsg = `start Error: ${JSON.stringify(err)}`;
            return;
        }
    }
    getDeviceTypeNameByValue(value) {
        for (let key in audio.DeviceType) {
            if (audio.DeviceType[key] == value) {
                return key;
            }
        }
    }
    getDeviceList(deviceDescriptors) {
        let deviceList = [];
        for (let i = 0; i < deviceDescriptors.length; i++) {
            let deviceTypeName = this.getDeviceTypeNameByValue(deviceDescriptors[i].deviceType);
            deviceList.push({ value: deviceTypeName });
        }
        return deviceList;
    }
    async getOutputAudioDevices() {
        try {
            this.audioDeviceDescriptors = await this.audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG);
            this.returnMsg = `getOutputAudioDevices Success1: ${JSON.stringify(this.audioDeviceDescriptors)}`;
            this.outputDeviceList = this.getDeviceList(this.audioDeviceDescriptors);
            if (this.outputDeviceList.length > 0) {
                this.deviceTag = 1;
            }
            // this.returnMsg = `getOutputAudioDevices SUccess2: ${JSON.stringify(this.outputDeviceList)}`
        }
        catch (err) {
            this.returnMsg = `getOutputAudioDevices Error: ${JSON.stringify(err)}`;
        }
    }
    selectOutputDeviceByFilterCallback() {
        if (this.audioDeviceDescriptors.length == 0) {
            this.returnMsg = `没有输出设备类`;
            return;
        }
        let outputAudioDeviceDescriptor = this.audioDeviceDescriptors.filter((value, index) => {
            return index == this.selectedOutputDeviceIndex;
        });
        if (outputAudioDeviceDescriptor.length == 0) {
            this.returnMsg = `尚未选择输出设备`;
            return;
        }
        if (this.audioRendererFilterList.length == 0) {
            this.returnMsg = `尚未生成流ID组`;
            return;
        }
        let outputAudioRendererFilter = this.audioRendererFilterList[this.selectedStreamIndex];
        this.returnMsg = `audioDeviceDescriptors: ${JSON.stringify(outputAudioDeviceDescriptor)}\n`;
        this.returnMsg += `filter: ${JSON.stringify(outputAudioRendererFilter)}\n`;
        let _this = this;
        this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, outputAudioDeviceDescriptor, (err) => {
            if (err) {
                _this.returnMsg += `selectOutputDeviceByFilter callback Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg += `selectOutputDeviceByFilter callback Success`;
            }
        });
    }
    selectOutputDeviceByFilterPromise() {
        if (this.audioDeviceDescriptors.length == 0) {
            this.returnMsg = `没有输出设备类`;
            return;
        }
        let outputAudioDeviceDescriptor = this.audioDeviceDescriptors.filter((value, index) => {
            return index == this.selectedOutputDeviceIndex;
        });
        if (outputAudioDeviceDescriptor.length == 0) {
            this.returnMsg = `尚未选择输出设备`;
            return;
        }
        if (this.audioRendererFilterList.length == 0) {
            this.returnMsg = `尚未生成流ID组`;
            return;
        }
        let outputAudioRendererFilter = this.audioRendererFilterList[this.selectedStreamIndex];
        this.returnMsg = `audioDeviceDescriptors: ${JSON.stringify(outputAudioDeviceDescriptor)}\n`;
        this.returnMsg += `filter: ${JSON.stringify(outputAudioRendererFilter)}\n`;
        let _this = this;
        this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, outputAudioDeviceDescriptor)
            .then(() => {
            _this.returnMsg += `selectOutputDeviceByFilter promise Success`;
        }).catch(err => {
            _this.returnMsg += `selectOutputDeviceByFilter promise Error: ${JSON.stringify(err)}\n`;
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
        Column.height(220);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【路由管理-过滤输出设备】返回数据：");
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
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.getOutputAudioDevices());
        Button.backgroundColor(Color.Pink);
        Text.create("获取输出设备");
        Text.fontSize(24);
        Text.fontColor(Color.Blue);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.selectOutputDeviceByFilterCallback());
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.createaudioRenderStream(this.fileName1, this.audioRendererOptions1));
        Text.create("audioRender1");
        Text.fontSize(24);
        Text.fontColor(Color.Blue);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.selectOutputDeviceByFilterCallback());
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => this.createaudioRenderStream(this.fileName2, this.audioRendererOptions2));
        Text.create("audioRender2");
        Text.fontSize(24);
        Text.fontColor(Color.Blue);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('80%');
        Text.create("audioRender1 和 audioRender2 都触发后，方可生成流ID组");
        Text.fontSize(16);
        Text.fontColor(Color.Blue);
        Text.pop();
        Row.pop();
        If.create();
        if (this.deviceTag > 0) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Text.create("输出设备：");
            Text.fontSize(26);
            Text.pop();
            Select.create(this.outputDeviceList);
            Select.value(this.outputDeviceList[this.selectedOutputDeviceIndex].value);
            Select.onSelect((index, value) => {
                this.selectedOutputDeviceIndex = index;
            });
            Select.pop();
            Row.pop();
        }
        If.pop();
        If.create();
        if (this.streamTag > 0) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Text.create("流ID：");
            Text.fontSize(26);
            Text.pop();
            Select.create(this.streamIdList);
            Select.value(this.streamIdList[this.selectedStreamIndex].value);
            Select.onSelect((index, value) => {
                this.selectedStreamIndex = index;
            });
            Select.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.selectOutputDeviceByFilterCallback());
        Text.create("selectOutputDeviceByFilter callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.selectOutputDeviceByFilterPromise());
        Text.create("selectOutputDeviceByFilter promise");
        Text.fontSize(22);
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
loadDocument(new OutputDeviceByFilter("1", undefined, {}));
