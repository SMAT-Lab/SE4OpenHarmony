interface Index_Params {
    data?: PhotoView.Model;
    data1?: PhotoView.Model;
    data2?: PhotoView.Model;
    swiperController?: SwiperController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { PhotoView } from '@ohos/photoview';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__data = new ObservedPropertyObject(new PhotoView.Model(), this, "data");
        this.__data1 = new ObservedPropertyObject(new PhotoView.Model(), this, "data1");
        this.__data2 = new ObservedPropertyObject(new PhotoView.Model(), this, "data2");
        this.swiperController = new SwiperController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.data1 !== undefined) {
            this.data1 = params.data1;
        }
        if (params.data2 !== undefined) {
            this.data2 = params.data2;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__data1.aboutToBeDeleted();
        this.__data2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __data: ObservedPropertyObject<PhotoView.Model>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: PhotoView.Model) {
        this.__data.set(newValue);
    }
    private __data1: ObservedPropertyObject<PhotoView.Model>;
    get data1() {
        return this.__data1.get();
    }
    set data1(newValue: PhotoView.Model) {
        this.__data1.set(newValue);
    }
    private __data2: ObservedPropertyObject<PhotoView.Model>;
    get data2() {
        return this.__data2.get();
    }
    set data2(newValue: PhotoView.Model) {
        this.__data2.set(newValue);
    }
    private swiperController: SwiperController;
    aboutToAppear() {
        this.data
            .setImageResource($r('app.media.harmony'));
        this.data1
            .setImageResource($r('app.media.harmony1'));
        this.data2
            .setImageResource($r('app.media.harmony2'));
    }
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
        Swiper.onChange((index: number) => {
            this.data.resetMatrix();
            this.data1.resetMatrix();
            this.data2.resetMatrix();
            console.info("ViewPager" + index.toString());
        });
        Swiper.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
