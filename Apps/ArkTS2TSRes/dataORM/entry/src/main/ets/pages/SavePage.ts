interface SavePage_Params {
    replaceTest?: string;
    saveText?: string;
    arr?: Array<Note>;
    resultMessage?: string;
    daoSession?: DaoSession | null;
    noteDao?: BaseDao<Note, number> | null;
    notesQuery?: Query<Note> | null;
    mNote?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SavePage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BaseDao, DaoSession, GlobalContext, OnTableChangedListener, Property, Query, TableAction } from '@ohos/dataorm';
import { Note } from './Note';
import dataRdb from '@ohos.data.relationalStore';
class SavePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__replaceTest = new ObservedPropertySimple('Hello World', this, "replaceTest");
        this.__saveText = new ObservedPropertySimple("", this, "saveText");
        this.__arr = new ObservedPropertyObject(new Array<Note>(), this, "arr");
        this.__resultMessage = new ObservedPropertySimple("结果展示：", this, "resultMessage");
        this.daoSession = null;
        this.noteDao = null;
        this.notesQuery = null;
        this.mNote = new Note();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SavePage_Params) {
        if (params.replaceTest !== undefined) {
            this.replaceTest = params.replaceTest;
        }
        if (params.saveText !== undefined) {
            this.saveText = params.saveText;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.resultMessage !== undefined) {
            this.resultMessage = params.resultMessage;
        }
        if (params.daoSession !== undefined) {
            this.daoSession = params.daoSession;
        }
        if (params.noteDao !== undefined) {
            this.noteDao = params.noteDao;
        }
        if (params.notesQuery !== undefined) {
            this.notesQuery = params.notesQuery;
        }
        if (params.mNote !== undefined) {
            this.mNote = params.mNote;
        }
    }
    aboutToBeDeleted() {
        this.__replaceTest.aboutToBeDeleted();
        this.__saveText.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        this.__resultMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __replaceTest: ObservedPropertySimple<string>;
    get replaceTest() {
        return this.__replaceTest.get();
    }
    set replaceTest(newValue: string) {
        this.__replaceTest.set(newValue);
    }
    private __saveText: ObservedPropertySimple<string>;
    get saveText() {
        return this.__saveText.get();
    }
    set saveText(newValue: string) {
        this.__saveText.set(newValue);
    }
    private __arr: ObservedPropertyObject<Array<Note>>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: Array<Note>) {
        this.__arr.set(newValue);
    }
    private __resultMessage: ObservedPropertySimple<string>;
    get resultMessage() {
        return this.__resultMessage.get();
    }
    set resultMessage(newValue: string) {
        this.__resultMessage.set(newValue);
    }
    private daoSession: DaoSession | null;
    private noteDao: BaseDao<Note, number> | null;
    private notesQuery: Query<Note> | null;
    private mNote;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.resultMessage);
        Text.fontSize(15);
        Text.margin({ bottom: 20 });
        Text.pop();
        TextInput.create({ placeholder: 'replace node数据库数据' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.caretColor(Color.Green);
        TextInput.height(45);
        TextInput.borderRadius('0px');
        TextInput.backgroundColor(Color.White);
        TextInput.onChange((value: string) => {
            this.replaceTest = value;
        });
        Button.createWithLabel("inertOrReplace:同一对象更改text值");
        Button.fontSize(13);
        Button.width(310);
        Button.height(50);
        Button.margin({ top: 50, bottom: 50 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.addOrReplace(this.replaceTest);
        });
        Button.pop();
        Button.createWithLabel("inertOrReplace:每次更改text值，都new对象");
        Button.fontSize(13);
        Button.width(310);
        Button.height(50);
        Button.margin({ top: 50, bottom: 50 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.addOrReplaceNew(this.replaceTest);
        });
        Button.pop();
        TextInput.create({ placeholder: 'save node数据库数据' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.caretColor(Color.Green);
        TextInput.height(45);
        TextInput.borderRadius('0px');
        TextInput.backgroundColor(Color.White);
        TextInput.onChange((value: string) => {
            this.saveText = value;
        });
        Button.createWithLabel("save接口");
        Button.fontSize(13);
        Button.width(310);
        Button.height(50);
        Button.margin({ top: 50, bottom: 50 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.addSave(this.saveText);
        });
        Button.pop();
        Button.createWithLabel("Query");
        Button.fontSize(13);
        Button.width(310);
        Button.height(50);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.query();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    async addOrReplace(str: string) {
        if (this.noteDao) {
            this.mNote.setText(str);
            await this.noteDao.insertOrReplace(this.mNote);
        }
    }
    async addOrReplaceNew(str: string) {
        if (this.noteDao) {
            let node = new Note();
            node.setText(str);
            await this.noteDao.insertOrReplace(node);
        }
    }
    async addSave(str: string) {
        if (this.noteDao) {
            let node = new Note();
            node.setText(str);
            await this.noteDao.saveAsync(node);
        }
    }
    async query() {
        if (!this.noteDao) {
            return;
        }
        //方式一
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Note as Record<string, Property>;
        let query = this.noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
        let a = await query.list();
        if (!a)
            a = [];
        if (a) {
            let str = '';
            for (let i = 0; i < a.length; i++) {
                const element = a[i];
                str += JSON.stringify(element);
            }
            this.resultMessage = str;
        }
    }
    public aboutToAppear() {
        this.getAppData();
    }
    getAppData() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.noteDao = this.daoSession.getBaseDao(Note);
        /*
         *添加监听
         */
        this.noteDao.addTableChangedListener(this.tabListener());
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Note as Record<string, Property>;
        this.notesQuery = this.noteDao.queryBuilder().orderAsc(properties.text).build();
    }
    onBackPress() {
        /**
         * 移除监听
         */
        if (this.noteDao) {
            this.noteDao.removeTableChangedListener();
        }
    }
    tabListener(): OnTableChangedListener<dataRdb.ResultSet> {
        let that = this;
        return {
            async onTableChanged(t: dataRdb.ResultSet, action: TableAction) {
                if (action == TableAction.INSERT) {
                    console.info('--------insert--------');
                    await that.updateNotes();
                }
                else if (action == TableAction.UPDATE) {
                    console.info('--------edit--------');
                    await that.updateNotes();
                }
                else if (action == TableAction.DELETE) {
                    console.info('--------delete--------');
                    await that.updateNotes();
                }
                else if (action == TableAction.QUERY) {
                    console.info('--------query-------- any:' + JSON.stringify(t));
                }
            }
        };
    }
    async updateNotes() {
        if (this.notesQuery) {
            this.arr = await this.notesQuery.list();
        }
    }
}
loadDocument(new SavePage("1", undefined, {}));
