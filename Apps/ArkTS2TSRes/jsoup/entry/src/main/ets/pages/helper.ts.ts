/**
 * The MIT License
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import type { Parser } from "@ohos/htmlparser2";
import { Handler } from '@ohos/htmlparser2/src/main/ets/esm/Parser';
interface Event {
    $event: string;
    data: unknown[];
    startIndex: number;
    endIndex: number;
}
/**
 * Creates a handler that calls the supplied callback with simplified events on
 * completion.
 *
 * @internal
 * @param callback Function to call with all events.
 */
export function getEventCollector(callback: (error: Error | null, data?: ESObject) => void): Partial<Handler> {
    const events: Event[] = [];
    let parser: Parser;
    function handle(event: string, data: unknown[]): void {
        switch (event) {
            case "onerror": {
                callback(data[0] as Error);
                break;
            }
            case "onend": {
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data,
                });
                break;
            }
            case "onreset": {
                events.length = 0;
                break;
            }
            case "onparserinit": {
                parser = data[0] as Parser;
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data, parser,
                });
                break;
            }
            case "onopentag": {
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data: data,
                });
                break;
            }
            case "ontext": {
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data: data,
                });
                break;
            }
            case "onclosetag": {
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data: data[0],
                });
                break;
            }
            case "onattribute": {
                console.info("test----" + JSON.stringify(data));
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data: data,
                });
                break;
            }
            case "onopentagname": {
                callback(null, {
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data: data,
                });
                break;
            }
            default: {
                const last = events[events.length - 1];
                if (event === "ontext" && last && last.$event === "text") {
                    (last.data[0] as string) += data[0];
                    last.endIndex = parser.endIndex;
                    break;
                }
                // if (event === "onattribute" && data[2] === undefined) {
                //     data.pop();
                // }
                if (!(parser.startIndex <= parser.endIndex)) {
                    throw new Error(`Invalid start/end index ${parser.startIndex} > ${parser.endIndex}`);
                }
                events.push({
                    $event: event.slice(2),
                    startIndex: parser.startIndex,
                    endIndex: parser.endIndex,
                    data,
                });
                parser.endIndex;
            }
        }
    }
    return new Proxy({}, {
        get: (_, event: string) => (...data: unknown[]) => handle(event, data),
    });
}
