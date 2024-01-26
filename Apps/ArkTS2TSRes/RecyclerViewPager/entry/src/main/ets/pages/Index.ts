interface Index_Params {
    samplelist?: Data[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.samplelist = [
            new Data("Single Fling Pager(like official ViewPager)", "singleFlingPagerActivity"),
            new Data("Material Demo", "materialContainderActivity"),
            new Data("Vertical ViewPager Demo", "verticalViewPagerDemoActivity"),
            new Data("Loop ViewPager Demo", "singleFlingPagerActivitySelect"),
            new Data("Reverse Single Fling Pager(like official ViewPager)", "singleFlingPagerActivityRe"),
            new Data("Reverse Vertical ViewPager Demo", "verticalViewPagerDemoActivityRe")
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.samplelist !== undefined) {
            this.samplelist = params.samplelist;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private samplelist: Data[];
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.samplelist), (item: Data) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Center });
            Flex.padding(10);
            Flex.border({ width: "2px", color: "#bbbbbb" });
            Flex.width('100%');
            Flex.height('10%');
            Flex.onClick(() => {
                router.pushUrl({ url: "pages/" + item.pages });
                console.info("click=" + item.url);
            });
            Text.create(item.url);
            Text.fontSize(15);
            Text.pop();
            Flex.pop();
        }, (item: Data) => {
            return item.url;
        });
        ForEach.pop();
        Flex.pop();
    }
}
class Data {
    url: string;
    pages: string;
    constructor(url: string, pages: string) {
        this.url = url;
        this.pages = pages;
    }
}
loadDocument(new Index("1", undefined, {}));
