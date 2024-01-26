interface Index_Params {
    svgManager?: SVGManager;
    allAttrPolylineObj?: object;
    svgUri?: string;
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testOperatePolylinePage_" + ++__generate__Id;
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
import { SVGManager } from '@ohos/XmlGraphicsBatik';
import { SVGPolygonAndPolyLine } from '@ohos/XmlGraphicsBatik';
import { SVGSpecifiedFormat } from '@ohos/XmlGraphicsBatik';
import { consoleInfo } from '@ohos/XmlGraphicsBatik';
import { SVGAttrConstants } from '@ohos/XmlGraphicsBatik';
import fileio from '@ohos.fileio';
import { GlobalContext } from '@ohos/XmlGraphicsBatik';
import { isArray } from '../tools/IsArrayFunction';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.svgManager = SVGManager.getInstance();
        this.allAttrPolylineObj = new Object();
        this.__svgUri = new ObservedPropertySimple('', this, "svgUri");
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.allAttrPolylineObj !== undefined) {
            this.allAttrPolylineObj = params.allAttrPolylineObj;
        }
        if (params.svgUri !== undefined) {
            this.svgUri = params.svgUri;
        }
        if (params.filePath !== undefined) {
            this.filePath = params.filePath;
        }
    }
    aboutToBeDeleted() {
        this.__svgUri.aboutToBeDeleted();
        this.__filePath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private svgManager: SVGManager;
    private allAttrPolylineObj: object;
    private __svgUri: ObservedPropertySimple<string>;
    get svgUri() {
        return this.__svgUri.get();
    }
    set svgUri(newValue: string) {
        this.__svgUri.set(newValue);
    }
    private __filePath: ObservedPropertySimple<string>;
    get filePath() {
        return this.__filePath.get();
    }
    set filePath(newValue: string) {
        this.__filePath.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Image.create(this.svgUri);
        Image.backgroundColor(Color.Pink);
        Image.width(250);
        Image.height(250);
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('add polyline1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let polyline: SVGPolygonAndPolyLine = new SVGPolygonAndPolyLine();
            let points: number[] = new Array();
            points.push(10);
            points.push(10);
            points.push(150);
            points.push(50);
            polyline.setPoints(points);
            polyline.addPoints(70, 70);
            polyline.addAttribute('style', 'fill:none;stroke-width:5;stroke:rgb(0,0,0)');
            let polylineObj = polyline.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('polyline');
            svgSpecifiedFormat.setAttributes(polylineObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.allAttrPolylineObj = svgSpecifiedFormat.toObj();
                this.svgManager.addChildNode(svgRoot, this.allAttrPolylineObj);
                consoleInfo('Test polyline: add polyline svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Button.createWithLabel('add polyline2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let polyline: SVGPolygonAndPolyLine = new SVGPolygonAndPolyLine();
            let points: number[] = new Array();
            points.push(100);
            points.push(100);
            points.push(150);
            points.push(10);
            points.push(150);
            polyline.setPoints(points);
            polyline.addPoints(170, 170);
            polyline.addAttribute('style', 'fill:none;stroke-width:10;stroke:rgb(0,0,255)');
            let polylineObj = polyline.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('polyline');
            svgSpecifiedFormat.setAttributes(polylineObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.svgManager.addChildNode(svgRoot, svgSpecifiedFormat.toObj());
                consoleInfo('Test polyline: add polyline2 svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('update attr for polyline1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test polyline: update attr for polyline1', 'svg tag is null');
                return false;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test polyline: update attr for polyline1', `svg tag's elements is null`);
                return false;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test polyline: update attr for polyline1', `the elements's type of svg tag is not array`);
                return;
            }
            let polylineResult: Record<string, object> = {};
            try {
                svgElements.forEach((item: object) => {
                    if (typeof item === SVGAttrConstants.TYPEOF_OBJECT) {
                        let nameValue: string = this.svgManager.getValueForKey(item, SVGAttrConstants.ATTR_KEY_NAME) as string;
                        if (nameValue === 'polyline') {
                            polylineResult = item as Record<string, object>;
                            throw new Error('has got polyline,jump out');
                        }
                    }
                });
            }
            catch (e) {
                if (!polylineResult) {
                    consoleInfo('Test polyline: update attr for polyline1', 'polyline not exist');
                    return;
                }
                if (typeof polylineResult === SVGAttrConstants.TYPEOF_OBJECT) {
                    let polylineAttributes: Record<string, string> = polylineResult[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as Record<string, string>;
                    let points: number[] = new Array();
                    points.push(50);
                    points.push(50);
                    points.push(70);
                    points.push(100);
                    points.push(20);
                    points.push(190);
                    let pointsWithoutComma = points.join(' ');
                    polylineAttributes['points'] = pointsWithoutComma;
                    this.svgManager.setAttribute(polylineAttributes, 'style', 'fill:none;stroke-width:15;stroke:rgb(0,255,255)');
                    this.allAttrPolylineObj = polylineResult;
                }
                consoleInfo('Test polyline: update attr for polyline1 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
            return;
        });
        Button.pop();
        Button.createWithLabel('remove polyline2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test polyline: remove polyline2', 'svg tag is null');
                return;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test polyline: remove polyline2', `svg tag's elements is null`);
                return;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test polyline: remove polyline2', `svg tag's elements is null`);
                return;
            }
            if (svgElements.length >= 2) {
                svgElements.splice(1, 1);
            }
            consoleInfo('Test remove polyline2 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('show svg with polyline');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            let svgTotalObj = this.svgManager.getSVGTotalObj();
            let success = () => {
                consoleInfo('Test polyline: saveFile', 'success');
            };
            let fileName = new Date().getTime() + 'Polyline.svg';
            this.svgManager.saveSVG(fileName, svgTotalObj, success);
            setTimeout(() => {
                consoleInfo('Test rect: show svg getFilePath ', this.filePath);
                this.svgUri = 'file://' + this.filePath + '/' + fileName;
            }, 100);
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('remove points attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('points');
        });
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    aboutToAppear() {
        let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
        this.filePath = filesDir;
        // 清空已存在的SVG根
        this.svgManager.createSVGDeclares();
    }
    removeAttribute(attrName: string) {
        if (!this.allAttrPolylineObj) {
            consoleInfo('test remove ' + attrName, 'polyline is not added.');
            return;
        }
        let polylineJson = JSON.stringify(this.allAttrPolylineObj);
        let polylineOriginData: object = JSON.parse(polylineJson);
        let attrs = this.svgManager.getValueForKey(polylineOriginData, SVGAttrConstants.ATTR_KEY_ATTRIBUTES) as object;
        if (!attrs) {
            consoleInfo('test remove ' + attrName, 'polyline1 has no attributes');
            return;
        }
        this.svgManager.removeByKey(attrs, attrName);
        // 替换 polyline
        let svgRoot = this.svgManager.getSVGRoot();
        let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
        if (typeof svgElements === SVGAttrConstants.TYPEOF_OBJECT && isArray(svgElements)) {
            svgElements.splice(0, 1, polylineOriginData);
        }
        consoleInfo('test remove attr: ' + attrName, JSON.stringify(this.svgManager.getSVGTotalObj()));
    }
    aboutToDisappear() {
        let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
        this.filePath = filesDir;
        this.removeExistSVGFile();
    }
    removeExistSVGFile() {
        let dir = fileio.opendirSync(this.filePath);
        let that = this;
        dir.read()
            .then((dirent) => {
            if (dirent && dirent.isFile()) {
                fileio.unlink(this.filePath + '/' + dirent.name, (removeErr) => {
                    if (removeErr) {
                        consoleInfo('test polyline remove file', 'failed');
                    }
                });
                that.removeExistSVGFile();
            }
        })
            .catch((err: string) => {
            consoleInfo('test polyline remove file failed', err);
        });
    }
}
loadDocument(new Index("1", undefined, {}));
