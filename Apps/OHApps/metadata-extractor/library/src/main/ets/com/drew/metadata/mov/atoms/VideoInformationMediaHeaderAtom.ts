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
import QuickTimeVideoDirectory from '../media/QuickTimeVideoDirectory'
import SequentialReader from '../../../lang/SequentialReader'

class VideoInformationMediaHeaderAtom extends FullAtom {
  graphicsMode: number;
  opcolor: Int32Array;

  public constructor(reader: SequentialReader, atom: Atom) {
    super(reader, atom);

    this.graphicsMode = reader.getUInt16();
    this.opcolor = new Int32Array([reader.getUInt16(), reader.getUInt16(), reader.getUInt16()]);
  }

  public addMetadata(directory: QuickTimeVideoDirectory): void {
    directory.setIntArray(QuickTimeVideoDirectory.TAG_OPCOLOR, this.opcolor);
    directory.setInt(QuickTimeVideoDirectory.TAG_GRAPHICS_MODE, this.graphicsMode);
  }
}

export default VideoInformationMediaHeaderAtom
