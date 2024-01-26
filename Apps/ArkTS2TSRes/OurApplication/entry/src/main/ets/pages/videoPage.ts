interface VideoPage_Params {
    videoController?: VideoController;
    curRate?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "videoPage_" + ++__generate__Id;
}
export class VideoPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.videoController = new VideoController();
        this.__curRate = new ObservedPropertySimple(1, this, "curRate");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VideoPage_Params) {
        if (params.videoController !== undefined) {
            this.videoController = params.videoController;
        }
        if (params.curRate !== undefined) {
            this.curRate = params.curRate;
        }
    }
    aboutToBeDeleted() {
        this.__curRate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
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
        Column.create();
        Text.create("视频播放");
        Text.fontSize(40);
        Text.fontColor(Color.Brown);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Video.create({
            src: $r('app.media.foodVedio'),
            previewUri: $r("app.media.weini"),
            currentProgressRate: 1,
            controller: this.videoController,
        });
        Video.autoPlay(false);
        Video.height("60%");
        Flex.create();
        Button.createWithLabel("播放");
        Button.height(30);
        Button.width(100);
        Button.backgroundColor(Color.Orange);
        Button.margin({
            bottom: 40
        });
        Button.onClick(() => {
            this.videoController.start();
        });
        Button.pop();
        Button.createWithLabel("暂停");
        Button.height(30);
        Button.width(100);
        Button.backgroundColor(Color.Orange);
        Button.margin({
            bottom: 40
        });
        Button.onClick(() => {
            this.videoController.pause();
        });
        Button.pop();
        Button.createWithLabel("停止");
        Button.height(30);
        Button.width(100);
        Button.backgroundColor(Color.Orange);
        Button.margin({
            bottom: 40
        });
        Button.onClick(() => {
            this.videoController.stop();
        });
        Button.pop();
        Button.createWithLabel("2倍速");
        Button.height(30);
        Button.width(100);
        Button.backgroundColor(Color.Brown);
        Button.margin({
            bottom: 40
        });
        Button.onClick(() => {
            this.curRate = 16;
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new VideoPage("1", undefined, {}));
