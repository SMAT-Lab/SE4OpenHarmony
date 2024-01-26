interface FlexPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FlexPage_" + ++__generate__Id;
}
class FlexPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FlexPage_Params) {
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
        //弹性布局，默认横向排列
        //direction 布局方向
        //wrap 是否换行 三个文本width都为40% 40% * 3 > 100% 第三个文本自动换行
        //主轴方向和布局方向一致，交叉轴方向和布局方向垂直
        //justifyContent 主轴位置
        //alignItems 交叉轴位置
        Flex.create({ direction: FlexDirection.Column, wrap: FlexWrap.NoWrap, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        //弹性布局，默认横向排列
        //direction 布局方向
        //wrap 是否换行 三个文本width都为40% 40% * 3 > 100% 第三个文本自动换行
        //主轴方向和布局方向一致，交叉轴方向和布局方向垂直
        //justifyContent 主轴位置
        //alignItems 交叉轴位置
        Flex.height("100%");
        //弹性布局，默认横向排列
        //direction 布局方向
        //wrap 是否换行 三个文本width都为40% 40% * 3 > 100% 第三个文本自动换行
        //主轴方向和布局方向一致，交叉轴方向和布局方向垂直
        //justifyContent 主轴位置
        //alignItems 交叉轴位置
        Flex.width("100%");
        //弹性布局，默认横向排列
        //direction 布局方向
        //wrap 是否换行 三个文本width都为40% 40% * 3 > 100% 第三个文本自动换行
        //主轴方向和布局方向一致，交叉轴方向和布局方向垂直
        //justifyContent 主轴位置
        //alignItems 交叉轴位置
        Flex.backgroundColor(Color.Gray);
        Text.create("文本一");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Blue);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("文本二");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Green);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("文本三");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Red);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Image.create("https://res.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487294152/428_428_4F83A80967BB0E75D9643A408A76F0D6mp.png");
        Image.height(200);
        Image.width(200);
        Image.borderRadius(20);
        //弹性布局，默认横向排列
        //direction 布局方向
        //wrap 是否换行 三个文本width都为40% 40% * 3 > 100% 第三个文本自动换行
        //主轴方向和布局方向一致，交叉轴方向和布局方向垂直
        //justifyContent 主轴位置
        //alignItems 交叉轴位置
        Flex.pop();
    }
}
loadDocument(new FlexPage("1", undefined, {}));
