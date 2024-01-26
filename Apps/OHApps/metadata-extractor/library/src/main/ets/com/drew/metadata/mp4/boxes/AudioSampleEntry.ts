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

import SampleEntry from './SampleEntry'
import Box from './Box'
import SequentialReader from '../../../lang/SequentialReader'
import Mp4SoundDirectory from '../media/Mp4SoundDirectory'
import Mp4Dictionary from '../Mp4Dictionary'

export default class AudioSampleEntry extends SampleEntry {
  channelcount: number;
  samplesize: number;
  samplerate: number;
  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box);

    reader.skip(8); // Reserved
    this.channelcount = reader.getUInt16();
    this.samplesize = reader.getInt16();
    reader.skip(2); // Pre-defined
    reader.skip(2); // Reserved
    this.samplerate = reader.getUInt32();
    // ChannelLayout()
    // DownMix and/or DRC boxes
    // More boxes as needed
  }

  public addMetadata(directory: Mp4SoundDirectory): void
  {
    Mp4Dictionary.setLookup(Mp4SoundDirectory.TAG_AUDIO_FORMAT, this.format, directory);
    directory.setInt(Mp4SoundDirectory.TAG_NUMBER_OF_CHANNELS, this.channelcount);
    directory.setInt(Mp4SoundDirectory.TAG_AUDIO_SAMPLE_SIZE, this.samplesize);
  }
}