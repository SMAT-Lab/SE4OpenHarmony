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

import promptAction from '@ohos.promptAction';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import router from '@ohos.router';
import picker from '@ohos.file.picker';
import { BusinessError } from '@ohos.base';
import MediaFileUri from '../media/MediaFileUri';
import Logger from '../common/Logger';
import { terminateSelf } from '../utils/utils';

const TAG = 'EditFile: ';
let storage = LocalStorage.GetShared();
const OPACITY_VALUE = 0.6; // 透明度
interface myParams extends Object {
  myUri: string
  fileName: string
}

@Entry(storage)
@Component
struct EditFile {
  @State myContext: Context = getContext(this) as common.UIAbilityContext;
  @StorageLink('myFileSize') myFileSize: number = 0;
  @State myFileName: string = '';
  @StorageLink('myFileContent') myFileContent: string = '';
  @State myUri: string = '';
  @State opacityValue: number = OPACITY_VALUE;
  @LocalStorageLink('loadFlag') loadFlag: Boolean = false;
  @LocalStorageLink('loadFileSize') loadFileSize: number = 0;
  @LocalStorageLink('loadFileName') loadFileName: string = '';
  @LocalStorageLink('loadFileContent') loadFileContent: string = '';
  @LocalStorageLink('loadUri') loadUri: string = '';
  @LocalStorageLink('fd') loadFd: number = 0;
  @StorageLink('editable') editable: Boolean = false;
  newFileContent: string = '';
  public fileContentFlag: boolean = false;
  scroller: Scroller = new Scroller();
  controller: TextAreaController = new TextAreaController();
  mediaFileUri: MediaFileUri = new MediaFileUri();
  @State uriSave: string = '';

  getFileInfo(): void {
    if (this.loadFlag) {
      this.myFileName = this.loadFileName;
      this.myFileContent = this.loadFileContent;
      this.myFileSize = this.loadFileSize;
      this.myUri = this.loadUri;
      Logger.info(TAG, 'The count of getFileInfo is myFileContent ' + this.myFileContent);
    } else {
      this.myUri = (router.getParams() as myParams).myUri;
      this.myFileName = (router.getParams() as myParams).fileName;

      this.myFileContent = this.mediaFileUri.readFileContent(this.myUri);
      this.myFileSize = this.mediaFileUri.myGetFileSize(this.myUri, fs.OpenMode.READ_ONLY);

      Logger.info(TAG, 'The count of getFileInfo is myFileName is: ' + this.myFileName);
      Logger.info(TAG, 'The count of getFileInfo is myFileContent ' + this.myFileContent);
      Logger.info(TAG, 'The count of getFileInfo is myFileSize ' + this.myFileSize);
    }
    AppStorage.SetOrCreate('myFileContent', this.myFileContent);
    AppStorage.SetOrCreate('myFileSize', this.myFileSize);
  }

  async writeContentForSaveAsFile(myUri: string, wrFlag: Boolean = false): Promise<void> {
    if (wrFlag) {
      Logger.info(TAG, 'fileAsset.displayName wrFlag is true');
      Logger.info(TAG, 'fileAsset.displayName wrFlag myFileContent :' + this.myFileContent);
      this.mediaFileUri.writeFileContent(myUri, this.myFileContent);
    }
  }

  /**
   * 拉起picker保存文件
   */
  async callFilePickerSaveFile(): Promise<void> {
    try {
      let DocumentSaveOptions = new picker.DocumentSaveOptions();
      DocumentSaveOptions.newFileNames = ['MyDocument_01.txt'];
      let documentPicker = new picker.DocumentViewPicker();
      documentPicker.save(DocumentSaveOptions).then((DocumentSaveResult) => {
        Logger.info(TAG, 'DocumentViewPicker.save successfully, DocumentSaveResult uri: ' + JSON.stringify(DocumentSaveResult));
        if (DocumentSaveResult !== null && DocumentSaveResult !== undefined) {
          this.uriSave = DocumentSaveResult[0];
          Logger.info(TAG, `save callFilePickerSaveFile file this.uriSave: ${this.uriSave}`);
        }
        Logger.info(TAG, 'fileAsset.displayName wrFlag myFileContent :' + this.myFileContent);
        this.writeContentForSaveAsFile(this.uriSave, true); // 用 medialibrary 重新获取uri，进行写入操作
      }).catch((err: BusinessError) => {
        Logger.error(TAG, 'DocumentViewPicker.save failed with err: ' + JSON.stringify(err));
      });
    } catch (err) {
      Logger.error(TAG, 'DocumentViewPicker failed with err: ' + err);
    }
  }

  onPageShow(): void {
    this.getFileInfo();
  }

