interface HomeButton_Params {
    title?: Resource;
    description?: Resource;
    routeName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomeButton_" + ++__generate__Id;
}
import router from '@ohos.router';
import { AGCAuth } from '../services/Auth';
import { Constants } from '../common/Constants';
export class HomeButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = undefined;
        this.description = undefined;
        this.routeName = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeButton_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.description !== undefined) {
            this.description = params.description;
        }
        if (params.routeName !== undefined) {
            this.routeName = params.routeName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    public title: Resource;
    public description: Resource;
    public routeName: string;
    onNavButtonClick() {
        if (new AGCAuth(getContext(this)).getCurrentUser() === null) {
            AlertDialog.show({
                title: $r('app.string.login_warning_title'),
                message: $r('app.string.login_warning_message')
            });
        }
        else {
            router.pushUrl({ url: this.routeName, params: { title: this.title } });
        }
    }
    render() {
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(Constants.BORDER_RADIUS_4_PX);
        Button.margin(Constants.LENGTH_10_PX);
        Button.borderWidth(Constants.LENGTH_1_PX);
        Button.borderColor($r('app.color.body_color'));
        Button.fontColor($r('app.color.body_color'));
        Button.backgroundColor($r('app.color.start_window_background'));
        Button.width(Constants.PERCENT_96);
        Button.height(Constants.HEIGHT_50VP);
        Button.onClick(() => this.onNavButtonClick());
        Column.create();
        Column.width(Constants.PERCENT_100);
        Text.create(this.title);
        Text.fontSize($r('app.float.body_font_size'));
        Text.margin({ bottom: Constants.LENGTH_5_PX, top: Constants.LENGTH_5_PX });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.description);
        Text.textAlign(TextAlign.Center);
        Text.fontSize($r('app.float.body_font_size'));
        Text.margin({ bottom: Constants.LENGTH_5_PX });
        Text.pop();
        Column.pop();
        Button.pop();
    }
}
