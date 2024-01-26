interface Index_Params {
    svgManager?: SVGManager;
    allAttrLineObj?: object;
    svgUri?: string;
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testOperateLinePage_" + ++__generate__Id;
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
import { SVGLine } from '@ohos/XmlGraphicsBatik';
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
        this.allAttrLineObj = new Object();
        this.__svgUri = new ObservedPropertySimple('', this, "svgUri");
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.allAttrLineObj !== undefined) {
            this.allAttrLineObj = params.allAttrLineObj;
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
    private allAttrLineObj: object;
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
        Image.width(250);
        Image.height(250);
        Image.backgroundColor(Color.Pink);
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('add line1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let line: SVGLine = new SVGLine();
            line.setX1(50);
            line.setY1(50);
            line.setX2(200);
            line.setY2(200);
            line.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let lineObj = line.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('line');
            svgSpecifiedFormat.setAttributes(lineObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.allAttrLineObj = svgSpecifiedFormat.toObj();
                this.svgManager.addChildNode(svgRoot, this.allAttrLineObj);
                consoleInfo('Test line: add line svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Button.createWithLabel('add line2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let line: SVGLine = new SVGLine();
            line.setX1(250);
            line.setY1(10);
            line.setX2(100);
            line.setY2(70);
            line.addAttribute('style', 'fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,255)');
            let lineObj = line.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('line');
            svgSpecifiedFormat.setAttributes(lineObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.svgManager.addChildNode(svgRoot, svgSpecifiedFormat.toObj());
                consoleInfo('Test line: add line2 svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('update attr for line1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test line: update attr for line1', 'svg tag is null');
                return false;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test line: update attr for line1', `svg tag's elements is null`);
                return false;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test line: update attr for line1', `the elements's type of svg tag is not array`);
                return;
            }
            let lineResult: Record<string, object> = {};
            try {
                svgElements.forEach((item: object) => {
                    if (typeof item === SVGAttrConstants.TYPEOF_OBJECT) {
                        let nameValue: string = this.svgManager.getValueForKey(item, SVGAttrConstants.ATTR_KEY_NAME) as string;
                        if (nameValue === 'line') {
                            lineResult = item as Record<string, object>;
                            throw new Error('has got line,jump out');
                        }
                    }
                });
            }
            catch (e) {
                if (!lineResult) {
                    consoleInfo('Test line: update attr for line1', 'line not exist');
                    return;
                }
                if (typeof lineResult === SVGAttrConstants.TYPEOF_OBJECT) {
                    let lineAttributes: Record<string, number> = lineResult[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as Record<string, number>;
                    lineAttributes['x1'] = 70;
                    lineAttributes['y1'] = 50;
                    lineAttributes['x2'] = 100;
                    lineAttributes['y2'] = 20;
                    this.svgManager.setAttribute(lineAttributes, 'style', 'fill:rgb(0,255,0);stroke-width:10;stroke:rgb(0,255,255)');
                    this.allAttrLineObj = lineResult;
                }
                consoleInfo('Test line: update attr for line1 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
            return;
        });
        Button.pop();
        Button.createWithLabel('remove line2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test line: remove line2', 'svg tag is null');
                return;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test line: remove line2', `svg tag's elements is null`);
                return;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test line: remove line2', `svg tag's elements is null`);
                return;
            }
            if (svgElements.length >= 2) {
                svgElements.splice(1, 1);
            }
            consoleInfo('Test remove line2 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('show svg with line');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            let svgTotalObj = this.svgManager.getSVGTotalObj();
            let success = () => {
                consoleInfo('Test line: saveFile', 'success');
            };
            let fileName = new Date().getTime() + 'Line.svg';
            this.svgManager.saveSVG(fileName, svgTotalObj, success);
            setTimeout(() => {
                consoleInfo('Test line: show svg getFilePath ', this.filePath);
                this.svgUri = 'file://' + this.filePath + '/' + fileName;
            }, 100);
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('remove x1 attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('x1');
        });
        Button.pop();
        Button.createWithLabel('remove y1 attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('y1');
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('remove x2 attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('x2');
        });
        Button.pop();
        Button.createWithLabel('remove y2 attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('y2');
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
        if (!this.allAttrLineObj) {
            consoleInfo('test remove ' + firstAttrName, 'line is not added.');
            return;
        }
        let lineJson = JSON.stringify(this.allAttrLineObj);
        let lineOriginData: object = JSON.parse(lineJson);
        let attrs = this.svgManager.getValueForKey(lineOriginData, SVGAttrConstants.ATTR_KEY_ATTRIBUTES) as object;
        if (!attrs) {
            consoleInfo('test remove ' + firstAttrName, 'line1 has no attributes');
            return;
        }
        this.svgManager.removeByKey(attrs, firstAttrName);
        if (secondAttrName) {
            this.svgManager.removeByKey(attrs, secondAttrName);
        }
        // 替换 line
        let svgRoot = this.svgManager.getSVGRoot();
        let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
        if (typeof svgElements === SVGAttrConstants.TYPEOF_OBJECT && isArray(svgElements)) {
            svgElements.splice(0, 1, lineOriginData);
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
                        consoleInfo('test line remove file', 'failed');
                    }
                });
                that.removeExistSVGFile();
            }
        })
            .catch((err: string) => {
            consoleInfo('test line remove file failed', err);
        });
    }
}
loadDocument(new Index("1", undefined, {}));
