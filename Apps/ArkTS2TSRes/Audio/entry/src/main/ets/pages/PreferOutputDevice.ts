interface PreferOutputDevice_Params {
    appContext?: common.Context;
    audioRendererOption?: audio.AudioRendererOptions;
    audioRenderer?: audio.AudioRenderer;
    audioSource?;
    fileDescriptor?: resourceManager.RawFileDescriptor;
    audioRoutingManager?: audio.AudioRoutingManager;
    preferOutputDeviceName?: string;
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
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import audio from '@ohos.multimedia.audio';
import router from '@ohos.router';
import resourceManager from '@ohos.resourceManager';
import { BusinessError } from '@ohos.base';
class Options {
    offset: number = 0;
    length: number = 0;
}
class PreferOutputDevice extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.appContext = undefined;
        this.audioRendererOption = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_2,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                usage: audio.StreamUsage.STREAM_USAGE_MUSIC,
                rendererFlags: 0
            }
        };
        this.audioRenderer = undefined;
        this.audioSource = 'test1.wav';
        this.fileDescriptor = undefined;
        this.audioRoutingManager = undefined;
        this.__preferOutputDeviceName = new ObservedPropertySimple('', this, "preferOutputDeviceName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PreferOutputDevice_Params) {
        if (params.appContext !== undefined) {
            this.appContext = params.appContext;
        }
        if (params.audioRendererOption !== undefined) {
            this.audioRendererOption = params.audioRendererOption;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
        }
        if (params.audioSource !== undefined) {
            this.audioSource = params.audioSource;
        }
        if (params.fileDescriptor !== undefined) {
            this.fileDescriptor = params.fileDescriptor;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
        if (params.preferOutputDeviceName !== undefined) {
            this.preferOutputDeviceName = params.preferOutputDeviceName;
        }
    }
    aboutToBeDeleted() {
        this.__preferOutputDeviceName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private appContext?: common.Context;
    private audioRendererOption: audio.AudioRendererOptions;
    private audioRenderer?: audio.AudioRenderer;
    private audioSource;
    private fileDescriptor?: resourceManager.RawFileDescriptor;
    private audioRoutingManager?: audio.AudioRoutingManager;
    private __preferOutputDeviceName: ObservedPropertySimple<string>;
    get preferOutputDeviceName() {
        return this.__preferOutputDeviceName.get();
    }
    set preferOutputDeviceName(newValue: string) {
        this.__preferOutputDeviceName.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        this.init();
    }
    async init(): Promise<void> {
        if (this.appContext) {
            return;
        }
        this.appContext = getContext();
        let audioManager = audio.getAudioManager();
        this.audioRoutingManager = audioManager.getRoutingManager();
        this.audioRoutingManager.on('deviceChange', audio.DeviceFlag.OUTPUT_DEVICES_FLAG, async (deviceChanged) => {
            await this.getPreferOutputDeviceForRendererInfo();
        });
        await this.getPreferOutputDeviceForRendererInfo();
        await this.getStageFileDescriptor(this.audioSource).then((res) => {
            this.fileDescriptor = res;
        });
        await this.renderPlay();
    }
    async over(): Promise<void> {
        this.appContext = undefined;
        if (this.audioRenderer) {
            await this.audioRenderer.release();
            this.audioRenderer = undefined;
        }
        if (this.fileDescriptor) {
            this.closeResource(this.audioSource);
            this.fileDescriptor = undefined;
        }
        this.audioRoutingManager = undefined;
    }
    onBackPress(): void {
        this.over();
    }
    async onPageHide(): Promise<void> {
        this.over();
    }
    onPageShow(): void {
        this.init();
    }
    async getStageFileDescriptor(fileName: string): Promise<resourceManager.RawFileDescriptor | undefined> {
        let fileDescriptor: resourceManager.RawFileDescriptor | undefined = undefined;
        if (this.appContext) {
            let mgr = this.appContext.resourceManager;
            await mgr.getRawFd(fileName).then(value => {
                fileDescriptor = value;
                console.log('case getRawFileDescriptor success fileName: ' + fileName);
            }).catch((error: BusinessError) => {
                console.log('case getRawFileDescriptor err: ' + error);
            });
        }
        return fileDescriptor;
    }
    async closeResource(fileName: string): Promise<void> {
        if (this.appContext) {
            let mgr = this.appContext.resourceManager;
            await mgr.closeRawFd(fileName).then(() => {
                console.log('case closeRawFd success fileName: ' + fileName);
            }).catch((error: BusinessError) => {
                console.log('case closeRawFd err: ' + error);
            });
        }
    }
    getPreferOutputDeviceForRendererInfo(): void {
        if (this.audioRoutingManager) {
            this.audioRoutingManager.getPreferOutputDeviceForRendererInfo(this.audioRendererOption.rendererInfo)
                .then(data => {
                console.log(`--zhangkai--getPreferOutputDeviceForRendererInfo data:${JSON.stringify(data[0])}`);
                this.preferOutputDeviceName = this.getDeviceList(data[0]);
            }).catch((err: BusinessError) => {
                this.preferOutputDeviceName = 'Invalid';
                console.log(`getPreferOutputDeviceForRendererInfo err:${JSON.stringify(err)}`);
            });
        }
    }
    getZNDeviceTypeName(deviceTypeName: string): string {
        if (this.appContext) {
            let map = new Map<string, string>();
            map.set('EARPIECE', this.appContext.resourceManager.getStringSync($r('app.string.EarPiece').id));
            map.set('SPEAKER', this.appContext.resourceManager.getStringSync($r('app.string.Speaker').id));
            map.set('WIRED_HEADSET', this.appContext.resourceManager.getStringSync($r('app.string.WiredHeadset').id));
            map.set('WIRED_HEADPHONES', this.appContext.resourceManager.getStringSync($r('app.string.WiredHeadPhones').id));
            map.set('BLUETOOTH_A2DP', this.appContext.resourceManager.getStringSync($r('app.string.Bluetooth_A2DP').id));
            map.set('BLUETOOTH_SCO', this.appContext.resourceManager.getStringSync($r('app.string.BLUETOOTH_SCO').id));
            map.set('USB_HEADSET', this.appContext.resourceManager.getStringSync($r('app.string.USB_Headset').id));
            if (map.get(deviceTypeName)) {
                return map.get(deviceTypeName) as string;
            }
            else {
                return 'Invalid';
            }
        }
        else {
            return '';
        }
    }
    getDeviceList(deviceDescriptor: audio.AudioDeviceDescriptor): string {
        let deviceTypeName = this.getDeviceTypeNameByValue(deviceDescriptor.deviceType);
        return this.getZNDeviceTypeName(deviceTypeName);
    }
    getDeviceTypeNameByValue(value: audio.DeviceType): string {
        let map = new Map<number, string>();
        map.set(1, 'EARPIECE');
        map.set(2, 'SPEAKER');
        map.set(3, 'WIRED_HEADSET');
        map.set(4, 'WIRED_HEADPHONES');
        map.set(8, 'BLUETOOTH_A2DP');
        map.set(7, 'BLUETOOTH_SCO');
        map.set(22, 'USB_HEADSET');
        if (map.get(value)) {
            return map.get(value) as string;
        }
        return 'Invalid';
    }
    async renderPlay(): Promise<void> {
        if (this.audioRenderer) {
            return;
        }
        try {
            this.audioRenderer = await audio.createAudioRenderer(this.audioRendererOption);
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer create : Error: ${JSON.stringify(error)}`);
            return;
        }
        let bufferSize: number;
        try {
            bufferSize = await this.audioRenderer.getBufferSize();
            await this.audioRenderer.start();
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer start : Error: ${JSON.stringify(error)}`);
            return;
        }
        try {
            if (!this.fileDescriptor) {
                return;
            }
            let startOffset = this.fileDescriptor.offset;
            let cur = startOffset;
            let buf = new ArrayBuffer(bufferSize);
            while (true) {
                // when render released,state is changed to STATE_RELEASED
                if (this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
                    break;
                }
                while (cur <= startOffset + this.fileDescriptor.length) {
                    // when render released,state is changed to STATE_RELEASED
                    if (this.audioRenderer.state.valueOf() === audio.AudioState.STATE_RELEASED.valueOf()) {
                        break;
                    }
                    let options: Options = {
                        offset: cur,
                        length: bufferSize
                    };
                    await fs.read(this.fileDescriptor.fd, buf, options);
                    await this.audioRenderer.write(buf);
                    cur += bufferSize;
                }
                cur = startOffset;
            }
        }
        catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer write : Error: ${JSON.stringify(error)}`);
        }
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor('#f1f3f5');
        Row.create();
        Row.height(56);
        Row.width('100%');
        Row.id('back_btn');
        Row.onClick(async () => {
            await router.pushUrl({ url: 'pages/Index' });
        });
        Navigation.create();
        Navigation.height('100%');
        Navigation.width('100%');
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.SelectOutputDevice'));
        Navigation.mode(NavigationMode.Stack);
        NavRouter.create();
        NavDestination.create();
        NavDestination.pop();
        NavRouter.pop();
        Navigation.pop();
        Row.pop();
        Column.create();
        Column.padding({ left: '3.35%', right: '3.35%' });
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.height(72);
        Row.width('100%');
        Row.padding({ left: '3.35%', right: '3.35%' });
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Row.create();
        Image.create($r('app.media.ic_call'));
        Image.width(48);
        Image.height(48);
        Text.create($r('app.string.VoiceCallType'));
        Text.fontSize(16);
        Text.margin({ left: 12 });
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.pop();
        Row.pop();
        Row.create();
        Text.create(this.preferOutputDeviceName);
        Text.id('device_name_text');
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor('#182431');
        Text.fontWeight(400);
        Text.opacity(0.6);
        Text.pop();
        Row.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new PreferOutputDevice("1", undefined, {}));
