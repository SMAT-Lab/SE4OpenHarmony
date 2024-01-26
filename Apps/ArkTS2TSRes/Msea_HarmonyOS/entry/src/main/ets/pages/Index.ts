interface Index_Params {
    tabsController?: TabsController;
    currentIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import PreferencesUtil from '../common/utils/PreferencesUtil';
import { HomePage } from './home/HomePage';
import { NoticePage } from './notice/NoticePage';
import { ProfilePage } from './profile/ProfilePage';
import { getResourceText } from '../common/utils/ResourceUtil';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.tabsController = new TabsController();
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private tabsController: TabsController;
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    async aboutToAppear() {
        // Get the lightweight storage db file from memory.
        await PreferencesUtil.getPreferencesFromStorage();
    }
    render() {
        Tabs.create({ barPosition: BarPosition.End, controller: this.tabsController });
        Tabs.height('100%');
        Tabs.onChange((index) => {
            this.currentIndex = index;
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, getResourceText($r('app.string.tab_home')), 0, $r("app.media.ic_tab_home_selected"), $r("app.media.ic_tab_home_normal"));
            } });
        let earlierCreatedChild_2: HomePage = (this && this.findChildById) ? this.findChildById("2") as HomePage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new HomePage("2", this, {}));
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
                this.TabBuilder.call(this, getResourceText($r('app.string.tab_notice')), 1, $r("app.media.ic_tab_profile_selected"), $r("app.media.ic_tab_profile_normal"));
            } });
        let earlierCreatedChild_3: NoticePage = (this && this.findChildById) ? this.findChildById("3") as NoticePage : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new NoticePage("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, getResourceText($r('app.string.tab_profile')), 2, $r("app.media.ic_tab_notice_selected"), $r("app.media.ic_tab_notice_normal"));
            } });
        let earlierCreatedChild_4: ProfilePage = (this && this.findChildById) ? this.findChildById("4") as ProfilePage : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ProfilePage("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        TabContent.pop();
        Tabs.pop();
    }
    TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        Column.create();
        Column.width('100%');
        Column.height(50);
        Column.justifyContent(FlexAlign.Center);
        Column.onClick(() => {
            this.currentIndex = targetIndex;
            this.tabsController.changeIndex(this.currentIndex);
        });
        Image.create(this.currentIndex === targetIndex ? selectedImg : normalImg);
        Image.size({ width: 24, height: 24 });
        Text.create(title);
        Text.fontColor(this.currentIndex === targetIndex ? $r('app.color.app_theme_primary') : $r('app.color.app_tab_text'));
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
