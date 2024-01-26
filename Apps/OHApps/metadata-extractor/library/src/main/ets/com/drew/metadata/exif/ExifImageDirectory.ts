/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import ExifImageDescriptor from './ExifImageDescriptor';
import ExifDirectoryBase from './ExifDirectoryBase';

/**
 * Describes One of several Exif directories.
 *
 * Holds information about image IFD's in a chain after the first. The first page is stored in IFD0.
 * Currently, this only applied to multi-page TIFF images
 */
class ExifImageDirectory extends ExifDirectoryBase {
  private static readonly _tagNameMap: Map<number, string> = new Map<number, string>();

  public constructor() {
    super();
    ExifDirectoryBase.addExifTagNames(ExifImageDirectory._tagNameMap);
    this.setDescriptor(new ExifImageDescriptor(this));
  }

  public getName(): string {
    return "Exif Image";
  }

  protected getTagNameMap(): Map<number, string> {
    return ExifImageDirectory._tagNameMap;
  }
}

export default ExifImageDirectory