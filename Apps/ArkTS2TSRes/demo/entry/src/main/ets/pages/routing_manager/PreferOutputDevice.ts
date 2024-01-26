interface PreferredOutputDevice_Params {
    returnMsg?: string;
    onReturnMsg?: string;
    offReturnMsg?: string;
    audioRoutingManager?;
    contentTypeList?;
    selectedContentTypeKey?: string;
    streamUsageList?;
    selectedStreamUsageKey?: string;
    audioRendererOptions?;
    outputDeviceList?;
    selectOutputDeviceList?;
    selectedOutputIndex?: number;
    outputDeviceListTag?: number;
    audioRenderer?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PreferOutputDevice_" + ++__generate__Id;
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
class PreferredOutputDevice extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertySimple('on 未监听', this, "onReturnMsg");
        this.__offReturnMsg = new ObservedPropertySimple('off 未监听', this, "offReturnMsg");
        this.audioRoutingManager = null;
        this.contentTypeList = [];
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_SPEECH", this, "selectedContentTypeKey");
        this.streamUsageList = [];
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_VOICE_COMMUNICATION", this, "selectedStreamUsageKey");
        this.audioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_SPEECH,
                usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
                rendererFlags: 0
            }
        };
        this.outputDeviceList = [];
        this.selectOutputDeviceList = [{ value: "无数据" }];
        this.__selectedOutputIndex = new ObservedPropertySimple(0, this, "selectedOutputIndex");
        this.__outputDeviceListTag = new ObservedPropertySimple(0, this, "outputDeviceListTag");
        this.audioRenderer = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PreferredOutputDevice_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.offReturnMsg !== undefined) {
            this.offReturnMsg = params.offReturnMsg;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
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
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.outputDeviceList !== undefined) {
            this.outputDeviceList = params.outputDeviceList;
        }
        if (params.selectOutputDeviceList !== undefined) {
            this.selectOutputDeviceList = params.selectOutputDeviceList;
        }
        if (params.selectedOutputIndex !== undefined) {
            this.selectedOutputIndex = params.selectedOutputIndex;
        }
        if (params.outputDeviceListTag !== undefined) {
            this.outputDeviceListTag = params.outputDeviceListTag;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__offReturnMsg.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__selectedOutputIndex.aboutToBeDeleted();
        this.__outputDeviceListTag.aboutToBeDeleted();
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
    private __offReturnMsg: ObservedPropertySimple<string>;
    get offReturnMsg() {
        return this.__offReturnMsg.get();
    }
    set offReturnMsg(newValue: string) {
        this.__offReturnMsg.set(newValue);
    }
    private audioRoutingManager;
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
    private audioRendererOptions;
    private outputDeviceList;
    private selectOutputDeviceList;
    private __selectedOutputIndex: ObservedPropertySimple<number>;
    get selectedOutputIndex() {
        return this.__selectedOutputIndex.get();
    }
    set selectedOutputIndex(newValue: number) {
        this.__selectedOutputIndex.set(newValue);
    }
    private __outputDeviceListTag: ObservedPropertySimple<number>;
    get outputDeviceListTag() {
        return this.__outputDeviceListTag.get();
    }
    set outputDeviceListTag(newValue: number) {
        this.__outputDeviceListTag.set(newValue);
    }
    private audioRenderer;
    aboutToAppear() {
        let audioManager = audio.getAudioManager();
        this.audioRoutingManager = audioManager.getRoutingManager();
        for (let key in audio.ContentType) {
            this.contentTypeList.push({ value: key });
        }
        for (let key in audio.StreamUsage) {
            this.streamUsageList.push({ value: key });
        }
        this.getSelectOutputDeviceList();
    }
    async onBackPress() {
        if (this.audioRenderer !== null) {
            await this.audioRenderer.release();
            this.audioRenderer = null;
        }
    }
    async getSelectOutputDeviceList() {
        let deviceFlag = audio.DeviceFlag.OUTPUT_DEVICES_FLAG;
        try {
            this.outputDeviceList = await this.audioRoutingManager.getDevices(deviceFlag);
            if (this.outputDeviceList.length > 0) {
                this.selectOutputDeviceList = this.getDeviceList(this.outputDeviceList);
                this.outputDeviceListTag = 1;
            }
            this.returnMsg = `getOutputDeviceList SUccess:${JSON.stringify(this.selectOutputDeviceList)}`;
        }
        catch (err) {
            this.returnMsg = `getOutputDeviceList Fail:${JSON.stringify(err)}`;
        }
    }
    getPreferredOutputDeviceForRendererInfoCallback() {
        this.audioRoutingManager.getPreferredOutputDeviceForRendererInfo(this.audioRendererOptions.rendererInfo, (err, data) => {
            if (err) {
                this.returnMsg = `getPreferredOutputDeviceForRendererInfo callback Fail:${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `getPreferredOutputDeviceForRendererInfo callback Success:${JSON.stringify(data)} \n`;
                this.returnMsg += `优先设备为：${JSON.stringify(this.getDeviceList(data))}`;
            }
        });
    }
    getPreferredOutputDeviceForRendererInfoPromise() {
        this.audioRoutingManager.getPreferredOutputDeviceForRendererInfo(this.audioRendererOptions.rendererInfo)
            .then(data => {
            this.returnMsg = `getPreferredOutputDeviceForRendererInfo promise Success:${JSON.stringify(data)} \n`;
            this.returnMsg += `优先设备为：${JSON.stringify(this.getDeviceList(data))}`;
        }).catch(err => {
            this.returnMsg = `getPreferredOutputDeviceForRendererInfo promise Fail:${JSON.stringify(err)}`;
        });
    }
    onPreferredOutputDeviceChangeForRendererInfo() {
        this.onReturnMsg = "on 监听中...";
        this.audioRoutingManager.on('preferredOutputDeviceChangeForRendererInfo', this.audioRendererOptions.rendererInfo, (audioDeviceDescriptors) => {
            this.onReturnMsg = `on 收到回调：\n`;
            this.onReturnMsg = `${JSON.stringify(audioDeviceDescriptors)}`;
        });
    }
    offPreferredOutputDeviceChangeForRendererInfo() {
        this.offReturnMsg = "off 监听中...";
        this.audioRoutingManager.off('preferredOutputDeviceChangeForRendererInfo', this.audioRendererOptions.rendererInfo, (audioDeviceDescriptors) => {
            this.offReturnMsg = `off 收到回调：\n`;
            this.offReturnMsg = `${JSON.stringify(audioDeviceDescriptors)}`;
        });
    }
    selectOutputDevice() {
        let _this = this;
        if (this.outputDeviceList.length == 0) {
            _this.returnMsg = `没有输出设备类`;
            return;
        }
        let outputAudioDeviceDescriptor = this.outputDeviceList.filter((value, index) => {
            return index == _this.selectedOutputIndex;
        });
        if (outputAudioDeviceDescriptor.length == 0) {
            _this.returnMsg = `尚未选择输出设备`;
            return;
        }
        this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor)
            .then(() => {
            _this.returnMsg = `selectOutputDevice promise Success,所选的输出设备为: \n`;
            _this.returnMsg += `${JSON.stringify(this.getDeviceList(outputAudioDeviceDescriptor))} \n`;
        }).catch(err => {
            _this.returnMsg = `selectOutputDevice promise Failed err:${JSON.stringify(err)}`;
        });
    }
    getDeviceList(deviceDescriptors) {
        let deviceList = [];
        for (let i = 0; i < deviceDescriptors.length; i++) {
            let deviceTypeName = this.getDeviceTypeNameByValue(deviceDescriptors[i].deviceType);
            deviceList.push({ value: deviceTypeName });
        }
        return deviceList;
    }
    getDeviceTypeNameByValue(value) {
        for (let key in audio.DeviceType) {
            if (audio.DeviceType[key] == value) {
                return key;
            }
        }
    }
    async renderPlay() {
        if (this.audioRenderer !== null) {
            await this.audioRenderer.release();
            this.audioRenderer = null;
        }
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOptions);
            this.returnMsg += `audioRenderer create success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let bufferSize;
        try {
            bufferSize = await this.audioRenderer.getBufferSize();
            this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`;
            await this.audioRenderer.start();
            this.returnMsg += `audioRenderer start success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let path = globalThis.pathDir + '/test_44100_2.wav';
        try {
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
                if (this.audioRenderer.state > audio.AudioState.STATE_RUNNING) {
                    return;
                }
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await this.audioRenderer.write(buf);
            }
            this.returnMsg += `audioRenderer write end. \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
        }
        await this.audioRenderer.release();
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
        Text.create("【路由管理-首选输出设备】返回数据：");
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
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Blue);
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.contentTypeList);
        Select.value(this.selectedContentTypeKey);
        Select.onSelect((index, value) => {
            this.selectedContentTypeKey = value;
            this.audioRendererOptions.rendererInfo.content = audio.ContentType[value];
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.streamUsageList);
        Select.value(this.selectedStreamUsageKey);
        Select.onSelect((index, value) => {
            this.selectedStreamUsageKey = value;
            this.audioRendererOptions.rendererInfo.usage = audio.StreamUsage[value];
        });
        Select.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(6);
        Divider.color(Color.Blue);
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.getPreferredOutputDeviceForRendererInfoCallback());
        Text.create("getPreferredOutputDeviceForRendererInfo callback");
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(30);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.getPreferredOutputDeviceForRendererInfoPromise());
        Text.create("getPreferredOutputDeviceForRendererInfo promise");
        Text.fontSize(18);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(30);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.onPreferredOutputDeviceChangeForRendererInfo());
        Text.create("on('preferredOutputDeviceChangeForRendererInfo')");
        Text.fontSize(16);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(30);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.onReturnMsg);
        Text.fontSize(20);
        Text.lineHeight(30);
        Text.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.offPreferredOutputDeviceChangeForRendererInfo());
        Text.create("off");
        Text.fontSize(16);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Text.create(this.offReturnMsg);
        Text.fontSize(20);
        Text.lineHeight(30);
        Text.pop();
        If.create();
        if (this.outputDeviceListTag == 1) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Text.create("输出设备");
            Text.fontSize(20);
            Text.margin({ left: 10 });
            Text.pop();
            Select.create(this.selectOutputDeviceList);
            Select.value(this.selectOutputDeviceList[this.selectedOutputIndex].value);
            Select.onSelect((index, value) => {
                this.selectedOutputIndex = index;
            });
            Select.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 20 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDevice());
        Text.create("selectOutputDevice");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.renderPlay());
        Button.backgroundColor(Color.Pink);
        Text.create("播放音频数据");
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
loadDocument(new PreferredOutputDevice("1", undefined, {}));
