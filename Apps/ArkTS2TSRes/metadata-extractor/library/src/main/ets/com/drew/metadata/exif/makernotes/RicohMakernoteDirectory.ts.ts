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
import { RicohMakernoteDescriptor } from './RicohMakernoteDescriptor';
import Directory from '../../Directory';
export class RicohMakernoteDirectory extends Directory {
    public static TAG_MAKERNOTE_DATA_TYPE: number = 0x0001;
    public static TAG_VERSION: number = 0x0002;
    public static TAG_PRINT_IMAGE_MATCHING_INFO: number = 0x0E00;
    public static TAG_RICOH_CAMERA_INFO_MAKERNOTE_SUB_IFD_POINTER: number = 0x2001;
    private static _tagNameMap = new Map<number, string>()
        .set(RicohMakernoteDirectory.TAG_MAKERNOTE_DATA_TYPE, "Makernote Data Type")
        .set(RicohMakernoteDirectory.TAG_VERSION, "Version")
        .set(RicohMakernoteDirectory.TAG_PRINT_IMAGE_MATCHING_INFO, "Print Image Matching (PIM) Info")
        .set(RicohMakernoteDirectory.TAG_RICOH_CAMERA_INFO_MAKERNOTE_SUB_IFD_POINTER, "Ricoh Camera Info Makernote Sub-IFD");
    constructor() {
        super();
        this.setDescriptor(new RicohMakernoteDescriptor(this));
    }
    public getName(): string {
        return "Ricoh Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return RicohMakernoteDirectory._tagNameMap;
    }
}
