interface CommonActionButton_Params {
    title?: Resource;
    color?: ResourceColor;
    backColor?: ResourceColor;
    borderW?: number;
    borderC?: ResourceColor;
    onAction?: Function;
    isEnabled?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommonActionButton_" + ++__generate__Id;
}
import { Constants } from '../common/Constants';
export class CommonActionButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = undefined;
        this.color = undefined;
        this.backColor = undefined;
        this.borderW = undefined;
        this.borderC = undefined;
        this.onAction = undefined;
        this.__isEnabled = new SynchedPropertySimpleTwoWay(params.isEnabled, this, "isEnabled");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CommonActionButton_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.borderW !== undefined) {
            this.borderW = params.borderW;
        }
        if (params.borderC !== undefined) {
            this.borderC = params.borderC;
        }
        if (params.onAction !== undefined) {
            this.onAction = params.onAction;
        }
    }
    aboutToBeDeleted() {
        this.__isEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    public title: Resource;
    public color: ResourceColor;
    public backColor: ResourceColor;
    public borderW: number;
    public borderC: ResourceColor;
    public onAction: Function;
    private __isEnabled: SynchedPropertySimpleTwoWay<boolean>;
    get isEnabled() {
        return this.__isEnabled.get();
    }
    set isEnabled(newValue: boolean) {
        this.__isEnabled.set(newValue);
    }
    render() {
        Button.createWithChild({ type: ButtonType.Normal });
        Button.width(Constants.PERCENT_90);
        Button.backgroundColor(this.backColor);
        Button.borderRadius(Constants.BORDER_RADIUS_4_PX);
        Button.borderWidth(this.borderW);
        Button.borderColor(this.borderC);
        Button.enabled(this.isEnabled);
        Button.alignSelf(ItemAlign.Center);
        Button.onClick(() => {
            this.onAction();
        });
        Text.create(this.title);
        Text.fontColor(this.color);
        Text.fontSize($r('app.float.body_font_size'));
        Text.margin({ top: Constants.LENGTH_5_PX, bottom: Constants.LENGTH_5_PX });
        Text.pop();
        Button.pop();
    }
}
