interface MsgListPage_Params {
    message?: string;
    folderName?: string;
    startIndex?: number;
    endIndex?: number;
    searchType?: string;
    textValue?: string;
    selectList?: Array<SelectOption>;
    uidList?: Array<string>;
    selectIndex?: number;
    selectSortIndex?: number;
    selectFolder?: string;
    selectSort?: SortCriteria;
    inputValue?: string;
    listData?: Array<MsgListBean>;
    selectMsg?: number;
    bean?: Box | null;
    selectMenuList?: SortCriteria[];
    selectMenuArr?: Array<SelectOption>;
    pageSize?: number;
    util?: MsgListUtil;
    dialogController?: CustomDialogController | null;
}
interface CustomDialogDiy_Params {
    textValue?: string;
    inputValue?: string;
    controller?: CustomDialogController;
    cancel?: Function;
    confirm?: Function;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MsgListPage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import promptAction from '@ohos.promptAction';
import Imap, { inspect } from '@ohos/node-imap';
import router from '@ohos.router';
import StatusBean from '../bean/StatusBean';
import MsgListBean, { MsgListFootBean, MsgListHeadBean } from '../bean/MsgListBean';
import { Buffer } from '@ohos/node-imap/src/main/polyfill/buffer';
import buffer from '@ohos.buffer';
import MsgListUtil, { SortCriteria } from '../MsgListUtil';
import Box from '../bean/Box';
import GlobalObj from '../GlobalObj';
import DetailCallback from '../bean/DetailCallback';
import { ImapMessageAttributes } from '../bean/ImapMessage';
import MsgSendBean from '../bean/MsgSendBean';
import AppendOptions from '../bean/AppendOptions';
const searchCommand = ['ALL', 'ANSWERED', 'DELETED', 'DRAFT',
    'FLAGGED', 'NEW', 'SEEN', 'RECENT',
    'OLD', 'UNANSWERED', 'UNDELETED', 'UNDRAFT',
    'UNFLAGGED', 'UNSEEN', 'BCC', 'BODY',
    'CC', 'FROM', 'SUBJECT', 'TEXT',
    'TO', 'BEFORE', 'ON', 'SENTBEFORE',
    'SENTON', 'SENTSINCE', 'SINCE', 'KEYWORD',
    'UNKEYWORD', 'LARGER', 'SMALLER', 'HEADER',
    'UID', 'X-GM-MSGID', 'X-GM-THRID', 'X-GM-RAW',
    'X-GM-LABELS', 'MODSEQ'];
const sortCommand = ['ARRIVAL', 'CC', 'DATE', 'FROM',
    'SIZE', 'SUBJECT', 'TO'];
class CustomDialogDiy extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textValue = new SynchedPropertySimpleTwoWay(params.textValue, this, "textValue");
        this.__inputValue = new SynchedPropertySimpleTwoWay(params.inputValue, this, "inputValue");
        this.controller = undefined;
        this.cancel = () => {
        };
        this.confirm = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogDiy_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__textValue.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textValue: SynchedPropertySimpleTwoWay<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __inputValue: SynchedPropertySimpleTwoWay<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: Function;
    private confirm: Function;
    render() {
        Column.create();
        Text.create('请输入邮箱类型');
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.width('90%');
        Text.pop();
        TextInput.create({ placeholder: '', text: this.textValue });
        TextInput.height(60);
        TextInput.width('90%');
        TextInput.onChange((value: string) => {
            this.textValue = value;
        });
        Text.create('Tips:请输入正确格式的邮箱类型，例如@qq.com或者@163.com');
        Text.margin({ top: 10, bottom: 10 });
        Text.width('90%');
        Text.fontSize(8);
        Text.fontColor(Color.Red);
        Text.pop();
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Button.createWithLabel('取消');
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Button.createWithLabel('确定');
        Button.onClick(() => {
            this.inputValue = this.textValue;
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
class MsgListPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__folderName = new ObservedPropertySimple('INDEX', this, "folderName");
        this.__startIndex = new ObservedPropertySimple(1 //当前页
        , this, "startIndex");
        this.__endIndex = new ObservedPropertySimple(10 //当前页
        , this, "endIndex");
        this.__searchType = new ObservedPropertySimple('', this, "searchType");
        this.__textValue = new ObservedPropertySimple('', this, "textValue");
        this.__selectList = new ObservedPropertyObject([] //可选择的邮箱列表
        , this, "selectList");
        this.__uidList = new ObservedPropertyObject([] //邮件uid列表
        , this, "uidList");
        this.__selectIndex = new ObservedPropertySimple(-1 //当前选中的邮箱序号
        , this, "selectIndex");
        this.__selectSortIndex = new ObservedPropertySimple(0 //当前选中的邮箱序号
        , this, "selectSortIndex");
        this.__selectFolder = new ObservedPropertySimple('' //当前选中的邮箱名字
        , this, "selectFolder");
        this.__selectSort = new ObservedPropertyObject('DATE' //当前选中的排序规则
        , this, "selectSort");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__listData = new ObservedPropertyObject([] //邮件列表数据集合
        , this, "listData");
        this.__selectMsg = new ObservedPropertySimple(-1 //选择的邮件列表 用于添加已读或者删除的标记
        , this, "selectMsg");
        this.__bean = new ObservedPropertyObject(null //获取邮件列表之前先获取该文件夹里面的邮件总数和状态
        , this, "bean");
        this.selectMenuList = [];
        this.selectMenuArr = [];
        this.pageSize = 10 //请求时的每页多少条信息，用于分页请求
        ;
        this.util = new MsgListUtil();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogDiy("3", this, {
                    cancel: () => {
                        this.showToast(`关闭了对话框，取消选输入`, 'imap-search');
                    },
                    confirm: () => {
                        if (!this.inputValue || this.inputValue.length < 1) {
                            this.showToast(`搜索的内容不可为空`, 'imap-search');
                            return;
                        }
                        this.search();
                    },
                    textValue: this.__textValue,
                    inputValue: this.__inputValue
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            customStyle: false
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MsgListPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.folderName !== undefined) {
            this.folderName = params.folderName;
        }
        if (params.startIndex !== undefined) {
            this.startIndex = params.startIndex;
        }
        if (params.endIndex !== undefined) {
            this.endIndex = params.endIndex;
        }
        if (params.searchType !== undefined) {
            this.searchType = params.searchType;
        }
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.selectList !== undefined) {
            this.selectList = params.selectList;
        }
        if (params.uidList !== undefined) {
            this.uidList = params.uidList;
        }
        if (params.selectIndex !== undefined) {
            this.selectIndex = params.selectIndex;
        }
        if (params.selectSortIndex !== undefined) {
            this.selectSortIndex = params.selectSortIndex;
        }
        if (params.selectFolder !== undefined) {
            this.selectFolder = params.selectFolder;
        }
        if (params.selectSort !== undefined) {
            this.selectSort = params.selectSort;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.listData !== undefined) {
            this.listData = params.listData;
        }
        if (params.selectMsg !== undefined) {
            this.selectMsg = params.selectMsg;
        }
        if (params.bean !== undefined) {
            this.bean = params.bean;
        }
        if (params.selectMenuList !== undefined) {
            this.selectMenuList = params.selectMenuList;
        }
        if (params.selectMenuArr !== undefined) {
            this.selectMenuArr = params.selectMenuArr;
        }
        if (params.pageSize !== undefined) {
            this.pageSize = params.pageSize;
        }
        if (params.util !== undefined) {
            this.util = params.util;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__folderName.aboutToBeDeleted();
        this.__startIndex.aboutToBeDeleted();
        this.__endIndex.aboutToBeDeleted();
        this.__searchType.aboutToBeDeleted();
        this.__textValue.aboutToBeDeleted();
        this.__selectList.aboutToBeDeleted();
        this.__uidList.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__selectSortIndex.aboutToBeDeleted();
        this.__selectFolder.aboutToBeDeleted();
        this.__selectSort.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__listData.aboutToBeDeleted();
        this.__selectMsg.aboutToBeDeleted();
        this.__bean.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __folderName: ObservedPropertySimple<string>;
    get folderName() {
        return this.__folderName.get();
    }
    set folderName(newValue: string) {
        this.__folderName.set(newValue);
    }
    private __startIndex: ObservedPropertySimple<number>; //当前页
    get startIndex() {
        return this.__startIndex.get();
    }
    set startIndex(newValue: number) {
        this.__startIndex.set(newValue);
    }
    private __endIndex: ObservedPropertySimple<number>; //当前页
    get endIndex() {
        return this.__endIndex.get();
    }
    set endIndex(newValue: number) {
        this.__endIndex.set(newValue);
    }
    private __searchType: ObservedPropertySimple<string>;
    get searchType() {
        return this.__searchType.get();
    }
    set searchType(newValue: string) {
        this.__searchType.set(newValue);
    }
    private __textValue: ObservedPropertySimple<string>;
    get textValue() {
        return this.__textValue.get();
    }
    set textValue(newValue: string) {
        this.__textValue.set(newValue);
    }
    private __selectList: ObservedPropertyObject<Array<SelectOption>>; //可选择的邮箱列表
    get selectList() {
        return this.__selectList.get();
    }
    set selectList(newValue: Array<SelectOption>) {
        this.__selectList.set(newValue);
    }
    private __uidList: ObservedPropertyObject<Array<string>>; //邮件uid列表
    get uidList() {
        return this.__uidList.get();
    }
    set uidList(newValue: Array<string>) {
        this.__uidList.set(newValue);
    }
    private __selectIndex: ObservedPropertySimple<number>; //当前选中的邮箱序号
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __selectSortIndex: ObservedPropertySimple<number>; //当前选中的邮箱序号
    get selectSortIndex() {
        return this.__selectSortIndex.get();
    }
    set selectSortIndex(newValue: number) {
        this.__selectSortIndex.set(newValue);
    }
    private __selectFolder: ObservedPropertySimple<string>; //当前选中的邮箱名字
    get selectFolder() {
        return this.__selectFolder.get();
    }
    set selectFolder(newValue: string) {
        this.__selectFolder.set(newValue);
    }
    private __selectSort: ObservedPropertyObject<SortCriteria>; //当前选中的排序规则
    get selectSort() {
        return this.__selectSort.get();
    }
    set selectSort(newValue: SortCriteria) {
        this.__selectSort.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __listData: ObservedPropertyObject<Array<MsgListBean>>; //邮件列表数据集合
    get listData() {
        return this.__listData.get();
    }
    set listData(newValue: Array<MsgListBean>) {
        this.__listData.set(newValue);
    }
    private __selectMsg: ObservedPropertySimple<number>; //选择的邮件列表 用于添加已读或者删除的标记
    get selectMsg() {
        return this.__selectMsg.get();
    }
    set selectMsg(newValue: number) {
        this.__selectMsg.set(newValue);
    }
    private __bean: ObservedPropertyObject<Box | null>; //获取邮件列表之前先获取该文件夹里面的邮件总数和状态
    get bean() {
        return this.__bean.get();
    }
    set bean(newValue: Box | null) {
        this.__bean.set(newValue);
    }
    private selectMenuList: SortCriteria[];
    private selectMenuArr: Array<SelectOption>;
    private pageSize: number; //请求时的每页多少条信息，用于分页请求
    private util: MsgListUtil;
    private dialogController: CustomDialogController | null;
    showToast(text: string, name = '测试') {
        console.log(`zdy---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    MailMenu(parent = null) {
        Menu.create();
        MenuItem.create({ content: '所有', labelInfo: 'ALL' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.searchType = 'ALL';
                this.search();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '新消息', labelInfo: 'NEW' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.searchType = 'NEW';
                this.search();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '最近消息', labelInfo: 'RECENT' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.searchType = 'RECENT';
                this.search();
            }
        });
        MenuItem.pop();
        MenuItem.create({ content: '草稿', labelInfo: 'DRAFT' });
        MenuItem.onChange((selected) => {
            if (selected) {
                this.searchType = 'DRAFT';
                this.search();
            }
        });
        MenuItem.pop();
        Menu.pop();
    }
    refreshPageSize() {
        const ctx = this;
        if (ctx.startIndex >= (ctx.bean?.messages?.total ? ctx.bean?.messages?.total : 0)) {
            return;
        }
        ctx.endIndex = ctx.startIndex + ctx.pageSize - 1;
        if (ctx.endIndex > (ctx.bean?.messages?.total ? ctx.bean?.messages?.total : 0)) {
            ctx.endIndex = (ctx.bean?.messages?.total ? ctx.bean?.messages?.total : 0);
        }
    }
    aboutToAppear() {
        const ctx = this;
        ctx.selectMenuList.push("ARRIVAL");
        ctx.selectMenuList.push("-ARRIVAL");
        ctx.selectMenuList.push("CC");
        ctx.selectMenuList.push("-CC");
        ctx.selectMenuList.push("DATE");
        ctx.selectMenuList.push("-DATE");
        ctx.selectMenuList.push("FROM");
        ctx.selectMenuList.push("-FROM");
        ctx.selectMenuList.push("SIZE");
        ctx.selectMenuList.push("-SIZE");
        ctx.selectMenuList.push("SUBJECT");
        ctx.selectMenuList.push("-SUBJECT");
        ctx.selectMenuList.push("TO");
        ctx.selectMenuList.push("-TO");
        for (let i = 0; i < ctx.selectMenuList.length; i++) {
            let obj: SelectOption = {
                value: ctx.selectMenuList[i].toString(),
                icon: "app.media.app_icon"
            };
            ctx.selectMenuArr.push(obj);
        }
        if (!GlobalObj?.getInstance()?.getClient()) {
            this.showToast('账号未登录，请登录后再试', 'MsgList-imap');
            router.back();
            return;
        }
        let tempParam = router.getParams() as Record<string, string | Array<string>>;
        if (tempParam && tempParam['folderName'] && (tempParam['folderName'] as string).length > 0) {
            ctx.folderName = tempParam['folderName'] as string;
        }
        else {
            this.showToast('未获取到邮箱文件夹参数', 'MsgList-imap');
            router.back();
            return;
        }
        if (tempParam && tempParam['folderList']) {
            let folderList: Array<string> = tempParam['folderList'] as Array<string>;
            if (folderList) {
                for (let i = 0; i < folderList.length; i++) {
                    ctx.selectList.push({
                        value: folderList[i],
                        icon: $r('app.media.icon')
                    });
                    if (ctx.folderName === folderList[i]) {
                        ctx.selectIndex = i;
                    }
                }
            }
        }
        else {
            this.showToast('未获取到邮箱文件夹参数', 'MsgList-imap');
            router.back();
            return;
        }
        GlobalObj?.getInstance()?.getClient()?.status(ctx.folderName, (err: Error, data: Box) => {
            if (err)
                throw err;
            if (!data || (data?.messages?.total ? data?.messages?.total : 0) < 1) {
                throw new Error('get box status fail');
            }
            try {
                if ((data?.messages?.total ? data?.messages?.total : 0) > 0) {
                    GlobalObj?.getInstance()?.getClient()?.openBox(ctx.folderName, true, (err: Error, data: Box) => {
                        if (err)
                            throw err;
                        ctx.getListData();
                    });
                }
                else {
                    ctx.showToast(`文件夹：${ctx.folderName}中，有信息总共：${ctx?.bean?.messages?.total},新消息:${ctx?.bean?.messages?.new},未读消息:${ctx?.bean?.messages?.unseen}`);
                    ctx.listData = [];
                    let emptyBean = new MsgListBean();
                    emptyBean.Subject = `文件夹：${ctx.folderName}中，有信息总共：${ctx?.bean?.messages?.total},新消息:${ctx?.bean?.messages?.new},未读消息:${ctx?.bean?.messages?.unseen}`;
                    ctx.listData.push(emptyBean);
                }
            }
            catch (err) {
                throw err as Error;
            }
        });
    }
    aboutToDisappear() {
        this.dialogController = null;
        GlobalObj?.getInstance()?.getClient()?.end();
    }
    getListData() {
        const ctx = this;
        ctx.refreshPageSize();
        ctx.uidList = [];
        ctx.listData = [];
        ctx.selectFolder = '';
        ctx.searchType = '';
        ctx.selectMsg = -1;
        // fetch里面可以是fetch(`1:3`）这种取序号为1-3的信息的  也可以是可以是fetch(`1`）这种取序号为1的信息
        let prefix: string = '';
        let buffer: string = '';
        let callback: DetailCallback = {
            messageStartCallback: (seqno: number) => {
                console.log('Message #%d', seqno);
                prefix = '(#' + seqno + ') ';
            },
            bodyStartCallback: () => {
            },
            bodyDataCallback: (data: string) => {
                buffer += data;
            },
            bodyEndCallback: () => {
                try {
                    ctx.showToast(`获取整个邮件体成功：${'\r\n'}${buffer}`, 'MsgDetail-imap');
                    if (buffer.length > 65535) {
                        ctx.message = `获取整个邮件体成功,文本长度超过65535，text，取65535长度用于显示：${'\r\n'}${buffer.substring(0, 65535)}`;
                    }
                    else {
                        ctx.message = `获取整个邮件体成功：${'\r\n'}${buffer}`;
                    }
                }
                catch (err) {
                    throw err as Error;
                }
            },
            attributesCallback: (attrs: ImapMessageAttributes) => {
                if (attrs && attrs.uid) {
                    ctx.uidList.push(attrs.uid + "");
                }
            },
            messageEndCallback: () => {
                console.log(prefix + 'Finished');
            },
            fetchErrorCallback: (err: Error) => {
                console.log('Fetch error: ' + err);
            },
            fetchEndCallback: () => {
                console.log('Done fetching all messages!');
                try {
                    if (ctx.listData.length > 0) {
                        ctx.listData.pop();
                    }
                    if (ctx.listData.length == 0) {
                        ctx.listData.push(new MsgListHeadBean());
                    }
                    let jsonObj = buffer.split('\r\n\r\n');
                    if (!jsonObj) {
                        throw new Error('get message list fail');
                    }
                    for (let i = 0; i < jsonObj.length; i++) {
                        let childArr = jsonObj[i].split('\r\n');
                        let bean = new MsgListBean();
                        if (i < ctx.uidList.length) {
                            bean.uid = ctx.uidList[i];
                        }
                        for (let j = 0; j < childArr.length; j++) {
                            let child = childArr[j];
                            if (child && child.indexOf('Date') != -1) {
                                bean.Date = child;
                            }
                            else if (child && child.indexOf('From') != -1) {
                                bean.From = child;
                            }
                            else if (child && child.indexOf('To') != -1) {
                                bean.To = child;
                            }
                            else if (child && child.indexOf('Subject') != -1) {
                                bean.Subject = child;
                            }
                            else {
                                continue;
                            }
                        }
                        ctx.listData.push(bean);
                    }
                    ctx.listData.push(new MsgListFootBean());
                }
                catch (err) {
                    throw err as Error;
                }
                // GlobalObj?.getInstance()?.getClient().end();
            }
        };
        this.util?.getListData(ctx.startIndex, ctx.endIndex, callback);
    }
    render() {
        Row.create();
        Row.height('100%');
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.height(60);
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('上传邮件');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.appendMail();
        });
        Button.pop();
        Button.createWithLabel('关闭邮箱');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.closeBox();
        });
        Button.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.height(60);
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('删除标记的邮件');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.storeMail();
        });
        Button.pop();
        Button.createWithLabel('搜索邮件');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.bindMenu({ builder: this.MailMenu.bind(this) });
        Button.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.height(60);
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('添加flag');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.addFlag();
        });
        Button.pop();
        Button.createWithLabel('设置flag');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.setFlag();
        });
        Button.pop();
        Button.createWithLabel('删除flag');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.deleteFlag();
        });
        Button.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.height(60);
        Flex.margin({ left: 15, top: 20 });
        Button.createWithLabel('添加关键字');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.addKeywords();
        });
        Button.pop();
        Button.createWithLabel('设置关键字');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.setKeywords();
        });
        Button.pop();
        Button.createWithLabel('删除关键字');
        Button.margin(10);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.delKeywords();
        });
        Button.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Flex.height(60);
        Flex.margin({ left: 15, top: 20 });
        Select.create(this.selectList);
        Select.selected(this.selectIndex);
        Select.value('复制信息');
        Select.fontColor("#182431");
        Select.font({ size: 16, weight: 500 });
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.onSelect((index: number, text: string) => {
            this.selectIndex = index;
            this.selectFolder = text;
            this.copyMail();
        });
        Select.margin(10);
        Select.height(50);
        Select.backgroundColor(Color.Blue);
        Select.pop();
        Select.create(this.selectList);
        Select.selected(this.selectIndex);
        Select.value('移动信息');
        Select.fontColor("#182431");
        Select.margin({ left: 30 });
        Select.font({ size: 16, weight: 500 });
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.onSelect((index: number, text: string) => {
            this.selectIndex = index;
            this.selectFolder = text;
            this.moveMail();
        });
        Select.margin(10);
        Select.height(50);
        Select.backgroundColor(Color.Blue);
        Select.pop();
        Select.create(this.selectMenuArr);
        Select.selected(this.selectSortIndex);
        Select.value('邮件排序');
        Select.fontColor("#182431");
        Select.margin({ left: 30 });
        Select.font({ size: 16, weight: 500 });
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.onSelect((index: number, text: string) => {
            this.selectIndex = index;
            for (let i = 0; i < this.selectMenuList.length; i++) {
                if (this.selectMenuList[i].toString() == text) {
                    this.selectFolder = text;
                    this.sortMail();
                    break;
                }
            }
        });
        Select.margin(10);
        Select.height(50);
        Select.backgroundColor(Color.Blue);
        Select.pop();
        Flex.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.width('100%');
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, color: 0x888888 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.listData), (item: MsgListBean, index: number) => {
            ListItem.create();
            Gesture.create(GesturePriority.Parallel, GestureMask.Normal);
            TapGesture.create();
            TapGesture.onAction((event) => {
                if (index === 0) {
                    this.listData = [];
                    this.startIndex = 0;
                    this.endIndex = 0;
                    this.getListData();
                }
                else if (index === (this.listData.length - 1)) {
                    this.startIndex = this.endIndex + 1;
                    this.getListData();
                }
                else {
                    this.showToast(`点击了列表的第${index}项`, 'list-click-imap');
                    router.pushUrl({
                        url: 'pages/MsgDetailPage',
                        params: {
                            clickIndex: index
                        }
                    });
                }
            });
            TapGesture.pop();
            Gesture.pop();
            Gesture.create(GesturePriority.Low, GestureMask.Normal);
            LongPressGesture.create();
            LongPressGesture.onAction((event) => {
                if (this.selectMsg != -1) {
                    this.selectMsg = -1;
                }
                else {
                    this.selectMsg = index;
                    this.selectMailBox();
                }
            });
            LongPressGesture.pop();
            Gesture.pop();
            If.create();
            if (index === 0 || index === this.listData.length - 1) {
                If.branchId(0);
                Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center, direction: FlexDirection.Row });
                Flex.height(110);
                Text.create(item.Subject);
                Text.fontSize(14);
                Text.height(50);
                Text.margin({ left: 10 });
                Text.fontWeight(FontWeight.Bold);
                Text.pop();
                Flex.pop();
            }
            else {
                If.branchId(1);
                Flex.create({ alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start, direction: FlexDirection.Row });
                Flex.height(110);
                Toggle.create({ type: ToggleType.Checkbox, isOn: true });
                Toggle.size({ width: 30, height: 30 });
                Toggle.selectedColor('#007DFF');
                Toggle.visibility(this.selectMsg != -1 && this.selectMsg === index ? Visibility.Visible : Visibility.None);
                Toggle.pop();
                Image.create($r('app.media.mail'));
                Image.height(40);
                Image.width(40);
                Image.margin({ left: 10 });
                Flex.create({
                    alignItems: ItemAlign.Center,
                    justifyContent: FlexAlign.Center,
                    alignContent: FlexAlign.Center,
                    direction: FlexDirection.Column
                });
                Flex.layoutWeight(1);
                Text.create(item.From);
                Text.fontSize(14);
                Text.height(50);
                Text.margin({ left: 10 });
                Text.fontWeight(FontWeight.Bold);
                Text.pop();
                Text.create(item.Subject);
                Text.fontSize(12);
                Text.height(50);
                Text.margin({ left: 10 });
                Text.fontWeight(FontWeight.Bold);
                Text.pop();
                Flex.pop();
                Text.create(item.Date);
                Text.fontSize(10);
                Text.height(50);
                Text.width(100);
                Text.textAlign(TextAlign.End);
                Text.margin({ left: 10 });
                Text.fontWeight(FontWeight.Bold);
                Text.pop();
                Flex.pop();
            }
            If.pop();
            ListItem.pop();
        }, (item: MsgListBean, index: number) => index + '');
        ForEach.pop();
        List.pop();
        Flex.pop();
        Row.pop();
    }
    createMailData() {
        let msg: MsgSendBean = {
            text: 'IMAP协议测试上传的邮件',
            from: `${'鸿蒙搬砖工'} <${'xxxx@xxxx.com'}>`,
            to: 'xxxx@xxxx.com',
            cc: 'xxxx@xxx.com',
            bcc: 'xxx@xxx.com',
            subject: '鸿蒙客户端IMAP协议的主题'
        };
        return JSON.stringify(msg);
    }
    appendMail() {
        const ctx = this;
        ctx.selectMsg = -1;
        try {
            let data = ctx.createMailData();
            if (!data || data.length < 1) {
                ctx.showToast('上传的邮件数据不可以为空', 'appendMail-imap');
                return;
            }
            ctx.showToast('开始上传邮件', 'appendMail-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                let option: AppendOptions = {
                    mailbox: ctx.folderName,
                    flags: ['Seen'],
                    date: new Date(), //取值 Seen flagged等
                };
                GlobalObj?.getInstance()?.getClient()?.append(data, option, (err: Error) => {
                    if (err) {
                        ctx.showToast(`上传邮件失败,原因：${err.message}`, 'appendMail-imap');
                    }
                    else {
                        ctx.showToast('上传邮件成功', 'appendMail-imap');
                        ctx.startIndex = 0;
                        ctx.endIndex = 0;
                        ctx.getListData();
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'appendMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`上传邮件出错：${err.message}`, 'appendMail-smtp');
        }
    }
    selectMailBox() {
        console.log(`zdy--SELECT指令内部调用，未开放给用户--->`);
    }
    closeBox() {
        const ctx = this;
        try {
            ctx.selectMsg = -1;
            ctx.showToast('开始关闭本文件夹', 'closeBox-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.closeBox((err: Error) => {
                    if (err) {
                        ctx.showToast(`关闭本文件夹失败,原因：${err.message}`, 'closeBox-imap');
                    }
                    else {
                        ctx.showToast('关闭本文件夹成功', 'appendMail-imap');
                        router.clear();
                        router.pushUrl({
                            url: 'pages/FolderPage'
                        });
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'closeBox-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`关闭本文件夹出错：${err.message}`, 'closeBox-smtp');
        }
    }
    sortMail() {
        const ctx = this;
        try {
            if (!ctx.selectSort || ctx.selectSort.length < 1) {
                ctx.showToast('排序参数不可以为空', 'sortMail-imap');
                return;
            }
            ctx.showToast('开始设置排序', 'sortMail-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.sort([ctx.selectSort], ['ALL'], (err: Error, uids: number[]) => {
                    if (err) {
                        ctx.showToast(`设置排序失败,原因：${err.message}`, 'sortMail-imap');
                    }
                    else {
                        ctx.showToast('设置排序成功', 'sortMail-imap');
                        ctx.startIndex = 0;
                        ctx.endIndex = 0;
                        ctx.getListData();
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'sortMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`设置排序出错：${err.message}`, 'sortMail-smtp');
        }
    }
    search() {
        const ctx = this;
        try {
            ctx.selectMsg = -1;
            ctx.showToast('开始搜索邮件', 'search-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.search([ctx.searchType], (err: Error, uids: number[]) => {
                    if (err) {
                        ctx.showToast(`搜索邮件失败,原因：${err.message}`, 'search-imap');
                    }
                    else {
                        ctx.showToast('搜索邮件成功 ' + JSON.stringify(uids), 'search-imap');
                        if (!uids) {
                            throw new Error('get message list fail');
                        }
                        ctx.listData = [];
                        for (let i = 0; i < uids.length; i++) {
                            let bean = new MsgListBean();
                            bean.Date = '';
                            bean.From = '';
                            bean.To = '';
                            bean.Subject = '当前搜索的信息编号：' + uids[i];
                            ctx.listData.push(bean);
                        }
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'search-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`搜索邮件出错：${err.message}`, 'search-smtp');
        }
    }
    /**
     * 给邮件打标记 比如删除 已读
     * Deleted \Flagged \Seen
     *
     */
    storeMail() {
        const ctx = this;
        if (!ctx.selectMsg || ctx.selectMsg === -1) {
            ctx.showToast('请先选择一个邮件', 'storeMail---IMAP');
            return;
        }
        if (!ctx.listData || ctx.listData.length < 3) {
            ctx.showToast('当前邮箱中暂无可用的消息', 'storeMail---IMAP');
            return;
        }
        if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
            ctx.showToast('请选择正确的可以操作的邮件', 'storeMail---IMAP');
            return;
        }
        let uid = ctx.listData[ctx.selectMsg].uid;
        ctx.addDeleteFlag(uid);
    }
    addDeleteFlag(uid: string) {
        const ctx = this;
        try {
            ctx.showToast('开始给邮件打删除标记', 'storeMail-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.addFlags(uid, '\\Seen', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件打删除标记失败,原因：${err.message}`, 'storeMail-imap');
                    }
                    else {
                        ctx.showToast('给邮件打删除标记成功', 'storeMail-imap');
                        ctx.startIndex = 0;
                        ctx.endIndex = 0;
                        ctx.expungeMail(uid);
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'storeMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件打删除标记出错：${err.message}`, 'storeMail-smtp');
        }
    }
    expungeMail(uid: string) {
        const ctx = this;
        try {
            ctx.selectMsg = -1;
            ctx.showToast('开始永久删除所有的标志为DELETED的邮件，EXPUNGE删除的邮件将不可以恢复', 'closeBox-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.expunge(uid, (err: Error) => {
                    if (err) {
                        ctx.showToast(`永久删除失败,原因：${err.message}`, 'expungeMail-imap');
                    }
                    else {
                        ctx.showToast('永久删除成功', 'expungeMail-imap');
                        ctx.getListData();
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'expungeMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`永久删除出错：${err.message}`, 'expungeMail-smtp');
        }
    }
    copyMail() {
        const ctx = this;
        try {
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'copyMail---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'copyMail---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'copyMail---IMAP');
                return;
            }
            if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
                ctx.showToast('请先选择一个邮箱', 'copyMail---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.copy(uid, ctx.selectFolder, (err: Error) => {
                    if (err) {
                        ctx.showToast(`复制邮件失败,原因：${err.message}`, 'copyMail-imap');
                    }
                    else {
                        ctx.showToast('复制邮件成功 ', 'copyMail-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'copyMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`复制邮件出错：${err.message}`, 'copyMail-smtp');
        }
    }
    moveMail() {
        const ctx = this;
        try {
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'moveMail---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'moveMail---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'moveMail---IMAP');
                return;
            }
            if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
                ctx.showToast('请先选择一个邮箱', 'moveMail---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.move(uid, ctx.selectFolder, (err: Error) => {
                    if (err) {
                        ctx.showToast(`移动邮件失败,原因：${err.message}`, 'moveMail-imap');
                    }
                    else {
                        ctx.showToast('移动邮件成功 ', 'moveMail-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'moveMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`移动邮件出错：${err.message}`, 'moveMail-smtp');
        }
    }
    addFlag() {
        const ctx = this;
        try {
            const ctx = this;
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'addFlag---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'addFlag---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'addFlag---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            ctx.showToast('开始给邮件添加已读标记', 'addFlag-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.addFlags(uid, '\\Seen', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件添加已读标记失败,原因：${err.message}`, 'addFlag-imap');
                    }
                    else {
                        ctx.showToast('给邮件添加已读标记成功', 'addFlag-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'storeMail-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件添加已读标记出错：${err.message}`, 'storeMail-smtp');
        }
    }
    setFlag() {
        const ctx = this;
        try {
            const ctx = this;
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'setFlag---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setFlag---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'setFlag---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            ctx.showToast('开始给邮件设置已读标记', 'setFlag-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.setFlags(uid, '\\Seen', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件设置已读标记失败,原因：${err.message}`, 'setFlag-imap');
                    }
                    else {
                        ctx.showToast('给邮件设置已读标记成功', 'setFlag-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'setFlag-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件设置已读标记出错：${err.message}`, 'setFlag-smtp');
        }
    }
    deleteFlag() {
        const ctx = this;
        try {
            const ctx = this;
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'deleteFlag---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'deleteFlag---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'deleteFlag---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            ctx.showToast('开始给邮件取消已读标记', 'deleteFlag-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.delFlags(uid, '\\Seen', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件取消已读标记失败,原因：${err.message}`, 'deleteFlag-imap');
                    }
                    else {
                        ctx.showToast('给邮件取消已读标记成功', 'deleteFlag-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'deleteFlag-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件取消已读标记出错：${err.message}`, 'deleteFlag-smtp');
        }
    }
    addKeywords() {
        const ctx = this;
        try {
            const ctx = this;
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'setKeywords---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setKeywords---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'setKeywords---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            ctx.showToast('开始给邮件添加关键字', 'setKeywords-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.addKeywords(uid, '鸿蒙关键字', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件添加关键字失败,原因：${err.message}`, 'setKeywords-imap');
                    }
                    else {
                        ctx.showToast('给邮件添加关键字成功', 'setKeywords-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'setKeywords-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件添加关键字出错：${err.message}`, 'setKeywords-smtp');
        }
    }
    setKeywords() {
        const ctx = this;
        try {
            const ctx = this;
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'setKeywords---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'setKeywords---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'setKeywords---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            ctx.showToast('开始给邮件设置关键字', 'setKeywords-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.setKeywords(uid, '鸿蒙关键字', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件设置关键字失败,原因：${err.message}`, 'setKeywords-imap');
                    }
                    else {
                        ctx.showToast('给邮件设置关键字成功', 'setKeywords-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'setKeywords-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件设置关键字出错：${err.message}`, 'setKeywords-smtp');
        }
    }
    delKeywords() {
        const ctx = this;
        try {
            const ctx = this;
            if (!ctx.selectMsg || ctx.selectMsg === -1) {
                ctx.showToast('请先选择一个邮件', 'delKeywords---IMAP');
                return;
            }
            if (!ctx.listData || ctx.listData.length < 3) {
                ctx.showToast('当前邮箱中暂无可用的消息', 'delKeywords---IMAP');
                return;
            }
            if (ctx.selectMsg <= 0 || ctx.selectMsg >= ctx.listData.length - 1) {
                ctx.showToast('请选择正确的可以操作的邮件', 'delKeywords---IMAP');
                return;
            }
            let uid = ctx.listData[ctx.selectMsg].uid;
            ctx.showToast('开始给邮件删除关键字', 'delKeywords-imap');
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.delKeywords(uid, '鸿蒙关键字', (err: Error) => {
                    if (err) {
                        ctx.showToast(`给邮件删除关键字失败,原因：${err.message}`, 'delKeywords-imap');
                    }
                    else {
                        ctx.showToast('给邮件删除关键字成功', 'delKeywords-imap');
                    }
                });
            }
            else {
                this.showToast('账号未登录，请登录后再试', 'delKeywords-imap');
                router.back();
            }
        }
        catch (err) {
            ctx.showToast(`给邮件删除关键字出错：${err.message}`, 'delKeywords-smtp');
        }
    }
}
loadDocument(new MsgListPage("1", undefined, {}));
