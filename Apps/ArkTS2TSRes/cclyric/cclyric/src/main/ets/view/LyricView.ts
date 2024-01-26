interface LyricView_Params {
    /**
     * The lyricConfig for LyricView.
     */
    controller?: LyricController;
    lyricLines?;
    settings?;
    canvasCtx?;
    highLightTextSize?;
    highLightDrawOffset?;
    w?;
    h?;
    centerH?;
    centerW?;
    scrollY?;
    linearGradientEdge?;
    targetScrollY?;
    centerYOffset?;
    currentIndex?;
    firstVisibleIndex?;
    lastVisibleIndex?;
    topOverOffIndex?;
    anim?: AnimatorResult;
    isAnimRunning?;
    isEmpty?;
    lyric?: Lyric;
    onDataChangedListener?;
    onPositionChangedListener?;
    downY?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LyricView_" + ++__generate__Id;
}
import { LyricLineWrapper } from '../bean/LyricLineWrapper';
import { printD, printW } from '../extensions/Extension';
import animator, { AnimatorResult } from '@ohos.animator';
import { LyricController } from './LyricController';
import { Lyric } from '../bean/Lyric';
export class LyricView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = null;
        this.lyricLines = new Array<LyricLineWrapper>() // the lyric lines list.
        ;
        this.settings = new RenderingContextSettings(true);
        this.canvasCtx = new CanvasRenderingContext2D(this.settings) // paint to draw.
        ;
        this.highLightTextSize = 0;
        this.highLightDrawOffset = 0;
        this.w = 0 // the width of this view.
        ;
        this.h = 0 // the height of this view.
        ;
        this.centerH = 0;
        this.centerW = 0;
        this.scrollY = 0 // the total scroll offset for current timestamp.
        ;
        this.linearGradientEdge = 150 // the size of linear gradient at top and bottom.
        ;
        this.targetScrollY = 0 // the target end scrollY of the animation.
        ;
        this.centerYOffset = 0 // the center y of the lyric view.
        ;
        this.currentIndex = 0 // the focused index of the lyric line list.
        ;
        this.firstVisibleIndex = 0 // the first visible item index at top.
        ;
        this.lastVisibleIndex = 0 // the last visible item index at bottom.
        ;
        this.topOverOffIndex = -1 // the index of highlight item when has one more item out off the top.
        ;
        this.anim = null;
        this.isAnimRunning = false;
        this.isEmpty = false // is no lyric.
        ;
        this.lyric = null // current lyric.
        ;
        this.onDataChangedListener = (lyric: Lyric) => {
            this.lyric = lyric;
            this.initSize();
        };
        this.onPositionChangedListener = (mediaPosition: number) => {
            this.onPositionChanged(mediaPosition);
        };
        this.downY = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LyricView_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.lyricLines !== undefined) {
            this.lyricLines = params.lyricLines;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.canvasCtx !== undefined) {
            this.canvasCtx = params.canvasCtx;
        }
        if (params.highLightTextSize !== undefined) {
            this.highLightTextSize = params.highLightTextSize;
        }
        if (params.highLightDrawOffset !== undefined) {
            this.highLightDrawOffset = params.highLightDrawOffset;
        }
        if (params.w !== undefined) {
            this.w = params.w;
        }
        if (params.h !== undefined) {
            this.h = params.h;
        }
        if (params.centerH !== undefined) {
            this.centerH = params.centerH;
        }
        if (params.centerW !== undefined) {
            this.centerW = params.centerW;
        }
        if (params.scrollY !== undefined) {
            this.scrollY = params.scrollY;
        }
        if (params.linearGradientEdge !== undefined) {
            this.linearGradientEdge = params.linearGradientEdge;
        }
        if (params.targetScrollY !== undefined) {
            this.targetScrollY = params.targetScrollY;
        }
        if (params.centerYOffset !== undefined) {
            this.centerYOffset = params.centerYOffset;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.firstVisibleIndex !== undefined) {
            this.firstVisibleIndex = params.firstVisibleIndex;
        }
        if (params.lastVisibleIndex !== undefined) {
            this.lastVisibleIndex = params.lastVisibleIndex;
        }
        if (params.topOverOffIndex !== undefined) {
            this.topOverOffIndex = params.topOverOffIndex;
        }
        if (params.anim !== undefined) {
            this.anim = params.anim;
        }
        if (params.isAnimRunning !== undefined) {
            this.isAnimRunning = params.isAnimRunning;
        }
        if (params.isEmpty !== undefined) {
            this.isEmpty = params.isEmpty;
        }
        if (params.lyric !== undefined) {
            this.lyric = params.lyric;
        }
        if (params.onDataChangedListener !== undefined) {
            this.onDataChangedListener = params.onDataChangedListener;
        }
        if (params.onPositionChangedListener !== undefined) {
            this.onPositionChangedListener = params.onPositionChangedListener;
        }
        if (params.downY !== undefined) {
            this.downY = params.downY;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    /**
     * The lyricConfig for LyricView.
     */
    private controller: LyricController;
    private lyricLines; // the lyric lines list.
    readonly settings;
    readonly canvasCtx; // paint to draw.
    private highLightTextSize;
    private highLightDrawOffset;
    private w; // the width of this view.
    private h; // the height of this view.
    private centerH;
    private centerW;
    private scrollY; // the total scroll offset for current timestamp.
    private linearGradientEdge; // the size of linear gradient at top and bottom.
    private targetScrollY; // the target end scrollY of the animation.
    private centerYOffset; // the center y of the lyric view.
    private currentIndex; // the focused index of the lyric line list.
    private firstVisibleIndex; // the first visible item index at top.
    private lastVisibleIndex; // the last visible item index at bottom.
    private topOverOffIndex; // the index of highlight item when has one more item out off the top.
    private anim: AnimatorResult;
    private isAnimRunning;
    private isEmpty; // is no lyric.
    private lyric: Lyric; // current lyric.
    private onDataChangedListener;
    private onPositionChangedListener;
    aboutToAppear() {
        if (this.controller == null) {
            throw new Error("The lyric lyricConfig is not set!");
        }
        this.controller.onDataChangedListener = this.onDataChangedListener;
        this.controller.onPositionChangedListener = this.onPositionChangedListener;
        this.lyric = this.controller.getLyric();
        this.highLightTextSize = this.controller.getTextSize() * this.controller.getHighlightScale();
        this.highLightDrawOffset = this.controller.getTextSize() * (this.controller.getHighlightScale() - 1) / 2;
        this.anim = animator.create({
            duration: this.controller.getAnimationDuration(),
            easing: "ease-in-out",
            delay: 0,
            fill: "forwards",
            direction: "normal",
            iterations: 1,
            begin: this.scrollY,
            end: this.targetScrollY
        });
        this.anim.oncancel = () => {
            this.isAnimRunning = false;
        };
        this.anim.onfinish = () => {
            this.isAnimRunning = false;
        };
        this.anim.onframe = (value) => {
            this.scrollY = value;
            this.invalidate();
        };
    }
    private downY;
    render() {
        Canvas.create(this.canvasCtx);
        Canvas.onAreaChange((oldSize, newSize) => {
            if (oldSize.width == newSize.width && oldSize.height == newSize.height) {
                printW("The size is not changed.");
                return;
            }
            this.w = newSize.width as number;
            this.h = newSize.height as number;
            printD("onSizeChanged: canvas size= " + this.w + " * " + this.h);
            this.centerW = this.w / 2;
            this.centerH = this.h / 2;
            this.initPaint();
            this.initSize();
        });
        Canvas.width("100%");
        Canvas.height("100%");
        Canvas.onTouch((event) => {
            if (this.isEmpty) {
                return;
            }
            // let touchEvent = event.touches[0]
            // switch (touchEvent.type) {
            //     case TouchType.Down:
            //         printD("---down")
            //         this.downY = touchEvent.screenY
            //         break
            //     case TouchType.Move:
            //         printD("---move")
            //         let currentY = touchEvent.screenY
            //         let dy = currentY - this.downY
            //         this.scrollY += dy
            //         this.invalidate()
            //         this.downY = currentY
            //         break
            // }
        });
        Canvas.pop();
    }
    private initPaint() {
        this.canvasCtx.fillStyle = this.controller.getTextColor();
        this.canvasCtx.strokeStyle = this.controller.getTextColor();
        this.canvasCtx.lineWidth = 1;
        this.canvasCtx.font = this.controller.getTextSize() + "px";
        // TODO: the center textAlign has bugs when multi line in OpenHarmony 3.2
        if (this.controller.getAlignMode() == "center") {
            this.canvasCtx.textAlign = "center";
        }
    }
    private initSize() {
        // reset state
        this.currentIndex = 0;
        this.lyricLines = [];
        this.isEmpty = this.lyric == null || this.lyric.lyricList.length <= 0;
        // no lyric, draw empty hint
        if (this.isEmpty) {
            this.invalidate();
            return;
        }
        this.scrollY = this.h / 2; // layout from center when first display
        let tempH = 0;
        let list = this.lyric.lyricList;
        for (let i = 0; i < list.length; i++) {
            let lrc = list[i];
            let textMeasure = this.canvasCtx.measureText(lrc.text);
            let lp = textMeasure.width / this.w;
            let lines = lp;
            if (textMeasure.width % this.w != 0) {
                lines = lp < 1 ? 1 : Math.floor(lp) + 1;
            }
            let lineHeight = lines * textMeasure.height;
            if (i == 0) {
                tempH = Math.round(textMeasure.height / 2);
                this.centerYOffset = tempH;
            }
            if (tempH < this.h / 2) {
                tempH += lineHeight + this.controller.getLineSpace();
            }
            else {
                if (this.topOverOffIndex == -1) {
                    this.topOverOffIndex = i - 1; // if current index is topOverOffIndex, top off screen
                    printW("init: topOverIndex= " + this.topOverOffIndex);
                }
            }
            this.lyricLines.push(new LyricLineWrapper(lrc, lineHeight));
        }
        this.firstVisibleIndex = this.getFirstVisibleIndex(this.currentIndex);
        this.lastVisibleIndex = this.getLastVisibleIndex(this.currentIndex);
        this.invalidate();
    }
    private invalidate() {
        // clear canvas
        this.canvasCtx.clearRect(0, 0, this.w, this.h);
        if (!this.isEmpty) {
            // TODO: handle touch event, & draw center line
            // this.drawCenterLine()
            // draw lrc text
            this.drawLrc();
            this.drawEdge();
        }
        else {
            this.drawEmpty();
        }
    }
    private drawEmpty() {
        let hint = this.controller.getEmptyHint();
        if (this.controller.getAlignMode() == "center") {
            this.canvasCtx.fillText(hint, this.centerW, this.centerH);
        }
        else {
            this.canvasCtx.fillText(hint, 0, this.centerH);
        }
    }
    private drawCenterLine() {
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(0, this.centerH);
        this.canvasCtx.lineTo(this.w, this.centerH);
        this.canvasCtx.stroke();
    }
    private drawLrc() {
        let startY = this.centerYOffset; // half of the first line measure text height
        this.canvasCtx.save();
        this.canvasCtx.translate(0, this.scrollY);
        // the draw count is the max visible lines in screen + 4 caches(2 top & 2 bottom)
        for (let i = 0; i < this.lyricLines.length; i++) {
            let lrc = this.lyricLines[i];
            // out the top of screen, the default cache is 2 lines
            if (i < this.firstVisibleIndex - this.controller.getCacheSize()) {
                startY += (lrc.height + this.controller.getLineSpace());
                continue;
            }
            // out the bottom of screen, the default cache is 2 lines
            if (i > this.lastVisibleIndex + this.controller.getCacheSize()) {
                break;
            }
            // draw with high light for current line
            if (i == this.currentIndex) {
                let scaleHeight = this.drawHighLight(lrc, startY);
                startY += (scaleHeight + this.controller.getLineSpace() + this.highLightDrawOffset);
            }
            else {
                if (this.controller.getAlignMode() == "center") {
                    this.canvasCtx.fillText(lrc.text, this.centerW, startY);
                }
                else {
                    this.canvasCtx.fillText(lrc.text, 0, startY);
                }
                startY += (lrc.height + this.controller.getLineSpace());
            }
        }
        this.canvasCtx.restore();
    }
    private drawHighLight(lrc: LyricLineWrapper, startY: number): number {
        this.canvasCtx.save();
        this.canvasCtx.font = this.controller.getHighlightStyle() ?
            this.highLightTextSize + "px" + " bold" : this.highLightTextSize + "px";
        this.canvasCtx.fillStyle = this.controller.getHighlightColor();
        if (this.controller.getAlignMode() == "center") {
            this.canvasCtx.fillText(lrc.text, this.centerW, startY + this.highLightDrawOffset);
        }
        else {
            this.canvasCtx.fillText(lrc.text, 0, startY + this.highLightDrawOffset);
        }
        let textMeasure = this.canvasCtx.measureText(lrc.text);
        let height = Math.round(textMeasure.height);
        let lp = textMeasure.width / this.w;
        let lines = lp;
        if (textMeasure.width % this.w != 0) {
            lines = lp < 1 ? 1 : Math.floor(lp) + 1;
        }
        let scaleHeight = height * lines;
        this.canvasCtx.restore();
        return scaleHeight;
    }
    private drawEdge() {
        this.canvasCtx.save();
        let topFade = this.canvasCtx.createLinearGradient(this.centerW, 0, this.centerW, this.linearGradientEdge);
        topFade.addColorStop(0.0, this.controller.getEdgeColor());
        topFade.addColorStop(1.0, '#00ffffff');
        this.canvasCtx.fillStyle = topFade;
        this.canvasCtx.fillRect(0, 0, this.w, this.linearGradientEdge);
        let bottomFade = this.canvasCtx.createLinearGradient(this.centerW, this.h, this.centerW, this.h - this.linearGradientEdge);
        bottomFade.addColorStop(0.0, this.controller.getEdgeColor());
        bottomFade.addColorStop(1.0, '#00ffffff');
        this.canvasCtx.fillStyle = bottomFade;
        this.canvasCtx.fillRect(0, this.h - this.linearGradientEdge, this.w, this.linearGradientEdge);
        this.canvasCtx.restore();
    }
    private getIndex(position: number): number {
        let first = this.lyricLines[0].beginTime;
        if (position < first) {
            return 0;
        }
        let last = this.lyricLines[this.lyricLines.length - 1].beginTime;
        if (position > last) {
            return this.lyricLines.length - 1;
        }
        for (let i = 0; i < this.lyricLines.length - 1; i++) {
            let line = this.lyricLines[i];
            if (position >= line.beginTime && position < line.nextTime) {
                return i;
            }
        }
        return this.currentIndex;
    }
    private getFirstVisibleIndex(index: number): number {
        if (index > this.topOverOffIndex) {
            let tempH = 0;
            for (let i = index; i > 0; i--) {
                let lrc = this.lyricLines[i];
                tempH += (lrc.height + this.controller.getLineSpace());
                if (tempH > this.centerH) {
                    return i;
                }
            }
        }
        else {
            return 0;
        }
    }
    private getLastVisibleIndex(index: number): number {
        let tempH = 0;
        for (let i = index; i < this.lyricLines.length; i++) {
            let lrc = this.lyricLines[i];
            tempH += (lrc.height + this.controller.getLineSpace());
            if (tempH > this.centerH) {
                return i;
            }
        }
        return this.lyricLines.length - 1;
    }
    private animateToIndex(index: number) {
        printD("animate to index= " + index);
        if (index == this.currentIndex) {
            printD("index not changed, not animate!");
            return;
        }
        // out of range, return
        if (index > this.lyricLines.length - 1 || index < 0) {
            printD("out of range, not animate!");
            return;
        }
        this.firstVisibleIndex = this.getFirstVisibleIndex(index);
        this.lastVisibleIndex = this.getLastVisibleIndex(index);
        let animOffset = 0;
        let isUp = index > this.currentIndex;
        if (isUp) { // to next
            for (let i = this.currentIndex; i < index; i++) {
                let lrcH = this.lyricLines[i].height;
                animOffset += lrcH + this.controller.getLineSpace();
            }
        }
        else { // to pre
            for (let i = index; i < this.currentIndex; i++) {
                let lrcH = this.lyricLines[i].height;
                animOffset += lrcH + this.controller.getLineSpace();
            }
        }
        this.currentIndex = index;
        printD("firstVisible= " + this.firstVisibleIndex + ", lastVisible= " + this.lastVisibleIndex + ", currentHighLight= " + this.currentIndex);
        // the animation is running, end it
        if (this.isAnimRunning) {
            this.anim.cancel();
            this.scrollY = this.targetScrollY;
            this.invalidate();
            printW("intercept and end anim!");
        }
        // at end, stop scroll
        if (this.currentIndex > this.lyricLines.length - 1) {
            return;
        }
        // get the offset of one frame
        this.targetScrollY = Math.round(isUp ? this.scrollY - animOffset : this.scrollY + animOffset);
        // start animate
        let startY = this.scrollY;
        printD(">>start anim " + startY + " -> " + this.targetScrollY);
        this.anim.reset({
            duration: this.controller.getAnimationDuration(),
            easing: "ease-in-out",
            delay: 0,
            fill: "forwards",
            direction: "normal",
            iterations: 1,
            begin: startY,
            end: this.targetScrollY
        });
        this.anim.play();
        this.isAnimRunning = true;
    }
    private onPositionChanged(mediaPosition: number) {
        if (this.isEmpty) {
            printW("The lyric data is empty!");
            return;
        }
        if (this.lyricLines.length <= 0) {
            printW("The lyric lines is empty!");
            return;
        }
        let index = this.getIndex(mediaPosition);
        if (index != this.currentIndex) {
            this.animateToIndex(index);
        }
    }
}
