interface MePage_Params {
    scroller?: Scroller;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MePage_" + ++__generate__Id;
}
// import { Tabss } from './Tabs'
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { Tabss3 } from './Tabss3';
export class MePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MePage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(10);
        Scroll.edgeEffect(EdgeEffect.None);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Column.create();
        Column.width('100%');
        Column.height(800);
        Column.backgroundColor(Color.Pink);
        Column.backgroundBlurStyle(BlurStyle.Regular);
        Image.create($r("app.media.logo"));
        Image.width(100);
        Image.height(100);
        Image.margin({ top: 10 });
        Text.create("(点击登录)");
        Text.fontSize(20);
        Text.fontColor(Color.Gray);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 20,
        });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/LoginPage",
            });
        });
        Text.pop();
        Column.create();
        Column.backgroundColor(Color.White);
        Column.borderRadius(15);
        Column.borderColor(Color.Gray);
        Column.borderWidth(1);
        Column.margin(5);
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/GiftBoxPage",
            });
        });
        let earlierCreatedChild_2: Tabss3 = (this && this.findChildById) ? this.findChildById("2") as Tabss3 : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Tabss3("2", this, {
                text: "提醒日礼盒",
                img: $r("app.media.giftbox")
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "提醒日礼盒",
                img: $r("app.media.giftbox")
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("80%");
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/PurchaseHistoryPage",
            });
        });
        let earlierCreatedChild_3: Tabss3 = (this && this.findChildById) ? this.findChildById("3") as Tabss3 : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Tabss3("3", this, {
                text: "购买记录",
                img: $r("app.media.dingdan")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "购买记录",
                img: $r("app.media.dingdan")
            });
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Column.pop();
        Row.create();
        Row.borderWidth(1);
        Row.borderRadius(15);
        Row.backgroundColor(Color.White);
        Row.borderColor(Color.Gray);
        Row.margin(5);
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/SettingPage",
            });
        });
        let earlierCreatedChild_4: Tabss3 = (this && this.findChildById) ? this.findChildById("4") as Tabss3 : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Tabss3("4", this, {
                text: "设置",
                img: $r("app.media.setting")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: "设置",
                img: $r("app.media.setting")
            });
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        Row.pop();
        Column.create();
        Column.borderWidth(1);
        Column.borderRadius(15);
        Column.backgroundColor(Color.White);
        Column.borderColor(Color.Gray);
        Column.margin(5);
        __Common__.create();
        __Common__.margin(20);
        __Common__.onClick(() => {
            promptAction.showActionMenu({
                title: "分享",
                buttons: [
                    {
                        text: "微信",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "QQ",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "微博",
                        color: $r("app.color.start_window_background")
                    }
                ]
            });
        });
        let earlierCreatedChild_5: Tabss3 = (this && this.findChildById) ? this.findChildById("5") as Tabss3 : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Tabss3("5", this, {
                text: "分享给好友",
                img: $r("app.media.share")
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                text: "分享给好友",
                img: $r("app.media.share")
            });
            View.create(earlierCreatedChild_5);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("80%");
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            promptAction.showActionMenu({
                title: "联系我们",
                buttons: [
                    {
                        text: "微博 cherishdates",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "小红书 cherishdates",
                        color: $r("app.color.start_window_background")
                    }
                ]
            });
        });
        let earlierCreatedChild_6: Tabss3 = (this && this.findChildById) ? this.findChildById("6") as Tabss3 : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new Tabss3("6", this, {
                text: "联系我们",
                img: $r("app.media.comment")
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                text: "联系我们",
                img: $r("app.media.comment")
            });
            View.create(earlierCreatedChild_6);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("80%");
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            promptAction.showActionMenu({
                title: "给个好评",
                buttons: [
                    {
                        text: "去应用市场给CherishDates一个五星好评",
                        color: $r("app.color.start_window_background")
                    }
                ]
            });
        });
        let earlierCreatedChild_7: Tabss3 = (this && this.findChildById) ? this.findChildById("7") as Tabss3 : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new Tabss3("7", this, {
                text: "给个评价",
                img: $r("app.media.heart")
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                text: "给个评价",
                img: $r("app.media.heart")
            });
            View.create(earlierCreatedChild_7);
        }
        __Common__.pop();
        Column.pop();
        Column.create();
        Column.borderWidth(1);
        Column.borderRadius(15);
        Column.backgroundColor(Color.White);
        Column.borderColor(Color.Gray);
        Column.margin(5);
        Row.create();
        Row.margin(5);
        Row.width('80%');
        Image.create($r("app.media.lubiao"));
        Image.width(20);
        Image.margin({ left: 15 });
        Text.create("版本");
        Text.fontSize(16);
        Text.margin(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create("1.0.2");
        Text.margin({ right: 15 });
        Text.fontColor(Color.Gray);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new MePage("1", undefined, {}));
