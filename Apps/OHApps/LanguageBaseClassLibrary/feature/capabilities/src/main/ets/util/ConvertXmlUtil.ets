/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import ConvertXML from '@ohos.convertxml';
import xml from '@ohos.xml';
import { logger } from '@ohos/common';

const TAG: string = 'ConvertXmlUtil';

export function serializerNode(): string {
  let arrayBuffer = new ArrayBuffer(1024);
  let serializer = new xml.XmlSerializer(arrayBuffer);
  serializer.setDeclaration();
  serializer.setNamespace('h', 'https://gitee.com/openharmony');
  serializer.startElement('note');
  serializer.setAttributes('importance', 'high');
  serializer.addEmptyElement('b');
  serializer.setComment('contact information');
  serializer.setText('ZhangSan 18712345678');
  serializer.setCDATA('CData');
  serializer.setDocType('DocType');
  serializer.endElement();
  let array = new Uint8Array(arrayBuffer);
  let serializerStr = '';
  for (let i = 0; i < array.length; ++i) {
    serializerStr = serializerStr + String.fromCodePoint(array[i]);
  }
  return serializerStr;
}

export function parserNode(input: string): string {
  let arrayBuffer = new ArrayBuffer(input.length * 2);
  let bufView = new Uint8Array(arrayBuffer);
  let strLen = input.length;
  for (let k = 0; k < strLen; ++k) {
    bufView[k] = input.charCodeAt(k);
  }
  let parser = new xml.XmlPullParser(arrayBuffer);
  let arr: Record<number, string> = {};
  let i = 0;

  let func = (key: xml.EventType, info: xml.ParseInfo) => {
    arr[i] = `key:${key}, value:${info.getDepth()} ${info.getColumnNumber()} ` +
      `${info.getLineNumber()} ${info.getAttributeCount()} ${info.getName()} ` +
      `${info.getText()} ${info.isEmptyElementTag()} ${info.isWhitespace()}\n`;
    i++;
    return true;
  }

  let options: xml.ParseOptions = { supportDoctype: true, ignoreNameSpace: true, tokenValueCallbackFunction: func };
  parser.parse(options);
  let str = '';
  for (let j = 0; j < i; ++j) {
    str = str + arr[j];
  }
  return str;
}

export function convertNode(input: string): string {
  logger.info(TAG, 'convertNode start');
  let options: ConvertXML.ConvertOptions = {
    trim: false,
    declarationKey: "_declaration",
    instructionKey: "_instruction",
    attributesKey: "_attributes",
    textKey: "_text",
    cdataKey: "_cdata",
    doctypeKey: "_doctype",
    commentKey: "_comment",
    parentKey: "_parent",
    typeKey: "_type",
    nameKey: "_name",
    elementsKey: "_elements"
  };
  let conv = new ConvertXML.ConvertXML();
  logger.info(TAG, 'convertNode new ConvertXML');
  let result = JSON.stringify(conv.convertToJSObject(input, options));
  logger.info(TAG, `convertNode conv.convert result = ${result}`);
  return JSON.stringify(result);
}
