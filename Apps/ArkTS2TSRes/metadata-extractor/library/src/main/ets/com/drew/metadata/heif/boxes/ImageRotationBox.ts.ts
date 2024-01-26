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
import Box from './Box';
import HeifDirectory from '../HeifDirectory';
import SequentialReader from '../../../lang/SequentialReader';
class ImageRotationBox extends Box {
    public angle: number;
    public constructor(reader: SequentialReader, box: Box) {
        super(null, box);
        // First 6 bits are reserved
        this.angle = reader.getUInt8() & 0x03;
    }
    public addMetadata(directory: HeifDirectory): void {
        if (!directory.containsTag(HeifDirectory.TAG_IMAGE_ROTATION)) {
            directory.setInt(HeifDirectory.TAG_IMAGE_ROTATION, this.angle);
        }
    }
}
export default ImageRotationBox;
