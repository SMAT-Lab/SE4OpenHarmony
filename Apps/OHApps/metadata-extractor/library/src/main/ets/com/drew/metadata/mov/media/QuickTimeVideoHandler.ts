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

import Atom from '../atoms/Atom'
import Metadata from '../../Metadata'
import QuickTimeAtomTypes from '../QuickTimeAtomTypes'
import QuickTimeContext from '../QuickTimeContext'
import QuickTimeMediaHandler from '../QuickTimeMediaHandler'
import QuickTimeVideoDirectory from './QuickTimeVideoDirectory'
import SequentialReader from '../../../lang/SequentialReader'
import TimeToSampleAtom from '../atoms/TimeToSampleAtom'
import VideoInformationMediaHeaderAtom from '../atoms/VideoInformationMediaHeaderAtom'
import VideoSampleDescriptionAtom from '../atoms/VideoSampleDescriptionAtom'

class QuickTimeVideoHandler extends QuickTimeMediaHandler<QuickTimeVideoDirectory> {
  public constructor(metadata: Metadata, context: QuickTimeContext) {
    super(metadata, context);
  }

  protected getMediaInformation(): string {
    return QuickTimeAtomTypes.ATOM_VIDEO_MEDIA_INFO;
  }

  protected getDirectory(): QuickTimeVideoDirectory {
    return new QuickTimeVideoDirectory();
  }

  public processSampleDescription(reader: SequentialReader, atom: Atom): void {
    let videoSampleDescriptionAtom: VideoSampleDescriptionAtom = new VideoSampleDescriptionAtom(reader, atom);
    videoSampleDescriptionAtom.addMetadata(this.directory);
  }

  public processMediaInformation(reader: SequentialReader, atom: Atom): void {
    let videoInformationMediaHeaderAtom: VideoInformationMediaHeaderAtom = new VideoInformationMediaHeaderAtom(reader, atom);
    videoInformationMediaHeaderAtom.addMetadata(this.directory);
  }

  public processTimeToSample(reader: SequentialReader, atom: Atom, context: QuickTimeContext): void {
    let timeToSampleAtom: TimeToSampleAtom = new TimeToSampleAtom(reader, atom);
    timeToSampleAtom.addMetadata(this.directory, context);
  }
}

export default QuickTimeVideoHandler