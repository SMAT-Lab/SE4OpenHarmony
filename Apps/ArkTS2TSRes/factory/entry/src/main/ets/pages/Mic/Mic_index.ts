interface Mic_index_Params {
    mediaManager?;
    audioModel?: AudioModel;
    record?: Record;
    recordModel?: RecordModel;
    millisecond?: number;
    fileAsset?: mediaLibrary.FileAsset;
    fd?: number;
    recordState?: boolean;
    playState?: boolean;
    duration?: string;
    resetAnimation?: boolean;
    time?: string;
    handleChangePlayState?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Mic_index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import common from '@ohos.app.ability.common';
import Logger from '../../model/Logger';
import MediaManager from './MediaManager';
import { AudioModel } from './AudioModel';
import { Record } from './Record';
import { RecordModel } from './RecordModel';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { updateTime } from '../../model/Utils';
import { AnimateView } from './AnimateView';
import { TitleBar } from '../../common/TitleBar';
import { AudioItem } from './AudioItem';
let TAG = '[Mic_index]';
class Mic_index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mediaManager = new MediaManager(getContext(this) as common.UIAbilityContext);
        this.audioModel = new AudioModel();
        this.__record = new ObservedPropertyObject(undefined, this, "record");
        this.recordModel = new RecordModel();
        this.millisecond = 0;
        this.__fileAsset = new ObservedPropertyObject(undefined, this, "fileAsset");
        this.fd = undefined;
        this.__recordState = AppStorage.SetAndLink('recordState', false, this, "recordState");
        this.__playState = AppStorage.SetAndLink('playState', false, this, "playState");
        this.__duration = new ObservedPropertySimple('00:00', this, "duration");
        this.__resetAnimation = new ObservedPropertySimple(false, this, "resetAnimation");
        this.__time = new ObservedPropertySimple('00:00', this, "time");
        this.handleChangePlayState = () => {
            if (this.record) {
                this.initAudioPlayer();
                Logger.info(TAG, `handleChangePlayState this.isPlay= ${this.playState}`);
                if (!this.playState) {
                    this.audioModel.play(() => {
                        Logger.info(TAG, `handleChangePlayState play success`);
                        this.playState = !this.playState;
                        AppStorage.SetOrCreate('playState', this.playState);
                    });
                }
                else {
                    this.audioModel.pause(() => {
                        Logger.info(TAG, `handleChangePlayState pause success`);
                        this.playState = !this.playState;
                        AppStorage.SetOrCreate('playState', this.playState);
                    });
                }
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Mic_index_Params) {
        if (params.mediaManager !== undefined) {
            this.mediaManager = params.mediaManager;
        }
        if (params.audioModel !== undefined) {
            this.audioModel = params.audioModel;
        }
        if (params.record !== undefined) {
            this.record = params.record;
        }
        if (params.recordModel !== undefined) {
            this.recordModel = params.recordModel;
        }
        if (params.millisecond !== undefined) {
            this.millisecond = params.millisecond;
        }
        if (params.fileAsset !== undefined) {
            this.fileAsset = params.fileAsset;
        }
        if (params.fd !== undefined) {
            this.fd = params.fd;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.resetAnimation !== undefined) {
            this.resetAnimation = params.resetAnimation;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.handleChangePlayState !== undefined) {
            this.handleChangePlayState = params.handleChangePlayState;
        }
    }
    aboutToBeDeleted() {
        this.__record.aboutToBeDeleted();
        this.__fileAsset.aboutToBeDeleted();
        this.__recordState.aboutToBeDeleted();
        this.__playState.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__resetAnimation.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mediaManager;
    private audioModel: AudioModel;
    private __record: ObservedPropertyObject<Record>;
    get record() {
        return this.__record.get();
    }
    set record(newValue: Record) {
        this.__record.set(newValue);
    }
    private recordModel: RecordModel;
    private millisecond: number;
    private __fileAsset: ObservedPropertyObject<mediaLibrary.FileAsset>;
    get fileAsset() {
        return this.__fileAsset.get();
    }
    set fileAsset(newValue: mediaLibrary.FileAsset) {
        this.__fileAsset.set(newValue);
    }
    private fd: number;
    private __recordState: ObservedPropertyAbstract<boolean>;
    get recordState() {
        return this.__recordState.get();
    }
    set recordState(newValue: boolean) {
        this.__recordState.set(newValue);
    }
    private __playState: ObservedPropertyAbstract<boolean>;
    get playState() {
        return this.__playState.get();
    }
    set playState(newValue: boolean) {
        this.__playState.set(newValue);
    }
    private __duration: ObservedPropertySimple<string>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: string) {
        this.__duration.set(newValue);
    }
    private __resetAnimation: ObservedPropertySimple<boolean>;
    get resetAnimation() {
        return this.__resetAnimation.get();
    }
    set resetAnimation(newValue: boolean) {
        this.__resetAnimation.set(newValue);
    }
    private __time: ObservedPropertySimple<string>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: string) {
        this.__time.set(newValue);
    }
    async finish() {
        await this.mediaManager.saveFileDuration(this.fileAsset.title, this.duration);
        this.recordModel.finish(() => {
            this.recordState = false;
        });
        let recordList = await this.mediaManager.queryAllAudios();
        this.record = recordList[0];
        this.record.init(this.fileAsset);
        Logger.info(TAG, `handleChangePlayState this.record= ${JSON.stringify(this.record)}`);
        this.audioModel.initAudioPlayer(this.fileAsset, true);
    }
    async startRecord() {
        this.recordModel.initAudioRecorder();
        if (this.record) {
            await this.mediaManager.deleteFile(this.record.fileAsset);
        }
        this.fileAsset = await this.mediaManager.createAudioFile();
        this.fd = await this.fileAsset.open('Rw');
        this.recordModel.startRecorder(`fd://${this.fd}`, () => {
            Logger.info(TAG, 'startRecorder callback success');
            this.millisecond = 0;
            this.recordState = true;
        });
    }
    updateTimeStr() {
        this.millisecond += 1000;
        if (this.recordState) {
            this.duration = updateTime(this.millisecond);
        }
        else if (this.playState) {
            this.time = updateTime(this.millisecond);
        }
    }
    async aboutToAppear() {
        this.record.init(undefined);
    }
    async onPageHide() {
        await this.mediaManager.deleteFile(this.record.fileAsset);
    }
    initAudioPlayer() {
        this.audioModel.onFinish(() => {
            this.playState = false;
            this.reset();
        });
        this.playState = false;
        this.reset();
    }
    reset() {
        this.time = '00:00';
        this.millisecond = 0;
        this.resetAnimation = !this.resetAnimation;
    }
    private handleChangePlayState;
    render() {
        Row.create();
        Row.size({ width: '100%', height: '100%' });
        Row.backgroundColor('#F0F0F0');
        Column.create();
        Column.layoutWeight(2);
        Column.height('100%');
        Column.backgroundColor('#F5F5F5');
        Column.zIndex(2);
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.layoutWeight(1);
        If.create();
        if (this.record) {
            If.branchId(0);
            let earlierCreatedChild_3: AudioItem = (this && this.findChildById) ? this.findChildById("3") as AudioItem : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new AudioItem("3", this, { record: this.__record }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Column.pop();
        If.create();
        if (this.recordState) {
            If.branchId(0);
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.width(70);
            Button.height(70);
            Button.borderWidth(1);
            Button.backgroundColor('#FFFFFF');
            Button.margin(10);
            Button.onClick(() => {
                this.finish();
            });
            Image.create($r('app.media.ic_pause'));
            Image.objectFit(ImageFit.Contain);
            Image.size({ width: 70, height: 70 });
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.width(70);
            Button.height(70);
            Button.borderWidth(1);
            Button.backgroundColor('#FFFFFF');
            Button.margin(10);
            Button.onClick(() => {
                this.startRecord();
            });
            Image.create($r('app.media.rectangle'));
            Image.objectFit(ImageFit.Contain);
            Image.size({ width: 30, height: 30 });
            Button.pop();
        }
        If.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(3);
        If.create();
        if (this.record) {
            If.branchId(0);
            Row.create();
            Row.size({ width: '100%', height: '8%' });
            Row.constraintSize({ minHeight: 50 });
            Row.padding({ left: 20 });
            Text.create(this.record.title);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
            Text.fontSize(30);
            Text.layoutWeight(1);
            Text.pop();
            Row.pop();
        }
        If.pop();
        Column.create();
        let earlierCreatedChild_4: AnimateView = (this && this.findChildById) ? this.findChildById("4") as AnimateView : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new AnimateView("4", this, { resetAnimation: this.__resetAnimation, updateTimeStr: this.updateTimeStr.bind(this) }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                updateTimeStr: this.updateTimeStr.bind(this)
            });
            View.create(earlierCreatedChild_4);
        }
        Image.create($r('app.media.bg_play'));
        Image.width('100%');
        Image.height('30%');
        Image.objectFit(ImageFit.Fill);
        Column.create();
        If.create();
        if (this.recordState) {
            If.branchId(0);
            Text.create(this.duration);
            Text.fontColor(Color.Black);
            Text.fontSize(35);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create(this.time);
            Text.fontColor(Color.Black);
            Text.fontSize(35);
            Text.pop();
            Text.create(this.record ? this.record.duration : '00:00');
            Text.fontColor(Color.Gray);
            Text.fontSize(25);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Button.createWithChild();
        Button.type(ButtonType.Circle);
        Button.size({ width: 70, height: 70 });
        Button.backgroundColor('#FFFFFF');
        Button.layoutWeight(1);
        Button.margin({ bottom: 15 });
        Button.onClick(this.handleChangePlayState);
        Image.create(this.playState ? $r('app.media.pause') : $r('app.media.play'));
        Image.objectFit(ImageFit.Contain);
        Image.size({ width: 70, height: 70 });
        Button.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Mic_index("1", undefined, {}));
