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
import FileType from '../FileType';
import TypeChecker from '../TypeChecker';
class MpegAudioTypeChecker implements TypeChecker {
    public getByteCount(): number {
        return 3;
    }
    public checkType(bytes: Int8Array): FileType {
        // MPEG audio requires the first 11 bits to be set
        if (bytes[0] != -1 || (bytes[1] & 0xE0) != 0xE0) {
            return FileType.Unknown;
        }
        // The MPEG Audio version ID value of 01 is reserved
        let version: number = (bytes[1] >> 3) & 3;
        if (version == 1) {
            return FileType.Unknown;
        }
        // The layer description value of 00 is reserved
        let layerDescription: number = (bytes[1] >> 1) & 3;
        if (layerDescription == 0) {
            return FileType.Unknown;
        }
        // The bitrate index value of 1111 is disallowed
        let bitrateIndex = bytes[2] >> 4;
        if (bitrateIndex == 0x0F) {
            return FileType.Unknown;
        }
        return FileType.Mp3;
    }
}
export default MpegAudioTypeChecker;
