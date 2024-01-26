/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import promptAction from '@ohos.promptAction';
import { AddPictures } from '../components/AddPictures';
import { BackgroundTaskState, requestUpload, TOAST_BOTTOM } from '@ohos/uploaddownload';

const TIME_MAX: number = 5;

@Entry
@Component
struct Upload {
  @StorageLink('isBackground') isBackground: boolean = false;
  @StorageLink('backTaskState') @Watch('stateChange') backTaskState: BackgroundTaskState = BackgroundTaskState.NONE;
  @State isBegin: boolean = false;
  @Provide imageList: Array<string> = [];
  @State progress: number = 0;
  @State countdown: number = 0;

  build() {
    Navigation() {
      Scroll() {
        AddPictures()
      }
      .padding({ left: 24, right: 24 })
      .width('100%')
      .layoutWeight(1)
      .align(Alignment.Top)

      Column() {
        Button() {
          if (this.isBackground && this.backTaskState !== BackgroundTaskState.NONE) {
            if (this.backTaskState === BackgroundTaskState.RUNNING) {
              Text($r('app.string.pause'))
                .fontSize(16)
                .fontWeight(500)
                .fontColor($r('app.color.white'))
            } else {
              Text($r('app.string.continue'))
                .fontSize(16)
                .fontWeight(500)
                .fontColor($r('app.color.white'))
            }
          } else if (this.isBegin && !this.isBackground) {
            Row() {
              Progress({ value: this.progress, type: ProgressType.Ring })
                .width(20)
                .height(20)
                .backgroundColor('#FFFFFF')
                .color('#558DFF')
                .style({ strokeWidth: 2, scaleCount: 100, scaleWidth: 2 })
              Text(`${this.getResourceString($r('app.string.uploading'))}${this.progress}%`)
                .fontSize(16)
                .fontColor(0xffffff)
                .fontWeight(500)
                .margin({ left: 12 })
            }.alignItems(VerticalAlign.Center)
          } else {
            if (this.countdown > 0) {
              Text(`${this.countdown}s`)
                .fontSize(16)
                .fontWeight(500)
                .fontColor($r('app.color.white'))
            } else {
              Text($r('app.string.upload'))
                .fontSize(16)
                .fontWeight(500)
                .fontColor($r('app.color.white'))
            }
          }
        }
        .id('publish')
        .width('100%')
        .height(40)
        .margin({ bottom: this.isBegin ? 16 : 24 })
        .enabled(this.countdown > 0 ? false : true)
        .backgroundColor($r('app.color.button_blue'))
        .onClick(() => {
          if (this.isBackground && this.backTaskState !== BackgroundTaskState.NONE) {
            requestUpload.pauseOrResume();
          } else {
            this.uploadFiles();
          }
        })

        if (this.isBegin) {
          Button() {
            Text($r('app.string.cancel'))
              .fontSize(16)
              .fontWeight(500)
              .fontColor($r('app.color.btn_text_blue'))
          }
          .id('cancel')
          .width('100%')
          .height(40)
          .margin({ bottom: 24 })
          .backgroundColor($r('app.color.button_light_gray'))
          .onClick(() => {
            // 取消上传任务
            requestUpload.cancelTask();
            this.progress = 0;
            this.isBegin = false;
          })
        }
      }
      .width('100%')
      .padding({ left: 24, right: 24 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.light_gray'))
    .title($r('app.string.upload'))
    .hideBackButton(false)
    .titleMode(NavigationTitleMode.Mini)
    .mode(NavigationMode.Stack)
  }

  aboutToAppear() {
    this.isBegin = false;
    this.backTaskState = BackgroundTaskState.NONE;
  }

  stateChange() {
    if (this.backTaskState === BackgroundTaskState.NONE) {
      this.imageList = [];
    }
  }

  uploadFiles() {
    if (this.imageList.length == 0) {
      return;
    }
    if (this.isBackground) {
      AppStorage.SetOrCreate('backTaskState', BackgroundTaskState.RUNNING)
      requestUpload.uploadFilesBackground(this.imageList);
      promptAction.showToast({ message: $r('app.string.background_task_start'), bottom: TOAST_BOTTOM });
    } else {
      this.isBegin = true;
      this.progress = 0;
      requestUpload.uploadFiles(this.imageList, (progress: number, isSucceed: boolean) => {
        this.progress = progress;
        if (this.progress === 100 && isSucceed) {
          this.isBegin = false;
          this.imageList = [];
          promptAction.showToast({ message: $r('app.string.upload_success'), bottom: TOAST_BOTTOM })
        }
        if (this.progress === 100 && isSucceed === false) {
          this.isBegin = false;
          this.countdown = TIME_MAX;
          let interval = setInterval(() => {
            if (this.countdown > 0) {
              this.countdown--;
            } else {
              clearInterval(interval);
            }
          }, 1000);
          promptAction.showToast({ message: $r('app.string.upload_fail'), bottom: TOAST_BOTTOM })
        }
      });
    }
  }

  getResourceString(resource: Resource) {
    let context = getContext(this) as common.UIAbilityContext;
    return context.resourceManager.getStringSync(resource.id);
  }
}