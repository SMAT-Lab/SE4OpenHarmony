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

import IcoDirectory from './IcoDirectory';
import TagDescriptor from '../TagDescriptor';

class IcoDescriptor extends TagDescriptor<IcoDirectory> {
  constructor(directory: IcoDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case IcoDirectory.TAG_IMAGE_TYPE:
        return this.getImageTypeDescription();
      case IcoDirectory.TAG_IMAGE_WIDTH:
        return this.getImageWidthDescription();
      case IcoDirectory.TAG_IMAGE_HEIGHT:
        return this.getImageHeightDescription();
      case IcoDirectory.TAG_COLOUR_PALETTE_SIZE:
        return this.getColourPaletteSizeDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getImageTypeDescription(): string
  {
    return this.getIndexedDescription(IcoDirectory.TAG_IMAGE_TYPE, 1, "Icon", "Cursor");
  }

  public getImageWidthDescription(): string
  {
    let width = this._directory.getInteger(IcoDirectory.TAG_IMAGE_WIDTH);
    if (width == null)
    return null;
    return (width == 0 ? 256 : width) + " pixels";
  }

  public getImageHeightDescription(): string
  {
    let width = this._directory.getInteger(IcoDirectory.TAG_IMAGE_HEIGHT);
    if (width == null)
    return null;
    return (width == 0 ? 256 : width) + " pixels";
  }

  public getColourPaletteSizeDescription(): string
  {
    let size = this._directory.getInteger(IcoDirectory.TAG_COLOUR_PALETTE_SIZE);
    if (size == null)
    return null;
    return size == 0 ? "No palette" : size + " colour" + (size == 1 ? "" : "s");
  }
}

export default IcoDescriptor
