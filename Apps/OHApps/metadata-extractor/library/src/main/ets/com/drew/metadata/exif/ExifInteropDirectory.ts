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

import ExifInteropDescriptor from './ExifInteropDescriptor';
import ExifDirectoryBase from './ExifDirectoryBase';

class ExifInteropDirectory extends ExifDirectoryBase {
  private static readonly _tagNameMap: Map<number, string> = ExifDirectoryBase.addExifTagNames(new Map<number, string>());

  //    static
  //    {
  //        addExifTagNames(_tagNameMap);
  //    }

  constructor() {
    super()
    this.setDescriptor(new ExifInteropDescriptor(this));
  }

  public getName(): string
  {
    return "Interoperability";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return ExifInteropDirectory._tagNameMap;
  }
}

export default ExifInteropDirectory
