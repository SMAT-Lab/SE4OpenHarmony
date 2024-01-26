interface SelectTranslateApiDialog_Params {
    controller?: CustomDialogController;
    confirm?: (api: string) => void;
    translationApiType?: string;
    selectedApi?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectTranslateApiDialog_" + ++__generate__Id;
}
import { translation_api } from '../model/GeneralConfig';
import { TranslationAPI } from '../model/TranslationAPI';
export default class SelectTranslateApiDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.confirm = undefined;
        this.__translationApiType = AppStorage.SetAndLink(translation_api, TranslationAPI.BAIDU_GENERAL, this, "translationApiType");
        this.__selectedApi = new ObservedPropertySimple('', this, "selectedApi");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectTranslateApiDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.selectedApi !== undefined) {
            this.selectedApi = params.selectedApi;
        }
    }
    aboutToBeDeleted() {
        this.__translationApiType.aboutToBeDeleted();
        this.__selectedApi.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: (api: string) => void;
    private __translationApiType: ObservedPropertyAbstract<string>;
    get translationApiType() {
        return this.__translationApiType.get();
    }
    set translationApiType(newValue: string) {
        this.__translationApiType.set(newValue);
    }
    private __selectedApi: ObservedPropertySimple<string>;
    get selectedApi() {
        return this.__selectedApi.get();
    }
    set selectedApi(newValue: string) {
        this.__selectedApi.set(newValue);
    }
    aboutToAppear() {
        this.selectedApi = this.translationApiType;
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        Column.borderRadius(10);
        Column.padding(15);
        Column.width('60%');
        Row.create();
        Row.width('100%');
        Radio.create({ value: TranslationAPI.BAIDU_GENERAL, group: 'radioGroup' });
        Radio.checked(this.selectedApi === TranslationAPI.BAIDU_GENERAL);
        Radio.enabled(true);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.selectedApi = TranslationAPI.BAIDU_GENERAL;
            }
        });
        Text.create("百度通用文本翻译");
        Text.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.width('100%');
        Radio.create({ value: TranslationAPI.BAIDU_AI_GENERAL, group: 'radioGroup' });
        Radio.checked(this.selectedApi === TranslationAPI.BAIDU_AI_GENERAL);
        Radio.enabled(true);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.selectedApi = TranslationAPI.BAIDU_AI_GENERAL;
            }
        });
        Text.create();
        Span.create("百度机器翻译：文本翻译-通用版 ");
        Text.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.width('100%');
        Radio.create({ value: TranslationAPI.BAIDU_AI_DICT, group: 'radioGroup' });
        Radio.checked(this.selectedApi === TranslationAPI.BAIDU_AI_DICT);
        Radio.enabled(true);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.selectedApi = TranslationAPI.BAIDU_AI_DICT;
            }
        });
        Text.create();
        Span.create("百度机器翻译：文本翻译-词典版");
        Text.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.width('100%');
        Radio.create({ value: TranslationAPI.YOUDAO_GENERAL, group: 'radioGroup' });
        Radio.checked(false);
        Radio.enabled(false);
        Text.create();
        Span.create("有道智云：文本翻译");
        Span.create("开发中~~");
        Span.fontColor(Color.Red);
        Text.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('80%');
        Row.margin({ top: 20 });
        Text.create('取消');
        Text.onClick(() => {
            if (this.controller != undefined) {
                this.controller.close();
            }
        });
        Text.backgroundColor(0xE5E5E5);
        Text.borderRadius(8);
        Text.fontColor(Color.White);
        Text.padding({ top: 10, bottom: 10, left: 15, right: 15 });
        Text.pop();
        Text.create('确认');
        Text.onClick(() => {
            this.translationApiType = this.selectedApi;
            if (this.confirm) {
                this.confirm(this.selectedApi);
            }
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
