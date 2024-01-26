interface LottiePage_Params {
    setting?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    lottiePath?: string;
    lottieName?: string;
    playState?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LottiePage_" + ++__generate__Id;
}
import lottie from '@ohos/lottie';
class LottiePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.setting = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.setting);
        this.lottiePath = "common/lottie/sleep.json";
        this.lottieName = "lottie_data";
        this.__playState = new ObservedPropertySimple("", this, "playState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LottiePage_Params) {
        if (params.setting !== undefined) {
            this.setting = params.setting;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.lottiePath !== undefined) {
            this.lottiePath = params.lottiePath;
        }
        if (params.lottieName !== undefined) {
            this.lottieName = params.lottieName;
        }
        if (params.playState !== undefined) {
            this.playState = params.playState;
        }
    }
    aboutToBeDeleted() {
        this.__playState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private setting: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private lottiePath: string;
    private lottieName: string;
    private __playState: ObservedPropertySimple<string>;
    get playState() {
        return this.__playState.get();
    }
    set playState(newValue: string) {
        this.__playState.set(newValue);
    }
    onPageShow() {
        //    lottie.loadAnimation({
        //      container: this.context,    // 需要绑定Canvas的CanvasRenderingContext2D
        //      renderer: "canvas",         // 目前只支持canvas模式
        //      loop: true,                 // 是否循环播放
        //      autoplay: true,             // 是否自动播放
        //      name: this.lottieName,      // 设置lottie动画名称
        //      path: this.lottiePath       // 指定lottie动画资源路径
        //    })
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height('100%');
        Column.padding(10);
        Canvas.create(this.context);
        Canvas.width("80%");
        Canvas.height("80%");
        Canvas.backgroundColor("#aabbcc");
        Canvas.onDisAppear(() => {
            lottie.destroy(this.lottieName); // Canvas销毁时顺带销毁lottie动画
        });
        Canvas.onClick(() => {
            lottie.pause(this.lottieName); // 暂停lottie动画
            lottie.play(this.lottieName); // 播放lottie动画
        });
        Canvas.pop();
        //      Text(this.playState)
        //        .fontSize(22)
        Row.create({ space: 5 });
        Button.createWithLabel('开启');
        Button.onClick(() => {
            // 加载动画并自动播放
            lottie.loadAnimation({
                container: this.context,
                renderer: "canvas",
                loop: true,
                autoplay: true,
                name: this.lottieName,
                path: this.lottiePath // 指定lottie动画资源路径
            });
            this.playState = "已开启";
        });
        Button.pop();
        Button.createWithLabel('暂停');
        Button.onClick(() => {
            lottie.pause(this.lottieName); // 暂停lottie动画
            this.playState = "已暂停";
        });
        Button.pop();
        Button.createWithLabel('恢复');
        Button.onClick(() => {
            lottie.play(this.lottieName); // 播放lottie动画
            this.playState = "已恢复";
        });
        Button.pop();
        Button.createWithLabel('停止');
        Button.onClick(() => {
            lottie.stop(this.lottieName); // 停止lottie动画
            this.playState = "已停止";
        });
        Button.pop();
        Button.createWithLabel('销毁');
        Button.onClick(() => {
            lottie.destroy(this.lottieName); // 销毁lottie动画，回收资源
            this.playState = "已销毁";
        });
        Button.pop();
        //      Text(this.playState)
        //        .fontSize(22)
        Row.pop();
        Column.pop();
    }
}
loadDocument(new LottiePage("1", undefined, {}));
