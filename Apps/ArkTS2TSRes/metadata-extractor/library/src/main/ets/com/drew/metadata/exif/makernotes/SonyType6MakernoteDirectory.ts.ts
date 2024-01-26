/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import SonyType6MakernoteDescriptor from './SonyType6MakernoteDescriptor';
import Directory from '../../Directory';
/**
 * Describes tags specific to Sony cameras that use the Sony Type 6 makernote tags.
 */
class SonyType6MakernoteDirectory extends Directory {
    public static readonly TAG_MAKERNOTE_THUMB_OFFSET: number = 0x0513;
    public static readonly TAG_MAKERNOTE_THUMB_LENGTH: number = 0x0514;
    //    public static readonly TAG_UNKNOWN_1: number = 0x0515;
    public static readonly TAG_MAKERNOTE_THUMB_VERSION: number = 0x2000;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [SonyType6MakernoteDirectory.TAG_MAKERNOTE_THUMB_OFFSET, "Makernote Thumb Offset"],
        [SonyType6MakernoteDirectory.TAG_MAKERNOTE_THUMB_LENGTH, "Makernote Thumb Length"],
        //        [SonyType6MakernoteDirectory.TAG_UNKNOWN_1, "Sony-6-0x0203"],
        [SonyType6MakernoteDirectory.TAG_MAKERNOTE_THUMB_VERSION, "Makernote Thumb Version"]
    ]);
    public SonyType6MakernoteDirectory() {
        this.setDescriptor(new SonyType6MakernoteDescriptor(this));
    }
    public getName(): string {
        return "Sony Makernote";
    }
    protected getTagNameMap(): Map<number, string> {
        return SonyType6MakernoteDirectory._tagNameMap;
    }
}
export default SonyType6MakernoteDirectory;
