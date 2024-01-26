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

export enum FileType {
  FOLDER = 'folder',
  IMAGE = 'image',
  Video = 'video',
  MUSIC = 'music',
  DOCUMENT = 'document'
}

export class FileModel {
  name: string;
  isFolder: boolean;
  fileType: string;
  files: Array<string>;

  constructor(name: string, isFolder: boolean, files: Array<string>) {
    this.name = name;
    this.files = files;
    this.isFolder = isFolder;
    if (isFolder) {
      this.fileType = FileType.FOLDER
    } else {
      if (this.name.endsWith('.mp4')) {
        this.fileType = FileType.Video
      } else if (this.name.endsWith('.mp3')) {
        this.fileType = FileType.MUSIC
      } else if (this.name.endsWith('.jpg') || this.name.endsWith('.png') || this.name.endsWith('.jpeg')) {
        this.fileType = FileType.IMAGE
      } else {
        this.fileType = FileType.DOCUMENT
      }
    }
  }
}