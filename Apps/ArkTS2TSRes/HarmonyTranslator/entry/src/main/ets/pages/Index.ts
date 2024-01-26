interface Index_Params {
    translationApiType?: string;
    sourceLanguage?: TranslateLanguage;
    targetLanguage?: TranslateLanguage;
    baiduToken?: BaiduToken;
    translation?: TranslationResult;
    inputContent?: string;
    changeFromLanguageType?: boolean;
    changeToLanguageType?: boolean;
    translationResultStr?: string;
    translationLanguageMap?: Object;
    baiduAiGeneralTranslationResult?: BaiduAIGeneralTranslationResult;
    baiduAiDictTranslationResult?: BaiduAIDictTranslationResult;
    queryTimer?: number;
    selectLanguageDialogController?: CustomDialogController;
    context?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import prompt from '@ohos.promptAction';
import { TranslationResult, TranslateLanguage, BaiduAIGeneralTranslationResult, BaiduAIDictTranslationResult } from '../model/TranslateResult';
import { TranslationAPI } from '../model/TranslationAPI';
import { BaiduHttpUtil } from '../util/BaiduHttpUtils';
import { TranslationResultView } from '../view/TranslationResultView';
import SelectLanguageDialog from '../dialog/SelectLanguageDialog';
import router from '@ohos.router';
import { translation_api, baidu_ai_translation_token, baidu_text_translation_api_key, baidu_text_translation_secret, baidu_ai_translation_general_key, baidu_ai_translation_general_secret, baidu_ai_translation_dict_key, baidu_ai_translation_dict_secret, youdao_ai_translation_general_key, youdao_ai_translation_general_secret, source_language, target_language, BaiduToken, } from '../model/GeneralConfig';
import common from '@ohos.app.ability.common';
import buffer from '@ohos.buffer';
import { BaiduAIGeneralTranslationResultView } from '../view/BaiduAIGeneralTranslationResultView';
import BaiduAIDictTranslationResultView from '../view/BaiduAIDictTranslationResultView';
//只能在UI页面使用，否则无法持久化数据
//用到的属性必须要要先初始化，否则不会被加载到AppStorage中
PersistentStorage.PersistProp<string>(baidu_text_translation_api_key, '');
PersistentStorage.PersistProp<string>(baidu_text_translation_secret, '');
PersistentStorage.PersistProp<string>(baidu_ai_translation_general_key, '');
PersistentStorage.PersistProp<string>(baidu_ai_translation_general_secret, '');
PersistentStorage.PersistProp<string>(baidu_ai_translation_dict_key, '');
PersistentStorage.PersistProp<string>(baidu_ai_translation_dict_secret, '');
PersistentStorage.PersistProp<string>(youdao_ai_translation_general_key, '');
PersistentStorage.PersistProp<string>(youdao_ai_translation_general_secret, '');
PersistentStorage.PersistProp<string>(translation_api, TranslationAPI.BAIDU_GENERAL);
PersistentStorage.PersistProp<TranslateLanguage>(source_language, new TranslateLanguage('中文', 'zh'));
PersistentStorage.PersistProp<TranslateLanguage>(target_language, new TranslateLanguage('英文', 'en'));
PersistentStorage.PersistProp<BaiduToken>(baidu_ai_translation_token, new BaiduToken());
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__translationApiType = AppStorage.SetAndLink(translation_api, TranslationAPI.BAIDU_GENERAL, this, "translationApiType");
        this.__sourceLanguage = AppStorage.SetAndLink(source_language, new TranslateLanguage('中文', 'zh'), this, "sourceLanguage");
        this.__targetLanguage = AppStorage.SetAndLink(target_language, new TranslateLanguage('英文', 'en'), this, "targetLanguage");
        this.__baiduToken = AppStorage.SetAndLink(baidu_ai_translation_token, new BaiduToken(), this, "baiduToken");
        this.__translation = new ObservedPropertyObject(null, this, "translation");
        this.__inputContent = new ObservedPropertySimple('', this, "inputContent");
        this.__changeFromLanguageType = new ObservedPropertySimple(false, this, "changeFromLanguageType");
        this.__changeToLanguageType = new ObservedPropertySimple(false, this, "changeToLanguageType");
        this.__translationResultStr = new ObservedPropertySimple("", this, "translationResultStr");
        this.__translationLanguageMap = new ObservedPropertyObject(new Object(), this, "translationLanguageMap");
        this.__baiduAiGeneralTranslationResult = new ObservedPropertyObject(undefined
        // @Provide('baidu_ai_dict_translation_result') baiduAiDictTranslationResult: BaiduAIDictTranslationResult = undefined
        , this, "baiduAiGeneralTranslationResult");
        this.addProvidedVar("baidu_ai_general_translation_result", this.__baiduAiGeneralTranslationResult, false);
        this.addProvidedVar("baiduAiGeneralTranslationResult", this.__baiduAiGeneralTranslationResult, false);
        this.__baiduAiDictTranslationResult = new ObservedPropertyObject(undefined
        //计时器实现停止输入立即翻译
        , this, "baiduAiDictTranslationResult");
        this.queryTimer = 0;
        this.selectLanguageDialogController = undefined;
        this.context = getContext(this) as common.UIAbilityContext;
        this.updateWithValueParams(params);
        this.declareWatch("translationApiType", this.onApiChange);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.translation !== undefined) {
            this.translation = params.translation;
        }
        if (params.inputContent !== undefined) {
            this.inputContent = params.inputContent;
        }
        if (params.changeFromLanguageType !== undefined) {
            this.changeFromLanguageType = params.changeFromLanguageType;
        }
        if (params.changeToLanguageType !== undefined) {
            this.changeToLanguageType = params.changeToLanguageType;
        }
        if (params.translationResultStr !== undefined) {
            this.translationResultStr = params.translationResultStr;
        }
        if (params.translationLanguageMap !== undefined) {
            this.translationLanguageMap = params.translationLanguageMap;
        }
        if (params.baiduAiGeneralTranslationResult !== undefined) {
            this.baiduAiGeneralTranslationResult = params.baiduAiGeneralTranslationResult;
        }
        if (params.baiduAiDictTranslationResult !== undefined) {
            this.baiduAiDictTranslationResult = params.baiduAiDictTranslationResult;
        }
        if (params.queryTimer !== undefined) {
            this.queryTimer = params.queryTimer;
        }
        if (params.selectLanguageDialogController !== undefined) {
            this.selectLanguageDialogController = params.selectLanguageDialogController;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        this.__translationApiType.aboutToBeDeleted();
        this.__sourceLanguage.aboutToBeDeleted();
        this.__targetLanguage.aboutToBeDeleted();
        this.__baiduToken.aboutToBeDeleted();
        this.__translation.aboutToBeDeleted();
        this.__inputContent.aboutToBeDeleted();
        this.__changeFromLanguageType.aboutToBeDeleted();
        this.__changeToLanguageType.aboutToBeDeleted();
        this.__translationResultStr.aboutToBeDeleted();
        this.__translationLanguageMap.aboutToBeDeleted();
        this.__baiduAiGeneralTranslationResult.aboutToBeDeleted();
        this.__baiduAiDictTranslationResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __translationApiType: ObservedPropertyAbstract<string>;
    get translationApiType() {
        return this.__translationApiType.get();
    }
    set translationApiType(newValue: string) {
        this.__translationApiType.set(newValue);
    }
    private __sourceLanguage: ObservedPropertyAbstract<TranslateLanguage>;
    get sourceLanguage() {
        return this.__sourceLanguage.get();
    }
    set sourceLanguage(newValue: TranslateLanguage) {
        this.__sourceLanguage.set(newValue);
    }
    private __targetLanguage: ObservedPropertyAbstract<TranslateLanguage>;
    get targetLanguage() {
        return this.__targetLanguage.get();
    }
    set targetLanguage(newValue: TranslateLanguage) {
        this.__targetLanguage.set(newValue);
    }
    private __baiduToken: ObservedPropertyAbstract<BaiduToken>;
    get baiduToken() {
        return this.__baiduToken.get();
    }
    set baiduToken(newValue: BaiduToken) {
        this.__baiduToken.set(newValue);
    }
    private __translation: ObservedPropertyObject<TranslationResult>;
    get translation() {
        return this.__translation.get();
    }
    set translation(newValue: TranslationResult) {
        this.__translation.set(newValue);
    }
    private __inputContent: ObservedPropertySimple<string>;
    get inputContent() {
        return this.__inputContent.get();
    }
    set inputContent(newValue: string) {
        this.__inputContent.set(newValue);
    }
    private __changeFromLanguageType: ObservedPropertySimple<boolean>;
    get changeFromLanguageType() {
        return this.__changeFromLanguageType.get();
    }
    set changeFromLanguageType(newValue: boolean) {
        this.__changeFromLanguageType.set(newValue);
    }
    private __changeToLanguageType: ObservedPropertySimple<boolean>;
    get changeToLanguageType() {
        return this.__changeToLanguageType.get();
    }
    set changeToLanguageType(newValue: boolean) {
        this.__changeToLanguageType.set(newValue);
    }
    private __translationResultStr: ObservedPropertySimple<string>;
    get translationResultStr() {
        return this.__translationResultStr.get();
    }
    set translationResultStr(newValue: string) {
        this.__translationResultStr.set(newValue);
    }
    //选择语言弹窗中的列表，需要根据选择的翻译api从rawFile中读取
    private __translationLanguageMap: ObservedPropertyObject<Object>;
    get translationLanguageMap() {
        return this.__translationLanguageMap.get();
    }
    set translationLanguageMap(newValue: Object) {
        this.__translationLanguageMap.set(newValue);
    }
    //百度机器通用文本翻译
    private __baiduAiGeneralTranslationResult: ObservedPropertyObject<BaiduAIGeneralTranslationResult>;
    get baiduAiGeneralTranslationResult() {
        return this.__baiduAiGeneralTranslationResult.get();
    }
    set baiduAiGeneralTranslationResult(newValue: BaiduAIGeneralTranslationResult) {
        this.__baiduAiGeneralTranslationResult.set(newValue);
    }
    // @Provide('baidu_ai_dict_translation_result') baiduAiDictTranslationResult: BaiduAIDictTranslationResult = undefined
    private __baiduAiDictTranslationResult: ObservedPropertyObject<BaiduAIDictTranslationResult>;
    get baiduAiDictTranslationResult() {
        return this.__baiduAiDictTranslationResult.get();
    }
    set baiduAiDictTranslationResult(newValue: BaiduAIDictTranslationResult) {
        this.__baiduAiDictTranslationResult.set(newValue);
    }
    //计时器实现停止输入立即翻译
    private queryTimer: number;
    private selectLanguageDialogController: CustomDialogController;
    private context;
    onApiChange(propName: string): void {
        console.error("translationApiType change-->" + propName);
        this.init();
    }
    private init(): void {
        let rawFileName = 'baidu_general_lang.json';
        if (this.translationApiType == TranslationAPI.BAIDU_GENERAL) {
            console.error("应该从 百度通用翻译语种文件中读取");
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL) {
            rawFileName = 'baidu_ai_general_lang.json';
            console.error("应该从 百度机器翻译语种文件中读取");
        }
        this.context.resourceManager.getRawFileContent(rawFileName, (error, value) => {
            if (error) {
                prompt.showToast({ message: "读取出错" + JSON.stringify(error) });
                console.error("读取出错" + JSON.stringify(error));
            }
            else {
                const rawString: string = buffer.from(value).toString('utf-8');
                console.error("读取成功" + rawString);
                this.translationLanguageMap = JSON.parse(rawString);
                //因为StorageLink获取到的数据只能是string类型，这里转一下
                if (typeof this.sourceLanguage === 'string') {
                    this.sourceLanguage = JSON.parse(this.sourceLanguage as string);
                }
                if (typeof this.targetLanguage === 'string') {
                    this.targetLanguage = JSON.parse(this.targetLanguage as string);
                }
                //如果切换了api，语言对应的code会变，这里处理一下;但每个语言的中文名字不尽相同
                this.sourceLanguage.code = this.translationLanguageMap[this.sourceLanguage.name];
                this.targetLanguage.code = this.translationLanguageMap[this.targetLanguage.name];
            }
        });
        if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL || this.translationApiType == TranslationAPI.BAIDU_AI_DICT) {
            this.checkBaiduToken(undefined);
        }
    }
    private checkBaiduToken(onCheckDone: (success: boolean) => void) {
        if (typeof this.baiduToken === 'string') {
            this.baiduToken = JSON.parse(this.baiduToken);
        }
        let currentTime = Date.now();
        //判断 token 是否可用
        let needReacquire = false;
        if (this.baiduToken.access_token == undefined || this.baiduToken.access_token.length == 0) {
            needReacquire = true;
        }
        if (this.baiduToken.expires_date < currentTime) {
            needReacquire = true;
            console.error("baidu token 已过期");
        }
        if (needReacquire) {
            BaiduHttpUtil.getAccessToken((error, data) => {
                if (error) {
                    console.error("获取百度token出错-->" + JSON.stringify(error));
                    let tmp: BaiduToken = new BaiduToken();
                    tmp.error = '获取百度token出错';
                    tmp.error_description = JSON.stringify(error);
                    this.baiduToken = tmp;
                    if (onCheckDone) {
                        onCheckDone(false);
                    }
                }
                else {
                    let tmp: BaiduToken = new BaiduToken();
                    tmp.access_token = data.access_token;
                    tmp.expires_in = data.expires_in;
                    tmp.expires_date = Date.now() + (data.expires_in * 1000);
                    tmp.error = null;
                    tmp.error_description = null;
                    this.baiduToken = tmp;
                    if (onCheckDone) {
                        onCheckDone(true);
                    }
                }
            });
        }
        else {
            if (onCheckDone) {
                onCheckDone(true);
            }
            console.error("baidu token 正常");
        }
    }
    aboutToAppear() {
        this.translation = new TranslationResult();
        //初始化翻译语种
        this.init();
    }
    aboutToDisappear() {
        delete this.selectLanguageDialogController, // 删除dialogController
            this.selectLanguageDialogController = undefined; // 将dialogController置空
    }
    onSelectLanguage(selectLanguage: TranslateLanguage) {
        if (this.changeFromLanguageType) {
            this.sourceLanguage = selectLanguage;
        }
        else if (this.changeToLanguageType) {
            this.targetLanguage = selectLanguage;
        }
        prompt.showToast({ message: "选择的语言--> " + selectLanguage.name + ",code-->" + selectLanguage.code });
    }
    private startTranslation() {
        if (!this.inputContent || this.inputContent.length == 0) {
            return;
        }
        if (this.translationApiType == TranslationAPI.BAIDU_GENERAL) {
            this.startTranslateByBaiduGeneralApi();
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL) {
            this.startTranslationByBaiduAIGeneral();
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_DICT) {
            this.startTranslationByBaiduAIDict();
        }
        else if (this.translationApiType == TranslationAPI.YOUDAO_GENERAL) {
            //todo
        }
    }
    private startTranslateByBaiduGeneralApi() {
        BaiduHttpUtil.translateByTextGeneral(this.inputContent, (result) => {
            this.translationResultStr = JSON.parse(result)['trans_result'][0]['dst'];
        });
    }
    private startTranslationByBaiduAIGeneral() {
        this.checkBaiduToken((success) => {
            if (success) {
                BaiduHttpUtil.translateByAIGeneral(this.inputContent, this.baiduToken.access_token, (result) => {
                    this.baiduAiGeneralTranslationResult = result;
                });
            }
            else {
                prompt.showToast({ message: '获取百度机器翻译token出错' });
            }
        });
    }
    private startTranslationByBaiduAIDict() {
        this.checkBaiduToken((success) => {
            if (success) {
                BaiduHttpUtil.translateByAIDict(this.inputContent, this.baiduToken.access_token, (result) => {
                    this.baiduAiDictTranslationResult = result;
                });
            }
            else {
                prompt.showToast({ message: '获取百度机器翻译token出错' });
            }
        });
    }
    buildTranslationResult(parent = null) {
        If.create();
        if (this.translationApiType == TranslationAPI.BAIDU_GENERAL) {
            If.branchId(0);
            Text.create(this.translationResultStr);
            Text.layoutWeight(1);
            Text.pop();
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_GENERAL) {
            If.branchId(1);
            __Common__.create();
            __Common__.layoutWeight(1);
            let earlierCreatedChild_2: BaiduAIGeneralTranslationResultView = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as BaiduAIGeneralTranslationResultView : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new BaiduAIGeneralTranslationResultView("Index_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
            __Common__.pop();
        }
        else if (this.translationApiType == TranslationAPI.BAIDU_AI_DICT) {
            If.branchId(2);
            __Common__.create();
            __Common__.layoutWeight(1);
            let earlierCreatedChild_3: BaiduAIDictTranslationResultView = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as BaiduAIDictTranslationResultView : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new BaiduAIDictTranslationResultView("Index_" + __generate__Id, parent ? parent : this, { result: this.__baiduAiDictTranslationResult }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
            __Common__.pop();
        }
        else if (this.translationApiType == TranslationAPI.YOUDAO_GENERAL) {
            If.branchId(3);
        }
        else {
            If.branchId(4);
            __Common__.create();
            __Common__.layoutWeight(1);
            let earlierCreatedChild_4: TranslationResultView = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as TranslationResultView : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new TranslationResultView("Index_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({});
                View.create(earlierCreatedChild_4);
            }
            __Common__.pop();
        }
        If.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ top: 48 });
        Column.justifyContent(FlexAlign.Start);
        Column.layoutWeight(1);
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: $r('app.string.text_to_be_translated') });
        TextInput.layoutWeight(1);
        TextInput.margin(10);
        TextInput.padding(10);
        TextInput.backgroundColor(0xE5E5E5);
        TextInput.borderRadius(10);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value) => {
            this.inputContent = value;
            console.log('上次timer id ——>' + this.queryTimer);
            if (this.queryTimer != 0) {
                clearTimeout(this.queryTimer);
            }
            this.queryTimer = setTimeout(this.startTranslation.bind(this), 500);
        });
        TextInput.enterKeyType(EnterKeyType.Done);
        TextInput.onSubmit(() => {
            this.startTranslation();
        });
        Image.create($r('app.media.setting'));
        Image.width(24);
        Image.height(24);
        Image.margin(15);
        Image.onClick(() => {
            router.pushUrl({ url: 'pages/SettingsPage' });
        });
        Flex.pop();
        Stack.create({ alignContent: Alignment.End });
        Stack.width('100%');
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('100%');
        Text.create(this.sourceLanguage.name);
        Text.margin(10);
        Text.width('40%');
        Text.onClick(() => {
            this.changeFromLanguageType = true;
            this.changeToLanguageType = false;
            if (this.selectLanguageDialogController == undefined) {
                this.selectLanguageDialogController = new CustomDialogController({
                    builder: () => {
                        let jsDialog = new SelectLanguageDialog("5", this, {
                            confirm: this.onSelectLanguage.bind(this),
                            languageMap: this.translationLanguageMap,
                            selectFromLang: this.changeFromLanguageType
                        });
                        jsDialog.setController(this.selectLanguageDialogController);
                        View.create(jsDialog);
                    },
                    autoCancel: true,
                    customStyle: true
                }, this);
            }
            this.selectLanguageDialogController.open();
        });
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Image.create($r("app.media.switch_language_positions"));
        Image.width(23);
        Image.height(20);
        Image.onClick(() => {
            [this.targetLanguage, this.sourceLanguage] = [this.sourceLanguage, this.targetLanguage];
        });
        Text.create(this.targetLanguage.name);
        Text.margin(10);
        Text.width('40%');
        Text.onClick(() => {
            this.changeFromLanguageType = false;
            this.changeToLanguageType = true;
            if (this.selectLanguageDialogController == undefined) {
                this.selectLanguageDialogController = new CustomDialogController({
                    builder: () => {
                        let jsDialog = new SelectLanguageDialog("6", this, {
                            confirm: this.onSelectLanguage.bind(this),
                            languageMap: this.translationLanguageMap,
                            selectFromLang: this.changeFromLanguageType
                        });
                        jsDialog.setController(this.selectLanguageDialogController);
                        View.create(jsDialog);
                    },
                    autoCancel: true,
                    customStyle: true
                }, this);
            }
            this.selectLanguageDialogController.open();
        });
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        Stack.pop();
        this.buildTranslationResult(this);
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
