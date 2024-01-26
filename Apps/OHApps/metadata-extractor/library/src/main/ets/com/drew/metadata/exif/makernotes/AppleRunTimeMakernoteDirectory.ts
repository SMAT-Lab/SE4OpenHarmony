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

import Directory from '../../Directory'
import AppleRunTimeMakernoteDescriptor from './AppleRunTimeMakernoteDescriptor'

export default class AppleRunTimeMakernoteDirectory extends Directory {
  protected static readonly _tagNameMap: Map<number, string> = new Map();
  public static readonly CMTimeFlags: number = 1;
  public static readonly CMTimeEpoch: number = 2;
  public static readonly CMTimeScale: number = 3;
  public static readonly CMTimeValue: number = 4;
  public constructor() {
    super()
    super.setDescriptor(new AppleRunTimeMakernoteDescriptor(this));
    AppleRunTimeMakernoteDirectory._tagNameMap.set(AppleRunTimeMakernoteDirectory.CMTimeFlags, "Flags");
    AppleRunTimeMakernoteDirectory._tagNameMap.set(AppleRunTimeMakernoteDirectory.CMTimeEpoch, "Epoch");
    AppleRunTimeMakernoteDirectory._tagNameMap.set(AppleRunTimeMakernoteDirectory.CMTimeScale, "Scale");
    AppleRunTimeMakernoteDirectory._tagNameMap.set(AppleRunTimeMakernoteDirectory.CMTimeValue, "Value");

  }

  public getName(): string
  {
    return "Apple Run Time";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return AppleRunTimeMakernoteDirectory._tagNameMap;
  }
}