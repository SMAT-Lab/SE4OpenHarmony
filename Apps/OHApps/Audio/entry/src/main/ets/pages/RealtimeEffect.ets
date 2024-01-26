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

import common from '@ohos.app.ability.common'
import fs from '@ohos.file.fs'
import audio from '@ohos.multimedia.audio'
import router from '@ohos.router'
import { BusinessError } from '@ohos.base'

export class ModeType {
  id: number;
  name: Resource;

  constructor(id: number, name: Resource) {
    this.id = id;
    this.name = name;
  }
}

class fileDescriptorClass {
  fd: number;
  offset: number;
  length: number;
  constructor(fd: number, offset: number, length: number) {
    this.fd = fd;
    this.offset = offset;
    this.length = length;
  }
}


@Component
struct ModeItem_1 {
  private mode: ModeType = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
  @Consume contentTypeIndex?: number;

  @Builder renderModeItem(fontColor: string, bgColor: string, value: Resource) {
    Flex() {
      Text(value)
        .fontSize(16)
        .fontWeight(400)
        .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
        .fontColor(fontColor);
    }
    .height(44)
    .width(148)
    .backgroundColor(bgColor)
    .borderRadius(12)
    .padding({ left: 14, top: 14, bottom: 14 });

    if (this.mode && this.mode.id !== 5) {
      Flex() {
        Flex() {
        }.height(1).width('100%')
        .backgroundColor('#F3F3F3');
      }
      .padding({ left: 12, right: 12 });
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      if (this.contentTypeIndex == this.mode.id) {
        this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name);
      } else {
        this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name);
      }
    }.height(48).width(156);
  }
}

@Component
struct ModeItem_2 {
  private mode : ModeType = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
  @Consume streamUsageIndex?: number;

  @Builder renderModeItem(fontColor: string, bgColor: string, value: Resource) {
    Flex() {
      Text(value)
        .fontSize(16)
        .fontColor(fontColor)
        .fontWeight(400)
        .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
    }
    .height(44)
    .width(148)
    .backgroundColor(bgColor)
    .borderRadius(12)
    .padding({ left: 14, top: 14, bottom: 14 });

    if (this.mode && this.mode.id !== 14) {
      Flex() {
        Flex() {
        }.height(1).width('100%').backgroundColor('#F3F3F3');
      }
      .padding({ left: 12, right: 12 });
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      if (this.streamUsageIndex == this.mode.id) {
        this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name);
      } else {
        this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name);
      }
    }.height(48).width(156);
  }
}

@Component
struct ModeItem_3 {
  private mode : ModeType = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
  @Consume audioEffectModeSettingIndex?: number;

  @Builder renderModeItem(fontColor: string, bgColor: string, value: Resource) {
    Flex() {
      Text(value)
        .fontSize(16)
        .fontWeight(400)
        .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
        .fontColor(fontColor);
    }
    .height(44)
    .width(148)
    .backgroundColor(bgColor)
    .borderRadius(12)
    .padding({ left: 14, top: 14, bottom: 14 });

    if (this.mode && this.mode.id !== 1) {
      Flex() {
        Flex() {
        }.height(1).width('100%')
        .backgroundColor('#F3F3F3');
      }
      .padding({ left: 12, right: 12 });
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      if (this.audioEffectModeSettingIndex == this.mode.id) {
        this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name);
      } else {
        this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name);
      }
    }.height(48).width(156);
  }
}

@Entry
@Component
struct RealtimeAudioEffectQuery {
  scroller: Scroller = new Scroller();
  private audioSource = 'test1.wav';
  private appContext?: common.Context;
  private fileDescriptor = new fileDescriptorClass(0,0,0);
  private audioPlayState: Array<string> = ['notPlaying', 'onPlaying'];
  private stateImg: Array<Resource> = [$r('app.media.ic_play'), $r('app.media.ic_pause')];
  private audioRenderer?: audio.AudioRenderer;
  private contentTypeOptions : ModeType[] = [
    new ModeType(0, $r('app.string.CONTENT_TYPE_UNKNOWN')),
    new ModeType(1, $r('app.string.CONTENT_TYPE_SPEECH')),
    new ModeType(2, $r('app.string.CONTENT_TYPE_MUSIC')),
    new ModeType(3, $r('app.string.CONTENT_TYPE_MOVIE')),
    new ModeType(4, $r('app.string.CONTENT_TYPE_SONIFICATION')),
    new ModeType(5, $r('app.string.CONTENT_TYPE_RINGTONE'))
  ];

