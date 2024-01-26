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

import ExifTiffHandler from '../../metadata/exif/ExifTiffHandler'
import FileSystemMetadataReader from '../../metadata/file/FileSystemMetadataReader'
import Metadata from '../../metadata/Metadata'
import RandomAccessFileReader from '../../lang/RandomAccessFileReader'
import RandomAccessReader from '../../lang/RandomAccessReader'
import RandomAccessStreamReader from '../../lang/RandomAccessStreamReader'
import TiffReader from './TiffReader'

class TiffMetadataReader {
  public static readMetadata(filePath: string): Metadata {
    //    RandomAccessFile randomAccessFile = new RandomAccessFile(file, "r");
    let metadata: Metadata = new Metadata();
    //    try {
    metadata = TiffMetadataReader.readMetadataWithBaseReader(new RandomAccessFileReader(filePath));
    //    } finally {
    //      randomAccessFile.close();
    //    }
    new FileSystemMetadataReader().read(filePath, metadata);
    return metadata;
  }

  public static readMetadataWithStreamReader(filePath: string): Metadata {
    // TIFF processing requires random access, as directories can be scattered throughout the byte sequence.
    // InputStream does not support seeking backwards, so we wrap it with RandomAccessStreamReader, which
    // buffers data from the stream as we seek forward.

    return TiffMetadataReader.readMetadataWithBaseReader(new RandomAccessStreamReader(filePath));
  }

  public static readMetadataWithBaseReader(reader: RandomAccessReader): Metadata {
    let metadata: Metadata = new Metadata();
    let handler: ExifTiffHandler = new ExifTiffHandler(metadata, null);
    new TiffReader().processTiff(reader, handler, 0);
    return metadata;
  }
}

export default TiffMetadataReader