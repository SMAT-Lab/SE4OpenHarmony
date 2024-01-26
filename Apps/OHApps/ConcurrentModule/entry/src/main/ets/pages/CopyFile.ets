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
import MyWorker from '../fileFs/MyWorker';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import router from '@ohos.router';
import { Logger } from '../common/Common';

const TAG: string = '[ConcurrentModule].[CopyFile]';
@Entry
@Component
struct Watcher {
  @State message: Resource = $r('app.string.copyFileText');
  @State myContext: Context = getContext(this) as common.UIAbilityContext;
  @State filePathSize: Array<number> = [];
  @State showFilePath: Array<string> = [];
  @State eventFilePath: Array<string> = [];
  @State fileListNames: Array<string> = [];
  @StorageLink('fileNumber') fileNum: string = '0';
  @StorageLink('fileListName1') fileListName1: string = ' ';
  @StorageLink('fileListName2') fileListName2: string = '';
  @StorageLink('copyFileLog1') copyFileLog1: string = '';
  @StorageLink('copyFileLog2') copyFileLog2: string = '';
  @StorageLink('copyFileLog3') copyFileLog3: string = '';
  @StorageLink('copyFileLog4') copyFileLog4: string = '';
  @StorageLink('copyFileShowLog') copyFileShowLog: string = '';
  myWorker: MyWorker = new MyWorker();
  scroller: Scroller = new Scroller();
  public dirPath: string = '';
  public baseDir: string = AppStorage.Get('sanBoxFileDir') as string;

