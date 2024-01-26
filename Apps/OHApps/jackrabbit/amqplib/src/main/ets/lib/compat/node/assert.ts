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

import { ERR_MISSING_ARGS } from './errors'

function assert(value: unknown, message?: string | Error) {
    let argLen = arguments.length;
    let fn = assert;
    if (!value) {
        let generatedMessage = false;

        if (argLen === 0) {
            generatedMessage = true;
            message = 'No value argument passed to `assert.ok()`';
        } else if (message == null) {
            generatedMessage = true;
            message = '';
        } else if (message instanceof Error) {
            throw message;
        }

        const err = new AssertionError({
            actual: value,
            expected: true,
            message,
            operator: '==',
            stackStartFn: fn
        });
        err.generatedMessage = generatedMessage;
        throw err;
    }
};

export class AssertionError extends Error {
    actual: unknown;
    expected: unknown;
    operator: string;
    generatedMessage: boolean;
    code: string = 'ERR_ASSERTION';
    name: string = 'AssertionError';

    constructor(options?: {
        /** If provided, the error message is set to this value. */
        message?: string | undefined;
        /** The `actual` property on the error instance. */
        actual?: unknown | undefined;
        /** The `expected` property on the error instance. */
        expected?: unknown | undefined;
        /** The `operator` property on the error instance. */
        operator?: string | undefined;
        /** If provided, the generated stack trace omits frames before this function. */
        // tslint:disable-next-line:ban-types
        stackStartFn?: Function | undefined;
    }) {
        super(options?.message)
    };

    toString() {
        return `${this.name} [${this.code}]: ${this.message}`
    }
}

namespace assert {
/**
 * Indicates the failure of an assertion. All errors thrown by the `assert` module
 * will be instances of the `AssertionError` class.
 */

    function innerFail(obj) {
        if (obj.message instanceof Error) throw obj.message;

        throw new AssertionError(obj);
    }

    export function equal(actual, expected, message) {
        if (arguments.length < 2) {
            throw new ERR_MISSING_ARGS('actual', 'expected');
        }
        // eslint-disable-next-line eqeqeq
        if (actual != expected && (!Number.isNaN(actual) || !Number.isNaN(expected))) {
            innerFail({
                actual,
                expected,
                message,
                operator: '==',
                stackStartFn: equal
            });
        }
    }
    ;
}

export default assert;