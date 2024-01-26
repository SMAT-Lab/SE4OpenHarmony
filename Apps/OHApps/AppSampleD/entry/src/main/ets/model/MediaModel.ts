/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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

import type common from '@ohos.app.ability.common'
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import fs from '@ohos.file.fs'
import DateTimeUtil from '../utils/DateTimeUtil';
import Logger from '../utils/Logger';

const TAG = '[MediaModel]';

export default class MediaModel {
  private mediaLibraryTest: mediaLibrary.MediaLibrary = undefined;
  private static mediaInstance: MediaModel = undefined;

  constructor() {
    this.mediaLibraryTest = mediaLibrary.getMediaLibrary(globalThis.abilityContext);
  }

  public static getMediaInstance(context: common.Context): MediaModel {
    if (this.mediaInstance === undefined) {
      this.mediaInstance = new MediaModel();
    }
    return this.mediaInstance;
  }

  async createAndGetUri(mediaType: mediaLibrary.MediaType): Promise<mediaLibrary.FileAsset> {
    let result = {
      prefix: 'VID_', suffix: '.mp4', directory: mediaLibrary.DirectoryType.DIR_VIDEO
    }
    let info = result;
    Logger.info(TAG, `createAndGetUri info = ${info}`);
    let dateTimeUtil = new DateTimeUtil();
    let name = `${dateTimeUtil.getDate()}_${dateTimeUtil.getTime()}`;
    let displayName = `${info.prefix}${name}${info.suffix}`;
    Logger.info(TAG, `createAndGetUri displayName = ${displayName},mediaType = ${mediaType}`);
    let publicPath = await this.mediaLibraryTest.getPublicDirectory(info.directory);
    Logger.info(TAG, `createAndGetUri publicPath = ${publicPath}/${displayName}`);
    let fileAsset = null;
    try {
      fileAsset = await this.mediaLibraryTest.createAsset(mediaType, displayName, publicPath);
    } catch (err) {
      Logger.info(TAG, `createAndGetUri err = ${err}`);
    }
    Logger.info(TAG, `createAndGetUri fileAsset = ${fileAsset}`);
    return fileAsset;
  }

  async getFdPath(fileAsset: mediaLibrary.FileAsset): Promise<number> {
    let fd = await fileAsset.open('Rw');
    Logger.info(TAG, `fd = ${fd}`);
    return fd;
  }

  /**
   * 复制视频至沙箱
   * @param fd
   * @returns
   */
  async copyVideo(fd: number): Promise<string> {
    // 将录制视频存入沙箱路径
    let mContext: common.Context = globalThis.abilityContext;
    Logger.info(TAG, `this.fd = ${JSON.stringify(fd)}`);
    // upload只可访问的沙箱路径：/data/app/el2/100/base/com.samples.appsampled/haps/entry/cache/
    Logger.info(TAG, `mContext.cacheDir = ${JSON.stringify(mContext.cacheDir)}`);
    let fileName = new Date().getTime().toString();
    let imagePath = `${mContext.cacheDir}/${fileName}.mp4`;
    Logger.info(TAG, `this.imagePath = ${JSON.stringify(imagePath)}`);
    try {
      fs.copyFileSync(fd, imagePath);
      return `${fileName}.mp4`;
    } catch (err) {
      Logger.info(TAG, `this.err = ${err}`);
    }
    return null;
  }
}
