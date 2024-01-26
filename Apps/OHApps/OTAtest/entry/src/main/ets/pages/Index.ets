/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { UpdaterManagement, NewVersionStatus } from '../components/UpdaterManagement'
import { DialogHelper } from '../dialog/dialogHelper'
import router from '@ohos.router';
import systemparameter from '@ohos.systemParameterEnhance'

@Component
struct TitleBar {
  build() {
    Row() {
      Row() {
        Text('升级')
          .fontSize(20)
          .fontColor(Color.Black)
          .margin({ left: 16 })
          .fontWeight(FontWeight.Bold)
      }

      Blank()
      Row() {
        Image($r('app.media.setting'))
          .width(30)
          .height(30)
          .onClick(() => {
            router.pushUrl({
              url: 'pages/Setting'
            });
          })
      }.margin({ right: 20 })
    }.width('100%').padding(10)
  }
}

@Entry
@Component
struct Index {
  @State newVersionStatus: string = NewVersionStatus.NO_NEW_VERSION;
  @State updaterManagement: UpdaterManagement = UpdaterManagement.getInstance();

  async aboutToAppear() {
    await systemparameter.setSync("update.serverip.search", '127.0.0.1')
    try {
      systemparameter.get("persist.otaservice.ip", function (err, data) {
        if (err == undefined) {
          console.log("get persist.otaservice.ip value success:" + data)
          systemparameter.setSync("update.serverip.search", data);
        } else {
          console.log("get persist.otaservice.ip value err:" + err.code)
        }
      });
    } catch (e) {
      console.log("get unexpected error: " + e);
    }
  }

  onPageShow() {
    this.updaterManagement.onInit();
    this.updaterManagement.getCurrVersion();
  }

  build() {
    Column() {
      TitleBar().height('15%')
      Image($r('app.media.logo'))
        .height('25%')
        .width('70%')
        .objectFit(ImageFit.Contain)
      Column() {
        Text(this.updaterManagement.title)
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.HAS_NEW_VERSION) {
          Column() {
            if (!this.updaterManagement.showUpdateMsg) {
              Text("检测到新版本：" + this.updaterManagement.versionName)
                .fontSize(30)
                .fontWeight(FontWeight.Normal)
            }
            else {
              Text("更新信息：" + this.updaterManagement.journal)
                .fontSize(30)
                .fontWeight(FontWeight.Normal)
              Text("升级包大小：" + this.updaterManagement.size)
                .fontSize(30)
                .fontWeight(FontWeight.Normal)
            }
          }.backgroundColor('#ffedf1f5').borderRadius(20).padding(15).margin({ top: 3 })
        }

        if (this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_NEW_VERSION) {
          Column() {
            Text(this.updaterManagement.downloadProgress + "%")
              .fontSize(20)
              .fontWeight(FontWeight.Normal)
              .margin({ top: 10 })
            Progress({ value: this.updaterManagement.downloadProgress, type: ProgressType.Linear })
              .width('70%')
              .margin({ top: 10 })
          }
        }
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_SUCCESS) {
          Text("升级包已准备就绪，是否立即更新？")
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .margin({ top: 10 })
        }
      }.width('100%').height('35%')

      Column() {
        if (this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_SUCCESS ||
        this.updaterManagement.newVersionStatus == NewVersionStatus.DOWNLOAD_FAIL) {
          Text("重新下载")
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .fontColor(Color.Blue)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 5 })
            .onClick(() => {
              DialogHelper.showDialog("重新下载", "本次操作将会清除下载记录，是否重新开始检测新版本", '是', {
                onCancel: () => {
                },
                onConfirm: () => {
                  this.updaterManagement.checkNewVersionLocal();
                }
              })
            })
        }

        Button(this.updaterManagement.button)
          .margin({ bottom: 5 })
          .width(350)
          .height(60)
          .fontSize(45)
          .onClick(() => {
            this.updaterManagement.onClick();
          })
      }.height('25%').justifyContent(FlexAlign.End)
    }
    .width('100%')
  }
}