interface Tabss_Params {
    text?: string;
    img?: Resource;
    img2?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Tabss_" + ++__generate__Id;
}
export class Tabss extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple("", this, "text");
        this.__img = new ObservedPropertyObject($r("app.media.cute") // 设置默认值
        , this, "img");
        this.__img2 = new ObservedPropertyObject($r("app.media.go")
        // @State bgColor:     // 定义默认颜色
        , this, "img2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Tabss_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
        if (params.img2 !== undefined) {
            this.img2 = params.img2;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        this.__img2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __img: ObservedPropertyObject<Resource>; // 设置默认值
    get img() {
        return this.__img.get();
    }
    set img(newValue: Resource) {
        this.__img.set(newValue);
    }
    private __img2: ObservedPropertyObject<Resource>;
    get img2() {
        return this.__img2.get();
    }
    set img2(newValue: Resource) {
        this.__img2.set(newValue);
    }
    // @State bgColor:     // 定义默认颜色
    render() {
        Row.create({ space: 10 });
        Row.width("100%");
        Image.create(this.img);
        Image.width(37);
        Image.margin(7);
        Text.create(this.text);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create(this.img2);
        Image.width(15);
        Image.fillColor(Color.Gray);
        Image.margin({
            right: 10
        });
        Row.pop();
    }
}
