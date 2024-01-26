interface MyTabAndTabContent_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    controller?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTabAndTabConect_" + ++__generate__Id;
}
export class MyTabAndTabContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('rgba(0, 0, 0, 0.4)', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('rgba(10, 30, 255, 1)', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTabAndTabContent_Params) {
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
    TabBuilder(index: number, parent = null) {
        Column.create();
        Column.width('100%');
        Text.create(`Tab${(index > 2 ? (index - 1) : index) + 1}`);
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.fontSize(10);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height(200);
        Column.margin({ top: 15 });
        Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
        Tabs.vertical(false);
        Tabs.barWidth(300);
        Tabs.barHeight(56);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.width('90%');
        Tabs.backgroundColor('rgba(241, 243, 245, 0.95)');
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0);
            } });
        Column.create();
        Column.width('100%');
        Text.create('Tab1');
        Text.fontSize(32);
        Text.pop();
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1);
            } });
        Column.create();
        Column.width('100%');
        Text.create('Tab2');
        Text.fontSize(32);
        Text.pop();
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 3);
            } });
        Column.create();
        Column.width('100%');
        Text.create('Tab3');
        Text.fontSize(32);
        Text.pop();
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 4);
            } });
        Column.create();
        Column.width('100%');
        Text.create('Tab4');
        Text.fontSize(32);
        Text.pop();
        Column.pop();
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
