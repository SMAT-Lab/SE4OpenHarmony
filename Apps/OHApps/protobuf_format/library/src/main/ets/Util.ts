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

export default class util {

  /* -----------------------------------messageToJson Util start-------------------------------------------------------*/

  /**
   * 遍历message中的字段,转换为json格式
   * @param message 要被格式转换的消息体
   * @returns 转换后的json字符串
   */
  static jsonPrint(message: Protobuf.Builder.Message): string {
    // message 对应的json字段串结果
    let result = '';

    // 获取message中的fields数组
    let fieldsArray = message.__proto__.$type._fields;
    let fieldsLength = fieldsArray.length;

    for (let i = 0; i < fieldsLength; i++) {

      // 获取单个field 及 对应的value
      result += this.jsonPrintField(fieldsArray[i], message[fieldsArray[i]['name']]);

      // 键值对间隔，最后一个键值对不需要添加
      if (i + 1 !== fieldsLength) {
        result += ',';
      }
    }
    return result;
  }

  /**
   * 开始转换单个字段
   * @param field 当前message中字段属性
   * @param value 对应的message.field的数据
   * @returns json字符串
   */
  private static jsonPrintField(field: Protobuf.Builder.Message.Field, value: Object): string {
    return this.jsonPrintSingleFiled(field, value);
  }

  /**
   * 单个字段的值
   * @param field 单个message.field
   * @param value 数据
   * @returns json字符串
   */
  private static jsonPrintSingleFiled(field: Protobuf.Builder.Message.Field, value: Object): string {
    let isExtension = field.extensions ? field.extensions : field.parent.extensions;
    let isGroup = field.isGroup ? field.isGroup : field.parent.isGroup;
    let json = '';
    if (Boolean(isExtension)) {
      json += '"';
      json += field['name'];
      json += '"';
    } else {
      json += '"';
      if (Boolean(isGroup)) {
        json += field['name'];
      } else {
        json += field['name'];
      }
      json += '"';
    }
    json += ': ';

    if (field.repeated) {
      json += '[';
      var dataLength = 0;
      if (Array.isArray(value)) {
        dataLength = value.length;
      }
      for (let i = 0; i < dataLength; i++) {
        json += this.jsonPrintFieldValue(field, value[i]);
        if (i + 1 !== dataLength) {
          json += ',';
        }
      }
      json += ']';
    } else {
      json += this.jsonPrintFieldValue(field, value);
    }
    return json;
  }

  /**
   * 获取字段值
   * @param field  单个message.field
   * @param fieldValue 字段值
   * @returns 对应格式的数据
   */
  private static jsonPrintFieldValue(field: Protobuf.Builder.Message.Field, fieldValue: Object): string {
    var value = '';
    switch (field.type.name) {
      case 'bool':
        if (typeof fieldValue === 'boolean') {
          value += fieldValue;
        } else if (typeof fieldValue === 'string') {
          if (fieldValue === 'false') {
            value += false;
          } else {
            value += true;
          }
        } else {
          if (fieldValue === 0) {
            value += false;
          } else {
            value += true;
          }
        }
        break
      case 'int32':
      case 'sint32':
      case 'sfixed32':
      case 'float':
      case 'double':
      case 'uint32':
      case 'fixed32':
        value += Number(fieldValue);
        break;
      case 'uint64':
      case 'fixed64':
      case 'int64':
      case 'sint64':
      case 'sfixed64':
        var longValue = Protobuf.Long.fromValue(fieldValue);
        value += longValue.toInt();
        break;
      case 'string':
        value += '"';
        value += this.jsonEscapeText(fieldValue.toString());
        value += '"';
        break;
      case 'bytes': {
        value += '"';
        value += this.jsonEscapeBytes(fieldValue.toString());
        value += '"';
        break;
      }
      case 'enum': {
        value += '"'
        value += field.resolvedType.children[fieldValue]['name'];
        value += '"'
        break;
      }
      case 'message':
      case 'group':
        value += '{';
        value += this.jsonPrint(fieldValue);
        value += '}';
        break;
    }

    return value;
  }
  /**
   * 处理文本
   * @param input
   * @returns
   */
  private static jsonEscapeText(input: string): string {
    let text = '';
    for (let i = 0; i < input.length; i++) {
      let char = input.charAt(i);
      switch (char) {
        case '\b':
          text += '\\b';
          break;
        case '\f':
          text += '\\f';
          break;
        case '\n':
          text += '\\n';
          break;
        case '\r':
          text += '\\r';
          break;
        case '\t':
          text += '\\t';
          break;
        case '\\':
          text += '\\\\';
          break;
        case '/':
          text += '\\/';
          break;
        case '"':
          text += "\\\"";
          break;
        default:
          let charCode = input.charCodeAt(i);
          if (charCode >= 0x0000 && charCode <= 0x001F) {
            let prefix = "\\u";
            if (charCode < 0x10) {
              prefix = "\\u000";
            } else {
              prefix = "\\u00";
            }
            let result = '';
            result += prefix;
            result += parseInt(input.charAt(i), 16).toString(16);
            text += result;
          } else {
            text += char;
          }
          break;
      }
    }
    return text;
  }

