interface MyRelativeContainer_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyRelativeContainer_" + ++__generate__Id;
}
export class MyRelativeContainer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyRelativeContainer_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Button.createWithLabel("Extra button");
        Button.width(100);
        Button.height(50);
        Button.pop();
        // 外层容器的id默认为为'__container__'
        RelativeContainer.create();
        // 外层容器的id默认为为'__container__'
        RelativeContainer.width(200);
        // 外层容器的id默认为为'__container__'
        RelativeContainer.height(200);
        // 外层容器的id默认为为'__container__'
        RelativeContainer.backgroundColor(Color.Orange);
        Button.createWithLabel("Button 1");
        Button.width(120);
        Button.height(30);
        Button.alignRules({
            middle: { anchor: "__container__", align: HorizontalAlign.Center }, // 水平方向上，组件中部与容器中间对齐，即组件在容器中水平居中
        });
        Button.id("bt1");
        Button.borderWidth(1);
        Button.borderColor(Color.Black);
        Button.pop();
        Text.create("This is text 2");
        Text.fontSize(20);
        Text.padding(10);
        Text.borderWidth(1);
        Text.borderColor(Color.Black);
        Text.height(30);
        Text.id("tx2");
        Text.alignRules({
            bottom: { anchor: "__container__", align: VerticalAlign.Bottom },
            top: { anchor: "bt1", align: VerticalAlign.Bottom },
            right: { anchor: "bt1", align: HorizontalAlign.Center } //  组件右侧与button1中间点对齐
        });
        Text.pop();
        LoadingProgress.create();
        LoadingProgress.color(Color.Blue);
        LoadingProgress.borderWidth(1);
        LoadingProgress.borderColor(Color.Black);
        LoadingProgress.height(30);
        LoadingProgress.width(30);
        LoadingProgress.id("lp3");
        LoadingProgress.alignRules({
            left: { anchor: "bt1", align: HorizontalAlign.End },
            top: { anchor: "tx2", align: VerticalAlign.Center },
            bottom: { anchor: "__container__", align: VerticalAlign.Bottom } // 组件下边对齐最外层容器的底边
        });
        Gauge.create({ value: 50, min: 0, max: 100 });
        Gauge.startAngle(210);
        Gauge.endAngle(150);
        Gauge.colors([[0x317AF7, 1], [0x5BA854, 1], [0xE08C3A, 1], [0x9C554B, 1], [0xD94838, 1]]);
        Gauge.strokeWidth(20);
        Gauge.width(50);
        Gauge.height(50);
        Gauge.alignRules({
            left: { anchor: "tx2", align: HorizontalAlign.End },
            right: { anchor: "__container__", align: HorizontalAlign.End },
            top: { anchor: "__container__", align: VerticalAlign.Top },
            bottom: { anchor: "lp3", align: VerticalAlign.Top } // 组件下边对齐容器lp3的上边
        });
        Gauge.id("g4");
        Gauge.borderWidth(1);
        Gauge.borderColor(Color.Black);
        Gauge.pop();
        // 外层容器的id默认为为'__container__'
        RelativeContainer.pop();
        Row.pop();
    }
}
