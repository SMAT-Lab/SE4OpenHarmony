interface EmbedPage_Params {
    message?: string;
    daoSession?: DaoSession | null;
    userDao?: BaseDao<User, number> | null;
    mUser?: User | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EmbedPage_" + ++__generate__Id;
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
import { BaseDao, DaoSession, GlobalContext, OnTableChangedListener, Property, TableAction } from '@ohos/dataorm';
import promptAction from '@ohos.promptAction';
import { Father } from './embed/Father';
import { Mother } from './embed/Mother';
import { User } from './embed/User';
import dataRdb from '@ohos.data.relationalStore';
import { ChildInfo } from './embed/ChildInfo';
import { SunInfo } from './embed/SunInfo';
import { ChildTwo } from './embed/ChildTwo';
import { SunInfoTwo } from './embed/SunInfoTwo';
class EmbedPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.daoSession = null;
        this.userDao = null;
        this.mUser = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EmbedPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.daoSession !== undefined) {
            this.daoSession = params.daoSession;
        }
        if (params.userDao !== undefined) {
            this.userDao = params.userDao;
        }
        if (params.mUser !== undefined) {
            this.mUser = params.mUser;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private daoSession: DaoSession | null;
    private userDao: BaseDao<User, number> | null;
    private mUser: User | null;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.pop();
        Button.createWithLabel('新增嵌套数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.addData();
        });
        Button.pop();
        Button.createWithLabel('更改嵌套数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.updateData();
        });
        Button.pop();
        Button.createWithLabel('查询嵌套数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryData();
        });
        Button.pop();
        Button.createWithLabel('删除嵌套数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.deleteUsers();
        });
        Button.pop();
        Flex.pop();
    }
    addData() {
        if (!this.mUser) {
            this.mUser = new User();
        }
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
        this.mUser.id = 1;
        this.mUser.userName = "中国";
        this.mUser.userAge = 5000;
        this.mUser.father = father;
        this.mUser.mother = mother;
        this.mUser.home = "地球亚洲";
        if (this.userDao) {
            this.userDao.insert(this.mUser);
        }
    }
    updateData() {
        if (this.mUser) {
            this.mUser.userName = "china";
            let father = new Father("泰山", 3000, "山东");
            this.mUser.father = father;
            if (this.userDao) {
                this.userDao.update(this.mUser);
            }
        }
    }
    async queryData() {
        if (!this.userDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.User as Record<string, Property>;
        let query = this.userDao.queryBuilder().orderAsc(properties.userName).buildCursor();
        let a = await query.list();
        this.message = JSON.stringify(a);
    }
    async deleteUsers() {
        if (!this.userDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.User as Record<string, Property>;
        let deleteQuery = this.userDao.queryBuilder().where(properties.userName.eq("china"))
            .buildDelete();
        deleteQuery.executeDeleteWithoutDetachingEntities();
    }
    aboutToAppear() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.userDao = this.daoSession.getBaseDao(User);
        this.userDao.addTableChangedListener(this.tabListener());
    }
    tabListener(): OnTableChangedListener<dataRdb.ResultSet> {
        return {
            async onTableChanged(t: dataRdb.ResultSet, action: TableAction) {
                if (action == TableAction.INSERT) {
                    promptAction.showToast({ message: "嵌套数据添加成功" });
                }
                else if (action == TableAction.UPDATE) {
                    promptAction.showToast({ message: "嵌套数据更改成功" });
                }
                else if (action == TableAction.DELETE) {
                    promptAction.showToast({ message: "嵌套数据删除成功" });
                }
                else if (action == TableAction.QUERY) {
                    promptAction.showToast({ message: "嵌套数据查询成功" });
                }
            }
        };
    }
}
loadDocument(new EmbedPage("1", undefined, {}));
