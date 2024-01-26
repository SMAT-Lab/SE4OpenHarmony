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
import Mp4MediaHandler from '../Mp4MediaHandler';
import Mp4SoundDirectory from './Mp4SoundDirectory';
import SequentialReader from '../../../lang/SequentialReader';
import Metadata from '../../Metadata';
import Mp4Context from '../Mp4Context';
import Mp4BoxTypes from '../Mp4BoxTypes';
import Box from '../boxes/Box';
import AudioSampleEntry from '../boxes/AudioSampleEntry';
import SoundMediaHeaderBox from '../boxes/SoundMediaHeaderBox';
import TimeToSampleBox from '../boxes/TimeToSampleBox';
export default class Mp4SoundHandler extends Mp4MediaHandler<Mp4SoundDirectory> {
    public constructor(metadata: Metadata, context: Mp4Context) {
        super(metadata, context);
    }
    public getDirectory(): Mp4SoundDirectory {
        return new Mp4SoundDirectory();
    }
    public getMediaInformation(): string {
        return Mp4BoxTypes.BOX_SOUND_MEDIA_INFO;
    }
    public processSampleDescription(reader: SequentialReader, box: Box): void {
        let audioSampleEntry = new AudioSampleEntry(reader, box);
        audioSampleEntry.addMetadata(this.directory);
    }
    public processMediaInformation(reader: SequentialReader, box: Box): void {
        let soundMediaHeaderBox = new SoundMediaHeaderBox(reader, box);
        soundMediaHeaderBox.addMetadata(this.directory);
    }
    public processTimeToSample(reader: SequentialReader, box: Box, context: Mp4Context): void {
        let timeToSampleBox = new TimeToSampleBox(reader, box);
        timeToSampleBox.addMetadataSound(this.directory, context);
    }
}
