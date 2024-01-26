interface Home1_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "APP_" + ++__generate__Id;
}
class Home1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home1_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.End });
        Flex.width("100%");
        Flex.height("100%");
        Flex.create();
        Flex.width("100%");
        Flex.height("100vp");
        Flex.flexGrow(1);
        Flex.backgroundColor("#ffffff");
        Row.create();
        Row.width("100%");
        Row.height("100vp");
        Row.alignItems(VerticalAlign.Top);
        Text.create("主页");
        Text.width("100%");
        Text.height("70vp");
        Text.offset({ x: "-19.66px", y: "0" });
        Text.textAlign(TextAlign.Center);
        Text.fontSize("70px");
        Text.fontWeight(FontWeight.Regular);
        Text.pop();
        Row.pop();
        Flex.pop();
        Row.create();
        Row.width("100%");
        Row.height("10%");
        Row.backgroundColor("#d15959");
        Row.alignItems(VerticalAlign.Top);
        Row.justifyContent(FlexAlign.SpaceBetween);
        Column.create();
        Column.width("25%");
        Column.height("100%");
        Column.backgroundColor("#ffffff");
        Image.create($r('app.media.img_1'));
        Image.width("70%");
        Image.height("70%");
        Image.objectFit(ImageFit.Contain);
        Image.objectRepeat(ImageRepeat.NoRepeat);
        Text.create("首页");
        Text.width("100%");
        Text.height("30%");
        Text.offset({ x: "-1px", y: "0" });
        Text.textAlign(TextAlign.Center);
        Text.fontSize("20fp");
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Column.create();
        Column.width("25%");
        Column.height("100%");
        Column.backgroundColor("#ffffff");
        Image.create($r('app.media.img_2'));
        Image.width("70%");
        Image.height("70%");
        Image.objectFit(ImageFit.Contain);
        Image.objectRepeat(ImageRepeat.NoRepeat);
        Text.create("健康报告");
        Text.width("100%");
        Text.height("30%");
        Text.offset({ x: "-1px", y: "0" });
        Text.textAlign(TextAlign.Center);
        Text.fontSize("20fp");
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Column.create();
        Column.width("25%");
        Column.height("100%");
        Column.backgroundColor("#ffffff");
        Image.create($r('app.media.img_3'));
        Image.width("70%");
        Image.height("70%");
        Image.objectFit(ImageFit.Contain);
        Image.objectRepeat(ImageRepeat.NoRepeat);
        Text.create("运动计划");
        Text.width("100%");
        Text.height("30%");
        Text.offset({ x: "-1px", y: "0" });
        Text.textAlign(TextAlign.Center);
        Text.fontSize("20fp");
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Column.create();
        Column.width("25%");
        Column.height("100%");
        Column.backgroundColor("#ffffff");
        Image.create($r('app.media.img_4'));
        Image.width("70%");
        Image.height("70%");
        Image.objectFit(ImageFit.Contain);
        Image.objectRepeat(ImageRepeat.NoRepeat);
        Text.create("我的家庭");
        Text.width("100%");
        Text.height("30%");
        Text.offset({ x: "-1px", y: "0" });
        Text.textAlign(TextAlign.Center);
        Text.fontSize("20fp");
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new Home1("1", undefined, {}));
