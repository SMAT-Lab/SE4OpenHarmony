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
import JpegCommentDescriptor from './JpegCommentDescriptor';
import Directory from '../Directory';
class JpegCommentDirectory extends Directory {
    public static readonly TAG_COMMENT: number = 0;
    public static readonly _tagNameMap: Map<number, string> = new Map<number, string>([
        [JpegCommentDirectory.TAG_COMMENT, "JPEG Comment"]
    ]);
    constructor() {
        super();
        this.setDescriptor(new JpegCommentDescriptor(this));
    }
    public getName(): string {
        return "JpegComment";
    }
    public getTagNameMap(): Map<number, string> {
        return JpegCommentDirectory._tagNameMap;
    }
}
export default JpegCommentDirectory;
