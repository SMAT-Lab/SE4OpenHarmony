interface MainPage_Params {
    message?: string;
    username?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "mainPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { homeItem } from './homeItem';
class MainPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Main Page', this, "message");
        this.__username = new ObservedPropertySimple(router.getParams()?.["name"], this, "username");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainPage_Params) {
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
    private __username: ObservedPropertySimple<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    aboutToAppear() {
        this.message = "aboutToAppear";
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.pop();
        let earlierCreatedChild_2: homeItem = (this && this.findChildById) ? this.findChildById("2") as homeItem : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new homeItem("2", this, {
                text: "生成图片！",
                img: $r("app.media.geo"), bgColor: Color.Orange
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "生成图片！",
                img: $r("app.media.geo"), bgColor: Color.Orange
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: homeItem = (this && this.findChildById) ? this.findChildById("3") as homeItem : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new homeItem("3", this, {
                text: "功能待定……",
                img: $r("app.media.hydro"), bgColor: Color.Pink
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "功能待定……",
                img: $r("app.media.hydro"), bgColor: Color.Pink
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Row.pop();
    }
}
loadDocument(new MainPage("1", undefined, {}));