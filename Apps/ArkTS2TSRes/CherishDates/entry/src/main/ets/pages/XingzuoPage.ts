interface XingzuoPage_Params {
    message?: string;
    time?: string;
    keys?: string;
    controller?: TextInputController;
    controller2?: TextInputController;
    name?: string;
    namecode?: string;
    QFriend?: string;
    color?: string;
    datetime?: string;
    health?: string;
    love?: string;
    work?: string;
    money?: string;
    number?: number;
    summary?: string;
    all?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "XingzuoPage_" + ++__generate__Id;
}
import http from '@ohos.net.http';
import router from '@ohos.router';
import { XingzuoModel } from '../Model/XingzuoModel';
class XingzuoPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__time = new ObservedPropertySimple('', this, "time");
        this.__keys = new ObservedPropertySimple('9f312a36fa2887f41bea1f3e6197619f' // 星座key
        , this, "keys");
        this.controller = new TextInputController();
        this.controller2 = new TextInputController();
        this.__name = new ObservedPropertySimple("天秤座", this, "name");
        this.__namecode = new ObservedPropertySimple("%E5%A4%A9%E7%A7%A4%E5%BA%A7" // "天秤座"编码
        , this, "namecode");
        this.__QFriend = new ObservedPropertySimple("", this, "QFriend");
        this.__color = new ObservedPropertySimple("彩色" // 幸运色
        , this, "color");
        this.__datetime = new ObservedPropertySimple("2023年6月25日" // 日期
        , this, "datetime");
        this.__health = new ObservedPropertySimple("" // 健康指数
        , this, "health");
        this.__love = new ObservedPropertySimple("" // 恋爱指数
        , this, "love");
        this.__work = new ObservedPropertySimple("" // 事业指数
        , this, "work");
        this.__money = new ObservedPropertySimple("" // 财富指数
        , this, "money");
        this.__number = new ObservedPropertySimple(0 // 幸运数字
        , this, "number");
        this.__summary = new ObservedPropertySimple("" // 概要
        , this, "summary");
        this.__all = new ObservedPropertySimple("" // 整体指数
        // @State test:string = "传参成功"
        , this, "all");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: XingzuoPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.keys !== undefined) {
            this.keys = params.keys;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.controller2 !== undefined) {
            this.controller2 = params.controller2;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.namecode !== undefined) {
            this.namecode = params.namecode;
        }
        if (params.QFriend !== undefined) {
            this.QFriend = params.QFriend;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.datetime !== undefined) {
            this.datetime = params.datetime;
        }
        if (params.health !== undefined) {
            this.health = params.health;
        }
        if (params.love !== undefined) {
            this.love = params.love;
        }
        if (params.work !== undefined) {
            this.work = params.work;
        }
        if (params.money !== undefined) {
            this.money = params.money;
        }
        if (params.number !== undefined) {
            this.number = params.number;
        }
        if (params.summary !== undefined) {
            this.summary = params.summary;
        }
        if (params.all !== undefined) {
            this.all = params.all;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__keys.aboutToBeDeleted();
        this.__name.aboutToBeDeleted();
        this.__namecode.aboutToBeDeleted();
        this.__QFriend.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        this.__datetime.aboutToBeDeleted();
        this.__health.aboutToBeDeleted();
        this.__love.aboutToBeDeleted();
        this.__work.aboutToBeDeleted();
        this.__money.aboutToBeDeleted();
        this.__number.aboutToBeDeleted();
        this.__summary.aboutToBeDeleted();
        this.__all.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // aboutToAppear() {
    //   this.getData()
    // }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __time: ObservedPropertySimple<string>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: string) {
        this.__time.set(newValue);
    }
    private __keys: ObservedPropertySimple<string>; // 星座key
    get keys() {
        return this.__keys.get();
    }
    set keys(newValue: string) {
        this.__keys.set(newValue);
    }
    private controller: TextInputController;
    private controller2: TextInputController;
    // 返回参数
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __namecode: ObservedPropertySimple<string>; // "天秤座"编码
    get namecode() {
        return this.__namecode.get();
    }
    set namecode(newValue: string) {
        this.__namecode.set(newValue);
    }
    private __QFriend: ObservedPropertySimple<string>;
    get QFriend() {
        return this.__QFriend.get();
    }
    set QFriend(newValue: string) {
        this.__QFriend.set(newValue);
    }
    private __color: ObservedPropertySimple<string>; // 幸运色
    get color() {
        return this.__color.get();
    }
    set color(newValue: string) {
        this.__color.set(newValue);
    }
    private __datetime: ObservedPropertySimple<string>; // 日期
    get datetime() {
        return this.__datetime.get();
    }
    set datetime(newValue: string) {
        this.__datetime.set(newValue);
    }
    private __health: ObservedPropertySimple<string>; // 健康指数
    get health() {
        return this.__health.get();
    }
    set health(newValue: string) {
        this.__health.set(newValue);
    }
    private __love: ObservedPropertySimple<string>; // 恋爱指数
    get love() {
        return this.__love.get();
    }
    set love(newValue: string) {
        this.__love.set(newValue);
    }
    private __work: ObservedPropertySimple<string>; // 事业指数
    get work() {
        return this.__work.get();
    }
    set work(newValue: string) {
        this.__work.set(newValue);
    }
    private __money: ObservedPropertySimple<string>; // 财富指数
    get money() {
        return this.__money.get();
    }
    set money(newValue: string) {
        this.__money.set(newValue);
    }
    private __number: ObservedPropertySimple<number>; // 幸运数字
    get number() {
        return this.__number.get();
    }
    set number(newValue: number) {
        this.__number.set(newValue);
    }
    private __summary: ObservedPropertySimple<string>; // 概要
    get summary() {
        return this.__summary.get();
    }
    set summary(newValue: string) {
        this.__summary.set(newValue);
    }
    private __all: ObservedPropertySimple<string>; // 整体指数
    get all() {
        return this.__all.get();
    }
    set all(newValue: string) {
        this.__all.set(newValue);
    }
    // @State test:string = "传参成功"
    getData() {
        let httpRequest = http.createHttp();
        httpRequest.request("http://web.juhe.cn/constellation/getAll?" + "consName=" + this.namecode + "&type=" + this.time + "&key=" + this.keys, {
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1,
        }, (err, data) => {
            if (!err) {
                this.message = JSON.stringify(data.result);
                let xingzuoModel: XingzuoModel = JSON.parse(data.result.toString());
                // this.datas = xingzuoModel.result.list
                this.name = xingzuoModel.name; // 星座名称
                this.QFriend = xingzuoModel.QFriend; // 配对星座
                this.color = xingzuoModel.color;
                this.datetime = xingzuoModel.datetime;
                this.health = xingzuoModel.health;
                this.love = xingzuoModel.love;
                this.work = xingzuoModel.work;
                this.money = xingzuoModel.money;
                this.number = xingzuoModel.number;
                this.summary = xingzuoModel.summary;
                this.all = xingzuoModel.all;
                console.info("打印" + JSON.stringify(data.result));
                httpRequest.destroy();
            }
            else {
                this.message = JSON.stringify(err);
                console.info('error:' + JSON.stringify((err)));
                httpRequest.destroy();
            }
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width("100%");
        Column.height("100%");
        // Part1:顶部白条
        Column.create();
        Row.create({ space: 10 });
        Row.width("100%");
        Row.padding(10);
        Row.backgroundColor(Color.White);
        Row.margin({
            bottom: 30
        });
        Image.create($r("app.media.back"));
        Image.width(30);
        Image.margin(7);
        Image.fillColor(Color.Brown);
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage"
            });
        });
        Text.create("星座运势");
        Text.fontSize(20);
        Text.margin({
            left: 140
        });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        // Part1:顶部白条
        Column.pop();
        // Part2:
        Scroll.create();
        // 输入星座进行查询
        Column.create();
        // 可以放个图片在这
        // 输入查询星座
        TextInput.create({
            placeholder: "请输入查询星座",
            // text: this.text,
            controller: this.controller
        });
        // 可以放个图片在这
        // 输入查询星座
        TextInput.onChange((value: string) => {
            this.name = value;
        });
        // 可以放个图片在这
        // 输入查询星座
        TextInput.type(InputType.Normal);
        // 可以放个图片在这
        // 输入查询星座
        TextInput.placeholderColor(Color.Pink);
        // 可以放个图片在这
        // 输入查询星座
        TextInput.placeholderFont({
            size: 20,
            //weight:200
        });
        // 可以放个图片在这
        // 输入查询星座
        TextInput.width("80%");
        // 可以放个图片在这
        // 输入查询星座
        TextInput.height(50);
        // 可以放个图片在这
        // 输入查询星座
        TextInput.fontSize(20);
        // 可以放个图片在这
        // 输入查询星座
        TextInput.fontColor(Color.Black);
        // 可以放个图片在这
        // 输入查询星座
        TextInput.margin(10);
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.create({
            placeholder: "请输入查询日期",
            // text: this.text,
            controller: this.controller2
        });
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.onChange((value: string) => {
            this.time = value;
        });
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.type(InputType.Normal);
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.placeholderColor(Color.Pink);
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.placeholderFont({
            size: 20,
            //weight:200
        });
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.width("80%");
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.height(50);
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.fontSize(20);
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.fontColor(Color.Black);
        // 输入日期(today,tomorrow,week,month,year)
        TextInput.margin(10);
        // 输入星座进行查询
        Column.pop();
        // Part2:
        Scroll.pop();
        Button.createWithLabel("确定");
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Normal);
        Button.fontColor(Color.White);
        Button.backgroundColor(Color.Pink);
        Button.onClick(() => {
            this.getData();
        });
        Button.width("30%");
        Button.borderRadius(20);
        Button.borderColor(Color.Black);
        Button.borderWidth(2);
        Button.padding(10);
        Button.margin(10);
        Button.pop();
        // Text("幸运色：")
        // Text(this.color).fontSize(40)
        Row.create();
        // Text("幸运色：")
        // Text(this.color).fontSize(40)
        Row.width("80%");
        Blank.create();
        Blank.pop();
        Column.create();
        Image.create($r("app.media.xingzuo"));
        Image.width(120);
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/Xingzuo2Page",
                params: {
                    time: this.time,
                    name: this.name,
                    QFriend: this.QFriend,
                    color: this.color,
                    datetime: this.datetime,
                    health: this.health,
                    love: this.love,
                    work: this.work,
                    money: this.money,
                    number: this.number,
                    summary: this.summary,
                    all: this.all // 整体指数
                    // test:this.test
                }
            });
        });
        Text.create("点我查看");
        Text.fontColor(Color.Pink);
        Text.pop();
        Column.pop();
        // Text("幸运色：")
        // Text(this.color).fontSize(40)
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new XingzuoPage("1", undefined, {}));
