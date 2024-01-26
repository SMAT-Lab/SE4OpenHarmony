let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Note } from '../../../main/ets/pages/Note';
import { NoteType } from '../../../main/ets/pages/NoteType';
import { Database, DaoSession, GlobalContext, QueryBuilder, BaseDao, Query, Property, DaoMaster, Migration, ColumnType } from '@ohos/dataorm';
import relationalStore from '@ohos.data.relationalStore';
import { ExampleOpenHelper } from './ExampleOpenHelper';
import AbilityDelegatorRegistry from '@ohos.application.abilityDelegatorRegistry';
import { QueryTest } from '../../../main/ets/pages/util';
import { CTXInstance } from './CTXInstance';
import { ConvertInfo } from '../../../main/ets/pages/convert/ConvertInfo';
import ArrayList from '@ohos.util.ArrayList';
import { User } from '../../../main/ets/pages/embed/User';
import { ChildInfo } from '../../../main/ets/pages/embed/ChildInfo';
import { SunInfo } from '../../../main/ets/pages/embed/SunInfo';
import { ChildTwo } from '../../../main/ets/pages/embed/ChildTwo';
import { SunInfoTwo } from '../../../main/ets/pages/embed/SunInfoTwo';
import { Mother } from '../../../main/ets/pages/embed/Mother';
import { Father } from '../../../main/ets/pages/embed/Father';
import { JoinPropertyUser } from '../../../main/ets/pages/entry/joinProperty/JoinPropertyUser';
import { Customer } from '../../../main/ets/pages/entry/joinProperty/Customer';
export default function abilityTest() {
    let daoSession: DaoSession;
    let noteDao: BaseDao<Note, number>;
    let ctt: Context = CTXInstance.getInstance().getContext();
    let rdb: relationalStore.RdbStore;
    describe('ActsAbilityTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('onCreateDbAsync', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            helper.setEntities(Note);
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db: Database = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            await noteDao.deleteAllAsync();
            // 新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            await noteDao.insert(note);
            let predicates = new relationalStore.RdbPredicates("NOTE");
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let arrayNote = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                arrayNote.push(note);
            }
            let last = arrayNote[arrayNote.length - 1].getText();
            console.info('query-------' + last);
            expect('abc').assertEqual(last);
            resultSet.close();
            //查询
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.Note as Record<string, Property>;
            let query = noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
            let cursor: relationalStore.ResultSet = await query.query();
            let entityData = noteDao.convertCursor2Entity(cursor);
            if (!entityData)
                entityData = [];
            let arr = entityData;
            cursor.close();
            expect(arr.length).assertEqual(1);
        });
        it('deleteAllAsync', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            // 初始化
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            // 清除上方测试用例已添加数据
            await noteDao.deleteAllAsync();
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let arrayNote = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                arrayNote.push(note);
            }
            expect(arrayNote.length).assertEqual(0);
            resultSet.close();
        });
        it('insert', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            let entity = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entity.Note as Record<string, Property>;
            let notesQuery = noteDao.queryBuilder().orderAsc(properties.text).build();
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            //新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            await noteDao.insert(note);
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let arrayNote = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                arrayNote.push(note);
            }
            let last = arrayNote[arrayNote.length - 1].getText();
            console.info('query-------' + last);
            expect('abc').assertEqual(last);
            resultSet.close();
            //查询
            let query = noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
            let cursor: relationalStore.ResultSet = await query.query();
            let entityData = noteDao.convertCursor2Entity(cursor);
            if (!entityData)
                entityData = [];
            let arr = entityData;
            cursor.close();
            expect(arr.length).assertEqual(1);
        });
        it('daoSessionDeleteAllAsync', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            // 清除上方测试用例已添加数据
            await daoSession.deleteAllAsync<Note>(new Note());
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let arrayNote = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                arrayNote.push(note);
            }
            expect(arrayNote.length).assertEqual(0);
            resultSet.close();
        });
        it('query', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            // todo 注：参数必须为非空，否则会认定为非加密库（如：''或者""都为非加密库）
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            // 初始化
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            //新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let noteOne = new Note();
            noteOne.setText('abc1');
            noteOne.setComment(comment);
            noteOne.setDate(new Date().toString());
            noteOne.setType(NoteType[NoteType.TEXT]);
            let noteTwo = new Note();
            noteTwo.setText('abc2');
            noteTwo.setComment(comment);
            noteTwo.setDate(new Date().toString());
            noteTwo.setType(NoteType[NoteType.TEXT]);
            let entities: Set<Note> = new Set<Note>();
            entities.add(noteOne);
            entities.add(noteTwo);
            await noteDao.saveInTxAsync(entities);
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.Note as Record<string, Property>;
            let query = noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
            let cursor: relationalStore.ResultSet = await query.query();
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            expect(resultSet.rowCount).assertEqual(cursor.rowCount);
            // 释放数据集的内存
            resultSet.close();
            cursor.close();
        });
        it('delete', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            // todo 注：参数必须为非空，否则会认定为非加密库（如：''或者""都为非加密库）
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            // 初始化
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.Note as Record<string, Property>;
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            // 新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            await noteDao.insert(note);
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let deleteQuery = noteDao.queryBuilder().where(properties['text'].eq("abc")).buildDelete();
            await deleteQuery.executeDeleteWithoutDetachingEntities();
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let datum = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                datum.push(note);
            }
            for (let i = 0; i < datum.length; i++) {
                let note: Note = datum[i];
                expect(note.text !== 'abc').assertTrue();
            }
            // 释放数据集的内存
            resultSet.close();
        });
        it('update', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            // todo 注：参数必须为非空，否则会认定为非加密库（如：''或者""都为非加密库）
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            //初始化
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            await noteDao.deleteAllAsync();
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            //新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            await noteDao.insert(note);
            note.setText('aaa');
            await noteDao.updateAsync(note);
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let datum = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                datum.push(note);
            }
            let last = datum[datum.length - 1].getText();
            expect('aaa').assertEqual(last);
            // 释放数据集的内存
            resultSet.close();
        });
        it('refresh', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            // todo 注：参数必须为非空，否则会认定为非加密库（如：''或者""都为非加密库）
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            //初始化
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            await noteDao.deleteAllAsync();
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            //新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            await noteDao.insert(note);
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.Note as Record<string, Property>;
            let query = noteDao.queryBuilder().where(properties['text'].eq("abc")).buildCursor();
            let cursor: relationalStore.ResultSet = await query.query();
            let noteArray = new Array<Note>();
            while (cursor.goToNextRow()) {
                let id = cursor.getLong(cursor.getColumnIndex("ID"));
                let text = cursor.getString(cursor.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                noteArray.push(note);
            }
            let noteData: Note = new Note();
            if (noteArray.length > 0) {
                noteData = noteArray[0];
                noteData.setText("rrr");
                await noteDao.refresh(noteData);
            }
            // 释放数据集的内存
            cursor.close();
            expect('abc').assertEqual(noteData.getText());
        });
        it('conditionQuery', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            //todo 注：参数必须为非空，否则会认定为非加密库（如：''或者""都为非加密库）
            helper.setEncrypt(true);
            helper.setVersion(newVersion);
            //初始化
            helper.setEntities(Note);
            //todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            await noteDao.deleteAllAsync();
            //新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(date.toString());
            note.setType(NoteType[NoteType.TEXT]);
            let date2 = new Date();
            let comment2 = "Added on " + date.toLocaleString();
            let note2 = new Note();
            note2.setText('bbb');
            note2.setComment(comment2);
            note2.setDate(date2.toString());
            note2.setType(NoteType[NoteType.TEXT]);
            await noteDao.insertInTxArrAsync(note, note2);
            let queryBuilder: QueryBuilder<Note> = noteDao.queryBuilder();
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.Note as Record<string, Property>;
            queryBuilder.whereOr(properties.text.eq("abc"), properties.text.eq("bbb"));
            let arrayData: Array<Note> = await queryBuilder.list();
            if (!arrayData)
                arrayData = [];
            expect(arrayData.length).assertEqual(2);
        });
        it('dbFlowQuery', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            // todo 注：参数必须为非空，否则会认定为非加密库（如：''或者""都为非加密库）
            helper.setEncrypt(true);
            // 初始化
            helper.setEntities(Note);
            helper.setVersion(newVersion);
            //todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            GlobalContext.getContext().setValue("daoSession", daoSession);
            noteDao = daoSession.getBaseDao(Note);
            await noteDao.deleteAllAsync();
            // 新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(date.toString());
            note.setType(NoteType[NoteType.TEXT]);
            await noteDao.insert(note);
            let arr: Array<Note> = await QueryTest("TEXT", "abc");
            expect(arr.length).assertEqual(1);
        });
        it('insertInTxAsync', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            // 初始化
            helper.setEntities(Note);
            // todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            let entity = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entity.Note as Record<string, Property>;
            let notesQuery = noteDao.queryBuilder().orderAsc(properties.text).build();
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            // 新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            let noteArr = new Array<Note>();
            noteArr.push(note);
            // 清除上方测试用例已添加数据
            await daoSession.deleteAllAsync<Note>(new Note());
            await noteDao.insertInTxAsync(noteArr, true);
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let arrayNote = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                arrayNote.push(note);
            }
            let last = arrayNote[arrayNote.length - 1].getText();
            console.info('query-------' + last);
            expect('abc').assertEqual(last);
            resultSet.close();
            //查询
            let query = noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
            let cursor: relationalStore.ResultSet = await query.query();
            let entityData = noteDao.convertCursor2Entity(cursor);
            if (!entityData)
                entityData = [];
            let arr = entityData;
            cursor.close();
            expect(arr.length).assertEqual(1);
        });
        it('insertOrReplaceInTxAsync', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes.db");
            helper.setEncrypt(true);
            await helper.setVersion(newVersion);
            // 初始化
            helper.setEntities(Note);
            //todo 数据库新增列示例
            let migration: Migration = new Migration("notes.db", "NOTE", newVersion).addColumn("MONEYS", ColumnType.realValue);
            helper.setMigration(migration);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            noteDao = daoSession.getBaseDao(Note);
            let entity = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entity.Note as Record<string, Property>;
            let notesQuery = noteDao.queryBuilder().orderAsc(properties.text).build();
            rdb = await relationalStore.getRdbStore(ctt, {
                name: 'notes.db', securityLevel: relationalStore.SecurityLevel.S1,
                encrypt: true,
            });
            // 新增
            let date = new Date();
            let comment = "Added on " + date.toLocaleString();
            let note = new Note();
            note.setText('abc');
            note.setComment(comment);
            note.setDate(new Date().toString());
            note.setType(NoteType[NoteType.TEXT]);
            let noteArr = new Array<Note>();
            noteArr.push(note);
            // 清除上方测试用例已添加数据
            await daoSession.deleteAllAsync<Note>(new Note());
            await noteDao.insertOrReplaceInTxAsync(noteArr, true);
            let predicates = new relationalStore.RdbPredicates("NOTE");
            let resultSet: relationalStore.ResultSet = await rdb.query(predicates, ["ID", "TEXT"]);
            let arrayNote = new Array<Note>();
            while (resultSet.goToNextRow()) {
                let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                let text = resultSet.getString(resultSet.getColumnIndex("TEXT"));
                let note = new Note();
                note.setId(id);
                note.setText(text);
                arrayNote.push(note);
            }
            let last = arrayNote[arrayNote.length - 1].getText();
            console.info('query-------' + last);
            expect('abc').assertEqual(last);
            resultSet.close();
            // 查询
            let query = noteDao.queryBuilder().orderAsc(properties.text).buildCursor();
            let cursor: relationalStore.ResultSet = await query.query();
            let entityData = noteDao.convertCursor2Entity(cursor);
            if (!entityData)
                entityData = [];
            let arr = entityData;
            cursor.close();
            expect(arr.length).assertEqual(1);
        });
        it('convert', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes_1.db");
            helper.setEncrypt(false);
            await helper.setVersion(newVersion);
            helper.setEntities(ConvertInfo);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            let covertDao: BaseDao<ConvertInfo, number> = daoSession.getBaseDao(ConvertInfo);
            let convertInfo = new ConvertInfo();
            let images = new ArrayList<string>();
            images.add("image1");
            images.add("image2");
            images.add("image3");
            images.add("image4");
            images.add("image5");
            images.add("image6");
            convertInfo.images = images;
            let rowID: number = -1;
            if (covertDao) {
                rowID = await covertDao.insert(convertInfo);
            }
            expect(rowID > 0).assertTrue();
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.ConvertInfo as Record<string, Property>;
            let query = covertDao.queryBuilder().orderAsc(properties.images).buildCursor();
            let arr = await query.list();
            expect(arr.length > 0).assertTrue();
        });
        it('embedded', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes_2.db");
            helper.setEncrypt(false);
            await helper.setVersion(newVersion);
            helper.setEntities(User);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            let userDao: BaseDao<User, number> = daoSession.getBaseDao(User);
            await userDao.deleteAllAsync();
            let user = new User();
            let child = new ChildInfo("孩子1", 18, "学习1");
            let sun = new SunInfo("儿孙1", 5, "玩1");
            child.sunInfo = sun;
            let childTwo = new ChildTwo("孩子2", 12, "学习2");
            let sunTwo = new SunInfoTwo("儿孙2", 3, "玩2");
            childTwo.cTwoSunInfo = sunTwo;
            let mother = new Mother("黄河", 7000, "黄河发源地青藏高原巴颜喀拉山脉");
            mother.child = child;
            mother.childTwo = childTwo;
            let father = new Father("长江", 8000, "长江发源西藏高原");
            user.id = 1;
            user.userName = "中国";
            user.userAge = 5000;
            user.father = father;
            user.mother = mother;
            user.home = "地球亚洲";
            let rowID: number = -1;
            if (userDao) {
                rowID = await userDao.insert(user);
            }
            expect(1).assertEqual(rowID);
            let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
            let properties = entityClass.User as Record<string, Property>;
            let query = userDao.queryBuilder().orderAsc(properties.userName).buildCursor();
            let arr = await query.list();
            expect(arr.length > 0).assertTrue();
        });
        it('queryToManyListByColumnName', 0, async () => {
            let newVersion = 2;
            let helper: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes_3.db");
            helper.setEncrypt(false);
            await helper.setVersion(newVersion);
            helper.setEntities(JoinPropertyUser, Customer);
            let db = await helper.getWritableDb();
            daoSession = new DaoMaster(db).newSession();
            let joinPropertyUserDao: BaseDao<JoinPropertyUser, number> = daoSession.getBaseDao(JoinPropertyUser);
            let customerDao: BaseDao<Customer, number> = daoSession.getBaseDao(Customer);
            await daoSession.deleteAllAsync<JoinPropertyUser>(new JoinPropertyUser());
            await daoSession.deleteAllAsync<Customer>(new Customer());
            let joinProperty = new JoinPropertyUser(1, "lid", 1);
            let rowId: number = -1;
            if (joinPropertyUserDao) {
                rowId = await joinPropertyUserDao.insert(joinProperty);
            }
            expect(1).assertEqual(rowId);
            let rowCustomerID: number = -1;
            for (let index = 0; index < 5; index++) {
                let customer = new Customer(index, "CustomerName_" + index, rowId);
                if (customerDao) {
                    rowCustomerID = await customerDao.insert(customer);
                    expect(rowCustomerID >= 0).assertTrue();
                }
            }
            let data = await customerDao.queryToManyListByColumnName("customers", [joinProperty.flag + ""]);
            expect(data.length > 0).assertTrue();
        });
        it('setDBVersionForTwoDB', 0, async () => {
            let newVersion = 1;
            let newVersion1 = 2;
            let newVersion2 = 3;
            let helper1: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes_4.db");
            let helper2: ExampleOpenHelper = new ExampleOpenHelper(ctt, "notes_5.db");
            helper1.setEncrypt(false);
            helper2.setEncrypt(false);
            await helper1.setVersion(newVersion);
            await helper2.setVersion(newVersion);
            helper1.setEntities(JoinPropertyUser, Customer);
            helper2.setEntities(JoinPropertyUser, Customer);
            await helper1.setVersion(newVersion2);
            await helper2.setVersion(newVersion1);
            let db1 = await helper1.getWritableDb();
            let db2 = await helper2.getWritableDb();
            let daoSession1 = new DaoMaster(db1).newSession();
            let daoSession2 = new DaoMaster(db2).newSession();
            let joinPropertyUserDao1: BaseDao<JoinPropertyUser, number> = daoSession1.getBaseDao(JoinPropertyUser);
            let joinPropertyUserDao2: BaseDao<JoinPropertyUser, number> = daoSession2.getBaseDao(JoinPropertyUser);
            await daoSession1.deleteAllAsync<JoinPropertyUser>(new JoinPropertyUser());
            await daoSession1.deleteAllAsync<Customer>(new Customer());
            await daoSession2.deleteAllAsync<JoinPropertyUser>(new JoinPropertyUser());
            await daoSession2.deleteAllAsync<Customer>(new Customer());
            let joinProperty1 = new JoinPropertyUser(1, "lid", 1);
            let joinProperty2 = new JoinPropertyUser(1, "lid", 1);
            let rowId1: number = -1;
            let rowId2: number = -1;
            if (joinPropertyUserDao1) {
                rowId1 = await joinPropertyUserDao1.insert(joinProperty1);
            }
            if (joinPropertyUserDao2) {
                rowId2 = await joinPropertyUserDao2.insert(joinProperty2);
            }
            expect(1).assertEqual(rowId1);
            expect(1).assertEqual(rowId2);
        });
    });
}
