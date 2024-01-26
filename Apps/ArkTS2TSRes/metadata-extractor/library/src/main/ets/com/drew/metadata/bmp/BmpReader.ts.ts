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
import IccReader from '../icc/IccReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import { BmpHeaderDirectory } from './BmpHeaderDirectory';
import Directory from '../Directory';
import ErrorDirectory from '../ErrorDirectory';
import SequentialReader from '../../lang/SequentialReader';
import Metadata from '../Metadata';
import { ColorSpaceType } from './ColorSpaceType';
export class BmpReader {
    // Possible "magic bytes" indicating bitmap type:
    /**
     * "BM" - Windows or OS/2 bitmap
     */
    public BITMAP: number = 0x4D42;
    /**
     * "BA" - OS/2 Bitmap array (multiple bitmaps)
     */
    public OS2_BITMAP_ARRAY: number = 0x4142;
    /**
     * "IC" - OS/2 Icon
     */
    public OS2_ICON: number = 0x4349;
    /**
     * "CI" - OS/2 Color icon
     */
    public OS2_COLOR_ICON: number = 0x4943;
    /**
     * "CP" - OS/2 Color pointer
     */
    public OS2_COLOR_POINTER: number = 0x5043;
    /**
     * "PT" - OS/2 Pointer
     */
    public OS2_POINTER: number = 0x5450;
    extract(reader: SequentialReader, metadata: Metadata) {
        reader.setMotorolaByteOrder(false);
        this.readFileHeader(reader, metadata, true);
    }
    protected readFileHeader(reader: SequentialReader, metadata: Metadata, allowArray: boolean) {
        let magicNumber: number;
        try {
            magicNumber = reader.getUInt16();
        }
        catch (e) {
            metadata.addDirectory(new ErrorDirectory("Couldn't determine bitmap type: " + e));
            return;
        }
        let directory: Directory = null;
        try {
            switch (magicNumber) {
                case this.OS2_BITMAP_ARRAY:
                    if (!allowArray) {
                        this.addError("Invalid bitmap file - nested arrays not allowed", metadata);
                        return;
                    }
                    reader.skip(4); // Size
                    let nextHeaderOffset = reader.getUInt32();
                    reader.skip(2 + 2); // Screen Resolution
                    this.readFileHeader(reader, metadata, false);
                    if (nextHeaderOffset == 0) {
                        return; // No more bitmaps
                    }
                    if (reader.getPosition() > nextHeaderOffset) {
                        this.addError("Invalid next header offset", metadata);
                        return;
                    }
                    reader.skip(nextHeaderOffset - reader.getPosition());
                    this.readFileHeader(reader, metadata, true);
                    break;
                case this.BITMAP:
                case this.OS2_ICON:
                case this.OS2_COLOR_ICON:
                case this.OS2_COLOR_POINTER:
                case this.OS2_POINTER:
                    directory = new BmpHeaderDirectory();
                    metadata.addDirectory(directory);
                    directory.setInt(BmpHeaderDirectory.TAG_BITMAP_TYPE, magicNumber);
                    // skip past the rest of the file header
                    reader.skip(4 + 2 + 2 + 4);
                    this.readBitmapHeader(reader, <BmpHeaderDirectory>directory, metadata);
                    break;
                default:
                    metadata.addDirectory(new ErrorDirectory("Invalid BMP magic number 0x" + parseInt((magicNumber.toString()))
                        .toString(16)));
                    return;
            }
        }
        catch (e) {
            if (directory == null) {
                this.addError("Unable to read BMP file header", metadata);
            }
            else {
                directory.addError("Unable to read BMP file header");
            }
        }
    }
    protected readBitmapHeader(reader: SequentialReader, directory: BmpHeaderDirectory, metadata: Metadata) {
        try {
            let bitmapType = directory.getInt(BmpHeaderDirectory.TAG_BITMAP_TYPE) as number;
            let headerOffset = reader.getPosition() as number;
            let headerSize = reader.getInt32() as number;
            directory.setInt(BmpHeaderDirectory.TAG_HEADER_SIZE, headerSize);
            /*
             * Known header type sizes:
             *
             *  12 - BITMAPCOREHEADER or OS21XBITMAPHEADER
             *  16 - OS22XBITMAPHEADER (short)
             *  40 - BITMAPINFOHEADER
             *  52 - BITMAPV2INFOHEADER
             *  56 - BITMAPV3INFOHEADER
             *  64 - OS22XBITMAPHEADER (full)
             * 108 - BITMAPV4HEADER
             * 124 - BITMAPV5HEADER
             *
             */
            if (headerSize == 12 && bitmapType == this.BITMAP) { //BITMAPCOREHEADER
                /*
                 * There's no way to tell BITMAPCOREHEADER and OS21XBITMAPHEADER
                 * apart for the "standard" bitmap type. The difference is only
                 * that BITMAPCOREHEADER has signed width and height while
                 * in OS21XBITMAPHEADER they are unsigned. Since BITMAPCOREHEADER,
                 * the Windows version, is most common, read them as signed.
                 */
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_WIDTH, reader.getInt16());
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_HEIGHT, reader.getInt16());
                directory.setInt(BmpHeaderDirectory.TAG_COLOUR_PLANES, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_BITS_PER_PIXEL, reader.getUInt16());
            }
            else if (headerSize == 12) { // OS21XBITMAPHEADER
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_WIDTH, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_HEIGHT, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_COLOUR_PLANES, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_BITS_PER_PIXEL, reader.getUInt16());
            }
            else if (headerSize == 16 || headerSize == 64) { // OS22XBITMAPHEADER
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_WIDTH, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_HEIGHT, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_COLOUR_PLANES, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_BITS_PER_PIXEL, reader.getUInt16());
                if (headerSize > 16) {
                    directory.setInt(BmpHeaderDirectory.TAG_COMPRESSION, reader.getInt32());
                    reader.skip(4); // skip the pixel data length
                    directory.setInt(BmpHeaderDirectory.TAG_X_PIXELS_PER_METER, reader.getInt32());
                    directory.setInt(BmpHeaderDirectory.TAG_Y_PIXELS_PER_METER, reader.getInt32());
                    directory.setInt(BmpHeaderDirectory.TAG_PALETTE_COLOUR_COUNT, reader.getInt32());
                    directory.setInt(BmpHeaderDirectory.TAG_IMPORTANT_COLOUR_COUNT, reader.getInt32());
                    reader.skip(2 + // Skip Units, can only be 0 (pixels per meter)
                        2 + // Skip padding
                        2 // Skip Recording, can only be 0 (left to right, bottom to top)
                    );
                    directory.setInt(BmpHeaderDirectory.TAG_RENDERING, reader.getUInt16());
                    reader.skip(4 + 4); // Skip Size1 and Size2
                    directory.setInt(BmpHeaderDirectory.TAG_COLOR_ENCODING, reader.getInt32());
                    reader.skip(4); // Skip Identifier
                }
            }
            else if (headerSize == 40 || headerSize == 52 || headerSize == 56 ||
                headerSize == 108 || headerSize == 124) { // BITMAPINFOHEADER V1-5
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_WIDTH, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_IMAGE_HEIGHT, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_COLOUR_PLANES, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_BITS_PER_PIXEL, reader.getUInt16());
                directory.setInt(BmpHeaderDirectory.TAG_COMPRESSION, reader.getInt32());
                // skip the pixel data length
                reader.skip(4);
                directory.setInt(BmpHeaderDirectory.TAG_X_PIXELS_PER_METER, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_Y_PIXELS_PER_METER, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_PALETTE_COLOUR_COUNT, reader.getInt32());
                directory.setInt(BmpHeaderDirectory.TAG_IMPORTANT_COLOUR_COUNT, reader.getInt32());
                if (headerSize == 40) { // BITMAPINFOHEADER end
                    return;
                }
                directory.setLong(BmpHeaderDirectory.TAG_RED_MASK, reader.getUInt32());
                directory.setLong(BmpHeaderDirectory.TAG_GREEN_MASK, reader.getUInt32());
                directory.setLong(BmpHeaderDirectory.TAG_BLUE_MASK, reader.getUInt32());
                if (headerSize == 52) { // BITMAPV2INFOHEADER end
                    return;
                }
                directory.setLong(BmpHeaderDirectory.TAG_ALPHA_MASK, reader.getUInt32());
                if (headerSize == 56) { // BITMAPV3INFOHEADER end
                    return;
                }
                let csType = reader.getUInt32();
                directory.setLong(BmpHeaderDirectory.TAG_COLOR_SPACE_TYPE, csType);
                reader.skip(36); // Skip color endpoint coordinates
                directory.setLong(BmpHeaderDirectory.TAG_GAMMA_RED, reader.getUInt32());
                directory.setLong(BmpHeaderDirectory.TAG_GAMMA_GREEN, reader.getUInt32());
                directory.setLong(BmpHeaderDirectory.TAG_GAMMA_BLUE, reader.getUInt32());
                if (headerSize == 108) { // BITMAPV4HEADER end
                    return;
                }
                directory.setInt(BmpHeaderDirectory.TAG_INTENT, reader.getInt32());
                if (csType == ColorSpaceType.PROFILE_EMBEDDED || csType == ColorSpaceType.PROFILE_LINKED) {
                    let profileOffset = reader.getUInt32();
                    let profileSize = reader.getInt32();
                    if (reader.getPosition() > headerOffset + profileOffset) {
                        directory.addError("Invalid profile data offset 0x" + parseInt((headerOffset + profileOffset.toString()))
                            .toString(16));
                        return;
                    }
                    reader.skip(headerOffset + profileOffset - reader.getPosition());
                    if (csType == ColorSpaceType.PROFILE_LINKED) {
                        directory.setString(BmpHeaderDirectory.TAG_LINKED_PROFILE, reader.getNullTerminatedString(profileSize, "Cp1252"));
                    }
                    else {
                        let randomAccessReader = new ByteArrayReader(reader.getBytes(profileSize));
                        new IccReader().extract(randomAccessReader, metadata, directory);
                    }
                }
                else {
                    reader.skip(4 + // Skip ProfileData offset
                        4 + // Skip ProfileSize
                        4 // Skip Reserved
                    );
                }
            }
            else {
                directory.addError("Unexpected DIB header size: " + headerSize);
            }
        }
        catch (e) {
            directory.addError("Unable to read BMP header");
        }
    }
    protected addError(errorMessage: string, metadata: Metadata) {
        let directory = metadata.getFirstDirectoryOfType(new ErrorDirectory());
        if (directory == null) {
            metadata.addDirectory(new ErrorDirectory(errorMessage));
        }
        else {
            directory.addError(errorMessage);
        }
    }
}
