interface TipsPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TipsPage_" + ++__generate__Id;
}
class TipsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('pop3命令说明及注意事项', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TipsPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
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
    aboutToAppear() {
        this.message = this.message += '\r\n' + '\r\n' + "命令说明：";
        this.message = this.message += '\r\n' + '\r\n' + "USER        username        认证用户名";
        this.message = this.message += '\r\n' + '\r\n' + "PASS         password        认证密码认证，认证通过则状态转换";
        this.message = this.message += '\r\n' + '\r\n' + "APOP        name,digest    认可一种安全传输口令的办法，执行成功导致状态转换，请参见 RFC 1321 ";
        this.message = this.message += '\r\n' + '\r\n' + "STAT         回送邮箱统计资料，如邮件数、 邮件总字节数 ";
        this.message = this.message += '\r\n' + '\r\n' + "UIDL n       返回用于该指定邮件的唯一标识， 如果没有指定，返回所有的 ";
        this.message = this.message += '\r\n' + '\r\n' + "LIST n       返回指定邮件的大小等，如果没有指定，返回所有的";
        this.message = this.message += '\r\n' + '\r\n' + "RETR n     返回邮件的全部文本，如果没有指定，返回所有的";
        this.message = this.message += '\r\n' + '\r\n' + "DELE n      删除，QUIT 命令执行时才真正删除";
        this.message = this.message += '\r\n' + '\r\n' + "RSET         撤消所有的 DELE 命令";
        this.message = this.message += '\r\n' + '\r\n' + "TOP n,m     返回 n 号邮件的前 m 行内容，m 必须是自然数";
        this.message = this.message += '\r\n' + '\r\n' + "NOOP        返回一个肯定的响应";
        this.message = this.message += '\r\n' + '\r\n' + "QUIT          结束会话";
        this.message = this.message += '\r\n' + '\r\n' + "注意事项：";
        this.message = this.message += '\r\n' + '\r\n' + "USER 用于发送邮箱账号";
        this.message = this.message += '\r\n' + '\r\n' + "PASS 用于发送邮箱密码，部分邮箱需要的是授权码，例如QQ 163";
        this.message = this.message += '\r\n' + '\r\n' + "STAT 用于返回邮箱里的所有邮件个数以及大小，目前QQ邮箱仅返回当天的邮件统计";
        this.message = this.message += '\r\n' + '\r\n' + "LIST 用于返回邮箱里的邮件序号以及大小，不传邮件的序号则是返回所有邮件的序号以及大小，传某个邮件的序号则是当前这邮件的信息";
        this.message = this.message += '\r\n' + '\r\n' + "DELE 用于删除邮件 但是需要在DELE成功之后再次发布QUIT才会生效，目前测试的QQ邮箱发送DELE即可生效";
        this.message = this.message += '\r\n' + '\r\n' + "RSET 用于撤销删除邮件操作 但是需要在DELE成功之后执行，然后发布QUIT才会生效，目前测试的QQ邮箱发送DELE直接删除了";
        this.message = this.message += '\r\n' + '\r\n' + "RETR 用于获取邮件详情，返回的数据是经过加密以及编码的 需要解码才可以显示正常的内容 内容数据过多的时候在文本上面是不显示的，需要阶段部分数据";
        this.message = this.message += '\r\n' + '\r\n' + "TOP 用于获取邮件信息的前几行";
        this.message = this.message += '\r\n' + '\r\n' + "NOOP 用于确认和服务器连接是否正常，类似与websocket的ping/pong";
        this.message = this.message += '\r\n' + '\r\n' + "QUIT 退出登录，并开始执行删除等操作";
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Scroll.create();
        Text.create(this.message);
        Text.fontSize(20);
        Text.textAlign(TextAlign.Start);
        Text.padding(20);
        Text.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new TipsPage("1", undefined, {}));
