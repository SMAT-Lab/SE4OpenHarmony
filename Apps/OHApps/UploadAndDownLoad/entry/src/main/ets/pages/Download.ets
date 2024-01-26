/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { CustomDataSource } from '../components/CustomDataSource';
import {
  FileModel,
  FileType,
  fileUtils,
  logger,
  requestFiles,
  requestDownload,
  TOAST_BOTTOM
} from '@ohos/uploaddownload';
import { SelectFolderDialog } from '../components/SelectFolderDialog';

const TAG: string = 'Download';

@Entry
@Component
struct Download {
  private fileData: CustomDataSource = new CustomDataSource([]);
  @StorageLink('isBackground') isBackground: boolean = false;
  @Provide downloadFolder: Array<string> = [];
  @State isGetData: boolean = false;
  @State checkFile: Array<string> = [];
  @State checkList: Array<boolean> = [];
  @State isRunning: boolean = false;
  @State isPause: boolean = false;
  @State progress: number = 0;
  private selectFolder = (folder: string) => {
    logger.info(TAG, `selectFolder = ${folder}`);
    this.download(folder);
  }
  private folderDialogController: CustomDialogController = new CustomDialogController({
    builder: SelectFolderDialog({ selectFolder: this.selectFolder }),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -12 }
  });

  build() {
    Navigation() {
      Column() {
        if (this.isGetData) {
          LoadingProgress()
            .width(100)
            .layoutWeight(1)
        } else {
          List({ space: 12 }) {
            LazyForEach(this.fileData, (item: FileModel, index?: number) => {
              ListItem() {
                  this.FileItem(item, index)
              }
            }, (item: FileModel) => JSON.stringify(item))
          }
          .width('100%')
          .scrollBar(BarState.Off)
          .layoutWeight(1)
          .backgroundColor(Color.White)
          .borderRadius(24)
          .padding({ top: 4, bottom: 4 })
          .divider({ strokeWidth: 1, startMargin: 44, endMargin: 12 })
        }

        this.BottomView()
      }
      .padding({ left: 12, right: 12, bottom: 12 })
      .height('100%')
    }
    .width('100%')
    .height('100%')
    .hideBackButton(false)
    .titleMode(NavigationTitleMode.Mini)
    .mode(NavigationMode.Stack)
    .backgroundColor($r('app.color.light_gray'))
    .hideToolBar(false)
    .title($r('app.string.download'))
  }

  @Builder
  FileItem(file: FileModel, index: number) {
    Row() {
      Row() {
        if (file.fileType === FileType.FOLDER) {
          Image($r('app.media.ic_files_folder'))
            .size({ width: 24, height: 24 })
            .objectFit(ImageFit.Contain)
        } else if (file.fileType === FileType.IMAGE) {
          Image($r('app.media.ic_public_picture'))
            .size({ width: 24, height: 24 })
            .objectFit(ImageFit.Contain)
        } else if (file.fileType === FileType.MUSIC) {
          Image($r('app.media.ic_public_music'))
            .size({ width: 24, height: 24 })
            .objectFit(ImageFit.Contain)
        } else if (file.fileType === FileType.Video) {
          Image($r('app.media.ic_public_video'))
            .size({ width: 24, height: 24 })
            .objectFit(ImageFit.Contain)
        } else {
          Image($r('app.media.ic_public_document'))
            .size({ width: 24, height: 24 })
            .objectFit(ImageFit.Contain)
        }

        Text(decodeURIComponent(file.name))
          .fontSize(16)
          .fontWeight(400)
          .layoutWeight(1)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .margin({ left: 12 })
      }
      .layoutWeight(1)

      Checkbox({ name: '', group: 'checkboxGroup' })
        .select(this.checkList[index])
        .selectedColor($r('app.color.button_blue'))
        .margin({ left: 12 })
        .hitTestBehavior(HitTestMode.None)
    }
    .width('100%')
    .padding({ left: 12, right: 12 })
    .height(48)
    .onClick(() => {
      this.fileCheck(index);
    })
  }

  @Builder
  BottomView() {
    Column({ space: 12 }) {
      Button() {
        Row() {
          if (!this.isBackground && this.isRunning) {
            Text(`${this.progress}%`)
              .fontColor(Color.White)
              .fontSize(16)
            Text($r('app.string.downloading'))
              .fontColor(Color.White)
              .fontSize(16)
              .margin({ left: 12 })
          } else {
            Text($r('app.string.download'))
              .fontColor(Color.White)
              .fontSize(16)
          }
        }
      }
      .id('download_to')
      .type(ButtonType.Capsule)
      .height(45)
      .width('100%')
      .backgroundColor($r('app.color.button_blue'))
      .onClick(() => {
        if (!this.isRunning) {
          this.folderDialogController.open();
        }
      })

      Button($r('app.string.view_download_files'))
        .id('view_download_files')
        .type(ButtonType.Capsule)
        .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
        .width('100%')
        .fontSize(16)
        .margin({ bottom: 12 })
        .fontColor($r('app.color.btn_text_blue'))
        .onClick(() => {
          router.pushUrl({
            url: 'pages/DownloadFiles'
          });
        })
    }
    .margin({ top: 12, left: 12, right: 12 })
  }

  aboutToAppear() {
    this.isRunning = false;
    this.isPause = false;
    this.isGetData = true;
    requestFiles.requestFiles().then((data: FileModel[]) => {
      this.checkList = [];
      this.isRunning = false;
      this.fileData.dataArray = data;
      this.fileData.dataArray.forEach((item: FileModel) => {
        this.checkList.push(false);
      })
      this.isGetData = false;
      this.fileData.notifyDataReload();
    })
    fileUtils.listFolders().then((folders: Array<string>) => {
      this.downloadFolder = folders;
    })
  }

  fileCheck(index: number) {
    if (!this.isBackground) {
      for (let i = 0; i < this.checkList.length; i++) {
        if (i !== index) {
          this.checkList[i] = false;
        }
      }
    }
    this.checkList[index] = !this.checkList[index];
    logger.info(TAG, `this.checkList = ${JSON.stringify(this.checkList)}`);
  }

  download(folder: string) {
    this.checkFile = [];
    if (this.checkList === undefined) {
      return;
    }
    logger.info(TAG, `this.checkList = ${JSON.stringify(this.checkList)}`);
    for (let i = 0; i < this.checkList.length; i++) {
      if (this.checkList[i]) {
        let fileModel = this.fileData.getData(i);
        logger.info(TAG, `fileModel = ${JSON.stringify(fileModel)}`);
        fileModel.files.forEach((url: string) => {
          let splitUrl = url.split('//')[1].split('/');
          if (splitUrl[splitUrl.length-1] !== '') {
            this.checkFile.push(url);
          }
        });
      }
    }
    logger.info(TAG, `this.checkFile = ${JSON.stringify(this.checkFile)}`);
    if (this.checkFile.length === 0) {
      promptAction.showToast({ message: $r('app.string.check_file_tips'), bottom: TOAST_BOTTOM });
      return;
    }
    this.progress = 0;
    if (this.isBackground) {
      this.isRunning = false;
      requestDownload.downloadFilesBackground(folder, this.checkFile);
      this.checkFile = [];
      this.checkList = [];
      this.fileData.dataArray.forEach((item: FileModel) => {
        this.checkList.push(false);
      })
      this.fileData.notifyDataReload();
      promptAction.showToast({ message: $r('app.string.background_task_start'), bottom: TOAST_BOTTOM });
    } else {
      this.isRunning = true;
      requestDownload.downloadFile(folder, this.checkFile[0], this.downloadFileCallback);
    }
  }

  downloadFilesCallback = (downloadCount: number, isSuccess: boolean) => {
    this.progress = downloadCount;
    if (downloadCount === this.checkFile.length) {
      this.downloadFinish(isSuccess);
    }
  }
  downloadFileCallback = (progress: number, isSuccess: boolean) => {
    this.progress = progress;
    if (this.progress === 100) {
      this.downloadFinish(isSuccess);
    }
  }

  downloadFinish(isSuccess: boolean) {
    this.isRunning = false;
    this.checkFile = [];
    this.checkList = [];
    this.fileData.dataArray.forEach((item: FileModel) => {
      this.checkList.push(false);
    })
    this.fileData.notifyDataReload();
    let message = isSuccess ? $r('app.string.download_finish') : $r('app.string.download_fail');
    promptAction.showToast({ message: message, bottom: TOAST_BOTTOM });
  }
}