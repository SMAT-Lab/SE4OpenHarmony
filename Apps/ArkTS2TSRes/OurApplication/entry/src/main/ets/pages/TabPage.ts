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
import { Picture } from './index';
import { DeliciousPage } from './DeliciousPage';
import { VideoPage } from './videoPage';
import { SurfingPage } from './SurfingPage';
class TabPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
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
        Text.margin({ top: 0, bottom: 0 });
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barHeight(80);
        Tabs.animationDuration(400);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        Tabs.width("100%");
        Tabs.height("100%");
        Tabs.backgroundColor('#F1F3F5');
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 0, '诱人美景', $r("app.media.anemo"));
            } });
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 1, '自己动手', $r("app.media.electro"));
            } });
        let earlierCreatedChild_2: DeliciousPage = (this && this.findChildById) ? this.findChildById("2") as DeliciousPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new DeliciousPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 2, '去冲浪叭', $r('app.media.dendro'));
            } });
        let earlierCreatedChild_3: SurfingPage = (this && this.findChildById) ? this.findChildById("3") as SurfingPage : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SurfingPage("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, 3, "望梅止渴", $r("app.media.hydro"));
            } });
        let earlierCreatedChild_4: VideoPage = (this && this.findChildById) ? this.findChildById("4") as VideoPage : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new VideoPage("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new TabPage("1", undefined, {}));
