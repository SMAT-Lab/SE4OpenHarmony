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
import FileSystemMetadataReader from '../../metadata/file/FileSystemMetadataReader';
import JpegSegmentMetadataReader from './JpegSegmentMetadataReader';
import XmpReader from '../../metadata/xmp/XmpReader';
import IccReader from '../../metadata/icc/IccReader';
import JpegReader from '../../metadata/jpeg/JpegReader';
import JpegCommentReader from '../../metadata/jpeg/JpegCommentReader';
import Metadata from '../../metadata/Metadata';
import StreamReader from '../../lang/StreamReader';
import JpegSegmentType from './JpegSegmentType';
import JpegSegmentData from './JpegSegmentData';
import JpegSegmentReader from './JpegSegmentReader';
import JpegDhtReader from '../../metadata/jpeg/JpegDhtReader';
import JpegDnlReader from '../../metadata/jpeg/JpegDnlReader';
import ExifReader from '../../metadata/exif/ExifReader';
import AdobeJpegReader from '../../metadata/adobe/AdobeJpegReader';
import { IptcReader } from '../../metadata/iptc/IptcReader';
import DuckyReader from '../../metadata/photoshop/DuckyReader';
import PhotoshopReader from '../../metadata/photoshop/PhotoshopReader';
import JfxxReader from '../../metadata/jfxx/JfxxReader';
import JfifReader from '../../metadata/jfif/JfifReader';
/**
 * Obtains metadata from ICO (Windows Icon) files.
 */
class JpegMetadataReader {
    private static getReaders(): Set<JpegSegmentMetadataReader> {
        let readers: Set<JpegSegmentMetadataReader> = new Set<JpegSegmentMetadataReader>();
        readers.add(new JpegReader());
        readers.add(new JpegCommentReader());
        readers.add(new JfxxReader());
        readers.add(new JfifReader());
        readers.add(new ExifReader());
        readers.add(new XmpReader());
        readers.add(new IccReader());
        readers.add(new PhotoshopReader());
        readers.add(new DuckyReader());
        readers.add(new IptcReader());
        readers.add(new AdobeJpegReader());
        readers.add(new JpegDhtReader());
        readers.add(new JpegDnlReader());
        return readers;
    }
    public static readMetadata(filePath: string, readers?: Set<JpegSegmentMetadataReader>): Metadata {
        let metadata = new Metadata();
        JpegMetadataReader.process(metadata, filePath, readers);
        new FileSystemMetadataReader().read(filePath, metadata);
        return metadata;
    }
    public static process(metadata?: Metadata, filePath?: string, readers?: Set<JpegSegmentMetadataReader>) {
        if (readers == null) {
            readers = JpegMetadataReader.getReaders();
        }
        let segmentTypes = new Set<JpegSegmentType>();
        readers.forEach((value1, value2, SET) => {
            value1.getSegmentTypes().forEach((segmentType, child, childSet) => {
                segmentTypes.add(segmentType);
            });
        });
        let segmentData: JpegSegmentData = JpegSegmentReader.readSegments(filePath, new StreamReader(filePath), segmentTypes);
        JpegMetadataReader.processJpegSegmentData(metadata, readers, segmentData);
    }
    public static processJpegSegmentData(metadata: Metadata, readers: Set<JpegSegmentMetadataReader>, segmentData: JpegSegmentData) {
        for (let reader of readers) {
            for (let segmentType of reader.getSegmentTypes()) {
                reader.readJpegSegments(segmentData.getSegments(segmentType.byteValue), metadata, segmentType);
            }
        }
    }
    constructor() {
        throw new Error("Not intended for instantiation");
    }
}
export default JpegMetadataReader;
