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
import JpegCommentDirectory from './JpegCommentDirectory';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import Metadata from '../Metadata';
import StringValue from '../StringValue';
class JpegCommentReader implements JpegSegmentMetadataReader {
    public getSegmentTypes(): Set<JpegSegmentType> {
        return new Set([JpegSegmentType.COM]);
    }
    public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        for (let segmentBytes of segments) {
            let directory: JpegCommentDirectory = new JpegCommentDirectory();
            metadata.addDirectory(directory);
            // The entire contents of the directory are the comment
            directory.setStringValue(JpegCommentDirectory.TAG_COMMENT, new StringValue(segmentBytes, null));
        }
    }
}
export default JpegCommentReader;
