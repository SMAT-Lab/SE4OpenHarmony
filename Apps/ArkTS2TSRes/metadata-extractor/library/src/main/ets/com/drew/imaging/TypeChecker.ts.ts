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
import FileType from './FileType';
/**
 * Used by {@link FileTypeDetector} for file types that cannot be identified by a simple byte-prefix analysis.
 */
interface TypeChecker {
    /**
     * Gets the number of bytes this type checker needs in order to identify its file type.
     */
    getByteCount(): number;
    /**
     * Returns the file type identified within 'bytes', otherwise 'Unknown'.
     */
    checkType(bytes: Int8Array): FileType;
}
export default TypeChecker;
