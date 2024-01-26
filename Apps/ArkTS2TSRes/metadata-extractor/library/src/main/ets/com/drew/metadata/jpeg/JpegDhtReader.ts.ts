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
import HuffmanTableClass from './HuffmanTableClass';
import HuffmanTable from './HuffmanTable';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import Metadata from '../Metadata';
import HuffmanTablesDirectory from './HuffmanTablesDirectory';
import JpegSegmentMetadataReader from '../../imaging/jpeg/JpegSegmentMetadataReader';
import JpegSegmentType from '../../imaging/jpeg/JpegSegmentType';
import SequentialReader from '../../lang/SequentialReader';
class JpegDhtReader implements JpegSegmentMetadataReader {
    public getSegmentTypes(): Set<JpegSegmentType> {
        return new Set([JpegSegmentType.DHT]);
    }
    public readJpegSegments(segments: Set<Int8Array>, metadata: Metadata, segmentType: JpegSegmentType): void {
        for (let segmentBytes of segments) {
            this.extract(new SequentialByteArrayReader(segmentBytes), metadata);
        }
    }
    public extract(reader: SequentialReader, metadata: Metadata) {
        let directory: HuffmanTablesDirectory = <HuffmanTablesDirectory>metadata.getFirstDirectoryOfType(new HuffmanTablesDirectory());
        if (directory == null) {
            directory = new HuffmanTablesDirectory();
            metadata.addDirectory(directory);
        }
        try {
            while (reader.available() > 0) {
                let header: number = reader.getByte();
                let tableClass: HuffmanTableClass = HuffmanTableClass.typeOf((header & 0xF0) >> 4);
                let tableDestinationId: number = header & 0xF;
                let lBytes: Int8Array = this.getBytes(reader, 16);
                let vCount: number = 0;
                for (let b of lBytes) {
                    vCount += (b & 0xFF);
                }
                let vBytes: Int8Array = this.getBytes(reader, vCount);
                directory.getTables().push(new HuffmanTable(tableClass, tableDestinationId, lBytes, vBytes));
            }
        }
        catch (ex) {
            directory.addError('JpegDhtReader reader fail');
        }
        directory.setInt(HuffmanTablesDirectory.TAG_NUMBER_OF_TABLES, directory.getTables().length);
    }
    private getBytes(reader: SequentialReader, count: number): Int8Array {
        let bytes: Int8Array = new Int8Array[count];
        for (let i = 0; i < count; i++) {
            let b: number = reader.getByte();
            if ((b & 0xFF) == 0xFF) {
                let stuffing: number = reader.getByte();
                if (stuffing != 0x00) {
                    throw new Error("Marker " + JpegSegmentType.fromByte(stuffing) + " found inside DHT segment");
                }
            }
            bytes[i] = b;
        }
        return bytes;
    }
}
export default JpegDhtReader;
