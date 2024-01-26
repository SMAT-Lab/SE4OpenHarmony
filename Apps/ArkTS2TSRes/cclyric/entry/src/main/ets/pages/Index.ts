interface Index_Params {
    duration?: number;
    lyricList?: Array<Lyric>;
    lyric?: Lyric;
    lyricController?: LyricController;
    testIndex?;
    testTimer?;
    emptyDuration?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { Lyric, LyricController, LyricParser, LyricView } from '@seagazer/cclyric';
import { MockData } from './MockData';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__duration = new ObservedPropertySimple(0, this, "duration");
        this.lyricList = new Array();
        this.lyric = null;
        this.lyricController = new LyricController();
        this.testIndex = 0;
        this.testTimer = -1;
        this.emptyDuration = 60 * 1000;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.lyricList !== undefined) {
            this.lyricList = params.lyricList;
        }
        if (params.lyric !== undefined) {
            this.lyric = params.lyric;
        }
        if (params.lyricController !== undefined) {
            this.lyricController = params.lyricController;
        }
        if (params.testIndex !== undefined) {
            this.testIndex = params.testIndex;
        }
        if (params.testTimer !== undefined) {
            this.testTimer = params.testTimer;
        }
        if (params.emptyDuration !== undefined) {
            this.emptyDuration = params.emptyDuration;
        }
    }
    aboutToBeDeleted() {
        this.__duration.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __duration: ObservedPropertySimple<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private lyricList: Array<Lyric>;
    private lyric: Lyric;
    private lyricController: LyricController;
    private testIndex;
    private testTimer;
    private emptyDuration;
    aboutToAppear() {
        let lyric1 = new LyricParser().parse(MockData.src1);
        let lyric2 = new LyricParser().parse(MockData.src2);
        this.lyricList.push(null);
        this.lyricList.push(lyric1);
        this.lyricList.push(lyric2);
        this.lyricController
            .setTextSize(24)
            .setCacheSize(4)
            .setTextColor("#ffc4c4c4")
            .setHighlightColor("#ff000000")
            .setLineSpace(16)
            .setHighlightStyle(false)
            .setEmptyHint("No Lyric");
    }
    private test() {
        this.duration = 0;
        this.testTimer = setInterval(() => {
            this.duration += 1000;
            this.lyricController.updatePosition(this.duration);
            let endDuration = this.lyric == null ? this.emptyDuration : this.lyric.lyricList[this.lyric.lyricList.length - 1].beginTime;
            if (this.duration >= endDuration + 1000) {
                clearInterval(this.testTimer);
            }
        }, 1000);
    }
    render() {
        Column.create();
        Column.padding(16);
        Column.width('100%');
        Column.height('100%');
        Column.justifyContent(FlexAlign.Center);
        Row.create();
        Row.width("100%");
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 36 });
        Button.createWithLabel('PlayNext');
        Button.fontSize(16);
        Button.onClick(() => {
            this.testIndex++;
            let index = this.testIndex % 3;
            this.lyric = this.lyricList[index];
            this.lyricController.setLyric(this.lyric);
            clearInterval(this.testTimer);
            this.duration = 0;
        });
        Button.pop();
        Button.createWithLabel('AutoPlay');
        Button.fontSize(16);
        Button.onClick(() => {
            this.test();
        });
        Button.margin({ left: 16 });
        Button.pop();
        Row.pop();
        Slider.create({
            style: SliderStyle.InSet,
            max: this.lyric != null ? this.lyric.lyricList[this.lyric.lyricList.length - 1].beginTime : this.emptyDuration,
            value: this.duration
        });
        Slider.width("100%");
        Slider.onChange((value, mode) => {
            if (mode == SliderChangeMode.End || mode == 3) {
                this.duration = value;
                this.lyricController.updatePosition(this.duration);
            }
        });
        Text.create(Math.round(this.duration / 1000) + "s");
        Text.fontSize(18);
        Text.margin({ top: 16 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
