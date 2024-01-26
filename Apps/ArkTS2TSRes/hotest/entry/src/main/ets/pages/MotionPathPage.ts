interface MotionPathPage_Params {
    toggle?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MotionPathPage_" + ++__generate__Id;
}
class MotionPathPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__toggle = new ObservedPropertySimple(true, this, "toggle");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MotionPathPage_Params) {
        if (params.toggle !== undefined) {
            this.toggle = params.toggle;
        }
    }
    aboutToBeDeleted() {
        this.__toggle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __toggle: ObservedPropertySimple<boolean>;
    get toggle() {
        return this.__toggle.get();
    }
    set toggle(newValue: boolean) {
        this.__toggle.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.alignItems(this.toggle ? HorizontalAlign.Start : HorizontalAlign.Center);
        Button.createWithLabel('click me');
        Button.margin(50);
        Button.motionPath({ path: 'Mstart.x start.y L300 200 L500 500 Lend.x end.y', from: 0.0, to: 1.0, rotatable: true });
        Button.onClick(() => {
            Context.animateTo({ duration: 4000, curve: Curve.Linear }, () => {
                this.toggle = !this.toggle; // 通过this.toggle变化组件的位置
            });
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new MotionPathPage("1", undefined, {}));
