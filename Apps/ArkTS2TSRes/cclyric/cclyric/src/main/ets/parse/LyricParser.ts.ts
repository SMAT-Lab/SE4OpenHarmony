import { IParser } from './IParser';
import { Lyric } from '../bean/Lyric';
import { LyricLine } from '../bean/LyricLine';
import { printD, printW } from '../extensions/Extension';
/**
 * The parser to parse the string array of a standard lyric file.
 */
export class LyricParser implements IParser {
    // Example lyric file:
    // [ti:画心]
    // [ar:张靓颖]
    // [al:432326]
    // [by:]
    // [offset:0]
    // [00:00.10]画心 - 张靓颖
    // [01:05.49]看不穿 是你失落的魂魄
    /**
     * Parse the string array to a Lyric.
     * @param src The lyric source, a string array.
     * @returns A lyric instance.
     */
    parse(src: Array<string>): Lyric {
        let lyricLines = new Array<LyricLine>();
        let title = "";
        let artist = "";
        let album = "";
        let by = "";
        let offset = 0;
        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line == "" || line == "\n" || line == "\r" || line == "\r\n") {
                printW("the lyric line is empty, carriage return or line feed, line index= " + i);
                continue;
            }
            if (line.indexOf("ti") > 0) {
                title = this.parseIdTag(line);
            }
            else if (line.indexOf("ar") > 0) {
                artist = this.parseIdTag(line);
            }
            else if (line.indexOf("al") > 0) {
                album = this.parseIdTag(line);
            }
            else if (line.indexOf("by") > 0) {
                by = this.parseIdTag(line);
            }
            else if (line.indexOf("offset") > 0) {
                offset = Number.parseInt(this.parseIdTag(line));
            }
            else {
                // [00:00.10]画心 - 张靓颖
                // [01:05.49][02:08.40]看不穿 是你失落的魂魄
                let spr = line.split(']');
                if (spr.length <= 1) {
                    printW("the lyric line is no timestamp, line index= " + i);
                    continue;
                }
                // parse text
                let text = spr[spr.length - 1];
                printD("text= " + text);
                // parse timeline
                for (let i = 0; i < spr.length - 1; i++) {
                    let timeline = spr[i].replace("[", "");
                    let timeStamp = this.parseTimeline(timeline);
                    printD("timestamp= " + timeStamp);
                    lyricLines.push(new LyricLine(text, timeStamp - offset, -1));
                }
            }
        }
        lyricLines.sort((l1, l2) => {
            return l1.beginTime - l2.beginTime;
        });
        for (let i = 0; i < lyricLines.length; i++) {
            let lyricLine = lyricLines[i];
            if (i == lyricLines.length - 1) {
                lyricLine.nextTime = lyricLine.beginTime + 1000 - offset;
            }
            else {
                let next = lyricLines[i + 1];
                lyricLine.nextTime = next.beginTime;
            }
        }
        let result = new Lyric(artist, title, album, by, offset, lyricLines);
        return result;
    }
    private parseIdTag(line: string): string {
        let spr = line.split(":");
        let spr1 = spr[1];
        let result = spr1.replace("]", "");
        return result;
    }
    private parseTimeline(timeString: string): number {
        // 00:00.50
        let timeStringList = timeString.split(':');
        let minuteString = timeStringList[0]; //00
        let minute = Number.parseInt(minuteString);
        let secondStrings = timeStringList[1]; //00.50
        let secondStringList = secondStrings.split(".");
        let secondString = secondStringList[0]; //00
        let millionSecondString = secondStringList[1]; //50
        let seconds = Number.parseInt(secondString);
        let millionSecond = Number.parseInt(millionSecondString);
        return minute * 60000 + seconds * 1000 + millionSecond; // covert to million seconds
    }
}
