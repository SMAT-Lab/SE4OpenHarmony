interface hornAmplifierButton_Params {
    backColor?: Color;
    btnName?: string;
    avPlayer?: media.AVPlayer;
    // 创建一个controller
    dialogController?: CustomDialogController;
    count?: number;
    isSeek?: boolean;
    fileSize?: number;
    fd?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "hornAmplifierButton_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { commonButton } from './commonButton';
//import headsetRecordingTest from '@ohos.headsetRecordingTest'
import { CustomBatteryDialog } from './dialog';
import media from '@ohos.multimedia.media';
import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';
import Logger from '../../../utils/Logger';
const TAG = '[hornAmplifierButton]';
export class hornAmplifierButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("喇叭功放", this, "btnName");
        this.avPlayer = undefined;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomBatteryDialog("3", this, {
                    backColor: this.__backColor,
                    title: "喇叭功放",
                    message: "喇叭音效正常播放说明合格。",
                    yesEvent: () => {
                        this.avPlayer.release();
                    },
                    noEvent: () => {
                        this.avPlayer.release();
                    },
                });
                jsDialog.setController(this.
                // 创建一个controller
                dialogController);
                View.create(jsDialog);
            },
            cancel: () => {
                this.avPlayer.release();
            },
            autoCancel: true,
            customStyle: true // 使用自定义样式
        }, this);
        this.count = 0;
        this.isSeek = true;
        this.fileSize = -1;
        this.fd = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: hornAmplifierButton_Params) {
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.btnName !== undefined) {
            this.btnName = params.btnName;
        }
        if (params.avPlayer !== undefined) {
            this.avPlayer = params.avPlayer;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.isSeek !== undefined) {
            this.isSeek = params.isSeek;
        }
        if (params.fileSize !== undefined) {
            this.fileSize = params.fileSize;
        }
        if (params.fd !== undefined) {
            this.fd = params.fd;
        }
    }
    aboutToBeDeleted() {
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __backColor: ObservedPropertySimple<Color>;
    get backColor() {
        return this.__backColor.get();
    }
    set backColor(newValue: Color) {
        this.__backColor.set(newValue);
    }
    private __btnName: ObservedPropertySimple<string>;
    get btnName() {
        return this.__btnName.get();
    }
    set btnName(newValue: string) {
        this.__btnName.set(newValue);
    }
    private avPlayer: media.AVPlayer;
    // 创建一个controller
    private dialogController: CustomDialogController;
    private count: number;
    private isSeek: boolean; // 用于区分模式是否支持seek操作
    private fileSize: number;
    private fd: number;
    // 注册avplayer回调函数
    setAVPlayerCallback() {
        // seek操作结果回调函数
        this.avPlayer.on('seekDone', (seekDoneTime: number) => {
            console.info(`AVPlayer seek succeeded, seek time is ${seekDoneTime}`);
        });
        // error回调监听函数,当avPlayer在操作过程中出现错误时调用 reset接口触发重置流程
        this.avPlayer.on('error', (err) => {
            console.error(`Invoke avPlayer failed, code is ${err.code}, message is ${err.message}`);
            this.avPlayer.reset(); // 调用reset重置资源，触发idle状态
        });
        // 状态机变化回调函数
        this.avPlayer.on('stateChange', async (state: string, reason: media.StateChangeReason) => {
            switch (state) {
                case 'idle': // 成功调用reset接口后触发该状态机上报
                    console.info('AVPlayer state idle called.');
                    this.avPlayer.release(); // 调用release接口销毁实例对象
                    break;
                case 'initialized': // avplayer 设置播放源后触发该状态上报
                    console.info('AVPlayer state initialized called.');
                    this.avPlayer.prepare();
                    break;
                case 'prepared': // prepare调用成功后上报该状态机
                    console.info('AVPlayer state prepared called.');
                    this.avPlayer.play(); // 调用播放接口开始播放
                    break;
                case 'playing': // play成功调用后触发该状态机上报
                    console.info('AVPlayer state playing called.');
                    if (this.count !== 0) {
                        if (this.isSeek) {
                            console.info('AVPlayer start to seek.');
                            this.avPlayer.seek(this.avPlayer.duration); //seek到音频末尾
                        }
                        else {
                            // 当播放模式不支持seek操作时继续播放到结尾
                            console.info('AVPlayer wait to play end.');
                        }
                    }
                    else {
                        this.avPlayer.pause(); // 调用暂停接口暂停播放
                    }
                    this.count++;
                    break;
                case 'paused': // pause成功调用后触发该状态机上报
                    console.info('AVPlayer state paused called.');
                    this.avPlayer.play(); // 再次播放接口开始播放
                    break;
                case 'completed': // 播放结束后触发该状态机上报
                    console.info('AVPlayer state completed called.');
                    this.avPlayer.stop(); //调用播放结束接口
                    break;
                case 'stopped': // stop接口成功调用后触发该状态机上报
                    console.info('AVPlayer state stopped called.');
                    this.avPlayer.reset(); // 调用reset接口初始化avplayer状态
                    break;
                case 'released':
                    console.info('AVPlayer state released called.');
                    break;
                default:
                    console.info('AVPlayer state unknown called.');
                    break;
            }
        });
    }
    aboutToDisappear() {
        delete this.dialogController; // 删除dialogController
        this.dialogController = undefined; // 将dialogController置空
        this.avPlayer.release();
    }
    async playAudio() {
        // 创建avPlayer实例对象
        this.avPlayer = await media.createAVPlayer();
        // 创建状态机变化回调函数
        this.setAVPlayerCallback();
        // 通过UIAbilityContext的resourceManager成员的getRawFd接口获取媒体资源播放地址
        // 返回类型为{fd,offset,length},fd为HAP包fd地址，offset为媒体资源偏移量，length为播放长度
        let context = getContext(this) as common.UIAbilityContext;
        let fileDescriptor = await context.resourceManager.getRawFd('EP11.mp4');
        // 为fdSrc赋值触发initialized状态机上报
        this.avPlayer.fdSrc = fileDescriptor;
    }
    render() {
        Column.create();
        __Common__.create();
        __Common__.onClick(() => {
            this.dialogController.open();
            await this.playAudio();
        });
        let earlierCreatedChild_2: commonButton = (this && this.findChildById) ? this.findChildById("2") as commonButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new commonButton("2", this, {
                backColor: this.__backColor,
                btnName: this.__btnName,
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Column.pop();
    }
}
