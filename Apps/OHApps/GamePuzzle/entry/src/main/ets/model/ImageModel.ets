/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import image from '@ohos.multimedia.image';
import Logger from './Logger';
import PictureItem from './PictureItem';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import dataSharePredicates from '@ohos.data.dataSharePredicates';
import { Context } from '@ohos.abilityAccessCtrl';
import fs from '@ohos.file.fs';

const TAG = '[ImageModel]'
const SPLIT_COUNT: number = 3 // 图片横竖切割的份数
export default class ImageModel {
  private phAccessHelper: photoAccessHelper.PhotoAccessHelper | null = null;

  constructor(context: Context) {
    this.phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
  }

  async getAllImg() {
    Logger.info('getAllImg');
    let photoList: Array<photoAccessHelper.PhotoAsset> = [];
    if (this.phAccessHelper === null) {
      Logger.info('phAccessHelper fail');
      return photoList;
    }
    let fileKeyType = photoAccessHelper.PhotoKeys.PHOTO_TYPE;
    let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
    Logger.info(fileKeyType);
    let fetchOptions: photoAccessHelper.FetchOptions = {
      fetchColumns: [],
      predicates: predicates
    };

    try {
      let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> = await this.phAccessHelper.getAssets(fetchOptions);
      if (fetchResult != undefined) {
        Logger.info('fetchResult success');
        let photoAsset: Array<photoAccessHelper.PhotoAsset> = await fetchResult.getAllObjects();
        if (photoAsset != undefined && photoAsset.length > 0) {
          for (let i = 0; i < photoAsset.length; i++) {
            if(photoAsset[i].photoType === 1){
              photoList.push(photoAsset[i]);
            }
          }
        }
      }
    } catch (err) {
      Logger.error('getAssets failed, message = ', err);
    }
    Logger.info('photoList success');
    return photoList;

  }

  async splitPic(index: number) {
    let imagePixelMap: PictureItem[] = [];
    let imgDatas: Array<photoAccessHelper.PhotoAsset> = await this.getAllImg();
    let imagePackerApi = image.createImagePacker();
    fs.open(imgDatas[index].uri, fs.OpenMode.READ_ONLY).then(async (file: fs.File) => {
      let fd: number = file.fd;
      let imageSource = image.createImageSource(fd);
      let imageInfo = await imageSource.getImageInfo();
      Logger.info(TAG, `sizeImg createImageSource ${JSON.stringify(imageSource)}`);
      let height = imageInfo.size.height / SPLIT_COUNT;
      for (let i = 0; i < SPLIT_COUNT; i++) {
        for (let j = 0; j < SPLIT_COUNT; j++) {
          let picItem: PictureItem;
          if (i === SPLIT_COUNT - 1 && j === SPLIT_COUNT - 1) {
            picItem = new PictureItem(9, {} as image.PixelMap);
            imagePixelMap.push(picItem);
          } else {
            Logger.info(TAG, `sizeImg x = ${imageInfo.size.width / SPLIT_COUNT} y = ${height}`);
            let decodingOptions: image.DecodingOptions = {
              desiredRegion: {
                size: {
                  height: height,
                  width: imageInfo.size.width / SPLIT_COUNT
                }, x: j * imageInfo.size.width / SPLIT_COUNT, y: i * height
              }
            }
            imagePixelMap.push(new PictureItem(i * SPLIT_COUNT + j, await imageSource.createPixelMap(decodingOptions)));
          }
        }
      }
      imagePackerApi.release();
      await imgDatas[index].close(fd);
    })
    return imagePixelMap
  }
}