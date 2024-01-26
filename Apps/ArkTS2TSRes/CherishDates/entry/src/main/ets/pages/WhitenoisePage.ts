interface WhitenoisePage_Params {
    message?: string;
    videoUrl?: string;
    videoController?: VideoController;
    curRate?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WhitenoisePage_" + ++__generate__Id;
}
import router from '@ohos.router';
class WhitenoisePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World'
        // @State videoUrl:string = 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
        , this, "message");
        this.__videoUrl = new ObservedPropertySimple('https://qkodo.playlistmusic.com.cn/transcode_1080/video/8e72f89b3c707ac2b111a86831ca92fa.mp4', this, "videoUrl");
        this.videoController = new VideoController();
        this.__curRate = new ObservedPropertySimple(1, this, "curRate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WhitenoisePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.videoUrl !== undefined) {
            this.videoUrl = params.videoUrl;
        }
        if (params.videoController !== undefined) {
            this.videoController = params.videoController;
        }
        if (params.curRate !== undefined) {
            this.curRate = params.curRate;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__videoUrl.aboutToBeDeleted();
        this.__curRate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    // @State videoUrl:string = 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
    private __videoUrl: ObservedPropertySimple<string>;
    get videoUrl() {
        return this.__videoUrl.get();
    }
    set videoUrl(newValue: string) {
        this.__videoUrl.set(newValue);
    }
    private videoController: VideoController;
    private __curRate: ObservedPropertySimple<number>;
    get curRate() {
        return this.__curRate.get();
    }
    set curRate(newValue: number) {
        this.__curRate.set(newValue);
    }
    render() {
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.height('100%');
        Column.create();
        Column.width("100%");
        // 顶部白条
        Column.create();
        // 顶部白条
        Column.height("20%");
        Row.create({ space: 10 });
        Row.width("100%");
        Row.padding(10);
        Row.backgroundColor(Color.White);
        Row.margin({
            bottom: 0
        });
        Image.create($r("app.media.back"));
        Image.width(30);
        Image.margin(7);
        Image.fillColor(Color.Brown);
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage"
            });
        });
        Text.create("静心白噪");
        Text.fontSize(20);
        Text.margin({
            left: 140
        });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        // 顶部白条
        Column.pop();
        Video.create({
            src: this.videoUrl,
            previewUri: $r("app.media.whitenoise2"),
            currentProgressRate: this.curRate,
            controller: this.videoController // 控制器（控制进度播放等）
        });
        Video.autoPlay(true);
        Video.width('90%');
        Video.height("40%");
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.margin({ top: 10 });
        Row.create();
        Blank.create();
        Blank.pop();
        Image.create($r("app.media.start2"));
        Image.onClick(() => {
            this.videoController.start();
        });
        Image.width(70);
        Image.create($r("app.media.stop"));
        Image.onClick(() => {
            this.videoController.pause();
        });
        Image.width(70);
        Image.create($r("app.media.reset"));
        Image.onClick(() => {
            this.videoController.stop();
        });
        Image.width(60);
        Image.fillColor("#fffed62e");
        Image.backgroundColor("#ffabaaf8");
        Image.borderRadius(15);
        Image.margin({ left: 6 });
        Row.pop();
        Column.pop();
        Row.create({ space: 10 });
        Row.margin(5);
        Button.createWithLabel("  1x  ");
        Button.onClick(() => {
            this.curRate = 1;
        });
        Button.backgroundColor("#ffabaaf8");
        Button.fontWeight(FontWeight.Bold);
        Button.pop();
        Button.createWithLabel("1.25x");
        Button.onClick(() => {
            this.curRate = 1.25;
        });
        Button.backgroundColor("#ffabaaf8");
        Button.fontWeight(FontWeight.Bold);
        Button.pop();
        Button.createWithLabel(" 1.5x ");
        Button.onClick(() => {
            this.curRate = 1.5;
        });
        Button.backgroundColor("#ffabaaf8");
        Button.fontWeight(FontWeight.Bold);
        Button.pop();
        Button.createWithLabel("  2x  ");
        Button.onClick(() => {
            this.curRate = 2;
        });
        Button.backgroundColor("#ffabaaf8");
        Button.fontWeight(FontWeight.Bold);
        Button.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new WhitenoisePage("1", undefined, {}));
