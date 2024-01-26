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

import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs'; // 实现应用文件访问能力
import router from '@ohos.router';
import picker from '@ohos.file.picker';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { BusinessError } from '@ohos.base';
import MediaFileUri from '../media/MediaFileUri';
import Logger from '../common/Logger';

const TAG = 'ViewMedia';

interface myParams extends Object {
  uris: string[]
}

@Entry
@Component
struct ViewMedia {
  @State myContext: Context = getContext(this) as common.UIAbilityContext;
  @State myFileSizes: number[] = [];
  @State myFileNames: string[] = [];
  @State myFileTypes: number[] = [];
  @StorageLink('myFileName') myFileName: string = '';
  @StorageLink('myFileSize') myFileSize: number = 0;
  @State myUris: string[] = (router.getParams() as myParams).uris;
  @State uri: string = 'Hello World';
  @StorageLink('showPauses') showPauses: Array<number> = [];
  mediaFileUri: MediaFileUri = new MediaFileUri();
  scroller: Scroller = new Scroller();
  currentUri: string = '';
  controllers: Array<VideoController> = [];

  /**
   * 拉起picker保存图片/视频
   */
  async callFilePickerSaveImageVideo(): Promise<void> {
    try {
      let PhotoSaveOptions = new picker.PhotoSaveOptions();
      PhotoSaveOptions.newFileNames = ['PhotoViewPicker01.jpg', 'PhotoViewPicker01.mp4'];
      let photoPicker = new picker.PhotoViewPicker();
      photoPicker.save(PhotoSaveOptions).then((PhotoSaveResult) => {
        Logger.info(TAG, 'PhotoViewPicker.save successfully, PhotoSaveResult uri: ' + JSON.stringify(PhotoSaveResult));
        if (PhotoSaveResult !== null && PhotoSaveResult !== undefined) {
          PhotoSaveResult.forEach((value: string) => {
            this.uri = value;
            Logger.info(TAG, `save image/video uri: ${this.uri}`);
          })
        }
      }).catch((err: BusinessError) => {
        Logger.error(TAG, 'PhotoViewPicker.save failed with err: ' + JSON.stringify(err));
      });
    } catch (err) {
      Logger.error(TAG, 'PhotoViewPicker failed with err: ' + err);
    }
  }

  onPageShow() {
    this.getImagesInfo();
    this.myFileName = this.myFileNames[0];
    this.myFileSize = this.myFileSizes[0];

    Logger.info(TAG, 'onPageShow getFilenameByUriForMedia this.myFileName ' + this.myFileName);
    Logger.info(TAG, 'onPageShow getFilenameByUriForMedia begin' + this.myFileSize);

    AppStorage.SetOrCreate('myFileName', this.myFileName);
    AppStorage.SetOrCreate('myFileSize', this.myFileSize);
  }

