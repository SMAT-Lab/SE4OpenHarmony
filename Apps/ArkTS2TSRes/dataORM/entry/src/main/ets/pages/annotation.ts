interface Annotation_Params {
    daoSession?: DaoSession | null;
    text?: string;
    dbName?: string;
    studentDao?: BaseDao<Student, number> | null;
    teacherDao?: BaseDao<Teacher, number> | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "annotation_" + ++__generate__Id;
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
import { BaseDao } from '@ohos/dataorm';
import { DaoSession } from '@ohos/dataorm';
import { GlobalContext } from '@ohos/dataorm';
import { Student } from './Student';
import { Teacher } from './Teacher';
import { DateEntity } from './DateEntity';
import { BusinessError } from '@ohos.base';
class Annotation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.daoSession = null;
        this.__text = new ObservedPropertySimple('点击 add Data 后展示其余按钮的操作结果', this, "text");
        this.dbName = "notes.db";
        this.studentDao = null;
        this.teacherDao = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Annotation_Params) {
        if (params.daoSession !== undefined) {
            this.daoSession = params.daoSession;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.dbName !== undefined) {
            this.dbName = params.dbName;
        }
        if (params.studentDao !== undefined) {
            this.studentDao = params.studentDao;
        }
        if (params.teacherDao !== undefined) {
            this.teacherDao = params.teacherDao;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private daoSession: DaoSession | null;
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private dbName: string;
    private studentDao: BaseDao<Student, number> | null;
    private teacherDao: BaseDao<Teacher, number> | null;
    render() {
        Flex.create({ direction: FlexDirection.Column,
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('add data');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.addTestData();
        });
        Button.pop();
        Button.createWithLabel("ToOne_loadDeep");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.loadDeep();
        });
        Button.pop();
        Button.createWithLabel("ToOne_queryDeep");
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.queryByToOneFunctionTest();
        });
        Button.pop();
        Button.createWithLabel("ToMany_ByToMany");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryByToManyFunctionTest();
        });
        Button.pop();
        Button.createWithLabel("ToMany_ByJoinEntity");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryByJoinEntityFunctionTest();
        });
        Button.pop();
        Button.createWithLabel("查询添加数据");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryData();
        });
        Button.pop();
        Text.create(this.text);
        Text.fontSize(15);
        Text.fontColor(Color.Black);
        Text.margin({ top: 20 });
        Text.pop();
        Flex.pop();
    }
    addTestData() {
        this.executeSql("add_student_teacher.sql");
    }
    async loadDeep() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.studentDao = this.daoSession.getBaseDao(Student);
        let studentId = 1;
        let student: Student = await this.studentDao.loadDeep(studentId);
        this.text = '';
        this.text = "loadDeep--" + JSON.stringify(student);
    }
    async executeSql(fileName: string) {
        let ctx = GlobalContext.getContext().getValue(GlobalContext.KEY_CTX) as Context;
        dataRdb.getRdbStore(ctx, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, (err, rdbStore) => {
            ctx.resourceManager.getRawFileContent(fileName).then((fileData: Uint8Array) => {
                let dataString = "";
                for (let i = 0; i < fileData.length; i++) {
                    dataString += String.fromCharCode(fileData[i]);
                }
                let regex: RegExp = new RegExp(" / *; *\r*\n*\t* */gi");
                let lines: string[] = dataString.split(regex);
                if (lines == null) {
                    return;
                }
                for (let index = 0; index < lines.length; index++) {
                    const sql = lines[index];
                    let promise = rdbStore.executeSql(sql);
                    promise.then(() => {
                        console.info('Add data done.');
                    }).catch((err: BusinessError) => {
                        console.error("ExecuteSql failed, err:" + err);
                    });
                }
            });
        });
    }
    async queryByToManyFunctionTest() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.studentDao = this.daoSession.getBaseDao(Student);
        let teacherId: string[] = ["1"];
        let data = await this.studentDao.queryToManyListByColumnName("students", teacherId);
        this.text = '';
        data.forEach(element => {
            this.text += "tonMany--" + JSON.stringify(element) + '\n';
        });
    }
    async queryByJoinEntityFunctionTest() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.studentDao = this.daoSession.getBaseDao(DateEntity);
        let teacherId: string[] = ["11"];
        let data = await this.studentDao.queryToManyListByColumnName("dateEntityList", teacherId);
        this.text = '';
        data.forEach(element => {
            this.text += "JoinEntry--" + JSON.stringify(element) + '\n';
        });
    }
    async queryByToOneFunctionTest() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.studentDao = this.daoSession.getBaseDao(Student);
        let columnName = this.studentDao.getPkProperty().columnName;
        let entityList = await this.studentDao.queryDeep("WHERE T." + columnName + "=?", ["1"]);
        let entity3: Student = entityList[0];
        this.text = '';
        this.text += "ToOne--" + JSON.stringify(entity3);
    }
    queryData() {
        let that = this;
        let ctx = GlobalContext.getContext().getValue(GlobalContext.KEY_CTX) as Context;
        dataRdb.getRdbStore(ctx, {
            name: this.dbName,
            securityLevel: dataRdb.SecurityLevel.S1,
            encrypt: false
        }, async (err, rdbStore) => {
            let promise = rdbStore.querySql("SELECT ID,NAME,TID FROM STUDENT");
            that.text = '';
            promise.then((resultSet) => {
                while (resultSet.goToNextRow()) {
                    let ID = resultSet.getLong(resultSet.getColumnIndex("ID"));
                    let NAME = resultSet.getString(resultSet.getColumnIndex("NAME"));
                    let TID = resultSet.getString(resultSet.getColumnIndex("TID"));
                    that.text += "STUDENT-{--ID-" + ID + "-----NAME-" + NAME + "---TID---" + TID + "--}\n";
                }
            }).catch((err: BusinessError) => {
                console.error("Query failed, err: " + err);
            });
            let promiseTeacher = rdbStore.querySql("SELECT ID,NAME FROM TEACHER");
            promiseTeacher.then((resultSet) => {
                while (resultSet.goToNextRow()) {
                    let ID = resultSet.getLong(resultSet.getColumnIndex("ID"));
                    let NAME = resultSet.getString(resultSet.getColumnIndex("NAME"));
                    that.text += "Teacher-{--ID-" + ID + "-----NAME-" + NAME + "}\n";
                }
            }).catch((err: BusinessError) => {
                console.error("Query failed, err: " + err);
            });
        });
    }
}
loadDocument(new Annotation("1", undefined, {}));
