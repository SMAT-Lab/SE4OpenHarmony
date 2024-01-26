interface Tabss3_Params {
    text?: string;
    img?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Tabss3_" + ++__generate__Id;
}
export class Tabss3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple("", this, "text");
        this.__img = new ObservedPropertyObject($r("app.media.password"), this, "img");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Tabss3_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __img: ObservedPropertyObject<Resource>;
    get img() {
        return this.__img.get();
    }
    set img(newValue: Resource) {
        this.__img.set(newValue);
    }
    render() {
        Row.create();
        Row.width("80%");
        Image.create(this.img);
        Image.width(20);
        Text.create(this.text);
        Text.margin(15);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r("app.media.back1"));
        Image.width(20);
        Row.pop();
    }
}
