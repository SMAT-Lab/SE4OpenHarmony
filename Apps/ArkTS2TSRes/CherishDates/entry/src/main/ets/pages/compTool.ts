interface compTool_Params {
    tool?: string;
    intro?: string;
    img?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "compTool_" + ++__generate__Id;
}
export class compTool extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tool = new ObservedPropertySimple("无名氏" // 工具名称
        , this, "tool");
        this.__intro = new ObservedPropertySimple("" // 内容简介
        , this, "intro");
        this.__img = new ObservedPropertyObject($r("app.media.tool_base") // 设置默认值（工具图标）
        // @State bgColor:     // 定义默认颜色
        , this, "img");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: compTool_Params) {
        if (params.tool !== undefined) {
            this.tool = params.tool;
        }
        if (params.intro !== undefined) {
            this.intro = params.intro;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
    }
    aboutToBeDeleted() {
        this.__tool.aboutToBeDeleted();
        this.__intro.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tool: ObservedPropertySimple<string>; // 工具名称
    get tool() {
        return this.__tool.get();
    }
    set tool(newValue: string) {
        this.__tool.set(newValue);
    }
    private __intro: ObservedPropertySimple<string>; // 内容简介
    get intro() {
        return this.__intro.get();
    }
    set intro(newValue: string) {
        this.__intro.set(newValue);
    }
    private __img: ObservedPropertyObject<Resource>; // 设置默认值（工具图标）
    get img() {
        return this.__img.get();
    }
    set img(newValue: Resource) {
        this.__img.set(newValue);
    }
    // @State bgColor:     // 定义默认颜色
    render() {
        Row.create({ space: 15 });
        Row.width("85%");
        Row.backgroundColor(Color.White);
        Row.borderRadius(15);
        Row.borderColor(Color.Gray);
        Row.borderWidth(1);
        Row.margin(10);
        Image.create(this.img);
        Image.width(45);
        Image.borderWidth(1);
        Image.borderRadius(12);
        Image.borderColor(Color.Gray);
        Image.padding(4);
        Image.margin({
            top: 15,
            bottom: 15,
            left: 20,
            right: 5
        });
        Column.create({ space: 3 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.tool);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            top: 3
        });
        Text.pop();
        Text.create(this.intro);
        Text.fontColor(Color.Gray);
        Text.fontSize(13);
        Text.width("68%");
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
