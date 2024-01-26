interface ListPage_Params {
    message?: string;
    dataList?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ListPage_" + ++__generate__Id;
}
class ListPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.dataList = [
            { "name": "苹果", "price": 1, "imageUrl": "https://img0.baidu.com/it/u=2263136498,514901290&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
            { "name": "西瓜", "price": 2, "imageUrl": "https://img1.baidu.com/it/u=3920825026,1769547276&fm=253&fmt=auto&app=138&f=JPEG?w=320&h=240" },
            { "name": "香蕉", "price": 3, "imageUrl": "https://img2.baidu.com/it/u=624152013,3706119434&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
            { "name": "芒果", "price": 4, "imageUrl": "https://img2.baidu.com/it/u=422585645,3229296282&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
            { "name": "荔枝", "price": 5, "imageUrl": "https://img0.baidu.com/it/u=92574384,46864307&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800" },
            { "name": "草莓", "price": 6, "imageUrl": "https://img0.baidu.com/it/u=2632350589,1636293401&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500" },
            { "name": "葡萄", "price": 7, "imageUrl": "https://img1.baidu.com/it/u=1708746484,2445505632&fm=253&fmt=auto&app=120&f=JPEG?w=617&h=1024" },
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ListPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.dataList !== undefined) {
            this.dataList = params.dataList;
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
    private dataList;
    render() {
        List.create();
        List.padding({ top: 10, bottom: 10 });
        ListItem.create();
        Row.create();
        Row.margin({ bottom: 15 });
        Text.create("名称");
        Text.fontSize(25);
        Text.fontColor(Color.Red);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(2);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create("价格");
        Text.fontSize(25);
        Text.fontColor(Color.Red);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(2);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create("图片");
        Text.fontSize(25);
        Text.fontColor(Color.Red);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        ListItem.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.dataList), (item, index) => {
            ListItem.create();
            Row.create();
            Text.create(item.name);
            Text.fontSize(20);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(2);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Text.create(item.price.toString());
            Text.fontSize(20);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(2);
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Column.create();
            Column.layoutWeight(3);
            Image.create(item.imageUrl);
            Image.width(100);
            Image.height(100);
            Column.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
}
loadDocument(new ListPage("1", undefined, {}));
