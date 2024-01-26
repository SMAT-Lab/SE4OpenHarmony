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
import FullBox from './FullBox';
import Box from './Box';
import HeifDirectory from '../HeifDirectory';
import SequentialReader from '../../../lang/SequentialReader';
class PixelInformationBox extends FullBox {
    public numChannels: number;
    public channels: number[];
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box, null);
        this.numChannels = reader.getUInt8();
        this.channels = new Number[this.numChannels];
        for (let i = 0; i < this.channels.length; i++) {
            this.channels[i] = reader.getUInt8();
        }
    }
    public addMetadata(directory: HeifDirectory): void {
        if (!directory.containsTag(HeifDirectory.TAG_BITS_PER_CHANNEL)) {
            directory.setIntArray(HeifDirectory.TAG_BITS_PER_CHANNEL, new Int32Array(this.channels));
        }
    }
}
export default PixelInformationBox;
