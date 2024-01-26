interface Index_Params {
    controller?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { Index1Page } from './Day01/Index1Page';
import { Index2Page } from './Day02/Index2Page';
import { Index3Page } from './Day03/Index3Page';
import { Index4Page } from './Day04/Index4Page';
import router from '@ohos.router';
import { LuckyPage } from './Day01/LuckyPage';
import { GoodsPage } from './Day02/GoodsPage';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Tabs.create({ controller: this.controller });
        Tabs.scrollable(false);
        TabContent.create();
        TabContent.tabBar("Day01");
        let earlierCreatedChild_2: LuckyPage = (this && this.findChildById) ? this.findChildById("2") as LuckyPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            //Index1Page()
            View.create(new LuckyPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("Day02");
        let earlierCreatedChild_3: GoodsPage = (this && this.findChildById) ? this.findChildById("3") as GoodsPage : undefined;
        if (earlierCreatedChild_3 == undefined) {
            //Index2Page()
            View.create(new GoodsPage("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("Day03");
        let earlierCreatedChild_4: Index3Page = (this && this.findChildById) ? this.findChildById("4") as Index3Page : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Index3Page("4", this, {}));
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
        TabContent.tabBar("Day04");
        let earlierCreatedChild_5: Index4Page = (this && this.findChildById) ? this.findChildById("5") as Index4Page : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Index4Page("5", this, {}));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            View.create(earlierCreatedChild_5);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
