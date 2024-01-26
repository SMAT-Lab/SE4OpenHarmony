interface SampleVideoListPage_Params {
    items?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SampleVideoListPage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import VideoNewsView from '../ListView/VideoNewsView';
class SampleVideoListPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.items = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SampleVideoListPage_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private items: Array<string>;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height(100);
        Flex.width('100%');
        Flex.backgroundColor(Color.Black);
        Text.create("ijkplayer播放器示例");
        Text.fontSize(26);
        Text.fontColor(Color.White);
        Text.margin(10);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Flex.pop();
        List.create({ space: 20, initialIndex: 0 });
        List.height('30%');
        ListItem.create();
        Text.create("测试地址:http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8");
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.Black);
        Text.margin(10);
        Text.onClick(() => {
            router.pushUrl({ url: "pages/IjkVideoPlayerPage", params: {
                    videoUrl: "http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8"
                } });
        });
        Text.pop();
        ListItem.pop();
        List.pop();
        List.create({ space: 20 });
        List.margin({ top: 30 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.items), (title: string) => {
            ListItem.create();
            let earlierCreatedChild_2: VideoNewsView = (this && this.findChildById) ? this.findChildById("2") as VideoNewsView : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new VideoNewsView("2", this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
}
loadDocument(new SampleVideoListPage("1", undefined, {}));
