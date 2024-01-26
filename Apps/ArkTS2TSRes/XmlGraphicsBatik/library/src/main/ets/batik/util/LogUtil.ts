let __generate__Id: number = 0;
function generateId(): string {
    return "LogUtil_" + ++__generate__Id;
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
/**
 * 打印info数据
 * @param tag 标签
 * @param info 日志信息
 */
export function consoleInfo(tag: string, info: string): void {
    console.info(tag + ': ' + info);
}
/**
 * 打印Debug数据
 * @param tag 标签
 * @param info 日志信息
 */
export function consoleDebug(tag: string, info: string) {
    console.debug(tag + ': ' + info);
}
/**
 * 打印日志数据
 * @param tag 标签
 * @param info 日志信息
 */
export function consoleLog(tag: string, info: string) {
    console.log(tag + ': ' + info);
}
/**
 * 打印警告数据
 * @param tag 标签
 * @param info 日志信息
 */
export function consoleWarn(tag: string, info: string) {
    console.warn(tag + ': ' + info);
}
/**
 * 打印错误数据
 * @param tag 标签
 * @param info 日志信息
 */
export function consoleError(tag: string, info: string) {
    console.error(tag + ': ' + info);
}
