interface MainPage_Params {
    isVisible?: boolean;
    color?: number;
    TextList?: Array<string>;
    model?: DanmakuView.Model;
    mContext?: DanmakuContext | ESObject;
    mParser?: BaseDanmakuParser | ESObject;
    mCacheStufferAdapter?: Proxy;
    intervalId?: number;
    timeoutId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DanmakuView } from '@ohos/danmakuflamemaster';
import { IDanmakus } from '@ohos/danmakuflamemaster';
import { DanmakuContext } from '@ohos/danmakuflamemaster';
import { Proxy } from '@ohos/danmakuflamemaster';
import { BaseDanmaku } from '@ohos/danmakuflamemaster';
import { BaseDanmakuParser } from '@ohos/danmakuflamemaster';
import { DANMAKU_STYLE_STROKEN } from '@ohos/danmakuflamemaster';
import { SpannedCacheStuffer } from '@ohos/danmakuflamemaster';
import { Callback } from '@ohos/danmakuflamemaster';
import { DanmakuTimer } from '@ohos/danmakuflamemaster';
import { BiliDanmukuParser } from './BiliDanmakuParser';
import { OnDanmakuClickListener } from '@ohos/danmakuflamemaster';
import { IDanmakuView } from '@ohos/danmakuflamemaster';
import { SystemClock } from '@ohos/danmakuflamemaster';
import { JSONSource } from '@ohos/danmakuflamemaster';
import { sourceData } from './DanmakuData';
class Pro extends Proxy {
    public prepareDrawing(danmaku: BaseDanmaku, fromWorkerThread: boolean): void {
    }
    public releaseResource(danmaku: BaseDanmaku): void {
        // TODO 重要:清理含有ImageSpan的text中的一些占用内存的资源 例如drawable
    }
}
;
class MainPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isVisible = new ObservedPropertySimple(true, this, "isVisible");
        this.__color = new ObservedPropertySimple(-1, this, "color");
        this.__TextList = new ObservedPropertyObject(["hide", "show", "pause", "resume", "发送一条(纯文本)", "发送一条(图文)", "定时发送"], this, "TextList");
        this.__model = new ObservedPropertyObject(new DanmakuView.Model(), this, "model");
        this.mContext = undefined;
        this.mParser = undefined;
        this.mCacheStufferAdapter = new Pro();
        this.intervalId = -1;
        this.timeoutId = -1;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainPage_Params) {
        if (params.isVisible !== undefined) {
            this.isVisible = params.isVisible;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.TextList !== undefined) {
            this.TextList = params.TextList;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.mContext !== undefined) {
            this.mContext = params.mContext;
        }
        if (params.mParser !== undefined) {
            this.mParser = params.mParser;
        }
        if (params.mCacheStufferAdapter !== undefined) {
            this.mCacheStufferAdapter = params.mCacheStufferAdapter;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
    }
    aboutToBeDeleted() {
        this.__isVisible.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        this.__TextList.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isVisible: ObservedPropertySimple<boolean>;
    get isVisible() {
        return this.__isVisible.get();
    }
    set isVisible(newValue: boolean) {
        this.__isVisible.set(newValue);
    }
    private __color: ObservedPropertySimple<number>;
    get color() {
        return this.__color.get();
    }
    set color(newValue: number) {
        this.__color.set(newValue);
    }
    private __TextList: ObservedPropertyObject<Array<string>>;
    get TextList() {
        return this.__TextList.get();
    }
    set TextList(newValue: Array<string>) {
        this.__TextList.set(newValue);
    }
    private __model: ObservedPropertyObject<DanmakuView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: DanmakuView.Model) {
        this.__model.set(newValue);
    }
    private mContext: DanmakuContext | any;
    private mParser: BaseDanmakuParser | any;
    private mCacheStufferAdapter: Proxy;
    private createParser(): BaseDanmakuParser {
        let parser: BaseDanmakuParser = new BiliDanmukuParser();
        let jsonSource = new JSONSource(sourceData);
        parser.load(jsonSource);
        return parser;
    }
    private intervalId: number;
    private timeoutId: number;
    addDanmakus() {
        if (this.intervalId != -1 || this.timeoutId != -1) {
            return;
        }
        this.timeoutId = setTimeout(() => {
            this.timeoutId = -1;
            this.intervalId = setInterval(() => {
                this.addDanmaku(true);
            }, 300);
        }, 1000);
    }
    private addDanmaku(isLive: Boolean) {
        let danmaku: BaseDanmaku = this.mContext.mDanmakuFactory.createDanmaku(BaseDanmaku.TYPE_SCROLL_RL);
        danmaku.text = "这是一条弹幕" + SystemClock.uptimeMillis();
        danmaku.padding = 5;
        danmaku.priority = 0; // 可能会被各种过滤器过滤并隐藏显示
        danmaku.isLive = isLive.valueOf();
        danmaku.setTime(this.model.getCurrentTime() + 1200);
        danmaku.textSize = 25 * (this.mParser.getDisplayer().getDensity() * 0.8);
        danmaku.textColor = 0xffff0000;
        danmaku.textShadowColor = 0xffffffff;
        danmaku.borderColor = 0xff00ff00;
        this.model.addDanmaku(danmaku);
    }
    private addDanmaKuShowTextAndImage(islive: boolean): void {
        let danmaku: BaseDanmaku = this.mContext.mDanmakuFactory.createDanmaku(BaseDanmaku.TYPE_SCROLL_RL);
        danmaku.text = "<img src=\"/common/image/icon.png\" width=\"" + vp2px(33) + "\" height=\"" + vp2px(33) + "\"/>图文混排";
        danmaku.padding = 5;
        danmaku.priority = 1; // 一定会显示, 一般用于本机发送的弹幕
        danmaku.isLive = islive;
        danmaku.setTime(this.model.getCurrentTime() + 1200);
        danmaku.textSize = 25 * (this.mParser.getDisplayer().getDensity() * 0.8);
        danmaku.textColor = 0xffff0000;
        danmaku.textShadowColor = 0; // 重要：如果有图文混排，最好不要设置描边(设textShadowColor=0)，否则会进行两次复杂的绘制导致运行效率降低
        danmaku.underlineColor = 0xff00ff00;
        this.model.addDanmaku(danmaku);
    }
    buildText(i: any, clickCallBack: any, parent = null) {
        Text.create(this.TextList[i]);
        Text.layoutWeight(8);
        Text.fontWeight(FontWeight.Normal);
        Text.textAlign(TextAlign.Center);
        Text.borderRadius(1);
        Text.fontSize(i <= 3 ? 24 : 20);
        Text.backgroundColor(this.color == i ? Color.Yellow : Color.White);
        Text.onClick(() => {
            clickCallBack(i);
        });
        Text.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.color = i;
            }
            if (event.type === TouchType.Up || event.type === TouchType.Move) {
                this.color = -1;
            }
        });
        Text.pop();
        If.create();
        if (i < this.TextList.length - 1) {
            If.branchId(0);
            Text.create();
            Text.layoutWeight(1);
            Text.pop();
        }
        If.pop();
    }
    BtuView(parent = null) {
        Flex.create({
            direction: FlexDirection.Column,
            justifyContent: FlexAlign.SpaceBetween,
            alignItems: ItemAlign.Stretch,
            alignContent: FlexAlign.Start
        });
        Flex.width('100%');
        Flex.height('100%');
        Flex.onClick(() => {
            this.isVisible = false;
        });
        Row.create();
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor('#8a006161');
        Row.opacity(0.8);
        Row.pop();
        Row.create();
        Row.opacity(0.8);
        Row.height('18%');
        Row.width('100%');
        Row.backgroundColor('#8acc0000');
        this.buildText(0, () => {
            this.model.hide();
        }, this);
        this.buildText(1, () => {
            this.model.show();
        }, this);
        this.buildText(2, () => {
            this.model.pause();
        }, this);
        this.buildText(3, () => {
            this.model.resume();
        }, this);
        this.buildText(4, () => {
            this.addDanmaku(false);
        }, this);
        this.buildText(5, () => {
            this.addDanmaKuShowTextAndImage(false);
        }, this);
        this.buildText(6, () => {
            if (this.TextList[6] == '定时发送') {
                this.intervalId = -1;
                this.timeoutId = -1;
                this.addDanmakus();
                this.TextList[6] = '取消定时';
            }
            else {
                if (this.timeoutId != -1) {
                    clearTimeout(this.timeoutId);
                }
                if (this.intervalId != -1) {
                    clearInterval(this.intervalId);
                }
                this.TextList[6] = '定时发送';
            }
        }, this);
        Row.pop();
        Flex.pop();
    }
    render() {
        Stack.create();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Flex.backgroundColor(Color.Black);
        Flex.onClick(() => {
            this.isVisible = true;
        });
        Flex.pop();
        If.create();
        if (this.isVisible) {
            If.branchId(0);
            this.BtuView(this);
        }
        If.pop();
        Stack.pop();
    }
    aboutToAppear() {
        setTimeout(() => {
            this.init();
        }, 0);
    }
    init() {
        this.model.setWidth(lpx2px(720));
        this.model.setHeight(lpx2px(720));
        let maxLinesPair: Map<number, number> = new Map();
        maxLinesPair.set(BaseDanmaku.TYPE_SCROLL_RL, 5); // 滚动弹幕最大显示5行
        // 设置是否禁止重叠
        let overlappingEnablePair: Map<number, boolean> = new Map();
        overlappingEnablePair.set(BaseDanmaku.TYPE_SCROLL_RL, true);
        overlappingEnablePair.set(BaseDanmaku.TYPE_FIX_TOP, true);
        this.mContext = DanmakuContext.create();
        this.mContext.setDanmakuStyle(DANMAKU_STYLE_STROKEN, 3)
            .setDuplicateMergingEnabled(false)
            .setScrollSpeedFactor(1.2)
            .setScaleTextSize(1.2)
            .setCacheStuffer(new SpannedCacheStuffer(), this.mCacheStufferAdapter) // 图文混排使用SpannedCacheStuffer
            .setMaximumLines(maxLinesPair)
            .preventOverlapping(overlappingEnablePair)
            .setDanmakuMargin(40);
        let that = this;
        if (this.model != null) {
            this.mParser = this.createParser();
            this.model.setCallback(new Call(that));
            this.model.setOnDanmakuClickListener(new OnDanMu(that));
            this.model.prepare(this.mParser, this.mContext);
            this.model.showFPS(true);
        }
    }
}
class Call implements Callback {
    private that: any;
    constructor(that: any) {
        this.that = that;
    }
    public updateTimer(timer: DanmakuTimer): void {
    }
    public drawingFinished(): void {
    }
    public danmakuShown(danmaku: BaseDanmaku): void {
    }
    public prepared(): void {
        this.that.model.start();
    }
}
class OnDanMu implements OnDanmakuClickListener {
    private that: any;
    constructor(that: any) {
        this.that = that;
    }
    onDanmakuClick(danmakus: IDanmakus): boolean {
        console.log('DFM onDanmakuClick: danmakus size:' + danmakus.size());
        let latest: BaseDanmaku = danmakus.last();
        if (null != latest) {
            console.log('DFM onDanmakuClick: text of latest danmaku:' + latest.text);
            return true;
        }
        return false;
    }
    ;
    onDanmakuLongClick(danmakus: IDanmakus): boolean {
        return false;
    }
    ;
    onViewClick(view: IDanmakuView): boolean {
        this.that.isVisible = true;
        return false;
    }
    ;
}
loadDocument(new MainPage("1", undefined, {}));
