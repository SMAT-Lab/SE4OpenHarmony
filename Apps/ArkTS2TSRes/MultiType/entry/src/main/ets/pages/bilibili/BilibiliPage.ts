interface GridData_Params {
    imageItem?: Post;
}
interface ListData_Params {
    imageItem?: Post;
}
interface MoreGrid_Params {
    rowsTemplate?: string;
    mHeight?: number;
    posts?: Array<Post>;
}
interface Index_Params {
    PREFIX?: string;
    post00?: Post;
    post01?: Post;
    post10?: Post;
    post11?: Post;
    posts?: Array<Post>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BilibiliPage_" + ++__generate__Id;
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
import { Post } from './Post';
import { TitleBar } from '../common/TitleBar';
import { TitleMore } from '../common/CategoryHolderInflater';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.PREFIX = "这是一条长长的达到两行的标题文字";
        this.post00 = new Post($r('app.media.img_00'), this.PREFIX + "post00");
        this.post01 = new Post($r('app.media.img_01'), this.PREFIX + "post01");
        this.post10 = new Post($r('app.media.img_10'), this.PREFIX + "post10");
        this.post11 = new Post($r('app.media.img_11'), this.PREFIX + "post11");
        this.posts = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.PREFIX !== undefined) {
            this.PREFIX = params.PREFIX;
        }
        if (params.post00 !== undefined) {
            this.post00 = params.post00;
        }
        if (params.post01 !== undefined) {
            this.post01 = params.post01;
        }
        if (params.post10 !== undefined) {
            this.post10 = params.post10;
        }
        if (params.post11 !== undefined) {
            this.post11 = params.post11;
        }
        if (params.posts !== undefined) {
            this.posts = params.posts;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private PREFIX: string;
    private post00: Post;
    private post01: Post;
    private post10: Post;
    private post11: Post;
    private posts: Array<Post>;
    aboutToAppear() {
        this.posts.push(this.post00);
        this.posts.push(this.post01);
        this.posts.push(this.post10);
        this.posts.push(this.post11);
        this.posts.push(this.post00);
        this.posts.push(this.post01);
        this.posts.push(this.post00);
        this.posts.push(this.post00);
    }
    render() {
        Column.create();
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
        Scroll.create();
        Scroll.height('94%');
        Column.create();
        ForEach.create("5", this, ObservedObject.GetRawObject(this.posts), (item: Post) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.width('100%');
            let earlierCreatedChild_3: TitleMore = (this && this.findChildById) ? this.findChildById("3") as TitleMore : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new TitleMore("3", this, { title: 'title0' }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    title: 'title0'
                });
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
            let earlierCreatedChild_4: MoreGrid = (this && this.findChildById) ? this.findChildById("4") as MoreGrid : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new MoreGrid("4", this, { posts: this.posts }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    posts: this.posts
                });
                if (!earlierCreatedChild_4.needsUpdate()) {
                    earlierCreatedChild_4.markStatic();
                }
                View.create(earlierCreatedChild_4);
            }
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
class MoreGrid extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.rowsTemplate = '';
        this.mHeight = 0;
        this.posts = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MoreGrid_Params) {
        if (params.rowsTemplate !== undefined) {
            this.rowsTemplate = params.rowsTemplate;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.posts !== undefined) {
            this.posts = params.posts;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private rowsTemplate: string;
    private mHeight: number;
    private posts: Array<Post>;
    aboutToAppear() {
        let rows = Math.round(this.posts.length / 2);
        this.rowsTemplate = '1fr '.repeat(rows);
        this.mHeight = rows * 150;
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        Grid.create();
        Grid.rowsTemplate(this.rowsTemplate);
        Grid.columnsTemplate('1fr 1fr');
        Grid.columnsGap(8);
        Grid.rowsGap(8);
        Grid.height(this.mHeight);
        ForEach.create("7", this, ObservedObject.GetRawObject(this.posts), (item: Post) => {
            GridItem.create();
            let earlierCreatedChild_6: GridData = (this && this.findChildById) ? this.findChildById("6") as GridData : undefined;
            if (earlierCreatedChild_6 == undefined) {
                View.create(new GridData("6", this, { imageItem: item }));
            }
            else {
                earlierCreatedChild_6.updateWithValueParams({
                    imageItem: item
                });
                if (!earlierCreatedChild_6.needsUpdate()) {
                    earlierCreatedChild_6.markStatic();
                }
                View.create(earlierCreatedChild_6);
            }
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
class ListData extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageItem = new Post($r('app.media.img_11'), '');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ListData_Params) {
        if (params.imageItem !== undefined) {
            this.imageItem = params.imageItem;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private imageItem: Post;
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ left: 15, right: 15 });
        Column.backgroundColor(Color.White);
        Image.create(this.imageItem.res);
        Image.objectFit(ImageFit.Contain);
        Image.height(150);
        Image.width('100%');
        Image.renderMode(ImageRenderMode.Original);
        Text.create(this.imageItem.title);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
    }
}
class GridData extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageItem = new Post($r('app.media.img_11'), '');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GridData_Params) {
        if (params.imageItem !== undefined) {
            this.imageItem = params.imageItem;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private imageItem: Post;
    render() {
        Column.create();
        Column.width('100%');
        Column.height(130);
        Column.margin({ left: 15, right: 15 });
        Column.backgroundColor(Color.White);
        Image.create(this.imageItem.res);
        Image.objectFit(ImageFit.Contain);
        Image.height(90);
        Image.width('100%');
        Image.renderMode(ImageRenderMode.Original);
        Text.create(this.imageItem.title);
        Text.width(180);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
