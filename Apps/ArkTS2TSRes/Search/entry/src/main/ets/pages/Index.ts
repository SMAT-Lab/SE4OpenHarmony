interface Index_Params {
    changeValue?: string;
    books?: BookModel[];
    controller?: SearchController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { DataModel, BookModel } from '../model/DataModel';
import TitleBar from '../common/TitleBar';
import { MainPage } from '@ohos/search';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__changeValue = new ObservedPropertySimple('', this, "changeValue");
        this.__books = new ObservedPropertyObject(new DataModel().getAllData(), this, "books");
        this.controller = new SearchController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.changeValue !== undefined) {
            this.changeValue = params.changeValue;
        }
        if (params.books !== undefined) {
            this.books = params.books;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__changeValue.aboutToBeDeleted();
        this.__books.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __changeValue: ObservedPropertySimple<string>;
    get changeValue() {
        return this.__changeValue.get();
    }
    set changeValue(newValue: string) {
        this.__changeValue.set(newValue);
    }
    private __books: ObservedPropertyObject<BookModel[]>;
    get books() {
        return this.__books.get();
    }
    set books(newValue: BookModel[]) {
        this.__books.set(newValue);
    }
    private controller: SearchController;
    BookItem(image: Resource, title: string, introduction: string, parent = null) {
        Row.create();
        Row.padding(10);
        Row.margin({ left: 10, right: 10 });
        Row.backgroundColor(Color.White);
        Row.borderRadius(10);
        Image.create(image);
        Image.width(80);
        Image.height(120);
        Column.create();
        Column.layoutWeight(1);
        Column.margin({ left: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create(title);
        Text.fontColor(Color.Black);
        Text.fontSize(25);
        Text.pop();
        Text.create(introduction);
        Text.fontColor(Color.Gray);
        Text.fontSize(25);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F5F5F5');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        List.create({ space: 10 });
        List.width('100%');
        List.height('100%');
        List.layoutWeight(1);
        List.margin({ bottom: 20 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.books), (item: BookModel) => {
            ListItem.create();
            this.BookItem(item.image, item.title, item.introduction, this);
            ListItem.pop();
        }, (item: BookModel) => item.title);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
