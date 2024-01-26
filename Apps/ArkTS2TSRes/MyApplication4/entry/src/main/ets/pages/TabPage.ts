interface TabsExample_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    controller?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabPage_" + ++__generate__Id;
}
import { MainnPage } from './MainnPage';
import { MePage } from './MePage';
class TabsExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TabsExample_Params) {
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
    private controller: TabsController;
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
        Tabs.width(360);
        Tabs.height("100%");
        Tabs.margin({ top: 0 });
        Tabs.backgroundColor('#F1F3F5');
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0, '首页', $r("app.media.discover2"));
            } });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#34cb0000');
        Text.create("首页");
        Text.fontSize(60);
        Text.pop();
        let earlierCreatedChild_2: MainnPage = (this && this.findChildById) ? this.findChildById("2") as MainnPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MainnPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1, '消息', $r("app.media.message"));
            } });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#3200b7ff');
        Text.create("消息");
        Text.fontSize(60);
        Text.pop();
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 2, '个人中心', $r("app.media.cute"));
            } });
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#34ffdf7f');
        let earlierCreatedChild_3: MePage = (this && this.findChildById) ? this.findChildById("3") as MePage : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // Text("个人中心").fontSize(60)
            View.create(new MePage("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
function MainPage() {
    throw new Error('Function not implemented.');
}
loadDocument(new TabsExample("1", undefined, {}));