  onPageShow() {
    this.myWorker.readyFilesToWorker();
    let filePathDir = this.baseDir + '/workerDir';
    let filenames = fs.listFileSync(filePathDir);
    Logger.info(TAG, 'listFile succeed');
    for (let i = 0; i < filenames.length; i++) {
      Logger.info(TAG, 'filename: %s', filenames[i]);
      this.showFilePath[i] = filenames[i];
      let filePath = filePathDir + '/' + filenames[i]
      this.filePathSize[i] = fs.statSync(filePath).size;
    }
    this.dirPath = this.baseDir + '/workerCopy';
    if (!fs.accessSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath);
    }
  }

  onPageHide() {
    this.dirPath = this.baseDir + '/workerCopy';
    let isDirectory = fs.statSync(this.dirPath).isDirectory();
    if (isDirectory) {
      fs.rmdirSync(this.dirPath);
      AppStorage.setOrCreate('fileNumber', '0');
      AppStorage.setOrCreate('fileListName1', '');
      AppStorage.setOrCreate('fileListName2', '');
      AppStorage.setOrCreate('copyFileShowLog', '');
    }
    let filePathDir = this.baseDir + '/workerDir';
    let isDir = fs.statSync(filePathDir).isDirectory();
    if (isDir) {
      fs.rmdirSync(filePathDir);
    }
  }

  build() {
    Scroll(this.scroller) {
      Row() {
        Column() {
          Row() {
            Image($r('app.media.ic_back'))
              .id('backIndex2')
              .width(20)
              .height(18)
              .align(Alignment.Start)
              .margin({ top: 13, bottom: 15, left: 26, right: 18 })
              .onClick(() => {
                router.back();
              })
            Text(this.message)
              .fontSize(20)
              .fontColor('#182431')
              .textAlign(TextAlign.Start)
              .lineHeight(28)
              .fontWeight(700)
              .margin({ top: 13, bottom: 15 })
          }
          .width('100%')
          .height(56)
          .backgroundColor('#f1f3f5')
          .align(Alignment.Start)

          Flex({ direction: FlexDirection.Column }) {

            Column() {
              Row() {
                Row() {
                  Text($r('app.string.workerTitleText'))
                    .fontSize(14)
                    .margin({ top: 19.5, bottom: 9.5 })
                    .lineHeight(19)
                    .width(176)
                    .fontColor('#182431')
                    .fontWeight(500)
                    .textAlign(TextAlign.Start)
                }
                .width('100%')
                .backgroundColor('#f1f3f5')
              }
              .margin({ left: 24, right: 52 })
              .height(48)
              .backgroundColor('#f1f3f5')

              Column() {
                List({ space: 12, initialIndex: 0 }) {
                  ForEach(this.showFilePath, (item: string, index) => {
                    ListItem() {
                      Row() {
                        Text(item)
                          .fontSize(16)
                          .fontColor('#182431')
                          .width('86%')
                          .lineHeight(22)
                          .textAlign(TextAlign.Start)
                          .fontWeight(500)
                          .margin({ left: 12 })
                          .borderRadius(10)
                          .backgroundColor(0xFFFFFF)
                        Row() {
                          Checkbox()
                            .select(false)
                            .id('checkbox' + index)
                            .width(20)
                            .height(20)
                            .margin({ right: 12 })
                            .selectedColor('#007DFF')
                            .borderRadius(4)
                            .onChange((value: boolean) => {
                              Logger.info(TAG, 'Checkbox1 change is' + value);
                              if (value) {
                                Logger.info(TAG, 'Workerets Checkbox1 index ' + index + ' is true');
                                this.eventFilePath.push(this.showFilePath[index]);
                              } else {
                                for (let i = 0; i < this.eventFilePath.length; i++) {
                                  if (this.eventFilePath[i] === this.showFilePath[index]) {
                                    this.eventFilePath[i] = 'deletedTag';
                                  }
                                }
                              }
                            })
                        }
                        .id('row' + index)
                        .width('9%')
                      }
                      .borderRadius(20)
                      .margin({ left: 12, right: 12 })
                      .height(56)
                      .backgroundColor(0xFFFFFF)
                    }
                    .id('listItem')
                  }, (item: string) => item)
                }
                .height('100%')
                .width('100%')
                .id('listWorkerFile')
                .alignListItem(ListItemAlign.Center)
                .scrollBar(BarState.Auto)
              }
              .backgroundColor('#f1f3f5')
              .height(436)
              .align(Alignment.Center)

              Column() {
                Row() {
                  Text($r('app.string.logTitle'))
                    .fontSize(14)
                    .fontColor('#182431')
                    .textAlign(TextAlign.Start)
                    .lineHeight(19)
                    .fontWeight(500)
                    .margin({ top: 19.5, left: 24 })
                    .width(176)
                }
                .width('100%')
                .align(Alignment.Start)

                Column() {
                  Column() {
                    Text(this.copyFileLog1 + this.fileNum + this.copyFileLog2)
                      .fontSize(16)
                      .fontColor('#182431')
                      .fontWeight(400)
                      .width('100%')
                    Text(this.copyFileShowLog)
                      .fontSize(16)
                      .fontColor('#182431')
                      .fontWeight(400)
                      .width('100%')
                  }
                  .margin({ top: 8, left: 12, right: 12, bottom: 8 })
                  .height(64)
                }
                .borderRadius(20)
                .height(80)
                .margin({ top: 9.5, left: 16, right: 16 })
                .backgroundColor('#ffffff')

                Row({ space: 1 }) {
                  Column() {
                    Button($r('app.string.copyFileText'))
                      .fontSize(16)
                      .width(312)
                      .height(40)
                      .fontColor('#FFFFFF')
                      .fontWeight(500)
                      .id('copyFile')
                      .onClick(async () => {
                        this.myWorker.deleteCopyFile(this.dirPath);
                        await this.myWorker.workToCopyFiles(this.eventFilePath, this.dirPath);
                      })
                  }
                  .width('100%')
                  .align(Alignment.End)
                }
                .align(Alignment.Center)
                .width('100%')
                .margin({ top: 24, left: 24, right: 24, bottom: 24 })
              }
              .backgroundColor('#f1f3f5')
              .width('100%')
              .height(216)
            }
            .backgroundColor('#f1f3f5')
            .width('100%')
          }
          .width('100%')
        }
        .height('100%')
      }
    }
  }
}