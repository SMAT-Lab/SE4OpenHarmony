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

import MimeUtils from './MimeUtils';
import Preconditions from './Preconditions';
import util from '@ohos.util';
import buffer from '@ohos.buffer';
import Closeable from './interfaces/Closeable';
import CryptoJS from "@ohos/crypto-js"
export default class ProxyCacheUtils {
  static DEFAULT_BUFFER_SIZE: number = 8 * 1024;
  static MAX_ARRAY_PREVIEW: number = 16;

  public static computeMD5(string: string): string {
    try {
      return CryptoJS.MD5(string);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static getSupposablyMime(url: string): string {
    let extension = ProxyCacheUtils.getFileExtensionFromUrl(url);
    // TODO MimeUtils.getMimeTypeFromExtension(extension)属于自行实现的方法 需要审视是否存在问题
    return!extension || extension.length < 1 ? '' : MimeUtils.getMimeTypeFromExtension(extension);
  }

  static assertBuffer(buffer: ArrayBuffer, offset: number, length: number): void {
    Preconditions.checkNotNull(buffer, "Buffer must be not null!");
    Preconditions.checkArgument(offset >= 0, "Data offset must be positive!");
    Preconditions.checkArgument(length >= 0 && length <= buffer.byteLength, "Length must be in range [0..buffer.length]");
  }

  public static getFileExtensionFromUrl(url: string): string {
    if (url && url.length >= 1) {
      let fragment = url.lastIndexOf('#');
      if (fragment > 0) {
        url = url.substring(0, fragment);
      }
      let query = url.lastIndexOf('?')
      if (query > 0) {
        url = url.substring(0, query);
      }
      let fileNamePos = url.lastIndexOf('/')
      let fileName = 0 <= fileNamePos ? url.substring(fileNamePos + 1) : url;
      if (fileName && fileName.length >= 1) {
        let regExp = new RegExp("[a-zA-Z_0-9\\.\\-\\(\\)\\%]+")
        let isMatch = regExp.test(fileName)
        if (isMatch) {
          let dotPos = fileName.lastIndexOf('.')
          if (0 <= dotPos) {
            return fileName.substring(dotPos + 1)
          }
        }
      }
    }
    return ''
  }

  static encode(url: string): string {
    try {
      let encoder = new util.TextEncoder("utf-8")
      return buffer.from(encoder.encodeInto(url).buffer).toString("utf-8");
    } catch (err) {
      throw new Error("Error encoding url,reason is " + err.message);
    }
  }

  static decode(url: string): string {
    try {
      let decoder = util.TextDecoder.create("utf-8", {
        ignoreBOM: true
      })
      return decoder.decodeWithStream(new Uint8Array(buffer.from(url).buffer), {
        stream: false
      });
    } catch (err) {
      throw new Error("Error decoding url,reason is " + err.message);
    }
  }

  public static close(closeable: Closeable): void {
    if (closeable != null) {
      try {
        closeable.close();
      } catch (err) {
        console.error("Error closing resource" + err.message);
      }
    }
  }
}