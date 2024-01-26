let __generate__Id: number = 0;
function generateId(): string {
    return "utils_" + ++__generate__Id;
}
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
const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
let myDate = new Date;
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let hours = myDate.getHours();
let day = myDate.getDay();
// 获取日期，格式：xx年xx月
const getDate = () => {
    return mon + "月" + date + "日";
};
// 获取星期几
const getDay = () => {
    let day = myDate.getDay();
    return weeks[day];
};
// 获取今日往后五天
const getDayArr = () => {
    let arr = [];
    arr.push("今天", "明天", weeks[day <= 4 ? day + 2 : day - 5], weeks[day <= 3 ? day + 3 : day - 4], weeks[day <= 2 ? day + 4 : day - 3]);
    return arr;
};
// 获取时间此刻往后五小时
const getHoursArr = () => {
    let hoursArr = [];
    for (var i = 0; i < 5; i++) {
        hoursArr.push(hours + i + ":00");
    }
    return hoursArr;
};
// utils
const utils = {
    getDate,
    getDay,
    getDayArr,
    getHoursArr
};
export default utils;
