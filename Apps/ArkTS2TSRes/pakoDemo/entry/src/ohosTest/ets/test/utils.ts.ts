/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import inflate_table from 'pako/lib/zlib/inftrees.js';
import ZStream from 'pako/lib/zlib/zstream.js';
import strings from 'pako/lib/utils/strings.js';
import inflatejs from 'pako/lib/zlib/inflate.js';
import deflatejs from 'pako/lib/zlib/deflate.js';
let string2buf = strings.string2buf;
let buf2string = strings.buf2string;
let utf8border = strings.utf8border;
let inflate = inflatejs.inflate;
let inflateEnd = inflatejs.inflateEnd;
let deflateInit = deflatejs.deflateInit;
let deflateSetHeader = deflatejs.deflateSetHeader;
let deflate = deflatejs.deflate;
let deflateEnd = deflatejs.deflateEnd;
function testChunk(buf, expected, packer, chunkSize) {
    let i, _in, count, pos, size, expFlushCount;
    let onData = packer.onData;
    let flushCount = 0;
    packer.onData = function () {
        flushCount++;
        onData.apply(this, arguments);
    };
    count = Math.ceil(buf.length / chunkSize);
    pos = 0;
    for (i = 0; i < count; i++) {
        size = (buf.length - pos) < chunkSize ? buf.length - pos : chunkSize;
        _in = new Uint8Array(size);
        _in.set(buf.subarray(pos, pos + size), 0);
        packer.push(_in, i === count - 1);
        pos += chunkSize;
    }
    //expected count of onData calls. 16384 output chunk size
    expFlushCount = Math.ceil(packer.result.length / packer.options.chunkSize);
    return {
        result: packer.result,
        flushCount: flushCount,
        expFlushCount: expFlushCount
    };
}
export { string2buf, buf2string, utf8border, inflate, inflateEnd, inflate_table, deflateInit, deflateSetHeader, deflate, deflateEnd, ZStream, testChunk };
