interface Index_Params {
    svgManager?: SVGManager;
    svgXMLRoot?: Record<string, object>;
    svgUri?: string;
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testOperateSVGPage_" + ++__generate__Id;
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
import { SVGRoot } from '@ohos/XmlGraphicsBatik';
import { SVGSpecifiedFormat } from '@ohos/XmlGraphicsBatik';
import { consoleInfo } from '@ohos/XmlGraphicsBatik';
import { SVGAttrConstants } from '@ohos/XmlGraphicsBatik';
import { XMLConstants } from '@ohos/XmlGraphicsBatik';
import fileio from '@ohos.fileio';
import { GlobalContext } from '@ohos/XmlGraphicsBatik';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.svgManager = SVGManager.getInstance();
        this.svgXMLRoot = {};
        this.__svgUri = new ObservedPropertySimple('', this, "svgUri");
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.svgXMLRoot !== undefined) {
            this.svgXMLRoot = params.svgXMLRoot;
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
    // 创建SVGManager 的实例，进行操作SVG结果对应的对象
    private svgManager: SVGManager;
    private svgXMLRoot: Record<string, object>;
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
        Flex.margin(10);
        Flex.width('100%');
        Flex.height('50');
        Button.createWithLabel('add svg');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            // 创建SVG 对象：声明及SVG标签
            this.svgManager.createSVGDeclares();
            // 获取SVG标签对应的对象
            let svgTagObj = this.svgManager.getSVGRoot();
            // 构建SVG中的rect节点
            let rect: SVGRect = new SVGRect();
            rect.setX(50);
            rect.setY(50);
            rect.setRX(20);
            rect.setRY(20);
            rect.setWidth(100);
            rect.setHeight(100);
            rect.addAttribute('style', 'fill:rgb(255,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            // 输出标准格式rect对象
            let rectObj = rect.toObj();
            // 构建固定格式的节点描述对象
            let svgFormatForRect: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgFormatForRect.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgFormatForRect.setElementName('rect');
            svgFormatForRect.setAttributes(rectObj);
            if (svgTagObj) {
                // 为SVG标签添加固定格式的Rect子标签： 固定格式需要通过toObj()方法获取
                this.svgManager.addChildNode(svgTagObj, svgFormatForRect.toObj());
                consoleInfo('Test svg: add svg svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Button.createWithLabel('update attr for svg');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(200);
        Button.height(50);
        Button.onClick(() => {
            this.resetTotalSVGObj();
            let svg: SVGRoot = new SVGRoot();
            svg.setXMLNS(XMLConstants.XMLNS_NAMESPACE_URI_SVG);
            svg.setXMLNSLink(XMLConstants.XLINK_NAMESPACE_URI);
            svg.setSvgId('svgRoot');
            svg.setXMLSpace(false);
            svg.setWidth(250);
            svg.setHeight(250);
            svg.setViewBox(10, 10, 250, 250);
            let svgObj = svg.toObj();
            let svgSpecifiedFormat: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgSpecifiedFormat.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgSpecifiedFormat.setElementName('svg');
            svgSpecifiedFormat.setAttributes(svgObj);
            let rect: SVGRect = new SVGRect();
            rect.setX(50);
            rect.setY(50);
            rect.setRX(20);
            rect.setRY(20);
            rect.setWidth(100);
            rect.setHeight(100);
            rect.addAttribute('style', 'fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)');
            let rectObj = rect.toObj();
            let svgFormatForRect: SVGSpecifiedFormat = new SVGSpecifiedFormat();
            svgFormatForRect.setElementType(SVGAttrConstants.ATTR_VALUE_ELEMENT);
            svgFormatForRect.setElementName('rect');
            svgFormatForRect.setAttributes(rectObj);
            svgSpecifiedFormat.setElements(svgFormatForRect.toObj());
            if (this.svgXMLRoot) {
                let declarationAttrs: Record<string, string> = {};
                declarationAttrs['version'] = '1.0';
                declarationAttrs['encoding'] = 'utf-8';
                declarationAttrs['standalone'] = 'no';
                let declarationObj: Record<string, object> = {};
                declarationObj[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] = declarationAttrs;
                this.svgXMLRoot[SVGAttrConstants.ATTR_KEY_DECLARATION] = declarationObj;
                this.svgManager.addChildNode(this.svgXMLRoot, svgSpecifiedFormat.toObj());
                consoleInfo('Test svg: add svg svgTotalRoot', JSON.stringify(this.svgManager.getSVGTotalObj()));
            }
        });
        Button.pop();
        Flex.pop();
        Button.createWithLabel('show svg');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            // 获取整个SVG文件对应的对象
            let svgTotalObj = this.svgManager.getSVGTotalObj();
            let success = () => {
                consoleInfo('Test svg: saveFile', 'success');
            };
            // 将SVG文件对象保存为.svg格式文件
            let fileName = new Date().getTime() + 'SVG.svg';
            this.svgManager.saveSVG(fileName, svgTotalObj, success);
            this.svgUri = '';
            setTimeout(() => {
                consoleInfo('Test svg: show svg getFilePath ', this.filePath);
                this.svgUri = 'file://' + this.filePath + '/' + fileName;
            }, 100);
        });
        Button.pop();
        Flex.pop();
    }
    aboutToAppear() {
        let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
        this.filePath = filesDir;
        this.resetTotalSVGObj();
    }
    resetTotalSVGObj() {
        // 清空已存在的SVG根
        this.svgXMLRoot = this.svgManager.getSVGTotalObj() as Record<string, object>;
        this.svgManager.removeByKey(this.svgXMLRoot, SVGAttrConstants.ATTR_KEY_DECLARATION);
        this.svgManager.removeByKey(this.svgXMLRoot, SVGAttrConstants.ATTR_KEY_ELEMENTS);
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
                        consoleInfo('test svg remove file', 'failed');
                    }
                });
                that.removeExistSVGFile();
            }
        })
            .catch((err: string) => {
            consoleInfo('test svg remove file failed', err);
        });
    }
}
loadDocument(new Index("1", undefined, {}));
