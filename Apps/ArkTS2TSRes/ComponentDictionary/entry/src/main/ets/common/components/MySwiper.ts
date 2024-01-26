interface MySwiper_Params {
    swiperController?: SwiperController;
    data?: MyDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MySwiper_" + ++__generate__Id;
}
class MyDataSource implements IDataSource {
    private list: number[] = [];
    private listener: DataChangeListener;
    constructor(list: number[]) {
        this.list = list;
    }
    totalCount(): number {
        return this.list.length;
    }
    getData(index: number): any {
        return this.list[index];
    }
    registerDataChangeListener(listener: DataChangeListener): void {
        this.listener = listener;
    }
    unregisterDataChangeListener() {
    }
}
export class MySwiper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.data = new MyDataSource([]);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MySwiper_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private swiperController: SwiperController;
    private data: MyDataSource;
    aboutToAppear(): void {
        let list = [];
        for (var i = 1; i <= 10; i++) {
            list.push(i.toString());
        }
        this.data = new MyDataSource(list);
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        Swiper.create(this.swiperController);
        Swiper.cachedCount(2);
        Swiper.index(1);
        Swiper.autoPlay(true);
        Swiper.interval(4000);
        Swiper.indicator(true);
        Swiper.loop(true);
        Swiper.duration(1000);
        Swiper.itemSpace(0);
        Swiper.curve(Curve.Linear);
        Swiper.onChange((index: number) => {
            console.info(index.toString());
        });
        LazyForEach.create("2", this, ObservedObject.GetRawObject(this.data), (item: string) => {
            this.isRenderingInProgress = true;
            Text.create(item);
            Text.width('90%');
            Text.height(160);
            Text.backgroundColor(0xAFEEEE);
            Text.textAlign(TextAlign.Center);
            Text.fontSize(30);
            Text.pop();
            this.isRenderingInProgress = false;
        }, item => item);
        LazyForEach.pop();
        Swiper.pop();
        Row.create({ space: 12 });
        Row.margin(5);
        Button.createWithLabel('showNext');
        Button.onClick(() => {
            this.swiperController.showNext();
        });
        Button.pop();
        Button.createWithLabel('showPrevious');
        Button.onClick(() => {
            this.swiperController.showPrevious();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new MySwiper("1", undefined, {}));
