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
import Mp4Directory from '../../mp4/Mp4Directory'
import QuickTimeDirectory from '../QuickTimeDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class TrackHeaderAtom extends FullAtom {
  matrix: Int32Array = new Int32Array(9);
  width: number;
  height: number;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    if (this.version == 1) {
      reader.skip(48);
    } else {
      reader.skip(36);
    }

    for (let i: number = 0; i < 9; i++) {
      this.matrix[i] = reader.getInt32();
    }
    this.width = reader.getInt32();
    this.height = reader.getInt32();
  }

  public addMetadata(directory: QuickTimeDirectory): void {
    if (this.width != 0 && this.height != 0 && directory.getDoubleObject(Mp4Directory.TAG_ROTATION) == null) {
      let x: number = this.matrix[1] + this.matrix[4];
      let y: number = this.matrix[0] + this.matrix[3];
      let theta: number = Math.atan2(y, x);
      let degree: number = (theta * 180) / Math.PI - 45;
      directory.setDouble(QuickTimeDirectory.TAG_ROTATION, degree);
    }
  }
}

export default TrackHeaderAtom