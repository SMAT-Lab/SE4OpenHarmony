let __generate__Id: number = 0;
function generateId(): string {
    return "checksum_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import fs from '@ohos.fileio';
import md5 from './md5';
import sha1 from './sha1';
import { Options } from '../ets/options';
export class Checksum {
    fd: number = 0;
    result: string = '';
    checksum(value: string, options: Options): string {
        options || (options = { algorithm: "" });
        if (!options.algorithm)
            options.algorithm = 'sha1';
        let hash: string = "";
        switch (String(options.algorithm).toLowerCase()) {
            case "sha1":
                let sha = new sha1();
                hash = sha.hex_sha1(value);
                break;
            case "md5":
                let md = new md5();
                hash = md.hex_md5(value);
                break;
        }
        return hash;
    }
    checksumFile(filename: string, options: Options, callback: any): any {
        if (typeof options === 'function') {
            callback = options;
            options = { algorithm: "" };
        }
        options || (options = { algorithm: "" });
        if (!options.algorithm)
            options.algorithm = 'sha1';
        let hash: string = '';
        try {
            let stat = fs.statSync(filename);
            if (!stat.isFile())
                throw new Error('Not a file');
            let buf = new ArrayBuffer(4096);
            let fileStream = fs.openSync(filename);
            let size = fs.readSync(fileStream, buf);
            let length = fs.createStreamSync(filename, "r+").readSync(buf, { offset: 0 });
            // let readText: string = String.fromCharCode.apply(null, new Uint8Array(buf))
            let readText: string = String.fromCharCode(...new Uint8Array(buf));
            let value: string = readText.substring(0, length);
            if (value != null) {
                switch (String(options.algorithm).toLowerCase()) {
                    case "sha1":
                        let sha = new sha1();
                        hash = sha.hex_sha1(value);
                        break;
                    case "md5":
                        let md = new md5();
                        hash = md.hex_md5(value);
                        break;
                }
                callback(null, hash);
            }
            else {
                callback("err", "File has no content");
            }
        }
        catch (err) {
            if (!err)
                throw new Error('Not a file');
            if (err)
                return callback(err);
        }
    }
}
