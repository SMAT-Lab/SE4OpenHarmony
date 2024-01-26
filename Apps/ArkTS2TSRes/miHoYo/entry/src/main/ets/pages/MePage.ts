interface MePage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MePage_" + ++__generate__Id;
}
import { homeItem } from './homeItem';
export class MePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MePage_Params) {
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
        Column.height('100%');
        Column.backgroundColor('#FFBF00');
        let earlierCreatedChild_2: homeItem = (this && this.findChildById) ? this.findChildById("2") as homeItem : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new homeItem("2", this, {
                text: "服务",
                img: $r("app.media.user"), bgColor: Color.Orange
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "服务",
                img: $r("app.media.user"), bgColor: Color.Orange
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: homeItem = (this && this.findChildById) ? this.findChildById("3") as homeItem : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new homeItem("3", this, {
                text: "收藏", bgColor: Color.Pink
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "收藏", bgColor: Color.Pink
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: homeItem = (this && this.findChildById) ? this.findChildById("4") as homeItem : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new homeItem("4", this, {
                text: "朋友圈"
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: "朋友圈"
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: homeItem = (this && this.findChildById) ? this.findChildById("5") as homeItem : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new homeItem("5", this, {
                text: "视频号"
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                text: "视频号"
            });
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: homeItem = (this && this.findChildById) ? this.findChildById("6") as homeItem : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new homeItem("6", this, {
                text: "设置"
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                text: "设置"
            });
            View.create(earlierCreatedChild_6);
        }
        Column.pop();
    }
}
loadDocument(new MePage("1", undefined, {}));
