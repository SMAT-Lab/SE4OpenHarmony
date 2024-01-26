interface SampleList_Params {
    pageInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SampleList_" + ++__generate__Id;
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
import { PageInfo, PageItem } from './Index';
class SampleList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.pageInfo = router.getParams() as PageInfo;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SampleList_Params) {
        if (params.pageInfo !== undefined) {
            this.pageInfo = params.pageInfo;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private pageInfo;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.pageInfo.sampleList), (item: PageItem) => {
            Flex.create();
            Flex.padding(10);
            Flex.border({ width: "2px", color: "#bbbbbb" });
            Flex.width("100%");
            Flex.onClick(() => {
                router.pushUrl({
                    url: '@bundle:cn.openharmony.circleindicator/sharedlibrary/ets/' + "pages/" + item.url,
                });
            });
            Text.create(item.text);
            Text.fontSize(20);
            Text.pop();
            Flex.pop();
        }, (item: PageItem) => item.text);
        ForEach.pop();
        Flex.pop();
    }
}
loadDocument(new SampleList("1", undefined, {}));
