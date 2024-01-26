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

import Atom from './Atom'
import QuickTimeDirectory from '../QuickTimeDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class FileTypeCompatibilityAtom extends Atom {
  majorBrand: string;
  minorVersion: number;
  compatibleBrands: Set<string>;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(null, atom);

    this.majorBrand = reader.getString(4);
    this.minorVersion = reader.getUInt32();
    this.compatibleBrands = new Set<string>(new Array((this.size / 16) >> 2));
    for (let i: number = 16; i < this.size; i += 4) {
      this.compatibleBrands.add(reader.getString(4));
    }
  }

  public addMetadata(directory: QuickTimeDirectory): void {
    directory.setString(QuickTimeDirectory.TAG_MAJOR_BRAND, this.majorBrand);
    directory.setLong(QuickTimeDirectory.TAG_MINOR_VERSION, this.minorVersion);
    directory.setStringArray(QuickTimeDirectory.TAG_COMPATIBLE_BRANDS, Array.from(this.compatibleBrands));
  }
}

export default FileTypeCompatibilityAtom