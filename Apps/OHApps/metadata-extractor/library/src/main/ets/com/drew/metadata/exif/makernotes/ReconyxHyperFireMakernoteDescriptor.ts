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

import { ReconyxHyperFireMakernoteDirectory } from './ReconyxHyperFireMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';

export class ReconyxHyperFireMakernoteDescriptor extends TagDescriptor<ReconyxHyperFireMakernoteDirectory> {
  constructor(directory: ReconyxHyperFireMakernoteDirectory) {
    super(directory)
  }

  getDescription(tagType: number): string{
    switch (tagType) {
      case ReconyxHyperFireMakernoteDirectory.TAG_MAKERNOTE_VERSION:
        return "" + this._directory.getInteger(tagType);
      case ReconyxHyperFireMakernoteDirectory.TAG_FIRMWARE_VERSION:
        return this._directory.getString(tagType);
      case ReconyxHyperFireMakernoteDirectory.TAG_TRIGGER_MODE:
        return this._directory.getString(tagType);
      case ReconyxHyperFireMakernoteDirectory.TAG_SEQUENCE:
        let sequence = this._directory.getIntArray(tagType);
        if (sequence == null)
        return null;
        return "" + sequence[0] + sequence[1]
      case ReconyxHyperFireMakernoteDirectory.TAG_EVENT_NUMBER:
        return this._directory.getInteger(tagType)
      case ReconyxHyperFireMakernoteDirectory.TAG_MOTION_SENSITIVITY:
        return this._directory.getInteger(tagType)
      case ReconyxHyperFireMakernoteDirectory.TAG_BATTERY_VOLTAGE:
        let value = this._directory.getDoubleObject(tagType)
        let formatter = value.toFixed(3)
        return value == null ? null : formatter;
      case ReconyxHyperFireMakernoteDirectory.TAG_DATE_TIME_ORIGINAL:
        let date = this._directory.getString(tagType);
        try {

          let parser = this.dateFormat("yyyy:MM:dd HH:mm:ss", this.getDate(date))
          return parser.format(parser.parse(date));
        } catch (e) {
          return null;
        }
      case ReconyxHyperFireMakernoteDirectory.TAG_MOON_PHASE:
        return this.getIndexedDescription(tagType, "New", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full", "Waning Gibbous", "Last Quarter", "Waning Crescent");
      case ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT:
      case ReconyxHyperFireMakernoteDirectory.TAG_AMBIENT_TEMPERATURE:
        return "" + this._directory.getInteger(tagType);
      case ReconyxHyperFireMakernoteDirectory.TAG_SERIAL_NUMBER:
      // default is UTF_16LE
        let svalue = this._directory.getStringValue(tagType);
        if (svalue == null)
        return null;
        return svalue.toString();
      case ReconyxHyperFireMakernoteDirectory.TAG_CONTRAST:
      case ReconyxHyperFireMakernoteDirectory.TAG_BRIGHTNESS:
      case ReconyxHyperFireMakernoteDirectory.TAG_SHARPNESS:
      case ReconyxHyperFireMakernoteDirectory.TAG_SATURATION:
        return this._directory.getInteger(tagType);
      case ReconyxHyperFireMakernoteDirectory.TAG_INFRARED_ILLUMINATOR:
        return this.getIndexedDescription(tagType, "Off", "On");
      case ReconyxHyperFireMakernoteDirectory.TAG_USER_LABEL:
        return this._directory.getString(tagType);
      default:
        return super.getDescription(tagType);
    }
  }

  getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
      function (a) {
        return parseInt(a, 10) - 1;
      }).match(/\d+/g) + ')');
    return date;
  }

  dateFormat(fmt, date) {
    let ret;
    //yyyy:MM:dd HH:mm:ss
    const opt = {
      "y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "s+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
      ;
    }
    ;
    return fmt;
  }
}