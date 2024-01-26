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
import FullAtom from './FullAtom'
import QuickTimeDirectory from '../QuickTimeDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class SoundInformationMediaHeaderAtom extends FullAtom {
  private balance: number;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    this.balance = reader.getInt16();
    reader.skip(2); // Reserved
  }

  public addMetadata(directory: QuickTimeDirectory): void {
    let integerPortion: number = this.balance & 0xFFFF0000;
    let fractionPortion: number = (this.balance & 0x0000FFFF) / Math.pow(2, 4);
    directory.setDouble(0x0305, integerPortion + fractionPortion);
  }
}

export default SoundInformationMediaHeaderAtom