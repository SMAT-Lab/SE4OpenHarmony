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
import Mp4HintDescriptor from './Mp4HintDescriptor';
export default class Mp4HintDirectory extends Mp4MediaDirectory {
    public static readonly TAG_MAX_PDU_SIZE: number = 101;
    public static readonly TAG_AVERAGE_PDU_SIZE: number = 102;
    public static readonly TAG_MAX_BITRATE: number = 103;
    public static readonly TAG_AVERAGE_BITRATE: number = 104;
    private static readonly tagNameMap: Map<number, string> = new Map();
    public constructor() {
        super();
        Mp4MediaDirectory.addMp4MediaTags(Mp4HintDirectory.tagNameMap);
        Mp4HintDirectory.tagNameMap.set(Mp4HintDirectory.TAG_MAX_PDU_SIZE, "Max PDU Size");
        Mp4HintDirectory.tagNameMap.set(Mp4HintDirectory.TAG_AVERAGE_PDU_SIZE, "Average PDU Size");
        Mp4HintDirectory.tagNameMap.set(Mp4HintDirectory.TAG_MAX_BITRATE, "Max Bitrate");
        Mp4HintDirectory.tagNameMap.set(Mp4HintDirectory.TAG_AVERAGE_BITRATE, "Average Bitrate");
        this.setDescriptor(new Mp4HintDescriptor(this));
    }
    public getName(): string {
        return "MP4 Hint";
    }
    protected getTagNameMap(): Map<number, string> {
        return Mp4HintDirectory.tagNameMap;
    }
}
