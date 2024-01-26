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

class PngColorType {
  /**
   * Each pixel is a greyscale sample.
   */
  public static readonly GREYSCALE: PngColorType = new PngColorType(0, "Greyscale", [1, 2, 4, 8, 16]);

  /**
   * Each pixel is an R,G,B triple.
   */
  public static readonly TRUE_COLOR: PngColorType = new PngColorType(2, "True Color", [8, 16]);

  /**
   * Each pixel is a palette index. Seeing this value indicates that a <code>PLTE</code> chunk shall appear.
   */
  public static readonly INDEXED_COLOR: PngColorType = new PngColorType(3, "Indexed Color", [1, 2, 4, 8]);

  /**
   * Each pixel is a greyscale sample followed by an alpha sample.
   */
  public static readonly GREYSCALE_WITH_ALPHA: PngColorType = new PngColorType(4, "Greyscale with Alpha", [8, 16]);

  /**
   * Each pixel is an R,G,B triple followed by an alpha sample.
   */
  public static readonly TRUE_COLOR_WITH_ALPHA: PngColorType = new PngColorType(6, "True Color with Alpha", [8, 16]);

  public static fromNumericValue(numericValue: number): PngColorType {
    switch (numericValue) {
      case 0:
        return PngColorType.GREYSCALE;
      case 2:
        return PngColorType.TRUE_COLOR;
      case 3:
        return PngColorType.INDEXED_COLOR;
      case 4:
        return PngColorType.GREYSCALE_WITH_ALPHA;
      case 6:
        return PngColorType.TRUE_COLOR_WITH_ALPHA;
    }
    return new PngColorType(numericValue, "Unknown (" + numericValue + ")");
  }

  private readonly _numericValue: number;
  private readonly _description: string;
  private readonly _allowedBitDepths: number[];

  private constructor(numericValue: number, description: string, allowedBitDepths?: number[]) {
    this._numericValue = numericValue;
    this._description = description;
    this._allowedBitDepths = allowedBitDepths;
  }

  public getNumericValue(): number {
    return this._numericValue;
  }

  public getDescription(): string {
    return this._description;
  }

  public getAllowedBitDepths(): number[] {
    return this._allowedBitDepths;
  }
}

export default PngColorType;