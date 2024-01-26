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

import TagDescriptor from '../TagDescriptor';
import WebpDirectory from './WebpDirectory'

export default class WebpDescriptor extends TagDescriptor<WebpDirectory> {
  public constructor(directory: WebpDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case WebpDirectory.TAG_IMAGE_WIDTH:
        return this.getImageWidthDescription();
      case WebpDirectory.TAG_IMAGE_HEIGHT:
        return this.getImageHeightDescription();

      default:
        return super.getDescription(tagType);
    }
  }
  public getImageWidthDescription(): string
  {
    let width = this._directory.getInteger(WebpDirectory.TAG_IMAGE_WIDTH);
    return (width == 0 ? 256 : width) + " pixels";
  }

  public getImageHeightDescription(): string
  {
    let width = this._directory.getInteger(WebpDirectory.TAG_IMAGE_HEIGHT);
    return (width == 0 ? 256 : width) + " pixels";
  }
}