interface Show_Params {
    scale1?: number;
    opacity1?: number;
    active?: boolean;
    select?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Show_" + ++__generate__Id;
}
export class Show extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__scale1 = new ObservedPropertySimple(1, this, "scale1");
        this.__opacity1 = new ObservedPropertySimple(1, this, "opacity1");
        this.__active = new ObservedPropertySimple(false, this, "active");
        this.select = 1;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Show_Params) {
        if (params.scale1 !== undefined) {
            this.scale1 = params.scale1;
        }
        if (params.opacity1 !== undefined) {
            this.opacity1 = params.opacity1;
        }
        if (params.active !== undefined) {
            this.active = params.active;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
    }
    aboutToBeDeleted() {
        this.__scale1.aboutToBeDeleted();
        this.__opacity1.aboutToBeDeleted();
        this.__active.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __scale1: ObservedPropertySimple<number>;
    get scale1() {
        return this.__scale1.get();
    }
    set scale1(newValue: number) {
        this.__scale1.set(newValue);
    }
    private __opacity1: ObservedPropertySimple<number>;
    get opacity1() {
        return this.__opacity1.get();
    }
    set opacity1(newValue: number) {
        this.__opacity1.set(newValue);
    }
    private __active: ObservedPropertySimple<boolean>;
    get active() {
        return this.__active.get();
    }
    set active(newValue: boolean) {
        this.__active.set(newValue);
    }
    private select: number;
    pageTransition() {
        PageTransition.create();
        If.create();
        if (this.select === 1) {
            If.branchId(0);
            PageTransitionEnter.create({ duration: 1200, curve: Curve.Ease });
            PageTransitionEnter.scale({ x: 0, y: 0 });
            PageTransitionEnter.translate({ x: 200, y: -100 });
            PageTransitionExit.create({ duration: 1000, curve: Curve.Linear });
            PageTransitionExit.translate({ x: 0, y: 0 });
            PageTransitionExit.scale({ x: 2, y: 2 });
        }
        else if (this.select === 2) {
            If.branchId(1);
            PageTransitionEnter.create({ duration: 1200 });
            PageTransitionEnter.slide(SlideEffect.Left);
            PageTransitionEnter.scale({ x: 0.1, y: 0.2 });
            PageTransitionExit.create({ delay: 50 });
            PageTransitionExit.translate({ x: 100.0, y: 100.0 });
            PageTransitionExit.opacity(0);
        }
        else if (this.select === 3) {
            If.branchId(2);
            PageTransitionEnter.create({ duration: 1500, curve: Curve.Friction, delay: 5 });
            PageTransitionEnter.slide(SlideEffect.Top);
            PageTransitionEnter.scale({ x: 100, y: 100 });
            PageTransitionExit.create({ delay: 50 });
            PageTransitionExit.slide(SlideEffect.Bottom);
            PageTransitionExit.scale({ x: 0.1, y: 0.2 });
            PageTransitionExit.opacity(0.4);
        }
        else if (this.select === 4) {
            If.branchId(3);
            // 进场过程中会逐帧触发onEnter回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionEnter.create({ duration: 1500, curve: Curve.Linear });
            // 进场过程中会逐帧触发onEnter回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionEnter.scale({ x: this.scale1 });
            // 进场过程中会逐帧触发onEnter回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionEnter.opacity(this.opacity1);
            // 进场过程中会逐帧触发onEnter回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionEnter.onEnter((type, progress) => {
                this.scale1 = 1;
                if (progress !== undefined) {
                    this.opacity1 = progress;
                }
            });
            // 退场过程中会逐帧触发onExit回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionExit.create({ duration: 1000, curve: Curve.Ease });
            // 退场过程中会逐帧触发onExit回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionExit.scale({ x: 0.1, y: 0.2 });
            // 退场过程中会逐帧触发onExit回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionExit.opacity(0.4);
            // 退场过程中会逐帧触发onExit回调，入参为动效的归一化进度(0% -- 100%)
            PageTransitionExit.onExit((type?: RouteType, progress?: number) => {
                if (progress !== undefined) {
                    this.scale1 = 1 - progress;
                }
                this.opacity1 = 1;
            });
        }
        If.pop();
        PageTransition.pop();
    }
    render() {
    }
}
