/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import Box from './Box'
import Mp4Directory from '../Mp4Directory'
import Mp4UuidBoxDirectory from '../media/Mp4UuidBoxDirectory'
import Mp4BoxTypes from '../Mp4BoxTypes'
import SequentialReader from '../../../lang/SequentialReader';
import deviceInfo from '@ohos.deviceInfo';

export default class UuidBox extends Box {
  private userData: Int8Array;
  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box);

    if (this.classtype == Mp4BoxTypes.BOX_USER_DEFINED) {
      this.usertype = this.getUuid(reader.getBytes(16));
    }

    this.userData = reader.getBytes(reader.available());
  }

  public addMetadata(directory: Mp4Directory): void
  {
    directory.setString(Mp4UuidBoxDirectory.TAG_UUID, this.usertype);
    directory.setByteArray(Mp4UuidBoxDirectory.TAG_USER_DATA, this.userData);
  }

  private getUuid(bytes: Int8Array): string {

    return deviceInfo.udid + bytes.toString();
  }
}