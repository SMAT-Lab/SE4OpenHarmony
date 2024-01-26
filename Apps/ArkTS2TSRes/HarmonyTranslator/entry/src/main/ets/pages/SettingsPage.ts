interface SettingPage_Params {
    selectTranslateApiDialogController?: CustomDialogController;
    setTranslatorInfoDialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SettingsPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import SelectTranslateApiDialog from '../dialog/SelectTranslateApiDialog';
import SetTranslatorInfoDialog from '../dialog/SetTranslatorInfoDialog';
import { TranslationAPI } from '../model/TranslationAPI';
import { baidu_text_translation_api_key, baidu_text_translation_secret, baidu_ai_translation_general_key, baidu_ai_translation_general_secret, baidu_ai_translation_dict_key, baidu_ai_translation_dict_secret, youdao_ai_translation_general_key, youdao_ai_translation_general_secret, } from '../model/GeneralConfig';
import { MainPageTopSwiper } from '../view/MainPageTopSwiper';
class SettingPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.selectTranslateApiDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SelectTranslateApiDialog("3", this, {
                    confirm: (apiType: string) => {
                        this.onSelectApi(apiType);
                    }
                });
                jsDialog.setController(this.selectTranslateApiDialogController);
                View.create(jsDialog);
            },
            autoCancel: false,
            customStyle: true
        }, this);
        this.setTranslatorInfoDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SetTranslatorInfoDialog("4", this, {});
                jsDialog.setController(this.setTranslatorInfoDialogController);
                View.create(jsDialog);
            },
            autoCancel: false,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SettingPage_Params) {
        if (params.selectTranslateApiDialogController !== undefined) {
            this.selectTranslateApiDialogController = params.selectTranslateApiDialogController;
        }
        if (params.setTranslatorInfoDialogController !== undefined) {
            this.setTranslatorInfoDialogController = params.setTranslatorInfoDialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private selectTranslateApiDialogController: CustomDialogController;
    private setTranslatorInfoDialogController: CustomDialogController;
    aboutToAppear() {
    }
    aboutToDisappear() {
    }
    private onSelectApi(apiType: string): void {
        let needShowSetInfoDialog: boolean = false;
        if (apiType == TranslationAPI.BAIDU_GENERAL) {
            let key: string = AppStorage.Get(baidu_text_translation_api_key);
            let secret: string = AppStorage.Get(baidu_text_translation_secret);
            if (key && key.length > 0 && secret && secret.length > 0) {
                promptAction.showToast({ message: "百度通用文本翻译已经设置" });
            }
            else {
                needShowSetInfoDialog = true;
            }
        }
        else if (apiType == TranslationAPI.BAIDU_AI_GENERAL) {
            let key: string = AppStorage.Get(baidu_ai_translation_general_key);
            let secret: string = AppStorage.Get(baidu_ai_translation_general_secret);
            if (key && key.length > 0 && secret && secret.length > 0) {
                promptAction.showToast({ message: "百度机器翻译-文本翻译-通用版已经设置" });
            }
            else {
                needShowSetInfoDialog = true;
            }
        }
        else if (apiType == TranslationAPI.BAIDU_AI_DICT) {
            let key: string = AppStorage.Get(baidu_ai_translation_dict_key);
            let secret: string = AppStorage.Get(baidu_ai_translation_dict_secret);
            if (key && key.length > 0 && secret && secret.length > 0) {
                promptAction.showToast({ message: "百度机器翻译-文本翻译-词典版已经设置" });
            }
            else {
                needShowSetInfoDialog = true;
            }
        }
        else if (apiType == TranslationAPI.YOUDAO_GENERAL) {
            let key: string = AppStorage.Get(youdao_ai_translation_general_key);
            let secret: string = AppStorage.Get(youdao_ai_translation_general_secret);
            if (key && key.length > 0 && secret && secret.length > 0) {
                promptAction.showToast({ message: "有道智云翻译已经设置" });
            }
            else {
                needShowSetInfoDialog = true;
            }
        }
        if (needShowSetInfoDialog) {
            this.setTranslatorInfoDialogController.open();
        }
    }
    render() {
        Column.create();
        Column.padding({ top: 48 });
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Image.create($r('app.media.left_arrow'));
        Image.width(24);
        Image.height(24);
        Image.onClick(() => {
            router.back();
        });
        Image.margin(15);
        Text.create("设置");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(24);
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.padding(15);
        Row.margin({ top: 15 });
        Row.backgroundColor(0xE5E5E5);
        Row.onClick(() => {
            this.selectTranslateApiDialogController.open();
        });
        Text.create("选择翻译接口");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_arrow'));
        Image.width(20);
        Image.height(20);
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.padding(15);
        Row.margin({ top: 15 });
        Row.backgroundColor(0xE5E5E5);
        Row.onClick(() => {
            this.setTranslatorInfoDialogController.open();
        });
        Text.create("百度通用文本翻译");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Image.create($r('app.media.tip'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 15 });
        Image.onClick(() => {
            router.pushUrl({ url: 'pages/ApplyTranslateKey', params: { url: 'https://fanyi-api.baidu.com/product/11' } });
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_arrow'));
        Image.width(20);
        Image.height(20);
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.padding(15);
        Row.margin({ top: 15 });
        Row.backgroundColor(0xE5E5E5);
        Row.onClick(() => {
            this.setTranslatorInfoDialogController.open();
        });
        Text.create("百度机器翻译：文本翻译-通用版");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Image.create($r('app.media.tip'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 15 });
        Image.onClick(() => {
            router.pushUrl({
                url: 'pages/ApplyTranslateKey',
                params: { url: 'https://ai.baidu.com/ai-doc/MT/4kqryjku9' }
            });
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_arrow'));
        Image.width(20);
        Image.height(20);
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.padding(15);
        Row.margin({ top: 15 });
        Row.backgroundColor(0xE5E5E5);
        Row.onClick(() => {
            this.setTranslatorInfoDialogController.open();
        });
        Text.create("百度机器翻译：文本翻译-词典版");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Image.create($r('app.media.tip'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 15 });
        Image.onClick(() => {
            router.pushUrl({
                url: 'pages/ApplyTranslateKey',
                params: { url: 'https://ai.baidu.com/ai-doc/MT/nkqrzmbpc' }
            });
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_arrow'));
        Image.width(20);
        Image.height(20);
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.padding(15);
        Row.margin({ top: 15 });
        Row.backgroundColor(0xE5E5E5);
        Row.onClick(() => {
            promptAction.showToast({ message: "开发中~~" });
        });
        Text.create("有道智云：文本翻译");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.Black);
        Text.pop();
        Image.create($r('app.media.tip'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 15 });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.right_arrow'));
        Image.width(20);
        Image.height(20);
        Row.pop();
        let earlierCreatedChild_2: MainPageTopSwiper = (this && this.findChildById) ? this.findChildById("2") as MainPageTopSwiper : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MainPageTopSwiper("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new SettingPage("1", undefined, {}));
