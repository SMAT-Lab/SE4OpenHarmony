interface MyScrollBar_Params {
    scroller?: Scroller;
    arr?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyScrollBar_" + ++__generate__Id;
}
export class MyScrollBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyScrollBar_Params) {
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
        Column.create();
        Stack.create({ alignContent: Alignment.End });
        Scroll.create(this.scroller);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollable(ScrollDirection.Vertical);
        Flex.create({ direction: FlexDirection.Column });
        Flex.margin({ left: 52 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item) => {
            Row.create();
            Text.create(item.toString());
            Text.width('90%');
            Text.height(100);
            Text.backgroundColor('#3366CC');
            Text.borderRadius(15);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 5 });
            Text.pop();
            Row.pop();
        }, item => item);
        ForEach.pop();
        Flex.pop();
        Scroll.pop();
        ScrollBar.create({ scroller: this.scroller, direction: ScrollBarDirection.Vertical, state: BarState.Auto });
        ScrollBar.width(30);
        ScrollBar.backgroundColor('#ededed');
        Text.create();
        Text.width(30);
        Text.height(100);
        Text.borderRadius(10);
        Text.backgroundColor('#C0C0C0');
        Text.pop();
        ScrollBar.pop();
        Stack.pop();
        Column.pop();
    }
}
