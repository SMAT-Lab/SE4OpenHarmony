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
import PngChunkType from './PngChunkType';
import PngChunk from './PngChunk';
import PngHeader from './PngHeader';
import PngChunkReader from './PngChunkReader';
import PngChromaticities from './PngChromaticities';
import IccReader from '../../metadata/icc/IccReader';
import Metadata from '../../metadata/Metadata';
import PngDirectory from '../../metadata/png/PngDirectory';
import PngChromaticitiesDirectory from '../../metadata/png/PngChromaticitiesDirectory';
import ExifTiffHandler from '../../metadata/exif/ExifTiffHandler';
import XmpReader from '../../metadata/xmp/XmpReader';
import StringValue from '../../metadata/StringValue';
import FileSystemMetadataReader from '../../metadata/file/FileSystemMetadataReader';
import ByteConvert from '../../lang/ByteConvert';
import DateUtil from '../../lang/DateUtil';
import KeyValuePair from '../../lang/KeyValuePair';
import StreamReader from '../../lang/StreamReader';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import RandomAccessStreamReader from '../../lang/RandomAccessStreamReader';
import TiffReader from '../tiff/TiffReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
class PngMetadataReader {
    private static _latin1Encoding: string = "ISO_8859_1";
    public static readonly desiredChunkTypes: Set<PngChunkType> = new Set<PngChunkType>()
        .add(PngChunkType.IHDR)
        .add(PngChunkType.PLTE)
        .add(PngChunkType.tRNS)
        .add(PngChunkType.cHRM)
        .add(PngChunkType.sRGB)
        .add(PngChunkType.gAMA)
        .add(PngChunkType.iCCP)
        .add(PngChunkType.bKGD)
        .add(PngChunkType.tEXt)
        .add(PngChunkType.zTXt)
        .add(PngChunkType.iTXt)
        .add(PngChunkType.tIME)
        .add(PngChunkType.pHYs)
        .add(PngChunkType.sBIT)
        .add(PngChunkType.eXIf);
    public static _desiredChunkTypes: Set<PngChunkType> = PngMetadataReader.desiredChunkTypes;
    public static readMetadata(filePath: string): Metadata {
        // let stream= fileio.createStreamSync(filePath,"r+");
        let metadata = new Metadata();
        try {
            let chunks = new PngChunkReader().extract(new StreamReader(filePath), PngMetadataReader._desiredChunkTypes);
            chunks.forEach((value, index, array) => {
                PngMetadataReader.processChunk(metadata, value);
            });
        }
        catch (error) {
            console.info("PngMetadataReader processChunk error:" + error);
        }
        // finally{
        //   stream.closeSync()
        // }
        new FileSystemMetadataReader().read(filePath, metadata);
        return metadata;
    }
    private static processChunk(metadata: Metadata, chunk: PngChunk): void {
        let chunkType: PngChunkType = chunk.getType();
        let bytes: Int8Array = chunk.getBytes();
        if (chunkType.getIdentifier() == PngChunkType.IHDR.getIdentifier()) {
            let header: PngHeader = new PngHeader(bytes);
            let directory: PngDirectory = new PngDirectory(PngChunkType.IHDR);
            directory.setInt(PngDirectory.TAG_IMAGE_WIDTH, header.getImageWidth());
            directory.setInt(PngDirectory.TAG_IMAGE_HEIGHT, header.getImageHeight());
            directory.setInt(PngDirectory.TAG_BITS_PER_SAMPLE, header.getBitsPerSample());
            directory.setInt(PngDirectory.TAG_COLOR_TYPE, header.getColorType().getNumericValue());
            directory.setInt(PngDirectory.TAG_COMPRESSION_TYPE, header.getCompressionType() & 0xFF); // make sure it's unsigned
            directory.setInt(PngDirectory.TAG_FILTER_METHOD, header.getFilterMethod());
            directory.setInt(PngDirectory.TAG_INTERLACE_METHOD, header.getInterlaceMethod());
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.PLTE.getIdentifier()) {
            let directory: PngDirectory = new PngDirectory(PngChunkType.PLTE);
            directory.setInt(PngDirectory.TAG_PALETTE_SIZE, bytes.length / 3);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.tRNS.getIdentifier()) {
            let directory: PngDirectory = new PngDirectory(PngChunkType.tRNS);
            directory.setInt(PngDirectory.TAG_PALETTE_HAS_TRANSPARENCY, 1);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.sRGB.getIdentifier()) {
            let srgbRenderingIntent: number = bytes[0];
            let directory: PngDirectory = new PngDirectory(PngChunkType.sRGB);
            directory.setInt(PngDirectory.TAG_SRGB_RENDERING_INTENT, srgbRenderingIntent);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.cHRM.getIdentifier()) {
            let chromaticities: PngChromaticities = new PngChromaticities(bytes);
            let directory: PngChromaticitiesDirectory = new PngChromaticitiesDirectory();
            directory.setInt(PngChromaticitiesDirectory.TAG_WHITE_POINT_X, chromaticities.getWhitePointX());
            directory.setInt(PngChromaticitiesDirectory.TAG_WHITE_POINT_Y, chromaticities.getWhitePointY());
            directory.setInt(PngChromaticitiesDirectory.TAG_RED_X, chromaticities.getRedX());
            directory.setInt(PngChromaticitiesDirectory.TAG_RED_Y, chromaticities.getRedY());
            directory.setInt(PngChromaticitiesDirectory.TAG_GREEN_X, chromaticities.getGreenX());
            directory.setInt(PngChromaticitiesDirectory.TAG_GREEN_Y, chromaticities.getGreenY());
            directory.setInt(PngChromaticitiesDirectory.TAG_BLUE_X, chromaticities.getBlueX());
            directory.setInt(PngChromaticitiesDirectory.TAG_BLUE_Y, chromaticities.getBlueY());
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.gAMA.getIdentifier()) {
            let gammaInt: number = ByteConvert.toInt32BigEndian(bytes);
            new SequentialByteArrayReader(bytes).getInt32();
            let directory: PngDirectory = new PngDirectory(PngChunkType.gAMA);
            directory.setDouble(PngDirectory.TAG_GAMMA, gammaInt / 100000.0);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.iCCP.getIdentifier()) {
            let reader: SequentialReader = new SequentialByteArrayReader(bytes);
            // Profile Name is 1-79 bytes, followed by the 1 byte null character
            let profileNameBytes: Int8Array = reader.getNullTerminatedBytes(79 + 1);
            let directory: PngDirectory = new PngDirectory(PngChunkType.iCCP);
            directory.setStringValue(PngDirectory.TAG_ICC_PROFILE_NAME, new StringValue(profileNameBytes, PngMetadataReader._latin1Encoding));
            let compressionMethod: number = reader.getInt8();
            // Only compression method allowed by the spec is zero: deflate
            if (compressionMethod == 0) {
                // bytes left for compressed text is:
                // total bytes length - (profilenamebytes length + null byte + compression method byte)
                let bytesLeft: number = bytes.length - (profileNameBytes.length + 1 + 1);
                let compressedProfile: Int8Array = reader.getBytes(bytesLeft);
                try {
                    new IccReader().extract(new RandomAccessStreamReader(compressedProfile.toString()), metadata, directory);
                }
                catch (error) {
                    directory.addError("Exception decompressing PNG iCCP chunk : %s" + error);
                    metadata.addDirectory(directory);
                }
            }
            else {
                directory.addError("Invalid compression method value");
            }
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.bKGD.getIdentifier()) {
            let directory: PngDirectory = new PngDirectory(PngChunkType.bKGD);
            directory.setByteArray(PngDirectory.TAG_BACKGROUND_COLOR, bytes);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.tEXt.getIdentifier()) {
            let reader: SequentialReader = new SequentialByteArrayReader(bytes);
            // Keyword is 1-79 bytes, followed by the 1 byte null character
            let keywordsv: StringValue = reader.getNullTerminatedStringValue(79 + 1, PngMetadataReader._latin1Encoding);
            let keyword: string = keywordsv.toString();
            // bytes left for text is:
            // total bytes length - (Keyword length + null byte)
            let bytesLeft: number = bytes.length - (keywordsv.getBytes().length + 1);
            let value: StringValue = reader.getNullTerminatedStringValue(bytesLeft, PngMetadataReader._latin1Encoding);
            let textPairs: Set<KeyValuePair> = new Set<KeyValuePair>();
            textPairs.add(new KeyValuePair(keyword, value));
            let directory: PngDirectory = new PngDirectory(PngChunkType.tEXt);
            directory.setObject(PngDirectory.TAG_TEXTUAL_DATA, textPairs);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.zTXt.getIdentifier()) {
            let reader: SequentialReader = new SequentialByteArrayReader(bytes);
            // Keyword is 1-79 bytes, followed by the 1 byte null character
            let keywordsv: StringValue = reader.getNullTerminatedStringValue(79 + 1, PngMetadataReader._latin1Encoding);
            let keyword: string = keywordsv.toString();
            let compressionMethod: number = reader.getInt8();
            // bytes left for compressed text is:
            // total bytes length - (Keyword length + null byte + compression method byte)
            let bytesLeft: number = bytes.length - (keywordsv.getBytes().length + 1 + 1);
            let textBytes: Int8Array = null;
            if (compressionMethod == 0) {
                try {
                    //textBytes = StreamUtil.readAllBytes(new InflaterInputStream(new ByteArrayInputStream(bytes, bytes.length - bytesLeft, bytesLeft)));
                }
                catch (error) {
                    let directory: PngDirectory = new PngDirectory(PngChunkType.zTXt);
                    directory.addError("Exception decompressing PNG zTXt chunk with keyword " + keyword + ": " + error);
                    metadata.addDirectory(directory);
                }
            }
            else {
                let directory: PngDirectory = new PngDirectory(PngChunkType.zTXt);
                directory.addError("Invalid compression method value");
                metadata.addDirectory(directory);
            }
            if (textBytes != null) {
                if (keyword == "XML:com.adobe.xmp") {
                    // NOTE in testing images, the XMP has parsed successfully, but we are not extracting tags from it as necessary
                    new XmpReader().extract(textBytes, 0, textBytes.length, metadata, null);
                }
                else {
                    let textPairs: Set<KeyValuePair> = new Set<KeyValuePair>();
                    textPairs.add(new KeyValuePair(keyword, new StringValue(textBytes, PngMetadataReader._latin1Encoding)));
                    let directory: PngDirectory = new PngDirectory(PngChunkType.zTXt);
                    directory.setObject(PngDirectory.TAG_TEXTUAL_DATA, textPairs);
                    metadata.addDirectory(directory);
                }
            }
        }
        else if (chunkType.getIdentifier() == PngChunkType.iTXt.getIdentifier()) {
            let reader: SequentialReader = new SequentialByteArrayReader(bytes);
            // Keyword is 1-79 bytes, followed by the 1 byte null character
            let keywordsv: StringValue = reader.getNullTerminatedStringValue(79 + 1, PngMetadataReader._latin1Encoding);
            let keyword: string = keywordsv.toString();
            let compressionFlag: number = reader.getInt8();
            let compressionMethod: number = reader.getInt8();
            // TODO we currently ignore languageTagBytes and translatedKeywordBytes
            let languageTagBytes: Int8Array = reader.getNullTerminatedBytes(bytes.length);
            let translatedKeywordBytes: Int8Array = reader.getNullTerminatedBytes(bytes.length);
            // bytes left for compressed text is:
            // total bytes length - (Keyword length + null byte + comp flag byte + comp method byte + lang length + null byte + translated length + null byte)
            let bytesLeft: number = bytes.length - (keywordsv.getBytes()
                .length + 1 + 1 + 1 + languageTagBytes.length + 1 + translatedKeywordBytes.length + 1);
            let textBytes: Int8Array = null;
            if (compressionFlag == 0) {
                textBytes = reader.getNullTerminatedBytes(bytesLeft);
            }
            else if (compressionFlag == 1) {
                if (compressionMethod == 0) {
                    try {
                        //textBytes = StreamUtil.readAllBytes(new InflaterInputStream(new ByteArrayInputStream(bytes, bytes.length - bytesLeft, bytesLeft)));
                    }
                    catch (error) {
                        let directory: PngDirectory = new PngDirectory(PngChunkType.iTXt);
                        directory.addError("Exception decompressing PNG iTXt chunk with keyword \"" + keyword + "\": " + error);
                        metadata.addDirectory(directory);
                    }
                }
                else {
                    let directory: PngDirectory = new PngDirectory(PngChunkType.iTXt);
                    directory.addError("Invalid compression method value");
                    metadata.addDirectory(directory);
                }
            }
            else {
                let directory: PngDirectory = new PngDirectory(PngChunkType.iTXt);
                directory.addError("Invalid compression flag value");
                metadata.addDirectory(directory);
            }
            if (textBytes != null) {
                if (keyword == "XML:com.adobe.xmp") {
                    // NOTE in testing images, the XMP has parsed successfully, but we are not extracting tags from it as necessary
                    new XmpReader().extract(textBytes, 0, textBytes.length, metadata, null);
                }
                else {
                    let textPairs: Set<KeyValuePair> = new Set<KeyValuePair>();
                    textPairs.add(new KeyValuePair(keyword, new StringValue(textBytes, PngMetadataReader._latin1Encoding)));
                    let directory: PngDirectory = new PngDirectory(PngChunkType.iTXt);
                    directory.setObject(PngDirectory.TAG_TEXTUAL_DATA, textPairs);
                    metadata.addDirectory(directory);
                }
            }
        }
        else if (chunkType.getIdentifier() == PngChunkType.tIME.getIdentifier()) {
            let reader: SequentialByteArrayReader = new SequentialByteArrayReader(bytes);
            let year: number = reader.getUInt16();
            let month: number = reader.getUInt8();
            let day: number = reader.getUInt8();
            let hour: number = reader.getUInt8();
            let minute: number = reader.getUInt8();
            let second: number = reader.getUInt8();
            let directory: PngDirectory = new PngDirectory(PngChunkType.tIME);
            if (DateUtil.isValidDate(year, month - 1, day) && DateUtil.isValidTime(hour, minute, second)) {
                let dateString: string = year.toFixed(4) + ":" + month.toFixed(2) + ":" + day.toFixed(2) + " " +
                    +hour.toFixed(2) + ":" + minute.toFixed(2) + ":" + second.toFixed(2);
                directory.setString(PngDirectory.TAG_LAST_MODIFICATION_TIME, dateString);
            }
            else {
                directory.addError("PNG tIME data describes an invalid date/time: year=" + year + " month=" + month +
                    " day=" + day + " hour=" + hour + " minute=" + minute + " second=" + second);
            }
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.pHYs.getIdentifier()) {
            let reader: SequentialByteArrayReader = new SequentialByteArrayReader(bytes);
            let pixelsPerUnitX: number = reader.getInt32();
            let pixelsPerUnitY: number = reader.getInt32();
            let unitSpecifier: number = reader.getInt8();
            let directory: PngDirectory = new PngDirectory(PngChunkType.pHYs);
            directory.setInt(PngDirectory.TAG_PIXELS_PER_UNIT_X, pixelsPerUnitX);
            directory.setInt(PngDirectory.TAG_PIXELS_PER_UNIT_Y, pixelsPerUnitY);
            directory.setInt(PngDirectory.TAG_UNIT_SPECIFIER, unitSpecifier);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.sBIT.getIdentifier()) {
            let directory: PngDirectory = new PngDirectory(PngChunkType.sBIT);
            directory.setByteArray(PngDirectory.TAG_SIGNIFICANT_BITS, bytes);
            metadata.addDirectory(directory);
        }
        else if (chunkType.getIdentifier() == PngChunkType.eXIf.getIdentifier()) {
            try {
                let handler: ExifTiffHandler = new ExifTiffHandler(metadata, null);
                new TiffReader().processTiff(new ByteArrayReader(bytes), handler, 0);
            }
            catch (error) {
                let directory: PngDirectory = new PngDirectory(PngChunkType.eXIf);
                directory.addError(error);
                metadata.addDirectory(directory);
            }
        }
    }
}
export default PngMetadataReader;
