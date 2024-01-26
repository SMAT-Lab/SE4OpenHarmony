interface ImageSwiper_Params {
    controller?: SwiperController;
    play?: boolean;
    time?: number;
    imageNumber?: number;
    imageArray?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageSwiper_" + ++__generate__Id;
}
export class ImageSwiper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new SwiperController();
        this.__play = new ObservedPropertySimple(true, this, "play");
        this.__time = new ObservedPropertySimple(0, this, "time");
        this.imageNumber = 3;
        this.imageArray = ["ImageSwiper_test1.jpg", "ImageSwiper_test2.jpg", "ImageSwiper_test3.jpg"];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageSwiper_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.play !== undefined) {
            this.play = params.play;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.imageNumber !== undefined) {
            this.imageNumber = params.imageNumber;
        }
        if (params.imageArray !== undefined) {
            this.imageArray = params.imageArray;
        }
    }
    aboutToBeDeleted() {
        this.__play.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: SwiperController;
    private __play: ObservedPropertySimple<boolean>;
    get play() {
        return this.__play.get();
    }
    set play(newValue: boolean) {
        this.__play.set(newValue);
    }
    private __time: ObservedPropertySimple<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private imageNumber: number;
    private imageArray: Array<string>;
    render() {
        Column.create();
        Column.width('100%');
        Row.create();
        Row.height('50%');
        Row.padding(5);
        Swiper.create(this.controller);
        Swiper.onTouch(() => {
            this.play = false;
            //设置定时器，超过四秒没有触碰则从手动轮播变为自动轮播
            setTimeout(() => {
                this.play = true;
            }, 4000);
        });
        Swiper.autoPlay(this.play);
        Swiper.index(0);
        Swiper.interval(4000);
        Swiper.indicator(true);
        Swiper.loop(true);
        Swiper.duration(400);
        Swiper.vertical(false);
        //添加轮播图片
        Image.create($rawfile(this.imageArray[0]));
        //添加轮播图片
        Image.objectFit(ImageFit.Contain);
        Image.create($rawfile(this.imageArray[1]));
        Image.objectFit(ImageFit.Contain);
        Image.create($rawfile(this.imageArray[2]));
        Image.objectFit(ImageFit.Contain);
        Swiper.pop();
        Row.pop();
        //设置控制按钮
        Row.create();
        Button.createWithLabel("上一张");
        Button.onClick((event) => {
            this.play = false;
            this.controller.showPrevious();
            setTimeout(() => {
                this.play = true;
            }, 4000);
        });
        Button.pop();
        Button.createWithLabel("下一张");
        Button.onClick(() => {
            this.play = false;
            this.controller.showNext();
            setTimeout(() => {
                this.play = true;
            }, 4000);
        });
        Button.margin({ left: 50 });
        Button.pop();
        //设置控制按钮
        Row.pop();
        Column.pop();
    }
}
