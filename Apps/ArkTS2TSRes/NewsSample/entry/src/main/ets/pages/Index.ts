interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import TabBar from '../view/TabBar';
import { FULL_WIDTH } from '../common/constant/CommonConstant';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width(FULL_WIDTH);
        Column.backgroundColor($r('app.color.listColor'));
        Column.justifyContent(FlexAlign.Center);
        let earlierCreatedChild_2: TabBar = (this && this.findChildById) ? this.findChildById("2") as TabBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TabBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
