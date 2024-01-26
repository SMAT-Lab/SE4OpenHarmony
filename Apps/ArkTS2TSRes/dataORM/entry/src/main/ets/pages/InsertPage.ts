interface InsertPage_Params {
    message?: string;
    daoSession?: DaoSession | null;
    phoneDao?: BaseDao<Phone, number> | null;
    mPhone?: Phone | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InsertPage_" + ++__generate__Id;
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
import dataRdb from '@ohos.data.relationalStore';
import { Phone } from './entry/Phone';
class InsertPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.daoSession = null;
        this.phoneDao = null;
        this.mPhone = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InsertPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.daoSession !== undefined) {
            this.daoSession = params.daoSession;
        }
        if (params.phoneDao !== undefined) {
            this.phoneDao = params.phoneDao;
        }
        if (params.mPhone !== undefined) {
            this.mPhone = params.mPhone;
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
    private phoneDao: BaseDao<Phone, number> | null;
    private mPhone: Phone | null;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.pop();
        Button.createWithLabel('插入一条Phone数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.addData();
        });
        Button.pop();
        Button.createWithLabel('更新一条Phone数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.updateData();
        });
        Button.pop();
        Button.createWithLabel('查询所有Phone数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryData();
        });
        Button.pop();
        Button.createWithLabel('批量新增');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.addArrayData();
        });
        Button.pop();
        Button.createWithLabel('删除名字为OPPO的Phone数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.deleteData();
        });
        Button.pop();
        Button.createWithLabel('批量新增或更新');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.updateArrayData();
        });
        Button.pop();
        Button.createWithLabel('条件查询');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryData2();
        });
        Button.pop();
        Flex.pop();
    }
    async addArrayData() {
        let phone1 = new Phone(1, "华为", 52);
        let phone2 = new Phone(2, "iphone", 51);
        let phone3 = new Phone(3, "小米", 50);
        let phone4 = new Phone(4, "OPPO", 40);
        let phone5 = new Phone(5, "VIVO", 45);
        let array = new Array<Phone>();
        array.push(phone1, phone2, phone3, phone4, phone5);
        if (this.phoneDao) {
            await this.phoneDao.insertOrReplaceInTxArrAsync(array);
        }
    }
    async updateArrayData() {
        let phone1 = new Phone(1, "华为", 20);
        let phone2 = new Phone(2, "iphone", 20);
        let phone3 = new Phone(3, "小米", 15);
        let phone4 = new Phone(4, "OPPO", 25);
        let phone5 = new Phone(5, "VIVO", 50);
        let phone6 = new Phone(6, "锤子", 66);
        let array = new Array<Phone>();
        array.push(phone1, phone2, phone3, phone4, phone5, phone6);
        if (this.phoneDao) {
            await this.phoneDao.insertOrReplaceInTxArrAsync(array);
        }
    }
    addData() {
        if (!this.mPhone) {
            this.mPhone = new Phone(1, "iphone", 10);
        }
        if (this.phoneDao) {
            this.phoneDao.insert(this.mPhone);
        }
    }
    updateData() {
        if (this.mPhone) {
            this.mPhone = new Phone(1, "iphone", 20);
            if (this.phoneDao) {
                this.phoneDao.update(this.mPhone);
            }
        }
    }
    async queryData() {
        if (!this.phoneDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Phone as Record<string, Property>;
        let query = this.phoneDao.queryBuilder().orderAsc(properties.id).buildCursor();
        let a = await query.list();
        this.message = JSON.stringify(a);
    }
    async queryData2() {
        if (!this.phoneDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Phone as Record<string, Property>;
        let query1 = this.phoneDao.queryBuilder();
        let query2 = this.phoneDao.queryBuilder();
        let result = this.phoneDao.queryBuilder();
        let condition1 = query1.and(properties.id.eq(1), properties.phonePrice.eq(20), []);
        let condition2 = query2.and(properties.id.eq(1), properties.phoneName.eq("iphone"), []);
        result.or(condition1, condition2, []);
        let a = await result.list();
        this.message = JSON.stringify(a);
    }
    async deleteData() {
        if (!this.phoneDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.Phone as Record<string, Property>;
        let deleteQuery = this.phoneDao.queryBuilder().where(properties.phoneName.eq("OPPO"))
            .buildDelete();
        deleteQuery.executeDeleteWithoutDetachingEntities();
    }
    aboutToAppear() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.phoneDao = this.daoSession.getBaseDao(Phone);
        this.phoneDao.addTableChangedListener(this.tabListener());
    }
    tabListener(): OnTableChangedListener<dataRdb.ResultSet> {
        return {
            async onTableChanged(t: dataRdb.ResultSet, action: TableAction) {
                if (action == TableAction.INSERT) {
                    promptAction.showToast({ message: "数据添加成功" });
                }
                else if (action == TableAction.UPDATE) {
                    promptAction.showToast({ message: "数据更改成功" });
                }
                else if (action == TableAction.DELETE) {
                    promptAction.showToast({ message: "数据删除成功" });
                }
                else if (action == TableAction.QUERY) {
                    promptAction.showToast({ message: "数据查询成功" });
                }
            }
        };
    }
}
loadDocument(new InsertPage("1", undefined, {}));
