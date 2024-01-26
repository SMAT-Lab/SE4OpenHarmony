interface Index_Params {
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import prompt from '@system.prompt';
import CryptoJS from '@ohos/crypto-js';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Scroll.height('100%');
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBarWidth(0);
        Scroll.backgroundColor(Color.White);
        Column.create();
        Column.width('100%');
        Column.padding({ bottom: 180 });
        Text.create('md5');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.MD5("123456");
            prompt.showToast({ message: 'md5=' + hash });
            console.log('md5=' + hash);
        });
        Text.pop();
        Text.create('sha1');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.SHA1("123456");
            prompt.showToast({ message: 'sha1=' + hash });
            console.log('sha1=' + hash);
        });
        Text.pop();
        Text.create('sha256');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.SHA256("123456");
            prompt.showToast({ message: 'sha256=' + hash });
            console.log('sha256=' + hash);
        });
        Text.pop();
        Text.create('sha512');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.SHA512("123456");
            prompt.showToast({ message: 'sha512=' + hash });
            console.log('sha512=' + hash);
        });
        Text.pop();
        Text.create('sha224');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.SHA224("123456");
            prompt.showToast({ message: "sha224=" + hash });
            console.log("sha224=" + hash);
        });
        Text.pop();
        Text.create('sha384');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.SHA384("123456");
            prompt.showToast({ message: "sha384=" + hash });
            console.log("sha384=" + hash);
        });
        Text.pop();
        Text.create('sha3');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.SHA3("123456");
            prompt.showToast({ message: "sha3=" + hash });
            console.log("sha3=" + hash);
        });
        Text.pop();
        Text.create('ripemd160');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.RIPEMD160("123456");
            prompt.showToast({ message: "ripemd160=" + hash });
            console.log("ripemd160=" + hash);
        });
        Text.pop();
        Text.create('hmac-md5');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacMD5('123456', '123456');
            prompt.showToast({ message: 'hmac-md5=' + hash });
            console.log('hmac-md5=' + hash);
        });
        Text.pop();
        Text.create('hmac-sha1');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacSHA1('123456', '123456');
            prompt.showToast({ message: 'hmac-sha1=' + hash });
            console.log('hmac-sha1=' + hash);
        });
        Text.pop();
        Text.create('hmac-sha256');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacSHA256('123456', '123456');
            prompt.showToast({ message: 'hmac-sha256=' + hash });
            console.log('hmac-sha256=' + hash);
        });
        Text.pop();
        Text.create('hmac-sha224');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacSHA224('123456', '123456');
            prompt.showToast({ message: "hmac-sha224=" + hash });
            console.log("hmac-sha224=" + hash);
        });
        Text.pop();
        Text.create('hmac-sha512');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacSHA512('123456', '123456');
            prompt.showToast({ message: 'hmac-sha512=' + hash });
            console.log('hmac-sha512=' + hash);
        });
        Text.pop();
        Text.create('hmac-sha384');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacSHA384('123456', '123456');
            prompt.showToast({ message: "hmac-sha384=" + hash });
            console.log("hmac-sha384=" + hash);
        });
        Text.pop();
        Text.create('hmac-sha3');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacSHA3('123456', '123456');
            prompt.showToast({ message: "hmac-sha3=" + hash });
            console.log("hmac-sha3=" + hash);
        });
        Text.pop();
        Text.create('hmac-ripemd160');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hash: string = CryptoJS.HmacRIPEMD160('123456', '123456');
            prompt.showToast({ message: "hmac-ripemd160=" + hash });
            console.log("hmac-ripemd160=" + hash);
        });
        Text.pop();
        Text.create('enc-latin1-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Latin1.parse('Hello, World!');
            console.log("enc-latin1-parse =" + words.toString());
            prompt.showToast({ message: "enc-latin1-parse=" + words.toString() });
        });
        Text.pop();
        Text.create('enc-latin1-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Latin1.parse('Hello, World!');
            let latin1: string = CryptoJS.enc.Latin1.stringify(words);
            console.log("enc-latin1-stringify =" + latin1);
            prompt.showToast({ message: "enc-latin1-stringify=" + latin1 });
        });
        Text.pop();
        Text.create('enc-utf8-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf8.parse('0x999999');
            console.log("enc-utf8-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf8-parse=" + words.toString() });
        });
        Text.pop();
        Text.create('enc-utf8-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf8.parse('0x999999');
            let utf8: string = CryptoJS.enc.Utf8.stringify(words);
            console.log("enc-utf8-stringify =" + utf8);
            prompt.showToast({ message: "enc-utf8-stringify=" + utf8 });
        });
        Text.pop();
        Text.create('enc-utf16-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf16.parse('Hello, World!');
            console.log("enc-utf16-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf16-parse=" + words.toString() });
        });
        Text.pop();
        Text.create('enc-utf16-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf16.parse('Hello, World!');
            let utf16: string = CryptoJS.enc.Utf16.stringify(words);
            console.log("enc-utf16-stringify =" + utf16);
            prompt.showToast({ message: "enc-utf16-stringify=" + utf16 });
        });
        Text.pop();
        Text.create('enc-utf16be-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf16BE.parse('Hello, World!');
            console.log("enc-utf16be-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf16be-parse=" + words.toString() });
        });
        Text.pop();
        Text.create('enc-utf16be-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf16BE.parse('Hello, World!');
            let utf16be: string = CryptoJS.enc.Utf16BE.stringify(words);
            console.log("enc-utf16be-stringify =" + utf16be);
            prompt.showToast({ message: "enc-utf16be-stringify=" + utf16be });
        });
        Text.pop();
        Text.create('enc-utf16le-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf16LE.parse('Hello, World!');
            console.log("enc-utf16le-parse =" + words.toString());
            prompt.showToast({ message: "enc-utf16le-parse=" + words.toString() });
        });
        Text.pop();
        Text.create('enc-utf16le-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Utf16LE.parse('Hello, World!');
            let utf16le: string = CryptoJS.enc.Utf16LE.stringify(words);
            console.log("enc-utf16le-stringify =" + utf16le);
            prompt.showToast({ message: "enc-utf16le-stringify=" + utf16le });
        });
        Text.pop();
        Text.create('enc-hex-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Hex.parse('48656c6c6f2c20576f726c6421');
            console.log("enc-hex-parse =" + words.toString());
            prompt.showToast({ message: "enc-hex-parse=" + words.toString() });
        });
        Text.pop();
        Text.create('enc-hex-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let words: string = CryptoJS.enc.Hex.parse('48656c6c6f2c20576f726c6421');
            let hex: string = CryptoJS.enc.Hex.stringify(words);
            console.log("enc-hex-stringify =" + hex);
            prompt.showToast({ message: "enc-hex-stringify=" + hex });
        });
        Text.pop();
        Text.create('WordArray-random');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let salt: string = CryptoJS.lib.WordArray.random(128 / 8);
            prompt.showToast({ message: "WordArray-random=" + salt.toString() });
            console.log("WordArray-random=" + salt.toString());
        });
        Text.pop();
        Text.create('lib-WordArray-create');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let random: string = CryptoJS.lib.WordArray.create();
            prompt.showToast({ message: "WordArray-create=" + JSON.stringify(random) });
            console.log("WordArray-create=" + JSON.stringify(random));
        });
        Text.pop();
        Text.create('evpkdf-compute');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let kdfArg: Record<string, number> = {
                'keySize': 8,
                'iterations': 20
            };
            let evpkdf: string = CryptoJS.algo.EvpKDF.create(kdfArg)
                .compute('560f1e45b', '1234')
                .toString();
            prompt.showToast({ message: "evpkdf-compute=" + evpkdf });
            console.log("evpkdf-compute=" + evpkdf);
        });
        Text.pop();
        Text.create('pbkdf2-compute');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let kdfArg: Record<string, number> = {
                'keySize': 8,
                'iterations': 20
            };
            let result: string = CryptoJS.algo.PBKDF2.create(kdfArg)
                .compute('560f1e45bf60b893', '1234')
                .toString();
            prompt.showToast({ message: "pbkdf2-compute=" + result });
            console.log("pbkdf2-compute=" + result);
        });
        Text.pop();
        Text.create('OpenSSL-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let ciphertext: string = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
            let salt: string = CryptoJS.lib.WordArray.create([0x01234567, 0x89abcdef]);
            let cipSalt: Record<string, string> = {
                'ciphertext': ciphertext,
                'salt': salt
            };
            let openSSLStr: string = CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create(cipSalt));
            console.log("OpenSSL-stringify = " + openSSLStr);
            prompt.showToast({ message: 'OpenSSL-stringify=' + openSSLStr });
        });
        Text.pop();
        Text.create('OpenSSL-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let ciphertext: string = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f]);
            let salt: string = CryptoJS.lib.WordArray.create([0x01234567, 0x89abcdef]);
            let cipSalt: Record<string, string> = {
                'ciphertext': ciphertext,
                'salt': salt
            };
            let openSSLStr: string = CryptoJS.format.OpenSSL.stringify(CryptoJS.lib.CipherParams.create(cipSalt));
            console.log("OpenSSL-parse = " + CryptoJS.format.OpenSSL.parse(openSSLStr)
                .ciphertext
                .toString());
            prompt.showToast({
                message: 'OpenSSL-parse=' + CryptoJS.format.OpenSSL.parse(openSSLStr)
                    .ciphertext
                    .toString()
            });
        });
        Text.pop();
        Text.create('format-hex-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let ciphertext: string = CryptoJS.lib.WordArray.create([0x12345678]);
            let cipSalt: Record<string, string> = {
                'ciphertext': ciphertext
            };
            let hexStr: string = CryptoJS.format.Hex.stringify(CryptoJS.lib.CipherParams.create(cipSalt));
            console.log("format-hex-stringify = " + hexStr);
            prompt.showToast({ message: 'format-hex-stringify=' + hexStr });
        });
        Text.pop();
        Text.create('format-hex-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let hexxStr: string = CryptoJS.format.Hex.parse('0x12345678').toString(CryptoJS.format.Hex);
            console.log("format-hex-parse = " + hexxStr);
            prompt.showToast({ message: 'format-hex-parse=' + hexxStr });
        });
        Text.pop();
        Text.create('enc-base64-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let wordArray: Object[] = CryptoJS.enc.Base64.parse('SGVsbG8sIFdvcmxkIQ==');
            console.log("enc-base64-parse =" + wordArray.toString());
            prompt.showToast({ message: "enc-base64-parse=" + wordArray.toString() });
        });
        Text.pop();
        Text.create('enc-base64-stringify');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let wordArray: Object[] = CryptoJS.enc.Base64.parse('SGVsbG8sIFdvcmxkIQ==');
            let result: string = CryptoJS.enc.Base64.stringify(wordArray);
            console.log("enc-base64-stringify =" + result);
            prompt.showToast({ message: "enc-base64-stringify=" + result });
        });
        Text.pop();
        Text.create('enc-base64url-parse');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let key: string = "u-rXsMB_aegAnzC_CJt27plLGNqOfR2EHI5o2ro1NO";
            let wordArray: Object[] = CryptoJS.enc.Base64url.parse(key);
            console.log("enc-base64url-parse =" + wordArray.toString());
            prompt.showToast({ message: "enc-base64url-parse=" + wordArray.toString() });
        });
        Text.pop();
        Text.create('RC4 encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.RC4.encrypt('hello world!', 'secret key 12345').toString();
            console.log("RC4 encrypt= " + encrypted);
            prompt.showToast({ message: 'RC4 encrypt=' + encrypted });
        });
        Text.pop();
        Text.create('RC4 decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.RC4.encrypt('hello world!', 'secret key 12345');
            let decrypted: string = CryptoJS.RC4.decrypt(encrypted, "secret key 12345");
            console.log("RC4 decrypt= " + decrypted);
            prompt.showToast({ message: 'RC4 decrypt=' + decrypted });
        });
        Text.pop();
        Text.create('RC4Drop encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let drop: Record<string, number> = {
                'drop': 3072 / 4
            };
            let encrypted: string = CryptoJS.RC4Drop.encrypt('hello world!!', 'secret key 123456', drop);
            console.log("RC4Drop encrypt = " + encrypted);
            prompt.showToast({ message: 'RC4Drop encrypt=' + encrypted });
        });
        Text.pop();
        Text.create('RC4Drop decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let drop: Record<string, number> = {
                'drop': 3072 / 4
            };
            let encrypted: string = CryptoJS.RC4Drop.encrypt('hello world!!', 'secret key 123456', drop);
            let decrypted: string = CryptoJS.RC4Drop.decrypt(encrypted, 'secret key 123456', drop);
            console.log("RC4Drop decrypt = " + decrypted);
            prompt.showToast({ message: 'RC4Drop decrypt=' + decrypted });
        });
        Text.pop();
        Text.create('Rabbit encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.Rabbit.encrypt('hello', 'secret key 12345');
            console.log("Rabbit encrypt= " + encrypted);
            prompt.showToast({ message: 'Rabbit encrypt= ' + encrypted });
        });
        Text.pop();
        Text.create('Rabbit decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let decrypted: string = CryptoJS.Rabbit.decrypt(CryptoJS.Rabbit.encrypt('hello', 'secret key 12345'), 'secret key 12345');
            console.log("Rabbit decrypt= " + decrypted);
            prompt.showToast({ message: 'Rabbit decrypt= ' + decrypted });
        });
        Text.pop();
        Text.create('Rabbit-Legacy encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.RabbitLegacy.encrypt('hello', 'secret key 12345').ciphertext.toString();
            console.log("Rabbit-Legacy encrypt= " + encrypted);
            prompt.showToast({ message: 'Rabbit-Legacy encrypt= ' + encrypted });
        });
        Text.pop();
        Text.create('Rabbit-Legacy decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let decrypted: string = CryptoJS.RabbitLegacy.decrypt(CryptoJS.RabbitLegacy.encrypt('hello', 'secret key 12345'), 'secret key 12345');
            console.log("Rabbit-Legacy decrypt= " + decrypted);
            prompt.showToast({ message: 'Rabbit-Legacy decrypt= ' + decrypted });
        });
        Text.pop();
        Text.create('DES encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.DES.encrypt('hello', 'secret key 123').toString();
            console.log("DES encrypt = " + encrypted);
            prompt.showToast({ message: 'DES encrypt=' + encrypted });
        });
        Text.pop();
        Text.create('DES decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let decrypted: string = CryptoJS.DES.decrypt(CryptoJS.DES.encrypt('hello', 'secret key 123')
                .toString(), 'secret key 123');
            console.log("DES decrypt = " + decrypted);
            prompt.showToast({ message: 'DES decrypt=' + decrypted });
        });
        Text.pop();
        Text.create('Triple DES encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.TripleDES.encrypt('hello world', 'secret key 1234').toString();
            console.log("TripleDES encrypt= " + encrypted);
            prompt.showToast({ message: 'TripleDES encrypt=' + encrypted });
        });
        Text.pop();
        Text.create('Triple DES decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let decrypted: string = CryptoJS.TripleDES.decrypt(CryptoJS.TripleDES.encrypt('hello world', 'secret key 1234')
                .toString(), 'secret key 1234');
            console.log("TripleDES decrypt = " + decrypted);
            prompt.showToast({ message: 'TripleDES decrypt=' + decrypted });
        });
        Text.pop();
        Text.create('AES encrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.AES.encrypt('hello world', 'secret key 1234').toString();
            console.log("AES encrypt = " + encrypted);
            prompt.showToast({ message: 'AES encrypt =' + encrypted });
        });
        Text.pop();
        Text.create('AES decrypt');
        Text.fontSize(20);
        Text.margin(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let encrypted: string = CryptoJS.AES.encrypt('hello world', 'secret key 1234').toString();
            let decrypted: string = CryptoJS.AES.decrypt(encrypted, 'secret key 1234');
            console.log("AES decrypt = " + decrypted);
            prompt.showToast({ message: 'AES decrypt =' + decrypted });
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
