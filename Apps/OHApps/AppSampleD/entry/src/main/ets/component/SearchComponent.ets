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

import Logger from '../utils/Logger';
import { getMockSearch } from '../mock/MockData'

const TAG: string = '[SearchComponent]';

@Component
export default struct SearchComponent {
  private scroller: Scroller = new Scroller();
  private searchArr: Array<string> = getMockSearch();
  @Link inputValue: string
  @Link isShowResult: boolean // 点击Item改变此值以展示搜索结果页面

  build() {
    Column() {
      Scroll(this.scroller) {
        Column({ space: 4 }) {
          ForEach(this.searchArr, (item: string, index: number) => {
            Row() {
              Image($r('app.media.app_icon'))
                .width(18)
                .height(18)
                .objectFit(ImageFit.Contain)
                .margin({ left: 14, right: 10 })
                .opacity(0.8)
              Text(item)
                .height(20)
                .fontColor($r('app.color.COLOR_CCFFFFFF'))
                .fontSize(20)
                .fontFamily($r('app.string.Font_family_medium'))
                .textAlign(TextAlign.Center)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .margin({ right: 12 })
              Blank()
              Image($r('app.media.app_icon'))
                .width(16)
                .height(16)
                .objectFit(ImageFit.Contain)
                .margin({ right: 14 })
                .opacity(0.7)
            }
            .id(`searchItem_${index+1}`)
            .width('100%')
            .height(40)
            .onClick(e => {
              // 只有前三条拥有对应的假数据，其他item不做处理
              if (index < 3) {
                this.inputValue = item;
                this.isShowResult = true;
              }
            })
          })
        }
        .width('100%')
      }
      .scrollable(ScrollDirection.Vertical)
      .scrollBar(BarState.Off)
      .width('100%')
      .height('45%')
      .align(Alignment.Top)

      Column({ space: 12 }) {
        Text($r('app.string.Clear_all_search_record'))
          .fontColor($r('app.color.COLOR_5A5B63'))
          .fontSize(18)
          .fontFamily($r('app.string.Font_family_medium'))
          .textAlign(TextAlign.Center)
        Divider()
          .vertical(false)
          .height(1)
          .width('90%')
          .color($r('app.color.COLOR_5A5B63'))
      }
      .width('100%')
      .height(30)
      .margin({ top: 10 })
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_151724'))
  }
}