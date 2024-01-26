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
import TagDescriptor from '../TagDescriptor';
import Directory from '../Directory';
import FileSystemDescriptor from './FileSystemDescriptor';
class FileSystemDirectory extends Directory {
    public static readonly TAG_FILE_NAME: number = 1;
    public static readonly TAG_FILE_SIZE: number = 2;
    public static readonly TAG_FILE_MODIFIED_DATE: number = 3;
    public static readonly _tagNameMap: Map<number, string> = new Map([[FileSystemDirectory.TAG_FILE_NAME, "File Name"],
        [FileSystemDirectory.TAG_FILE_SIZE, "File Size"],
        [FileSystemDirectory.TAG_FILE_MODIFIED_DATE, "File Modified Date"]]);
    constructor() {
        super();
        this.setDescriptor(new FileSystemDescriptor(this));
    }
    public getName(): string {
        return "File";
    }
    protected getTagNameMap(): Map<number, string> {
        return FileSystemDirectory._tagNameMap;
    }
}
export default FileSystemDirectory;
