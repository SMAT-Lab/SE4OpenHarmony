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

import Atom from '../../metadata/mov/atoms/Atom'
import QuickTimeContext from '../../metadata/mov/QuickTimeContext'
import QuickTimeDirectory from '../../metadata/mov/QuickTimeDirectory'
import QuickTimeHandler from './QuickTimeHandler'
import StreamReader from '../../lang/StreamReader'

class QuickTimeReader {
  private constructor() {
  }

  public static extract(reader: StreamReader, handler: QuickTimeHandler<QuickTimeDirectory>): void {
    //    let reader: StreamReader = new StreamReader(inputStream);
    reader.setMotorolaByteOrder(true);

    let context: QuickTimeContext = new QuickTimeContext();

    QuickTimeReader.processAtoms(reader, -1, handler, context);
  }

  private static processAtoms(reader: StreamReader, atomEnd: number, handler: QuickTimeHandler<QuickTimeDirectory>, context: QuickTimeContext): void {
    while (atomEnd == -1 || reader.getPosition() < atomEnd) {

      let atom: Atom = new Atom(reader);

      // Determine if fourCC is container/atom and process accordingly.
      // Unknown atoms will be skipped

      if (handler.shouldAcceptContainer(atom)) {
        QuickTimeReader.processAtoms(reader, atom.size + reader.getPosition() - 8, handler.processContainer(atom, context), context);
      } else if (handler.shouldAcceptAtom(atom)) {
        handler = handler.processAtom(atom, reader.getBytes(atom.size - 8), context);
      } else if (atom.size > 1) {
        reader.skip(atom.size - 8);
      } else if (atom.size == -1) {
        break;
      }
    }
  }
}

export default QuickTimeReader