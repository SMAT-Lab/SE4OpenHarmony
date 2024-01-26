let __generate__Id: number = 0;
function generateId(): string {
    return "author_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default class Author {
    mAuthorId: string;
    mAuthorName: string;
    mAuthorEmailId: string;
    mAuthorPassword: string;
    constructor(authorId: string, authorName: string, authorEmailId: string, authorPassword: string) {
        this.mAuthorId = authorId;
        this.mAuthorName = authorName;
        this.mAuthorEmailId = authorEmailId;
        this.mAuthorPassword = authorPassword;
    }
    get authorId() {
        return this.mAuthorId;
    }
    set authorId(authorId) {
        this.mAuthorId = authorId;
    }
    get authorName() {
        return this.mAuthorName;
    }
    set authorName(authorName: string) {
        this.mAuthorName = authorName;
    }
    get authorEmailId() {
        return this.mAuthorEmailId;
    }
    set authorEmailId(authorEmailId: string) {
        this.mAuthorEmailId = authorEmailId;
    }
    get authorPassword() {
        return this.mAuthorPassword;
    }
    set authorPassword(authorPassword: string) {
        this.mAuthorPassword = authorPassword;
    }
    equals(obj: Object) {
        if (obj instanceof Author) {
            let author = obj;
            if (this.mAuthorEmailId === (author.mAuthorEmailId)
                && this.mAuthorPassword === (author.mAuthorPassword)
                && this.mAuthorId == author.mAuthorId
                && this.mAuthorName === (author.mAuthorName)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    toString() {
        return '(' + this.mAuthorEmailId + ', ' + this.mAuthorPassword + ', ' + this.mAuthorId + ', ' +
            this.mAuthorName + ')';
    }
}
