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
import JfxxDescriptor from './JfxxDescriptor';
import Directory from '../Directory';
/**
 * Directory of tags and values for the SOF0 JFXX segment.
 */
class JfxxDirectory extends Directory {
    public static readonly TAG_EXTENSION_CODE: number = 5;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [JfxxDirectory.TAG_EXTENSION_CODE, "Extension Code"]
    ]);
    public JfxxDirectory() {
        this.setDescriptor(new JfxxDescriptor(this));
    }
    public getName(): string {
        return "JFXX";
    }
    protected getTagNameMap(): Map<number, string> {
        return JfxxDirectory._tagNameMap;
    }
    public getExtensionCode(): number {
        return this.getInt(JfxxDirectory.TAG_EXTENSION_CODE);
    }
}
export default JfxxDirectory;
