interface Xingzuo2Page_Params {
    message?: string;
    time?: string;
    name?: string;
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
    return "Xingzuo2Page_" + ++__generate__Id;
}
import router from '@ohos.router';
import { xingzuo } from './xingzuo';
class Xingzuo2Page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World'
        // @State datas: Array<any> = []
        , this, "message");
        this.__time = new ObservedPropertySimple(router.getParams()["time"]
        // 返回参数
        , this, "time");
        this.__name = new ObservedPropertySimple(router.getParams()["name"], this, "name");
        this.__QFriend = new ObservedPropertySimple(router.getParams()["QFriend"], this, "QFriend");
        this.__color = new ObservedPropertySimple(router.getParams()["color"] // 幸运色
        , this, "color");
        this.__datetime = new ObservedPropertySimple(router.getParams()["datetime"] // 日期
        , this, "datetime");
        this.__health = new ObservedPropertySimple(router.getParams()["health"] // 健康指数
        , this, "health");
        this.__love = new ObservedPropertySimple(router.getParams()["love"] // 恋爱指数
        , this, "love");
        this.__work = new ObservedPropertySimple(router.getParams()["work"] // 事业指数
        , this, "work");
        this.__money = new ObservedPropertySimple(router.getParams()["money"] // 财富指数
        , this, "money");
        this.__number = new ObservedPropertySimple(router.getParams()["number"] // 幸运数字
        , this, "number");
        this.__summary = new ObservedPropertySimple(router.getParams()["summary"] // 概要
        , this, "summary");
        this.__all = new ObservedPropertySimple(router.getParams()["all"] // 整体指数
        // @State test: string = router.getParams()["test"] // 整体指数
        , this, "all");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Xingzuo2Page_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.name !== undefined) {
            this.name = params.name;
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
        this.__name.aboutToBeDeleted();
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
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    // @State datas: Array<any> = []
    private __time: ObservedPropertySimple<string>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: string) {
        this.__time.set(newValue);
    }
    // 返回参数
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
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
    // @State test: string = router.getParams()["test"] // 整体指数
    render() {
        Scroll.create();
        Row.create();
        Row.height(1100);
        Column.create();
        Column.width('100%');
        // Text(this.test)
        Text.create(this.name);
        // Text(this.test)
        Text.fontSize(35);
        // Text(this.test)
        Text.fontWeight(FontWeight.Bold);
        // Text(this.test)
        Text.margin({ top: 20, bottom: 10 });
        // Text(this.test)
        Text.pop();
        Text.create(this.datetime);
        Text.fontSize(17);
        Text.fontWeight(FontWeight.Normal);
        Text.margin(10);
        Text.pop();
        Text.create(this.summary);
        Text.fontSize(19);
        Text.fontColor(Color.White);
        Text.fontWeight(FontWeight.Normal);
        Text.backgroundImage($r("app.media.background1"));
        Text.borderRadius(15);
        Text.width("80%");
        Text.height("28%");
        Text.padding(17);
        Text.pop();
        let earlierCreatedChild_2: xingzuo = (this && this.findChildById) ? this.findChildById("2") as xingzuo : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new xingzuo("2", this, {
                topic: "配对星座：",
                text: this.QFriend.toString(),
                img: $r("app.media.xingzuo_peidui")
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                topic: "配对星座：",
                text: this.QFriend.toString(),
                img: $r("app.media.xingzuo_peidui")
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: xingzuo = (this && this.findChildById) ? this.findChildById("3") as xingzuo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new xingzuo("3", this, {
                topic: "幸运色：",
                text: this.color.toString(),
                img: $r("app.media.xingzuo_color")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                topic: "幸运色：",
                text: this.color.toString(),
                img: $r("app.media.xingzuo_color")
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: xingzuo = (this && this.findChildById) ? this.findChildById("4") as xingzuo : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new xingzuo("4", this, {
                topic: "健康指数：",
                text: this.health.toString(),
                img: $r("app.media.xingzuo_health")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                topic: "健康指数：",
                text: this.health.toString(),
                img: $r("app.media.xingzuo_health")
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: xingzuo = (this && this.findChildById) ? this.findChildById("5") as xingzuo : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new xingzuo("5", this, {
                topic: "恋爱指数：",
                text: this.love.toString(),
                img: $r("app.media.xingzuo_love")
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                topic: "恋爱指数：",
                text: this.love.toString(),
                img: $r("app.media.xingzuo_love")
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: xingzuo = (this && this.findChildById) ? this.findChildById("6") as xingzuo : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new xingzuo("6", this, {
                topic: "事业指数：",
                text: this.work.toString(),
                img: $r("app.media.xingzuo_work")
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                topic: "事业指数：",
                text: this.work.toString(),
                img: $r("app.media.xingzuo_work")
            });
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: xingzuo = (this && this.findChildById) ? this.findChildById("7") as xingzuo : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new xingzuo("7", this, {
                topic: "财富指数：",
                text: this.money.toString(),
                img: $r("app.media.xingzuo_money")
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                topic: "财富指数：",
                text: this.money.toString(),
                img: $r("app.media.xingzuo_money")
            });
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: xingzuo = (this && this.findChildById) ? this.findChildById("8") as xingzuo : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new xingzuo("8", this, {
                topic: "幸运数字：",
                text: this.number.toString(),
                img: $r("app.media.xingzuo_number")
            }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                topic: "幸运数字：",
                text: this.number.toString(),
                img: $r("app.media.xingzuo_number")
            });
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: xingzuo = (this && this.findChildById) ? this.findChildById("9") as xingzuo : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new xingzuo("9", this, {
                topic: "整体指数：",
                text: this.all.toString(),
                img: $r("app.media.xingzuo_all")
            }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                topic: "整体指数：",
                text: this.all.toString(),
                img: $r("app.media.xingzuo_all")
            });
            View.create(earlierCreatedChild_9);
        }
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
}
loadDocument(new Xingzuo2Page("1", undefined, {}));
