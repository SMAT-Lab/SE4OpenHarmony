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
import { Permissions } from '@ohos.abilityAccessCtrl'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import router from '@ohos.router'
import Logger from '../../utils/Logger'
import CameraModel from '../../model/CameraModel'
import User from '../data/User'
import { BusinessError } from '@ohos.base'

const TAG: string = '[CameraPage]'
const PERMISSIONS: Array<Permissions> = ['ohos.permission.READ_MEDIA', 'ohos.permission.WRITE_MEDIA', 'ohos.permission.MEDIA_LOCATION', 'ohos.permission.MICROPHONE', 'ohos.permission.CAMERA']

@Entry
@Component
struct CameraPage {
  // 底部特效模拟图片资源数组
  private imageList: Array<Resource> = [$r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon')];
  // 文字资源数组
  private textList: Array<Resource> = [$r('app.string.Word'), $r('app.string.Subsection'), $r('app.string.Video'), $r('app.string.Photo'), $r('app.string.Everyday'), $r('app.string.Live_streaming')];
  // 侧边图标资源数组
  private sidebarList_1: Array<Resource> = [$r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon')];
  private sidebarList_2: Array<Resource> = [$r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon'), $r('app.media.app_icon')];
  private xComponentController: XComponentController = new XComponentController();
  private textTimerController: TextTimerController = new TextTimerController();
  private cameraModel: CameraModel = new CameraModel(getContext(this))
  private scrollerHorText: Scroller = new Scroller();
  private scrollerHorImage: Scroller = new Scroller();
  private currentUser: User | null = null; // 当前用户信息
  @State recordingStatus: number = 0; // 0：未录制 1：正在录制 2：结束录制
  @State surfaceId: string = '-1';
  @State format: string = 'mm:ss';
  @State uploadFile: string = '';

  pageTransition() {
    // 登录页面从底部滑入滑出
    PageTransitionEnter({ type: RouteType.Push, duration: 200 })
      .slide(SlideEffect.Bottom)
    PageTransitionExit({ type: RouteType.Pop, duration: 200 })
      .slide(SlideEffect.Bottom)
  }

  aboutToAppear() {
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager()
    try {
      atManager.requestPermissionsFromUser(getContext(this), PERMISSIONS).then((data) => {
        this.cameraModel.createCamera(this.surfaceId);
        Logger.info(TAG, 'requestPermissionsFromUser success')
      }).catch((err: BusinessError) => {
        Logger.info(TAG, `requestPermissionsFromUser err: ${JSON.stringify(err)}`)
      })
    } catch (err) {
      Logger.info(TAG, `requestPermissionsFromUser catch err->${JSON.stringify(err)}`);
    }
    if (AppStorage.get("currentUser")) {
      this.currentUser = AppStorage.get("currentUser")!;
    }
  }

  onPageHide() {
    Logger.info(TAG, 'page onPageHide');
    this.stopVideo();
    this.cameraModel.releaseCamera();
  }

  onPageShow() {
    Logger.info(TAG, 'page onPageHide');
    this.cameraModel.createCamera(this.surfaceId);
  }

  startVideo() {
    Logger.info(TAG, 'page startVideo');
    this.recordingStatus = 1;
    this.textTimerController.reset();
    this.textTimerController.start();
    this.cameraModel.startVideo();
  }

  async stopVideo() {
    Logger.info(TAG, 'page stopVideo');
    this.recordingStatus = 2;
    this.textTimerController.pause();
    this.uploadFile = await this.cameraModel.stopVideo();
    Logger.info(TAG, `page stopVideo uploadFile = ${this.uploadFile}`);
  }

  build() {
    Column() {
      Stack() {
        XComponent({
          id: 'xComponentId',
          type: 'surface',
          controller: this.xComponentController
        })
          .onLoad(() => {
            Logger.info(TAG, 'onLoad is called')
            // 设置XComponent创建的曲面宽为640vp，高为480vp
            this.xComponentController.setXComponentSurfaceSize({ surfaceWidth: 640, surfaceHeight: 480 })
            this.surfaceId = this.xComponentController.getXComponentSurfaceId()
            Logger.info(TAG, `onLoad surfaceId: ${this.surfaceId}`)
            this.cameraModel.createCamera(this.surfaceId)
          })
          .height('100%')
          .width('100%')

        Column() {
          Row() {
            Row() {
              Image($r('app.media.app_icon'))
                .width(30)
                .height(30)
                .objectFit(ImageFit.Contain)
            }
            .width(50)
            .height(50)
            .justifyContent(FlexAlign.Center)
            .onClick(e => {
              router.back()
            })
            .visibility(this.recordingStatus !== 1 ? Visibility.Visible : Visibility.None) // 正在录制时不显示

            Row({ space: 8 }) {
              Image($r('app.media.app_icon'))
                .width(28)
                .height(28)
                .objectFit(ImageFit.Fill)
                .borderRadius(14)
              Text($r('app.string.Select_music'))
                .textAlign(TextAlign.Center)
                .fontColor($r('app.color.COLOR_FFFFFF'))
                .fontSize(16)
                .fontFamily($r('app.string.Font_family_regular'))
                .borderRadius(14)
            }
            .width(132)
            .height(48)
            .borderRadius(12)
            .backgroundColor($r('app.color.COLOR_669F9B9B'))
            .justifyContent(FlexAlign.Center)
            .visibility(this.recordingStatus !== 1 ? Visibility.Visible : Visibility.None) // 正在录制时不显示

            Row() {
              Image($r('app.media.app_icon'))
                .width(26)
                .height(26)
                .objectFit(ImageFit.Contain)
                .visibility(this.recordingStatus !== 2 ? Visibility.Visible : Visibility.None) // 非录制结束情况下显示
              Image($r('app.media.app_icon'))
                .width(26)
                .height(26)
                .objectFit(ImageFit.Contain)
                .visibility(this.recordingStatus === 2 ? Visibility.Visible : Visibility.None) // 录制结束情况时显示
            }
            .width(42)
            .height(42)
          }
          .width('100%')
          .height('8%')
          .justifyContent(this.recordingStatus !== 1 ? FlexAlign.SpaceBetween : FlexAlign.End)

          Column({ space: 18 }) {
            if (this.recordingStatus === 0) {
              ForEach(this.sidebarList_1, (sidebar: Resource, index: number) => {
                Image($r('app.media.app_icon'))
                  .width(28)
                  .height(28)
                  .objectFit(ImageFit.Contain)
                if (index === 1) {
                  Divider()
                    .vertical(false)
                    .height(1)
                    .width(22)
                    .color($r('app.color.COLOR_FFFFFF'))
                    .margin({ right: 4 })
                }
              })
            } else if (this.recordingStatus === 2) {
              ForEach(this.sidebarList_2, (sidebar: Resource, index: number) => {
                Image($r('app.media.app_icon'))
                  .width(28)
                  .height(28)
                  .objectFit(ImageFit.Contain)
                if (index === 0) {
                  Divider()
                    .vertical(false)
                    .height(1)
                    .width(22)
                    .color($r('app.color.COLOR_FFFFFF'))
                    .margin({ right: 4 })
                }
                if (index === 1) {
                  Text($r('app.string.Wen'))
                    .textAlign(TextAlign.Center)
                    .fontColor($r('app.color.COLOR_FFFFFF'))
                    .fontSize(22)
                    .fontFamily($r('app.string.Font_family_medium'))
                    .margin({ right: 4 })
                }
              })
            }
          }
          .width('100%')
          .height('50%')
          .padding({ top: 4, right: 14 })
          .alignItems(HorizontalAlign.End)
          .visibility(this.recordingStatus === 1 ? Visibility.None : Visibility.Visible) // 正在录制时不显示

          Blank()

          Column() {
            Column() {
              Column() {
                TextTimer({ isCountDown: false, count: 60000, controller: this.textTimerController })
                  .height('100%')
                  .fontSize(18)
                  .format(this.format)
                  .fontColor($r('app.color.COLOR_FFFFFF'))
              }
              .justifyContent(FlexAlign.Start)
              .visibility(this.recordingStatus === 1 ? Visibility.Visible : Visibility.Hidden)
              .width('100%')
              .height('30%')

              // 文字列表
              Scroll(this.scrollerHorText) {
                Row({ space: 42 }) {
                  ForEach(this.textList, (text: Resource, index: number) => {
                    Text(text)
                      .height('100%')
                      .textAlign(TextAlign.Center)
                      .fontColor(index === 2 ? $r('app.color.COLOR_EEC934') : $r('app.color.COLOR_FFFFFF'))
                      .fontSize(16)
                      .fontFamily($r('app.string.Font_family_medium'))
                  })
                }
                .height('100%')
                .justifyContent(FlexAlign.Start)
                .alignItems(VerticalAlign.Bottom)
              }
              .width('70%')
              .height('100%')
              .scrollable(ScrollDirection.Horizontal)
              .scrollBar(BarState.Off)
              .visibility(this.recordingStatus === 0 ? Visibility.Visible : Visibility.Hidden)
            }
            .width('100%')
            .height('15%')
            .justifyContent(FlexAlign.Center)

            Row() {
              if (this.recordingStatus === 0) {
                Column({ space: 6 }) {
                  Image($r('app.media.app_icon'))
                    .width(56)
                    .height(56)
                    .objectFit(ImageFit.Contain)
                    .borderRadius(12)
                  Text($r('app.string.Special'))
                    .textAlign(TextAlign.Center)
                    .fontColor($r('app.color.COLOR_FFFFFF'))
                    .fontSize(16)
                    .fontFamily($r('app.string.Font_family_medium'))
                }
                .width(64)
                .height(64)

                this.StartRecordComponent()

                Column({ space: 6 }) {
                  Image($r('app.media.app_icon'))
                    .width(56)
                    .height(56)
                    .objectFit(ImageFit.Fill)
                    .borderRadius(12)
                  Text($r('app.string.Album'))
                    .textAlign(TextAlign.Center)
                    .fontColor($r('app.color.COLOR_FFFFFF'))
                    .fontSize(16)
                    .fontFamily($r('app.string.Font_family_medium'))
                }
                .width(64)
                .height(64)
              } else if (this.recordingStatus === 1) {
                this.RecordingComponent()
              } else {
                this.PointComponent()
              }
            }
            .width('100%')
            .height('85%')
            .justifyContent(FlexAlign.SpaceEvenly)
          }
          .width('100%')
          .height('25%')
        }
        .width('100%')
        .height('100%')
      }
      .width('100%')
      .height('91%')
      .borderRadius(12)

      Row({ space: 12 }) {
        if (this.recordingStatus === 0) {
          Scroll(this.scrollerHorImage) {
            Row({ space: 14 }) {
              ForEach(this.imageList, (img: Resource) => {
                Image($r('app.media.app_icon'))
                  .width(56)
                  .height(56)
                  .objectFit(ImageFit.Fill)
                  .borderRadius(10)
              })
            }
            .height('100%')
            .justifyContent(FlexAlign.Start)
            .alignItems(VerticalAlign.Bottom)
            .margin({ bottom: 1 })
          }
          .width('70%')
          .height('100%')
          .scrollable(ScrollDirection.Horizontal)
          .scrollBar(BarState.Off)
        } else if (this.recordingStatus === 1) {

        } else if (this.recordingStatus === 2) {
          Row() {
            Image($r('app.media.app_icon'))
              .width(28)
              .height(28)
              .objectFit(ImageFit.Fill)
          }
          .layoutWeight(1)
          .height('80%')
          .justifyContent(FlexAlign.Center)
          .backgroundColor($r('app.color.COLOR_393939'))
          .borderRadius(12)

          Row({ space: 8 }) {
            if (this.currentUser) {
              Image($r('app.media.app_icon'))
                .width(28)
                .height(28)
                .objectFit(ImageFit.Fill)
                .borderRadius(14)
            }
            Text($r('app.string.Send_everyday'))
              .textAlign(TextAlign.Center)
              .fontColor($r('app.color.COLOR_FFFFFF'))
              .fontSize(18)
              .fontFamily($r('app.string.Font_family_regular'))
              .borderRadius(14)
          }
          .layoutWeight(2)
          .height('80%')
          .justifyContent(FlexAlign.Center)
          .backgroundColor($r('app.color.COLOR_393939'))
          .borderRadius(12)

          Row() {
            Text($r('app.string.Next'))
              .textAlign(TextAlign.Center)
              .fontColor($r('app.color.COLOR_FFFFFF'))
              .fontSize(18)
              .fontFamily($r('app.string.Font_family_regular'))
              .borderRadius(14)
          }
          .id('next')
          .layoutWeight(2)
          .height('80%')
          .justifyContent(FlexAlign.Center)
          .backgroundColor($r('app.color.COLOR_FC2B55'))
          .borderRadius(12)
          .onClick(e => {
            this.recordingStatus = 0;
            router.pushUrl({
              url: 'appsampled/pages/PublishPage',
              params: {
                uploadFile: this.uploadFile
              }
            })
          })
        }

      }
      .width('100%')
      .height('9%')
      .justifyContent(FlexAlign.Center)
      .padding({ left: 12, right: 12 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.COLOR_000000'))
  }

  @Builder
  StartRecordComponent() {
    Column() {
      Column()
        .width(80)
        .height(80)
        .backgroundColor(Color.Red)
        .borderRadius(40)
    }
    .id('startVideo')
    .width(100)
    .height(100)
    .border({ width: 5, color: $r('app.color.COLOR_FFFFFF'), radius: 50 })
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .onClick(e => {
      this.startVideo();
    })
  }

  @Builder
  RecordingComponent() {
    Stack() {
      Column()
        .width(60)
        .height(60)
        .borderRadius(30)
        .backgroundColor($r('app.color.COLOR_E6FFFFFF'))
      Column()
        .width(20)
        .height(20)
        .borderRadius(4)
        .backgroundColor(Color.Red)
    }
    .id('stopVideo')
    .width(120)
    .height(120)
    .borderRadius(60)
    .backgroundColor($r('app.color.COLOR_80FFFFFF'))
    .onClick(e => {
      this.stopVideo();
    })
  }

  @Builder
  PointComponent() {
    Row({ space: 8 }) {
      Text()
        .width(4)
        .height(4)
        .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
        .borderRadius(2)
      Text()
        .width(6)
        .height(6)
        .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
        .borderRadius(3)
      Text()
        .width(8)
        .height(8)
        .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
        .borderRadius(4)

      Text()
        .width(10)
        .height(10)
        .backgroundColor($r('app.color.COLOR_FFFFFF'))
        .borderRadius(5)

      Text()
        .width(8)
        .height(8)
        .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
        .borderRadius(4)
      Text()
        .width(6)
        .height(6)
        .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
        .borderRadius(3)
      Text()
        .width(4)
        .height(4)
        .backgroundColor($r('app.color.COLOR_CCFFFFFF'))
        .borderRadius(2)
    }
    .width(100)
    .height(30)
    .alignItems(VerticalAlign.Center)
    .justifyContent(FlexAlign.Center)
  }
}