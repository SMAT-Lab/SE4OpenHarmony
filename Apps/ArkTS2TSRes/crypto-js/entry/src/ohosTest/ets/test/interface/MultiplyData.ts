let __generate__Id: number = 0;
function generateId(): string {
    return "MultiplyData_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the MIT License, (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface MultiplyData {
    ciphertext: object;
    key: object;
    iv: object;
    algorithm: object;
    blockSize: BlockSize;
    formatter: object;
    mode: object;
    padding: object;
}
export interface BlockSize {
    blockSize: object;
}
export let MultiplyFn = (ciphertext: object, key: object, iv: object, algorithm: object, blockSize: BlockSize, formatter: object, mode: object, padding: object): MultiplyData => {
    let MultiplyDataFnData: MultiplyData = {
        ciphertext: ciphertext,
        key: key,
        iv: iv,
        algorithm: algorithm,
        blockSize: blockSize,
        formatter: formatter,
        mode: mode,
        padding: padding,
    };
    return MultiplyDataFnData;
};
export interface MultiplyHasSaltNoCipherParamsData {
    ciphertext: object;
    key: object;
    iv: object;
    salt: object;
    algorithm: BlockSize;
    blockSize: object;
    formatter: object;
    mode: object;
    padding: object;
    toString: (str?: string | JsonFormatterClass) => string;
}
export class JsonFormatterClass {
    stringify: (cipherParams: MultiplyHasSaltNoCipherParamsData) => string = (cipherParams: MultiplyHasSaltNoCipherParamsData): string => {
        return '{ ct: ' + cipherParams.ciphertext + ', iv: ' + cipherParams.iv + ' }';
    };
}
export interface Ciphertext {
    toString: (str?: string) => string;
}
export let MultiplyHasSaltNoCipherParamsFn = (ciphertext: object, key: object, iv: object, salt: object, algorithm: BlockSize, blockSize: object, formatter: object, mode: object, padding: object): MultiplyHasSaltNoCipherParamsData => {
    let MultiplyHasNoCipherParamsDataFnData: MultiplyHasSaltNoCipherParamsData = {
        ciphertext: ciphertext,
        key: key,
        iv: iv,
        salt: salt,
        algorithm: algorithm,
        blockSize: blockSize,
        formatter: formatter,
        mode: mode,
        padding: padding,
    };
    return MultiplyHasNoCipherParamsDataFnData;
};
export interface MultiplyHasSaltData {
    ciphertext: Ciphertext;
    key: object;
    iv: object;
    salt: object;
    algorithm: BlockSize;
    blockSize: object;
    formatter: object;
    mode: object;
    padding: object;
    cipherParams: MultiplyHasSaltNoCipherParamsData;
}
export let MultiplyHasSaltFn = (ciphertext: Ciphertext, key: object, iv: object, salt: object, algorithm: BlockSize, blockSize: object, formatter: object, mode: object, padding: object, cipherParams: MultiplyHasSaltNoCipherParamsData): MultiplyHasSaltData => {
    let MultiplyHasDataFnData: MultiplyHasSaltData = {
        ciphertext: ciphertext,
        key: key,
        iv: iv,
        salt: salt,
        algorithm: algorithm,
        blockSize: blockSize,
        formatter: formatter,
        mode: mode,
        padding: padding,
        cipherParams: cipherParams
    };
    return MultiplyHasDataFnData;
};
export interface CiphertextData {
    ciphertext: object;
}
export let CiphertextFn = (ciphertext: object): CiphertextData => {
    let CiphertextFnData: CiphertextData = {
        ciphertext: ciphertext,
    };
    return CiphertextFnData;
};
export interface CiphertextSaltData {
    ciphertext: object;
    salt: object;
}
export let CiphertextSaltFn = (ciphertext: object, salt: object): CiphertextSaltData => {
    let CiphertextSaltFnData: CiphertextSaltData = {
        ciphertext: ciphertext,
        salt: salt,
    };
    return CiphertextSaltFnData;
};
export interface KeySize {
    key: number;
    size: number;
}
export let KeySizeFn = (key: number, size: number): KeySize => {
    let KeySizeFnData: KeySize = {
        key: key,
        size: size,
    };
    return KeySizeFnData;
};
export interface KeyIterations {
    keySize: number;
    iterations: number;
}
export let KeyIterationsFn = (keySize: number, iterations: number): KeyIterations => {
    let KeyIterationsFnData: KeyIterations = {
        keySize: keySize,
        iterations: iterations,
    };
    return KeyIterationsFnData;
};
export interface KeySizeData {
    keySize: number;
}
export let KeySizeF = (keySize: number): KeySizeData => {
    let KeySizeFData: KeySizeData = {
        keySize: keySize,
    };
    return KeySizeFData;
};
export interface Data {
    cipherParams: CipherParams;
}
export interface CipherParams {
    toString?: (str?: string | JsonFormatterClass) => string;
}
