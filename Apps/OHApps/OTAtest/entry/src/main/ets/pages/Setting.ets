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
import router from '@ohos.router';
import { DialogHelper } from '../dialog/dialogHelper'
import { UpdaterManagement } from '../components/UpdaterManagement'
import systemparameter from '@ohos.systemParameterEnhance'

@Entry
@Component
struct Setting {
  private onBack?: () => boolean;
  @State autoUpgrade: boolean = false;
  @State autoDownload: boolean = false;
  @State ip: string = systemparameter.getSync("update.serverip.search");

  onPageShow() {
    this.ip = systemparameter.getSync("update.serverip.search");
  }

  async aboutToAppear() {
    //获取当前升级策略
    this.ip = systemparameter.getSync("update.serverip.search");
    UpdaterManagement.getInstance().getUpgradePolicy().then(policy => {
      if (policy.downloadStrategy) {
        this.autoDownload = true;
        if (policy.autoUpgradeStrategy) {
          this.autoUpgrade = true;
        }
      }
      console.log(`policy downloadStrategy = ${policy.downloadStrategy}`);
      console.log(`policy autoUpgradeStrategy = ${policy.autoUpgradeStrategy}`);
    }).catch(err => {
      console.log(`getUpgradePolicy promise error ${JSON.stringify(err)}`);
    });
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.back'))
          .width(30)
          .height(30)
          .objectFit(ImageFit.Contain)
          .margin({ left: 16 })
          .onClick(() => {
            let isCanNotBack = this.onBack?.();
            if (isCanNotBack) {
              return;
            }
            router.back();
          })
        Text('设置')
          .fontSize(20)
          .fontColor(Color.Black)
          .margin({ left: 16 })
          .fontWeight(FontWeight.Bold)
      }.alignSelf(ItemAlign.Start).height('15%')

      Column({ space: 10 }) {
        Row() {
          Column() {
            Text('智慧升级').fontSize(23).padding(5)
            Text('新版本将通过WLAN自动下载，并在夜间设备闲置时自动安装')
              .fontSize(15)
              .fontWeight(FontWeight.Lighter)
              .padding(5)
          }.width('80%').alignItems(HorizontalAlign.Start)

          Toggle({ type: ToggleType.Switch, isOn: this.autoUpgrade })
            .height(30)
            .width(80)
            .onChange((isOn: boolean) => {
              this.autoUpgrade = isOn;
              this.autoDownload = true;
              UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade)
              //确定取消自动升级
              if (!isOn) {
                DialogHelper.showDialog('智慧升级', '关闭智慧升级后，新版本升级需要您手动确认才能完成，确定要关闭吗？', '关闭', {
                  onCancel: () => {
                    this.autoUpgrade = true;
                    this.autoDownload = true;
                    UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
                  },
                  onConfirm: () => {
                    console.info('autoUpgrade onConfirm:');
                  }
                })
              }
            })
        }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

        if (!this.autoUpgrade) {
          Row() {
            Column() {
              Text('自动下载').fontSize(23).padding(5)
              Text('仅在WLAN环境下自动下载升级包').fontSize(15).fontWeight(FontWeight.Lighter).padding(5)
            }.width('80%').alignItems(HorizontalAlign.Start)

            Toggle({ type: ToggleType.Switch, isOn: this.autoDownload })
              .height(30)
              .width(80)
              .onChange((isOn: boolean) => {
                this.autoUpgrade = false;
                this.autoDownload = isOn;
                UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
                console.info('autoDownload status:' + isOn)
                if (!isOn) {
                  DialogHelper.showDialog('自动下载', '关闭自动下载升级包后，新版本的升级包需要您手动下载，确定要关闭吗？', '关闭', {
                    onCancel: () => {
                      this.autoUpgrade = false;
                      this.autoDownload = true;
                      UpdaterManagement.getInstance().setUpgradePolicy(this.autoDownload, this.autoUpgrade);
                    },
                    onConfirm: () => {
                      console.info('autoDownload cancel confirm:');
                    }
                  })
                }
              })
          }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })
        }

        Row() {
          Column() {
            Text('本地升级').fontSize(23).padding(5)
            Text('进入本地升级界面').fontSize(15).fontWeight(FontWeight.Lighter).padding(5)
          }.alignItems(HorizontalAlign.Start)
          .onClick(() => {
            router.pushUrl({ url: 'pages/LocalUpdater' });
          })
        }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

        Row() {
          Column() {
            Text('修改服务器IP').fontSize(23).padding(5)
            Text(this.ip).fontSize(15).fontWeight(FontWeight.Lighter).padding(5)
          }.alignItems(HorizontalAlign.Start)
          .onClick(() => {
            router.pushUrl({ url: 'pages/changeip' });
          })
        }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

        Row() {
          Column() {
            Text('APP升级').fontSize(23).padding(5)
            Text('进入APP升级界面').fontSize(15).fontWeight(FontWeight.Lighter).padding(5)
          }.alignItems(HorizontalAlign.Start)
          .onClick(() => {
            router.pushUrl({ url: 'pages/AppUpdater' });
          })
        }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

        Row() {
          Column() {
            Text('APP本地升级').fontSize(23).padding(5)
            Text('进入APP本地升级界面').fontSize(15).fontWeight(FontWeight.Lighter).padding(5)
          }.alignItems(HorizontalAlign.Start)
          .onClick(() => {
            router.pushUrl({ url: 'pages/AppLocalUpdater' });
          })
        }.width('100%').backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 })

      }.padding(20)
    }
  }
}