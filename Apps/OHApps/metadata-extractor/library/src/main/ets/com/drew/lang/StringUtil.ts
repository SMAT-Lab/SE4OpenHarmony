/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class StringUtil {
  public static join(strings: Iterable<string>, delimiter: string): string
  {
    let result: string = ''
    for (let s of strings) {
      result += s + delimiter;
    }
    return result;
  }

  public static compare(s1: string, s2: string) {
    let null1 = s1 == null;
    let null2 = s2 == null;

    if (null1 && null2) {
      return 0;
    } else if (null1) {
      return -1;
    } else if (null2) {
      return 1;
    }

    let n1 = s1.length;
    let n2 = s2.length;
    let min = Math.min(n1, n2);
    for (let i = 0; i < min; i++) {
      let c1 = s1.charAt(i);
      let c2 = s2.charAt(i);
      if (c1 != c2) {
        //        c1 = c1.toUpperCase();
        //        c2 = c2.toUpperCase();
        if (c1 != c2) {
          return c1.charCodeAt(0) - c2.charCodeAt(0);
        }
      }
    }
    return n1 - n2;
  }

  public static urlEncode(name: string) {
    // Sufficient for now, it seems
    let regExp = / /g;
    return name.replace(regExp, "%20");
  }

  /**
   * unicode string to utf-8
   * @param text 字符串
   * @returns {*} utf-8编码
   */
  public static toBytes(text: string) {
    let result = [], i = 0;
    text = encodeURI(text);
    while (i < text.length) {
      var c = text.charCodeAt(i++);

      let temp: number = 0
      // if it is a % sign, encode the following 2 bytes as a hex value
      if (c === 37) {
        if (parseInt(text.substr(i, 2), 16) > 127) {
          temp = -(256 - parseInt(text.substr(i, 2), 16))
        } else {
          temp = parseInt(text.substr(i, 2), 16)
        }
        result.push(temp)
        i += 2;

        // otherwise, just the actual byte
      } else {
        if (c > 127) {
          temp = -(256 - c)
        } else {
          temp = c
        }
        result.push(temp)
      }
    }

    return result;
    //        return StringUtil.coerceArray(result);
  }


  /**
   * utf8 byte to unicode string
   * @param utf8Bytes
   * @returns {string}
   */
  public static utf8ByteToUnicodeStr(utf8Bytes: Int8Array): string{
    var unicodeStr = "";
    for (var pos = 0; pos < utf8Bytes.length; ) {
      var flag = utf8Bytes[pos];
      var unicode = 0;
      if ((flag >>> 7) === 0) {
        unicodeStr += String.fromCharCode(utf8Bytes[pos]);
        pos += 1;

      } else if ((flag & 0xFC) === 0xFC) {
        unicode = (utf8Bytes[pos] & 0x3) << 30;
        unicode |= (utf8Bytes[pos+1] & 0x3F) << 24;
        unicode |= (utf8Bytes[pos+2] & 0x3F) << 18;
        unicode |= (utf8Bytes[pos+3] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos+4] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos+5] & 0x3F);
        unicodeStr += String.fromCodePoint(unicode);
        pos += 6;

      } else if ((flag & 0xF8) === 0xF8) {
        unicode = (utf8Bytes[pos] & 0x7) << 24;
        unicode |= (utf8Bytes[pos+1] & 0x3F) << 18;
        unicode |= (utf8Bytes[pos+2] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos+3] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos+4] & 0x3F);
        unicodeStr += String.fromCodePoint(unicode);
        pos += 5;

      } else if ((flag & 0xF0) === 0xF0) {
        unicode = (utf8Bytes[pos] & 0xF) << 18;
        unicode |= (utf8Bytes[pos+1] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos+2] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos+3] & 0x3F);
        unicodeStr += String.fromCodePoint(unicode);
        pos += 4;

      } else if ((flag & 0xE0) === 0xE0) {
        unicode = (utf8Bytes[pos] & 0x1F) << 12;
        ;
        unicode |= (utf8Bytes[pos+1] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos+2] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 3;

      } else if ((flag & 0xC0) === 0xC0) { //110
        unicode = (utf8Bytes[pos] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos+1] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 2;

      } else {
        unicodeStr += String.fromCharCode(utf8Bytes[pos]);
        pos += 1;
      }
    }
    return unicodeStr;
  }

  public static checkInt(value) {
    return (parseInt(value) === value);
  }

  public static checkInts(arrayish) {
    if (!StringUtil.checkInt(arrayish.length)) {
      return false;
    }

    for (var i = 0; i < arrayish.length; i++) {
      if (!StringUtil.checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
        return false;
      }
    }

    return true;
  }

  public static coerceArray(arg, copy) {

    // ArrayBuffer view
    if (arg.buffer && arg.name === 'Uint8Array') {

      if (copy) {
        if (arg.slice) {
          arg = arg.slice();
        } else {
          arg = Array.prototype.slice.call(arg);
        }
      }

      return arg;
    }

    // It's an array; check it is a valid representation of a byte
    if (Array.isArray(arg)) {
      if (!StringUtil.checkInts(arg)) {
        throw new Error('Array contains invalid value: ' + arg);
      }

      return new Uint8Array(arg);
    }

    // Something else, but behaves like an array (maybe a Buffer? Arguments?)
    if (StringUtil.checkInt(arg.length) && StringUtil.checkInts(arg)) {
      return new Uint8Array(arg);
    }

    throw new Error('unsupported array-like object');
  }

  public static numberToByte(b: number): number{
    return Int8Array.from([(b | (0x01 << 8))])[0];
  }
  public static stringToBytes(str: string): number[] {
    let bytes: number[] = new Array();
    let len, c;
    len = str.length;
    for (let i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }

  public static mergeArrayBuffer(...arrays): ArrayBuffer {
    let totalLen = 0
    for (let i = 0; i < arrays.length; i++) {
      arrays[i] = new Int8Array(arrays[i])
      totalLen += arrays[i].length
    }
    let res = new Int8Array(totalLen)
    let offset = 0
    for (let arr of arrays) {
      res.set(arr, offset)
      offset += arr.length
    }
    return res.buffer
  }


  public static byteBufferToString(bytes: number[], offset: number, length: number): string{
    try {
      if (length < 1) return "";
      let str = ""
      for (let i = 0;i < length; i++) {
        str += String.fromCharCode(bytes[offset+i]);
      }
      return str;
    } catch (error) {
      console.error("mp3agic BufferTools byteBufferToString:" + error)
      return null;
    }
  }
}

export default StringUtil