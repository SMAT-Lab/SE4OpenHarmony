let __generate__Id: number = 0;
function generateId(): string {
    return "CommonUtils_" + ++__generate__Id;
}
import hilog from '@ohos.hilog';
import promptAction from '@ohos.promptAction';
import huks from '@ohos.security.huks';
function StringToUint8Array(str) {
    let arr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}
function Uint8ArrayToString(fileData) {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
}
function LOGBase(format: string, ...args: any[]) {
    hilog.info(0x00, 'PerformanceTest', format, ...args);
}
function LogWithPrintBegin(format: string, ...args: any[]) {
    LOGBase(`begin ${format}`, ...args);
}
function LOGWithPrintEnd(format: string, ...args: any[]) {
    LOGBase(`end ${format}`, ...args);
}
async function isKeyitemExist(keyAlias) {
    let emptyOptions = {
        properties: []
    };
    await huks.isKeyItemExist(keyAlias, emptyOptions).then((data) => {
        promptAction.showToast({
            message: "别名为: " + keyAlias + "的密钥是存在的！",
            duration: 2500,
        });
        return 0;
    }).catch((err) => {
        promptAction.showToast({
            message: "密钥删除失败，错误码是： " + err.code + " 错误吗信息： " + err.message,
            duration: 4500,
        });
        return -1;
    });
}
export { StringToUint8Array, Uint8ArrayToString, LogWithPrintBegin, LOGWithPrintEnd, isKeyitemExist };
