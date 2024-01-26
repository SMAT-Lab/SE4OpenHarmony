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
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import JpegDirectory from './JpegDirectory';
import Metadata from '../Metadata';
import ErrorDirectory from '../ErrorDirectory';
import SequentialReader from '../../lang/SequentialReader';
class JpegDnlReader implements JpegSegmentMetadataReader {
    public getSegmentTypes(): Set<JpegSegmentType> {
        return new Set([JpegSegmentType.DNL]);
    }
    public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        for (let segmentBytes of segments) {
            this.extract(segmentBytes, metadata, segmentType);
        }
    }
    public extract(segmentBytes: Int8Array, metadata: Metadata, segmentType: JpegSegmentType) {
        let directory = metadata.getFirstDirectoryOfType(new JpegDirectory());
        if (directory == null) {
            let errorDirectory: ErrorDirectory = new ErrorDirectory();
            metadata.addDirectory(errorDirectory);
            errorDirectory.addError("DNL segment found without SOFx - illegal JPEG format");
            return;
        }
        let reader: SequentialReader = new SequentialByteArrayReader(segmentBytes);
        try {
            // Only set height from DNL if it's not already defined
            let i: number = directory.getInteger(JpegDirectory.TAG_IMAGE_HEIGHT);
            if (i == null || i == 0) {
                directory.setInt(JpegDirectory.TAG_IMAGE_HEIGHT, reader.getUInt16());
            }
        }
        catch (ex) {
            directory.addError(ex.getMessage());
        }
    }
}
export default JpegDnlReader;
