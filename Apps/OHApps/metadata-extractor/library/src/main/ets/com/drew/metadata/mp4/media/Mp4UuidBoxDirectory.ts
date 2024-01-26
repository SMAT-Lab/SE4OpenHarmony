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

import Mp4MediaDirectory from './Mp4MediaDirectory'
import Mp4UuidBoxDescriptor from './Mp4UuidBoxDescriptor'

export default class Mp4UuidBoxDirectory extends Mp4MediaDirectory {
  public static readonly TAG_UUID: number = 901;
  public static readonly TAG_USER_DATA: number = 902;
  private static readonly tagNameMap: Map<number, string> = new Map();

  public constructor() {
    super()
    Mp4UuidBoxDirectory.addMp4MediaTags(Mp4UuidBoxDirectory.tagNameMap);
    Mp4UuidBoxDirectory.tagNameMap.set(Mp4UuidBoxDirectory.TAG_UUID, "UUID");
    Mp4UuidBoxDirectory.tagNameMap.set(Mp4UuidBoxDirectory.TAG_USER_DATA, "Data");
    this.setDescriptor(new Mp4UuidBoxDescriptor(this));
  }

  public getName(): string
  {
    return "UUID";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return Mp4UuidBoxDirectory.tagNameMap;
  }
}