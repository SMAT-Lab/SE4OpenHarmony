interface MyScroll_Params {
    scroller?: Scroller;
    arr?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyScroll_" + ++__generate__Id;
}
export class MyScroll extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyScroll_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private arr: number[];
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(0xDCDCDC);
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info('To the edge');
        });
        Scroll.onScrollEnd(() => {
            console.info('Scroll Stop');
        });
        Column.create();
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item) => {
            Text.create(item.toString());
            Text.width('90%');
            Text.height(150);
            Text.backgroundColor(0xFFFFFF);
            Text.borderRadius(15);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 10 });
            Text.pop();
        }, item => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Button.createWithLabel('scroll 100');
        Button.onClick(() => {
            this.scroller.scrollTo({ xOffset: 0, yOffset: this.scroller.currentOffset().yOffset + 100 });
        });
        Button.margin({ top: 10, left: 20 });
        Button.pop();
        Button.createWithLabel('back top');
        Button.onClick(() => {
            this.scroller.scrollEdge(Edge.Top);
        });
        Button.margin({ top: 60, left: 20 });
        Button.pop();
        Button.createWithLabel('next page');
        Button.onClick(() => {
            this.scroller.scrollPage({ next: true });
        });
        Button.margin({ top: 110, left: 20 });
        Button.pop();
        Stack.pop();
    }
}
