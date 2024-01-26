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
import QuickTimeAtomTypes from './QuickTimeAtomTypes'
import QuickTimeContainerTypes from './QuickTimeContainerTypes'
import Metadata from '../Metadata'
import QuickTimeContext from './QuickTimeContext'
import QuickTimeDirectory from './QuickTimeDirectory'
import QuickTimeHandler from '../../imaging/quicktime/QuickTimeHandler'
import QuickTimeMetadataDirectory from './metadata/QuickTimeMetadataDirectory'
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader'

abstract class QuickTimeMetadataHandler extends QuickTimeHandler<QuickTimeDirectory> {
  public constructor(metadata: Metadata) {
    super(metadata);
  }

  protected getDirectory(): QuickTimeDirectory {
    return new QuickTimeMetadataDirectory();
  }

  public shouldAcceptAtom(atom: Atom): boolean {
    return atom.type == QuickTimeAtomTypes.ATOM_HANDLER
    || atom.type == QuickTimeAtomTypes.ATOM_KEYS
    || atom.type == QuickTimeAtomTypes.ATOM_DATA;
  }

  public shouldAcceptContainer(atom: Atom): boolean {
    return atom.type == QuickTimeContainerTypes.ATOM_METADATA_LIST;
  }

  public processAtom(atom: Atom, payload: Int8Array, context: QuickTimeContext): QuickTimeHandler<QuickTimeDirectory> {
    if (payload != null) {
      let reader: SequentialByteArrayReader = new SequentialByteArrayReader(payload);
      if (atom.type == QuickTimeAtomTypes.ATOM_KEYS) {
        this.processKeys(reader);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_DATA) {
        this.processData(payload, reader);
      }
    }
    return this;
  }

  protected abstract processKeys(reader: SequentialByteArrayReader): void;

  protected abstract processData(payload: Int8Array, reader: SequentialByteArrayReader): void;
}

export default QuickTimeMetadataHandler