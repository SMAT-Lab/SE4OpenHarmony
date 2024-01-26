interface BinderType_Params {
    itemData?: itemsType;
}
interface Weibo_Params {
    items?: Array<itemsType>;
    JSON_FROM_SERVICE?: string;
    deleteItem?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WeiboPage_" + ++__generate__Id;
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
import { TitleBar } from '../common/TitleBar';
class Weibo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__items = new ObservedPropertyObject([], this, "items");
        this.JSON_FROM_SERVICE = '[{ "content":{"text":"A simple text Weibo: JSON_FROM_SERVICE.", "content_type":"simple_text"}, "createTime":"Just now", "user":{"avatar":0, "name":"drakeet"}},{"content":{"resId":0,"content_type":"simple_image"},"createTime":"Just now","user":{"avatar":0,"name":"drakeet"}}]';
        this.__deleteItem = new ObservedPropertySimple(false, this, "deleteItem");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Weibo_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.JSON_FROM_SERVICE !== undefined) {
            this.JSON_FROM_SERVICE = params.JSON_FROM_SERVICE;
        }
        if (params.deleteItem !== undefined) {
            this.deleteItem = params.deleteItem;
        }
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        this.__deleteItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __items: ObservedPropertyObject<Array<itemsType>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<itemsType>) {
        this.__items.set(newValue);
    }
    private JSON_FROM_SERVICE: string;
    private __deleteItem: ObservedPropertySimple<boolean>;
    get deleteItem() {
        return this.__deleteItem.get();
    }
    set deleteItem(newValue: boolean) {
        this.__deleteItem.set(newValue);
    }
    aboutToAppear() {
        let num: number = 0;
        while (num < 20) {
            if (num % 2 == 0) {
                this.items.push({
                    content: {
                        text: "A simple text Weibo: " + ((num == 0) ? "JSON_FROM_SERVICE." : "Hello World."),
                        content_type: "simple_text"
                    },
                    createTime: "Just now",
                    user: {
                        avatar: $r("app.media.img_00"),
                        name: "drakeet" + num
                    }
                });
            }
            else {
                this.items.push({
                    content: {
                        text: "A simple text Weibo: Hello World.",
                        content_type: "simple_image"
                    },
                    createTime: (num == 1) ? "Just now(JSON_FROM_SERVICE)" : "Just now",
                    user: {
                        avatar: (num == 1) ? $r("app.media.img_00") : $r("app.media.img_10"),
                        name: "drakeet" + num
                    }
                });
            }
            num++;
        }
    }
    render() {
        Column.create();
        Column.width('100%');
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
        List.create({ space: 5, initialIndex: 0 });
        List.height('94%');
        ForEach.create("4", this, ObservedObject.GetRawObject(this.items), (item: itemsType, index: number) => {
            ListItem.create();
            ListItem.backgroundColor(Color.White);
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
            Image.create($r("app.media.avatar_drakeet"));
            Image.objectFit(ImageFit.Cover);
            Image.width(36);
            Image.height(36);
            Image.margin(15);
            Column.create();
            Column.width('75%');
            Column.alignItems(HorizontalAlign.Start);
            Row.create();
            Row.width('100%');
            Row.margin({ top: 15 });
            Text.create(item.user.name);
            Text.fontSize(16);
            Text.fontWeight(700);
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create("close");
            Text.fontSize(16);
            Text.fontWeight(700);
            Text.onClick(() => {
                this.deleteItem = !this.deleteItem;
                this.items.splice(this.items.indexOf(item), 1);
            });
            Text.pop();
            Row.pop();
            let earlierCreatedChild_3: BinderType = (this && this.findChildById) ? this.findChildById("3") as BinderType : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new BinderType("3", this, { itemData: item }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    itemData: item
                });
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
            Text.create(item.createTime);
            Text.fontSize(14);
            Text.pop();
            Column.pop();
            Row.pop();
            ListItem.pop();
        }, (item: itemsType, index: number) => item.user.name.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class BinderType extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.itemData = new itemsType();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BinderType_Params) {
        if (params.itemData !== undefined) {
            this.itemData = params.itemData;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private itemData: itemsType;
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 6, bottom: 6 });
        Column.alignItems(HorizontalAlign.Start);
        If.create();
        if (this.itemData.content.content_type == 'simple_text') {
            If.branchId(0);
            Text.create(this.itemData.content.text);
            Text.fontSize(15);
            Text.pop();
        }
        else {
            If.branchId(1);
            Image.create(this.itemData.user.avatar);
            Image.objectFit(ImageFit.Cover);
            Image.width(90);
            Image.height(90);
            Image.renderMode(ImageRenderMode.Original);
        }
        If.pop();
        Column.pop();
    }
}
class itemsType {
    content: contentType = new contentType();
    createTime: string = '';
    user: userType = new userType();
}
class contentType {
    text: string = '';
    content_type: string = '';
}
class userType {
    avatar: ResourceStr = '';
    name: string = '';
}
loadDocument(new Weibo("1", undefined, {}));
