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

import Mp4Directory from '../../metadata/mp4/Mp4Directory';
import StreamReader from '../../lang/StreamReader';
import Mp4Handler from './Mp4Handler';
import Mp4Context from '../../metadata/mp4/Mp4Context';
import Box from '../../metadata/mp4/boxes/Box';

class Mp4Reader {
  constructor(){

  }
  public static extract(filePath: string, handler: Mp4Handler<Mp4Directory>) {
    let reader: StreamReader = new StreamReader(filePath);

    reader.setMotorolaByteOrder(true);

    let context: Mp4Context = new Mp4Context();

    Mp4Reader.processBoxes(reader, -1, handler, context);
  }

  private static processBoxes(reader: StreamReader, atomEnd: number, handler: Mp4Handler<Mp4Directory>, context: Mp4Context) {
    try {
      while (atomEnd == -1 || reader.getPosition() < atomEnd) {

        let box: Box = new Box(reader);

        if (handler.shouldAcceptContainer(box)) {
          this.processBoxes(reader, box.size + reader.getPosition() - 8, handler.processContainer(box, context), context);
        } else if (handler.shouldAcceptBox(box)) {
          handler = handler.processBox(box, reader.getBytes(box.size - 8), context);
        } else if (box.usertype != null) {
          reader.skip(box.size - 24);
        } else if (box.size > 1) {
          if (box.isLargeSize) {
            reader.skip(box.size - 16);
          } else {
            reader.skip(box.size - 8);
          }
        } else if (box.size == -1) {
          break;
        }
      }
    } catch (e) {
      handler.addError("Mp4Reader :"+JSON.stringify(e));
    }
  }
}

export default Mp4Reader