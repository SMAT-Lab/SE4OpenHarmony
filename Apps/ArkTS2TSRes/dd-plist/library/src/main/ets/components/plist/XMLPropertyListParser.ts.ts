/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import XMLNode from './XMLNode';
import TextUtils from '../utils/TextUtils';
import NumUtils from '../utils/NumUtils';
import NSArray from './NSArray';
import NSData from './NSData';
import NSDate from './NSDate';
import NSNumber from './NSNumber';
import NSString from './NSString';
import NSDictionary from './NSDictionary';
import xml from '@ohos.xml';
import NSObject from './NSObject';
import { FileUtils } from '../utils/FileUtils';
class XMLPropertyListParser {
    public constructor() {
    }
    /**
         * Parses a XML property list file.
         *
         * @param f The XML property list file.
         * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
         */
    public parse(func: Function, filePath: string): void {
        let stream = FileUtils.openFile(filePath);
        let buf = new ArrayBuffer(8192);
        stream.readSync(buf);
        let str = String.fromCharCode.apply(null, new Uint8Array(buf));
        return this.parseObject(func, str);
    }
    public parseByBytes(bytes: Int8Array, func: Function): void {
        return this.parseObject(func, null, bytes.buffer);
    }
    /**
         * Parses a XML property list from an input stream.
         * This method does not close the specified input stream.
         *
         * @param is The input stream pointing to the property list's data.
         * @return The root object of the property list. This is usually a {@link NSDictionary} but can also be a {@link NSArray}.
         */
    public parseByStream(func: Function, input: any): void {
        let ab: ArrayBuffer = new ArrayBuffer(8192);
        let limit = input.readSync(ab, { position: 0 });
        this.parseObject(func, null, ab);
    }
    /**
         * Parses a property list from an XML document.
         *
         * @param doc The XML document.
         * @return The root NSObject of the property list contained in the XML document.
         */
    public parseObject(callBack: Function, resourceXml?: string, ab?: ArrayBuffer): void {
        let xmlPullParser = null;
        if (!TextUtils.isEmpty(resourceXml)) {
            let arrayBuffer = new ArrayBuffer(resourceXml.length * 2);
            let bufView = new Uint8Array(arrayBuffer);
            let strLen = resourceXml.length;
            for (let i = 0; i < strLen; ++i) {
                bufView[i] = resourceXml.charCodeAt(i);
            }
            xmlPullParser = new xml.XmlPullParser(arrayBuffer);
        }
        else if (ab != null && ab.byteLength != 0) {
            xmlPullParser = new xml.XmlPullParser(ab);
        }
        else {
            return;
        }
        let parsedArray: Array<XMLNode> = new Array();
        let parsedIndex = 0;
        let endFlag = false;
        function func(eventType: any, value: any) {
            if (value.getDepth() == 0) {
                if (endFlag) {
                    let nso: NSObject = XMLPropertyListParser.parseObjectArray(parsedArray);
                    if (callBack) {
                        callBack(nso);
                    }
                    return;
                }
            }
            else {
                endFlag = true;
            }
            if (value.getDepth() >= 1) {
                if (eventType == 2) {
                    // 开启标签事件
                    let startObj: XMLNode = new XMLNode();
                    startObj.setDepth(value.getDepth());
                    startObj.setEventType(2);
                    startObj.setName(value.getName().trim());
                    parsedIndex = NumUtils.nextIndex(parsedIndex);
                    parsedArray.push(startObj);
                }
                else if (eventType == 4) {
                    // 文本事件
                    let textObj: XMLNode = new XMLNode();
                    textObj.setDepth(value.getDepth());
                    textObj.setEventType(4);
                    textObj.setText(value.getText().trim());
                    parsedIndex = NumUtils.nextIndex(parsedIndex);
                    parsedArray.push(textObj);
                }
                else {
                    return true;
                }
            }
            // 返回true，使func继续循环执行
            return true;
        }
        try {
            let options = { supportDoctype: true, ignoreNameSpace: true, tokenValueCallbackFunction: func };
            xmlPullParser.parse(options);
        }
        catch (e) {
            console.error("error : " + e);
        }
    }
    private static parseObjectArray(parsedArray: Array<XMLNode>): NSObject {
        let rootNode: XMLNode = null;
        let resultNodes: Array<XMLNode> = new Array();
        for (let i = 0; i < parsedArray.length; i++) {
            let node: XMLNode = parsedArray[i];
            if (node.getEventType() == 2) {
                if ((i + 1) < parsedArray.length) {
                    if (parsedArray[i + 1].getEventType() == 4) {
                        if (node.getDepth() == parsedArray[i + 1].getDepth()) {
                            let newNode: XMLNode = new XMLNode(2, node.getName(), parsedArray[i + 1].getText(), node.getDepth());
                            resultNodes.push(newNode);
                        }
                        continue;
                    }
                    else {
                        if (node.getName() != 'plist') {
                            resultNodes.push(node);
                        }
                        continue;
                    }
                }
            }
        }
        if (resultNodes.length <= 0) {
            return null;
        }
        else {
            rootNode = resultNodes[0];
        }
        for (let i = 0; i < resultNodes.length; i++) {
            let node: XMLNode = resultNodes[i];
            for (let j = i + 1; j < resultNodes.length; j++) {
                let childNode = resultNodes[j];
                if (node.getDepth() == childNode.getDepth()) {
                    break;
                }
                if (childNode.getDepth() > node.getDepth()) {
                    node.addChildNode(childNode);
                }
            }
        }
        return XMLPropertyListParser.parseNode(rootNode);
    }
    private static parseNode(node: XMLNode): NSObject {
        let nodeType = node.getName();
        if (nodeType == "dict") {
            let dict: NSDictionary = new NSDictionary();
            let children: Array<XMLNode> = node.getChildNodes();
            for (let i = 0; i < children.length; i += 2) {
                let keyNode: XMLNode = children[i];
                let keyString: string = keyNode.getText();
                let valNode: XMLNode = children[i + 1];
                dict.put(keyString, XMLPropertyListParser.parseNode(valNode));
            }
            return dict;
        }
        else if (nodeType == "array") {
            let children = node.getChildNodes();
            let array: NSArray = new NSArray(children.length);
            for (let i = 0; i < children.length; i++) {
                array.setValue(i, XMLPropertyListParser.parseNode(children[i]));
            }
            return array;
        }
        else if (nodeType == "true") {
            return NSNumber.createNSNumberByBoolean(true);
        }
        else if (nodeType == "false") {
            return NSNumber.createNSNumberByBoolean(false);
        }
        else if (nodeType == "integer") {
            return NSNumber.ceateNSNumberByText(node.getText());
        }
        else if (nodeType == "real") {
            return NSNumber.ceateNSNumberByText(node.getText());
        }
        else if (nodeType == "string") {
            return new NSString(null, null, null, null, node.getText());
        }
        else if (nodeType == "data") {
            return new NSData(null, node.getText());
        }
        else if (nodeType == "date") {
            return new NSDate(null, null, null, node.getText());
        }
        return null;
    }
}
export default XMLPropertyListParser;
