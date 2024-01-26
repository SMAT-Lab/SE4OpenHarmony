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
import { BmpReader } from '../../metadata/bmp/BmpReader';
import StreamReader from '../../lang/StreamReader';
import FileSystemMetadataReader from '../../metadata/file/FileSystemMetadataReader';
import Metadata from '../../metadata/Metadata';
export default class BmpMetadataReader {
    static readMetadata(file: string): Metadata {
        let metadata = new Metadata();
        try {
            new BmpReader().extract(new StreamReader(file), metadata);
        }
        catch (e) {
        }
        new FileSystemMetadataReader().read(file, metadata);
        return metadata;
    }
}
