interface MyVideo_Params {
    videoSrc?: Resource;
    previewUri?: Resource;
    curRate?: PlaybackSpeed;
    isAutoPlay?: boolean;
    showControls?: boolean;
    controller?: VideoController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyVideo_" + ++__generate__Id;
}
export class MyVideo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__videoSrc = new ObservedPropertyObject({ "id": 0, "type": 30000, params: ['video2.mp4'] }, this, "videoSrc");
        this.__previewUri = new ObservedPropertyObject($r('app.media.img'), this, "previewUri");
        this.__curRate = new ObservedPropertySimple(PlaybackSpeed.Speed_Forward_1_00_X //倍数
        , this, "curRate");
        this.__isAutoPlay = new ObservedPropertySimple(false, this, "isAutoPlay");
        this.__showControls = new ObservedPropertySimple(true, this, "showControls");
        this.controller = new VideoController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyVideo_Params) {
        if (params.videoSrc !== undefined) {
            this.videoSrc = params.videoSrc;
        }
        if (params.previewUri !== undefined) {
            this.previewUri = params.previewUri;
        }
        if (params.curRate !== undefined) {
            this.curRate = params.curRate;
        }
        if (params.isAutoPlay !== undefined) {
            this.isAutoPlay = params.isAutoPlay;
        }
        if (params.showControls !== undefined) {
            this.showControls = params.showControls;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__videoSrc.aboutToBeDeleted();
        this.__previewUri.aboutToBeDeleted();
        this.__curRate.aboutToBeDeleted();
        this.__isAutoPlay.aboutToBeDeleted();
        this.__showControls.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __videoSrc: ObservedPropertyObject<Resource>;
    get videoSrc() {
        return this.__videoSrc.get();
    }
    set videoSrc(newValue: Resource) {
        this.__videoSrc.set(newValue);
    }
    private __previewUri: ObservedPropertyObject<Resource>;
    get previewUri() {
        return this.__previewUri.get();
    }
    set previewUri(newValue: Resource) {
        this.__previewUri.set(newValue);
    }
    private __curRate: ObservedPropertySimple<PlaybackSpeed>; //倍数
    get curRate() {
        return this.__curRate.get();
    }
    set curRate(newValue: PlaybackSpeed) {
        this.__curRate.set(newValue);
    }
    private __isAutoPlay: ObservedPropertySimple<boolean>;
    get isAutoPlay() {
        return this.__isAutoPlay.get();
    }
    set isAutoPlay(newValue: boolean) {
        this.__isAutoPlay.set(newValue);
    }
    private __showControls: ObservedPropertySimple<boolean>;
    get showControls() {
        return this.__showControls.get();
    }
    set showControls(newValue: boolean) {
        this.__showControls.set(newValue);
    }
    private controller: VideoController;
    render() {
        Column.create();
        Video.create({
            src: this.videoSrc,
            previewUri: this.previewUri,
            currentProgressRate: this.curRate,
            controller: this.controller
        });
        Video.width(800);
        Video.height(600);
        Video.autoPlay(this.isAutoPlay);
        Video.controls(this.showControls);
        Video.onStart(() => {
            console.info('onStart视频');
        });
        Video.onPause(() => {
            console.info('onPause视频');
        });
        Video.onFinish(() => {
            console.info('onFinish视频');
        });
        Video.onError(() => {
            console.info('onFinish视频');
        });
        Video.onPrepared((e) => {
            //视频准备完成时触发该事件，通过duration可以获取视频时长，单位为s
            // duration: 视频的时长。
            console.info('视频onPrepared is ' + e.duration);
        });
        Video.onSeeking((e) => {
            console.info('视频onSeeking is ' + e.time);
        });
        Video.onSeeked((e) => {
            console.info('视频onSeeked is ' + e.time);
        });
        Video.onUpdate((e) => {
            console.info('视频onUpdate is ' + e.time);
        });
        Row.create();
        Button.createWithLabel('src');
        Button.onClick(() => {
            this.videoSrc = { "id": 0, "type": 30000, params: ['video2.mp4'] }; // 切换视频源
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('previewUri');
        Button.onClick(() => {
            this.previewUri = $r('app.media.img2'); // 切换视频预览海报
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('controls');
        Button.onClick(() => {
            this.showControls = !this.showControls; // 切换是否显示视频控制栏
        });
        Button.margin(5);
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithLabel('start');
        Button.onClick(() => {
            console.info('视频开始播放');
            this.controller.start(); // 开始播放
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('pause');
        Button.onClick(() => {
            this.controller.pause(); // 暂停播放
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('stop');
        Button.onClick(() => {
            this.controller.stop(); // 结束播放
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('setTime');
        Button.onClick(() => {
            this.controller.setCurrentTime(10, SeekMode.Accurate); // 精准跳转到视频的10s位置
        });
        Button.margin(5);
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithLabel('rate 0.75');
        Button.onClick(() => {
            this.curRate = PlaybackSpeed.Speed_Forward_0_75_X; // 0.75倍速播放
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('rate 1');
        Button.onClick(() => {
            this.curRate = PlaybackSpeed.Speed_Forward_1_00_X; // 原倍速播放
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('rate 2');
        Button.onClick(() => {
            this.curRate = PlaybackSpeed.Speed_Forward_2_00_X; // 2倍速播放
        });
        Button.margin(5);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
