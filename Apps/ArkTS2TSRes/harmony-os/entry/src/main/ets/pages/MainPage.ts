interface MainPage_Params {
    message?: string;
    user?: string;
    currentIndex?: number;
    tabsController?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
import Home from '../view/Home';
import Setting from '../view/Setting';
class MainPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__user = new ObservedPropertySimple(JSON.stringify(router.getParams()?.['user']), this, "user");
        this.addProvidedVar("user", this.__user, false);
        this.__currentIndex = new ObservedPropertySimple(CommonConstants.HOME_TAB_INDEX, this, "currentIndex");
        this.tabsController = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__user.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __user: ObservedPropertySimple<string>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: string) {
        this.__user.set(newValue);
    }
    // 用于记录当前选中的标签页的下标（0：首页；1：我的）
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private tabsController: TabsController;
    //
    // aboutToAppear(){
    //   console.log(typeof  this.user);
    //   let str = JSON.stringify(this.user);
    //   console.log(str);
    // }
    TabBuilder(title: string, index: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Column.height($r('app.float.mainPage_barHeight'));
        Column.width(CommonConstants.FULL_PARENT);
        Column.onClick(() => {
            this.currentIndex = index; // 更新当前选中的标签页下标
            this.tabsController.changeIndex(this.currentIndex); // 通知 TabsController 切换标签页
        });
        Image.create(this.currentIndex === index ? selectedImg : normalImg);
        Image.width($r('app.float.mainPage_baseTab_size'));
        Image.height($r('app.float.mainPage_baseTab_size'));
        Text.create(title);
        Text.margin({ top: $r('app.float.mainPage_baseTab_top') });
        Text.fontSize($r('app.float.main_tab_fontSize'));
        Text.fontColor(this.currentIndex === index ? $r('app.color.mainPage_selected') : $r('app.color.mainPage_normal'));
        Text.pop();
        Column.pop();
    }
    render() {
        // 绘制导航栏
        Tabs.create({
            barPosition: BarPosition.End,
            controller: this.tabsController
        });
        // 绘制导航栏
        Tabs.width(CommonConstants.FULL_PARENT);
        // 绘制导航栏
        Tabs.backgroundColor(Color.White);
        // 绘制导航栏
        Tabs.barHeight($r('app.float.mainPage_barHeight'));
        // 绘制导航栏
        Tabs.barMode(BarMode.Fixed);
        TabContent.create();
        TabContent.padding({ left: $r('app.float.mainPage_padding'), right: $r('app.float.mainPage_padding') });
        TabContent.backgroundColor($r('app.color.mainPage_backgroundColor'));
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, CommonConstants.HOME_TITLE, CommonConstants.HOME_TAB_INDEX, $r('app.media.home_selected'), $r('app.media.home_normal'));
            } });
        let earlierCreatedChild_2: Home = (this && this.findChildById) ? this.findChildById("2") as Home : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Home("2", this, {}));
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
        TabContent.padding({ left: $r('app.float.mainPage_padding'), right: $r('app.float.mainPage_padding') });
        TabContent.backgroundColor($r('app.color.mainPage_backgroundColor'));
        TabContent.tabBar({ builder: () => {
                this.TabBuilder.call(this, CommonConstants.MINE_TITLE, CommonConstants.MINE_TAB_INDEX, $r('app.media.mine_selected'), $r('app.media.mine_normal'));
            } });
        let earlierCreatedChild_3: Setting = (this && this.findChildById) ? this.findChildById("3") as Setting : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Setting("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        // 绘制导航栏
        Tabs.pop();
    }
}
loadDocument(new MainPage("1", undefined, {}));
