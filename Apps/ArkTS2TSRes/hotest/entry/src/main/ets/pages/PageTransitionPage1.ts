interface PageTransitionPage1_Params {
    scale1?: number;
    opacity1?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PageTransitionPage1_" + ++__generate__Id;
}
class PageTransitionPage1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__scale1 = new ObservedPropertySimple(1, this, "scale1");
        this.__opacity1 = new ObservedPropertySimple(1, this, "opacity1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PageTransitionPage1_Params) {
        if (params.scale1 !== undefined) {
            this.scale1 = params.scale1;
        }
        if (params.opacity1 !== undefined) {
            this.opacity1 = params.opacity1;
        }
    }
    aboutToBeDeleted() {
        this.__scale1.aboutToBeDeleted();
        this.__opacity1.aboutToBeDeleted();
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
    render() {
        Column.create();
        Column.scale({ x: this.scale1 });
        Column.opacity(this.opacity1);
        Navigator.create({ target: 'pages/ToPage1', type: NavigationType.Push });
        Image.create($r('app.media.bg1'));
        Image.width('100%');
        Image.height('100%');
        Navigator.pop();
        Column.pop();
    }
    // 自定义方式1：完全自定义转场过程的效果
    pageTransition() {
        PageTransition.create();
        PageTransitionEnter.create({ duration: 1200, curve: Curve.Linear });
        PageTransitionEnter.onEnter((type: RouteType, progress: number) => {
            this.scale1 = 1;
            this.opacity1 = progress;
        });
        PageTransitionExit.create({ duration: 1500, curve: Curve.Ease });
        PageTransitionExit.onExit((type: RouteType, progress: number) => {
            this.scale1 = 1 - progress;
            this.opacity1 = 1;
        });
        PageTransition.pop();
    }
}
loadDocument(new PageTransitionPage1("1", undefined, {}));
