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

import Atom from './atoms/Atom'
import DateUtil from '../../lang/DateUtil'
import Metadata from '../Metadata'
import QuickTimeAtomTypes from './QuickTimeAtomTypes'
import QuickTimeContainerTypes from './QuickTimeContainerTypes'
import QuickTimeContext from './QuickTimeContext'
import QuickTimeDirectory from './QuickTimeDirectory'
import QuickTimeHandler from '../../imaging/quicktime/QuickTimeHandler'
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader'

abstract class QuickTimeMediaHandler <T extends QuickTimeDirectory> extends QuickTimeHandler<T> {
  public constructor(metadata: Metadata, context: QuickTimeContext) {
    super(metadata);

    if (context.creationTime != null && context.modificationTime != null) {
      // Get creation/modification times
      this.directory.setDate(
        0x5001,
      DateUtil.get1Jan1904EpochDate(context.creationTime)
      );
      this.directory.setDate(
        0x5002,
      DateUtil.get1Jan1904EpochDate(context.modificationTime)
      );
    }
  }

  public shouldAcceptAtom(atom: Atom): boolean {
    return atom.type == this.getMediaInformation()
    || atom.type == QuickTimeAtomTypes.ATOM_SAMPLE_DESCRIPTION
    || atom.type == QuickTimeAtomTypes.ATOM_TIME_TO_SAMPLE;
  }

  public shouldAcceptContainer(atom: Atom): boolean {
    return atom.type == QuickTimeContainerTypes.ATOM_SAMPLE_TABLE
    || atom.type == QuickTimeContainerTypes.ATOM_MEDIA_INFORMATION
    || atom.type == QuickTimeContainerTypes.ATOM_MEDIA_BASE
    || atom.type == "tmcd";
  }

  public processAtom(atom: Atom, payload: Int8Array, context: QuickTimeContext): QuickTimeMediaHandler<T> {
    if (payload != null) {
      let reader: SequentialByteArrayReader = new SequentialByteArrayReader(payload);
      if (atom.type == this.getMediaInformation()) {
        this.processMediaInformation(reader, atom);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_SAMPLE_DESCRIPTION) {
        this.processSampleDescription(reader, atom);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_TIME_TO_SAMPLE) {
        this.processTimeToSample(reader, atom, context);
      }
    }
    return this;
  }

  protected abstract getMediaInformation(): string;

  protected abstract processSampleDescription(reader: SequentialByteArrayReader, atom: Atom): void;

  protected abstract processMediaInformation(reader: SequentialByteArrayReader, atom: Atom): void;

  protected abstract processTimeToSample(reader: SequentialByteArrayReader, atom: Atom, context: QuickTimeContext): void;
}

export default QuickTimeMediaHandler