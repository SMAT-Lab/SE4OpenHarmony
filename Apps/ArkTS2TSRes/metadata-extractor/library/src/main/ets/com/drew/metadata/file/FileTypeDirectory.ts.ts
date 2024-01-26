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
import FileTypeDescriptor from './FileTypeDescriptor';
import FileType from '../../imaging/FileType';
import Directory from '../Directory';
class FileTypeDirectory extends Directory {
    public static readonly TAG_DETECTED_FILE_TYPE_NAME: number = 1;
    public static readonly TAG_DETECTED_FILE_TYPE_LONG_NAME: number = 2;
    public static readonly TAG_DETECTED_FILE_MIME_TYPE: number = 3;
    public static readonly TAG_EXPECTED_FILE_NAME_EXTENSION: number = 4;
    public static readonly _tagNameMap: Map<number, string> = new Map([[FileTypeDirectory.TAG_DETECTED_FILE_TYPE_NAME, "Detected File Type Name"], [FileTypeDirectory.TAG_DETECTED_FILE_TYPE_LONG_NAME, "Detected File Type Long Name"], [FileTypeDirectory.TAG_DETECTED_FILE_MIME_TYPE, "Detected MIME Type"], [FileTypeDirectory.TAG_EXPECTED_FILE_NAME_EXTENSION, "Expected File Name Extension"]]);
    //    static {
    //        _tagNameMap.put(TAG_DETECTED_FILE_TYPE_NAME, "Detected File Type Name");
    //        _tagNameMap.put(TAG_DETECTED_FILE_TYPE_LONG_NAME, "Detected File Type Long Name");
    //        _tagNameMap.put(TAG_DETECTED_FILE_MIME_TYPE, "Detected MIME Type");
    //        _tagNameMap.put(TAG_EXPECTED_FILE_NAME_EXTENSION, "Expected File Name Extension");
    //    }
    constructor(fileType: FileType) {
        super();
        this.setDescriptor(new FileTypeDescriptor(this));
        super.setString(FileTypeDirectory.TAG_DETECTED_FILE_TYPE_NAME, fileType.getName());
        super.setString(FileTypeDirectory.TAG_DETECTED_FILE_TYPE_LONG_NAME, fileType.getLongName());
        if (fileType.getMimeType() != null)
            super.setString(FileTypeDirectory.TAG_DETECTED_FILE_MIME_TYPE, fileType.getMimeType());
        if (fileType.getCommonExtension() != null)
            super.setString(FileTypeDirectory.TAG_EXPECTED_FILE_NAME_EXTENSION, fileType.getCommonExtension());
    }
    public getName(): string {
        return "File Type";
    }
    protected getTagNameMap(): Map<number, string> {
        return FileTypeDirectory._tagNameMap;
    }
}
export default FileTypeDirectory;
