interface MainItem_Params {
    title?: string | Resource;
    isSplitMode?: boolean;
    isTouched?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainItem_" + ++__generate__Id;
}
export class MainItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = '';
        this.__isTouched = new ObservedPropertySimple(false, this, "isTouched");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainItem_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.isTouched !== undefined) {
            this.isTouched = params.isTouched;
        }
    }
    aboutToBeDeleted() {
        this.__isSplitMode.aboutToBeDeleted();
        this.__isTouched.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private title: string | Resource;
    private __isSplitMode: ObservedPropertyAbstract<boolean> = this.localStorage_.setAndProp<boolean>('isSplitMode', false, this, "isSplitMode");
    get isSplitMode() {
        return this.__isSplitMode.get();
    }
    set isSplitMode(newValue: boolean) {
        this.__isSplitMode.set(newValue);
    }
    private __isTouched: ObservedPropertySimple<boolean>;
    get isTouched() {
        return this.__isTouched.get();
    }
    set isTouched(newValue: boolean) {
        this.__isTouched.set(newValue);
    }
    render() {
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.width('100%');
        Row.height(56);
        Row.borderRadius(20);
        Row.padding({ left: 8, right: 8 });
        Row.backgroundColor(this.isTouched ? $r('app.color.itemActivated') : $r('app.color.itemInactivated'));
        Row.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.isTouched = true;
            }
            else if (event.type === TouchType.Up) {
                this.isTouched = false;
            }
        });
        Text.create(this.title);
        Text.fontSize(16);
        Text.lineHeight(22);
        Text.fontWeight(FontWeight.Medium);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
        Text.align(Alignment.Start);
        Text.margin({ left: 16 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_arrow'));
        Image.width(12);
        Image.height(24);
        Image.margin({ left: 4 });
        Image.fillColor($r('sys.color.ohos_id_color_fourth'));
        Row.pop();
    }
}