  getMediaNameByUri(myUri: string, index: number) {
    Logger.info(TAG, 'getMediaNameByUri getFilenameByUriForMedia begin');
    // 创建文件获取选项，此处参数为获取image类型的文件资源
    let imagesFetchOp: mediaLibrary.MediaFetchOptions = {
      selections: mediaLibrary.FileKey.MEDIA_TYPE + '= ? OR ' + mediaLibrary.FileKey.MEDIA_TYPE + '= ?',
      selectionArgs: [mediaLibrary.MediaType.IMAGE.toString(), mediaLibrary.MediaType.VIDEO.toString()],
      uri: myUri
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
      Logger.info(TAG, 'getFilenameByUriForMedia count is: ' + count);

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
        Logger.info(TAG, 'fileAsset.displayName ' + '0 : ' + fileAsset.displayName);
        Logger.info(TAG, 'fileAsset.uri 0:' + fileAsset.uri);
        Logger.info(TAG, 'myUri: ' + myUri);

        this.myFileTypes[index] = fileAsset.mediaType
        this.myFileName = fileAsset.displayName;
        this.myFileNames[index] = this.myFileName;


        AppStorage.SetOrCreate('myFileName', this.myFileName);
        AppStorage.SetOrCreate('myFileTypes', this.myFileTypes);

        if (this.myFileTypes[index] === mediaLibrary.MediaType.VIDEO) {
          Logger.info(TAG, 'getMediaNameByUri set showPauses for VIDEO');
          this.showPauses[index] = 1;
        }

        Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo this.myFileName ' + this.myFileName);
        Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo index ' + index);
        Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo this.myFileTypes[index] ' + this.myFileTypes[index]);
        Logger.info(TAG, 'getFilenameByUriForMedia getImagesInfo this.myFileNames[index] ' + this.myFileNames[index]);
        fetchFileResult.close();
      });
    });
  }

  getImagesInfo() {
    for (let index = 0; index < this.myUris.length; index++) {
      Logger.info(TAG, 'getFilenameByUriForMedia  getImagesInfo  index: ' + index);
      this.controllers[index] = new VideoController();
      this.getMediaNameByUri(this.myUris[index], index);
      this.myFileSizes[index] = this.mediaFileUri.myGetFileSize(this.myUris[index], fs.OpenMode.READ_ONLY);
      Logger.info(TAG, 'getFilenameByUriForMedia  getVideosInfo  this.myFileNames[index]: ' + this.myFileNames[index] + ' index ' + index);
      Logger.info(TAG, 'getFilenameByUriForMedia getVideosInfo this.myFileSizes[index]' + this.myFileSizes[index]);
      Logger.info(TAG, 'getFilenameByUriForMedia getVideosInfo this.myFileTypes[index] cc' + this.myFileTypes[index]);
    }
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
            .width(25)
            .height(25)
            .align(Alignment.Start)
            .id('back2Index')
            .onClick(() => {
              router.back();
            })
        }
        .width('12.8%')
        .padding({ left: '7.2%' })

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
          .margin({ top: '0.4%', bottom: '0.3%' })

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
          .margin({ top: '0.3%', bottom: '0.5%' })
          .align(Alignment.Start)
        }
        .width('45%')
        .margin({ left: '5%' })

        // 右边一个图标，另存为
        Row() {
          Image($r('app.media.ic_saveas'))
            .focusable(true)
            .focusOnTouch(true)
            .width(25)
            .height(25)
            .visibility(Visibility.Hidden)
        }
        .height('100%')
        .width('37.2%')
        .padding({ right: '7.2%' })
        .justifyContent(FlexAlign.End)
      }
      .height('7.4%')
      .width('100%')

      Scroll(this.scroller) {
        // 显示媒体文件的容器
        Column() {
          List({ space: 20, initialIndex: 0 }) {
            ForEach(this.myUris, (uri: string, index?: number) => {
              ListItem() {
                Column() {
                  Image(uri)
                    .borderRadius(24)
                    .visibility(index !== undefined && this.myFileTypes[index] === mediaLibrary.MediaType.IMAGE ? Visibility.Visible : Visibility.Hidden)
                    .onClick(() => {
                      if (index !== undefined) {
                        this.myFileSize = this.myFileSizes[index];
                        this.myFileName = this.myFileNames[index];
                      }
                      AppStorage.SetOrCreate('myFileName', this.myFileName);
                      AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                      Logger.info(TAG, 'Image onClick myFileName is ' + this.myFileName);
                      Logger.info(TAG, 'Image onClick myFileName is ' + this.myFileSize);
                    })
                  if (index !== undefined) {
                    Stack({ alignContent: Alignment.Center }) {
                      Video({
                        src: uri,
                        controller: this.controllers[index]
                      })
                        .autoPlay(false)
                        .controls(true)
                        .borderRadius(24)
                        .visibility(this.myFileTypes[index] === mediaLibrary.MediaType.VIDEO ? Visibility.Visible : Visibility.Hidden)

                      Image($r('app.media.ic_PAUSE'))
                        .width(25)
                        .height(25)
                        .onClick(() => {
                          this.controllers[index].start();
                          this.showPauses[index] = 0;
                        })
                        .visibility(this.showPauses[index] === 0 ? Visibility.Hidden : Visibility.Visible)
                    }
                    .onClick(() => {
                      this.myFileSize = this.myFileSizes[index];
                      this.myFileName = this.myFileNames[index];

                      AppStorage.SetOrCreate('myFileName', this.myFileName);
                      AppStorage.SetOrCreate('myFileSize', this.myFileSize);
                    })
                  }
                }
                .height('100%')
              }
              .height('25%')
            }, (item: string) => item)
          }
          .id('picScroller')
          .scrollBar(BarState.Auto)
        }
      }
      .padding({ top: '1.5%', left: '6.7%', right: '6.7%' })
    }
    .backgroundColor('#f1f3f5')
    .height('100%')
  }
}
