let __generate__Id: number = 0;
function generateId(): string {
    return "TestImportWrappedKey_" + ++__generate__Id;
}
import huks from '@ohos.security.huks';
import * as commonUtils from './CommonUtils';
let IV = '0000000000000000';
let AAD = "abababababababab";
let NONCE = "hahahahahaha";
let TAG_SIZE = 16;
let FILED_LENGTH = 4;
let importedAes192PlainKey = "The aes192 key to import";
let callerAes256Kek = "The is kek to encrypt aes192 key";
let callerKeyAlias = "test_caller_key_ecdh_aes192";
let callerKekAliasAes256 = "test_caller_kek_ecdh_aes256";
let callerAgreeKeyAliasAes256 = "test_caller_agree_key_ecdh_aes256";
let importedKeyAliasAes192 = "test_import_key_ecdh_aes192";
let huksPubKey;
let callerSelfPublicKey;
let outSharedKey;
let outPlainKeyEncData;
let outKekEncData;
let outKekEncTag;
let outAgreeKeyEncTag;
let mask = [0x000000FF, 0x0000FF00, 0x00FF0000, 0xFF000000];
function subUint8ArrayOf(arrayBuf, start, end) {
    let arr = [];
    for (let i = start; i < end && i < arrayBuf.length; ++i) {
        arr.push(arrayBuf[i]);
    }
    return new Uint8Array(arr);
}
function assignLength(length, arrayBuf, startIndex) {
    let index = startIndex;
    for (let i = 0; i < 4; i++) {
        arrayBuf[index++] = (length & mask[i]) >> (i * 8);
    }
    return 4;
}
function assignData(data, arrayBuf, startIndex) {
    let index = startIndex;
    for (let i = 0; i < data.length; i++) {
        arrayBuf[index++] = data[i];
    }
    return data.length;
}
let genWrappingKeyParams = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_ECC
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_UNWRAP
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_CURVE25519_KEY_SIZE_256
    }, {
        tag: huks.HuksTag.HUKS_TAG_PADDING,
        value: huks.HuksKeyPadding.HUKS_PADDING_NONE
    })
};
let genCallerEcdhParams = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_ECC
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_AGREE
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_CURVE25519_KEY_SIZE_256
    })
};
let importParamsCallerKek = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_AES
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256
    }, {
        tag: huks.HuksTag.HUKS_TAG_PADDING,
        value: huks.HuksKeyPadding.HUKS_PADDING_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
        value: huks.HuksCipherMode.HUKS_MODE_GCM
    }, {
        tag: huks.HuksTag.HUKS_TAG_DIGEST,
        value: huks.HuksKeyDigest.HUKS_DIGEST_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_IV,
        value: commonUtils.StringToUint8Array(IV)
    }),
    inData: commonUtils.StringToUint8Array(callerAes256Kek)
};
let importParamsAgreeKey = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_AES
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256
    }, {
        tag: huks.HuksTag.HUKS_TAG_PADDING,
        value: huks.HuksKeyPadding.HUKS_PADDING_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
        value: huks.HuksCipherMode.HUKS_MODE_GCM
    }, {
        tag: huks.HuksTag.HUKS_TAG_DIGEST,
        value: huks.HuksKeyDigest.HUKS_DIGEST_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_IV,
        value: commonUtils.StringToUint8Array(IV)
    }),
};
let callerAgreeParams = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_ECDH
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_AGREE
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_CURVE25519_KEY_SIZE_256
    })
};
let encryptKeyCommonParams = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_AES
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256
    }, {
        tag: huks.HuksTag.HUKS_TAG_PADDING,
        value: huks.HuksKeyPadding.HUKS_PADDING_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
        value: huks.HuksCipherMode.HUKS_MODE_GCM
    }, {
        tag: huks.HuksTag.HUKS_TAG_NONCE,
        value: commonUtils.StringToUint8Array(NONCE)
    }, {
        tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA,
        value: commonUtils.StringToUint8Array(AAD)
    }),
};
let importWrappedAes192Params = {
    properties: new Array({
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_AES
    }, {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
            huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
    }, {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_192
    }, {
        tag: huks.HuksTag.HUKS_TAG_PADDING,
        value: huks.HuksKeyPadding.HUKS_PADDING_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
        value: huks.HuksCipherMode.HUKS_MODE_CBC
    }, {
        tag: huks.HuksTag.HUKS_TAG_DIGEST,
        value: huks.HuksKeyDigest.HUKS_DIGEST_NONE
    }, {
        tag: huks.HuksTag.HUKS_TAG_UNWRAP_ALGORITHM_SUITE,
        value: huks.HuksUnwrapSuite.HUKS_UNWRAP_SUITE_ECDH_AES_256_GCM_NOPADDING
    }, {
        tag: huks.HuksTag.HUKS_TAG_IV,
        value: commonUtils.StringToUint8Array(IV)
    })
};
async function publicGenerateItemFunc(keyAlias, huksOptions) {
    console.info(`enter promise generateKeyItem`);
    try {
        await huks.generateKeyItem(keyAlias, huksOptions)
            .then(data => {
            console.info(`promise: generateKeyItem success, data = ${JSON.stringify(data)}`);
        })
            .catch(err => {
            console.error(`callback: generateKeyItem failed, code: ${err.code}, msg: ${err.message}`);
        });
    }
    catch (err) {
        console.error(`callback: generateKeyItem invalid, code: ${err.code}, msg: ${err.message}`);
    }
}
async function publicImportKeyItemFunc(keyAlias, HuksOptions) {
    console.info(`enter promise importKeyItem`);
    try {
        await huks.importKeyItem(keyAlias, HuksOptions)
            .then(data => {
            console.info(`promise: importKeyItem success, data = ${JSON.stringify(data)}`);
        }).catch(err => {
            console.error(`promise: importKeyItem failed, code: ${err.code}, msg: ${err.message}`);
        });
    }
    catch (err) {
        console.error(`promise: importKeyItem input arg invalid, code: ${err.code}, msg: ${err.message}`);
    }
}
async function publicDeleteKeyItemFunc(KeyAlias, HuksOptions) {
    console.info(`enter promise deleteKeyItem`);
    try {
        await huks.deleteKeyItem(KeyAlias, HuksOptions)
            .then(data => {
            console.info(`promise: deleteKeyItem key success, data = ${JSON.stringify(data)}`);
        })
            .catch(err => {
            console.error(`promise: deleteKeyItem failed, code: ${err.code}, msg: ${err.message}`);
        });
    }
    catch (err) {
        console.error(`promise: deleteKeyItem input arg invalid, code: ${err.code}, msg: ${err.message}`);
    }
}
function importWrappedKeyItem(keyAlias, wrappingKeyAlias, huksOptions) {
    return new Promise((resolve, reject) => {
        try {
            huks.importWrappedKeyItem(keyAlias, wrappingKeyAlias, huksOptions, function (error, data) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        }
        catch (error) {
        }
    });
}
async function publicImportWrappedKeyFunc(keyAlias, wrappingKeyAlias, huksOptions) {
    console.info(`enter callback importWrappedKeyItem`);
    for (let i = 0; i < huksOptions.inData.length; i++) {
        console.error(`${i}: ${huksOptions.inData[i]}`);
    }
    try {
        await importWrappedKeyItem(keyAlias, wrappingKeyAlias, huksOptions)
            .then((data) => {
            console.info(`callback: importWrappedKeyItem success, data = ${JSON.stringify(data)}`);
        })
            .catch(error => {
            console.error(`callback: importWrappedKeyItem failed, code: ${error.code}, msg: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`callback: importWrappedKeyItem input arg invalid, code: ${error.code}, msg: ${error.message}`);
    }
}
async function publicImportWrappedKeyPromise(keyAlias, wrappingKeyAlias, huksOptions) {
    console.info(`enter callback importWrappedKeyItem`);
    try {
        await huks.importWrappedKeyItem(keyAlias, wrappingKeyAlias, huksOptions)
            .then((data) => {
            console.info(`callback: importWrappedKeyItem success, data = ${JSON.stringify(data)}`);
        })
            .catch(error => {
            console.error(`callback: importWrappedKeyItem failed, code: ${error.code}, msg: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`callback: importWrappedKeyItem input arg invalid, code: ${error.code}, msg: ${error.message}`);
    }
}
async function publicInitFunc(srcKeyAlias, HuksOptions) {
    let handle;
    console.info(`enter promise doInit`);
    try {
        await huks.initSession(srcKeyAlias, HuksOptions)
            .then((data) => {
            console.info(`promise: doInit success, data = ${JSON.stringify(data)}`);
            handle = data.handle;
        })
            .catch(error => {
            console.error(`promise: doInit key failed, code: ${error.code}, msg: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`promise: doInit input arg invalid, code: ${error.code}, msg: ${error.message}`);
    }
    return handle;
}
async function publicUpdateSessionFunction(handle, HuksOptions) {
    const maxUpdateSize = 64;
    const inData = HuksOptions.inData;
    const lastInDataPosition = inData.length - 1;
    let inDataSegSize = maxUpdateSize;
    let inDataSegPosition = 0;
    let isFinished = false;
    let outData = [];
    while (inDataSegPosition <= lastInDataPosition) {
        if (inDataSegPosition + maxUpdateSize > lastInDataPosition) {
            isFinished = true;
            inDataSegSize = lastInDataPosition - inDataSegPosition + 1;
            console.error(`enter promise doUpdate`);
            break;
        }
        HuksOptions.inData = new Uint8Array(Array.from(inData).slice(inDataSegPosition, inDataSegPosition + inDataSegSize));
        console.error(`enter promise doUpdate`);
        try {
            await huks.updateSession(handle, HuksOptions)
                .then((data) => {
                console.error(`promise: doUpdate success, data = ${JSON.stringify(data)}`);
                outData = outData.concat(Array.from(data.outData));
            })
                .catch(error => {
                console.error(`promise: doUpdate failed, code: ${error.code}, msg: ${error.message}`);
            });
        }
        catch (error) {
            console.error(`promise: doUpdate input arg invalid, code: ${error.code}, msg: ${error.message}`);
        }
        if ((!isFinished) && (inDataSegPosition + maxUpdateSize > lastInDataPosition)) {
            console.log(`update size invalid isFinished = ${isFinished}`);
            console.log(`inDataSegPosition = ${inDataSegPosition}`);
            console.log(`lastInDataPosition = ${lastInDataPosition}`);
            return;
        }
        inDataSegPosition += maxUpdateSize;
    }
    return outData;
}
async function publicFinishSession(handle, HuksOptions, inData) {
    let outData = [];
    console.info(`enter promise doFinish`);
    try {
        await huks.finishSession(handle, HuksOptions)
            .then((data) => {
            console.info(`promise: doFinish success, data = ${JSON.stringify(data)}`);
            outData = inData.concat(Array.from(data.outData));
        })
            .catch(error => {
            console.error(`promise: doFinish key failed, code: ${error.code}, msg: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`promise: doFinish input arg invalid, code: ${error.code}, msg: ${error.message}`);
    }
    return new Uint8Array(outData);
}
async function cipherFunction(keyAlias, HuksOptions) {
    let handle = await publicInitFunc(keyAlias, HuksOptions);
    let tmpData = await publicUpdateSessionFunction(handle, HuksOptions);
    let outData = await publicFinishSession(handle, HuksOptions, tmpData);
    return outData;
}
async function agreeFunction(keyAlias, HuksOptions, huksPublicKey) {
    let handle = await publicInitFunc(keyAlias, HuksOptions);
    let outSharedKey;
    HuksOptions.inData = huksPublicKey;
    console.error(`enter promise doUpdate`);
    try {
        await huks.updateSession(handle, HuksOptions)
            .then((data) => {
            console.error(`promise: doUpdate success, data = ${JSON.stringify(data)}`);
        })
            .catch(error => {
            console.error(`promise: doUpdate failed, code: ${error.code}, msg: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`promise: doUpdate input arg invalid, code: ${error.code}, msg: ${error.message}`);
    }
    console.info(`enter promise doInit`);
    try {
        await huks.finishSession(handle, HuksOptions)
            .then((data) => {
            console.info(`promise: doInit success, data = ${JSON.stringify(data)}`);
            outSharedKey = data.outData;
        })
            .catch(error => {
            console.error(`promise: doInit key failed, code: ${error.code}, msg: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`promise: doInit input arg invalid, code: ${error.code}, msg: ${error.message}`);
    }
    return outSharedKey;
}
async function ImportKekAndAgreeSharedSecret(callerKekAlias, importKekParams, callerKeyAlias, huksPublicKey, agreeParams) {
    await publicImportKeyItemFunc(callerKekAlias, importKekParams);
    outSharedKey = await agreeFunction(callerKeyAlias, agreeParams, huksPublicKey);
    importParamsAgreeKey.inData = outSharedKey;
    await publicImportKeyItemFunc(callerAgreeKeyAliasAes256, importParamsAgreeKey);
}
async function generateAndExportPublicKey(keyAlias, HuksOptions, caller) {
    await publicGenerateItemFunc(keyAlias, HuksOptions);
    try {
        await huks.exportKeyItem(keyAlias, HuksOptions)
            .then((data) => {
            console.info(`promise: exportKeyItem success, data = ${JSON.stringify(data)}`);
            if (caller) {
                callerSelfPublicKey = data.outData;
            }
            else {
                huksPubKey = data.outData;
            }
        })
            .catch(error => {
            console.error(`promise: exportKeyItem failed, code: ${error.code}, msg: ${error.message}`);
            // @ts-ignore
            expect(null).assertFail();
        });
    }
    catch (e) {
        console.error(`promise: generate pubKey failed, code: ${e.code}, msg: ${e.message}`);
    }
}
async function EncryptImportedPlainKeyAndKek(keyAlias) {
    encryptKeyCommonParams.inData = commonUtils.StringToUint8Array(keyAlias);
    let plainKeyEncData = await cipherFunction(callerKekAliasAes256, encryptKeyCommonParams);
    outKekEncTag = subUint8ArrayOf(plainKeyEncData, plainKeyEncData.length - TAG_SIZE, plainKeyEncData.length);
    outPlainKeyEncData = subUint8ArrayOf(plainKeyEncData, 0, plainKeyEncData.length - TAG_SIZE);
    encryptKeyCommonParams.inData = commonUtils.StringToUint8Array(callerAes256Kek);
    let kekEncData = await cipherFunction(callerAgreeKeyAliasAes256, encryptKeyCommonParams);
    outAgreeKeyEncTag = subUint8ArrayOf(kekEncData, kekEncData.length - TAG_SIZE, kekEncData.length);
    outKekEncData = subUint8ArrayOf(kekEncData, 0, kekEncData.length - TAG_SIZE);
}
async function BuildWrappedDataAndImportWrappedKey(plainKey) {
    let plainKeySizeBuff = new Uint8Array(4);
    assignLength(plainKey.length, plainKeySizeBuff, 0);
    let wrappedData = new Uint8Array(FILED_LENGTH + huksPubKey.length +
        FILED_LENGTH + AAD.length +
        FILED_LENGTH + NONCE.length +
        FILED_LENGTH + TAG_SIZE +
        FILED_LENGTH + outKekEncData.length +
        FILED_LENGTH + AAD.length +
        FILED_LENGTH + NONCE.length +
        FILED_LENGTH + TAG_SIZE +
        FILED_LENGTH + plainKeySizeBuff.length +
        FILED_LENGTH + outPlainKeyEncData.length);
    let index = 0;
    let AADUint8Array = commonUtils.StringToUint8Array(AAD);
    let NonceArray = commonUtils.StringToUint8Array(NONCE);
    index += assignLength(callerSelfPublicKey.length, wrappedData, index); // 4
    index += assignData(callerSelfPublicKey, wrappedData, index); // 91
    index += assignLength(AADUint8Array.length, wrappedData, index); // 4
    index += assignData(AADUint8Array, wrappedData, index); // 16
    index += assignLength(NonceArray.length, wrappedData, index); // 4
    index += assignData(NonceArray, wrappedData, index); // 12
    index += assignLength(outAgreeKeyEncTag.length, wrappedData, index); // 4
    index += assignData(outAgreeKeyEncTag, wrappedData, index); // 16
    index += assignLength(outKekEncData.length, wrappedData, index); // 4
    index += assignData(outKekEncData, wrappedData, index); // 32
    index += assignLength(AADUint8Array.length, wrappedData, index); // 4
    index += assignData(AADUint8Array, wrappedData, index); // 16
    index += assignLength(NonceArray.length, wrappedData, index); // 4
    index += assignData(NonceArray, wrappedData, index); // 12
    index += assignLength(outKekEncTag.length, wrappedData, index); // 4
    index += assignData(outKekEncTag, wrappedData, index); // 16
    index += assignLength(plainKeySizeBuff.length, wrappedData, index); // 4
    index += assignData(plainKeySizeBuff, wrappedData, index); // 4
    index += assignLength(outPlainKeyEncData.length, wrappedData, index); // 4
    index += assignData(outPlainKeyEncData, wrappedData, index); // 24
    return wrappedData;
}
export function SecurityHuksImportJsunit() {
    describe('SecurityHuksImportJsunit', function () {
        it('HUKS_Basic_Capability_Import_Reformed_0300', 0, async function (done) {
            const srcKeyAliesWrap = 'HUKS_Basic_Capability_Import_0200';
            await generateAndExportPublicKey(srcKeyAliesWrap, genWrappingKeyParams, false);
            await generateAndExportPublicKey(callerKeyAlias, genCallerEcdhParams, true);
            await ImportKekAndAgreeSharedSecret(callerKekAliasAes256, importParamsCallerKek, callerKeyAlias, huksPubKey, callerAgreeParams);
            await EncryptImportedPlainKeyAndKek(importedAes192PlainKey);
            let wrappedData = await BuildWrappedDataAndImportWrappedKey(importedAes192PlainKey);
            importWrappedAes192Params.inData = wrappedData;
            await publicImportWrappedKeyFunc(importedKeyAliasAes192, srcKeyAliesWrap, importWrappedAes192Params);
            await publicDeleteKeyItemFunc(srcKeyAliesWrap, genWrappingKeyParams);
            await publicDeleteKeyItemFunc(callerKeyAlias, genCallerEcdhParams);
            await publicDeleteKeyItemFunc(importedKeyAliasAes192, importWrappedAes192Params);
            await publicDeleteKeyItemFunc(callerKekAliasAes256, callerAgreeParams);
            done();
        });
    });
}
