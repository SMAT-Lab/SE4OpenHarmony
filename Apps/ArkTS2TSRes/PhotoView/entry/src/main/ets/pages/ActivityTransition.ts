interface Sample_Params {
    data?: PhotoView.Model;
    numbers?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ActivityTransition_" + ++__generate__Id;
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
import { PhotoView } from '@ohos/photoview';
import router from '@ohos.router';
class Sample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new PhotoView.Model(), this, "data");
        this.__numbers = new ObservedPropertyObject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], this, "numbers");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sample_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.numbers !== undefined) {
            this.numbers = params.numbers;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__numbers.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<PhotoView.Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: PhotoView.Model) {
        this.__data.set(newValue);
    }
    private __numbers: ObservedPropertyObject<number[]>;
    get numbers() {
        return this.__numbers.get();
    }
    set numbers(newValue: number[]) {
        this.__numbers.set(newValue);
    }
    aboutToAppear() {
        console.info("photo transition create:" + this.numbers.length);
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(0x3d3d3d);
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(0x3d3d3d);
        Image.create($r('app.media.back'));
        Image.width(50);
        Image.height(50);
        Image.margin({ left: 5 });
        Image.onClick((event: ClickEvent) => {
            router.back();
        });
        Text.create('ActivityTransition Sample');
        Text.width('75%');
        Text.fontColor(0xffffff);
        Text.fontSize(20);
        Text.margin({ top: 4 });
        Text.pop();
        Row.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr');
        Grid.width('100%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.onScrollIndex((first: number) => {
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.numbers), (item: number) => {
            GridItem.create();
            GridItem.onClick(() => {
                let path = 'pages/ActivityTransitionTo';
                router.pushUrl({
                    url: path,
                });
            });
            Image.create($r("app.media.wallpaper"));
            Image.width('100%');
            Image.height(200);
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
loadDocument(new Sample("1", undefined, {}));
