/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { ERR_INVALID_ARG_TYPE } from './errors';

export function promisify<T>(func: (cb: (err: any, data: T) => void) => void, ctx?: any): () => Promise<T> {
    return function () {
        var ctx = ctx || this;
        return new Promise((resolve, reject) => {
            func.call(ctx, ...arguments, function () {
                var args = Array.prototype.map.call(arguments, item => item);
                var err = args.shift();
                if (err) {
                    reject(err)
                } else {
                    args = args.length > 1 ? args : args[0];
                    resolve(args);
                }
            });
        })
    };
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {Function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {Function} superCtor Constructor function to inherit prototype from.
 * @throws {TypeError} Will error if either constructor is null, or if
 *     the super constructor lacks a prototype.
 */
export function inherits(ctor, superCtor) {

    if (ctor === undefined || ctor === null)
    throw new ERR_INVALID_ARG_TYPE('ctor', 'Function', ctor);

    if (superCtor === undefined || superCtor === null)
    throw new ERR_INVALID_ARG_TYPE('superCtor', 'Function', superCtor);

    if (superCtor.prototype === undefined) {
        throw new ERR_INVALID_ARG_TYPE('superCtor.prototype',
            'Object', superCtor.prototype);
    }
    Object.defineProperty(ctor, 'super_', {
        value: superCtor,
        writable: true,
        configurable: true
    });
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}

export function format(formatStr, ...args) {
    // Simplified version of https://nodejs.org/api/util.html#utilformatformat-args
    return formatStr.replace(/%([sdifj])/g, function (...[_unused, type]) {
        const replacement = args.shift()

        if (type === 'f') {
            return replacement.toFixed(6)
        } else if (type === 'j') {
            return JSON.stringify(replacement)
        } else if (type === 's' && typeof replacement === 'object') {
            const ctor = replacement.constructor !== Object ? replacement.constructor.name : ''
            return `${ctor} {}`.trim()
        } else {
            return replacement.toString()
        }
    })
}

export function intToIP(num) {
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}