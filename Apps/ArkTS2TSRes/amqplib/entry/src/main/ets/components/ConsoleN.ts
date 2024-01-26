let __generate__Id: number = 0;
function generateId(): string {
    return "ConsoleN_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function format(formatStr: string, ...args: any): any {
    // Simplified version of https://nodejs.org/api/util.html#utilformatformat-args
    return formatStr.replace("/%([sdifj])/g", (_unused: any, type: any): any => {
        const replacement: any = args.shift();
        if (type === 'f') {
            return replacement.toFixed(6);
        }
        else if (type === 'j') {
            return JSON.stringify(replacement);
        }
        else if (type === 's' && typeof replacement === 'object') {
            const ctor: any = replacement.constructor !== Object ? replacement.constructor.name : '';
            return `${ctor} {}`.trim();
        }
        else {
            return replacement.toString();
        }
    });
}
function objectToString(obj: Object): string {
    if (typeof obj == 'string') {
        return obj;
    }
    let result: string | undefined = undefined;
    try {
        result = JSON.stringify(obj);
    }
    catch (e) { // circular references
        result = obj.toString();
    }
    return result;
}
namespace ConsoleN {
    export enum LOG_LEVEL {
        INFO,
        WARN,
        ERROR
    }
    export function parseLogColor(level: LOG_LEVEL): ResourceColor {
        switch (level) {
            case LOG_LEVEL.WARN:
                return '#A66F00';
            case LOG_LEVEL.ERROR:
                return '#CD0000';
            default:
                return '#00CD00';
        }
    }
    export class LogInfo {
        id: number | null = null;
        message: string | null = null;
        level: LOG_LEVEL | null = null;
    }
    export class Model {
        onLogAppendListener: (message: string, level: LOG_LEVEL) => void = () => {
        };
        log(message: string | Object, ...args: any[]) {
            let messageStr: string = objectToString(message);
            console.log(messageStr, ...args);
            this.appendLog(format(messageStr, ...args), LOG_LEVEL.INFO);
        }
        info(message: string, ...args: any[]) {
            let messageStr: string = objectToString(message);
            console.info(messageStr, ...args);
            this.appendLog(format(messageStr, ...args), LOG_LEVEL.INFO);
        }
        warn(message: string, ...args: any[]) {
            let messageStr: string = objectToString(message);
            console.warn(messageStr, ...args);
            this.appendLog(format(messageStr, ...args), LOG_LEVEL.WARN);
        }
        error(message: string, ...args: any[]) {
            let messageStr: string = objectToString(message);
            console.error(messageStr, ...args);
            this.appendLog(format(messageStr, ...args), LOG_LEVEL.ERROR);
        }
        setOnLogAppendListener(listener: (message: string, level: LOG_LEVEL) => void) {
            this.onLogAppendListener = listener;
        }
        appendLog(message: string, level: LOG_LEVEL) {
            this.onLogAppendListener && this.onLogAppendListener(message, level);
        }
    }
}
export default ConsoleN;
