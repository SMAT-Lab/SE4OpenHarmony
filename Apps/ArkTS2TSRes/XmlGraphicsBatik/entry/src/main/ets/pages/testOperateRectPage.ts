interface Index_Params {
    svgManager?: SVGManager;
    allAttrRectObj?: object;
    svgUri?: string;
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testOperateRectPage_" + ++__generate__Id;
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
import { SVGRect } from '@ohos/XmlGraphicsBatik';
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
        this.allAttrRectObj = new Object();
        this.__svgUri = new ObservedPropertySimple('', this, "svgUri");
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.allAttrRectObj !== undefined) {
            this.allAttrRectObj = params.allAttrRectObj;
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
    private allAttrRectObj: object;
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
        Image.width(200);
        Image.height(200);
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('add rect1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let rect: SVGRect = new SVGRect();
            rect.setX(10);
            rect.setY(10);
            rect.setRX(20);
            rect.setRY(20);
            rect.setWidth(100);
            rect.setHeight(100);
            rect.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let rectObj = rect.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('rect');
            svgSpecifiedFormat.setAttributes(rectObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.allAttrRectObj = svgSpecifiedFormat.toObj();
                this.svgManager.addChildNode(svgRoot, this.allAttrRectObj);
                consoleInfo('Test rect: add rect1 svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Button.createWithLabel('add rect2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let rect: SVGRect = new SVGRect();
            rect.setX(150);
            rect.setY(10);
            rect.setRX(40);
            rect.setRY(40);
            rect.setWidth(50);
            rect.setHeight(50);
            rect.addAttribute('style', 'fill:rgb(255,0,0);stroke-width:5;stroke:rgb(0,0,255)');
            let rectObj = rect.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('rect');
            svgSpecifiedFormat.setAttributes(rectObj);
            let svgRoot = this.svgManager.getSVGRoot();
            if (svgRoot) {
                this.svgManager.addChildNode(svgRoot, svgSpecifiedFormat.toObj());
                consoleInfo('Test rect: add rect2 svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('update attr for rect1');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test rect: update attr for rect1', 'svg tag is null');
                return false;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test rect: update attr for rect1', `svg tag's elements is null`);
                return false;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test rect: update attr for rect1', `the elements's type of svg tag is not array`);
                return;
            }
            let rectResult: Record<string, object> = {};
            try {
                svgElements.forEach((item: object) => {
                    if (typeof item === SVGAttrConstants.TYPEOF_OBJECT) {
                        let nameValue: string = this.svgManager.getValueForKey(item, SVGAttrConstants.ATTR_KEY_NAME) as string;
                        if (nameValue === 'rect') {
                            rectResult = item as Record<string, object>;
                            throw new Error('has got rect,jump out');
                        }
                    }
                });
            }
            catch (e) {
                if (!rectResult) {
                    consoleInfo('Test rect: update attr for rect1', 'rect not exist');
                    return;
                }
                if (typeof rectResult === SVGAttrConstants.TYPEOF_OBJECT) {
                    let rectAttributes: Record<string, number> = rectResult[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as Record<string, number>;
                    rectAttributes['x'] = 20;
                    rectAttributes['y'] = 20;
                    rectAttributes['rx'] = 10;
                    rectAttributes['ry'] = 50;
                    rectAttributes['width'] = 80;
                    rectAttributes['height'] = 80;
                    this.svgManager.setAttribute(rectAttributes, 'style', 'fill:rgb(0,255,0);stroke-width:10;stroke:rgb(0,255,255)');
                    this.allAttrRectObj = rectResult;
                }
                consoleInfo('Test rect: update attr for rect1 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
            return;
        });
        Button.pop();
        Button.createWithLabel('remove rect2');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            let svgRoot = this.svgManager.getSVGRoot();
            if (!svgRoot) {
                consoleInfo('Test rect: remove rect2', 'svg tag is null');
                return;
            }
            let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
            if (!svgElements) {
                consoleInfo('Test rect: remove rect2', `svg tag's elements is null`);
                return;
            }
            if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
                consoleInfo('Test rect: remove rect2', `svg tag's elements is null`);
                return;
            }
            if (svgElements.length >= 2) {
                svgElements.splice(1, 1);
            }
            consoleInfo('Test remove rect2 svgTotalObj', JSON.stringify(this.svgManager.getSVGTotalObj()));
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('show svg with rect');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            let svgTotalObj = this.svgManager.getSVGTotalObj();
            let success = () => {
                consoleInfo('Test rect: saveFile', 'success');
            };
            let fileName = new Date().getTime() + 'Rect.svg';
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
        Button.createWithLabel('remove x attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('x');
        });
        Button.pop();
        Button.createWithLabel('remove y attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('y');
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('remove rx attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('rx');
        });
        Button.pop();
        Button.createWithLabel('remove ry attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('ry');
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('remove rx ry attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('rx', 'ry');
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('remove width attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('width');
        });
        Button.pop();
        Button.createWithLabel('remove height attr');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.removeAttribute('height');
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
        if (!this.allAttrRectObj) {
            consoleInfo('test remove ' + firstAttrName, 'Rect is not added.');
            return;
        }
        let rectJson = JSON.stringify(this.allAttrRectObj);
        let rectOriginData: object = JSON.parse(rectJson);
        let attrs = this.svgManager.getValueForKey(rectOriginData, SVGAttrConstants.ATTR_KEY_ATTRIBUTES) as object;
        if (!attrs) {
            consoleInfo('test remove ' + firstAttrName, 'rect1 has no attributes');
            return;
        }
        this.svgManager.removeByKey(attrs, firstAttrName);
        if (secondAttrName) {
            this.svgManager.removeByKey(attrs, secondAttrName);
        }
        // 替换 rect
        let svgRoot = this.svgManager.getSVGRoot();
        let svgElements = this.svgManager.getValueForKey(svgRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
        if (typeof svgElements === SVGAttrConstants.TYPEOF_OBJECT && isArray(svgElements)) {
            svgElements.splice(0, 1, rectOriginData);
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
                        consoleInfo('test rect remove file', 'failed');
                    }
                });
                that.removeExistSVGFile();
            }
        })
            .catch((err: string) => {
            consoleInfo('test rect remove file failed', err);
        });
    }
}
loadDocument(new Index("1", undefined, {}));
