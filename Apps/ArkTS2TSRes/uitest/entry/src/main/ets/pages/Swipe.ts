interface Swipe_Params {
    message?: string;
    swiperController?: SwiperController;
    result?;
    scroller?: Scroller;
    arr?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Swipe_" + ++__generate__Id;
}
class Swipe extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World Swipe', this, "message");
        this.swiperController = new SwiperController();
        this.result = ["jsunit", "uitest", "arkUI", "tdd"];
        this.scroller = new Scroller();
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Swipe_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
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
    private swiperController: SwiperController;
    private result;
    private scroller: Scroller;
    private arr: number[];
    // private data: MyDataSource = new MyDataSource([])
    render() {
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithChild();
        Text.create('next page');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.id("swiper_text");
        Text.pop();
        Swiper.create(this.swiperController);
        Swiper.id("swiper");
        Swiper.cachedCount(2);
        Swiper.index(0);
        Swiper.autoPlay(false);
        Swiper.interval(4000);
        Swiper.indicator(true);
        Swiper.loop(true);
        Swiper.duration(500);
        Swiper.itemSpace(0);
        Swiper.curve(Curve.Linear);
        Swiper.onChange((index: number) => {
            this.message = this.result[index];
            console.info(index.toString());
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.result), (item: string) => {
            Text.create(item);
            Text.width('90%');
            Text.height(160);
            Text.backgroundColor(0xAFEEEE);
            Text.textAlign(TextAlign.Center);
            Text.fontSize(30);
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Swiper.pop();
        Column.create();
        Column.height("300");
        Column.width("100%");
        Scroll.create(this.scroller);
        Scroll.id("scroll_test");
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollable(ScrollDirection.Vertical);
        Flex.create({ direction: FlexDirection.Column });
        Flex.margin({ right: 10 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            Row.create();
            Text.create(item.toString());
            Text.width('90%');
            Text.height(100);
            Text.id("scroll_item");
            Text.backgroundColor('#3366CC');
            Text.borderRadius(15);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 5 });
            Text.pop();
            Row.pop();
        }, (item: string) => item);
        ForEach.pop();
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Column.create();
        Column.height("300");
        Column.width("100%");
        Column.backgroundColor("#99FF33");
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, color: 0xFFFFFF, startMargin: 20, endMargin: 20 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.onScrollIndex((firstIndex: number, lastIndex: number) => {
            console.info('first' + firstIndex);
            console.info('last' + lastIndex);
        });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            ListItem.create();
            Text.create('' + item);
            Text.width('100%');
            Text.height(100);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor("#CC0000");
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Swipe("1", undefined, {}));
