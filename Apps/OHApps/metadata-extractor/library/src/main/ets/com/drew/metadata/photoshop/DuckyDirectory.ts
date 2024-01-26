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

import Directory from '../Directory'
import TagDescriptor from '../TagDescriptor'

export default class DuckyDirectory extends Directory {
  public static readonly TAG_QUALITY: number = 1;
  public static readonly TAG_COMMENT: number = 2;
  public static readonly TAG_COPYRIGHT: number = 3
  private static readonly _tagNameMap: Map<number, string> = new Map();
  public constructor() {
    super()
    DuckyDirectory._tagNameMap.set(DuckyDirectory.TAG_QUALITY, "Quality");
    DuckyDirectory._tagNameMap.set(DuckyDirectory.TAG_COMMENT, "Comment");
    DuckyDirectory._tagNameMap.set(DuckyDirectory.TAG_COPYRIGHT, "Copyright");
    this.setDescriptor(new TagDescriptor<DuckyDirectory>(this));
  }

  public getName(): string
  {
    return "Ducky";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return DuckyDirectory._tagNameMap;
  }
}