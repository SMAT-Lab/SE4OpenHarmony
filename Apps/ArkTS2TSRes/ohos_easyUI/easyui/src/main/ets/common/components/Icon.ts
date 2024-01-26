interface Icon_Params {
    url?: string;
    name?: string;
    clickable?: boolean;
    iconHeight?: number;
    iconWidth?: number;
    click?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Icon_" + ++__generate__Id;
}
export class Icon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.url = "icon/basic/arrow-down.png";
        this.name = "";
        this.clickable = false;
        this.iconHeight = 40;
        this.iconWidth = 40;
        this.click = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Icon_Params) {
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.clickable !== undefined) {
            this.clickable = params.clickable;
        }
        if (params.iconHeight !== undefined) {
            this.iconHeight = params.iconHeight;
        }
        if (params.iconWidth !== undefined) {
            this.iconWidth = params.iconWidth;
        }
        if (params.click !== undefined) {
            this.click = params.click;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private url: string;
    private name: string;
    private clickable: boolean;
    private iconHeight: number;
    private iconWidth: number;
    private click: () => void;
    render() {
        Column.create();
        Image.create($rawfile(this.url));
        Image.width(this.iconWidth);
        Image.height(this.iconHeight);
        Image.hitTestBehavior(this.clickable ? HitTestMode.Default : HitTestMode.None);
        Image.onClick(this.click);
        Text.create(this.name);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
    }
}
