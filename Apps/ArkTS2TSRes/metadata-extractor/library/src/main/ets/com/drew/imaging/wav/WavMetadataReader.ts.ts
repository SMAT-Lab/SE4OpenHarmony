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
import WavRiffHandler from '../../metadata/wav/WavRiffHandler';
import FileSystemMetadataReader from '../../metadata/file/FileSystemMetadataReader';
import StreamReader from '../../lang/StreamReader';
import RiffReader from '../riff/RiffReader';
import fileio from '@ohos.fileio';
import Metadata from '../../metadata/Metadata';
/**
 * Obtains metadata from WAV files.
 */
class WavMetadataReader {
    public static readMetadata(filePath: string): Metadata {
        let inputStream = fileio.createStreamSync(filePath, 'r+');
        let metadata = new Metadata();
        try {
            new RiffReader().processRiff(new StreamReader(filePath), new WavRiffHandler(metadata));
        }
        finally {
            inputStream.close();
        }
        new FileSystemMetadataReader().read(filePath, metadata);
        return metadata;
    }
}
export default WavMetadataReader;
