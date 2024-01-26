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
import User from '../appsampled/data/User';
import { getMockUser } from '../mock/MockData'
import Logger from '../utils/Logger';

const TAG: string = '[MessagePage]';

@Component
export default struct MessagePage {
  @State selectDownIndex: number = 2; // 底部选择索引
  private scrollerHor: Scroller = new Scroller();
  private scrollerVer: Scroller = new Scroller();
  private userArr: Array<User> = getMockUser(); // 用户信息模拟数据

  private currentUser: User | null = null; // 当前用户信息
  private oppositeUser: User | null = null; // 对端用户信息

  aboutToAppear(){
    // globalThis.oppositeUser = new User('13222222222',$r('app.media.ic_headphoto_2'));

    if (AppStorage.get("currentUser")) {
      this.currentUser = AppStorage.get("currentUser")!;
    }
    if (AppStorage.get("oppositeUser")) {
      this.oppositeUser = AppStorage.get("oppositeUser")!;
      // 将模拟数据中的第一条替换成真实对端数据
      this.userArr[0].setUsername(this.oppositeUser?.getUsername());
      this.userArr[0].setUserIcon(this.oppositeUser?.getUserIcon());
    }
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.app_icon'))
          .width(30)
          .height(30)
          .objectFit(ImageFit.Contain)
          .margin({ left: 15 })
        Image($r('app.media.app_icon'))
          .width(40)
          .height(40)
          .objectFit(ImageFit.Contain)
        Image($r('app.media.app_icon'))
          .width(30)
          .height(30)
          .objectFit(ImageFit.Contain)
          .margin({ right: 15 })
      }
      .width('100%')
      .height('7%')
      .justifyContent(FlexAlign.SpaceBetween)

      Column() {
        Scroll(this.scrollerVer) {
          Column() {
            // 横向列表
            Scroll(this.scrollerHor) {
              Row() {
                ForEach(this.userArr, (user: User) => {
                  Column(){
                    Image($r('app.media.app_icon'))
                      .width(70)
                      .height(70)
                      .objectFit(ImageFit.Contain)
                      .borderRadius(35)
                      .margin({bottom: 8})
                    Text(user.getUsername())
                      .height(20)
                      .fontColor($r('app.color.COLOR_E6FFFFFF'))
                      .fontSize(16)
                      .fontFamily($r('app.string.Font_family_regular'))
                      .textAlign(TextAlign.Center)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })
                  }
                  .width(90)
                  .height(90)
                })
              }
              .height('100%')
            }
            .scrollable(ScrollDirection.Horizontal)
            .scrollBar(BarState.Off)
            .width('100%')
            .height(120)

            // 新朋友
            Row(){
              Column(){
                Image($r('app.media.app_icon'))
                  .width(30)
                  .height(30)
                  .objectFit(ImageFit.Contain)
              }
              .width(60)
              .height(60)
              .backgroundColor($r('app.color.COLOR_57A9FE'))
              .borderRadius(30)
              .justifyContent(FlexAlign.Center)
              .margin({left: 15, right: 15})
              Column({space: 8}){
                Text($r('app.string.NewFriend'))
                  .height(20)
                  .fontColor($r('app.color.COLOR_FFFFFF'))
                  .fontSize(18)
                  .fontFamily($r('app.string.Font_family_regular'))
                Text($r('app.string.No_new_notice'))
                  .height(20)
                  .fontColor($r('app.color.COLOR_CCFFFFFF'))
                  .fontSize(16)
                  .fontFamily($r('app.string.Font_family_regular'))
              }
              .height(70)
              .justifyContent(FlexAlign.Center)
              .alignItems(HorizontalAlign.Start)

              Blank()

              Image($r('app.media.app_icon'))
                .width(20)
                .height(20)
                .objectFit(ImageFit.Contain)
                .margin({right: 20})
            }
            .width('100%')
            .height(80)
            .alignItems(VerticalAlign.Center)

            // 互动消息
            Row(){
              Column(){
                Image($r('app.media.app_icon'))
                  .width(50)
                  .height(50)
                  .objectFit(ImageFit.Contain)
                  .rotate({angle: -90})
              }
              .width(60)
              .height(60)
              .backgroundColor($r('app.color.COLOR_FF689F'))
              .borderRadius(30)
              .justifyContent(FlexAlign.Center)
              .margin({left: 15, right: 15})
              Column({space: 8}){
                Text($r('app.string.Interactive_message'))
                  .height(20)
                  .fontColor($r('app.color.COLOR_FFFFFF'))
                  .fontSize(18)
                  .fontFamily($r('app.string.Font_family_regular'))
                Text($r('app.string.Interactive_message_content'))
                  .height(20)
                  .fontColor($r('app.color.COLOR_CCFFFFFF'))
                  .fontSize(16)
                  .fontFamily($r('app.string.Font_family_regular'))
              }
              .height(70)
              .justifyContent(FlexAlign.Center)
              .alignItems(HorizontalAlign.Start)

              Blank()

              Image($r('app.media.app_icon'))
                .width(20)
                .height(20)
                .objectFit(ImageFit.Contain)
                .margin({right: 20})
            }
            .width('100%')
            .height(80)
            .alignItems(VerticalAlign.Center)

            // 竖向列表
            ForEach(this.userArr, (user: User, index: number) => {
              Row(){
                Column(){
                  Image($r('app.media.app_icon'))
                    .width(60)
                    .height(60)
                    .objectFit(ImageFit.Contain)
                    .borderRadius(30)
                }
                .width(60)
                .height(60)
                .borderRadius(30)
                .justifyContent(FlexAlign.Center)
                .margin({left: 15, right: 15})
                Column({space: 8}){
                  Text(user.getUsername())
                    .height(20)
                    .fontColor($r('app.color.COLOR_FFFFFF'))
                    .fontSize(18)
                    .fontFamily($r('app.string.Font_family_regular'))
                  Text($r('app.string.Greet'))
                    .height(20)
                    .fontColor($r('app.color.COLOR_CCFFFFFF'))
                    .fontSize(16)
                    .fontFamily($r('app.string.Font_family_regular'))
                }
                .height(70)
                .justifyContent(FlexAlign.Center)
                .alignItems(HorizontalAlign.Start)
              }
              .id(`userID_${index+1}`)
              .width('100%')
              .height(80)
              .alignItems(VerticalAlign.Center)
              .onClick(e=>{
                if (index !== 0) {
                  return;
                }
                router.pushUrl({url: 'appsampled/pages/ChatPage'})
              })
            })
          }
          .width('100%')
        }
        .scrollable(ScrollDirection.Vertical)
        .scrollBar(BarState.Off)
        .width('100%')
        .height('100%')
      }
      .width('100%')
      .height('93%')

    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_000000'))
  }
}