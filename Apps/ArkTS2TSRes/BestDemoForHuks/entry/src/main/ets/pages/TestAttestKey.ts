let __generate__Id: number = 0;
function generateId(): string {
    return "TestAttestKey_" + ++__generate__Id;
}
import huks from '@ohos.security.huks';
import * as commonUtils from './CommonUtils';
import promptAction from '@ohos.promptAction';
let securityLevel = commonUtils.StringToUint8Array('sec_level');
let challenge = commonUtils.StringToUint8Array('challenge_data');
let versionInfo = commonUtils.StringToUint8Array('version_info');
let attestCertChain;
function GetAttestKeyProperties(keyAlias) {
    var attestKeyproperties = new Array();
    var index = 0;
    attestKeyproperties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_ATTESTATION_ID_SEC_LEVEL_INFO,
        value: securityLevel
    };
    attestKeyproperties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_ATTESTATION_CHALLENGE,
        value: challenge
    };
    attestKeyproperties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_ATTESTATION_ID_VERSION_INFO,
        value: versionInfo
    };
    attestKeyproperties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_ATTESTATION_ID_ALIAS,
        value: commonUtils.StringToUint8Array(keyAlias)
    };
    return attestKeyproperties;
}
async function LetKeyAttest(keyAlias, keyOptions) {
    let attestOptions = {
        properties: keyOptions,
    };
    await huks.attestKeyItem(keyAlias, attestOptions).then((data) => {
        promptAction.showToast({
            message: "attest 成功",
            duration: 3000,
        });
        attestCertChain = data.certChains;
    }).catch((err) => {
        promptAction.showToast({
            message: "attest 失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
}
export { LetKeyAttest, GetAttestKeyProperties };
