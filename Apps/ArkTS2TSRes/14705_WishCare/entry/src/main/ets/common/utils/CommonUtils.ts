let __generate__Id: number = 0;
function generateId(): string {
    return "CommonUtils_" + ++__generate__Id;
}
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
import Context from '@ohos.app.ability.common';
import Logger from './Logger';
import CommonConstants from '../constants/CommonConstants';
import router from '@ohos.router';
/**
 * This is a pop-up window tool class, which is used to encapsulate dialog code.
 * Developers can directly invoke the methods in.
 */
export class CommonUtils {
    /**
     * Alert dialog dialog
     */
    alertDialog(context: Context.UIAbilityContext) {
        AlertDialog.show({
            message: $r('app.string.alert_dialog_message'),
            alignment: DialogAlignment.Bottom,
            offset: {
                dx: 0,
                dy: CommonConstants.DY_OFFSET
            },
            primaryButton: {
                value: $r('app.string.cancel_button'),
                action: () => {
                    Logger.info(CommonConstants.TAG_COMMON_UTILS, 'Callback cancel button is clicked');
                }
            },
            secondaryButton: {
                value: $r('app.string.definite_button'),
                action: () => {
                    // Exiting the app.
                    context.terminateSelf();
                    Logger.info(CommonConstants.TAG_COMMON_UTILS, 'Callback definite button is clicked');
                }
            }
        });
    }
    /**
     * Date dialog dialog
     */
    datePickerDialog(dateCallback) {
        DatePickerDialog.show({
            start: new Date(CommonConstants.START_TIME),
            end: new Date(),
            selected: new Date(CommonConstants.SELECT_TIME),
            lunar: false,
            onAccept: (value: DatePickerResult) => {
                let year = value.year;
                let month = value.month + CommonConstants.PLUS_ONE;
                let day = value.day;
                let birthdate: string = this.getBirthDateValue(year, month, day);
                dateCallback(birthdate);
            }
        });
    }
    /**
     * Text dialog dialog
     */
    textPickerDialog(sexArray: Resource, sexCallback) {
        if (this.isEmptyArr(sexArray)) {
            Logger.error(CommonConstants.TAG_COMMON_UTILS, 'sex is null');
            return;
        }
        TextPickerDialog.show({
            range: sexArray,
            selected: 0,
            onAccept: (result: TextPickerResult) => {
                sexCallback(result.value);
            },
            onCancel: () => {
                Logger.info(CommonConstants.TAG_COMMON_UTILS, 'TextPickerDialog onCancel');
            }
        });
    }
    /**
     * Get default birth date
     *
     * @param {number} year year
     * @param {number} month month
     * @param {number} day day
     * @returns {string} return birth date
     */
    getBirthDateValue(year: number, month: number, day: number): string {
        let birthdate: string = `${year}${CommonConstants.DATE_YEAR}${month}` +
            `${CommonConstants.DATE_MONTH}${day}${CommonConstants.DATE_DAY}`;
        return birthdate;
    }
    /**
     * Check obj is empty
     *
     * @param {object} obj
     * @return {boolean} true(empty)
     */
    isEmpty(obj): boolean {
        return obj === undefined || obj === null || obj === '';
    }
    /**
     * Check array is empty
     *
     * @param {Array}array
     * @return {boolean} true(empty)
     */
    isEmptyArr(array): boolean {
        return this.isEmpty(array) || array.length === 0;
    }
}
export default new CommonUtils();
