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

import util from '@ohos.util';
import huks from '@ohos.security.huks';
import userAuth from '@ohos.userIAM.userAuth';
import promptAction from '@ohos.promptAction';
import Logger from './Logger';

const TAG: string = '[HUKS]';
const CHALLENG_LEN = 6;
const IV: string = '001122334455';
let cipherData: Uint8Array;
let challengeNew = new Uint8Array(CHALLENG_LEN);

// 密钥明文
let PLAIN_TEXT_SIZE_16 = new Uint8Array([
  0xfb, 0x8b, 0x9f, 0x12, 0xa0, 0x83, 0x19, 0xbe,
  0x64, 0x0b, 0x88, 0x96, 0xe2, 0xfa, 0x77, 0xbc
]);

class HuksProperties {
  tag: huks.HuksTag = huks.HuksTag.HUKS_TAG_ALGORITHM
  value: huks.HuksKeyAlg | huks.HuksKeySize | huks.HuksKeyPurpose | huks.HuksKeyDigest |
  huks.HuksKeyPadding | huks.HuksCipherMode | Uint8Array = huks.HuksKeyAlg.HUKS_ALG_ECC
}

function stringToUint8Array(str: string): Uint8Array {
  let arr: number[] = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  return new Uint8Array(arr);
}

// 生成Sm4密钥属性信息
function getSm4GenerateProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_SM4
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_SM4_KEY_SIZE_128
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
    huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
  };
  return;
}

// Sm4加密密钥属性信息
function getSm4EncryptProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_SM4
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_SM4_KEY_SIZE_128,
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
    value: huks.HuksCipherMode.HUKS_MODE_CBC
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PADDING,
    value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_IV,
    value: stringToUint8Array(IV)
  };
  return;
}

// Sm4解密密钥属性信息
function getSm4DecryptProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_SM4
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_SM4_KEY_SIZE_128,
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
    value: huks.HuksCipherMode.HUKS_MODE_CBC
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PADDING,
    value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_IV,
    value: stringToUint8Array(IV)
  };
  return;
}

function uint8ArrayToString(fileData: Uint8Array): string {
  let dataString = '';
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
}

// AES加密密钥属性信息
function getAesEncryptProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_AES
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PADDING,
    value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
    value: huks.HuksCipherMode.HUKS_MODE_CBC
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_IV,
    value: stringToUint8Array(IV)
  };
  return;
}

// AES解密密钥属性信息
function getAesDecryptProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_AES
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PADDING,
    value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
    value: huks.HuksCipherMode.HUKS_MODE_CBC
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_IV,
    value: stringToUint8Array(IV)
  };
  return;
}

// 生成AES密钥属性信息
function getAesGenerateProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_AES
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
    huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
  };
  return;
}

// 导入SM4密钥属性信息
function getImportKeyProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_SM4
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_SM4_KEY_SIZE_128
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
    huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
  };
  return;
}

// SM4 加密密钥属性
function getSm4EnryptProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_SM4
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_SM4_KEY_SIZE_128,
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
    value: huks.HuksCipherMode.HUKS_MODE_CBC
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PADDING,
    value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_IV,
    value: stringToUint8Array(IV)
  };
  return;
}

// SM4 解密密钥属性
function getSm4DeryptProperties(properties: HuksProperties[]): void {
  let index = 0;
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
    value: huks.HuksKeyAlg.HUKS_ALG_SM4
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
    value: huks.HuksKeySize.HUKS_SM4_KEY_SIZE_128,
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PURPOSE,
    value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
    value: huks.HuksCipherMode.HUKS_MODE_CBC
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_PADDING,
    value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7
  };
  properties[index++] = {
    tag: huks.HuksTag.HUKS_TAG_IV,
    value: stringToUint8Array(IV)
  };
  return;
}

/**
 * 功能模型
 */
