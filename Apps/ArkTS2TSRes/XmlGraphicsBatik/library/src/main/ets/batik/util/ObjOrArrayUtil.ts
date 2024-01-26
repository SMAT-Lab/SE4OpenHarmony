let __generate__Id: number = 0;
function generateId(): string {
    return "ObjOrArrayUtil_" + ++__generate__Id;
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
import SVGAttrConstants from "../constants/SVGAttrConstants";
import { isArray } from "../tools/IsArrayFunction";
export let PathOrders: string[] = ['M', 'm', 'L', 'l', 'H', 'h', 'V', 'v', 'C', 'c', 'S', 's', 'Q',
    'q', 'T', 't', 'A', 'a', 'Z', 'z'];
export let ArrayTypeRange: string[] = [SVGAttrConstants.ATTR_VALUE_ELEMENT, SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT];
export let ArrayTextObjKeys: string[] = [SVGAttrConstants.ATTR_KEY_TYPE, SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT];
export let ArrayElementsObjKeys: string[] = [SVGAttrConstants.ATTR_KEY_TYPE,
    SVGAttrConstants.ATTR_KEY_NAME,
    SVGAttrConstants.ATTR_KEY_ATTRIBUTES,
    SVGAttrConstants.ATTR_KEY_ELEMENTS];
export let ArrayAllObjKeys: string[] = [SVGAttrConstants.ATTR_KEY_TYPE,
    SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT,
    SVGAttrConstants.ATTR_KEY_NAME,
    SVGAttrConstants.ATTR_KEY_ATTRIBUTES,
    SVGAttrConstants.ATTR_KEY_ELEMENTS];
/**
 * 获取指定key值在给定的JS对象中的索引
 * @param obj 查找主键的对象
 * @param key 要查找的主键
 */
export function hasKeyInObj(obj: Object, key: string): number | boolean {
    let objKeys: string[] = Object.keys(obj);
    let indexOfKey = objKeys.indexOf(key);
    // -1 代表未找到， 0会被计算为false,所以对0进行特殊处理
    if (indexOfKey !== -1 && indexOfKey !== 0) {
        return indexOfKey;
    }
    else if (indexOfKey === 0) {
        return true;
    }
    return false;
}
/**
 * 检验ELements节点的格式是否正确
 * @param elementsObj 节点数据
 */
export function checkElements(elementsObj: Record<string, string> | string | object): boolean {
    if (typeof elementsObj !== SVGAttrConstants.TYPEOF_OBJECT) {
        return false;
    }
    if (isArray(elementsObj)) {
        let criteria: number = 0;
        // Array中应该按照 SVGCommon定义
        elementsObj.forEach((value: Record<string, string>) => {
            if (!checkObjElements(value)) {
                criteria = 1;
            }
        });
        if (criteria == 1) {
            return false;
        }
    }
    else {
        return checkObjElements(elementsObj);
    }
    return false;
}
/**
 * 检验Obj格式
 * @param elementsObj 要被检验格式的对象
 */
export function checkObjElements(elementsObj: Record<string, string> | string | object): boolean {
    let criteria: number = 0;
    if (typeof elementsObj === SVGAttrConstants.TYPEOF_OBJECT && !isArray(elementsObj)) {
        if (hasKeyInObj(elementsObj, SVGAttrConstants.ATTR_KEY_TYPE)) {
            let elementType: string = elementsObj[SVGAttrConstants.ATTR_KEY_TYPE];
            if (elementType === SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT) {
                return checkKeyInArray(elementsObj, SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT);
            }
            else if (elementType === SVGAttrConstants.ATTR_VALUE_ELEMENT) {
                return checkKeyInArray(elementsObj, SVGAttrConstants.ATTR_VALUE_ELEMENT);
            }
            return false;
        }
        else {
            criteria = 1;
        }
    }
    if (criteria == 1) {
        return false;
    }
    return false;
}
/**
 * 检验主键是否在对应范围内
 * @param elementsObj 要被检验主键的对象
 * @param elementType 节点类型
 */
export function checkKeyInArray(elementsObj: Record<string, string> | string | object, elementType: string): boolean {
    if (typeof elementsObj !== SVGAttrConstants.TYPEOF_OBJECT || isArray(elementsObj)) {
        return false;
    }
    let array: string[] = Object.keys(elementsObj);
    if (elementType === SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT) {
        if (!hasKeyInObj(elementsObj, SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT)) {
            return false;
        }
        let criteria: number = 0;
        array.forEach(value => {
            let index = ArrayTextObjKeys.indexOf(value);
            if (index === -1) {
                criteria = 1;
            }
        });
        if (criteria == 1) {
            return false;
        }
    }
    else if (elementType === SVGAttrConstants.ATTR_VALUE_ELEMENT) {
        if (!hasKeyInObj(elementsObj, SVGAttrConstants.ATTR_KEY_NAME)) {
            return false;
        }
        else {
            let tagName: string = elementsObj[SVGAttrConstants.ATTR_KEY_NAME];
            if (!tagName) {
                return false;
            }
        }
        let criteria: number | string = 0;
        array.forEach(value => {
            let index = ArrayElementsObjKeys.indexOf(value);
            if (index === -1) {
                criteria = 1;
            }
            else if (value === SVGAttrConstants.ATTR_VALUE_ELEMENT) {
                criteria = value;
            }
        });
        if (criteria == 1) {
            return false;
        }
        if (criteria != 1 && criteria != 0) {
            return checkElements(elementsObj[criteria] as Record<string, string>);
        }
    }
    else {
        let criteria: number = 0;
        array.forEach(value => {
            let index = ArrayAllObjKeys.indexOf(value);
            if (index === -1) {
                criteria = 1;
            }
        });
        if (criteria == 1) {
            return false;
        }
    }
    return true;
}
