let __generate__Id: number = 0;
function generateId(): string {
    return "AccountModel_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import Logger from './Logger';
import appAccount from '@ohos.account.appAccount';
const TAG: string = '[AccountModel]';
const app: appAccount.AppAccountManager = appAccount.createAppAccountManager();
export class AccountModel {
    async addAccount(username: string) {
        await app.createAccount(username);
        Logger.info(TAG, `addAccount success`);
        return;
    }
    async deleteAccount(username: string) {
        await app.removeAccount(username);
        Logger.info(TAG, `deleteAccount success`);
        return;
    }
    async setAccountCredential(username: string, credentialType: string, credential: string) {
        await app.setCredential(username, credentialType, credential);
        Logger.info(TAG, `setAccountCredential success`);
        return;
    }
    async setAssociatedData(name: string, key: string, value: string) {
        await app.setCustomData(name, key, value);
        Logger.info(TAG, `setAssociatedData success`);
        return;
    }
    async getAccountCredential(name: string, credentialType: string) {
        let result = await app.getCredential(name, credentialType);
        Logger.info(TAG, `getAccountCredential success`);
        return result;
    }
    async getAssociatedData(name: string, key: string) {
        let result = await app.getCustomData(name, key);
        Logger.info(TAG, `getAssociatedData success`);
        return result;
    }
}
