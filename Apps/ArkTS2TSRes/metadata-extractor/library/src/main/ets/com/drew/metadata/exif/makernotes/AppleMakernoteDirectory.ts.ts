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
import Directory from '../../Directory';
import AppleMakernoteDescriptor from './AppleMakernoteDescriptor';
export default class AppleMakernoteDirectory extends Directory {
    public static readonly TAG_RUN_TIME: number = 0x0003;
    public static readonly TAG_ACCELERATION_VECTOR: number = 0x0008;
    public static readonly TAG_HDR_IMAGE_TYPE: number = 0x000a;
    public static readonly TAG_BURST_UUID: number = 0x000b;
    public static readonly TAG_CONTENT_IDENTIFIER: number = 0x0011;
    public static readonly TAG_IMAGE_UNIQUE_ID: number = 0x0015; // TODO is this actually 0x0016?
    public static readonly TAG_LIVE_PHOTO_ID: number = 0x0017;
    private static readonly _tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        this.setDescriptor(new AppleMakernoteDescriptor(this));
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_RUN_TIME, "Run Time");
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_ACCELERATION_VECTOR, "Acceleration Vector");
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_HDR_IMAGE_TYPE, "HDR Image Type");
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_BURST_UUID, "Burst UUID");
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_CONTENT_IDENTIFIER, "Content Identifier");
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_IMAGE_UNIQUE_ID, "Image Unique ID");
        AppleMakernoteDirectory._tagNameMap.set(AppleMakernoteDirectory.TAG_LIVE_PHOTO_ID, "Live Photo ID");
    }
    public getName(): string {
        return "Apple Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return AppleMakernoteDirectory._tagNameMap;
    }
}
