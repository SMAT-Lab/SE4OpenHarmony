
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 export default class DateUtil {
  static getCurrentTime(): string {
    let date = new Date;
    let yy = date.getFullYear(); //年
    let mm = date.getMonth() + 1; //月
    let dd = date.getDate(); //日
    let hh = date.getHours(); //时
    let ii = date.getMinutes(); //分
    let ss = date.getSeconds(); //秒
    let clock = yy + "/";
    if (mm < 10) clock += "0";
    clock += mm + "/";
    if (dd < 10) clock += "0";
    clock += dd + " ";
    if (hh < 10) clock += "0";
    clock += hh + ":";
    if (ii < 10) clock += '0';
    clock += ii + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return clock;
  }
}

