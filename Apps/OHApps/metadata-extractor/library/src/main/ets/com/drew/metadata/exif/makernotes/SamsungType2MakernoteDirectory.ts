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

import { SamsungType2MakernoteDescriptor } from './SamsungType2MakernoteDescriptor';
import Directory from '../../Directory';

export class SamsungType2MakernoteDirectory extends Directory {
  public static TagMakerNoteVersion = 0x001;
  public static TagDeviceType = 0x0002;
  public static TagSamsungModelId = 0x0003;
  public static TagOrientationInfo = 0x0011;
  public static TagSmartAlbumColor = 0x0020;
  public static TagPictureWizard = 0x0021;
  public static TagLocalLocationName = 0x0030;
  public static TagPreviewIfd = 0x0035;
  public static TagRawDataByteOrder = 0x0040;
  public static TagWhiteBalanceSetup = 0x0041;
  public static TagCameraTemperature = 0x0043;
  public static TagRawDataCFAPattern = 0x0050;
  public static TagFaceDetect = 0x0100;
  public static TagFaceRecognition = 0x0120;
  public static TagFaceName = 0x0123;
  // following tags found only in SRW images
  public static TagFirmwareName = 0xa001;
  public static TagSerialNumber = 0xa002;
  public static TagLensType = 0xa003;
  public static TagLensFirmware = 0xa004;
  public static TagInternalLensSerialNumber = 0xa005;
  public static TagSensorAreas = 0xa010;
  public static TagColorSpace = 0xa011;
  public static TagSmartRange = 0xa012;
  public static TagExposureCompensation = 0xa013;
  public static TagISO = 0xa014;
  public static TagExposureTime = 0xa018;
  public static TagFNumber = 0xa019;
  public static TagFocalLengthIn35mmFormat = 0xa01a;
  public static TagEncryptionKey = 0xa020;

  private static _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(SamsungType2MakernoteDirectory.TagMakerNoteVersion, "Maker Note Version")
    .set(SamsungType2MakernoteDirectory.TagDeviceType, "Device Type")
    .set(SamsungType2MakernoteDirectory.TagSamsungModelId, "Model Id")
    .set(SamsungType2MakernoteDirectory.TagOrientationInfo, "Orientation Info")
    .set(SamsungType2MakernoteDirectory.TagSmartAlbumColor, "Smart Album Color")
    .set(SamsungType2MakernoteDirectory.TagPictureWizard, "Picture Wizard")
    .set(SamsungType2MakernoteDirectory.TagLocalLocationName, "Local Location Name")
    .set(SamsungType2MakernoteDirectory.TagPreviewIfd, "Preview IFD")
    .set(SamsungType2MakernoteDirectory.TagRawDataByteOrder, "Raw Data Byte Order")
    .set(SamsungType2MakernoteDirectory.TagWhiteBalanceSetup, "White Balance Setup")
    .set(SamsungType2MakernoteDirectory.TagCameraTemperature, "Camera Temperature")
    .set(SamsungType2MakernoteDirectory.TagRawDataCFAPattern, "Raw Data CFA Pattern")
    .set(SamsungType2MakernoteDirectory.TagFaceDetect, "Face Detect")
    .set(SamsungType2MakernoteDirectory.TagFaceRecognition, "Face Recognition")
    .set(SamsungType2MakernoteDirectory.TagFaceName, "Face Name")
    .set(SamsungType2MakernoteDirectory.TagFirmwareName, "Firmware Name")
    .set(SamsungType2MakernoteDirectory.TagSerialNumber, "Serial Number")
    .set(SamsungType2MakernoteDirectory.TagLensType, "Lens Type")
    .set(SamsungType2MakernoteDirectory.TagLensFirmware, "Lens Firmware")
    .set(SamsungType2MakernoteDirectory.TagInternalLensSerialNumber, "Internal Lens Serial Number")
    .set(SamsungType2MakernoteDirectory.TagSensorAreas, "Sensor Areas")
    .set(SamsungType2MakernoteDirectory.TagColorSpace, "Color Space")
    .set(SamsungType2MakernoteDirectory.TagSmartRange, "Smart Range")
    .set(SamsungType2MakernoteDirectory.TagExposureCompensation, "Exposure Compensation")
    .set(SamsungType2MakernoteDirectory.TagISO, "ISO")
    .set(SamsungType2MakernoteDirectory.TagExposureTime, "Exposure Time")
    .set(SamsungType2MakernoteDirectory.TagFNumber, "F-Number")
    .set(SamsungType2MakernoteDirectory.TagFocalLengthIn35mmFormat, "Focal Length in 35mm Format")
    .set(SamsungType2MakernoteDirectory.TagEncryptionKey, "Encryption Key")

  constructor() {
    super()
    this.setDescriptor(new SamsungType2MakernoteDescriptor(this))
  }

  public getName(): string{
    return "Samsung Makernote";
  }

  protected getTagNameMap(): Map<number, string>{
    return SamsungType2MakernoteDirectory._tagNameMap;
  }
}