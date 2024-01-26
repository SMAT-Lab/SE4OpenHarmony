interface SetTranslatorInfoDialog_Params {
    controller?: CustomDialogController;
    appID?: string;
    secret?: string;
    translationApiType?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SetTranslatorInfoDialog_" + ++__generate__Id;
}
import router from '@ohos.router';
import { baidu_text_translation_api_key, baidu_text_translation_secret, baidu_ai_translation_general_key, baidu_ai_translation_general_secret, translation_api } from '../model/GeneralConfig';
import { TranslationAPI } from '../model/TranslationAPI';
export default class SetTranslatorInfoDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__appID = new ObservedPropertySimple('', this, "appID");
        this.__secret = new ObservedPropertySimple('', this, "secret");
        this.__translationApiType = AppStorage.SetAndLink(translation_api, TranslationAPI.BAIDU_GENERAL, this, "translationApiType");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SetTranslatorInfoDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.appID !== undefined) {
            this.appID = params.appID;
        }
        if (params.secret !== undefined) {
            this.secret = params.secret;
        }
    }
    aboutToBeDeleted() {
        this.__appID.aboutToBeDeleted();
        this.__secret.aboutToBeDeleted();
        this.__translationApiType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __appID: ObservedPropertySimple<string>;
    get appID() {
        return this.__appID.get();
    }
    set appID(newValue: string) {
        this.__appID.set(newValue);
    }
    private __secret: ObservedPropertySimple<string>;
    get secret() {
        return this.__secret.get();
    }
    set secret(newValue: string) {
        this.__secret.set(newValue);
    }
    private __translationApiType: ObservedPropertyAbstract<string>;
    get translationApiType() {
        return this.__translationApiType.get();
    }
    set translationApiType(newValue: string) {
        this.__translationApiType.set(newValue);
    }
    private getRegisterUrl(): string {
        if (this.translationApiType == TranslationAPI.BAIDU_GENERAL) {
            return 'https://fanyi-api.baidu.com/doc/21';
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL) {
            return 'https://ai.baidu.com/ai-doc/MT/4kqryjku9';
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_DICT) {
            return 'https://ai.baidu.com/ai-doc/MT/nkqrzmbpc';
        }
        else if (this.translationApiType == TranslationAPI.YOUDAO_GENERAL) {
            return 'https://ai.youdao.com/doc.s#guide';
        }
        return '';
    }
    private getRegisterText(): string {
        if (this.translationApiType == TranslationAPI.BAIDU_GENERAL) {
            return '如何申请：百度通用文本翻译API';
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL) {
            return '如何申请：百度机器翻译-文本翻译-通用版';
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_DICT) {
            return '如何申请：百度机器翻译-文本翻译-词典版';
        }
        else if (this.translationApiType == TranslationAPI.YOUDAO_GENERAL) {
            return '如何申请：有道智云翻译';
        }
    }
    private updateApiKeyAndSecret(): void {
        if (this.translationApiType == TranslationAPI.BAIDU_GENERAL) {
            AppStorage.SetOrCreate<string>(baidu_text_translation_api_key, this.appID);
            AppStorage.SetOrCreate<string>(baidu_text_translation_secret, this.secret);
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL || this.translationApiType == TranslationAPI.BAIDU_AI_DICT) {
            AppStorage.SetOrCreate<string>(baidu_ai_translation_general_key, this.appID);
            AppStorage.SetOrCreate<string>(baidu_ai_translation_general_secret, this.secret);
        }
    }
    render() {
        Column.create();
        Column.margin(15);
        Column.borderRadius(10);
        Column.backgroundColor(Color.White);
        Column.padding(10);
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.alignItems(VerticalAlign.Center);
        Row.onClick(() => {
            router.pushUrl({
                url: 'pages/ApplyTranslateKey',
                params: { 'url': this.getRegisterUrl() }
            });
        });
        Text.create(this.getRegisterText());
        Text.pop();
        Image.create($r('app.media.tip'));
        Image.width(20);
        Image.height(20);
        Row.pop();
        TextInput.create({ placeholder: '请输入申请的API Key' });
        TextInput.onChange((value) => {
            this.appID = value.toString();
        });
        TextInput.margin(10);
        TextInput.padding(10);
        TextInput.borderRadius(10);
        TextInput.create({ placeholder: '请输入申请的Secret Key' });
        TextInput.onChange((value) => {
            this.secret = value.toString();
        });
        TextInput.margin(10);
        TextInput.padding(10);
        TextInput.borderRadius(10);
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('80%');
        Text.create('取消');
        Text.onClick(() => {
            if (this.controller != undefined) {
                this.controller.close();
            }
        });
        Text.backgroundColor(Color.Gray);
        Text.borderRadius(8);
        Text.fontColor(Color.White);
        Text.padding({ top: 10, bottom: 10, left: 15, right: 15 });
        Text.pop();
        Text.create('确认');
        Text.onClick(() => {
            this.updateApiKeyAndSecret();
            if (this.controller != undefined) {
                this.controller.close();
            }
        });
        Text.backgroundColor(0X39d157);
        Text.borderRadius(8);
        Text.fontColor(Color.White);
        Text.padding({ top: 10, bottom: 10, left: 15, right: 15 });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
