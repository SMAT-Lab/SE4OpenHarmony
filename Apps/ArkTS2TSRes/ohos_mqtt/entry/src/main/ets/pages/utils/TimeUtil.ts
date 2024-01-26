let __generate__Id: number = 0;
function generateId(): string {
    return "TimeUtil_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the  Eclipse Public License -v 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.eclipse.org/legal/epl-2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 时间工具类
 */
export default class TimeUtil {
    public static currentTimeStamp(): string {
        let date = new Date();
        return TimeUtil.timeFormat(date, "{h}:{i}:{s}");
    }
    public static timeFormat(time: Date, format: string): string {
        const format_: string = format || "{y}-{m}-{d} {h}:{i}:{s}";
        const timeObj: Time = {
            y: time.getFullYear(),
            m: time.getMonth() + 1,
            d: time.getDate(),
            h: time.getHours(),
            i: time.getMinutes(),
            s: time.getSeconds()
        };
        let regex: RegExp = new RegExp("{(y|m|d|h|i|s)+}", "g");
        const timeString: string = format_.replace(regex, (result: string, key: string) => {
            let value: number = 0;
            if (key === "h") {
                value = timeObj.h;
            }
            else if (key === "i") {
                value = timeObj.i;
            }
            else {
                value = timeObj.s;
            }
            if (result.length > 0 && value < 10) {
                return "0" + value;
            }
            return value.toString() || '0';
        });
        return timeString;
    }
}
class Time {
    y: number = 0;
    m: number = 0;
    d: number = 0;
    h: number = 0;
    i: number = 0;
    s: number = 0;
}
