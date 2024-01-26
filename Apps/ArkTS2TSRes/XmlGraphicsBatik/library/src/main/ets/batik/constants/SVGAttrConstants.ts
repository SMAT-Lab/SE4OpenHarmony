let __generate__Id: number = 0;
function generateId(): string {
    return "SVGAttrConstants_" + ++__generate__Id;
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
export default class SVGAttrConstants {
    // object类型
    public static TYPEOF_OBJECT: string = 'object';
    // string类型
    public static TYPEOF_STRING: string = 'string';
    // number类型
    public static TYPEOF_NUMBER: string = 'number';
    // bigint类型
    public static TYPEOF_BIGINT: string = 'bigint';
    // boolean类型
    public static TYPEOF_BOOLEAN: string = 'boolean';
    // symbol类型
    public static TYPEOF_SYMBOL: string = 'symbol';
    // undefined类型
    public static TYPEOF_UNDEFINED: string = 'undefined';
    // function类型
    public static TYPEOF_FUNCTION: string = 'function';
    // 主键：声明类型
    public static ATTR_KEY_DECLARATION: string = 'declaration';
    // 主键：属性类型
    public static ATTR_KEY_TYPE: string = 'type';
    // 主键：属性名称
    public static ATTR_KEY_NAME: string = 'name';
    // 主键：属性集合
    public static ATTR_KEY_ATTRIBUTES: string = 'attributes';
    // 主键：子节点
    public static ATTR_KEY_ELEMENTS: string = 'elements';
    // 节点类型：标签
    public static ATTR_VALUE_ELEMENT: string = 'element';
    // 节点类型：文本
    public static ATTR_KEY_OR_VALUE_TEXT: string = 'text';
}
