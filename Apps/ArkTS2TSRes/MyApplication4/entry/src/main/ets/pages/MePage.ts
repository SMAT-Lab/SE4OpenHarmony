interface MePage_Params {
    message?: string;
    username?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MePage_" + ++__generate__Id;
}
import { Tabss } from './Tabss';
export class MePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__username = new ObservedPropertySimple('耶' //后续改成接受登录页的传参
        , this, "username");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __username: ObservedPropertySimple<string>; //后续改成接受登录页的传参
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({
            top: 50
        });
        Image.create($r("app.media.touxiang"));
        Image.width(70);
        Image.margin({
            top: 20,
            bottom: 60,
            left: 20,
            right: 20
        });
        Image.borderRadius(5);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.username);
        Text.fontSize(25);
        Text.fontColor(Color.Black);
        Text.fontWeight(FontWeight.Medium);
        Text.margin({
            top: 20
        });
        Text.pop();
        Text.create("微信号:");
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Regular);
        Text.fontColor(Color.Gray);
        Text.margin({
            top: 10
        });
        Text.pop();
        Row.create();
        Text.create("wxid_jtsghrzhhhhhhh666");
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Regular);
        Text.fontColor(Color.Gray);
        Text.pop();
        Blank.create(10);
        Blank.pop();
        Image.create($r("app.media.QRcode"));
        Image.width(15);
        Image.margin({
            right: 10
        });
        Image.fillColor(Color.Gray);
        Image.create($r("app.media.go"));
        Image.width(15);
        Image.margin({
            right: 10
        });
        Row.pop();
        Column.pop();
        Row.pop();
        // Text(this.username)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        Divider.create();
        // Text(this.username)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        Divider.strokeWidth(8);
        // Text(this.username)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        Divider.color("#31808080");
        let earlierCreatedChild_2: Tabss = (this && this.findChildById) ? this.findChildById("2") as Tabss : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Tabss("2", this, {
                text: "服务",
                img: $r("app.media.service2")
                // bgColor: Color.Orange
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "服务",
                img: $r("app.media.service2")
                // bgColor: Color.Orange
            });
            View.create(earlierCreatedChild_2);
        }
        Divider.create();
        Divider.strokeWidth(8);
        Divider.color("#31808080");
        let earlierCreatedChild_3: Tabss = (this && this.findChildById) ? this.findChildById("3") as Tabss : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Tabss("3", this, {
                text: "收藏",
                img: $r("app.media.cheese")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "收藏",
                img: $r("app.media.cheese")
            });
            View.create(earlierCreatedChild_3);
        }
        Divider.create();
        Divider.strokeWidth(0.4);
        Divider.color("#31808080");
        Divider.width("100%");
        Divider.margin({
            left: 60,
            right: 0
        });
        let earlierCreatedChild_4: Tabss = (this && this.findChildById) ? this.findChildById("4") as Tabss : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Tabss("4", this, {
                text: "朋友圈",
                img: $r("app.media.pyq")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: "朋友圈",
                img: $r("app.media.pyq")
            });
            View.create(earlierCreatedChild_4);
        }
        Divider.create();
        Divider.strokeWidth(0.4);
        Divider.color("#31808080");
        Divider.width("100%");
        Divider.margin({
            left: 60,
            right: 0
        });
        let earlierCreatedChild_5: Tabss = (this && this.findChildById) ? this.findChildById("5") as Tabss : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Tabss("5", this, {
                text: "视频号",
                img: $r("app.media.video")
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                text: "视频号",
                img: $r("app.media.video")
            });
            View.create(earlierCreatedChild_5);
        }
        Divider.create();
        Divider.strokeWidth(0.4);
        Divider.color("#31808080");
        Divider.width("100%");
        Divider.margin({
            left: 60,
            right: 0
        });
        let earlierCreatedChild_6: Tabss = (this && this.findChildById) ? this.findChildById("6") as Tabss : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new Tabss("6", this, {
                text: "卡包",
                img: $r("app.media.card2")
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                text: "卡包",
                img: $r("app.media.card2")
            });
            View.create(earlierCreatedChild_6);
        }
        Divider.create();
        Divider.strokeWidth(0.4);
        Divider.color("#31808080");
        Divider.width("100%");
        Divider.margin({
            left: 60,
            right: 0
        });
        let earlierCreatedChild_7: Tabss = (this && this.findChildById) ? this.findChildById("7") as Tabss : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new Tabss("7", this, {
                text: "表情",
                img: $r("app.media.girl")
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                text: "表情",
                img: $r("app.media.girl")
            });
            View.create(earlierCreatedChild_7);
        }
        Divider.create();
        Divider.strokeWidth(8);
        Divider.color("#31808080");
        let earlierCreatedChild_8: Tabss = (this && this.findChildById) ? this.findChildById("8") as Tabss : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new Tabss("8", this, {
                text: "设置",
                img: $r("app.media.setting2")
            }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                text: "设置",
                img: $r("app.media.setting2")
            });
            View.create(earlierCreatedChild_8);
        }
        Divider.create();
        Divider.strokeWidth(150);
        Divider.color("#31808080");
        Column.pop();
        Row.pop();
    }
}
loadDocument(new MePage("1", undefined, {}));
