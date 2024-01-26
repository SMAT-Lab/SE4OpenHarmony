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
import prompt from '@ohos.prompt';
import router from '@ohos.router';
import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import wantConstant from '@ohos.app.ability.wantConstant';
import fileShare from '@ohos.fileshare';
import installer from '@ohos.bundle.installer';

let context;
context = getContext(this) as any

function requestPermission() {
  context = getContext(this) as any
  let permissions: Array<string> = ['ohos.permission.WRITE_MEDIA']
  context.requestPermissionsFromUser(permissions).then((data) => {
    console.info("Succeed to request permission from user with data: " + JSON.stringify(data))
  }).catch((error) => {
    console.info("Failed to request permission from user with error: " + JSON.stringify(error))
  })
}

@Entry
@Component
struct LocalUpdater {
  private onBack?: () => boolean;

  async aboutToAppear() {
    await requestPermission()
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
        Button("选择安装包升级")
          .fontSize(50)
          .onClick(() => {
            try {
              let DocumentSelectOptions = new picker.DocumentSelectOptions();
              let documentPicker = new picker.DocumentViewPicker();
              documentPicker.select(DocumentSelectOptions).then((DocumentSelectResult) => {
                console.info('DocumentViewPicker.select successfully, DocumentSelectResult uri: ' + JSON.stringify(DocumentSelectResult));
                let bundleName = 'com.example.otatest';
                try {
                  fileShare.grantUriPermission(DocumentSelectResult.toString(), bundleName, wantConstant.Flags.FLAG_AUTH_READ_URI_PERMISSION | wantConstant.Flags.FLAG_AUTH_WRITE_URI_PERMISSION, (err) => {

                    if (err) {
                      console.error("grantUriPermission failed with error: " + err);
                      return;
                    } else {
                      let file = fs.openSync(DocumentSelectResult.toString(), fs.OpenMode.READ_WRITE);
                      let dstPath = "/data/storage/el2/base/haps/entry/files/OTA.hap";
                      fs.copyFile(file.fd, dstPath).then(() => {
                        let hapFilePaths = ['/data/storage/el2/base/haps/entry/files/OTA.hap'];
                        let installParam = {
                          userId: 100,
                          isKeepData: false,
                          installFlag: 1,
                        };
                        let bundleName = 'com.example.hello';
                        installer.getBundleInstaller().then(data => {
                          data.install(hapFilePaths, installParam, err => {
                            if (err) {
                              console.error('install failed:' + err.message);
                            } else {
                              prompt.showToast({
                                message: "安装升级包成功"
                              })
                              console.info('install successfully.');
                            }
                          });
                        }).catch(error => {
                          console.error('getBundleInstaller failed. Cause: ' + error.message);
                        });
                        fs.closeSync(file)
                        console.info("copy file succeed");
                      }).catch((err) => {
                        console.info("copy file failed with error message: " + err.message + ", error code: " + err.code);
                      });
                    }
                    console.info("grantUriPermission success!");
                  });
                } catch (error) {
                  console.error("grantUriPermission failed with error:" + error);
                }
              }).catch((err) => {
                console.error('DocumentViewPicker.select failed with err: ' + err);
              });
            } catch (err) {
              console.error('DocumentViewPicker failed with err: ' + err);
            }
          })
      }.height('70%')
    }
  }
}
