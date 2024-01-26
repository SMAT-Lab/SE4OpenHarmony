interface VideoPage_Params {
    videoUrl?: string;
    videoController?: VideoController;
    curRate?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "VideoPage_" + ++__generate__Id;
}
class VideoPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoUrl = new ObservedPropertySimple('http://www.w3school.com.cn/example/html5/mov_bbb.mp4', this, "videoUrl");
        this.videoController = new VideoController();
        this.__curRate = new ObservedPropertySimple(1, this, "curRate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VideoPage_Params) {
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
        this.__videoUrl.aboutToBeDeleted();
        this.__curRate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 网路地址需要在module.json中添加权限
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
        Row.height('100%');
        Column.create();
        Column.width("100%");
        Video.create({
            src: this.videoUrl,
            previewUri: $r("app.media.wink"),
            currentProgressRate: 1,
            controller: this.videoController // 控制器（控制进度播放等）
        });
        Video.autoPlay(true);
        Video.width('90%');
        Video.height("60%");
        Flex.create();
        Button.createWithLabel("播放");
        Button.onClick(() => {
            this.videoController.start();
        });
        Button.pop();
        Button.createWithLabel("暂停");
        Button.onClick(() => {
            this.videoController.pause();
        });
        Button.pop();
        Button.createWithLabel("停止");
        Button.onClick(() => {
            this.videoController.stop();
        });
        Button.pop();
        Button.createWithLabel("1x");
        Button.onClick(() => {
            this.curRate = 1;
        });
        Button.pop();
        Button.createWithLabel("1.25x");
        Button.onClick(() => {
            this.curRate = 1.25;
        });
        Button.pop();
        Button.createWithLabel("2x");
        Button.onClick(() => {
            this.curRate = 2;
        });
        Button.pop();
        Button.createWithLabel("播放");
        Button.onClick(() => {
            this.videoController.start();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new VideoPage("1", undefined, {}));
