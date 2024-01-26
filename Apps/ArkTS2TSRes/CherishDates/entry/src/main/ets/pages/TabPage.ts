interface TabPage_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    controller?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { compAnniversary } from './compAnniversary';
import { compBirthday } from './compBirthday';
import { compCountdown } from './compCountdown';
import { MainnPage } from './MainnPage';
import { MePage } from './MePage';
import { ToolPage } from './ToolPage';
class TabPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0
        // @State newName:string = router.getParams()["name"]
        // @State newDate:string = router.getParams()["date"]
        , this, "currentIndex");
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TabPage_Params) {
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fontColor: ObservedPropertySimple<string>;
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue: string) {
        this.__fontColor.set(newValue);
    }
    private __selectedFontColor: ObservedPropertySimple<string>;
    get selectedFontColor() {
        return this.__selectedFontColor.get();
    }
    set selectedFontColor(newValue: string) {
        this.__selectedFontColor.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    // @State newName:string = router.getParams()["name"]
    // @State newDate:string = router.getParams()["date"]
    private controller: TabsController;
    // selectedDate: Date = router.getParams()["text1"]
    TabBuilder(index: number, name: string, img: Resource, parent = null) {
        Column.create();
        Column.width('100%');
        Image.create(img);
        Image.width(40);
        Image.fillColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.create(name);
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.fontSize(16);
        Text.fontWeight(this.currentIndex === index ? 500 : 400);
        Text.lineHeight(22);
        Text.margin({ top: 0, bottom: 7 });
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barWidth(360);
        Tabs.barHeight(80);
        Tabs.animationDuration(400);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.width("100%");
        Tabs.height("100%");
        Tabs.margin({ top: 0 });
        Tabs.backgroundColor('#F1F3F5');
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0, '提醒日', $r("app.media.discover2"));
            } });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#34cb0000');
        __Common__.create();
        __Common__.margin({
            bottom: 10
        });
        let earlierCreatedChild_2: MainnPage = (this && this.findChildById) ? this.findChildById("2") as MainnPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // Text("CherishDates").fontSize(20)
            View.create(new MainnPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        let earlierCreatedChild_3: compBirthday = (this && this.findChildById) ? this.findChildById("3") as compBirthday : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 在下面显示组件（纪念日/生日/倒计时）
            // 添加三个组件示例（生日）
            View.create(new compBirthday("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: compCountdown = (this && this.findChildById) ? this.findChildById("4") as compCountdown : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new compCountdown("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: compAnniversary = (this && this.findChildById) ? this.findChildById("5") as compAnniversary : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new compAnniversary("5", this, {}));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: compBirthday = (this && this.findChildById) ? this.findChildById("6") as compBirthday : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new compBirthday("6", this, {
                text: "ff's birthday",
                // text:this.newName.toString(),
                date: "2023-6-25"
                // date:this.newDate.toString()
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                text: "ff's birthday",
                // text:this.newName.toString(),
                date: "2023-6-25"
                // date:this.newDate.toString()
            });
            View.create(earlierCreatedChild_6);
        }
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1, '工具', $r("app.media.message"));
            } });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#3200b7ff');
        let earlierCreatedChild_7: ToolPage = (this && this.findChildById) ? this.findChildById("7") as ToolPage : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new ToolPage("7", this, {}));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({});
            View.create(earlierCreatedChild_7);
        }
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 2, '我', $r("app.media.cute"));
            } });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#34ffdf7f');
        let earlierCreatedChild_8: MePage = (this && this.findChildById) ? this.findChildById("8") as MePage : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MePage("8", this, {}));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({});
            View.create(earlierCreatedChild_8);
        }
        Column.pop();
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new TabPage("1", undefined, {}));
