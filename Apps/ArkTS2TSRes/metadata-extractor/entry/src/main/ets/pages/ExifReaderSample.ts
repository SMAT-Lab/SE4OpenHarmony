interface ExifReaderSample_Params {
    isVisibility?: Visibility;
    data?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ExifReaderSample_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { Metadata } from '@ohos/metadata-extractor';
import { ExifReader } from '@ohos/metadata-extractor';
import { ByteArrayReader } from '@ohos/metadata-extractor';
import { FileUtil } from '@ohos/metadata-extractor';
import { GlobalContext } from './GlobalContext';
let fileDir: string;
class ExifReaderSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isVisibility = new ObservedPropertySimple(Visibility.Hidden, this, "isVisibility");
        this.__data = new ObservedPropertyObject([], this, "data");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ExifReaderSample_Params) {
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        this.__isVisibility.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isVisibility: ObservedPropertySimple<Visibility>;
    get isVisibility() {
        return this.__isVisibility.get();
    }
    set isVisibility(newValue: Visibility) {
        this.__isVisibility.set(newValue);
    }
    private __data: ObservedPropertyObject<Array<string>>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: Array<string>) {
        this.__data.set(newValue);
    }
    private getMetaData() {
        this.data.splice(0, this.data.length);
        fileDir = GlobalContext.getContext().getValue("filesDir") as string;
        let path = fileDir.concat("/manuallyAddedThumbnail.jpg.app1");
        try {
            let metadata: Metadata = new Metadata();
            new ExifReader().extract(new ByteArrayReader(FileUtil.readBytes(path)), metadata, ExifReader.JPEG_SEGMENT_PREAMBLE.length, null);
            metadata.getDirectories().forEach((value: any, vlue2: any, mataSet: any) => {
                console.debug("metadata-extractor exif directory parent:" + value.getParent());
                let directoryName: string = value.getName();
                value.getTags().forEach((tag: any, vlue2: any, mataSet: any) => {
                    let tagName: string = tag.getTagName();
                    let description: string = tag.getDescription();
                    this.data.push("[" + directoryName + "] " + tagName + " = " + description);
                });
            });
        }
        catch (err) {
            console.error("metadata error..");
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.padding(16);
        Flex.width('100%');
        Flex.height("100%");
        Column.create();
        Column.height("100%");
        Text.create("提取exif元数据");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding(20);
        Text.height("10%");
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create("资源路径:/resource/manuallyAddedThumbnail.jpg.app1");
        Text.fontSize(22);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.create();
        Column.height("70%");
        Column.padding({ bottom: 10 });
        Text.create("元数据:");
        Text.fontSize(20);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create("" + JSON.stringify(ObservedObject.GetRawObject(this.data)));
        Text.fontSize(20);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.visibility(this.isVisibility);
        Text.pop();
        Column.pop();
        Button.createWithLabel("显示元数据", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("70%");
        Button.height('8%');
        Button.onClick(() => {
            this.getMetaData();
            this.isVisibility = Visibility.Visible;
        });
        Button.pop();
        Column.pop();
        Flex.pop();
    }
}
loadDocument(new ExifReaderSample("1", undefined, {}));
