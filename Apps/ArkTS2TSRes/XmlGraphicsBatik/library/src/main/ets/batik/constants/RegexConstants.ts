let __generate__Id: number = 0;
function generateId(): string {
    return "RegexConstants_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
export default class RegexConstants {
    // XML中全局查找回车、换行符正则表达式
    public static REGEX_GLOBAL_REPLACE_ENTER: RegExp = new RegExp("\\r\\n?", "g");
    // 验证XML版本号正则表达式:'1.' [0-9]+
    public static REGEX_VERSION: RegExp = new RegExp("^1\\.[0-9]+$");
    // 查找docType中[ 或 > 之前的字符
    public static REGEX_DOC_TYPE: RegExp = new RegExp("[^[>]+", "y");
    // 查找docType中[ 到 ]> 之间的字符：[与]之间可以存在多个空格或非空格字符； ]与>之间可以存在多个 空格、制表符、回车、换行符
    public static REGEX_DOC_TYPE_INT_SUBSET: RegExp = new RegExp("\\[[\\s\\S]+?\\][\\x20\\t\\r\\n]*>", "y");
    // 查找被 " & < 分隔的字符串
    public static REGEX_DOUBLE_QUOTATION_MARK: RegExp = new RegExp("[^\"&<]+", "y");
    // 查找被 ' & < 分隔的字符串
    public static REGEX_SINGLE_QUOTATION_MARK: RegExp = new RegExp("[^'&<]+", "y");
    // 查找制表符、回车、换行符
    public static REGEX_T_R_N: RegExp = new RegExp("[\\t\\r\\n]", "g");
    // 查找 < 或 & 或 ]]> 字符
    public static REGEX_SPECIAL_MARK: RegExp = new RegExp("<|&|]]>", "g");
    // 查找多字节字符
    public static REGEX_MULTIBYTE: RegExp = new RegExp("[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]", "g");
    // 是否为名称起始字符及名称字符的合集
    public static REGEX_NAME: RegExp = new RegExp("[:A-Za-z][-._:A-Za-z0-9]*");
}