  /**
   * 处理bytes
   * @param input
   * @returns
   */
  private static jsonEscapeBytes(input: string): string {
    let bytes = '';
    for (let i = 0; i < input.length; i++) {
      let b = input.charAt(i);
      switch (b) {
      // @ts-ignore
        case 0x07:
          bytes += '\\a';
          break;
        case '\b':
          bytes += '\\b';
          break;
        case '\f':
          bytes += '\\f';
          break;
        case '\n':
          bytes += '\\n';
          break;
        case '\r':
          bytes += '\\r';
          break;
        case '\t':
          bytes += '\\t';
          break;
      // @ts-ignore
        case 0x0b:
          bytes += '\\v';
          break;
        case '\\':
          bytes += "\\\\";
          break;
        case '\'':
          bytes += "\\\'";
          break;
        case '"':
          bytes += "\\\"";
          break;
        default:
        // @ts-ignore
          if (b >= 0x20) {
            bytes += b;
          } else {
            // @ts-ignore
            if (b < 0x10) {
              return "\\u000" + parseInt(b, 16).toString(16);
              // @ts-ignore
            } else if (b < 0x100) {
              return "\\u00" + parseInt(b, 16).toString(16);
              // @ts-ignore
            } else if (b < 0x1000) {
              return "\\u0" + parseInt(b, 16).toString(16);
            }
            return "\\u" + parseInt(b, 16).toString(16);
          }
          break;
      }
    }
    return bytes;
  }

  /* -----------------------------------messageToJson Util end---------------------------------------------------------*/

  /* -----------------------------------xmlToMessage Util start--------------------------------------------------------*/
  static resolveFieldType(fields: object = [], typeObj: object): void {
    let messageKeysArray = Object.keys(fields);
    messageKeysArray.forEach(index => {
      let fieldType = fields[index]['type']['name'];
      let fieldName = fields[index]['name']
      if (fieldType === 'message') {
        let currentTypeObj = Object.create(null);
        typeObj[fieldName] = currentTypeObj;
        this.resolveFieldType(fields[index]['resolvedType']['_fields'], currentTypeObj);
      } else {
        typeObj[fieldName] = fieldType;
      }
    })
  }

  static resolveResultWithType(data: Object, typeObj: Object): void {
    for (const strJsonObjKey in data) {
      if (typeof data[strJsonObjKey] === 'object') {
        if (typeObj[strJsonObjKey] === undefined) {
          this.resolveResultWithType(data[strJsonObjKey], typeObj);
        } else {
          this.resolveResultWithType(data[strJsonObjKey], typeObj[strJsonObjKey]);
        }
      } else {
        let newValue = this.getValueWithType(data[strJsonObjKey], typeObj[strJsonObjKey]);
        data[strJsonObjKey] = newValue;
      }
    }
  }

  private static getValueWithType(value: string, type: string): any {
    let result;

    switch (type) {
      case 'bool':
        if (typeof value === 'boolean') {
          result = value;
        } else if (typeof value === 'string') {
          if (value === 'false') {
            result = false;
          } else {
            result = true;
          }
        } else {
          if (value === 0) {
            result = false;
          } else {
            result = true;
          }
        }
        break;
      case 'int32':
      case 'uint32':
      case 'sint32':
      case 'int64':
      case 'uint64':
      case 'sint64':
      case 'fixed32':
      case 'fixed64':
      case 'sfixed32':
      case 'sfixed64':
      case 'float':
      case 'double':
        result = Number(value);
        break;
      default:
        result = value;
        break
    }
    return result;
  }

