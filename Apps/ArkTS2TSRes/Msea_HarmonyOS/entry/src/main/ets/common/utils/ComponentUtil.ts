let __generate__Id: number = 0;
function generateId(): string {
    return "ComponentUtil_" + ++__generate__Id;
}
import * as CommonConstants from '../constants/CommonConstants';
import promptAction from '@ohos.promptAction';
export function showToast(msg: string | Resource) {
    promptAction.showToast({
        message: msg,
        duration: CommonConstants.MESSAGE_DURATION
    });
}
