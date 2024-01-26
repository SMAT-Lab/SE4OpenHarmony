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

import avPlayManage from '../videomanager/AvPlayManager';
import media from '@ohos.multimedia.media';
import wf from '@ohos.wifiManager';
import promptAction from '@ohos.promptAction';
import resourceManager from '@ohos.resourceManager';
import { GlobalContext } from '../utils/GlobalContext';
import common from '@ohos.app.ability.common';

const VIDEOSELECT = 2; // 网络视频索引

@Component
export struct VideoPanel {
  @State videoList: Resource[] = [$r('app.string.video_res_1'), $r('app.string.video_res_2'), $r('app.string.video_res_3')];
  @State selectColor: boolean = true;
  @Link show: boolean;
  @Link videoSelect: number; // 当前选择项的索引
  @StorageLink('avPlayManage') avPlayManage: avPlayManage = new avPlayManage();
  @State linkSpeed: number = 0;

  // 判断是否联网
  async checkWifiState(): Promise<boolean> {
    let linkInfo = await wf.getLinkedInfo();
    if (linkInfo.connState !== wf.ConnState.CONNECTED) {
      return false;
    }
    return true;
  }

  async isInternet(): Promise<void> {
    if (!await this.checkWifiState() && this.videoSelect === VIDEOSELECT) {
      this.toast();
    }
  }

  async toast() {
    promptAction.showToast({
      message: $r('app.string.video_warn'),
      duration: 2000,
    });
    setTimeout(() => {
      (GlobalContext.getContext().getObject('context') as (common.UIAbilityContext)).terminateSelf();
    }, 1000)
  }

  async aboutToAppear() {
    setInterval(async () => {
      try {
        await this.isInternet();
      } catch (err) {
        if (!wf.isConnected() && this.videoSelect === VIDEOSELECT) {
          this.toast();
        }
      }
    }, 2000)
  }

  build() {
    Panel(this.show) {
      Column() {
        RelativeContainer() {
          Text(this.videoList[this.videoSelect])
            .fontColor(Color.White)
            .fontSize($r('app.float.size_18'))
            .fontWeight(FontWeight.Regular)
            .alignRules({
              middle: { anchor: '__container__', align: HorizontalAlign.Center },
              center: { anchor: '__container__', align: VerticalAlign.Center }
            })
            .id("test1")
          Image($r('app.media.ic_video_list_down'))
            .width($r('app.float.size_30'))
            .height($r('app.float.size_20'))
            .alignRules({
              right: { anchor: '__container__', align: HorizontalAlign.End },
              center: { anchor: '__container__', align: VerticalAlign.Center }
            }).id("test2")
        }
        .height($r('app.float.size_20'))
        .width("90%")
        .margin({ top: $r('app.float.size_20'), bottom: $r('app.float.size_20') })

        List() {
          ForEach(this.videoList, (item: Resource, index) => {
            ListItem() {
              Column() {
                Row() {
                  Text(item)
                    .fontSize($r('app.float.size_20'))
                    .fontColor(Color.White)
                    .fontWeight(FontWeight.Regular)
                    .textAlign(TextAlign.Center)

                  Blank()

                  if (this.videoSelect === index) {
                    Text($r('app.string.playing'))
                      .fontSize($r('app.float.size_20'))
                      .fontColor(Color.White)
                      .opacity($r('app.float.size_zero_six'))
                      .fontWeight(FontWeight.Regular)
                      .textAlign(TextAlign.Center)
                  }
                }
                .width("90%")
              }
              .width("100%")
            }
            .backgroundColor(this.videoSelect === index ? $r('app.color.video_play_selected') : "")
            .width("100%")
            .height($r('app.float.size_64'))
            .onClick(async () => {
              this.videoSelect = index;
              AppStorage.setOrCreate('videoName', this.videoList[this.videoSelect]);
              AppStorage.setOrCreate('videoIndex', this.videoSelect);
              AppStorage.setOrCreate('speedName', $r('app.string.video_speed_1_0X'));
              AppStorage.setOrCreate('speedIndex', 0);
              this.show = false;
              let str = await (GlobalContext.getContext().getObject('context') as (common.UIAbilityContext))
                .resourceManager.getStringValue(this.videoList[this.videoSelect]);
              this.avPlayManage.videoChoose(str, this.videoSelect, (avPlayer: media.AVPlayer) => {
              });
            })
          })
        }
        .width("100%")
      }
    }
    .onClick(() => {
      this.show = false;
    })
    .onChange(() => {
      this.show = false;
    })
    .backgroundColor($r('app.color.video_play'))
    .type(PanelType.Foldable)
    .mode(PanelMode.Half)
    .dragBar(false)
    .halfHeight(254)
    .width('100%')
    .mode(PanelMode.Half)
    .padding({ top: $r('app.float.size_5') })
  }
}