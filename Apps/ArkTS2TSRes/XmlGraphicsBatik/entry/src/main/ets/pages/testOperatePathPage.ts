interface Index_Params {
    svgManager?: SVGManager;
    allAttrPathObj?: object;
    svgUri?: string;
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testOperatePathPage_" + ++__generate__Id;
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
import { SVGPath } from '@ohos/XmlGraphicsBatik';
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
        this.allAttrPathObj = new Object();
        this.__svgUri = new ObservedPropertySimple('', this, "svgUri");
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.allAttrPathObj !== undefined) {
            this.allAttrPathObj = params.allAttrPathObj;
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
    private allAttrPathObj: object;
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
        Button.createWithLabel('add path1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let path: SVGPath = new SVGPath();
            let pathPoints: string[] = new Array();
            pathPoints.push('M10,20 ');
            pathPoints.push('50,70');
            pathPoints.push('L80,70');
            pathPoints.push('L80,150');
            path.setD(pathPoints);
            path.addPoints('l', 20);
            path.addPointsWithoutOrder(0, 40);
            path.addPoints('z');
            path.setPathLength(100);
            path.addAttribute('style', 'fill:none;stroke-width:2;stroke:black');
            let pathObj = path.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('path');
            svgSpecifiedFormat.setAttributes(pathObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.allAttrPathObj = svgSpecifiedFormat.toObj();
                this.svgManager.addChildNode(svgRoot, this.allAttrPathObj);
                consoleInfo('Test path: add path svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Button.createWithLabel('add path2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let path: SVGPath = new SVGPath();
            let pathPoints: string[] = new Array();
            pathPoints.push('M80,50 ');
            pathPoints.push('90,60');
            pathPoints.push('L40,70');
            pathPoints.push('L30,120');
            path.setPathLength(50);
            path.setD(pathPoints);
            path.addPoints('z');
            path.addAttribute('style', 'fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,255)');
            let pathObj = path.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('path');
            svgSpecifiedFormat.setAttributes(pathObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.svgManager.addChildNode(svgRoot, svgSpecifiedFormat.toObj());
                consoleInfo('Test path: add path2 svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('update attr for path1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test path: update attr for path1', 'svg tag is null');
                return false;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test path: update attr for path1', `svg tag's elements is null`);
                return false;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test path: update attr for path1', `the elements's type of svg tag is not array`);
                return;
            }
            let pathResult: Record<string, object> = {};
            try {
                svgElements.forEach((item: object) => {
                    if (typeof item === SVGAttrConstants.TYPEOF_OBJECT) {
                        let nameValue: string = this.svgManager.getValueForKey(item, SVGAttrConstants.ATTR_KEY_NAME) as string;
                        if (nameValue === 'path') {
                            pathResult = item as Record<string, object>;
                            throw new Error('has got path,jump out');
                        }
                    }
                });
            }
            catch (e) {
                if (!pathResult) {
                    consoleInfo('Test path: update attr for path1', 'path not exist');
                    return;
                }
                if (typeof pathResult === SVGAttrConstants.TYPEOF_OBJECT) {
                    let pathAttributes: Record<string, string | number> = pathResult[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as Record<string, string | number>;
                    let pathPoints: string[] = new Array();
                    pathPoints.push('M180,50 ');
                    pathPoints.push('90,60');
                    pathPoints.push('L100,110');
                    pathPoints.push('h130,220');
                    pathPoints.push('z');
                    let pointsWithoutComma = pathPoints.join(' ');
                    pathAttributes['d'] = pointsWithoutComma;
                    pathAttributes['pathLength'] = 20;
                    this.svgManager.setAttribute(pathAttributes, 'style', 'fill:rgb(0,255,0);stroke-width:10;stroke:rgb(0,255,255)');
                    this.allAttrPathObj = pathResult;
                }
                consoleInfo('Test path: update attr for path1 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
            return;
        });
        Button.pop();
        Button.createWithLabel('remove path2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test path: remove path2', 'svg tag is null');
                return;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test path: remove path2', `svg tag's elements is null`);
                return;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test path: remove path2', `svg tag's elements is null`);
                return;
            }
            if (svgElements.length >= 2) {
                svgElements.splice(1, 1);
            }
            consoleInfo('Test remove path2 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('show svg with path');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            let svgTotalObj = this.svgManager.getSVGTotalObj();
            let success = () => {
                consoleInfo('Test path: saveFile', 'success');
            };
            let fileName = new Date().getTime() + 'Path.svg';
            this.svgManager.saveSVG(fileName, svgTotalObj, success);
            setTimeout(() => {
                consoleInfo('Test path: show svg getFilePath ', this.filePath);
                this.svgUri = 'file://' + this.filePath + '/' + fileName;
            }, 100);
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('remove d attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('d');
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
    removeAttribute(firstAttrName: string, secondAttrName?: string) {
        if (!this.allAttrPathObj) {
            consoleInfo('test remove ' + firstAttrName, 'path is not added.');
            return;
        }
        let pathJson = JSON.stringify(this.allAttrPathObj);
        let pathOriginData: object = JSON.parse(pathJson);
        let attrs = this.svgManager.getValueForKey(pathOriginData, SVGAttrConstants.ATTR_KEY_ATTRIBUTES) as object;
        if (!attrs) {
            consoleInfo('test remove ' + firstAttrName, 'path1 has no attributes');
            return;
        }
        this.svgManager.removeByKey(attrs, firstAttrName);
        if (secondAttrName) {
            this.svgManager.removeByKey(attrs, secondAttrName);
        }
        // 替换 path
        let svgRoot = this.svgManager.getSVGRoot();
        let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
        if (typeof svgElements === SVGAttrConstants.TYPEOF_OBJECT && isArray(svgElements)) {
            svgElements.splice(0, 1, pathOriginData);
        }
        consoleInfo('test remove attr: ' + firstAttrName, JSON.stringify(this.svgManager.getSVGTotalObj()));
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
                        consoleInfo('test path remove file', 'failed');
                    }
                });
                that.removeExistSVGFile();
            }
        })
            .catch((err: string) => {
            consoleInfo('test path remove file failed', err);
        });
    }
}
loadDocument(new Index("1", undefined, {}));
