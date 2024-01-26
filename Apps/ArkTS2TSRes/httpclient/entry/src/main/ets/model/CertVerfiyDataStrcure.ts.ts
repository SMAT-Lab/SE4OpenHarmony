/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
export interface SocketConnectError {
    code: string;
    message: string;
}
export interface OnMsgData {
    message: number[];
    remoteInfo: {
        address: string;
        family: string;
        port: number;
        size: number;
    };
}
export interface CertVerifyResult {
    code?: number;
    name?: string;
    verificationData?: string;
    verificationResult?: string;
}
export interface BindResult {
    code: number;
    value: string;
}
export interface MsgResult {
    code: number;
    value: string;
}
export interface ConnectResult {
    code: number;
    value: string;
}
export interface ErrorMsg {
    code: number;
    errorMsg: string;
}
