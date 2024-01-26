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

import router from '@ohos.router';
import Logger from '../utils/Logger';
import { SearchResult, VideoInfo } from '../appsampled/data/SearchResult';

const TAG: string = '[SearchVideoComponent]';

@Component
export default struct SearchVideoComponent {
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

          // 视频列表
          GridRow({columns: 2}) {
            // 模拟数据 音乐列表
            ForEach(this.currSearchResult?.videoInfo, (videoInfo: VideoInfo) => {
              GridCol() {
                this.VideoItem(videoInfo)
              }
              .width('100%')
              .margin({right: 1,bottom:1})
            })
          }
          .width('100%')

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

  @Builder
  VideoItem(videoInfo: VideoInfo) {
    Stack() {
      Image($r('app.media.app_icon'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Fill)
        .borderRadius(4)
      Column() {
        Text(videoInfo.videoTitle)
          .fontColor($r('app.color.COLOR_FFFFFF'))
          .fontSize(18)
          .fontFamily($r('app.string.Font_family_regular'))
          .textAlign(TextAlign.Start)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .padding({ left: 6, right: 6 })
        Row({space: 5}) {
          Image($r('app.media.app_icon'))
            .width(24)
            .height(24)
            .objectFit(ImageFit.Contain)
            .borderRadius(12)
          Text(videoInfo.videoAuthorName)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(18)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Start)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
          Blank()
          Image($r('app.media.app_icon'))
            .width(24)
            .height(24)
            .objectFit(ImageFit.Contain)
            .borderRadius(12)
          Text(videoInfo.videoLikeNum)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(18)
            .fontFamily($r('app.string.Font_family_regular'))
            .textAlign(TextAlign.Start)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
        }
        .width('100%')
        .height(30)
        .padding({ left: 6, right: 6 })
      }
      .width('100%')
      .height(56)
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .height(280)
    .backgroundColor(Color.Pink)
    .alignContent(Alignment.Bottom)
  }
}