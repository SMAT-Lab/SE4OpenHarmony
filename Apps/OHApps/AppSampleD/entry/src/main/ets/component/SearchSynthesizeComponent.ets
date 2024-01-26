/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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

import { AudioInfo, SearchResult, VideoDetailInfo } from '../appsampled/data/SearchResult';
import SearchPlayMusicComponent from './SearchPlayMusicComponent';
import SearchPlayVideoComponent from './SearchPlayVideoComponent';
import Logger from '../utils/Logger';

const TAG: string = '[SearchSynthesizeComponent]';

@Component
export default struct SearchSynthesizeComponent {
  private scrollerHor: Scroller = new Scroller();
  private scrollerVer: Scroller = new Scroller();
  private currSearchResult?: SearchResult;
  @State selectTopIndex: number = 0;

  build() {
    Column() {
      Scroll(this.scrollerVer) {
        Column() {
          // 横向Label列表
          Row() {
            Scroll(this.scrollerHor) {
              Row({ space: 8 }) {
                // 全部
                Column() {
                  Text($r('app.string.All'))
                    .height(20)
                    .fontColor(this.selectTopIndex === 0 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
                    .fontSize(16)
                    .fontFamily($r('app.string.Font_family_medium'))
                    .textAlign(TextAlign.Center)
                    .padding({ left: 16, right: 16 })
                }
                .height(40)
                .justifyContent(FlexAlign.Center)
                .backgroundColor(this.selectTopIndex === 0 ? $r('app.color.COLOR_393939') : $r('app.color.COLOR_99393939'))
                .borderRadius(4)
                .onClick(e => {
                  this.selectTopIndex = 0;
                })
                // 模拟数据 label列表
                ForEach(this.currSearchResult?.labelList, (title: string, index: number) => {
                  Column() {
                    Text(title)
                      .height(20)
                      .fontColor(this.selectTopIndex === (index + 1) ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
                      .fontSize(16)
                      .fontFamily($r('app.string.Font_family_medium'))
                      .textAlign(TextAlign.Center)
                      .padding({ left: 16, right: 16 })
                  }
                  .height(40)
                  .justifyContent(FlexAlign.Center)
                  .backgroundColor(this.selectTopIndex === (index + 1) ? $r('app.color.COLOR_393939') : $r('app.color.COLOR_99393939'))
                  .borderRadius(4)
                  .onClick(e => {
                    this.selectTopIndex = index + 1;
                  })
                })
              }
              .height('100%')
              .justifyContent(FlexAlign.Start)
            }
            .scrollable(ScrollDirection.Horizontal)
            .scrollBar(BarState.Off)
            .width('100%')
            .height('100%')
          }
          .width('100%')
          .height(60)
          .justifyContent(FlexAlign.Start)
          .padding({ left: 14, right: 8 })

          // 音乐列表
          Column() {
            // 音乐 Title
            Row() {
              Text($r('app.string.Music'))
                .width(60)
                .height(20)
                .fontColor($r('app.color.COLOR_FFFFFF'))
                .fontSize(18)
                .fontFamily($r('app.string.Font_family_medium'))
                .textAlign(TextAlign.Start)

              Blank()

              Image($r('app.media.app_icon'))
                .width(22)
                .height(30)
                .objectFit(ImageFit.Contain)
              Image($r('app.media.app_icon'))
                .width(18)
                .height(18)
                .objectFit(ImageFit.Contain)
                .margin({ left: 25, right: 14 })
            }
            .width('100%')
            .height(40)
            .margin({ top: 10 })

            // 模拟数据 音乐列表
            ForEach(this.currSearchResult?.audioInfoList, (audioInfo: AudioInfo) => {
              SearchPlayMusicComponent({ audioInfo: audioInfo })
            })
          }
          .width('100%')
          .justifyContent(FlexAlign.Start)
          .padding({ left: 14, right: 14 })

          // 模拟数据 视频详细信息列表
          Column() {

            ForEach(this.currSearchResult?.videoDetailInfo, (videoDetailInfo: VideoDetailInfo) => {
              Divider()
                .vertical(false)
                .height(10)
                .width('100%')
                .strokeWidth(8)
                .color($r('app.color.COLOR_000000'))
              Column() {
                SearchPlayVideoComponent({ videoDetailInfo: videoDetailInfo })
              }
              .width('100%')
              .padding({ left: 14, right: 14 })
            })
          }
          .width('100%')
          .justifyContent(FlexAlign.Start)
        }
        .width('100%')
      }
      .scrollable(ScrollDirection.Vertical)
      .scrollBar(BarState.Off)
      .width('100%')
      .height('100%')
      .align(Alignment.Top)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_151724'))
  }
}