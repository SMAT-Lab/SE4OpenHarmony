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
import Box from './Box'
import SequentialReader from '../../../lang/SequentialReader'

export default class SampleEntry extends FullBox {
  numberOfEntries: number;
  sampleDescriptionSize: number;
  format: string;
  dataReferenceIndex: number;
  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box);

    this.numberOfEntries = reader.getUInt32();
    this.sampleDescriptionSize = reader.getUInt32();
    this.format = reader.getString(4);
    reader.skip(6); // Reserved
    this.dataReferenceIndex = reader.getUInt16();
  }
}