  private streamUsageOptions : ModeType[]= [
    new ModeType(0, $r('app.string.STREAM_USAGE_UNKNOWN')),
    new ModeType(1, $r('app.string.STREAM_USAGE_MUSIC')),
    new ModeType(2, $r('app.string.STREAM_USAGE_VOICE_COMMUNICATION')),
    new ModeType(3, $r('app.string.STREAM_USAGE_VOICE_ASSISTANT')),
    new ModeType(4, $r('app.string.STREAM_USAGE_ALARM')),
    new ModeType(5, $r('app.string.STREAM_USAGE_VOICE_MESSAGE')),
    new ModeType(6, $r('app.string.STREAM_USAGE_RINGTONE')),
    new ModeType(7, $r('app.string.STREAM_USAGE_NOTIFICATION')),
    new ModeType(8, $r('app.string.STREAM_USAGE_ACCESSIBILITY')),
    new ModeType(9, $r('app.string.STREAM_USAGE_MOVIE')),
    new ModeType(10, $r('app.string.STREAM_USAGE_GAME')),
    new ModeType(11, $r('app.string.STREAM_USAGE_AUDIOBOOK')),
    new ModeType(12, $r('app.string.STREAM_USAGE_NAVIGATION'))
  ];

  private audioEffectModeSettingOptions : ModeType[] = [
    new ModeType(0, $r('app.string.EFFECT_NONE')),
    new ModeType(1, $r('app.string.EFFECT_DEFAULT'))
  ];

  @State showSelector_1: boolean = false;
  @State showSelector_2: boolean = false;
  @State showSelector_3: boolean = false;
  @State queryResult: Resource = $r('app.string.BLANK');
  @State queryButtonState: boolean = false;
  @State stateTextIndex: number = 0;
  @State stateImgIndex: number = 0;
  @State optionsButtonState: boolean = true;
  @State currentAudioEffect: Resource = $r('app.string.EFFECT_DEFAULT');
  @State selectColor: Color = Color.Black;
  @Provide audioEffectModeSettingIndex: number = 1;
  @Provide contentTypeIndex: number = 0;
  @Provide streamUsageIndex: number = 0;

  async getStageFileDescriptor(fileName: string): Promise<fileDescriptorClass> {
    let fileDescriptor = new fileDescriptorClass(0,0,0);
    this.appContext = getContext();
    let mgr = this.appContext.resourceManager;
    await mgr.getRawFd(fileName).then(value => {
      fileDescriptor = new fileDescriptorClass(value.fd, value.offset, value.length)
      console.log('case getRawFileDescriptor success filefd: ' + value.fd)
    }).catch((error: string) => {
      console.log('case getRawFileDescriptor err: ' + error)
    });
    return fileDescriptor;
  }

  async aboutToAppear(): Promise<void> {
    this.appContext = getContext();
  }

  onBackPress(): void {
    if (this.audioRenderer !== undefined) {
      try {
        this.audioRenderer.stop();
        this.audioRenderer.release();
        console.info("release:SUCCEED");
      } catch (err) {
        let error = err as BusinessError;
        console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
        return;
      }
    }
  }

  async onPageHide(): Promise<void> {
    if (this.audioRenderer !== undefined) {
      if (this.audioRenderer.state === audio.AudioState.STATE_RUNNING) {
        await this.audioRenderer.pause();
        this.stateImgIndex = 0;
        this.stateTextIndex = 0;
        console.info('The audio renderer has been paused.');
        this.optionsButtonState = true;
      }
    }
  }

  mapContentIndexToType(index: number): number | undefined {
    // map the index of options to the content type in @ohos.multimedia.audio
    let index2Content = new Map([
      [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]
    ]);
    console.info("get content type:" + index2Content.get(index));
    return index2Content.get(index);
  }

