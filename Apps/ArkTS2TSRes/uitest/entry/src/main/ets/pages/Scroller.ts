interface ScrollExample_Params {
    scroller?: Scroller;
    arr?: number[];
    ListArr?: String[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Scroller_" + ++__generate__Id;
}
class ScrollExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.ListArr = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10", "test11"];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ScrollExample_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.ListArr !== undefined) {
            this.ListArr = params.ListArr;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private arr: number[];
    private ListArr: String[];
    render() {
        Row.create();
        Row.height("100%");
        Row.alignItems(VerticalAlign.Top);
        Column.create();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('30%');
        Stack.backgroundColor(0xDCDCDC);
        Scroll.create(this.scroller);
        Scroll.id("scroll_test");
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.edgeEffect(EdgeEffect.None);
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
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            Text.create(item.toString());
            Text.width('90%');
            Text.height(50);
            Text.backgroundColor(0xFFFFFF);
            Text.borderRadius(15);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 10 });
            Text.id("scroller_item_text");
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Button.createWithLabel('scroll 150');
        Button.onClick(() => {
            this.scroller.scrollBy(0, 150);
        });
        Button.margin({ top: 10, left: 20 });
        Button.pop();
        Button.createWithLabel('back top');
        Button.onClick(() => {
            this.scroller.scrollEdge(Edge.Top);
        });
        Button.margin({ top: 110, left: 20 });
        Button.pop();
        Button.createWithLabel('next page');
        Button.onClick(() => {
            this.scroller.scrollPage({ next: true });
        });
        Button.margin({ top: 170, left: 20 });
        Button.pop();
        Stack.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('30%');
        Stack.backgroundColor(0xDCDCDC);
        List.create({ space: 20, initialIndex: 0 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.ListArr), (item: string) => {
            ListItem.create();
            Text.create('' + item);
            Text.id("list_item_text");
            Text.width('100%');
            Text.height(100);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Button.createWithLabel('scroll 150');
        Button.onClick(() => {
            this.scroller.scrollBy(0, 150);
        });
        Button.margin({ top: 10, left: 20 });
        Button.pop();
        Button.createWithLabel('back top');
        Button.onClick(() => {
            this.scroller.scrollEdge(Edge.Top);
        });
        Button.margin({ top: 110, left: 20 });
        Button.pop();
        Button.createWithLabel('next page');
        Button.onClick(() => {
            this.scroller.scrollPage({ next: true });
        });
        Button.margin({ top: 170, left: 20 });
        Button.pop();
        Stack.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ScrollExample("1", undefined, {}));
