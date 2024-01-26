let __generate__Id: number = 0;
function generateId(): string {
    return "LocalStorage_" + ++__generate__Id;
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
import { Logger } from '../utils/log/Logger';
import data_preferences from '@ohos.data.preferences';
import CommonConstants from '../constants/CommonConstants';
const TAG = "LocalStorage";
export class LocalStorage {
    preferences: data_preferences.Preferences;
    // 获取Preferences实例，使用Promise异步回调
    private async getPreferences() {
        if (!this.preferences) {
            let preferences = await data_preferences.getPreferences(globalThis.context, CommonConstants.PREFERENCE_NAME);
            this.preferences = preferences;
        }
        return this.preferences;
    }
    // 设置记事本名称
    public async setNoteBookName(notebookName: string) {
        Logger.info(TAG, "start setNoteBookName");
        let preferences = await this.getPreferences();
        let result = await preferences.put(CommonConstants.KEY_NOTEBOOK_NAME, notebookName);
        // 将当前Preferences实例的数据异步存储到首选项持久化文件中
        preferences.flush((err) => {
            if (err) {
                Logger.error(TAG, ' 1 setNoteBookName flush fail');
                return;
            }
            Logger.info(TAG, ' 2 setNoteBookName flush success');
        });
        Logger.error(TAG, ' 3  setNoteBookName flush fail');
        return result;
    }
    // 获取记事本名称
    public async getNoteBookName() {
        let preferences = await this.getPreferences();
        let notebookName = await preferences.get(CommonConstants.KEY_NOTEBOOK_NAME, CommonConstants.notebookName);
        return notebookName;
    }
    // 清空记事本名称
    public async clearNoteBookName() {
        let preferences = await this.getPreferences();
        let result = preferences.put(CommonConstants.KEY_NOTEBOOK_NAME, "");
        preferences.flush((err) => {
            if (err) {
                Logger.error(TAG, 'clearNoteBookName flush fail');
                return;
            }
            Logger.info(TAG, 'clearNoteBookName flush success');
        });
        return result;
    }
}
