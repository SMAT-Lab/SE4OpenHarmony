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

import TagDescriptor from '../../TagDescriptor';
import AppleRunTimeMakernoteDirectory from './AppleRunTimeMakernoteDirectory'

export default class AppleRunTimeMakernoteDescriptor extends TagDescriptor<AppleRunTimeMakernoteDirectory>{

  public constructor(directory: AppleRunTimeMakernoteDirectory){
    super(directory)
  }

    public getDescription( tagType:number):string
    {
        switch (tagType) {
            case AppleRunTimeMakernoteDirectory.CMTimeFlags:
                return this.flagsDescription();
            case AppleRunTimeMakernoteDirectory.CMTimeValue:
                return this.calculateTimeInSeconds();
            default:
                return super.getDescription(tagType);
        }
    }

    // flags bitmask details
    // 0000 0001 = Valid
    // 0000 0010 = Rounded
    // 0000 0100 = Positive Infinity
    // 0000 1000 = Negative Infinity
    // 0001 0000 = Indefinite

    private  flagsDescription():string
    {
        try {
            let value = this._directory.getInt(AppleRunTimeMakernoteDirectory.CMTimeFlags);

            var sb:string = '';

            if ((value & 0x1) == 1)
                sb+"Valid";
            else
                sb+"Invalid";

            if ((value & 0x2) != 0)
                sb+", rounded";

            if ((value & 0x4) != 0)
                sb+", positive infinity";

            if ((value & 0x8) != 0)
                sb+", negative infinity";

            if ((value & 0x10) != 0)
                sb+", indefinite";

            return sb.toString();
        } catch (err) {
            return null;
        }
    }

    private  calculateTimeInSeconds():string
    {
        try {
            let value = this._directory.getLong(AppleRunTimeMakernoteDirectory.CMTimeValue);
            let scale = this._directory.getLong(AppleRunTimeMakernoteDirectory.CMTimeScale);

            return (value / scale)+" seconds";
        } catch (error) {
            return null;
        }
    }
}