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

import HuffmanTablesDirectory from './HuffmanTablesDirectory';
import TagDescriptor from '../TagDescriptor';

class HuffmanTablesDescriptor extends TagDescriptor<HuffmanTablesDirectory> {
  constructor(directory: HuffmanTablesDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case HuffmanTablesDirectory.TAG_NUMBER_OF_TABLES:
        return this.getNumberOfTablesDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getNumberOfTablesDescription(): string
  {
    let value: number = this._directory.getInteger(HuffmanTablesDirectory.TAG_NUMBER_OF_TABLES);
    if (value == null)
    return null;
    return value + (value == 1 ? " Huffman table" : " Huffman tables");
  }
}

export default HuffmanTablesDescriptor