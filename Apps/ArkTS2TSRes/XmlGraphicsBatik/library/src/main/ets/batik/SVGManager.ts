let __generate__Id: number = 0;
function generateId(): string {
    return "SVGManager_" + ++__generate__Id;
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
import fileio from '@ohos.fileio';
import xml from '@ohos.convertxml';
import SVGAttrConstants from './constants/SVGAttrConstants';
import { SVGDeclares } from './svggen/SVGDeclares';
import { checkElements, hasKeyInObj } from './util/ObjOrArrayUtil';
import { consoleInfo } from './util/LogUtil';
import { SVGXMLChecker } from './SVGXMLChecker';
import { GlobalContext } from './tools/GlobalContext';
import { isArray } from './tools/IsArrayFunction';
import { getKeys } from './tools/GetKeysTest';
import { objCreate } from './tools/ObjCreate';
import { deleteProperty } from './tools/DeleteProperty';
/**
 * SVG管理器
 */
export class SVGManager {
    private static _sInstance: SVGManager;
    private _svgObj: Record<string, object> | object;
    private _filePath: string = '';
    private _checker: SVGXMLChecker;
    public static getInstance(): SVGManager {
        if (!SVGManager._sInstance) {
            SVGManager._sInstance = new SVGManager();
        }
        return SVGManager._sInstance;
    }
    /**
     * 构造函数
     */
    private constructor() {
        // 实现单例，私有构造方法
        this._svgObj = objCreate;
        this._checker = new SVGXMLChecker();
        let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
        this._filePath = filesDir;
    }
    /**
     * 获取整个SVG的整体对象
     */
    public getSVGTotalObj() {
        return this._svgObj;
    }
    /**
     * 创建SVG的头部声明
     */
    public createSVGDeclares(): Object {
        // 为整个SVG文档添加设置标准SVG声明
        let declares = new SVGDeclares();
        declares.setXMLVersion('1.0');
        declares.setEncoding('utf-8');
        declares.setStandalone(true);
        this._svgObj = declares.toObj();
        return this._svgObj;
    }
    /**
     * 获取SVG标签对应的对象
     *
     * 找到标签内容为svg的对象
     * @param obj svg文件对应的对象
     * @return 返回svg标签对应的JS对象，如果没找到，返回false
     */
    public getSVGRoot(obj: Object = this._svgObj): object {
        let objValue: Record<string, object> = obj as Record<string, object>;
        let svgObj: Record<string, string | object> = {};
        // 获取节点信息对象
        let svgElements: object | Array<object> = objValue[SVGAttrConstants.ATTR_KEY_ELEMENTS];
        if (typeof svgElements !== SVGAttrConstants.TYPEOF_OBJECT || !isArray(svgElements)) {
            return svgObj;
        }
        svgElements.forEach((nodeObj: Record<string, string | object>) => {
            if (typeof nodeObj !== SVGAttrConstants.TYPEOF_OBJECT) {
                return;
            }
            let objKeys: string[] = getKeys(nodeObj);
            objKeys.forEach((svgObjKey) => {
                if (svgObjKey === SVGAttrConstants.ATTR_KEY_NAME && nodeObj[svgObjKey] === 'svg') {
                    svgObj = nodeObj;
                    return;
                }
            });
        });
        return svgObj;
    }
    /**
     * 为指定对象添加子节点
     * @param parentObj 要添加子节点的对象
     * @param childPropertyValue 对应主键的值
     */
    public addChildNode(parentObj: Object, childPropertyValue: Object): boolean {
        let parentObjValue: Record<string, Array<object>> | object = parentObj as Record<string, Array<object>> | object;
        if (!checkElements(childPropertyValue)) {
            throw Error('node keys must in [`type`, `text`] or [`type`, `name`, `attributes`, `elements`]');
            return false;
        }
        if (hasKeyInObj(parentObjValue, SVGAttrConstants.ATTR_KEY_ELEMENTS)
            && isArray(parentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS])) {
            parentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS].push(childPropertyValue);
        }
        else if (!hasKeyInObj(parentObjValue, SVGAttrConstants.ATTR_KEY_ELEMENTS)) {
            let elementsArray: Array<object> = [];
            elementsArray.push(childPropertyValue);
            parentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS] = elementsArray;
        }
        return true;
    }
    /**
     * 为某个节点设置子节点（可能会覆盖原有值）
     * @param parentObj 父节点
     * @param childPropertyValue 子节点
     * @return 返回是否设置添加子节点
     */
    public setChildNode(parentObj: Object, childPropertyValue: Object): boolean {
        let parentObjValue: Record<string, Array<object> | object> | object = parentObj as Record<string, Array<object> | object> | object;
        if (!checkElements(childPropertyValue)) {
            throw Error('node keys must in [`type`, `text`] or [`type`, `name`, `attributes`, `elements`]');
            return false;
        }
        if (typeof childPropertyValue === SVGAttrConstants.TYPEOF_OBJECT) {
            if (isArray(childPropertyValue)) {
                parentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS] = childPropertyValue;
            }
            else {
                let elementsArray: Array<object> = [];
                elementsArray.push(childPropertyValue);
                parentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS] = elementsArray;
            }
            return true;
        }
        return false;
    }
    /**
     * 保存SVG文件
     * @param fileName svg文件名称：svg.svg
     * @param fileContent SVG文件的路径/内容
     */
    public saveSVG(fileName: string, fileContent: string | Object, onSuccess?: () => void, onFailed?: (number: number, Error: Error) => void): void {
        if (!fileName || fileName.length < 5 || fileName.substr(fileName.length - 4) !== '.svg') {
            if (!!onFailed) {
                onFailed(0, new Error('the suffix of SVG file must be .svg'));
            }
            return;
        }
        let fileXMLInfo = '';
        if (typeof fileContent === 'object' && !isArray(fileContent)) {
            let fileContentText: string = this.convertObjToXML(fileContent) as string;
            fileXMLInfo = fileContentText;
        }
        else if (typeof fileContent === 'string') {
            fileXMLInfo = fileContent;
        }
        let that = this;
        if (fileXMLInfo) {
            try {
                this._checker.check(fileXMLInfo, () => {
                    let newFileName = '';
                    let pathArray: string[] = fileName.split('/');
                    if (pathArray.length >= 2) {
                        let folderArray = pathArray.splice(0, pathArray.length - 1);
                        folderArray.forEach((folderName) => {
                            if (folderName) {
                                newFileName += folderName;
                                that.createFolder(that._filePath + '/' + newFileName);
                                newFileName += '/';
                            }
                        });
                        newFileName += pathArray.splice(pathArray.length - 1);
                    }
                    else {
                        newFileName = fileName;
                    }
                    let svgURI = that._filePath + '/' + newFileName;
                    that._createFile(svgURI);
                    that._writeFile(svgURI, fileXMLInfo);
                    if (!!onSuccess) {
                        onSuccess();
                    }
                });
            }
            catch (e) {
                consoleInfo('SVGManager saveFile checker failed ', e);
                if (!!onFailed) {
                    onFailed(1, e);
                }
            }
        }
    }
    /**
     * 转换数据为XML格式
     * @param fileContentObj 要被转换为XML格式的对象
     * @return xml格式数据
     */
    public convertObjToXML(fileContentObj: Object): string | null {
        let fileContentObjValue: Record<string, string | object> | object = fileContentObj;
        if (typeof fileContentObj === SVGAttrConstants.TYPEOF_OBJECT) {
            let xmlResult = '';
            let objKeys: string[] = getKeys(fileContentObjValue);
            objKeys.forEach((element) => {
                if (element === SVGAttrConstants.ATTR_KEY_DECLARATION) {
                    xmlResult += this._convertDeclaration(fileContentObjValue[element] as Record<string, object>);
                }
                else if (element === SVGAttrConstants.ATTR_KEY_ELEMENTS) {
                    xmlResult += this._convertArrayToXML(fileContentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS] as object);
                }
            });
            return xmlResult;
        }
        return null;
    }
    /**
     * 转换数组为XML格式
     * @param arrayObj 要被转换为XML格式的数组对象
     * @return xml格式数据
     */
    private _convertArrayToXML(arrayObj: object): string {
        let arrayXml = '';
        if (typeof arrayObj === SVGAttrConstants.TYPEOF_OBJECT && isArray(arrayObj)) {
            arrayObj.forEach((element: Record<string, string>) => {
                if (this._convertObjToXML(element)) {
                    arrayXml += this._convertObjToXML(element);
                }
            });
        }
        return arrayXml;
    }
    /**
     * 转换Obj数据为XML格式
     * @param contentObj 要被转换为XML格式的对象
     * @return xml格式数据
     */
    private _convertObjToXML(contentObj: Object): string | undefined {
        let contentObjValue: Record<string, string | object> = contentObj as Record<string, string | object>;
        let objXml = '';
        if (typeof contentObjValue !== SVGAttrConstants.TYPEOF_OBJECT || !hasKeyInObj(contentObjValue, SVGAttrConstants.ATTR_KEY_TYPE)) {
            return objXml;
        }
        let elementType: string = contentObjValue[SVGAttrConstants.ATTR_KEY_TYPE] as string;
        if (elementType === SVGAttrConstants.ATTR_VALUE_ELEMENT) {
            objXml = '<';
        }
        if (hasKeyInObj(contentObjValue, SVGAttrConstants.ATTR_KEY_NAME)) {
            objXml += contentObjValue[SVGAttrConstants.ATTR_KEY_NAME] + " ";
        }
        if (hasKeyInObj(contentObjValue, SVGAttrConstants.ATTR_KEY_ATTRIBUTES)) {
            let attrObj = contentObjValue[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as object;
            if (typeof attrObj !== SVGAttrConstants.TYPEOF_OBJECT) {
                return;
            }
            let objKeys: string[] = getKeys(attrObj);
            objKeys.forEach((attrKey) => {
                if (typeof attrObj[attrKey] === SVGAttrConstants.TYPEOF_OBJECT) {
                    let viewBoxObj: object = attrObj[attrKey];
                    objXml += attrKey + "=\"";
                    let objKeys: string[] = getKeys(viewBoxObj);
                    objKeys.forEach((key) => {
                        objXml += viewBoxObj[key] + ' ';
                    });
                    objXml += "\"";
                }
                else {
                    objXml += this._parseGeneralTypeToXML(attrKey, attrObj[attrKey]);
                }
            });
        }
        if (elementType === SVGAttrConstants.ATTR_VALUE_ELEMENT) {
            if (hasKeyInObj(contentObjValue, SVGAttrConstants.ATTR_KEY_ELEMENTS)) {
                objXml += '>';
                objXml += this._convertArrayToXML(contentObjValue[SVGAttrConstants.ATTR_KEY_ELEMENTS] as object);
                objXml += '</' + contentObjValue[SVGAttrConstants.ATTR_KEY_NAME] + '>';
            }
            else {
                objXml += '/>';
            }
        }
        else if (elementType === SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT) {
            objXml += contentObjValue[SVGAttrConstants.ATTR_KEY_OR_VALUE_TEXT];
        }
        return objXml;
    }
    /**
     * 转换声明数据为XML格式
     * @param declarationObj 要被转换为XML格式的对象
     * @return xml格式数据
     */
    private _convertDeclaration(declarationObj: Object): string {
        let declarationObjValue: Record<string, object> = declarationObj as Record<string, object>;
        let declarationString = '<?xml ';
        if (hasKeyInObj(declarationObjValue, SVGAttrConstants.ATTR_KEY_ATTRIBUTES)) {
            let declarationAttrObj: object = declarationObjValue[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as object;
            let objKeys: string[] = getKeys(declarationAttrObj);
            objKeys.forEach((element) => {
                declarationString += this._parseGeneralTypeToXML(element, declarationAttrObj[element]);
            });
        }
        declarationString += '?>';
        return declarationString;
    }
    /**
     * 转换键值对数据为XML格式
     * @param key 主键
     * @param generalObj 值
     */
    private _parseGeneralTypeToXML(key: string, value: number | string): string {
        let xml = key + "=\"" + value + "\" ";
        return xml;
    }
    /**
     * 获取SVG标签对应的对象/值
     * @param parentObj 整个XML对应的对象
     * @param key  主键
     * @return false 或 SVG根标签对应的对象
     */
    public getValueForKey(parentObj: Object, key: string): boolean | object | string {
        let parentObjValue: Record<string, object> | object = parentObj;
        let svgIndex = hasKeyInObj(parentObjValue, key);
        if (svgIndex) {
            return parentObjValue[key];
        }
        return false;
    }
    /**
     * 移除子节点/属性
     * @param parentObj 将要删除节点或属性的对象
     * @param key 将要删除的节点或属性对应的key值
     */
    public removeByKey(parentObj: Object, key: string): void {
        let parentObjValue: Record<string, object> | object = parentObj;
        let svgIndex = hasKeyInObj(parentObjValue, key);
        if (svgIndex) {
            deleteProperty(parentObjValue, key);
        }
    }
    /**
     * 为对象设置属性或子节点（覆盖原有键值对）
     * @param parentObj 要设置属性或结点的对象
     * @param key 主键
     * @param value 属性/节点
     */
    public setAttribute(parentObj: Object, key: string, value: string): void {
        let parentObjValue: Record<string, string | object> | object = parentObj;
        if (typeof parentObjValue === SVGAttrConstants.TYPEOF_OBJECT && key && value) {
            let attributesObj: Record<string, string | object> | string = '';
            if (hasKeyInObj(parentObjValue, SVGAttrConstants.ATTR_KEY_ATTRIBUTES)) {
                attributesObj = parentObjValue[SVGAttrConstants.ATTR_KEY_ATTRIBUTES] as Record<string, string | object>;
            }
            else {
                attributesObj = {};
            }
            attributesObj[key] = value;
        }
        parentObjValue[key] = value;
    }
    /**
     * 创建文件夹
     * @param 文件夹绝对路径
     */
    public createFolder(path: string): void {
        //创建文件夹
        if (!this._isFolderExisted(path)) {
            fileio.mkdirSync(path);
        }
    }
    /**
     * 判断文件夹是否存在
     * @param 文件夹绝对路径
     */
    public _isFolderExisted(path: string): boolean {
        try {
            let stat = fileio.statSync(path);
            return stat.isDirectory();
        }
        catch (e) {
            consoleInfo('SVGManager existFolder', e.message);
            return false;
        }
    }
    /**
     * 新建文件
     * @param path 文件绝对路径及文件名
     */
    private _createFile(path: string): number {
        return fileio.openSync(path, 0o100, 0o666);
    }
    /**
     * 向path写入content数据，覆盖旧数据
     * @param path 文件路径
     * @param content 文件内容
     */
    private _writeFile(path: string, content: ArrayBuffer | string): void {
        try {
            let fd = fileio.openSync(path, 0o102, 0o666);
            fileio.ftruncateSync(fd);
            fileio.writeSync(fd, content);
            fileio.fsyncSync(fd);
            fileio.closeSync(fd);
        }
        catch (e) {
            consoleInfo('SVGManager writeFile ', 'Failed to writeFile for ' + e);
        }
    }
    /**
     * 获取data路径
     * @param onSuccess 路径数据回调
     */
    public getFilePath(onSuccess: (filesDir: string) => void): void {
        let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
        onSuccess(filesDir);
    }
    /**
     * 解析SVG文件
     * @param fileName 文件路径/名称
     * @param onSuccess 解析成功回调
     * @param onFailed 解析失败回调
     */
    public parse(fileName: string, onSuccess: (result: string) => void, onFailed?: (error: Error) => void): void {
        // File绝对路径不能有`file://`
        let fileCompletePath = this._filePath + '/' + fileName;
        let that = this;
        fileio.readText(fileCompletePath)
            .then((str) => {
            try {
                that._checker.check(str, () => {
                    let xmlInstance = new xml.ConvertXML();
                    let xmlResult = xmlInstance.convert(str, {
                        trim: false,
                        declarationKey: 'declaration',
                        instructionKey: 'instruction',
                        attributesKey: 'attributes',
                        textKey: 'text',
                        cdataKey: 'cdata',
                        doctypeKey: 'doctype',
                        commentKey: 'comment',
                        parentKey: 'parent',
                        typeKey: 'type',
                        nameKey: 'name',
                        elementsKey: 'elements'
                    });
                    if (xmlResult) {
                        if (typeof xmlResult === 'object') {
                            onSuccess(JSON.stringify(xmlResult));
                        }
                        else {
                            onSuccess(xmlResult);
                        }
                    }
                    else {
                        consoleInfo('SVGManager parse failed ', 'result is empty');
                        if (!!onFailed) {
                            onFailed(new Error('SVGManager parse failed, result is empty'));
                        }
                    }
                });
            }
            catch (e) {
                consoleInfo('SVGManager parse checker failed ', e);
                if (!!onFailed) {
                    onFailed(e);
                }
            }
        }).catch((e: string | Error) => {
            consoleInfo('SVGManager parse failed catch ', e as string);
            if (!!onFailed) {
                onFailed(e as Error);
            }
        });
    }
}
