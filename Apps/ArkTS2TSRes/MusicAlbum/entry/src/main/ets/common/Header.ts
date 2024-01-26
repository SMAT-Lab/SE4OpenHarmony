interface Header_Params {
    fontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Header_" + ++__generate__Id;
}
export default class Header extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontSize = AppStorage.SetAndProp('fontSize', 0, this, "fontSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Header_Params) {
    }
    aboutToBeDeleted() {
        this.__fontSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fontSize: ObservedPropertyAbstract<number>;
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue: number) {
        this.__fontSize.set(newValue);
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height(50);
        Row.zIndex(2);
        Image.create($r('app.media.ic_back'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 16 });
        Text.create($r('app.string.play_list'));
        Text.fontSize(this.fontSize + 4);
        Text.fontWeight(500);
        Text.fontColor('#556B89');
        Text.opacity(0.9);
        Text.letterSpacing(2);
        Text.padding({ left: 10 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r("app.media.ic_more"));
        Image.width(20);
        Image.height(20);
        Image.margin({ right: 16 });
        Row.pop();
    }
}
