interface HomeTopPage_Params {
    currentPage?: number;
}
interface Index_Params {
    currentPage?: number;
    currentIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { ChatPage } from './ChatPage';
import { ContactPage } from './ContactPage';
import { DiscoveryPage } from './DiscoveryPage';
import { MyPage } from './MyPage';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentPage = new ObservedPropertySimple(0, this, "currentPage");
        this.addProvidedVar("currentPage", this.__currentPage, false);
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentPage: ObservedPropertySimple<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    render() {
        Column.create();
        Tabs.create({
            index: this.currentIndex,
            barPosition: BarPosition.End
        });
        Tabs.barMode(BarMode.Fixed);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, '微信', 0, $r('app.media.wechat2'), $r('app.media.wechat1'));
            } });
        let earlierCreatedChild_2: ChatPage = (this && this.findChildById) ? this.findChildById("2") as ChatPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ChatPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, '联系人', 1, $r('app.media.contacts2'), $r('app.media.contacts1'));
            } });
        let earlierCreatedChild_3: ContactPage = (this && this.findChildById) ? this.findChildById("3") as ContactPage : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new ContactPage("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, '发现', 2, $r('app.media.find2'), $r('app.media.find1'));
            } });
        let earlierCreatedChild_4: DiscoveryPage = (this && this.findChildById) ? this.findChildById("4") as DiscoveryPage : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new DiscoveryPage("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, '我', 3, $r('app.media.me2'), $r('app.media.me1'));
            } });
        let earlierCreatedChild_5: MyPage = (this && this.findChildById) ? this.findChildById("5") as MyPage : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyPage("5", this, {}));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(50);
        Column.justifyContent(FlexAlign.Center);
        Image.create(this.currentIndex === targetIndex ? selectedImg : normalImg);
        Image.size({ width: 25, height: 25 });
        Text.create(title);
        Text.fontColor(this.currentIndex === targetIndex ? '#1698CE' : '#6B6B6B');
        Text.pop();
        Column.pop();
    }
}
class HomeTopPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentPage = this.initializeConsume("currentPage", "currentPage");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeTopPage_Params) {
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentPage: SynchedPropertySimpleTwoWay<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    render() {
        Swiper.create();
        Swiper.onChange((index: number) => {
            this.currentPage = index;
        });
        Swiper.index(this.currentPage);
        Swiper.loop(false);
        Swiper.indicator(false);
        Swiper.width('100%');
        Swiper.height('100%');
        let earlierCreatedChild_6: ChatPage = (this && this.findChildById) ? this.findChildById("6") as ChatPage : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new ChatPage("6", this, {}));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({});
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: ContactPage = (this && this.findChildById) ? this.findChildById("7") as ContactPage : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new ContactPage("7", this, {}));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({});
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: DiscoveryPage = (this && this.findChildById) ? this.findChildById("8") as DiscoveryPage : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new DiscoveryPage("8", this, {}));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({});
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: MyPage = (this && this.findChildById) ? this.findChildById("9") as MyPage : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MyPage("9", this, {}));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({});
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        Swiper.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
