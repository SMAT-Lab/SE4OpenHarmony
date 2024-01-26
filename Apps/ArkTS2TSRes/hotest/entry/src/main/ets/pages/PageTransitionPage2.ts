interface PageTransitionPage2_Params {
    scale1?: number;
    opacity1?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PageTransitionPage2_" + ++__generate__Id;
}
class PageTransitionPage2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__scale1 = new ObservedPropertySimple(1, this, "scale1");
        this.__opacity1 = new ObservedPropertySimple(1, this, "opacity1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PageTransitionPage2_Params) {
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
        Navigator.create({ target: 'pages/ToPage2', type: NavigationType.Push });
        Image.create($r('app.media.bg1'));
        Image.width('100%');
        Image.height('100%');
        Navigator.pop();
        Column.pop();
    }
    // 自定义方式2：使用系统提供的多种默认效果(平移、缩放、透明度等)
    pageTransition() {
        PageTransition.create();
        PageTransitionEnter.create({ duration: 1200 });
        PageTransitionEnter.slide(SlideEffect.Left);
        PageTransitionExit.create({ delay: 100 });
        PageTransitionExit.translate({ x: 100.0, y: 100.0 });
        PageTransitionExit.opacity(0);
        PageTransition.pop();
    }
}
loadDocument(new PageTransitionPage2("1", undefined, {}));
