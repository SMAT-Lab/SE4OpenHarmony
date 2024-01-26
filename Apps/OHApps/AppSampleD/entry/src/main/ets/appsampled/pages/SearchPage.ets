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
import Logger from '../../utils/Logger';
import { getMockSearch } from '../../mock/MockData';
import SearchComponent from '../../component/SearchComponent';
import SearchResultComponent from '../../component/SearchResultComponent';

const TAG: string = '[SearchPage]';

@Entry
@Component
struct SearchPage {
  private searchArr: Array<string> = getMockSearch();
  @State inputValue: string = '';
  @State isInput: boolean = false;
  @State isShowResult: boolean = false;

  pageTransition(){
    // 登录页面从底部滑入滑出
    PageTransitionEnter({ type: RouteType.Push, duration: 10 })
      .slide(SlideEffect.Right)
    PageTransitionExit({ type: RouteType.Pop, duration: 10 })
      .slide(SlideEffect.Right)
  }

  build() {
    Column() {
      Row() {
        Row() {
          Image($r('app.media.app_icon'))
            .width(22)
            .height(22)
            .objectFit(ImageFit.Contain)
        }
        .id('searchBack')
        .width(50)
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .onClick(e => {
          Logger.info(TAG, `ic_cancel_cir onClick`);
          // 如果在搜索结果界面，则返回至搜索界面
          if (this.isShowResult) {
            this.isShowResult = false;
          }else {
            // 在搜索界面直接返回上一级页面
            router.back();
          }
        })

        Row() {
          Image($r('app.media.app_icon'))
            .width(24)
            .height(24)
            .margin({ left: 10, right: 10 })
            .objectFit(ImageFit.Contain)
          TextInput({ placeholder: this.searchArr[0], text: this.inputValue })
            .width('75%')
            .height('80%')
            .placeholderColor($r('app.color.COLOR_99F1F3F5'))
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .padding({ left: 0 })
            .onChange(value => {
              Logger.info(TAG, `TextInput onChange value= ${value}`);
              this.inputValue = value;
              if (this.inputValue) {
                this.isInput = true;
              } else {
                this.isInput = false;
              }
            })

          Row() {
            Image(this.isInput ? $r('app.media.app_icon') : $r('app.media.app_icon'))
              .width(24)
              .height(24)
              .margin({ left: 10, right: 10 })
              .objectFit(ImageFit.Contain)
              .opacity(0.8)
          }
          .width(50)
          .height('100%')
          .onClick(e => {
            Logger.info(TAG, `ic_cancel_cir onClick`);
            if (this.inputValue) {
              this.inputValue = '';
            }
          })
        }
        .width('75%')
        .height('65%')
        .backgroundColor($r('app.color.COLOR_393939'))
        .borderRadius(4)

        Column(){
          Text($r('app.string.Search'))
            .fontColor($r('app.color.COLOR_E3163D'))
            .fontSize(18)
            .fontFamily($r('app.string.Font_family_medium'))
            .textAlign(TextAlign.Center)
        }
        .width(64)
        .height('100%')
        .alignItems(HorizontalAlign.Center)
        .justifyContent(FlexAlign.Center)
        .onClick(e=>{
          this.isShowResult = true;
        })
      }
      .width('100%')
      .height('10%')
      .backgroundColor($r('app.color.COLOR_151724'))

      Column() {
        if (this.isShowResult){
          // 搜索结果界面
          SearchResultComponent({ inputSearch: this.inputValue })
        }else{
          // 搜索界面
          SearchComponent({inputValue: $inputValue, isShowResult: $isShowResult})
        }
      }
      .width('100%')
      .height('90%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_151724'))
  }
}