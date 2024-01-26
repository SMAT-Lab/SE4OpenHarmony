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
import update from '@ohos.update';
import router from '@ohos.router';
import ServiceModel from '../components/ServiceModel'
import wifiManager from '@ohos.wifiManager';

const upgradeFile = {
  fileType: 1, // OTA包
  filePath: "/data/ota_package/updater.zip" // 本地升级包路径
};

const certsFile = "/data/ota_package/signing_cert.crt"; //本地证书路径
const upgradeFiles = [upgradeFile];

@Entry
@Component
struct LocalUpdater {
  private onBack?: () => boolean;
  private date = new Date();
  private localUpdater: update.LocalUpdater;
  @State connectState: string = '未连接'
  private serviceModel = new ServiceModel(getContext(this));

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
        Text('本地升级')
          .fontSize(25)
          .fontColor(Color.Black)
          .margin({ left: 16 })
          .fontWeight(FontWeight.Bold)
      }.width('90%').height(56)

      Column() {
        Image($r('app.media.logo'))
          .height('30%')
          .width('70%')
          .objectFit(ImageFit.Contain)
        Button("开始升级")
          .fontSize(50)
          .onClick(() => {
            this.localUpdater = update.getLocalUpdater()
            this.localUpdater.verifyUpgradePackage(upgradeFile, certsFile).then(() => {
              console.log(`verifyUpgradePackage success`);
              if (wifiManager.isConnected()) {
                wifiManager.disconnect();
              }
              this.localUpdater.applyNewVersion(upgradeFiles).then(() => {
                console.log(`applyNewVersion success`);
              }).catch(err => {
                console.log(`applyNewVersion error ${JSON.stringify(err)}`);
              });
            }).catch(err => {
              console.log(`verifyUpgradePackage error ${JSON.stringify(err)}`);
            });
          })
      }
    }
  }
}