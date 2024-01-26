interface TypeCustomDialog_Params {
    controller?: CustomDialogController;
    typeArr?: string[];
    typeValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TypeCustomDialog_" + ++__generate__Id;
}
export class TypeCustomDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.typeArr = ['Bitmap', 'Ovals', 'Color', 'Background', 'SVG'];
        this.__typeValue = new SynchedPropertySimpleTwoWay(params.typeValue, this, "typeValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TypeCustomDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.typeArr !== undefined) {
            this.typeArr = params.typeArr;
        }
    }
    aboutToBeDeleted() {
        this.__typeValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private typeArr: string[];
    private __typeValue: SynchedPropertySimpleTwoWay<string>;
    get typeValue() {
        return this.__typeValue.get();
    }
    set typeValue(newValue: string) {
        this.__typeValue.set(newValue);
    }
    render() {
        Row.create();
        Scroll.create();
        List.create({ space: 10, initialIndex: 0 });
        List.backgroundColor(Color.White);
        List.width(200);
        List.padding(20);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.typeArr), (item: string) => {
            ListItem.create();
            Text.create(item);
            Text.width('100%');
            Text.height(20);
            Text.fontSize(20);
            Text.textAlign(TextAlign.Start);
            Text.backgroundColor(0xFFFFFF);
            Text.onClick(() => {
                this.typeValue = item;
                this.controller?.close();
            });
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Scroll.pop();
        Row.pop();
    }
}
