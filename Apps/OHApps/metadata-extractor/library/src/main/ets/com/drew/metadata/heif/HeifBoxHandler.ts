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

import HeifHandler from '../../imaging/heif/HeifHandler';
import HeifDirectory from './HeifDirectory';
import HandlerBox from './boxes/HandlerBox';
import HeifHandlerFactory from './HeifHandlerFactory';
import Metadata from '../Metadata';
import Box from './boxes/Box';
import FullBox from './boxes/FullBox';
import FileTypeBox from './boxes/FileTypeBox';
import HeifBoxTypes from './HeifBoxTypes';
import HeifContainerTypes from './HeifContainerTypes';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';

class HeifBoxHandler extends HeifHandler {
  public handlerBox: HandlerBox;
  private handlerFactory: HeifHandlerFactory = new HeifHandlerFactory(this);

  public constructor(metadata: Metadata) {
    super(metadata);
  }

  public getDirectory(): HeifDirectory {
    return new HeifDirectory();
  }

  public shouldAcceptBox(box: Box): boolean {
    let boxes: Set<string> = new Set<string>()
      .add(HeifBoxTypes.BOX_FILE_TYPE)
      .add(HeifBoxTypes.BOX_HANDLER)
      .add(HeifBoxTypes.BOX_HVC1);
    return boxes.has(box.type);
  }

  public shouldAcceptContainer(box: Box): boolean {
    return box.type == HeifContainerTypes.BOX_METADATA
    || box.type == HeifContainerTypes.BOX_IMAGE_PROPERTY
    || box.type == HeifContainerTypes.BOX_ITEM_PROPERTY;
  }

  public processBox(box: Box, payload: Int8Array): HeifHandler {
    if (payload != null) {
      let reader: SequentialReader = new SequentialByteArrayReader(payload);
      if (box.type == HeifBoxTypes.BOX_FILE_TYPE) {
        this.processFileType(reader, box);
      } else if (box.type == HeifBoxTypes.BOX_HANDLER) {
        this.handlerBox = new HandlerBox(reader, box);
        return this.handlerFactory.getHandler(this.handlerBox, this.metadata);
      }
    }
    return this;
  }

  public processContainer(box: Box, reader: SequentialReader): void {
    if (box.type == HeifContainerTypes.BOX_METADATA) {
      new FullBox(reader, box, null);
    }
  }

  private processFileType(reader: SequentialReader, box: Box): void {
    let fileTypeBox: FileTypeBox = new FileTypeBox(reader, box);
    fileTypeBox.addMetadata(this.directory);
    if (!fileTypeBox.getCompatibleBrands().has("mif1")) {
      this.directory.addError("File Type Box does not contain required brand, mif1");
    }
  }
}

export default HeifBoxHandler;