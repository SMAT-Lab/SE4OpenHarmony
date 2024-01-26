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
import GifAnimationDirectory from './GifAnimationDirectory';

class GifAnimationDescriptor extends TagDescriptor<GifAnimationDirectory> {
  public constructor(directory: GifAnimationDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case GifAnimationDirectory.TAG_ITERATION_COUNT:
        return this.getIterationCountDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getIterationCountDescription(): string {
    let count: number = this._directory.getInteger(GifAnimationDirectory.TAG_ITERATION_COUNT);
    if (count == null) {
      return null;
    }
    return count == 0 ? "Infinite" : count == 1 ? "Once" : count == 2 ? "Twice" : count.toString() + " times";
  }
}

export default GifAnimationDescriptor;