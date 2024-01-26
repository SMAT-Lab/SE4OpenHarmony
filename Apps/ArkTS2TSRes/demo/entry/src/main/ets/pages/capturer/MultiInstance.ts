interface MultiInstance_Params {
    audioCapturerOptions?;
    audioCapturers?;
    audioRenderers?;
    paths?;
    returnMsg?: string;
    bufferSize?: number;
    isBlockingRead?: boolean;
    markReachFrame?: number;
    periodReachFrame?: number;
    arr?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MultiInstance_" + ++__generate__Id;
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
class MultiInstance extends View {
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
        this.audioCapturers = [null, null];
        this.audioRenderers = [null, null];
        this.paths = ["", ""];
        this.__returnMsg = new ObservedPropertySimple(`hello`, this, "returnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.__markReachFrame = new ObservedPropertySimple(1000, this, "markReachFrame");
        this.__periodReachFrame = new ObservedPropertySimple(1000, this, "periodReachFrame");
        this.arr = [0, 1];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MultiInstance_Params) {
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
        if (params.bufferSize !== undefined) {
            this.bufferSize = params.bufferSize;
        }
        if (params.isBlockingRead !== undefined) {
            this.isBlockingRead = params.isBlockingRead;
        }
        if (params.markReachFrame !== undefined) {
            this.markReachFrame = params.markReachFrame;
        }
        if (params.periodReachFrame !== undefined) {
            this.periodReachFrame = params.periodReachFrame;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__isBlockingRead.aboutToBeDeleted();
        this.__markReachFrame.aboutToBeDeleted();
        this.__periodReachFrame.aboutToBeDeleted();
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
    private __markReachFrame: ObservedPropertySimple<number>;
    get markReachFrame() {
        return this.__markReachFrame.get();
    }
    set markReachFrame(newValue: number) {
        this.__markReachFrame.set(newValue);
    }
    private __periodReachFrame: ObservedPropertySimple<number>;
    get periodReachFrame() {
        return this.__periodReachFrame.get();
    }
    set periodReachFrame(newValue: number) {
        this.__periodReachFrame.set(newValue);
    }
    private arr;
    aboutToAppear() {
    }
    createAudioCapturer(index) {
        if (this.audioCapturers[index] !== null) {
            this.returnMsg = `AudioCapturer ${index} Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioCapturer(this.audioCapturerOptions, async (err, data) => {
            if (err) {
                _this.returnMsg = `AudioCapturer ${index} Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioCapturers[index] = data;
                _this.returnMsg = `AudioCapturer ${index} Created : SUCCESS,state:${_this.audioCapturers[index].state}\n`;
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
        let path = globalThis.pathDir + `/test_capturer_${new Date().getTime()}_${this.audioCapturerOptions.streamInfo.samplingRate}_${this.audioCapturerOptions.streamInfo.channels}.pcm`;
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
    async renderPlay(index) {
        if (this.paths[index] == "") {
            this.returnMsg += `AudioCapturer ${index} 尚未录音\n`;
            return;
        }
        let audioRendererOptions = {
            streamInfo: this.audioCapturerOptions.streamInfo,
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
        Text.create("【音频录制-多实例】返回数据：");
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
loadDocument(new MultiInstance("1", undefined, {}));
