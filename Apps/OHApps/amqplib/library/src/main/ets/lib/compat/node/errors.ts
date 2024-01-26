/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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

import assert from './assert'

const classRegExp = /^([A-Z][a-z0-9]*)+$/;
// Sorted by a rough estimate on most frequently used entries.
const kTypes = [
    'string',
    'function',
    'number',
    'object',
    // Accept 'Function' and 'Object' as alternative to the lower cased version.
    'Function',
    'Object',
    'boolean',
    'bigint',
    'symbol',
];

export class ERR_MISSING_ARGS extends TypeError {
    code: string | number

    constructor(...args) {
        super();
        this.message = this.createMessage(args)
        this.code = 'ERR_MISSING_ARGS';
    }

    createMessage(...args) {
        assert(args.length > 0, 'At least one arg needs to be specified');
        let msg = 'The ';
        const len = args.length;
        const wrap = (a) => `"${a}"`;
        args = Array.prototype.map.call(args, item => item);
        switch (len) {
            case 1:
                msg += `${args[0]} argument`;
                break;
            case 2:
                msg += `${args[0]} and ${args[1]} arguments`;
                break;
            default:
                msg += args.slice(0, len - 1).join(', ');
                msg += `, and ${args[len - 1]} arguments`;
                break;
        }
        return `${msg} must be specified`;
    }

    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
}

export class ERR_INVALID_ARG_TYPE extends TypeError {
    code: string | number

    constructor(name, expected, actual) {
        super()
        this.message = this.createMessage(name, expected, actual)
    }

    createMessage(name, expected, actual) {
        assert(typeof name === 'string', "'name' must be a string");
        if (!Array.isArray(expected)) {
            expected = [expected];
        }

        let msg = 'The ';
        if (String.prototype.endsWith.call(name, ' argument')) {
            // For cases like 'first argument'
            msg += `${name} `;
        } else {
            const type = String.prototype.includes.call(name, '.') ? 'property' : 'argument';
            msg += `"${name}" ${type} `;
        }
        msg += 'must be ';

        const types = [];
        const instances = [];
        const other = [];

        for (const value of expected) {
            assert(typeof value === 'string',
                'All expected entries have to be of type string');
            if (Array.prototype.includes.call(kTypes, value)) {
                Array.prototype.push.call(types, String.prototype.toLowerCase.call(value));
            } else if (RegExp.prototype.test.call(classRegExp, value)) {
                Array.prototype.push.call(instances, value);
            } else {
                assert(value !== 'object',
                    'The value "object" should be written as "Object"');
                Array.prototype.push.call(other, value);
            }
        }

        // Special handle `object` in case other instances are allowed to outline
        // the differences between each other.
        if (instances.length > 0) {
            const pos = Array.prototype.indexOf.call(types, 'object');
            if (pos !== -1) {
                Array.prototype.splice.call(types, pos, 1);
                Array.prototype.push.call(instances, 'Object');
            }
        }

        if (types.length > 0) {
            if (types.length > 2) {
                const last = Array.prototype.pop.call(types);
                msg += `one of type ${Array.prototype.join.call(types, ', ')}, or ${last}`;
            } else if (types.length === 2) {
                msg += `one of type ${types[0]} or ${types[1]}`;
            } else {
                msg += `of type ${types[0]}`;
            }
            if (instances.length > 0 || other.length > 0)
            msg += ' or ';
        }

        if (instances.length > 0) {
            if (instances.length > 2) {
                const last = Array.prototype.pop.call(instances);
                msg +=
                `an instance of ${Array.prototype.join.call(instances, ', ')}, or ${last}`;
            } else {
                msg += `an instance of ${instances[0]}`;
                if (instances.length === 2) {
                    msg += ` or ${instances[1]}`;
                }
            }
            if (other.length > 0)
            msg += ' or ';
        }

        if (other.length > 0) {
            if (other.length > 2) {
                const last = Array.prototype.pop.call(other);
                msg += `one of ${Array.prototype.join.call(other, ', ')}, or ${last}`;
            } else if (other.length === 2) {
                msg += `one of ${other[0]} or ${other[1]}`;
            } else {
                if (String.prototype.toLowerCase.call(other[0]) !== other[0])
                msg += 'an ';
                msg += `${other[0]}`;
            }
        }

        if (actual == null) {
            msg += `. Received ${actual}`;
        } else if (typeof actual === 'function' && actual.name) {
            msg += `. Received function ${actual.name}`;
        } else if (typeof actual === 'object') {
            if (actual.constructor && actual.constructor.name) {
                msg += `. Received an instance of ${actual.constructor.name}`;
            } else {
                msg += `. Received object`;
            }
        } else {
            msg += `. Received type ${typeof actual}`;
        }
        return msg;
    }
}