  mapStreamIndexToUsage(index: number): number | undefined {
    // map the index of options to the stream usage in @ohos.multimedia.audio
    let index2Usage = new Map([
      [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
      [8, 8], [9, 10], [10, 11], [11, 12], [12, 13]
    ]);
    console.info("get stream usage:" + index2Usage.get(index));
    return index2Usage.get(index);
  }

  async createAudioEffectAndPlay(): Promise<void> {
    let audioRendererOptions : audio.AudioRendererOptions =
      {
        streamInfo: {
          samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
          channels: audio.AudioChannel.CHANNEL_2,
          sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
          encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
        },
        rendererInfo: {
          usage: this.mapStreamIndexToUsage(this.streamUsageIndex) as audio.StreamUsage,
          rendererFlags: 0
        }
      };
    try {
      this.audioRenderer = await audio.createAudioRenderer(audioRendererOptions);
      console.info("createAudioRenderer:SUCCEED");
    } catch (err) {
      let error = err as BusinessError;
      console.error(`audioRenderer create ,Error: ${JSON.stringify(error)}`);
      return;
    }

    try {
      await this.audioRenderer.setAudioEffectMode(this.audioEffectModeSettingIndex);
      console.info(" audioRenderer.setAudioEffectMode:SUCCEED");
    } catch (err) {
      let error = err as BusinessError;
      console.error(`audioRenderer setAudioEffectMode ,Error: ${JSON.stringify(error)}`);
      return;
    }

    try {
      await this.audioRenderer.start();
      console.info(" audioRenderer.start:SUCCEED");
    } catch (err) {
      let error = err as BusinessError;
      console.error(`audioRenderer start ,Error: ${JSON.stringify(error)}`);
      return;
    }

    let bufferSize : number = 0;
    try {
      bufferSize = await this.audioRenderer.getBufferSize();
      console.info(" get Buffer Size:SUCCEED");
    } catch (err) {
      let error = err as BusinessError;
      console.error(`get Buffer Size ,Error: ${JSON.stringify(error)}`);
      return;
    }
    console.info("buffer size:" + bufferSize);
    await this.getStageFileDescriptor(this.audioSource).then((res) => {
      this.fileDescriptor = res;
    })

    let buf = new ArrayBuffer(bufferSize);
    let startOffset : number = this.fileDescriptor.offset;
    let cur = startOffset + bufferSize;
    while (true) {
      // when render released,state is changed to STATE_RELEASED
      if (!this.audioRenderer) {
        break;
      }

      if (this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
        break;
      }
      while (cur <= startOffset + this.fileDescriptor.length - bufferSize) {
        class options {
          offset: number = 0;
          length: number = 0;
        }
        let readOptions: options = {
          offset: cur,
          length: bufferSize
        }
        await fs.read(this.fileDescriptor.fd, buf, readOptions);
        try {
          await this.audioRenderer.write(buf);
        } catch (err) {
          let error = err as BusinessError;
          console.error(`audioRenderer write ,Error: ${JSON.stringify(error)}`);
          return;
        }

        cur += bufferSize;
      }
      cur = startOffset + bufferSize;
    }
  }

  async playOrPause(): Promise<void> {
    if (this.stateImgIndex === 0) {
      if (this.audioRenderer === undefined || this.audioRenderer.state === audio.AudioState.STATE_RELEASED) {
        this.createAudioEffectAndPlay();
        this.stateImgIndex = 1;
        this.stateTextIndex = 1;
        this.optionsButtonState = false;
        this.selectColor = Color.Gray;
        this.queryButtonState = true;
      } else {
        let previousARInfo : audio.AudioRendererInfo = await this.audioRenderer.getRendererInfo();
        let previousContent = previousARInfo.content;
        let previousUsage = previousARInfo.usage;
        if (this.mapContentIndexToType(this.contentTypeIndex) != previousContent
          || this.mapStreamIndexToUsage(this.streamUsageIndex) != previousUsage) {
          try {
            await this.audioRenderer.stop();
            await this.audioRenderer.release();
          } catch (err) {
            let error = err as BusinessError;
            console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
            return;
          }
          this.stateImgIndex = 1;
          this.stateTextIndex = 1;
          this.optionsButtonState = false;
          this.selectColor = Color.Gray;
          this.queryButtonState = true;
          this.createAudioEffectAndPlay();
        } else {
          await this.audioRenderer.start();
          this.stateImgIndex = 1;
          this.stateTextIndex = 1;
          this.optionsButtonState = false;
          this.selectColor = Color.Gray;
          this.queryButtonState = true;
        }
      }
    } else {
      console.info('Try to pause');
      if (this.audioRenderer === undefined ){
        return;
      }
      try {
        await this.audioRenderer.pause();
      } catch (err) {
        let error = err as BusinessError;
        console.error(`audioRenderer pause ,Error: ${JSON.stringify(error)}`);
        return;
      }
      this.stateImgIndex = 0;
      this.stateTextIndex = 0;
      console.info('The audio renderer has been paused.');
      this.optionsButtonState = true;
      this.selectColor = Color.Black;
    }
  }

  build() {
    Column() {
      Column() {
        Row() {
          Navigation() {
            NavRouter() {
              NavDestination() {
              }
            }.onStateChange(async (isActivated: boolean) => {
              console.info("hello");
              if (this.audioRenderer !== undefined) {
                try {
                  await this.audioRenderer.stop();
                  await this.audioRenderer.release();
                } catch (err) {
                  let error = err as BusinessError;
                  console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
                  return;
                }
              }
              await router.pushUrl({ url: 'pages/Index' });
            })
          }
          .id('back_btn_realtime')
          .height(56)
          .width(384)
          .hideBackButton(false)
          .titleMode(NavigationTitleMode.Mini)
          .title($r('app.string.EffectManager'))
          .mode(NavigationMode.Stack)
          .backgroundColor('#F1F3F5');
        }

        Row() {
          Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
            Row() {
              Text(this.contentTypeOptions[this.contentTypeIndex].name)
                .textAlign(TextAlign.Center)
                .textOverflow({ overflow: TextOverflow.None })
                .fontColor(this.selectColor)
                .fontSize(16)
                .fontWeight(500)
                .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
              if (this.showSelector_1) {
                Image($r('app.media.ic_arrow_up_big')).height(7).width(10)
                  .fillColor(this.selectColor)
                  .margin({ left: 8 });
              } else {
                Image($r('app.media.ic_arrow_down_big')).height(7).width(10)
                  .fillColor(this.selectColor)
                  .margin({ left: 8 });
              }
            }
          }
          .height(40)
          .width(140)
          .backgroundColor('#F1F3F5')
          .borderRadius(16)
          .margin({ left: 37, right: 6 })
          .padding({
            left: 16,
            right: 16
          })
          .enabled(this.optionsButtonState)
          .id('select_content_realtime')
          .onClick(() => {
            this.showSelector_1 = !this.showSelector_1
            this.showSelector_2 = false
            this.showSelector_3 = false
          });

          if (this.showSelector_1) {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start }) {
              ForEach(this.contentTypeOptions, (item:ModeType) => {
                Flex() {
                  ModeItem_1({ mode: item });
                }.width(156)
                .onClick(() => {
                  if (this.contentTypeIndex !== item.id) {
                    this.contentTypeIndex = item.id;
                    console.info('this.contentTypeIndex===' + this.contentTypeIndex);
                    this.queryResult = $r('app.string.BLANK');
                    this.queryButtonState = false;
                    this.audioEffectModeSettingIndex = 1;
                  }
                  this.showSelector_1 = false;
                })
              }, (item:ModeType) => item.id.toString());
            }
            .height(296)
            .width(156)
            .backgroundColor('#fff')
            .borderRadius(16)
            .shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' })
            .padding({ left: 4, right: 4, top: 4, bottom: 4 })
            .position({ x: 54, y: 40 })
            .zIndex(1);
          }

          Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
            Row() {
              Text(this.streamUsageOptions[this.streamUsageIndex].name)
                .textAlign(TextAlign.Center)
                .fontSize(16)
                .fontWeight(500)
                .fontColor(this.selectColor)
                .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
              if (this.showSelector_2) {
                Image($r('app.media.ic_arrow_up_small')).height(7).width(10)
                  .fillColor(this.selectColor)
                  .margin({ left: 8 });
              } else {
                Image($r('app.media.ic_arrow_down_small')).height(7).width(10)
                  .fillColor(this.selectColor)
                  .margin({ left: 8 });
              }
            }
          }
          .height(40)
          .width(140)
          .margin({ right: 37 })
          .backgroundColor('#F1F3F5')
          .borderRadius(16)
          .padding({
            left: 16,
            right: 16
          })
          .enabled(this.optionsButtonState)
          .id('select_usage_realtime')
          .onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = !this.showSelector_2;
            this.showSelector_3 = false;
          })

          if (this.showSelector_2) {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start }) {
              Scroll(this.scroller) {
                Column() {
                  ForEach(this.streamUsageOptions, (item:ModeType) => {
                    Flex() {
                      ModeItem_2({ mode: item });
                    }.width(156)
                    .onClick(() => {
                      if (this.streamUsageIndex !== item.id) {
                        this.streamUsageIndex = item.id;
                        console.info('this.streamUsageIndex===' + this.streamUsageIndex);
                        this.queryResult = $r('app.string.BLANK');
                        this.queryButtonState = false;
                        this.audioEffectModeSettingIndex = 1;
                      }
                      this.showSelector_2 = false;
                    })
                  }, (item:ModeType) => item.id.toString());

                }
              }
              .scrollable(ScrollDirection.Vertical)
              .scrollBar(BarState.On)
              .scrollBarColor(Color.Gray)
              .scrollBarWidth(10)
              .edgeEffect(EdgeEffect.None);
            }
            .height(344)
            .width(156)
            .backgroundColor('#fff')
            .borderRadius(16)
            .shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' })
            .padding({ left: 4, right: 4, top: 4, bottom: 4 })
            .position({ x: 145, y: 40 })
            .zIndex(1);
          }
        }.zIndex(1);

        Column() {
          Row() {
            Row() {
              Image(this.stateImg[this.stateImgIndex])
                .height(36)
                .width(36)
                .id('play_pause_realtime')
                .onClick(async () => {
                  this.showSelector_1 = false
                  this.showSelector_2 = false
                  this.showSelector_3 = false
                  await this.playOrPause()
                });
              Text($r('app.string.CURRENT_AUDIO_EFFECT'))
                .fontSize(16)
                .fontWeight(500)
                .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
                .width(112)
                .height(20)
                .margin({ left: 12 });
              Text(this.audioPlayState[this.stateTextIndex])
                .fontSize(2)
                .height(20)
                .width(5)
                .fontColor(Color.White)
                .id('audio_play_state');
            }

            Button($r('app.string.QUERY'), { type: ButtonType.Capsule, stateEffect: true })
              .backgroundColor('rgba(24,36,49,0.05)')
              .fontColor('#007DFF')
              .fontSize(12)
              .fontWeight(500)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .height(28)
              .width(72)
              .id('query_btn_realtime')
              .enabled(this.queryButtonState)
              .onClick(async () => {
                this.showSelector_1 = false;
                this.showSelector_2 = false;
                this.showSelector_3 = false;
                if (this.audioRenderer !== undefined) {
                  if (this.audioRenderer.state === audio.AudioState.STATE_RUNNING
                    || this.audioRenderer.state === audio.AudioState.STATE_PAUSED) {
                    console.info('Cur audio effect query Button onClick')
                    let audioEffectMode = 1;
                    try {
                      audioEffectMode = await this.audioRenderer.getAudioEffectMode();
                      console.info('cur audio effect mode value:' + audioEffectMode);
                    } catch (err) {
                      let error = err as BusinessError;
                      console.error(`audioRenderer getAudioEffectMode ,Error: ${JSON.stringify(error)}`);
                      return;
                    }

                    if (audioEffectMode === 0) {
                      this.currentAudioEffect = $r('app.string.EFFECT_NONE');
                    } else if (audioEffectMode === 1) {
                      this.currentAudioEffect = $r('app.string.EFFECT_DEFAULT');
                    }
                    this.queryResult = this.currentAudioEffect;
                  }
                }
              })
          }
          .justifyContent(FlexAlign.SpaceBetween)
          .height(56).width('100%')
          .margin({ top: 4, bottom: 1 });

          Row() {
          }
          .height(1).width(280)
          .margin({ right: -40 })
          .backgroundColor('#F1F3F5');

          Row() {
            Text($r('app.string.QUERY_RESULT'))
              .fontSize(16)
              .fontWeight(500)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text(this.queryResult)
              .fontSize(14)
              .margin({ top: 22 })
              .fontColor(Color.Gray)
              .id('query_result_realtime');
          }
          .justifyContent(FlexAlign.SpaceBetween)
          .height(48)
          .width('100%');

          Row() {
          }
          .height(1).width('100%')
          .backgroundColor('#F1F3F5');

          Row() {
            Text($r('app.string.AUDIO_EFFECT_MODE_SETTING'))
              .fontSize(16)
              .fontWeight(500)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .height(22);
            Flex({ justifyContent: FlexAlign.End, alignItems: ItemAlign.Center }) {
              Row() {
                Text(this.audioEffectModeSettingOptions[this.audioEffectModeSettingIndex].name)
                  .textAlign(TextAlign.Center)
                  .id('select_mode_name_realtime')
                  .textOverflow({ overflow: TextOverflow.None })
                  .fontSize(16)
                  .fontWeight(500)
                  .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));

                if (this.showSelector_3) {
                  Image($r('app.media.ic_arrow_up_small')).height(7).width(10)
                    .margin({ left: 8 });
                } else {
                  Image($r('app.media.ic_arrow_down_small')).height(7).width(10)
                    .margin({ left: 8 });
                }
              }
            }
            .height(22)
            .width(95)
            .backgroundColor(Color.White)
            .id('select_mode_realtime')
            .onClick(() => {
              this.showSelector_1 = false;
              this.showSelector_2 = false;
              this.showSelector_3 = !this.showSelector_3;
            });

            if (this.showSelector_3) {
              Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start }) {
                ForEach(this.audioEffectModeSettingOptions, (item:ModeType) => {
                  Flex() {
                    ModeItem_3({ mode: item });
                  }.width(156)
                  .onClick(async () => {
                    if (this.audioEffectModeSettingIndex !== item.id) {
                      this.audioEffectModeSettingIndex = item.id;
                      console.info('this.audioEffectModeSettingIndex===' + this.audioEffectModeSettingIndex);
                      if (this.audioRenderer !== undefined && this.audioRenderer.state !== audio.AudioState.STATE_RELEASED) {
                        try {
                          this.audioRenderer.setAudioEffectMode(item.id);
                        } catch (err) {
                          let error = err as BusinessError;
                          console.error(`audioRenderer setAudioEffectMode ,Error: ${JSON.stringify(error)}`);
                        }
                      }
                    }
                    this.showSelector_3 = false;
                  })
                }, (item:ModeType) => item.id.toString());
              }
              .height(105)
              .width(156)
              .backgroundColor('#fff')
              .borderRadius(16)
              .shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' })
              .padding({ left: 4, right: 4, top: 6, bottom: 4 })
              .position({ x: 180, y: 40 })
              .zIndex(1);
            }
          }
          .margin({ top: 1, bottom: 4 })
          .height(48)
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween);
        }
        .zIndex(0)
        .width(360)
        .height(160)
        .backgroundColor(Color.White)
        .padding({ left: 12, right: 12 })
        .borderRadius(20);
      }

      Row() {
        Column() {
          Image($r('app.media.ic_Silent_normal'))
            .width(24)
            .height(24)
            .margin({ top: 7, bottom: 4 });
          Text($r('app.string.PRESET_AUDIO_EFFECT_QUERY'))
            .fontSize(10)
            .height(14);
        }
        .margin({ left: 24 })
        .height(56)
        .width(156)
        .id('switch_btn_realtime')
        .onClick(async () => {
          if (this.audioRenderer != null) {
            try {
              await this.audioRenderer.stop();
              await this.audioRenderer.release();
            } catch (err) {
              let error = err as BusinessError;
              console.error(`audioRenderer release ,Error: ${JSON.stringify(error)}`);
            }
          }
          await router.replaceUrl({ url: 'pages/PresetEffect' });
        })

        Column() {
          Image($r('app.media.ic_Sound_select'))
            .width(24)
            .height(24)
            .margin({ top: 7, bottom: 4 });
          Text($r('app.string.REALTIME_AUDIO_EFFECT_SETTING'))
            .fontSize(10)
            .height(14)
            .fontColor('#007DFF');
        }
        .height(56)
        .width(156)
        .margin({ right: 24 });
      }
      .height(56)
      .width(360);
    }
    .height('100%')
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .backgroundColor('#F1F3F5')
    .onClick(() => {
      this.showSelector_1 = false;
      this.showSelector_2 = false;
      this.showSelector_3 = false;
    });
  }
}