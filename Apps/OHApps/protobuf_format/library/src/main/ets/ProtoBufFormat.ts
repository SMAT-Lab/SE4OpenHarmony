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
import Protobuf from '@ohos/protobufjs'
import hilog from '@ohos.hilog';
import convert from '@ohos/xml_js'
import Util from './Util'

export default class ProtoBufFormat {

  /**
   * message 转 json
   * @param message 要被转换为json格式的message对象
   * @returns message对象对应的json字符串
   */
  static messageToJson(message: Protobuf.Builder.Message): string {
    if (!(message && message instanceof Protobuf.Builder.Message)) {
      return null;
    }
    try {
      let jsonResult = '';
      jsonResult += '{';
      jsonResult += Util.jsonPrint(message);
      jsonResult += '}';
      return jsonResult;
    } catch (error) {
      hilog.error(0x0000, 'ProtoBufFormat', 'messageToJson catch error： ' + error);
      return null;
    }
  }

  /**
   * json数据转换为message对象
   * @param builder message消息构建工具类
   * @param path message消息体路径：包名+类名
   * @param json message消息体的数据
   * @returns 返回message消息体
   */
  static jsonToMessage(builder: Protobuf.Builder, path: string, json: string | Object): Protobuf.Builder.Message {
    if (!(builder && builder instanceof Protobuf.Builder)) {
      return null;
    }

    if (!path) {
      return null;
    }

    if (!builder.lookup(path)) {
      return null;
    }

    try {
      let Message = builder.build(path);
      if (typeof json === 'string') {
        json = JSON.parse(json);
      }
      let result = new Message(json);
      return result;
    } catch (error) {
      hilog.error(0x0000, 'ProtoBufFormat', 'jsonToMessage catch error： ' + error);
      return null;
    }
  }

  /**
   * message 转 xml
   * @param message 要被转换为xml格式的message对象
   * @returns message对象对应的xml字符串
   */
  static messageToXml(message: Protobuf.Builder.Message): string {
    if (!(message && message instanceof Protobuf.Builder.Message)) {
      return null;
    }
    try {
      let packagePath = message + '';
      let lastIndex = packagePath.lastIndexOf('.');
      let rootName = packagePath;
      if (lastIndex !== -1 && lastIndex + 1 <= packagePath.length) {
        rootName = packagePath.substring(lastIndex + 1);
      }

      let jsonToXmlOp = {
        compact: true,
        textFn: function (val, elementName) {
          return val;
        }
      }
      let result = convert.json2xml(this.messageToJson(message), jsonToXmlOp);
      let finalResult = '<' + rootName + '>' + result + '</' + rootName + '>'
      return finalResult;
    } catch (error) {
      hilog.error(0x0000, 'ProtoBufFormat', 'messageToXml catch error： ' + error);
      return null;
    }
  }

  /**
   * xml数据转换为message对象
   * @param builder message消息构建工具类
   * @param path message消息体路径：包名+类名
   * @param xml message消息体的数据
   * @returns 返回message消息体
   */
  static xmlToMessage(builder: Protobuf.Builder, path: string, xml: string): Protobuf.Builder.Message {
    if (!(builder && builder instanceof Protobuf.Builder)) {
      return null;
    }

    if (!path) {
      return null;
    }

    if (!builder.lookup(path)) {
      return null;
    }
    try {
      let Message = builder.build(path);

      let json = convert.xml2json(xml);
      let lastIndex = path.lastIndexOf('.');
      let rootName = path;
      if (lastIndex !== -1 && lastIndex + 1 <= path.length) {
        rootName = path.substring(lastIndex + 1);
      }

      let strJsonObj = Util.filterJson(json);
      strJsonObj = strJsonObj[rootName];
      if (!strJsonObj) {
        return null;
      }
      let typeObj = Object.create(null);
      Util.resolveFieldType(Message.prototype.$type._fields, typeObj);
      Util.resolveResultWithType(strJsonObj, typeObj);
      let result = new Message(JSON.parse(JSON.stringify(strJsonObj)));
      return result;
    } catch (error) {
      hilog.error(0x0000, 'ProtoBufFormat', 'xmlToMessage catch error： ' + error);
      return null;
    }
  }

  /**
   * message 转 html
   * @param message 要被转换为html格式的message对象
   * @returns message对象对应的html字符串
   */
  static messageToHtml(message: Protobuf.Builder.Message): string {
    if (!(message && message instanceof Protobuf.Builder.Message)) {
      return null;
    }
    try {
      let html = '';
      html += Util.printTitle(message + '');
      html += Util.print(message);
      html += '</body></html>';
      return html;
    } catch (error) {
      hilog.error(0x0000, 'ProtoBufFormat', 'messageToHtml catch error： ' + error);
      return null;
    }
  }
}