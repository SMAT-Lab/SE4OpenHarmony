interface CapturerInterruptCapturer_Params {
    audioCapturerOptions?;
    audioCapturers?;
    audioRenderers?;
    paths?;
    returnMsg?: string;
    onReturnMsg?: Array<string>;
    bufferSize?: number;
    isBlockingRead?: boolean;
    arr?;
    sourceTypeList?;
    selectedSourceTypeKey?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CapturerInterruptCapturer_" + ++__generate__Id;
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
class CapturerInterruptCapturer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioCapturerOptions = [
            {
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
            },
            {
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
            }
        ];
        this.audioCapturers = [null, null];
        this.audioRenderers = [null, null];
        this.paths = ["", ""];
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertyObject([`未监听`, `未监听`], this, "onReturnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.arr = [0, 1];
        this.sourceTypeList = [];
        this.__selectedSourceTypeKey = new ObservedPropertyObject(["请选择音源类型", "请选择音源类型"], this, "selectedSourceTypeKey");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CapturerInterruptCapturer_Params) {
        if (params.audioCapturerOptions !== undefined) {
            this.audioCapturerOptions = params.audioCapturerOptions;
        }
        if (params.audioCapturers !== undefined) {
            this.audioCapturers = params.audioCapturers;
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
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.isBlockingRead !== undefined) {
            this.isBlockingRead = params.isBlockingRead;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
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
        this.__onReturnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__isBlockingRead.aboutToBeDeleted();
        this.__selectedSourceTypeKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioCapturerOptions;
    private audioCapturers;
    private audioRenderers;
    private paths;
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __onReturnMsg: ObservedPropertyObject<Array<string>>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: Array<string>) {
        this.__onReturnMsg.set(newValue);
    }
    private __bufferSize: ObservedPropertySimple<number>;
    get bufferSize() {
        return this.__bufferSize.get();
    }
    set bufferSize(newValue: number) {
        this.__bufferSize.set(newValue);
    }
    private __isBlockingRead: ObservedPropertySimple<boolean>;
    get isBlockingRead() {
        return this.__isBlockingRead.get();
    }
    set isBlockingRead(newValue: boolean) {
        this.__isBlockingRead.set(newValue);
    }
    private arr;
    private sourceTypeList;
    private __selectedSourceTypeKey: ObservedPropertyObject<Array<string>>;
    get selectedSourceTypeKey() {
        return this.__selectedSourceTypeKey.get();
    }
    set selectedSourceTypeKey(newValue: Array<string>) {
        this.__selectedSourceTypeKey.set(newValue);
    }
    aboutToAppear() {
        for (let key in audio.SourceType) {
            if (key === "SOURCE_TYPE_INVALID") {
                continue;
            }
            this.sourceTypeList.push({ value: key });
        }
    }
    async onBackPress() {
        if (this.audioCapturers[0] !== null) {
            await this.audioCapturers[0].release();
            this.audioCapturers[0] = null;
        }
        if (this.audioCapturers[1] !== null) {
            await this.audioCapturers[0].release();
            this.audioCapturers[1] = null;
        }
        if (this.audioRenderers[0] !== null) {
            await this.audioRenderers[0].release();
            this.audioRenderers[0] = null;
        }
        if (this.audioRenderers[1] !== null) {
            await this.audioRenderers[1].release();
            this.audioRenderers[1] = null;
        }
    }
    createAudioCapturer(index) {
        if (this.audioCapturers[index] !== null) {
            this.returnMsg = `AudioCapturer ${index} Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioCapturer(this.audioCapturerOptions[index], async (err, data) => {
            if (err) {
                _this.returnMsg = `AudioCapturer ${index} Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioCapturers[index] = data;
                _this.returnMsg = `AudioCapturer ${index} Created : SUCCESS,state:${_this.audioCapturers[index].state}\n`;
                _this.returnMsg += `${JSON.stringify(this.audioCapturerOptions[index])}`;
            }
        });
    }
    capturerStart(index) {
        if (this.audioCapturers[index] == null) {
            this.returnMsg = `AudioCapturer ${index} instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioCapturers[index].start((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer ${index} start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer ${index} start : SUCCESS,state:${_this.audioCapturers[index].state}\n`;
            }
        });
    }
    async readCapturer(indexc) {
        if (this.audioCapturers[indexc] == null) {
            this.returnMsg = `AudioCapturer ${indexc} instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioCapturers[indexc].getBufferSize();
        }
        let _this = this;
        //READ 5S
        let start = new Date().getTime();
        let end = new Date().getTime();
        let buffer = null;
        _this.returnMsg += `AudioCapturer${indexc}  read start.....\n `;
        let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOptions[indexc].streamInfo.samplingRate}_${this.audioCapturerOptions[indexc].streamInfo.channels}.pcm`;
        _this.paths[indexc] = path;
        try {
            await fs.open(path, 0o100);
            this.returnMsg += "文件创建成功，";
        }
        catch (err) {
            this.returnMsg += `文件创建失败 err：${JSON.stringify(err)}`;
            return;
        }
        let file;
        try {
            file = await fs.open(path, 0o2);
            this.returnMsg += "文件以读写模式打开成功";
        }
        catch (err) {
            this.returnMsg += `文件以读写模式打开失败 err：${JSON.stringify(err)}`;
            return;
        }
        this.returnMsg += `fd:${file.fd}\n`;
        let index = 0;
        while (end - start <= 5000) {
            try {
                buffer = await new Promise((resolve, reject) => {
                    _this.audioCapturers[indexc].read(_this.bufferSize, _this.isBlockingRead, async (err, buffer) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(buffer);
                        }
                    });
                });
                let options = {
                    offset: index * _this.bufferSize,
                    length: _this.bufferSize
                };
                let writeLen = await fs.write(file.fd, buffer, options);
                index++;
            }
            catch (err) {
                _this.returnMsg = `AudioCapturer ${index} read : Error: ${JSON.stringify(err)}\n`;
            }
            end = new Date().getTime();
        }
        _this.returnMsg = `AudioCapturer ${index} read end, state:${_this.audioCapturers[indexc].state}\n`;
    }
    stopCapturer(index) {
        if (this.audioCapturers[index] == null) {
            this.returnMsg = `AudioCapturer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioCapturers[index].stop((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer ${index} stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer ${index} stop : SUCCESS,state:${_this.audioCapturers[index].state}\n`;
            }
        });
    }
    releaseCapturer(index) {
        if (this.audioCapturers[index] == null) {
            this.returnMsg = `AudioCapturer ${index} instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioCapturers[index].release((err) => {
            if (err) {
                _this.returnMsg = `AudioCapturer ${index} release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `AudioCapturer ${index} release SUCCESS,state:${_this.audioCapturers[index].state}\n`;
                _this.audioCapturers[index] = null;
            }
        });
    }
    onAudioInterrupt(index) {
        if (this.audioCapturers[index] == null) {
            this.returnMsg = `AudioCapturer ${index} instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.onReturnMsg[index] = `监听中...`;
        _this.audioCapturers[index].on('audioInterrupt', (InterruptEvent) => {
            _this.onReturnMsg[index] = JSON.stringify(InterruptEvent);
        });
    }
    async renderPlay(index) {
        if (this.paths[index] == "") {
            this.returnMsg += `AudioCapturer ${index} 尚未录音\n`;
            return;
        }
        let audioRendererOptions = {
            streamInfo: this.audioCapturerOptions[index].streamInfo,
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_RINGTONE,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.returnMsg = `audioRendererOptions ${JSON.stringify(audioRendererOptions)} \n`;
        try {
            this.audioRenderers[index] = await audio.createAudioRenderer(audioRendererOptions);
            this.returnMsg += `audioRenderer ${index} create success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer ${index} create : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let bufferSize;
        try {
            bufferSize = await this.audioRenderers[index].getBufferSize();
            this.returnMsg += `audioRenderer getBufferSize success,bufferSize:${bufferSize} \n`;
            await this.audioRenderers[index].start();
            this.returnMsg += `audioRenderer ${index} start success \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer ${index} start : Error: ${JSON.stringify(err)}\n`;
            return;
        }
        let path = this.paths[index];
        try {
            this.returnMsg += `path:${path}\n`;
            let stat = await fs.stat(path);
            this.returnMsg += `stat:${JSON.stringify(stat)}\n`;
            this.returnMsg += `size:${stat.size}\n`;
            let len = stat.size % bufferSize == 0 ? Math.floor(stat.size / bufferSize) : Math.floor(stat.size / bufferSize + 1);
            let file = await fs.open(path, 0o0);
            this.returnMsg += `fd:${file.fd}\n`;
            let buf = new ArrayBuffer(bufferSize);
            this.returnMsg += `audioRenderer ${index} write start.......... \n`;
            for (let i = 0; i < len; i++) {
                if (this.audioRenderers[index].state > audio.AudioState.STATE_RUNNING) {
                    return;
                }
                let options = {
                    offset: i * bufferSize,
                    length: bufferSize
                };
                let readsize = await fs.read(file.fd, buf, options);
                let writeSize = await this.audioRenderers[index].write(buf);
            }
            this.returnMsg += `audioRenderer ${index} write end. \n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer ${index} write : Error: ${JSON.stringify(err)}\n`;
        }
        await this.audioRenderers[index].release();
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
        Text.create("【音频录制-录制】返回数据：");
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
            Select.create(this.sourceTypeList);
            Select.value(this.selectedSourceTypeKey[item]);
            Select.onSelect((index, value) => {
                this.selectedSourceTypeKey[item] = value;
                this.audioCapturerOptions[item].capturerInfo.source = audio.SourceType[value];
            });
            Select.pop();
            Row.pop();
            //            Divider().strokeWidth(4).color(Color.Blue).width('80%')
            Row.create();
            //            Divider().strokeWidth(4).color(Color.Blue).width('80%')
            Row.margin({ top: 10 });
            //            Divider().strokeWidth(4).color(Color.Blue).width('80%')
            Row.width('100%');
            Button.createWithChild();
            Button.width('100%');
            Button.height(60);
            Button.onClick(() => {
                this.onAudioInterrupt(item);
            });
            Text.create("on('audioInterrupt')");
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            //            Divider().strokeWidth(4).color(Color.Blue).width('80%')
            Row.pop();
            Text.create(this.onReturnMsg[item]);
            Text.fontSize(22);
            Text.lineHeight(30);
            Text.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Button.createWithChild();
            Button.width('80%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.createAudioCapturer(item);
            });
            Text.create("createAudioCapturer");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('20%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.capturerStart(item);
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
            Button.createWithChild();
            Button.width('100%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => {
                this.readCapturer(item);
            });
            Text.create("read");
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
            Button.onClick(() => this.stopCapturer(item));
            Text.create("stop");
            Text.fontSize(22);
            Text.fontColor(Color.Blue);
            Text.pop();
            Button.pop();
            Button.createWithChild();
            Button.width('49%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.releaseCapturer(item));
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
            Button.width('100%');
            Button.height(60);
            Button.backgroundColor(Color.Pink);
            Button.onClick(() => this.renderPlay(item));
            Text.create("播放录音数据");
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
loadDocument(new CapturerInterruptCapturer("1", undefined, {}));
