interface Index_Params {
    breakpointSystem?: BreakpointSystem;
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { Content } from '../features/content/Content';
import { Header } from '../features/header/Header';
import { Player } from '../features/player/Player';
import { BreakpointSystem } from '../utils/BreakpointSystem';
import { BreakpointConstant } from '../common/BreakpointConstant';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.breakpointSystem = new BreakpointSystem();
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private breakpointSystem: BreakpointSystem;
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    aboutToAppear() {
        this.breakpointSystem.register();
    }
    aboutToDisappear() {
        this.breakpointSystem.unRegister();
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.backgroundColor(this.currentBreakpoint == BreakpointConstant.BREAKPOINT_SM ? '#ffffff' : '#fff7eaa3');
        Column.create();
        let earlierCreatedChild_2: Header = (this && this.findChildById) ? this.findChildById("2") as Header : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Header("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Content = (this && this.findChildById) ? this.findChildById("3") as Content : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Content("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        let earlierCreatedChild_4: Player = (this && this.findChildById) ? this.findChildById("4") as Player : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Player("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
