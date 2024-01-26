let __generate__Id: number = 0;
function generateId(): string {
    return "SVGDeclares_" + ++__generate__Id;
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
import { SVGRoot } from "./SVGRoot";
import SVGAttrConstants from "../constants/SVGAttrConstants";
export class SVGDeclares {
    //{"declaration":{"attributes":{"version":"1.0","encoding":"utf-8","standalone":"yes"}},"elements":[{}]}
    private _version: string = "1.0";
    private _encoding: string = "utf-8";
    private _standalone: string = "yes";
    // 根节点
    private _root: Record<string, Record<string, Record<string, string>> | Array<Object>> = {};
    private _declaration: Record<string, Record<string, string>> = {};
    private _attributes: Record<string, string> = {};
    private _elements: Array<Object> = [];
    private _svgObj: Record<string, object | string | ArrayConstructor> = {};
    private _svg: SVGRoot = new SVGRoot();
    public constructor() {
    }
    public setEncoding(newEncoding: string): void {
        this._encoding = newEncoding;
        this._attributes['encoding'] = this._encoding;
    }
    public setStandalone(newStandalone: boolean): void {
        if (newStandalone) {
            this._standalone = "yes";
            this._attributes['standalone'] = "yes";
        }
        else {
            this._standalone = "no";
            this._attributes['standalone'] = "no";
        }
    }
    public setXMLVersion(xmlVersion: string): void {
        this._version = xmlVersion;
        this._attributes['version'] = this._version;
    }
    public toObj(): object {
        this._declaration[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] = this._attributes;
        this._root[SVGAttrConstants.ATTR_KEY_DECLARATION] = this._declaration;
        // 配置默认SVG标签对应的对象
        this._svgObj[SVGAttrConstants.ATTR_KEY_TYPE] = SVGAttrConstants.ATTR_VALUE_ELEMENT;
        this._svgObj[SVGAttrConstants.ATTR_KEY_NAME] = 'svg';
        this._svgObj[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] = this._svg.toObj();
        this._svgObj[SVGAttrConstants.ATTR_KEY_ELEMENTS] = new Array();
        this._elements.push(this._svgObj);
        this._root[SVGAttrConstants.ATTR_KEY_ELEMENTS] = this._elements;
        return this._root;
    }
}
