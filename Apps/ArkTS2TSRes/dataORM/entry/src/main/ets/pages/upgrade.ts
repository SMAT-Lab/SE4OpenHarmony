interface upgrade_Params {
    arr?: Array<Student>;
    dbName?: string;
    tableName?: string;
    version?: number;
    importResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "upgrade_" + ++__generate__Id;
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
import dataRdb from '@ohos.data.relationalStore';
import { Migration, GlobalContext, DaoSession } from '@ohos/dataorm';
import { Database } from '@ohos/dataorm';
import { DbUtils } from '@ohos/dataorm';
import { ValuesBucket } from '@ohos.data.ValuesBucket';
import { Student } from '../pages/test/Student';
import { Toolbar } from './toolbar';
import promptAction from '@ohos.promptAction';
let ctt: Context;
class upgrade extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__arr = new ObservedPropertyObject(new Array<Student>(), this, "arr");
        this.dbName = "testRgb.db";
        this.tableName = "STUDENT";
        this.version = 1;
        this.__importResult = new ObservedPropertySimple("", this, "importResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: upgrade_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.dbName !== undefined) {
            this.dbName = params.dbName;
        }
        if (params.tableName !== undefined) {
            this.tableName = params.tableName;
        }
        if (params.version !== undefined) {
            this.version = params.version;
        }
        if (params.importResult !== undefined) {
            this.importResult = params.importResult;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__importResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __arr: ObservedPropertyObject<Array<Student>>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: Array<Student>) {
        this.__arr.set(newValue);
    }
    private dbName: string;
    private tableName: string;
    private version: number;
    private __importResult: ObservedPropertySimple<string>;
    get importResult() {
        return this.__importResult.get();
    }
    set importResult(newValue: string) {
        this.__importResult.set(newValue);
    }
    createRgb() {
        const SQL_CREATE_TABLE = "CREATE TABLE IF NOT EXISTS STUDENT (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL)";
        dataRdb.getRdbStore(ctt, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            if (err) {
                console.error('createRgb：err==' + err);
            }
            else {
                console.info('createRgb：getRdbStore');
                rdbStore.executeSql(SQL_CREATE_TABLE, null, () => {
                    promptAction.showToast({ message: "createRgb 成功" });
                    console.info('createRgb：create table done.');
                });
            }
        });
    }
    UpdateDB() {
        this.version = 2;
        new Migration(this.dbName, this.tableName, 2).addColumn("AGE", "INTEGER").execute(ctt, false);
    }
    async aboutToAppear() {
        ctt = GlobalContext.getContext().getValue(GlobalContext.KEY_CTX) as Context;
    }
    insertData() {
        dataRdb.getRdbStore(ctt, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            if (err) {
                console.error('insertData i insertData err==' + err);
            }
            else {
                const valueBucket: ValuesBucket = {
                    "NAME": "Lisa"
                };
                rdbStore.insert("STUDENT", valueBucket, (err, ret) => {
                    console.info("insertData i insert first done: " + ret);
                    promptAction.showToast({ message: "insertData 成功,code:" + ret });
                });
            }
        });
    }
    newInsertData() {
        dataRdb.getRdbStore(ctt, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            if (err) {
                console.error('insertData test：err==' + err);
            }
            else {
                const valueBucket: ValuesBucket = {
                    "NAME": "Lisa",
                    "AGE": 5
                };
                rdbStore.insert("STUDENT", valueBucket, (err, ret) => {
                    promptAction.showToast({ message: "升级后添加数据 成功, code:" + ret });
                    console.info("insert first done: " + ret);
                });
            }
        });
    }
    QueryDB1() {
        let that = this;
        dataRdb.getRdbStore(ctt, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            if (err) {
                console.error('test：err==' + err);
            }
            else {
                console.info('test：getRdbStore');
                let predicates = new dataRdb.RdbPredicates("STUDENT");
                predicates.equalTo("NAME", "Lisa");
                rdbStore.query(predicates, ["ID", "NAME"], (err, resultSet) => {
                    let datum = new Array<Student>();
                    while (resultSet.goToNextRow()) {
                        let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                        let name = resultSet.getString(resultSet.getColumnIndex("NAME"));
                        let student = new Student();
                        student.setId(id);
                        student.setName(name);
                        datum.push(student);
                        console.info("id===>" + id + "name====>" + name);
                    }
                    that.arr = datum;
                });
            }
        });
    }
    BeiQueryDB1() {
        let dbName = 'testRgb-' + this.version + '.db';
        let that = this;
        dataRdb.getRdbStore(ctt, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            if (err) {
                console.error('test i Backup  to restore failed ,getRdbStore err: ' + err.message);
                return;
            }
            dataRdb.deleteRdbStore(ctt, that.dbName, (err) => {
                if (err) {
                    console.error("test i Delete RdbStore failed, err: " + err);
                    return;
                }
                rdbStore.restore(dbName, (err) => {
                    if (err) {
                        console.error('Restore failed, err: ' + err);
                        return;
                    }
                    promptAction.showToast({ message: "从备份中恢复成功" });
                    console.info('Restore success.');
                });
            });
        });
    }
    QueryDB() {
        let that = this;
        dataRdb.getRdbStore(ctt, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            if (err) {
                console.error('test:err==' + err);
            }
            else {
                console.info('test:getRdbStore');
                let predicates = new dataRdb.RdbPredicates("STUDENT");
                predicates.equalTo("NAME", "Lisa");
                rdbStore.query(predicates, ["ID", "NAME", "AGE"], (err, resultSet) => {
                    let datum = new Array<Student>();
                    while (resultSet.goToNextRow()) {
                        let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                        let name = resultSet.getString(resultSet.getColumnIndex("NAME"));
                        let age = resultSet.getLong(resultSet.getColumnIndex("AGE"));
                        let student = new Student();
                        student.setId(id);
                        student.setName(name);
                        student.setAge(age);
                        datum.push(student);
                        console.info("id===>" + id + "name====>" + name + "age===>>" + age);
                    }
                    that.arr = datum;
                });
            }
        });
    }
    BeiDb() {
        let dbName = 'testRgb-' + this.version + '.db';
        Migration.backupDB(this.dbName, dbName, this.version, ctt, false);
    }
    async BeiDb22() {
        let daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        let database: Database = daoSession.getDatabase();
        let ctx = GlobalContext.getContext().getValue(GlobalContext.KEY_CTX) as Context;
        let n = await DbUtils.executeSqlScript(ctx.resourceManager, database, "minimal-entity.sql");
        let that = this;
        let per = database.getRawDatabase().querySql("SELECT * from MINIMAL_ENTITY");
        per.then((resultSet) => {
            console.log("BeiDb22 ResultSet row count: " + resultSet.rowCount);
            let str = '';
            if (resultSet && resultSet.goToFirstRow()) {
                let colCount: number = resultSet.columnCount;
                do {
                    for (let i = 0; i < colCount; i++) {
                        let column = resultSet.getColumnName(i);
                        let index = resultSet.getColumnIndex(column);
                        let res = resultSet.getString(index);
                        str += '{' + column + ':' + res + '},';
                    }
                } while (resultSet.goToNextRow());
                that.importResult = str;
            }
        });
    }
    BeiQueryDB() {
        let that = this;
        try {
            dataRdb.getRdbStore(ctt, {
                name: 'testRgb-2.db',
                securityLevel: dataRdb.SecurityLevel.S1,
                encrypt: false
            }, (err, rdbStore) => {
                if (!err) {
                    let predicates = new dataRdb.RdbPredicates("STUDENT");
                    let datum = new Array<Student>();
                    rdbStore.query(predicates, ["ID", "NAME", "AGE"], (err, resultSet) => {
                        while (resultSet.goToNextRow()) {
                            let id = resultSet.getLong(resultSet.getColumnIndex("ID"));
                            let name = resultSet.getString(resultSet.getColumnIndex("NAME"));
                            let age = resultSet.getLong(resultSet.getColumnIndex("AGE"));
                            let student = new Student();
                            student.setId(id);
                            student.setName(name);
                            student.setAge(age);
                            datum.push(student);
                        }
                        that.arr = datum;
                    });
                }
            });
        }
        catch (e) {
            const error = e as TypeError;
            console.error("err_msg:" + error.message + "--err:" + error.stack);
        }
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Flex.height('100%');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: 'UPGRADE', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: 'UPGRADE', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
        Flex.margin({ top: 12 });
        Button.createWithLabel('创建数据库');
        Button.fontSize(20);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.createRgb();
        });
        Button.pop();
        Button.createWithLabel('添加数据');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.insertData();
        });
        Button.pop();
        Button.createWithLabel('备份数据库');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.fontColor(0xFFFFFF);
        Button.onClick(() => {
            this.BeiDb();
        });
        Button.backgroundColor(Color.Blue);
        Button.pop();
        Button.createWithLabel('从备份中恢复');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.BeiQueryDB1();
        });
        Button.pop();
        Button.createWithLabel('查询数据');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.QueryDB1();
        });
        Button.pop();
        Button.createWithLabel('数据库升级');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.UpdateDB();
        });
        Button.backgroundColor(Color.Red);
        Button.pop();
        Button.createWithLabel('升级后添加数据');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.newInsertData();
        });
        Button.backgroundColor(Color.Red);
        Button.pop();
        Button.createWithLabel('升级后查询数据');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.QueryDB();
        });
        Button.backgroundColor(Color.Red);
        Button.pop();
        Button.createWithLabel('升级后查询备份数据库');
        Button.fontSize(20);
        Button.height(45);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.BeiQueryDB();
        });
        Button.backgroundColor(Color.Red);
        Button.pop();
        Button.createWithLabel('数据导入');
        Button.fontSize(20);
        Button.height(60);
        Button.margin({ left: 18, top: 5 });
        Button.onClick(() => {
            this.BeiDb22();
        });
        Button.backgroundColor(Color.Blue);
        Button.pop();
        Flex.pop();
        Flex.create({});
        Flex.margin({ top: 12 });
        List.create({ space: 20, initialIndex: 0 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.arr), (item: Student) => {
            ListItem.create();
            Flex.create({ direction: FlexDirection.Column });
            Flex.width('100%');
            Text.create('' + JSON.stringify(item));
            Text.fontSize(13);
            Text.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: Student) => {
            return item.getId() + "";
        });
        ForEach.pop();
        List.pop();
        Flex.pop();
        Text.create('数据导入结果：' + this.importResult);
        Text.fontSize(20);
        Text.margin({ left: 18, top: 5 });
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new upgrade("1", undefined, {}));
