interface AlbumCover_Params {
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AlbumCover_" + ++__generate__Id;
}
import { BreakpointConstants } from '../common/constants/BreakpointConstants';
import { StyleConstants } from '../common/constants/StyleConstants';
import { AlbumComponent } from './AlbumComponent';
export class AlbumCover extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWay(params.currentBreakpoint, this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AlbumCover_Params) {
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: SynchedPropertySimpleTwoWay<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        If.create();
        if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
            If.branchId(0);
            let earlierCreatedChild_2: AlbumComponent = (this && this.findChildById) ? this.findChildById("2") as AlbumComponent : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new AlbumComponent("2", this, { currentBreakpoint: this.__currentBreakpoint }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            __Common__.create();
            __Common__.height(StyleConstants.FULL_HEIGHT);
            let earlierCreatedChild_3: AlbumComponent = (this && this.findChildById) ? this.findChildById("3") as AlbumComponent : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new AlbumComponent("3", this, { currentBreakpoint: this.__currentBreakpoint }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
            __Common__.pop();
        }
        If.pop();
    }
}
