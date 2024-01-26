interface ComSettingPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ComSettingPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { Tabss2 } from './Tabss2';
class ComSettingPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ComSettingPage_Params) {
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
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.height('100%');
        Row.backgroundColor("#ffd8d6fd");
        Column.create();
        Column.width(360);
        // Part1：顶部白条
        Row.create({ space: 10 });
        // Part1：顶部白条
        Row.width("100%");
        // Part1：顶部白条
        Row.width("100%");
        // Part1：顶部白条
        Row.padding(10);
        // Part1：顶部白条
        Row.backgroundColor(Color.White);
        // Part1：顶部白条
        Row.margin({
            bottom: 10
        });
        // 常用设置(转到ComSettingPage)
        Image.create($r("app.media.back"));
        // 常用设置(转到ComSettingPage)
        Image.width(30);
        // 常用设置(转到ComSettingPage)
        Image.margin(7);
        // 常用设置(转到ComSettingPage)
        Image.fillColor(Color.Brown);
        // 常用设置(转到ComSettingPage)
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage"
            });
        });
        Text.create("常用设置");
        Text.fontSize(20);
        Text.margin({
            left: 80
        });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        // Part1：顶部白条
        Row.pop();
        // Part2:功能组件
        Column.create();
        // Part2:功能组件
        Column.alignItems(HorizontalAlign.Center);
        // Part2:功能组件
        Column.width("80%");
        // Part2:功能组件
        Column.backgroundColor(Color.White);
        // Part2:功能组件
        Column.borderRadius(15);
        // Part2:功能组件
        Column.borderColor(Color.Gray);
        // Part2:功能组件
        Column.borderWidth(1);
        // Part2:功能组件
        Column.margin(10);
        Row.create({ space: 10 });
        Image.create($r("app.media.xingge"));
        Image.width(37);
        Image.margin(7);
        Text.create("数据同步");
        Text.pop();
        Blank.create(116);
        Blank.pop();
        Image.create($r("app.media.go"));
        Image.width(15);
        Image.fillColor(Color.Gray);
        Image.margin({
            right: 10
        });
        Row.pop();
        Divider.create();
        Divider.strokeWidth(0.8);
        Divider.color("#31808080");
        Divider.width("80%");
        Row.create({ space: 10 });
        Image.create($r("app.media.xingge"));
        Image.width(37);
        Image.margin(7);
        Text.create("主题颜色");
        Text.pop();
        Blank.create(116);
        Blank.pop();
        Image.create($r("app.media.go"));
        Image.width(15);
        Image.fillColor(Color.Gray);
        Image.margin({
            right: 10
        });
        Row.pop();
        Divider.create();
        Divider.strokeWidth(0.8);
        Divider.color("#31808080");
        Divider.width("80%");
        Row.create({ space: 10 });
        Image.create($r("app.media.xingge"));
        Image.width(37);
        Image.margin(7);
        Text.create("密码锁");
        Text.pop();
        Blank.create(132);
        Blank.pop();
        Image.create($r("app.media.go"));
        Image.width(15);
        Image.fillColor(Color.Gray);
        Image.margin({
            right: 10
        });
        Row.pop();
        // Part2:功能组件
        Column.pop();
        let earlierCreatedChild_2: Tabss2 = (this && this.findChildById) ? this.findChildById("2") as Tabss2 : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Tabss2("2", this, {
                text: "标签管理",
                img: $r("app.media.xingge")
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "标签管理",
                img: $r("app.media.xingge")
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Tabss2 = (this && this.findChildById) ? this.findChildById("3") as Tabss2 : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Tabss2("3", this, {
                text: "颜色排序",
                img: $r("app.media.xingge")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "颜色排序",
                img: $r("app.media.xingge")
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: Tabss2 = (this && this.findChildById) ? this.findChildById("4") as Tabss2 : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Tabss2("4", this, {
                text: "更多设置",
                img: $r("app.media.xingge")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: "更多设置",
                img: $r("app.media.xingge")
            });
            View.create(earlierCreatedChild_4);
        }
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ComSettingPage("1", undefined, {}));
