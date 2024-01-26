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
import fileio from '@ohos.fileio';
import FileSystemMetadataReader from '../../metadata/file/FileSystemMetadataReader';
import Metadata from '../../metadata/Metadata';
import Mp4Reader from './Mp4Reader';
import Mp4BoxHandler from '../../metadata/mp4/Mp4BoxHandler';
class Mp4MetadataReader {
    public static readMetadata(filePath: string): Metadata {
        let inputStream = fileio.createStreamSync(filePath, 'r+');
        let metadata: Metadata;
        try {
            metadata = new Metadata();
            Mp4Reader.extract(filePath, new Mp4BoxHandler(metadata));
        }
        finally {
            inputStream.closeSync();
        }
        new FileSystemMetadataReader().read(filePath, metadata);
        return metadata;
    }
}
export default Mp4MetadataReader;
