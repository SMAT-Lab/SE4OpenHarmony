interface Index_Params {
    scroller?: Scroller;
    arr?: Array<Note>;
    editFlag?: boolean;
    noteText?: string;
    daoSession?: DaoSession | null;
    noteDao?: BaseDao<Note, number> | null;
    notesQuery?: Query<Note> | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import { GlobalContext, Property } from '@ohos/dataorm';
import { DaoSession } from '@ohos/dataorm';
import { BaseDao } from '@ohos/dataorm';
import { Query } from '@ohos/dataorm';
import { QueryBuilder } from '@ohos/dataorm';
import { inquiry } from '@ohos/dataorm';
import { TableAction } from '@ohos/dataorm';
import { OnTableChangedListener } from '@ohos/dataorm';
import { Toolbar } from './toolbar';
import { Note } from './Note';
import { NoteType } from './NoteType';
import dataRdb from '@ohos.data.relationalStore';
import { QueryTest, QueryClass } from './util';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__arr = new ObservedPropertyObject(new Array<Note>(), this, "arr");
        this.__editFlag = new ObservedPropertySimple(false, this, "editFlag");
        this.__noteText = new ObservedPropertySimple('', this, "noteText");
        this.daoSession = null;
        this.noteDao = null;
        this.notesQuery = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.editFlag !== undefined) {
            this.editFlag = params.editFlag;
        }
        if (params.noteText !== undefined) {
            this.noteText = params.noteText;
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
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__editFlag.aboutToBeDeleted();
        this.__noteText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __arr: ObservedPropertyObject<Array<Note>>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: Array<Note>) {
        this.__arr.set(newValue);
    }
    private __editFlag: ObservedPropertySimple<boolean>;
    get editFlag() {
        return this.__editFlag.get();
    }
    set editFlag(newValue: boolean) {
        this.__editFlag.set(newValue);
    }
    private __noteText: ObservedPropertySimple<string>;
    get noteText() {
        return this.__noteText.get();
    }
    set noteText(newValue: string) {
        this.__noteText.set(newValue);
    }
    private daoSession: DaoSession | null;
    private noteDao: BaseDao<Note, number> | null;
    private notesQuery: Query<Note> | null;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: 'dataORM', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'dataORM', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create();
        Flex.margin({ top: 12 });
        Flex.height('10%');
        TextInput.create({ placeholder: 'Enter new note' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 20, weight: 2 });
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.caretColor(Color.Green);
        TextInput.layoutWeight(3);
        TextInput.height(45);
        TextInput.borderRadius('0px');
        TextInput.backgroundColor(Color.White);
        TextInput.onChange((value: string) => {
            this.noteText = value;
        });
        Button.createWithLabel('ADD');
        Button.fontSize(13);
        Button.fontWeight(FontWeight.Bold);
        Button.layoutWeight(1);
        Button.onClick((event: ClickEvent | undefined) => {
            this.addNote();
        });
        Button.pop();
        Button.createWithLabel('Query');
        Button.fontSize(13);
        Button.fontWeight(FontWeight.Bold);
        Button.layoutWeight(1);
        Button.onClick((event: ClickEvent | undefined) => {
            this.query();
        });
        Button.pop();
        Flex.pop();
        Flex.create();
        Flex.margin({ top: 12 });
        Flex.height('10%');
        Button.createWithLabel('Delete bbb and Query');
        Button.height(45);
        Button.fontSize(12);
        Button.padding({ top: 8, left: 8 });
        Button.layoutWeight(1);
        Button.onClick((event: ClickEvent | undefined) => {
            this.deleteNotes();
        });
        Button.pop();
        Button.createWithLabel('Query aaa bbb ccc');
        Button.height(45);
        Button.fontSize(12);
        Button.padding({ top: 8 });
        Button.layoutWeight(1);
        Button.onClick((event: ClickEvent | undefined) => {
            this.selectWhere();
        });
        Button.pop();
        Flex.pop();
        Flex.create();
        Flex.margin({ top: 5 });
        Flex.height('10%');
        Button.createWithLabel('Load(id 2的缓存)');
        Button.height(45);
        Button.fontSize(12);
        Button.padding({ top: 1, left: 8 });
        Button.layoutWeight(1);
        Button.onClick((event: ClickEvent | undefined) => {
            this.loadId2();
        });
        Button.pop();
        Button.createWithLabel('save(没主键时新增)');
        Button.height(45);
        Button.fontSize(12);
        Button.padding({ top: 1 });
        Button.layoutWeight(1);
        Button.onClick(async (event: ClickEvent | undefined) => {
            if (this.noteDao) {
                let note = new Note();
                note.setText("Note_a");
                await this.noteDao.saveAsync(note);
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create();
        Flex.padding({ top: 4, left: 10 });
        Flex.height('10%');
        Flex.margin({ top: 4, left: 10 });
        Button.createWithLabel('flexQuery');
        Button.height(45);
        Button.fontSize(12);
        Button.layoutWeight(1);
        Button.onClick(async (event: ClickEvent | undefined) => {
            this.arr = await QueryClass(Note);
        });
        Button.pop();
        Button.createWithLabel('query id 2');
        Button.height(45);
        Button.fontSize(12);
        Button.layoutWeight(1);
        Button.onClick(async (event: ClickEvent | undefined) => {
            this.arr = await QueryTest("ID", 2);
        });
        Button.pop();
        Button.createWithLabel('query aaa');
        Button.height(45);
        Button.fontSize(12);
        Button.layoutWeight(1);
        Button.onClick(async (event: ClickEvent | undefined) => {
            this.arr = await QueryTest("TEXT", "aaa");
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.height('60%');
        Stack.width('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, color: 0xFFFFFF, startMargin: 20, endMargin: 20 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.onScrollIndex((firstIndex: number, lastIndex: number) => {
        });
        List.width('90%');
        List.margin({ left: 15, right: 15 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.arr), (item: Note) => {
            ListItem.create();
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Text.create('' + item.text);
            Text.fontSize(13);
            Text.pop();
            Button.createWithLabel("删除");
            Button.onClick(async () => {
                if (this.noteDao) {
                    await this.noteDao.deleteByKeyAsync(item.id);
                }
            });
            Button.pop();
            Button.createWithLabel("修改");
            Button.onClick(async () => {
                if (this.noteDao) {
                    item.setText(this.noteText);
                    await this.noteDao.updateAsync(item);
                }
            });
            Button.pop();
            Button.createWithLabel('save');
            Button.onClick(async () => {
                if (this.noteDao) {
                    item.setText(this.noteText);
                    await this.noteDao.saveAsync(item);
                }
            });
            Button.pop();
            Button.createWithLabel('refresh');
            Button.onClick(async () => {
                if (this.noteDao) {
                    item.setText(this.noteText);
                    await this.noteDao.refresh(item);
                    let that = this;
                    this.arr = [];
                    setTimeout(() => {
                        that.updateNotes();
                    }, 100);
                }
            });
            Button.pop();
            Button.createWithLabel('refresh前修改');
            Button.onClick(() => {
                this.refreshUpdate(item.id);
            });
            Button.pop();
            Flex.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Scroll.pop();
        Stack.pop();
        Flex.pop();
    }
    refreshUpdate(id: number) {
        let data = new Array<Note>();
        let tmpArr = this.arr;
        this.arr = [];
        for (let i = 0; i < tmpArr.length; i++) {
            if (tmpArr[i].id == id) {
                tmpArr[i].text = tmpArr[i].text + "--2";
            }
            data[i] = tmpArr[i];
        }
        let that = this;
        setTimeout(() => {
            that.arr = data;
        }, 100);
    }
    async addNote() {
        if (!this.noteDao) {
            return;
        }
        let date = new Date();
        let comment = "Added on " + date.toLocaleString();
        let note = new Note();
        note.setText(this.noteText);
        note.setComment(comment);
        note.setType(NoteType[NoteType.TEXT]);
        await this.noteDao.insert(note);
    }
    async updateNotes() {
        if (this.notesQuery) {
            this.arr = await this.notesQuery.list();
        }
    }
    async query() {
        if (!this.noteDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Note as Record<string, Property>;
        let query = this.noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
        let a = await query.list();
        if (!a)
            a = [];
        this.arr = a;
    }
    async deleteNotes() {
        if (!this.noteDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Note as Record<string, Property>;
        let deleteQuery = this.noteDao.queryBuilder().where(properties.text.eq("bbb"))
            .buildDelete();
        deleteQuery.executeDeleteWithoutDetachingEntities();
    }
    async selectWhere() {
        if (!this.noteDao) {
            return;
        }
        let queryBuilder: QueryBuilder<Note> = this.noteDao.queryBuilder();
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Note as Record<string, Property>;
        queryBuilder.whereOr(properties['text'].eq("aaa"), properties.text.eq("bbb"), properties.text.eq("ccc"));
        let aa: Array<Note> = await queryBuilder.list();
        if (!aa)
            aa = [];
        this.arr = aa;
    }
    public aboutToAppear() {
        this.getAppData();
    }
    getAppData() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.noteDao = this.daoSession.getBaseDao(Note);
        if (!this.noteDao) {
            return;
        }
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
    async loadId2() {
        if (!this.noteDao) {
            return;
        }
        let tmp = await this.noteDao.load(2);
        if (tmp) {
            let a = [tmp];
            this.arr = a;
        }
        else {
            this.arr = [];
        }
    }
}
loadDocument(new Index("1", undefined, {}));
