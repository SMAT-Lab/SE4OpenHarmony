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

import Utils from '../common/Utils';
import { ProviderFeature } from '../feature/ProviderFeature';
import avSession from '@ohos.multimedia.avsession';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @StorageLink('IsPlaying') isPlaying: boolean = false;
  @StorageLink('CurrentPlayItem') currentPlayItem: avSession.AVQueueItem | null = null;
  @StorageLink('CurrentAVMetadata') currentAVMetadata: avSession.AVMetadata | null = null;
  @StorageLink('CurrentImage') currentImage: PixelMap | null = null;
  @StorageLink('CurrentLyric') currentLyric: string = '';
  private providerFeature: ProviderFeature = new ProviderFeature();

  async aboutToAppear() {
    let createAVSessionResult: Boolean = await this.providerFeature.CreateAVSession();
    if (!createAVSessionResult) {
      Utils.showPrompt(`Failed to init AVSession`);
    }
    await this.providerFeature.RegisterListener();
  }

  build() {
    Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
      Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
        Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center }) {
          Text(this.isPlaying ? $r('app.string.In_play') : $r('app.string.Not_in_play'))
            .fontSize('20sp')
            .fontColor('#182431')
            .margin({ top: '55vp' })
            .width('80vp')
            .height('26vp')
            .id('PageTitle')

          Image(this.currentImage ? this.currentImage : '')
            .width('100%')
            .margin({ top: '15vp' })
            .id('CurrentImage')

          if (this.currentAVMetadata) {
            Text(this.currentAVMetadata.title ? this.currentAVMetadata.title : 'No title')
              .width('100%')
              .height('32vp')
              .fontSize('24fp')
              .fontColor('#556B89')
              .id('Title')
          }

          if (this.currentAVMetadata) {
            Text(this.currentAVMetadata.artist ? this.currentAVMetadata.artist : 'No artist')
              .width('100%')
              .height('19vp')
              .margin({ top: '12vp' })
              .fontSize('14fp')
              .fontColor('#556B89')
              .id('Artist')
          }

          Text(this.currentLyric ? this.currentLyric : '')
            .width('100%')
            .height('19vp')
            .opacity(0.8)
            .margin({ top: '8vp' })
            .fontSize('14fp')
            .fontColor('#556B89')
            .id('Lyric')

          Flex({
            direction: FlexDirection.Row,
            alignItems: ItemAlign.Center,
            alignContent: FlexAlign.Center,
            justifyContent: FlexAlign.Center
          }) {
            Button({ stateEffect: true }) {
              Image($r('app.media.previous'))
            }
            .width('30vp')
            .height('30vp')
            .backgroundColor('#00000000')
            .id('Previous')
            .onClick(async () => {
              this.providerFeature.previous();
            })

            Button({ stateEffect: true }) {
              Image(this.isPlaying ? $r('app.media.pause') : $r('app.media.play'))
            }
            .width('64vp')
            .height('64vp')
            .margin({ left: '48vp' })
            .backgroundColor('#00000000')
            .id('PlayOrPause')
            .onClick(async () => {
              if (!this.isPlaying) {
                await this.providerFeature.play();
              } else {
                await this.providerFeature.pause();
              }
            })

            Button({ stateEffect: true }) {
              Image($r('app.media.next'))
            }
            .width('30vp')
            .height('30vp')
            .margin({ left: '48vp' })
            .backgroundColor('#00000000')
            .id('Next')
            .onClick(async () => {
              this.providerFeature.next();
            })
          }
          .height('64vp')
          .margin({ left: '36vp', right: '36vp' })
          .margin({ top: '80vp' })
        }
        .height('100%')
        .width('100%')
      }
      .margin({ left: '34vp', right: '34vp' })
    }
    .width('100%')
    .height('100%')
    .backgroundImage($r('app.media.background1'))
    .backgroundImageSize(ImageSize.Cover)
  }
}
