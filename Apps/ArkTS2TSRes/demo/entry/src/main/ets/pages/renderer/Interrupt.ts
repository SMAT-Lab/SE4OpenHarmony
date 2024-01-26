interface Interrupt_Params {
    audioRendererOptions?;
    audioRenderers?;
    paths?;
    returnMsg?: string;
    onReturnMsgs?: Array<string>;
    bufferSize?: number;
    arr?;
    modes?: Array<number>;
    selectedContentTypeKeys?: Array<string>;
    selectedStreamUsageKeys?: Array<string>;
    volumeTypeList?;
    selectedVolumeTypeKeys?: Array<string>;
    renderInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Interrupt_" + ++__generate__Id;
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
class Interrupt extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioRendererOptions = [
            {
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
            },
            {
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
            }
        ];
        this.audioRenderers = [null, null];
        this.paths = [globalThis.pathDir + '/test_44100_2.wav', globalThis.pathDir + '/safe_and_sound_32.wav'];
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__onReturnMsgs = new ObservedPropertyObject([`hello`, `hello`], this, "onReturnMsgs");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.arr = [0, 1];
        this.__modes = new ObservedPropertyObject([1, 1], this, "modes");
        this.__selectedContentTypeKeys = new ObservedPropertyObject(["CONTENT_TYPE_MUSIC", "CONTENT_TYPE_MUSIC"], this, "selectedContentTypeKeys");
        this.__selectedStreamUsageKeys = new ObservedPropertyObject(["STREAM_USAGE_MEDIA", "STREAM_USAGE_MEDIA"], this, "selectedStreamUsageKeys");
        this.volumeTypeList = [];
        this.__selectedVolumeTypeKeys = new ObservedPropertyObject(["请选择流类型", "请选择流类型"], this, "selectedVolumeTypeKeys");
        this.renderInfo = {
            'RINGTONE': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_RINGTONE',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'MEDIA': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'VOICE_CALL': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_VOICE_COMMUNICATION'
                }
            },
            'VOICE_ASSISTANT': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            },
            'ALL': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_MEDIA'
                }
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Interrupt_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
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
        if (params.onReturnMsgs !== undefined) {
            this.onReturnMsgs = params.onReturnMsgs;
        }
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.modes !== undefined) {
            this.modes = params.modes;
        }
        if (params.selectedContentTypeKeys !== undefined) {
            this.selectedContentTypeKeys = params.selectedContentTypeKeys;
        }
        if (params.selectedStreamUsageKeys !== undefined) {
            this.selectedStreamUsageKeys = params.selectedStreamUsageKeys;
        }
        if (params.volumeTypeList !== undefined) {
            this.volumeTypeList = params.volumeTypeList;
        }
        if (params.selectedVolumeTypeKeys !== undefined) {
            this.selectedVolumeTypeKeys = params.selectedVolumeTypeKeys;
        }
        if (params.renderInfo !== undefined) {
            this.renderInfo = params.renderInfo;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsgs.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__modes.aboutToBeDeleted();
        this.__selectedContentTypeKeys.aboutToBeDeleted();
        this.__selectedStreamUsageKeys.aboutToBeDeleted();
        this.__selectedVolumeTypeKeys.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioRendererOptions;
    private audioRenderers;
    private paths;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __onReturnMsgs: ObservedPropertyObject<Array<string>>;
    get onReturnMsgs() {
        return this.__onReturnMsgs.get();
    }
    set onReturnMsgs(newValue: Array<string>) {
        this.__onReturnMsgs.set(newValue);
    }
    private __bufferSize: ObservedPropertySimple<number>;
    get bufferSize() {
        return this.__bufferSize.get();
    }
    set bufferSize(newValue: number) {
        this.__bufferSize.set(newValue);
    }
    private arr;
    private __modes: ObservedPropertyObject<Array<number>>;
    get modes() {
        return this.__modes.get();
    }
    set modes(newValue: Array<number>) {
        this.__modes.set(newValue);
    }
    private __selectedContentTypeKeys: ObservedPropertyObject<Array<string>>;
    get selectedContentTypeKeys() {
        return this.__selectedContentTypeKeys.get();
    }
    set selectedContentTypeKeys(newValue: Array<string>) {
        this.__selectedContentTypeKeys.set(newValue);
    }
    private __selectedStreamUsageKeys: ObservedPropertyObject<Array<string>>;
    get selectedStreamUsageKeys() {
        return this.__selectedStreamUsageKeys.get();
    }
    set selectedStreamUsageKeys(newValue: Array<string>) {
        this.__selectedStreamUsageKeys.set(newValue);
    }
    private volumeTypeList;
    private __selectedVolumeTypeKeys: ObservedPropertyObject<Array<string>>;
    get selectedVolumeTypeKeys() {
        return this.__selectedVolumeTypeKeys.get();
    }
    set selectedVolumeTypeKeys(newValue: Array<string>) {
        this.__selectedVolumeTypeKeys.set(newValue);
    }
    private renderInfo;
    //@State mode:number=1
    aboutToAppear() {
        for (let key in audio.AudioVolumeType) {
            this.volumeTypeList.push({ value: key });
        }
    }
    async onBackPress() {
        if (this.audioRenderers[0] !== null) {
            await this.audioRenderers[0].release();
        }
        if (this.audioRenderers[1] !== null) {
            await this.audioRenderers[1].release();
        }
    }
    createAudioRenderer(index) {
        if (this.selectedVolumeTypeKeys[index] == "请选择流类型") {
            this.returnMsg += `audioRenderer ${index}  请选择流类型\n`;
            return;
        }
        if (this.audioRenderers[index] !== null) {
            this.returnMsg = `audioRenderer ${index} Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioRenderer(this.audioRendererOptions[index], async (err, data) => {
            console.error("this.audioRendererOptions----------" + index + "------:" + JSON.stringify(this.audioRendererOptions[index]));
            if (err) {
                _this.returnMsg = `audioRenderer ${index} Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioRenderers[index] = data;
                _this.returnMsg += `audioRenderer ${index} Created : SUCCESS,state:${_this.audioRenderers[index].state}\n`;
            }
        });
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
    async writeRenderer(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg += `audioRenderer ${index} instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioRenderers[index].getBufferSize();
        }
        let _this = this;
        let path = this.paths[index];
        try {
            let stat = await fs.stat(path);
            let len = stat.size % this.bufferSize == 0 ? Math.floor(stat.size / this.bufferSize) : Math.floor(stat.size / this.bufferSize + 1);
            let file = await fs.open(path, 0o0);
            let buf = new ArrayBuffer(this.bufferSize);
            this.returnMsg = `audioRenderer ${index} write start.......... \n`;
            while (true) {
                for (let i = 0; i < len; i++) {
                    let options = {
                        offset: i * this.bufferSize,
                        length: this.bufferSize
                    };
                    let readsize = await fs.read(file.fd, buf, options);
                    await this.audioRenderers[index].write(buf);
                }
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
            }
        });
    }
    setInterruptModeCallback(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to setInterruptModeCallback\n`;
            return;
        }
        let mode = this.modes[index];
        let _this = this;
        this.audioRenderers[index].setInterruptMode(mode, (err, data) => {
            if (err) {
                _this.returnMsg = `audioRenderer ${index} setInterruptMode callback : Error: ${JSON.stringify(err)}\n`;
            }
            _this.returnMsg = `audioRenderer ${index} setInterruptMode callback : Success\n`;
        });
    }
    setInterruptModePromise(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to setInterruptModePromise\n`;
            return;
        }
        let mode = this.modes[index];
        let _this = this;
        this.audioRenderers[index].setInterruptMode(mode)
            .then(() => {
            _this.returnMsg = `audioRenderer ${index} setInterruptMode promise : Success\n`;
        })
            .catch(err => {
            _this.returnMsg = `audioRenderer ${index} setInterruptMode promise : Error: ${JSON.stringify(err)}\n`;
        });
    }
    onInterrupt(index) {
        if (this.audioRenderers[index] == null) {
            this.returnMsg = `audioRenderer ${index} instance had not created,dont‘t allow to onInterrupt \n`;
            return;
        }
        let _this = this;
        _this.onReturnMsgs[index] = `已监听`;
        this.audioRenderers[index].on('audioInterrupt', async (interruptEvent) => {
            //console.log('interruptEvent:'+JSON.stringify(interruptEvent))
            _this.onReturnMsgs[index] = JSON.stringify(interruptEvent);
            if (interruptEvent.hintType == 2 || interruptEvent.hintType == 3) {
                await _this.audioRenderers[index].pause();
            }
            else if (interruptEvent.hintType == 1) {
                await _this.audioRenderers[index].start();
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
        Text.create("【音频渲染-音频打断】返回数据：");
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
            Row.margin({ top: 20 });
            Select.create(this.volumeTypeList);
            Select.value(this.selectedVolumeTypeKeys[item]);
            Select.onSelect((index, value) => {
                this.selectedVolumeTypeKeys[item] = value;
                this.audioRendererOptions[item].rendererInfo = this.renderInfo[this.selectedVolumeTypeKeys[item]].main;
                this.selectedStreamUsageKeys[item] = this.renderInfo[this.selectedVolumeTypeKeys[item]].info.selectedStreamUsageKey;
                this.selectedContentTypeKeys[item] = this.renderInfo[this.selectedVolumeTypeKeys[item]].info.selectedContentTypeKey;
            });
            Select.pop();
            Row.pop();
            If.create();
            if (this.selectedVolumeTypeKeys[item] !== "请选择流类型") {
                If.branchId(0);
                Text.create(this.selectedContentTypeKeys[item]);
                Text.fontSize(16);
                Text.lineHeight(40);
                Text.pop();
                Text.create(this.selectedStreamUsageKeys[item]);
                Text.fontSize(16);
                Text.lineHeight(40);
                Text.pop();
            }
            If.pop();
            Divider.create();
            Divider.strokeWidth(2);
            Divider.color(Color.Blue);
            Row.create();
            Text.create("焦点模式");
            Text.fontSize(24);
            Text.pop();
            Radio.create({ value: `mute${item}1`, group: `modeGroup${item}` });
            Radio.onChange((isChecked) => {
                if (isChecked) {
                    this.modes[item] = 0;
                }
                else {
                    this.modes[item] = 1;
                }
            });
            Radio.checked(this.modes[item] == 0);
            Text.create("共享焦点");
            Text.fontSize(18);
            Text.pop();
            Radio.create({ value: `mute${item}2`, group: `modeGroup${item}` });
            Radio.onChange((isChecked) => {
                if (isChecked) {
                    this.modes[item] = 1;
                }
                else {
                    this.modes[item] = 0;
                }
            });
            Radio.checked(this.modes[item] == 1);
            Text.create("独立焦点");
            Text.fontSize(18);
            Text.pop();
            Row.pop();
            Text.create(`焦点数据：${this.modes[item]}`);
            Text.fontSize(24);
            Text.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.onClick(() => {
                this.setInterruptModeCallback(item);
            });
            Text.create("setInterruptMode callback");
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.onClick(() => {
                this.setInterruptModePromise(item);
            });
            Text.create("setInterruptMode promise");
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
            Button.width('100%');
            Button.height(60);
            Button.onClick(() => {
                this.onInterrupt(item);
            });
            Text.create("onInterrupt");
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
            Text.create(this.onReturnMsgs[item]);
            Text.fontSize(22);
            Text.pop();
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
loadDocument(new Interrupt("1", undefined, {}));
