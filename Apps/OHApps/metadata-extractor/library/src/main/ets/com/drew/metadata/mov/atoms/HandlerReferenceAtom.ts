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
import SequentialReader from '../../../lang/SequentialReader'

class HandlerReferenceAtom extends FullAtom {
  public getComponentType(): string {
    return this.componentSubtype;
  }

  componentType: string;
  componentSubtype: string;
  componentName: string;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    this.componentType = reader.getString(4);
    this.componentSubtype = reader.getString(4);
    reader.skip(4); // Reserved
    reader.skip(4); // Reserved
    reader.skip(4); // Reserved
    this.componentName = reader.getString(reader.getUInt8());
  }
}

export default HandlerReferenceAtom