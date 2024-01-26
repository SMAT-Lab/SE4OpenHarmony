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

class JpegSegmentType {
  public static readonly APP0: JpegSegmentType = new JpegSegmentType(-32, true);
  public static readonly APP1: JpegSegmentType = new JpegSegmentType(-31, true);
  public static readonly APP2: JpegSegmentType = new JpegSegmentType(-30, true);
  public static readonly APP3: JpegSegmentType = new JpegSegmentType(-29, true);
  public static readonly APP4: JpegSegmentType = new JpegSegmentType(-28, true);
  public static readonly APP5: JpegSegmentType = new JpegSegmentType(-27, true);
  public static readonly APP6: JpegSegmentType = new JpegSegmentType(-26, true);
  public static readonly APP7: JpegSegmentType = new JpegSegmentType(-25, true);
  public static readonly APP8: JpegSegmentType = new JpegSegmentType(-24, true);
  public static readonly APP9: JpegSegmentType = new JpegSegmentType(-23, true);
  public static readonly APPA: JpegSegmentType = new JpegSegmentType(-22, true);
  public static readonly APPB: JpegSegmentType = new JpegSegmentType(-21, true);
  public static readonly APPC: JpegSegmentType = new JpegSegmentType(-20, true);
  public static readonly APPD: JpegSegmentType = new JpegSegmentType(-19, true);
  public static readonly APPE: JpegSegmentType = new JpegSegmentType(-18, true);
  public static readonly APPF: JpegSegmentType = new JpegSegmentType(-17, true);
  public static readonly SOI: JpegSegmentType = new JpegSegmentType(-40, true);
  public static readonly DQT: JpegSegmentType = new JpegSegmentType(-40, true);
  public static readonly DNL: JpegSegmentType = new JpegSegmentType(-36, true);
  public static readonly DRI: JpegSegmentType = new JpegSegmentType(-35, true);
  public static readonly DHP: JpegSegmentType = new JpegSegmentType(-34, true);
  public static readonly EXP: JpegSegmentType = new JpegSegmentType(-33, true);
  public static readonly DHT: JpegSegmentType = new JpegSegmentType(-60, true);
  public static readonly DAC: JpegSegmentType = new JpegSegmentType(-52, true);
  public static readonly SOF0: JpegSegmentType = new JpegSegmentType(-64, true);
  public static readonly SOF1: JpegSegmentType = new JpegSegmentType(-63, true);
  public static readonly SOF2: JpegSegmentType = new JpegSegmentType(-62, true);
  public static readonly SOF3: JpegSegmentType = new JpegSegmentType(-61, true);
  //        SOF4:JpegSegmentType=new JpegSegmentType(0xC4, true);
  public static readonly SOF5: JpegSegmentType = new JpegSegmentType(-59, true);
  public static readonly SOF6: JpegSegmentType = new JpegSegmentType(-58, true);
  public static readonly SOF7: JpegSegmentType = new JpegSegmentType(-57, true);
  public static readonly JPG: JpegSegmentType = new JpegSegmentType(-56, true);
  public static readonly SOF9: JpegSegmentType = new JpegSegmentType(-55, true);
  public static readonly SOF10: JpegSegmentType = new JpegSegmentType(-54, true);
  public static readonly SOF11: JpegSegmentType = new JpegSegmentType(-53, true);
  //        SOF12:JpegSegmentType=new JpegSegmentType(0xCC, true);
  public static readonly SOF13: JpegSegmentType = new JpegSegmentType(-51, true);
  public static readonly SOF14: JpegSegmentType = new JpegSegmentType(-50, true);
  public static readonly SOF15: JpegSegmentType = new JpegSegmentType(-49, true);
  public static readonly COM: JpegSegmentType = new JpegSegmentType(-2, true);
  public static readonly enumConstants: JpegSegmentType[] = [JpegSegmentType.APP0,
  JpegSegmentType.APP1, JpegSegmentType.APP2, JpegSegmentType.APP3, JpegSegmentType.APP4, JpegSegmentType.APP5,
  JpegSegmentType.APP6, JpegSegmentType.APP7, JpegSegmentType.APP8, JpegSegmentType.APP9, JpegSegmentType.APPA,
  JpegSegmentType.APPB, JpegSegmentType.APPC, JpegSegmentType.APPD, JpegSegmentType.APPE, JpegSegmentType.APPF]
  public readonly byteValue: number;
  public readonly canContainMetadata: boolean;

  constructor(byteValue: number, canContainMetadata: boolean) {
    this.byteValue = byteValue;
    this.canContainMetadata = canContainMetadata;
  }

  public static canContainMetadataTypes: Set<JpegSegmentType>  = null;

  function() {
    let segmentTypes: Set<JpegSegmentType> = new Set<JpegSegmentType>();
    for (let segmentType of JpegSegmentType.enumConstants) {
      if (segmentType.canContainMetadata) {
        segmentTypes.add(segmentType);
      }
    }
    JpegSegmentType.canContainMetadataTypes = segmentTypes;
  }

  public static fromByte(segmentTypeByte: number): JpegSegmentType {
    for (let segmentType of JpegSegmentType.enumConstants) {
      if (segmentType.byteValue == segmentTypeByte)
      return segmentType;
    }
    return null;
  }
}

export default JpegSegmentType
