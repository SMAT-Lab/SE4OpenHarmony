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
import JfxxDirectory from './JfxxDirectory';
import TagDescriptor from '../TagDescriptor';
/**
 * Provides human-readable string versions of the tags stored in a JfxxDirectory.
 */
class JfxxDescriptor extends TagDescriptor<JfxxDirectory> {
    public constructor(directory: JfxxDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case JfxxDirectory.TAG_EXTENSION_CODE:
                return this.getExtensionCodeDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getExtensionCodeDescription(): string {
        let value: number = this._directory.getInteger(JfxxDirectory.TAG_EXTENSION_CODE);
        if (value == null)
            return null;
        switch (value) {
            case 0x10:
                return "Thumbnail coded using JPEG";
            case 0x11:
                return "Thumbnail stored using 1 byte/pixel";
            case 0x13:
                return "Thumbnail stored using 3 bytes/pixel";
            default:
                return "Unknown extension code " + value;
        }
    }
}
export default JfxxDescriptor;
