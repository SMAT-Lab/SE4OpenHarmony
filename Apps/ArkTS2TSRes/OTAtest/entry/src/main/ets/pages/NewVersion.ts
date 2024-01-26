interface Index_Params {
    dotTextPlay?: boolean;
    updateStatus?: number;
    actionCallBack?: Array<() => void>;
    buttonText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewVersion_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dotTextPlay = new ObservedPropertySimple(false, this, "dotTextPlay");
        this.__updateStatus = AppStorage.SetAndProp('updateStatus', AppStorage.Get('updateStatus'), this, "updateStatus");
        this.actionCallBack = [];
        this.__buttonText = new ObservedPropertySimple('', this, "buttonText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.dotTextPlay !== undefined) {
            this.dotTextPlay = params.dotTextPlay;
        }
        if (params.actionCallBack !== undefined) {
            this.actionCallBack = params.actionCallBack;
        }
        if (params.buttonText !== undefined) {
            this.buttonText = params.buttonText;
        }
    }
    aboutToBeDeleted() {
        this.__dotTextPlay.aboutToBeDeleted();
        this.__updateStatus.aboutToBeDeleted();
        this.__buttonText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //  @State newVersionActionText: Resource = '已经是最新版本';
    private __dotTextPlay: ObservedPropertySimple<boolean>;
    get dotTextPlay() {
        return this.__dotTextPlay.get();
    }
    set dotTextPlay(newValue: boolean) {
        this.__dotTextPlay.set(newValue);
    }
    //  @State newVersionStatus: string = NewVersionStatus.NO_NEW_VERSION;
    private __updateStatus: ObservedPropertyAbstract<number>;
    get updateStatus() {
        return this.__updateStatus.get();
    }
    set updateStatus(newValue: number) {
        this.__updateStatus.set(newValue);
    }
    //  private videoController: VideoController = new VideoController();
    private actionCallBack: Array<() => void>;
    private __buttonText: ObservedPropertySimple<string>;
    get buttonText() {
        return this.__buttonText.get();
    }
    set buttonText(newValue: string) {
        this.__buttonText.set(newValue);
    }
    //  @State updaterManagement: UpdaterManagement = new UpdaterManagement();
    aboutToAppear() {
        //    this.updaterManagement.onInit();
    }
    render() {
        Column.create();
        Column.width('100%');
        //      TitleBar()
        Image.create($r('app.media.logo'));
        //      TitleBar()
        Image.height('30%');
        //      TitleBar()
        Image.width('70%');
        //      TitleBar()
        Image.objectFit(ImageFit.Contain);
        Column.create();
        Row.create({ space: 40 });
        Progress.create({ value: 10, type: ProgressType.Linear });
        Progress.width('70%');
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
