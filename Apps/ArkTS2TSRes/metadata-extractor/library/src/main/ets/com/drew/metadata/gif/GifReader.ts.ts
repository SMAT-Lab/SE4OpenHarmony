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
import fileio from '@ohos.fileio';
import SequentialReader from '../../lang/SequentialReader';
import Metadata from '../Metadata';
import GifHeaderDirectory from './GifHeaderDirectory';
import Directory from '../Directory';
import GifCommentDirectory from './GifCommentDirectory';
import StringValue from '../StringValue';
import GifAnimationDirectory from './GifAnimationDirectory';
import GifControlDirectory from './GifControlDirectory';
import GifImageDirectory from './GifImageDirectory';
import ByteArrayReader from '../../lang/ByteArrayReader';
import ErrorDirectory from '../ErrorDirectory';
class GifReader {
    private static readonly GIF_87A_VERSION_IDENTIFIER: string = "87a";
    private static readonly GIF_89A_VERSION_IDENTIFIER: string = "89a";
    public extract(reader: SequentialReader, metadata: Metadata): void {
        reader.setMotorolaByteOrder(false);
        let header: GifHeaderDirectory;
        try {
            header = GifReader.readGifHeader(reader);
            metadata.addDirectory(header);
        }
        catch (error) {
            metadata.addDirectory(error);
            return;
        }
        if (header.hasErrors()) {
            return;
        }
        try {
            // Skip over any global colour table if GlobalColorTable is present.
            let globalColorTableSize: number = null;
            let hasGlobalColorTable: boolean = header.getBoolean(GifHeaderDirectory.TAG_HAS_GLOBAL_COLOR_TABLE);
            if (hasGlobalColorTable) {
                globalColorTableSize = header.getInteger(GifHeaderDirectory.TAG_COLOR_TABLE_SIZE);
            }
            if (globalColorTableSize != null) {
                // Colour table has R/G/B byte triplets
                reader.skip(3 * globalColorTableSize);
            }
            // After the header comes a sequence of blocks
            while (true) {
                let marker: String = new String(reader.getInt8());
                switch (marker) {
                    case '!':
                        {
                            GifReader.readGifExtensionBlock(reader, metadata);
                            break;
                        }
                    case ',':
                        {
                            metadata.addDirectory(GifReader.readImageBlock(reader));
                            // skip image data blocks
                            GifReader.skipBlocks(reader);
                            break;
                        }
                    case ';':
                        {
                            // terminator
                            return;
                        }
                    default:
                        {
                            // Anything other than these types is unexpected.
                            // GIF87a spec says to keep reading until a separator is found.
                            // GIF89a spec says file is corrupt.
                            metadata.addDirectory(new ErrorDirectory("Unknown gif block marker found."));
                            return;
                        }
                }
            }
        }
        catch (error) {
            metadata.addDirectory(new ErrorDirectory("IOException processing GIF data"));
        }
    }
    public static readGifHeader(reader: SequentialReader): GifHeaderDirectory {
        // FILE HEADER
        //
        // 3 - signature: "GIF"
        // 3 - version: either "87a" or "89a"
        //
        // LOGICAL SCREEN DESCRIPTOR
        //
        // 2 - pixel width
        // 2 - pixel height
        // 1 - screen and color map information flags (0 is LSB)
        //       0-2  Size of the global color table
        //       3    Color table sort flag (89a only)
        //       4-6  Color resolution
        //       7    Global color table flag
        // 1 - background color index
        // 1 - pixel aspect ratio
        let headerDirectory: GifHeaderDirectory = new GifHeaderDirectory();
        let signature: string = reader.getString(3);
        if ("GIF" != signature) {
            headerDirectory.addError("Invalid GIF file signature");
            return headerDirectory;
        }
        let version: string = reader.getString(3);
        if (GifReader.GIF_87A_VERSION_IDENTIFIER != version && GifReader.GIF_89A_VERSION_IDENTIFIER != version) {
            headerDirectory.addError("Unexpected GIF version");
            return headerDirectory;
        }
        headerDirectory.setString(GifHeaderDirectory.TAG_GIF_FORMAT_VERSION, version);
        // LOGICAL SCREEN DESCRIPTOR
        headerDirectory.setInt(GifHeaderDirectory.TAG_IMAGE_WIDTH, reader.getUInt16());
        headerDirectory.setInt(GifHeaderDirectory.TAG_IMAGE_HEIGHT, reader.getUInt16());
        let flags: number = reader.getUInt8();
        // First three bits = (BPP - 1)
        let colorTableSize: number = 1 << ((flags & 7) + 1);
        let bitsPerPixel: number = ((flags & 0x70) >> 4) + 1;
        let hasGlobalColorTable: boolean = (flags >> 7) != 0;
        headerDirectory.setInt(GifHeaderDirectory.TAG_COLOR_TABLE_SIZE, colorTableSize);
        if (GifReader.GIF_89A_VERSION_IDENTIFIER == version) {
            let isColorTableSorted: boolean = (flags & 8) != 0;
            headerDirectory.setBoolean(GifHeaderDirectory.TAG_IS_COLOR_TABLE_SORTED, isColorTableSorted);
        }
        headerDirectory.setInt(GifHeaderDirectory.TAG_BITS_PER_PIXEL, bitsPerPixel);
        headerDirectory.setBoolean(GifHeaderDirectory.TAG_HAS_GLOBAL_COLOR_TABLE, hasGlobalColorTable);
        headerDirectory.setInt(GifHeaderDirectory.TAG_BACKGROUND_COLOR_INDEX, reader.getUInt8());
        let aspectRatioByte: number = reader.getUInt8();
        if (aspectRatioByte != 0) {
            let pixelAspectRatio: number = ((aspectRatioByte + 15) / 64);
            headerDirectory.setFloat(GifHeaderDirectory.TAG_PIXEL_ASPECT_RATIO, pixelAspectRatio);
        }
        return headerDirectory;
    }
    private static readGifExtensionBlock(reader: SequentialReader, metadata: Metadata): void {
        let extensionLabel: number = reader.getInt8();
        let blockSizeBytes: number = reader.getUInt8();
        let blockStartPos: number = reader.getPosition();
        switch (extensionLabel) {
            case 0x01:
                let plainTextBlock: Directory = GifReader.readPlainTextBlock(reader, blockSizeBytes);
                if (plainTextBlock != null)
                    metadata.addDirectory(plainTextBlock);
                break;
            case 0xf9:
                metadata.addDirectory(GifReader.readControlBlock(reader));
                break;
            case 0xfe:
                metadata.addDirectory(GifReader.readCommentBlock(reader, blockSizeBytes));
                break;
            case 0xff:
                GifReader.readApplicationExtensionBlock(reader, blockSizeBytes, metadata);
                break;
            default:
                metadata.addDirectory(new ErrorDirectory("Unsupported GIF extension block with type 0x" + extensionLabel + "."));
                break;
        }
        let skipCount: number = blockStartPos + blockSizeBytes - reader.getPosition();
        if (skipCount > 0) {
            reader.skip(skipCount);
        }
    }
    private static readPlainTextBlock(reader: SequentialReader, blockSizeBytes: number): Directory {
        // It seems this extension is deprecated. If somebody finds an image with this in it, could implement here.
        // Just skip the entire block for now.
        if (blockSizeBytes != 12) {
            return new ErrorDirectory("Invalid GIF plain text block size. Expected 12, got " + blockSizeBytes + ".");
        }
        // skip 'blockSizeBytes' bytes
        reader.skip(12);
        // keep reading and skipping until a 0 byte is reached
        GifReader.skipBlocks(reader);
        return null;
    }
    private static readCommentBlock(reader: SequentialReader, blockSizeBytes: number): GifCommentDirectory {
        let buffer: Int8Array = GifReader.gatherBytesWithFirstLength(reader, blockSizeBytes);
        return new GifCommentDirectory(new StringValue(buffer, "ASCII"));
    }
    private static readApplicationExtensionBlock(reader: SequentialReader, blockSizeBytes: number, metadata: Metadata): void {
        if (blockSizeBytes != 11) {
            metadata.addDirectory(new ErrorDirectory("Invalid GIF application extension block size. Expected 11, got " + blockSizeBytes + "."));
            return;
        }
        let extensionType: string = reader.getString(blockSizeBytes, "UTF_8");
        if (extensionType == "XMP DataXMP") {
            // XMP data extension
            let xmpBytes: Int8Array = GifReader.gatherBytes(reader);
            let xmpLengh: number = xmpBytes.length - 257; // Exclude the "magic trailer", see XMP Specification Part 3, 1.1.2 GIF
            if (xmpLengh > 0) {
                // Only extract valid blocks
                //new XmpReader().extract(xmpBytes, 0, xmpBytes.length - 257, metadata, null);
            }
        }
        else if (extensionType == "ICCRGBG1012") {
            // ICC profile extension
            let iccBytes: Int8Array = GifReader.gatherBytesWithFirstLength(reader, (reader.getByte()) & 0xff);
            if (iccBytes.length != 0) {
                //new IccReader().extract(new ByteArrayReader(iccBytes), metadata);
            }
        }
        else if (extensionType == "NETSCAPE2.0") {
            reader.skip(2);
            // Netscape's animated GIF extension
            // Iteration count (0 means infinite)
            let iterationCount: number = reader.getUInt16();
            // Skip terminator
            reader.skip(1);
            let animationDirectory: GifAnimationDirectory = new GifAnimationDirectory();
            animationDirectory.setInt(GifAnimationDirectory.TAG_ITERATION_COUNT, iterationCount);
            metadata.addDirectory(animationDirectory);
        }
        else {
            GifReader.skipBlocks(reader);
        }
    }
    private static readControlBlock(reader: SequentialReader): GifControlDirectory {
        let directory: GifControlDirectory = new GifControlDirectory();
        let packedFields: number = reader.getUInt8();
        directory.setObject(GifControlDirectory.TAG_DISPOSAL_METHOD, GifControlDirectory.typeOf((packedFields >> 2) & 7));
        directory.setBoolean(GifControlDirectory.TAG_USER_INPUT_FLAG, (packedFields & 2) >> 1 == 1);
        directory.setBoolean(GifControlDirectory.TAG_TRANSPARENT_COLOR_FLAG, (packedFields & 1) == 1);
        directory.setInt(GifControlDirectory.TAG_DELAY, reader.getUInt16());
        directory.setInt(GifControlDirectory.TAG_TRANSPARENT_COLOR_INDEX, reader.getUInt8());
        // skip 0x0 block terminator
        reader.skip(1);
        return directory;
    }
    private static readImageBlock(reader: SequentialReader): GifImageDirectory {
        let imageDirectory: GifImageDirectory = new GifImageDirectory();
        imageDirectory.setInt(GifImageDirectory.TAG_LEFT, reader.getUInt16());
        imageDirectory.setInt(GifImageDirectory.TAG_TOP, reader.getUInt16());
        imageDirectory.setInt(GifImageDirectory.TAG_WIDTH, reader.getUInt16());
        imageDirectory.setInt(GifImageDirectory.TAG_HEIGHT, reader.getUInt16());
        let flags: number = reader.getByte();
        let hasColorTable: boolean = (flags >> 7) != 0;
        let isInterlaced: boolean = (flags & 0x40) != 0;
        imageDirectory.setBoolean(GifImageDirectory.TAG_HAS_LOCAL_COLOUR_TABLE, hasColorTable);
        imageDirectory.setBoolean(GifImageDirectory.TAG_IS_INTERLACED, isInterlaced);
        if (hasColorTable) {
            let isColorTableSorted: boolean = (flags & 0x20) != 0;
            imageDirectory.setBoolean(GifImageDirectory.TAG_IS_COLOR_TABLE_SORTED, isColorTableSorted);
            let bitsPerPixel: number = (flags & 0x7) + 1;
            imageDirectory.setInt(GifImageDirectory.TAG_LOCAL_COLOUR_TABLE_BITS_PER_PIXEL, bitsPerPixel);
            // skip color table
            reader.skip(3 * (2 << (flags & 0x7)));
        }
        // skip "LZW Minimum Code Size" byte
        reader.getByte();
        return imageDirectory;
    }
    private static gatherBytes(reader: SequentialReader): Int8Array {
        let buffer = new ArrayBuffer(257);
        while (true) {
            let b: number = reader.getByte();
            if (b == 0) {
                return null;
            }
            let bInt: number = b & 0xFF;
            buffer[0] = b;
            reader.getBytes(bInt, buffer, 1);
            //bytes.write(buffer, 0, bInt + 1);
            fileio.write(1, buffer, { length: bInt + 1 });
        }
    }
    private static gatherBytesWithFirstLength(reader: SequentialReader, firstLength: number): Int8Array {
        let length: number = firstLength;
        let buffer = new ArrayBuffer(4096);
        while (length > 0) {
            //      fileio.write(reader.getBytes(length), buffer, { length: length });
            length = reader.getByte() & 0xff;
        }
        return new Int8Array(buffer);
    }
    private static skipBlocks(reader: SequentialReader): void {
        while (true) {
            let length: number = reader.getUInt8();
            if (length == 0) {
                return;
            }
            reader.skip(length);
        }
    }
}
export default GifReader;
