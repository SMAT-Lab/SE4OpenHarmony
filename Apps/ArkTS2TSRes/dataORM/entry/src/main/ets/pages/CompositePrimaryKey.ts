interface CompositePrimaryKey_Params {
    message?: string;
    daoSession?: DaoSession | null;
    bookDao?: BaseDao<Book, number> | null;
    chapterDao?: BaseDao<Chapter, number> | null;
    topicDao?: BaseDao<Topics, number> | null;
    customerDao?: BaseDao<Customer, number> | null;
    joinPropertyUserDao?: BaseDao<JoinPropertyUser, number> | null;
    mUser?: JoinPropertyUser | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CompositePrimaryKey_" + ++__generate__Id;
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
import { BaseDao, DaoSession, GlobalContext } from '@ohos/dataorm';
import { Book } from './entry/Book';
import { Chapter } from './entry/Chapter';
import { Topics } from './entry/Topics';
import { Customer } from './entry/joinProperty/Customer';
import { JoinPropertyUser } from './entry/joinProperty/JoinPropertyUser';
class CompositePrimaryKey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.daoSession = null;
        this.bookDao = null;
        this.chapterDao = null;
        this.topicDao = null;
        this.customerDao = null;
        this.joinPropertyUserDao = null;
        this.mUser = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CompositePrimaryKey_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.daoSession !== undefined) {
            this.daoSession = params.daoSession;
        }
        if (params.bookDao !== undefined) {
            this.bookDao = params.bookDao;
        }
        if (params.chapterDao !== undefined) {
            this.chapterDao = params.chapterDao;
        }
        if (params.topicDao !== undefined) {
            this.topicDao = params.topicDao;
        }
        if (params.customerDao !== undefined) {
            this.customerDao = params.customerDao;
        }
        if (params.joinPropertyUserDao !== undefined) {
            this.joinPropertyUserDao = params.joinPropertyUserDao;
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
    private bookDao: BaseDao<Book, number> | null;
    private chapterDao: BaseDao<Chapter, number> | null;
    private topicDao: BaseDao<Topics, number> | null;
    private customerDao: BaseDao<Customer, number> | null;
    private joinPropertyUserDao: BaseDao<JoinPropertyUser, number> | null;
    private mUser: JoinPropertyUser | null;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.pop();
        Button.createWithLabel("ADD BookData");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.addBookData();
        });
        Button.pop();
        Button.createWithLabel("ADD ChapterData");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.addChapterData();
        });
        Button.pop();
        Button.createWithLabel("loadDeep Book data");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.loadDeep();
        });
        Button.pop();
        Button.createWithLabel("loadDeep Chapter data");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.loadChapterDeep();
        });
        Button.pop();
        Button.createWithLabel("joinProperty 新增");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.joinPropertyAddData();
        });
        Button.pop();
        Button.createWithLabel("joinProperty 查询");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 20 });
        Button.onClick(() => {
            this.getCustomers();
        });
        Button.pop();
        Flex.pop();
    }
    async joinPropertyAddData() {
        this.mUser = new JoinPropertyUser(1, "lid", 1);
        let rowId: number = -1;
        if (this.joinPropertyUserDao) {
            rowId = await this.joinPropertyUserDao.insert(this.mUser);
        }
        let arrays = new Array<Customer>();
        for (let index = 0; index < 5; index++) {
            let customer = new Customer(index, "CustomerName_" + index, rowId);
            arrays[index] = customer;
            if (this.customerDao) {
                await this.customerDao.insert(customer);
            }
        }
    }
    async getCustomers() {
        if (!this.customerDao || !this.mUser || !this.joinPropertyUserDao) {
            return;
        }
        let data = await this.customerDao.queryToManyListByColumnName("customers", [this.mUser.flag + ""]);
        let result = JSON.stringify(data);
        this.message = "查询数据：" + result;
        data.forEach(element => {
            console.info("sss----toMany----" + JSON.stringify(element));
        });
    }
    async addBookData() {
        let book = new Book();
        book.bookId = 100;
        book.bookName = "西游记";
        book.readingChapterUrl = "https:www.baidu.com";
        if (this.bookDao) {
            await this.bookDao.insert(book);
        }
    }
    async addChapterData() {
        let chapter = new Chapter();
        chapter.bookId = 100;
        chapter.content = "三打白骨精急啊去我家阿斯卡我开始喝开水";
        chapter.url = "https:www.baidu.com";
        chapter.name = "三打白骨精";
        if (this.chapterDao) {
            await this.chapterDao.insert(chapter);
        }
        let topics = new Topics();
        topics.bookId = 100;
        topics.questionName = "唐僧是否被吃？";
        topics.chapterUrl = "https:www.baidu.com";
        topics.answer = "NO NO";
        if (this.topicDao) {
            await this.topicDao.insert(topics);
        }
    }
    async loadDeep() {
        if (!this.bookDao) {
            return;
        }
        let book: Book = await this.bookDao.loadDeep(100);
        let result = JSON.stringify(book);
        console.log("sss--->book:" + result);
        this.message = "loadDeep--:" + result;
    }
    async loadChapterDeep() {
        if (!this.chapterDao) {
            return;
        }
        let chapter: Chapter = await this.chapterDao.loadDeep(100);
        let result = JSON.stringify(chapter);
        console.log("sss--->book:" + result);
        this.message = "loadDeep--:" + result;
    }
    aboutToAppear() {
        this.daoSession = GlobalContext.getContext().getValue("daoSession") as DaoSession;
        this.bookDao = this.daoSession.getBaseDao(Book);
        this.chapterDao = this.daoSession.getBaseDao(Chapter);
        this.topicDao = this.daoSession.getBaseDao(Topics);
        this.joinPropertyUserDao = this.daoSession.getBaseDao(JoinPropertyUser);
        this.customerDao = this.daoSession.getBaseDao(Customer);
    }
}
loadDocument(new CompositePrimaryKey("1", undefined, {}));
