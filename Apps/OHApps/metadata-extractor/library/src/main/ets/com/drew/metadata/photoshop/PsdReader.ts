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

import PsdHeaderDirectory from './PsdHeaderDirectory';
import Metadata from '../Metadata';
import SequentialReader from '../../lang/SequentialReader';
import PhotoshopReader from './PhotoshopReader'

class PsdReader {
  public extract(reader: SequentialReader, metadata: Metadata) {
    let directory = new PsdHeaderDirectory();
    metadata.addDirectory(directory);

    // FILE HEADER SECTION

    try {
      let signature = reader.getInt32();
      if (signature != 0x38425053) { // "8BPS"
        directory.addError("Invalid PSD file signature");
        return;
      }

      let version = reader.getUInt16();
      if (version != 1 && version != 2) {
        directory.addError("Invalid PSD file version (must be 1 or 2)");
        return;
      }

      // 6 reserved bytes are skipped here.  They should be zero.
      reader.skip(6);

      let channelCount = reader.getUInt16();
      directory.setInt(PsdHeaderDirectory.TAG_CHANNEL_COUNT, channelCount);

      // even though this is probably an unsigned int, the max height in practice is 300,000
      let imageHeight = reader.getInt32();
      directory.setInt(PsdHeaderDirectory.TAG_IMAGE_HEIGHT, imageHeight);

      // even though this is probably an unsigned int, the max width in practice is 300,000
      let imageWidth = reader.getInt32();
      directory.setInt(PsdHeaderDirectory.TAG_IMAGE_WIDTH, imageWidth);

      let bitsPerChannel = reader.getUInt16();
      directory.setInt(PsdHeaderDirectory.TAG_BITS_PER_CHANNEL, bitsPerChannel);

      let colorMode = reader.getUInt16();
      directory.setInt(PsdHeaderDirectory.TAG_COLOR_MODE, colorMode);
    } catch (e) {
        directory.addError("Unable to read PSD header");
        return;
    }

    // COLOR MODE DATA SECTION

    try {
      let sectionLength = reader.getUInt32();
      reader.skip(sectionLength);
    } catch (e) {
        return;
    }

    // IMAGE RESOURCES SECTION

    try {
      let sectionLength = reader.getUInt32();
      new PhotoshopReader().extract(reader, sectionLength, metadata, null);
    } catch (e) {
      // ignore
    }

    // LAYER AND MASK INFORMATION SECTION (skipped)

    // IMAGE DATA SECTION (skipped)
    }
}

export default PsdReader