  build() {
    Column() {
      // 顶部的行容器
      Row() {
        // 后退箭头
        Row() {
          Image($r('app.media.ic_back'))
            .focusable(true)
            .focusOnTouch(true)
            .id('backIndex')
            .width(25)
            .height(25)
            .align(Alignment.Start)
            .onClick(() => {
              if (this.loadFlag) {
                Logger.info(TAG, 'end page');
                let context = getContext(this);
                terminateSelf(context)
              } else {
                router.back();
              }
            })
        }
        .margin({ left: '5%' })

        // 文件名及信息
        Column() {
          Row() {
            Text(this.myFileName)
              .focusable(true)
              .focusOnTouch(true)
              .fontSize(20)
              .fontFamily('HarmonyHeiTi-Bold')
              .fontColor('#182431')
              .textAlign(TextAlign.Start)
              .fontWeight(700)
              .lineHeight(28)
              .maxLines(1)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
          }
          .width('100%')
          .align(Alignment.Start)
          .margin({ left: '5%', top: '0.4%', bottom: '0.3%' })

          Row() {
            Text('size: ' + JSON.stringify(this.myFileSize) + 'B')
              .focusable(true)
              .focusOnTouch(true)
              .opacity(0.6)
              .fontFamily('HarmonyHeiTi')
              .fontSize(14)
              .fontColor('#182431')
              .textAlign(TextAlign.Start)
              .lineHeight(19)
              .fontWeight(400)
          }
          .width('100%')
          .margin({ left: '5%', top: '0.3%', bottom: '0.5%' })
          .align(Alignment.Start)
        }
        .width('45%')
        .margin({ left: '5%' })

        // 右边三个图标
        Row() {
          Image($r('app.media.ic_saveas'))
            .focusable(true)
            .focusOnTouch(true)
            .width(25)
            .height(25)
            .id('saveAs')
            .margin({ right: '12%' })
            .onClick(() => {
              this.callFilePickerSaveFile();
            })
            .visibility(this.loadFlag ? Visibility.Hidden : Visibility.Visible)

          Image($r('app.media.ic_writting'))
            .focusable(true)
            .focusOnTouch(true)
            .width(25)
            .height(25)
            .id('editable')
            .margin({ right: '12%' })
            .onClick(() => {
              this.editable = true;
              AppStorage.SetOrCreate('editable', this.editable);
              Logger.info(TAG, 'EditFile caretPosition length = ' + this.myFileContent.length);
              this.controller.caretPosition(this.myFileContent.length);
              promptAction.showToast({ message: $r('app.string.editable') });
            })

          Image($r('app.media.ic_save'))
            .focusable(true)
            .focusOnTouch(true)
            .width(25)
            .height(25)
            .id('save')
            .margin({ right: '5%' })
            .onClick(() => {
              if (this.fileContentFlag) {
                let flage: boolean = true
                this.myFileContent = this.newFileContent;
                AppStorage.SetOrCreate('myFileContent', this.myFileContent);
                Logger.info(TAG, 'save onClick myFileContent is: ' + this.myFileContent);
                Logger.info(TAG, 'save onClick this.loadUri: ' + this.loadUri);
                if (this.loadFlag) {
                  let file = fs.openSync(this.loadUri, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE | fs.OpenMode.TRUNC);
                  Logger.info(TAG, 'save onClick file.fd is: ' + file.fd);
                  fs.write(file.fd, this.myFileContent).then((writeLen) => {
                    Logger.info(TAG, "write data to file succeed and size is:" + writeLen);
                    this.myFileSize = fs.statSync(file.fd).size;
                    AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                    Logger.info(TAG, 'save onClick this.myFileSize ' + this.myFileSize);
                  }).catch((err: BusinessError) => {
                    Logger.info(TAG, "write data to file failed with error:" + JSON.stringify(err));
                  });
                  fs.closeSync(file);
                } else {
                  try {
                    let file = fs.openSync(this.myUri, fs.OpenMode.READ_WRITE | fs.OpenMode.TRUNC);
                    let writeLen = fs.writeSync(file.fd, this.myFileContent);
                    this.myFileSize = fs.statSync(file.fd).size;
                    AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                    Logger.info(TAG, 'write data to file succeed and size is:' + writeLen);
                    fs.closeSync(file);
                  }
                  catch(err){
                    flage = false
                    Logger.info(`save data to file failed with error:, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
                    promptAction.showToast({
                      message: `保存失败，文件操作无权限`,
                      duration: 6500,
                    })
                  }
                }
                if(flage){
                  this.editable = false;
                  AppStorage.SetOrCreate('editable', this.editable);
                  promptAction.showToast({ message: $r('app.string.saved') });
                }
              }
            })
        }
        .height('50%')
        .width('37.2%')
        .padding({ right: '0.5%' })
        .justifyContent(FlexAlign.End)
      }
      .height('7.4%')
      .width('100%')

      Scroll(this.scroller) {
        // TextArea的行容器
        Row() {
          TextArea({ text: this.myFileContent, placeholder: 'Input text here...', controller: this.controller })
            .id('textArea')
            .fontSize(16)
            .fontColor('#182431')
            .opacity(this.opacityValue)
            .fontWeight(400)
            .align(Alignment.TopStart)
            .textAlign(TextAlign.Start)
            .backgroundColor('#f1f3f5')
            .fontFamily('HarmonyHeiTi')
            .padding({
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            }) // 默认为top: 8 vp, right: 16 vp, bottom: 8 vp, left: 16 vp，需要更改
            .focusable(this.editable ? true : false)
            .focusOnTouch(true)
            .defaultFocus(false)
            .onFocus(() => {
              this.opacityValue = 1;
            })
            .onBlur(() => {
              this.opacityValue = OPACITY_VALUE;
            })
            .onChange((value: string) => {
              this.newFileContent = value;
              this.fileContentFlag = true;
            })
        }
        .padding({ top: '4%', left: '6.7%', right: '6.7%' })
      }
    }
    .backgroundColor('#f1f3f5')
    .height('100%')
  }
}