/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import JfxxDirectory from './JfxxDirectory';
import Metadata from '../Metadata';
import RandomAccessReader from '../../lang/RandomAccessReader';
import ByteArrayReader from '../../lang/ByteArrayReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import MetadataReader from '../MetadataReader';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
/**
 * Reader for JFXX (JFIF extensions) data, found in the APP0 JPEG segment.
 */
class JfxxReader implements JpegSegmentMetadataReader, MetadataReader {
    public static readonly PREAMBLE: string = "JFXX";
    public getSegmentTypes(): Set<JpegSegmentType> {
        let segmentType = new Set<JpegSegmentType>();
        segmentType.add(JpegSegmentType.APP0);
        return segmentType;
    }
    public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        for (let segmentBytes of segments) {
            // Skip segments not starting with the required header
            if (segmentBytes.length >= JfxxReader.PREAMBLE.length && JfxxReader.PREAMBLE == segmentBytes.subarray(0, JfxxReader.PREAMBLE.length)
                .toString())
                this.extract(new ByteArrayReader(segmentBytes), metadata);
        }
    }
    /**
     * Performs the JFXX data extraction, adding found values to the specified
     * instance of {@link Metadata}.
     */
    public extract(reader: RandomAccessReader, metadata: Metadata): void {
        let directory: JfxxDirectory = new JfxxDirectory();
        metadata.addDirectory(directory);
        try {
            // For JFXX, the tag number is also the offset into the segment
            directory.setInt(JfxxDirectory.TAG_EXTENSION_CODE, reader.getUInt8(JfxxDirectory.TAG_EXTENSION_CODE));
        }
        catch (me) {
            directory.addError(me.getMessage());
        }
    }
}
export default JfxxReader;
