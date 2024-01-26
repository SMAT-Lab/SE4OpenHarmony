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

import FullBox from './FullBox';
import Box from './Box';
import SequentialReader from '../../../lang/SequentialReader';

class ItemLocationBox extends FullBox {
  public indexSize: number;
  public offsetSize: number;
  public lengthSize: number;
  public baseOffsetSize: number;
  public itemCount: number;
  public itemID: number;
  public constructionMethod: number;
  public dataReferenceIndex: number;
  public baseOffset: number;
  public extentCount: number;

  /*SortedSet<Extent> extents = new TreeSet<Extent>(new Comparator<Extent>() {
    public int compare(Extent left, Extent right) {
        return (left.offset < right.offset) ? -1 : ((left.offset == right.offset) ? 0 : 1);
    }
  });*/

  public extents: Set<InstanceType<typeof ItemLocationBox.Extent>> = new Set<InstanceType<typeof ItemLocationBox.Extent>>();

  public constructor(reader: SequentialReader, box: Box) {
    super(reader, box, null);

    let holder: number = reader.getUInt8();
    this.offsetSize = (holder & 0xF0) >> 4;
    this.lengthSize = (holder & 0x0F);

    holder = reader.getUInt8();
    this.baseOffsetSize = (holder & 0xF0) >> 4;
    if ((this.version == 1) || (this.version == 2)) {
      this.indexSize = (holder & 0x0F);
    } else {
      // Reserved
    }
    if (this.version < 2) {
      this.itemCount = reader.getUInt16();
    } else if (this.version == 2) {
      this.itemCount = reader.getUInt32();
    }
    for (let i = 0; i < this.itemCount; i++) {
      if (this.version < 2) {
        this.itemID = reader.getUInt16();
      } else if (this.version == 2) {
        this.itemID = reader.getUInt32();
      }
      if ((this.version == 1) || (this.version == 2)) {
        holder = reader.getUInt16();
        this.constructionMethod = (holder & 0x000F);
      }
      this.dataReferenceIndex = reader.getUInt16();
      if (this.baseOffsetSize == 4) {
        this.baseOffset = reader.getInt32();
      } else if (this.baseOffsetSize == 8) {
        this.baseOffset = reader.getInt64();
      } else {
        this.baseOffset = 0;
      }
      this.extentCount = reader.getUInt16();

      let extentIndex: number = null;
      let extentOffset: number;
      let extentLength: number;
      for (let j = 0; j < this.extentCount; j++) {
        if ((this.version == 1) || (this.version == 2) && (this.indexSize > 0)) {
          extentIndex = this.getIntFromUnknownByte(this.indexSize, reader);
        }
        extentOffset = this.getIntFromUnknownByte(this.offsetSize, reader);
        extentLength = this.getIntFromUnknownByte(this.lengthSize, reader);
        this.extents.add(new ItemLocationBox.Extent(this.itemID, extentIndex, extentOffset + this.baseOffset, extentLength));
      }
    }
  }

  public getIntFromUnknownByte(variable: number, reader: SequentialReader): number {
    switch (variable) {
      case (1):
        return reader.getUInt8();
      case (2):
        return reader.getUInt16();
      case (4):
        return reader.getUInt32();
      case (8):
        return reader.getInt64();
      default:
        return null;
    }
  }

  public static Extent = class {
    public itemId: number;
    public index: number;
    public offset: number;
    public length: number;
    public constructor(itemId: number, index: number, offset: number, length: number) {
      this.itemId = itemId;
      this.index = index;
      this.offset = offset;
      this.length = length;
    }

    public getOffset(): number {
      return this.offset;
    }

    public getLength(): number {
      return this.length;
    }

    public getItemId(): number {
      return this.itemId;
    }
  }

  public getExtents(): Set<InstanceType<typeof ItemLocationBox.Extent>> {
    return this.extents;
  }
}

export default ItemLocationBox;
