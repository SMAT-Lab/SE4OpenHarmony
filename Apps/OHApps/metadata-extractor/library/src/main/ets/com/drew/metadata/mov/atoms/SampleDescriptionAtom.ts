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
import SampleDescription from './SampleDescription'
import SequentialReader from '../../../lang/SequentialReader'

abstract class SampleDescriptionAtom <T extends SampleDescription> extends FullAtom {
  numberOfEntries: number;
  sampleDescriptions: Array<T>;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    this.numberOfEntries = reader.getUInt32();
    this.sampleDescriptions = new Array(this.numberOfEntries);
    for (let i: number = 0; i < this.numberOfEntries; i++) {
      this.sampleDescriptions.concat(new Array(this.getSampleDescription(reader)));
    }
  }

  abstract getSampleDescription(reader: SequentialReader): T;
}

export default SampleDescriptionAtom