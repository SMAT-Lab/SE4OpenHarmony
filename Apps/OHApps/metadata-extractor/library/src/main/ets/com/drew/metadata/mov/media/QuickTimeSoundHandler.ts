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
import QuickTimeSoundDirectory from './QuickTimeSoundDirectory'
import SequentialReader from '../../../lang/SequentialReader'
import SoundInformationMediaHeaderAtom from '../atoms/SoundInformationMediaHeaderAtom'
import SoundSampleDescriptionAtom from '../atoms/SoundSampleDescriptionAtom'

class QuickTimeSoundHandler extends QuickTimeMediaHandler<QuickTimeSoundDirectory> {
  public constructor(metadata: Metadata, context: QuickTimeContext) {
    super(metadata, context);
  }

  protected getDirectory(): QuickTimeSoundDirectory {
    return new QuickTimeSoundDirectory();
  }

  protected getMediaInformation(): string {
    return QuickTimeAtomTypes.ATOM_SOUND_MEDIA_INFO;
  }

  public processSampleDescription(reader: SequentialReader, atom: Atom): void {
    let soundSampleDescriptionAtom: SoundSampleDescriptionAtom = new SoundSampleDescriptionAtom(reader, atom);
    soundSampleDescriptionAtom.addMetadata(this.directory);
  }

  public processMediaInformation(reader: SequentialReader, atom: Atom): void {
    let soundInformationMediaHeaderAtom: SoundInformationMediaHeaderAtom = new SoundInformationMediaHeaderAtom(reader, atom);
    soundInformationMediaHeaderAtom.addMetadata(this.directory);
  }

  protected processTimeToSample(reader: SequentialReader, atom: Atom, context: QuickTimeContext): void {
    this.directory.setDouble(QuickTimeSoundDirectory.TAG_AUDIO_SAMPLE_RATE, context.timeScale);
  }
}

export default QuickTimeSoundHandler