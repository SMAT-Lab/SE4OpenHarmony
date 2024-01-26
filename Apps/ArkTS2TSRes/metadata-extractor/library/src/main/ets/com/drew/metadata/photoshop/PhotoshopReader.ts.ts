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
import PhotoshopDirectory from './PhotoshopDirectory';
import ImageProcessingException from '../../imaging/ImageProcessingException';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import Metadata from '../Metadata';
import ExifReader from '../exif/ExifReader';
import IccReader from '../icc/IccReader';
import { IptcReader } from '../iptc/IptcReader';
import XmpReader from '../xmp/XmpReader';
import Directory from '../Directory';
class PhotoshopReader implements JpegSegmentMetadataReader {
    private static JPEG_SEGMENT_PREAMBLE = "Photoshop 3.0";
    public getSegmentTypes(): Set<JpegSegmentType> {
        let setJpegSegmentType = new Set();
        setJpegSegmentType.add(JpegSegmentType.APPD);
        return setJpegSegmentType as Set<JpegSegmentType>;
    }
    public readJpegSegments(segments, metadata, segmentType): void {
        let preambleLength = PhotoshopReader.JPEG_SEGMENT_PREAMBLE.length;
        segments.forEach((segmentBytes) => {
            // Ensure data starts with the necessary preamble
            if (segmentBytes.length < preambleLength + 1 || !(PhotoshopReader.JPEG_SEGMENT_PREAMBLE == segmentBytes.slice(0, preambleLength))) {
            }
            this.extract(new SequentialByteArrayReader(segmentBytes, preambleLength + 1), segmentBytes.length - preambleLength - 1, metadata, null);
        });
    }
    public extract(reader: SequentialReader, length: number, metadata: Metadata, parentDirectory?: Directory) {
        let directory: PhotoshopDirectory = new PhotoshopDirectory();
        metadata.addDirectory(directory);
        if (parentDirectory != null) {
            directory.setParent(parentDirectory);
        }
        let pos = 0;
        let clippingPathCount = 0;
        while (pos < length) {
            try {
                // 4 bytes for the signature ("8BIM", "PHUT", etc.)
                let signature = reader.getString(4);
                pos += 4;
                // 2 bytes for the resource identifier (tag type).
                let tagType = reader.getUInt16(); // segment type
                pos += 2;
                // A variable number of bytes holding a pascal string (two leading bytes for length).
                let descriptionLength = reader.getUInt8();
                pos += 1;
                // Some basic bounds checking
                if (descriptionLength < 0 || descriptionLength + pos > length) {
                    throw new ImageProcessingException("Invalid string length");
                }
                // Get name (important for paths)
                var description: string = '';
                descriptionLength += pos;
                // Loop through each byte and append to string
                while (pos < descriptionLength) {
                    description.concat(reader.getUInt8().toString());
                    pos++;
                }
                // The number of bytes is padded with a trailing zero, if needed, to make the size even.
                if (pos % 2 != 0) {
                    reader.skip(1);
                    pos++;
                }
                // 4 bytes for the size of the resource data that follows.
                let byteCount = reader.getInt32();
                pos += 4;
                // The resource data.
                let tagBytes: Int8Array = reader.getBytes(byteCount);
                pos += byteCount;
                // The number of bytes is padded with a trailing zero, if needed, to make the size even.
                if (pos % 2 != 0) {
                    reader.skip(1);
                    pos++;
                }
                if (signature == "8BIM") {
                    if (tagType == PhotoshopDirectory.TAG_IPTC) {
                        new IptcReader().extract(new SequentialByteArrayReader(tagBytes), metadata, tagBytes.length, directory);
                    }
                    else if (tagType == PhotoshopDirectory.TAG_ICC_PROFILE_BYTES) {
                        new IccReader().extract(new ByteArrayReader(tagBytes), metadata, directory);
                    }
                    else if (tagType == PhotoshopDirectory.TAG_EXIF_DATA_1 || tagType == PhotoshopDirectory.TAG_EXIF_DATA_3) {
                        new ExifReader().extract(new ByteArrayReader(tagBytes), metadata, 0, directory);
                    }
                    else if (tagType == PhotoshopDirectory.TAG_XMP_DATA) {
                        new XmpReader().extract(tagBytes, null, null, metadata, directory);
                    }
                    else if (tagType >= 0x07D0 && tagType <= 0x0BB6) {
                        clippingPathCount++;
                        PhotoshopDirectory._tagNameMap.set(0x07CF + clippingPathCount, "Path Info " + clippingPathCount.toString());
                        directory.setByteArray(0x07CF + clippingPathCount, tagBytes);
                    }
                    else {
                        directory.setByteArray(tagType, tagBytes);
                    }
                    if (tagType >= 0x0fa0 && tagType <= 0x1387) {
                        PhotoshopDirectory._tagNameMap.set(tagType, "Plug-in " + parseInt((tagType - 0x0fa0 + 1).toString()).toString() + " Data");
                    }
                }
            }
            catch (e) {
                directory.addError(e.getMessage());
                return;
            }
        }
    }
}
export default PhotoshopReader;
