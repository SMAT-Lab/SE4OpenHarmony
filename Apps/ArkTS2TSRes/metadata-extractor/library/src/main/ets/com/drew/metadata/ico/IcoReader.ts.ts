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
import IcoDirectory from './IcoDirectory';
import Metadata from '../Metadata';
import SequentialReader from '../../lang/SequentialReader';
/**
 * Reads ICO (Windows Icon) file metadata.
 * <ul>
 * <li>https://en.wikipedia.org/wiki/ICO_(file_format)</li>
 * </ul>
 *
 * @author Drew Noakes https://drewnoakes.com
 */
class IcoReader {
    public extract(reader: SequentialReader, metadata: Metadata) {
        reader.setMotorolaByteOrder(false);
        let etype;
        let imageCount;
        // Read header (ICONDIR structure)
        try {
            let reserved = reader.getUInt16();
            if (reserved != 0) {
                let directory = new IcoDirectory();
                directory.addError("Invalid header bytes");
                metadata.addDirectory(directory);
                return;
            }
            etype = reader.getUInt16();
            if (etype != 1 && etype != 2) {
                let directory = new IcoDirectory();
                directory.addError("Invalid etype " + etype + " -- expecting 1 or 2");
                metadata.addDirectory(directory);
                return;
            }
            imageCount = reader.getUInt16();
            if (imageCount == 0) {
                let directory = new IcoDirectory();
                directory.addError("Image count cannot be zero");
                metadata.addDirectory(directory);
                return;
            }
        }
        catch (e) {
            let directory = new IcoDirectory();
            directory.addError("Exception reading ICO file metadata: " + e.getMessage());
            metadata.addDirectory(directory);
            return;
        }
        // Read each embedded image
        for (let imageIndex = 0; imageIndex < imageCount; imageIndex++) {
            let directory = new IcoDirectory();
            try {
                directory.setInt(IcoDirectory.TAG_IMAGE_TYPE, etype);
                directory.setInt(IcoDirectory.TAG_IMAGE_WIDTH, reader.getUInt8());
                directory.setInt(IcoDirectory.TAG_IMAGE_HEIGHT, reader.getUInt8());
                directory.setInt(IcoDirectory.TAG_COLOUR_PALETTE_SIZE, reader.getUInt8());
                // Ignore this byte (normally zero, though .NET's System.Drawing.Icon.Save method writes 255)
                reader.getUInt8();
                if (etype == 1) {
                    // Icon
                    directory.setInt(IcoDirectory.TAG_COLOUR_PLANES, reader.getUInt16());
                    directory.setInt(IcoDirectory.TAG_BITS_PER_PIXEL, reader.getUInt16());
                }
                else {
                    // Cursor
                    directory.setInt(IcoDirectory.TAG_CURSOR_HOTSPOT_X, reader.getUInt16());
                    directory.setInt(IcoDirectory.TAG_CURSOR_HOTSPOT_Y, reader.getUInt16());
                }
                directory.setLong(IcoDirectory.TAG_IMAGE_SIZE_BYTES, reader.getUInt32());
                directory.setLong(IcoDirectory.TAG_IMAGE_OFFSET_BYTES, reader.getUInt32());
            }
            catch (e) {
                directory.addError("Exception reading ICO file metadata: " + e.getMessage());
            }
            metadata.addDirectory(directory);
        }
    }
}
export default IcoReader;
