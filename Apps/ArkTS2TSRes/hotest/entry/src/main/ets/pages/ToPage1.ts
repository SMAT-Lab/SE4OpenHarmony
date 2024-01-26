interface ToPage1_Params {
    scale2?: number;
    opacity2?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ToPage1_" + ++__generate__Id;
}
class ToPage1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__scale2 = new ObservedPropertySimple(1, this, "scale2");
        this.__opacity2 = new ObservedPropertySimple(1, this, "opacity2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ToPage1_Params) {
        if (params.scale2 !== undefined) {
            this.scale2 = params.scale2;
        }
        if (params.opacity2 !== undefined) {
            this.opacity2 = params.opacity2;
        }
    }
    aboutToBeDeleted() {
        this.__scale2.aboutToBeDeleted();
        this.__opacity2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __scale2: ObservedPropertySimple<number>;
    get scale2() {
        return this.__scale2.get();
    }
    set scale2(newValue: number) {
        this.__scale2.set(newValue);
    }
    private __opacity2: ObservedPropertySimple<number>;
    get opacity2() {
        return this.__opacity2.get();
    }
    set opacity2(newValue: number) {
        this.__opacity2.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.scale({ x: this.scale2 });
        Column.opacity(this.opacity2);
        Navigator.create({ target: 'pages/PageTransitionPage1', type: NavigationType.Push });
        Image.create($r('app.media.bg2'));
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
            this.scale2 = 1;
            this.opacity2 = progress;
        });
        PageTransitionExit.create({ duration: 1500, curve: Curve.Ease });
        PageTransitionExit.onExit((type: RouteType, progress: number) => {
            this.scale2 = 1 - progress;
            this.opacity2 = 1;
        });
        PageTransition.pop();
    }
}
loadDocument(new ToPage1("1", undefined, {}));
