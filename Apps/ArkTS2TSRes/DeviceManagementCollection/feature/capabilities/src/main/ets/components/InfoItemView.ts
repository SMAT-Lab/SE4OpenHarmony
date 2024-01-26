interface InfoItemView_Params {
    name?: string | Resource;
    value?: string | Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InfoItemView_" + ++__generate__Id;
}
export class InfoItemView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.name = '';
        this.value = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InfoItemView_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private name: string | Resource;
    private value: string | Resource;
    render() {
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.width('100%');
        Row.height(56);
        Row.borderRadius(20);
        Row.padding({ left: 8, right: 8 });
        Text.create(this.name);
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
        Text.create(this.value);
        Text.fontSize(16);
        Text.lineHeight(22);
        Text.fontWeight(FontWeight.Medium);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
        Text.align(Alignment.Start);
        Text.margin({ right: 16 });
        Text.pop();
        Row.pop();
    }
}
