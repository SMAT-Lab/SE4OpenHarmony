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
import { FormData } from "../models/FormData";
import { File } from "../models/File";
import { MyHttpRequestOptions } from "../types/type";
const toString = Object.prototype.toString;
/**
 * 是否是FormData类型
 * @param thing
 */
export function isFormData(thing: any): thing is FormData {
    const pattern = "[object FormData]";
    return thing && (toString.call(thing) === pattern);
}
/**
 * 是否是File类型
 * @param thing
 */
export function isFile(thing): thing is File {
    const pattern = "[object File]";
    return thing && (toString.call(thing) === pattern);
}
/**
 * 是否是Number类型
 * @param param
 */
export function isNumber(param: any): param is number {
    return typeof param === "number";
}
/**
 * 是否是String类型
 * @param param
 */
export function isString(param: any): param is string {
    return typeof param === "string";
}
/**
 * 是否是MyHttpRequestOptions类型
 * @param param
 */
export function isMyHttpRequestOptions(param): param is MyHttpRequestOptions {
    return (!!(param as MyHttpRequestOptions).url);
}
