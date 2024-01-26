interface DetectPresetEffect_Params {
    scroller?: Scroller;
    audioEffectInfoArray?: Array<number>;
    audioManager?: audio.AudioManager;
    audioStreamManager?: audio.AudioStreamManager;
    contentTypeOptions?: ModeType[];
    streamUsageOptions?: ModeType[];
    showSelector_1?: boolean;
    showSelector_2?: boolean;
    queryResult?: Resource;
    contentTypeIndex?: number;
    streamUsageIndex?: number;
}
interface ModeItem_2_Params {
    mode?: ModeType;
    streamUsageIndex?: number;
}
interface ModeItem_1_Params {
    mode?: ModeType;
    contentTypeIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PresetEffect_" + ++__generate__Id;
}
/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import audio from '@ohos.multimedia.audio';
import router from '@ohos.router';
export class ModeType {
    id: number;
    name: Resource;
    constructor(id: number, name: Resource) {
        this.id = id;
        this.name = name;
    }
}
class ModeItem_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mode = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
        this.__contentTypeIndex = this.initializeConsume("contentTypeIndex", "contentTypeIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ModeItem_1_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
    }
    aboutToBeDeleted() {
        this.__contentTypeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mode: ModeType;
    private __contentTypeIndex?: SynchedPropertySimpleTwoWay<number>;
    get contentTypeIndex() {
        return this.__contentTypeIndex.get();
    }
    set contentTypeIndex(newValue: number) {
        this.__contentTypeIndex.set(newValue);
    }
    renderModeItem(fontColor: string, bgColor: string, value: Resource, parent = null) {
        Flex.create();
        Flex.height(44);
        Flex.width(148);
        Flex.backgroundColor(bgColor);
        Flex.borderRadius(12);
        Flex.padding({ left: 14, top: 14, bottom: 14 });
        Text.create(value);
        Text.fontSize(16);
        Text.fontWeight(400);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.fontColor(fontColor);
        Text.pop();
        Flex.pop();
        If.create();
        if (this.mode.id !== 5) {
            If.branchId(0);
            Flex.create();
            Flex.padding({ left: 12, right: 12 });
            Flex.create();
            Flex.height(1);
            Flex.width('100%');
            Flex.backgroundColor('#F3F3F3');
            Flex.pop();
            Flex.pop();
        }
        If.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.height(48);
        Flex.width(156);
        If.create();
        if (this.contentTypeIndex === this.mode.id) {
            If.branchId(0);
            this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name, this);
        }
        else {
            If.branchId(1);
            this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name, this);
        }
        If.pop();
        Flex.pop();
    }
}
class ModeItem_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.mode = new ModeType(-1, $r('app.string.CONTENT_TYPE_UNKNOWN'));
        this.__streamUsageIndex = this.initializeConsume("streamUsageIndex", "streamUsageIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ModeItem_2_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
    }
    aboutToBeDeleted() {
        this.__streamUsageIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private mode: ModeType;
    private __streamUsageIndex?: SynchedPropertySimpleTwoWay<number>;
    get streamUsageIndex() {
        return this.__streamUsageIndex.get();
    }
    set streamUsageIndex(newValue: number) {
        this.__streamUsageIndex.set(newValue);
    }
    renderModeItem(fontColor: string, bgColor: string, value: Resource, parent = null) {
        Flex.create();
        Flex.height(44);
        Flex.width(148);
        Flex.backgroundColor(bgColor);
        Flex.borderRadius(12);
        Flex.padding({ left: 14, top: 14, bottom: 14 });
        Text.create(value);
        Text.fontSize(16);
        Text.fontColor(fontColor);
        Text.fontWeight(400);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        Flex.pop();
        If.create();
        if (this.mode.id !== 14) {
            If.branchId(0);
            Flex.create();
            Flex.padding({ left: 12, right: 12 });
            Flex.create();
            Flex.height(1);
            Flex.width('100%');
            Flex.backgroundColor('#F3F3F3');
            Flex.pop();
            Flex.pop();
        }
        If.pop();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.height(48);
        Flex.width(156);
        If.create();
        if (this.streamUsageIndex === this.mode.id) {
            If.branchId(0);
            this.renderModeItem('#007DFF', 'rgba(0,125,255,0.20)', this.mode.name, this);
        }
        else {
            If.branchId(1);
            this.renderModeItem('rgba(0,0,0,0.9)', '', this.mode.name, this);
        }
        If.pop();
        Flex.pop();
    }
}
class DetectPresetEffect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.audioEffectInfoArray = [1];
        this.audioManager = undefined;
        this.audioStreamManager = undefined;
        this.contentTypeOptions = [
            new ModeType(0, $r('app.string.CONTENT_TYPE_UNKNOWN')),
            new ModeType(1, $r('app.string.CONTENT_TYPE_SPEECH')),
            new ModeType(2, $r('app.string.CONTENT_TYPE_MUSIC')),
            new ModeType(3, $r('app.string.CONTENT_TYPE_MOVIE')),
            new ModeType(4, $r('app.string.CONTENT_TYPE_SONIFICATION')),
            new ModeType(5, $r('app.string.CONTENT_TYPE_RINGTONE'))
        ];
        this.streamUsageOptions = [
            new ModeType(0, $r('app.string.STREAM_USAGE_UNKNOWN')),
            new ModeType(1, $r('app.string.STREAM_USAGE_MUSIC')),
            new ModeType(2, $r('app.string.STREAM_USAGE_VOICE_COMMUNICATION')),
            new ModeType(3, $r('app.string.STREAM_USAGE_VOICE_ASSISTANT')),
            new ModeType(4, $r('app.string.STREAM_USAGE_ALARM')),
            new ModeType(5, $r('app.string.STREAM_USAGE_VOICE_MESSAGE')),
            new ModeType(6, $r('app.string.STREAM_USAGE_RINGTONE')),
            new ModeType(7, $r('app.string.STREAM_USAGE_NOTIFICATION')),
            new ModeType(8, $r('app.string.STREAM_USAGE_ACCESSIBILITY')),
            new ModeType(9, $r('app.string.STREAM_USAGE_MOVIE')),
            new ModeType(10, $r('app.string.STREAM_USAGE_GAME')),
            new ModeType(11, $r('app.string.STREAM_USAGE_AUDIOBOOK')),
            new ModeType(12, $r('app.string.STREAM_USAGE_NAVIGATION'))
        ];
        this.__showSelector_1 = new ObservedPropertySimple(false, this, "showSelector_1");
        this.__showSelector_2 = new ObservedPropertySimple(false, this, "showSelector_2");
        this.__queryResult = new ObservedPropertyObject($r('app.string.BLANK'), this, "queryResult");
        this.__contentTypeIndex = new ObservedPropertySimple(0, this, "contentTypeIndex");
        this.addProvidedVar("contentTypeIndex", this.__contentTypeIndex, false);
        this.__streamUsageIndex = new ObservedPropertySimple(0, this, "streamUsageIndex");
        this.addProvidedVar("streamUsageIndex", this.__streamUsageIndex, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DetectPresetEffect_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.audioEffectInfoArray !== undefined) {
            this.audioEffectInfoArray = params.audioEffectInfoArray;
        }
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
        if (params.audioStreamManager !== undefined) {
            this.audioStreamManager = params.audioStreamManager;
        }
        if (params.contentTypeOptions !== undefined) {
            this.contentTypeOptions = params.contentTypeOptions;
        }
        if (params.streamUsageOptions !== undefined) {
            this.streamUsageOptions = params.streamUsageOptions;
        }
        if (params.showSelector_1 !== undefined) {
            this.showSelector_1 = params.showSelector_1;
        }
        if (params.showSelector_2 !== undefined) {
            this.showSelector_2 = params.showSelector_2;
        }
        if (params.queryResult !== undefined) {
            this.queryResult = params.queryResult;
        }
        if (params.contentTypeIndex !== undefined) {
            this.contentTypeIndex = params.contentTypeIndex;
        }
        if (params.streamUsageIndex !== undefined) {
            this.streamUsageIndex = params.streamUsageIndex;
        }
    }
    aboutToBeDeleted() {
        this.__showSelector_1.aboutToBeDeleted();
        this.__showSelector_2.aboutToBeDeleted();
        this.__queryResult.aboutToBeDeleted();
        this.__contentTypeIndex.aboutToBeDeleted();
        this.__streamUsageIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private audioEffectInfoArray: Array<number>;
    private audioManager?: audio.AudioManager;
    private audioStreamManager?: audio.AudioStreamManager;
    private contentTypeOptions: ModeType[];
    private streamUsageOptions: ModeType[];
    private __showSelector_1: ObservedPropertySimple<boolean>;
    get showSelector_1() {
        return this.__showSelector_1.get();
    }
    set showSelector_1(newValue: boolean) {
        this.__showSelector_1.set(newValue);
    }
    private __showSelector_2: ObservedPropertySimple<boolean>;
    get showSelector_2() {
        return this.__showSelector_2.get();
    }
    set showSelector_2(newValue: boolean) {
        this.__showSelector_2.set(newValue);
    }
    private __queryResult: ObservedPropertyObject<Resource>;
    get queryResult() {
        return this.__queryResult.get();
    }
    set queryResult(newValue: Resource) {
        this.__queryResult.set(newValue);
    }
    private __contentTypeIndex: ObservedPropertySimple<number>;
    get contentTypeIndex() {
        return this.__contentTypeIndex.get();
    }
    set contentTypeIndex(newValue: number) {
        this.__contentTypeIndex.set(newValue);
    }
    private __streamUsageIndex: ObservedPropertySimple<number>;
    get streamUsageIndex() {
        return this.__streamUsageIndex.get();
    }
    set streamUsageIndex(newValue: number) {
        this.__streamUsageIndex.set(newValue);
    }
    mapContentIndexToType(index: number): number | undefined {
        // map the index of options to the content type in @ohos.multimedia.audio
        let index2Content = new Map([
            [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]
        ]);
        console.info("get content type:" + index2Content.get(index));
        return index2Content.get(index);
    }
    mapStreamIndexToUsage(index: number): number | undefined {
        // map the index of options to the stream usage in @ohos.multimedia.audio
        let index2Usage = new Map([
            [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
            [8, 8], [9, 10], [10, 11], [11, 12], [12, 13]
        ]);
        console.info("get stream usage:" + index2Usage.get(index));
        return index2Usage.get(index);
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.justifyContent(FlexAlign.SpaceBetween);
        Column.backgroundColor('#F1F3F5');
        Column.onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = false;
        });
        Column.create();
        Row.create();
        Navigation.create();
        Navigation.id('back_btn_preset');
        Navigation.height(56);
        Navigation.width(384);
        Navigation.hideBackButton(false);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.title($r('app.string.EffectManager'));
        Navigation.mode(NavigationMode.Stack);
        Navigation.backgroundColor('#F1F3F5');
        NavRouter.create();
        NavRouter.onStateChange(async (isActivated: boolean) => {
            console.info("hello");
            await router.pushUrl({ url: 'pages/Index' });
        });
        NavDestination.create();
        NavDestination.pop();
        NavRouter.pop();
        Navigation.pop();
        Row.pop();
        Row.create();
        Row.width(360);
        Row.zIndex(1);
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(40);
        Flex.width(140);
        Flex.backgroundColor('#F1F3F5');
        Flex.borderRadius(16);
        Flex.margin({ left: 37, right: 6 });
        Flex.padding({
            left: 16,
            right: 16
        });
        Flex.id('select_content_preset');
        Flex.onClick(() => {
            this.showSelector_1 = !this.showSelector_1;
            this.showSelector_2 = false;
        });
        Row.create();
        Text.create(this.contentTypeOptions[this.contentTypeIndex].name);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        If.create();
        if (this.showSelector_1) {
            If.branchId(0);
            Image.create($r('app.media.ic_arrow_up_small'));
            Image.height(7);
            Image.width(10);
            Image.margin({ left: 8 });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_arrow_down_small'));
            Image.height(7);
            Image.width(10);
            Image.margin({ left: 8 });
        }
        If.pop();
        Row.pop();
        Flex.pop();
        If.create();
        if (this.showSelector_1) {
            If.branchId(0);
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
            Flex.height(296);
            Flex.width(156);
            Flex.backgroundColor('#fff');
            Flex.borderRadius(16);
            Flex.shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' });
            Flex.padding({ left: 4, right: 4, top: 4, bottom: 4 });
            Flex.position({ x: 54, y: 40 });
            Flex.zIndex(1);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.contentTypeOptions), (item: ModeType) => {
                Flex.create();
                Flex.width(156);
                Flex.onClick(() => {
                    if (this.contentTypeIndex !== item.id) {
                        this.contentTypeIndex = item.id;
                        console.info('this.contentTypeIndex===' + this.contentTypeIndex);
                        this.queryResult = $r('app.string.BLANK');
                    }
                    this.showSelector_1 = false;
                });
                let earlierCreatedChild_2: ModeItem_1 = (this && this.findChildById) ? this.findChildById("2") as ModeItem_1 : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new ModeItem_1("2", this, { mode: item }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        mode: item
                    });
                    View.create(earlierCreatedChild_2);
                }
                Flex.pop();
            }, (item: ModeType) => item.id.toString());
            ForEach.pop();
            Flex.pop();
        }
        If.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(40);
        Flex.width(140);
        Flex.margin({ right: 37 });
        Flex.backgroundColor('#F1F3F5');
        Flex.borderRadius(16);
        Flex.padding({
            left: 16,
            right: 16
        });
        Flex.id('select_usage_preset');
        Flex.onClick(() => {
            this.showSelector_1 = false;
            this.showSelector_2 = !this.showSelector_2;
        });
        Row.create();
        Text.create(this.streamUsageOptions[this.streamUsageIndex].name);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        If.create();
        if (this.showSelector_2) {
            If.branchId(0);
            Image.create($r('app.media.ic_arrow_up_small'));
            Image.height(7);
            Image.width(10);
            Image.margin({ left: 8 });
        }
        else {
            If.branchId(1);
            Image.create($r('app.media.ic_arrow_down_small'));
            Image.height(7);
            Image.width(10);
            Image.margin({ left: 8 });
        }
        If.pop();
        Row.pop();
        Flex.pop();
        If.create();
        if (this.showSelector_2) {
            If.branchId(0);
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start });
            Flex.height(344);
            Flex.width(156);
            Flex.backgroundColor('#fff');
            Flex.borderRadius(16);
            Flex.shadow({ radius: 50, color: 'rgba(0,0,30,0.1500)' });
            Flex.padding({ left: 4, right: 4, top: 4, bottom: 4 });
            Flex.position({ x: 145, y: 40 });
            Flex.zIndex(1);
            Scroll.create(this.scroller);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
            Scroll.scrollBarColor(Color.Gray);
            Scroll.scrollBarWidth(10);
            Scroll.edgeEffect(EdgeEffect.None);
            Column.create();
            ForEach.create("5", this, ObservedObject.GetRawObject(this.streamUsageOptions), (item: ModeType) => {
                Flex.create();
                Flex.width(156);
                Flex.onClick(() => {
                    if (this.streamUsageIndex !== item.id) {
                        this.streamUsageIndex = item.id;
                        console.info('this.contentTypeIndex===' + this.streamUsageIndex);
                        this.queryResult = $r('app.string.BLANK');
                    }
                    this.showSelector_2 = false;
                });
                let earlierCreatedChild_4: ModeItem_2 = (this && this.findChildById) ? this.findChildById("4") as ModeItem_2 : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new ModeItem_2("4", this, { mode: item }));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({
                        mode: item
                    });
                    View.create(earlierCreatedChild_4);
                }
                Flex.pop();
            }, (item: ModeType) => item.id.toString());
            ForEach.pop();
            Column.pop();
            Scroll.pop();
            Flex.pop();
        }
        If.pop();
        Row.pop();
        Column.create();
        Column.height(104);
        Column.width(360);
        Column.backgroundColor(Color.White);
        Column.padding({ left: 12, right: 12 });
        Column.borderRadius(20);
        Column.zIndex(0);
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.height('50%');
        Row.width('100%');
        Text.create($r('app.string.SYSTEM_PRESET_AUDIO_EFFECT'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.height(20);
        Text.width(96);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        Button.createWithLabel($r('app.string.QUERY'), { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor('rgba(24,36,49,0.05)');
        Button.fontColor('#007DFF');
        Button.fontSize(12);
        Button.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Button.fontWeight(500);
        Button.height(28);
        Button.width(72);
        Button.onClick(async () => {
            console.info('Button onClick');
            this.showSelector_1 = false;
            this.showSelector_2 = false;
            this.audioManager = audio.getAudioManager();
            this.audioStreamManager = this.audioManager.getStreamManager();
            this.audioEffectInfoArray = await this.audioStreamManager
                .getAudioEffectInfoArray(this.mapStreamIndexToUsage(this.streamUsageIndex) as audio.StreamUsage);
            let defaultIndex: number = 1;
            if (this.audioEffectInfoArray.indexOf(defaultIndex) === -1) {
                this.queryResult = $r('app.string.EFFECT_NONE');
            }
            else {
                this.queryResult = $r('app.string.EFFECT_NONE_AND_DEFAULT');
            }
            console.info('query result:' + this.queryResult);
        });
        Button.id('query_btn_preset');
        Button.pop();
        Row.pop();
        Row.create();
        Row.height(1);
        Row.width('100%');
        Row.backgroundColor('#F1F3F5');
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.height('50%');
        Row.width('100%');
        Text.create($r('app.string.QUERY_RESULT'));
        Text.fontSize(16);
        Text.fontWeight(500);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.pop();
        Text.create(this.queryResult);
        Text.fontSize(14);
        Text.fontWeight(400);
        Text.enabled(false);
        Text.fontColor(Color.Grey);
        Text.fontFamily($r('sys.string.ohos_id_text_font_family_medium'));
        Text.id('query_result_preset');
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Row.create();
        Row.height(56);
        Row.width(360);
        Column.create();
        Column.height(56);
        Column.width(156);
        Column.margin({ left: 24 });
        Image.create($r('app.media.ic_Silent_select'));
        Image.width(24);
        Image.height(24);
        Image.margin({ top: 7, bottom: 4 });
        Text.create($r('app.string.PRESET_AUDIO_EFFECT_QUERY'));
        Text.fontSize(10);
        Text.height(14);
        Text.fontColor('#007DFF');
        Text.pop();
        Column.pop();
        Column.create();
        Column.height(56);
        Column.width(156);
        Column.margin({ right: 24 });
        Column.id('switch_btn_preset');
        Column.onClick(async () => {
            await router.replaceUrl({ url: 'pages/RealtimeEffect' });
        });
        Image.create($r('app.media.ic_Sound_normal'));
        Image.width(24);
        Image.height(24);
        Image.margin({ top: 7, bottom: 4 });
        Text.create($r('app.string.REALTIME_AUDIO_EFFECT_SETTING'));
        Text.fontSize(10);
        Text.height(14);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new DetectPresetEffect("1", undefined, {}));
