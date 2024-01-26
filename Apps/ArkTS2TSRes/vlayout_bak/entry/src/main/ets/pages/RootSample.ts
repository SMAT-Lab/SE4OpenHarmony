interface RootSample_Params {
    sample?: routerType[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RootSample_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
class RootSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.sample = [
            { title: 'VLayoutActivity', page: 'pages/VLayoutSample' },
            { title: 'MainActivity', page: 'pages/MainSample' },
            { title: 'TestActivity', page: 'pages/TestSample' },
            { title: 'OnePlusNLayoutActivity', page: 'pages/OnePlusNLayoutSample' },
            { title: 'DebugActivity', page: 'pages/DebugSample' },
            { title: 'GridChangeSampleActivity', page: 'pages/GridChangeSample' },
            { title: 'NestedActivity', page: 'pages/NestedSample' },
            { title: 'AspectRatioActivity', page: 'pages/AspectRatioSample' },
            { title: 'NewActivity', page: 'pages/NewSample' },
            { title: 'FixActivity', page: 'pages/FixSample' },
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RootSample_Params) {
        if (params.sample !== undefined) {
            this.sample = params.sample;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private sample: routerType[];
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#FAFAFA');
        List.create();
        List.edgeEffect(EdgeEffect.None);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.sample), (item: routerType) => {
            ListItem.create();
            Column.create();
            Text.create(item.title);
            Text.width('100%');
            Text.margin('3%');
            Text.fontSize(18);
            Text.fontColor('#000000');
            Text.onClick(() => {
                router.push({ url: item.page });
            });
            Text.pop();
            Divider.create();
            Divider.color('#DCDCDC');
            Divider.strokeWidth(1);
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class routerType {
    title: string = '';
    page: string = '';
}
loadDocument(new RootSample("1", undefined, {}));
