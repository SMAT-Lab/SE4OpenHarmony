interface SelectImagePage_Params {
    imgDatas?: string[];
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectImagePage_" + ++__generate__Id;
}
import picker from '@ohos.file.picker';
class SelectImagePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imgDatas = new ObservedPropertyObject([], this, "imgDatas");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectImagePage_Params) {
        if (params.imgDatas !== undefined) {
            this.imgDatas = params.imgDatas;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__imgDatas.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imgDatas: ObservedPropertyObject<string[]>;
    get imgDatas() {
        return this.__imgDatas.get();
    }
    set imgDatas(newValue: string[]) {
        this.__imgDatas.set(newValue);
    }
    private scroller: Scroller;
    // 获取照片url集
    async getAllImg() {
        //
        let photoPicker = new picker.PhotoViewPicker();
        let result = new Array<string>();
        try {
            let PhotoSelectOptions = new picker.PhotoSelectOptions();
            PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            PhotoSelectOptions.maxSelectNumber = 5;
            let photoPicker = new picker.PhotoViewPicker();
            photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult) => {
                this.imgDatas = PhotoSelectResult.photoUris;
                console.info('PhotoViewPicker.select successfully, PhotoSelectResult uri: ' + JSON.stringify(PhotoSelectResult));
            }).catch((err) => {
                console.error(`PhotoViewPicker.select failed with. Code: ${err.code}, message: ${err.message}`);
            });
        }
        catch (err) {
            console.error(`PhotoViewPicker failed with. Code: ${err.code}, message: ${err.message}`);
        }
    }
    // 使用imgDatas的url加载图片。
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create("选择图片");
        Text.fontSize(36);
        Text.fontColor(Color.Orange);
        Text.onClick(() => {
            //获取图库的所有图片url，存在imgDatas中
            this.getAllImg();
        });
        Text.pop();
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(10);
        Scroll.edgeEffect(EdgeEffect.None);
        Scroll.height("80%");
        Scroll.margin({
            bottom: 20
        });
        Column.create();
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.imgDatas), item => {
            Image.create(item);
            Image.width(200);
            Image.borderRadius(20);
            Image.margin(5);
        }, item => JSON.stringify(item));
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new SelectImagePage("1", undefined, {}));
