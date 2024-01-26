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
import EntryCount from './EntryCount'
import FullBox from './FullBox'
import Mp4Context from '../Mp4Context'
import Mp4VideoDirectory from '../media/Mp4VideoDirectory'
import Mp4SoundDirectory from '../media/Mp4SoundDirectory'

export default class TimeToSampleBox extends FullBox {
  private entryCount: number;
  private entries: Array<EntryCount>;
  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box);

    this.entryCount = reader.getUInt32();
    this.entries = new Array<EntryCount>();
    for (let i = 0; i < this.entryCount; i++) {
      this.entries.push(new EntryCount(reader.getUInt32(), reader.getUInt32()));
    }
  }

  public addMetadata(directory: Mp4VideoDirectory, context: Mp4Context): void
  {
    let sampleCount = 0;

    this.entries.forEach((value, index, array) => {
      sampleCount += value.sampleCount;
    })

    let frameRate = context.timeScale / (context.duration / sampleCount);

    directory.setFloat(Mp4VideoDirectory.TAG_FRAME_RATE, frameRate);
  }

  public addMetadataSound(directory: Mp4SoundDirectory, context: Mp4Context): void
  {
    directory.setDouble(Mp4SoundDirectory.TAG_AUDIO_SAMPLE_RATE, context.timeScale);
  }
}