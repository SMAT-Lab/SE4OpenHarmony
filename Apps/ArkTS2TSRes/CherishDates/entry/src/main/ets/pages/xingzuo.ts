interface xingzuo_Params {
    topic?: string;
    text?: string;
    img?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "xingzuo_" + ++__generate__Id;
}
export class xingzuo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__topic = new ObservedPropertySimple("事业指数：", this, "topic");
        this.__text = new ObservedPropertySimple("100", this, "text");
        this.__img = new ObservedPropertyObject($r("app.media.cute") // 设置默认值,需要传入
        // @State img2:Resource = $r("app.media.go")
        // @State bgColor:     // 定义默认颜色
        , this, "img");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: xingzuo_Params) {
        if (params.topic !== undefined) {
            this.topic = params.topic;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
    }
    aboutToBeDeleted() {
        this.__topic.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __topic: ObservedPropertySimple<string>;
    get topic() {
        return this.__topic.get();
    }
    set topic(newValue: string) {
        this.__topic.set(newValue);
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __img: ObservedPropertyObject<Resource>; // 设置默认值,需要传入
    get img() {
        return this.__img.get();
    }
    set img(newValue: Resource) {
        this.__img.set(newValue);
    }
    // @State img2:Resource = $r("app.media.go")
    // @State bgColor:     // 定义默认颜色
    render() {
        Row.create({ space: 10 });
        Row.width("80%");
        Row.backgroundColor(Color.White);
        Row.borderRadius(15);
        Row.borderColor(Color.Gray);
        Row.borderWidth(1);
        Row.margin(10);
        Image.create(this.img);
        Image.width(37);
        Image.margin({ left: 25, right: 7, top: 9, bottom: 9 });
        Row.create();
        Text.create(this.topic);
        Text.pop();
        Text.create(this.text);
        Text.pop();
        Row.pop();
        Row.pop();
    }
}
