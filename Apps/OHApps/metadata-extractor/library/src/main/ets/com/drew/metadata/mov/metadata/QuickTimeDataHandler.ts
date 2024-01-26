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
import ByteUtil from '../../../lang/ByteUtil'
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

class QuickTimeDataHandler extends QuickTimeMetadataHandler {
  private currentIndex: number = 0;
  private keys: Array<string> = new Array();

  public constructor(metadata: Metadata) {
    super(metadata);
  }

  public shouldAcceptAtom(atom: Atom): boolean {
    return atom.type == QuickTimeAtomTypes.ATOM_HANDLER
    || atom.type == QuickTimeAtomTypes.ATOM_KEYS
    || atom.type == QuickTimeAtomTypes.ATOM_DATA;
  }

  public shouldAcceptContainer(atom: Atom): boolean {
    return atom.type == QuickTimeContainerTypes.ATOM_METADATA_LIST
    || ByteUtil.getInt32(StringValue.string2Int8Array(atom.type), 0, true) <= this.keys.length;
  }

  public processAtom(atom: Atom, payload: Int8Array, context: QuickTimeContext): QuickTimeHandler<QuickTimeDirectory> {
    if (payload != null) {
      let reader: SequentialByteArrayReader = new SequentialByteArrayReader(payload);
      if (atom.type == QuickTimeAtomTypes.ATOM_KEYS) {
        this.processKeys(reader);
      } else if (atom.type == QuickTimeAtomTypes.ATOM_DATA) {
        this.processData(payload, reader);
      }
    } else {
      let numValue: number = ByteUtil.getInt32(StringValue.string2Int8Array(atom.type), 0, true);
      if (numValue > 0 && numValue < this.keys.length + 1) {
        this.currentIndex = numValue - 1;
      }
    }
    return this;
  }

  protected processKeys(reader: SequentialByteArrayReader): void {
    // Version 1-byte and Flags 3-bytes
    reader.skip(4);
    let entryCount: number = reader.getInt32();
    for (let i: number = 0; i < entryCount; i++) {
      let keySize: number = reader.getInt32();
      reader.skip(4); // key namespace
      let keyValue: string = StringValue.Int8Array2String(reader.getBytes(keySize - 8), 'utf-8');
      this.keys = this.keys.concat(new Array(keyValue));
    }
  }

  protected processData(payload: Int8Array, reader: SequentialByteArrayReader): void {
    let type: number = reader.getInt32();
    // 4 bytes: locale indicator
    reader.skip(4);
    let tag: number = QuickTimeMetadataDirectory._tagIntegerMap.get(this.keys[this.currentIndex]);
    if (tag != null) {
      let length: number = payload.length - 8;
      switch (type) {
        case 1:
          this.directory.setString(tag, reader.getString(length, "UTF-8"));
          break;
        case 13:
        case 14:
        case 27:
          this.directory.setByteArray(tag, reader.getBytes(length));
          break;
        case 22:
          let buf: Int8Array = new Int8Array(4);
          reader.getBytes(length, buf, 4 - length);
          this.directory.setInt(tag, new SequentialByteArrayReader(buf).getInt32());
          break;
        case 23:
          this.directory.setFloat(tag, reader.getFloat32());
          break;
        case 30:
          let value: Int32Array = new Int32Array(length / 4);
          for (let i: number = 0; i < value.length; i++) {
            value[i] = reader.getInt32();
          }
          this.directory.setIntArray(tag, value);
          break;
      }
    }
  }
}

export default QuickTimeDataHandler