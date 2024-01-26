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
import QuickTimeContainerTypes from '../QuickTimeContainerTypes'
import QuickTimeContext from '../QuickTimeContext'
import QuickTimeDirectory from '../QuickTimeDirectory'
import QuickTimeHandler from '../../../imaging/quicktime/QuickTimeHandler'
import QuickTimeMetadataDirectory from './QuickTimeMetadataDirectory'
import QuickTimeMetadataHandler from '../QuickTimeMetadataHandler'
import SequentialByteArrayReader from '../../../lang/SequentialByteArrayReader'
import StringValue from '../../StringValue'

class QuickTimeDirectoryHandler extends QuickTimeMetadataHandler {
  private currentData: string;

  public constructor(metadata: Metadata) {
    super(metadata);
  }

  public shouldAcceptAtom(atom: Atom): boolean {
    return atom.type == QuickTimeAtomTypes.ATOM_DATA;
  }

  public shouldAcceptContainer(atom: Atom): boolean {
    return QuickTimeMetadataDirectory._tagIntegerMap.has(atom.type)
    || atom.type == QuickTimeContainerTypes.ATOM_METADATA_LIST;
  }

  public processAtom(atom: Atom, payload: Int8Array, context: QuickTimeContext): QuickTimeHandler<QuickTimeDirectory> {
    if (payload != null) {
      let reader: SequentialByteArrayReader = new SequentialByteArrayReader(payload);
      if (atom.type == QuickTimeAtomTypes.ATOM_DATA && this.currentData != null) {
        this.processData(payload, reader);
      } else {
        this.currentData = StringValue.Int8Array2String(reader.getBytes(4), 'utf-8');
      }
    } else {
      if (QuickTimeMetadataDirectory._tagIntegerMap.has(atom.type)) {
        this.currentData = atom.type;
      } else {
        this.currentData = null;
      }
    }
    return this;
  }

  protected processData(payload: Int8Array, reader: SequentialByteArrayReader): void {
    // 4 bytes: type indicator
    // 4 bytes: locale indicator
    reader.skip(8);
    let value: string = StringValue.Int8Array2String(reader.getBytes(payload.length - 8), 'utf-8');
    this.directory.setString(QuickTimeMetadataDirectory._tagIntegerMap.get(this.currentData), value);
  }

  protected processKeys(reader: SequentialByteArrayReader): void {
    // Do nothing
  }
}

export default QuickTimeDirectoryHandler