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
import image from '@ohos.multimedia.image'
import mediaLibrary from '@ohos.multimedia.mediaLibrary'
import Logger from './Logger'
import PictureItem from '../model/PictureItem'

const TAG = '[ImageModel]'
const SPLIT_COUNT: number = 3 // 图片横竖切割的份数
export default class ImageModel {
  private media: mediaLibrary.MediaLibrary = undefined

  constructor(context: any) {
    this.media = mediaLibrary.getMediaLibrary(context)
  }

  async getAllImg() {
    let fileKeyObj = mediaLibrary.FileKey
    let fetchOp = {
      selections: fileKeyObj.MEDIA_TYPE + '=?',
      selectionArgs: [`${mediaLibrary.MediaType.IMAGE}`],
    }
    let mediaList: Array<mediaLibrary.FileAsset> = []
    const fetchFileResult = await this.media.getFileAssets(fetchOp)
    Logger.info(TAG, `queryFile getFileAssetsFromType fetchFileResult.count = ${fetchFileResult.getCount()}`)
    if (fetchFileResult.getCount() > 0) {
      mediaList = await fetchFileResult.getAllObject()
    }
    return mediaList
  }

  async splitPic(index: number) {
    let imagePixelMap: PictureItem[] = []
    let imgDatas: Array<mediaLibrary.FileAsset> = await this.getAllImg()
    let imagePackerApi = image.createImagePacker()
    let fd = await imgDatas[index].open('r')
    let imageSource = image.createImageSource(fd)
    let imageInfo = await imageSource.getImageInfo()
    Logger.info(TAG, `sizeImg createImageSource ${JSON.stringify(imageSource)}`)
    let height = imageInfo.size.height / SPLIT_COUNT
    for (let i = 0; i < SPLIT_COUNT; i++) {
      for (let j = 0; j < SPLIT_COUNT; j++) {
        let picItem
        if (i === SPLIT_COUNT - 1 && j === SPLIT_COUNT - 1) {
          picItem = new PictureItem(9, undefined)
          imagePixelMap.push(picItem)
        } else {
          Logger.info(TAG, `sizeImg x = ${imageInfo.size.width / SPLIT_COUNT} y = ${height}`)
          let decodingOptions: image.DecodingOptions = {
            desiredRegion: {
              size: {
                height: height, width: imageInfo.size.width / SPLIT_COUNT
              }, x: j * imageInfo.size.width / SPLIT_COUNT, y: i * height
            }
          }
          picItem = await imageSource.createPixelMap(decodingOptions)
          imagePixelMap.push({
            index: i * SPLIT_COUNT + j, pixelMap: picItem
          })
        }
      }
    }
    imagePackerApi.release()
    await imgDatas[index].close(fd)
    return imagePixelMap
  }
}