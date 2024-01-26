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

@Entry
@Component
struct Mic_index {
  private mediaManager = new MediaManager(getContext(this) as common.UIAbilityContext);
  private audioModel: AudioModel = new AudioModel();
  @State record: Record = undefined;
  private recordModel: RecordModel = new RecordModel();
  private millisecond: number = 0;
  @State fileAsset: mediaLibrary.FileAsset = undefined;
  private fd: number = undefined;
  @StorageLink('recordState') recordState: boolean = false;
  @StorageLink('playState') playState: boolean = false;
  @State duration: string = '00:00';
  @State resetAnimation: boolean = false;
  @State time: string = '00:00';

  async finish() {
    await this.mediaManager.saveFileDuration(this.fileAsset.title, this.duration);
    this.recordModel.finish(() => {
      this.recordState = false;
    })
    let recordList = await this.mediaManager.queryAllAudios();
    this.record = recordList[0]
    this.record.init(this.fileAsset)
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
    })
  }

  updateTimeStr() {
    this.millisecond += 1000;
    if (this.recordState) {
      this.duration = updateTime(this.millisecond);
    } else if (this.playState) {
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

  handleChangePlayState = () => {
    if (this.record) {
      this.initAudioPlayer();
      Logger.info(TAG, `handleChangePlayState this.isPlay= ${this.playState}`);
      if (!this.playState) {
        this.audioModel.play(() => {
          Logger.info(TAG, `handleChangePlayState play success`);
          this.playState = !this.playState;
          AppStorage.SetOrCreate('playState', this.playState);
        })
      } else {
        this.audioModel.pause(() => {
          Logger.info(TAG, `handleChangePlayState pause success`);
          this.playState = !this.playState;
          AppStorage.SetOrCreate('playState', this.playState);
        })
      }
    }
  }

  build() {
    Row() {
      Column() {
        TitleBar()
        Column() {
          if (this.record) {
            AudioItem({ record: $record })
          }
        }
        .layoutWeight(1)

        if (this.recordState) {
          Button({ type: ButtonType.Circle, stateEffect: true }) {
            Image($r('app.media.ic_pause'))
              .objectFit(ImageFit.Contain)
              .size({ width: 70, height: 70 })
          }
          .width(70)
          .height(70)
          .borderWidth(1)
          .backgroundColor('#FFFFFF')
          .margin(10)
          .onClick(() => {
            this.finish();
          })
        } else {
          Button({ type: ButtonType.Circle, stateEffect: true }) {
            Image($r('app.media.rectangle'))
              .objectFit(ImageFit.Contain)
              .size({ width: 30, height: 30 })
          }
          .width(70)
          .height(70)
          .borderWidth(1)
          .backgroundColor('#FFFFFF')
          .margin(10)
          .onClick(() => {
            this.startRecord();
          })
        }
      }
      .layoutWeight(2)
      .height('100%')
      .backgroundColor('#F5F5F5')
      .zIndex(2)

      Column() {
        if (this.record) {
          Row() {
            Text(this.record.title)
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Bold)
              .fontSize(30)
              .layoutWeight(1)
          }
          .size({ width: '100%', height: '8%' })
          .constraintSize({ minHeight: 50 })
          .padding({ left: 20 })
        }

        Column() {
          AnimateView({ resetAnimation: $resetAnimation, updateTimeStr: this.updateTimeStr.bind(this) })
          Image($r('app.media.bg_play'))
            .width('100%')
            .height('30%')
            .objectFit(ImageFit.Fill)
          Column() {
            if (this.recordState) {
              Text(this.duration)
                .fontColor(Color.Black)
                .fontSize(35)
            } else {
              Text(this.time)
                .fontColor(Color.Black)
                .fontSize(35)
              Text(this.record ? this.record.duration : '00:00')
                .fontColor(Color.Gray)
                .fontSize(25)
            }
          }

          Button() {
            Image(this.playState ? $r('app.media.pause') : $r('app.media.play'))
              .objectFit(ImageFit.Contain)
              .size({ width: 70, height: 70 })
          }
          .type(ButtonType.Circle)
          .size({ width: 70, height: 70 })
          .backgroundColor('#FFFFFF')
          .layoutWeight(1)
          .margin({ bottom: 15 })
          .onClick(this.handleChangePlayState)
        }
      }
      .layoutWeight(3)
    }
    .size({ width: '100%', height: '100%' })
    .backgroundColor('#F0F0F0')
  }
}