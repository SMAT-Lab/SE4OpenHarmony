/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import cryptoFramework from '@ohos.security.cryptoFramework';
import promptAction from '@ohos.promptAction';
import Logger from '../util/Logger';

const TAG: string = '[Crypto_Framework]';
const BASE_16: number = 16;
const SLICE_NUMBER: number = -2;

// 字节流以16进制字符串输出
function uint8ArrayToShowStr(uint8Array: Uint8Array): string {
  let ret: string = Array.prototype.map
    .call(uint8Array, (x) => ('00' + x.toString(BASE_16)).slice(SLICE_NUMBER)).join('');
  return ret;
}

// 16进制字符串转字节流
function fromHexString(hexString: string): Uint8Array {
  let ret: Uint8Array = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, BASE_16)));
  return ret;
}


// 字节流转字符串
function arrayBufferToString(buffer: ArrayBuffer): string {
  let ret: string = String.fromCharCode.apply(null, new Uint8Array(buffer));
  return ret;
}

// 可理解的字符串转成字节流
function stringToUint8Array(str: string): Uint8Array {
  let arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  let ret: Uint8Array = new Uint8Array(arr);
  return ret;
}

function genGcmParamsSpec(): cryptoFramework.GcmParamsSpec {
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 bytes
  let dataIv = new Uint8Array(arr);
  let ivBlob = { data: dataIv };

  arr = [0, 0, 0, 0, 0, 0, 0, 0]; // 8 bytes
  let dataAad = new Uint8Array(arr);
  let aadBlob = { data: dataAad };

  arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16 bytes
  let dataTag = new Uint8Array(arr);
  let tagBlob = { data: dataTag }; // GCM的authTag在加密时从doFinal结果中获取，在解密时填入init函数的params参数中

  let gcmParamsSpec = { iv: ivBlob, aad: aadBlob, authTag: tagBlob, algName: 'GcmParamsSpec' };
  return gcmParamsSpec;
}

export class CryptoOperation {
  async generateAesKey(): Promise<string> {
    let symKeyGenerator;
    let encodedKey;
    // 创建对称密钥生成器
    try {
      symKeyGenerator = cryptoFramework.createSymKeyGenerator('AES256');
    } catch (error) {
      Logger.error(TAG, 'create generator failed');
      return null;
    }

    // 通过密钥生成器随机生成对称密钥
    try {
      let symKey = await symKeyGenerator.generateSymKey();
      // 获取对称密钥的二进制数据，输出长度为256bit的字节流
      encodedKey = symKey.getEncoded();
      let data: Uint8Array = encodedKey.data;
      Logger.info('success, key bytes: ' + data);
      Logger.info('success, key hex:' + uint8ArrayToShowStr(data));
      // 将二进制数据转为16进制string。
      return uint8ArrayToShowStr(data);
    } catch (error) {
      Logger.error(TAG, 'create symKey failed');
      return null;
    }
  }

  async convertAesKey(aesKeyBlobString: string): Promise<cryptoFramework.SymKey> {
    let symKeyGenerator = cryptoFramework.createSymKeyGenerator('AES256');
    Logger.info(TAG, 'success, read key string' + aesKeyBlobString);
    Logger.info(TAG, 'success, blob key ' + fromHexString(aesKeyBlobString));
    let symKeyBlob = { data: fromHexString(aesKeyBlobString) };
    try {
      let key = await symKeyGenerator.convertKey(symKeyBlob);
      let aesKey: cryptoFramework.SymKey = key;
      return aesKey;
    } catch (error) {
      Logger.error(TAG, `convert aes key failed, ${error.code}, ${error.message}`);
      return null;
    }
  }

  async aesGcmEncrypt(globalKey, textString: string): Promise<string> {
    let cipherAlgName = 'AES256|GCM|PKCS7';
    let cipher;
    let cipherText: string;
    let globalGcmParams = genGcmParamsSpec();
    let aesEncryptJsonStr = null;
    try {
      cipher = cryptoFramework.createCipher(cipherAlgName);
      Logger.info(TAG, `cipher algName: ${cipher.algName}`);
    } catch (error) {
      Logger.error(TAG, `createCipher failed, ${error.code}, ${error.message}`);
      return aesEncryptJsonStr;
    }
    let mode = cryptoFramework.CryptoMode.ENCRYPT_MODE;
    try {
      await cipher.init(mode, globalKey, globalGcmParams);
    } catch (error) {
      Logger.error(TAG, `init cipher failed, ${error.code}, ${error.message}`);
      return aesEncryptJsonStr;
    }
    let plainText = { data: stringToUint8Array(textString) };
    Logger.info(TAG, `plain text: ${plainText.data}`);
    try {
      let cipherTextBlob = await cipher.update(plainText);
      let tmpArr: Uint8Array = cipherTextBlob.data;
      cipherText = uint8ArrayToShowStr(tmpArr);
      Logger.info(TAG, `cipher text: ${cipherText}`);
    } catch (error) {
      Logger.error(TAG, `update cipher failed, ${error.code}, ${error.message}`);
      return aesEncryptJsonStr;
    }
    try {
      let authTag = await cipher.doFinal(null);
      let tmoTagArr: Uint8Array = authTag.data;
      let aesEncryptJson = ({ aesGcmTag: uint8ArrayToShowStr(tmoTagArr), encryptedText: cipherText });
      aesEncryptJsonStr = JSON.stringify(aesEncryptJson);
      Logger.info(TAG, `success, authTag blob ${authTag.data}`);
      Logger.info(TAG, `success, authTag blob.length = ${authTag.data.length}`);
      return aesEncryptJsonStr;
    } catch (error) {
      Logger.error(TAG, `doFinal cipher failed, ${error.code}, ${error.message}`);
      return aesEncryptJsonStr;
    }
  }

