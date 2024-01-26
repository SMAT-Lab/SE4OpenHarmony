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
import SequentialReader from '../../../lang/SequentialReader';
class FullBox extends Box {
    public flags: Int8Array;
    public version: number;
    public constructor(reader: SequentialReader, box: Box, fullBox?: FullBox) {
        if (reader != null) {
            super(null, box);
            this.version = reader.getUInt8();
            this.flags = reader.getBytes(3);
        }
        else {
            super(null, fullBox);
            this.version = fullBox.version;
            this.flags = fullBox.flags;
        }
    }
}
export default FullBox;
