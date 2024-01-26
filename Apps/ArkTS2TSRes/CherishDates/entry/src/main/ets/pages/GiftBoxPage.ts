interface GiftBoxPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GiftBoxPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class GiftBoxPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GiftBoxPage_Params) {
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
    render() {
        Column.create();
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Column.height('100%');
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.width("80%");
        Row.alignItems(VerticalAlign.Top);
        Image.create($r("app.media.back"));
        Image.margin({ top: 20 });
        Image.width(20);
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/MePage",
            });
        });
        Row.pop();
        Text.create("CherishDates");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bolder);
        Text.margin({
            top: 10
        });
        Text.pop();
        Column.create();
        Column.margin({
            left: 25, right: 25, bottom: 15, top: 15
        });
        Text.create("感谢您对[ChrishDates]App的支持！为了能够支付服务器和流量费用，让TA持续的迭代更新下去，我们提供了一些非强制的消费功能。在此先行感谢大家的支持！");
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(FontWeight.Regular);
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Text.create("如果您喜欢这个产品，可以考虑购买【提醒日礼盒】。此购买为一次性购买，购买后同一账号登录永久有效。礼盒包含以下内容和功能：");
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.fontWeight(FontWeight.Regular);
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Column.pop();
        Column.create();
        Column.backgroundColor(Color.Pink);
        Column.margin({ bottom: 15 });
        Column.borderRadius(10);
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.abc"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("所有的提醒日色彩和图表");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.zhuti"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("所有的主题颜色");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.yun"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("数据备份与同步");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.passwordsuo"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("密码锁支持");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.setting"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("更多的高级选项设置");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.rocket"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("桌面小组件个性化设置");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width("80%");
        Row.margin(10);
        Image.create($r("app.media.future"));
        Image.width(25);
        Image.margin({ right: 20 });
        Text.create("未来新功能");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        Column.pop();
        Text.create("购买须知");
        Text.fontSize(13);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width("90%");
        Column.margin({ bottom: 10 });
        Text.create("1、虚拟商品，购买后不支持退款");
        Text.fontSize(12);
        Text.margin(6);
        Text.pop();
        Text.create("2、提醒日礼盒属于一次性购买，并非订阅收费");
        Text.fontSize(12);
        Text.margin(6);
        Text.pop();
        Text.create("3、购买状态与您的登录 ID 绑定，若更换设备，只需登录同一个 ID ，并点击右上方的恢复购买即可恢复购买状态");
        Text.fontSize(12);
        Text.margin(6);
        Text.pop();
        Text.create("4、如果购买遇到问题，请点击此处与我们联系，我们会第一时间给予处理");
        Text.fontSize(12);
        Text.margin(6);
        Text.pop();
        Column.pop();
        Row.create();
        Row.backgroundColor(Color.White);
        Row.width("100%");
        Text.create("  25.00元");
        Text.margin({ left: 20, right: 155 });
        Text.pop();
        Button.createWithLabel("立即购买");
        Button.alignSelf(ItemAlign.End);
        Button.backgroundColor(Color.Pink);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new GiftBoxPage("1", undefined, {}));
