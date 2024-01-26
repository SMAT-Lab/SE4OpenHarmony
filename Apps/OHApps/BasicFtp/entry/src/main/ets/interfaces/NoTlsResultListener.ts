/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import { FileInfo, FTPResponse } from '@ohos/basic-ftp'

export interface LoginListener {
  onLoginErr(err: Error)

  onLoginStart(info: string)

  onLoginSuccess(result: string)
}

export interface FileListListener {
  getListErr(err: Error)

  getListStart(info: string)

  getListSuccess(result: FileInfo[])
}

export interface FileSizeListener {
  getSizeErr(err: Error)

  getSizeStart(info: string)

  getSizeSuccess(size: number)
}

export interface UploadSingleListener {
  uploadErr(err: Error)

  uploadStart(info: string)

  uploadSuccess(msg: FTPResponse)

  uploadProgress(currentSize: number, totalSize: number)
}
export interface AppendListener {
  appendErr(err: Error)

  appendStart(info: string)

  appendSuccess(msg: FTPResponse)

  appendProgress(currentSize: number, totalSize: number)
}

export interface DownloadSingleListener {
  downloadErr(err: Error)

  downloadStart(info: string)

  downloadSuccess(msg: FTPResponse)

  downloadProgress(currentSize: number, totalSize: number)
}

export interface FeaturesListener {
  featuresErr(err: Error)

  featuresStart(info: string)

  featuresSuccess(msg: Map<string, string>)

}

export interface SetWorkingDirectoryListener {
  setWorkingDirectoryErr(err: Error)

  setWorkingDirectoryStart(info: string)

  setWorkingDirectorySuccess(msg: FTPResponse)

}

export interface CdToParentDirectoryListener {
  cdToParentDirectoryErr(err: Error)

  cdToParentDirectoryStart(info: string)

  cdToParentDirectorySuccess(msg: FTPResponse)

}

export interface DeleteFileListener {
  deleteFileErr(err: Error)

  deleteFileStart(info: string)

  deleteFileSuccess(msg: FTPResponse)

}

export interface LastModifyListener {
  lastModifyErr(err: Error)

  lastModifyStart(info: string)

  lastModifySuccess(msg: Date)

}

export interface CurrentDirectoryListener {
  currentDirectoryErr(err: Error)

  currentDirectoryStart(info: string)

  currentDirectorySuccess(msg: string)

}

export interface EnsureRemotePathListener {
  ensureRemotePathErr(err: Error)

  ensureRemotePathStart(info: string)

  ensureRemotePathSuccess(msg: string)

}

export interface DeleteEmptyDirectoryListener {
  deleteEmptyDirectoryErr(err: Error)

  deleteEmptyDirectoryStart(info: string)

  deleteEmptyDirectorySuccess(msg: FTPResponse)

}

export interface DeleteAllListener {
  deleteAllErr(err: Error)

  deleteAllStart(info: string)

  deleteAllSuccess(msg: string)

}

export interface DeleteAllButSelfListener {
  deleteAllButSelfErr(err: Error)

  deleteAllButSelfStart(info: string)

  deleteAllButSelfSuccess(msg: string)

}

export interface RenameFileListener {
  renameFileErr(err: Error)

  renameFileStart(info: string)

  renameFileSuccess(msg: FTPResponse)

}

export interface UploadDirListener {
  uploadDirErr(err: Error)

  uploadDirStart(info: string)

  uploadDirSuccess(msg: string)

  uploadDirProgress(currentSize: number, totalSize: number)
}

export interface DownloadDirListener {
  downloadDirErr(err: Error)

  downloadDirStart(info: string)

  downloadDirSuccess(msg: string)

  downloadDirProgress(currentSize: number, totalSize: number)

}