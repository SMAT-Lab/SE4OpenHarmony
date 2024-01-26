interface PsdSample_Params {
    isVisibility?: Visibility;
    data?: string[];
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PsdSample_" + ++__generate__Id;
}
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
import { Metadata } from '@ohos/metadata-extractor';
import { ImageMetadataReader } from '@ohos/metadata-extractor';
import { GlobalContext } from './GlobalContext';
let fileDir: string;
class PsdSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isVisibility = new ObservedPropertySimple(Visibility.Hidden, this, "isVisibility");
        this.__data = new ObservedPropertyObject([], this, "data");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PsdSample_Params) {
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
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
    private __data: ObservedPropertyObject<string[]>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: string[]) {
        this.__data.set(newValue);
    }
    private scroller: Scroller;
    private getMetaData() {
        fileDir = GlobalContext.getContext().getValue("filesDir") as string;
        let path = fileDir.concat("/8x4x8bit-Grayscale.psd");
        this.data.splice(0, this.data.length);
        try {
            let metadata: Metadata = ImageMetadataReader.readMetadata(path);
            // iterate over the metadata and print to System.out
            metadata.getDirectories().forEach((value: any, vlue2: any, mataSet: any) => {
                let directoryName: string = value.getName();
                value.getTags().forEach((tag: any, vlue2: any, mataSet: any) => {
                    let tagName: string = tag.getTagName();
                    let description: string = tag.getDescription();
                    this.data.push("[" + directoryName + "] " + tagName + " = " + description);
                });
            });
            console.info("psd sample meta all:" + JSON.stringify(this.data));
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
        Text.create("提取Psd元数据");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding({ left: 10, right: 10, top: 10, bottom: 10 });
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create("资源路径:/resource/8x4x8bit-Grayscale.psd");
        Text.fontSize(22);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create("元数据:");
        Text.fontSize(20);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(1);
        Scroll.height('80%');
        Column.create();
        Text.create("" + JSON.stringify(ObservedObject.GetRawObject(this.data)));
        Text.fontSize(20);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.visibility(this.isVisibility);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Button.createWithLabel("显示Psd文件的元数据", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("100%");
        Button.height(60);
        Button.onClick(() => {
            this.getMetaData();
            this.isVisibility = Visibility.Visible;
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new PsdSample("1", undefined, {}));
