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
import { getMockSearchResult, MockInput } from '../mock/MockData';
import { SearchResult } from '../appsampled/data/SearchResult';
import SearchSynthesizeComponent from './SearchSynthesizeComponent';
import SearchVideoComponent from './SearchVideoComponent';

const TAG: string = '[SearchResultComponent]';

@Component
export default struct SearchResultComponent {
  private scrollerHor_1: Scroller = new Scroller();
  private titleList: Array<Resource> = [$r('app.string.Synthesize'), $r('app.string.Video'), $r('app.string.Music'),
  $r('app.string.User'), $r('app.string.Commodity'), $r('app.string.Live_streaming')];
  private searchResultList: Array<SearchResult> = getMockSearchResult(); // mock
  private inputSearch: string = ''; // 搜索输入框输入的字符串
  @State currSearchResult: SearchResult = this.searchResultList[0]; // mock
  @State selectTopIndex: number = 0; // 综合、视频等title选择索引

  aboutToAppear() {
    // 默认值
    if (this.inputSearch === '') {
      this.inputSearch = MockInput.TEST_INPUT_CONTENT_1;
    }
    // 依据不同的搜索展示不同的模拟数据
    Logger.info(TAG, `this.inputSearch: ${JSON.stringify(this.inputSearch)}`);
    if (this.inputSearch.indexOf(MockInput.TEST_INPUT_CONTENT_1) !== -1) {
      // 输入"黑夜问白天"的模拟数据
      this.currSearchResult = this.searchResultList[0];
    } else if (this.inputSearch.indexOf(MockInput.TEST_INPUT_CONTENT_2) !== -1) {
      // 输入"哦想"的模拟数据
      this.currSearchResult = this.searchResultList[1];
    } else if (this.inputSearch.indexOf(MockInput.TEST_INPUT_CONTENT_3) !== -1) {
      // 输入"我不愿让你一个人"的模拟数据
      this.currSearchResult = this.searchResultList[2];
    }
    Logger.info(TAG, `this.currSearchResult: ${JSON.stringify(this.currSearchResult)}`);
  }

  build() {
    Column() {
      Row() {
        // 横向Label列表
        Scroll(this.scrollerHor_1) {
          Row() {
            ForEach(this.titleList, (title: Resource, index: number) => {
              Column() {
                Text(title)
                  .width(60)
                  .height(20)
                  .fontColor(this.selectTopIndex === index ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'))
                  .fontSize(18)
                  .fontFamily($r('app.string.Font_family_medium'))
                  .textAlign(TextAlign.Center)
                Divider()
                  .vertical(false)
                  .height(20)
                  .width(60)
                  .strokeWidth(3)
                  .color($r('app.color.COLOR_D7B837'))
                  .visibility(this.selectTopIndex === index ? Visibility.Visible : Visibility.Hidden)
              }
              .id(`titleID_${index+1}`)
              .width(78)
              .height('100%')
              .onClick(e => {
                this.selectTopIndex = index;
              })
            })
          }
          .height('100%')
          .justifyContent(FlexAlign.Start)
        }
        .scrollable(ScrollDirection.Horizontal)
        .scrollBar(BarState.Off)
        .width('90%')
        .height('100%')

        Row() {
          Image($r('app.media.app_icon'))
            .width(18)
            .height(18)
            .objectFit(ImageFit.Contain)
            .margin({ left: 4, top: 2 })
        }
        .width('10%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Top)
      }
      .width('100%')
      .height('6%')
      .padding({ left: 8, right: 6 })
      .justifyContent(FlexAlign.Start)
      .backgroundColor($r('app.color.COLOR_151724'))

      Divider()
        .vertical(false)
        .height(1)
        .width('100%')
        .color($r('app.color.COLOR_5A5B63'))


      Column() {
        if (this.selectTopIndex === 0){
          SearchSynthesizeComponent({currSearchResult: this.currSearchResult})
        }else if (this.selectTopIndex === 1){
          SearchVideoComponent({currSearchResult: this.currSearchResult})
        }

      }
      .width('100%')
      .height('94%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_151724'))
  }
}