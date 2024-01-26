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

import PcxDirectory from './PcxDirectory';
import Metadata from '../Metadata';
import SequentialReader from '../../lang/SequentialReader';

class PcxReader {
  public extract(reader: SequentialReader, metadata: Metadata) {
    reader.setMotorolaByteOrder(false);

    let directory = new PcxDirectory();
    metadata.addDirectory(directory);

    try {
      let identifier = reader.getInt8();
      if (identifier != 0x0A) {
        throw new Error("Invalid PCX identifier byte");
      }

      directory.setInt(PcxDirectory.TAG_VERSION, reader.getInt8());

      let encoding = reader.getInt8();
      if (encoding != 0x01) {
        throw new Error("Invalid PCX encoding byte");
      }

      directory.setInt(PcxDirectory.TAG_BITS_PER_PIXEL, reader.getUInt8());
      directory.setInt(PcxDirectory.TAG_XMIN,           reader.getUInt16());
      directory.setInt(PcxDirectory.TAG_YMIN,           reader.getUInt16());
      directory.setInt(PcxDirectory.TAG_XMAX,           reader.getUInt16());
      directory.setInt(PcxDirectory.TAG_YMAX,           reader.getUInt16());
      directory.setInt(PcxDirectory.TAG_HORIZONTAL_DPI, reader.getUInt16());
      directory.setInt(PcxDirectory.TAG_VERTICAL_DPI,   reader.getUInt16());
      directory.setByteArray(PcxDirectory.TAG_PALETTE,  reader.getBytes(48));
      reader.skip(1);
      directory.setInt(PcxDirectory.TAG_COLOR_PLANES,   reader.getUInt8());
      directory.setInt(PcxDirectory.TAG_BYTES_PER_LINE, reader.getUInt16());

      let paletteType = reader.getUInt16();
      if (paletteType != 0) {
        directory.setInt(PcxDirectory.TAG_PALETTE_TYPE, paletteType);
      }

      let hScrSize = reader.getUInt16();
      if (hScrSize != 0) {
        directory.setInt(PcxDirectory.TAG_HSCR_SIZE, hScrSize);
      }

      let vScrSize = reader.getUInt16();
      if (vScrSize != 0) {
        directory.setInt(PcxDirectory.TAG_VSCR_SIZE, vScrSize);
      }

    } catch (e) {
        directory.addError("Exception reading PCX file metadata: " + e.getMessage());
      }
  }
}

export default PcxReader
