/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as mime from "../../js/mime";
import { isFile, isString, isNumber } from "../utils/utils";
import { File } from "./File";
export class FormData {
    static DEFAULT_CONTENT_TYPE = "application/octet-stream";
    public boundaryKey: string | number; //随机字符串
    private boundary: string; //分隔符
    private endBoundary: string; //结尾分隔符
    private result: Array<any> = []; //最终拼接结果
    [Symbol.toStringTag] = "FormData";
    constructor(stamp?: string) {
        this.boundaryKey = stamp || Date.now();
        this.boundary = "--" + this.boundaryKey;
        this.endBoundary = this.boundary + "--";
    }
    /**
     * 添加键值对（ 支持string | number | File类型的content ）
     * @param key
     * @param value
     */
    append(key: string, value: string | number | File) {
        if (isString(value)) {
            this.appendValue(key, value);
        }
        else if (isNumber(value)) {
            this.appendValue(key, value + "");
        }
        else if (isFile(value)) {
            const { fileName, fileData } = value;
            if (!fileName || !fileData)
                throw new Error("无效的fileName或fileData");
            this.appendFile(key, value);
        }
        else {
            throw new Error("Unsupported value type");
        }
    }
    /**
     * 添加基本类型
     * @param key
     * @param value
     */
    private appendValue(key: string, value: string) {
        this.result.push(this.boundary + "\r\n");
        this.result.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n');
        this.result.push(value);
        this.result.push("\r\n");
    }
    /**
     * 添加文件类型
     * @param key
     * @param file
     */
    private appendFile(key: string, file: File) {
        const { fileName, fileData } = file;
        const contentType = this.getContentType(file);
        this.result.push(this.boundary + "\r\n");
        this.result.push('Content-Disposition: form-data; name="' + key + '"; filename="' + fileName + '"\r\n');
        this.result.push('Content-Type: ' + contentType + '\r\n');
        this.result.push("\r\n");
        this.result.push(fileData);
        this.result.push("\r\n");
    }
    /**
     * 将result转换成ArrayBuffer
     */
    toArrayBuffer(): ArrayBuffer {
        this.result.push("\r\n" + this.endBoundary);
        let charArr = [];
        for (let i = 0; i < this.result.length; i++) {
            let item = this.result[i];
            if (typeof item === "string") {
                // 字符  直接获取unicode编码
                for (let s = 0; s < item.length; s++) {
                    charArr.push(item.charCodeAt(s));
                }
            }
            else if (typeof item === "number") {
                // 数字  转换成字符之后获取unicode编码
                let numStr = item.toString();
                for (let s = 0; s < numStr.length; s++) {
                    charArr.push(numStr.charCodeAt(s));
                }
            }
            else {
                // 判断  ArrayBuffer Or Uint8Array
                if (!(item instanceof Uint8Array)) {
                    item = new Uint8Array(item);
                }
                for (let j = 0; j < item.length; j++) {
                    charArr.push(item[j]);
                }
            }
        }
        return new Uint8Array(charArr).buffer;
    }
    /**
     * 获取Content类型
     * @param file
     */
    private getContentType(file: File): string {
        let contentType: string;
        if (file.fileName) {
            contentType = mime.lookup(file.fileName) || "";
        }
        else {
            contentType = FormData.DEFAULT_CONTENT_TYPE;
        }
        return contentType;
    }
}
