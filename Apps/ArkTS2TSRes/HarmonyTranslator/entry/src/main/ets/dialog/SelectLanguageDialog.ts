interface SelectLanguageDialog_Params {
    translateFrom?: TranslateLanguage;
    translateTo?: TranslateLanguage;
    controller?: CustomDialogController;
    confirm?: (selectLanguage: TranslateLanguage) => void;
    languageMap?: Object;
    dataForShow?: LanguageGroup[];
    selectFromLang?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectLanguageDialog_" + ++__generate__Id;
}
import { LanguageGroup, TranslateLanguage } from '../model/TranslateResult';
class SelectLanguageDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__translateFrom = AppStorage.SetAndLink('translate_from_name', new TranslateLanguage('中文', 'zh'), this, "translateFrom");
        this.__translateTo = AppStorage.SetAndLink('translate_to_name', new TranslateLanguage('英文', 'en'), this, "translateTo");
        this.controller = undefined;
        this.confirm = undefined;
        this.languageMap = undefined;
        this.dataForShow = [];
        this.__selectFromLang = new SynchedPropertySimpleOneWay(params.selectFromLang, this, "selectFromLang");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectLanguageDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.languageMap !== undefined) {
            this.languageMap = params.languageMap;
        }
        if (params.dataForShow !== undefined) {
            this.dataForShow = params.dataForShow;
        }
        this.selectFromLang = params.selectFromLang;
    }
    aboutToBeDeleted() {
        this.__translateFrom.aboutToBeDeleted();
        this.__translateTo.aboutToBeDeleted();
        this.__selectFromLang.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __translateFrom: ObservedPropertyAbstract<TranslateLanguage>;
    get translateFrom() {
        return this.__translateFrom.get();
    }
    set translateFrom(newValue: TranslateLanguage) {
        this.__translateFrom.set(newValue);
    }
    private __translateTo: ObservedPropertyAbstract<TranslateLanguage>;
    get translateTo() {
        return this.__translateTo.get();
    }
    set translateTo(newValue: TranslateLanguage) {
        this.__translateTo.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: (selectLanguage: TranslateLanguage) => void;
    private languageMap: Object;
    private dataForShow: LanguageGroup[];
    private __selectFromLang: SynchedPropertySimpleOneWay<boolean>;
    get selectFromLang() {
        return this.__selectFromLang.get();
    }
    set selectFromLang(newValue: boolean) {
        this.__selectFromLang.set(newValue);
    }
    objectToList(obj: {
        [key: string]: any;
    }): TranslateLanguage[] {
        const result: TranslateLanguage[] = [];
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (this.selectFromLang) {
                    if (key != this.translateFrom.name) {
                        result.push(new TranslateLanguage(key, obj[key]));
                    }
                }
                else {
                    if (key != this.translateTo.name) {
                        result.push(new TranslateLanguage(key, obj[key]));
                    }
                }
            }
        }
        return result;
    }
    aboutToAppear() {
        console.error("SelectLanguageDialog aboutToAppear -->" + this.translateFrom.name);
        const allLanguage: TranslateLanguage[] = this.objectToList(this.languageMap);
        const oftenLang: TranslateLanguage[] = [];
        allLanguage.forEach(element => {
            if (oftenLang.length < 6) {
                if (this.selectFromLang) {
                    if (element.name != this.translateFrom.name) {
                        oftenLang.push(element);
                    }
                }
                else {
                    if (element.name != this.translateTo.name && !element.name.includes("自动") && !!element.name.includes("检测")) {
                        oftenLang.push(element);
                    }
                }
            }
        });
        //粗暴的取前6个，没有对之前选择的做存储
        this.dataForShow.push(new LanguageGroup("常用", allLanguage.slice(0, 6)));
        this.dataForShow.push(new LanguageGroup("全部", allLanguage));
    }
    itemHead(text: string, parent = null) {
        Text.create(text);
        Text.fontSize(20);
        Text.width("100%");
        Text.backgroundColor(Color.White);
        Text.padding(10);
        Text.pop();
    }
    render() {
        List.create({ space: 20 });
        List.width('80%');
        List.height('60%');
        List.backgroundColor(Color.White);
        List.borderRadius(6);
        List.sticky(StickyStyle.Header);
        ListItemGroup.create({ header: this.itemHead.bind(this, this.dataForShow[0].groupName) });
        ListItem.create();
        Flex.create({ wrap: FlexWrap.Wrap });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.dataForShow[0].languages), (language: TranslateLanguage) => {
            Text.create(language.name);
            Text.padding({ top: 4, bottom: 4, left: 15, right: 15 });
            Text.fontSize(20);
            Text.textAlign(TextAlign.Center);
            Text.fontColor(Color.White);
            Text.borderRadius(10);
            Text.margin(10);
            Text.backgroundColor(0x39d167);
            Text.onClick(() => {
                if (this.confirm != undefined) {
                    this.confirm(language);
                }
                if (this.controller != undefined) {
                    this.controller.close();
                }
            });
            Text.pop();
        });
        ForEach.pop();
        Flex.pop();
        ListItem.pop();
        ListItemGroup.pop();
        ListItemGroup.create({ header: this.itemHead.bind(this, this.dataForShow[1].groupName) });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.dataForShow[1].languages), (language: TranslateLanguage) => {
            ListItem.create();
            Text.create(language.name);
            Text.width('30%');
            Text.padding({ top: 4, bottom: 4, left: 15, right: 15 });
            Text.fontSize(20);
            Text.textAlign(TextAlign.Center);
            Text.fontColor(Color.White);
            Text.borderRadius(10);
            Text.margin(10);
            Text.backgroundColor(0x39d167);
            Text.onClick(() => {
                if (this.confirm != undefined) {
                    this.confirm(language);
                }
                if (this.controller != undefined) {
                    this.controller.close();
                }
            });
            Text.pop();
            ListItem.pop();
        }, (language: TranslateLanguage) => {
            return language.code + this.dataForShow[1].groupName;
        });
        ForEach.pop();
        ListItemGroup.pop();
        List.pop();
    }
}
export default SelectLanguageDialog;
