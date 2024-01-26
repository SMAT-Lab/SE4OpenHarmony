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
import QuickTimeTimecodeDirectory from './QuickTimeTimecodeDirectory'
import SequentialReader from '../../../lang/SequentialReader'
import TimecodeInformationMediaAtom from '../atoms/TimecodeInformationMediaAtom'
import TimecodeSampleDescriptionAtom from '../atoms/TimecodeSampleDescriptionAtom'

class QuickTimeTimecodeHandler extends QuickTimeMediaHandler<QuickTimeTimecodeDirectory> {
  public constructor(metadata: Metadata, context: QuickTimeContext) {
    super(metadata, context);
  }

  protected getDirectory(): QuickTimeTimecodeDirectory {
    return new QuickTimeTimecodeDirectory();
  }

  protected getMediaInformation(): string {
    return QuickTimeAtomTypes.ATOM_TIMECODE_MEDIA_INFO;
  }

  public processSampleDescription(reader: SequentialReader, atom: Atom): void {
    let timecodeSampleDescriptionAtom: TimecodeSampleDescriptionAtom = new TimecodeSampleDescriptionAtom(reader, atom);
    timecodeSampleDescriptionAtom.addMetadata(this.directory);
  }

  public processMediaInformation(reader: SequentialReader, atom: Atom): void {
    let timecodeInformationMediaAtom: TimecodeInformationMediaAtom = new TimecodeInformationMediaAtom(reader, atom);
    timecodeInformationMediaAtom.addMetadata(this.directory);
  }

  protected processTimeToSample(reader: SequentialReader, atom: Atom, context: QuickTimeContext): void {
    // Do nothing
  }
}

export default QuickTimeTimecodeHandler