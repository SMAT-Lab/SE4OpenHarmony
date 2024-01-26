interface SplashPage_Params {
    context?: common.UIAbilityContext;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SplashPage_" + ++__generate__Id;
}
import common from '@ohos.app.ability.common';
import UserPrivacyDialog from '../view/UserPrivacyDialog';
import data_preferences from '@ohos.data.preferences';
import router from '@ohos.router';
import { DELAY_TIME } from '../common/constant/CommonConstant';
import Logger from '../common/utils/Logger';
const H_STORE: string = 'NewsStore';
const IS_PRIVACY: string = 'isPrivacy';
class SplashPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.context = getContext(this) as common.UIAbilityContext;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new UserPrivacyDialog("2", this, {
                    cancel: () => { this.exitApp(this); },
                    confirm: () => { this.onConfirm(this); }
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: () => { this.exitApp(this); },
            autoCancel: false,
            alignment: DialogAlignment.Center
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SplashPage_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private context: common.UIAbilityContext;
    private dialogController: CustomDialogController;
    onConfirm(that) {
        let preferences = data_preferences.getPreferences(that.context, H_STORE);
        preferences.then((res) => {
            res.put(IS_PRIVACY, true).then(() => {
                res.flush();
                Logger.info('SplashPage', 'isPrivacy is put success');
            }).catch((err: Error) => {
                Logger.info('SplashPage', 'isPrivacy put failed. Cause:' + err);
            });
        });
        that.jumpMainPage();
    }
    exitApp(that) {
        that.context.terminateSelf();
    }
    aboutToAppear() {
        let preferences = data_preferences.getPreferences(this.context, H_STORE);
        preferences.then((res) => {
            res.get(IS_PRIVACY, false).then((isPrivate) => {
                if (isPrivate === true) { //已同意协议，跳转广告页
                    this.jumpMainPage();
                }
                else { //未同意协议，打开协议弹窗页面
                    this.dialogController.open();
                }
            });
        });
    }
    jumpMainPage() {
        setTimeout(() => {
            router.replaceUrl({ url: 'pages/Index' });
        }, DELAY_TIME);
    }
    aboutToDisappear() {
        clearTimeout();
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.alignItems(VerticalAlign.Center);
        Row.backgroundColor($r('app.color.color_background'));
        Row.backgroundImageSize({ width: '100%', height: '100%' });
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Center);
        Column.margin({ bottom: $r('app.float.default_120') });
        Image.create($r('app.media.icon_news'));
        Image.width($r('app.float.default_120'));
        Column.pop();
        Row.pop();
    }
}
loadDocument(new SplashPage("1", undefined, {}));
