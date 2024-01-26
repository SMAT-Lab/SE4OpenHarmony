interface DistributedAudioCallback_Params {
    audioRendererOptions?;
    audioRenderer?;
    returnMsg?: string;
    bufferSize?: number;
    isBlockingRead?: boolean;
    tag?: String;
    isWrite?: boolean;
    fd?: number;
    offset?: number;
    length?: number;
    audioManager?: audio.AudioManager;
    audioRoutingManager?: audio.AudioRoutingManager;
    audioVolumeManager?: audio.AudioVolumeManager;
    audioVolumeGroupManager?: audio.AudioVolumeGroupManager;
    networkIdList?: Array<SelectOption>;
    selectedNetworkIdKey?: string;
    groupIdList?: Array<SelectOption>;
    selectedGroupIdKey?: string;
    volumeTypeList?: Array<SelectOption>;
    selectedVolumeType?: number;
    selectedVolumeTypeKey?: string;
    selectVolumeKey?: string;
    selectedVolumeAudioManager?: number;
    selectedVolumeVolumeGroupManager?: number;
    minVolumeVolumeGroupManager?: number;
    maxVolumeVolumeGroupManager?: number;
    minVolumeAudioManager?: number;
    maxVolumeAudioManager?: number;
    selectedContentTypeKey?: string;
    selectedStreamUsageKey?: string;
    muteList?;
    selectedMuteValue?: boolean;
    selectedMuteKey?: string;
    renderInfo?;
    deviceList?: Array<SelectOption>;
    selectedDeviceKey?: string;
    selectedDevice?: number;
    deviceRoleList?: Array<SelectOption>;
    selectedRoleKey?: string;
    selectedRole?: number;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DistributedAudioCallback_" + ++__generate__Id;
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
import { AxisValue } from '@ohos.multimodalInput.mouseEvent';
import avsession from '@ohos.multimedia.avsession';
class DistributedAudioCallback extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioRendererOptions = {
            streamInfo: {
                samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
                channels: audio.AudioChannel.CHANNEL_1,
                sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
                encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
            },
            rendererInfo: {
                content: audio.ContentType.CONTENT_TYPE_MUSIC,
                usage: audio.StreamUsage.STREAM_USAGE_MEDIA,
                rendererFlags: 0
            }
        };
        this.audioRenderer = null;
        this.__returnMsg = new ObservedPropertySimple(``, this, "returnMsg");
        this.__bufferSize = new ObservedPropertySimple(0, this, "bufferSize");
        this.__isBlockingRead = new ObservedPropertySimple(true, this, "isBlockingRead");
        this.tag = 'qlw';
        this.__isWrite = new ObservedPropertySimple(false, this, "isWrite");
        this.fd = undefined;
        this.offset = undefined;
        this.length = undefined;
        this.audioManager = undefined;
        this.audioRoutingManager = undefined;
        this.audioVolumeManager = undefined;
        this.audioVolumeGroupManager = undefined;
        this.__networkIdList = new ObservedPropertyObject([], this, "networkIdList");
        this.__selectedNetworkIdKey = new ObservedPropertySimple("networkId", this, "selectedNetworkIdKey");
        this.__groupIdList = new ObservedPropertyObject([], this, "groupIdList");
        this.__selectedGroupIdKey = new ObservedPropertySimple('groupId', this, "selectedGroupIdKey");
        this.__volumeTypeList = new ObservedPropertyObject([], this, "volumeTypeList");
        this.__selectedVolumeType = new ObservedPropertySimple(-1, this, "selectedVolumeType");
        this.__selectedVolumeTypeKey = new ObservedPropertySimple('volumeType', this, "selectedVolumeTypeKey");
        this.__selectVolumeKey = new ObservedPropertySimple('volume', this, "selectVolumeKey");
        this.__selectedVolumeAudioManager = new ObservedPropertySimple(0, this, "selectedVolumeAudioManager");
        this.__selectedVolumeVolumeGroupManager = new ObservedPropertySimple(0, this, "selectedVolumeVolumeGroupManager");
        this.__minVolumeVolumeGroupManager = new ObservedPropertySimple(0, this, "minVolumeVolumeGroupManager");
        this.__maxVolumeVolumeGroupManager = new ObservedPropertySimple(15, this, "maxVolumeVolumeGroupManager");
        this.__minVolumeAudioManager = new ObservedPropertySimple(0, this, "minVolumeAudioManager");
        this.__maxVolumeAudioManager = new ObservedPropertySimple(15, this, "maxVolumeAudioManager");
        this.__selectedContentTypeKey = new ObservedPropertySimple("CONTENT_TYPE_MUSIC", this, "selectedContentTypeKey");
        this.__selectedStreamUsageKey = new ObservedPropertySimple("STREAM_USAGE_MEDIA", this, "selectedStreamUsageKey");
        this.muteList = [
            { value: false + '' },
            { value: true + '' }
        ];
        this.__selectedMuteValue = new ObservedPropertySimple(false, this, "selectedMuteValue");
        this.__selectedMuteKey = new ObservedPropertySimple('muteFlag', this, "selectedMuteKey");
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
            },
            'ALARM': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_MUSIC,
                    usage: audio.StreamUsage.STREAM_USAGE_ALARM,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_MUSIC',
                    selectedStreamUsageKey: 'STREAM_USAGE_ALARM'
                }
            },
            'ACCESSIBILITY': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_SPEECH,
                    usage: audio.StreamUsage.STREAM_USAGE_ACCESSIBILITY,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_SPEECH',
                    selectedStreamUsageKey: 'STREAM_USAGE_ACCESSIBILITY'
                }
            },
            'ULTRASONIC': {
                main: {
                    content: audio.ContentType.CONTENT_TYPE_UNKNOWN,
                    usage: audio.StreamUsage.STREAM_USAGE_ULTRASONIC,
                    rendererFlags: 0
                },
                info: {
                    selectedContentTypeKey: 'CONTENT_TYPE_UNKNOWN',
                    selectedStreamUsageKey: 'STREAM_USAGE_ULTRASONIC'
                }
            }
        };
        this.__deviceList = new ObservedPropertyObject([], this, "deviceList");
        this.__selectedDeviceKey = new ObservedPropertySimple('deviceType', this, "selectedDeviceKey");
        this.__selectedDevice = new ObservedPropertySimple(-1, this, "selectedDevice");
        this.__deviceRoleList = new ObservedPropertyObject([], this, "deviceRoleList");
        this.__selectedRoleKey = new ObservedPropertySimple('deviceRole', this, "selectedRoleKey");
        this.__selectedRole = new ObservedPropertySimple(-1, this, "selectedRole");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DistributedAudioCallback_Params) {
        if (params.audioRendererOptions !== undefined) {
            this.audioRendererOptions = params.audioRendererOptions;
        }
        if (params.audioRenderer !== undefined) {
            this.audioRenderer = params.audioRenderer;
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
        if (params.tag !== undefined) {
            this.tag = params.tag;
        }
        if (params.isWrite !== undefined) {
            this.isWrite = params.isWrite;
        }
        if (params.fd !== undefined) {
            this.fd = params.fd;
        }
        if (params.offset !== undefined) {
            this.offset = params.offset;
        }
        if (params.length !== undefined) {
            this.length = params.length;
        }
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
        if (params.audioVolumeManager !== undefined) {
            this.audioVolumeManager = params.audioVolumeManager;
        }
        if (params.audioVolumeGroupManager !== undefined) {
            this.audioVolumeGroupManager = params.audioVolumeGroupManager;
        }
        if (params.networkIdList !== undefined) {
            this.networkIdList = params.networkIdList;
        }
        if (params.selectedNetworkIdKey !== undefined) {
            this.selectedNetworkIdKey = params.selectedNetworkIdKey;
        }
        if (params.groupIdList !== undefined) {
            this.groupIdList = params.groupIdList;
        }
        if (params.selectedGroupIdKey !== undefined) {
            this.selectedGroupIdKey = params.selectedGroupIdKey;
        }
        if (params.volumeTypeList !== undefined) {
            this.volumeTypeList = params.volumeTypeList;
        }
        if (params.selectedVolumeType !== undefined) {
            this.selectedVolumeType = params.selectedVolumeType;
        }
        if (params.selectedVolumeTypeKey !== undefined) {
            this.selectedVolumeTypeKey = params.selectedVolumeTypeKey;
        }
        if (params.selectVolumeKey !== undefined) {
            this.selectVolumeKey = params.selectVolumeKey;
        }
        if (params.selectedVolumeAudioManager !== undefined) {
            this.selectedVolumeAudioManager = params.selectedVolumeAudioManager;
        }
        if (params.selectedVolumeVolumeGroupManager !== undefined) {
            this.selectedVolumeVolumeGroupManager = params.selectedVolumeVolumeGroupManager;
        }
        if (params.minVolumeVolumeGroupManager !== undefined) {
            this.minVolumeVolumeGroupManager = params.minVolumeVolumeGroupManager;
        }
        if (params.maxVolumeVolumeGroupManager !== undefined) {
            this.maxVolumeVolumeGroupManager = params.maxVolumeVolumeGroupManager;
        }
        if (params.minVolumeAudioManager !== undefined) {
            this.minVolumeAudioManager = params.minVolumeAudioManager;
        }
        if (params.maxVolumeAudioManager !== undefined) {
            this.maxVolumeAudioManager = params.maxVolumeAudioManager;
        }
        if (params.selectedContentTypeKey !== undefined) {
            this.selectedContentTypeKey = params.selectedContentTypeKey;
        }
        if (params.selectedStreamUsageKey !== undefined) {
            this.selectedStreamUsageKey = params.selectedStreamUsageKey;
        }
        if (params.muteList !== undefined) {
            this.muteList = params.muteList;
        }
        if (params.selectedMuteValue !== undefined) {
            this.selectedMuteValue = params.selectedMuteValue;
        }
        if (params.selectedMuteKey !== undefined) {
            this.selectedMuteKey = params.selectedMuteKey;
        }
        if (params.renderInfo !== undefined) {
            this.renderInfo = params.renderInfo;
        }
        if (params.deviceList !== undefined) {
            this.deviceList = params.deviceList;
        }
        if (params.selectedDeviceKey !== undefined) {
            this.selectedDeviceKey = params.selectedDeviceKey;
        }
        if (params.selectedDevice !== undefined) {
            this.selectedDevice = params.selectedDevice;
        }
        if (params.deviceRoleList !== undefined) {
            this.deviceRoleList = params.deviceRoleList;
        }
        if (params.selectedRoleKey !== undefined) {
            this.selectedRoleKey = params.selectedRoleKey;
        }
        if (params.selectedRole !== undefined) {
            this.selectedRole = params.selectedRole;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__bufferSize.aboutToBeDeleted();
        this.__isBlockingRead.aboutToBeDeleted();
        this.__isWrite.aboutToBeDeleted();
        this.__networkIdList.aboutToBeDeleted();
        this.__selectedNetworkIdKey.aboutToBeDeleted();
        this.__groupIdList.aboutToBeDeleted();
        this.__selectedGroupIdKey.aboutToBeDeleted();
        this.__volumeTypeList.aboutToBeDeleted();
        this.__selectedVolumeType.aboutToBeDeleted();
        this.__selectedVolumeTypeKey.aboutToBeDeleted();
        this.__selectVolumeKey.aboutToBeDeleted();
        this.__selectedVolumeAudioManager.aboutToBeDeleted();
        this.__selectedVolumeVolumeGroupManager.aboutToBeDeleted();
        this.__minVolumeVolumeGroupManager.aboutToBeDeleted();
        this.__maxVolumeVolumeGroupManager.aboutToBeDeleted();
        this.__minVolumeAudioManager.aboutToBeDeleted();
        this.__maxVolumeAudioManager.aboutToBeDeleted();
        this.__selectedContentTypeKey.aboutToBeDeleted();
        this.__selectedStreamUsageKey.aboutToBeDeleted();
        this.__selectedMuteValue.aboutToBeDeleted();
        this.__selectedMuteKey.aboutToBeDeleted();
        this.__deviceList.aboutToBeDeleted();
        this.__selectedDeviceKey.aboutToBeDeleted();
        this.__selectedDevice.aboutToBeDeleted();
        this.__deviceRoleList.aboutToBeDeleted();
        this.__selectedRoleKey.aboutToBeDeleted();
        this.__selectedRole.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private audioRendererOptions;
    private audioRenderer;
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
    private tag: String;
    private __isWrite: ObservedPropertySimple<boolean>;
    get isWrite() {
        return this.__isWrite.get();
    }
    set isWrite(newValue: boolean) {
        this.__isWrite.set(newValue);
    }
    private fd: number;
    // @ts-ignore
    private offset: number;
    private length: number;
    private audioManager: audio.AudioManager;
    private audioRoutingManager: audio.AudioRoutingManager;
    private audioVolumeManager: audio.AudioVolumeManager;
    private audioVolumeGroupManager: audio.AudioVolumeGroupManager;
    private __networkIdList: ObservedPropertyObject<Array<SelectOption>>;
    get networkIdList() {
        return this.__networkIdList.get();
    }
    set networkIdList(newValue: Array<SelectOption>) {
        this.__networkIdList.set(newValue);
    }
    private __selectedNetworkIdKey: ObservedPropertySimple<string>;
    get selectedNetworkIdKey() {
        return this.__selectedNetworkIdKey.get();
    }
    set selectedNetworkIdKey(newValue: string) {
        this.__selectedNetworkIdKey.set(newValue);
    }
    private __groupIdList: ObservedPropertyObject<Array<SelectOption>>;
    get groupIdList() {
        return this.__groupIdList.get();
    }
    set groupIdList(newValue: Array<SelectOption>) {
        this.__groupIdList.set(newValue);
    }
    private __selectedGroupIdKey: ObservedPropertySimple<string>;
    get selectedGroupIdKey() {
        return this.__selectedGroupIdKey.get();
    }
    set selectedGroupIdKey(newValue: string) {
        this.__selectedGroupIdKey.set(newValue);
    }
    private __volumeTypeList: ObservedPropertyObject<Array<SelectOption>>;
    get volumeTypeList() {
        return this.__volumeTypeList.get();
    }
    set volumeTypeList(newValue: Array<SelectOption>) {
        this.__volumeTypeList.set(newValue);
    }
    private __selectedVolumeType: ObservedPropertySimple<number>;
    get selectedVolumeType() {
        return this.__selectedVolumeType.get();
    }
    set selectedVolumeType(newValue: number) {
        this.__selectedVolumeType.set(newValue);
    }
    private __selectedVolumeTypeKey: ObservedPropertySimple<string>;
    get selectedVolumeTypeKey() {
        return this.__selectedVolumeTypeKey.get();
    }
    set selectedVolumeTypeKey(newValue: string) {
        this.__selectedVolumeTypeKey.set(newValue);
    }
    private __selectVolumeKey: ObservedPropertySimple<string>;
    get selectVolumeKey() {
        return this.__selectVolumeKey.get();
    }
    set selectVolumeKey(newValue: string) {
        this.__selectVolumeKey.set(newValue);
    }
    private __selectedVolumeAudioManager: ObservedPropertySimple<number>; //音量大小
    get selectedVolumeAudioManager() {
        return this.__selectedVolumeAudioManager.get();
    }
    set selectedVolumeAudioManager(newValue: number) {
        this.__selectedVolumeAudioManager.set(newValue);
    }
    private __selectedVolumeVolumeGroupManager: ObservedPropertySimple<number>; //音量大小
    get selectedVolumeVolumeGroupManager() {
        return this.__selectedVolumeVolumeGroupManager.get();
    }
    set selectedVolumeVolumeGroupManager(newValue: number) {
        this.__selectedVolumeVolumeGroupManager.set(newValue);
    }
    private __minVolumeVolumeGroupManager: ObservedPropertySimple<number>;
    get minVolumeVolumeGroupManager() {
        return this.__minVolumeVolumeGroupManager.get();
    }
    set minVolumeVolumeGroupManager(newValue: number) {
        this.__minVolumeVolumeGroupManager.set(newValue);
    }
    private __maxVolumeVolumeGroupManager: ObservedPropertySimple<number>;
    get maxVolumeVolumeGroupManager() {
        return this.__maxVolumeVolumeGroupManager.get();
    }
    set maxVolumeVolumeGroupManager(newValue: number) {
        this.__maxVolumeVolumeGroupManager.set(newValue);
    }
    private __minVolumeAudioManager: ObservedPropertySimple<number>;
    get minVolumeAudioManager() {
        return this.__minVolumeAudioManager.get();
    }
    set minVolumeAudioManager(newValue: number) {
        this.__minVolumeAudioManager.set(newValue);
    }
    private __maxVolumeAudioManager: ObservedPropertySimple<number>;
    get maxVolumeAudioManager() {
        return this.__maxVolumeAudioManager.get();
    }
    set maxVolumeAudioManager(newValue: number) {
        this.__maxVolumeAudioManager.set(newValue);
    }
    private __selectedContentTypeKey: ObservedPropertySimple<string>;
    get selectedContentTypeKey() {
        return this.__selectedContentTypeKey.get();
    }
    set selectedContentTypeKey(newValue: string) {
        this.__selectedContentTypeKey.set(newValue);
    }
    private __selectedStreamUsageKey: ObservedPropertySimple<string>;
    get selectedStreamUsageKey() {
        return this.__selectedStreamUsageKey.get();
    }
    set selectedStreamUsageKey(newValue: string) {
        this.__selectedStreamUsageKey.set(newValue);
    }
    private muteList;
    private __selectedMuteValue: ObservedPropertySimple<boolean>;
    get selectedMuteValue() {
        return this.__selectedMuteValue.get();
    }
    set selectedMuteValue(newValue: boolean) {
        this.__selectedMuteValue.set(newValue);
    }
    private __selectedMuteKey: ObservedPropertySimple<string>;
    get selectedMuteKey() {
        return this.__selectedMuteKey.get();
    }
    set selectedMuteKey(newValue: string) {
        this.__selectedMuteKey.set(newValue);
    }
    private renderInfo;
    private __deviceList: ObservedPropertyObject<Array<SelectOption>>;
    get deviceList() {
        return this.__deviceList.get();
    }
    set deviceList(newValue: Array<SelectOption>) {
        this.__deviceList.set(newValue);
    }
    private __selectedDeviceKey: ObservedPropertySimple<string>;
    get selectedDeviceKey() {
        return this.__selectedDeviceKey.get();
    }
    set selectedDeviceKey(newValue: string) {
        this.__selectedDeviceKey.set(newValue);
    }
    private __selectedDevice: ObservedPropertySimple<number>;
    get selectedDevice() {
        return this.__selectedDevice.get();
    }
    set selectedDevice(newValue: number) {
        this.__selectedDevice.set(newValue);
    }
    private __deviceRoleList: ObservedPropertyObject<Array<SelectOption>>;
    get deviceRoleList() {
        return this.__deviceRoleList.get();
    }
    set deviceRoleList(newValue: Array<SelectOption>) {
        this.__deviceRoleList.set(newValue);
    }
    private __selectedRoleKey: ObservedPropertySimple<string>;
    get selectedRoleKey() {
        return this.__selectedRoleKey.get();
    }
    set selectedRoleKey(newValue: string) {
        this.__selectedRoleKey.set(newValue);
    }
    private __selectedRole: ObservedPropertySimple<number>;
    get selectedRole() {
        return this.__selectedRole.get();
    }
    set selectedRole(newValue: number) {
        this.__selectedRole.set(newValue);
    }
    private scroller: Scroller;
    async onBackPress() {
        if (this.audioRenderer !== null) {
            await this.audioRenderer.release();
        }
        // @ts-ignore
        if (this.volumeTypeList != []) {
            this.volumeTypeList = [];
        }
        // @ts-ignore
        if (this.networkIdList != []) {
            this.networkIdList = [];
        }
        // @ts-ignore
        if (this.groupIdList != []) {
            this.groupIdList = [];
        }
    }
    async aboutToAppear() {
        this.networkIdList.push({ value: audio.LOCAL_NETWORK_ID });
        console.info(`${this.tag} networkIdList 1 : ${JSON.stringify(this.networkIdList)}`);
        this.groupIdList.push({ value: String(audio.DEFAULT_VOLUME_GROUP_ID) });
        console.info(`${this.tag} groupIdList 1 : ${JSON.stringify(this.groupIdList)}`);
        console.info(`${this.tag} LOCAL_NETWORK_ID : ${audio.LOCAL_NETWORK_ID}`);
        console.info(`${this.tag} DEFAULT_VOLUME_GROUP_ID : ${audio.DEFAULT_VOLUME_GROUP_ID}`);
        for (let key in audio.AudioVolumeType) {
            this.volumeTypeList.push({ value: key });
        }
        console.info(`${this.tag} muteList : ${JSON.stringify(this.muteList)}`);
        for (let key in audio.DeviceType) {
            if (key != 'MAX' && key != "NONE") {
                this.deviceList.push({ value: key });
            }
        }
        console.info(`${this.tag} deviceList : ${JSON.stringify(this.deviceList)}`);
        for (let key in audio.DeviceRole) {
            if (key == "INPUT_DEVICE" || key == "OUTPUT_DEVICE") {
                this.deviceRoleList.push({ value: key });
            }
        }
        console.info(`${this.tag} deviceRoleList : ${JSON.stringify(this.deviceRoleList)}`);
        await this.createAVsession();
        this.audioManager = audio.getAudioManager();
        this.audioRoutingManager = this.audioManager.getRoutingManager();
        this.audioVolumeManager = this.audioManager.getVolumeManager();
        try {
            let outputAudioDeviceDescriptor = await this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG);
            console.info(`${this.tag} goutputAudioDeviceDescriptor networkId: ${outputAudioDeviceDescriptor[0].networkId}`);
            this.networkIdList.push({ value: outputAudioDeviceDescriptor[0].networkId });
            console.info(`${this.tag} networkIdList 2 : ${JSON.stringify(this.networkIdList)}`);
            this.audioVolumeManager.getVolumeGroupInfos(outputAudioDeviceDescriptor[0].networkId, (err, data) => {
                if (err) {
                    this.returnMsg += `getVolumeGroupInfos err code: ${err.code}, err message:${err.message}\n`;
                }
                this.returnMsg += `getVolumeGroupInfos success:` + JSON.stringify(data) + `\n`;
                this.groupIdList.push({ value: String(data[0].groupId) });
                console.info(`${this.tag} groupIdList 2 : ${JSON.stringify(this.groupIdList)}`);
            });
        }
        catch (err) {
            console.info(`${this.tag} getDevices err : ${JSON.stringify(err)}`);
        }
    }
    async createAVsession() {
        try {
            // @ts-ignore
            let av = await avsession.createAVSession(globalThis.abilityContext, 'createNewSession', 'audio');
            console.info(`createAVsession success:` + JSON.stringify(av));
        }
        catch (err) {
            console.info(`createAVsession err:` + JSON.stringify(err));
        }
    }
    createAudioRenderer() {
        if (this.audioRenderer !== null) {
            this.returnMsg = `audioRenderer Created already,don't create anymore`;
            return;
        }
        let _this = this;
        audio.createAudioRenderer(this.audioRendererOptions, async (err, data) => {
            if (err) {
                _this.returnMsg = `audioRenderer Created : Error: ${JSON.stringify(err)}`;
            }
            else {
                _this.audioRenderer = data;
                _this.returnMsg = `audioRenderer Created : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    rendererStart() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to start\n`;
            return;
        }
        let _this = this;
        this.audioRenderer.start((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer start : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer start : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
        try {
            globalThis.abilityContext.resourceManager.getRawFd("StarWars10s-1C-44100-2SW.wav").then(value => {
                this.fd = value.fd;
                this.offset = value.offset;
                this.length = value.length;
                this.returnMsg += `getRawFd fd: ${this.fd}, offset: ${this.offset}, length: ${this.length}\n`;
                console.info(`${this.tag} getRawFd success: fd: ${this.fd}, offset: ${this.offset}, length: ${this.length}`);
            }).catch(err => {
                this.returnMsg += `getRawFd fail err: ${err}, message: ${err.message}, code: ${err.code}\n`;
                console.info(`${this.tag} getRawFd fail err: ${err}, message: ${err.message}, code: ${err.code}`);
            });
        }
        catch (err) {
            console.info(`${this.tag} getRawFd fail err1: ${err}, message: ${err.message}, code: ${err.code}`);
        }
    }
    getBufferSize() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to getBufferSize`;
            return;
        }
        let _this = this;
        _this.audioRenderer.getBufferSize((err, bufferSize) => {
            if (err) {
                _this.returnMsg = `audioRenderer getBufferSize : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer getBufferSize : SUCCESS,bufferSize:${bufferSize},state:${_this.audioRenderer.state}\n`;
                _this.bufferSize = bufferSize;
            }
        });
    }
    async onInterrupt() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer  instance had not created,dont‘t allow to onInterrupt \n`;
            return;
        }
        let _this = this;
        _this.returnMsg = `已监听`;
        this.audioRenderer.on('audioInterrupt', async (interruptEvent) => {
            //console.log('interruptEvent:'+JSON.stringify(interruptEvent))
            _this.returnMsg = JSON.stringify(interruptEvent);
            if (interruptEvent.hintType == 2 || interruptEvent.hintType == 3) {
                await _this.audioRenderer.pause();
            }
            else if (interruptEvent.hintType == 1) {
                await _this.audioRenderer.start();
            }
        });
    }
    async writeRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg += `audioRenderer instance had not created,dont‘t allow to read\n`;
            return;
        }
        if (this.isWrite === true) {
            this.returnMsg += `不要重复点击write按钮 \n`;
            return;
        }
        this.isWrite = true;
        if (this.bufferSize == 0) {
            this.bufferSize = await this.audioRenderer.getBufferSize();
        }
        let _this = this;
        try {
            let len = this.length % this.bufferSize == 0 ? Math.floor(this.length / this.bufferSize) : Math.floor(this.length / this.bufferSize + 1);
            let buf = new ArrayBuffer(this.bufferSize);
            this.returnMsg = `audioRenderer write start.......... \n`;
            while (true) {
                for (let i = 0; i < len; i++) {
                    let options = {
                        offset: i * this.bufferSize + this.offset,
                        length: this.bufferSize
                    };
                    await fs.read(this.fd, buf, options);
                    let writeSize = await new Promise((resolve, reject) => {
                        this.audioRenderer.write(buf, (err, writeSize) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(writeSize);
                            }
                        });
                    });
                }
            }
            _this.returnMsg += `audioRenderer write end, state:${_this.audioRenderer.state}\n`;
        }
        catch (err) {
            this.returnMsg += `audioRenderer write : Error: ${JSON.stringify(err)}\n`;
            console.info(`${this.tag} audioRenderer write err: ${err}, message: ${err.message}, code: ${err.code}`);
        }
    }
    drainRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to drain\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.drain((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer drain : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer drain : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    stopRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to stop\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.stop((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer stop : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer stop : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    pauseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to pause\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.pause((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer pause : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer pause : SUCCESS,state:${_this.audioRenderer.state}\n`;
            }
        });
    }
    releaseRenderer() {
        if (this.audioRenderer == null) {
            this.returnMsg = `audioRenderer instance had not created,dont‘t allow to release\n`;
            return;
        }
        let _this = this;
        _this.audioRenderer.release((err) => {
            if (err) {
                _this.returnMsg = `audioRenderer release : Error: ${JSON.stringify(err)}\n`;
            }
            else {
                _this.returnMsg = `audioRenderer release SUCCESS,state:${_this.audioRenderer.state}\n`;
                _this.audioRenderer = null;
                _this.isWrite = false;
            }
        });
    }
    async selectOutputDeviceDistributed() {
        let outputAudioDeviceDescriptor = await this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG);
        this.returnMsg += `selectOutputDevice DISTRIBUTED_OUTPUT_DEVICES_FLAG:` + JSON.stringify(outputAudioDeviceDescriptor) + `\n`;
        this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err, data) => {
            if (err) {
                this.returnMsg += `selectOutputDevice DISTRIBUTED_OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`;
            }
            this.returnMsg += `selectOutputDevice DISTRIBUTED_OUTPUT_DEVICES_FLAG success\n`;
        });
    }
    selectOutputDeviceByFilterLocal() {
        let audioDeviceDescriptorsLocal;
        this.audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG, (err, data) => {
            if (err) {
                this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`;
            }
            audioDeviceDescriptorsLocal = data;
            this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptorsLocal)}\n`;
        });
        let outputAudioRendererFilter = {
            rendererInfo: this.renderInfo[this.selectedVolumeTypeKey].main,
            rendererId: 0
        };
        this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, audioDeviceDescriptorsLocal, (err) => {
            if (err) {
                this.returnMsg += `selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}\n`;
            }
            this.returnMsg += `selectOutputDeviceByFilter success\n`;
        });
    }
    selectOutputDeviceByFilterDistributed() {
        let audioDeviceDescriptorsDistributed;
        this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG, (err, data) => {
            if (err) {
                this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`;
            }
            audioDeviceDescriptorsDistributed = data;
            this.returnMsg += `getDevices OUTPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptorsDistributed)}\n`;
        });
        let outputAudioRendererFilter = {
            rendererInfo: this.renderInfo[this.selectedVolumeTypeKey].main,
            rendererId: 0
        };
        this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, audioDeviceDescriptorsDistributed, (err) => {
            if (err) {
                this.returnMsg += `selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}\n`;
            }
            this.returnMsg += `selectOutputDeviceByFilter success\n`;
        });
    }
    async selectOutputDeviceLocal() {
        let outputAudioDeviceDescriptor = await this.audioRoutingManager.getDevices(audio.DeviceFlag.OUTPUT_DEVICES_FLAG);
        this.returnMsg += `selectOutputDevice OUTPUT_DEVICES_FLAG:` + JSON.stringify(outputAudioDeviceDescriptor) + `\n`;
        this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err, data) => {
            if (err) {
                this.returnMsg += `selectOutputDevice OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`;
            }
            this.returnMsg += `selectOutputDevice OUTPUT_DEVICES_FLAG success\n`;
        });
    }
    async selectOutputDevice() {
        let outputAudioDeviceDescriptor = [{
                deviceRole: this.selectedRole,
                deviceType: this.selectedDevice,
                id: 1,
                name: "",
                address: "",
                sampleRates: [44100],
                channelCounts: [1],
                channelMasks: [0],
                networkId: audio.LOCAL_NETWORK_ID,
                interruptGroupId: 1,
                volumeGroupId: 1,
                displayName: "HUAWEI MATE 40"
            }];
        try {
            this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err, data) => {
                if (err) {
                    console.info(`${this.tag} selectOutputDevice err code: ${err.code}, err message:${err.message}`);
                    this.returnMsg += `selectOutputDevice: ${err.code}, err message:${err.message}\n`;
                }
                else {
                    console.info(`${this.tag} selectOutputDevice success`);
                    this.returnMsg += `selectOutputDevice success\n`;
                }
            });
        }
        catch (err) {
            console.info(`${this.tag} selectOutputDevice err code: ${err.code}, err message:${err.message}`);
            this.returnMsg += `selectOutputDevice: ${err.code}, err message:${err.message}\n`;
        }
    }
    async selectOutputDeviceByFilter() {
        try {
            let outputAudioDeviceDescriptor = [{
                    deviceRole: this.selectedRole,
                    deviceType: this.selectedDevice,
                    id: 3,
                    name: "",
                    address: "",
                    sampleRates: [0],
                    channelCounts: [0],
                    channelMasks: [0],
                    networkId: this.selectedNetworkIdKey,
                    interruptGroupId: 2,
                    volumeGroupId: 2,
                    displayName: ""
                }];
            let audioDeviceDescriptorsDistributed;
            this.audioRoutingManager.getDevices(audio.DeviceFlag.DISTRIBUTED_OUTPUT_DEVICES_FLAG, (err, data) => {
                if (err) {
                    this.returnMsg += `getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`;
                }
                audioDeviceDescriptorsDistributed = data;
                this.returnMsg += `getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptorsDistributed)}\n`;
                console.info(`${this.tag} getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG audioDeviceDescriptorsDistributed:${JSON.stringify(audioDeviceDescriptorsDistributed)}`);
            });
            outputAudioDeviceDescriptor[0].id = audioDeviceDescriptorsDistributed;
            console.info(`${this.tag} getDevices DISTRIBUTED_OUTPUT_DEVICES_FLAG outputAudioDeviceDescriptor1 ${JSON.stringify(outputAudioDeviceDescriptor)}`);
            let outputAudioRendererFilter = {
                rendererInfo: this.renderInfo[this.selectedVolumeTypeKey].main,
                rendererId: 0
            };
            this.audioRoutingManager.selectOutputDeviceByFilter(outputAudioRendererFilter, audioDeviceDescriptorsDistributed, (err, data) => {
                if (err) {
                    console.info(`${this.tag} selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}`);
                    this.returnMsg += `selectOutputDeviceByFilter selectedRole:${this.selectedRole},selectedDevice: ${this.selectedDevice} err code: ${err.code}, err message:${err.message}\n`;
                }
                else {
                    console.info(`${this.tag} selectOutputDeviceByFilter success`);
                    this.returnMsg += `selectOutputDeviceByFilter selectedRole:${this.selectedRole},selectedDevice: ${this.selectedDevice} success\n`;
                }
            });
        }
        catch (err) {
            console.info(`${this.tag} selectOutputDeviceByFilter err code: ${err.code}, err message:${err.message}`);
        }
    }
    async selectInputDeviceLocal() {
        try {
            let inputAudioDeviceDescriptor = [{
                    deviceRole: this.selectedRole,
                    deviceType: this.selectedDevice,
                    id: 2,
                    name: "",
                    address: "",
                    sampleRates: [44100],
                    channelCounts: [2],
                    channelMasks: [0],
                    networkId: audio.LOCAL_NETWORK_ID,
                    interruptGroupId: 1,
                    volumeGroupId: 1,
                    displayName: "HUAWEI MATE 40"
                }];
            let audioDeviceDescriptors;
            this.audioRoutingManager.getDevices(audio.DeviceFlag.INPUT_DEVICES_FLAG, (err, data) => {
                if (err) {
                    this.returnMsg += `getDevices INPUT_DEVICES_FLAG err code: ${err.code}, err message:${err.message}\n`;
                }
                audioDeviceDescriptors = data;
                this.returnMsg += `getDevices INPUT_DEVICES_FLAG success: ${JSON.stringify(audioDeviceDescriptors)}\n`;
                console.info(`${this.tag} selectInputDevice audioDeviceDescriptors ${JSON.stringify(audioDeviceDescriptors)}`);
            });
            console.info(`${this.tag} selectInputDevice inputAudioDeviceDescriptor ${JSON.stringify(inputAudioDeviceDescriptor)}`);
            this.audioRoutingManager.selectInputDevice(inputAudioDeviceDescriptor, (err, data) => {
                if (err) {
                    console.info(`${this.tag} selectInputDevice err code: ${err.code}, err message:${err.message}`);
                    this.returnMsg += `selectInputDevice err code: ${err.code}, err message:${err.message}\n`;
                }
                else {
                    console.info(`${this.tag} selectInputDevice success`);
                    this.returnMsg += `selectInputDevice  success\n`;
                }
            });
        }
        catch (err) {
            console.info(`${this.tag} selectInputDevice err code: ${err.code}, err message:${err.message}`);
        }
    }
    getVolumeGroupInfos() {
        let _this = this;
        this.audioVolumeManager.getVolumeGroupInfos(this.selectedNetworkIdKey, (err, data) => {
            if (err) {
                _this.returnMsg += `getVolumeGroupInfos err code: ${err.code}, err message:${err.message}\n`;
            }
            _this.returnMsg += `getVolumeGroupInfos success:` + JSON.stringify(data) + `\n`;
        });
    }
    getVolumeGroupManager() {
        this.audioVolumeManager.getVolumeGroupManager(Number(this.selectedGroupIdKey), (err, data) => {
            if (err) {
                this.returnMsg += `getVolumeGroupManager err code: ${err.code}, err message:${err.message}\n`;
            }
            this.returnMsg += `getVolumeGroupManager success:` + JSON.stringify(data) + `\n`;
            this.audioVolumeGroupManager = data;
        });
    }
    async getVolumeRange() {
        this.minVolumeVolumeGroupManager = await this.audioVolumeGroupManager.getMinVolume(this.selectedVolumeType);
        this.maxVolumeVolumeGroupManager = await this.audioVolumeGroupManager.getMaxVolume(this.selectedVolumeType);
        this.returnMsg = `minVolumeVolumeGroupManager: ${this.minVolumeVolumeGroupManager}; maxVolumeVolumeGroupManager: ${this.maxVolumeVolumeGroupManager}\n`;
    }
    async getVolumeRangeAudioManager() {
        this.minVolumeAudioManager = await this.audioManager.getMinVolume(this.selectedVolumeType);
        this.maxVolumeAudioManager = await this.audioManager.getMaxVolume(this.selectedVolumeType);
        this.returnMsg = `minVolumeAudioManager: ${this.minVolumeAudioManager}; maxVolumeAudioManager: ${this.maxVolumeAudioManager} \n`;
    }
    setVolumeAudioManager() {
        this.audioManager.setVolume(this.selectedVolumeType, this.selectedVolumeAudioManager, (err, data) => {
            if (err) {
                this.returnMsg = `setVolume(AudioManager) ${this.selectedVolumeAudioManager} err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `setVolume(AudioManager) ${this.selectedVolumeAudioManager} success`;
            }
        });
    }
    getVolumeAudioManager() {
        this.audioManager.getVolume(this.selectedVolumeType, (err, data) => {
            if (err) {
                this.returnMsg = `getVolume(AudioManager) ${this.selectedVolumeAudioManager} err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `getVolume(AudioManager) ${this.selectedVolumeAudioManager} success: ${data}`;
            }
        });
    }
    setVolumeVolumeGroupManager() {
        this.audioVolumeGroupManager.setVolume(this.selectedVolumeType, this.selectedVolumeVolumeGroupManager, (err, data) => {
            if (err) {
                this.returnMsg = `setVolume ${this.selectedVolumeVolumeGroupManager} err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `setVolume ${this.selectedVolumeVolumeGroupManager} success`;
            }
        });
    }
    getVolumeVolumeGroupManager() {
        this.audioVolumeGroupManager.getVolume(this.selectedVolumeType, (err, data) => {
            if (err) {
                this.returnMsg = `getVolume VolumeGroupManager ${this.selectedVolumeVolumeGroupManager} err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `getVolume VolumeGroupManager ${this.selectedVolumeVolumeGroupManager} success: ${data}`;
            }
        });
    }
    onVolumeChange() {
        this.audioVolumeManager.on('volumeChange', (err) => {
            if (err) {
                this.returnMsg = `onVolumeChange audioVolumeManager  err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `onVolumeChange audioVolumeManager success`;
            }
        });
    }
    muteVolumeGroupManager() {
        this.audioVolumeGroupManager.mute(this.selectedVolumeType, this.selectedMuteValue, (err, data) => {
            if (err) {
                this.returnMsg = `mute(${this.selectedMuteValue}) audioVolumeGroupManager  err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `mute(${this.selectedMuteValue}) audioVolumeGroupManager success`;
            }
        });
    }
    isMuteVolumeGroupManager() {
        this.audioVolumeGroupManager.isMute(this.selectedVolumeType, (err, data) => {
            if (err) {
                this.returnMsg = `isMute audioVolumeGroupManager  err: ${JSON.stringify(err)}`;
            }
            else {
                this.returnMsg = `isMute audioVolumeGroupManager success: ${data}`;
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
        Column.height(300);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【分布式投播(ALL)-Callback】返回数据：");
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
        Scroll.margin({ top: 310 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.volumeTypeList);
        Select.value(this.selectedVolumeTypeKey);
        Select.onSelect(async (index, value) => {
            this.selectedVolumeType = audio.AudioVolumeType[value];
            this.selectedVolumeTypeKey = value;
            this.audioRendererOptions.rendererInfo = this.renderInfo[this.selectedVolumeTypeKey].main;
            this.selectedStreamUsageKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedStreamUsageKey;
            this.selectedContentTypeKey = this.renderInfo[this.selectedVolumeTypeKey].info.selectedContentTypeKey;
            if (this.audioRenderer !== null) {
                await this.audioRenderer.release();
                this.audioRenderer = null;
                this.isWrite = false;
            }
            this.getVolumeRangeAudioManager();
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        If.create();
        if (this.selectedVolumeTypeKey !== "volumeType") {
            If.branchId(0);
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color(Color.Blue);
            Divider.margin({ bottom: 20 });
            Row.create();
            Text.create("音量");
            Text.fontSize(20);
            Text.pop();
            Slider.create({
                value: this.selectedVolumeAudioManager,
                min: this.minVolumeAudioManager,
                max: this.maxVolumeAudioManager,
                step: 1,
                style: SliderStyle.InSet
            });
            Slider.blockColor('#191970');
            Slider.trackColor('#ADD8E6');
            Slider.selectedColor('#4169E1');
            Slider.showTips(true);
            Slider.onChange((value: number, mode: SliderChangeMode) => {
                this.selectedVolumeAudioManager = Number(value.toFixed(0));
                console.info(`${this.tag} value: ${value}, mode: ${mode.toString()}`);
            });
            Slider.width('80%');
            Text.create(this.selectedVolumeAudioManager.toFixed(0));
            Text.fontSize(24);
            Text.pop();
            Row.pop();
            Text.create(`${this.selectedContentTypeKey}`);
            Text.fontSize(16);
            Text.lineHeight(40);
            Text.pop();
            Text.create(`${this.selectedStreamUsageKey}`);
            Text.fontSize(16);
            Text.lineHeight(40);
            Text.pop();
        }
        If.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.setVolumeAudioManager());
        Text.create("setVolume audioManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.getVolumeAudioManager());
        Text.create("getVolume audioManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            this.createAudioRenderer();
        });
        Text.create("createAudioRenderer callback");
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
            this.rendererStart();
        });
        Text.create("start callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.getBufferSize();
        });
        Text.create("getBufferSize callback");
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
            this.writeRenderer();
        });
        Text.create("write callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => {
            this.drainRenderer();
        });
        Text.create("drain callback");
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
            this.pauseRenderer();
        });
        Text.create("pause callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.stopRenderer());
        Text.create("stop callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.onInterrupt());
        Text.create("onInterrupt");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.releaseRenderer());
        Text.create("release callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDeviceDistributed());
        Text.create("selectOutputDeviceDistributed callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDeviceLocal());
        Text.create("selectOutputDeviceLocal callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDeviceByFilterLocal());
        Text.create("selectOutputDeviceByFilterLocal callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDeviceByFilterDistributed());
        Text.create("selectOutputDeviceByFilterDistributed callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.networkIdList);
        Select.value(this.selectedNetworkIdKey);
        Select.onSelect((index, value) => {
            this.selectedNetworkIdKey = value;
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.getVolumeGroupInfos());
        Text.create("getVolumeGroupInfos callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.groupIdList);
        Select.value(this.selectedGroupIdKey);
        Select.onSelect((index, value) => {
            this.selectedGroupIdKey = value;
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => {
            this.getVolumeGroupManager();
            this.getVolumeRange();
        });
        Text.create("getVolumeGroupManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Text.create(this.selectedVolumeTypeKey);
        Text.fontSize(22);
        Text.pop();
        Row.pop();
        If.create();
        if (this.selectedVolumeTypeKey !== "volumeType") {
            If.branchId(0);
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color(Color.Blue);
            Divider.margin({ bottom: 20 });
            Row.create();
            Text.create("音量");
            Text.fontSize(20);
            Text.pop();
            Slider.create({
                value: this.selectedVolumeVolumeGroupManager,
                min: this.minVolumeVolumeGroupManager,
                max: this.maxVolumeVolumeGroupManager,
                step: 1,
                style: SliderStyle.InSet
            });
            Slider.blockColor('#191970');
            Slider.trackColor('#ADD8E6');
            Slider.selectedColor('#4169E1');
            Slider.showTips(true);
            Slider.onChange((value: number, mode: SliderChangeMode) => {
                this.selectedVolumeVolumeGroupManager = Number(value.toFixed(0));
                console.info(`${this.tag} value: ${value}, mode: ${mode.toString()}`);
            });
            Slider.width('80%');
            Text.create(this.selectedVolumeVolumeGroupManager.toFixed(0));
            Text.fontSize(24);
            Text.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.setVolumeVolumeGroupManager());
        Text.create("setVolume audioVolumeGroupManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.getVolumeVolumeGroupManager());
        Text.create("getVolume audioVolumeGroupManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.muteList);
        Select.value(this.selectedMuteKey);
        Select.onSelect((index, value) => {
            this.selectedMuteKey = value;
            this.selectedMuteValue = (value === "true");
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.muteVolumeGroupManager());
        Text.create("mute audioVolumeGroupManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.isMuteVolumeGroupManager());
        Text.create("isMute audioVolumeGroupManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.onVolumeChange());
        Text.create("onVolumeChange audioVolumeManager callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color(Color.Blue);
        Divider.margin({ top: 10 });
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.deviceList);
        Select.value(this.selectedDeviceKey);
        Select.onSelect((index, value) => {
            this.selectedDeviceKey = value;
            this.selectedDevice = audio.DeviceType[value];
            console.info(`${this.tag} DeviceType : ${audio.DeviceType[value]}`);
            console.info(`${this.tag} selectedDevice : ${this.selectedDevice}`);
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.deviceRoleList);
        Select.value(this.selectedRoleKey);
        Select.onSelect((index, value) => {
            this.selectedRoleKey = value;
            this.selectedRole = audio.DeviceRole[value];
            console.info(`${this.tag} DeviceRole : ${audio.DeviceRole[value]}`);
            console.info(`${this.tag} deviceRoleList : ${this.selectedRole}`);
        });
        Select.font({ size: 22 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDevice());
        Text.create("selectoutputDevice callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectOutputDeviceByFilter());
        Text.create("selectoutputDeviceByFilter callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Button.createWithChild();
        Button.width('100%');
        Button.height(60);
        Button.onClick(() => this.selectInputDeviceLocal());
        Text.create("selectInputDeviceLocal callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new DistributedAudioCallback("1", undefined, {}));
