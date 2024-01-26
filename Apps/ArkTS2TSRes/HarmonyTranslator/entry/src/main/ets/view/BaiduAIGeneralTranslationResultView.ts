interface BaiduAIGeneralTranslationResultView_Params {
    translationResult?: BaiduAIGeneralTranslationResult;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BaiduAIGeneralTranslationResultView_" + ++__generate__Id;
}
import { BaiduAIGeneralTranslationResult } from '../model/TranslateResult';
export class BaiduAIGeneralTranslationResultView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__translationResult = this.initializeConsume('baidu_ai_general_translation_result', "translationResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BaiduAIGeneralTranslationResultView_Params) {
    }
    aboutToBeDeleted() {
        this.__translationResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __translationResult: SynchedPropertySimpleOneWay<BaiduAIGeneralTranslationResult>;
    get translationResult() {
        return this.__translationResult.get();
    }
    set translationResult(newValue: BaiduAIGeneralTranslationResult) {
        this.__translationResult.set(newValue);
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Column.height('100%');
        If.create();
        if (this.translationResult.errorMessage && this.translationResult.errorMessage.length > 0) {
            If.branchId(0);
            Text.create(JSON.stringify(ObservedObject.GetRawObject(this.translationResult)));
            Text.pop();
        }
        else {
            If.branchId(1);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.translationResult.result), ({ dst, src }) => {
                Text.create(`${src} : ${dst}`);
                Text.fontSize(24);
                Text.pop();
            });
            ForEach.pop();
        }
        If.pop();
        Column.pop();
    }
}
