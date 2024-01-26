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
import DateTimeUtil from '../../model/DateTimeUtil'
import Logger from '../../model/Logger'

const TAG = 'MediaUtils'

export default class MediaUtils {
  private mediaTest: mediaLibrary.MediaLibrary = mediaLibrary.getMediaLibrary(globalThis.context)
  private static instance: MediaUtils = new MediaUtils()

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new MediaUtils()
    }
    return this.instance
  }

  async createAndGetUri(mediaType: number) {
    let info = this.getInfoFromType(mediaType)
    let dateTimeUtil = new DateTimeUtil()
    let name = `${dateTimeUtil.getDate()}_${dateTimeUtil.getTime()}`
    let displayName = `${info.prefix}${name}${info.suffix}`
    Logger.info(TAG, `displayName = ${displayName},mediaType = ${mediaType}`)
    let publicPath = await this.mediaTest.getPublicDirectory(info.directory)
    Logger.info(TAG, `publicPath = ${publicPath}`)
    try {
      return await this.mediaTest.createAsset(mediaType, displayName, publicPath)
    } catch (err) {
      Logger.info(TAG, `createAsset err ` + JSON.stringify(err))
    }
  }

  async queryFile(dataUri: any) {
    let fileKeyObj = mediaLibrary.FileKey
    if (dataUri !== undefined) {
      let args = dataUri.id.toString()
      let fetchOp = {
        selections: `${fileKeyObj.ID}=?`,
        selectionArgs: [args],
      }
      const fetchFileResult = await this.mediaTest.getFileAssets(fetchOp)
      Logger.info(TAG, `fetchFileResult.getCount() = ${fetchFileResult.getCount()}`)
      const fileAsset = await fetchFileResult.getFirstObject()
      return fileAsset
    }
  }

  async getFdPath(fileAsset: any) {
    let fd = await fileAsset.open('Rw')
    Logger.info(TAG, `fd = ${fd}`)
    return fd
  }

  async getFileAssetsAlbum(path) {
    let fileKeyObj = mediaLibrary.FileKey
    // ALBUM_NAME
    let fetchOp = {
      selections: `${fileKeyObj.RELATIVE_PATH}=?`,
      selectionArgs: [`${path}`],
    }
    const fetchFileResult = await this.mediaTest.getFileAssets(fetchOp)
    Logger.info(TAG, `getFileAssetsAlbum,fetchFileResult.count = ${fetchFileResult.getCount()}`)
    let fileAssets: Array<mediaLibrary.FileAsset> = []
    if (fetchFileResult.getCount() > 0) {
      fileAssets = await fetchFileResult.getAllObject()
    }
    return fileAssets
  }

  async getFileAssetsFromType(mediaType: number) {
    Logger.info(TAG, `getFileAssetsFromType,mediaType = ${mediaType}`)
    let fileKeyObj = mediaLibrary.FileKey
    // ALBUM_NAME
    let fetchOp = {
      selections: `${fileKeyObj.MEDIA_TYPE}=?`,
      selectionArgs: [`${mediaType}`],
    }
    const fetchFileResult = await this.mediaTest.getFileAssets(fetchOp)
    Logger.info(TAG, `getFileAssetsFromType,fetchFileResult.count = ${fetchFileResult.getCount()}`)
    let fileAssets = []
    if (fetchFileResult.getCount() > 0) {
      fileAssets = await fetchFileResult.getAllObject()
    }
    return fileAssets
  }

  async getAlbums() {
    Logger.info(TAG, 'getAlbums begin')
    let albums = []
    const [ files, images, videos, audios ] = await Promise.all([
    this.getFileAssetsFromType(mediaLibrary.MediaType.FILE),
    this.getFileAssetsFromType(mediaLibrary.MediaType.IMAGE),
    this.getFileAssetsFromType(mediaLibrary.MediaType.VIDEO),
    this.getFileAssetsFromType(mediaLibrary.MediaType.AUDIO)
    ])
    albums.push({
      albumName: 'Documents', count: files.length, mediaType: mediaLibrary.MediaType.FILE
    })
    albums.push({
      albumName: 'Pictures', count: images.length, mediaType: mediaLibrary.MediaType.IMAGE
    })
    albums.push({
      albumName: 'Videos', count: videos.length, mediaType: mediaLibrary.MediaType.VIDEO
    })
    albums.push({
      albumName: 'Audios', count: audios.length, mediaType: mediaLibrary.MediaType.AUDIO
    })
    return albums
  }

  deleteFile(media: any) {
    let uri = media.uri
    Logger.info(TAG, `deleteFile,uri = ${uri}`)
    // @ts-ignore
    return this.mediaTest.deleteAsset(uri)
  }

  onDateChange(callback: () => void) {
    this.mediaTest.on('albumChange', () => {
      Logger.info(TAG, 'albumChange called')
      callback()
    })
    this.mediaTest.on('imageChange', () => {
      Logger.info(TAG, 'imageChange called')
      callback()
    })
    this.mediaTest.on('audioChange', () => {
      Logger.info(TAG, 'audioChange called')
      callback()
    })
    this.mediaTest.on('videoChange', () => {
      Logger.info(TAG, 'videoChange called')
      callback()
    })
    this.mediaTest.on('fileChange', () => {
      Logger.info(TAG, 'fileChange called')
      callback()
    })
  }

  offDateChange() {
    this.mediaTest.off('albumChange')
    this.mediaTest.off('imageChange')
    this.mediaTest.off('audioChange')
    this.mediaTest.off('videoChange')
    this.mediaTest.off('fileChange')
  }

  getInfoFromType(mediaType: number) {
    let result = {
      prefix: '', suffix: '', directory: 0
    }
    switch (mediaType) {
      case mediaLibrary.MediaType.FILE:
        result.prefix = 'FILE_'
        result.suffix = '.txt'
        result.directory = mediaLibrary.DirectoryType.DIR_DOCUMENTS
        break
      case mediaLibrary.MediaType.IMAGE:
        result.prefix = 'IMG_'
        result.suffix = '.jpg'
        result.directory = mediaLibrary.DirectoryType.DIR_IMAGE
        break
      case mediaLibrary.MediaType.VIDEO:
        result.prefix = 'VID_'
        result.suffix = '.mp4'
        result.directory = mediaLibrary.DirectoryType.DIR_CAMERA
        break
      case mediaLibrary.MediaType.AUDIO:
        result.prefix = 'AUD_'
        result.suffix = '.wav'
        result.directory = mediaLibrary.DirectoryType.DIR_AUDIO
        break
    }
    return result
  }
}