let __generate__Id: number = 0;
function generateId(): string {
    return "CoapClient_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var coap, { newCoapClient } = globalThis.requireNapi("coap", true);
import { CoapResponse } from './CoapResponse';
export class CoapClient {
    private coapClient: newCoapClient;
    private classId = 0;
    constructor() {
        console.log("libcoap constructor");
        this.coapClient = new newCoapClient();
        this.classId = this.coapClient.classId;
        console.log("libcoap constructor classId:" + this.classId);
    }
    /**
     * coap客户端访问服务端
     * @param coapUri 客户端访问的uri地址
     * @param method  请求方式
     * @param type
     * @returns
     */
    request(coapUri: string, method: CoapRequestMethod, type: CoapRequestType): Promise<CoapResponse> {
        return this.coapClient.request(this.classId, coapUri, method, type);
    }
    /**
     * 客户端设置透传格式
     * @param format post,put透传参数的格式
     */
    setFormat(format: ContentFormat) {
        this.coapClient.setFormat(this.classId, format);
    }
    /**
     * 客户端设置请求端口号
     * @param port 端口号
     */
    setPort(port: number) {
        this.coapClient.setPort(port.toString(), this.classId);
    }
    /**
     * 客户端设置请求等待超时时间
     * @param waitSecond 请求等待时间
     */
    setWaitSecond(waitSecond: number) {
        this.coapClient.setWaitSecond(waitSecond, this.classId);
    }
    /**
     * 客户端设置连接持续观察等待时间
     * @param obsSecond 持续观察等待时间
     */
    setObsSecond(obsSecond: number) {
        this.coapClient.setObsSecond(obsSecond, this.classId);
    }
    /**
     * 客户端设置重试请求次数
     * @param repeatCount 重试请求次数，必须1-255之间
     */
    setRepeatCount(repeatCount: number) {
        if (0 >= repeatCount || repeatCount > 255) {
            console.log("repeatCount set error");
            return;
        }
        this.coapClient.setRepeatCount(repeatCount, this.classId);
    }
    /**
     *  客服端透传的内容
     * @param payload post,put透传的内容
     */
    setPayload(payload: string) {
        this.coapClient.setPayload(payload, this.classId);
    }
    /**
     * 客服端设置初始token
     * @param token:Uint8Array数组，数组内容是0-255的数字，数组长度8位
     */
    setToken(token: Uint8Array) {
        if (token.length != 8) {
            console.log("libcoap 请传入正确8位长度的token");
            return;
        }
        this.coapClient.setToken(token, this.classId);
    }
    /**
     * 打开native层log
     * @param token 初始令牌
     */
    static setNativeLogOpen(isOpen: boolean) {
        coap.setNativeLogOpen(isOpen);
    }
}
export enum CoapRequestMethod {
    GET = 1,
    POST = 2,
    PUT = 3
}
export enum CoapRequestType {
    COAP_MESSAGE_CON = 0,
    COAP_MESSAGE_NON = 1
}
export enum ContentFormat {
    PLAIN = 0,
    LINK = 40,
    XML = 41,
    BINARY = 42,
    EXI = 47,
    JSON = 50,
    CBOR = 60 //   application/cbor (cbor)
}
