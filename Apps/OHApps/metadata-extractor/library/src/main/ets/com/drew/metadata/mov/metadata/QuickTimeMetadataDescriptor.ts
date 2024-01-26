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

import QuickTimeDescriptor from '../QuickTimeDescriptor'
import QuickTimeDirectory from '../QuickTimeDirectory'
import QuickTimeMetadataDirectory from './QuickTimeMetadataDirectory'

class QuickTimeMetadataDescriptor extends QuickTimeDescriptor {
  public constructor(directory: QuickTimeDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case QuickTimeMetadataDirectory.TAG_ARTWORK:
        return this.getArtworkDescription();
      case QuickTimeMetadataDirectory.TAG_LOCATION_ROLE:
        return this.getLocationRoleDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  private getArtworkDescription(): string {
    return this.getByteLengthDescription(QuickTimeMetadataDirectory.TAG_ARTWORK);
  }

  public getLocationRoleDescription(): string {
    return this.getIndexedDescription(QuickTimeMetadataDirectory.TAG_LOCATION_ROLE, 0,
      "Shooting location",
      "Real location",
      "Fictional location"
    );
  }
}

export default QuickTimeMetadataDescriptor