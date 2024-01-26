interface TranslationResultView_Params {
    translationResult?: TranslationResult;
    avPlayerHelper?: AVPlayerHelper;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TranslationResultView_" + ++__generate__Id;
}
import { AVPlayerHelper } from '../util/AVPlayerHelper';
import { TranslationGroup, TranslationResult } from '../model/TranslateResult';
export class TranslationResultView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__translationResult = new ObservedPropertyObject(null, this, "translationResult");
        this.avPlayerHelper = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TranslationResultView_Params) {
        if (params.translationResult !== undefined) {
            this.translationResult = params.translationResult;
        }
        if (params.avPlayerHelper !== undefined) {
            this.avPlayerHelper = params.avPlayerHelper;
        }
    }
    aboutToBeDeleted() {
        this.__translationResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __translationResult: ObservedPropertyObject<TranslationResult>;
    get translationResult() {
        return this.__translationResult.get();
    }
    set translationResult(newValue: TranslationResult) {
        this.__translationResult.set(newValue);
    }
    private avPlayerHelper: AVPlayerHelper;
    aboutToAppear() {
        this.avPlayerHelper = AVPlayerHelper.instance;
    }
    itemHead(text: string, parent = null) {
        // 列表分组的头部组件，对应联系人分组A、B等位置的组件
        Text.create(text);
        // 列表分组的头部组件，对应联系人分组A、B等位置的组件
        Text.fontSize(20);
        // 列表分组的头部组件，对应联系人分组A、B等位置的组件
        Text.backgroundColor('#fff1f3f5');
        // 列表分组的头部组件，对应联系人分组A、B等位置的组件
        Text.width('100%');
        // 列表分组的头部组件，对应联系人分组A、B等位置的组件
        Text.padding(5);
        // 列表分组的头部组件，对应联系人分组A、B等位置的组件
        Text.pop();
    }
    render() {
        If.create();
        if (this.translationResult) {
            If.branchId(0);
            List.create();
            ForEach.create("3", this, ObservedObject.GetRawObject(this.translationResult.translations), (translation: TranslationGroup) => {
                ListItemGroup.create({ header: this.itemHead.bind(this, translation.apiName) });
                If.create();
                if (translation.error) {
                    If.branchId(0);
                    ListItem.create();
                    Text.create(translation.error);
                    Text.pop();
                    ListItem.pop();
                }
                else {
                    If.branchId(1);
                    ForEach.create("2", this, ObservedObject.GetRawObject(translation.dst), (dst: string) => {
                        ListItem.create();
                        Row.create();
                        Text.create(dst);
                        Text.padding(10);
                        Text.margin(10);
                        Text.backgroundColor(0XAAAAAA);
                        Text.fontColor(Color.Black);
                        Text.pop();
                        Text.create('播放');
                        Text.padding(10);
                        Text.margin(10);
                        Text.backgroundColor(0XAAAAAA);
                        Text.fontColor(Color.Black);
                        Text.onClick(() => {
                            //todo 请求语音合成
                        });
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    });
                    ForEach.pop();
                }
                If.pop();
                ListItemGroup.pop();
            });
            ForEach.pop();
            List.pop();
        }
        If.pop();
    }
}