export class HuksModel {
  // 模拟使用HUKS生成的新密钥进行加密
  async encryptData(plainText: string, resultCallback: Function): Promise<void> {
    let aesKeyAlias = 'test_aesKeyAlias';
    let handle: number = 0;
    let generateKeyProperties: HuksProperties[] = new Array();
    getAesGenerateProperties(generateKeyProperties);
    let generateKeyOptions: huks.HuksOptions = {
      properties: generateKeyProperties
    };
    await huks.generateKeyItem(aesKeyAlias, generateKeyOptions).then((data) => {
      Logger.info(TAG, `generate key success, data: ${JSON.stringify(data)}`);
    }).catch((err: Error)=>{
      Logger.error(TAG, `generate key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });

    let encryptProperties: HuksProperties[] = new Array();
    getAesEncryptProperties(encryptProperties);
    let encryptOptions: huks.HuksOptions = {
      properties:encryptProperties,
      inData: stringToUint8Array(plainText)
    };
    await huks.initSession(aesKeyAlias, encryptOptions).then((data) => {
      Logger.info(TAG, `encrypt initSession success, data: ${JSON.stringify(data)}`);
      handle = data.handle;
    }).catch((err: Error)=>{
      Logger.error(TAG, `encrypt initSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    await huks.finishSession(handle, encryptOptions).then((data) => {
      Logger.info(TAG, `encrypt finishSession success, data: ${JSON.stringify(data)}`);
      cipherData = data.outData as Uint8Array;
      let that = new util.Base64Helper();
      resultCallback(that.encodeToStringSync(cipherData));
    }).catch((err: Error)=>{
      Logger.error(TAG, `encrypt finishSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `send message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 6500,
      });
    });
  }

  // 模拟使用HUKS生成的新密钥进行解密
  async decryptData(resultCallback: Function): Promise<void> {
    let decryptOptions: HuksProperties[] = new Array();
    getAesDecryptProperties(decryptOptions);
    let aesKeyAlias = 'test_aesKeyAlias';
    let handle: number = 0;
    let options: huks.HuksOptions = {
      properties: decryptOptions,
      inData: cipherData
    };
    let emptyOptions: huks.HuksOptions = {
      properties: []
    };

    await huks.initSession(aesKeyAlias, options).then((data) => {
      Logger.info(TAG, `decrypt initSession success, data: ${JSON.stringify(data)}`);
      handle = data.handle;
    }).catch((err: Error) => {
      Logger.error(TAG, `decrypt initSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    await huks.finishSession(handle, options).then((data) => {
      Logger.info(TAG, `decrypt finishSession success, data: ${JSON.stringify(data)}`);
      resultCallback(uint8ArrayToString(data.outData as Uint8Array));
    }).catch((err: Error) => {
      Logger.error(TAG, `decrypt finishSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `receive message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 6500,
      });
    });
    await huks.deleteKeyItem(aesKeyAlias, emptyOptions).then((data) => {
      Logger.info(TAG, `delete key success, data: ${JSON.stringify(data)}`);
    }).catch((err: Error)=>{
      Logger.error(TAG, `delete key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
  }

  // 模拟使用Sm4 生成密钥并进行加密
  async encryptDataUseSm4(plainText: string, resultCallback: Function): Promise<void> {
    let sm4KeyAlias = 'test_sm4KeyAlias';
    let handle: number = 0;
    let generateKeyProperties: HuksProperties[] = new Array();
    getSm4GenerateProperties(generateKeyProperties);
    let generateKeyOptions: huks.HuksOptions = {
      properties: generateKeyProperties
    };
    await huks.generateKeyItem(sm4KeyAlias, generateKeyOptions).then((data) => {
      Logger.info(TAG, `generate key success, data: ${JSON.stringify(data)}`);
    }).catch((err: Error)=>{
      Logger.error(TAG, `generate key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    let encryptProperties: HuksProperties[] = new Array();
    getSm4EncryptProperties(encryptProperties);
    let encryptOptions: huks.HuksOptions= {
      properties:encryptProperties,
      inData: stringToUint8Array(plainText)
    };
    await huks.initSession(sm4KeyAlias, encryptOptions).then((data) => {
      Logger.info(TAG, `encrypt initSession success, data: ${JSON.stringify(data)}`);
      handle = data.handle;
    }).catch((err: Error)=>{
      Logger.error(TAG, `encrypt initSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    await huks.finishSession(handle, encryptOptions).then((data) => {
      Logger.info(TAG, `encrypt finishSession success, data: ${JSON.stringify(data)}`);
      cipherData = data.outData as Uint8Array;
      let that = new util.Base64Helper();
      resultCallback(that.encodeToStringSync(cipherData));
    }).catch((err: Error)=>{
      Logger.error(TAG, `encrypt finishSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `send message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 6500,
      });
    });
  }

  async finishSession(handle: number, options: huks.HuksOptions , resultCallback: Function, authToken: Uint8Array): Promise<void> {
    await huks.finishSession(handle, options, authToken).then((data) => {
      Logger.info(TAG, `decrypt finishSession success, data: ${JSON.stringify(data)}`);
      resultCallback(uint8ArrayToString(data.outData as Uint8Array));
    }).catch((err: Error) => {
      Logger.error(TAG, `decrypt finishSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `receive message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 6500,
      });
    });
  }

  async userIAMAuthFinger(finishSessionFunction: Function, handle: number, options: huks.HuksOptions , resultCallback: Function) : Promise<void> {
    Logger.info(TAG, '[HUKS->userIAM]start userAuth...');
    const authParam : userAuth.AuthParam = {
      challenge: challengeNew,
      authType: [userAuth.UserAuthType.PIN],
      authTrustLevel: userAuth.AuthTrustLevel.ATL1
    };
    const widgetParam :userAuth.WidgetParam = {
      title: 'PIN'
    };
    try {
      let userAuthInstance = userAuth.getUserAuthInstance(authParam, widgetParam);
      Logger.info(TAG, 'get userAuth instance success');
      userAuthInstance.on('result', {
        onResult(result) {
          Logger.info(TAG, 'userAuthInstance callback result = ' + JSON.stringify(result));
          finishSessionFunction(handle, options, resultCallback, result.token);
        }
      });
      Logger.info(TAG, 'auth on success');
      userAuthInstance.start();
      Logger.info(TAG, 'auth on success');
    } catch (error) {
      Logger.error(TAG, 'auth catch error: ' + JSON.stringify(error));
    }
  }

  // 模拟使用HUKS生成的新密钥进行低安访问控制与解密
  async decryptDataUseSm4(resultCallback: Function): Promise<void> {
    let decryptOptions: HuksProperties[] = new Array();
    getSm4DecryptProperties(decryptOptions);
    let sm4KeyAlias = 'test_sm4KeyAlias';
    let handle: number = 0;
    let options: huks.HuksOptions = {
      properties: decryptOptions,
      inData: cipherData
    };
    await huks.initSession(sm4KeyAlias, options).then((data) => {
      Logger.info(TAG, `decrypt initSession success, data: ${JSON.stringify(data)}`);
      handle = data.handle;
      // challengeNew = data.challenge;
    }).catch((err: Error) => {
      Logger.error(TAG, `decrypt initSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    let finishSessionFunction = this.finishSession;
    await this.userIAMAuthFinger(finishSessionFunction, handle, options, resultCallback);
  }


  // 模拟设备1使用旧密钥在本地进行加密
  async encryptDataUserOldKey(plainText: string, resultCallback: Function): Promise<void> {
    let device1KeyAlias = 'device_1_key_alias';
    let importKeyProperties: HuksProperties[] = new Array();
    getImportKeyProperties(importKeyProperties);
    let importKeyOptions: huks.HuksOptions = {
      properties: importKeyProperties,
      inData: PLAIN_TEXT_SIZE_16
    };
    Logger.info(TAG, `key plain text: ${JSON.stringify(PLAIN_TEXT_SIZE_16)}`);
    await huks.importKeyItem(device1KeyAlias, importKeyOptions).then((data) => {
      Logger.info(TAG, `import key success, data: ${JSON.stringify(data)}`);
    }).catch((err: Error)=>{
      Logger.error(TAG, `import key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });

    // 加密
    let sm4EncryptProperties: HuksProperties[] = new Array();
    getSm4EnryptProperties(sm4EncryptProperties);
    let sm4EncryptOptions: huks.HuksOptions = {
      properties:sm4EncryptProperties,
      inData: stringToUint8Array(plainText)
    };
    let handle: number = 0;
    await huks.initSession(device1KeyAlias, sm4EncryptOptions).then((data) => {
      Logger.info(TAG, `encrypt initSession success, data: ${JSON.stringify(data)}`);
      handle = data.handle;
    }).catch((err: Error)=>{
      Logger.error(TAG, `encrypt initSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    await huks.finishSession(handle, sm4EncryptOptions).then((data) => {
      Logger.info(TAG, `encrypt finishSession success, data: ${JSON.stringify(data)}`);
      cipherData = data.outData as Uint8Array;
      let that = new util.Base64Helper();
      resultCallback(that.encodeToStringSync(cipherData));
    }).catch((err: Error)=>{
      Logger.error(TAG, `send message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `send message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 6500,
      });
    });

    // 加密完成删除本地密钥
    let emptyOptions: huks.HuksOptions = {
      properties: []
    };
    await huks.deleteKeyItem(device1KeyAlias, emptyOptions).then((data) => {
      Logger.info(TAG, `delete key success, data: ${JSON.stringify(data)}`);
    }).catch((err: Error)=>{
      Logger.error(TAG, `delete key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
  }

  // 模拟设备2导入设备1中的旧密钥
  async importKey(): Promise<void> {
    let keyAlias = 'import_device_1_key_alias';
    let importOptions: HuksProperties[] = new Array();
    getImportKeyProperties(importOptions);
    let huksoptions: huks.HuksOptions = {
      properties: importOptions,
      inData: PLAIN_TEXT_SIZE_16
    };
    Logger.info(TAG, `key plain text: ${JSON.stringify(PLAIN_TEXT_SIZE_16)}`);
    await huks.importKeyItem(keyAlias, huksoptions).then((data) => {
      Logger.info(TAG, `import key success, data: ${JSON.stringify(data)}`);
      promptAction.showToast({
        message: 'import old key success',
        duration: 1000,
      });
    }).catch((err: Error)=>{
      Logger.error(TAG, `import old key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `import old key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 1000,
      });
    });
  }

  // 模拟设备2使用导入的设备1中的旧密钥进行解密
  async decryptDataUserOldKey(resultCallback: Function): Promise<void> {
    let handle: number = 0;
    let keyAlias = 'import_device_1_key_alias';
    let decryptProperties: HuksProperties[] = new Array();
    getSm4DeryptProperties(decryptProperties);
    let decryptOptions: huks.HuksOptions = {
      properties: decryptProperties,
      inData: cipherData
    };

    // 解密
    await huks.initSession(keyAlias, decryptOptions).then((data) => {
      Logger.info(TAG, `decrypt initSession success, data: ${JSON.stringify(data)}`);
      handle = data.handle;
    }).catch((err: Error) => {
      Logger.error(TAG, `decrypt initSession failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
    await huks.finishSession(handle, decryptOptions).then((data) => {
      Logger.info(TAG, `decrypt finishSession success, data: ${JSON.stringify(data)}`);
      resultCallback(uint8ArrayToString(data.outData as Uint8Array));
    }).catch((err: Error) => {
      Logger.error(TAG, `receive message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
      promptAction.showToast({
        message: `receive message failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`,
        duration: 6500,
      });
    });

    // 解密完成删除本地密钥
    let emptyOptions: huks.HuksOptions = {
      properties: []
    };
    await huks.deleteKeyItem(keyAlias, emptyOptions).then((data) => {
      Logger.info(TAG, `delete key success, data: ${JSON.stringify(data)}`);
    }).catch((err: Error)=>{
      Logger.error(TAG, `delete key failed, ${JSON.stringify(err)}: ${JSON.stringify(err.message)}`);
    });
  }
}