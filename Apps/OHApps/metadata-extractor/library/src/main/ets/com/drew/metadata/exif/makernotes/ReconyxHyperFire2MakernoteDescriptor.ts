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

import { ReconyxHyperFire2MakernoteDirectory } from './ReconyxHyperFire2MakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';

export class ReconyxHyperFire2MakernoteDescriptor extends TagDescriptor<ReconyxHyperFire2MakernoteDirectory> {
  constructor(directory: ReconyxHyperFire2MakernoteDirectory) {
    super(directory)
  }

  getDescription(tagType: number) {
    switch (tagType) {

      case ReconyxHyperFire2MakernoteDirectory.TAG_FILE_NUMBER:
        return "" + this._directory.getInteger(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_DIRECTORY_NUMBER:
        return "" + this._directory.getInteger(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_VERSION:
        return "" + this._directory.getString(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_FIRMWARE_DATE:
        let dtFirm = this._directory.getString(tagType);
        try {
          let parser = this.getDate(dtFirm);
          return this.dateFormat("yyyy:MM:dd HH:mm:ss", parser)
        } catch (e) {
          return null;
        }

      case ReconyxHyperFire2MakernoteDirectory.TAG_TRIGGER_MODE:
        return this._directory.getString(tagType);

      case ReconyxHyperFire2MakernoteDirectory.TAG_SEQUENCE:
        let sequence = this._directory.getIntArray(tagType);
        if (sequence == null)
        return null;
        return "" + sequence[0] + sequence[1]

      case ReconyxHyperFire2MakernoteDirectory.TAG_EVENT_NUMBER:
        return this._directory.getInteger(tagType);

      case ReconyxHyperFire2MakernoteDirectory.TAG_DATE_TIME_ORIGINAL:
        let date = this._directory.getString(tagType);
        try {
          let parser = this.getDate(date);
          return this.dateFormat("yyyy:MM:dd HH:mm:ss", parser)
        } catch (e) {
          return null;
        }

      case ReconyxHyperFire2MakernoteDirectory.TAG_DAY_OF_WEEK:
        return this.getIndexedDescription(tagType, "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

      case ReconyxHyperFire2MakernoteDirectory.TAG_MOON_PHASE:
        return this.getIndexedDescription(tagType, "New", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full", "Waning Gibbous", "Last Quarter", "Waning Crescent");

      case ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE_FAHRENHEIT:
      case ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_TEMPERATURE:
        return "" + this._directory.getInteger(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_CONTRAST:
      case ReconyxHyperFire2MakernoteDirectory.TAG_BRIGHTNESS:
      case ReconyxHyperFire2MakernoteDirectory.TAG_SHARPNESS:
      case ReconyxHyperFire2MakernoteDirectory.TAG_SATURATION:
        return "" + this._directory.getInteger(tagType);

      case ReconyxHyperFire2MakernoteDirectory.TAG_FLASH:
        return "" + this.getIndexedDescription(tagType, "Off", "On");

    // ?????
      case ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_INFRARED:
      case ReconyxHyperFire2MakernoteDirectory.TAG_AMBIENT_LIGHT:
        return this._directory.getInteger(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_MOTION_SENSITIVITY:
        return this._directory.getInteger(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE:
      case ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_VOLTAGE_AVG:
        let value = this._directory.getDoubleObject(tagType)
        return value.toFixed(3)

      case ReconyxHyperFire2MakernoteDirectory.TAG_BATTERY_TYPE:
        return "" + this._directory.getInteger(tagType)

      case ReconyxHyperFire2MakernoteDirectory.TAG_USER_LABEL:
        return this._directory.getString(tagType);
      case ReconyxHyperFire2MakernoteDirectory.TAG_SERIAL_NUMBER:
      // default is UTF_16LE
        let svalue = this._directory.getStringValue(tagType);
        if (svalue == null)
        return null;
        return svalue.toString();

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