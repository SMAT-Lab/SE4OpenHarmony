/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { ReconyxUltraFireMakernoteDirectory } from './ReconyxUltraFireMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
export class ReconyxUltraFireMakernoteDescriptor extends TagDescriptor<ReconyxUltraFireMakernoteDirectory> {
    constructor(directory: ReconyxUltraFireMakernoteDirectory) {
        super(directory);
    }
    getDescription(tagType: number) {
        switch (tagType) {
            case ReconyxUltraFireMakernoteDirectory.TAG_LABEL:
                return this._directory.getString(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_ID:
                return this._directory.getInteger(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_SIZE:
                return this._directory.getInteger(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_PUBLIC_ID:
                return this._directory.getInteger(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_MAKERNOTE_PUBLIC_SIZE:
                return this._directory.getInteger(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_CAMERA_VERSION:
            case ReconyxUltraFireMakernoteDirectory.TAG_UIB_VERSION:
            case ReconyxUltraFireMakernoteDirectory.TAG_BTL_VERSION:
            case ReconyxUltraFireMakernoteDirectory.TAG_PEX_VERSION:
            case ReconyxUltraFireMakernoteDirectory.TAG_EVENT_TYPE:
                return this._directory.getString(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_SEQUENCE:
                let sequence = this._directory.getIntArray(tagType);
                if (sequence == null)
                    return null;
                return "" + sequence[0] + sequence[1];
            case ReconyxUltraFireMakernoteDirectory.TAG_EVENT_NUMBER:
                return this._directory.getInteger(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL:
                let date = this._directory.getString(tagType);
                try {
                    return this.dateFormat("yyyy:MM:dd HH:mm:ss", this.getDate(date));
                }
                catch (e) {
                    return null;
                }
            /*case TAG_DAY_OF_WEEK:
                return getIndexedDescription(tagType, CultureInfo.CurrentCulture.DateTimeFormat.DayNames);*/
            case ReconyxUltraFireMakernoteDirectory.TAG_MOON_PHASE:
                return this.getIndexedDescription(tagType, "New", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full", "Waning Gibbous", "Last Quarter", "Waning Crescent");
            case ReconyxUltraFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT:
            case ReconyxUltraFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE:
                return this._directory.getInteger(tagType);
            case ReconyxUltraFireMakernoteDirectory.TAG_FLASH:
                return this.getIndexedDescription(tagType, "Off", "On");
            case ReconyxUltraFireMakernoteDirectory.TAG_BATTERY_VOLTAGE:
                let value = this._directory.getDoubleObject(tagType);
                let formatter = value.toFixed(3);
                return value == null ? null : formatter;
            case ReconyxUltraFireMakernoteDirectory.TAG_SERIAL_NUMBER:
                // default is UTF_8
                let svalue = this._directory.getStringValue(tagType);
                if (svalue == null)
                    return null;
                return svalue.toString();
            case ReconyxUltraFireMakernoteDirectory.TAG_USER_LABEL:
                return this._directory.getString(tagType);
            default:
                return super.getDescription(tagType);
        }
    }
    getDate(strDate) {
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, function (a) {
            return parseInt(a, 10) - 1;
        }).match(/\d+/g) + ')');
        return date;
    }
    dateFormat(fmt, date) {
        let ret;
        //yyyy:MM:dd HH:mm:ss
        const opt = {
            "y+": date.getFullYear().toString(),
            "M+": (date.getMonth() + 1).toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "m+": date.getMinutes().toString(),
            "s+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
            }
            ;
        }
        ;
        return fmt;
    }
}
