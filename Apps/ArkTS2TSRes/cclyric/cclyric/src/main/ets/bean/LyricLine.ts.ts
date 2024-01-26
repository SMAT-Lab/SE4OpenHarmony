/**
 * The line info of lyric.
 */
export class LyricLine {
    readonly text: string;
    readonly beginTime: number;
    nextTime: number;
    /**
     * @param text The text of lyric line.
     * @param beginTime The begin timestamp of this lyric line.
     * @param nextTime The begin timestamp of the next lyric line.
     */
    constructor(text: string, beginTime: number, nextTime: number) {
        this.text = text;
        this.beginTime = beginTime;
        this.nextTime = nextTime;
    }
}
