let __generate__Id: number = 0;
function generateId(): string {
    return "CoapResponse_" + ++__generate__Id;
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
export class CoapResponse {
    code: CoapResponseCode = CoapResponseCode.OTHER_ERROR;
    message: string[] = [""];
}
/**
 * coap native回调状态码
 */
export enum CoapResponseCode {
    SUCCESS = 0,
    OTHER_ERROR = 1,
    NETWORK_ERROR = 2,
    URL_ERROR = 3 // url错误,不是正确的coap url
}
