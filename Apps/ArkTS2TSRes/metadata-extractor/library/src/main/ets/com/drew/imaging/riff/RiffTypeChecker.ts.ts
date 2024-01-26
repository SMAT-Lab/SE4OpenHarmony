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
import StringValue from '../../metadata/StringValue';
import TypeChecker from '../TypeChecker';
class RiffTypeChecker implements TypeChecker {
    public getByteCount(): number {
        return 12;
    }
    public checkType(bytes: Int8Array): FileType {
        let firstFour: string = StringValue.Int8Array2String(bytes, 'utf-8', 0, 4);
        if (firstFour != "RIFF")
            return FileType.Unknown;
        let fourCC: string = StringValue.Int8Array2String(bytes, 'utf-8', 8, 12);
        if (fourCC == "WAVE")
            return FileType.Wav;
        if (fourCC == "AVI ")
            return FileType.Avi;
        if (fourCC == "WEBP")
            return FileType.WebP;
        return FileType.Riff;
    }
}
export default RiffTypeChecker;
