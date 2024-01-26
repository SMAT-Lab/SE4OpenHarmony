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
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import Metadata from '../Metadata';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import AdobeJpegDirectory from './AdobeJpegDirectory';
import Directory from '../Directory';
export default class AdobeJpegReader implements JpegSegmentMetadataReader {
    public static readonly PREAMBLE: string = "Adobe";
    public getSegmentTypes(): Set<JpegSegmentType> {
        return new Set<JpegSegmentType>([JpegSegmentType.APPE]);
    }
    public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        segments.forEach((value1, value2, array) => {
            if (value1.length == 12 && (AdobeJpegReader.PREAMBLE.toLowerCase() == value1.subarray(0, AdobeJpegReader.PREAMBLE.length)
                .toString()))
                this.extract(new SequentialByteArrayReader(value1), metadata);
        });
    }
    public extract(reader: SequentialReader, metadata: Metadata): void {
        let directory = new AdobeJpegDirectory();
        metadata.addDirectory(directory);
        try {
            reader.setMotorolaByteOrder(false);
            if (reader.getString(AdobeJpegReader.PREAMBLE.length) != AdobeJpegReader.PREAMBLE) {
                directory.addError("Invalid Adobe JPEG data header.");
                return;
            }
            directory.setInt(AdobeJpegDirectory.TAG_DCT_ENCODE_VERSION, reader.getUInt16());
            directory.setInt(AdobeJpegDirectory.TAG_APP14_FLAGS0, reader.getUInt16());
            directory.setInt(AdobeJpegDirectory.TAG_APP14_FLAGS1, reader.getUInt16());
            directory.setInt(AdobeJpegDirectory.TAG_COLOR_TRANSFORM, reader.getInt8());
        }
        catch (err) {
            directory.addError("IO exception processing data: " + JSON.stringify(err));
        }
    }
}
