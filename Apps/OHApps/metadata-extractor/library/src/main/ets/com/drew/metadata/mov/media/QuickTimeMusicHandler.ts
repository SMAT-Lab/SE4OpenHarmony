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
import MusicSampleDescriptionAtom from '../atoms/MusicSampleDescriptionAtom'
import QuickTimeContext from '../QuickTimeContext'
import QuickTimeMediaHandler from '../QuickTimeMediaHandler'
import QuickTimeMusicDirectory from './QuickTimeMusicDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class QuickTimeMusicHandler extends QuickTimeMediaHandler<QuickTimeMusicDirectory> {
  public constructor(metadata: Metadata, context: QuickTimeContext) {
    super(metadata, context);
  }

  protected getDirectory(): QuickTimeMusicDirectory {
    return this.directory;
  }

  protected getMediaInformation(): string {
    // Not yet implemented
    return null;
  }

  protected processSampleDescription(reader: SequentialReader, atom: Atom): void {
    let musicSampleDescriptionAtom: MusicSampleDescriptionAtom = new MusicSampleDescriptionAtom(reader, atom);
    musicSampleDescriptionAtom.addMetadata(this.directory);
  }

  protected processMediaInformation(reader: SequentialReader, atom: Atom): void {
    // Not yet implemented
  }

  protected processTimeToSample(reader: SequentialReader, atom: Atom, context: QuickTimeContext): void {
    // Not yet implemented
  }
}

export default QuickTimeMusicHandler