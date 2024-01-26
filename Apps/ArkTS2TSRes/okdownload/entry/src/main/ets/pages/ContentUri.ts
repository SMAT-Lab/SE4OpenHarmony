interface ContentUri_Params {
    chooseFile?: boolean;
    isCancel?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ContentUri_" + ++__generate__Id;
}
class ContentUri extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__chooseFile = new ObservedPropertySimple(true, this, "chooseFile");
        this.__isCancel = new ObservedPropertySimple(true, this, "isCancel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ContentUri_Params) {
        if (params.chooseFile !== undefined) {
            this.chooseFile = params.chooseFile;
        }
        if (params.isCancel !== undefined) {
            this.isCancel = params.isCancel;
        }
    }
    aboutToBeDeleted() {
        this.__chooseFile.aboutToBeDeleted();
        this.__isCancel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __chooseFile: ObservedPropertySimple<boolean>;
    get chooseFile() {
        return this.__chooseFile.get();
    }
    set chooseFile(newValue: boolean) {
        this.__chooseFile.set(newValue);
    }
    private __isCancel: ObservedPropertySimple<boolean>;
    get isCancel() {
        return this.__isCancel.get();
    }
    set isCancel(newValue: boolean) {
        this.__isCancel.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xFAFAFA);
        Text.create(this.chooseFile ? '-' : ('progress ' + 99.9 + ' MB/s'));
        Text.fontSize(15);
        Text.fontColor(0x8D8D8D);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Progress.create({
            value: this.chooseFile ? 0 : 50,
            total: 100,
            style: ProgressStyle.Linear
        });
        Progress.value(this.chooseFile ? 0 : 50);
        Progress.width('95%');
        Progress.color(0xFF4081);
        Button.createWithLabel(this.chooseFile ? 'Choose File...' : (this.isCancel ? 'START' : 'CANCEL'), { type: ButtonType.Normal, stateEffect: true });
        Button.width(350);
        Button.fontSize(13);
        Button.fontColor(0x868686);
        Button.margin({ top: 10 });
        Button.backgroundColor(0xFFFFFF);
        Button.border({ width: 1, color: 0xE6E6E6, style: BorderStyle.Solid });
        Button.onClick(() => {
            console.log('start execute');
            this.chooseFile = !this.chooseFile;
            /*if(!this.isCancel){
              this.isCancel =!this.isCancel
            }*/
        });
        Button.pop();
        Text.create(this.chooseFile ? '' : 'name.apk');
        Text.fontSize(15);
        Text.fontColor(0x8D8D8D);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new ContentUri("1", undefined, {}));
