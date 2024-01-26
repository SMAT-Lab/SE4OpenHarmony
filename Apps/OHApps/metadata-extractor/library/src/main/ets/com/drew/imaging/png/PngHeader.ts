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

import PngColorType from './PngColorType';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';

class PngHeader {
  private readonly _imageWidth: number;
  private readonly _imageHeight: number;
  private readonly _bitsPerSample: number;
  private readonly _colorType: PngColorType;
  private readonly _compressionType: number;
  private readonly _filterMethod: number;
  private readonly _interlaceMethod: number;

  public constructor(bytes: Int8Array) {
    if (bytes.length != 13) {
      throw new Error("PNG header chunk must have 13 data bytes");
    }

    let reader: SequentialReader = new SequentialByteArrayReader(bytes);
    try {
      this._imageWidth = reader.getInt32();
      this._imageHeight = reader.getInt32();
      this._bitsPerSample = reader.getInt8();
      let colorTypeNumber = reader.getInt8();
      this._colorType = PngColorType.fromNumericValue(colorTypeNumber);
      this._compressionType = reader.getInt8();
      this._filterMethod = reader.getInt8();
      this._interlaceMethod = reader.getInt8();
    } catch (error) {
      throw new Error(error);
    }
  }

  public getImageWidth(): number {
    return this._imageWidth;
  }

  public getImageHeight(): number {
    return this._imageHeight;
  }

  public getBitsPerSample(): number {
    return this._bitsPerSample;
  }

  public getColorType(): PngColorType {
    return this._colorType;
  }

  public getCompressionType(): number {
    return this._compressionType;
  }

  public getFilterMethod(): number {
    return this._filterMethod;
  }

  public getInterlaceMethod(): number {
    return this._interlaceMethod;
  }
}

export default PngHeader;