  async aesGcmDecrypt(globalKey, aesEncryptJsonStr: string): Promise<string> {
    let cipherAlgName = 'AES256|GCM|PKCS7';
    let decode;
    let plainTextBlob;
    let plainText: string;
    let aesEncryptJson;
    try {
      aesEncryptJson = JSON.parse(aesEncryptJsonStr);
    } catch (error) {
      Logger.error(TAG, `trans from json string failed, ${error.code}, ${error.message}`);
      return null;
    }
    let authTagStr: string = aesEncryptJson.aesGcmTag;
    let textString: string = aesEncryptJson.encryptedText;
    let globalGcmParams = genGcmParamsSpec();
    globalGcmParams.authTag = { data: fromHexString(authTagStr) };
    Logger.info(TAG, 'success, decrypt authTag string' + authTagStr);
    Logger.info(TAG, 'success, decrypt authTag blob' + globalGcmParams.authTag.data);
    Logger.info(TAG, 'success, decrypt authTag blob.length = ' + globalGcmParams.authTag.data.length);
    try {
      decode = cryptoFramework.createCipher(cipherAlgName);
    } catch (error) {
      Logger.error(TAG, `createCipher failed, ${error.code}, ${error.message}`);
      return null;
    }
    let mode = cryptoFramework.CryptoMode.DECRYPT_MODE;
    try {
      await decode.init(mode, globalKey, globalGcmParams);
    } catch (error) {
      Logger.error(TAG, `init decode failed, ${error.code}, ${error.message}`);
      return null;
    }
    let cipherText = { data: fromHexString(textString) };
    Logger.info(TAG, `success, cipher text: ${cipherText.data}`);
    try {
      plainTextBlob = await decode.update(cipherText);
      let tmpArr: Uint8Array = plainTextBlob.data;
      plainText = arrayBufferToString(tmpArr);
      Logger.info(TAG, `success, plain text: ${plainText}`);
    } catch (error) {
      Logger.error(TAG, `update decode failed, ${error.code}, ${error.message}`);
      return null;
    }
    try {
      let finalOut = await decode.doFinal(null);
    } catch (error) {
      Logger.error(TAG, `doFinal decode failed, ${error.code}, ${error.message}`);
      return null;
    }
    return plainText;
  }

  async aesConvertAndEncrypt(aesKeyBlobString: string, textString: string): Promise<string> {
    let aesEncryptJsonStr = '';
    try {
      let key = await this.convertAesKey(aesKeyBlobString);
      try {
        aesEncryptJsonStr = await this.aesGcmEncrypt(key, textString);
      } catch (error) {
        Logger.error(TAG, `encrypt error, ${error.code}, ${error.message}`);
      }
    } catch (error) {
      Logger.error(TAG, `convert key error, ${error.code}, ${error.message}`);
      return null;
    }
    return aesEncryptJsonStr;
  }

  async aesConvertAndDecrypt(aesKeyBlobString: string, textString: string): Promise<string> {
    let plainText = '';
    try {
      let key = await this.convertAesKey(aesKeyBlobString);
      try {
        plainText = await this.aesGcmDecrypt(key, textString);
      } catch (error) {
        Logger.error(TAG, `encrypt error, ${error.code}, ${error.message}`);
      }
    } catch (error) {
      Logger.error(TAG, `convert key error, ${error.code}, ${error.message}`);
      return null;
    }
    return plainText;
  }

  async generateRsaKey(): Promise<string> {
    // 创建非对称密钥生成器
    let rsaKeyGenerator;
    let jsonStr;
    // 创建对称密钥生成器
    try {
      rsaKeyGenerator = cryptoFramework.createAsyKeyGenerator('RSA3072');
    } catch (error) {
      Logger.error(TAG, 'create generator failed');
      return null;
    }
    // 通过密钥生成器随机生成非对称密钥
    try {
      // 通过密钥生成器随机生成非对称密钥
      let keyPair = await rsaKeyGenerator.generateKeyPair();
      // 获取非对称密钥的二进制数据
      let encodedPriKey = keyPair.priKey.getEncoded();
      let priKeyData: Uint8Array = encodedPriKey.data;
      let encodedPubKey = keyPair.pubKey.getEncoded();
      let pubKeyData: Uint8Array = encodedPubKey.data;
      let rsaKeyJson = ({ priKey: uint8ArrayToShowStr(priKeyData), pubKey: uint8ArrayToShowStr(pubKeyData) });
      jsonStr = JSON.stringify(rsaKeyJson);
      Logger.info(TAG, 'success, key string: ' + jsonStr.length);
      return jsonStr;
    } catch (error) {
      Logger.error(TAG, 'create symKey failed');
      return null;
    }
  }

