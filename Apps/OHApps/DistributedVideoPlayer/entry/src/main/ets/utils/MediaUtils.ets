/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

import image from '@ohos.multimedia.image';
import fileio from '@ohos.fileio';
import promptAction from '@ohos.promptAction';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import Logger from '../model/Logger';
import DateTimeUtil from './DateTimeUtil';

const TAG: string = 'MediaUtils';

export default class MediaUtils {
  private mediaList: Array<mediaLibrary.FileAsset> = []
  private mediaLib: mediaLibrary.MediaLibrary = undefined

  constructor() {
    this.mediaLib = mediaLibrary.getMediaLibrary(globalThis.context)
  }

  async createAndGetFile() {
    let mediaTest = mediaLibrary.getMediaLibrary(globalThis.context)
    let info = {
      prefix: 'IMG_', suffix: '.jpg', directory: mediaLibrary.DirectoryType.DIR_IMAGE
    }
    let dateTimeUtil = new DateTimeUtil()
    let name = `${dateTimeUtil.getDate()}_${dateTimeUtil.getTime()}`
    let displayName = `${info.prefix}${name}${info.suffix}`
    let publicPath = await mediaTest.getPublicDirectory(info.directory)
    Logger.info(TAG, `publicPath = ${publicPath}`)
    return await mediaTest.createAsset(mediaLibrary.MediaType.IMAGE, displayName, publicPath)
  }

  async savePicture(data) {
    Logger.info(TAG, `savePicture`)
    let packOpts: image.PackingOption = {
      format: "image/jpeg", quality: 100
    }
    let imagePackerApi = image.createImagePacker()
    let arrayBuffer = await imagePackerApi.packing(data, packOpts)
    let fileAsset = await this.createAndGetFile()
    let fd = await fileAsset.open('Rw')
    imagePackerApi.release()
    try {
      await fileio.write(fd, arrayBuffer)
    } catch (err) {
      Logger.error(`write failed, code is ${err.code}, message is ${err.message}`)
    }
    await fileAsset.close(fd)
    Logger.info(TAG, `write done`)
    promptAction.showToast({
      message: '图片保存成功', duration: 1000
    })
  }

  async getFileAssetsFromType(mediaType: number) {
    Logger.info(TAG, `getFileAssetsFromType,mediaType = ${mediaType}`)
    let fileKeyObj = mediaLibrary.FileKey
    let fetchOp = {
      selections: `${fileKeyObj.MEDIA_TYPE}=?`,
      selectionArgs: [`${mediaType}`],
    }
    let fetchFileResult = await this.mediaLib.getFileAssets(fetchOp)
    Logger.info(TAG, `getFileAssetsFromType,fetchFileResult.count = ${fetchFileResult.getCount()}`)
    if (fetchFileResult.getCount() > 0) {
      this.mediaList = await fetchFileResult.getAllObject()
      Logger.info(TAG, `getFileAssetsFromType,fetchFileResult.count = ${JSON.stringify(this.mediaList)}`)
    }
    return this.mediaList
  }
}