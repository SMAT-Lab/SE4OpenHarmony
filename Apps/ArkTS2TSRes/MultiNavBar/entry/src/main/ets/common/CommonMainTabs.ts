interface CommonMainTabs_Params {
    currentBreakpoint?: string;
    currentMainIndex?: number;
    currentSubIndex?: number;
    mainTabsController?: TabsController;
    subTabsController?: TabsController;
    mainTabsContentList?: MenuType[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommonMainTabs_" + ++__generate__Id;
}
import { StyleConfiguration } from '../common/Configuration';
import { MenuType } from '../model/MenuType';
import { CommonSubTabs } from './CommonSubTabs';
export class CommonMainTabs extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentMainIndex = new SynchedPropertySimpleTwoWay(params.currentMainIndex, this, "currentMainIndex");
        this.__currentSubIndex = new SynchedPropertySimpleTwoWay(params.currentSubIndex, this, "currentSubIndex");
        this.mainTabsController = new TabsController();
        this.subTabsController = new TabsController();
        this.mainTabsContentList = new Array();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CommonMainTabs_Params) {
        if (params.mainTabsController !== undefined) {
            this.mainTabsController = params.mainTabsController;
        }
        if (params.subTabsController !== undefined) {
            this.subTabsController = params.subTabsController;
        }
        if (params.mainTabsContentList !== undefined) {
            this.mainTabsContentList = params.mainTabsContentList;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentMainIndex.aboutToBeDeleted();
        this.__currentSubIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>("currentBreakpoint", 'md', this, "currentBreakpoint");
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentMainIndex: SynchedPropertySimpleTwoWay<number>;
    get currentMainIndex() {
        return this.__currentMainIndex.get();
    }
    set currentMainIndex(newValue: number) {
        this.__currentMainIndex.set(newValue);
    }
    private __currentSubIndex: SynchedPropertySimpleTwoWay<number>;
    get currentSubIndex() {
        return this.__currentSubIndex.get();
    }
    set currentSubIndex(newValue: number) {
        this.__currentSubIndex.set(newValue);
    }
    private mainTabsController: TabsController;
    private subTabsController: TabsController;
    private mainTabsContentList: MenuType[];
    render() {
        Tabs.create({ barPosition: BarPosition.Start, controller: this.mainTabsController, index: this.currentMainIndex });
        Tabs.scrollable(false);
        Tabs.barHeight(0);
        Tabs.width('100%');
        Tabs.onChange((index: number) => {
            this.currentMainIndex = index;
        });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.mainTabsContentList), (item: MenuType, index: number) => {
            If.create();
            if (index === 0) {
                If.branchId(0);
                TabContent.create();
                Column.create();
                Column.padding(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).mainTabsContentMargin);
                Column.backgroundColor(StyleConfiguration.getBreakpointStyle(this.currentBreakpoint).mainTabsBcColor);
                let earlierCreatedChild_2: CommonSubTabs = (this && this.findChildById) ? this.findChildById("2") as CommonSubTabs : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new CommonSubTabs("2", this, {
                        currentSubIndex: this.__currentSubIndex,
                        subTabsController: item.subController,
                        subTabsContentList: item.subTitleList
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        subTabsController: item.subController,
                        subTabsContentList: item.subTitleList
                    });
                    View.create(earlierCreatedChild_2);
                }
                Column.pop();
                TabContent.pop();
            }
            else {
                If.branchId(1);
                TabContent.create();
                TabContent.pop();
            }
            If.pop();
        }, (item: MenuType) => JSON.stringify(item));
        ForEach.pop();
        Tabs.pop();
    }
}
