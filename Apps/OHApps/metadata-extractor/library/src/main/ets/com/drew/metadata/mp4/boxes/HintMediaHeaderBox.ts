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

import FullBox from './FullBox'
import SequentialReader from '../../../lang/SequentialReader';
import Box from './Box'
import Mp4HintDirectory from '../media/Mp4HintDirectory'

export default class HintMediaHeaderBox extends FullBox {
  maxPDUsize: number;
  avgPDUsize: number;
  maxbitrate: number;
  avgbitrate: number;
  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box);

    this.maxPDUsize = reader.getUInt16();
    this.avgPDUsize = reader.getUInt16();
    this.maxbitrate = reader.getUInt32();
    this.avgbitrate = reader.getUInt32();
  }

  public addMetadata(directory: Mp4HintDirectory): void
  {
    directory.setInt(Mp4HintDirectory.TAG_MAX_PDU_SIZE, this.maxPDUsize);
    directory.setInt(Mp4HintDirectory.TAG_AVERAGE_PDU_SIZE, this.avgPDUsize);
    directory.setLong(Mp4HintDirectory.TAG_MAX_BITRATE, this.maxbitrate);
    directory.setLong(Mp4HintDirectory.TAG_AVERAGE_BITRATE, this.avgbitrate);
  }
}