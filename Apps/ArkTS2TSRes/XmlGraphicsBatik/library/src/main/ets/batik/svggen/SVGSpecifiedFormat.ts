let __generate__Id: number = 0;
function generateId(): string {
    return "SVGSpecifiedFormat_" + ++__generate__Id;
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
import { ArrayTypeRange } from "../util/ObjOrArrayUtil";
import SVGAttrConstants from "../constants/SVGAttrConstants";
import { isArray } from '../tools/IsArrayFunction';
/**
 * 处理SVG文件的
 * @param elementType
 */
export class SVGSpecifiedFormat {
    // 承接SVG对象结果的对象
    private _formatResultObj: Record<string, string | object> = {};
    private _textObj: Record<string, string> = {};
    private _elements: Array<Object> = [];
    /**
     * 设置节点类型
     * @param elementType 节点类型
     */
    public setElementType(elementType: string): void {
        let index = ArrayTypeRange.indexOf(elementType);
        if (index === -1) {
            return;
        }
        this._formatResultObj[SVGAttrConstants.ATTR_KEY_TYPE] = elementType;
    }
    /**
     * 获取节点类型
     */
    public getElementType(): string {
        return this._formatResultObj[SVGAttrConstants.ATTR_KEY_TYPE] as string;
    }
    /**
     * 设置节点名称
     * @param elementName 节点名称
     */
    public setElementName(elementName: string): void {
        if (!elementName) {
            return;
        }
        this._formatResultObj[SVGAttrConstants.ATTR_KEY_NAME] = elementName;
    }
    /**
     * 获取节点名称
     */
    public getElementName(): string {
        return this._formatResultObj[SVGAttrConstants.ATTR_KEY_NAME] as string;
    }
    /**
     * 设置节点属性集合
     * @param attributes 属性集合
     */
    public setAttributes(attributes: Object): void {
        this._formatResultObj[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] = attributes;
    }
    /**
     * 获取属性集合
     */
    public getAttributes(): object {
        return this._formatResultObj[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as object;
    }
    /**
     * 设置节点的子节点（覆盖原有子节点值）
     * @param elements 子节点
     */
    public setElements(elementsInfo: Object): void {
        if (isArray(elementsInfo)) {
            this._elements = elementsInfo;
        }
        else {
            this._elements = new Array();
            this._elements.push(elementsInfo);
        }
        this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = this._elements;
    }
    /**
     * 添加节点的子节点（不覆盖原有子节点值）
     * @param elements 子节点
     */
    public addElements(elements: Object): void {
        let objKeys: string[] = Object.keys(this._formatResultObj);
        let indexOfKey = objKeys.indexOf(SVGAttrConstants.ATTR_KEY_ELEMENTS);
        if (indexOfKey === -1) {
            this._elements = new Array();
            if (isArray(elements)) {
                this._elements.concat(elements);
            }
            else {
                this._elements.push(elements);
            }
            this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = this._elements;
        }
        else {
            let elementsArray = this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS];
            if (isArray(elementsArray)) {
                if (isArray(elements)) {
                    elementsArray.concat(elements);
                }
                else {
                    elementsArray.push(elements);
                }
                this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = elementsArray;
            }
        }
    }
    /**
     * 获取当前节点的子节点
     */
    public getElements(): object {
        return this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] as object;
    }
    /**
     * 设置当前节点的文本（覆盖原有文本）
     * @param text 文本
     */
    public setElementsText(text: string): void {
        this._elements = new Array();
        this._textObj[SVGAttrConstants.ATTR_KEY_TYPE] = SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT;
        this._textObj[SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT] = text;
        this._elements.push(this._textObj);
        this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = this._elements;
    }
    /**
     * 添加当前节点的文本（不覆盖原有文本）
     * @param text 文本
     */
    public addElementsText(text: string): void {
        let objKeys: string[] = Object.keys(this._formatResultObj);
        let indexOfKey = objKeys.indexOf(SVGAttrConstants.ATTR_KEY_ELEMENTS);
        this._textObj[SVGAttrConstants.ATTR_KEY_TYPE] = SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT;
        this._textObj[SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT] = text;
        if (indexOfKey === -1) {
            this._elements = new Array();
            this._elements.push(this._textObj);
            this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = this._elements;
        }
        else {
            let elementsArray = this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS];
            if (isArray(elementsArray)) {
                elementsArray.push(this._textObj);
                this._formatResultObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = elementsArray;
            }
        }
    }
    /**
     * 获取标准格式节点内容
     */
    public toObj(): object {
        return this._formatResultObj;
    }
}