  /**
   * 提取json的key和value
   * @param json 原始json数据
   * @returns 去除多余属性的json对象
   */
  static filterJson(json: string | Object): object {
    if (typeof json == 'string') {
      json = JSON.parse(json);
    }

    let result = Object.create(null);
    this.rollObjData(result, json, null);
    return result;
  }

  /**
   * 循环处理json数据，只保留节点及节点值
   * @param result 存储json数据的对象
   * @param json 要被处理的json对象
   * @param nodeName 当前处理的节点名称
   */
  private static rollObjData(result: Object, json: Object, nodeName: string): void {

    // 获取当前对象中的所有key,类型数组。
    let keysArray = Object.keys(json);
    keysArray.forEach(keyName => {
      // 获取json中对应key的值
      var item = json[keyName];
      if (typeof item === 'object' && !Array.isArray(item)) {
        let childKeysArray = Object.keys(item);
        if (childKeysArray.indexOf('type') !== -1 && item['type'] === 'element') {
          // 空字符串没有子节点'elements',直接设置值
          if (!item['elements']) {
            json[keyName]['name'] = "";
            return;
          }

          let nodeType = this.getNextType(item['elements']);
          if (nodeType === 'element') {
            let currentJsonObj = Object.create(null);

            // 如果已经存在对应的对象，需要转换类型为Array
            if (result[item['name']] !== undefined && typeof result[item['name']] === 'object') {
              let itemArray = new Array();
              let existItem = result[item['name']];
              itemArray.push(existItem);
              itemArray.push(currentJsonObj);
              result[item['name']] = itemArray;
            } else if (result[item['name']] !== undefined && typeof result[item['name']] === 'object' && Array.isArray(result[item['name']])) {
              result[item['name']].push(currentJsonObj);
            } else {
              result[item['name']] = currentJsonObj;
            }
            this.rollObjData(currentJsonObj, item['elements'], item['name']);
          } else {
            this.rollObjData(result, json[keyName]['elements'], json[keyName]['name']);
          }
        } else if (childKeysArray.indexOf('type') !== -1 && item['type'] === 'text') {
          let value = item['text'];
          if (result[nodeName] !== undefined) {
            if (typeof result[nodeName] == 'string') {
              let textArray = new Array();
              textArray.push(result[nodeName]);
              textArray.push(value);
              result[nodeName] = textArray;
            } else {
              result[nodeName].push(value);
            }
          } else {
            result[nodeName] = value;
          }
        }
      } else {
        this.rollObjData(result, json['elements'], nodeName);
      }
    })
  }

  /**
   * 获取当前节点的类型：如果为text 则表示当前节点的值，如果为element,则表示当前节点存在子标签
   * @param data 节点的数据
   * @returns 当前节点类型
   */
  private static getNextType(data: Object): string {
    let keysArray = Object.keys(data);
    let type = 'text';
    keysArray.forEach(keyName => {
      if (data[keyName]['type'] === 'element') {
        type = 'element';
      }
    })
    return type;
  }

  /* -----------------------------------xmlToMessage Util end----------------------------------------------------------*/

  /* -----------------------------------messageToHtml Util start--------------------------------------------------------*/

  private static META_CONTENT: string = "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />";
  private static MAIN_DIV_STYLE: string = "color: black; font-size: 14px; font-family: sans-serif; font-weight: bolder; margin-bottom: 10px;";
  private static FIELD_NAME_STYLE: string = "font-weight: bold; color: #669966;font-size: 14px; font-family: sans-serif;";
  private static FIELD_VALUE_STYLE: string = "color: #3300FF;font-size: 13px; font-family: sans-serif;";

  static printTitle(title: string): string {
    let titleHtml = '';
    titleHtml += '<html><head>';
    titleHtml += this.META_CONTENT;
    titleHtml += '<title>';
    titleHtml += title;
    titleHtml += '</title></head><body>';
    titleHtml += '<div style="';
    titleHtml += this.MAIN_DIV_STYLE;
    titleHtml += '">message : ';
    titleHtml += title;
    titleHtml += '</div>';
    return titleHtml;
  }

