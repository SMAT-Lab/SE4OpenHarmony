
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

import QuickTimeDirectory from '../QuickTimeDirectory'
import QuickTimeMusicDescriptor from './QuickTimeMusicDescriptor'

class QuickTimeMusicDirectory extends QuickTimeDirectory {

  public static readonly TAG_CREATION_TIME: number = 0x5001;
  public static readonly TAG_MODIFICATION_TIME: number = 0x5002;
  public static readonly TAG_DURATION: number = 0x5003;

  public constructor() {
    super()
    this.setDescriptor(new QuickTimeMusicDescriptor(this));
  }

  public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
    [QuickTimeMusicDirectory.TAG_CREATION_TIME, "Creation Time"],
    [QuickTimeMusicDirectory.TAG_MODIFICATION_TIME, "Modification Time"],
    [QuickTimeMusicDirectory.TAG_DURATION, "Duration"]
  ]);

  public getName(): string {
    return "QuickTime Music";
  }

  protected getTagNameMap(): Map<number, string> {
    return QuickTimeMusicDirectory._tagNameMap;
  }
}

export default QuickTimeMusicDirectory