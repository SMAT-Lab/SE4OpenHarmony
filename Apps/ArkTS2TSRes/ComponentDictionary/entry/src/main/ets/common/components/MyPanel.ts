interface MyPanel_Params {
    show?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyPanel_" + ++__generate__Id;
}
export class MyPanel extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__show = new ObservedPropertySimple(false, this, "show");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyPanel_Params) {
        if (params.show !== undefined) {
            this.show = params.show;
        }
    }
    aboutToBeDeleted() {
        this.__show.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __show: ObservedPropertySimple<boolean>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: boolean) {
        this.__show.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xDCDCDC);
        Column.padding({ top: 5 });
        Text.create('2021-09-30    Today Calendar: 1.afternoon......Click for details');
        Text.width('90%');
        Text.height(50);
        Text.borderRadius(10);
        Text.backgroundColor(0xFFFFFF);
        Text.padding({ left: 20 });
        Text.onClick(() => {
            this.show = !this.show;
        });
        Text.pop();
        Panel.create(this.show);
        Panel.type(PanelType.Foldable);
        Panel.mode(PanelMode.Half);
        Panel.dragBar(true);
        Panel.halfHeight(500);
        Panel.onChange((width: number, height: number, mode: PanelMode) => {
            console.info(`width:${width},height:${height},mode:${mode}`);
        });
        Column.create();
        Text.create('Today Calendar');
        Text.pop();
        Divider.create();
        Text.create('1. afternoon 4:00 The project meeting');
        Text.pop();
        Column.pop();
        Panel.pop();
        Column.pop();
    }
}
