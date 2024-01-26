/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
 */
class DateUtils {
    /**
        * 对日期进行格式化， 和C#大致一致 默认yyyy-MM-dd HH:mm:ss
        * 可不带参数 一个日期参数 或一个格式化参数
        * @param date 要格式化的日期
        * @param format 进行格式化的模式字符串
        *     支持的模式字母有：
        *     y:年,
        *     M:年中的月份(1-12),
        *     d:月份中的天(1-31),
        *     H:小时(0-23),
        *     h:小时(0-11),
        *     m:分(0-59),
        *     s:秒(0-59),
        *     f:毫秒(0-999),
        *     q:季度(1-4)
        * @return String
        */
    public static dateFormat(date?: any, format?: string): string {
        //无参数
        if (date == undefined && format == undefined) {
            date = new Date();
            format = "yyyy-MM-dd HH:mm:ss";
        }
        //无日期
        else if (typeof (date) == "string") {
            format = date;
            date = new Date();
        }
        //无格式化参数
        else if (format === undefined) {
            format = "yyyy-MM-dd HH:mm:ss";
        }
        else {
        }
        //没有分隔符的特殊处理
        var map = {
            "y": date.getFullYear() + "",
            "M": date.getMonth() + 1 + "",
            "d": date.getDate() + "",
            "H": date.getHours(),
            "m": date.getMinutes() + "",
            "s": date.getSeconds() + "",
            "q": Math.floor((date.getMonth() + 3) / 3) + "",
            "f": date.getMilliseconds() + "" //毫秒
        };
        //小时 12
        if (map["H"] > 12) {
            map["h"] = map["H"] - 12 + "";
        }
        else {
            map["h"] = map["H"] + "";
        }
        map["H"] += "";
        var reg = "yMdHhmsqf";
        var all = "", str = "";
        for (var i = 0, n = 0; i < reg.length; i++) {
            n = format.indexOf(reg[i]);
            if (n < 0) {
                continue;
            }
            all = "";
            for (; n < format.length; n++) {
                if (format[n] != reg[i]) {
                    break;
                }
                all += reg[i];
            }
            if (all.length > 0) {
                if (all.length == map[reg[i]].length) {
                    str = map[reg[i]];
                }
                else if (all.length > map[reg[i]].length) {
                    if (reg[i] == "f") {
                        str = map[reg[i]] + this.charString("0", all.length - map[reg[i]].length);
                    }
                    else {
                        str = this.charString("0", all.length - map[reg[i]].length) + map[reg[i]];
                    }
                }
                else {
                    switch (reg[i]) {
                        case "y":
                            str = map[reg[i]].substr(map[reg[i]].length - all.length);
                            break;
                        case "f":
                            str = map[reg[i]].substr(0, all.length);
                            break;
                        default:
                            str = map[reg[i]];
                            break;
                    }
                }
                format = format.replace(all, str);
            }
        }
        return format;
    }
    /**
        * 返回字符串 为n个char构成
        * @param char 重复的字符
        * @param count 次数
        * @return String
        */
    public static charString(char: string, count: number): string {
        var str: string = "";
        while (count--) {
            str += char;
        }
        return str;
    }
}
export default DateUtils;
