interface DownloadStatus_Params {
    isEnable?: boolean;
    status?: string;
    title?: string;
    priority?: number;
    progress?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DownloadStatus_" + ++__generate__Id;
}
export default class DownloadStatus extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isEnable = new SynchedPropertySimpleOneWay(params.isEnable, this, "isEnable");
        this.__status = new SynchedPropertySimpleOneWay(params.status, this, "status");
        this.__title = new SynchedPropertySimpleOneWay(params.title, this, "title");
        this.__priority = new SynchedPropertySimpleTwoWay(params.priority, this, "priority");
        this.__progress = new SynchedPropertySimpleOneWay(params.progress, this, "progress");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DownloadStatus_Params) {
        this.isEnable = params.isEnable;
        this.status = params.status;
        this.title = params.title;
        this.progress = params.progress;
    }
    aboutToBeDeleted() {
        this.__isEnable.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__priority.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isEnable: SynchedPropertySimpleOneWay<boolean>;
    get isEnable() {
        return this.__isEnable.get();
    }
    set isEnable(newValue: boolean) {
        this.__isEnable.set(newValue);
    }
    private __status: SynchedPropertySimpleOneWay<string>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string) {
        this.__status.set(newValue);
    }
    private __title: SynchedPropertySimpleOneWay<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __priority: SynchedPropertySimpleTwoWay<number>;
    get priority() {
        return this.__priority.get();
    }
    set priority(newValue: number) {
        this.__priority.set(newValue);
    }
    private __progress: SynchedPropertySimpleOneWay<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    render() {
        Column.create({ space: 15 });
        Column.width('100%');
        /*标题*/
        Text.create(this.title);
        /*标题*/
        Text.fontSize('20fp');
        /*标题*/
        Text.fontColor(0x000000);
        /*标题*/
        Text.pop();
        /*下载状态*/
        Text.create(this.status);
        /*下载状态*/
        Text.fontSize('20fp');
        /*下载状态*/
        Text.fontColor(0x757575);
        /*下载状态*/
        Text.margin({ top: 5 });
        /*下载状态*/
        Text.pop();
        Row.create();
        Text.create("Priority(" + this.priority + ")");
        Text.fontSize('20fp');
        Text.fontColor(0x757575);
        Text.pop();
        Slider.create({
            value: this.priority,
            min: 0,
            max: 20,
            step: 1,
            style: SliderStyle.OutSet
        });
        Slider.width('75%');
        Slider.trackColor(0xDBDBDB);
        Slider.blockColor(0xFF4081);
        Slider.selectedColor(0xFF4081);
        Slider.enabled(this.isEnable);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.priority = Math.round(value);
        });
        Row.pop();
        /*进度条*/
        Progress.create({
            value: this.progress,
            total: 100,
            style: ProgressStyle.Linear
        });
        /*进度条*/
        Progress.width('95%');
        /*进度条*/
        Progress.color(0xFF4081);
        Column.pop();
    }
}
