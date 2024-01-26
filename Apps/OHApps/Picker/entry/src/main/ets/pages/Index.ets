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

import picker from '@ohos.file.picker';
import router from '@ohos.router';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import common from '@ohos.app.ability.common';
import { BusinessError } from '@ohos.base';
import Logger from '../common/Logger';
import MediaFileUri from '../media/MediaFileUri';

const MAX_SELECT_NUM = 3; // 选择媒体文件的最大数目
const TAG = 'pickerIndex';

@Entry
@Component
struct Index {
  mediaFileUri: MediaFileUri = new MediaFileUri();
  scroller: Scroller = new Scroller();
  @State uri: string = 'Hello World';
  @State filename: string = '';
  @State sizeFile: number = 0;
  authorizeBundleName: string = 'com.open.file.uri.demo';
  @State log: string = '';
  @State imageFlagCur: number = 0;
  @StorageLink('fileSizeList') fileSizeList: Array<number> = [];
  @StorageLink('fileNameList') fileNameList: Array<string> = [];
  @StorageLink('fileUriList') fileUriList: Array<string> = [];
  @StorageLink('imageNames') imageNames: Array<string> = [];

  /**
   * 拉起picker选择文件
   */
  async callFilePickerSelectFile(): Promise<void> {
    try {
      let DocumentSelectOptions = new picker.DocumentSelectOptions();
      let documentPicker = new picker.DocumentViewPicker();
      documentPicker.select(DocumentSelectOptions).then((DocumentSelectResult) => {
        Logger.info(TAG, 'DocumentViewPicker.select successfully, DocumentSelectResult uri: ' + JSON.stringify(DocumentSelectResult));
        let editFlag = false;
        if (DocumentSelectResult !== null && DocumentSelectResult !== undefined) {
          DocumentSelectResult.forEach((value) => {
            this.uri = value;
            editFlag = true;
            Logger.info(TAG, `select file uri: ${this.uri}`);
          })
        }
        if (editFlag) {
          this.getFilenameByUri(this.uri);
        }
      }).catch((err: BusinessError) => {
        Logger.error(TAG, 'DocumentViewPicker.select failed with err: ' + JSON.stringify(err));
      });
    } catch (err) {
      Logger.error(TAG, 'DocumentViewPicker failed with err: ' + JSON.stringify(err));
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
          this.uri = DocumentSaveResult[0];
          Logger.info(TAG, `save file uri: ${this.uri}`);
        }
        this.getFilenameByUri(this.uri);
      }).catch((err: BusinessError) => {
        Logger.error(TAG, 'DocumentViewPicker.save failed with err: ' + JSON.stringify(err));
      });
    } catch (err) {
      Logger.error(TAG, 'DocumentViewPicker failed with err: ' + err);
    }
  }

  async getFilenameByUriForMedia(myUris: string[]) {
    Logger.info(TAG, ' getFilenameByUriForMedia begin');
    // 创建文件获取选项，此处参数为获取image类型的文件资源
    let imagesFetchOp: mediaLibrary.MediaFetchOptions = {
      selections: mediaLibrary.FileKey.MEDIA_TYPE + '= ? OR ' + mediaLibrary.FileKey.MEDIA_TYPE + '= ?',
      selectionArgs: [mediaLibrary.MediaType.IMAGE.toString(), mediaLibrary.MediaType.VIDEO.toString()],
      uri: myUris[0],
    };
    let media = mediaLibrary.getMediaLibrary(getContext(this));
    // 获取文件资源，使用callback方式返回异步结果
    media.getFileAssets(imagesFetchOp, async (error, fetchFileResult) => {
      // 判断获取的文件资源的检索结果集是否为undefined，若为undefined则接口调用失败

      Logger.info(TAG, 'getFilenameByUriForMedia getMediaLibrary is ok');
      if (fetchFileResult === undefined) {
        Logger.error(TAG, 'get fetchFileResult failed with error: ' + error);
        return;
      }
      // 获取文件检索结果集中的总数
      const count = fetchFileResult.getCount();
      Logger.info(TAG, ' getFilenameByUriForMedia count is: ' + count);
      // 判断结果集中的数量是否小于0，小于0时表示接口调用失败
      if (count < 0) {
        Logger.error(TAG, 'get count from fetchFileResult failed, count: ' + count);
        return;
      }
      // 判断结果集中的数量是否等于0，等于0时表示接口调用成功，但是检索结果集为空，请检查文件获取选项参数配置是否有误和设备中是否存在相应文件
      if (count === 0) {
        Logger.info(TAG, 'The count of fetchFileResult is zero');
        return;
      }
      Logger.info(TAG, 'Get fetchFileResult successfully, count: ' + count);
      // 获取文件检索结果集中的第一个资源，使用callback方式返回异步结果，文件数量较多时请使用getAllObject接口
      fetchFileResult.getFirstObject(async (error, fileAsset) => {
        // 检查获取的第一个资源是否为undefined，若为undefined则接口调用失败

        if (fileAsset === undefined) {
          Logger.error(TAG, 'get first object failed with error: ' + error);
          return;
        }
        Logger.info(TAG, ' fileAsset.uri 0:' + fileAsset.uri);
        Logger.info(TAG, ' myUri: ' + myUris[0]);
        let index = 0;
        this.imageNames[index] = fileAsset.displayName;
        Logger.info(TAG, ' ViewMedia imageFlagCur ' + this.imageFlagCur);
        router.pushUrl({
          url: 'pages/ViewMedia',
          params: {
            uris: myUris
          }
        }, router.RouterMode.Standard);
        fetchFileResult.close();
      });
    });
  }

  async getFilenameByUri(myUri: string): Promise<void> {
    // 获取文件名称
    this.filename = (myUri.split("/").pop()) as string;
    router.pushUrl({
      url: 'pages/EditFile',
      params: {
        fileName: this.filename,
        myUri: myUri
      }
    }, router.RouterMode.Standard);
  }

  /**
   * 拉起picker选择图片/视频
   */
  async callFilePickerSelectImage(): Promise<void> { // async 用于申明一个 function 是异步的
    let array: string[];
    try {
      // 设置photoPicker的参数
      let PhotoSelectOptions = new picker.PhotoSelectOptions();
      PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE; // 过滤选择媒体文件类型
      PhotoSelectOptions.maxSelectNumber = MAX_SELECT_NUM; // 选择媒体文件的最大数目
      let mediaFlag = false;
      let photoPicker = new picker.PhotoViewPicker(); // 使用图库选择器对象前，需要先创建PhotoViewPicker实例
      photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult) => {
        Logger.info(TAG, 'PhotoViewPicker.select successfully, PhotoSelectResult uri: ' + JSON.stringify(PhotoSelectResult)); // 日志中记录成功信息
        if (PhotoSelectResult !== null && PhotoSelectResult !== undefined) { // 接口采用callback异步返回形式，返回PhotoSelectResult对象，故进行下一步操作前要先判断是否已经成功返回PhotoSelectResult对象了

          // PhotoSelectResult为返回的结果集。
          // 其中包含Array<string>类型的photoUris，为返回图库选择后的媒体文件的uri数组；还包含boolean类型的isOriginalPhoto，指示返回图库选择后的媒体文件是否为原图。
          // 声明变量array，其取值为PhotoSelectResult中的数组。
          array = PhotoSelectResult['photoUris'];
          array.forEach((value) => {
            this.uri = value;
            mediaFlag = true;
            Logger.info(TAG, `select image/video uri: ${this.uri}`);
          })
        }
        if (mediaFlag) {
          this.getFilenameByUriForMedia(array);
        }
      })
        .catch((err: BusinessError) => {
          Logger.error(TAG, 'PhotoViewPicker.select failed with err: ' + JSON.stringify(err));
        });
    } catch (err) {
      Logger.error(TAG, 'PhotoViewPicker failed with err: ' + err);
    }
  }

  aboutToDisappear(): void {
    this.fileNameList = [];
    this.fileSizeList = [];
    this.fileUriList = [];
  }

  onPageShow(): void {
    let context = getContext(this) as common.UIAbilityContext;
    this.mediaFileUri.getAllFiles(context);
  }

  build() {
    Scroll(this.scroller) {
      Row() {
        Column() {
          Row() {
            Column() {
              Text($r('app.string.last_open'))
                .fontFamily('HarmonyHeiTi-Bold')
                .fontSize(30)
                .fontWeight(700)
                .textAlign(TextAlign.Start)
                .fontColor('#182431')
                .lineHeight(41)
                .width('70%')
                .height(41)
            }
            .width('50%')
            .margin({ left: '6.7%' })
            .alignItems(HorizontalAlign.Start)

            Row() {
              Image($r('app.media.ic_saveas'))
                .width(25)
                .height(25)
                .margin({ right: '12%' })
                .id('newFile')
                .onClick(() => {
                  this.callFilePickerSaveFile();
                })

              Image($r('app.media.ic_picture'))
                .width(25)
                .height(25)
                .id('picture')
                .margin({ right: '12%' })
                .onClick(() => {
                  this.callFilePickerSelectImage();
                })

              Image($r('app.media.ic_folder'))
                .width(25)
                .height(25)
                .id('folder')
                .opacity(1)
                .margin({ right: '6%' })
                .onClick(() => {
                  this.callFilePickerSelectFile();
                })
            }
            .justifyContent(FlexAlign.End)
            .padding({ right: '8%' })
            .width('50%')
          }
          // 第一行结束
          .width('100%')
          .height(41)
          .margin({ top: 7, left: 24, right: 25, bottom: 8 })

          Row() {
            Text($r('app.string.view_last_open'))
              .fontSize(16)
              .textAlign(TextAlign.Start)
              .lineHeight(22)

            Blank()

            Image($r('app.media.right_arrow'))
              .height('19vp')
              .width('10vp')
              .margin({ left: 9, right: 9, top: 6, bottom: 6 })
          }
          .backgroundColor(0xFFFFFF)
          .width('100%')
          .height('52vp')
          .padding({ top: 4, left: 12, right: 12 })
          .onClick(() => {
            this.callFilePickerSelectFile();
          })
          Column() {
            List({ space: 12, initialIndex: 0 }) {
              ForEach(this.fileNameList, (item: string, index?: number) => {
                ListItem() {
                  Row() {
                    Image($r('app.media.ic_docs'))
                      .width('3.3%')
                      .height(22)
                      .margin({ left: 15, right: 19 })

                    Text(item)
                      .fontSize(16)
                      .fontFamily('HarmonyHeiTi-Medium')
                      .fontColor('#182431')
                      .lineHeight(22)
                      .fontWeight(500)
                      .textAlign(TextAlign.Start)
                      .margin({ left: 0, right: 16 })
                      .width('64.5%')
                    if (index !== undefined) {
                      Text('Size: ' + JSON.stringify(this.fileSizeList[index]) + 'B')
                        .fontSize(14)
                        .fontFamily('HarmonyHeiTi-Medium')
                        .lineHeight(19)
                        .fontColor('#182431')
                        .textAlign(TextAlign.End)
                        .opacity(0.6)
                        .width('20.8%')
                        .margin({ left: 0, right: 12 })
                    }
                  }
                  .id('fileItem' + (index !== undefined ? index : ""))
                  .borderRadius(24)
                  .width('100%')
                  .height(64)
                  .padding({ right: 12 })
                  .backgroundColor('#FFFFFF')
                }
                .onClick(() => {
                  Logger.info(TAG, 'fileAsset.displayName fileName item: ' + item);
                  if (index !== undefined) {
                    router.pushUrl({
                      url: 'pages/EditFile',
                      params: {
                        fileName: item,
                        myUri: this.fileUriList[index]
                      }
                    }, router.RouterMode.Standard);
                  }
                })
              }, (item: string) => item)
            }
            .listDirection(Axis.Vertical) // 排列方向
            .id('indexList')
            .edgeEffect(EdgeEffect.Spring) // 滑动到边缘无效果
            .scrollBar(BarState.Auto)
            .alignListItem(ListItemAlign.Center)
            .margin({ top: '1%', left: 12, right: 12 })
          }
          .height('100%')
          .width('100%')
        }
        .alignItems(HorizontalAlign.Center)
        .width('100%')
        .height('100%')
        .backgroundColor('#f1f3f5')
      }
      .height('100%')
    }
  }
}