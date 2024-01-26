interface Index_Params {
    message?: string;
    controller?: TextInputController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import huks from '@ohos.security.huks';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import * as commonUtils from './CommonUtils';
import * as AesTestSuite from './AesTestProperties';
import * as RsaTestSuite from './RsaTestProperties';
import * as Ed25519TestSuite from './Ed25519TestProperties';
import * as AttestKeyTestSuite from './TestAttestKey';
let aesKeyAlias = 'test_aesKeyAlias';
let ed25519KeyAlias = 'test_ed25519KeyAlias';
let rsaKeyAlias = 'test_rsaKeyAlias';
let handle;
let plainText = '123456789';
let cipherData: Uint8Array;
let signData: Uint8Array;
let plainAesKey128 = new Uint8Array([
    0xfb, 0x8b, 0x9f, 0x12, 0xa0, 0x83, 0x19, 0xbe, 0x6a, 0x6f, 0x63, 0x2a, 0x7c, 0x86, 0xba, 0xca
]);
async function GenerateKeyForDfx(keyAlias, genProperties) {
    var options = {
        properties: genProperties
    };
    var i = 0;
    var base = keyAlias;
    let startTime = new Date().getTime();
    let callingCount = 100;
    for (i = 0; i < callingCount; i++) {
        keyAlias = base.concat(i);
        await huks.generateKeyItem(keyAlias, options).then((data) => {
            promptAction.showToast({
                message: "成功生成了一个别名为：" + keyAlias + " 的密钥" + "第" + i + "次",
                duration: 2500,
            });
        }).catch((err) => {
            promptAction.showToast({
                message: "密钥生成失败，错误码是： " + err.code + " 错误吗信息： " + err.message + "当前生成错误次数: " + i,
                duration: 6500,
            });
            return;
        });
    }
    let endTime = new Date().getTime();
    let avgTime = (endTime - startTime) / callingCount;
    promptAction.showActionMenu({
        title: '测试结果',
        buttons: [
            {
                text: "密钥生成性能平均时间： " + avgTime + " ms",
                color: '#666666',
            },
        ]
    });
}
async function GenerateKey(keyAlias, genProperties) {
    var options = {
        properties: genProperties
    };
    await huks.generateKeyItem(keyAlias, options).then((data) => {
        promptAction.showToast({
            message: "成功生成了一个别名为：" + keyAlias + " 的密钥",
            duration: 2500,
        });
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥生成失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
}
async function ImportPlainKeyAndUseIt(keyAlias, importProperties, plainKey) {
    for (let index = 0; index < 100; index++) {
        var options = {
            properties: importProperties,
            inData: plainKey
        };
        await huks.importKeyItem(keyAlias, options).then((data) => {
            promptAction.showToast({
                message: "成功导入了一个别名为：" + keyAlias + " 的密钥",
                duration: 2500,
            });
        }).catch((err) => {
            promptAction.showToast({
                message: "密钥导入失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
                duration: 6500,
            });
            return;
        });
        console.log("running time: " + index);
        EncryptData(aesKeyAlias, AesTestSuite.GetAesEncryptProperties());
    }
}
async function ExportPublicKey(keyAlias) {
    let emptyOptions = {
        properties: []
    };
    await huks.exportKeyItem(keyAlias, emptyOptions).then((data) => {
        promptAction.showToast({
            message: "成功将别名为：" + keyAlias + " 的公钥导出, data 的长度为" + data.outData.length,
            duration: 2500,
        });
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥导出失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
}
async function SignData(keyAlias, inputProperties, inputData) {
    if (inputData == null) {
        promptAction.showToast({
            message: "签名验签数据为空，无法执行签名验签操作！",
            duration: 6500,
        });
        return;
    }
    var options = {
        properties: inputProperties,
        inData: inputData //inputData must be Uint8Array
    };
    await huks.initSession(keyAlias, options).then((data) => {
        handle = data.handle;
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥初始化失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
    await huks.finishSession(handle, options).then((data) => {
        promptAction.showToast({
            message: "验签完成， 验签结果是： " + commonUtils.Uint8ArrayToString(data.outData),
            duration: 6500,
        });
        signData = data.outData;
    }).catch((err) => {
        promptAction.showToast({
            message: "签名验签finish阶段捕获了异常，错误码是： " + err.code + " 错误码信息： " + err.message,
            duration: 6500,
        });
    });
}
async function VerifyData(keyAlias, inputProperties, signData, plainData) {
    if (signData == null || plainData == null) {
        promptAction.showToast({
            message: "签名验签数据为空，无法执行签名验签操作！",
            duration: 6500,
        });
        return;
    }
    var options = {
        properties: inputProperties,
        inData: plainData //inputData must be Uint8Array
    };
    await huks.initSession(keyAlias, options).then((data) => {
        handle = data.handle;
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥初始化失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
    //update阶段，options 中需要包含签名阶段使用的明文
    await huks.updateSession(handle, options).then((data) => {
    }).catch((err) => {
        promptAction.showToast({
            message: "验签update过程错误，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
    // finish阶段，将options中的data 改为签名结果传入进行验签
    options.inData = signData;
    await huks.finishSession(handle, options).then((data) => {
        promptAction.showToast({
            message: "验签通过",
            duration: 6500,
        });
        signData = data.outData;
    }).catch((err) => {
        promptAction.showToast({
            message: "签名验签finish阶段捕获了异常，错误码是： " + err.code + " 错误码信息： " + err.message,
            duration: 6500,
        });
    });
}
async function EncryptData(keyAlias, encryptProperties) {
    let ret = -1;
    var options = {
        properties: encryptProperties,
        inData: commonUtils.StringToUint8Array(plainText)
    };
    await huks.initSession(keyAlias, options).then((data) => {
        handle = data.handle;
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥初始化失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
    await huks.finishSession(handle, options).then((data) => {
        promptAction.showToast({
            message: "加密数据成功， 密文是： " + commonUtils.Uint8ArrayToString(data.outData),
            duration: 1500,
        });
        cipherData = data.outData;
        console.log("running time result success!");
    }).catch((err) => {
        promptAction.showToast({
            message: "加密流程捕获了异常，错误码是： " + err.code + " 错误码信息： " + err.message,
            duration: 6500,
        });
    });
    return ret;
}
async function DecryptData(keyAlias, decryptProperties) {
    var options = {
        properties: decryptProperties,
        inData: cipherData
    };
    await huks.initSession(keyAlias, options).then((data) => {
        handle = data.handle;
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥初始化失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
    await huks.finishSession(handle, options).then((data) => {
        promptAction.showToast({
            message: "解密成功， 解密的明文是： " + commonUtils.Uint8ArrayToString(data.outData),
            duration: 6500,
        });
    }).catch((err) => {
        promptAction.showToast({
            message: "解密流程捕获了异常，错误码是： " + err.code + " 错误码信息： " + err.message,
            duration: 6500,
        });
    });
}
async function DeleteKey(keyAlias) {
    let emptyOptions = {
        properties: []
    };
    await huks.isKeyItemExist(keyAlias, emptyOptions).then((data) => {
        promptAction.showToast({
            message: "别名为: " + keyAlias + "的密钥是存在的！",
            duration: 500,
        });
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥删除失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
    await huks.deleteKeyItem(keyAlias, emptyOptions).then((data) => {
        promptAction.showToast({
            message: "别名为: " + keyAlias + " 密钥删除成功！",
            duration: 6500,
        });
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥删除失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
}
async function GetKeyProperties() {
    let emptyOptions = {
        properties: []
    };
    await huks.getKeyItemProperties(aesKeyAlias, emptyOptions).then((data) => {
        promptAction.showToast({
            message: "获取密钥属性成功！属性为: " + JSON.stringify(data),
            duration: 6500,
        });
    }).catch((err) => {
        promptAction.showToast({
            message: "获取密钥属性失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 6500,
        });
    });
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello Huks', this, "message");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private controller: TextInputController;
    render() {
        Column.create();
        Row.create();
        Text.create('输入您要加密得内容');
        Text.fontSize(20);
        Text.margin({ left: 2, top: 10 });
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '默认加密/签名123456789', controller: this.controller });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width(400);
        TextInput.height(40);
        TextInput.margin(20);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.type(InputType.Normal);
        TextInput.onChange((value: string) => {
            this.message += '您输入得明文是: ' + value + '\n';
            plainText = value;
        });
        TextInput.margin({ top: 10 });
        Row.pop();
        Row.create();
        Text.create('加密或解密的结果');
        Text.fontSize(20);
        Text.margin({ left: 2, top: 10 });
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '这里将会显示加解密的结果', controller: this.controller });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width(400);
        TextInput.height(40);
        TextInput.margin(20);
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.type(InputType.Normal);
        TextInput.onChange((value: string) => {
            this.message += '您输入得明文是: ' + value + '\n';
            plainText = value;
        });
        TextInput.margin({ top: 10 });
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            GenerateKey(aesKeyAlias, AesTestSuite.GetAesGenerateProperties());
        });
        Button.margin(10);
        Text.create('GenerateAesKey');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            DeleteKey(aesKeyAlias);
        });
        Button.margin(10);
        Text.create('deleteAesKey');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            EncryptData(aesKeyAlias, AesTestSuite.GetAesEncryptProperties());
        });
        Button.margin(10);
        Text.create('EncryptDataWithAes');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            DecryptData(aesKeyAlias, AesTestSuite.GetAesDecryptProperties());
        });
        Button.margin(10);
        Text.create('DecryptDataWithAes');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317bff);
        Button.onClick(() => {
            GenerateKey(ed25519KeyAlias, Ed25519TestSuite.GetEd25519GenerateProperties());
        });
        Button.margin(10);
        Text.create('GenerateEd25519Key');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            DeleteKey(ed25519KeyAlias);
        });
        Button.margin(10);
        Text.create('deleteEd25519Key');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317bff);
        Button.onClick(() => {
            SignData(ed25519KeyAlias, Ed25519TestSuite.GetEd25519SignProperties(), commonUtils.StringToUint8Array(plainText));
        });
        Button.margin(10);
        Text.create('SignWithEd25519');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317bff);
        Button.onClick(() => {
            VerifyData(ed25519KeyAlias, Ed25519TestSuite.Ed25519TestProperties(), signData, commonUtils.StringToUint8Array(plainText));
        });
        Button.margin(10);
        Text.create('VerifyWithEd25519');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317bff);
        Button.onClick(() => {
            GenerateKey(rsaKeyAlias, RsaTestSuite.GetRSA4096GenerateProperties());
        });
        Button.margin(10);
        Text.create('GenerateRSAKey');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            DeleteKey(rsaKeyAlias);
        });
        Button.margin(10);
        Text.create('DeleteRSAKey');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            EncryptData(rsaKeyAlias, RsaTestSuite.GetRSA4096EncryptProperties());
        });
        Button.margin(10);
        Text.create('EncryptWithRsa');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            DecryptData(rsaKeyAlias, RsaTestSuite.GetRSA4096DecryptProperties());
        });
        Button.margin(10);
        Text.create('DecryptWithRsa');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            ExportPublicKey(rsaKeyAlias);
        });
        Button.margin(10);
        Text.create('ExportRSAKey');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            GetKeyProperties();
        });
        Button.margin(10);
        Text.create('GetKeyProperties');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            AttestKeyTestSuite.LetKeyAttest(rsaKeyAlias, AttestKeyTestSuite.GetAttestKeyProperties(rsaKeyAlias));
        });
        Button.margin(10);
        Text.create('AttestKeyTest');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317bff);
        Button.onClick(() => {
            GenerateKeyForDfx(rsaKeyAlias, RsaTestSuite.GetRSA4096GenerateProperties());
        });
        Button.margin(10);
        Text.create('GenerateRSAKeyDFX');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            GenerateKeyForDfx(aesKeyAlias, AesTestSuite.GetAesGenerateProperties());
        });
        Button.margin(10);
        Text.create('GenerateAesKeyDFX');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width('45%');
        Button.height('5%');
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            ImportPlainKeyAndUseIt(aesKeyAlias, AesTestSuite.GetAesGenerateProperties(), plainAesKey128);
        });
        Button.margin(10);
        Text.create('ImportAesKey');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
