interface Index_Params {
    file?: string;
    mime?: string;
    files?: string[];
    mimes?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import mime from "mime";
import promptAction from '@ohos.promptAction';
let tag = "MIME----";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__file = new ObservedPropertySimple("", this, "file");
        this.__mime = new ObservedPropertySimple("", this, "mime");
        this.files = [
            "js",
            "json",
            "txt",
            "dir/text.txt",
            "dir\\text.txt",
            ".text.txt",
            ".txt",
        ];
        this.mimes = [
            'audio/aac',
            'application/x-abiword',
            'video/x-msvideo',
            'application/vnd.amazon.ebook',
            'image/bmp',
            'application/x-bzip',
            'image/gif',
            'text/html',
            'text/html',
            'image/vnd.microsoft.icon',
            'text/calendar',
            'application/java-archive',
            'image/jpeg',
            'image/jpeg',
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.file !== undefined) {
            this.file = params.file;
        }
        if (params.mime !== undefined) {
            this.mime = params.mime;
        }
        if (params.files !== undefined) {
            this.files = params.files;
        }
        if (params.mimes !== undefined) {
            this.mimes = params.mimes;
        }
    }
    aboutToBeDeleted() {
        this.__file.aboutToBeDeleted();
        this.__mime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __file: ObservedPropertySimple<string>;
    get file() {
        return this.__file.get();
    }
    set file(newValue: string) {
        this.__file.set(newValue);
    }
    private __mime: ObservedPropertySimple<string>;
    get mime() {
        return this.__mime.get();
    }
    set mime(newValue: string) {
        this.__mime.set(newValue);
    }
    private files: string[];
    private mimes: string[];
    showMessage(message: string) {
        promptAction.showToast({ message });
        console.log(`${tag}${message}`);
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height("100%");
        Column.padding({ top: 30, left: 10, right: 10 });
        Row.create();
        Row.margin({ bottom: 20 });
        Text.create("文件类型：");
        Text.pop();
        TextInput.create({ placeholder: "请输入文件类型", text: this.file });
        TextInput.width("50%");
        TextInput.onChange((value: string) => {
            this.file = value;
        });
        Row.pop();
        Text.create("FILE类型示例：");
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.files), (v: string) => {
            Text.create(v);
            Text.onClick(() => {
                this.file = v;
            });
            Text.padding(8);
            Text.pop();
        });
        ForEach.pop();
        Flex.pop();
        Button.createWithLabel("getType(通过文件类型获取MIME类型)");
        Button.onClick(() => {
            this.showMessage(mime.getType(this.file) || "不支持的媒体类型");
        });
        Button.width("80%");
        Button.margin({ top: 20, bottom: 20 });
        Button.pop();
        Row.create();
        Row.margin({ bottom: 20 });
        Text.create("媒体类型：");
        Text.pop();
        TextInput.create({ placeholder: "请输入媒体类型", text: this.mime });
        TextInput.width("50%");
        TextInput.onChange((value: string) => {
            this.mime = value;
        });
        Row.pop();
        Text.create("MIME类型示例：");
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.mimes), (v: string) => {
            Text.create(v);
            Text.onClick(() => {
                this.mime = v;
            });
            Text.padding(8);
            Text.pop();
        });
        ForEach.pop();
        Flex.pop();
        Button.createWithLabel("getExtension(通过MIME类型获取文件拓展名)");
        Button.onClick(() => {
            this.showMessage(mime.getExtension(this.mime) || "不支持的媒体类型");
        });
        Button.width("80%");
        Button.margin({ top: 20, bottom: 20 });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
