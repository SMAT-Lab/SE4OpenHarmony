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

import SequentialReader from '../../../lang/SequentialReader';
import Box from './Box'
import FullBox from './FullBox'
import Mp4Context from '../Mp4Context'

export default class MediaHeaderBox extends FullBox {
  public constructor(reader: SequentialReader, box: Box, context: Mp4Context) {
    super(reader, box);

    if (this.version == 1) {
      context.creationTime = reader.getInt64();
      context.modificationTime = reader.getInt64();
      context.timeScale = reader.getInt32();
      context.duration = reader.getInt64();
    } else {
      context.creationTime = reader.getUInt32();
      context.modificationTime = reader.getUInt32();
      context.timeScale = reader.getUInt32();
      context.duration = reader.getUInt32();
    }

    let languageBits = reader.getInt16();
    context.language = Uint16Array.of(((languageBits & 0x7C00) >> 10) + 0x60,
      ((languageBits & 0x03E0) >> 5) + 0x60, (languageBits & 0x001F) + 0x60).toString()
  }
}