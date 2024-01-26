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

import mediaLibrary from '@ohos.multimedia.mediaLibrary'

import Logger from '../../model/Logger'

export default class ThumbnailGetter {
  private TAG = '[ThumbnailGetter]:'

  public async getThumbnailInfo(width: number, height: number, uri?: string): Promise<PixelMap | undefined> {
    Logger.info(`${this.TAG} getThumbnailInfo E`)
    Logger.debug(`${this.TAG} getThumbnailInfo width: ${width}, height: ${height}, uri: ${JSON.stringify(uri)}`)
    const fileKeyObj = mediaLibrary.FileKey;
    let fetchOp: any
    const media = mediaLibrary.getMediaLibrary(globalThis.context);
    let publicPath: string = await media.getPublicDirectory(mediaLibrary.DirectoryType.DIR_CAMERA)
    Logger.info(`${this.TAG} getThumbnailInfo media: ${media}`)
    fetchOp = {
      selections: `${fileKeyObj.RELATIVE_PATH}=?`,
      selectionArgs: [publicPath],
      order: `${fileKeyObj.DATE_ADDED} DESC LIMIT 0, 1`
    }

    Logger.info(`${this.TAG} getThumbnailInfo fetchOp: ${JSON.stringify(fetchOp)}`)
    const fetchFileResult = await media.getFileAssets(fetchOp);
    const count = fetchFileResult.getCount()
    Logger.info(`${this.TAG} getThumbnailInfo fetchFileResult.getCount: ${count}`)
    if (count == 0) {
      return undefined
    }
    const lastFileAsset = await fetchFileResult.getLastObject()
    await fetchFileResult.close()
    if (lastFileAsset == null) {
      Logger.error(`${this.TAG} getThumbnailInfo lastFileAsset is null`)
      return undefined
    }
    const thumbnailPixelMap = lastFileAsset.getThumbnail({
      width: width, height: height
    })
    Logger.info(`${this.TAG} getThumbnailInfo thumbnailPixelMap: ${JSON.stringify(thumbnailPixelMap)} X`)
    return thumbnailPixelMap
  }
}
