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
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import UploadController from '../../controller/UploadController';
import User from '../data/User';
import Logger from '../../utils/Logger';
import { BusinessError } from '@ohos.base';

const TAG: string = '[PublishPage]';

class Item{
  res?: Resource
  name?: Resource

  // constructor(res: Resource, name: Resource) {
  //   this.res = res;
  //   this.name = name
  // }
}

@Entry
@Component
struct PublishPage {
  private itemList: Array<Item> = [{ res: $r('app.media.app_icon'), name: $r('app.string.Where_are_you') },
    { res: $r('app.media.app_icon'), name: $r('app.string.Add_applet') },
    { res: $r('app.media.app_icon'), name: $r('app.string.Publicly_visible') },
    { res: $r('app.media.app_icon'), name: $r('app.string.Advanced_setup') }];
  private uploadController: UploadController = new UploadController();
  private uploadFile: string = (router.getParams() as Record<string, Object>).uploadFile as string; // 需要上传的文件名
  private currentUser: User | null = null; // 当前用户信息
  @State uploadState: boolean = false;

  pageTransition() {
    // 登录页面从底部滑入滑出
    PageTransitionEnter({ type: RouteType.Push, duration: 10 })
      .slide(SlideEffect.Right);
    PageTransitionExit({ type: RouteType.Pop, duration: 10 })
      .slide(SlideEffect.Right);
  }

  aboutToAppear() {
    if (AppStorage.get("currentUser")) {
      this.currentUser = AppStorage.get("currentUser")!;
    }
  }

  build() {
    Column() {
      Row({ space: 12 }) {
        Image($r('app.media.app_icon'))
          .width(24)
          .height(24)
          .objectFit(ImageFit.Fill)
        Text($r('app.string.Return_edit'))
          .textAlign(TextAlign.Center)
          .fontColor($r('app.color.COLOR_CCFFFFFF'))
          .fontSize(16)
          .fontFamily($r('app.string.Font_family_regular'))
          .borderRadius(14)
      }
      .width('100%')
      .height('8%')
      .padding({ left: 12 })
      .onClick(e => {
        router.back();
      })

      Row() {
        Column() {
          TextArea({ placeholder: $r('app.string.Add_work_description') })
            .id('textArea')
            .width('100%')
            .height('50%')
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .placeholderColor($r('app.color.COLOR_CCFFFFFF'))
            .fontSize(18)
            .fontFamily($r('app.string.Font_family_regular'))
          Blank()
          Row({ space: 6 }) {
            Text($r('app.string.Topic'))
              .width(88)
              .height(42)
              .fontColor($r('app.color.COLOR_FFFFFF'))
              .backgroundColor($r('app.color.COLOR_669F9B9B'))
              .textAlign(TextAlign.Center)
              .fontFamily($r('app.string.Font_family_regular'))
              .borderRadius(12)
            Text($r('app.string.Well_Number_Friend'))
              .width(88)
              .height(42)
              .fontColor($r('app.color.COLOR_FFFFFF'))
              .textAlign(TextAlign.Center)
              .backgroundColor($r('app.color.COLOR_669F9B9B'))
              .fontFamily($r('app.string.Font_family_regular'))
              .borderRadius(12)
          }
          .width('100%')
          .height(48)
        }
        .width('70%')
        .height('100%')
        .padding({ left: 12 })

        Blank()
        Stack() {
          Image($r('app.media.app_icon'))
            .width('80%')
            .height('90%')
            .objectFit(ImageFit.Fill)
            .borderRadius(12)
          Text($r('app.string.Select_cover'))
            .width('80%')
            .height(32)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .textAlign(TextAlign.Center)
            .backgroundColor($r('app.color.COLOR_669F9B9B'))
            .borderRadius(12)
            .fontFamily($r('app.string.Font_family_regular'))
        }
        .width('30%')
        .height('100%')
        .borderRadius(12)
        .alignContent(Alignment.Bottom)
      }
      .width('100%')
      .height('22%')

      Divider()
        .vertical(false)
        .height(1)
        .width('92%')
        .color($r('app.color.COLOR_5A5B63'))
        .margin({ top: 12 })

      Column({ space: 2 }) {
        ForEach(this.itemList, (item: Item) => {
          Row({ space: 12 }) {
            Image(item.res)
              .width(24)
              .height(24)
              .objectFit(ImageFit.Fill)
              .borderRadius(4)
            Text(item.name)
              .fontColor($r('app.color.COLOR_FFFFFF'))
              .textAlign(TextAlign.Center)
              .fontFamily($r('app.string.Font_family_regular'))

            Blank()

            Image($r('app.media.app_icon'))
              .width(18)
              .height(18)
              .objectFit(ImageFit.Fill)
          }
          .width('100%')
          .height(64)
          .padding({ left: 12, right: 12 })
        })
      }
      .width('100%')
      .height('40%')

      Blank()
      // 发布成功的提示
      if (this.uploadState) {
        Row({ space: 8 }) {
          if (this.currentUser) {
            Image($r('app.media.app_icon'))
              .width(36)
              .height(36)
              .objectFit(ImageFit.Contain)
              .borderRadius(18)
          }
          Text($r('app.string.Publish_Success'))
            .fontColor($r('app.color.COLOR_000000'))
            .textAlign(TextAlign.Center)
            .fontFamily($r('app.string.Font_family_regular'))
            .fontSize(18)
        }
        .width('96%')
        .height(64)
        .backgroundColor($r('app.color.COLOR_FFFFFF'))
        .margin({ left: 8, right: 8, bottom: 12 })
        .padding({ left: 12, right: 12 })
        .borderRadius(12)
      }
      Row({ space: 8 }) {
        Row({ space: 8 }) {
          Image($r('app.media.app_icon'))
            .width(20)
            .height(20)
            .objectFit(ImageFit.Contain)
            .borderRadius(14)
          Text($r('app.string.Save_Draft'))
            .textAlign(TextAlign.Center)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(16)
            .fontFamily($r('app.string.Font_family_regular'))
            .borderRadius(14)
        }
        .layoutWeight(1)
        .height('80%')
        .justifyContent(FlexAlign.Center)
        .backgroundColor($r('app.color.COLOR_393939'))
        .borderRadius(12)

        Row({ space: 8 }) {
          Image($r('app.media.app_icon'))
            .width(20)
            .height(20)
            .objectFit(ImageFit.Contain)
            .borderRadius(14)
          Text($r('app.string.Publish'))
            .textAlign(TextAlign.Center)
            .fontColor($r('app.color.COLOR_FFFFFF'))
            .fontSize(16)
            .fontFamily($r('app.string.Font_family_regular'))
            .borderRadius(14)
        }
        .id('upload')
        .layoutWeight(1)
        .height('80%')
        .justifyContent(FlexAlign.Center)
        .backgroundColor($r('app.color.COLOR_FC2B55'))
        .borderRadius(12)
        .onClick(e => {
          Logger.info(TAG, `uploadFile = ${this.uploadFile}`);
          this.uploadController.uploadFile(this.uploadFile).then(res => {
            Logger.info(TAG, `uploadFile success= ${JSON.stringify(res)}`);
            this.uploadState = true;
            setTimeout(() => {
              this.uploadState = false;
              router.pushUrl({ url: 'pages/Index' })
            }, 500)
          }).catch((err: BusinessError) => {
            Logger.info(TAG, `uploadFile faild= ${JSON.stringify(err)}`);
            router.pushUrl({ url: 'pages/Index' })
          })
        })
      }
      .width('100%')
      .height('9%')
      .padding({ left: 8, right: 8 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_151724'))
  }
}