interface AutoLoginCommandPage_Params {
    message?: string;
    listData?: Array<string>;
    mailType?: string;
    client?: Pop3Command | null;
    selectMsgNum?: number;
    isListShow?: boolean;
    msgList?: Array<MsgBean>;
    topLine?: string;
    controller?: TextInputController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AutoLoginCommandPage_" + ++__generate__Id;
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
import router from '@ohos.router';
import Pop3Command, { Pop3LoginBean } from '@ohos/node-pop3';
import MsgBean from '../MsgBean';
import GlobalObj from '../GlobalObj';
const BASE_COUNT = 1;
class AutoLoginCommandPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__listData = new ObservedPropertyObject([], this, "listData");
        this.__mailType = new ObservedPropertySimple('@qq.com', this, "mailType");
        this.__client = new ObservedPropertyObject(null, this, "client");
        this.__selectMsgNum = new ObservedPropertySimple(-1, this, "selectMsgNum");
        this.__isListShow = new ObservedPropertySimple(false, this, "isListShow");
        this.__msgList = new ObservedPropertyObject([], this, "msgList");
        this.__topLine = new ObservedPropertySimple('', this, "topLine");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AutoLoginCommandPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.listData !== undefined) {
            this.listData = params.listData;
        }
        if (params.mailType !== undefined) {
            this.mailType = params.mailType;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
        if (params.selectMsgNum !== undefined) {
            this.selectMsgNum = params.selectMsgNum;
        }
        if (params.isListShow !== undefined) {
            this.isListShow = params.isListShow;
        }
        if (params.msgList !== undefined) {
            this.msgList = params.msgList;
        }
        if (params.topLine !== undefined) {
            this.topLine = params.topLine;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__listData.aboutToBeDeleted();
        this.__mailType.aboutToBeDeleted();
        this.__client.aboutToBeDeleted();
        this.__selectMsgNum.aboutToBeDeleted();
        this.__isListShow.aboutToBeDeleted();
        this.__msgList.aboutToBeDeleted();
        this.__topLine.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __listData: ObservedPropertyObject<Array<string>>;
    get listData() {
        return this.__listData.get();
    }
    set listData(newValue: Array<string>) {
        this.__listData.set(newValue);
    }
    private __mailType: ObservedPropertySimple<string>;
    get mailType() {
        return this.__mailType.get();
    }
    set mailType(newValue: string) {
        this.__mailType.set(newValue);
    }
    private __client: ObservedPropertyObject<Pop3Command | null>;
    get client() {
        return this.__client.get();
    }
    set client(newValue: Pop3Command | null) {
        this.__client.set(newValue);
    }
    private __selectMsgNum: ObservedPropertySimple<number>;
    get selectMsgNum() {
        return this.__selectMsgNum.get();
    }
    set selectMsgNum(newValue: number) {
        this.__selectMsgNum.set(newValue);
    }
    private __isListShow: ObservedPropertySimple<boolean>;
    get isListShow() {
        return this.__isListShow.get();
    }
    set isListShow(newValue: boolean) {
        this.__isListShow.set(newValue);
    }
    private __msgList: ObservedPropertyObject<Array<MsgBean>>;
    get msgList() {
        return this.__msgList.get();
    }
    set msgList(newValue: Array<MsgBean>) {
        this.__msgList.set(newValue);
    }
    private __topLine: ObservedPropertySimple<string>;
    get topLine() {
        return this.__topLine.get();
    }
    set topLine(newValue: string) {
        this.__topLine.set(newValue);
    }
    private controller: TextInputController;
    async aboutToDisappear() {
        if (this.client) {
            await this.client.QUIT();
        }
    }
    showToast(text: string, name = '测试') {
        console.log(`zdy---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    aboutToAppear() {
        let params = router.getParams();
        let tempParam = params as Record<string, Object>;
        if (tempParam && tempParam['loginOption'] && typeof tempParam['loginOption'] === 'object') {
            let option = tempParam['loginOption'] as Pop3LoginBean;
            this.client = new Pop3Command({
                user: option?.user,
                password: option?.password,
                host: option?.host,
                port: option?.port,
                tls: option?.tls,
                timeout: option?.timeout,
                tlsOptions: option?.tlsOptions,
                servername: option?.servername
            });
        }
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center,
            alignContent: FlexAlign.Center,
            direction: FlexDirection.Row
        });
        Flex.create({
            alignItems: ItemAlign.Start,
            justifyContent: FlexAlign.Start,
            alignContent: FlexAlign.Start,
            direction: FlexDirection.Column
        });
        Flex.layoutWeight(1);
        Flex.height('100%');
        Button.createWithLabel('STAT命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendSTAT();
        });
        Button.margin({ top: 10 });
        Button.pop();
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.createWithLabel('NOOP命令');
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.margin(20);
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.height(50);
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.backgroundColor(Color.Blue);
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.fontColor(Color.White);
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.onClick(() => {
            this.sendNOOP();
        });
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.margin({ top: 10 });
        // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
        //   .margin(20)
        //   .height(50)
        //   .backgroundColor(Color.Blue)
        //   .fontColor(Color.White)
        //   .onClick(() => {
        //     this.sendLAST()
        //   })
        //   .margin({ top: 10 })
        Button.pop();
        Button.createWithLabel('QUIT命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendQUIT();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('LIST命令');
        Button.margin(20);
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendLIST();
        });
        Button.margin({ top: 10 });
        Button.pop();
        TextInput.create({ text: this.topLine, placeholder: '输入TOP行数', controller: this.controller });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.type(InputType.Number);
        TextInput.caretColor(Color.Blue);
        TextInput.width(600);
        TextInput.height(40);
        TextInput.margin(20);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.topLine = value;
        });
        Button.createWithLabel('TOP命令');
        Button.margin(20);
        Button.height(50);
        Button.enabled(this.msgList.length > 0);
        Button.visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendTOP();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('UIDL命令');
        Button.margin(20);
        Button.height(50);
        Button.enabled(this.msgList.length > 0);
        Button.visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendUIDL();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('DELE命令');
        Button.margin(20);
        Button.height(50);
        Button.enabled(this.msgList.length > 0);
        Button.visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendDELE();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('RSET命令');
        Button.margin(20);
        Button.height(50);
        Button.enabled(this.msgList.length > 0);
        Button.visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendRSET();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Button.createWithLabel('RETR命令');
        Button.margin(20);
        Button.height(50);
        Button.enabled(this.msgList.length > 0);
        Button.visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            this.sendRETR();
        });
        Button.margin({ top: 10 });
        Button.pop();
        Flex.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.multiSelectable(true);
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.layoutWeight(2);
        List.height('100%');
        List.listDirection(Axis.Vertical);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.listData), (item: string, index: number) => {
            ListItem.create();
            ListItem.borderWidth(2);
            ListItem.borderColor(Color.Gray);
            ListItem.onClick(() => {
                if (this.msgList.length === 0) {
                    this.showToast('仅LIST命令获取的数据可选择', 'list-item-click');
                    return;
                }
                if (index < this.msgList.length) {
                    if (this.selectMsgNum === this.msgList[index].getIndex()) {
                        this.selectMsgNum = -1;
                    }
                    else {
                        this.selectMsgNum = this.msgList[index].getIndex();
                    }
                }
            });
            Flex.create();
            Toggle.create({ type: ToggleType.Checkbox, isOn: true });
            Toggle.size({ width: 30, height: 30 });
            Toggle.selectedColor('#007DFF');
            Toggle.visibility(this.selectMsgNum > -1 && this.msgList.length > 0 && index < this.msgList.length && this.selectMsgNum === this.msgList[index].getIndex() ? Visibility.Visible : Visibility.None);
            Toggle.pop();
            Text.create(item);
            Text.fontSize(14);
            Text.padding(5);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: string, index: number) => item);
        ForEach.pop();
        List.pop();
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    async sendSTAT() {
        const ctx = this;
        ctx.isListShow = false;
        ctx.msgList = [];
        ctx.topLine = '';
        ctx.listData = [];
        ctx.selectMsgNum = -1;
        try {
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.STAT();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("STAT averageTime : " + averageTime1 + "us");
                this.showToast('获取到STAT命令的结果', 'sendSTAT');
                if (result && result.toString() && result.toString().length > 0) {
                    let arr = result.toString().split(' ');
                    if (arr && arr.length >= 1) {
                        let totalMailSize = Number.parseInt(arr[0]);
                        if (totalMailSize > 0) {
                            ctx.isListShow = true;
                            ctx.listData.push(`获取到STAT命令的结果：${'\r\n'}${result}`);
                            return;
                        }
                    }
                }
                ctx.listData.push(`获取到STAT命令的结果：${'\r\n'}获取到的结果为空`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                this.showToast('账号未登录，请需重新登录', 'sendSTAT');
            }
        }
        catch (err) {
            ctx.listData.push(`获取STAT命令结果失败：${'\r\n'}${err.message}`);
            this.showToast(`获取STAT命令结果失败：${err.message}`, 'sendSTAT');
        }
    }
    async sendLIST() {
        const ctx = this;
        ctx.msgList = [];
        ctx.topLine = '';
        ctx.listData = [];
        ctx.selectMsgNum = -1;
        try {
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.LIST();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("LIST averageTime : " + averageTime1 + "us");
                this.showToast(`获取到LIST命令的结果：${result}`, 'sendLIST');
                if (result && result.toString() && result.toString().length > 0) {
                    let arr = result.toString().split(',');
                    if (arr && arr.length >= 2) {
                        ctx.isListShow = true;
                        for (let i = 0; i < arr.length; i += 2) {
                            let index = Number.parseInt(arr[i]);
                            let size = Number.parseInt(arr[i + 1]);
                            ctx.listData.push(`列表条目，序号：${index}，大小：${size}`);
                            let bean = new MsgBean();
                            bean.setIndex(index);
                            bean.setSize(size);
                            ctx.msgList.push(bean);
                        }
                        return;
                    }
                }
                ctx.listData.push(`获取到LIST命令的结果解析失败，${result}`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                this.showToast('账号未登录，请需重新登录', 'sendLIST');
            }
        }
        catch (err) {
            ctx.listData.push(`获取LIST命令结果失败：${'\r\n'}${err.message}`);
            this.showToast(`获取LIST命令结果失败：${err.message}`, 'sendLIST');
        }
    }
    async sendNOOP() {
        const ctx = this;
        ctx.topLine = '';
        ctx.msgList = [];
        ctx.listData = [];
        ctx.selectMsgNum = -1;
        try {
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                await ctx.client.NOOP();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("NOOP averageTime : " + averageTime1 + "us");
                this.showToast('获取到NOOP命令的结果', 'sendNOOP');
                ctx.listData.push(`获取到NOOP命令的结果：成功`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                this.showToast('账号未登录，请需重新登录', 'sendNOOP');
            }
        }
        catch (err) {
            ctx.listData.push(`获取NOOP命令结果失败：${'\r\n'}${err.message}`);
            this.showToast(`获取NOOP命令结果失败：${err.message}`, 'sendNOOP');
        }
    }
    async sendTOP() {
        const ctx = this;
        ctx.listData = [];
        try {
            if (ctx.selectMsgNum === -1) {
                ctx.showToast(`请先选择一个列表项目`, 'sendTOP');
                return;
            }
            if (!ctx.topLine || ctx.topLine.length < 1 || Number.parseInt(ctx.topLine) < 1) {
                ctx.showToast(`请先输入Top行数`, 'sendTOP');
                return;
            }
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.TOP(ctx.selectMsgNum + '', Number.parseInt(ctx.topLine));
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("TOP averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到TOP命令的结果', 'sendTOP');
                ctx.listData.push(`获取到TOP命令的结果：${'\r\n'}${result}`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendTOP');
            }
        }
        catch (err) {
            ctx.listData.push(`获取TOP命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取TOP命令结果失败：${err.message}`, 'sendTOP');
        }
        ctx.selectMsgNum = -1;
    }
    async sendUIDL() {
        const ctx = this;
        ctx.topLine = '';
        ctx.listData = [];
        try {
            if (ctx.selectMsgNum === -1) {
                ctx.showToast(`请先选择一个列表项目`, 'sendUIDL');
                return;
            }
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.UIDL(ctx.selectMsgNum + '');
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("UIDL averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到UIDL命令的结果', 'sendUIDL');
                ctx.listData.push(`获取到UIDL命令的结果：${'\r\n'}${result}`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendUIDL');
            }
        }
        catch (err) {
            ctx.listData.push(`获取UIDL命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取UIDL命令结果失败：${err.message}`, 'sendUIDL');
        }
        ctx.selectMsgNum = -1;
    }
    async sendLAST() {
        const ctx = this;
        ctx.topLine = '';
        ctx.msgList = [];
        ctx.listData = [];
        ctx.selectMsgNum = -1;
        try {
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.LAST();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("LAST averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到LAST命令的结果', 'sendLAST');
                ctx.listData.push(`获取到LAST命令的结果：${'\r\n'}${result}`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendLAST');
            }
        }
        catch (err) {
            ctx.listData.push(`获取LAST命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取LAST命令结果失败：${err.message}`, 'sendLAST');
        }
    }
    async sendDELE() {
        const ctx = this;
        ctx.topLine = '';
        ctx.listData = [];
        try {
            if (ctx.selectMsgNum === -1) {
                ctx.showToast(`请先选择一个列表项目`, 'sendDELE');
                return;
            }
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.DELE(ctx.selectMsgNum + '');
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("DELE averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到DELE命令的结果', 'sendDELE');
                ctx.listData.push(`获取到DELE命令的结果：${'\r\n'}${result}`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendDELE');
            }
        }
        catch (err) {
            ctx.listData.push(`获取DELE命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取DELE命令结果失败：${err.message}`, 'sendDELE');
        }
        ctx.selectMsgNum = -1;
    }
    async sendRSET() {
        const ctx = this;
        ctx.topLine = '';
        ctx.listData = [];
        try {
            if (ctx.selectMsgNum === -1) {
                ctx.showToast(`请先选择一个列表项目`, 'sendRSET');
                return;
            }
            if (ctx.client) {
                //       let delResult = ctx.client.DELE(ctx.selectMsgNum + '')
                //       ctx.showToast('获取到RSETE命令的结果', 'sendRSET')
                //       ctx.listData.push(`发送DELE命令删除的结果：${'\r\n'}${delResult}`)
                let startTime1 = new Date().getTime();
                let result = await ctx.client.RSET(); // 用于撤销DELE命令 所以不需要等DELE命令返回
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("RSET averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到RSETE命令的结果', 'sendRSET');
                ctx.listData.push(`发送RSET命令取消删除操作的结果：${'\r\n'}${result}`);
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendRSET');
            }
        }
        catch (err) {
            ctx.listData.push(`获取RSET命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取RSET命令结果失败：${err.message}`, 'sendRSET');
        }
        ctx.selectMsgNum = -1;
    }
    async sendRETR() {
        const ctx = this;
        ctx.topLine = '';
        ctx.listData = [];
        try {
            if (ctx.selectMsgNum === -1) {
                ctx.showToast(`请先选择一个列表项目`, 'sendRETR');
                return;
            }
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                let result = await ctx.client.RETR(ctx.selectMsgNum + '');
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("RETR averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到RETR命令的结果', 'sendRETR');
                ctx.listData.push(`获取到RETR命令的结果，结果长度为：${'\r\n'}${result.toString().length}${'\r\n'}}`);
                if (result.toString().length > 1000) {
                    ctx.listData.push(`由于RETR命令的结果太长text无法完全显示，取最后1000字节显示：${'\r\n'}${result.toString()
                        .substring(result.toString().length - 1000, result.toString().length)}`);
                }
                else {
                    ctx.listData.push(`ETR命令的结果显示：${'\r\n'}${result.toString()}`);
                }
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendRETR');
            }
        }
        catch (err) {
            ctx.listData.push(`获取RETR命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取RETR命令结果失败：${err.message}`, 'sendRETR');
        }
        ctx.selectMsgNum = -1;
    }
    async sendQUIT() {
        const ctx = this;
        ctx.topLine = '';
        ctx.msgList = [];
        ctx.listData = [];
        ctx.selectMsgNum = -1;
        try {
            if (ctx.client) {
                let startTime1 = new Date().getTime();
                const quitInfo = await ctx.client.QUIT();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("QUIT averageTime : " + averageTime1 + "us");
                ctx.showToast('获取到QUIT命令的结果', 'sendQUIT');
                ctx.listData.push(`获取到QUIT命令的结果：${'\r\n'}${quitInfo}`);
                GlobalObj?.getInstance()?.getContext()?.terminateSelf();
            }
            else {
                ctx.listData.push(`账号未登录，请需重新登录`);
                ctx.showToast('账号未登录，请需重新登录', 'sendQUIT');
            }
        }
        catch (err) {
            ctx.listData.push(`获取RETR命令结果失败：${'\r\n'}${err.message}`);
            ctx.showToast(`获取RETR命令结果失败：${err.message}`, 'sendRETR');
        }
    }
}
loadDocument(new AutoLoginCommandPage("1", undefined, {}));