  async convertRsaKey(rsaJsonString: string): Promise<cryptoFramework.KeyPair> {
    let rsaKeyGenerator = cryptoFramework.createAsyKeyGenerator('RSA3072');
    Logger.info(TAG, 'success, read key string' + rsaJsonString.length);
    let jsonRsaKeyBlob;
    try {
      jsonRsaKeyBlob = JSON.parse(rsaJsonString);
    } catch (error) {
      Logger.error(TAG, `trans from json string failed, ${error.code}, ${error.message}`);
      return null;
    }
    let priKeyStr: string = jsonRsaKeyBlob.priKey;
    let pubKeyStr: string = jsonRsaKeyBlob.pubKey;
    Logger.info(TAG, 'success, read rsa pri str ' + priKeyStr.length);
    Logger.info(TAG, 'success, read rsa pub str ' + pubKeyStr.length);
    let priKeyBlob = fromHexString(priKeyStr);
    let pubKeyBlob = fromHexString(pubKeyStr);
    Logger.info(TAG, 'success, read rsa pri blob key ' + priKeyBlob.length);
    Logger.info(TAG, 'success, read rsa pub blob key ' + pubKeyBlob.length);
    try {
      let key: cryptoFramework.KeyPair = await rsaKeyGenerator.convertKey({ data: pubKeyBlob }, { data: priKeyBlob });
      return key;
      Logger.info(TAG, 'success, read and convert key');
    } catch (error) {
      Logger.error(TAG, `convert rsa key failed, ${error.code}, ${error.message}`);
      return null;
    }
  }

  async rsaSign(globalKey, textString: string): Promise<string> {
    let signer = cryptoFramework.createSign('RSA3072|PKCS1|SHA256');
    let keyPair = globalKey;
    try {
      await signer.init(keyPair.priKey);
      let signBlob = stringToUint8Array(textString);
      try {
        let signedBlob = await signer.sign({ data: signBlob });
        let tmpArr: Uint8Array = signedBlob.data;
        Logger.info(TAG, 'success,RSA sign output is' + signedBlob.data.length);
        let rsaSignedBlobString = uint8ArrayToShowStr(tmpArr);
        Logger.info(TAG, 'success,RSA sign string is' + rsaSignedBlobString);
        return rsaSignedBlobString;
      } catch (error1) {
        Logger.error(TAG, `sign text failed, ${error1.code}, ${error1.message}`);
        return null;
      }
    } catch (error) {
      Logger.error(TAG, `sign init failed, ${error.code}, ${error.message}`);
      return null;
    }
  }

  async rsaVerify(globalKey, textString: string, rsaSignedText: string): Promise<Boolean> {
    let verifyer = cryptoFramework.createVerify('RSA3072|PKCS1|SHA256');
    let keyPair = globalKey;
    let signBlob = stringToUint8Array(textString);
    let signedBlob = fromHexString(rsaSignedText);
    Logger.info('success,RSA sign input is ' + signBlob);
    Logger.info('success,RSA signed file length ' + signedBlob.length);
    try {
      await verifyer.init(keyPair.pubKey);
      try {
        let result: Boolean = await verifyer.verify({ data: signBlob }, { data: signedBlob });
        if (result === false) {
          // flag = false;
          Logger.error(TAG, 'RSA Verify result = fail');
        } else {
          Logger.info(TAG, 'success, RSA Verify result = success');
        }
        return result;
      } catch (error) {
        Logger.error(TAG, `verify dofinal failed, ${error.code}, ${error.message}`);
      }
    } catch (err) {
      Logger.error(TAG, `verify init failed, ${err.code}, ${err.message}`);
    }
    return null;
  }

  async rsaConvertAndSign(rsaJsonString: string, textString: string): Promise<string> {
    let rsaSignString;
    try {
      let key = await this.convertRsaKey(rsaJsonString);
      try {
        rsaSignString = await this.rsaSign(key, textString);
      } catch (error) {
        Logger.error(TAG, `sign error, ${error.code}, ${error.message}`);
        return null;
      }
    } catch (error) {
      Logger.error(TAG, `convert rsa key error, ${error.code}, ${error.message}`);
      return null;
    }
    return rsaSignString;
  }

  async rsaConvertAndVerify(rsaJsonString: string, textString: string, rsaSignedText: string): Promise<Boolean> {
    let rsaVerifyRes;
    try {
      let key = await this.convertRsaKey(rsaJsonString);
      try {
        rsaVerifyRes = await this.rsaVerify(key, textString, rsaSignedText);
      } catch (error) {
        Logger.error(TAG, `sign error, ${error.code}, ${error.message}`);
        return null;
      }
    } catch (error) {
      Logger.error(TAG, `convert rsa key error, ${error.code}, ${error.message}`);
      return null;
    }
    return rsaVerifyRes;
  }
}

