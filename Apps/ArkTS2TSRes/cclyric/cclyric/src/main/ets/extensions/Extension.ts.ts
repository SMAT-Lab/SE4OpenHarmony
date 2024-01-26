import hilog from '@ohos.hilog';
const TAG = "LyricView";
export function printD(msg: string) {
    hilog.debug(0, TAG, msg);
}
export function printW(msg: string) {
    hilog.warn(0, TAG, msg);
}
