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
import Directory from '../Directory';
import StringValue from '../StringValue';
import GifCommentDescriptor from './GifCommentDescriptor';
class GifCommentDirectory extends Directory {
    public static readonly TAG_COMMENT: number = 1;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(GifCommentDirectory.TAG_COMMENT, "Comment");
    public constructor(comment: StringValue) {
        super();
        this.setDescriptor(new GifCommentDescriptor(this));
        this.setStringValue(GifCommentDirectory.TAG_COMMENT, comment);
    }
    public getName(): string {
        return "GIF Comment";
    }
    protected getTagNameMap(): Map<number, string> {
        return GifCommentDirectory._tagNameMap;
    }
}
export default GifCommentDirectory;
