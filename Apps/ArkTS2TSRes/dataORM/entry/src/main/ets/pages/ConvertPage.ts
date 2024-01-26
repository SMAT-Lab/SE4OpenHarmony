interface ConvertPage_Params {
    message?: string;
    daoSession?: DaoSession | null;
    covertDao?: BaseDao<ConvertInfo, number> | null;
    mConvertInfo?: ConvertInfo | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ConvertPage_" + ++__generate__Id;
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
import { ConvertInfo } from './convert/ConvertInfo';
import dataRdb from '@ohos.data.relationalStore';
import ArrayList from '@ohos.util.ArrayList';
class ConvertPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.daoSession = null;
        this.covertDao = null;
        this.mConvertInfo = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ConvertPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.daoSession !== undefined) {
            this.daoSession = params.daoSession;
        }
        if (params.covertDao !== undefined) {
            this.covertDao = params.covertDao;
        }
        if (params.mConvertInfo !== undefined) {
            this.mConvertInfo = params.mConvertInfo;
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
    private covertDao: BaseDao<ConvertInfo, number> | null;
    private mConvertInfo: ConvertInfo | null;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.pop();
        Button.createWithLabel('Convert注解修饰新增数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.addData();
        });
        Button.pop();
        Button.createWithLabel('Convert注解修饰更改数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.updateData();
        });
        Button.pop();
        Button.createWithLabel('Convert注解修饰查询数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.queryData();
        });
        Button.pop();
        Button.createWithLabel('删除数据');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.deleteData();
        });
        Button.pop();
        Flex.pop();
    }
    addData() {
        if (!this.mConvertInfo) {
            this.mConvertInfo = new ConvertInfo();
        }
        let images = new ArrayList<string>();
        images.add("image1");
        images.add("image2");
        images.add("image3");
        images.add("image4");
        images.add("image5");
        images.add("image6");
        this.mConvertInfo.images = images;
        if (this.covertDao) {
            this.covertDao.insert(this.mConvertInfo);
        }
    }
    updateData() {
        if (this.mConvertInfo) {
            let images = new ArrayList<string>();
            images.add("update1");
            images.add("update2");
            images.add("update3");
            images.add("update4");
            images.add("update5");
            images.add("update6");
            this.mConvertInfo.images = images;
            if (this.covertDao) {
                this.covertDao.update(this.mConvertInfo);
            }
        }
    }
    async queryData() {
        if (!this.covertDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.ConvertInfo as Record<string, Property>;
        let query = this.covertDao.queryBuilder().orderAsc(properties.images).buildCursor();
        let a = await query.list();
        this.message = JSON.stringify(a);
    }
    async deleteData() {
        if (!this.covertDao) {
            return;
        }
        let entityClass = GlobalContext.getContext().getValue(GlobalContext.KEY_CLS) as Record<string, Object>;
        let properties = entityClass.ConvertInfo as Record<string, Property>;
        let deleteQuery = this.covertDao.queryBuilder().where(properties.id.eq(1))
            .buildDelete();
        deleteQuery.executeDeleteWithoutDetachingEntities();
    }
    aboutToAppear() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.covertDao = this.daoSession.getBaseDao(ConvertInfo);
        this.covertDao.addTableChangedListener(this.tabListener());
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
loadDocument(new ConvertPage("1", undefined, {}));
