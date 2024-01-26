let __generate__Id: number = 0;
function generateId(): string {
    return "SVGRoot_" + ++__generate__Id;
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
import SVGXMLConstants from "../constants/SVGXMLConstants";
import XMLConstants from "../constants/XMLConstants";
interface optionsType {
    x: number;
    y: number;
    width: number;
    height: number;
}
export class SVGRoot {
    //SVG标签样式 `{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"100％","height":"100％"},"elements":[]}`
    private attributesObj: Record<string, string | number | optionsType> = {};
    /**
     * 设置SVG文件的命名空间
     * @param xmlns SVG文件的命名空间
     */
    public setXMLNS(xmlns: string): void {
        this.attributesObj[XMLConstants.XMLNS_PREFIX] = xmlns;
    }
    /**
     * 设置SVG命名空间
     * @param xlink 带别名的命名空间
     */
    public setXMLNSLink(xlink: string): void {
        this.attributesObj[XMLConstants.XLINK_QNAME] = xlink;
    }
    /**
     * 设置SVG标签id
     * @param id id
     */
    public setSvgId(id: string): void {
        this.attributesObj[XMLConstants.XML_ID_ATTRIBUTE] = id;
    }
    /**
     * 设置SVG是否保留空格
     * @param preserve 是否保留空格
     */
    public setXMLSpace(preserve: boolean): void {
        if (preserve) {
            this.attributesObj[XMLConstants.XML_SPACE_QNAME] = XMLConstants.XML_PRESERVE_VALUE;
        }
        else {
            this.attributesObj[XMLConstants.XML_SPACE_QNAME] = XMLConstants.XML_DEFAULT_VALUE;
        }
    }
    /**
     * 设置SVG图形的宽度
     * @param width 宽度
     */
    public setWidth(width: number): void {
        this.attributesObj[SVGXMLConstants.SVG_WIDTH_ATTRIBUTE] = width;
    }
    /**
     * 设置SVG图形的高度
     * @param height 高度
     */
    public setHeight(height: number): void {
        this.attributesObj[SVGXMLConstants.SVG_HEIGHT_ATTRIBUTE] = height;
    }
    /**
     * 设置SVG图形的显示盒子
     * @param x 左上角x坐标
     * @param y 左上角y坐标
     * @param width 宽度
     * @param height 高度
     */
    public setViewBox(x: number, y: number, width: number, height: number): void {
        let options: optionsType = { x: x, y: y, width: width, height: height };
        this.attributesObj[SVGXMLConstants.SVG_VIEW_BOX_ATTRIBUTE] = options;
    }
    /**
     * 设置属性键值对
     * @param key 主键
     * @param value 值
     */
    public addAttribute(key: string, value: string): void {
        this.attributesObj[key] = value;
    }
    /**
     * 获取设置的属性集合
     */
    public toObj(): object {
        let keys: string[] = Object.keys(this.attributesObj);
        let indexOfXMLNS = keys.indexOf(XMLConstants.XMLNS_PREFIX);
        if (indexOfXMLNS === -1) {
            this.attributesObj[XMLConstants.XMLNS_PREFIX] = XMLConstants.XMLNS_NAMESPACE_URI_SVG;
        }
        let indexOfXMLNSLink = keys.indexOf(XMLConstants.XLINK_QNAME);
        if (indexOfXMLNSLink === -1) {
            this.attributesObj[XMLConstants.XLINK_QNAME] = XMLConstants.XLINK_NAMESPACE_URI;
        }
        return this.attributesObj;
    }
}