  static print(message: Protobuf.Builder.Message): string {
    var result = '';
    let allFieldsArray = message.__proto__.$type._fields;
    allFieldsArray.forEach(item => {
      result += this.printField(item, message[item['name']]);
    })
    return result;
  }

  private static printField(field: Protobuf.Builder.Message.Field, value: Object): string {
    let fieldHtml = '';
    if (field.repeated) {
      for (const index in value) {
        fieldHtml += this.printSingleField(field, value[index]);
      }
    } else {
      fieldHtml += this.printSingleField(field, value);
    }
    return fieldHtml;
  }

  private static printSingleField(field: Protobuf.Builder.Message.Field, value: Object): string {
    let isExtension = field.extensions ? field.extensions : field.parent.extensions;
    let isGroup = field.isGroup ? field.isGroup : field.parent.isGroup;
    let html = '';
    if (Boolean(isExtension)) {
      html += '[<span style="';
      html += this.FIELD_NAME_STYLE;
      html += '">';
    } else {
      html += '<span style="';
      html += this.FIELD_NAME_STYLE;
      html += '">';
      if (Boolean(isGroup)) {
        html += field['name'];
      } else {
        html += field['name'];
      }
      html += '</span>';
    }

    if (field.type.name === 'message') {
      html += ' <span style="color: red;">{</span><br/>';
      html += '<div style="margin-left: 25px">';
    } else {
      html += ': ';
    }

    html += this.printFieldValue(field, value);

    if (field.type.name === 'message') {
      html += '</div>';
      html += '<span style="color: red;">}</span>';
    }
    html += '<br/>';
    return html;
  }

  private static printFieldValue(field: Protobuf.Builder.Message.Field, value: Object): string {
    var html = '';
    html += '<span style="';
    html += this.FIELD_VALUE_STYLE;
    html += '">';
    switch (field.type.name) {
      case 'int32':
      case 'sint32':
      case 'sfixed32':
      case 'float':
      case 'double':
      case 'uint32':
      case 'fixed32':
        html += Number(value);
        break;
      case 'bool':
        if (typeof value === 'boolean') {
          html += value;
        } else if (typeof value === 'string') {
          if (value === 'false') {
            html += false;
          } else {
            html += true;
          }
        } else {
          if (value === 0) {
            html += false;
          } else {
            html += true;
          }
        }
        break;
      case 'uint64':
      case 'fixed64':
      case 'int64':
      case 'sint64':
      case 'sfixed64':
        let longValue = Protobuf.Long.fromValue(value).toInt();
        html += longValue;
        break;
      case 'string':
        html += '"';
        html += value;
        html += '"';
        break;
      case 'bytes': {
        html += '"';
        html += this.escapeBytes(value.toString());
        html += '"';
        break;
      }
      case 'enum': {
        html += field.resolvedType.children[value]['name'];
        break;
      }
      case 'message':
      case 'group':
        html += (this.print(value));
        break;
    }

    html += '</span>'
    return html;
  }

  private static escapeBytes(input: string): string {
    let length = input.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      let byte = input.charAt(i);

      switch (byte) {
      // @ts-ignore
        case 0x07:
          result += "\\a";
          break;
        case '\b':
          result += "\\b";
          break;
        case '\f':
          result += "\\f";
          break;
        case '\n':
          result += "\\n";
          break;
        case '\r':
          result += "\\r";
          break;
        case '\t':
          result += "\\t";
          break;
      // @ts-ignore
        case 0x0b:
          result += "\\v";
          break;
        case '\\':
          result += "\\\\";
          break;
        case '\'':
          result += "\\\'";
          break;
        case '"':
          result += "\\\"";
          break;
        default:
          if (byte.charCodeAt(0) >= 0x20) {
            result += byte;
          } else {
            result += '\\';
            result += ('0' + ((byte.charCodeAt(0) >>> 6) & 3));
            result += ('0' + ((byte.charCodeAt(0) >>> 3) & 7));
            result += ('0' + (byte.charCodeAt(0) & 7));
          }
          break;
      }
    }
    return result;
  }

  /* -----------------------------------messageToHtml Util end----------------------------------------------------------*/

}
