let __generate__Id: number = 0;
function generateId(): string {
    return "Ed25519TestProperties_" + ++__generate__Id;
}
import huks from '@ohos.security.huks';
function GetEd25519GenerateProperties() {
    var properties = new Array();
    var index = 0;
    properties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_ED25519
    };
    properties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_ECC_KEY_SIZE_256
    };
    properties[index++] = {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_SIGN |
            huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_VERIFY
    };
    return properties;
}
function GetEd25519SignProperties() {
    let signProperties = new Array();
    signProperties[0] = {
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_ED25519,
    };
    signProperties[1] = {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_SIGN
    };
    signProperties[2] = {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_ECC_KEY_SIZE_256,
    };
    signProperties[3] = {
        tag: huks.HuksTag.HUKS_TAG_DIGEST,
        value: huks.HuksKeyDigest.HUKS_DIGEST_NONE,
    };
    return signProperties;
}
function GetEd25519VerifyProperties() {
    let verifyProperties = new Array();
    verifyProperties[0] = {
        tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
        value: huks.HuksKeyAlg.HUKS_ALG_ED25519,
    };
    verifyProperties[1] = {
        tag: huks.HuksTag.HUKS_TAG_PURPOSE,
        value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_VERIFY
    };
    verifyProperties[2] = {
        tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
        value: huks.HuksKeySize.HUKS_ECC_KEY_SIZE_256,
    };
    verifyProperties[3] = {
        tag: huks.HuksTag.HUKS_TAG_DIGEST,
        value: huks.HuksKeyDigest.HUKS_DIGEST_NONE,
    };
    return verifyProperties;
}
export { GetEd25519GenerateProperties, GetEd25519SignProperties, GetEd25519VerifyProperties as Ed25519TestProperties };
