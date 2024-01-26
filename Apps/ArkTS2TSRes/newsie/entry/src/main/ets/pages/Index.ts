interface Index_Params {
    client?: Client;
    status?: boolean;
    host?: string;
    port?: number;
    groups?: Array<SelectOption>;
    select_group?: string;
    articles?: Array<SelectOption>;
    select_article?: string;
    selected_date_time?: Date;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import Client from "ohos_newsie";
import promptAction from '@ohos.promptAction';
const tag = "dudu----";
class Value {
    value: any;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.client = new Client({});
        this.__status = new ObservedPropertySimple(false, this, "status");
        this.host = "xxx.xxx.xxx.xxx";
        this.port = 8084;
        this.__groups = new ObservedPropertyObject([] //所有新闻组
        , this, "groups");
        this.__select_group = new ObservedPropertySimple("" //选中新闻组
        , this, "select_group");
        this.__articles = new ObservedPropertyObject([] //所有文章
        , this, "articles");
        this.__select_article = new ObservedPropertySimple("" //选中文章
        , this, "select_article");
        this.__selected_date_time = new ObservedPropertyObject(new Date(), this, "selected_date_time");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.host !== undefined) {
            this.host = params.host;
        }
        if (params.port !== undefined) {
            this.port = params.port;
        }
        if (params.groups !== undefined) {
            this.groups = params.groups;
        }
        if (params.select_group !== undefined) {
            this.select_group = params.select_group;
        }
        if (params.articles !== undefined) {
            this.articles = params.articles;
        }
        if (params.select_article !== undefined) {
            this.select_article = params.select_article;
        }
        if (params.selected_date_time !== undefined) {
            this.selected_date_time = params.selected_date_time;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__groups.aboutToBeDeleted();
        this.__select_group.aboutToBeDeleted();
        this.__articles.aboutToBeDeleted();
        this.__select_article.aboutToBeDeleted();
        this.__selected_date_time.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private client: Client;
    private __status: ObservedPropertySimple<boolean>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: boolean) {
        this.__status.set(newValue);
    }
    private host: string;
    private port: number;
    private __groups: ObservedPropertyObject<Array<SelectOption>>; //所有新闻组
    get groups() {
        return this.__groups.get();
    }
    set groups(newValue: Array<SelectOption>) {
        this.__groups.set(newValue);
    }
    private __select_group: ObservedPropertySimple<string>; //选中新闻组
    get select_group() {
        return this.__select_group.get();
    }
    set select_group(newValue: string) {
        this.__select_group.set(newValue);
    }
    private __articles: ObservedPropertyObject<Array<SelectOption>>; //所有文章
    get articles() {
        return this.__articles.get();
    }
    set articles(newValue: Array<SelectOption>) {
        this.__articles.set(newValue);
    }
    private __select_article: ObservedPropertySimple<string>; //选中文章
    get select_article() {
        return this.__select_article.get();
    }
    set select_article(newValue: string) {
        this.__select_article.set(newValue);
    }
    private __selected_date_time: ObservedPropertyObject<Date>;
    get selected_date_time() {
        return this.__selected_date_time.get();
    }
    set selected_date_time(newValue: Date) {
        this.__selected_date_time.set(newValue);
    }
    BuildLabel(text: string, parent = null) {
        Text.create(text);
        Text.fontSize(14);
        Text.pop();
    }
    BuildButton(text: string, callback: (() => Promise<void>) | undefined, bgColor: ResourceColor = Color.Green, parent = null) {
        Button.createWithLabel(text);
        Button.margin({ right: 2, bottom: 1 });
        Button.fontSize(12);
        Button.onClick(callback);
        Button.height(30);
        Button.backgroundColor(bgColor);
        Button.pop();
    }
    async aboutToAppear() {
    }
    render() {
        Column.create();
        Column.create();
        Column.layoutWeight(0.2);
        Row.create();
        Row.width("100%");
        this.BuildLabel("当前连接状态：", this);
        If.create();
        if (this.status) {
            If.branchId(0);
            Text.create("成功");
            Text.fontColor(Color.Green);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("未连接/失败");
            Text.fontColor(Color.Red);
            Text.pop();
        }
        If.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width("100%");
        this.BuildButton("点击连接", this.safeCallFunc((async () => {
            this.client = new Client({
                host: "xxx.xxx.xxx.xxx",
                port: 8084
            });
            await this.client.connect();
            this.status = true;
            return "连接成功";
        })), this);
        Row.pop();
        Row.create();
        Row.width("100%");
        this.BuildLabel("当前时间：", this);
        DatePicker.create({ selected: this.selected_date_time });
        DatePicker.onChange((value: DatePickerResult) => {
            if (value && value.year !== undefined) {
                this.selected_date_time.setFullYear(value.year, value.month, value.day);
            }
        });
        DatePicker.layoutWeight(1);
        DatePicker.height(70);
        DatePicker.pop();
        TimePicker.create({ selected: this.selected_date_time });
        TimePicker.onChange((value) => {
            this.selected_date_time.setHours(value.hour, value.minute);
        });
        TimePicker.layoutWeight(1);
        TimePicker.height(70);
        TimePicker.pop();
        Row.pop();
        Column.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.layoutWeight(2);
        Column.create();
        Column.padding({ top: 20 });
        // 新闻组
        Column.create();
        Row.create();
        Row.width("100%");
        this.BuildLabel("新闻组：", this);
        Select.create(this.groups);
        Select.value(this.select_group);
        Select.font({ size: 16, weight: 500 });
        Select.fontColor('#182431');
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.onSelect((index: number, text: string) => {
            this.select_group = text;
        });
        Select.pop();
        Row.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        Flex.margin({ top: 10 });
        Flex.width("100%");
        this.BuildButton("list()-加载全部新闻组", this.safeCallFunc(async () => {
            const res: any = await this.client.list();
            this.groups = res.newsgroups.map((v: any) => ({ value: v.name } as Value));
            return res;
        }), this);
        this.BuildButton("group(group)-获取并选中文章", this.safeCallFunc(async () => {
            return await this.client.group(this.select_group);
        }), Color.Orange, this);
        this.BuildButton("newgroups(isoDateTime)-获取时间(后)的新闻组", this.safeCallFunc(async () => {
            return await this.client.newgroups(ObservedObject.GetRawObject(this.selected_date_time));
        }), Color.Orange, this);
        this.BuildButton("newnews(wildmat,isoDateTime)-获取新闻组、时间(后)的文章", this.safeCallFunc(async () => {
            return await this.client.newnews(this.select_group, ObservedObject.GetRawObject(this.selected_date_time));
        }), Color.Orange, this);
        this.BuildButton("listActive(wildmat?)", this.safeCallFunc(async () => {
            return await this.client.listActive(this.select_group);
        }), this);
        this.BuildButton("listNewsgroups(wildmat?)", this.safeCallFunc(async () => {
            return await this.client.listNewsgroups(this.select_group);
        }), this);
        this.BuildButton("listOverviewFmt()", this.safeCallFunc(async () => {
            return await this.client.listOverviewFmt();
        }), Color.Green, this);
        this.BuildButton("hdr(field, messageIdOrRange)", this.safeCallFunc(async () => {
            return await this.client.hdr("field", this.select_article);
        }), Color.Orange, this);
        this.BuildButton("listHeaders(argument?: 'MSGID' | 'RANGE')-*", this.safeCallFunc(async () => {
            return await this.client.listHeaders('MSGID');
        }), Color.Red, this);
        this.BuildButton("last()-*", this.safeCallFunc(async () => {
            return await this.client.last();
        }), Color.Red, this);
        this.BuildButton("next()-*", this.safeCallFunc(async () => {
            return await this.client.next();
        }), Color.Red, this);
        this.BuildButton("listActiveTimes(wildmat?)-*", this.safeCallFunc(async () => {
            return await this.client.listActiveTimes(this.select_group);
        }), Color.Red, this);
        this.BuildButton("listDistribPats(wildmat?)-*", this.safeCallFunc(async () => {
            return await this.client.listDistribPats(this.select_group);
        }), Color.Red, this);
        Flex.pop();
        // 新闻组
        Column.pop();
        // 文章号
        Column.create();
        Row.create();
        Row.width("100%");
        this.BuildLabel("文章号：", this);
        Select.create(this.articles);
        Select.value(this.select_article);
        Select.font({ size: 16, weight: 500 });
        Select.fontColor('#182431');
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.onSelect((index: number, text: string) => {
            this.select_article = text;
        });
        Select.pop();
        Row.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        Flex.margin({ top: 10 });
        Flex.width("100%");
        this.BuildButton("listGroup(group)-加载全部文章", this.safeCallFunc(async () => {
            const res: any = await this.client.listGroup(this.select_group);
            this.articles = res.group.articleNumbers.map((v: any) => ({ value: v + "" } as Value));
            return res;
        }), Color.Orange, this);
        this.BuildButton("article(messageId)-文章详情", this.safeCallFunc(async () => {
            return await this.client.article(this.select_article);
        }), Color.Orange, this);
        this.BuildButton("head(messageId)-头", this.safeCallFunc(async () => {
            return await this.client.head(this.select_article);
        }), Color.Orange, this);
        this.BuildButton("body(messageId)-主体", this.safeCallFunc(async () => {
            return await this.client.body(this.select_article);
        }), Color.Orange, this);
        this.BuildButton("stat(messageId)-是否存在", this.safeCallFunc(async () => {
            return await this.client.stat(this.select_article);
        }), Color.Orange, this);
        this.BuildButton("over(messageId?)", this.safeCallFunc(async () => {
            return await this.client.over(this.select_article);
        }), Color.Orange, this);
        this.BuildButton("post()-*", this.safeCallFunc(async () => {
            return await this.client.post();
        }), Color.Red, this);
        this.BuildButton("ihave(messageId)-*", this.safeCallFunc(async () => {
            return await this.client.ihave(this.select_article);
        }), Color.Red, this);
        this.BuildButton("check(messageId)-*", this.safeCallFunc(async () => {
            return await this.client.check(this.select_article);
        }), Color.Red, this);
        Flex.pop();
        // 文章号
        Column.pop();
        // 会话相关命令
        Column.create();
        Text.create("会话相关命令：");
        Text.fontSize(14);
        Text.width("100%");
        Text.pop();
        Flex.create({ wrap: FlexWrap.Wrap });
        Flex.width("100%");
        Flex.margin({ top: 10 });
        this.BuildButton("help()-帮助指令", this.safeCallFunc(async () => {
            return await this.client.help();
        }), this);
        this.BuildButton("capabilities()-能力列表", this.safeCallFunc(async () => {
            const res: any = await this.client.capabilities(); // 客户端获取服务端提供的能力列表
            return res;
        }), this);
        this.BuildButton("date()-获取服务器时间", this.safeCallFunc(async () => {
            return await this.client.date();
        }), this);
        this.BuildButton("modeReader()-模式切换", this.safeCallFunc(async () => {
            return await this.client.modeReader(); //触发服务端进行模式切换
        }), this);
        this.BuildButton("quit()-终止会话", this.safeCallFunc(async () => {
            return await this.client.quit(); //触发服务端进行模式切换
        }), this);
        this.BuildButton("modeStream()-*", this.safeCallFunc(async () => {
            return await this.client.modeStream(); //触发服务端进行模式切换
        }), Color.Red, this);
        this.BuildButton("slave()-*", this.safeCallFunc(async () => {
            return await this.client.slave();
        }), Color.Red, this);
        this.BuildButton("compressDeflate()-*", this.safeCallFunc(async () => {
            return await this.client.compressDeflate();
        }), Color.Red, this);
        Flex.pop();
        // 会话相关命令
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    log(info: string) {
        console.log(`${tag} ${info}`);
    }
    safeCallFunc(func: Function) {
        if (typeof func != "function")
            return;
        return async () => {
            try {
                const result: any = await func();
                this.log(JSON.stringify(result));
                this.showMessage(`操作成功 执行结果：${JSON.stringify(result) || "无"}`);
            }
            catch (err) {
                this.showMessage(`操作失败 错误消息为：${err.comment}`);
            }
        };
    }
    showMessage(message: string) {
        promptAction.showToast({ message });
    }
}
loadDocument(new Index("1", undefined, {}));
