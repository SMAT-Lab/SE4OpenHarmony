interface Index_Params {
    swiperController?: SwiperController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private swiperController: SwiperController;
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(0x3d3d3d);
        Swiper.create(this.swiperController);
        Swiper.index(0);
        Swiper.autoPlay(true);
        Swiper.indicator(true);
        Swiper.loop(true);
        Swiper.duration(50);
        Swiper.vertical(true);
        Swiper.itemSpace(0);
        Image.create($r('app.media.001'));
        Image.create($r('app.media.002'));
        Image.create($r('app.media.003'));
        Swiper.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
