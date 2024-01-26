interface Index_Params {
    message?: string;
    db?: Database;
    userInfo?: UserInfo;
    config?: Config;
    controller?: Scroller;
    TextController?: TextInputController;
    databases?: Array<Database>;
    selectDatabase?: Database;
    databaseText?: string;
    collections?: Array<DocumentCollection>;
    selectCollection?: DocumentCollection | null;
    collectionText?: string;
    collectionActionType?: ECollectionType;
    data?: Array<object>;
    documentText?: string;
    from?: string;
    to?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { Database, aql, DocumentCollection } from "library";
import prompt from "@ohos.prompt";
import { createCollection, createEdgeCollection, getCollection, getData, remove, save } from './Util';
enum EValidateType {
    "COLLECTION",
    "DOCUMENT"
}
enum ECollectionType {
    "EDGE",
    "DOCUMENT"
}
class Config {
    host: string = "";
    userInfo: UserInfo;
    constructor(host: string, userInfo: UserInfo) {
        this.host = host;
        this.userInfo = userInfo;
    }
}
class UserInfo {
    username: string = "";
    password: string = "";
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
interface Options {
    _id: string;
    _from: string;
    _to: string;
    date: string;
    _key: string;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.db = null!;
        this.userInfo = new UserInfo("root", "123456");
        this.config = new Config("http://7fe565bb.r8.cpolar.top", this.userInfo);
        this.controller = new Scroller();
        this.TextController = new TextInputController();
        this.__databases = new ObservedPropertyObject([], this, "databases");
        this.__selectDatabase = new ObservedPropertyObject(null!, this, "selectDatabase");
        this.__databaseText = new ObservedPropertySimple("", this, "databaseText");
        this.__collections = new ObservedPropertyObject([], this, "collections");
        this.__selectCollection = new ObservedPropertyObject(null, this, "selectCollection");
        this.__collectionText = new ObservedPropertySimple("", this, "collectionText");
        this.__collectionActionType = new ObservedPropertySimple(ECollectionType.EDGE, this, "collectionActionType");
        this.__data = new ObservedPropertyObject([], this, "data");
        this.__documentText = new ObservedPropertySimple("", this, "documentText");
        this.__from = new ObservedPropertySimple("", this, "from");
        this.__to = new ObservedPropertySimple("", this, "to");
        this.updateWithValueParams(params);
        this.declareWatch("selectDatabase", this.getCollections);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.db !== undefined) {
            this.db = params.db;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.config !== undefined) {
            this.config = params.config;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.TextController !== undefined) {
            this.TextController = params.TextController;
        }
        if (params.databases !== undefined) {
            this.databases = params.databases;
        }
        if (params.selectDatabase !== undefined) {
            this.selectDatabase = params.selectDatabase;
        }
        if (params.databaseText !== undefined) {
            this.databaseText = params.databaseText;
        }
        if (params.collections !== undefined) {
            this.collections = params.collections;
        }
        if (params.selectCollection !== undefined) {
            this.selectCollection = params.selectCollection;
        }
        if (params.collectionText !== undefined) {
            this.collectionText = params.collectionText;
        }
        if (params.collectionActionType !== undefined) {
            this.collectionActionType = params.collectionActionType;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.documentText !== undefined) {
            this.documentText = params.documentText;
        }
        if (params.from !== undefined) {
            this.from = params.from;
        }
        if (params.to !== undefined) {
            this.to = params.to;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__databases.aboutToBeDeleted();
        this.__selectDatabase.aboutToBeDeleted();
        this.__databaseText.aboutToBeDeleted();
        this.__collections.aboutToBeDeleted();
        this.__selectCollection.aboutToBeDeleted();
        this.__collectionText.aboutToBeDeleted();
        this.__collectionActionType.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__documentText.aboutToBeDeleted();
        this.__from.aboutToBeDeleted();
        this.__to.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private db: Database;
    private userInfo: UserInfo;
    private config: Config;
    private controller: Scroller;
    private TextController: TextInputController;
    private __databases: ObservedPropertyObject<Array<Database>>;
    get databases() {
        return this.__databases.get();
    }
    set databases(newValue: Array<Database>) {
        this.__databases.set(newValue);
    }
    private __selectDatabase: ObservedPropertyObject<Database>;
    get selectDatabase() {
        return this.__selectDatabase.get();
    }
    set selectDatabase(newValue: Database) {
        this.__selectDatabase.set(newValue);
    }
    private __databaseText: ObservedPropertySimple<string>;
    get databaseText() {
        return this.__databaseText.get();
    }
    set databaseText(newValue: string) {
        this.__databaseText.set(newValue);
    }
    private __collections: ObservedPropertyObject<Array<DocumentCollection>>;
    get collections() {
        return this.__collections.get();
    }
    set collections(newValue: Array<DocumentCollection>) {
        this.__collections.set(newValue);
    }
    private __selectCollection: ObservedPropertyObject<DocumentCollection | null>;
    get selectCollection() {
        return this.__selectCollection.get();
    }
    set selectCollection(newValue: DocumentCollection | null) {
        this.__selectCollection.set(newValue);
    }
    private __collectionText: ObservedPropertySimple<string>;
    get collectionText() {
        return this.__collectionText.get();
    }
    set collectionText(newValue: string) {
        this.__collectionText.set(newValue);
    }
    private __collectionActionType: ObservedPropertySimple<ECollectionType>;
    get collectionActionType() {
        return this.__collectionActionType.get();
    }
    set collectionActionType(newValue: ECollectionType) {
        this.__collectionActionType.set(newValue);
    }
    private __data: ObservedPropertyObject<Array<object>>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: Array<object>) {
        this.__data.set(newValue);
    }
    private __documentText: ObservedPropertySimple<string>;
    get documentText() {
        return this.__documentText.get();
    }
    set documentText(newValue: string) {
        this.__documentText.set(newValue);
    }
    private __from: ObservedPropertySimple<string>;
    get from() {
        return this.__from.get();
    }
    set from(newValue: string) {
        this.__from.set(newValue);
    }
    private __to: ObservedPropertySimple<string>;
    get to() {
        return this.__to.get();
    }
    set to(newValue: string) {
        this.__to.set(newValue);
    }
    aboutToAppear() {
        this.init();
        let a = "";
    }
    init() {
        this.db = new Database(this.config.host);
        this.db.useBasicAuth(this.config.userInfo.username);
    }
    /**
     * 获取数据库列表
     */
    async getDatabases(): Promise<Array<Database>> {
        const databases = await this.db.databases();
        return databases;
    }
    /**
     * 获取数据表
     */
    async getCollections() {
        try {
            const collections = await this.selectDatabase.collections(true);
            this.collections = collections;
            this.selectCollection = collections[0];
            prompt.showToast({ message: "获取数据表成功" });
        }
        catch (err) {
            prompt.showToast({ message: "获取数据表失败" });
        }
    }
    /**
     * 获取数据
     */
    async getDatas() {
        try {
            this.data = await getData(this.selectCollection);
            prompt.showToast({ message: "获取数据成功" });
        }
        catch (err) {
            prompt.showToast({ message: "获取数据失败" });
        }
    }
    validate(type: EValidateType) {
        let error: string = "";
        switch (type) {
            case EValidateType.COLLECTION:
                if (!this.selectDatabase) {
                    error = "请先选中数据库";
                }
                break;
            case EValidateType.DOCUMENT:
                if (!this.selectCollection) {
                    error = "请先选中数据表";
                }
                break;
        }
        if (error != "") {
            prompt.showToast({ message: error });
            return false;
        }
        return true;
    }
    render() {
        Scroll.create(this.controller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.backgroundColor(0xDCDCDC);
        Column.create();
        Column.width('100%');
        // 数据库操作
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Column });
        // 数据库操作
        Flex.padding({ top: 15, left: 10, bottom: 6, right: 10 });
        // 数据库操作
        Flex.backgroundColor(Color.White);
        // 数据库操作
        Flex.width("100%");
        Text.create("当前选中数据库：" + ((this.selectDatabase?.name) || "未选中"));
        Text.fontSize(22);
        Text.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        TextInput.create({ placeholder: "请输入数据库名字" });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width("40%");
        TextInput.height(40);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.databaseText = value + "";
        });
        Button.createWithLabel("获取数据库列表");
        Button.onClick(() => {
            this.getDatabases().then(res => {
                this.databases = res;
                prompt.showToast({ message: "获取数据库列表成功" });
            }).catch(() => {
                prompt.showToast({ message: "获取数据库列表失败" });
            });
        });
        Button.margin({ right: 15 });
        Button.pop();
        Button.createWithLabel("创建数据库");
        Button.onClick(() => {
            if (!this.databaseText) {
                prompt.showToast({ message: "内容不能为空" });
                return;
            }
            this.db.createDatabase(this.databaseText).then(res => {
                prompt.showToast({ message: "创建数据库成功" });
            }).catch((err: Error) => {
                console.log("errerr" + JSON.stringify(err));
                prompt.showToast({ message: "创建数据库失败" });
            });
        });
        Button.pop();
        Row.pop();
        // 数据库操作
        Flex.pop();
        Column.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.databases), (v: Database) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
            Flex.width("100%");
            Flex.height(50);
            Flex.backgroundColor(0xFFFFFF);
            Flex.margin({ top: 2 });
            Flex.padding({ left: 10, right: 10 });
            Text.create("数据库名称：" + v.name);
            Text.fontSize(18);
            Text.pop();
            Row.create({ space: 2 });
            Button.createWithLabel("选择");
            Button.backgroundColor(Color.Orange);
            Button.onClick(() => {
                this.selectDatabase = this.db.database(v.name);
            });
            Button.fontSize(14);
            Button.height("70%");
            Button.pop();
            Button.createWithLabel("删除");
            Button.backgroundColor(Color.Red);
            Button.onClick(() => {
                this.db.dropDatabase(v.name).then(() => {
                    prompt.showToast({ message: "删除数据库成功" });
                }).catch(() => {
                    prompt.showToast({ message: "删除数据库失败" });
                });
            });
            Button.fontSize(14);
            Button.height("70%");
            Button.pop();
            Row.pop();
            Flex.pop();
        }, (item: Database) => item.name);
        ForEach.pop();
        Column.pop();
        //数据表操作
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Column });
        //数据表操作
        Flex.padding({ top: 6, left: 10, bottom: 6, right: 10 });
        //数据表操作
        Flex.backgroundColor(Color.White);
        //数据表操作
        Flex.margin({ top: 15 });
        //数据表操作
        Flex.width("100%");
        Text.create("当前选中数据表：" + (this.selectCollection?.name || "未选中"));
        Text.fontSize(22);
        Text.pop();
        Column.create();
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.width("100%");
        Row.margin({ top: 15, bottom: 15 });
        Text.create("数据表类型： ");
        Text.pop();
        Row.create();
        Row.margin({ right: 30 });
        Radio.create({ value: "Document", group: "radioGroup" });
        Radio.checked(this.collectionActionType === ECollectionType.DOCUMENT);
        Radio.height(15);
        Radio.width(15);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.collectionActionType = ECollectionType.DOCUMENT;
            }
        });
        Text.create("文档类型");
        Text.pop();
        Row.pop();
        Row.create();
        Radio.create({ value: "EdgeDocument", group: "radioGroup" });
        Radio.checked(this.collectionActionType === ECollectionType.EDGE);
        Radio.height(15);
        Radio.width(15);
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.collectionActionType = ECollectionType.EDGE;
            }
        });
        Text.create("图表类型");
        Text.pop();
        Row.pop();
        Row.pop();
        Row.create();
        Row.width("100%");
        Row.justifyContent(FlexAlign.Start);
        TextInput.create({ placeholder: "请输入数据表名字...", controller: this.TextController });
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.placeholderColor(Color.Grey);
        TextInput.caretColor(Color.Blue);
        TextInput.width("40%");
        TextInput.height(40);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.collectionText = value + "";
        });
        Button.createWithLabel("获取数据表");
        Button.onClick(async () => {
            if (!this.validate(EValidateType.COLLECTION))
                return;
            this.getCollections();
        });
        Button.margin({ right: 15 });
        Button.pop();
        Button.createWithLabel("创建数据表");
        Button.onClick(async () => {
            if (!this.validate(EValidateType.COLLECTION))
                return;
            if (!this.collectionText) {
                prompt.showToast({ message: "内容不能为空" });
                return;
            }
            if (this.collectionActionType === ECollectionType.EDGE) {
                createEdgeCollection(this.selectDatabase, this.collectionText).then(() => {
                    prompt.showToast({ message: "创建EdgeCollection数据表成功" });
                    this.getCollections();
                }).catch(() => {
                    prompt.showToast({ message: "创建EdgeCollection数据表失败" });
                });
            }
            else if (this.collectionActionType === ECollectionType.DOCUMENT) {
                createCollection(this.selectDatabase, this.collectionText).then(() => {
                    prompt.showToast({ message: "创建DocumentCollection数据表成功" });
                    this.getCollections();
                }).catch(() => {
                    prompt.showToast({ message: "创建DocumentCollection数据表失败" });
                });
            }
        });
        Button.pop();
        Row.pop();
        Column.pop();
        //数据表操作
        Flex.pop();
        Column.create();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.collections), (v: DocumentCollection) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
            Flex.width("100%");
            Flex.height(50);
            Flex.backgroundColor(0xFFFFFF);
            Flex.margin({ top: 2 });
            Flex.padding({ left: 10, right: 10 });
            Text.create(`数据表名称：${v.name}`);
            Text.fontSize(18);
            Text.pop();
            Row.create({ space: 5 });
            Button.createWithLabel("选择");
            Button.backgroundColor(Color.Orange);
            Button.onClick(() => {
                this.selectCollection = getCollection(this.selectDatabase, v.name);
            });
            Button.height("70%");
            Button.pop();
            Button.createWithLabel("删除");
            Button.backgroundColor(Color.Red);
            Button.onClick(() => {
                getCollection(this.selectDatabase, v.name).drop().then(() => {
                    prompt.showToast({ message: "删除数据表成功" });
                    this.getCollections();
                }).catch(() => {
                    prompt.showToast({ message: "删除数据表失败" });
                });
            });
            Button.height("70%");
            Button.pop();
            Row.pop();
            Flex.pop();
        }, (item: DocumentCollection) => item.name);
        ForEach.pop();
        Column.pop();
        // 数据展示
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Column });
        // 数据展示
        Flex.padding({ top: 15, left: 10, bottom: 15, right: 10 });
        // 数据展示
        Flex.backgroundColor(Color.White);
        // 数据展示
        Flex.margin({ top: 15 });
        // 数据展示
        Flex.width("100%");
        Text.create("数据展示");
        Text.fontSize(22);
        Text.pop();
        Text.create(`设置节点： from:${this.from}    to:${this.to}`);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
        TextInput.create({ placeholder: "请输入数据内容", controller: this.TextController });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width("100%");
        TextInput.height(40);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.margin({ bottom: 8 });
        TextInput.onChange((value: string) => {
            this.documentText = value + "";
        });
        Column.create({ space: 8 });
        Button.createWithLabel("获取全部数据");
        Button.onClick(async () => {
            if (!this.validate(EValidateType.DOCUMENT))
                return;
            this.getDatas();
        });
        Button.width("100%");
        Button.fontSize(14);
        Button.pop();
        Button.createWithLabel(`当前数据表：${this.selectCollection?.name || "无"}  类型：Document   操作：增加数据`);
        Button.onClick(() => {
            if (!this.validate(EValidateType.DOCUMENT))
                return;
            if (!this.documentText) {
                prompt.showToast({ message: "字段不能为空" });
                return;
            }
            save(this.selectCollection, {
                name: this.documentText,
                date: new Date().toLocaleString()
            }).then(() => {
                prompt.showToast({ message: "增加Document类型数据成功" });
                this.getDatas();
            }).catch((err: Error) => {
                prompt.showToast({ message: "增加Document类型数据失败" + err });
            });
        });
        Button.width("100%");
        Button.fontSize(14);
        Button.pop();
        Button.createWithLabel(`数据表名称：${this.selectCollection?.name || "无"}  数据表类型：Graph   操作：增加数据`);
        Button.onClick(() => {
            if (!this.validate(EValidateType.DOCUMENT))
                return;
            if (!this.from || !this.to) {
                prompt.showToast({ message: "缺少from或to节点" });
                return;
            }
            save(this.selectCollection, { _from: this.from, _to: this.to, active: false }, { returnNew: true })
                .then(() => {
                prompt.showToast({ message: "增加Graph数据成功" });
                this.getDatas();
            })
                .catch((err: Error) => {
                prompt.showToast({ message: "增加Graph数据失败" + err });
            });
        });
        Button.width("100%");
        Button.fontSize(14);
        Button.pop();
        Column.pop();
        Flex.pop();
        // 数据展示
        Flex.pop();
        Column.create();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.data), (v: Options) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, direction: FlexDirection.Column });
            Flex.width("100%");
            Flex.backgroundColor(0xFFFFFF);
            Flex.margin({ top: 2 });
            Flex.padding({ top: 4, bottom: 4 });
            Row.create({ space: 4 });
            Text.create(`id：${v._id.toString() || "无"} `);
            Text.fontSize(18);
            Text.pop();
            Text.create(`from：${v._from.toString()}`);
            Text.fontSize(18);
            Text.visibility(v._from !== undefined ? Visibility.Visible : Visibility.None);
            Text.pop();
            Text.create(`to:${v._to.toString()}`);
            Text.fontSize(18);
            Text.visibility(v._to !== undefined ? Visibility.Visible : Visibility.None);
            Text.pop();
            Text.create(`日期：${v.date.toString() || "无"}`);
            Text.fontSize(18);
            Text.visibility(v.date !== undefined ? Visibility.Visible : Visibility.None);
            Text.pop();
            Row.pop();
            Row.create({ space: 5 });
            Row.width("100%");
            Row.padding({ top: 2, bottom: 2 });
            Row.justifyContent(FlexAlign.End);
            Button.createWithLabel("设置from");
            Button.backgroundColor(Color.Orange);
            Button.onClick(() => {
                this.from = v._id;
            });
            Button.height("30");
            Button.visibility(v._from !== undefined ? Visibility.None : Visibility.Visible);
            Button.pop();
            Button.createWithLabel("设置to");
            Button.backgroundColor(Color.Orange);
            Button.onClick(() => {
                this.to = v._id;
            });
            Button.height("30");
            Button.visibility(v._to !== undefined ? Visibility.None : Visibility.Visible);
            Button.pop();
            Button.createWithLabel("删除");
            Button.backgroundColor(Color.Red);
            Button.onClick(() => {
                remove(this.selectCollection, v._id).then(() => {
                    prompt.showToast({ message: "删除数据成功" });
                    this.getDatas();
                }).catch(() => {
                    prompt.showToast({ message: "删除数据失败" });
                });
            });
            Button.height("30");
            Button.pop();
            Row.pop();
            Flex.pop();
        }, (item: Options): string => {
            return item._key;
        });
        ForEach.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
