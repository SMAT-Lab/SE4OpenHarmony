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

import FullBox from './FullBox';
import Box from './Box';
import SequentialReader from '../../../lang/SequentialReader';

class AuxiliaryTypeProperty extends FullBox {
  public auxType: string;
  public auxSubtype: number[];

  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box, null);
    this.auxType = this.getZeroTerminatedString(box.size - 12, reader);
    // auxSubtype
  }

  private getZeroTerminatedString(maxLengthBytes: number, reader: SequentialReader): string {
    let stringBuilder: string = "";
    for (let i = 0; i < maxLengthBytes; i++) {
      stringBuilder.concat(reader.getByte().toString());
      if ((stringBuilder.length - 1) == 0) {
        break;
      }
    }
    return stringBuilder.toString().trim();
  }
}

export default AuxiliaryTypeProperty;