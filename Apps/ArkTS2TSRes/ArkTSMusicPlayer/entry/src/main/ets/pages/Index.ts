interface Index_Params {
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { BreakpointConstants } from '../common/constants/BreakpointConstants';
import { StyleConstants } from '../common/constants/StyleConstants';
import { Content } from '../components/Content';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = new ObservedPropertySimple(BreakpointConstants.BREAKPOINT_SM, this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.currentBreakpoint !== undefined) {
            this.currentBreakpoint = params.currentBreakpoint;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertySimple<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.width(StyleConstants.FULL_WIDTH);
        let earlierCreatedChild_2: Header = (this && this.findChildById) ? this.findChildById("2") as Header : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 头部
            View.create(new Header("2", this, { currentBreakpoint: this.__currentBreakpoint }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Content = (this && this.findChildById) ? this.findChildById("3") as Content : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 中部
            View.create(new Content("3", this, { currentBreakpoint: this.__currentBreakpoint }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: Player = (this && this.findChildById) ? this.findChildById("4") as Player : undefined;
        if (earlierCreatedChild_4 == undefined) {
            // 底部
            View.create(new Player("4", this, { currentBreakpoint: this.__currentBreakpoint }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
