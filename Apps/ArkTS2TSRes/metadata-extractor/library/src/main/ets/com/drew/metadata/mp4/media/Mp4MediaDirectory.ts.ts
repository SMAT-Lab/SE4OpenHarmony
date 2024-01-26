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
import Mp4Directory from '../Mp4Directory';
abstract class Mp4MediaDirectory extends Mp4Directory {
    public static readonly TAG_CREATION_TIME = 101;
    public static readonly TAG_MODIFICATION_TIME = 102;
    public static readonly TAG_DURATION = 103;
    public static readonly TAG_LANGUAGE_CODE = 104;
    public static addMp4MediaTags(map: Map<number, string>): void {
        map.set(Mp4MediaDirectory.TAG_CREATION_TIME, "Creation Time");
        map.set(Mp4MediaDirectory.TAG_MODIFICATION_TIME, "Modification Time");
        map.set(Mp4MediaDirectory.TAG_DURATION, "Duration");
        map.set(Mp4MediaDirectory.TAG_LANGUAGE_CODE, "ISO 639-2 Language Code");
    }
    constructor() {
        super();
    }
}
export default Mp4MediaDirectory;
