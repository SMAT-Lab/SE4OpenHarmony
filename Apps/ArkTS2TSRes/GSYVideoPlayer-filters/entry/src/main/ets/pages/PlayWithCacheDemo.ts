interface PlayWithCacheDemo_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayWithCacheDemo_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
class PlayWithCacheDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayWithCacheDemo_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('边播放边缓存');
        Button.margin(10);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/PlayNetWithCacheDemo' });
        });
        Button.pop();
        Button.createWithLabel('播放不缓存');
        Button.margin(10);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/PlayNetWithNoCacheDemo' });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new PlayWithCacheDemo("1", undefined, {}));
