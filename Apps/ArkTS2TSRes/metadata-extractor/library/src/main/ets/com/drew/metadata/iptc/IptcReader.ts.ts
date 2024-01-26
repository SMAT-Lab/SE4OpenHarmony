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
import StringValue from '../StringValue';
import { Iso2022Converter } from './Iso2022Converter';
import { IptcDirectory } from './IptcDirectory';
import Directory from '../Directory';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import Metadata from '../Metadata';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
export class IptcReader implements JpegSegmentMetadataReader {
    private static IptcMarkerByte = 0x1c;
    public getSegmentTypes(): Set<JpegSegmentType> {
        let segmentType = new Set<JpegSegmentType>();
        segmentType.add(JpegSegmentType.APPD);
        return segmentType;
    }
    public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        for (let segmentBytes of segments) {
            // Ensure data starts with the IPTC marker byte
            if (segmentBytes.length != 0 && segmentBytes[0] == IptcReader.IptcMarkerByte) {
                this.extract(new SequentialByteArrayReader(segmentBytes), metadata, segmentBytes.length);
            }
        }
    }
    public extract(reader: SequentialReader, metadata: Metadata, length: number, parentDirectory?: Directory) {
        let directory = new IptcDirectory();
        metadata.addDirectory(directory);
        if (parentDirectory != null)
            directory.setParent(parentDirectory);
        let offset = 0;
        while (offset < length) {
            // identifies start of a tag
            let startByte;
            try {
                startByte = reader.getUInt8();
                offset++;
            }
            catch (e) {
                directory.addError("Unable to read starting byte of IPTC tag");
                return;
            }
            if (startByte != IptcReader.IptcMarkerByte) {
                // NOTE have seen images where there was one extra byte at the end, giving
                // offset==length at this point, which is not worth logging as an error.
                if (offset != length)
                    directory.addError("Invalid IPTC tag marker at offset " + (offset - 1) + ". Expected '0x" + IptcReader.IptcMarkerByte.toString(16) + "' but got '0x" + parseInt(startByte, 16) + "'.");
                return;
            }
            // we need at least four bytes left to read a tag
            if (offset + 4 > length) {
                directory.addError("Too few bytes remain for a valid IPTC tag");
                return;
            }
            let directoryType;
            let tagType;
            let tagByteCount;
            try {
                directoryType = reader.getUInt8();
                tagType = reader.getUInt8();
                tagByteCount = reader.getUInt16();
                if (tagByteCount > 32767) {
                    // Extended DataSet Tag (see 1.5(c), p14, IPTC-IIMV4.2.pdf)
                    tagByteCount = ((tagByteCount & 0x7FFF) << 16) | reader.getUInt16();
                    offset += 2;
                }
                offset += 4;
            }
            catch (e) {
                directory.addError("IPTC data segment ended mid-way through tag descriptor");
                return;
            }
            if (offset + tagByteCount > length) {
                directory.addError("Data for tag extends beyond end of IPTC segment");
                return;
            }
            try {
                this.processTag(reader, directory, directoryType, tagType, tagByteCount);
            }
            catch (e) {
                directory.addError("Error processing IPTC tag");
                return;
            }
            offset += tagByteCount;
        }
    }
    private processTag(reader: SequentialReader, directory: Directory, directoryType: number, tagType: number, tagByteCount: number) {
        let tagIdentifier = tagType | (directoryType << 8);
        if (tagByteCount == 0) {
            directory.setString(tagIdentifier, "");
            return;
        }
        switch (tagIdentifier) {
            case IptcDirectory.TAG_CODED_CHARACTER_SET:
                let bytes = reader.getBytes(tagByteCount);
                let tem: number[] = [];
                bytes.forEach((value, index, array) => {
                    tem[index] = value;
                });
                let charsetName: string = Iso2022Converter.convertISO2022CharsetToJavaCharset(tem);
                if (charsetName == null) {
                    // Unable to determine the charset, so fall through and treat tag as a regular string
                    charsetName = this.byteToString(bytes);
                }
                directory.setString(tagIdentifier, charsetName);
                return;
            case IptcDirectory.TAG_ENVELOPE_RECORD_VERSION:
            case IptcDirectory.TAG_APPLICATION_RECORD_VERSION:
            case IptcDirectory.TAG_FILE_VERSION:
            case IptcDirectory.TAG_ARM_VERSION:
            case IptcDirectory.TAG_PROGRAM_VERSION:
                // short
                if (tagByteCount >= 2) {
                    let shortValue = reader.getUInt16();
                    reader.skip(tagByteCount - 2);
                    directory.setInt(tagIdentifier, shortValue);
                    return;
                }
                break;
            case IptcDirectory.TAG_URGENCY:
                // byte
                directory.setInt(tagIdentifier, reader.getUInt8());
                reader.skip(tagByteCount - 1);
                return;
            default:
            // fall through
        }
        // If we haven't returned yet, treat it as a string
        // NOTE that there's a chance we've already loaded the value as a string above, but failed to parse the value
        let charSetName = directory.getString(IptcDirectory.TAG_CODED_CHARACTER_SET);
        let charset = null;
        try {
            if (charSetName != null)
                charset = charSetName;
        }
        catch (ignored) {
        }
        let string;
        if (charSetName != null) {
            string = reader.getStringValue(tagByteCount, charset);
        }
        else {
            let bytes: Int8Array = reader.getBytes(tagByteCount);
            let tem: number[] = [];
            bytes.forEach((value, index, array) => {
                tem[index] = value;
            });
            let charSet = Iso2022Converter.guessCharSet(tem);
            string = charSet != null ? new StringValue(bytes, charSet) : new StringValue(bytes, null);
        }
        if (directory.containsTag(tagIdentifier)) {
            // this fancy StringValue[] business avoids using an ArrayList for performance reasons
            let oldStrings = directory.getStringValueArray(tagIdentifier);
            let newStrings: StringValue[];
            if (oldStrings == null) {
                // TODO hitting this block means any prior value(s) are discarded
                newStrings = new StringValue[1];
            }
            else {
                newStrings = new StringValue[oldStrings.length + 1];
                for (var index = 0; index < newStrings.length; index++) {
                    const element = newStrings[index];
                    newStrings[index] = element;
                }
            }
            newStrings[newStrings.length - 1] = string;
            directory.setStringValueArray(tagIdentifier, newStrings);
        }
        else {
            directory.setStringValue(tagIdentifier, string);
        }
    }
    private byteToString(byte): string {
        if (typeof byte === 'string') {
            return byte;
        }
        var str = '', _arr = byte;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            }
            else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }
}
