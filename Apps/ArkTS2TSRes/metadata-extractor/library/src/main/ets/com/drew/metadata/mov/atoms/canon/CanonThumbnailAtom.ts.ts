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
import Atom from '../Atom';
import Directory from '../../../Directory';
import ExifDirectoryBase from '../../../exif/ExifDirectoryBase';
import ExifIFD0Directory from '../../../exif/ExifIFD0Directory';
import ExifReader from '../../../exif/ExifReader';
import JpegSegmentData from '../../../../imaging/jpeg/JpegSegmentData';
import JpegSegmentMetadataReader from '../../../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentReader from '../../../../imaging/jpeg/JpegSegmentReader';
import JpegSegmentType from '../../../../imaging/jpeg/JpegSegmentType';
import Metadata from '../../../Metadata';
import QuickTimeDirectory from '../../QuickTimeDirectory';
import SequentialReader from '../../../../lang/SequentialReader';
class CanonThumbnailAtom extends Atom {
    private dateTime: string;
    public constructor(reader: SequentialReader) {
        super(reader);
        this.readCNDA(reader);
    }
    /**
     * Canon Data Block (Exif/TIFF ThumbnailImage)
     */
    private readCNDA(reader: SequentialReader): void {
        if (this.type == "CNDA") {
            // From JpegMetadataReader
            let exifReader: JpegSegmentMetadataReader = new ExifReader();
            //      InputStream exifStream = new ByteArrayInputStream(reader.getBytes(this.size));
            let segmentTypes: Set<JpegSegmentType> = new Set<JpegSegmentType>();
            for (let segmentType of exifReader.getSegmentTypes()) {
                segmentTypes.add(segmentType);
            }
            let segmentData: JpegSegmentData;
            segmentData = JpegSegmentReader.readSegments(null, reader, segmentTypes);
            // TODO should we keep all extracted metadata here?
            let metadata: Metadata = new Metadata();
            for (let segmentType of exifReader.getSegmentTypes()) {
                exifReader.readJpegSegments(segmentData.getSegments(segmentType.byteValue), metadata, segmentType);
            }
            let directory: Directory = metadata.getFirstDirectoryOfType(new ExifIFD0Directory());
            if (directory != null) {
                for (let tag of directory.getTags()) {
                    if (tag.getTagType() == ExifDirectoryBase.TAG_DATETIME) {
                        this.dateTime = tag.getDescription();
                    }
                }
            }
        }
    }
    public addMetadata(directory: QuickTimeDirectory): void {
        directory.setString(QuickTimeDirectory.TAG_CANON_THUMBNAIL_DT, this.dateTime);
    }
}
export default CanonThumbnailAtom;
