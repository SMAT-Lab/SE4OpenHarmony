interface BaiduAIDictTranslationResultView_Params {
    result?: BaiduAIDictTranslationResult;
    playSrcTTSAnimatorState?: AnimationStatus;
    playDstTTSAnimatorState?: AnimationStatus;
    avPlayerHelper?: AVPlayerHelper;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BaiduAIDictTranslationResultView_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
import { BaiduAIDictSimpleMeans, BaiduAIDictTranslationResult, MeansInSimple, ZDictDetailMeans, ZDictDetailIdiom, BaiduAIDictSimpleMeansForEng, PartsForEngInSymbols } from '../model/TranslateResult';
import { AVPlayerHelper } from '../util/AVPlayerHelper';
export default class BaiduAIDictTranslationResultView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertyObjectTwoWay(params.result, this, "result");
        this.__playSrcTTSAnimatorState = new ObservedPropertySimple(AnimationStatus.Initial, this, "playSrcTTSAnimatorState");
        this.__playDstTTSAnimatorState = new ObservedPropertySimple(AnimationStatus.Initial, this, "playDstTTSAnimatorState");
        this.avPlayerHelper = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BaiduAIDictTranslationResultView_Params) {
        if (params.playSrcTTSAnimatorState !== undefined) {
            this.playSrcTTSAnimatorState = params.playSrcTTSAnimatorState;
        }
        if (params.playDstTTSAnimatorState !== undefined) {
            this.playDstTTSAnimatorState = params.playDstTTSAnimatorState;
        }
        if (params.avPlayerHelper !== undefined) {
            this.avPlayerHelper = params.avPlayerHelper;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__playSrcTTSAnimatorState.aboutToBeDeleted();
        this.__playDstTTSAnimatorState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleOneWay<BaiduAIDictTranslationResult>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: BaiduAIDictTranslationResult) {
        this.__result.set(newValue);
    }
    private __playSrcTTSAnimatorState: ObservedPropertySimple<AnimationStatus>;
    get playSrcTTSAnimatorState() {
        return this.__playSrcTTSAnimatorState.get();
    }
    set playSrcTTSAnimatorState(newValue: AnimationStatus) {
        this.__playSrcTTSAnimatorState.set(newValue);
    }
    private __playDstTTSAnimatorState: ObservedPropertySimple<AnimationStatus>;
    get playDstTTSAnimatorState() {
        return this.__playDstTTSAnimatorState.get();
    }
    set playDstTTSAnimatorState(newValue: AnimationStatus) {
        this.__playDstTTSAnimatorState.set(newValue);
    }
    private avPlayerHelper: AVPlayerHelper;
    aboutToAppear() {
        this.avPlayerHelper = AVPlayerHelper.instance;
    }
    /**
     * 注意，默认按值传递。当传递的参数为状态变量时，状态变量的改变不会引起@Builder方法内的UI刷新
     * 这里需要引用传递
     * @param simpleMeans
     */
    buildSimpleMeans($$: {
        simpleMeans: BaiduAIDictSimpleMeans;
    }, parent = null): void {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.alignItems(HorizontalAlign.Start);
        Column.margin(10);
        Column.borderRadius(6);
        Column.backgroundColor(Color.White);
        If.create();
        if ($$.simpleMeans?.from) {
            If.branchId(0);
            Text.create();
            Text.fontSize(16);
            Span.create('来源');
            Span.fontSize(16);
            Span.fontColor(Color.Black);
            Span.create($$.simpleMeans?.from);
            Span.fontSize(18);
            Span.fontColor(Color.Red);
            Span.margin({ left: 10 });
            Text.pop();
        }
        If.pop();
        If.create();
        if ($$.simpleMeans?.word_symbol && $$.simpleMeans?.word_symbol.length > 0) {
            If.branchId(0);
            Text.create();
            Text.fontSize(16);
            Span.create('读音');
            Span.fontSize(16);
            Span.fontColor(Color.Black);
            Span.create($$.simpleMeans?.word_symbol);
            Span.fontSize(18);
            Span.fontColor(Color.Red);
            Span.margin({ left: 10 });
            Text.pop();
        }
        If.pop();
        If.create();
        if ($$.simpleMeans?.means) {
            If.branchId(0);
            Flex.create({ wrap: FlexWrap.Wrap });
            ForEach.create("2", this, ObservedObject.GetRawObject($$.simpleMeans?.means), (means: MeansInSimple) => {
                Row.create();
                Row.padding({ top: 4, bottom: 4, left: 15, right: 15 });
                Row.borderRadius(10);
                Row.margin(10);
                Row.borderWidth(1);
                Row.borderColor(0x333333);
                Row.onClick(() => {
                    if (means?.means) {
                        let message = '';
                        means?.means?.forEach((value) => {
                            message += value;
                            message += "\n";
                        });
                        promptAction.showDialog({ title: "简明释义", message: message });
                    }
                    else {
                        promptAction.showToast({ message: '没有英文释义' });
                    }
                });
                If.create();
                if (means?.part && means.part.length > 0) {
                    If.branchId(0);
                    Text.create(means?.part);
                    Text.fontStyle(FontStyle.Italic);
                    Text.pop();
                }
                If.pop();
                Text.create(means?.text);
                Text.fontSize(16);
                Text.textAlign(TextAlign.Center);
                Text.fontColor(Color.White);
                Text.margin({ left: 4 });
                Text.fontColor(0x666666);
                Text.pop();
                Row.pop();
            });
            ForEach.pop();
            Flex.pop();
        }
        If.pop();
        Column.pop();
    }
    buildZDictDetailMeans($$: {
        means: ZDictDetailMeans[];
    }, parent = null): void {
        If.create();
        if ($$.means && $$.means?.length > 0) {
            If.branchId(0);
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin(10);
            Column.borderRadius(6);
            Column.backgroundColor(Color.White);
            ForEach.create("3", this, ObservedObject.GetRawObject($$.means), (value: ZDictDetailMeans) => {
                Column.create();
                Column.margin(4);
                Column.alignItems(HorizontalAlign.Start);
                Row.create();
                Text.create();
                Span.create("释义");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create(value.main);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
                Row.pop();
                Row.create();
                Text.create();
                Span.create("举例");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create(value.sub[0]);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
                Row.pop();
                Column.pop();
            });
            ForEach.pop();
            Column.pop();
        }
        If.pop();
    }
    buildZDictSimple($$: {
        means: ZDictDetailMeans[];
    }, parent = null) {
        If.create();
        if ($$.means && $$.means?.length > 0) {
            If.branchId(0);
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin(10);
            Column.borderRadius(6);
            Column.backgroundColor(Color.White);
            ForEach.create("4", this, ObservedObject.GetRawObject($$.means), (value: ZDictDetailMeans) => {
                Row.create();
                Text.create();
                Span.create("释义");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create(value.main);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
                Row.pop();
            });
            ForEach.pop();
            Column.pop();
        }
        If.pop();
    }
    buildZDictIdiom($$: {
        idiom: ZDictDetailIdiom;
    }, parent = null): void {
        If.create();
        if ($$.idiom) {
            If.branchId(0);
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin(10);
            Column.borderRadius(6);
            Column.backgroundColor(Color.White);
            Row.create();
            If.create();
            if ($$.idiom?.pinyin) {
                If.branchId(0);
                Text.create();
                Span.create("拼音：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.pinyin);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.create();
            If.create();
            if ($$.idiom?.synonyms) {
                If.branchId(0);
                Text.create();
                Span.create("同义词：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.synonyms);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.create();
            If.create();
            if ($$.idiom?.antonym) {
                If.branchId(0);
                Text.create();
                Span.create("反义词：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.antonym);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.create();
            If.create();
            if ($$.idiom?.example) {
                If.branchId(0);
                Text.create();
                Span.create("示例：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.example);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.create();
            If.create();
            if ($$.idiom?.explain) {
                If.branchId(0);
                Text.create();
                Span.create("释义：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.explain);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.create();
            If.create();
            if ($$.idiom?.from) {
                If.branchId(0);
                Text.create();
                Span.create("来源：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.from);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.create();
            If.create();
            if ($$.idiom?.grammer) {
                If.branchId(0);
                Text.create();
                Span.create("语法：");
                Span.fontColor(Color.Blue);
                Span.fontSize(18);
                Span.create($$.idiom?.grammer);
                Span.fontColor("#333333");
                Span.fontSize(18);
                Span.margin({ left: 6 });
                Text.pop();
            }
            If.pop();
            Row.pop();
            Column.pop();
        }
        If.pop();
    }
    buildSimpleForEng($$: {
        simpleMeansForEng: BaiduAIDictSimpleMeansForEng;
    }, parent = null) {
        If.create();
        if ($$.simpleMeansForEng) {
            If.branchId(0);
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Text.create();
            Span.create("来源");
            Span.create($$.simpleMeansForEng?.from);
            Text.pop();
            If.create();
            if ($$.simpleMeansForEng?.symbols) {
                If.branchId(0);
                Row.create();
                If.create();
                if ($$.simpleMeansForEng?.symbols?.ph_en && $$.simpleMeansForEng?.symbols?.ph_en?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.backgroundColor(Color.White);
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Span.create("英");
                    Span.create($$.simpleMeansForEng?.symbols?.ph_en);
                    Text.pop();
                }
                If.pop();
                If.create();
                if ($$.simpleMeansForEng?.symbols?.ph_am && $$.simpleMeansForEng?.symbols?.ph_am?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.backgroundColor(Color.White);
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Span.create("美");
                    Span.create($$.simpleMeansForEng?.symbols?.ph_am);
                    Text.pop();
                }
                If.pop();
                Row.pop();
                If.create();
                if ($$.simpleMeansForEng?.symbols?.parts && $$.simpleMeansForEng?.symbols?.parts?.length > 0) {
                    If.branchId(0);
                    ForEach.create("5", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.symbols.parts), (part: PartsForEngInSymbols) => {
                        Row.create();
                        Row.alignItems(VerticalAlign.Top);
                        Row.backgroundColor(Color.White);
                        Row.borderRadius(4);
                        Row.padding(2);
                        Row.margin(4);
                        Text.create(part.part);
                        Text.pop();
                        Text.create(part.means.toString());
                        Text.pop();
                        Row.pop();
                    });
                    ForEach.pop();
                }
                If.pop();
            }
            If.pop();
            If.create();
            if ($$.simpleMeansForEng?.exchange) {
                If.branchId(0);
                Flex.create({ wrap: FlexWrap.Wrap });
                If.create();
                if ($$.simpleMeansForEng?.exchange?.word_third && $$.simpleMeansForEng?.exchange?.word_third?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Text.backgroundColor(Color.White);
                    Span.create("第三人称单数:");
                    ForEach.create("6", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.exchange?.word_third), (value: string) => {
                        If.create();
                        if (value && value.length > 0) {
                            If.branchId(0);
                            Span.create(value);
                            Span.fontColor(Color.Blue);
                        }
                        If.pop();
                    });
                    ForEach.pop();
                    Text.pop();
                }
                If.pop();
                If.create();
                if ($$.simpleMeansForEng?.exchange?.word_pl && $$.simpleMeansForEng?.exchange?.word_pl?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Text.backgroundColor(Color.White);
                    Span.create("复数:");
                    ForEach.create("7", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.exchange?.word_pl), (value: string) => {
                        If.create();
                        if (value && value.length > 0) {
                            If.branchId(0);
                            Span.create(value);
                            Span.fontColor(Color.Blue);
                        }
                        If.pop();
                    });
                    ForEach.pop();
                    Text.pop();
                }
                If.pop();
                If.create();
                if ($$.simpleMeansForEng?.exchange?.word_ing && $$.simpleMeansForEng?.exchange?.word_ing?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Text.backgroundColor(Color.White);
                    Span.create("现在分词:");
                    ForEach.create("8", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.exchange?.word_ing), (value: string) => {
                        If.create();
                        if (value && value.length > 0) {
                            If.branchId(0);
                            Span.create(value);
                            Span.fontColor(Color.Blue);
                        }
                        If.pop();
                    });
                    ForEach.pop();
                    Text.pop();
                }
                If.pop();
                If.create();
                if ($$.simpleMeansForEng?.exchange?.word_past && $$.simpleMeansForEng?.exchange?.word_past?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Text.backgroundColor(Color.White);
                    Span.create("过去式:");
                    ForEach.create("9", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.exchange?.word_past), (value: string) => {
                        If.create();
                        if (value && value.length > 0) {
                            If.branchId(0);
                            Span.create(value);
                            Span.fontColor(Color.Blue);
                        }
                        If.pop();
                    });
                    ForEach.pop();
                    Text.pop();
                }
                If.pop();
                If.create();
                if ($$.simpleMeansForEng?.exchange?.word_done && $$.simpleMeansForEng?.exchange?.word_done?.length > 0) {
                    If.branchId(0);
                    Text.create();
                    Text.padding(2);
                    Text.margin(4);
                    Text.borderRadius(4);
                    Text.backgroundColor(Color.White);
                    Span.create("过去分词:");
                    ForEach.create("10", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.exchange?.word_done), (value: string) => {
                        If.create();
                        if (value && value.length > 0) {
                            If.branchId(0);
                            Span.create(value);
                            Span.fontColor(Color.Blue);
                        }
                        If.pop();
                    });
                    ForEach.pop();
                    Text.pop();
                }
                If.pop();
                Flex.pop();
                Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
                ForEach.create("11", this, ObservedObject.GetRawObject($$.simpleMeansForEng?.tags), (tag) => {
                    Text.create(tag);
                    Text.backgroundColor(Color.White);
                    Text.borderRadius(2);
                    Text.margin(4);
                    Text.padding(2);
                    Text.pop();
                });
                ForEach.pop();
                Flex.pop();
            }
            If.pop();
            Column.pop();
        }
        If.pop();
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.alignItems(HorizontalAlign.Center);
        Column.height('100%');
        If.create();
        if (this.result) {
            If.branchId(0);
            If.create();
            if (this.result.errorMessage && this.result.errorMessage.length > 0) {
                If.branchId(0);
                Text.create(JSON.stringify(ObservedObject.GetRawObject(this.result)));
                Text.pop();
            }
            else {
                If.branchId(1);
                Column.create();
                Column.margin({ left: 15, right: 15, top: 20 });
                Column.padding(10);
                Column.backgroundColor(0XEEEEEE);
                Column.backdropBlur(10);
                Column.width('100%');
                Column.alignItems(HorizontalAlign.Start);
                Column.borderRadius(4);
                Row.create();
                Row.width('100%');
                Row.justifyContent(FlexAlign.Start);
                Text.create(this.result.result.dst);
                Text.fontSize(26);
                Text.pop();
                ImageAnimator.create();
                ImageAnimator.margin(10);
                ImageAnimator.images([
                    { src: $r('app.media.voice1'), width: 24, height: 24 },
                    { src: $r('app.media.voice2'), width: 24, height: 24 },
                    { src: $r('app.media.voice3'), width: 24, height: 24 },
                ]);
                ImageAnimator.duration(600);
                ImageAnimator.state(this.playDstTTSAnimatorState);
                ImageAnimator.onClick(() => {
                    this.avPlayerHelper.playWithUrl(this.result.result.dst_tts, (state: string) => {
                        switch (state) {
                            case 'playing':
                                console.error('dst state playing called');
                                this.playDstTTSAnimatorState = AnimationStatus.Running;
                                break;
                            case 'paused':
                                console.error('dst state paused called');
                                this.playDstTTSAnimatorState = AnimationStatus.Paused;
                                break;
                            case 'completed':
                                console.error('dst state completed called');
                                this.playDstTTSAnimatorState = AnimationStatus.Stopped;
                                break;
                            case 'stopped':
                                console.error('dst state stopped called');
                                this.playDstTTSAnimatorState = AnimationStatus.Stopped;
                                break;
                        }
                    });
                });
                ImageAnimator.fillMode(FillMode.None);
                ImageAnimator.reverse(true);
                ImageAnimator.iterations(-1);
                ImageAnimator.width(24);
                ImageAnimator.height(24);
                Row.pop();
                Row.create();
                Row.width('100%');
                Row.justifyContent(FlexAlign.Start);
                Row.margin({ top: 10 });
                Text.create(this.result.result.src);
                Text.fontSize(22);
                Text.pop();
                ImageAnimator.create();
                ImageAnimator.margin(10);
                ImageAnimator.images([
                    { src: $r('app.media.voice1'), width: 24, height: 24 },
                    { src: $r('app.media.voice2'), width: 24, height: 24 },
                    { src: $r('app.media.voice3'), width: 24, height: 24 },
                ]);
                ImageAnimator.duration(1000);
                ImageAnimator.state(this.playSrcTTSAnimatorState);
                ImageAnimator.onClick(() => {
                    this.avPlayerHelper.playWithUrl(this.result.result.src_tts, (state: string) => {
                        switch (state) {
                            case 'playing':
                                console.error('src state playing called');
                                this.playSrcTTSAnimatorState = AnimationStatus.Running;
                                break;
                            case 'paused':
                                console.error('src state paused called');
                                this.playSrcTTSAnimatorState = AnimationStatus.Paused;
                                break;
                            case 'completed':
                                console.error('src state completed called');
                                this.playSrcTTSAnimatorState = AnimationStatus.Stopped;
                                break;
                            case 'stopped':
                                console.error('src state stopped called');
                                this.playSrcTTSAnimatorState = AnimationStatus.Stopped;
                                break;
                        }
                    });
                });
                ImageAnimator.fillMode(FillMode.None);
                ImageAnimator.reverse(true);
                ImageAnimator.iterations(-1);
                ImageAnimator.width(24);
                ImageAnimator.height(24);
                Row.pop();
                this.buildSimpleMeans({ simpleMeans: this.result.result.dict?.simpleMeans }, this);
                this.buildZDictIdiom({ idiom: this.result.result.dict?.zDict?.detail?.idiom }, this);
                this.buildZDictDetailMeans({ means: this.result.result.dict?.zDict?.detail?.means }, this);
                this.buildZDictSimple({ means: this.result.result.dict?.zDict?.simple?.means }, this);
                this.buildSimpleForEng({ simpleMeansForEng: this.result.result.dict?.simpleMeansForEng }, this);
                Column.pop();
            }
            If.pop();
        }
        If.pop();
        Column.pop();
    }
}
