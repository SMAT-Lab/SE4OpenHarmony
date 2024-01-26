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
import Mp4MediaDirectory from './Mp4MediaDirectory';
import Mp4TextDescriptor from './Mp4TextDescriptor';
export default class Mp4TextDirectory extends Mp4MediaDirectory {
    private static readonly tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        Mp4MediaDirectory.addMp4MediaTags(Mp4TextDirectory.tagNameMap);
        this.setDescriptor(new Mp4TextDescriptor(this));
    }
    public getName(): string {
        return "MP4 Text";
    }
    protected getTagNameMap(): Map<number, string> {
        return Mp4TextDirectory.tagNameMap;
    }
}
