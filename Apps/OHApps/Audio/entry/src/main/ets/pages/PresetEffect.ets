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

import audio from '@ohos.multimedia.audio';
import router from '@ohos.router';

export class ModeType {
  id: number;
  name: Resource;

  constructor(id: number, name: Resource) {
    this.id = id;
    this.name = name;
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

    if (this.mode.id !== 5) {
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
      if (this.contentTypeIndex === this.mode.id) {
        this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name);
      } else {
        this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name);
      }
    }.height(48).width(156);
  }
}

@Component
struct ModeItem_2 {
  private mode: ModeType = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
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

    if (this.mode.id !== 14) {
      Flex() {
        Flex() {
        }.height(1).width('100%').backgroundColor('#F3F3F3')
      }
      .padding({ left: 12, right: 12 });
    }
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      if (this.streamUsageIndex === this.mode.id) {
        this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name);
      } else {
        this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name);
      }
    }.height(48).width(156);
  }
}

@Entry
@Component
struct DetectPresetEffect {
  scroller: Scroller = new Scroller();

  private audioEffectInfoArray : Array<number> = [1];
  private audioManager?: audio.AudioManager;
  private audioStreamManager?: audio.AudioStreamManager;
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

  @State showSelector_1: boolean = false;
  @State showSelector_2: boolean = false;
  @State queryResult: Resource = $r('app.string.BLANK');
  @Provide contentTypeIndex: number = 0;
  @Provide streamUsageIndex: number = 0;

  mapContentIndexToType(index : number): number | undefined {
    // map the index of options to the content type in @ohos.multimedia.audio
    let index2Content = new Map([
      [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]
    ]);
    console.info("get content type:" + index2Content.get(index));
    return index2Content.get(index);
  }

  mapStreamIndexToUsage(index : number): number | undefined {
    // map the index of options to the stream usage in @ohos.multimedia.audio
    let index2Usage = new Map([
      [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
      [8, 8], [9, 10], [10, 11], [11, 12], [12, 13]
    ]);
    console.info("get stream usage:" + index2Usage.get(index));
    return index2Usage.get(index);
  }

  build() {
    Column() {
      Column() {
        Row() {
          Navigation() {
            NavRouter() {
              NavDestination() {
              }
            }
            .onStateChange(async (isActivated: boolean) => {
              console.info("hello");
              await router.pushUrl({ url: 'pages/Index' });
            })
          }
          .id('back_btn_preset')
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
                .fontSize(16)
                .fontWeight(500)
                .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
              if (this.showSelector_1) {
                Image($r('app.media.ic_arrow_up_small')).height(7).width(10)
                  .margin({ left: 8 });
              } else {
                Image($r('app.media.ic_arrow_down_small')).height(7).width(10)
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
          .id('select_content_preset')
          .onClick(() => {
            this.showSelector_1 = !this.showSelector_1;
            this.showSelector_2 = false;
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
                  }
                  this.showSelector_1 = false;
                });
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
                .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
              if (this.showSelector_2) {
                Image($r('app.media.ic_arrow_up_small')).height(7).width(10)
                  .margin({ left: 8 });
              } else {
                Image($r('app.media.ic_arrow_down_small')).height(7).width(10)
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
          .id('select_usage_preset')
          .onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = !this.showSelector_2;
          });

          if (this.showSelector_2) {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start }) {
              Scroll(this.scroller) {
                Column() {
                  ForEach(this.streamUsageOptions, (item:ModeType) => {
                    Flex() {
                      ModeItem_2({ mode: item});
                    }.width(156)
                    .onClick(() => {
                      if (this.streamUsageIndex !== item.id) {
                        this.streamUsageIndex = item.id;
                        console.info('this.contentTypeIndex===' + this.streamUsageIndex);
                        this.queryResult = $r('app.string.BLANK');
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
        }
        .width(360)
        .zIndex(1);

        Column() {
          Row() {
            Text($r('app.string.SYSTEM_PRESET_AUDIO_EFFECT'))
              .fontSize(16)
              .fontWeight(500)
              .height(20)
              .width(96)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Button($r('app.string.QUERY'), { type: ButtonType.Capsule, stateEffect: true })
              .backgroundColor('rgba(24,36,49,0.05)')
              .fontColor('#007DFF')
              .fontSize(12)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontWeight(500)
              .height(28)
              .width(72)
              .onClick(async () => {
                console.info('Button onClick');
                this.showSelector_1 = false;
                this.showSelector_2 = false;
                this.audioManager = audio.getAudioManager();
                this.audioStreamManager = this.audioManager.getStreamManager();
                this.audioEffectInfoArray = await this.audioStreamManager
                  .getAudioEffectInfoArray(this.mapStreamIndexToUsage(this.streamUsageIndex) as audio.StreamUsage);
                let defaultIndex : number = 1;
                if (this.audioEffectInfoArray.indexOf(defaultIndex) === -1) {
                  this.queryResult = $r('app.string.EFFECT_NONE');
                } else {
                  this.queryResult = $r('app.string.EFFECT_NONE_AND_DEFAULT');
                }
                console.info('query result:' + this.queryResult);
              })
              .id('query_btn_preset');
          }
          .justifyContent(FlexAlign.SpaceBetween)
          .height('50%')
          .width('100%');

          Row() {
          }
          .height(1).width('100%')
          .backgroundColor('#F1F3F5');

          Row() {
            Text($r('app.string.QUERY_RESULT'))
              .fontSize(16)
              .fontWeight(500)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
            Text(this.queryResult)
              .fontSize(14)
              .fontWeight(400)
              .enabled(false)
              .fontColor(Color.Grey)
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .id('query_result_preset');
          }
          .justifyContent(FlexAlign.SpaceBetween)
          .height('50%')
          .width('100%');

        }
        .height(104)
        .width(360)
        .backgroundColor(Color.White)
        .padding({ left: 12, right: 12 })
        .borderRadius(20)
        .zIndex(0);
      }

      Row() {
        Column() {
          Image($r('app.media.ic_Silent_select'))
            .width(24)
            .height(24)
            .margin({ top: 7, bottom: 4 });

          Text($r('app.string.PRESET_AUDIO_EFFECT_QUERY'))
            .fontSize(10)
            .height(14)
            .fontColor('#007DFF');
        }
        .height(56)
        .width(156)
        .margin({ left: 24 });

        Column() {
          Image($r('app.media.ic_Sound_normal'))
            .width(24)
            .height(24)
            .margin({ top: 7, bottom: 4 });

          Text($r('app.string.REALTIME_AUDIO_EFFECT_SETTING'))
            .fontSize(10)
            .height(14);

        }
        .height(56)
        .width(156)
        .margin({ right: 24 })
        .id('switch_btn_preset')
        .onClick(async () => {
          await router.replaceUrl({ url: 'pages/RealtimeEffect' });
        })
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
    });
  }
}
