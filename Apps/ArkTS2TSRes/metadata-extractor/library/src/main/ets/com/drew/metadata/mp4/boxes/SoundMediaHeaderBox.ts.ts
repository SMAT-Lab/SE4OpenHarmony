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
import SequentialReader from '../../../lang/SequentialReader';
import Box from './Box';
import FullBox from './FullBox';
import Mp4SoundDirectory from '../media/Mp4SoundDirectory';
export default class SoundMediaHeaderBox extends FullBox {
    balance: number;
    public constructor(reader: SequentialReader, box: Box) {
        super(reader, box);
        this.balance = reader.getInt16();
        reader.skip(2); // Reserved
    }
    public addMetadata(directory: Mp4SoundDirectory): void {
        let integer = this.balance & 0xFFFF0000;
        let fraction = (this.balance & 0x0000FFFF) / Math.pow(2, 4);
        directory.setDouble(Mp4SoundDirectory.TAG_SOUND_BALANCE, integer + fraction);
    }
}
