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

import ExifIFD0Descriptor from './ExifIFD0Descriptor';
import ExifDirectoryBase from './ExifDirectoryBase';

class ExifIFD0Directory extends ExifDirectoryBase {
  /** This tag is a pointer to the Exif SubIFD. */
  public static readonly TAG_EXIF_SUB_IFD_OFFSET: number = 0x8769;

  /** This tag is a pointer to the Exif GPS IFD. */
  public static readonly TAG_GPS_INFO_OFFSET: number = 0x8825;
  private static _tagNameMap: Map<number, string>  = ExifDirectoryBase.addExifTagNames(new Map<number, string>());

  constructor() {
    super();
    ExifDirectoryBase.addExifTagNames(ExifIFD0Directory._tagNameMap);
    this.setDescriptor(new ExifIFD0Descriptor(this));
  }

  public getName(): string
  {
    return "Exif IFD0";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return ExifIFD0Directory._tagNameMap;
  }
}

export default ExifIFD0Directory
