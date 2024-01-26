interface ImagePreview_Params {
    currentImageIndex?: number;
    showIndicators?: boolean;
    showIndexPage?: boolean;
    images?: string[];
    isLoop?: boolean;
    maxZoom?: number;
    minZoom?: number;
    startIndex?;
    scaleX?: number;
    scaleY?: number;
    isPinchGesture?: boolean;
    imageZoomName?: string;
    swiperController?: SwiperController;
    showImagePreview?: boolean;
    asyncClose?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImagePreview_" + ++__generate__Id;
}
export class ImagePreview extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentImageIndex = new ObservedPropertySimple(1 //当前图片的索引值
        , this, "currentImageIndex");
        this.showIndicators = false //是否展示轮播指示器
        ;
        this.showIndexPage = true //是否展示页码
        ;
        this.images = [] //传入的图片数组
        ;
        this.isLoop = true //是否循环播放图片
        ;
        this.maxZoom = 3 //手势缩放的最大缩放比例
        ;
        this.minZoom = 1 / 3 //手势缩放的最小缩放比例
        ;
        this.startIndex = 1 //指定起始索引的位置
        ;
        this.__scaleX = new ObservedPropertySimple(1 //图片X轴方向缩放大小
        , this, "scaleX");
        this.__scaleY = new ObservedPropertySimple(1 //图片Y轴方向缩放大小
        , this, "scaleY");
        this.__isPinchGesture = new ObservedPropertySimple(false //是否处于捏合状态
        , this, "isPinchGesture");
        this.__imageZoomName = new ObservedPropertySimple("" //需要缩放的图片名
        , this, "imageZoomName");
        this.swiperController = new SwiperController();
        this.__showImagePreview = new SynchedPropertySimpleTwoWay(params.showImagePreview, this, "showImagePreview");
        this.asyncClose = false //是否启用异步关闭
        ;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImagePreview_Params) {
        if (params.currentImageIndex !== undefined) {
            this.currentImageIndex = params.currentImageIndex;
        }
        if (params.showIndicators !== undefined) {
            this.showIndicators = params.showIndicators;
        }
        if (params.showIndexPage !== undefined) {
            this.showIndexPage = params.showIndexPage;
        }
        if (params.images !== undefined) {
            this.images = params.images;
        }
        if (params.isLoop !== undefined) {
            this.isLoop = params.isLoop;
        }
        if (params.maxZoom !== undefined) {
            this.maxZoom = params.maxZoom;
        }
        if (params.minZoom !== undefined) {
            this.minZoom = params.minZoom;
        }
        if (params.startIndex !== undefined) {
            this.startIndex = params.startIndex;
        }
        if (params.scaleX !== undefined) {
            this.scaleX = params.scaleX;
        }
        if (params.scaleY !== undefined) {
            this.scaleY = params.scaleY;
        }
        if (params.isPinchGesture !== undefined) {
            this.isPinchGesture = params.isPinchGesture;
        }
        if (params.imageZoomName !== undefined) {
            this.imageZoomName = params.imageZoomName;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.asyncClose !== undefined) {
            this.asyncClose = params.asyncClose;
        }
    }
    aboutToBeDeleted() {
        this.__currentImageIndex.aboutToBeDeleted();
        this.__scaleX.aboutToBeDeleted();
        this.__scaleY.aboutToBeDeleted();
        this.__isPinchGesture.aboutToBeDeleted();
        this.__imageZoomName.aboutToBeDeleted();
        this.__showImagePreview.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentImageIndex: ObservedPropertySimple<number>; //当前图片的索引值
    get currentImageIndex() {
        return this.__currentImageIndex.get();
    }
    set currentImageIndex(newValue: number) {
        this.__currentImageIndex.set(newValue);
    }
    private showIndicators: boolean; //是否展示轮播指示器
    private showIndexPage: boolean; //是否展示页码
    private images: string[]; //传入的图片数组
    private isLoop: boolean; //是否循环播放图片
    private maxZoom: number; //手势缩放的最大缩放比例
    private minZoom: number; //手势缩放的最小缩放比例
    private startIndex; //指定起始索引的位置
    private __scaleX: ObservedPropertySimple<number>; //图片X轴方向缩放大小
    get scaleX() {
        return this.__scaleX.get();
    }
    set scaleX(newValue: number) {
        this.__scaleX.set(newValue);
    }
    private __scaleY: ObservedPropertySimple<number>; //图片Y轴方向缩放大小
    get scaleY() {
        return this.__scaleY.get();
    }
    set scaleY(newValue: number) {
        this.__scaleY.set(newValue);
    }
    private __isPinchGesture: ObservedPropertySimple<boolean>; //是否处于捏合状态
    get isPinchGesture() {
        return this.__isPinchGesture.get();
    }
    set isPinchGesture(newValue: boolean) {
        this.__isPinchGesture.set(newValue);
    }
    private __imageZoomName: ObservedPropertySimple<string>; //需要缩放的图片名
    get imageZoomName() {
        return this.__imageZoomName.get();
    }
    set imageZoomName(newValue: string) {
        this.__imageZoomName.set(newValue);
    }
    private swiperController: SwiperController;
    private __showImagePreview: SynchedPropertySimpleTwoWay<boolean>;
    get showImagePreview() {
        return this.__showImagePreview.get();
    }
    set showImagePreview(newValue: boolean) {
        this.__showImagePreview.set(newValue);
    }
    private asyncClose: boolean; //是否启用异步关闭
    //图片放大缩小预览
    ImageZoom(image: string, parent = null) {
        Column.create();
        Column.width("100%");
        Column.backgroundColor("#ff000000");
        Row.create();
        Row.height("100%");
        Image.create($rawfile(image));
        Context.animation({ duration: 300 });
        Image.objectFit(ImageFit.Auto);
        Image.width("100%");
        Image.height("60%");
        Image.scale({ x: this.scaleX, y: this.scaleY });
        Gesture.create(GesturePriority.Low);
        GestureGroup.create(GestureMode.Parallel);
        PinchGesture.create();
        PinchGesture.onActionStart((event: GestureEvent) => {
            if (event.scale > 1) {
                this.scaleX = event.scale * 2 * this.scaleX;
                this.scaleY = event.scale * 2 * this.scaleY;
            }
            if (event.scale < 1) {
                this.scaleX = event.scale * 0.5 * this.scaleX;
                this.scaleY = event.scale * 0.5 * this.scaleY;
            }
            if (this.scaleX >= this.maxZoom) {
                this.scaleX = this.maxZoom;
                this.scaleY = this.maxZoom;
            }
            if (this.scaleX <= this.minZoom) {
                this.scaleX = this.minZoom;
                this.scaleY = this.minZoom;
            }
            console.log("偏移捏合手势==：" + event.offsetX + event.offsetX);
        });
        PinchGesture.pop();
        SwipeGesture.create({ direction: SwipeDirection.Horizontal });
        SwipeGesture.onAction((event: GestureEvent) => {
            this.isPinchGesture = false;
            this.swiperController.showNext();
            console.log("偏移滑动手势：" + event.offsetX);
        });
        SwipeGesture.pop();
        GestureGroup.pop();
        Gesture.pop();
        Context.animation(null);
        Row.pop();
        Column.pop();
    }
    render() {
        Stack.create();
        Stack.height("100%");
        Stack.width("100%");
        Stack.backgroundColor("#ff000000");
        Row.create();
        Row.height("100%");
        Row.onAppear(() => {
            this.currentImageIndex = this.startIndex;
        });
        Column.create();
        Column.width("100%");
        Swiper.create(this.swiperController);
        Swiper.height("60%");
        Swiper.indicator(this.showIndicators);
        Swiper.loop(this.isLoop);
        Swiper.index(this.startIndex - 1);
        Swiper.onChange((index: number) => {
            this.scaleX = 1;
            this.scaleY = 1;
            this.currentImageIndex = index + 1;
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.images), (item, index) => {
            Image.create($rawfile(item));
            Image.objectFit(ImageFit.Auto);
            Image.width("100%");
            Gesture.create(GesturePriority.Low);
            PinchGesture.create();
            PinchGesture.onActionStart((event: GestureEvent) => {
                this.isPinchGesture = true;
                this.imageZoomName = item;
                console.log("test+" + this.isPinchGesture + this.imageZoomName);
            });
            PinchGesture.pop();
            Gesture.pop();
        });
        ForEach.pop();
        Swiper.pop();
        Column.pop();
        Row.pop();
        If.create();
        if (this.isPinchGesture) {
            If.branchId(0);
            this.ImageZoom(this.imageZoomName, this);
        }
        If.pop();
        If.create();
        if (this.showIndexPage) {
            If.branchId(0);
            Row.create();
            Row.height("100%");
            Text.create(`${this.currentImageIndex}/${this.images.length}`);
            Text.fontColor(Color.White);
            Text.alignSelf(ItemAlign.Start);
            Text.fontSize(20);
            Text.margin({ top: 10 });
            Text.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Row.height("100%");
            Text.create(`第${this.currentImageIndex}页`);
            Text.fontColor(Color.White);
            Text.alignSelf(ItemAlign.Start);
            Text.fontSize(20);
            Text.margin({ top: 10 });
            Text.pop();
            Row.pop();
        }
        If.pop();
        //上部点击区域
        Rect.create();
        //上部点击区域
        Rect.width("100%");
        //上部点击区域
        Rect.height("20%");
        //上部点击区域
        Rect.alignSelf(ItemAlign.End);
        //上部点击区域
        Rect.position({
            x: 0, y: 0
        });
        //上部点击区域
        Rect.opacity(0);
        //上部点击区域
        Rect.onClick(() => {
            if (!this.asyncClose) {
                this.showImagePreview = false; //关闭图片预览组件调用
            }
            else {
                setTimeout(() => {
                    this.showImagePreview = false; //关闭图片预览组件调用
                }, 500);
            }
        });
        //下部点击区域
        Rect.create();
        //下部点击区域
        Rect.width("100%");
        //下部点击区域
        Rect.height("20%");
        //下部点击区域
        Rect.alignSelf(ItemAlign.Start);
        //下部点击区域
        Rect.position({
            x: 0, y: 600
        });
        //下部点击区域
        Rect.onClick(() => {
            if (!this.asyncClose) {
                this.showImagePreview = false; //关闭图片预览组件调用
            }
            else {
                setTimeout(() => {
                    this.showImagePreview = false; //关闭图片预览组件调用
                }, 500);
            }
        });
        Stack.pop();
    }
}
