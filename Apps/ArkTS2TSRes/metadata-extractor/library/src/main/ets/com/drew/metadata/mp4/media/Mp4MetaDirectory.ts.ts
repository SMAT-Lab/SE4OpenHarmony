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
import Mp4MetaDescriptor from './Mp4MetaDescriptor';
import Mp4MediaDirectory from './Mp4MediaDirectory';
class Mp4MetaDirectory extends Mp4MediaDirectory {
    constructor() {
        super();
        this.setDescriptor(new Mp4MetaDescriptor(this));
    }
    public static readonly _tagNameMap = new Map<number, string>();
    function() {
        Mp4MediaDirectory.addMp4MediaTags(Mp4MetaDirectory._tagNameMap);
    }
    public getName() {
        return "MP4 Metadata";
    }
    protected getTagNameMap(): Map<number, string> {
        return Mp4MetaDirectory._tagNameMap;
    }
}
export default Mp4MetaDirectory;
