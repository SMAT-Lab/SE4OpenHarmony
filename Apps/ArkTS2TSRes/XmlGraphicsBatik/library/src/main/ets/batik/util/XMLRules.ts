let __generate__Id: number = 0;
function generateId(): string {
    return "XMLRules_" + ++__generate__Id;
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
/*
 * 预定义实体名称与其替换值的映射
 * @type {Readonly<{[name: string]: string}>}
 * @see https://www.w3.org/TR/xml/ 4.6节 Predefined Entities
 */
import { MakePropertiesImmutable } from '../tools/MakePropertiesImmutable';
export const predefinedEntities = new MakePropertiesImmutable('&', '\'', '>', '<', '"');
/*
 * 获取Unicode code
 * @param char 要获取Unicode码的字符
 * @return 对应字符的Unicode码
 */
export function getCodePoint(char: string): number {
    return char.charCodeAt(0) || -1;
}
/*
 * 判断字符是否为XML字符
 * @param char 要判断的字符
 * @see https://www.w3.org/TR/xml/ 2.2节
 * @return 是否为XML字符
 */
export function isXmlChar(char: string): boolean {
    let cp = getCodePoint(char);
    return cp === 0x9
        || cp === 0xA
        || cp === 0xD
        || (cp >= 0x20 && cp <= 0xD7FF)
        || (cp >= 0xE000 && cp <= 0xFFFD)
        || (cp >= 0x10000 && cp <= 0x10FFFF);
}
/*
 * 判断字符是否为空白
 * @param char 要判断的字符
 * @see https://www.w3.org/TR/xml/ 2.3节 Whitespace
 * @return 是否为空白字符
 */
export function isWhitespace(char: string): boolean {
    let cp = getCodePoint(char);
    return cp === 0x20
        || cp === 0x9
        || cp === 0xA
        || cp === 0xD;
}
/*
 * 是否为命名空间开始字符
 * Name 的第一个字符必须是NameStartChar，任何其他字符必须是NameChars；
 * @param char 要判断的字符
 * @see https://www.w3.org/TR/xml/ 2.3节 Names and Tokens
 * @return 是否为NameStartChar字符
 */
export function isNameStartChar(char: string): boolean {
    let cp = getCodePoint(char);
    return cp === 0x3A // :
        || cp === 0x5F // _
        || (cp >= 0x41 && cp <= 0x5A) // A-Z
        || (cp >= 0x61 && cp <= 0x7A) // a-z
        || (cp >= 0xC0 && cp <= 0xD6)
        || (cp >= 0xD8 && cp <= 0xF6)
        || (cp >= 0xF8 && cp <= 0x2FF)
        || (cp >= 0x370 && cp <= 0x37D)
        || (cp >= 0x37F && cp <= 0x1FFF)
        || (cp >= 0x200C && cp <= 0x200D)
        || (cp >= 0x2070 && cp <= 0x218F)
        || (cp >= 0x2C00 && cp <= 0x2FEF)
        || (cp >= 0x3001 && cp <= 0xD7FF)
        || (cp >= 0xF900 && cp <= 0xFDCF)
        || (cp >= 0xFDF0 && cp <= 0xFFFD)
        || (cp >= 0x10000 && cp <= 0xEFFFF);
}
/*
 * 是否为命名空间字符
 * @param char 要判断的字符
 * @see https://www.w3.org/TR/xml/ 2.3节 Names and Tokens
 * @return 是否为NameChar字符
 */
export function isNameChar(char: string): boolean {
    if (isNameStartChar(char)) {
        return true;
    }
    let cp = getCodePoint(char);
    return cp === 0x2D // -
        || cp === 0x2E // .
        || (cp >= 0x30 && cp <= 0x39) // 0-9
        || cp === 0xB7
        || (cp >= 0x300 && cp <= 0x36F)
        || (cp >= 0x203F && cp <= 0x2040);
}
/**
 * 判断是否为引用字符
 * @param char 字符
 * @see https://www.w3.org/TR/xml/ 4.1节[66] CharRef
 * @return 如果是引用字符，则返回true
 */
export function isReferenceChar(char: string) {
    return char === '#' || isNameChar(char);
}
