let __generate__Id: number = 0;
function generateId(): string {
    return "LyricController_" + ++__generate__Id;
}
import { Lyric } from '../bean/Lyric';
// default config
const DEFAULT_LINE_SPACE = 16;
const DEFAULT_TEXT_SIZE = 48;
const DEFAULT_HIGHLIGHT_SCALE = 1.2;
const DEFAULT_TEXT_COLOR = "#ff929292";
const DEFAULT_HIGHLIGHT_COLOR = "#000000";
const DEFAULT_EDGE_COLOR = "#ffffff";
const DEFAULT_ANIM_DURATION = 500;
const DEFAULT_CACHE_SIZE = 2;
/**
 * The controller for LyricView.
 */
export class LyricController {
    private lyric: Lyric = null;
    private textColor: string = DEFAULT_TEXT_COLOR;
    private textSize: number = DEFAULT_TEXT_SIZE;
    private highlightColor: string = DEFAULT_HIGHLIGHT_COLOR;
    private highlightScale: number = DEFAULT_HIGHLIGHT_SCALE;
    private edgeColor: string = DEFAULT_EDGE_COLOR;
    private lineSpace: number = DEFAULT_LINE_SPACE;
    private animDuration: number = DEFAULT_ANIM_DURATION;
    private cacheSize: number = DEFAULT_CACHE_SIZE;
    private isBold: boolean = true;
    private emptyHint: string = "";
    private alignMode: "left" | "center" = "left";
    /**
     *  Listener to observe the lyric data set changed. This is a inner function, do not call this.
     */
    onDataChangedListener: (lyric: Lyric) => void;
    /**
     *  Listener to observe the media position changed. This is a inner function, do not call this.
     */
    onPositionChangedListener: (position: number) => void;
    /**
     * Update the current position of media player to refresh the lyric view.
     * @param mediaPosition The current position of media player.
     */
    updatePosition(mediaPosition: number) {
        this.onPositionChangedListener?.(mediaPosition);
    }
    /**
     * Set the lyric datasource.
     * @param lyric The lyric datasource.
     * @returns LyricConfig
     */
    setLyric(lyric: Lyric): LyricController {
        this.lyric = lyric;
        this.onDataChangedListener?.(lyric);
        return this;
    }
    /**
     * Get the lyric datasource.
     * @returns The lyric datasource.
     */
    getLyric(): Lyric {
        return this.lyric;
    }
    /**
     * Set the color of normal lyric text. The default color is 0xff929292.
     * @param color The color of normal lyric text.
     * @returns LyricConfig
     */
    setTextColor(color: string): LyricController {
        this.textColor = color;
        return this;
    }
    /**
     * Get the color of normal lyric text.
     * @returns The color of normal lyric text.
     */
    getTextColor(): string {
        return this.textColor;
    }
    /**
     * Set the text size(px) of normal lyric. The default size is 48px.
     * @param textSize The text size of normal lyric.
     * @returns LyricConfig
     */
    setTextSize(textSize: number): LyricController {
        this.textSize = textSize;
        return this;
    }
    /**
     * Get the text size(px) of normal lyric.
     * @returns The text size of normal lyric.
     */
    getTextSize(): number {
        return this.textSize;
    }
    /**
     * Set the color of focused lyric text. The default color is Black.
     * @param color The color of focused lyric text.
     * @returns LyricConfig
     */
    setHighlightColor(color: string): LyricController {
        this.highlightColor = color;
        return this;
    }
    /**
     * Get the color of focused lyric text.
     * @returns The color of focused lyric text.
     */
    getHighlightColor(): string {
        return this.highlightColor;
    }
    /**
     * Set the scale of focused lyric. The default scale is 1.2f.
     * @param scale The scale of focused lyric.
     * @returns LyricConfig
     */
    setHighlightScale(scale: number): LyricController {
        this.highlightScale = scale;
        return this;
    }
    /**
     * Get the scale of focused lyric.
     * @returns The scale of focused lyric.
     */
    getHighlightScale(): number {
        return this.highlightScale;
    }
    /**
     * Set is bold or not for the focused lyric. Default is true.
     * @param bold True to set text bold style, false to set normal style.
     * @returns LyricConfig
     */
    setHighlightStyle(isBold: boolean): LyricController {
        this.isBold = isBold;
        return this;
    }
    /**
     * The bold style of focused lyric.
     * @returns True to set text bold style, false to set normal style.
     */
    getHighlightStyle(): boolean {
        return this.isBold;
    }
    /**
     * Set the fade edge color of top and bottom. The default color is White.
     * @param color The fade edge color of top and bottom.
     * @returns LyricConfig
     */
    setEdgeColor(color: string): LyricController {
        this.edgeColor = color;
        return this;
    }
    /**
     * Get the fade edge color of top and bottom.
     * @returns The fade edge color of top and bottom.
     */
    getEdgeColor(): string {
        return this.edgeColor;
    }
    /**
     * Set the line space(px) between two lyric lines. The default line space is 16px.
     * @param lineSpace The line space between two lyric lines.
     * @returns LyricConfig
     */
    setLineSpace(lineSpace: number): LyricController {
        this.lineSpace = lineSpace;
        return this;
    }
    /**
     * Get the line space between two lyric lines.
     * @returns The line space between two lyric lines.
     */
    getLineSpace(): number {
        return this.lineSpace;
    }
    /**
     * Set the duration of translate animation. The default duration is 500ms.
     * @param duration The duration of translate animation.
     * @returns LyricConfig
     */
    setAnimationDuration(duration: number): LyricController {
        this.animDuration = duration;
        return this;
    }
    /**
     * Get the duration of translate animation.
     * @returns The duration of translate animation.
     */
    getAnimationDuration(): number {
        return this.animDuration;
    }
    /**
     * Set the size of lyric lines to draw out of top and bottom, the result is min of cacheSize and the lyric lines.
     * The default cache size is 2.
     * @param cacheSize The size of lyric lines to draw out of top and bottom.
     * @returns LyricConfig
     */
    setCacheSize(cacheSize: number): LyricController {
        this.cacheSize = cacheSize;
        return this;
    }
    /**
     * Get the size of lyric lines to draw out of top and bottom.
     * @returns The size of lyric lines to draw out of top and bottom.
     */
    getCacheSize(): number {
        return this.cacheSize;
    }
    /**
     * Set the hint text when is no lyric to display.
     * @param hint The hint text when is no lyric to display.
     * @returns LyricConfig
     */
    setEmptyHint(hint: string): LyricController {
        this.emptyHint = hint;
        return this;
    }
    /**
     * Get the hint text when is no lyric to display.
     * @returns The hint text when is no lyric to display.
     */
    getEmptyHint(): string {
        return this.emptyHint;
    }
    /**
     * Set the alignment of the lyric text to display from.
     * @param align The value is "left" | "center", default is "left".
     */
    setAlignMode(align: "left" | "center") {
        this.alignMode = align;
    }
    /**
     * Get the alignment of the lyric text to display from.
     * @returns The value is "left" | "center".
     */
    getAlignMode(): "left" | "center" {
        return this.alignMode;
    }
}
