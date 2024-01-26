/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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

import CreateFile from '../fileFs/CreateFile';
import Logger from '../common/Logger';
import fs from '@ohos.file.fs';

const TAG: string = '[Sample_FileBackDemo]';

@Entry
@Component
struct BackupExample {
  createFile = new CreateFile();
  baseDir: string = AppStorage.get<string>('sanBoxFileDir') + '/TextDir';
  @State filePathSize: Array<string> = [];
  @State showFilePath: Array<string> = [];

  onPageShow() {
    try {
      if (!fs.accessSync(this.baseDir)) {
        fs.mkdirSync(this.baseDir);
        this.showFilePath[0] = '';
        this.filePathSize[0] = '';
        return;
      }
      Logger.info(TAG, `readyFileToFileFs successful`);
    } catch (e) {
      Logger.error(TAG, `readyFileToFileFs has failed for: {message: ${e?.message}, code: ${e?.code}}`);
    }
    let filenames = fs.listFileSync(this.baseDir);
    for (let i = 0; i < filenames.length; i++) {
      Logger.info(TAG, "filename:" + filenames[i]);
      this.showFilePath[i] = filenames[i];
      let filePath = this.baseDir + '/' + filenames[i]
      this.filePathSize[i] = fs.statSync(filePath).size.toString() + 'Byte';
      Logger.info(TAG, "arrayfilename: " + i + this.showFilePath[i].toString());
    }
  }

  build() {
    Column() {
      Text($r('app.string.fileData'))
        .fontSize(14)
        .fontColor('#182431')
        .margin({ top: 8, left: 48, bottom: 8 })
        .id('filedata')
        .opacity(0.6)
        .align(Alignment.TopStart)
        .width('93%')

      List({ space: 10, initialIndex: 0 }) {
        ForEach(this.showFilePath, (item: string, index?: number) => {
          ListItem() {
            Column() {
              if (this.showFilePath[0] === '') {
                Text($r("app.string.filelistWaitingToBeGenerated"))
                  .fontSize(16)
                  .margin({ top: 8 })
                  .fontColor('#182431')
                  .opacity(0.4)
                  .width('90%')
                  .align(Alignment.Start)
              }
              Row() {
                Text(' ' + item)
                  .fontSize(16)
                  .fontColor('#182431')
                  .width('70%')
                  .textAlign(TextAlign.Start)
                  .fontWeight(500)
                  .margin({ left: 20 })
                  .id('file' + index)
                if (index != undefined) {
                  Text(this.filePathSize[index])
                    .fontSize(14)
                    .width('20%')
                    .textAlign(TextAlign.End)
                    .fontColor('#182431')
                    .fontWeight(400)
                    .margin({ right: 16 })
                    .opacity(0.6)
                    .id('size' + index)
                }
              }
              .width('100%')
              .height(56)

              if (this.showFilePath[0] !== '') {
                Divider()
                  .strokeWidth('1vp')
                  .color('#182431')
                  .opacity(0.05)
                  .margin({ left: 24, right: 24 })
                  .width('90%')
              }
            }
            .width('100%')
          }
        }, (item: string) => item)
      }
      .height('80%')
      .width('93%')
      .borderRadius(24)
      .backgroundColor(0xFFFFFF)
      .align(Alignment.Center)

      Button($r("app.string.createFiles"))
        .id('createFiles')
        .backgroundColor('#007DFF')
        .margin(15)
        .width('87%')
        .borderRadius(20)
        .onClick(async () => {
          await this.createFile.createTestFiles();
          this.onPageShow();
        })
        .align(Alignment.Center)
    }.width('100%').height('100%').backgroundColor('#F1F3F5')
  }
}