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

class JpegComponent {
  private readonly _componentId: number;
  private readonly _samplingFactorByte: number;
  private readonly _quantizationTableNumber: number;

  constructor(componentId?: number, samplingFactorByte?: number, quantizationTableNumber?: number) {
    this._componentId = componentId;
    this._samplingFactorByte = samplingFactorByte;
    this._quantizationTableNumber = quantizationTableNumber;
  }

  public getComponentId(): number{
    return this._componentId;
  }

  public getComponentName(): string{
    switch (this._componentId) {
      case 1:
        return "Y";
      case 2:
        return "Cb";
      case 3:
        return "Cr";
      case 4:
        return "I";
      case 5:
        return "Q";
      default:
        return "Unknown (%s)".replace(/%s/, this._componentId.toString());
    }
  }

  public getQuantizationTableNumber(): number{
    return this._quantizationTableNumber;
  }

  public getHorizontalSamplingFactor(): number
  {
    return (this._samplingFactorByte >> 4) & 0x0F;
  }

  public getVerticalSamplingFactor(): number
  {
    return this._samplingFactorByte & 0x0F;
  }

  public toString(): string {
    return "Quantization table "+this.getQuantizationTableNumber()+", Sampling factors "+this.getHorizontalSamplingFactor()
    +" horiz, "+this.getVerticalSamplingFactor()+" vert";
  }
}

export default JpegComponent
