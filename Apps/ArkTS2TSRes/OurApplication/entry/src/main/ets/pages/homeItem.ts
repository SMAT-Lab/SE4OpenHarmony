interface homeItem_Params {
    text?: string;
    img?: Resource;
    bgColor?: Color;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "homeItem_" + ++__generate__Id;
}
export class homeItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple("", this, "text");
        this.__img = new ObservedPropertyObject($r("app.media.weini"), this, "img");
        this.__bgColor = new ObservedPropertySimple(Color.Gray, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: homeItem_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
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
    private __bgColor: ObservedPropertySimple<Color>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: Color) {
        this.__bgColor.set(newValue);
    }
    render() {
        Row.create();
        Row.width("100%");
        Image.create(this.img);
        Image.width(50);
        Image.fillColor(this.bgColor);
        Text.create(this.text);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r("app.media.pyro"));
        Image.width(50);
        Row.pop();
    }
}
loadDocument(new homeItem("1", undefined, {}));
