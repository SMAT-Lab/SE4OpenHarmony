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
export default class UuidType {
    public static readonly Unknown: string = "Unknown";
    public static readonly Exif: string = "Exif";
    public static readonly PhotoshopImageResources: string = "PhotoshopImageResources";
    public static readonly IptcIim: string = "IptcIim";
    public static readonly PiffTrackEncryptionBox: string = "PiffTrackEncryptionBox";
    public static readonly GeoJp2WorldFileBox: string = "GeoJp2WorldFileBox";
    public static readonly PiffSampleEncryptionBox: string = "PiffSampleEncryptionBox";
    public static readonly GeoJp2GeoTiffBox: string = "GeoJp2GeoTiffBox";
    public static readonly Xmp: string = "Xmp";
    public static readonly PiffProtectionSystemSpecificHeaderBox: string = "PiffProtectionSystemSpecificHeaderBox";
}
